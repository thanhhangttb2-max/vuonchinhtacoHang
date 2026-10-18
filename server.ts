import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { STARTER_QUESTIONS } from './src/data/starterQuestions';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse command line port if provided (--port 3000) or use process.env.PORT
let port = Number(process.env.PORT) || 3000;
const portArgIndex = process.argv.indexOf('--port');
if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
  const parsedPort = Number(process.argv[portArgIndex + 1]);
  if (!isNaN(parsedPort) && parsedPort > 0) {
    port = parsedPort;
  }
}

// Payload limit: 100KB is generous for 5-50 questions, prevents memory abuse
app.use(express.json({ limit: '100kb' }));

// Simple in-memory sliding window rate limiter
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();

function isRateLimited(key: string, maxRequests = 40, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= maxRequests) {
    return true;
  }
  entry.count += 1;
  return false;
}

// Clean up stale rate limit entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of rateLimitMap.entries()) {
    if (now > v.resetAt) rateLimitMap.delete(k);
  }
}, 15 * 60 * 1000);

// Anti-Formula Injection helper for spreadsheet cells
function sanitizeForFormula(value: unknown): string {
  if (value === null || value === undefined) return '';
  const str = String(value).trim();
  // Prevent Excel / Google Sheets formula execution (=, +, -, @, \t, \r)
  if (/^[=+\-@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

// Map of starter questions for answer verification
const starterQuestionMap = new Map(STARTER_QUESTIONS.map(q => [q.id, q]));

// ==========================================
// API ROUTES
// ==========================================

// 1. Check configuration status
app.get('/api/config-status', (req: Request, res: Response) => {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
  const secret = process.env.RESULTS_SHARED_SECRET?.trim();

  const isConfigured = Boolean(scriptUrl && secret);

  res.json({
    ok: true,
    configured: isConfigured,
    hasUrl: Boolean(scriptUrl),
    hasSecret: Boolean(secret),
    message: isConfigured
      ? 'Hệ thống đã cấu hình đầy đủ kết nối tới Google Apps Script.'
      : 'Chưa cấu hình GOOGLE_APPS_SCRIPT_URL hoặc RESULTS_SHARED_SECRET trên máy chủ.',
  });
});

// Endpoint kiểm tra kết nối trực tiếp từ Góc giáo viên
app.post('/api/test-gas-connection', async (req: Request, res: Response) => {
  try {
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
    const sharedSecret = process.env.RESULTS_SHARED_SECRET?.trim();

    if (!scriptUrl || !sharedSecret) {
      return res.status(503).json({
        ok: false,
        error: 'NOT_CONFIGURED',
        message: 'Chưa cấu hình GOOGLE_APPS_SCRIPT_URL hoặc RESULTS_SHARED_SECRET trên máy chủ.',
      });
    }

    const testAttemptId = 'test_conn_' + Date.now().toString(36);
    const testPayload = {
      attemptId: testAttemptId,
      secret: sharedSecret,
      studentId: 'KIEM_TRA_KET_NOI',
      group: 'ch_tr',
      isReview: false,
      scoreSummary: '1/1',
      firstTryCorrectCount: 1,
      correctAfterHintCount: 0,
      correctAfterRetryCount: 0,
      revealedAnswerCount: 0,
      totalQuestions: 1,
      durationSeconds: 5,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      serverReceivedAt: new Date().toISOString(),
      details: [
        {
          questionIndex: 1,
          questionId: 'test_q01',
          version: '1',
          group: 'ch_tr',
          questionSentence: 'Câu kiểm tra kết nối từ máy chủ',
          firstChoice: 'tre',
          correctAnswer: 'tre',
          attempts: ['tre'],
          hintsUsed: 0,
          revealedAnswer: false,
          isCorrect: true,
          outcome: 'first_try',
        },
      ],
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const gasResponse = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    const rawText = await gasResponse.text();
    interface GasResponsePayload {
      ok?: boolean;
      attemptId?: string;
      message?: string;
      error?: string;
    }
    let gasJson: GasResponsePayload;
    try {
      gasJson = JSON.parse(rawText) as GasResponsePayload;
    } catch {
      if (
        gasResponse.url.includes('accounts.google.com') ||
        rawText.includes('ServiceLogin') ||
        rawText.includes('accounts.google.com')
      ) {
        return res.status(403).json({
          ok: false,
          error: 'APPS_SCRIPT_ACCESS_DENIED',
          message:
            'Google Apps Script đang yêu cầu đăng nhập. Cô hãy vào lại Apps Script > Triển khai (Deploy) > Quản lý bản triển khai > Chỉnh sửa > Chọn "Ai có quyền truy cập" (Who has access) là "Bất kỳ ai" (Anyone) thay vì "Chỉ mình tôi" nhé!',
        });
      }
      if (rawText.includes('Page not found') || rawText.includes('Không tìm thấy trang')) {
        return res.status(404).json({
          ok: false,
          error: 'GAS_NOT_FOUND',
          message: 'Không tìm thấy Google Apps Script Web App (404). Cô hãy kiểm tra lại Deployment URL.',
        });
      }
      return res.status(502).json({
        ok: false,
        error: 'INVALID_GAS_RESPONSE',
        message: 'Google Apps Script trả về nội dung không hợp lệ.',
      });
    }

    if (!gasJson.ok) {
      return res.status(400).json({
        ok: false,
        error: gasJson.error || 'GAS_ERROR',
        message: gasJson.message || 'Google Apps Script báo lỗi khi ghi dữ liệu.',
      });
    }

    return res.json({
      ok: true,
      message: 'Kết nối Google Sheets thành công tuyệt đối! Bảng tính đã ghi nhận được bài làm kiểm tra.',
      attemptId: testAttemptId,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return res.status(500).json({
      ok: false,
      error: 'SERVER_ERROR',
      message: error?.message || 'Lỗi khi kiểm tra kết nối tới Google Apps Script.',
    });
  }
});

// 2. Submit student practice results to Google Sheets via Apps Script
app.post('/api/submit-results', async (req: Request, res: Response) => {
  try {
    const clientIp = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || 'unknown';
    
    // Rate limit check (max 40 requests per 10 mins per IP)
    if (isRateLimited(clientIp, 40, 10 * 60 * 1000)) {
      return res.status(429).json({
        ok: false,
        error: 'RATE_LIMITED',
        message: 'Bạn gửi bài quá nhanh. Vui lòng đợi vài phút rồi thử lại.',
      });
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
    const sharedSecret = process.env.RESULTS_SHARED_SECRET?.trim();

    // Check server configuration
    if (!scriptUrl || !sharedSecret) {
      return res.status(503).json({
        ok: false,
        error: 'NOT_CONFIGURED',
        message: 'Máy chủ chưa được cấu hình GOOGLE_APPS_SCRIPT_URL hoặc RESULTS_SHARED_SECRET. Vui lòng liên hệ giáo viên thiết lập.',
      });
    }

    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({
        ok: false,
        error: 'INVALID_PAYLOAD',
        message: 'Dữ liệu bài làm không hợp lệ.',
      });
    }

    // 1. Validate attemptId
    const attemptId = String(payload.attemptId || '').trim();
    if (!attemptId || !/^[a-zA-Z0-9_-]{8,64}$/.test(attemptId)) {
      return res.status(400).json({
        ok: false,
        error: 'INVALID_ATTEMPT_ID',
        message: 'Mã lượt học (attemptId) không hợp lệ (phải từ 8-64 ký tự chữ, số, gạch nối).',
      });
    }

    // 2. Validate studentId (Mã học sinh)
    const studentId = String(payload.studentId || '').trim();
    if (!studentId || studentId.length > 30) {
      return res.status(400).json({
        ok: false,
        error: 'INVALID_STUDENT_ID',
        message: 'Mã học sinh không được để trống và tối đa 30 ký tự.',
      });
    }

    // 3. Validate spelling group
    const validGroups = ['ch_tr', 'd_gi', 'v_d', 'th_h', 'r_g', 'mixed'];
    const group = String(payload.group || '').trim();
    if (!validGroups.includes(group)) {
      return res.status(400).json({
        ok: false,
        error: 'INVALID_GROUP',
        message: 'Nhóm chữ luyện tập không hợp lệ.',
      });
    }

    // 4. Validate isReview & timestamps
    const isReview = Boolean(payload.isReview);
    const startTime = typeof payload.startTime === 'number' ? payload.startTime : Date.now();
    const endTime = typeof payload.endTime === 'number' ? payload.endTime : Date.now();
    const durationSeconds = Math.max(0, Math.round((endTime - startTime) / 1000));

    // 5. Validate details array
    if (!Array.isArray(payload.details) || payload.details.length === 0 || payload.details.length > 60) {
      return res.status(400).json({
        ok: false,
        error: 'INVALID_DETAILS',
        message: 'Danh sách câu trả lời phải từ 1 đến 60 câu.',
      });
    }

    // 6. Recalculate summary metrics strictly on the server (do not trust client totals)
    let firstTryCorrectCount = 0;
    let correctAfterHintCount = 0;
    let correctAfterRetryCount = 0;
    let revealedAnswerCount = 0;

    const validatedDetails = [];

    for (let i = 0; i < payload.details.length; i++) {
      const d = payload.details[i];
      if (!d || typeof d !== 'object') {
        return res.status(400).json({
          ok: false,
          error: 'INVALID_QUESTION_DETAIL',
          message: `Câu hỏi thứ ${i + 1} không hợp lệ.`,
        });
      }

      const questionId = String(d.questionId || '').slice(0, 50);
      const questionSentence = sanitizeForFormula(String(d.questionSentence || '').slice(0, 200));
      const firstChoice = sanitizeForFormula(String(d.firstChoice || '').slice(0, 50));
      const outcome = ['first_try', 'after_hint', 'after_retry', 'revealed'].includes(d.outcome)
        ? d.outcome
        : 'revealed';
      
      const hintsUsed = Math.max(0, Number(d.hintsUsed) || 0);
      const attemptsCount = Math.max(1, Number(d.attemptsCount) || 1);
      const revealedAnswer = Boolean(d.revealedAnswer || outcome === 'revealed');

      // Verify correct answer against starter bank if available
      let verifiedCorrectAnswer = sanitizeForFormula(String(d.correctAnswer || '').slice(0, 50));
      const bankItem = starterQuestionMap.get(questionId);
      if (bankItem) {
        verifiedCorrectAnswer = sanitizeForFormula(bankItem.correctAnswer);
      }

      if (outcome === 'first_try') {
        firstTryCorrectCount += 1;
      } else if (outcome === 'after_hint') {
        correctAfterHintCount += 1;
      } else if (outcome === 'after_retry') {
        correctAfterRetryCount += 1;
      } else if (revealedAnswer) {
        revealedAnswerCount += 1;
      }

      validatedDetails.push({
        questionIndex: i + 1,
        questionId: sanitizeForFormula(questionId),
        version: d.version ? String(d.version).slice(0, 20) : 'v1',
        group: validGroups.includes(d.group) ? d.group : group,
        questionSentence,
        firstChoice,
        correctAnswer: verifiedCorrectAnswer,
        attemptsCount,
        hintsUsed,
        revealedAnswer,
        outcome,
        isCorrect: outcome !== 'revealed',
      });
    }

    const totalQuestions = validatedDetails.length;
    const scoreSummary = `${firstTryCorrectCount}/${totalQuestions}`;

    // Package validated data for Google Apps Script
    const appsScriptPayload = {
      secret: sharedSecret,
      attemptId,
      studentId: sanitizeForFormula(studentId),
      group,
      isReview,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      durationSeconds,
      totalQuestions,
      firstTryCorrectCount,
      correctAfterHintCount,
      correctAfterRetryCount,
      revealedAnswerCount,
      scoreSummary,
      details: validatedDetails,
      serverReceivedAt: new Date().toISOString(),
    };

    // Forward to Google Apps Script Web App with AbortSignal timeout (25s)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    let gasResponse: globalThis.Response;
    try {
      gasResponse = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'VuonChuVui-Server/1.0',
        },
        body: JSON.stringify(appsScriptPayload),
        signal: controller.signal,
        redirect: 'follow', // Google Apps Script redirects with 302 to script.googleusercontent.com
      });
    } catch (fetchErr: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (fetchErr as Error)?.name === 'AbortError';
      console.error('Lỗi kết nối tới Google Apps Script:', fetchErr);
      return res.status(504).json({
        ok: false,
        error: isAbort ? 'TIMEOUT' : 'CONNECTION_FAILED',
        message: isAbort
          ? 'Hết thời gian chờ phản hồi từ Google Apps Script (25s). Vui lòng thử lại.'
          : 'Không thể kết nối tới Google Apps Script. Vui lòng kiểm tra đường dẫn hoặc mạng.',
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!gasResponse.ok) {
      console.error('Google Apps Script trả về mã lỗi HTTP:', gasResponse.status);
      return res.status(502).json({
        ok: false,
        error: 'APPS_SCRIPT_HTTP_ERROR',
        message: `Google Apps Script phản hồi mã lỗi HTTP ${gasResponse.status}.`,
      });
    }

    const rawText = await gasResponse.text();
    interface GasResponsePayload {
      ok?: boolean;
      attemptId?: string;
      message?: string;
      error?: string;
    }
    let gasJson: GasResponsePayload;
    try {
      gasJson = JSON.parse(rawText) as GasResponsePayload;
    } catch (parseErr) {
      console.error('Google Apps Script trả về nội dung không phải JSON. URL cuối:', gasResponse.url, 'Nội dung:', rawText.slice(0, 300));
      
      let specificMessage = 'Google Apps Script không trả về định dạng JSON hợp lệ.';
      if (
        gasResponse.url.includes('accounts.google.com') ||
        rawText.includes('ServiceLogin') ||
        rawText.includes('Page not found') ||
        rawText.includes('unable to open the file')
      ) {
        specificMessage = 'Google Apps Script đang yêu cầu đăng nhập. Cô hãy vào lại Apps Script > Triển khai (Deploy) > Quản lý bản triển khai > Chỉnh sửa > Chọn "Ai có quyền truy cập" (Who has access) là "Bất kỳ ai" (Anyone) thay vì "Chỉ mình tôi" nhé!';
      }

      return res.status(502).json({
        ok: false,
        error: 'APPS_SCRIPT_ACCESS_DENIED',
        message: specificMessage,
      });
    }

    if (gasJson && gasJson.ok) {
      return res.json({
        ok: true,
        attemptId,
        message: gasJson.message || 'Kết quả bài làm đã được lưu thành công vào Google Sheets của cô.',
      });
    } else {
      return res.status(400).json({
        ok: false,
        attemptId,
        error: gasJson.error || 'APPS_SCRIPT_REJECTED',
        message: gasJson.message || 'Google Apps Script từ chối lưu kết quả.',
      });
    }
  } catch (err: unknown) {
    console.error('Lỗi máy chủ xử lý nộp kết quả:', err);
    return res.status(500).json({
      ok: false,
      error: 'SERVER_ERROR',
      message: 'Lỗi máy chủ nội bộ khi xử lý kết quả bài làm.',
    });
  }
});

// ==========================================
// VITE OR STATIC SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server "Vườn Chữ Vui" đang chạy trên http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Lỗi khởi động máy chủ:', err);
  process.exit(1);
});
