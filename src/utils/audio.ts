let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Phát âm thanh chúc mừng nhẹ nhàng khi làm đúng (Hợp âm Đô trưởng dịu êm)
 */
export function playSuccessChime(soundEnabled: boolean = true): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.5);
    });
  } catch (e) {
    console.debug('Lỗi âm thanh Web Audio:', e);
  }
}

/**
 * Phát âm thanh nhắc nhở dịu dàng khi cần thử lại (không gây giật mình hay ức chế)
 */
export function playGentleRetryTone(soundEnabled: boolean = true): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(349.23, now); // F4
    osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.25); // E4 dịu dàng

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {
    console.debug('Lỗi âm thanh Web Audio:', e);
  }
}

/**
 * Phát âm thanh nhấp nút êm tai
 */
export function playClickSound(soundEnabled: boolean = true): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Bỏ qua lỗi audio
  }
}

/**
 * Kiểm tra xem thiết bị có hỗ trợ giọng đọc tiếng Việt không
 */
export function checkVietnameseVoiceSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve(false);
      return;
    }

    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const hasVi = voices.some(v => v.lang.includes('vi') || v.lang.includes('VI'));
      resolve(hasVi);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      checkVoices();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        checkVoices();
      };
      // Timeout dự phòng
      setTimeout(() => {
        const fallbackVoices = window.speechSynthesis.getVoices();
        resolve(fallbackVoices.some(v => v.lang.includes('vi') || v.lang.includes('VI')));
      }, 500);
    }
  });
}

/**
 * Đọc câu hỏi bằng giọng đọc tiếng Việt (không đọc lộ đáp án của chỗ trống)
 */
export function speakText(text: string): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  // Dừng giọng đọc cũ nếu có
  window.speechSynthesis.cancel();

  // Xử lý chỗ trống "..." thành cụm "chỗ trống" để không lộ đáp án
  const cleanText = text.replace(/\.{2,}/g, 'chỗ trống');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.88; // Tốc độ vừa phải cho học sinh lớp 2
  utterance.pitch = 1.05;

  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find(v => v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi'));
  if (viVoice) {
    utterance.voice = viVoice;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}
