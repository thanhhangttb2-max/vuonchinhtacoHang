import React from 'react';
import { QuestionItem, SPELLING_GROUP_LABELS } from '../types';
import { IllustrationGarden } from './IllustrationGarden';
import { X, CheckCircle2, EyeOff, Check, Sparkles, BookOpen } from 'lucide-react';

interface QuestionPreviewModalProps {
  question: QuestionItem | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onToggleHide: (id: string) => void;
}

export const QuestionPreviewModal: React.FC<QuestionPreviewModalProps> = ({
  question,
  onClose,
  onApprove,
  onToggleHide,
}) => {
  if (!question) return null;

  const isApproved = question.status === 'approved';
  const isHidden = question.status === 'hidden';
  const groupLabel = SPELLING_GROUP_LABELS[question.group]?.short || question.group;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">Xem thử câu hỏi: {question.id}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                  {groupLabel}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isApproved ? 'bg-emerald-100 text-emerald-800' : isHidden ? 'bg-slate-200 text-slate-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {isApproved ? 'Đã duyệt' : isHidden ? 'Tạm ẩn' : 'Bản nháp'}
                </span>
              </div>
              <p className="text-xs text-slate-500">Mô phỏng chính xác nội dung học sinh sẽ nhìn thấy</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <IllustrationGarden
              nameKey={question.illustrationKey}
              altText={question.imageAlt}
              size={140}
            />
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <p className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug font-heading">
                {question.sentence}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {question.options.map((opt) => (
                  <span
                    key={opt}
                    className={`px-4 py-2 rounded-xl font-bold text-sm border ${
                      opt === question.correctAnswer
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    {opt} {opt === question.correctAnswer && '✓ (Đáp án đúng)'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Chi tiết sư phạm */}
          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-800">
                <Check className="w-4 h-4 text-emerald-600" />
                Câu hoàn chỉnh đúng chính tả:
              </span>
              <p className="font-semibold text-emerald-950 text-base">{question.completedSentence}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-600">
                <BookOpen className="w-4 h-4" />
                Lời giải thích cho học sinh:
              </span>
              <p className="text-slate-800">{question.explanation}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Gợi ý cho học sinh:
              </span>
              <p className="text-slate-800">{question.hint}</p>
            </div>

            {question.specificFeedbacks && Object.keys(question.specificFeedbacks).length > 0 && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider text-rose-700">
                  Phản hồi riêng cho từng phương án sai:
                </span>
                <div className="space-y-1 text-xs">
                  {Object.entries(question.specificFeedbacks).map(([wrongOpt, fb]) => (
                    <p key={wrongOpt} className="text-slate-700">
                      <strong>Nếu chọn &ldquo;{wrongOpt}&rdquo;:</strong> {fb}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={() => {
              onToggleHide(question.id);
              onClose();
            }}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition-colors flex items-center gap-1.5"
          >
            <EyeOff className="w-4 h-4" />
            <span>{isHidden ? 'Hiện câu này' : 'Tạm ẩn câu này'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-white"
            >
              Đóng
            </button>
            {!isApproved && (
              <button
                onClick={() => {
                  onApprove(question.id);
                  onClose();
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Duyệt câu này</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
