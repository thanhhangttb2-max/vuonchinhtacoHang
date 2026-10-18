import React from 'react';
import { Volume2, VolumeX, Eye, GraduationCap, Home } from 'lucide-react';
import { AppSettings } from '../types';

interface NavbarProps {
  currentView: 'student_welcome' | 'student_practice' | 'student_summary' | 'teacher_corner';
  onNavigate: (view: 'student_welcome' | 'teacher_corner') => void;
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  settings,
  onUpdateSettings,
  onOpenGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100/80 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('student_welcome')}
          className="text-left group flex items-center gap-2 cursor-pointer focus-visible:outline-emerald-600 rounded-lg"
          title="Về trang bắt đầu"
        >
          <span className="text-xl md:text-2xl font-extrabold text-emerald-800 tracking-tight font-heading group-hover:text-emerald-600 transition-colors whitespace-nowrap shrink-0">
            🌱 Vườn Chữ Vui
          </span>
        </button>

        {/* Zone 2: Concise Nav Links & Audio/Motion controls */}
        <nav className="flex items-center gap-2 sm:gap-4 text-xs md:text-sm font-medium text-slate-600">
          <button
            onClick={onOpenGuide}
            className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 focus-visible:ring-2 ring-emerald-500"
          >
            Hướng dẫn
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 focus-visible:ring-2 ring-emerald-500 ${
              settings.soundEnabled
                ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                : 'text-slate-400 bg-slate-100 hover:bg-slate-200'
            }`}
            title={settings.soundEnabled ? 'Âm thanh: Đang bật (nhấp để tắt)' : 'Âm thanh: Đang tắt (nhấp để bật)'}
            aria-label={settings.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-xs">{settings.soundEnabled ? 'Âm thanh' : 'Tắt tiếng'}</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 focus-visible:ring-2 ring-emerald-500 ${
              settings.reducedMotion
                ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
            title={settings.reducedMotion ? 'Đang giảm chuyển động' : 'Chuyển động tự nhiên'}
            aria-label="Tùy chọn giảm chuyển động"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden md:inline text-xs">{settings.reducedMotion ? 'Giảm hiệu ứng' : 'Hiệu ứng'}</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          {currentView === 'teacher_corner' ? (
            <button
              onClick={() => onNavigate('student_welcome')}
              className="px-3.5 py-2 text-xs md:text-sm font-bold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 focus-visible:ring-2 ring-emerald-500"
            >
              <Home className="w-4 h-4" />
              <span>Về khu vườn</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('teacher_corner')}
              className="px-3.5 py-2 text-xs md:text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5 focus-visible:ring-2 ring-slate-600"
            >
              <GraduationCap className="w-4 h-4 text-emerald-300" />
              <span>Góc giáo viên</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
