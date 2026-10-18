import { QuestionItem, PracticeSessionRecord, StudentHistory, AppSettings, QuestionStatus, PendingSubmissionItem } from '../types';
import { STARTER_QUESTIONS } from '../data/starterQuestions';

const STORAGE_KEYS = {
  QUESTIONS: 'vuon_chu_vui_questions_v3',
  QUESTIONS_V2: 'vuon_chu_vui_questions_v2',
  QUESTIONS_V1: 'vuon_chu_vui_questions_v1',
  SESSIONS: 'vuon_chu_vui_sessions_v1',
  STUDENTS: 'vuon_chu_vui_students_v1',
  SETTINGS: 'vuon_chu_vui_settings_v1',
  PENDING_SUBMISSIONS: 'vuon_chu_vui_pending_submissions_v1',
};

const DEFAULT_SETTINGS: AppSettings = {
  questionCountPerRun: 10,
  enableKeyboardMode: true,
  soundEnabled: true,
  reducedMotion: false,
  speechEnabled: true,
  googleDriveFolderUrl: 'https://drive.google.com/drive/folders/1520GupI7gzTCezeHsO8qo-9QaCR3HVFH?usp=sharing',
  teacherEmail: 'thanhhangttb2@gmail.com',
  submissionWebhookUrl: 'https://script.google.com/macros/s/AKfycbyqXM_m_mVqpZ1nwxWYyFkVgXwEddvfJTP2ybcSQYbkSWcNsyY0_RJq-GaKfy2qxZis/exec',
};

// Kiểm tra xem localStorage có dùng được không (đề phòng chế độ ẩn danh bị chặn)
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// Khởi tạo và lấy danh sách câu hỏi
export function getStoredQuestions(): QuestionItem[] {
  if (!isLocalStorageAvailable()) {
    return STARTER_QUESTIONS;
  }

  try {
    const rawV3 = window.localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (rawV3) {
      const parsed = JSON.parse(rawV3);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    // Nâng cấp từ v2 hoặc v1 nếu có: giữ lại trạng thái duyệt hoặc ẩn của giáo viên
    const rawPrev = window.localStorage.getItem(STORAGE_KEYS.QUESTIONS_V2) || window.localStorage.getItem(STORAGE_KEYS.QUESTIONS_V1);
    let initialList = STARTER_QUESTIONS;

    if (rawPrev) {
      try {
        const parsedPrev = JSON.parse(rawPrev);
        if (Array.isArray(parsedPrev)) {
          const statusMap = new Map<string, QuestionStatus>();
          parsedPrev.forEach((q: QuestionItem) => {
            if (q.id && q.status) statusMap.set(q.id, q.status);
          });

          // Áp dụng trạng thái đã duyệt sang bộ câu hỏi mới (đã cập nhật nguyên tiếng có nghĩa)
          initialList = STARTER_QUESTIONS.map(q => ({
            ...q,
            status: statusMap.get(q.id) || q.status,
          }));

          // Giữ lại các câu hỏi tùy chỉnh do giáo viên tự tạo (bắt đầu bằng custom_)
          const customQuestions = parsedPrev.filter((q: QuestionItem) => q.id && q.id.startsWith('custom_'));
          if (customQuestions.length > 0) {
            initialList = [...initialList, ...customQuestions];
          }
        }
      } catch {
        // Bỏ qua lỗi đọc dữ liệu cũ
      }
    }

    window.localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(initialList));
    return initialList;
  } catch (e) {
    console.error('Không thể đọc câu hỏi từ bộ nhớ trình duyệt:', e);
    return STARTER_QUESTIONS;
  }
}

// Lưu danh sách câu hỏi
export function saveStoredQuestions(questions: QuestionItem[]): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
    return true;
  } catch (e) {
    console.error('Lỗi khi lưu câu hỏi vào bộ nhớ trình duyệt:', e);
    return false;
  }
}

// Duyệt 1 câu
export function approveQuestion(id: string): QuestionItem[] {
  const current = getStoredQuestions();
  const updated = current.map(q => q.id === id ? { ...q, status: 'approved' as const, version: q.version + 1 } : q);
  saveStoredQuestions(updated);
  return updated;
}

// Ẩn 1 câu
export function toggleHideQuestion(id: string): QuestionItem[] {
  const current = getStoredQuestions();
  const updated = current.map(q => {
    if (q.id === id) {
      const nextStatus: QuestionStatus = q.status === 'hidden' ? 'draft' : 'hidden';
      return { ...q, status: nextStatus, version: q.version + 1 };
    }
    return q;
  });
  saveStoredQuestions(updated);
  return updated;
}

// Duyệt tất cả câu mẫu
export function approveAllQuestions(): QuestionItem[] {
  const current = getStoredQuestions();
  const updated = current.map(q => ({ ...q, status: 'approved' as const }));
  saveStoredQuestions(updated);
  return updated;
}

// Đặt lại ngân hàng câu hỏi về mặc định ban đầu
export function resetQuestionBank(statusMode: 'draft' | 'approved' = 'draft'): QuestionItem[] {
  const resetList: QuestionItem[] = STARTER_QUESTIONS.map(q => ({
    ...q,
    status: statusMode as QuestionStatus,
  }));
  saveStoredQuestions(resetList);
  return resetList;
}

// Lấy danh sách câu hỏi đã duyệt dành cho học sinh
export function getApprovedQuestions(): QuestionItem[] {
  const all = getStoredQuestions();
  return all.filter(q => q.status === 'approved');
}

// Quản lý Lịch sử bài luyện tập
export function getStoredSessions(): PracticeSessionRecord[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Lỗi khi đọc lịch sử luyện tập:', e);
    return [];
  }
}

export function savePracticeSession(session: PracticeSessionRecord): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    const sessions = getStoredSessions();
    const existingIndex = sessions.findIndex(
      s => (session.attemptId && s.attemptId === session.attemptId) || s.id === session.id
    );
    let updated: PracticeSessionRecord[];
    if (existingIndex !== -1) {
      updated = [...sessions];
      updated[existingIndex] = { ...updated[existingIndex], ...session };
    } else {
      updated = [session, ...sessions];
    }
    window.localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Lỗi khi lưu kết quả bài tập:', e);
    return false;
  }
}

export function clearStoredSessions(): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    window.localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    return true;
  } catch (e) {
    console.error('Lỗi khi dọn dẹp lịch sử:', e);
    return false;
  }
}

// Quản lý các bản chờ gửi (Pending Submissions) để đảm bảo không mất dữ liệu
export function getPendingSubmissions(): Record<string, PendingSubmissionItem> {
  if (!isLocalStorageAvailable()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.PENDING_SUBMISSIONS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getPendingSubmission(attemptId: string): PendingSubmissionItem | null {
  const all = getPendingSubmissions();
  return all[attemptId] || null;
}

export function savePendingSubmission(item: PendingSubmissionItem): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const all = getPendingSubmissions();
    all[item.attemptId] = item;
    window.localStorage.setItem(STORAGE_KEYS.PENDING_SUBMISSIONS, JSON.stringify(all));
  } catch (e) {
    console.error('Lỗi khi lưu bản chờ gửi:', e);
  }
}

export function updatePendingSubmissionStatus(
  attemptId: string,
  status: PendingSubmissionItem['status'],
  errorMsg?: string
): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const all = getPendingSubmissions();
    if (all[attemptId]) {
      all[attemptId].status = status;
      all[attemptId].lastAttemptAt = Date.now();
      if (errorMsg !== undefined) all[attemptId].errorMsg = errorMsg;
      if (status === 'success') {
        all[attemptId].successAt = new Date().toISOString();
      }
      window.localStorage.setItem(STORAGE_KEYS.PENDING_SUBMISSIONS, JSON.stringify(all));
    }
  } catch (e) {
    console.error('Lỗi cập nhật trạng thái bản chờ:', e);
  }
}

export function removePendingSubmission(attemptId: string): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const all = getPendingSubmissions();
    delete all[attemptId];
    window.localStorage.setItem(STORAGE_KEYS.PENDING_SUBMISSIONS, JSON.stringify(all));
  } catch (e) {
    console.error('Lỗi xóa bản chờ gửi:', e);
  }
}

// Quản lý tiến độ học sinh theo mã
export function getStudentHistories(): Record<string, StudentHistory> {
  if (!isLocalStorageAvailable()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getStudentHistory(studentId: string): StudentHistory {
  const trimmed = studentId.trim();
  const all = getStudentHistories();
  if (all[trimmed]) return all[trimmed];
  return {
    studentId: trimmed,
    seenQuestionIds: [],
    missedQuestionIds: [],
    completedSessions: 0,
  };
}

export function recordStudentProgress(
  studentId: string,
  seenIds: string[],
  missedIds: string[]
): void {
  if (!isLocalStorageAvailable()) return;
  const trimmed = studentId.trim();
  if (!trimmed) return;

  const all = getStudentHistories();
  const current = all[trimmed] || {
    studentId: trimmed,
    seenQuestionIds: [],
    missedQuestionIds: [],
    completedSessions: 0,
  };

  // Hợp nhất các ID đã gặp
  const updatedSeen = Array.from(new Set([...current.seenQuestionIds, ...seenIds]));
  // Hợp nhất các câu sai cần luyện lại
  const updatedMissed = Array.from(new Set([...current.missedQuestionIds, ...missedIds]));

  all[trimmed] = {
    studentId: trimmed,
    seenQuestionIds: updatedSeen,
    missedQuestionIds: updatedMissed,
    lastSessionTime: Date.now(),
    completedSessions: (current.completedSessions || 0) + 1,
  };

  try {
    window.localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(all));
  } catch (e) {
    console.error('Lỗi khi lưu tiến độ học sinh:', e);
  }
}

// Cài đặt ứng dụng
export function getAppSettings(): AppSettings {
  if (!isLocalStorageAvailable()) return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    const driveUrl =
      !parsed.googleDriveFolderUrl || parsed.googleDriveFolderUrl === 'https://drive.google.com/drive/home'
        ? DEFAULT_SETTINGS.googleDriveFolderUrl
        : parsed.googleDriveFolderUrl;
    const teacherEmail = parsed.teacherEmail || DEFAULT_SETTINGS.teacherEmail;
    return { ...DEFAULT_SETTINGS, ...parsed, googleDriveFolderUrl: driveUrl, teacherEmail };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAppSettings(settings: Partial<AppSettings>): AppSettings {
  const current = getAppSettings();
  const updated = { ...current, ...settings };
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    } catch (e) {
      console.error('Lỗi khi lưu cài đặt:', e);
    }
  }
  return updated;
}
