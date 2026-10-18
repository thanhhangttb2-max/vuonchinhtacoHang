import React, { useState } from 'react';
import { QuestionItem, SpellingGroup, QuestionType, SupportLevel, QuestionStatus } from '../types';
import { X, Save, AlertCircle } from 'lucide-react';

interface QuestionEditorModalProps {
  question: QuestionItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (savedQuestion: QuestionItem) => void;
}

export const QuestionEditorModal: React.FC<QuestionEditorModalProps> = ({
  question,
  isOpen,
  onClose,
  onSave,
}) => {
  const isEditing = !!question;

  const [id, setId] = useState(question?.id || `custom_${Date.now()}`);
  const [group, setGroup] = useState<SpellingGroup>(question?.group || 'ch_tr');
  const [questionType, setQuestionType] = useState<QuestionType>(question?.questionType || 'choose_word');
  const [supportLevel, setSupportLevel] = useState<SupportLevel>(question?.supportLevel || 'standard');
  const [sentence, setSentence] = useState(question?.sentence || '');
  const [targetWord, setTargetWord] = useState(question?.targetWord || '');
  const [optionsStr, setOptionsStr] = useState(question ? question.options.join(', ') : '');
  const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer || '');
  const [completedSentence, setCompletedSentence] = useState(question?.completedSentence || '');
  const [explanation, setExplanation] = useState(question?.explanation || '');
  const [hint, setHint] = useState(question?.hint || '');
  const [illustrationKey, setIllustrationKey] = useState(question?.illustrationKey || 'chan_am');
  const [imageAlt, setImageAlt] = useState(question?.imageAlt || '');
  const [status, setStatus] = useState<QuestionStatus>(question?.status || 'draft');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sentence.trim()) {
      setErrorMsg('Vui lòng nhập câu hỏi / ngữ cảnh.');
      return;
    }

    const options = optionsStr.split(',').map(s => s.trim()).filter(Boolean);
    if (options.length < 2) {
      setErrorMsg('Vui lòng nhập ít nhất 2 phương án lựa chọn, cách nhau bằng dấu phẩy.');
      return;
    }

    if (!correctAnswer.trim()) {
      setErrorMsg('Vui lòng nhập đáp án chính xác.');
      return;
    }

    if (!options.some(o => o.toLowerCase() === correctAnswer.trim().toLowerCase())) {
      setErrorMsg('Đáp án chính xác phải là một trong các phương án lựa chọn.');
      return;
    }

    const finalItem: QuestionItem = {
      id: id.trim(),
      group,
      questionType,
      supportLevel,
      sentence: sentence.trim(),
      targetWord: targetWord.trim() || undefined,
      options,
      correctAnswer: correctAnswer.trim(),
      completedSentence: completedSentence.trim() || sentence.replace('...', correctAnswer.trim()),
      explanation: explanation.trim() || 'Từ ngữ đúng chính tả và phù hợp trong ngữ cảnh câu này.',
      specificFeedbacks: question?.specificFeedbacks || {},
      hint: hint.trim() || 'Đọc kĩ ngữ cảnh câu để chọn từ đúng.',
      illustrationKey: illustrationKey.trim() || 'chan_am',
      imageAlt: imageAlt.trim() || 'Hình minh họa',
      status,
      version: (question?.version || 0) + 1,
    };

    onSave(finalItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-lg">
            {isEditing ? `Sửa câu hỏi: ${question.id}` : 'Thêm câu hỏi mới vào ngân hàng'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 text-xs mb-1">Nhóm chữ</label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value as SpellingGroup)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
              >
                <option value="ch_tr">ch / tr</option>
                <option value="d_gi">d / gi</option>
                <option value="v_d">v / d</option>
                <option value="th_h">th / h (Khảo sát)</option>
                <option value="r_g">r / g (Khảo sát)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 text-xs mb-1">Dạng bài</label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
              >
                <option value="choose_word">Chọn từ phù hợp với câu</option>
                <option value="missing_letters">Điền nguyên tiếng có nghĩa vào chỗ trống</option>
                <option value="match_image">Ghép từ với tranh</option>
                <option value="find_fix">Tìm và sửa lỗi</option>
                <option value="keyboard_type">Điền chữ bằng bàn phím</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 text-xs mb-1">
              Câu hỏi / Ngữ cảnh (dùng ... cho chỗ trống)
            </label>
            <input
              type="text"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="Ví dụ: Mẹ đắp chiếc ... ấm cho em khi gió đông về."
              className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 text-xs mb-1">
                Các phương án (cách nhau bằng dấu phẩy)
              </label>
              <input
                type="text"
                value={optionsStr}
                onChange={(e) => setOptionsStr(e.target.value)}
                placeholder="Ví dụ: chăn, trăn"
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 text-xs mb-1">
                Đáp án chính xác
              </label>
              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Ví dụ: chăn"
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium font-bold text-emerald-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 text-xs mb-1">
              Câu hoàn chỉnh đúng chính tả
            </label>
            <input
              type="text"
              value={completedSentence}
              onChange={(e) => setCompletedSentence(e.target.value)}
              placeholder="Ví dụ: Mẹ đắp chiếc chăn ấm cho em khi gió đông về."
              className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 text-xs mb-1">
              Giải thích nghĩa trong ngữ cảnh (2-3 câu ngắn gọn cho lớp 2)
            </label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Giải thích vì sao chọn từ này và sự khác nhau với từ dễ nhầm..."
              className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 text-xs mb-1">
              Gợi ý nhẹ nhàng cho học sinh
            </label>
            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="Gợi ý đồ vật, con vật hoặc ý nghĩa thân thuộc..."
              className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 text-xs mb-1">
                Trạng thái duyệt
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as QuestionStatus)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
              >
                <option value="draft">Bản nháp (Cần giáo viên duyệt)</option>
                <option value="approved">Đã duyệt (Học sinh được luyện)</option>
                <option value="hidden">Tạm ẩn</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 text-xs mb-1">
                Mô tả thay thế cho hình (Alt text)
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Ví dụ: Chiếc chăn ấm áp trên giường"
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Lưu câu hỏi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
