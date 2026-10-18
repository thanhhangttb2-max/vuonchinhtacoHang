import React from 'react';

export type MascotMood = 'happy' | 'thinking' | 'cheering' | 'encouraging' | 'neutral';

interface GardenMascotProps {
  mood?: MascotMood;
  className?: string;
  size?: number;
  message?: string;
}

export const GardenMascot: React.FC<GardenMascotProps> = ({
  mood = 'neutral',
  className = '',
  size = 100,
  message,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        role="img"
        aria-label="Linh vật Bé Mầm Chữ thân thiện"
      >
        <defs>
          <linearGradient id="potGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="sproutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BBF7D0" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
        </defs>

        {/* Chậu hoa nhỏ xinh */}
        <path
          d="M32 75 L38 108 C39 113 43 116 48 116 L72 116 C77 116 81 113 82 108 L88 75 Z"
          fill="url(#potGrad)"
        />
        <rect x="28" y="70" width="64" height="9" rx="4.5" fill="#F97316" />
        <ellipse cx="60" cy="74" rx="28" ry="4" fill="#C2410C" opacity="0.3" />

        {/* Thân mầm hạt cây bụ bẫm */}
        <ellipse cx="60" cy="58" rx="26" ry="24" fill="#FEF08A" />
        <ellipse cx="60" cy="58" rx="24" ry="22" fill="#FEF9C3" />

        {/* Hai chiếc lá mầm trên đỉnh đầu */}
        {mood === 'cheering' ? (
          // Lá vươn cao hân hoan
          <g>
            <path
              d="M60 36 C50 18 36 22 40 34 C44 44 56 38 60 36 Z"
              fill="url(#leafGrad)"
            />
            <path
              d="M60 36 C70 18 84 22 80 34 C76 44 64 38 60 36 Z"
              fill="url(#leafGrad)"
            />
            {/* Tia sáng nhỏ vui tươi */}
            <circle cx="36" cy="16" r="3" fill="#FBBF24" />
            <circle cx="84" cy="16" r="3" fill="#FBBF24" />
          </g>
        ) : mood === 'thinking' ? (
          // Một lá nghiêng tò mò
          <g>
            <path
              d="M58 36 C52 20 40 22 42 34 C45 42 54 38 58 36 Z"
              fill="url(#leafGrad)"
            />
            <path
              d="M62 36 C72 26 86 32 80 42 C74 48 64 40 62 36 Z"
              fill="url(#leafGrad)"
            />
          </g>
        ) : (
          // Lá mầm vẫy nhẹ tiêu chuẩn
          <g>
            <path
              d="M60 36 C48 24 38 28 42 38 C46 46 56 40 60 36 Z"
              fill="url(#leafGrad)"
            />
            <path
              d="M60 36 C72 24 82 28 78 38 C74 46 64 40 60 36 Z"
              fill="url(#leafGrad)"
            />
          </g>
        )}

        {/* Hai má hồng hào dễ thương */}
        <ellipse cx="45" cy="62" rx="4.5" ry="3.5" fill="#FCA5A5" opacity="0.8" />
        <ellipse cx="75" cy="62" rx="4.5" ry="3.5" fill="#FCA5A5" opacity="0.8" />

        {/* Mắt linh vật theo từng trạng thái */}
        {mood === 'cheering' ? (
          <g stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round">
            {/* Mắt cười tít hình trăng khuyết */}
            <path d="M48 54 Q52 48 56 54" />
            <path d="M64 54 Q68 48 72 54" />
          </g>
        ) : mood === 'thinking' ? (
          <g>
            <ellipse cx="51" cy="53" rx="4" ry="4.5" fill="#1E293B" />
            <ellipse cx="71" cy="51" rx="4" ry="4.5" fill="#1E293B" />
            <circle cx="53" cy="51" r="1.5" fill="#FFFFFF" />
            <circle cx="73" cy="49" r="1.5" fill="#FFFFFF" />
          </g>
        ) : mood === 'encouraging' ? (
          <g>
            {/* Một mắt mở to, một mắt nháy cười động viên */}
            <ellipse cx="50" cy="54" rx="4" ry="4.5" fill="#1E293B" />
            <circle cx="52" cy="52" r="1.5" fill="#FFFFFF" />
            <path d="M66 54 Q70 50 74 54" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            {/* Mắt tròn long lanh thân thiện */}
            <ellipse cx="50" cy="54" rx="4" ry="4.5" fill="#1E293B" />
            <ellipse cx="70" cy="54" rx="4" ry="4.5" fill="#1E293B" />
            <circle cx="52" cy="52" r="1.5" fill="#FFFFFF" />
            <circle cx="72" cy="52" r="1.5" fill="#FFFFFF" />
          </g>
        )}

        {/* Miệng cười xinh xắn */}
        {mood === 'cheering' ? (
          <path
            d="M52 63 Q60 74 68 63"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#EF4444"
          />
        ) : mood === 'thinking' ? (
          <ellipse cx="60" cy="64" rx="2.5" ry="3" fill="#1E293B" />
        ) : (
          <path
            d="M53 63 Q60 70 67 63"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Đôi tay lá nhỏ xíu bên hông chậu */}
        {mood === 'cheering' ? (
          <g>
            <path d="M30 78 Q22 65 26 58 C28 56 34 65 32 78 Z" fill="#4ADE80" />
            <path d="M90 78 Q98 65 94 58 C92 56 86 65 88 78 Z" fill="#4ADE80" />
          </g>
        ) : (
          <g>
            <path d="M32 80 Q22 84 26 89 C28 91 34 86 34 80 Z" fill="#4ADE80" />
            <path d="M88 80 Q98 84 94 89 C92 91 86 86 86 80 Z" fill="#4ADE80" />
          </g>
        )}
      </svg>

      {message && (
        <div className="relative bg-white border border-emerald-200 shadow-sm rounded-2xl px-4 py-2.5 max-w-xs md:max-w-md text-emerald-900 text-sm font-medium">
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-y-6 border-y-transparent border-r-8 border-r-white" />
          {message}
        </div>
      )}
    </div>
  );
};
