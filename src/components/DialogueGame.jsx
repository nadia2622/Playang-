import React, { useState, useEffect } from 'react';
import { DIALOGUE_GAMES } from '../data/dialogueGameData';
import { gamelanAudio } from '../utils/gamelanAudio';

/**
 * KOMPONEN GAMIFIKASI: DialogueGame
 * Game Edukasi Interaktif Berbasis Dialog Wayang Punakawan Banyumas
 * Fullscreen Theater Mode sesuai desain Figma (Semar/Game 2, Game 3, Game 4)
 * 
 * Props:
 * @param {string} characterId - Karakter yang dimainkan ('semar' | 'gareng' | 'petruk' | 'bawor')
 * @param {boolean} isOpen - Status keterbukaan game
 * @param {function} onClose - Callback untuk kembali ke beranda
 * @param {function} onSelectAnother - Callback untuk memilih tokoh lain
 * @param {function} onNavigateSection - Callback untuk langsung melompat ke section tertentu (e.g. 'ringkasan', 'karakter-katalog')
 */
export default function DialogueGame({
  characterId = 'semar',
  isOpen = false,
  onClose,
  onSelectAnother,
  onNavigateSection
}) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Intro, 2: Dialog, 3: Choice, 4: Reaction, 5: Ending
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [totalXp, setTotalXp] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [spinningChar, setSpinningChar] = useState(null);

  const gameData = DIALOGUE_GAMES[characterId] || DIALOGUE_GAMES.semar;

  // Handler interaktif untuk memutar wayang saat diklik (360° Sabetan Spin)
  const handleWayangClick = (id) => {
    setSpinningChar(id);
    gamelanAudio.initContext();
    // Dentang perunggu saron lembut saat wayang diputar
    if (gamelanAudio.audioCtx) {
      gamelanAudio.playSaronNote(550, gamelanAudio.audioCtx.currentTime, 1.8, 0.4);
    }
    setTimeout(() => {
      setSpinningChar(null);
    }, 850);
  };

  // Mengelola audio gamelan secara samar-samar saat gameplay aktif/tertutup
  useEffect(() => {
    if (isOpen) {
      gamelanAudio.start();
    } else {
      gamelanAudio.stop();
    }

    return () => {
      gamelanAudio.stop();
    };
  }, [isOpen]);

  // Reset step ketika karakter berganti
  useEffect(() => {
    setCurrentStep(1);
    setSelectedChoice(null);
  }, [characterId]);

  // Support tombol Keyboard Escape untuk keluar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose && onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleToggleMute = () => {
    const muted = gamelanAudio.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleNext = () => {
    gamelanAudio.initContext();
    if (currentStep < 5) {
      if (currentStep === 3 && !selectedChoice) {
        return; // Harus memilih opsi di step 3
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    gamelanAudio.initContext();
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      onClose && onClose();
    }
  };

  const handleRestart = () => {
    gamelanAudio.initContext();
    setCurrentStep(1);
    setSelectedChoice(null);
  };

  const handleSelectOption = (option) => {
    gamelanAudio.initContext();
    setSelectedChoice(option);
    setTotalXp((prev) => prev + option.xp);
    setCurrentStep(4);
  };

  return (
    <div 
      className="dialogue-game-overlay position-fixed top-0 start-0 w-100 h-100 d-flex flex-column"
      style={{
        zIndex: 2050, // Di atas navbar sehingga tidak gepeng / tumpang tindih
        background: '#0d0f11',
        overflow: 'hidden'
      }}
    >
      {/* Background Kelir & Gunungan Panggung Wayang */}
      <div 
        className="game-kelir-bg position-absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(17, 19, 21, 0.72), rgba(9, 10, 12, 0.85)), url('/assets/bgGame.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
          zIndex: 1
        }}
      />

      {/* Partikel Pijar Lampu Blencong (Ambient Floating Embers) */}
      <div className="stage-ember" style={{ left: '15%', animationDuration: '7.5s', animationDelay: '0s' }} />
      <div className="stage-ember" style={{ left: '38%', animationDuration: '9.2s', animationDelay: '2.5s' }} />
      <div className="stage-ember" style={{ left: '62%', animationDuration: '8.1s', animationDelay: '1.2s' }} />
      <div className="stage-ember" style={{ left: '84%', animationDuration: '10.5s', animationDelay: '3.8s' }} />

      {/* Cahaya Hangat Lampu Blencong Dalang (Pulsing Ambient Flame Light) */}
      <div 
        className="blencong-flicker position-absolute top-50 start-50 translate-middle rounded-circle pointer-events-none"
        style={{
          width: '560px',
          height: '320px',
          background: 'radial-gradient(ellipse at center, rgba(243, 208, 121, 0.16) 0%, rgba(210, 159, 34, 0.05) 55%, rgba(0,0,0,0) 80%)',
          zIndex: 1
        }}
      />
      
      {/* Top Bar Bersih & Ramping (Tanpa Double Navbar) */}
      {/* Top Bar Bersih & Ramping */}
      <header 
        className="game-top-bar d-flex align-items-center justify-content-between px-3 px-md-4 py-2 position-relative z-3 gap-3"
        style={{
          background: 'linear-gradient(180deg, rgba(14, 16, 18, 0.95) 0%, rgba(14, 16, 18, 0.85) 100%)',
          borderBottom: '1px solid rgba(210, 159, 34, 0.25)',
          minHeight: '52px'
        }}
      >
        {/* Kiri: Tombol Keluar / Beranda */}
        <div className="d-flex align-items-center flex-shrink-0">
          <button 
            type="button" 
            className="btn btn-sm btn-outline-warning rounded-pill px-3 py-1 d-flex align-items-center gap-2 text-nowrap"
            onClick={onClose}
            title="Keluar dari game dan kembali ke beranda"
            style={{ fontSize: '0.82rem', height: '32px' }}
          >
            <i className="bi bi-arrow-left"></i>
            <span>Keluar Game</span>
          </button>
        </div>

        {/* Tengah: Judul Lakon & Indikator Babak */}
        <div className="d-flex align-items-center justify-content-center gap-3 text-nowrap mx-auto">
          <span className="gold-text fw-bold text-uppercase tracking-wider small">
            {gameData.title || `LAKON ${gameData.karakter}`}
          </span>

          <div className="d-flex align-items-center gap-1">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step} 
                className={`rounded-pill transition-all ${
                  currentStep === step 
                    ? 'bg-warning shadow-sm' 
                    : currentStep > step 
                      ? 'bg-secondary' 
                      : 'bg-dark border border-secondary'
                }`}
                style={{
                  width: currentStep === step ? '20px' : '6px',
                  height: '6px'
                }}
              />
            ))}
          </div>
        </div>

        {/* Kanan: Audio Backsound, Ganti Tokoh, XP & Tutup */}
        <div className="d-flex align-items-center gap-2 flex-shrink-0 text-nowrap">
          {/* Tombol Backsound Gamelan */}
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 py-1 d-flex align-items-center gap-2 text-nowrap ${
              isAudioMuted 
                ? 'btn-outline-secondary text-secondary' 
                : 'btn-outline-warning text-warning'
            }`}
            style={{ fontSize: '0.82rem', height: '32px' }}
            onClick={handleToggleMute}
            title={isAudioMuted ? "Aktifkan Backsound Gamelan" : "Bisukan Backsound Gamelan"}
          >
            <i className={`bi ${isAudioMuted ? 'bi-volume-mute-fill' : 'bi-music-note-beamed'}`}></i>
            <span>{isAudioMuted ? 'Mute' : 'Gamelan'}</span>
          </button>

          {/* XP Badge */}
          {totalXp > 0 && (
            <span 
              className="badge rounded-pill bg-warning text-dark px-2 d-flex align-items-center gap-1 fw-bold text-nowrap"
              style={{ fontSize: '0.78rem', height: '32px' }}
            >
              <i className="bi bi-star-fill"></i>
              <span>{totalXp} XP</span>
            </span>
          )}

          {/* Tombol Ganti Tokoh */}
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 text-light d-flex align-items-center gap-2 text-nowrap"
            style={{ fontSize: '0.82rem', height: '32px' }}
            onClick={onSelectAnother}
            title="Pilih karakter wayang lainnya"
          >
            <i className="bi bi-people"></i>
            <span>Ganti Tokoh</span>
          </button>

          {/* Tombol Tutup X */}
          <button
            type="button"
            className="btn btn-sm btn-dark border border-secondary text-secondary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: '32px', height: '32px' }}
            onClick={onClose}
            title="Tutup (Esc)"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </header>

      {/* Main Theater / Kelir Stage (Ruang Lega & Proporsional Sesuai Figma) */}
      <main className="game-stage flex-grow-1 position-relative d-flex flex-column justify-content-between p-3 p-md-4 z-2 overflow-y-auto">
        
        {/* Navigation Arrow: Left (Floating di Sisi Kiri) */}
        {currentStep > 1 && (
          <button
            type="button"
            className="game-nav-arrow arrow-left position-absolute top-50 start-0 translate-middle-y ms-2 ms-md-4 rounded-circle btn btn-dark border border-warning text-warning d-flex align-items-center justify-content-center shadow-lg"
            style={{ width: '48px', height: '48px', zIndex: 10, background: 'rgba(23, 25, 27, 0.85)' }}
            onClick={handlePrev}
            aria-label="Kembali ke langkah sebelumnya"
          >
            <i className="bi bi-chevron-left fs-5"></i>
          </button>
        )}

        {/* Navigation Arrow: Right (Floating di Sisi Kanan) */}
        {currentStep < 5 && currentStep !== 3 && (
          <button
            type="button"
            className="game-nav-arrow arrow-right position-absolute top-50 end-0 translate-middle-y me-2 me-md-4 rounded-circle btn btn-dark border border-warning text-warning d-flex align-items-center justify-content-center shadow-lg"
            style={{ width: '48px', height: '48px', zIndex: 10, background: 'rgba(23, 25, 27, 0.85)' }}
            onClick={handleNext}
            aria-label="Lanjut ke langkah berikutnya"
          >
            <i className="bi bi-chevron-right fs-5"></i>
          </button>
        )}

        {/* STAGE CONTENT SWITCHER (Tengah) */}
        <div className="stage-content-wrapper flex-grow-1 d-flex flex-column justify-content-center align-items-center position-relative w-100 mx-auto my-auto" style={{ maxWidth: '960px' }}>
          
          {/* ================================================================
              SLIDE 1: INTRO / PEMBUKA (Narasi Masuk - Figma Semar/Game 2)
              ================================================================ */}
          {currentStep === 1 && (
            <div className="w-100 d-flex flex-column align-items-center animate__animated animate__fadeIn text-center">
              {/* Narator Glass Box */}
              <div 
                className="narator-glass-box p-3 p-md-4 rounded-4 mb-3 text-center"
                style={{
                  maxWidth: '740px',
                  background: 'rgba(25, 28, 32, 0.88)',
                  border: '1px solid rgba(210, 159, 34, 0.4)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
                }}
              >
                <div className="d-flex align-items-center justify-content-center gap-2 mb-2 text-warning small fw-semibold">
                  <i className="bi bi-mic-fill"></i>
                  <span>NARASI PEMBUKA LAKON</span>
                </div>
                <p className="text-light mb-0 fs-6 lh-base" style={{ fontSize: '0.94rem' }}>
                  {gameData.intro.narasi}
                </p>
              </div>

              {/* Wayang Solo di Tengah Panggung dengan Motion Putar & Sabetan Dalang */}
              <div className="stage-character-center position-relative my-2">
                <div 
                  className="blencong-flicker position-absolute bottom-0 start-50 translate-middle-x rounded-circle"
                  style={{
                    width: '300px',
                    height: '65px',
                    background: 'radial-gradient(ellipse at center, rgba(210, 159, 34, 0.55) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 1
                  }}
                />
                <img 
                  src={gameData.avatar} 
                  alt={gameData.karakter}
                  className={`img-fluid position-relative z-2 wayang-dalang-motion ${spinningChar === 'solo' ? 'wayang-spin-active' : ''}`}
                  style={{ maxHeight: '250px', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.9))' }}
                  onClick={() => handleWayangClick('solo')}
                  title="Klik untuk memutar wayang!"
                />
              </div>

              {/* Tombol Aksi Mulai */}
              <div className="mt-2">
                <button
                  type="button"
                  className="btn btn-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
                  onClick={handleNext}
                >
                  <span>Mulai Percakapan</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* ================================================================
              SLIDE 2: DIALOG PERCAKAPAN (Speech Bubbles - Figma Semar/Game 3)
              ================================================================ */}
          {currentStep === 2 && (
            <div className="w-100 d-flex flex-column align-items-center animate__animated animate__fadeIn">
              <div className="mb-3 text-center">
                <span className="badge rounded-pill bg-warning text-dark px-3 py-1 fw-bold">
                  <i className="bi bi-chat-quote-fill me-1"></i> BABAK DIALOG LAKON
                </span>
              </div>

              {/* Dual Characters dengan Gelembung Percakapan Mengambang */}
              <div className="row w-100 align-items-end justify-content-center g-4 my-auto">
                {/* Tokoh Kiri (Lawan Bicara) */}
                <div className="col-12 col-md-5 d-flex flex-column align-items-center align-items-md-start">
                  <div 
                    className="speech-bubble bubble-float mb-3 p-3 rounded-4 position-relative"
                    style={{
                      background: 'rgba(32, 35, 40, 0.94)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      maxWidth: '360px'
                    }}
                  >
                    <strong className="text-warning d-block small mb-1">{gameData.dialogue.speaker1}:</strong>
                    <p className="text-light mb-0 small lh-base">
                      "{gameData.dialogue.text1}"
                    </p>
                  </div>
                  <img 
                    src={gameData.opponentAvatar} 
                    alt={gameData.dialogue.speaker1}
                    className={`img-fluid wayang-speaking-left ${spinningChar === 'left' ? 'wayang-spin-active' : ''}`}
                    style={{ maxHeight: '230px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))' }}
                    onClick={() => handleWayangClick('left')}
                    title="Klik untuk memutar wayang!"
                  />
                </div>

                {/* Tokoh Kanan (Karakter Utama) */}
                <div className="col-12 col-md-5 d-flex flex-column align-items-center align-items-md-end">
                  <div 
                    className="speech-bubble bubble-float mb-3 p-3 rounded-4 position-relative"
                    style={{
                      background: 'rgba(40, 34, 20, 0.94)',
                      border: '1px solid rgba(210, 159, 34, 0.45)',
                      boxShadow: '0 10px 25px rgba(210, 159, 34, 0.2)',
                      maxWidth: '360px'
                    }}
                  >
                    <strong className="gold-text d-block small mb-1">{gameData.dialogue.speaker2}:</strong>
                    <p className="text-light mb-0 small lh-base">
                      "{gameData.dialogue.text2}"
                    </p>
                  </div>
                  <img 
                    src={gameData.avatar} 
                    alt={gameData.karakter}
                    className={`img-fluid wayang-speaking-right ${spinningChar === 'right' ? 'wayang-spin-active' : ''}`}
                    style={{ maxHeight: '240px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))' }}
                    onClick={() => handleWayangClick('right')}
                    title="Klik untuk memutar wayang!"
                  />
                </div>
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
                  onClick={handleNext}
                >
                  <span>Pilih Tanggapanmu</span>
                  <i className="bi bi-question-circle-fill"></i>
                </button>
              </div>
            </div>
          )}

          {/* ================================================================
              SLIDE 3: INTERACTIVE CHOICE (Figma Semar/Game 4)
              ================================================================ */}
          {currentStep === 3 && (
            <div className="w-100 d-flex flex-column align-items-center animate__animated animate__fadeIn" style={{ maxWidth: '800px' }}>
              <div className="text-center mb-3">
                <span className="badge rounded-pill bg-warning text-dark px-3 py-1 fw-bold mb-2">
                  <i className="bi bi-hand-index-thumb-fill me-1"></i> GILIRANMU MENJADI DALANG
                </span>
                <h3 className="gold-text fw-bold fs-3 text-uppercase tracking-wider">
                  {gameData.question.title}
                </h3>
                <p className="text-secondary small mb-0">
                  Pilihlah jawaban yang menurutmu paling mencerminkan kebijaksanaan watak wayang!
                </p>
              </div>

              {/* 3 Tombol Pilihan Interaktif dengan Stagger Entrance */}
              <div className="d-flex flex-column gap-3 w-100">
                {gameData.question.options.map((option, idx) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`choice-card-btn choice-stagger-${idx + 1} text-start p-3 rounded-4 transition-all w-100 d-flex align-items-center justify-content-between`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(28, 31, 36, 0.92) 0%, rgba(20, 22, 25, 0.96) 100%)',
                      border: '1px solid rgba(210, 159, 34, 0.35)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleSelectOption(option)}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <span 
                        className="badge rounded-circle p-2 bg-warning text-dark fw-bold d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px', flexShrink: 0 }}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-white fw-bold fs-6 mb-1">
                          "{option.choiceText}"
                        </div>
                        <small className="text-warning fst-italic">
                          {option.choiceTranslation}
                        </small>
                      </div>
                    </div>
                    <div className="text-warning ms-3">
                      <i className="bi bi-chevron-right fs-4"></i>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              SLIDE 4: REACTION & NILAI MORAL
              ================================================================ */}
          {currentStep === 4 && selectedChoice && (
            <div className="w-100 d-flex flex-column align-items-center animate__animated animate__fadeIn" style={{ maxWidth: '800px' }}>
              <div className="text-center mb-3">
                <span className="badge rounded-pill bg-success text-white px-3 py-1 fw-bold">
                  <i className="bi bi-check-circle-fill me-1"></i> HASIL PILIHAN DALANG
                </span>
                <h4 className="gold-text fw-bold fs-4 mt-2 mb-0">Dampak Pilihanmu pada Alur Kisah</h4>
              </div>

              {/* Reaction Box */}
              <div 
                className="w-100 p-3 p-md-4 rounded-4 mb-3"
                style={{
                  background: 'rgba(23, 26, 30, 0.92)',
                  border: '1px solid rgba(210, 159, 34, 0.4)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.6)'
                }}
              >
                {/* Tanggapan Lawan Bicara */}
                <div className="mb-3 p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <span className="text-warning fw-semibold small d-block mb-1">
                    {selectedChoice.reactionSpeaker}:
                  </span>
                  <p className="text-light mb-0 small lh-base fst-italic">
                    "{selectedChoice.reactionText}"
                  </p>
                </div>

                {/* Wejangan Penutup */}
                <div className="mb-3 p-3 rounded-3" style={{ background: 'rgba(210, 159, 34, 0.1)', borderLeft: '4px solid #d29f22' }}>
                  <span className="gold-text fw-semibold small d-block mb-1">
                    Wejangan Penutup Dialog:
                  </span>
                  <p className="text-white mb-1 small fw-bold">
                    "{selectedChoice.semarResponse}"
                  </p>
                  <small className="text-warning fst-italic">
                    {selectedChoice.semarResponseTranslation}
                  </small>
                </div>

                {/* Nilai Moral Card */}
                <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-dark border border-secondary border-opacity-25 flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge rounded-circle p-2 bg-warning text-dark">
                      <i className="bi bi-gem"></i>
                    </span>
                    <div>
                      <small className="text-secondary d-block">Nilai Moral Tersampaikan:</small>
                      <strong className="text-white small">{selectedChoice.moral}</strong>
                    </div>
                  </div>
                  <span className="badge bg-warning text-dark fw-bold px-3 py-2">
                    +{selectedChoice.xp} XP Kebijaksanaan
                  </span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
                  onClick={handleNext}
                >
                  <span>Lihat Akhiran Kisah</span>
                  <i className="bi bi-stars"></i>
                </button>
              </div>
            </div>
          )}

          {/* ================================================================
              SLIDE 5: ENDING & GAMIFIKASI SELESAI
              ================================================================ */}
          {currentStep === 5 && (
            <div className="w-100 d-flex flex-column align-items-center text-center animate__animated animate__zoomIn" style={{ maxWidth: '750px' }}>
              <div 
                className="ending-victory-card p-4 p-md-5 rounded-4 w-100"
                style={{
                  background: 'linear-gradient(180deg, #242019 0%, #17191c 65%, #111315 100%)',
                  border: '2px solid #d29f22',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(210, 159, 34, 0.3)'
                }}
              >
                <div className="mb-3">
                  <span className="badge rounded-pill bg-warning text-dark px-4 py-2 fs-6 fw-bold">
                    <i className="bi bi-trophy-fill me-2"></i> LAKON SELESAI DIMINKAN
                  </span>
                </div>

                <h2 className="gold-text fw-extrabold display-6 mb-3">
                  Selamat, Kamu Telah Menjadi Dalang Sejati!
                </h2>

                <p className="text-light mb-4 lh-lg fs-6">
                  {gameData.ending.narasi}
                </p>

                {/* Falsafah Quote */}
                <div 
                  className="p-3 rounded-3 mb-4 text-center"
                  style={{
                    background: 'rgba(210, 159, 34, 0.12)',
                    border: '1px solid rgba(210, 159, 34, 0.4)',
                    color: '#f7d788'
                  }}
                >
                  <div className="fs-5 fw-bold fst-italic mb-1">
                    "{gameData.ending.falsafah}"
                  </div>
                  <small className="text-secondary">
                    {gameData.ending.moralSummary}
                  </small>
                </div>

                {/* Tombol Aksi Akhir */}
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
                  <button
                    type="button"
                    className="btn btn-pill px-4 py-2 d-flex align-items-center gap-2"
                    onClick={() => setShowShareModal(true)}
                  >
                    <i className="bi bi-share-fill"></i>
                    <span>Bagikan Pengalaman</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-warning rounded-pill px-4 py-2 d-flex align-items-center gap-2"
                    onClick={onSelectAnother}
                  >
                    <i className="bi bi-people-fill"></i>
                    <span>Mainkan Tokoh Lain</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill px-4 py-2 d-flex align-items-center gap-2 text-light"
                    onClick={onClose}
                  >
                    <i className="bi bi-house-door-fill"></i>
                    <span>Kembali ke Beranda</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM NAVIGATION CONTROL BAR (Sesuai Desain Figma: Kembali, Beranda, Putar Ulang) */}
        <footer 
          className="game-bottom-bar d-flex align-items-center justify-content-center gap-5 py-2 position-relative z-3"
          style={{ 
            background: 'linear-gradient(0deg, rgba(14, 16, 18, 0.95) 0%, rgba(14, 16, 18, 0.75) 100%)',
            borderTop: '1px solid rgba(210, 159, 34, 0.25)',
            minHeight: '52px'
          }}
        >
          {/* Tombol 1: Kembali */}
          <button
            type="button"
            className="btn btn-link text-decoration-none text-light opacity-75 hover-opacity-100 d-flex flex-column align-items-center gap-1 p-0"
            onClick={handlePrev}
            style={{ fontSize: '0.78rem' }}
          >
            <i className="bi bi-arrow-counterclockwise fs-5 text-warning"></i>
            <span>Kembali</span>
          </button>

          {/* Tombol 2: Beranda */}
          <button
            type="button"
            className="btn btn-link text-decoration-none text-light opacity-75 hover-opacity-100 d-flex flex-column align-items-center gap-1 p-0"
            onClick={onClose}
            style={{ fontSize: '0.78rem' }}
          >
            <i className="bi bi-house-door fs-5 text-warning"></i>
            <span>Beranda</span>
          </button>

          {/* Tombol 3: Putar Ulang */}
          <button
            type="button"
            className="btn btn-link text-decoration-none text-light opacity-75 hover-opacity-100 d-flex flex-column align-items-center gap-1 p-0"
            onClick={handleRestart}
            style={{ fontSize: '0.78rem' }}
          >
            <i className="bi bi-arrow-repeat fs-5 text-warning"></i>
            <span>Putar Ulang</span>
          </button>
        </footer>

      </main>

      {/* Pop Up: Bagikan Pengalamanmu Menjadi Dalang */}
      {showShareModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 z-3"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 2100 }}
        >
          <div 
            className="p-4 rounded-4 shadow-lg text-center"
            style={{
              maxWidth: '500px',
              background: '#17191c',
              border: '1px solid #d29f22'
            }}
          >
            <i className="bi bi-award-fill text-warning display-4 mb-3 d-block"></i>
            <h4 className="gold-text fw-bold mb-2">Bagikan Pengalamanmu Menjadi Dalang!</h4>
            <p className="text-secondary small mb-4">
              "Aku baru saja menyelesaikan lakon {gameData.karakter} ({gameData.subtitle}) di Playang! Yuk pelajari kearifan budaya Banyumas lewat tawa dan petuah Punakawan."
            </p>
            <div className="d-flex justify-content-center gap-2 mb-4">
              <button 
                type="button" 
                className="btn btn-outline-warning rounded-circle" 
                style={{ width: '42px', height: '42px' }}
                onClick={() => alert('Tautan disalin ke clipboard! Siap dibagikan ke WhatsApp.')}
              >
                <i className="bi bi-whatsapp"></i>
              </button>
              <button 
                type="button" 
                className="btn btn-outline-warning rounded-circle" 
                style={{ width: '42px', height: '42px' }}
                onClick={() => alert('Tautan disalin ke clipboard! Siap dibagikan ke X / Twitter.')}
              >
                <i className="bi bi-twitter-x"></i>
              </button>
              <button 
                type="button" 
                className="btn btn-outline-warning rounded-circle" 
                style={{ width: '42px', height: '42px' }}
                onClick={() => alert('Tautan disalin ke clipboard! Siap dibagikan ke Instagram.')}
              >
                <i className="bi bi-instagram"></i>
              </button>
            </div>
            <button 
              type="button" 
              className="btn btn-pill px-4"
              onClick={() => setShowShareModal(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
