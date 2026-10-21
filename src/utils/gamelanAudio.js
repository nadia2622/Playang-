/**
 * Ambient Gamelan Audio Engine (Web Audio API)
 * Menghasilkan suara gamelan Jawa laras Slendro & Gong Ageng secara sintetis,
 * lembut, samar-samar, dan menenangkan (tanpa dependensi file eksternal).
 */

class GamelanAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.14; // Samar-samar (subtle ambient background volume)
    this.intervalId = null;
    this.beatIndex = 0;

    // Frekuensi Nada Gamelan Jawa Laras Slendro (Hz)
    // 1 (Ji), 2 (Ro), 3 (Lu), 5 (Ma), 6 (Nem), 1 Tinggi (Ji Inggil), 2 Tinggi
    this.notes = {
      jiLow: 137.5,
      nemLow: 234.0,
      ji: 275.0,
      ro: 312.0,
      lu: 355.0,
      ma: 410.0,
      nem: 468.0,
      jiHi: 550.0,
      roHi: 624.0,
      kenong: 156.0,
      kempul: 117.0,
      gong: 62.0 // Gong Ageng (frekuensi rendah bergetar dalam)
    };

    // Pola Melodi Tradisional Gamelan Laras Slendro (16 ketukan per siklus gongan)
    this.melodyPattern = [
      { note: 'ji', isGong: true },     // Ketukan 1: Gong Ageng jatuh bersama nada pembuka
      { note: 'ro' },                   // Ketukan 2
      { note: 'lu' },                   // Ketukan 3
      { note: 'ro', isKenong: true },   // Ketukan 4: Kenong
      { note: 'lu' },                   // Ketukan 5
      { note: 'ma' },                   // Ketukan 6
      { note: 'nem' },                  // Ketukan 7
      { note: 'ma', isKempul: true },   // Ketukan 8: Kempul
      { note: 'lu' },                   // Ketukan 9
      { note: 'ro' },                   // Ketukan 10
      { note: 'lu' },                   // Ketukan 11
      { note: 'ro', isKenong: true },   // Ketukan 12: Kenong
      { note: 'ji' },                   // Ketukan 13
      { note: 'nemLow' },               // Ketukan 14
      { note: 'ji' },                   // Ketukan 15
      { note: 'ro', isGong: true }      // Ketukan 16: Penutup gongan
    ];
  }

  // Inisialisasi AudioContext saat ada interaksi user
  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return false;
      this.audioCtx = new AudioContextClass();

      // Master Gain Node
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.audioCtx.currentTime);

      // Lowpass filter untuk nuansa suara perunggu yang lembut & temaram
      this.lowpass = this.audioCtx.createBiquadFilter();
      this.lowpass.type = 'lowpass';
      this.lowpass.frequency.setValueAtTime(1600, this.audioCtx.currentTime);

      this.masterGain.connect(this.lowpass);
      this.lowpass.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    return true;
  }

  // Sintesis Nada Bonang / Saron / Gender (Bronze Bell Timbre)
  playSaronNote(freq, time, duration = 2.8, gainLevel = 0.5) {
    if (!this.audioCtx || this.isMuted) return;

    // 1. Nada Dasar (Fundamental)
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // 2. Overtone Perunggu (Metallic Bronze Inharmonic Ratio: 2.76x)
    const overtone = this.audioCtx.createOscillator();
    const overtoneGain = this.audioCtx.createGain();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2.76, time);

    // Envelope Attack & Decay lembut
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(gainLevel * 0.45, time + 0.025); // Pukulan panggul lembut
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    overtoneGain.gain.setValueAtTime(gainLevel * 0.12, time);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0005, time + duration * 0.4);

    osc.connect(gain);
    overtone.connect(overtoneGain);

    gain.connect(this.masterGain);
    overtoneGain.connect(this.masterGain);

    osc.start(time);
    overtone.start(time);
    osc.stop(time + duration);
    overtone.stop(time + duration);
  }

  // Sintesis Nada Gong Ageng (Deep Resonance dengan Gelombang Ombak)
  playGongAgeng(time) {
    if (!this.audioCtx || this.isMuted) return;

    const gongFreq = this.notes.gong;
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gongGain = this.audioCtx.createGain();

    // Efek "Ombak" (beat frequency alami pada gong Jawa)
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(gongFreq, time);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(gongFreq + 2.5, time); // 2.5 Hz ombak shimmer

    // Gong bergetar panjang hingga 6-7 detik
    gongGain.gain.setValueAtTime(0, time);
    gongGain.gain.linearRampToValueAtTime(0.65, time + 0.06);
    gongGain.gain.exponentialRampToValueAtTime(0.0001, time + 6.5);

    osc1.connect(gongGain);
    osc2.connect(gongGain);
    gongGain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 6.8);
    osc2.stop(time + 6.8);
  }

  // Sintesis Kenong / Kempul (Mid-Low Bronze Gong)
  playKenong(freq, time) {
    if (!this.audioCtx || this.isMuted) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.35, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 4.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 4.5);
  }

  // Memulai Alur Musik Gamelan Samar-Samar
  start() {
    if (this.isPlaying) return;
    this.initContext();

    this.isPlaying = true;
    this.beatIndex = 0;

    // Tempo lambat & syahdu (Irama Dadi - 1 ketukan tiap 1.45 detik)
    const beatIntervalMs = 1450;

    const playStep = () => {
      if (!this.isPlaying || !this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const currentBeat = this.melodyPattern[this.beatIndex];

      // Mainkan Gong jika pada ketukan jatuh gong
      if (currentBeat.isGong) {
        this.playGongAgeng(now);
      }

      // Mainkan Kenong / Kempul
      if (currentBeat.isKenong) {
        this.playKenong(this.notes.kenong, now);
      } else if (currentBeat.isKempul) {
        this.playKenong(this.notes.kempul, now);
      }

      // Mainkan nada saron / bonang melodi
      if (currentBeat.note && this.notes[currentBeat.note]) {
        this.playSaronNote(this.notes[currentBeat.note], now, 2.5, 0.4);
      }

      // Pindah ke ketukan berikutnya
      this.beatIndex = (this.beatIndex + 1) % this.melodyPattern.length;
    };

    // Mainkan nada pertama langsung
    playStep();
    this.intervalId = setInterval(playStep, beatIntervalMs);
  }

  // Menghentikan Musik
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
  }

  // Toggle Mute / Unmute
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0 : this.volume,
        now + 0.2
      );
    }
    return this.isMuted;
  }

  // Set Volume (0.0 s/d 1.0)
  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }
}

// Export single instance
export const gamelanAudio = new GamelanAudioEngine();
