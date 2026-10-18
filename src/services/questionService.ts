import { QuestionItem, SpellingGroup } from '../types';
import { getApprovedQuestions, getStudentHistory } from './storage';

// Hàm xáo trộn mảng thuật toán Fisher-Yates
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface QuestionSelectionResult {
  questions: QuestionItem[];
  isShortage: boolean;
  availableCount: number;
  requestedCount: number;
  unapprovedCount: number;
}

/**
 * Chọn câu hỏi ngẫu nhiên và thông minh cho lượt luyện tập:
 * - Chỉ lấy câu đã được giáo viên duyệt (approved)
 * - Không lặp ID câu hỏi trong một lượt
 * - Ưu tiên câu học sinh chưa gặp
 * - Xáo trộn phương án lựa chọn mà không làm mất đáp án đúng
 * - Phân bổ đều các nhóm khi luyện tổng hợp
 */
export function selectQuestionsForSession(
  studentId: string,
  selectedGroup: SpellingGroup | 'mixed',
  requestedCount: number,
  isReviewMode: boolean = false
): QuestionSelectionResult {
  const approvedList = getApprovedQuestions();
  const studentHistory = getStudentHistory(studentId);
  const seenIds = new Set(studentHistory.seenQuestionIds || []);
  const missedIds = new Set(studentHistory.missedQuestionIds || []);

  let pool: QuestionItem[] = [];

  if (isReviewMode) {
    // Chế độ ôn lại các câu đã từng làm sai
    pool = approvedList.filter(q => missedIds.has(q.id));
    if (selectedGroup !== 'mixed') {
      pool = pool.filter(q => q.group === selectedGroup);
    }
  } else if (selectedGroup === 'mixed') {
    // Chế độ tổng hợp: phân bổ đều 5 nhóm
    const groups: SpellingGroup[] = ['ch_tr', 'd_gi', 'v_d', 'th_h', 'r_g'];
    const perGroupTarget = Math.max(1, Math.floor(requestedCount / groups.length));
    const selected: QuestionItem[] = [];

    groups.forEach(grp => {
      const groupPool = approvedList.filter(q => q.group === grp);
      // Ưu tiên câu chưa gặp
      const unSeens = groupPool.filter(q => !seenIds.has(q.id));
      const seens = groupPool.filter(q => seenIds.has(q.id));
      const sortedPool = [...shuffleArray(unSeens), ...shuffleArray(seens)];

      selected.push(...sortedPool.slice(0, perGroupTarget));
    });

    // Nếu còn thiếu để đạt requestedCount, bổ sung thêm từ các câu còn lại
    if (selected.length < requestedCount) {
      const selectedIdSet = new Set(selected.map(q => q.id));
      const remainingPool = approvedList.filter(q => !selectedIdSet.has(q.id));
      const extraUnseens = remainingPool.filter(q => !seenIds.has(q.id));
      const extraSeens = remainingPool.filter(q => seenIds.has(q.id));
      const extraSorted = [...shuffleArray(extraUnseens), ...shuffleArray(extraSeens)];

      selected.push(...extraSorted.slice(0, requestedCount - selected.length));
    }

    pool = selected;
  } else {
    // Chế độ theo nhóm đơn
    const groupPool = approvedList.filter(q => q.group === selectedGroup);
    const unSeens = groupPool.filter(q => !seenIds.has(q.id));
    const seens = groupPool.filter(q => seenIds.has(q.id));
    pool = [...shuffleArray(unSeens), ...shuffleArray(seens)];
  }

  const finalPool = pool.slice(0, requestedCount);
  const isShortage = finalPool.length < requestedCount;

  // Xáo trộn thứ tự các câu hỏi và xáo trộn vị trí các phương án trong từng câu
  const preparedQuestions = shuffleArray(finalPool).map(q => {
    return {
      ...q,
      options: shuffleArray(q.options),
    };
  });

  return {
    questions: preparedQuestions,
    isShortage,
    availableCount: finalPool.length,
    requestedCount,
    unapprovedCount: 0,
  };
}
