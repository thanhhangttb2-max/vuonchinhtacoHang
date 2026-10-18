import React from 'react';

interface IllustrationProps {
  nameKey: string;
  altText: string;
  className?: string;
  size?: number;
}

export const IllustrationGarden: React.FC<IllustrationProps> = ({
  nameKey,
  altText,
  className = '',
  size = 180,
}) => {
  const renderSvgContent = () => {
    switch (nameKey) {
      case 'chan_am':
        return (
          // Chiếc chăn bông ấm áp trên giường
          <g>
            <rect x="25" y="65" width="110" height="60" rx="8" fill="#E2E8F0" />
            <rect x="30" y="55" width="40" height="20" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
            {/* Chăn bông hoa văn ấm áp */}
            <path d="M25 72 C50 68 110 68 135 72 L135 120 C110 124 50 124 25 120 Z" fill="#F472B6" />
            <path d="M35 85 Q80 80 125 85" stroke="#FDF2F8" strokeWidth="3" strokeDasharray="6 6" />
            <path d="M35 100 Q80 95 125 100" stroke="#FDF2F8" strokeWidth="3" strokeDasharray="6 6" />
            {/* Bông tuyết nhỏ ngoài cửa sổ biểu thị mùa đông */}
            <circle cx="130" cy="30" r="14" fill="#E0F2FE" />
            <path d="M130 22 L130 38 M122 30 L138 30" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'rang_tre':
        return (
          // Rặng tre xanh làng quê
          <g>
            <rect x="40" y="20" width="14" height="120" rx="4" fill="#22C55E" />
            <line x1="40" y1="50" x2="54" y2="50" stroke="#15803D" strokeWidth="3" />
            <line x1="40" y1="85" x2="54" y2="85" stroke="#15803D" strokeWidth="3" />
            <rect x="75" y="10" width="16" height="130" rx="4" fill="#16A34A" />
            <line x1="75" y1="45" x2="91" y2="45" stroke="#14532D" strokeWidth="3" />
            <line x1="75" y1="80" x2="91" y2="80" stroke="#14532D" strokeWidth="3" />
            <line x1="75" y1="115" x2="91" y2="115" stroke="#14532D" strokeWidth="3" />
            <rect x="115" y="30" width="12" height="110" rx="3" fill="#4ADE80" />
            {/* Lá tre */}
            <path d="M54 50 Q75 40 85 55" stroke="#15803D" strokeWidth="3" fill="none" />
            <path d="M40 85 Q20 75 10 90" stroke="#15803D" strokeWidth="3" fill="none" />
            <path d="M91 45 Q120 35 130 50" stroke="#14532D" strokeWidth="3" fill="none" />
          </g>
        );

      case 'cay_choi':
        return (
          // Cây chổi rơm quét nhà
          <g>
            <rect x="76" y="15" width="8" height="75" rx="3" fill="#D97706" />
            <path d="M80 85 L50 135 L110 135 Z" fill="#FBBF24" />
            <path d="M60 100 L100 100" stroke="#B45309" strokeWidth="3" />
            <path d="M55 120 L105 120" stroke="#B45309" strokeWidth="3" />
            <circle cx="80" cy="18" r="3" fill="#78350F" />
            {/* Vài chiếc lá khô nhỏ bên cạnh */}
            <path d="M120 125 C125 115 135 120 130 130 Z" fill="#CA8A04" />
          </g>
        );

      case 'vang_trang':
        return (
          // Vầng trăng tròn vàng rực
          <g>
            <rect width="160" height="160" rx="20" fill="#0F172A" />
            <circle cx="80" cy="80" r="46" fill="#FDE047" filter="drop-shadow(0px 0px 12px #FACC15)" />
            <circle cx="70" cy="70" r="42" fill="#FEF08A" />
            {/* Vài ngôi sao nhỏ xung quanh */}
            <circle cx="30" cy="40" r="2.5" fill="#FFFFFF" />
            <circle cx="130" cy="50" r="2" fill="#FFFFFF" />
            <circle cx="120" cy="120" r="3" fill="#FFFFFF" />
            <circle cx="45" cy="115" r="2" fill="#FFFFFF" />
          </g>
        );

      case 'trai_bong':
        return (
          // Trái bóng đá tròn xoe
          <g>
            <circle cx="80" cy="80" r="50" fill="#F8FAFC" stroke="#0F172A" strokeWidth="4" />
            <polygon points="80,62 94,72 89,88 71,88 66,72" fill="#0F172A" />
            <line x1="80" y1="62" x2="80" y2="40" stroke="#0F172A" strokeWidth="3" />
            <line x1="94" y1="72" x2="114" y2="62" stroke="#0F172A" strokeWidth="3" />
            <line x1="89" y1="88" x2="105" y2="105" stroke="#0F172A" strokeWidth="3" />
            <line x1="71" y1="88" x2="55" y2="105" stroke="#0F172A" strokeWidth="3" />
            <line x1="66" y1="72" x2="46" y2="62" stroke="#0F172A" strokeWidth="3" />
          </g>
        );

      case 'bat_che':
        return (
          // Bát chè ngọt mát
          <g>
            <ellipse cx="80" cy="110" rx="45" ry="12" fill="#E2E8F0" />
            <path d="M40 75 Q80 140 120 75 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
            <ellipse cx="80" cy="75" rx="40" ry="12" fill="#78350F" />
            <circle cx="70" cy="74" r="5" fill="#451A03" />
            <circle cx="86" cy="76" r="6" fill="#451A03" />
            <circle cx="95" cy="73" r="4.5" fill="#451A03" />
            {/* Thìa nhỏ */}
            <path d="M100 60 Q115 45 130 35" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
          </g>
        );

      case 'doi_chan':
        return (
          // Đôi bàn chân sạch sẽ
          <g>
            <ellipse cx="60" cy="90" rx="16" ry="24" fill="#FDBA74" />
            <circle cx="50" cy="62" r="5" fill="#FDBA74" />
            <circle cx="58" cy="60" r="4.5" fill="#FDBA74" />
            <circle cx="65" cy="61" r="4" fill="#FDBA74" />
            <circle cx="71" cy="64" r="3.5" fill="#FDBA74" />
            <circle cx="75" cy="68" r="3" fill="#FDBA74" />

            <ellipse cx="100" cy="90" rx="16" ry="24" fill="#FDBA74" />
            <circle cx="110" cy="62" r="5" fill="#FDBA74" />
            <circle cx="102" cy="60" r="4.5" fill="#FDBA74" />
            <circle cx="95" cy="61" r="4" fill="#FDBA74" />
            <circle cx="89" cy="64" r="3.5" fill="#FDBA74" />
            <circle cx="85" cy="68" r="3" fill="#FDBA74" />
          </g>
        );

      case 'chu_chim':
        return (
          // Chú chim nhỏ trên cành
          <g>
            <path d="M30 115 Q90 120 145 110" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="80" cy="80" rx="28" ry="22" fill="#38BDF8" />
            <circle cx="62" cy="68" r="16" fill="#0284C7" />
            <polygon points="46,68 34,73 46,78" fill="#F97316" />
            <circle cx="58" cy="65" r="3" fill="#FFFFFF" />
            <circle cx="57" cy="65" r="1.5" fill="#0F172A" />
            <path d="M85 80 Q115 75 110 95 Z" fill="#0369A1" />
          </g>
        );

      case 'o_trung':
        return (
          // Ổ trứng gà
          <g>
            <ellipse cx="80" cy="110" rx="55" ry="22" fill="#CA8A04" />
            <path d="M35 105 Q80 135 125 105" stroke="#EAB308" strokeWidth="8" strokeLinecap="round" />
            {/* Các quả trứng */}
            <ellipse cx="65" cy="95" rx="14" ry="18" fill="#FEF08A" stroke="#FDE047" strokeWidth="2" />
            <ellipse cx="95" cy="95" rx="14" ry="18" fill="#FEF08A" stroke="#FDE047" strokeWidth="2" />
            <ellipse cx="80" cy="85" rx="15" ry="19" fill="#FFFBEB" stroke="#FDE047" strokeWidth="2" />
          </g>
        );

      case 'trang_sach':
        return (
          // Quyển sách mở ra từng trang
          <g>
            <rect x="25" y="45" width="55" height="75" rx="4" fill="#F8FAFC" stroke="#0284C7" strokeWidth="3" />
            <rect x="80" y="45" width="55" height="75" rx="4" fill="#F8FAFC" stroke="#0284C7" strokeWidth="3" />
            {/* Dòng kẻ sách */}
            <line x1="35" y1="60" x2="70" y2="60" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="35" y1="75" x2="70" y2="75" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="35" y1="90" x2="65" y2="90" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="90" y1="60" x2="125" y2="60" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="90" y1="75" x2="125" y2="75" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="90" y1="90" x2="115" y2="90" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'chu_bo_doi':
        return (
          // Chú bộ đội
          <g>
            <rect x="55" y="80" width="50" height="60" rx="8" fill="#15803D" />
            <circle cx="80" cy="60" r="20" fill="#FDBA74" />
            {/* Mũ cối có ngôi sao vàng */}
            <path d="M55 52 Q80 32 105 52 Z" fill="#166534" />
            <rect x="52" y="50" width="56" height="6" rx="3" fill="#14532D" />
            <polygon points="80,38 82,44 88,44 83,47 85,52 80,49 75,52 77,47 72,44 78,44" fill="#FACC15" />
            {/* Mắt và nụ cười tươi */}
            <circle cx="73" cy="60" r="2" fill="#0F172A" />
            <circle cx="87" cy="60" r="2" fill="#0F172A" />
            <path d="M75 66 Q80 70 85 66" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'con_ca':
        return (
          // Con cá bơi trong nước
          <g>
            <path d="M40 80 Q80 40 120 80 Q80 120 40 80 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
            <polygon points="120,80 145,60 140,80 145,100" fill="#0284C7" />
            <circle cx="60" cy="75" r="4" fill="#FFFFFF" />
            <circle cx="59" cy="75" r="2" fill="#0F172A" />
            <path d="M85 70 Q95 80 85 90" stroke="#0284C7" strokeWidth="2" fill="none" />
            {/* Bong bóng nước */}
            <circle cx="35" cy="65" r="4" fill="#E0F2FE" />
            <circle cx="28" cy="50" r="6" fill="#E0F2FE" />
          </g>
        );

      case 'dua_hau':
        return (
          // Miếng dưa hấu đỏ tươi
          <g>
            <path d="M30 60 A65 65 0 0 0 130 60 Z" fill="#EF4444" stroke="#15803D" strokeWidth="8" />
            <path d="M32 60 A63 63 0 0 0 128 60 Z" stroke="#DC2626" strokeWidth="3" fill="#EF4444" />
            {/* Hạt dưa hấu đen */}
            <circle cx="65" cy="75" r="2.5" fill="#0F172A" />
            <circle cx="95" cy="75" r="2.5" fill="#0F172A" />
            <circle cx="80" cy="85" r="2.5" fill="#0F172A" />
            <circle cx="80" cy="68" r="2.5" fill="#0F172A" />
          </g>
        );

      case 'ngon_gio':
        return (
          // Ngọn gió mát lành
          <g>
            <path d="M25 60 C60 60 80 50 85 45 C90 40 85 30 75 35 C68 40 75 50 85 50" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M35 85 C80 85 110 75 120 70 C125 65 120 55 110 60 C105 65 110 75 125 75" stroke="#0EA5E9" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M20 110 C50 110 90 100 100 95" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Lá bay */}
            <path d="M125 40 Q135 30 140 45 Z" fill="#22C55E" />
            <path d="M90 120 Q105 110 100 125 Z" fill="#4ADE80" />
          </g>
        );

      case 'doi_giay':
        return (
          // Đôi giày thể thao
          <g>
            <path d="M30 105 L45 80 L75 80 L90 95 L110 95 Q115 115 90 115 L35 115 Z" fill="#3B82F6" />
            <rect x="30" y="112" width="85" height="8" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="60" y1="85" x2="75" y2="92" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="65" y1="92" x2="80" y2="99" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="85" r="4" fill="#1D4ED8" />
          </g>
        );

      case 'canh_dieu':
        return (
          // Cánh diều bay lượn
          <g>
            <polygon points="80,25 115,65 80,115 45,65" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            <polygon points="80,25 115,65 80,65" fill="#EF4444" />
            <polygon points="45,65 80,65 80,115" fill="#3B82F6" />
            <line x1="80" y1="25" x2="80" y2="115" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="45" y1="65" x2="115" y2="65" stroke="#FFFFFF" strokeWidth="2" />
            {/* Dây đuôi diều có nơ */}
            <path d="M80 115 Q95 130 90 145" stroke="#64748B" strokeWidth="2" fill="none" />
            <polygon points="86,130 96,128 92,135" fill="#EC4899" />
            <polygon points="88,142 98,140 94,147" fill="#10B981" />
          </g>
        );

      case 'lan_da':
        return (
          // Bàn tay mịn màng sạch sẽ
          <g>
            <circle cx="80" cy="80" r="50" fill="#FEF3C7" />
            <rect x="65" y="75" width="30" height="40" rx="8" fill="#FDE68A" />
            <circle cx="70" cy="65" r="6" fill="#FDE68A" />
            <circle cx="80" cy="60" r="6" fill="#FDE68A" />
            <circle cx="90" cy="65" r="6" fill="#FDE68A" />
            {/* Bong bóng xà phòng sạch sẽ */}
            <circle cx="50" cy="50" r="8" fill="#E0F2FE" opacity="0.8" />
            <circle cx="110" cy="60" r="10" fill="#E0F2FE" opacity="0.8" />
          </g>
        );

      case 'gieng_nuoc':
        return (
          // Giếng nước gạch cổ
          <g>
            <ellipse cx="80" cy="115" rx="45" ry="16" fill="#64748B" />
            <path d="M35 115 L40 85 L120 85 L125 115 Z" fill="#94A3B8" />
            <ellipse cx="80" cy="85" rx="40" ry="14" fill="#0284C7" />
            {/* Trụ và gàu múc */}
            <line x1="45" y1="85" x2="45" y2="35" stroke="#78350F" strokeWidth="4" />
            <line x1="115" y1="85" x2="115" y2="35" stroke="#78350F" strokeWidth="4" />
            <line x1="40" y1="35" x2="120" y2="35" stroke="#78350F" strokeWidth="5" />
            <rect x="73" y="55" width="14" height="18" rx="3" fill="#D97706" />
          </g>
        );

      case 'dong_song':
        return (
          // Dòng sông xanh uốn lượn
          <g>
            <rect width="160" height="160" rx="20" fill="#DCFCE7" />
            <path d="M0 60 Q50 90 90 60 T160 90 L160 140 Q110 110 70 140 T0 110 Z" fill="#38BDF8" />
            {/* Thuyền nhỏ xa xa */}
            <polygon points="120,68 135,68 128,62" fill="#B91C1C" />
          </g>
        );

      case 'giot_suong':
        return (
          // Giọt sương sớm
          <g>
            {/* Chiếc lá xanh */}
            <path d="M25 120 C50 60 120 50 145 90 C110 140 60 135 25 120 Z" fill="#22C55E" />
            <line x1="25" y1="120" x2="135" y2="85" stroke="#15803D" strokeWidth="3" />
            {/* Giọt sương trong veo */}
            <path d="M85 55 C85 55 70 80 70 90 A15 15 0 0 0 100 90 C100 80 85 55 85 55 Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" />
            <circle cx="80" cy="85" r="3" fill="#FFFFFF" />
          </g>
        );

      case 'cay_dua':
        return (
          // Cây dừa xanh mát
          <g>
            <path d="M75 145 Q85 90 70 35" stroke="#92400E" strokeWidth="10" strokeLinecap="round" fill="none" />
            {/* Tán lá dừa xòe */}
            <path d="M70 35 Q40 20 20 40" stroke="#15803D" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M70 35 Q100 20 125 35" stroke="#15803D" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M70 35 Q50 50 30 70" stroke="#15803D" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M70 35 Q95 50 120 65" stroke="#15803D" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Quả dừa xanh */}
            <circle cx="65" cy="42" r="5" fill="#65A30D" />
            <circle cx="75" cy="43" r="5.5" fill="#65A30D" />
          </g>
        );

      case 'giup_do':
        return (
          // Hai bàn tay giúp đỡ nhau
          <g>
            <circle cx="80" cy="80" r="50" fill="#EFF6FF" />
            <path d="M45 85 L70 75 L85 85 L65 95 Z" fill="#FDBA74" />
            <path d="M115 75 L90 85 L75 75 L95 65 Z" fill="#FCA5A5" />
            <circle cx="80" cy="65" r="8" fill="#EF4444" />
          </g>
        );

      case 'to_giay':
        return (
          // Tờ giấy trắng tinh
          <g>
            <rect x="45" y="30" width="70" height="95" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
            <line x1="55" y1="50" x2="95" y2="50" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
            <line x1="55" y1="65" x2="105" y2="65" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
            <line x1="55" y1="80" x2="100" y2="80" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
            <polygon points="100,30 115,45 100,45" fill="#CBD5E1" />
          </g>
        );

      case 'cap_da':
        return (
          // Cặp da học sinh
          <g>
            <rect x="40" y="60" width="80" height="60" rx="8" fill="#78350F" />
            <path d="M40 60 L80 90 L120 60 Z" fill="#92400E" />
            <rect x="74" y="85" width="12" height="10" rx="2" fill="#FBBF24" />
            {/* Quai xách */}
            <path d="M65 60 C65 45 95 45 95 60" stroke="#451A03" strokeWidth="4" fill="none" />
          </g>
        );

      case 'quyen_vo':
        return (
          // Quyển vở ô ly
          <g>
            <rect x="40" y="35" width="80" height="95" rx="6" fill="#3B82F6" />
            <rect x="52" y="45" width="56" height="75" rx="4" fill="#FFFFFF" />
            <line x1="48" y1="35" x2="48" y2="130" stroke="#1D4ED8" strokeWidth="3" />
            {/* Nhãn vở */}
            <rect x="60" y="60" width="40" height="20" rx="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
            <line x1="65" y1="70" x2="95" y2="70" stroke="#CA8A04" strokeWidth="1.5" />
          </g>
        );

      case 'be_vui':
        return (
          // Bé cười vui vẻ
          <g>
            <circle cx="80" cy="80" r="45" fill="#FEF08A" />
            <circle cx="65" cy="72" r="4" fill="#0F172A" />
            <circle cx="95" cy="72" r="4" fill="#0F172A" />
            <circle cx="58" cy="82" r="5" fill="#FCA5A5" />
            <circle cx="102" cy="82" r="5" fill="#FCA5A5" />
            <path d="M65 88 Q80 108 95 88 Z" fill="#EF4444" />
          </g>
        );

      case 'dat_tay':
        return (
          // Dắt tay đi bộ an toàn
          <g>
            <circle cx="65" cy="50" r="14" fill="#FDBA74" />
            <circle cx="100" cy="65" r="11" fill="#FDBA74" />
            <rect x="57" y="66" width="16" height="35" rx="5" fill="#3B82F6" />
            <rect x="93" y="78" width="14" height="25" rx="4" fill="#EC4899" />
            {/* Hai bàn tay đan vào nhau */}
            <line x1="72" y1="80" x2="93" y2="88" stroke="#FDBA74" strokeWidth="6" strokeLinecap="round" />
          </g>
        );

      case 've_sau':
        return (
          // Ve sầu
          <g>
            <ellipse cx="80" cy="80" rx="16" ry="30" fill="#78350F" />
            <ellipse cx="80" cy="55" rx="12" ry="10" fill="#451A03" />
            <circle cx="70" cy="52" r="4" fill="#DC2626" />
            <circle cx="90" cy="52" r="4" fill="#DC2626" />
            {/* Cánh mỏng trong suốt */}
            <ellipse cx="65" cy="85" rx="14" ry="32" fill="#BAE6FD" opacity="0.6" stroke="#0284C7" strokeWidth="1" />
            <ellipse cx="95" cy="85" rx="14" ry="32" fill="#BAE6FD" opacity="0.6" stroke="#0284C7" strokeWidth="1" />
          </g>
        );

      case 'chu_voi':
        return (
          // Chú voi con có vòi dài
          <g>
            <circle cx="80" cy="80" r="38" fill="#94A3B8" />
            {/* Tai voi to */}
            <ellipse cx="45" cy="75" rx="16" ry="24" fill="#64748B" />
            <ellipse cx="115" cy="75" rx="16" ry="24" fill="#64748B" />
            <circle cx="70" cy="72" r="3" fill="#0F172A" />
            <circle cx="90" cy="72" r="3" fill="#0F172A" />
            {/* Vòi voi dài uốn cong */}
            <path d="M80 82 Q80 115 95 110 Q105 105 100 95" stroke="#94A3B8" strokeWidth="9" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'dau_tay':
        return (
          // Quả dâu tây đỏ mọng
          <g>
            <path d="M80 120 C50 110 40 70 55 55 C70 40 90 40 105 55 C120 70 110 110 80 120 Z" fill="#EF4444" />
            {/* Tai lá xanh trên đầu */}
            <polygon points="80,45 68,32 75,45 80,30 85,45 92,32" fill="#15803D" />
            {/* Hạt dâu tây vàng */}
            <circle cx="65" cy="65" r="1.5" fill="#FEF08A" />
            <circle cx="80" cy="70" r="1.5" fill="#FEF08A" />
            <circle cx="95" cy="65" r="1.5" fill="#FEF08A" />
            <circle cx="72" cy="85" r="1.5" fill="#FEF08A" />
            <circle cx="88" cy="85" r="1.5" fill="#FEF08A" />
            <circle cx="80" cy="100" r="1.5" fill="#FEF08A" />
          </g>
        );

      case 've_nha':
        return (
          // Ngôi nhà ấm cúng đón bé về
          <g>
            <rect x="50" y="75" width="60" height="50" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
            <polygon points="40,75 80,35 120,75" fill="#DC2626" />
            <rect x="70" y="95" width="20" height="30" fill="#78350F" />
            <rect x="55" y="85" width="12" height="12" fill="#60A5FA" />
            <circle cx="85" cy="110" r="2" fill="#FBBF24" />
          </g>
        );

      case 'do_danh':
        return (
          // Ôm ấp dỗ dành
          <g>
            <circle cx="65" cy="65" r="22" fill="#FDBA74" />
            <circle cx="95" cy="80" r="16" fill="#FDBA74" />
            <path d="M50 85 Q75 110 110 95" stroke="#F472B6" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M60 62 Q65 66 70 62" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'dan_vit':
        return (
          // Chú vịt vàng
          <g>
            <ellipse cx="85" cy="95" rx="30" ry="20" fill="#FACC15" />
            <circle cx="60" cy="75" r="18" fill="#FACC15" />
            <polygon points="45,75 30,78 45,82" fill="#FB923C" />
            <circle cx="58" cy="72" r="3" fill="#0F172A" />
            {/* Lượn sóng nước */}
            <path d="M25 115 Q55 105 85 115 T145 115" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'mau_vang':
        return (
          // Bông hoa cúc vàng rực rỡ
          <g>
            <circle cx="80" cy="80" r="20" fill="#D97706" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <ellipse key={i} cx="80" cy="45" rx="10" ry="22" fill="#FACC15" transform={`rotate(${deg} 80 80)`} />
            ))}
          </g>
        );

      case 'vay_tay':
        return (
          // Bàn tay vẫy chào
          <g>
            <rect x="70" y="80" width="20" height="40" rx="6" fill="#FDBA74" />
            <circle cx="80" cy="65" r="18" fill="#FDBA74" />
            {/* Các ngón tay vẫy */}
            <rect x="66" y="40" width="6" height="20" rx="3" fill="#FDBA74" />
            <rect x="74" y="35" width="6" height="24" rx="3" fill="#FDBA74" />
            <rect x="82" y="37" width="6" height="22" rx="3" fill="#FDBA74" />
            <rect x="90" y="43" width="6" height="18" rx="3" fill="#FDBA74" />
            {/* Đường gợn sóng vẫy chào */}
            <path d="M105 40 Q115 50 105 60" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'khu_vuon':
        return (
          // Khu vườn hoa quả
          <g>
            <rect width="160" height="160" rx="20" fill="#DCFCE7" />
            <circle cx="45" cy="70" r="30" fill="#22C55E" />
            <circle cx="115" cy="75" r="32" fill="#16A34A" />
            <rect x="40" y="90" width="10" height="50" fill="#78350F" />
            <rect x="110" y="95" width="10" height="45" fill="#78350F" />
            {/* Hoa đỏ và vàng */}
            <circle cx="80" cy="125" r="8" fill="#EF4444" />
            <circle cx="70" cy="130" r="6" fill="#FACC15" />
          </g>
        );

      case 'chu_tho':
        return (
          // Chú thỏ trắng
          <g>
            <circle cx="80" cy="85" r="32" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
            {/* Tai dài */}
            <ellipse cx="68" cy="40" rx="8" ry="25" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
            <ellipse cx="68" cy="40" rx="4" ry="18" fill="#FCE7F3" />
            <ellipse cx="92" cy="40" rx="8" ry="25" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
            <ellipse cx="92" cy="40" rx="4" ry="18" fill="#FCE7F3" />
            {/* Mắt đỏ hồng */}
            <circle cx="72" cy="80" r="4" fill="#EF4444" />
            <circle cx="88" cy="80" r="4" fill="#EF4444" />
            <ellipse cx="80" cy="88" rx="3" ry="2" fill="#F472B6" />
          </g>
        );

      case 'bong_hoa':
        return (
          // Bông hoa hồng nở rộ
          <g>
            <line x1="80" y1="80" x2="80" y2="140" stroke="#15803D" strokeWidth="5" />
            <path d="M80 110 Q60 100 50 115 Z" fill="#22C55E" />
            <path d="M80 120 Q100 110 110 125 Z" fill="#22C55E" />
            {/* Cánh hoa hồng đỏ */}
            <circle cx="80" cy="65" r="28" fill="#DC2626" />
            <circle cx="80" cy="65" r="20" fill="#EF4444" />
            <circle cx="80" cy="65" r="12" fill="#F87171" />
          </g>
        );

      case 'thuyen_buom':
        return (
          // Chiếc thuyền buồm trên sóng
          <g>
            <path d="M35 105 L125 105 L110 125 L50 125 Z" fill="#78350F" />
            <line x1="80" y1="40" x2="80" y2="105" stroke="#451A03" strokeWidth="4" />
            <polygon points="80,45 115,95 80,95" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="80,50 55,95 80,95" fill="#38BDF8" />
            {/* Làn sóng */}
            <path d="M20 130 Q50 120 80 130 T140 130" stroke="#0284C7" strokeWidth="4" fill="none" />
          </g>
        );

      case 'hoc_bai':
        return (
          // Ngồi học bài
          <g>
            <rect x="40" y="85" width="80" height="40" rx="4" fill="#D97706" />
            <circle cx="80" cy="55" r="16" fill="#FDBA74" />
            <rect x="70" y="70" width="20" height="20" fill="#3B82F6" />
            {/* Đèn bàn học màu xanh */}
            <path d="M110 85 L110 55 L95 60" stroke="#64748B" strokeWidth="3" fill="none" />
            <polygon points="95,55 90,65 102,68" fill="#10B981" />
          </g>
        );

      case 'hit_tho':
        return (
          // Hít thở không khí trong lành
          <g>
            <circle cx="80" cy="70" r="35" fill="#FEF08A" />
            <circle cx="70" cy="65" r="3" fill="#0F172A" />
            <circle cx="90" cy="65" r="3" fill="#0F172A" />
            <path d="M72 78 Q80 86 88 78" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Luồng khí mát lành xanh ngọc */}
            <path d="M45 40 Q60 50 75 45" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M85 45 Q100 50 115 40" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'cat_hat':
        return (
          // Cất tiếng hát nốt nhạc
          <g>
            <circle cx="70" cy="75" r="28" fill="#FDBA74" />
            <ellipse cx="78" cy="80" rx="6" ry="8" fill="#DC2626" />
            {/* Nốt nhạc bay bổng */}
            <circle cx="110" cy="50" r="5" fill="#8B5CF6" />
            <line x1="115" y1="50" x2="115" y2="30" stroke="#8B5CF6" strokeWidth="3" />
            <circle cx="130" cy="40" r="5" fill="#EC4899" />
            <line x1="135" y1="40" x2="135" y2="20" stroke="#EC4899" strokeWidth="3" />
            <line x1="115" y1="30" x2="135" y2="20" stroke="#8B5CF6" strokeWidth="3" />
          </g>
        );

      case 'cay_thuoc':
        return (
          // Cây thước kẻ
          <g>
            <rect x="25" y="70" width="110" height="25" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
            {[35, 45, 55, 65, 75, 85, 95, 105, 115, 125].map((x, i) => (
              <line key={i} x1={x} y1="70" x2={x} y2={i % 2 === 0 ? "82" : "76"} stroke="#78350F" strokeWidth="2" />
            ))}
          </g>
        );

      case 'ho_nuoc':
        return (
          // Hồ nước trong xanh
          <g>
            <rect width="160" height="160" rx="20" fill="#DCFCE7" />
            <ellipse cx="80" cy="85" rx="55" ry="35" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
            <ellipse cx="80" cy="85" rx="45" ry="25" fill="#7DD3FC" />
            <circle cx="60" cy="80" r="4" fill="#FFFFFF" />
          </g>
        );

      case 'dia_thit':
        return (
          // Đĩa thịt kho vàng óng
          <g>
            <ellipse cx="80" cy="100" rx="50" ry="20" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
            <rect x="60" y="80" width="22" height="18" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
            <rect x="85" y="82" width="20" height="16" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="75" cy="94" r="7" fill="#FEF08A" />
          </g>
        );

      case 'chu_huou':
        return (
          // Chú hươu sao
          <g>
            <ellipse cx="80" cy="90" rx="32" ry="22" fill="#D97706" />
            <circle cx="60" cy="65" r="16" fill="#D97706" />
            {/* Đốm sao trắng */}
            <circle cx="85" cy="85" r="2.5" fill="#FFFFFF" />
            <circle cx="95" cy="88" r="2.5" fill="#FFFFFF" />
            <circle cx="78" cy="95" r="2.5" fill="#FFFFFF" />
            {/* Sừng hươu */}
            <path d="M58 52 L54 38 M54 44 L48 40" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
            <path d="M64 52 L68 38 M68 44 L74 40" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'hat_gao':
        return (
          // Bát gạo trắng ngần
          <g>
            <ellipse cx="80" cy="105" rx="45" ry="18" fill="#CBD5E1" />
            <path d="M40 75 Q80 130 120 75 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
            <ellipse cx="80" cy="75" rx="40" ry="14" fill="#FFFFFF" />
            {/* Các hạt gạo trắng mẩy */}
            <ellipse cx="70" cy="74" rx="4" ry="2" fill="#F8FAFC" stroke="#E2E8F0" />
            <ellipse cx="82" cy="73" rx="4" ry="2" fill="#F8FAFC" stroke="#E2E8F0" />
            <ellipse cx="94" cy="75" rx="4" ry="2" fill="#F8FAFC" stroke="#E2E8F0" />
          </g>
        );

      case 'thon_xom':
        return (
          // Thôn xóm bình yên
          <g>
            <rect width="160" height="160" rx="20" fill="#FEF3C7" />
            <polygon points="40,90 65,65 90,90" fill="#DC2626" />
            <rect x="45" y="90" width="40" height="30" fill="#FEF08A" />
            <polygon points="85,95 110,70 135,95" fill="#EA580C" />
            <rect x="90" y="95" width="40" height="25" fill="#FEF08A" />
            {/* Cây xanh bên đường làng */}
            <circle cx="135" cy="85" r="16" fill="#15803D" />
          </g>
        );

      case 'con_rua':
        return (
          // Bác rùa mai xanh
          <g>
            <ellipse cx="80" cy="85" rx="36" ry="26" fill="#15803D" stroke="#14532D" strokeWidth="2" />
            <path d="M55 85 L105 85 M80 60 L80 110" stroke="#86EFAC" strokeWidth="2" />
            <circle cx="120" cy="85" r="12" fill="#4ADE80" />
            <circle cx="124" cy="82" r="2" fill="#0F172A" />
            {/* Bốn chân rùa */}
            <circle cx="55" cy="65" r="7" fill="#4ADE80" />
            <circle cx="105" cy="65" r="7" fill="#4ADE80" />
            <circle cx="55" cy="105" r="7" fill="#4ADE80" />
            <circle cx="105" cy="105" r="7" fill="#4ADE80" />
          </g>
        );

      case 'chu_ga':
        return (
          // Chú gà trống mào đỏ
          <g>
            <ellipse cx="80" cy="85" rx="26" ry="22" fill="#F59E0B" />
            <circle cx="62" cy="68" r="15" fill="#F59E0B" />
            <polygon points="48,68 36,72 48,76" fill="#EA580C" />
            {/* Mào gà đỏ */}
            <path d="M56 55 Q62 45 68 55 Q74 46 76 56" fill="#DC2626" />
            <circle cx="59" cy="65" r="2.5" fill="#0F172A" />
            {/* Đuôi gà cong vút */}
            <path d="M98 80 Q125 55 120 95" stroke="#15803D" strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'khu_rung':
        return (
          // Khu rừng cây
          <g>
            <rect width="160" height="160" rx="20" fill="#DCFCE7" />
            <polygon points="50,110 80,50 110,110" fill="#166534" />
            <polygon points="75,125 105,65 135,125" fill="#15803D" />
            <polygon points="25,125 55,70 85,125" fill="#22C55E" />
          </g>
        );

      case 'chiec_goi':
        return (
          // Chiếc gối êm
          <g>
            <rect x="35" y="55" width="90" height="55" rx="14" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />
            <path d="M45 65 Q80 80 115 65" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M45 100 Q80 85 115 100" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'luong_rau':
        return (
          // Luống rau xanh
          <g>
            <rect x="25" y="80" width="110" height="45" rx="8" fill="#78350F" />
            {[45, 65, 85, 105, 120].map((x, i) => (
              <circle key={i} cx={x} cy="75" r="10" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            ))}
          </g>
        );

      case 'chiec_ghe':
        return (
          // Chiếc ghế gỗ
          <g>
            <rect x="50" y="70" width="60" height="10" rx="3" fill="#D97706" />
            {/* Chân ghế */}
            <rect x="54" y="80" width="6" height="45" rx="2" fill="#B45309" />
            <rect x="100" y="80" width="6" height="45" rx="2" fill="#B45309" />
            {/* Lưng tựa */}
            <rect x="52" y="35" width="6" height="40" rx="2" fill="#B45309" />
            <rect x="52" y="38" width="56" height="10" rx="2" fill="#D97706" />
          </g>
        );

      case 'chiec_ro':
        return (
          // Chiếc rổ tre đan
          <g>
            <ellipse cx="80" cy="70" rx="48" ry="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
            <path d="M32 70 Q80 130 128 70 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
            {/* Đan mắt cáo */}
            <line x1="50" y1="75" x2="105" y2="105" stroke="#CA8A04" strokeWidth="1.5" />
            <line x1="110" y1="75" x2="55" y2="105" stroke="#CA8A04" strokeWidth="1.5" />
          </g>
        );

      case 'chiec_guong':
        return (
          // Chiếc gương soi
          <g>
            <ellipse cx="80" cy="70" rx="35" ry="42" fill="#FBBF24" />
            <ellipse cx="80" cy="70" rx="30" ry="36" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
            {/* Tay cầm */}
            <rect x="76" y="110" width="8" height="35" rx="4" fill="#F59E0B" />
            <path d="M70 55 L85 45" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          </g>
        );

      case 'dong_rom':
        return (
          // Đống rơm vàng
          <g>
            <path d="M40 125 C40 60 70 45 80 40 C90 45 120 60 120 125 Z" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
            <line x1="50" y1="85" x2="110" y2="85" stroke="#CA8A04" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="45" y1="105" x2="115" y2="105" stroke="#CA8A04" strokeWidth="2" strokeDasharray="4 4" />
          </g>
        );

      case 'vien_gach':
        return (
          // Viên gạch đỏ
          <g>
            <polygon points="40,80 90,55 130,70 80,95" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
            <polygon points="40,80 80,95 80,120 40,105" fill="#DC2626" stroke="#B91C1C" strokeWidth="2" />
            <polygon points="80,95 130,70 130,95 80,120" fill="#B91C1C" stroke="#991B1B" strokeWidth="2" />
          </g>
        );

      case 're_cay':
        return (
          // Rễ cây đâm sâu vào đất
          <g>
            <line x1="20" y1="50" x2="140" y2="50" stroke="#15803D" strokeWidth="5" />
            <rect x="74" y="20" width="12" height="30" fill="#78350F" />
            {/* Chùm rễ */}
            <path d="M80 50 Q70 80 50 115" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M80 50 Q85 85 80 125" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M80 50 Q95 75 115 110" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'chu_gau':
        return (
          // Chú gấu bông
          <g>
            <circle cx="80" cy="85" r="32" fill="#D97706" />
            {/* Hai tai tròn */}
            <circle cx="56" cy="58" r="10" fill="#D97706" />
            <circle cx="56" cy="58" r="5" fill="#FDE68A" />
            <circle cx="104" cy="58" r="10" fill="#D97706" />
            <circle cx="104" cy="58" r="5" fill="#FDE68A" />
            {/* Mặt và mũi */}
            <ellipse cx="80" cy="90" rx="14" ry="10" fill="#FEF3C7" />
            <circle cx="70" cy="78" r="3" fill="#0F172A" />
            <circle cx="90" cy="78" r="3" fill="#0F172A" />
            <polygon points="80,88 76,84 84,84" fill="#0F172A" />
          </g>
        );

      default:
        // Dự phòng mặc định: Bông hoa khu vườn chữ
        return (
          <g>
            <circle cx="80" cy="80" r="48" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="3" />
            <circle cx="80" cy="80" r="22" fill="#FBBF24" />
            <circle cx="80" cy="50" r="14" fill="#4ADE80" />
            <circle cx="110" cy="80" r="14" fill="#4ADE80" />
            <circle cx="80" cy="110" r="14" fill="#4ADE80" />
            <circle cx="50" cy="80" r="14" fill="#4ADE80" />
          </g>
        );
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center p-3 rounded-2xl bg-white/90 border border-emerald-100 shadow-sm ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={altText}
        className="w-full max-w-[200px] h-auto aspect-square drop-shadow-sm select-none"
      >
        {renderSvgContent()}
      </svg>
      {altText && (
        <span className="sr-only">{altText}</span>
      )}
    </div>
  );
};
