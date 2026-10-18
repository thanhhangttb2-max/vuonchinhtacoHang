import React from 'react';
import { X, BookOpen, Sparkles, HelpCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GardenMascot } from './GardenMascot';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="guide-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-b border-emerald-100">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 id="guide-title" className="text-xl font-bold text-emerald-950 font-heading">
                Hướng dẫn tham gia Vườn Chữ Vui
              </h2>
              <p className="text-xs text-emerald-700">Dành cho học sinh lớp 2 • Tác giả: Cô Lê Thị Thanh Hằng - Trường Tiểu học Tân Thành Bình</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-full transition-colors"
            aria-label="Đóng bảng hướng dẫn"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          {/* 3 Bước dành cho học sinh */}
          <section className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100/80">
            <h3 className="text-base font-bold text-emerald-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Ba bước luyện tập dễ nhớ cùng Bé Mầm Chữ:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-xl shadow-xs border border-emerald-100 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-2">1</span>
                <h4 className="font-bold text-slate-900 text-sm">Đọc câu</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Đọc kĩ câu văn ngắn và quan sát bức tranh tình huống sinh động.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-xs border border-emerald-100 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm mb-2">2</span>
                <h4 className="font-bold text-slate-900 text-sm">Chọn chữ</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Bấm chọn tiếng hoặc từ đúng và phù hợp nhất với nghĩa của câu.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-xs border border-emerald-100 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-sm mb-2">3</span>
                <h4 className="font-bold text-slate-900 text-sm">Khám phá</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Xem lời giải thích đáng yêu để nhớ lâu nghĩa của từ trong câu.
                </p>
              </div>
            </div>
          </section>

          {/* Quy trình tổng thể 5 bước */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              Quy trình học tập và hỗ trợ giảng dạy:
            </h3>
            <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside pl-1">
              <li><strong className="text-slate-800">Thầy cô kiểm tra và duyệt câu hỏi:</strong> Mở &ldquo;Góc giáo viên&rdquo; để xem thử, chỉnh sửa hoặc duyệt các câu hỏi khởi đầu.</li>
              <li><strong className="text-slate-800">Học sinh nhập mã học sinh:</strong> Nhập mã định danh (ví dụ: HS01, Mai2A) và chọn nhóm chữ muốn luyện.</li>
              <li><strong className="text-slate-800">Làm bài luyện tương tác:</strong> Trả lời các câu hỏi bằng cách chọn, ghép hoặc gõ chữ. Không tính thời gian áp lực!</li>
              <li><strong className="text-slate-800">Xem tổng kết và nhận xét:</strong> Nhận phản hồi động viên chân thành và có thể chọn &ldquo;Ôn lại câu cần luyện&rdquo;.</li>
              <li><strong className="text-slate-800">Thầy cô xuất kết quả:</strong> Giáo viên xem tiến độ từng em và xuất file bảng tính CSV (UTF-8) bất cứ lúc nào.</li>
            </ol>
          </section>

          {/* Lưu trữ & Quyền riêng tư */}
          <section className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Bảo vệ quyền riêng tư & Lưu trữ cục bộ
            </div>
            <p>
              - Ứng dụng hoạt động trực tiếp trên trình duyệt của máy tính/điện thoại này.
            </p>
            <p>
              - Không thu thập họ tên, ngày sinh, số điện thoại hay thông tin cá nhân của học sinh.
            </p>
            <p>
              - Dữ liệu câu hỏi và kết quả được lưu trên bộ nhớ thiết bị đang dùng; thầy cô vui lòng xuất file CSV để lưu trữ lâu dài.
            </p>
          </section>

          <div className="flex items-center justify-between pt-2">
            <GardenMascot mood="happy" size={60} message="Chúc các bạn nhỏ học thật vui và viết thật chuẩn nha!" />
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-sm hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Đã hiểu rồi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
