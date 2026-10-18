import { useState } from 'react';
import {
  SpellingGroup,
  QuestionItem,
  QuestionAttemptDetail,
  PracticeSessionRecord,
  AppSettings,
} from './types';
import {
  getAppSettings,
  saveAppSettings,
  savePracticeSession,
  recordStudentProgress,
} from './services/storage';
import { selectQuestionsForSession } from './services/questionService';
import { Navbar } from './components/Navbar';
import { StudentWelcome } from './components/StudentWelcome';
import { StudentPractice } from './components/StudentPractice';
import { PracticeSummary } from './components/PracticeSummary';
import { TeacherCorner } from './components/TeacherCorner';
import { GuideModal } from './components/GuideModal';

export default function App() {
  const [view, setView] = useState<'student_welcome' | 'student_practice' | 'student_summary' | 'teacher_corner'>('student_welcome');
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Trạng thái phiên hiện tại
  const [activeStudentId, setActiveStudentId] = useState('');
  const [activeGroup, setActiveGroup] = useState<SpellingGroup | 'mixed'>('ch_tr');
  const [activeQuestions, setActiveQuestions] = useState<QuestionItem[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [lastFinishedSession, setLastFinishedSession] = useState<PracticeSessionRecord | null>(null);

  // Cập nhật cài đặt
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = saveAppSettings(newSettings);
    setSettings(updated);
  };

  // Khởi chạy lượt luyện tập
  const handleStartSession = (
    studentId: string,
    group: SpellingGroup | 'mixed',
    requestedCount: number,
    isReview: boolean
  ) => {
    const selection = selectQuestionsForSession(studentId, group, requestedCount, isReview);

    if (selection.questions.length === 0) {
      alert('Không tìm thấy câu hỏi phù hợp đã được duyệt. Thầy cô hãy vào Góc giáo viên để duyệt thêm câu hỏi nhé!');
      return;
    }

    if (selection.isShortage) {
      alert(`Ngân hàng hiện có ${selection.availableCount} câu đã duyệt cho nhóm này. Bé sẽ luyện với ${selection.availableCount} câu này nhé!`);
    }

    setActiveStudentId(studentId);
    setActiveGroup(group);
    setActiveQuestions(selection.questions);
    setIsReviewMode(isReview);
    setSessionStartTime(Date.now());
    setView('student_practice');
  };

  // Hoàn thành lượt luyện tập
  const handleFinishSession = (details: QuestionAttemptDetail[], completed: boolean) => {
    const totalQuestions = details.length;
    const firstTryCorrectCount = details.filter(d => d.outcome === 'first_try').length;
    const correctAfterHintCount = details.filter(d => d.outcome === 'after_hint').length;
    const correctAfterRetryCount = details.filter(d => d.outcome === 'after_retry').length;
    const revealedAnswerCount = details.filter(d => d.outcome === 'revealed').length;

    // Phân tích theo từng nhóm
    const groupBreakdown: PracticeSessionRecord['groupBreakdown'] = {
      ch_tr: { total: 0, firstTryCorrect: 0, neededSupport: 0, revealed: 0 },
      d_gi: { total: 0, firstTryCorrect: 0, neededSupport: 0, revealed: 0 },
      v_d: { total: 0, firstTryCorrect: 0, neededSupport: 0, revealed: 0 },
      th_h: { total: 0, firstTryCorrect: 0, neededSupport: 0, revealed: 0 },
      r_g: { total: 0, firstTryCorrect: 0, neededSupport: 0, revealed: 0 },
    };

    const seenIds: string[] = [];
    const missedIds: string[] = [];

    details.forEach(d => {
      seenIds.push(d.questionId);
      if (groupBreakdown[d.group]) {
        groupBreakdown[d.group].total += 1;
        if (d.outcome === 'first_try') {
          groupBreakdown[d.group].firstTryCorrect += 1;
        } else if (d.outcome === 'after_hint' || d.outcome === 'after_retry') {
          groupBreakdown[d.group].neededSupport += 1;
          missedIds.push(d.questionId);
        } else if (d.outcome === 'revealed') {
          groupBreakdown[d.group].revealed += 1;
          missedIds.push(d.questionId);
        }
      }
    });

    const now = Date.now();
    const attemptId = `att_${now}_${Math.random().toString(36).substring(2, 9)}`;
    const sessionRecord: PracticeSessionRecord = {
      id: `session_${now}`,
      attemptId,
      studentId: activeStudentId,
      startTime: sessionStartTime || (now - 60000),
      endTime: now,
      timestamp: now,
      dateFormatted: new Date(now).toLocaleString('vi-VN'),
      group: activeGroup,
      isReview: isReviewMode,
      completed,
      totalQuestions,
      firstTryCorrectCount,
      correctAfterHintCount,
      correctAfterRetryCount,
      revealedAnswerCount,
      groupBreakdown,
      details,
      isSubmitted: false,
      submissionStatus: 'idle',
    };

    // Lưu vào bộ nhớ trình duyệt
    savePracticeSession(sessionRecord);
    recordStudentProgress(activeStudentId, seenIds, missedIds);

    setLastFinishedSession(sessionRecord);
    setView('student_summary');
  };

  // Ôn lại các câu sai
  const handleReviewMissed = () => {
    if (!lastFinishedSession) return;
    const missedDetails = lastFinishedSession.details.filter(d => !d.isCorrect || d.revealedAnswer || d.outcome !== 'first_try');
    const missedQuestionMap = new Map<string, QuestionItem>();
    activeQuestions.forEach(q => missedQuestionMap.set(q.id, q));

    const missedQList = missedDetails
      .map(d => missedQuestionMap.get(d.questionId))
      .filter((q): q is QuestionItem => !!q);

    if (missedQList.length === 0) {
      alert('Tất cả các câu trong lượt này em đều đã tự làm đúng lần đầu rồi! Hãy bắt đầu một lượt mới nha!');
      setView('student_welcome');
      return;
    }

    setActiveQuestions(missedQList);
    setIsReviewMode(true);
    setView('student_practice');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800">
      <Navbar
        currentView={view}
        onNavigate={(newView) => setView(newView)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <main className="flex-1 pb-16">
        {view === 'student_welcome' && (
          <StudentWelcome
            onStartSession={handleStartSession}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenTeacherCorner={() => setView('teacher_corner')}
            soundEnabled={settings.soundEnabled}
          />
        )}

        {view === 'student_practice' && (
          <StudentPractice
            questions={activeQuestions}
            studentId={activeStudentId}
            selectedGroup={activeGroup}
            isReview={isReviewMode}
            soundEnabled={settings.soundEnabled}
            speechEnabled={settings.speechEnabled}
            onFinishSession={handleFinishSession}
            onExitToGarden={() => setView('student_welcome')}
          />
        )}

        {view === 'student_summary' && lastFinishedSession && (
          <PracticeSummary
            session={lastFinishedSession}
            reducedMotion={settings.reducedMotion}
            onReviewMissed={handleReviewMissed}
            onNewSession={() => setView('student_welcome')}
            onBackToGarden={() => setView('student_welcome')}
          />
        )}

        {view === 'teacher_corner' && (
          <TeacherCorner onBackToGarden={() => setView('student_welcome')} />
        )}
      </main>

      {/* Footer bản quyền */}
      <footer className="border-t border-emerald-100/80 py-4 px-6 text-center text-xs text-slate-600 bg-white/80 space-y-1">
        <p className="font-bold text-emerald-950 text-xs sm:text-sm">
          Bản quyền: Cô Lê Thị Thanh Hằng-Trường Tiểu học Tân Thành Bình
        </p>
        <p className="text-[11px] text-slate-500">
          Vườn Chữ Vui – Luyện chính tả cùng em (Lớp 2) • Tôn trọng phương ngữ & Rèn luyện ngữ cảnh
        </p>
      </footer>

      {/* Bảng hướng dẫn học sinh & thầy cô */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
}
