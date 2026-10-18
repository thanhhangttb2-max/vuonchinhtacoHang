import React, { useState } from 'react';
import { SpellingGroup, SPELLING_GROUP_LABELS } from '../types';
import { GardenMascot } from './GardenMascot';
import { getApprovedQuestions, getStudentHistory } from '../services/storage';
import { Sparkles, ArrowRight, Play, BookOpen, AlertCircle, RotateCcw, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface StudentWelcomeProps {
  onStartSession: (studentId: string, group: SpellingGroup | 'mixed', count: number, isReview: boolean) => void;
  onOpenGuide: () => void;
  onOpenTeacherCorner: () => void;
  soundEnabled: boolean;
}

export const StudentWelcome: React.FC<StudentWelcomeProps> = ({
  onStartSession,
  onOpenGuide,
  onOpenTeacherCorner,
  soundEnabled,
}) => {
  const [studentId, setStudentId] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<SpellingGroup | 'mixed'>('ch_tr');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const approvedQuestions = getApprovedQuestions();
  const approvedCount = approvedQuestions.length;

  // Kiểm tra lịch sử của học sinh nếu đã nhập mã
  const trimmedId = studentId.trim();
  const studentHistory = trimmedId ? getStudentHistory(trimmedId) : null;
  const missedCount = studentHistory ? (studentHistory.missedQuestionIds || []).length : 0;

  // Lọc số câu đã duyệt theo nhóm
  const countByGroup: Record<string, number> = {
    ch_tr: approvedQuestions.filter(q => q.group === 'ch_tr').length,
    d_gi: approvedQuestions.filter(q => q.group === 'd_gi').length,
    v_d: approvedQuestions.filter(q => q.group === 'v_d').length,
    th_h: approvedQuestions.filter(q => q.group === 'th_h').length,
    r_g: approvedQuestions.filter(q => q.group === 'r_g').length,
    mixed: approvedCount,
  };

  const handleValidateAndStart = (isReview: boolean = false) => {
    playClickSound(soundEnabled);

    if (!trimmedId) {
      setErrorMsg('Bạn nhỏ ơi, hãy nhập Mã học sinh (ví dụ: HS01, Nam2A) để bắt đầu nhé!');
      return;
    }

    if (trimmedId.length < 2 || trimmedId.length > 20) {
      setErrorMsg('Mã học sinh nên có từ 2 đến 20 kí tự bạn nhé.');
      return;
    }

    // Kiểm tra kí tự an toàn: chữ, số, gạch ngang, gạch dưới, khoảng trắng
    if (!/^[a-zA-Z0-9À-ỹ\s\-_]+$/.test(trimmedId)) {
      setErrorMsg('Mã học sinh chỉ nên gồm chữ cái, chữ số hoặc dấu gạch ngang.');
      return;
    }

    if (approvedCount === 0) {
      setErrorMsg('Khu vườn chưa có câu hỏi nào được duyệt. Thầy cô vui lòng mở Góc giáo viên để duyệt trước nhé!');
      return;
    }

    const availableForChosenGroup = countByGroup[selectedGroup] || 0;
    if (availableForChosenGroup === 0 && !isReview) {
      setErrorMsg(`Nhóm ${selectedGroup === 'mixed' ? 'tổng hợp' : selectedGroup.replace('_', ' / ')} hiện chưa có câu hỏi nào đã duyệt. Bạn hãy chọn nhóm khác hoặc nhắn thầy cô duyệt thêm nha.`);
      return;
    }

    setErrorMsg(null);
    onStartSession(trimmedId, selectedGroup, questionCount, isReview);
  };

  const groupsList: (SpellingGroup | 'mixed')[] = ['ch_tr', 'd_gi', 'v_d', 'th_h', 'r_g', 'mixed'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Banner Chào Mừng */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-6 md:p-10 shadow-lg shadow-emerald-950/10 overflow-hidden">
        {/* Họa tiết trang trí nền */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-56 h-56 rounded-full bg-emerald-400/20 blur-lg pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
              Dành cho học sinh lớp 2
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-heading drop-shadow-xs">
              VƯỜN CHỮ VUI
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl font-medium">
              Luyện chính tả cùng em: Cùng gieo những hạt chữ đúng mỗi ngày!
            </p>
            <p className="text-xs md:text-sm text-emerald-200/90 max-w-xl">
              Học chữ trong từng câu văn quen thuộc, giải thích nghĩa rõ ràng, không tính giờ áp lực.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center">
            <GardenMascot mood="happy" size={130} />
          </div>
        </div>
      </div>

      {/* Cảnh báo nếu chưa có câu hỏi nào được duyệt */}
      {approvedCount === 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 text-amber-950 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="p-3 bg-amber-200 text-amber-900 rounded-2xl shrink-0">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center sm:text-left space-y-1">
            <h2 className="text-lg font-bold">Khu vườn đang chờ thầy cô duyệt câu hỏi!</h2>
            <p className="text-sm text-amber-800">
              Hiện tại có 60 câu hỏi mẫu đang ở trạng thái <em>&ldquo;Bản nháp cần giáo viên duyệt&rdquo;</em>. Để đảm bảo tính sư phạm chuẩn xác cho học sinh lớp 2, thầy cô vui lòng mở <strong>Góc giáo viên</strong> để xem thử và bấm duyệt nhé.
            </p>
          </div>
          <button
            onClick={onOpenTeacherCorner}
            className="px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow-sm transition-transform active:scale-95 shrink-0 whitespace-nowrap"
          >
            Mở Góc giáo viên
          </button>
        </div>
      )}

      {/* Form Đăng Nhập & Chọn Nội Dung */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100/80 space-y-8">
        {/* Bước 1: Nhập Mã học sinh */}
        <div className="space-y-3">
          <label htmlFor="student-id" className="block text-base md:text-lg font-bold text-slate-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">1</span>
              Mã học sinh của em:
            </span>
            <span className="text-xs font-normal text-slate-500">
              (Không cần họ tên hay ngày sinh)
            </span>
          </label>

          <div className="relative max-w-md">
            <input
              id="student-id"
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Ví dụ: HS01, Mai2A, Nam..."
              maxLength={20}
              className="w-full px-4 py-3.5 text-base md:text-lg font-semibold rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-hidden text-slate-800 bg-slate-50/50"
            />
          </div>

          {errorMsg && (
            <p className="text-sm font-medium text-rose-600 flex items-center gap-1.5 animate-in fade-in" role="alert">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </p>
          )}

          {trimmedId && missedCount > 0 && (
            <div className="flex items-center justify-between p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs md:text-sm text-amber-900">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Bạn nhỏ có <strong>{missedCount} câu</strong> cần ôn lại từ những lượt trước.</span>
              </div>
              <button
                type="button"
                onClick={() => handleValidateAndStart(true)}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors shrink-0"
              >
                Ôn ngay câu sai
              </button>
            </div>
          )}
        </div>

        {/* Bước 2: Chọn Nhóm Chữ Cần Luyện */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">2</span>
              Chọn nhóm chữ muốn luyện:
            </span>
            <span className="text-xs text-slate-500">
              Tổng số câu đã duyệt: <strong>{approvedCount}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {groupsList.map((grp) => {
              const isSelected = selectedGroup === grp;
              const isMixed = grp === 'mixed';
              const labelObj = !isMixed ? SPELLING_GROUP_LABELS[grp] : null;
              const count = countByGroup[grp] || 0;

              return (
                <button
                  key={grp}
                  type="button"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setSelectedGroup(grp);
                  }}
                  className={`relative p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-200'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-lg md:text-xl font-extrabold text-slate-900 font-heading">
                      {isMixed ? '🌸 Vườn tổng hợp' : labelObj?.short}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {isMixed
                      ? 'Luyện phối hợp tất cả 5 nhóm chữ dễ nhầm trong cùng một lượt.'
                      : labelObj?.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{count} câu đã duyệt</span>
                    {count === 0 && (
                      <span className="text-amber-600 font-medium">(Chờ duyệt)</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bước 3: Số Lượng Câu Hỏi Trong Lượt */}
        <div className="space-y-3">
          <span className="text-base font-bold text-slate-800 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">3</span>
            Số câu trong một lượt luyện:
          </span>

          <div className="flex items-center gap-3">
            {[5, 10, 15].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => {
                  playClickSound(soundEnabled);
                  setQuestionCount(cnt);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm border-2 transition-all cursor-pointer ${
                  questionCount === cnt
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cnt} câu {cnt === 10 && '(Khuyên dùng)'}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Thời lượng gợi ý khoảng 5–10 phút, các em có thể làm thong thả theo nhịp độ của mình.
          </p>
        </div>

        {/* Nút Hành Động Chính */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <button
            type="button"
            onClick={onOpenGuide}
            className="w-full sm:w-auto px-5 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Xem hướng dẫn
          </button>

          <button
            type="button"
            onClick={() => handleValidateAndStart(false)}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            Bắt đầu luyện tập
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Thông tin hỗ trợ sư phạm */}
      <div className="text-center text-xs text-slate-500 space-y-1">
        <p>
          💡 Vườn Chữ Vui tôn trọng cách phát âm địa phương của các em. Ứng dụng tập trung rèn chính tả trong ngữ cảnh từ và câu.
        </p>
      </div>
    </div>
  );
};
