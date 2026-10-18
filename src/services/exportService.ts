import { PracticeSessionRecord, QuestionItem } from '../types';

/**
 * Ngăn chặn lỗi CSV Formula Injection (khi mở bằng Excel)
 * Nếu ô dữ liệu bắt đầu bằng =, +, -, @ thì thêm dấu ' ở đầu
 */
function sanitizeCsvCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return '""';
  let str = String(value);

  // Kiểm tra kí tự đầu tiên có khả năng kích hoạt công thức
  if (/^[=\+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // Escape dấu ngoặc kép bằng cách nhân đôi ""
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Xuất danh sách kết quả luyện tập ra file CSV UTF-8 kèm BOM
 */
export function exportSessionsToCsv(sessions: PracticeSessionRecord[]): void {
  if (sessions.length === 0) {
    alert('Chưa có dữ liệu kết quả để xuất.');
    return;
  }

  const headers = [
    'Mã học sinh',
    'Thời gian',
    'Nội dung luyện',
    'Hình thức',
    'Tổng số câu',
    'Đúng lần đầu (không gợi ý)',
    'Đúng sau gợi ý',
    'Đúng sau thử lại',
    'Đã xem đáp án',
    'Trạng thái',
  ];

  const rows = sessions.map(s => {
    const groupName = s.group === 'mixed' ? 'Khu vườn tổng hợp' : s.group.replace('_', ' / ');
    const mode = s.isReview ? 'Ôn lại câu sai' : 'Lượt mới';
    const status = s.completed ? 'Hoàn thành' : 'Đang dở dang';

    return [
      sanitizeCsvCell(s.studentId),
      sanitizeCsvCell(s.dateFormatted || new Date(s.timestamp).toLocaleString('vi-VN')),
      sanitizeCsvCell(groupName),
      sanitizeCsvCell(mode),
      sanitizeCsvCell(s.totalQuestions),
      sanitizeCsvCell(s.firstTryCorrectCount),
      sanitizeCsvCell(s.correctAfterHintCount),
      sanitizeCsvCell(s.correctAfterRetryCount),
      sanitizeCsvCell(s.revealedAnswerCount),
      sanitizeCsvCell(status),
    ].join(',');
  });

  // UTF-8 BOM: \uFEFF giúp Excel hiển thị đúng font tiếng Việt
  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ket_qua_chinh_ta_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Xuất 1 phiên làm bài cụ thể của học sinh kèm chi tiết từng câu
 */
export function downloadSingleSessionCsv(session: PracticeSessionRecord): void {
  const headers = [
    'Mã học sinh',
    'Thời gian',
    'Nội dung',
    'Hình thức',
    'Tổng câu',
    'Đúng lần 1',
    'Đúng sau gợi ý/thử lại',
    'Đã xem đáp án',
  ];

  const groupName = session.group === 'mixed' ? 'Khu vườn tổng hợp' : session.group.replace('_', ' / ');
  const mode = session.isReview ? 'Ôn lại câu sai' : 'Lượt mới';

  const summaryRow = [
    sanitizeCsvCell(session.studentId),
    sanitizeCsvCell(session.dateFormatted || new Date(session.timestamp).toLocaleString('vi-VN')),
    sanitizeCsvCell(groupName),
    sanitizeCsvCell(mode),
    sanitizeCsvCell(session.totalQuestions),
    sanitizeCsvCell(session.firstTryCorrectCount),
    sanitizeCsvCell(session.correctAfterHintCount + session.correctAfterRetryCount),
    sanitizeCsvCell(session.revealedAnswerCount),
  ].join(',');

  const detailHeaders = [
    '',
    'STT',
    'Câu hỏi / Ngữ cảnh',
    'Lựa chọn lần đầu',
    'Số lần thử',
    'Dùng gợi ý',
    'Kết quả',
  ];

  const detailRows = session.details.map((d, idx) => {
    const outcomeText = d.outcome === 'first_try'
      ? 'Đúng lần đầu'
      : d.outcome === 'after_hint'
      ? 'Đúng sau gợi ý'
      : d.outcome === 'after_retry'
      ? 'Đúng sau thử lại'
      : 'Đã xem đáp án';

    return [
      '',
      sanitizeCsvCell(idx + 1),
      sanitizeCsvCell(d.questionSentence),
      sanitizeCsvCell(d.firstChoice),
      sanitizeCsvCell(d.attempts.length),
      sanitizeCsvCell(d.hintsUsed > 0 ? 'Có' : 'Không'),
      sanitizeCsvCell(outcomeText),
    ].join(',');
  });

  const allLines = [
    headers.join(','),
    summaryRow,
    '',
    detailHeaders.join(','),
    ...detailRows,
  ];

  const csvContent = '\uFEFF' + allLines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Ket_qua_${session.studentId}_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Định dạng báo cáo văn bản tóm tắt để sao chép vào Google Drive Docs hoặc gửi cho giáo viên
 */
export function formatSessionSummaryText(session: PracticeSessionRecord): string {
  const groupName = session.group === 'mixed' ? 'Khu vườn tổng hợp' : `Nhóm ${session.group.replace('_', ' / ')}`;
  const time = session.dateFormatted || new Date(session.timestamp).toLocaleString('vi-VN');

  let text = `🌱 KẾT QUẢ LUYỆN CHÍNH TẢ - VƯỜN CHỮ VUI 🌱\n`;
  text += `• Mã học sinh: ${session.studentId}\n`;
  text += `• Thời gian: ${time}\n`;
  text += `• Nội dung: ${groupName} (${session.isReview ? 'Ôn lại' : 'Lượt mới'})\n`;
  text += `• Đúng lần đầu: ${session.firstTryCorrectCount}/${session.totalQuestions} câu\n`;
  text += `• Đúng sau hỗ trợ: ${session.correctAfterHintCount + session.correctAfterRetryCount} câu\n`;
  text += `• Đã xem đáp án: ${session.revealedAnswerCount} câu\n`;
  text += `\nChi tiết các câu đã luyện:\n`;

  session.details.forEach((d, idx) => {
    const status = d.outcome === 'first_try'
      ? '✅ Đúng lần 1'
      : d.outcome === 'revealed'
      ? '📖 Đã xem giải thích'
      : '⭐ Đúng sau hỗ trợ';
    text += `${idx + 1}. "${d.questionSentence}" -> ${status} (Lựa chọn đầu: ${d.firstChoice})\n`;
  });

  text += `\nLưu trữ vào Google Drive của cô: https://drive.google.com/drive/folders/1520GupI7gzTCezeHsO8qo-9QaCR3HVFH?usp=sharing`;
  return text;
}

/**
 * Xuất ngân hàng câu hỏi thành tệp JSON sao lưu
 */
export function exportQuestionsToJson(questions: QuestionItem[]): void {
  const jsonContent = JSON.stringify(questions, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ngan_hang_cau_hoi_chinh_ta_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Kiểm tra tính hợp lệ của tệp JSON ngân hàng câu hỏi khi nhập vào
 */
export function validateImportedQuestions(jsonString: string): { valid: boolean; questions: QuestionItem[]; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { valid: false, questions: [], error: 'Dữ liệu không phải là một danh sách câu hỏi.' };
    }

    if (parsed.length === 0) {
      return { valid: false, questions: [], error: 'Tệp rỗng, không có câu hỏi nào.' };
    }

    const validQuestions: QuestionItem[] = [];

    for (let i = 0; i < parsed.length; i++) {
      const q = parsed[i];
      if (!q.id || !q.group || !q.sentence || !q.correctAnswer || !Array.isArray(q.options)) {
        return { valid: false, questions: [], error: `Câu hỏi thứ ${i + 1} thiếu các trường bắt buộc (id, group, sentence, options, correctAnswer).` };
      }
      validQuestions.push({
        id: String(q.id),
        group: q.group,
        questionType: q.questionType || 'choose_word',
        supportLevel: q.supportLevel || 'standard',
        sentence: String(q.sentence),
        targetWord: q.targetWord ? String(q.targetWord) : undefined,
        options: q.options.map(String),
        correctAnswer: String(q.correctAnswer),
        completedSentence: q.completedSentence ? String(q.completedSentence) : String(q.sentence),
        explanation: q.explanation ? String(q.explanation) : 'Từ ngữ phù hợp trong ngữ cảnh câu này.',
        specificFeedbacks: q.specificFeedbacks || {},
        hint: q.hint ? String(q.hint) : 'Đọc kĩ ngữ cảnh của câu để lựa chọn.',
        illustrationKey: q.illustrationKey || 'chan_am',
        imageAlt: q.imageAlt || 'Hình ảnh minh họa',
        status: q.status === 'approved' ? 'approved' : q.status === 'hidden' ? 'hidden' : 'draft',
        version: Number(q.version || 1),
        pairLetters: q.pairLetters,
        findFixDetails: q.findFixDetails,
      });
    }

    return { valid: true, questions: validQuestions };
  } catch {
    return { valid: false, questions: [], error: 'Tệp tải lên không đúng định dạng JSON hợp lệ.' };
  }
}
