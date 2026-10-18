import { PracticeSessionRecord, SubmissionResponse } from '../types';
import {
  savePendingSubmission,
  updatePendingSubmissionStatus,
  savePracticeSession,
} from './storage';

export interface ConfigStatusResponse {
  ok: boolean;
  configured: boolean;
  hasUrl: boolean;
  hasSecret: boolean;
  message?: string;
}

/**
 * Kiểm tra xem máy chủ đã được cấu hình kết nối Google Apps Script chưa
 */
export async function checkServerConfigStatus(): Promise<ConfigStatusResponse> {
  try {
    const res = await fetch('/api/config-status', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return { ok: false, configured: false, hasUrl: false, hasSecret: false };
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Không thể kiểm tra cấu hình máy chủ:', err);
    return { ok: false, configured: false, hasUrl: false, hasSecret: false };
  }
}

/**
 * Gửi kết quả bài làm của học sinh qua máy chủ ứng dụng tới Google Sheets
 * - Đảm bảo attemptId duy nhất và không đổi khi thử gửi lại
 * - Lưu bản chờ (pending) trong localStorage để không mất khi rớt mạng
 * - Chỉ xác nhận thành công khi máy chủ trả về 200 và ok: true
 */
export async function submitSessionToGoogleSheets(
  session: PracticeSessionRecord
): Promise<SubmissionResponse> {
  const attemptId = session.attemptId || session.id;

  // 1. Lưu bản chờ vào localStorage với trạng thái 'submitting'
  savePendingSubmission({
    attemptId,
    session,
    status: 'submitting',
    lastAttemptAt: Date.now(),
  });

  try {
    const payload = {
      attemptId,
      studentId: session.studentId,
      group: session.group,
      isReview: session.isReview,
      startTime: session.startTime || session.timestamp,
      endTime: session.endTime || Date.now(),
      details: session.details.map((d, idx) => ({
        questionIndex: idx + 1,
        questionId: d.questionId,
        version: d.version ? String(d.version) : 'v1',
        group: d.group || session.group,
        questionSentence: d.questionSentence,
        firstChoice: d.firstChoice,
        correctAnswer: d.correctAnswer,
        attemptsCount: d.attempts?.length || 1,
        hintsUsed: d.hintsUsed || 0,
        revealedAnswer: Boolean(d.revealedAnswer || d.outcome === 'revealed'),
        outcome: d.outcome,
        isCorrect: d.isCorrect,
      })),
    };

    const res = await fetch('/api/submit-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    let json: SubmissionResponse;
    try {
      json = await res.json();
    } catch {
      const errorMsg = `Máy chủ trả về phản hồi không hợp lệ (HTTP ${res.status}).`;
      updatePendingSubmissionStatus(attemptId, 'error', errorMsg);
      return { ok: false, attemptId, error: 'INVALID_SERVER_RESPONSE', message: errorMsg };
    }

    if (res.ok && json.ok) {
      // Thành công thực sự: cập nhật trạng thái session và pending
      updatePendingSubmissionStatus(attemptId, 'success', undefined);
      
      const submittedTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ngày ' + new Date().toLocaleDateString('vi-VN');
      session.isSubmitted = true;
      session.submittedAt = submittedTime;
      session.submissionStatus = 'success';
      session.submissionMessage = json.message || 'Đã lưu kết quả thành công vào Google Sheets của cô.';
      savePracticeSession(session);

      return {
        ok: true,
        attemptId,
        message: json.message || 'Kết quả đã được ghi vào Google Sheets thành công.',
      };
    } else {
      // Lỗi do máy chủ hoặc Apps Script báo về
      const errorMsg = json.message || 'Lỗi khi gửi kết quả lên Google Sheets.';
      const statusType = json.error === 'NOT_CONFIGURED' ? 'not_configured' : 'error';
      updatePendingSubmissionStatus(attemptId, statusType, errorMsg);

      session.submissionStatus = statusType;
      session.submissionError = errorMsg;
      savePracticeSession(session);

      return {
        ok: false,
        attemptId,
        error: json.error || 'SUBMISSION_FAILED',
        message: errorMsg,
      };
    }
  } catch (err: unknown) {
    // Lỗi mạng, mất kết nối, timeout
    const networkMsg = 'Không thể kết nối tới máy chủ (mất mạng hoặc lỗi kết nối). Kết quả bài làm vẫn được giữ an toàn trên thiết bị của em để gửi lại.';
    updatePendingSubmissionStatus(attemptId, 'error', networkMsg);

    session.submissionStatus = 'error';
    session.submissionError = networkMsg;
    savePracticeSession(session);

    return {
      ok: false,
      attemptId,
      error: 'NETWORK_ERROR',
      message: networkMsg,
    };
  }
}
