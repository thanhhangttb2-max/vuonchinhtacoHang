import { QuestionItem } from '../types';

export const STARTER_QUESTIONS: QuestionItem[] = [
  // ==========================================
  // NHÓM 1: CH / TR (12 câu)
  // ==========================================
  {
    id: 'ch_tr_01',
    group: 'ch_tr',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Mẹ đắp chiếc ... ấm cho em khi gió mùa đông tràn về.',
    targetWord: 'chăn',
    options: ['chăn', 'trăn'],
    correctAnswer: 'chăn',
    completedSentence: 'Mẹ đắp chiếc chăn ấm cho em khi gió mùa đông tràn về.',
    explanation: 'Trong câu này, "chăn" là đồ dùng ấm để đắp khi ngủ. "Trăn" là tên một loài bò sát to lớn. Vì câu nói về đồ đắp mùa đông nên ta chọn "chăn".',
    specificFeedbacks: {
      'trăn': 'Từ "trăn" là tên một loài trăn bò sát, không phải đồ dùng để đắp ngủ ấm bạn nhé.'
    },
    hint: 'Đây là đồ vật mềm ấm mẹ thường đắp cho bé ngủ vào ban đêm.',
    illustrationKey: 'chan_am',
    imageAlt: 'Chiếc chăn bông ấm áp trên giường ngủ',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },
  {
    id: 'ch_tr_02',
    group: 'ch_tr',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Rặng ... xanh rì rào nghiêng bóng bên bờ ao làng quê.',
    targetWord: 'tre',
    options: ['tre', 'che'],
    correctAnswer: 'tre',
    completedSentence: 'Rặng tre xanh rì rào nghiêng bóng bên bờ ao làng quê.',
    explanation: 'Cây "tre" là loài cây quen thuộc ở làng quê Việt Nam, viết bằng "tr". Nếu viết "che" thì mang nghĩa che chở, che mưa nắng.',
    specificFeedbacks: {
      'che': 'Từ "che" mang nghĩa che mưa, che nắng, không phải tên loài cây tre xanh bạn nhé.'
    },
    hint: 'Loài cây thân đốt có nhiều gióng, gắn liền với làng quê Việt Nam.',
    illustrationKey: 'rang_tre',
    imageAlt: 'Rặng tre xanh mướt đu đưa trước gió',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },
  {
    id: 'ch_tr_03',
    group: 'ch_tr',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Bà ngoại nấu nồi ... đậu đen thơm ngọt cho cả nhà thưởng thức.',
    targetWord: 'chè',
    options: ['chè', 'trà'],
    correctAnswer: 'chè',
    completedSentence: 'Bà ngoại nấu nồi chè đậu đen thơm ngọt cho cả nhà thưởng thức.',
    explanation: 'Món ăn ngọt nấu từ đỗ, ngô hoặc hạt sen được viết là "chè" (ch). Từ "trà" dùng để chỉ lá trà pha nước uống giải khát.',
    specificFeedbacks: {
      'trà': 'Từ "trà" chỉ nước trà uống giải khát. Món ngọt nấu từ đậu đen phải là nồi "chè" bạn nhé.'
    },
    hint: 'Món nước ngọt mát lành thường nấu từ các loại hạt đậu.',
    illustrationKey: 'bat_che',
    imageAlt: 'Bát chè đậu đen ngọt thơm mát',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },
  {
    id: 'ch_tr_04',
    group: 'ch_tr',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Bé cầm cây ... nhỏ quét sạch lá khô rụng trước sân nhà.',
    targetWord: 'chổi',
    options: ['chổi', 'trồi'],
    correctAnswer: 'chổi',
    completedSentence: 'Bé cầm cây chổi nhỏ quét sạch lá khô rụng trước sân nhà.',
    explanation: 'Dụng cụ dùng để quét nhà, quét sân viết đúng chính tả là "chổi" (ch). Từ "trồi" mang nghĩa nhô lên như mầm non trồi lên khỏi mặt đất.',
    specificFeedbacks: {
      'trồi': 'Từ "trồi" mang nghĩa trồi lên khỏi mặt đất. Vật dụng quét sạch lá rụng trước sân là cây "chổi" bạn nhé.'
    },
    hint: 'Vật dụng thường để ở góc nhà dùng quét sạch bụi bẩn và lá rụng.',
    illustrationKey: 'cay_choi',
    imageAlt: 'Cây chổi rơm quét nhà gọn gàng',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },
  {
    id: 'ch_tr_05',
    group: 'ch_tr',
    questionType: 'choose_word',
    supportLevel: 'guided',
    sentence: 'Đêm rằm tháng Tám, ánh ... tròn vành vạnh chiếu sáng khắp xóm thôn.',
    targetWord: 'trăng',
    options: ['trăng', 'chăng'],
    correctAnswer: 'trăng',
    completedSentence: 'Đêm rằm tháng Tám, ánh trăng tròn vành vạnh chiếu sáng khắp xóm thôn.',
    explanation: 'Mặt trăng trên bầu trời viết là "trăng" (tr). Từ "chăng" thường dùng để hỏi (phải chăng) hoặc giăng mắc dây đèn.',
    specificFeedbacks: {
      'chăng': 'Ánh sáng tròn trên trời đêm rằm là ánh "trăng" viết bằng "tr" bạn nha.'
    },
    hint: 'Vầng sáng soi bóng trên cao vào ban đêm, tỏa ánh sáng dịu mát.',
    illustrationKey: 'vang_trang',
    imageAlt: 'Vầng trăng tròn vàng rực rỡ ban đêm',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },
  {
    id: 'ch_tr_06',
    group: 'ch_tr',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Bố mua cho em một ... bóng đá màu xanh rất đẹp.',
    targetWord: 'trái',
    options: ['trái', 'chái'],
    correctAnswer: 'trái',
    completedSentence: 'Bố mua cho em một trái bóng đá màu xanh rất đẹp.',
    explanation: 'Từ "trái" chỉ quả hoặc quả bóng tròn viết đúng bằng chữ "tr". Chữ "chái" thường chỉ chái nhà phụ bên cạnh gian chính.',
    specificFeedbacks: {
      'chái': 'Quả bóng hay trái cây viết bằng "tr" (trái bóng). Từ "chái" chỉ chái nhà bạn nhé.'
    },
    hint: 'Từ đồng nghĩa với "quả" bóng, để các bạn cùng đá trên sân cỏ.',
    illustrationKey: 'trai_bong',
    imageAlt: 'Quả bóng đá tròn xoe màu sắc tươi tắn',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },
  {
    id: 'ch_tr_07',
    group: 'ch_tr',
    questionType: 'find_fix',
    supportLevel: 'advanced',
    sentence: 'Bé rửa sạch đôi trân sau khi đi dạo ngoài vườn.',
    targetWord: 'chân',
    options: ['chân', 'trân'],
    correctAnswer: 'chân',
    completedSentence: 'Bé rửa sạch đôi chân sau khi đi dạo ngoài vườn.',
    explanation: 'Bộ phận cơ thể giúp con người bước đi viết là "chân" (ch). "Trân" trong từ trân trọng hoặc trân châu.',
    specificFeedbacks: {
      'trân': 'Đôi chân để đi lại viết đúng là "chân" với chữ "ch".'
    },
    hint: 'Bộ phận dưới cơ thể giúp chúng ta chạy nhảy mỗi ngày.',
    illustrationKey: 'doi_chan',
    imageAlt: 'Đôi bàn chân nhỏ bé sạch sẽ',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr'],
    findFixDetails: {
      wordsInSentence: ['Bé', 'rửa', 'sạch', 'đôi', 'trân', 'sau', 'khi', 'đi', 'dạo', 'ngoài', 'vườn.'],
      errorWordIndex: 4,
      errorWord: 'trân',
      correctWord: 'chân',
      fixOptions: ['chân', 'trân']
    }
  },
  {
    id: 'ch_tr_08',
    group: 'ch_tr',
    questionType: 'match_image',
    supportLevel: 'standard',
    sentence: 'Hình vẽ minh họa con vật nào bay lượn và cất tiếng hót líu lo?',
    targetWord: 'chim sâu',
    options: ['chim sâu', 'trăn gấm'],
    correctAnswer: 'chim sâu',
    completedSentence: 'Con chim sâu nhỏ bé chuyền cành bắt sâu giúp cây.',
    explanation: 'Loài chim có cánh và biết bay lượn được viết bằng chữ "ch" (chim sâu). "Trăn gấm" là loài bò sát trườn dưới đất.',
    specificFeedbacks: {
      'trăn gấm': 'Hình vẽ là chú chim có cánh biết bay lượn hót líu lo, không phải con trăn bạn nha.'
    },
    hint: 'Loài vật nhỏ có cánh, lông mềm và hay hót trên cành cây.',
    illustrationKey: 'chu_chim',
    imageAlt: 'Chú chim nhỏ đậu trên cành lá xanh',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },
  {
    id: 'ch_tr_09',
    group: 'ch_tr',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Gà mẹ ấp ổ ... tròn xoe trong ổ rơm ấm áp.',
    targetWord: 'trứng',
    options: ['trứng', 'chứng'],
    correctAnswer: 'trứng',
    completedSentence: 'Gà mẹ ấp ổ trứng tròn xoe trong ổ rơm ấm áp.',
    explanation: 'Quả "trứng" do gà, vịt đẻ ra viết bằng "tr". "Chứng" trong từ bằng chứng hay chứng nhận.',
    specificFeedbacks: {
      'chứng': 'Ổ trứng gà ấp nở ra gà con viết đúng là "trứng" với chữ "tr".'
    },
    hint: 'Vật thể hình bầu dục mẹ gà ấp ủ để nở ra những chú gà con.',
    illustrationKey: 'o_trung',
    imageAlt: 'Ổ trứng gà tròn xoe nằm ngoan trên rơm',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },
  {
    id: 'ch_tr_10',
    group: 'ch_tr',
    questionType: 'keyboard_type',
    supportLevel: 'advanced',
    sentence: 'Em lật từng ... sách mới thơm mùi giấy thơm tho.',
    targetWord: 'trang',
    options: ['trang', 'chang'],
    correctAnswer: 'trang',
    completedSentence: 'Em lật từng trang sách mới thơm mùi giấy thơm tho.',
    explanation: 'Từng mặt của quyển sách gọi là "trang" sách, viết đúng bằng chữ "tr".',
    specificFeedbacks: {
      'chang': 'Mặt giấy trong quyển sách được viết là "trang" sách bạn nhé.'
    },
    hint: 'Mỗi mặt giấy có in chữ và số trang trong quyển sách giáo khoa.',
    illustrationKey: 'trang_sach',
    imageAlt: 'Quyển sách mở ra từng trang tinh tươm',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },
  {
    id: 'ch_tr_11',
    group: 'ch_tr',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: '... bộ đội ngày đêm canh giữ biên cương bình yên.',
    targetWord: 'Chú',
    options: ['Chú', 'Trú'],
    correctAnswer: 'Chú',
    completedSentence: 'Chú bộ đội ngày đêm canh giữ biên cương bình yên.',
    explanation: 'Từ xưng hô thân mật "chú" viết hoa đầu câu bằng "Ch". "Trú" nghĩa là trú mưa, tạm trú.',
    specificFeedbacks: {
      'Trú': 'Từ "trú" mang nghĩa trú mưa, nơi tạm trú. Từ xưng hô thân mật với người lớn tuổi là "Chú" bạn nhé.'
    },
    hint: 'Từ xưng hô kính trọng với người em trai của bố hoặc các chú cảnh sát, bộ đội.',
    illustrationKey: 'chu_bo_doi',
    imageAlt: 'Hình ảnh chú bộ đội đứng gác nghiêm trang',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },
  {
    id: 'ch_tr_12',
    group: 'ch_tr',
    questionType: 'choose_word',
    supportLevel: 'guided',
    sentence: 'Bố câu được con cá ... to dưới hồ nước trong veo.',
    targetWord: 'trôi',
    options: ['trôi', 'chép'],
    correctAnswer: 'trôi',
    completedSentence: 'Bố câu được con cá trôi to dưới hồ nước trong veo.',
    explanation: 'Tên loài cá nước ngọt vảy trắng bạc viết là "cá trôi" (tr). "Cá chép" (ch) là loài cá vảy ánh vàng cam có râu.',
    specificFeedbacks: {
      'chép': 'Loài cá vảy trắng trong câu này là cá trôi bạn nhé. Cá trôi viết đúng bằng chữ "tr".'
    },
    hint: 'Loài cá nước ngọt vảy trắng bạc hay bơi dưới hồ nước.',
    illustrationKey: 'con_ca',
    imageAlt: 'Con cá trôi bơi lội dưới hồ nước',
    status: 'draft',
    version: 3,
    pairLetters: ['ch', 'tr']
  },

  // ==========================================
  // NHÓM 2: D / GI (12 câu)
  // ==========================================
  {
    id: 'd_gi_01',
    group: 'd_gi',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Mẹ bổ quả ... hấu đỏ tươi, ngọt lịm cho cả nhà giải nhiệt.',
    targetWord: 'dưa',
    options: ['dưa', 'dừa'],
    correctAnswer: 'dưa',
    completedSentence: 'Mẹ bổ quả dưa hấu đỏ tươi, ngọt lịm cho cả nhà giải nhiệt.',
    explanation: 'Quả dưa (dưa hấu, dưa gang, dưa chuột) viết đúng bằng chữ "d". Quả "dừa" mọc trên cây cao buồng trĩu quả.',
    specificFeedbacks: {
      'dừa': 'Quả dưa hấu ruột đỏ ngọt lịm viết là "dưa" (d). Quả "dừa" có cùi trắng và mọc ở ngọn cây cao bạn nhé.'
    },
    hint: 'Loại quả vỏ xanh, ruột đỏ có hạt đen, ăn vào ngày hè rất ngọt mát.',
    illustrationKey: 'dua_hau',
    imageAlt: 'Miếng dưa hấu đỏ mọng ngọt lịm',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },
  {
    id: 'd_gi_02',
    group: 'd_gi',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Ngọn ... thu thổi nhẹ làm những tán lá rung rinh trong nắng sớm.',
    targetWord: 'gió',
    options: ['gió', 'dây'],
    correctAnswer: 'gió',
    completedSentence: 'Ngọn gió thu thổi nhẹ làm những tán lá rung rinh trong nắng sớm.',
    explanation: 'Luồng không khí chuyển động mát mẻ trong tự nhiên được viết là "gió" (gi). "Dây" là sợi dây dùng để buộc.',
    specificFeedbacks: {
      'dây': 'Luồng không khí thổi mát làm xao động lá cây là ngọn "gió" bạn nhé.'
    },
    hint: 'Không nhìn thấy được bằng mắt, nhưng thổi qua làm mát và bay lá rơi.',
    illustrationKey: 'ngon_gio',
    imageAlt: 'Làn gió thổi nhẹ làm rung rinh hoa lá',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },
  {
    id: 'd_gi_03',
    group: 'd_gi',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Em buộc dây đôi ... thể thao trước khi chạy thi cùng các bạn.',
    targetWord: 'giày',
    options: ['giày', 'dày'],
    correctAnswer: 'giày',
    completedSentence: 'Em buộc dây đôi giày thể thao trước khi chạy thi cùng các bạn.',
    explanation: 'Đồ đi vào chân để bảo vệ khi di chuyển là "đôi giày" (gi). "Dày" dùng để chỉ độ dày, trái nghĩa với mỏng (như quyển sách dày).',
    specificFeedbacks: {
      'dày': 'Từ "dày" chỉ độ dày (trái với mỏng). Đồ đi dưới chân phải viết là "giày" bạn nhé.'
    },
    hint: 'Đồ dùng bằng vải hoặc da, xỏ vào chân rồi buộc dây để chạy nhảy.',
    illustrationKey: 'doi_giay',
    imageAlt: 'Đôi giày thể thao buộc dây gọn gàng',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },
  {
    id: 'd_gi_04',
    group: 'd_gi',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Buổi chiều mát, các bạn rủ nhau ra triền đê thả ... giấy.',
    targetWord: 'diều',
    options: ['diều', 'giường'],
    correctAnswer: 'diều',
    completedSentence: 'Buổi chiều mát, các bạn rủ nhau ra triền đê thả diều giấy.',
    explanation: 'Đồ chơi bay lượn đón gió trên bầu trời viết là cánh "diều" (d). Chiếc "giường" (gi) là đồ dùng trong nhà để ngủ.',
    specificFeedbacks: {
      'giường': 'Đồ chơi bay lượn đón gió trên bầu trời là cánh "diều" bạn nhé. Giường là đồ dùng để ngủ.'
    },
    hint: 'Đồ chơi làm bằng giấy hoặc vải, có đuôi dài và dây căng bay trên trời cao.',
    illustrationKey: 'canh_dieu',
    imageAlt: 'Cánh diều ngũ sắc bay lượn trên nền trời',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },
  {
    id: 'd_gi_05',
    group: 'd_gi',
    questionType: 'choose_word',
    supportLevel: 'guided',
    sentence: 'Bé rửa tay sạch sẽ để bảo vệ làn ... luôn mịn màng khỏe khoắn.',
    targetWord: 'da',
    options: ['da', 'gia'],
    correctAnswer: 'da',
    completedSentence: 'Bé rửa tay sạch sẽ để bảo vệ làn da luôn mịn màng khỏe khoắn.',
    explanation: 'Lớp bao bọc bên ngoài cơ thể người và động vật viết là "da" (d). "Gia" thường dùng trong gia đình, gia tăng.',
    specificFeedbacks: {
      'gia': 'Lớp ngoài bao bọc cơ thể viết đúng chính tả là "da" bạn nha.'
    },
    hint: 'Lớp màng mềm bao bọc khắp cơ thể giúp che chở cho chúng ta.',
    illustrationKey: 'lan_da',
    imageAlt: 'Bé xoa tay sạch bóng chăm sóc làn da',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },
  {
    id: 'd_gi_06',
    group: 'd_gi',
    questionType: 'find_fix',
    supportLevel: 'advanced',
    sentence: 'Nước trong diếng làng luôn trong vắt và mát lạnh bốn mùa.',
    targetWord: 'giếng',
    options: ['giếng', 'diễn'],
    correctAnswer: 'giếng',
    completedSentence: 'Nước trong giếng làng luôn trong vắt và mát lạnh bốn mùa.',
    explanation: 'Nơi đào sâu vào lòng đất để lấy nước sinh hoạt viết đúng chính tả là "giếng" (gi). "Diễn" là biểu diễn văn nghệ.',
    specificFeedbacks: {
      'diễn': 'Nơi múc nước sinh hoạt ở làng quê viết đúng bằng chữ "gi" (giếng).'
    },
    hint: 'Nơi múc nước ăn uống xây bờ gạch tròn quanh miệng ở sân đình hay làng quê.',
    illustrationKey: 'gieng_nuoc',
    imageAlt: 'Miệng giếng xây gạch đá rêu phong mát lành',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi'],
    findFixDetails: {
      wordsInSentence: ['Nước', 'trong', 'diếng', 'làng', 'luôn', 'trong', 'vắt', 'và', 'mát', 'lạnh.'],
      errorWordIndex: 2,
      errorWord: 'diếng',
      correctWord: 'giếng',
      fixOptions: ['giếng', 'diễn']
    }
  },
  {
    id: 'd_gi_07',
    group: 'd_gi',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: '... sông quê hương lững lờ trôi qua những bãi ngô xanh ngát.',
    targetWord: 'Dòng',
    options: ['Dòng', 'Giống'],
    correctAnswer: 'Dòng',
    completedSentence: 'Dòng sông quê hương lững lờ trôi qua những bãi ngô xanh ngát.',
    explanation: 'Luồng nước chảy liên tục viết đúng chính tả là "dòng" sông (d). Viết hoa đầu câu là "Dòng". "Giống" là giống cây trồng hoặc giống nhau.',
    specificFeedbacks: {
      'Giống': 'Dòng nước, dòng sông chảy hiền hòa viết đúng bắt đầu bằng chữ "D" bạn nhé.'
    },
    hint: 'Đoạn nước sông dài trôi êm đềm từ đầu nguồn ra biển lớn.',
    illustrationKey: 'dong_song',
    imageAlt: 'Dòng sông uốn lượn hiền hòa giữa bờ bãi xanh',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },
  {
    id: 'd_gi_08',
    group: 'd_gi',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Những ... sương sớm long lanh đọng lại trên búp chè non.',
    targetWord: 'giọt',
    options: ['giọt', 'dọc'],
    correctAnswer: 'giọt',
    completedSentence: 'Những giọt sương sớm long lanh đọng lại trên búp chè non.',
    explanation: 'Khối nước nhỏ tí xíu hình cầu gọi là "giọt" nước, "giọt" sương, viết bằng chữ "gi". "Dọc" là dọc theo con đường.',
    specificFeedbacks: {
      'dọc': 'Hạt nước sương nhỏ tí xíu đọng trên lá viết đúng bằng chữ "gi" (giọt sương).'
    },
    hint: 'Lượng nước đọng rất nhỏ, từng tí từng tí rơi tí tách.',
    illustrationKey: 'giot_suong',
    imageAlt: 'Giọt sương tròn xoe lấp lánh trên chồi non',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },
  {
    id: 'd_gi_09',
    group: 'd_gi',
    questionType: 'match_image',
    supportLevel: 'standard',
    sentence: 'Cây gì cao vút có buồng trĩu quả nước ngọt lịm ở miệt vườn?',
    targetWord: 'cây dừa',
    options: ['cây dừa', 'cây dứa'],
    correctAnswer: 'cây dừa',
    completedSentence: 'Cây dừa xanh nghiêng bóng bên bờ kênh nước trong.',
    explanation: 'Cây dừa (d) thân thẳng cao vút, tán lá xòe rộng với buồng dừa trĩu quả. "Cây dứa" mọc thấp gần mặt đất.',
    specificFeedbacks: {
      'cây dứa': 'Cây thân cao vút buồng quả trên cao là cây dừa bạn nhé. Cây dứa mọc sát đất.'
    },
    hint: 'Cây thân cao, lá tàu dài như lược xòe bóng mát ở miền sông nước.',
    illustrationKey: 'cay_dua',
    imageAlt: 'Cây dừa cao vút nghiêng bóng bên sông',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },
  {
    id: 'd_gi_10',
    group: 'd_gi',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Em luôn sẵn lòng ... bạn khi bạn lỡ làm rơi hộp bút chì.',
    targetWord: 'giúp',
    options: ['giúp', 'dắt'],
    correctAnswer: 'giúp',
    completedSentence: 'Em luôn sẵn lòng giúp bạn khi bạn lỡ làm rơi hộp bút chì.',
    explanation: 'Hành động trợ giúp, hỗ trợ bạn bè viết là "giúp" đỡ (gi). "Dắt" là nắm tay dắt em bé đi.',
    specificFeedbacks: {
      'dắt': 'Hành động hỗ trợ bạn nhặt đồ viết đúng là "giúp bạn" với chữ "gi" bạn nhé.'
    },
    hint: 'Hành động tốt bụng chia sẻ khó khăn và hỗ trợ người bên cạnh.',
    illustrationKey: 'giup_do',
    imageAlt: 'Hai bạn nhỏ vui vẻ giúp nhau nhặt đồ rơi',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },
  {
    id: 'd_gi_11',
    group: 'd_gi',
    questionType: 'keyboard_type',
    supportLevel: 'advanced',
    sentence: 'Cô giáo phát cho mỗi bạn một tờ ... trắng tinh để vẽ tranh.',
    targetWord: 'giấy',
    options: ['giấy', 'dấy'],
    correctAnswer: 'giấy',
    completedSentence: 'Cô giáo phát cho mỗi bạn một tờ giấy trắng tinh để vẽ tranh.',
    explanation: 'Vật liệu mỏng dùng để viết, vẽ hoặc in sách báo viết là tờ "giấy" (gi). "Dấy" dùng trong từ dấy lên phong trào.',
    specificFeedbacks: {
      'dấy': 'Vật liệu màu trắng để viết chữ và vẽ tranh viết đúng là tờ "giấy" (gi).'
    },
    hint: 'Mặt phẳng mỏng màu trắng làm từ bột gỗ để học sinh viết bài.',
    illustrationKey: 'to_giay',
    imageAlt: 'Tờ giấy trắng tinh tươm đặt trên bàn học',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },
  {
    id: 'd_gi_12',
    group: 'd_gi',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Bố tặng em một chiếc cặp ... bền đẹp nhân dịp năm học mới.',
    targetWord: 'da',
    options: ['da', 'gia'],
    correctAnswer: 'da',
    completedSentence: 'Bố tặng em một chiếc cặp da bền đẹp nhân dịp năm học mới.',
    explanation: 'Chất liệu da bóng đẹp làm cặp, túi hoặc giày dép viết là chất liệu "da" (d). "Gia" là gia vị hoặc gia đình.',
    specificFeedbacks: {
      'gia': 'Chiếc cặp may từ chất liệu bền bỉ viết đúng là cặp "da" với chữ "d" bạn nhé.'
    },
    hint: 'Chất liệu mịn dẻo bền chắc làm đồ dùng học tập rất đẹp.',
    illustrationKey: 'cap_da',
    imageAlt: 'Chiếc cặp da màu nâu bóng đẹp gọn gàng',
    status: 'draft',
    version: 3,
    pairLetters: ['d', 'gi']
  },

  // ==========================================
  // NHÓM 3: V / D (12 câu)
  // ==========================================
  {
    id: 'v_d_01',
    group: 'v_d',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Bé mở cuốn ... bài tập và nắn nót viết từng dòng chữ ngay ngắn.',
    targetWord: 'vở',
    options: ['vở', 'dở'],
    correctAnswer: 'vở',
    completedSentence: 'Bé mở cuốn vở bài tập và nắn nót viết từng dòng chữ ngay ngắn.',
    explanation: 'Tập giấy đóng thành quyển có dòng kẻ để học sinh viết bài gọi là quyển "vở" (v). "Dở" nghĩa là chưa xong hoặc dở dang.',
    specificFeedbacks: {
      'dở': 'Tập giấy có kẻ ô li cho học sinh luyện chữ viết đúng là quyển "vở" bạn nhé.'
    },
    hint: 'Quyển tập có kẻ ô li trắng tinh em mang đến lớp mỗi ngày.',
    illustrationKey: 'quyen_vo',
    imageAlt: 'Quyển vở ô li mở ra ngay ngắn sạch đẹp',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },
  {
    id: 'v_d_02',
    group: 'v_d',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Cả lớp cùng hát vang bài ca ... tươi trong giờ sinh hoạt cuối tuần.',
    targetWord: 'vui',
    options: ['vui', 'dịu'],
    correctAnswer: 'vui',
    completedSentence: 'Cả lớp cùng hát vang bài ca vui tươi trong giờ sinh hoạt cuối tuần.',
    explanation: 'Cảm giác tươi cười rộn rã gọi là "vui tươi" (v). Từ "dịu" trong từ dịu dàng, êm dịu.',
    specificFeedbacks: {
      'dịu': 'Giai điệu rộn rã tràn ngập tiếng cười là bài ca "vui tươi" bạn nhé.'
    },
    hint: 'Tâm trạng hồ hởi, cười nói rộn ràng khi được gặp bạn bè.',
    illustrationKey: 'be_vui',
    imageAlt: 'Các bạn nhỏ hân hoan ca hát vui vẻ',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },
  {
    id: 'v_d_03',
    group: 'v_d',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Mẹ ân cần ... tay em bước cẩn thận qua đoạn đường đông đúc.',
    targetWord: 'dắt',
    options: ['dắt', 'vắt'],
    correctAnswer: 'dắt',
    completedSentence: 'Mẹ ân cần dắt tay em bước cẩn thận qua đoạn đường đông đúc.',
    explanation: 'Cầm tay dẫn ai đó cùng đi viết đúng là "dắt" tay (d). "Vắt" nghĩa là vắt nước cam hoặc vắt kiệt nước.',
    specificFeedbacks: {
      'vắt': 'Cầm tay dẫn nhau cùng bước an toàn viết đúng chính tả là "dắt tay" với chữ "d".'
    },
    hint: 'Mẹ nắm lấy bàn tay nhỏ của em để cùng bước qua ngã tư.',
    illustrationKey: 'dat_tay',
    imageAlt: 'Mẹ ân cần nắm tay em bé đi qua đường',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },
  {
    id: 'v_d_04',
    group: 'v_d',
    questionType: 'match_image',
    supportLevel: 'standard',
    sentence: 'Con côn trùng nào phát ra tiếng kêu râm ran suốt mùa hè?',
    targetWord: 've sầu',
    options: ['ve sầu', 'dế mèn'],
    correctAnswer: 've sầu',
    completedSentence: 'Tiếng ve sầu râm ran báo hiệu mùa hè rực rỡ đã về.',
    explanation: 'Loài côn trùng có cánh mỏng trong suốt kêu vang trên cây vào mùa hè là "ve sầu" (v). "Dế mèn" (d) đào hang sống dưới bờ cỏ.',
    specificFeedbacks: {
      'dế mèn': 'Con côn trùng đậu trên cành cây cất tiếng râm ran mùa hè là con ve sầu bạn nhé.'
    },
    hint: 'Loài côn trùng cánh trong hay bám trên cành phượng vĩ kêu ve ve.',
    illustrationKey: 've_sau',
    imageAlt: 'Con ve sầu đậu trên cành lá xanh mát',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },
  {
    id: 'v_d_05',
    group: 'v_d',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Chú ... con uống nước bằng chiếc vòi dài khéo léo.',
    targetWord: 'voi',
    options: ['voi', 'dơi'],
    correctAnswer: 'voi',
    completedSentence: 'Chú voi con uống nước bằng chiếc vòi dài khéo léo.',
    explanation: 'Loài vật to lớn có chiếc vòi dài và đôi tai to là chú "voi" (v). Con "dơi" (d) là loài có cánh bay lượn trong đêm.',
    specificFeedbacks: {
      'dơi': 'Loài động vật to lớn có chiếc vòi dài khéo léo là chú "voi" bạn nhé.'
    },
    hint: 'Loài thú khổng lồ ở núi rừng Tây Nguyên, có vòi dài và tai to như chiếc quạt.',
    illustrationKey: 'chu_voi',
    imageAlt: 'Chú voi con vẫy chiếc vòi dài tinh nghịch',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },
  {
    id: 'v_d_06',
    group: 'v_d',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Bà hái cho bé một rổ quả ... tây chín đỏ thơm lừng ngoài vườn.',
    targetWord: 'dâu',
    options: ['dâu', 'vải'],
    correctAnswer: 'dâu',
    completedSentence: 'Bà hái cho bé một rổ quả dâu tây chín đỏ thơm lừng ngoài vườn.',
    explanation: 'Quả "dâu tây" (d) nhỏ xinh màu đỏ mọng có hạt li ti ngoài vỏ. Quả "vải" (v) vỏ sần sùi cùi trắng ngọt.',
    specificFeedbacks: {
      'vải': 'Quả nhỏ xinh màu đỏ có những hạt li ti bên ngoài là quả dâu tây bạn nhé.'
    },
    hint: 'Quả hình trái tim nhỏ nhắn, màu đỏ tươi, vị chua chua ngọt ngọt.',
    illustrationKey: 'dau_tay',
    imageAlt: 'Những quả dâu tây chín mọng thơm ngon',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },
  {
    id: 'v_d_07',
    group: 'v_d',
    questionType: 'find_fix',
    supportLevel: 'advanced',
    sentence: 'Tan học, em cùng các bạn ríu rít dề nhà bên nhau.',
    targetWord: 'về',
    options: ['về', 'dạo'],
    correctAnswer: 'về',
    completedSentence: 'Tan học, em cùng các bạn ríu rít về nhà bên nhau.',
    explanation: 'Trở lại nơi ở thân quen của mình viết đúng chính tả là "về" nhà (v). "Dạo" là đi dạo mát.',
    specificFeedbacks: {
      'dạo': 'Hành động quay trở lại tổ ấm gia đình sau giờ học viết đúng là "về nhà" (v).'
    },
    hint: 'Quay trở lại ngôi nhà thân yêu của gia đình sau buổi học ở trường.',
    illustrationKey: 've_nha',
    imageAlt: 'Các bạn học sinh vui vẻ cùng nhau đi về nhà',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd'],
    findFixDetails: {
      wordsInSentence: ['Tan', 'học,', 'em', 'cùng', 'các', 'bạn', 'ríu', 'rít', 'dề', 'nhà', 'bên', 'nhau.'],
      errorWordIndex: 8,
      errorWord: 'dề',
      correctWord: 'về',
      fixOptions: ['về', 'dạo']
    }
  },
  {
    id: 'v_d_08',
    group: 'v_d',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Chị nhẹ nhàng ... dành khi em bé sơ ý bị vấp ngã.',
    targetWord: 'dỗ',
    options: ['dỗ', 'vỗ'],
    correctAnswer: 'dỗ',
    completedSentence: 'Chị nhẹ nhàng dỗ dành khi em bé sơ ý bị vấp ngã.',
    explanation: 'Nói lời an ủi, yêu thương cho em nín khóc viết là "dỗ" dành (d). "Vỗ" là vỗ tay cổ vũ.',
    specificFeedbacks: {
      'vỗ': 'Nói lời yêu thương dỗ em nín khóc viết đúng là "dỗ dành" với chữ "d".'
    },
    hint: 'An ủi bằng lời dịu dàng để bé không còn khóc nhè.',
    illustrationKey: 'do_danh',
    imageAlt: 'Chị gái ân cần dỗ dành em bé nín khóc',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },
  {
    id: 'v_d_09',
    group: 'v_d',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Đàn ... bơi lội bì bõm dưới mặt ao đầm ấm cúng.',
    targetWord: 'vịt',
    options: ['vịt', 'dế'],
    correctAnswer: 'vịt',
    completedSentence: 'Đàn vịt bơi lội bì bõm dưới mặt ao đầm ấm cúng.',
    explanation: 'Loài gia cầm có màng chân biết bơi lội dưới nước là con "vịt" (v). "Dế" (d) là loài côn trùng trên bờ cỏ.',
    specificFeedbacks: {
      'dế': 'Loài thủy cầm bơi dưới ao kêu cạp cạp là con "vịt" bạn nhé.'
    },
    hint: 'Loài chim nuôi có màng chân, mỏ bẹt, thích bơi lội dưới mặt ao.',
    illustrationKey: 'dan_vit',
    imageAlt: 'Đàn vịt bầu lông vàng bơi lội thảnh thơi dưới ao',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },
  {
    id: 'v_d_10',
    group: 'v_d',
    questionType: 'choose_word',
    supportLevel: 'guided',
    sentence: 'Cánh đồng lúa chín trải một màu ... rực rỡ dưới nắng.',
    targetWord: 'vàng',
    options: ['vàng', 'dịu'],
    correctAnswer: 'vàng',
    completedSentence: 'Cánh đồng lúa chín trải một màu vàng rực rỡ dưới nắng.',
    explanation: 'Màu sắc óng ả của những bông lúa chín mùa gặt viết là "màu vàng" (v).',
    specificFeedbacks: {
      'dịu': 'Màu sắc ấm áp của hạt lúa chín thơm ngát là màu "vàng" bạn nhé.'
    },
    hint: 'Màu của ánh nắng ban mai và của những hạt thóc mùa gặt.',
    illustrationKey: 'dong_lua',
    imageAlt: 'Cánh đồng lúa chín vàng óng ả bát ngát',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },
  {
    id: 'v_d_11',
    group: 'v_d',
    questionType: 'keyboard_type',
    supportLevel: 'advanced',
    sentence: 'Em lễ phép giơ tay ... chào thầy cô khi tan trường.',
    targetWord: 'vẫy',
    options: ['vẫy', 'dẫn'],
    correctAnswer: 'vẫy',
    completedSentence: 'Em lễ phép giơ tay vẫy chào thầy cô khi tan trường.',
    explanation: 'Cử chỉ đưa bàn tay qua lại để chào hỏi viết đúng là "vẫy" chào (v). "Dẫn" là dẫn dắt, dẫn đường.',
    specificFeedbacks: {
      'dẫn': 'Động tác giơ tay chào thầy cô lúc tan trường là "vẫy chào" với chữ "v".'
    },
    hint: 'Động tác đưa bàn tay đung đưa nhẹ qua lại để chào tạm biệt.',
    illustrationKey: 'vay_tay',
    imageAlt: 'Bé giơ bàn tay nhỏ vẫy chào vui vẻ',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },
  {
    id: 'v_d_12',
    group: 'v_d',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Gió sớm thổi qua khu ... ngập tràn hoa trái tốt tươi.',
    targetWord: 'vườn',
    options: ['vườn', 'dưới'],
    correctAnswer: 'vườn',
    completedSentence: 'Gió sớm thổi qua khu vườn ngập tràn hoa trái tốt tươi.',
    explanation: 'Khu đất trồng rau, hoa và cây ăn quả quanh nhà viết là "khu vườn" (v). "Dưới" là từ chỉ vị trí.',
    specificFeedbacks: {
      'dưới': 'Nơi trồng cây hoa, rau củ và cây ăn trái tốt tươi là "khu vườn" bạn nhé.'
    },
    hint: 'Khu đất quanh nhà có nhiều cây xanh, hoa thơm và bóng mát chim hót.',
    illustrationKey: 'khu_vuon',
    imageAlt: 'Khu vườn xanh mát rực rỡ hoa tươi quả ngọt',
    status: 'draft',
    version: 3,
    pairLetters: ['v', 'd']
  },

  // ==========================================
  // NHÓM 4: TH / H (12 câu khảo sát)
  // ==========================================
  {
    id: 'th_h_01',
    group: 'th_h',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Chú ... trắng có đôi tai dài và đôi mắt đỏ tròn xoe.',
    targetWord: 'thỏ',
    options: ['thỏ', 'hổ'],
    correctAnswer: 'thỏ',
    completedSentence: 'Chú thỏ trắng có đôi tai dài và đôi mắt đỏ tròn xoe.',
    explanation: 'Loài vật hiền lành có đôi tai dài, lông trắng, ăn cà rốt là chú "thỏ" (th). "Hổ" (h) là chúa sơn lâm to lớn lông vằn hung dữ.',
    specificFeedbacks: {
      'hổ': 'Loài vật nhỏ hiền lành có tai dài và lông trắng mềm mại là chú "thỏ" bạn nhé.'
    },
    hint: 'Loài vật nhỏ có đôi tai dài dựng đứng, đuôi ngắn cũn và thích ăn cà rốt.',
    illustrationKey: 'chu_tho',
    imageAlt: 'Chú thỏ trắng xinh xắn với đôi tai dài',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },
  {
    id: 'th_h_02',
    group: 'th_h',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Bông ... hồng nở rộ tỏa hương thơm ngát trong nắng sớm.',
    targetWord: 'hoa',
    options: ['hoa', 'thoa'],
    correctAnswer: 'hoa',
    completedSentence: 'Bông hoa hồng nở rộ tỏa hương thơm ngát trong nắng sớm.',
    explanation: 'Bộ phận rực rỡ sắc màu tỏa hương của cây viết là bông "hoa" (h). "Thoa" là thoa dầu, thoa phấn.',
    specificFeedbacks: {
      'thoa': 'Cánh hoa ngát hương rực rỡ khoe sắc trong vườn viết đúng là "hoa" bạn nhé.'
    },
    hint: 'Phần đẹp nhất của cây, có nhiều cánh màu đỏ, vàng tỏa hương thơm mát.',
    illustrationKey: 'bong_hoa',
    imageAlt: 'Bông hoa hồng rực rỡ nở trong vườn sớm',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },
  {
    id: 'th_h_03',
    group: 'th_h',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Chiếc ... buồm trắng rẽ sóng lướt nhẹ trên mặt biển xanh bao la.',
    targetWord: 'thuyền',
    options: ['thuyền', 'huyền'],
    correctAnswer: 'thuyền',
    completedSentence: 'Chiếc thuyền buồm trắng rẽ sóng lướt nhẹ trên mặt biển xanh bao la.',
    explanation: 'Phương tiện giao thông đường thủy di chuyển trên mặt nước là chiếc "thuyền" (th). "Huyền" là tên dấu thanh trong tiếng Việt.',
    specificFeedbacks: {
      'huyền': 'Phương tiện có cánh buồm lướt trên mặt nước viết đúng là chiếc "thuyền" bạn nhé.'
    },
    hint: 'Phương tiện đi trên sông biển có cánh buồm căng gió.',
    illustrationKey: 'thuyen_buom',
    imageAlt: 'Chiếc thuyền buồm trắng lướt trên sóng biển',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },
  {
    id: 'th_h_04',
    group: 'th_h',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Mỗi buổi tối, em ngồi vào bàn ... bài thật chăm chỉ.',
    targetWord: 'học',
    options: ['học', 'thọc'],
    correctAnswer: 'học',
    completedSentence: 'Mỗi buổi tối, em ngồi vào bàn học bài thật chăm chỉ.',
    explanation: 'Hoạt động tiếp thu kiến thức viết đúng chính tả là "học" bài (h). "Thọc" là thọc tay vào túi.',
    specificFeedbacks: {
      'thọc': 'Hoạt động đọc sách mở mang tri thức mỗi ngày là "học bài" với chữ "h".'
    },
    hint: 'Việc đọc sách, làm bài tập để mở rộng hiểu biết mỗi ngày.',
    illustrationKey: 'hoc_bai',
    imageAlt: 'Bé ngồi ngay ngắn bên bàn chăm chú học bài',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },
  {
    id: 'th_h_05',
    group: 'th_h',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Sau khi chạy bộ hai vòng sân, em dừng lại hít ... thật sâu.',
    targetWord: 'thở',
    options: ['thở', 'hở'],
    correctAnswer: 'thở',
    completedSentence: 'Sau khi chạy bộ hai vòng sân, em dừng lại hít thở thật sâu.',
    explanation: 'Động tác lấy không khí vào phổi để duy trì sự sống gọi là hít "thở" (th). "Hở" là không đóng kín.',
    specificFeedbacks: {
      'hở': 'Động tác hít không khí trong lành vào lồng ngực viết là "hít thở" bạn nha.'
    },
    hint: 'Hành động hít khí trong lành vào lồng ngực rồi thở nhẹ ra.',
    illustrationKey: 'hit_tho',
    imageAlt: 'Bé đứng thư giãn hít thở không khí trong lành',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },
  {
    id: 'th_h_06',
    group: 'th_h',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Bạn Mai cất tiếng ... bài ca mừng thầy cô nhân ngày lễ.',
    targetWord: 'hát',
    options: ['hát', 'thơ'],
    correctAnswer: 'hát',
    completedSentence: 'Bạn Mai cất tiếng hát bài ca mừng thầy cô nhân ngày lễ.',
    explanation: 'Dùng giọng phát ra giai điệu âm nhạc vui tai viết là "hát" (h). "Thơ" (th) là bài thơ.',
    specificFeedbacks: {
      'thơ': 'Dùng giọng ngâm nga giai điệu âm nhạc là cất tiếng "hát" bạn nhé.'
    },
    hint: 'Cất cao giọng ngân vang theo từng nốt nhạc vui tươi.',
    illustrationKey: 'cat_tieng_hat',
    imageAlt: 'Bạn nhỏ cầm micro cất tiếng hát trong trẻo',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },
  {
    id: 'th_h_07',
    group: 'th_h',
    questionType: 'find_fix',
    supportLevel: 'advanced',
    sentence: 'Em dùng cây hước kẻ thẳng để kẻ đường viền bài kiểm tra.',
    targetWord: 'thước',
    options: ['thước', 'hộp'],
    correctAnswer: 'thước',
    completedSentence: 'Em dùng cây thước kẻ thẳng để kẻ đường viền bài kiểm tra.',
    explanation: 'Dụng cụ học tập bằng nhựa hoặc gỗ dùng để đo và kẻ đường thẳng là cây "thước" kẻ (th). "Hộp" là hộp bút.',
    specificFeedbacks: {
      'hộp': 'Dụng cụ kẻ đường thẳng ngay ngắn trong hộp bút viết đúng là cây "thước" kẻ (th).'
    },
    hint: 'Dụng cụ phẳng dài có vạch chia centimet để vẽ đường thẳng ngay ngắn.',
    illustrationKey: 'cay_thuoc',
    imageAlt: 'Cây thước kẻ thẳng tắp có vạch số rõ ràng',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h'],
    findFixDetails: {
      wordsInSentence: ['Em', 'dùng', 'cây', 'hước', 'kẻ', 'thẳng', 'để', 'kẻ', 'đường', 'viền.'],
      errorWordIndex: 3,
      errorWord: 'hước',
      correctWord: 'thước',
      fixOptions: ['thước', 'hộp']
    }
  },
  {
    id: 'th_h_08',
    group: 'th_h',
    questionType: 'match_image',
    supportLevel: 'standard',
    sentence: 'Giữa công viên có một chiếc gì rộng và nước trong xanh?',
    targetWord: 'hồ nước',
    options: ['hồ nước', 'thác nước'],
    correctAnswer: 'hồ nước',
    completedSentence: 'Mặt hồ nước phẳng lặng in bóng hàng cây xanh mát.',
    explanation: 'Vùng nước rộng và phẳng lặng trong công viên gọi là "hồ nước" (h). "Thác nước" (th) là dòng nước đổ dốc từ núi cao xuống.',
    specificFeedbacks: {
      'thác nước': 'Vùng nước phẳng lặng xanh biếc giữa công viên là hồ nước bạn nhé.'
    },
    hint: 'Vùng nước tĩnh lặng, có vịt bơi và liễu rủ bóng bên bờ.',
    illustrationKey: 'ho_nuoc',
    imageAlt: 'Mặt hồ nước trong xanh phẳng lặng',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },
  {
    id: 'th_h_09',
    group: 'th_h',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Mẹ nấu món ... kho tàu thơm nức mũi cả gian bếp gia đình.',
    targetWord: 'thịt',
    options: ['thịt', 'hành'],
    correctAnswer: 'thịt',
    completedSentence: 'Mẹ nấu món thịt kho tàu thơm nức mũi cả gian bếp gia đình.',
    explanation: 'Món ăn giàu dinh dưỡng kho cùng trứng gọi là món "thịt kho tàu" (th). "Hành" (h) là cây gia vị màu xanh thơm lừng.',
    specificFeedbacks: {
      'hành': 'Món ăn chính kho thơm béo ngậy cùng trứng là món "thịt" kho bạn nhé.'
    },
    hint: 'Thực phẩm giàu chất đạm mẹ kho với trứng cho bữa cơm thơm lành.',
    illustrationKey: 'dia_thit',
    imageAlt: 'Đĩa thịt kho vàng óng thơm phức trên bàn ăn',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },
  {
    id: 'th_h_10',
    group: 'th_h',
    questionType: 'choose_word',
    supportLevel: 'guided',
    sentence: 'Chú ... sao hiền lành ngơ ngác gặm cỏ non bên bờ suối.',
    targetWord: 'hươu',
    options: ['hươu', 'thỏ'],
    correctAnswer: 'hươu',
    completedSentence: 'Chú hươu sao hiền lành ngơ ngác gặm cỏ non bên bờ suối.',
    explanation: 'Loài thú ăn cỏ có bốn chân thon dài và đốm hoa trắng trên mình là chú "hươu sao" (h). "Thỏ" (th) là chú thỏ tai dài.',
    specificFeedbacks: {
      'thỏ': 'Loài thú có đốm hoa sao trắng trên lưng là chú hươu sao bạn nhé.'
    },
    hint: 'Loài vật hiền lành trong rừng có đốm trắng như những vì sao trên lưng.',
    illustrationKey: 'chu_huou',
    imageAlt: 'Chú hươu sao xinh đẹp đứng ngơ ngác bên bờ suối',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },
  {
    id: 'th_h_11',
    group: 'th_h',
    questionType: 'keyboard_type',
    supportLevel: 'advanced',
    sentence: 'Bác nông dân một nắng hai sương làm ra từng ... gạo trắng ngần.',
    targetWord: 'hạt',
    options: ['hạt', 'thúng'],
    correctAnswer: 'hạt',
    completedSentence: 'Bác nông dân một nắng hai sương làm ra từng hạt gạo trắng ngần.',
    explanation: 'Từng viên ngọc thực nhỏ li ti thu được sau vụ gặt gọi là "hạt gạo" (h). "Thúng" (th) là đồ dùng đan bằng tre.',
    specificFeedbacks: {
      'thúng': 'Từng đơn vị nhỏ li ti của hạt ngọc trời dẻo thơm viết đúng là "hạt gạo" bạn nhé.'
    },
    hint: 'Từng viên nhỏ li ti dẻo thơm nấu thành cơm ngon mỗi ngày.',
    illustrationKey: 'hat_gao',
    imageAlt: 'Những hạt gạo trắng ngần tròn mẩy',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },
  {
    id: 'th_h_12',
    group: 'th_h',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Bà con trong ... xóm luôn đoàn kết và giúp đỡ lẫn nhau.',
    targetWord: 'thôn',
    options: ['thôn', 'hôn'],
    correctAnswer: 'thôn',
    completedSentence: 'Bà con trong thôn xóm luôn đoàn kết và giúp đỡ lẫn nhau.',
    explanation: 'Khu dân cư nông thôn thân thương gọi là "thôn xóm" (th). Từ "hôn" trong nụ hôn hoặc hoàng hôn.',
    specificFeedbacks: {
      'hôn': 'Khu làng xóm bình yên nơi bà con cùng sinh sống viết đúng là "thôn xóm" bạn nha.'
    },
    hint: 'Khu vực làng quê nơi có nhiều gia đình hàng xóm sống quây quần.',
    illustrationKey: 'thon_xom',
    imageAlt: 'Làng quê yên bình với mái ngói đỏ và đường làng',
    status: 'draft',
    version: 3,
    pairLetters: ['th', 'h']
  },

  // ==========================================
  // NHÓM 5: R / G (12 câu khảo sát)
  // ==========================================
  {
    id: 'r_g_01',
    group: 'r_g',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Bác ... tuy di chuyển chậm chạp nhưng vô cùng kiên trì.',
    targetWord: 'rùa',
    options: ['rùa', 'gấu'],
    correctAnswer: 'rùa',
    completedSentence: 'Bác rùa tuy di chuyển chậm chạp nhưng vô cùng kiên trì.',
    explanation: 'Loài vật có mai cứng bước đi chậm chạp nổi tiếng kiên trì là bác "rùa" (r). "Gấu" (g) là chú gấu lông dày.',
    specificFeedbacks: {
      'gấu': 'Loài vật có mai cứng bò chậm chạp từng bước kiên trì là bác "rùa" bạn nhé.'
    },
    hint: 'Loài vật mang chiếc mai nặng trên lưng, đi từng bước chậm nhưng không bỏ cuộc.',
    illustrationKey: 'bac_rua',
    imageAlt: 'Bác rùa mang mai cứng đang thong thả bước đi',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  },
  {
    id: 'r_g_02',
    group: 'r_g',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Mỗi sớm mai, chú ... trống lại cất tiếng gáy vang báo trời sáng.',
    targetWord: 'gà',
    options: ['gà', 'rà'],
    correctAnswer: 'gà',
    completedSentence: 'Mỗi sớm mai, chú gà trống lại cất tiếng gáy vang báo trời sáng.',
    explanation: 'Loài gia cầm có mào đỏ gáy ò ó o báo trời sáng viết là chú "gà" (g). "Rà" là rà soát, rà đài.',
    specificFeedbacks: {
      'rà': 'Chú gia cầm có mào đỏ tươi gáy ó o đánh thức mọi người là chú "gà" bạn nhé.'
    },
    hint: 'Chú gia cầm có mào đỏ, đuôi cong vút cất tiếng gáy ó o o mỗi ban mai.',
    illustrationKey: 'chu_ga',
    imageAlt: 'Chú gà trống oai vệ đứng gáy trên đống rơm',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  },
  {
    id: 'r_g_03',
    group: 'r_g',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Khu ... nguyên sinh bạt ngàn cây cối là ngôi nhà của muông thú.',
    targetWord: 'rừng',
    options: ['rừng', 'gừng'],
    correctAnswer: 'rừng',
    completedSentence: 'Khu rừng nguyên sinh bạt ngàn cây cối là ngôi nhà của muông thú.',
    explanation: 'Nơi có nhiều cây cối rậm rạp tự nhiên là "khu rừng" (r). "Củ gừng" (g) là củ cay làm gia vị nấu nướng.',
    specificFeedbacks: {
      'gừng': 'Nơi cây cối rậm rạp muông thú sinh sống viết đúng chính tả là "khu rừng" với chữ "r".'
    },
    hint: 'Vùng đất mênh mông bạt ngàn cây cổ thụ nơi các loài thú tự do sinh sống.',
    illustrationKey: 'khu_rung',
    imageAlt: 'Khu rừng xanh mướt ngút ngàn cây cối',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  },
  {
    id: 'r_g_04',
    group: 'r_g',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Mẹ đặt chiếc ... êm thơm tho cho bé ngả đầu ngủ say giấc.',
    targetWord: 'gối',
    options: ['gối', 'rối'],
    correctAnswer: 'gối',
    completedSentence: 'Mẹ đặt chiếc gối êm thơm tho cho bé ngả đầu ngủ say giấc.',
    explanation: 'Đồ vật mềm mại đặt dưới đầu khi ngủ gọi là chiếc "gối" (g). "Rối" mang nghĩa múa rối hoặc rối bời.',
    specificFeedbacks: {
      'rối': 'Vật mềm mại để kê đầu ngủ ngon giấc viết đúng là chiếc "gối" bạn nhé.'
    },
    hint: 'Vật êm ái bé kê dưới đầu khi nằm trên giường ngủ.',
    illustrationKey: 'chiec_goi',
    imageAlt: 'Chiếc gối mềm mại sạch sẽ trên giường',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  },
  {
    id: 'r_g_05',
    group: 'r_g',
    questionType: 'match_image',
    supportLevel: 'standard',
    sentence: 'Hình vẽ minh họa luống gì xanh non trong vườn của bà?',
    targetWord: 'rau xanh',
    options: ['rau xanh', 'gấc đỏ'],
    correctAnswer: 'rau xanh',
    completedSentence: 'Luống rau xanh mướt được bà tưới nước mát mỗi buổi chiều.',
    explanation: 'Luống cây xanh tốt ăn lá trong vườn gọi là "luống rau xanh" (r). "Quả gấc" (g) có gai tròn ruột đỏ dùng nấu xôi.',
    specificFeedbacks: {
      'gấc đỏ': 'Luống cây có lá xanh non dùng nấu bữa cơm gia đình là rau xanh bạn nhé.'
    },
    hint: 'Thực phẩm xanh mướt chứa nhiều vitamin bà trồng ngoài vườn.',
    illustrationKey: 'luong_rau',
    imageAlt: 'Luống rau tươi xanh tốt mọc thẳng hàng',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  },
  {
    id: 'r_g_06',
    group: 'r_g',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Em ngồi ngay ngắn trên chiếc ... gỗ để tập chép bài.',
    targetWord: 'ghế',
    options: ['ghế', 'rế'],
    correctAnswer: 'ghế',
    completedSentence: 'Em ngồi ngay ngắn trên chiếc ghế gỗ để tập chép bài.',
    explanation: 'Đồ vật có bốn chân dùng để ngồi viết là chiếc "ghế" (gh). "Rế" là cái rế lót đáy nồi xoong.',
    specificFeedbacks: {
      'rế': 'Đồ đạc bốn chân để ngồi học ngay ngắn viết đúng là chiếc "ghế" bạn nhé.'
    },
    hint: 'Đồ dùng để ngồi học ngay ngắn bên cạnh chiếc bàn.',
    illustrationKey: 'chiec_ghe',
    imageAlt: 'Chiếc ghế gỗ nhỏ nhắn đặt cạnh bàn học',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  },
  {
    id: 'r_g_07',
    group: 'r_g',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Bà mang chiếc ... tre ra vườn hái những quả ổi chín vàng.',
    targetWord: 'rổ',
    options: ['rổ', 'gỗ'],
    correctAnswer: 'rổ',
    completedSentence: 'Bà mang chiếc rổ tre ra vườn hái những quả ổi chín vàng.',
    explanation: 'Đồ dùng đan thưa bằng tre nứa để đựng rau quả gọi là chiếc "rổ" (r). "Gỗ" (g) là vật liệu từ thân cây.',
    specificFeedbacks: {
      'gỗ': 'Đồ dùng đan thưa bằng tre để đựng hoa quả viết đúng là chiếc "rổ" bạn nhé.'
    },
    hint: 'Vật dụng đan bằng nan tre có nhiều lỗ thoáng để đựng rau củ, hoa quả.',
    illustrationKey: 'chiec_ro',
    imageAlt: 'Chiếc rổ tre đựng đầy hoa quả thơm ngon',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  },
  {
    id: 'r_g_08',
    group: 'r_g',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Bé đứng trước chiếc ... và mỉm cười chải tóc gọn gàng.',
    targetWord: 'gương',
    options: ['gương', 'rương'],
    correctAnswer: 'gương',
    completedSentence: 'Bé đứng trước chiếc gương và mỉm cười chải tóc gọn gàng.',
    explanation: 'Tấm kính phẳng soi được hình bóng mình trong đó gọi là chiếc "gương" (g). "Rương" là chiếc hòm rương đựng đồ.',
    specificFeedbacks: {
      'rương': 'Tấm kính trong suốt soi hình bóng mình mỗi khi chải tóc là chiếc "gương" bạn nhé.'
    },
    hint: 'Tấm kính sáng soi thấy rõ khuôn mặt tươi vui của bé mỗi sáng.',
    illustrationKey: 'chiec_guong',
    imageAlt: 'Bé đứng soi gương mỉm cười chải tóc',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  },
  {
    id: 'r_g_09',
    group: 'r_g',
    questionType: 'find_fix',
    supportLevel: 'advanced',
    sentence: 'Mùi gơm vàng thơm nồng góc sân sau mùa gặt lúa chín.',
    targetWord: 'rơm',
    options: ['rơm', 'gốc'],
    correctAnswer: 'rơm',
    completedSentence: 'Mùi rơm vàng thơm nồng góc sân sau mùa gặt lúa chín.',
    explanation: 'Thân cây lúa phơi khô vàng óng sau khi gặt thóc gọi là cây "rơm" (r). "Gốc" là gốc rạ.',
    specificFeedbacks: {
      'gốc': 'Thân lúa phơi khô vàng óng tỏa mùi thơm đồng nội viết đúng là "rơm" (r).'
    },
    hint: 'Thân lúa khô vàng thơm phức chất thành cây cao ở góc sân nhà nông.',
    illustrationKey: 'cay_rom',
    imageAlt: 'Cây rơm vàng óng ả tỏa hương thơm giữa sân',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g'],
    findFixDetails: {
      wordsInSentence: ['Mùi', 'gơm', 'vàng', 'thơm', 'nồng', 'góc', 'sân', 'sau', 'mùa', 'gặt.'],
      errorWordIndex: 1,
      errorWord: 'gơm',
      correctWord: 'rơm',
      fixOptions: ['rơm', 'gốc']
    }
  },
  {
    id: 'r_g_10',
    group: 'r_g',
    questionType: 'choose_word',
    supportLevel: 'standard',
    sentence: 'Bác thợ xây khéo léo đặt từng viên ... đỏ thẳng tắp.',
    targetWord: 'gạch',
    options: ['gạch', 'rạch'],
    correctAnswer: 'gạch',
    completedSentence: 'Bác thợ xây khéo léo đặt từng viên gạch đỏ thẳng tắp.',
    explanation: 'Khối đất nung màu đỏ hình chữ nhật dùng để xây tường nhà là viên "gạch" (g). "Rạch" là dòng rạch nước nhỏ.',
    specificFeedbacks: {
      'rạch': 'Khối đất nung đỏ xếp ngay ngắn thành bức tường nhà là viên "gạch" bạn nhé.'
    },
    hint: 'Vật liệu màu đỏ nung từ đất dùng xây nên những ngôi nhà vững chãi.',
    illustrationKey: 'vien_gach',
    imageAlt: 'Những viên gạch đỏ thẳng tắp bác thợ xây đặt ngay ngắn',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  },
  {
    id: 'r_g_11',
    group: 'r_g',
    questionType: 'keyboard_type',
    supportLevel: 'advanced',
    sentence: 'Bộ ... cây bám chặt vào lòng đất để hút nước và chất màu mỡ.',
    targetWord: 'rễ',
    options: ['rễ', 'gốc'],
    correctAnswer: 'rễ',
    completedSentence: 'Bộ rễ cây bám chặt vào lòng đất để hút nước và chất màu mỡ.',
    explanation: 'Bộ phận dưới lòng đất hút chất dinh dưỡng nuôi cây gọi là bộ "rễ" (r). "Gốc" (g) là phần gốc cây sát đất.',
    specificFeedbacks: {
      'gốc': 'Bộ phận đâm sâu dưới lòng đất để giữ cây vững chắc và hút nước là bộ "rễ" bạn nhé.'
    },
    hint: 'Phần nằm sâu dưới đất hút nước và chất bổ để nuôi cây cao lớn.',
    illustrationKey: 're_cay',
    imageAlt: 'Bộ rễ cây bám sâu và chắc chắn vào lòng đất',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  },
  {
    id: 'r_g_12',
    group: 'r_g',
    questionType: 'missing_letters',
    supportLevel: 'standard',
    sentence: 'Bé ôm chú ... bông mềm mại khi chuẩn bị đi ngủ.',
    targetWord: 'gấu',
    options: ['gấu', 'rồng'],
    correctAnswer: 'gấu',
    completedSentence: 'Bé ôm chú gấu bông mềm mại khi chuẩn bị đi ngủ.',
    explanation: 'Đồ chơi nhồi bông hình chú gấu tròn trĩnh đáng yêu viết là chú "gấu bông" (g).',
    specificFeedbacks: {
      'rồng': 'Món đồ chơi nhồi bông tròn trịa ấm áp ôm đi ngủ là chú "gấu bông" bạn nhé.'
    },
    hint: 'Món thú nhồi bông tròn trĩnh lông mịn bé rất thích ôm khi ngủ.',
    illustrationKey: 'gau_bong',
    imageAlt: 'Chú gấu bông màu nâu xinh xắn đáng yêu',
    status: 'draft',
    version: 3,
    pairLetters: ['r', 'g']
  }
];
