import React, { useState, useEffect } from 'react';
import { PracticeSessionRecord, SpellingGroup, SPELLING_GROUP_LABELS } from '../types';
import { GardenMascot } from './GardenMascot';
import { ConfettiCanvas } from './ConfettiCanvas';
import {
  Award,
  RotateCcw,
  Play,
  Home,
  CheckCircle2,
  HelpCircle,
  Eye,
  Sparkles,
  Download,
  Copy,
  Check,
  ExternalLink,
  Send,
  UploadCloud,
  CheckCheck,
  X,
  Mail,
  FolderOpen,
  ArrowRight,
  FileSpreadsheet,
  Info,
  AlertTriangle,
  RefreshCw,
  Clock,
} from 'lucide-react';
import {
  getStudentHistory,
  getAppSettings,
  savePracticeSession,
  getPendingSubmission,
} from '../services/storage';
import {
  checkServerConfigStatus,
  submitSessionToGoogleSheets,
} from '../services/submissionService';
import { downloadSingleSessionCsv, formatSessionSummaryText } from '../services/exportService';

interface PracticeSummaryProps {
  session: PracticeSessionRecord;
  reducedMotion: boolean;
  onReviewMissed: () => void;
  onNewSession: () => void;
  onBackToGarden: () => void;
}

export const PracticeSummary: React.FC<PracticeSummaryProps> = ({
  session,
  reducedMotion,
  onReviewMissed,
  onNewSession,
  onBackToGarden,
}) => {
  const [copied, setCopied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // attemptId duy nhất của lượt học, giữ nguyên khi gửi lại
  const attemptId = session.attemptId || session.id;

  // Lấy trạng thái từ bản chờ (nếu có lưu trên máy) hoặc từ session
  const existingPending = getPendingSubmission(attemptId);
  const initialStatus: 'idle' | 'submitting' | 'success' | 'error' | 'not_configured' =
    session.isSubmitted || existingPending?.status === 'success'
      ? 'success'
      : (existingPending?.status || session.submissionStatus || 'idle');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'not_configured'>(initialStatus);
  const [errorMessage, setErrorMessage] = useState<string>(existingPending?.errorMsg || session.submissionError || '');
  const [successMessage, setSuccessMessage] = useState<string>(session.submissionMessage || '');
  const [submittedTime, setSubmittedTime] = useState<string>(
    existingPending?.successAt || session.submittedAt || ''
  );
  const [isServerConfigured, setIsServerConfigured] = useState<boolean | null>(null);

  const studentHistory = getStudentHistory(session.studentId);
  const settings = getAppSettings();
  const driveUrl = settings.googleDriveFolderUrl || 'https://drive.google.com/drive/folders/1520GupI7gzTCezeHsO8qo-9QaCR3HVFH?usp=sharing';

  // Kiểm tra cấu hình máy chủ khi màn hình xuất hiện
  useEffect(() => {
    let isMounted = true;
    checkServerConfigStatus().then((res) => {
      if (!isMounted) return;
      setIsServerConfigured(res.configured);
      if (!res.configured && status !== 'success') {
        setStatus('not_configured');
      }
    });
    return () => {
      isMounted = false;
    };
  }, [status]);

  const previousSessionsCount = studentHistory.completedSessions || 1;

  // Tính toán vinh danh tích cực có căn cứ
  const total = session.totalQuestions;
  const firstTry = session.firstTryCorrectCount;
  const supported = session.correctAfterHintCount + session.correctAfterRetryCount;
  const revealed = session.revealedAnswerCount;

  const isPatientLearner = session.completed;
  const isConfidentSeed = total > 0 && (firstTry / total) >= 0.7;

  // "Bông hoa tiến bộ" CHỈ trao khi có dữ liệu so sánh hợp lý từ các phiên trước
  const isFirstSessionEver = previousSessionsCount <= 1;
  const isProgressFlower = !isFirstSessionEver && (firstTry / Math.max(1, total)) >= 0.6;

  const groups: SpellingGroup[] = ['ch_tr', 'd_gi', 'v_d', 'th_h', 'r_g'];

  const hasMissedQuestions = revealed > 0 || session.details.some(d => !d.isCorrect || d.revealedAnswer);

  // Xử lý gửi kết quả bài làm cho cô giáo qua máy chủ đến Google Sheets
  const handleSendToTeacher = async () => {
    if (status === 'submitting') return;

    // Nếu máy chủ chưa cấu hình, không giả lập thành công!
    if (isServerConfigured === false) {
      setStatus('not_configured');
      setErrorMessage(
        'Máy chủ chưa được cấu hình GOOGLE_APPS_SCRIPT_URL hoặc RESULTS_SHARED_SECRET. Thầy cô hãy thiết lập biến môi trường.'
      );
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const res = await submitSessionToGoogleSheets(session);

    if (res.ok) {
      setStatus('success');
      const timeStr =
        new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
        ' ngày ' +
        new Date().toLocaleDateString('vi-VN');
      setSubmittedTime(timeStr);
      setSuccessMessage(res.message || 'Kết quả bài làm đã được lưu thành công vào Google Sheets của cô.');
      setShowSuccessModal(true);
    } else {
      if (res.error === 'NOT_CONFIGURED') {
        setStatus('not_configured');
      } else {
        setStatus('error');
      }
      setErrorMessage(
        res.message || 'Chưa gửi được kết quả lên Google Sheets. Bài làm vẫn được giữ an toàn trên máy, em hãy bấm "Thử gửi lại" nhé.'
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      <ConfettiCanvas reducedMotion={reducedMotion} />

      {/* Thẻ chúc mừng chính */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-6 md:p-8 shadow-lg text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full backdrop-blur-xs mb-1">
          <Sparkles className="w-8 h-8 text-amber-300" />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading">
          Hoàn thành bài luyện tập rồi!
        </h1>
        <p className="text-emerald-100 text-base md:text-lg">
          Em đã rất kiên trì và hoàn thành xuất sắc chặng đường gieo hạt chữ hôm nay.
        </p>

        {/* Mã học sinh */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/15 rounded-full text-xs md:text-sm font-semibold tracking-wide">
          <span>Mã học sinh:</span>
          <strong>{session.studentId}</strong>
        </div>
      </div>

      {/* Bảng số liệu chi tiết */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span>Kết quả lượt luyện tập</span>
          <span className="text-xs text-slate-400 font-normal">
            ({session.isReview ? 'Lượt ôn lại' : 'Lượt mới'})
          </span>
        </h2>

        {/* Thẻ 3 chỉ số */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-1" />
            <span className="text-3xl font-extrabold text-emerald-800 tabular-nums">
              {firstTry} / {total}
            </span>
            <span className="text-xs font-bold text-emerald-950 mt-1">Đúng lần đầu</span>
            <span className="text-xs text-slate-500">Tự làm, chưa dùng gợi ý</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center text-center">
            <HelpCircle className="w-6 h-6 text-amber-600 mb-1" />
            <span className="text-3xl font-extrabold text-amber-800 tabular-nums">
              {supported}
            </span>
            <span className="text-xs font-bold text-amber-950 mt-1">Đúng sau hỗ trợ</span>
            <span className="text-xs text-slate-500">Đã xem gợi ý hoặc thử lại</span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col items-center text-center">
            <Eye className="w-6 h-6 text-sky-600 mb-1" />
            <span className="text-3xl font-extrabold text-sky-800 tabular-nums">
              {revealed}
            </span>
            <span className="text-xs font-bold text-sky-950 mt-1">Đã xem đáp án</span>
            <span className="text-xs text-slate-500">Đọc lời giải để ghi nhớ</span>
          </div>
        </div>

        {/* Huy hiệu ghi nhận nỗ lực */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Ghi nhận nỗ lực cùng Bé Mầm Chữ:
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {isPatientLearner && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold border border-emerald-300">
                🌱 Bạn nhỏ kiên trì (Hoàn thành bài tập)
              </span>
            )}

            {isConfidentSeed && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-900 rounded-xl text-xs font-bold border border-amber-300">
                ⭐ Hạt chữ tự tin (Nhiều câu tự làm đúng)
              </span>
            )}

            {isProgressFlower && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 text-pink-900 rounded-xl text-xs font-bold border border-pink-300">
                🌸 Bông hoa tiến bộ (Tiến bộ so với lượt trước)
              </span>
            )}

            {isFirstSessionEver && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-100 text-sky-900 rounded-xl text-xs font-bold border border-sky-300">
                ✨ Khởi đầu hào hứng (Ghi nhận nỗ lực làm quen)
              </span>
            )}
          </div>
        </div>

        {/* Nhận xét theo từng nhóm chữ dựa trên dữ liệu thực tế */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800">
            Nhận xét theo từng nhóm chữ trong lượt này:
          </h3>
          <div className="space-y-2">
            {groups.map((grp) => {
              const breakdown = session.groupBreakdown?.[grp];
              const label = SPELLING_GROUP_LABELS[grp].short;

              if (!breakdown || breakdown.total === 0) {
                return (
                  <div key={grp} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-400 flex items-center justify-between">
                    <span className="font-semibold">{label}</span>
                    <span>Chưa luyện trong lượt này</span>
                  </div>
                );
              }

              const isAllFirstTry = breakdown.firstTryCorrect === breakdown.total;

              return (
                <div key={grp} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <strong className="text-emerald-900 font-bold">{label}: </strong>
                    <span>
                      Trong lượt này, em chọn đúng lần đầu {breakdown.firstTryCorrect}/{breakdown.total} câu.
                      {isAllFirstTry
                        ? ' Em nhận biết rất chắc chắn trong các câu đã gặp!'
                        : ' Em có thể luyện thêm các từ này để nhớ bền hơn nhé.'}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-800 text-xs shrink-0 tabular-nums">
                    {breakdown.firstTryCorrect}/{breakdown.total}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* KHỐI NỘP KẾT QUẢ CHO CÔ GIÁO (GOOGLE SHEETS QUA MÁY CHỦ) */}
        {/* ========================================================= */}
        <div className="p-5 md:p-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-emerald-100">
                <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                <span>Gửi kết quả vào Google Sheets của cô</span>
              </div>
              <h3 className="text-lg md:text-xl font-extrabold font-heading text-white">
                Gửi kết quả bài làm cho Cô Lê Thị Thanh Hằng
              </h3>
              <p className="text-xs md:text-sm text-emerald-100">
                Trường Tiểu học Tân Thành Bình • Dữ liệu lưu vào trang TongHop và ChiTiet trong Google Sheets của cô.
              </p>
            </div>

            {/* TRẠNG THÁI HIỂN THỊ ĐẦY ĐỦ 4 TRẠNG THÁI + CHƯA CẤU HÌNH */}
            <div className="shrink-0">
              {status === 'idle' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white rounded-xl text-xs font-bold border border-white/30">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>Trạng thái: Chưa gửi</span>
                </div>
              )}

              {status === 'submitting' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-amber-950 rounded-xl text-xs font-bold animate-pulse shadow-xs">
                  <div className="w-3.5 h-3.5 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
                  <span>Trạng thái: Đang gửi...</span>
                </div>
              )}

              {status === 'success' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-emerald-800 rounded-xl text-xs font-bold shadow-xs">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span>Đã gửi thành công {submittedTime ? `(${submittedTime})` : ''}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 text-white rounded-xl text-xs font-bold shadow-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-200" />
                  <span>Trạng thái: Chưa gửi được</span>
                </div>
              )}

              {status === 'not_configured' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-xs">
                  <Info className="w-4 h-4 text-amber-100" />
                  <span>Trạng thái: Chưa cấu hình kết nối</span>
                </div>
              )}
            </div>
          </div>

          {/* Thông báo lỗi nếu gửi thất bại */}
          {status === 'error' && errorMessage && (
            <div className="p-3 bg-rose-950/40 rounded-2xl border border-rose-300/40 text-xs text-rose-100 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-rose-200">
                <AlertTriangle className="w-4 h-4" />
                <span>Không thể gửi đến Google Sheets:</span>
              </p>
              <p className="text-[11px] leading-relaxed text-rose-100">{errorMessage}</p>
              <p className="text-[11px] text-emerald-200 pt-0.5">
                🛡️ Kết quả bài làm vẫn được lưu giữ nguyên vẹn trên máy với mã lượt <strong>{attemptId}</strong>. Em hãy bấm nút <strong>&quot;Thử gửi lại cho cô&quot;</strong> bên dưới.
              </p>
            </div>
          )}

          {/* Thông báo nếu chưa cấu hình */}
          {status === 'not_configured' && (
            <div className="p-3 bg-amber-950/40 rounded-2xl border border-amber-300/40 text-xs text-amber-100 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-amber-200">
                <Info className="w-4 h-4" />
                <span>Máy chủ chưa cấu hình Google Apps Script:</span>
              </p>
              <p className="text-[11px] leading-relaxed text-amber-100">
                Hệ thống chưa thiết lập biến môi trường <code className="bg-black/30 px-1 rounded font-mono">GOOGLE_APPS_SCRIPT_URL</code> hoặc <code className="bg-black/30 px-1 rounded font-mono">RESULTS_SHARED_SECRET</code>. Thầy cô vui lòng vào &quot;Góc giáo viên&quot; để xem hướng dẫn thiết lập.
              </p>
            </div>
          )}

          {/* Thông báo khi đã gửi thành công */}
          {status === 'success' && (
            <div className="p-3 bg-emerald-800/60 rounded-2xl border border-emerald-300/40 text-xs text-emerald-100">
              <p className="font-bold flex items-center gap-1.5 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Đã ghi nhận vào Google Sheets:</span>
              </p>
              <p className="text-[11px] text-emerald-100">
                Toàn bộ dữ liệu điểm số và chi tiết từng câu của học sinh <strong>{session.studentId}</strong> (Mã lượt: {attemptId}) đã được lưu an toàn vào bảng tính của cô giáo.
              </p>
            </div>
          )}

          {/* NÚT HÀNH ĐỘNG CHÍNH: GỬI KẾT QUẢ CHO CÔ */}
          <div className="pt-1 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSendToTeacher}
              disabled={status === 'submitting' || status === 'not_configured'}
              className={`flex-1 py-4 px-6 font-extrabold text-base md:text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer ${
                status === 'submitting'
                  ? 'bg-amber-400 text-amber-950 opacity-90 cursor-not-allowed'
                  : status === 'success'
                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 shadow-sm'
                  : status === 'error'
                  ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 hover:shadow-xl'
                  : status === 'not_configured'
                  ? 'bg-slate-300 text-slate-600 cursor-not-allowed opacity-80'
                  : 'bg-amber-400 hover:bg-amber-300 active:scale-98 text-amber-950 hover:shadow-xl'
              }`}
            >
              {status === 'submitting' ? (
                <>
                  <div className="w-5 h-5 border-3 border-amber-950 border-t-transparent rounded-full animate-spin" />
                  <span>Đang gửi kết quả tới Google Sheets...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCheck className="w-6 h-6 text-emerald-700" />
                  <span>Gửi lại bản cập nhật cho cô</span>
                </>
              ) : status === 'error' ? (
                <>
                  <RefreshCw className="w-6 h-6 text-amber-950" />
                  <span>Thử gửi lại cho cô</span>
                </>
              ) : status === 'not_configured' ? (
                <>
                  <Info className="w-6 h-6 text-slate-600" />
                  <span>Chưa cấu hình kết nối Google Sheets</span>
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  <span>Gửi kết quả cho cô</span>
                </>
              )}
            </button>

            {/* Nút xem Drive của cô nếu có */}
            <a
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-5 bg-white/15 hover:bg-white/25 text-white font-bold text-sm md:text-base rounded-2xl border border-white/30 transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              title="Mở thư mục Google Drive của Cô Hằng"
            >
              <FolderOpen className="w-5 h-5 text-amber-300" />
              <span>Mở Drive của Cô</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Các kênh dự phòng: Tải CSV, Sao chép Zalo, Email */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-emerald-100 border-t border-white/10">
            <span className="font-semibold text-emerald-200">Kênh dự phòng:</span>
            <button
              type="button"
              onClick={() => downloadSingleSessionCsv(session)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl font-bold transition-colors cursor-pointer text-white border border-white/20 shadow-xs"
              title="Tải tệp bảng điểm CSV dự phòng"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Tải tệp kết quả dự phòng (.CSV)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const text = formatSessionSummaryText(session);
                navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl font-bold transition-colors cursor-pointer text-white border border-white/20 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-amber-200">Đã chép tóm tắt!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép gửi Zalo cô</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${settings.teacherEmail || 'thanhhangttb2@gmail.com'}?subject=${encodeURIComponent(`[Vườn Chữ Vui] Báo cáo bài làm của học sinh ${session.studentId}`)}&body=${encodeURIComponent(formatSessionSummaryText(session))}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl font-medium transition-colors cursor-pointer text-white border border-white/20"
              title="Gửi email bài làm trực tiếp cho Cô Hằng"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Gửi Email cô Hằng</span>
            </a>
          </div>
        </div>

        {/* Nút hành động chính */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <button
            onClick={onBackToGarden}
            className="w-full sm:w-auto px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Về khu vườn</span>
          </button>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
            {hasMissedQuestions && (
              <button
                onClick={onReviewMissed}
                className="w-full sm:w-auto px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ôn lại câu cần luyện</span>
              </button>
            )}

            <button
              onClick={onNewSession}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Luyện lượt mới</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <GardenMascot mood="cheering" message="Mỗi hạt chữ được gieo cẩn thận sẽ nở thành bông hoa tri thức rực rỡ!" size={90} />
      </div>

      {/* MODAL XÁC NHẬN ĐÃ GỬI VÀO GOOGLE SHEETS THÀNH CÔNG */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-emerald-100 space-y-5 animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Đã lưu vào Google Sheets</span>
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="flex justify-center mb-1">
                <GardenMascot mood="happy" size={85} />
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 font-heading">
                Chúc mừng em đã gửi bài thành công!
              </h3>
              <p className="text-sm text-slate-600">
                Học sinh: <strong className="text-emerald-800">{session.studentId}</strong> • Đạt kết quả:{' '}
                <strong className="text-emerald-700">{session.firstTryCorrectCount}/{session.totalQuestions} câu đúng lần đầu</strong>.
              </p>
            </div>

            {/* Chi tiết xác nhận từ Google Sheets */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-2.5">
              <div className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span>Xác nhận ghi nhận từ Google Sheets:</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-700 bg-white p-3 rounded-xl border border-emerald-100">
                <p>• <strong>Mã lượt học (attemptId):</strong> <code className="text-emerald-700 font-mono">{attemptId}</code></p>
                <p>• <strong>Thời gian gửi:</strong> {submittedTime || 'Vừa xong'}</p>
                <p>• <strong>Trang &quot;TongHop&quot;:</strong> Đã ghi điểm số, thời gian, tỉ lệ hoàn thành.</p>
                <p>• <strong>Trang &quot;ChiTiet&quot;:</strong> Đã ghi đầy đủ {session.totalQuestions} câu hỏi cùng lựa chọn và gợi ý.</p>
              </div>

              <p className="text-slate-600 text-[11px] italic">
                {successMessage || 'Bảng tính của cô giáo đã nhận đủ dữ liệu tổng hợp và chi tiết.'}
              </p>
            </div>

            {/* Các tùy chọn sao lưu phụ */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-700">Tùy chọn bổ sung:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => downloadSingleSessionCsv(session)}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl border border-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Tải bản sao CSV</span>
                </button>

                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl border border-sky-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FolderOpen className="w-4 h-4 text-sky-600" />
                  <span>Mở Google Drive của cô</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Hoàn tất và đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
