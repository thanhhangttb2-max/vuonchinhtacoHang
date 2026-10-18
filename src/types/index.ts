export type SpellingGroup = 'ch_tr' | 'd_gi' | 'v_d' | 'th_h' | 'r_g';

export type QuestionType =
  | 'missing_letters'  // Điền nguyên tiếng có nghĩa vào chỗ trống
  | 'choose_word'      // Chọn từ phù hợp với câu
  | 'match_image'      // Ghép từ với tranh
  | 'find_fix'         // Tìm và sửa lỗi chính tả
  | 'keyboard_type';   // Điền chữ bằng bàn phím hỗ trợ

export type SupportLevel = 'standard' | 'guided' | 'advanced';

export type QuestionStatus = 'draft' | 'approved' | 'hidden';

export interface QuestionItem {
  id: string;
  group: SpellingGroup;
  questionType: QuestionType;
  supportLevel: SupportLevel;
  sentence: string;                // Câu có chỗ trống hoặc câu cần kiểm tra
  targetWord?: string;             // Từ khóa trọng tâm
  options: string[];               // Các phương án lựa chọn
  correctAnswer: string;           // Đáp án chính xác
  completedSentence: string;       // Câu hoàn chỉnh đúng chính tả
  explanation: string;             // Giải thích ngắn 2-3 câu trong ngữ cảnh
  specificFeedbacks: Record<string, string>; // Phản hồi riêng cho từng phương án sai
  hint: string;                    // Gợi ý nhẹ nhàng
  illustrationKey: string;         // Khóa định danh hình minh họa SVG
  imageAlt: string;                // Mô tả văn bản cho hình
  status: QuestionStatus;          // 'draft' (cần giáo viên duyệt) | 'approved' | 'hidden'
  version: number;
  pairLetters?: [string, string];  // Nhóm chữ liên quan, ví dụ ['ch', 'tr']
  // Dành riêng cho dạng tìm và sửa lỗi:
  findFixDetails?: {
    wordsInSentence: string[];     // Danh sách các từ trong câu để nhấp chọn
    errorWordIndex: number;        // Vị trí từ sai
    errorWord: string;             // Từ bị viết sai
    correctWord: string;           // Từ viết đúng
    fixOptions: string[];          // Phương án sửa (ví dụ: ["chăn", "trăn"])
  };
}

export interface QuestionAttemptDetail {
  questionId: string;
  version?: number | string;
  group: SpellingGroup;
  questionSentence: string;
  firstChoice: string;
  correctAnswer?: string;
  attempts: string[];
  hintsUsed: number;
  revealedAnswer: boolean;
  isCorrect: boolean;
  outcome: 'first_try' | 'after_hint' | 'after_retry' | 'revealed';
}

export interface PracticeSessionRecord {
  id: string;
  studentId: string;
  timestamp: number;
  dateFormatted: string;
  group: SpellingGroup | 'mixed';
  isReview: boolean;
  completed: boolean;
  totalQuestions: number;
  firstTryCorrectCount: number;
  correctAfterHintCount: number;
  correctAfterRetryCount: number;
  revealedAnswerCount: number;
  groupBreakdown: Record<SpellingGroup, {
    total: number;
    firstTryCorrect: number;
    neededSupport: number;
    revealed: number;
  }>;
  details: QuestionAttemptDetail[];
  attemptId?: string; // Mã lượt duy nhất để đối chiếu và chống trùng lặp (Idempotent)
  startTime?: number; // Thời điểm bắt đầu làm bài
  endTime?: number;   // Thời điểm hoàn thành bài
  isSubmitted?: boolean;
  submittedAt?: string;
  submissionStatus?: 'idle' | 'submitting' | 'success' | 'error' | 'not_configured';
  submissionError?: string;
  submissionMessage?: string;
}

export interface PendingSubmissionItem {
  attemptId: string;
  session: PracticeSessionRecord;
  status: 'idle' | 'submitting' | 'success' | 'error' | 'not_configured';
  errorMsg?: string;
  lastAttemptAt?: number;
  successAt?: string;
}

export interface SubmissionResponse {
  ok: boolean;
  attemptId?: string;
  message?: string;
  error?: string;
}

export interface StudentHistory {
  studentId: string;
  seenQuestionIds: string[];
  missedQuestionIds: string[];
  lastSessionTime?: number;
  completedSessions: number;
}

export interface AppSettings {
  questionCountPerRun: 5 | 10 | 15;
  enableKeyboardMode: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
  speechEnabled: boolean;
  googleDriveFolderUrl?: string; // Đường dẫn Google Drive của cô giáo (mặc định https://drive.google.com/drive/folders/1520GupI7gzTCezeHsO8qo-9QaCR3HVFH?usp=sharing)
  submissionWebhookUrl?: string; // Tùy chọn webhook Google Form / Google Apps Script
  teacherEmail?: string; // Email cô giáo nhận bài (mặc định thanhhangttb2@gmail.com)
}

export const SPELLING_GROUP_LABELS: Record<SpellingGroup, { title: string; short: string; description: string }> = {
  ch_tr: {
    title: 'Phân biệt ch / tr',
    short: 'ch / tr',
    description: 'Luyện chọn chữ ch hoặc tr theo đúng ngữ cảnh đồ vật, hành động, thiên nhiên.',
  },
  d_gi: {
    title: 'Phân biệt d / gi',
    short: 'd / gi',
    description: 'Luyện dùng chữ d và gi trong các từ quen thuộc như da, gió, dưa, giày.',
  },
  v_d: {
    title: 'Phân biệt v / d',
    short: 'v / d',
    description: 'Luyện nhận biết v và d trong các từ ngữ gắn với đời sống học sinh.',
  },
  th_h: {
    title: 'Phân biệt th / h',
    short: 'th / h',
    description: 'Nhóm chữ khảo sát: luyện viết đúng th hay h theo ý nghĩa từng câu.',
  },
  r_g: {
    title: 'Phân biệt r / g',
    short: 'r / g',
    description: 'Nhóm chữ khảo sát: phân biệt r và g qua các từ chỉ sự vật quen thuộc.',
  },
};
