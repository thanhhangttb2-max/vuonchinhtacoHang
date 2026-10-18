import React, { useState, useEffect } from 'react';
import {
  QuestionItem,
  PracticeSessionRecord,
  SpellingGroup,
  SPELLING_GROUP_LABELS,
  QuestionStatus,
} from '../types';
import {
  getStoredQuestions,
  saveStoredQuestions,
  approveQuestion,
  toggleHideQuestion,
  approveAllQuestions,
  resetQuestionBank,
  getStoredSessions,
  clearStoredSessions,
  getAppSettings,
  saveAppSettings,
} from '../services/storage';
import { exportSessionsToCsv, exportQuestionsToJson, validateImportedQuestions } from '../services/exportService';
import { GOOGLE_APPS_SCRIPT_CODE } from '../data/googleAppsScriptTemplate';
import { checkServerConfigStatus, ConfigStatusResponse } from '../services/submissionService';
import { QuestionPreviewModal } from './QuestionPreviewModal';
import { QuestionEditorModal } from './QuestionEditorModal';
import {
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Edit3,
  Plus,
  Download,
  Upload,
  FileSpreadsheet,
  Trash2,
  Search,
  Filter,
  CheckCheck,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  Info,
  ExternalLink,
  Copy,
  Check,
  Mail,
  Code,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Send,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

interface TeacherCornerProps {
  onBackToGarden: () => void;
}

export const TeacherCorner: React.FC<TeacherCornerProps> = ({ onBackToGarden }) => {
  const [activeTab, setActiveTab] = useState<'questions' | 'results' | 'export' | 'pedagogy'>('questions');

  // Quản lý câu hỏi
  const [questions, setQuestions] = useState<QuestionItem[]>(getStoredQuestions());
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [previewingQuestion, setPreviewingQuestion] = useState<QuestionItem | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Xem kết quả
  const [sessions, setSessions] = useState<PracticeSessionRecord[]>(getStoredSessions());
  const [resultStudentFilter, setResultStudentFilter] = useState('');
  const [resultGroupFilter, setResultGroupFilter] = useState<string>('all');
  const [selectedSessionDetail, setSelectedSessionDetail] = useState<PracticeSessionRecord | null>(null);

  // Cấu hình Google Drive, Email & Webhook
  const currentSettings = getAppSettings();
  const [driveFolderUrl, setDriveFolderUrl] = useState(
    currentSettings.googleDriveFolderUrl || 'https://drive.google.com/drive/folders/1520GupI7gzTCezeHsO8qo-9QaCR3HVFH?usp=sharing'
  );
  const [teacherEmail, setTeacherEmail] = useState(currentSettings.teacherEmail || 'thanhhangttb2@gmail.com');
  const [webhookUrl, setWebhookUrl] = useState(currentSettings.submissionWebhookUrl || '');
  const [copiedScript, setCopiedScript] = useState(false);
  const [showScriptGuide, setShowScriptGuide] = useState(false);
  const [serverConfig, setServerConfig] = useState<ConfigStatusResponse | null>(null);
  const [testConnStatus, setTestConnStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testConnMessage, setTestConnMessage] = useState<string>('');

  // Kiểm tra trạng thái máy chủ thực tế
  useEffect(() => {
    let isMounted = true;
    checkServerConfigStatus().then((res) => {
      if (isMounted) setServerConfig(res);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Kiểm tra kết nối thử nghiệm tới Google Apps Script
  const handleTestConnection = async () => {
    setTestConnStatus('testing');
    setTestConnMessage('');
    try {
      const res = await fetch('/api/test-gas-connection', { method: 'POST' });
      const data = await res.json();
      if (data.ok) {
        setTestConnStatus('success');
        setTestConnMessage(data.message || 'Kết nối thành công! Đã ghi nhận bản ghi thử nghiệm vào Google Sheet.');
      } else {
        setTestConnStatus('error');
        setTestConnMessage(data.message || data.error || 'Kết nối Google Apps Script chưa thành công.');
      }
    } catch (err: unknown) {
      const error = err as Error;
      setTestConnStatus('error');
      setTestConnMessage(error.message || 'Lỗi mạng khi kiểm tra kết nối.');
    }
  };

  // Thông báo hành động
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSaveDriveSettings = () => {
    saveAppSettings({
      ...currentSettings,
      googleDriveFolderUrl:
        driveFolderUrl.trim() || 'https://drive.google.com/drive/folders/1520GupI7gzTCezeHsO8qo-9QaCR3HVFH?usp=sharing',
      teacherEmail: teacherEmail.trim() || 'thanhhangttb2@gmail.com',
      submissionWebhookUrl: webhookUrl.trim(),
    });
    showToast('Đã lưu cấu hình Google Drive & Email nhận bài thành công!');
  };

  // Duyệt 1 câu
  const handleApprove = (id: string) => {
    const updated = approveQuestion(id);
    setQuestions(updated);
    showToast('Đã duyệt câu hỏi thành công.');
  };

  // Ẩn / Hiện 1 câu
  const handleToggleHide = (id: string) => {
    const updated = toggleHideQuestion(id);
    setQuestions(updated);
    showToast('Đã cập nhật trạng thái câu hỏi.');
  };

  // Duyệt tất cả câu mẫu
  const handleApproveAll = () => {
    if (window.confirm('Thầy cô có chắc muốn duyệt tất cả các câu hỏi mẫu để học sinh bắt đầu luyện tập không?')) {
      const updated = approveAllQuestions();
      setQuestions(updated);
      showToast('Đã duyệt tất cả các câu hỏi mẫu vào kho luyện tập!');
    }
  };

  // Đặt lại ngân hàng câu hỏi
  const handleResetBank = (mode: 'draft' | 'approved') => {
    const confirmText = mode === 'approved'
      ? 'Thầy cô có muốn khôi phục 60 câu hỏi khởi đầu và duyệt sẵn cho học sinh?'
      : 'Thầy cô có muốn khôi phục 60 câu hỏi khởi đầu ở dạng bản nháp để duyệt lại từ đầu?';
    if (window.confirm(confirmText)) {
      const reset = resetQuestionBank(mode);
      setQuestions(reset);
      showToast(`Đã khôi phục ngân hàng 60 câu hỏi (${mode === 'approved' ? 'Đã duyệt' : 'Bản nháp'}).`);
    }
  };

  // Lưu câu hỏi sau khi sửa / thêm mới
  const handleSaveQuestion = (saved: QuestionItem) => {
    const exists = questions.some(q => q.id === saved.id);
    let updated: QuestionItem[];
    if (exists) {
      updated = questions.map(q => q.id === saved.id ? saved : q);
    } else {
      updated = [saved, ...questions];
    }
    setQuestions(updated);
    saveStoredQuestions(updated);
    showToast('Đã lưu thông tin câu hỏi.');
  };

  // Nhập câu hỏi từ tệp JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = validateImportedQuestions(content);
      if (result.valid) {
        if (window.confirm(`Tìm thấy ${result.questions.length} câu hỏi hợp lệ. Thầy cô có muốn thêm vào ngân hàng hiện tại không?`)) {
          // Gộp danh sách, ưu tiên câu mới nhập
          const existingMap = new Map(questions.map(q => [q.id, q]));
          result.questions.forEach(q => existingMap.set(q.id, q));
          const merged = Array.from(existingMap.values());
          setQuestions(merged);
          saveStoredQuestions(merged);
          showToast(`Đã nhập thành công ${result.questions.length} câu hỏi.`);
        }
      } else {
        alert(`Lỗi khi nhập tệp: ${result.error}`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Xóa sạch lịch sử luyện tập
  const handleClearSessions = () => {
    if (window.confirm('Thầy cô có chắc chắn muốn xóa toàn bộ lịch sử luyện tập của học sinh trên thiết bị này không? Hành động này không thể hoàn tác!')) {
      clearStoredSessions();
      setSessions([]);
      setSelectedSessionDetail(null);
      showToast('Đã xóa sạch lịch sử bài làm.');
    }
  };

  // Lọc danh sách câu hỏi
  const filteredQuestions = questions.filter(q => {
    const matchesSearch =
      q.sentence.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.correctAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = groupFilter === 'all' || q.group === groupFilter;
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  // Lọc danh sách kết quả học sinh
  const filteredSessions = sessions.filter(s => {
    const matchesStudent = !resultStudentFilter || s.studentId.toLowerCase().includes(resultStudentFilter.toLowerCase());
    const matchesGroup = resultGroupFilter === 'all' || s.group === resultGroupFilter;
    return matchesStudent && matchesGroup;
  });

  // Tính toán số liệu tổng quan sư phạm
  const approvedCount = questions.filter(q => q.status === 'approved').length;
  const draftCount = questions.filter(q => q.status === 'draft').length;
  const hiddenCount = questions.filter(q => q.status === 'hidden').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Toast thông báo */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Góc Giáo Viên */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 bg-slate-800 text-white rounded-2xl">
              <GraduationCap className="w-6 h-6 text-emerald-400" />
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
              Góc Giáo Viên
            </h1>
          </div>
          <p className="text-sm text-slate-600 max-w-xl">
            Quản trị ngân hàng câu hỏi, kiểm tra bài làm của học sinh và xuất dữ liệu báo cáo chuyên môn.
          </p>
        </div>

        {/* Thống kê nhanh */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
            <span className="block text-xl font-bold text-emerald-800 tabular-nums">{approvedCount}</span>
            <span className="text-xs text-emerald-700">Đã duyệt</span>
          </div>
          <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <span className="block text-xl font-bold text-amber-800 tabular-nums">{draftCount}</span>
            <span className="text-xs text-amber-700">Chờ duyệt</span>
          </div>
          <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="block text-xl font-bold text-slate-700 tabular-nums">{sessions.length}</span>
            <span className="text-xs text-slate-500">Lượt nộp</span>
          </div>
        </div>
      </div>

      {/* Thanh điều hướng 4 Tab */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'questions'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          A. Quản lí câu hỏi ({questions.length})
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'results'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          B. Xem kết quả ({sessions.length})
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'export'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          C. Xuất & Sao lưu
        </button>

        <button
          onClick={() => setActiveTab('pedagogy')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'pedagogy'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          D. Đề xuất sư phạm
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB A: QUẢN LÍ CÂU HỎI */}
      {/* ============================================================ */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Thanh công cụ tìm kiếm và lọc */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm câu hỏi theo nội dung, từ khóa hoặc mã ID..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700"
                >
                  <option value="all">Tất cả các nhóm</option>
                  <option value="ch_tr">ch / tr</option>
                  <option value="d_gi">d / gi</option>
                  <option value="v_d">v / d</option>
                  <option value="th_h">th / h</option>
                  <option value="r_g">r / g</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="draft">Bản nháp ({draftCount})</option>
                  <option value="approved">Đã duyệt ({approvedCount})</option>
                  <option value="hidden">Tạm ẩn ({hiddenCount})</option>
                </select>

                <button
                  onClick={() => {
                    setEditingQuestion(null);
                    setIsEditorOpen(true);
                  }}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm câu mới</span>
                </button>
              </div>
            </div>

            {/* Nút tác vụ hàng loạt */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                {draftCount > 0 && (
                  <button
                    onClick={handleApproveAll}
                    className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCheck className="w-4 h-4 text-emerald-700" />
                    <span>Duyệt tất cả {draftCount} câu đang chờ</span>
                  </button>
                )}

                <button
                  onClick={() => handleResetBank('approved')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
                  title="Khôi phục lại 60 câu khởi đầu đã kiểm tra"
                >
                  Đặt lại 60 câu chuẩn (Duyệt sẵn)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportQuestionsToJson(questions)}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Xuất JSON</span>
                </button>

                <label className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg flex items-center gap-1 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Nhập JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Danh sách câu hỏi */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Mã ID</th>
                    <th className="py-3 px-4">Nhóm chữ</th>
                    <th className="py-3 px-4">Câu hỏi / Ngữ cảnh</th>
                    <th className="py-3 px-4">Đáp án đúng</th>
                    <th className="py-3 px-4">Trạng thái</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuestions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        Không tìm thấy câu hỏi nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredQuestions.map((q) => {
                      const isApproved = q.status === 'approved';
                      const isHidden = q.status === 'hidden';

                      return (
                        <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-mono font-medium text-slate-800">{q.id}</td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-800">{SPELLING_GROUP_LABELS[q.group]?.short || q.group}</span>
                          </td>
                          <td className="py-3 px-4 max-w-sm font-medium text-slate-800">
                            {q.sentence}
                          </td>
                          <td className="py-3 px-4 font-bold text-emerald-800">{q.correctAnswer}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              isApproved
                                ? 'bg-emerald-100 text-emerald-800'
                                : isHidden
                                ? 'bg-slate-200 text-slate-700'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {isApproved ? 'Đã duyệt' : isHidden ? 'Tạm ẩn' : 'Bản nháp'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setPreviewingQuestion(q)}
                                className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                title="Xem thử giao diện học sinh"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => {
                                  setEditingQuestion(q);
                                  setIsEditorOpen(true);
                                }}
                                className="p-1.5 text-slate-500 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                                title="Sửa nội dung câu hỏi"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              {!isApproved ? (
                                <button
                                  onClick={() => handleApprove(q.id)}
                                  className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                                  title="Duyệt câu này"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleToggleHide(q.id)}
                                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                  title={isHidden ? 'Hiện lại' : 'Tạm ẩn'}
                                >
                                  {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB B: XEM KẾT QUẢ */}
      {/* ============================================================ */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={resultStudentFilter}
                onChange={(e) => setResultStudentFilter(e.target.value)}
                placeholder="Lọc theo mã học sinh..."
                className="p-2 rounded-xl border border-slate-200 text-xs w-full sm:w-48"
              />

              <select
                value={resultGroupFilter}
                onChange={(e) => setResultGroupFilter(e.target.value)}
                className="p-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700"
              >
                <option value="all">Tất cả nhóm</option>
                <option value="ch_tr">ch / tr</option>
                <option value="d_gi">d / gi</option>
                <option value="v_d">v / d</option>
                <option value="th_h">th / h</option>
                <option value="r_g">r / g</option>
                <option value="mixed">Tổng hợp</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">
                Hiển thị: <strong>{filteredSessions.length}</strong> lượt làm bài
              </span>
              <button
                type="button"
                onClick={() => exportSessionsToCsv(sessions)}
                className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                title="Tải toàn bộ kết quả về máy để đưa lên Google Drive"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất CSV cả lớp</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cột trái: Danh sách các phiên */}
            <div className="md:col-span-1 bg-white rounded-3xl border border-slate-200 p-4 space-y-3 max-h-[600px] overflow-y-auto">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Danh sách lượt luyện tập</h2>
              {filteredSessions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">Chưa có kết quả nào được ghi nhận.</p>
              ) : (
                filteredSessions.map((s) => {
                  const isSelected = selectedSessionDetail?.id === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSessionDetail(s)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-300'
                          : 'border-slate-100 hover:bg-slate-50 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 text-sm">{s.studentId}</span>
                        <span className="text-[10px] text-slate-400">{s.dateFormatted}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>{s.group === 'mixed' ? 'Vườn tổng hợp' : SPELLING_GROUP_LABELS[s.group as SpellingGroup]?.short}</span>
                        <span className="font-bold text-emerald-800">
                          {s.firstTryCorrectCount} / {s.totalQuestions} đúng
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px]">
                        <span className={`px-2 py-0.5 rounded-full font-bold ${s.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {s.completed ? 'Hoàn thành' : 'Đang dở'}
                        </span>
                        {s.isReview && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                            Ôn lại câu sai
                          </span>
                        )}
                        {s.isSubmitted && (
                          <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold">
                            ✓ Đã nộp bài
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Cột phải: Chi tiết phiên đã chọn */}
            <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
              {selectedSessionDetail ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Chi tiết bài làm: {selectedSessionDetail.studentId}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Thời gian: {selectedSessionDetail.dateFormatted} • {selectedSessionDetail.isReview ? 'Lượt ôn tập' : 'Lượt học mới'}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-700">Đúng ngay lần đầu:</span>
                      <p className="text-xl font-bold text-emerald-900 tabular-nums">
                        {selectedSessionDetail.firstTryCorrectCount} / {selectedSessionDetail.totalQuestions}
                      </p>
                    </div>
                  </div>

                  {/* Danh sách từng câu đã làm */}
                  <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                    {selectedSessionDetail.details.map((d, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">
                            Câu {idx + 1}: {d.questionSentence}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            d.outcome === 'first_try'
                              ? 'bg-emerald-100 text-emerald-800'
                              : d.outcome === 'revealed'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {d.outcome === 'first_try'
                              ? 'Đúng lần đầu'
                              : d.outcome === 'revealed'
                              ? 'Đã xem đáp án'
                              : d.outcome === 'after_hint'
                              ? 'Đúng sau gợi ý'
                              : 'Đúng sau thử lại'}
                          </span>
                        </div>

                        <div className="text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                          <span>Lựa chọn đầu tiên: <strong>{d.firstChoice || '(Chưa chọn)'}</strong></span>
                          <span>Số lần thử: <strong>{d.attempts.length}</strong></span>
                          <span>Số gợi ý dùng: <strong>{d.hintsUsed}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-sm">
                  <Info className="w-8 h-8 text-slate-300 mb-2" />
                  <p>Chọn một lượt luyện tập ở danh sách bên trái để xem chi tiết từng câu.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB C: XUẤT KẾT QUẢ & SAO LƯU */}
      {/* ============================================================ */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Xuất CSV */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl w-fit">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Xuất bảng tính kết quả (CSV)</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tệp CSV có gắn mã UTF-8 BOM, giúp giáo viên mở trực tiếp bằng Microsoft Excel mà không bị lỗi font tiếng Việt. Đã tích hợp tính năng ngăn ngừa CSV Formula Injection an toàn.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => exportSessionsToCsv(sessions)}
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải tệp kết quả (.CSV)</span>
                </button>
                <a
                  href={driveFolderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-300 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  title="Mở Google Drive trong tab mới để lưu trữ"
                >
                  <span>Mở Google Drive của cô</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Sao lưu JSON */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="p-3 bg-sky-50 text-sky-800 rounded-2xl w-fit">
                <Download className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Sao lưu ngân hàng câu hỏi (JSON)</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Xuất toàn bộ câu hỏi đã sửa hoặc bổ sung để sao lưu sang máy khác hoặc lưu trữ làm tài liệu giảng dạy cho các năm học tiếp theo.
              </p>
              <button
                onClick={() => exportQuestionsToJson(questions)}
                className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Tải tệp sao lưu câu hỏi (.JSON)</span>
              </button>
            </div>
          </div>

          {/* Cấu hình Google Drive, Email & Webhook nhận bài của học sinh */}
          <div className="bg-white p-6 rounded-3xl border border-sky-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sky-900 font-bold text-base font-heading">
                <span className="text-xl">📁</span>
                <span>Cấu hình Google Drive & Email nhận bài của Cô Hằng</span>
              </div>
              <span className="text-xs bg-sky-100 text-sky-800 font-bold px-2.5 py-1 rounded-full">
                Cô Lê Thị Thanh Hằng
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Thông tin cấu hình dùng để học sinh nộp bài sau khi hoàn thành bài tập. Kết quả sẽ được định hướng lưu trữ vào đúng thư mục Google Drive và gửi đến Email của cô.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Email cô giáo nhận bài
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder="thanhhangttb2@gmail.com"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Dùng cho nút &quot;Gửi Email cho Cô Hằng&quot; trên màn hình học sinh.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Đường dẫn thư mục Google Drive của cô
                </label>
                <input
                  type="text"
                  value={driveFolderUrl}
                  onChange={(e) => setDriveFolderUrl(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Thư mục chia sẻ học sinh nộp tệp bài làm vào.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Google Apps Script Webhook (Tự động 100%)
                </label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Ghi trực tiếp vào Google Trang tính không cần kéo thả.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleSaveDriveSettings}
                className="py-2.5 px-5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
              >
                Lưu cấu hình nhận bài
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowScriptGuide(!showScriptGuide)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{showScriptGuide ? 'Thu gọn hướng dẫn tự động' : 'Xem hướng dẫn tự động 100% vào Google Sheet'}</span>
                  {showScriptGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <a
                  href={driveFolderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1"
                >
                  <span>Mở thử thư mục Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* HỘP HƯỚNG DẪN CHI TIẾT DÀNH CHO CÔ HẰNG */}
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-3">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Giải đáp vì sao trên Google Drive của cô chưa thấy tệp xuất hiện:</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Thưa cô Hằng, Google Drive có cơ chế bảo mật rất nghiêm ngặt của Google. Một đường link thư mục chia sẻ (<code className="bg-white px-1 py-0.5 rounded text-amber-800">drive.google.com/drive/folders/...</code>) là địa chỉ lưu trữ, Google <strong>không cho phép bất kỳ trang web nào tự ý nạp/ghi tệp vào Drive của người khác</strong> nếu không có thao tác tải tệp lên (Upload) hoặc kết nối qua Google Apps Script.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="bg-white p-3 rounded-xl border border-amber-200/80 space-y-1">
                  <p className="font-bold text-emerald-800">Cách 1: Nhanh nhất cho cô</p>
                  <p className="text-[11px] text-slate-600">
                    Cô bấm nút <strong>&quot;Tải tệp kết quả (.CSV)&quot;</strong> ở trên, toàn bộ kết quả của học sinh sẽ được gom vào 1 file Excel duy nhất. Cô chỉ cần tải 1 file này lên Google Drive là có đủ hồ sơ lớp.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200/80 space-y-1">
                  <p className="font-bold text-sky-800">Cách 2: Học sinh nộp tệp lên Drive</p>
                  <p className="text-[11px] text-slate-600">
                    Khi học sinh bấm &quot;Nộp kết quả bài làm&quot;, tệp bảng điểm tự động tải về máy học sinh. Học sinh mở Drive của cô và kéo thả tệp vào hoặc bấm <strong>&quot;+ Mới&quot; &rarr; &quot;Tải tệp lên&quot;</strong>.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200/80 space-y-1">
                  <p className="font-bold text-purple-800">Cách 3: Tự động 100% vào Trang tính</p>
                  <p className="text-[11px] text-slate-600">
                    Cô gắn mã Google Apps Script bên dưới vào 1 file Google Trang tính. Khi học sinh bấm nộp, điểm số tự động chạy thẳng vào Google Sheet trên Drive của cô ngay lập tức!
                  </p>
                </div>
              </div>
            </div>

            {/* TRẠNG THÁI KẾT NỐI MÁY CHỦ THỰC TẾ & NÚT KIỂM TRA */}
            <div className={`p-4 rounded-2xl border text-xs space-y-3 ${
              serverConfig?.configured
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/90 border-amber-200 text-amber-950'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-2.5">
                  <span className={`w-3.5 h-3.5 rounded-full mt-0.5 sm:mt-0 shrink-0 ${serverConfig?.configured ? 'bg-emerald-600 animate-pulse' : 'bg-amber-500'}`} />
                  <div>
                    <p className="font-bold text-sm">
                      {serverConfig?.configured
                        ? 'Kết nối máy chủ: Đã cấu hình Web App URL & Khóa bảo mật'
                        : 'Kết nối máy chủ: Chưa cấu hình biến môi trường GOOGLE_APPS_SCRIPT_URL hoặc RESULTS_SHARED_SECRET'}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {serverConfig?.configured
                        ? 'Máy chủ đã sẵn sàng tiếp nhận và chuyển kết quả vào Google Sheets của cô.'
                        : 'Học sinh sẽ nhận thông báo "Chưa cấu hình kết nối" và có thể dùng tính năng tải CSV / gửi Zalo dự phòng.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testConnStatus === 'testing' || !serverConfig?.configured}
                    className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                      testConnStatus === 'testing'
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : !serverConfig?.configured
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95'
                    }`}
                  >
                    {testConnStatus === 'testing' ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang kiểm tra...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Kiểm tra kết nối Google Sheets</span>
                      </>
                    )}
                  </button>

                  <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] shrink-0 ${
                    serverConfig?.configured ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                  }`}>
                    {serverConfig?.configured ? 'Đã kích hoạt' : 'Chưa cấu hình'}
                  </span>
                </div>
              </div>

              {/* KẾT QUẢ KIỂM TRA THỰC TẾ TRỰC TIẾP */}
              {testConnStatus === 'success' && (
                <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-emerald-900 flex items-start gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Tuyệt vời! Kết nối tới Google Sheets hoạt động hoàn hảo:</p>
                    <p className="text-[11px] mt-0.5">{testConnMessage}</p>
                  </div>
                </div>
              )}

              {testConnStatus === 'error' && (
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-300 text-rose-900 space-y-1 animate-fadeIn">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Chưa thể gửi dữ liệu vào Google Apps Script:</p>
                      <p className="text-[11px] mt-0.5 leading-relaxed font-medium text-rose-800">{testConnMessage}</p>
                    </div>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-lg border border-rose-200 text-[11px] text-slate-700 mt-2 space-y-1">
                    <p className="font-bold text-slate-800">💡 Hướng dẫn cô khắc phục trong 30 giây:</p>
                    <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-slate-600">
                      <li>Mở Google Apps Script chứa mã <code className="bg-slate-100 px-1 rounded">Code.gs</code> của cô.</li>
                      <li>Bấm <strong>Triển khai (Deploy)</strong> &rarr; <strong>Quản lý bản triển khai (Manage deployments)</strong>.</li>
                      <li>Bấm vào biểu tượng cây bút chì <strong>Chỉnh sửa (Edit)</strong>.</li>
                      <li>Ở mục <strong>Ai có quyền truy cập (Who has access)</strong>: Chọn <strong>&quot;Bất kỳ ai&quot; (Anyone)</strong>.</li>
                      <li>Ở mục <strong>Thực thi dưới quyền (Execute as)</strong>: Chọn <strong>&quot;Tôi&quot; (Me)</strong>.</li>
                      <li>Bấm <strong>Triển khai (Deploy)</strong> rồi quay lại đây bấm <strong>&quot;Kiểm tra kết nối Google Sheets&quot;</strong> lần nữa!</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {/* HỘP HƯỚNG DẪN CHI TIẾT DÀNH CHO CÔ HẰNG */}
            <div className="p-4 bg-sky-50/80 rounded-2xl border border-sky-200 text-xs text-sky-950 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sky-900 text-sm">
                <FileSpreadsheet className="w-4 h-4 text-sky-700 shrink-0" />
                <span>Quy trình tích hợp Google Sheets dành cho Cô Lê Thị Thanh Hằng:</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Để kết quả học sinh gửi được lưu trực tiếp vào bảng tính cá nhân của cô mà không cần học sinh thao tác kéo thả, hệ thống sử dụng kiến trúc máy chủ chuyển tiếp tới <strong>Google Apps Script Web App</strong> ghi vào hai trang tính: <strong>TongHop</strong> (tổng quan) và <strong>ChiTiet</strong> (từng câu làm bài).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="bg-white p-3 rounded-xl border border-sky-200/80 space-y-1">
                  <p className="font-bold text-emerald-800">1. Không lộ khóa xác thực</p>
                  <p className="text-[11px] text-slate-600">
                    Khóa xác thực <code className="bg-slate-100 px-1 rounded">SHARED_SECRET</code> được bảo vệ hoàn toàn trên máy chủ và trong Script Properties, không xuất hiện ở trình duyệt học sinh.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-sky-200/80 space-y-1">
                  <p className="font-bold text-sky-800">2. Chống ghi trùng & Lỗi mạng</p>
                  <p className="text-[11px] text-slate-600">
                    Mỗi lượt có <code className="bg-slate-100 px-1 rounded">attemptId</code> duy nhất. Nếu rớt mạng hoặc bấm gửi lại, Apps Script chỉ bổ sung phần thiếu, tuyệt đối không tạo dòng trùng.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-sky-200/80 space-y-1">
                  <p className="font-bold text-purple-800">3. An toàn công thức (Anti-Injection)</p>
                  <p className="text-[11px] text-slate-600">
                    Các ký tự đặc biệt được tự động gắn dấu nháy để ngăn diễn giải thành công thức trong bảng tính, bảo vệ tính toàn vẹn của hồ sơ.
                  </p>
                </div>
              </div>
            </div>

            {/* HƯỚNG DẪN CÀI ĐẶT GOOGLE APPS SCRIPT CHO CÔ */}
            {showScriptGuide && (
              <div className="p-5 bg-slate-900 text-slate-200 rounded-3xl space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Code className="w-5 h-5" />
                    <span>Bộ mã Google Apps Script hoàn chỉnh (Code.gs):</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
                      setCopiedScript(true);
                      setTimeout(() => setCopiedScript(false), 3000);
                    }}
                    className="py-1.5 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    {copiedScript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedScript ? 'Đã sao chép mã Code.gs!' : 'Sao chép toàn bộ mã Code.gs'}</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <p className="font-bold text-amber-300 text-sm">Các bước thiết lập trong 3 phút:</p>
                  
                  <ol className="space-y-2 list-decimal pl-5 leading-relaxed">
                    <li>
                      <strong>Tạo Google Sheets mới:</strong> Mở Google Drive của cô, bấm <em>Mới</em> &rarr; <em>Google Trang tính</em>, đặt tên ví dụ: <code className="text-emerald-300">Ket_Qua_Chinh_Ta_Lop2</code>.
                    </li>
                    <li>
                      <strong>Lấy SPREADSHEET_ID:</strong> Nhìn vào thanh địa chỉ trình duyệt của trang tính, sao chép chuỗi ký tự nằm giữa <code className="text-sky-300">/d/</code> và <code className="text-sky-300">/edit</code> (đây là <code className="text-amber-300 font-mono">SPREADSHEET_ID</code>).
                    </li>
                    <li>
                      <strong>Mở Apps Script:</strong> Trên thanh menu của trang tính, chọn <strong>Tiện ích mở rộng (Extensions)</strong> &rarr; <strong>Apps Script</strong>.
                    </li>
                    <li>
                      <strong>Dán mã:</strong> Xóa toàn bộ mã mặc định và dán đoạn mã bên dưới vào tệp <code className="text-emerald-300">Code.gs</code>.
                    </li>
                    <li>
                      <strong>Cấu hình Script Properties:</strong> Ở cột bên trái, bấm vào biểu tượng bánh răng <strong>Cài đặt dự án (Project Settings ⚙️)</strong> &rarr; Cuộn xuống phần <strong>Thuộc tính tập lệnh (Script Properties)</strong> &rarr; Bấm <em>Chỉnh sửa thuộc tính tập lệnh</em> &rarr; Thêm 2 thuộc tính:
                      <ul className="list-disc pl-5 pt-1 space-y-1 text-slate-200">
                        <li>Thuộc tính: <code className="text-amber-300 font-mono">SPREADSHEET_ID</code> &rarr; Giá trị: dán ID bảng tính ở bước 2.</li>
                        <li>Thuộc tính: <code className="text-amber-300 font-mono">SHARED_SECRET</code> &rarr; Giá trị: đặt một chuỗi bí mật bất kỳ (ví dụ: <code className="text-emerald-300 font-mono">HangTTB2_SecretKey_2026</code>).</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Triển khai Web App:</strong> Bấm nút màu xanh <strong>Triển khai (Deploy)</strong> ở góc trên bên phải &rarr; <strong>Triển khai mới (New deployment)</strong> &rarr; Chọn loại: <strong>Ứng dụng web (Web app)</strong>:
                      <ul className="list-disc pl-5 pt-1 space-y-1 text-slate-200">
                        <li>Thực thi dưới dạng (Execute as): <strong>Tôi (Me)</strong></li>
                        <li>Ai có quyền truy cập (Who has access): <strong>Bất kỳ ai (Anyone)</strong></li>
                      </ul>
                      Bấm <strong>Triển khai</strong> &rarr; Cấp quyền truy cập nếu Google yêu cầu &rarr; Sao chép <strong>URL Ứng dụng web</strong> (có đuôi <code className="text-amber-300 font-mono">/exec</code>).
                    </li>
                    <li>
                      <strong>Cấu hình biến môi trường trên máy chủ:</strong>
                      <ul className="list-disc pl-5 pt-1 space-y-1 text-slate-200">
                        <li><code className="text-amber-300 font-mono">GOOGLE_APPS_SCRIPT_URL</code>: URL Web App vừa sao chép ở bước 6.</li>
                        <li><code className="text-amber-300 font-mono">RESULTS_SHARED_SECRET</code>: Chuỗi khóa bí mật đã đặt ở bước 5.</li>
                      </ul>
                    </li>
                  </ol>

                  <div className="p-3 bg-amber-950/50 rounded-xl border border-amber-600/40 text-[11px] text-amber-200">
                    <strong>⚠️ Lưu ý với tài khoản trường học Google Workspace:</strong> Nếu tài khoản trường học hạn chế tùy chọn <em>&quot;Ai có quyền truy cập&quot;</em> chỉ trong nội bộ trường, cô hãy nhờ Quản trị viên Google Workspace của trường bật quyền chia sẻ Web App ra ngoài, hoặc cô có thể tạo trang tính bằng tài khoản cá nhân (như <code className="font-mono">thanhhangttb2@gmail.com</code>) để triển khai thuận lợi nhất.
                  </div>
                </div>

                {/* Khung hiển thị mã */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Nội dung tệp Code.gs hoàn chỉnh:</span>
                    <span className="font-mono text-[10px]">Đã tối ưu hóa LockService & Idempotency</span>
                  </div>
                  <pre className="p-4 bg-black/80 rounded-2xl text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-[380px] overflow-y-auto border border-slate-800">
{GOOGLE_APPS_SCRIPT_CODE}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Dọn dẹp dữ liệu an toàn */}
          <div className="bg-rose-50/70 p-6 rounded-3xl border border-rose-200 space-y-3">
            <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-600" />
              Dọn dẹp lịch sử luyện tập
            </h3>
            <p className="text-xs text-rose-800">
              Xóa sạch các lượt làm bài của học sinh để chuẩn bị cho lượt khảo sát mới. Hãy chắc chắn thầy cô đã xuất file CSV lưu lại trước khi bấm nút này.
            </p>
            <button
              onClick={handleClearSessions}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Xác nhận xóa toàn bộ lịch sử bài làm
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB D: ĐỀ XUẤT SƯ PHẠM */}
      {/* ============================================================ */}
      {activeTab === 'pedagogy' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-lg font-heading">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <span>Gợi ý sư phạm từ dữ liệu quan sát thực tế</span>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-600" />
                Nguyên tắc sư phạm cốt lõi:
              </p>
              <p>
                - Tôn trọng ngữ âm địa phương của học sinh. Sự khác biệt trong phát âm không phải là &ldquo;sai&rdquo;, mà là nét đẹp phương ngữ.
              </p>
              <p>
                - Trọng tâm của chính tả lớp 2 là giúp các em nhận biết <strong>nghĩa của từ trong ngữ cảnh câu văn</strong> và viết đúng chữ quốc ngữ.
              </p>
              <p>
                - Tuyệt đối không suy đoán năng lực hay phẩm chất của học sinh chỉ qua vài câu trắc nghiệm.
              </p>
            </div>

            {/* Phân tích quan sát từng nhóm */}
            <div className="space-y-3 pt-2">
              <h2 className="text-sm font-bold text-slate-800">Khảo sát xu hướng dễ nhầm lẫn theo nhóm chữ:</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">1. Nhóm ch / tr:</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Học sinh thường phân vân giữa <em>chăn</em> (đồ đắp) với <em>trăn</em> (loài bò sát), <em>chè</em> với <em>trè</em>. Thầy cô nên gắn từ với vật thể trực quan trong gia đình và thiên nhiên làng quê.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">2. Nhóm d / gi:</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Học sinh hay nhầm ở các từ như <em>dòng sông</em> (dòng nước chảy liên tục), <em>giày thể thao</em> (đi ở chân) và <em>dày</em> (độ dày quyển sách). Nhấn mạnh sự đối lập ý nghĩa trong câu.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">3. Nhóm v / d:</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cần phân biệt rõ hành động <em>dắt tay</em> (dẫn đi an toàn) và <em>vắt khăn</em> (vắt nước), cuốn <em>vở</em> học sinh và làm <em>dở</em> dang.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">4. Nhóm khảo sát th / h và r / g:</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Đây là hai nhóm chữ giáo viên đưa vào diện khảo sát theo vùng miền. Hãy theo dõi xem học sinh có nhầm <em>thỏ</em> - <em>hỏ</em>, <em>thước</em> - <em>hước</em>, <em>rùa</em> - <em>gùa</em> hay <em>rơm</em> - <em>gơm</em> không để có kế hoạch tăng cường từ vựng phù hợp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thông báo minh bạch về Lưu Trữ & Quyền Riêng Tư */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-500 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <ShieldAlert className="w-4 h-4 text-slate-400" />
          <span>Thông báo lưu trữ cục bộ & Quyền riêng tư:</span>
        </div>
        <p>
          - Dữ liệu câu hỏi, tiến độ và lịch sử làm bài được lưu trữ trên trình duyệt của thiết bị này. Không tự động đồng bộ sang thiết bị khác hoặc dịch vụ đám mây bên ngoài.
        </p>
        <p>
          - Mã học sinh chỉ dùng để phân biệt các lượt làm bài, không phải tài khoản bảo mật. Thầy cô vui lòng xuất tệp CSV lưu trữ định kỳ.
        </p>
      </div>

      {/* Modals */}
      <QuestionPreviewModal
        question={previewingQuestion}
        onClose={() => setPreviewingQuestion(null)}
        onApprove={handleApprove}
        onToggleHide={handleToggleHide}
      />

      <QuestionEditorModal
        question={editingQuestion}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingQuestion(null);
        }}
        onSave={handleSaveQuestion}
      />
    </div>
  );
};
