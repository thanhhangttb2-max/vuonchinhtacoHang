/**
 * Mã nguồn Google Apps Script Code.gs sẵn sàng để giáo viên sao chép và sử dụng
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * VƯỜN CHỮ VUI – BỘ MÃ GOOGLE APPS SCRIPT LƯU KẾT QUẢ VÀO GOOGLE SHEETS
 * Dành cho: Cô Lê Thị Thanh Hằng - Trường Tiểu học Tân Thành Bình
 * 
 * CẤU HÌNH TRONG SCRIPT PROPERTIES:
 * 1. SPREADSHEET_ID: ID của Google Sheets (lấy từ URL bảng tính)
 * 2. SHARED_SECRET: Khóa bí mật đồng bộ với RESULTS_SHARED_SECRET trên máy chủ ứng dụng
 */

var TONG_HOP_HEADERS = [
  'Mã lượt (attemptId)',
  'Thời gian ghi',
  'Thời gian máy chủ',
  'Mã học sinh',
  'Nhóm luyện',
  'Hình thức',
  'Điểm (Đúng L1/Tổng)',
  'Đúng lần 1',
  'Đúng sau gợi ý',
  'Đúng sau thử lại',
  'Đã xem đáp án',
  'Tổng số câu',
  'Thời lượng (giây)',
  'Bắt đầu',
  'Kết thúc'
];

var CHI_TIET_HEADERS = [
  'Mã lượt (attemptId)',
  'Thời gian ghi',
  'Mã học sinh',
  'STT câu',
  'Mã câu hỏi',
  'Phiên bản',
  'Nhóm chữ',
  'Câu văn / Ngữ cảnh',
  'Lựa chọn lần đầu',
  'Đáp án đúng',
  'Số lần thử',
  'Số gợi ý dùng',
  'Đã xem giải thích',
  'Kết quả câu'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  var hasLock = false;

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse(false, '', 'Yêu cầu không có nội dung dữ liệu.', 'EMPTY_PAYLOAD');
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return jsonResponse(false, '', 'Dữ liệu không phải JSON hợp lệ.', 'INVALID_JSON');
    }

    var scriptProperties = PropertiesService.getScriptProperties();
    var expectedSecret = scriptProperties.getProperty('SHARED_SECRET');
    if (!expectedSecret) {
      return jsonResponse(false, data.attemptId || '', 'Chưa cấu hình SHARED_SECRET trong Script Properties.', 'SERVER_CONFIG_ERROR');
    }

    if (!data.secret || String(data.secret) !== String(expectedSecret)) {
      return jsonResponse(false, data.attemptId || '', 'Khóa xác thực không hợp lệ.', 'UNAUTHORIZED');
    }

    var spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) {
      return jsonResponse(false, data.attemptId || '', 'Chưa cấu hình SPREADSHEET_ID trong Script Properties.', 'SERVER_CONFIG_ERROR');
    }

    var attemptId = String(data.attemptId || '').trim();
    if (!attemptId || !/^[a-zA-Z0-9_-]{8,64}$/.test(attemptId)) {
      return jsonResponse(false, attemptId, 'Mã lượt học attemptId không hợp lệ.', 'INVALID_ATTEMPT_ID');
    }

    hasLock = lock.tryLock(30000);
    if (!hasLock) {
      return jsonResponse(false, attemptId, 'Hệ thống đang bận ghi bài từ học sinh khác. Vui lòng thử lại sau vài giây.', 'BUSY');
    }

    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheetTongHop = getOrCreateSheet(ss, 'TongHop', TONG_HOP_HEADERS);
    var sheetChiTiet = getOrCreateSheet(ss, 'ChiTiet', CHI_TIET_HEADERS);

    var nowStr = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd HH:mm:ss');
    var serverReceivedAt = sanitizeCell(data.serverReceivedAt || '');

    var thValues = sheetTongHop.getDataRange().getValues();
    var existingThIndex = -1;
    for (var r = 1; r < thValues.length; r++) {
      if (String(thValues[r][0]) === attemptId) {
        existingThIndex = r;
        break;
      }
    }

    if (existingThIndex === -1) {
      sheetTongHop.appendRow([
        sanitizeCell(attemptId),
        nowStr,
        serverReceivedAt,
        sanitizeCell(data.studentId),
        sanitizeCell(data.group),
        sanitizeCell(data.isReview ? 'Ôn lại' : 'Lượt mới'),
        sanitizeCell(data.scoreSummary),
        Number(data.firstTryCorrectCount) || 0,
        Number(data.correctAfterHintCount) || 0,
        Number(data.correctAfterRetryCount) || 0,
        Number(data.revealedAnswerCount) || 0,
        Number(data.totalQuestions) || 0,
        Number(data.durationSeconds) || 0,
        sanitizeCell(data.startTime || ''),
        sanitizeCell(data.endTime || '')
      ]);
    }

    var ctValues = sheetChiTiet.getDataRange().getValues();
    var existingQuestions = {};
    for (var c = 1; c < ctValues.length; c++) {
      if (String(ctValues[c][0]) === attemptId) {
        var qId = String(ctValues[c][4]);
        existingQuestions[qId] = true;
      }
    }

    var details = Array.isArray(data.details) ? data.details : [];
    var newDetailRows = [];

    for (var k = 0; k < details.length; k++) {
      var item = details[k];
      var questionId = String(item.questionId || ('q_' + (k + 1)));

      if (!existingQuestions[questionId]) {
        var outcomeText = item.outcome === 'first_try'
          ? 'Đúng lần 1'
          : item.outcome === 'after_hint'
          ? 'Đúng sau gợi ý'
          : item.outcome === 'after_retry'
          ? 'Đúng sau thử lại'
          : 'Đã xem giải thích';

        newDetailRows.push([
          sanitizeCell(attemptId),
          nowStr,
          sanitizeCell(data.studentId),
          Number(item.questionIndex || (k + 1)),
          sanitizeCell(questionId),
          sanitizeCell(item.version || 'v1'),
          sanitizeCell(item.group || data.group),
          sanitizeCell(item.questionSentence || ''),
          sanitizeCell(item.firstChoice || ''),
          sanitizeCell(item.correctAnswer || ''),
          Number(item.attemptsCount) || 1,
          Number(item.hintsUsed) || 0,
          item.revealedAnswer ? 'Có' : 'Không',
          sanitizeCell(outcomeText)
        ]);
      }
    }

    if (newDetailRows.length > 0) {
      var startRow = sheetChiTiet.getLastRow() + 1;
      sheetChiTiet.getRange(startRow, 1, newDetailRows.length, newDetailRows[0].length).setValues(newDetailRows);
    }

    SpreadsheetApp.flush();

    var msg = (existingThIndex !== -1 && newDetailRows.length === 0)
      ? 'Dữ liệu lượt học này đã được lưu đầy đủ trước đó (Đồng bộ thành công).'
      : 'Đã lưu thành công kết quả bài làm vào bảng tính Google Sheets.';

    return jsonResponse(true, attemptId, msg);

  } catch (err) {
    console.error('Lỗi khi xử lý doPost:', err);
    return jsonResponse(false, '', 'Lỗi khi ghi kết quả vào bảng tính: ' + err.message, 'INTERNAL_ERROR');
  } finally {
    if (hasLock) {
      try {
        lock.releaseLock();
      } catch (e) {
        console.error('Lỗi giải phóng lock:', e);
      }
    }
  }
}

function doGet(e) {
  return jsonResponse(false, '', 'API không hỗ trợ đọc kết quả công khai để bảo vệ dữ liệu học sinh.', 'METHOD_NOT_ALLOWED');
}

function getOrCreateSheet(spreadsheet, sheetName, headers) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground(sheetName === 'TongHop' ? '#047857' : '#0284c7');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sanitizeCell(val) {
  if (val === null || val === undefined) return '';
  var str = String(val).trim();
  if (/^[=+\-@\\t\\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function jsonResponse(ok, attemptId, message, error) {
  var payload = {
    ok: Boolean(ok),
    attemptId: attemptId || '',
    message: message || '',
    timestamp: new Date().toISOString()
  };
  if (error) {
    payload.error = error;
  }
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
