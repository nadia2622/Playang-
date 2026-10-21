import React from 'react';

/**
 * KOMPONEN RESTORASI: CtaBanner
 * Section "Udah kenal mereka semua, kan?" (Dari mainpage.html)
 * 
 * Props:
 * @param {function} onStartGame - Callback untuk melompat ke selector game dalang
 */
export default function CtaBanner({ onStartGame }) {
  return (
    <section className="cta-section py-5">
      <div className="container">
        <div 
          className="cta-banner position-relative overflow-hidden rounded-4 p-4 p-md-5 d-flex align-items-center"
          style={{
            minHeight: '380px',
            background: 'linear-gradient(90deg, #181a1d 0%, rgba(24, 26, 29, 0.85) 60%, rgba(24, 26, 29, 0.4) 100%)',
            border: '1px solid rgba(210, 159, 34, 0.35)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
          }}
        >
          {/* Dalang Visual in background */}
          <div 
            className="cta-bg-visual position-absolute end-0 top-0 h-100 w-50 pointer-events-none"
            style={{ opacity: 0.4, mixBlendMode: 'luminosity' }}
          >
            <img 
              src="/assets/dalang4.jpg" 
              alt="Dalang memainkan tokoh wayang" 
              className="w-100 h-100 object-fit-cover"
            />
          </div>

          {/* Megamendung Accent inside banner */}
          <img src="/assets/megamendung.png" alt="" className="megamendung mega-cta-accent" />

          {/* Glassmorphism Card */}
          <div 
            className="cta-glass-card p-4 p-md-5 rounded-4 position-relative z-2"
            style={{
              maxWidth: '540px',
              background: 'rgba(23, 25, 28, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(210, 159, 34, 0.4)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
            }}
          >
            <h3 className="cta-title gold-text fw-bold fs-2 mb-3">
              Udah kenal mereka semua, kan?
            </h3>
            <p className="cta-desc text-secondary fs-6 mb-4 lh-base">
              Nah, sekarang waktunya kamu nggak cuma nonton &mdash; tapi jadi bagian dari ceritanya!
              Pilih karakter favoritmu dan tentukan jalan dialogmu sendiri!
            </p>
            <button 
              type="button" 
              className="btn btn-pill px-4 py-2 fs-6 d-flex align-items-center gap-2"
              onClick={onStartGame}
            >
              <i className="bi bi-play-circle-fill fs-5"></i>
              <span>Coba Jadi Dalang</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
