import React, { useState, useEffect } from 'react';
import { QuestionItem, QuestionAttemptDetail, SpellingGroup } from '../types';
import { IllustrationGarden } from './IllustrationGarden';
import { GardenMascot, MascotMood } from './GardenMascot';
import {
  Volume2,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Info,
  XCircle,
} from 'lucide-react';
import { playSuccessChime, playGentleRetryTone, playClickSound, speakText, checkVietnameseVoiceSupport } from '../utils/audio';

interface StudentPracticeProps {
  questions: QuestionItem[];
  studentId: string;
  selectedGroup: SpellingGroup | 'mixed';
  isReview: boolean;
  soundEnabled: boolean;
  speechEnabled: boolean;
  onFinishSession: (details: QuestionAttemptDetail[], completed: boolean) => void;
  onExitToGarden: () => void;
}

export const StudentPractice: React.FC<StudentPracticeProps> = ({
  questions,
  studentId,
  selectedGroup,
  isReview,
  soundEnabled,
  speechEnabled,
  onFinishSession,
  onExitToGarden,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailsHistory, setDetailsHistory] = useState<QuestionAttemptDetail[]>([]);

  // Trạng thái của câu hiện tại
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [attemptsList, setAttemptsList] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Dành riêng cho dạng Find & Fix: từ đang được chọn để sửa
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);

  // Dành riêng cho dạng Keyboard: nội dung đã gõ
  const [typedInput, setTypedInput] = useState<string>('');

  // Hỗ trợ giọng đọc tiếng Việt
  const [hasViVoice, setHasViVoice] = useState<boolean>(true);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const currentQ = questions[currentIndex];
  const totalCount = questions.length;

  useEffect(() => {
    checkVietnameseVoiceSupport().then(supported => {
      setHasViVoice(supported);
    });
  }, []);

  // Reset trạng thái khi chuyển sang câu mới
  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setAttemptCount(0);
    setAttemptsList([]);
    setShowHint(false);
    setHintsUsedCount(0);
    setIsAnswerRevealed(false);
    setIsCorrect(null);
    setActiveFeedback(null);
    setIsSubmitting(false);
    setHighlightedWordIndex(null);
    setTypedInput('');
  };

  // Xác định tâm trạng của linh vật
  let mascotMood: MascotMood = 'neutral';
  let mascotMessage = 'Đọc kĩ câu văn rồi cùng gieo hạt chữ đúng nhé!';

  if (isCorrect === true) {
    mascotMood = 'cheering';
    mascotMessage = 'Tuyệt vời lắm! Em đã chọn câu trả lời rất chính xác!';
  } else if (isCorrect === false) {
    if (isAnswerRevealed) {
      mascotMood = 'encouraging';
      mascotMessage = 'Không sao cả! Hãy đọc lời giải thích để ghi nhớ sâu hơn nhé.';
    } else {
      mascotMood = 'thinking';
      mascotMessage = 'Mình cùng xem lại một chút và thử lại nào!';
    }
  } else if (showHint) {
    mascotMood = 'thinking';
    mascotMessage = `Gợi ý nhỏ cho em: ${currentQ.hint}`;
  }

  // Đọc câu hỏi
  const handleSpeak = () => {
    if (!speechEnabled) return;
    playClickSound(soundEnabled);
    const spoken = speakText(currentQ.sentence);
    if (!spoken || !hasViVoice) {
      setVoiceNotice('Thiết bị hiện chưa hỗ trợ giọng đọc tiếng Việt chuẩn, em hãy đọc theo chữ trên màn hình nhé.');
      setTimeout(() => setVoiceNotice(null), 4000);
    }
  };

  // Xử lý nộp đáp án
  const handleAnswerSubmit = (chosenAnswer: string) => {
    if (isSubmitting || isCorrect === true || isAnswerRevealed) return;
    setIsSubmitting(true);
    playClickSound(soundEnabled);

    const trimmedChoice = chosenAnswer.trim();
    const newAttempts = [...attemptsList, trimmedChoice];
    setAttemptsList(newAttempts);
    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);
    setSelectedAnswer(trimmedChoice);

    const isMatch = trimmedChoice.toLowerCase() === currentQ.correctAnswer.toLowerCase();

    if (isMatch) {
      // ĐÚNG
      setIsCorrect(true);
      playSuccessChime(soundEnabled);

      let outcome: QuestionAttemptDetail['outcome'] = 'first_try';
      if (hintsUsedCount > 0) {
        outcome = 'after_hint';
      } else if (newAttemptCount > 1) {
        outcome = 'after_retry';
      }

      const detail: QuestionAttemptDetail = {
        questionId: currentQ.id,
        version: currentQ.version,
        group: currentQ.group,
        questionSentence: currentQ.sentence,
        firstChoice: newAttempts[0],
        correctAnswer: currentQ.correctAnswer,
        attempts: newAttempts,
        hintsUsed: hintsUsedCount,
        revealedAnswer: false,
        isCorrect: true,
        outcome,
      };

      setDetailsHistory(prev => [...prev, detail]);
      setIsSubmitting(false);
    } else {
      // CHƯA ĐÚNG
      setIsCorrect(false);
      playGentleRetryTone(soundEnabled);

      const specific = currentQ.specificFeedbacks[trimmedChoice] ||
        `Từ "${trimmedChoice}" chưa phù hợp trong câu này. Em hãy đọc kĩ ngữ cảnh và thử lại nhé.`;
      setActiveFeedback(specific);

      if (newAttemptCount >= 2) {
        // Đã thử 2 lần mà vẫn chưa đúng: Hiện đáp án và giải thích
        setIsAnswerRevealed(true);

        const detail: QuestionAttemptDetail = {
          questionId: currentQ.id,
          version: currentQ.version,
          group: currentQ.group,
          questionSentence: currentQ.sentence,
          firstChoice: newAttempts[0],
          correctAnswer: currentQ.correctAnswer,
          attempts: newAttempts,
          hintsUsed: hintsUsedCount,
          revealedAnswer: true,
          isCorrect: false,
          outcome: 'revealed',
        };

        setDetailsHistory(prev => [...prev, detail]);
      }

      setIsSubmitting(false);
    }
  };

  // Học sinh bấm thử lại (sau lần sai thứ 1)
  const handleTryAgain = () => {
    playClickSound(soundEnabled);
    setIsCorrect(null);
    setActiveFeedback(null);
    setSelectedAnswer(null);
  };

  // Mở gợi ý
  const handleToggleHint = () => {
    playClickSound(soundEnabled);
    if (!showHint) {
      setShowHint(true);
      setHintsUsedCount(prev => prev + 1);
    }
  };

  // Chuyển sang câu tiếp theo
  const handleNextQuestion = () => {
    playClickSound(soundEnabled);
    if (currentIndex + 1 < totalCount) {
      setCurrentIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      // Hoàn thành tất cả các câu
      onFinishSession(detailsHistory, true);
    }
  };

  // Học sinh bấm dừng giữa chừng (vẫn lưu lại tiến độ dở dang)
  const handleEarlyExit = () => {
    if (window.confirm('Em có muốn lưu lại kết quả của các câu đã làm và quay về vườn không?')) {
      onFinishSession(detailsHistory, false);
    }
  };

  // Render câu văn với chỗ trống nổi bật
  const renderSentenceWithBlank = () => {
    const parts = currentQ.sentence.split('...');
    if (parts.length < 2) {
      return (
        <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 leading-relaxed font-heading">
          {currentQ.sentence}
        </p>
      );
    }

    return (
      <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 leading-relaxed font-heading">
        {parts[0]}
        <span
          className={`inline-flex items-center justify-center min-w-[70px] md:min-w-[90px] px-3 py-1 mx-1.5 rounded-xl border-b-4 transition-all ${
            isCorrect === true
              ? 'bg-emerald-100 border-emerald-600 text-emerald-800'
              : isAnswerRevealed
              ? 'bg-amber-100 border-amber-600 text-amber-900'
              : selectedAnswer
              ? 'bg-slate-100 border-slate-400 text-slate-800'
              : 'bg-emerald-50 border-emerald-400 text-emerald-700 animate-pulse'
          }`}
        >
          {isCorrect === true
            ? currentQ.correctAnswer
            : isAnswerRevealed
            ? currentQ.correctAnswer
            : selectedAnswer || '...'}
        </span>
        {parts[1]}
      </p>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Thanh tiến trình & Nút thoát */}
      <div className="flex items-center justify-between gap-4 bg-white px-5 py-3 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={handleEarlyExit}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Quay lại
          </button>
          <span className="text-xs text-slate-300">|</span>
          <span className="text-xs md:text-sm font-bold text-emerald-900">
            {isReview ? 'Ôn lại câu sai' : selectedGroup === 'mixed' ? 'Vườn tổng hợp' : `Nhóm ${selectedGroup.replace('_', ' / ')}`}
          </span>
        </div>

        {/* Vạch tiến độ */}
        <div className="flex-1 max-w-xs mx-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Tiến độ</span>
            <span className="font-bold text-emerald-800">
              {currentIndex + 1} / {totalCount}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleToggleHint}
          disabled={showHint || isCorrect === true || isAnswerRevealed}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            showHint
              ? 'bg-amber-100 text-amber-800'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
          }`}
          title="Xem gợi ý nếu em chưa chắc chắn"
        >
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>Gợi ý</span>
        </button>
      </div>

      {/* Khung nội dung câu hỏi chính */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm space-y-6">
        {/* Hàng trên: Minh họa + Câu hỏi + Nút đọc âm thanh */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Tranh minh họa SVG */}
          <div className="shrink-0">
            <IllustrationGarden
              nameKey={currentQ.illustrationKey}
              altText={currentQ.imageAlt}
              size={170}
            />
          </div>

          {/* Câu văn và nút nghe đọc */}
          <div className="flex-1 space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                Câu {currentIndex + 1}
              </span>

              {speechEnabled && (
                <button
                  onClick={handleSpeak}
                  className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                  title="Nghe đọc câu hỏi"
                  aria-label="Nghe đọc câu hỏi"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe câu</span>
                </button>
              )}
            </div>

            {voiceNotice && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                {voiceNotice}
              </p>
            )}

            {/* Hiển thị câu hỏi theo dạng bài */}
            {currentQ.questionType === 'find_fix' && currentQ.findFixDetails ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-500">
                  Chạm vào từ bị viết sai chính tả trong câu dưới đây:
                </p>
                <div className="flex flex-wrap gap-2 text-lg md:text-2xl font-bold font-heading">
                  {currentQ.findFixDetails.wordsInSentence.map((word, wIdx) => {
                    const isSelected = highlightedWordIndex === wIdx;
                    return (
                      <button
                        key={wIdx}
                        type="button"
                        onClick={() => {
                          if (isCorrect !== null || isAnswerRevealed) return;
                          playClickSound(soundEnabled);
                          setHighlightedWordIndex(wIdx);
                        }}
                        className={`px-2.5 py-1 rounded-xl transition-all ${
                          isSelected
                            ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 scale-105'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              renderSentenceWithBlank()
            )}
          </div>
        </div>

        {/* Khung gợi ý khi học sinh mở */}
        {showHint && (
          <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl text-amber-900 text-sm flex items-start gap-3 animate-in fade-in">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">Gợi ý dành cho em:</p>
              <p className="mt-0.5">{currentQ.hint}</p>
            </div>
          </div>
        )}

        {/* Khu vực tương tác theo dạng bài */}
        <div className="pt-2">
          {/* Dạng D: Tìm và sửa lỗi */}
          {currentQ.questionType === 'find_fix' && currentQ.findFixDetails ? (
            <div className="space-y-4">
              {highlightedWordIndex !== null && isCorrect === null && !isAnswerRevealed && (
                <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-100 space-y-3 animate-in fade-in">
                  <p className="text-sm font-bold text-emerald-900">
                    Em chọn sửa từ &ldquo;{currentQ.findFixDetails.wordsInSentence[highlightedWordIndex]}&rdquo; thành cách viết nào dưới đây?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {currentQ.findFixDetails.fixOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          // Kiểm tra nếu chọn đúng từ sai và sửa đúng từ đúng
                          const targetWordIdx = currentQ.findFixDetails?.errorWordIndex;
                          if (highlightedWordIndex !== targetWordIdx) {
                            // Chọn sai vị trí từ
                            handleAnswerSubmit(opt);
                          } else {
                            handleAnswerSubmit(opt);
                          }
                        }}
                        className="flex-1 min-w-[140px] py-3.5 px-6 bg-white hover:bg-emerald-600 hover:text-white font-extrabold text-lg md:text-xl rounded-2xl border-2 border-emerald-300 shadow-xs transition-all active:scale-95 cursor-pointer text-slate-800 text-center"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : currentQ.questionType === 'keyboard_type' ? (
            // Dạng E: Bàn phím gõ / chọn chữ cái
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <input
                  type="text"
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  disabled={isCorrect === true || isAnswerRevealed}
                  placeholder="Nhập tiếng hoặc từ đúng..."
                  className="w-full max-w-xs text-center text-xl md:text-2xl font-bold py-3 px-4 rounded-2xl border-2 border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-hidden bg-slate-50/60"
                />
                <button
                  type="button"
                  onClick={() => handleAnswerSubmit(typedInput)}
                  disabled={!typedInput.trim() || isCorrect === true || isAnswerRevealed}
                  className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-xs transition-colors cursor-pointer"
                >
                  Kiểm tra
                </button>
              </div>

              {/* Bàn phím gợi ý các tiếng / từ lựa chọn trên màn hình cảm ứng */}
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setTypedInput(opt);
                    }}
                    disabled={isCorrect === true || isAnswerRevealed}
                    className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold rounded-xl text-base shadow-xs"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Dạng A & B: Chọn chữ / Chọn từ (Nút bấm to rõ ràng)
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswer === opt;
                let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-800';

                if (isCorrect === true && opt.toLowerCase() === currentQ.correctAnswer.toLowerCase()) {
                  btnStyle = 'border-emerald-600 bg-emerald-100 text-emerald-900 ring-4 ring-emerald-200';
                } else if (isAnswerRevealed && opt.toLowerCase() === currentQ.correctAnswer.toLowerCase()) {
                  btnStyle = 'border-emerald-600 bg-emerald-100 text-emerald-900 ring-4 ring-emerald-200';
                } else if (isSelected && isCorrect === false) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswerSubmit(opt)}
                    disabled={isCorrect === true || isAnswerRevealed || isSubmitting}
                    className={`py-4 md:py-5 px-6 rounded-2xl border-2 font-extrabold text-xl md:text-2xl transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-2 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isCorrect === true && opt.toLowerCase() === currentQ.correctAnswer.toLowerCase() && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Phản hồi khi làm đúng */}
        {isCorrect === true && (
          <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>Chính xác rồi! Em làm tốt lắm!</span>
            </div>

            <p className="text-slate-800 font-medium text-base">
              Câu hoàn chỉnh: <strong className="text-emerald-800">{currentQ.completedSentence}</strong>
            </p>

            <p className="text-sm text-emerald-900/90 bg-white/70 p-3 rounded-xl border border-emerald-100">
              💡 {currentQ.explanation}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Phản hồi khi làm sai lần 1 (cho thử lại) */}
        {isCorrect === false && !isAnswerRevealed && (
          <div className="p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-base">
              <Info className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Mình cùng xem lại một chút nhé!</span>
            </div>

            {activeFeedback && (
              <p className="text-sm text-amber-900 bg-white/80 p-3 rounded-xl border border-amber-200">
                {activeFeedback}
              </p>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={handleToggleHint}
                disabled={showHint}
                className="text-xs text-amber-800 underline font-semibold"
              >
                {!showHint ? 'Xem gợi ý trước khi thử lại' : 'Đã mở gợi ý'}
              </button>

              <button
                onClick={handleTryAgain}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Thử lại một lần nữa</span>
              </button>
            </div>
          </div>
        )}

        {/* Phản hồi khi sai lần 2: Hiện đáp án và giải thích */}
        {isAnswerRevealed && (
          <div className="p-5 bg-sky-50 border-2 border-sky-300 rounded-2xl space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-sky-950 font-bold text-base">
              <XCircle className="w-5 h-5 text-sky-600 shrink-0" />
              <span>Đáp án chính xác trong câu này là: <strong className="text-emerald-700 text-lg">&ldquo;{currentQ.correctAnswer}&rdquo;</strong></span>
            </div>

            <p className="text-slate-800 text-base">
              Câu viết đúng: <strong className="text-sky-950">{currentQ.completedSentence}</strong>
            </p>

            <div className="p-3.5 bg-white rounded-xl border border-sky-200 text-sm text-slate-700 space-y-1">
              <p className="font-bold text-sky-900">Lời giải thích giúp em ghi nhớ:</p>
              <p>{currentQ.explanation}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Em đã hiểu, sang câu tiếp theo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Linh vật Bé Mầm Chữ đồng hành dưới chân trang */}
      <div className="flex justify-center pt-2">
        <GardenMascot mood={mascotMood} message={mascotMessage} size={85} />
      </div>
    </div>
  );
};
