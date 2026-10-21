import React from 'react';

/**
 * KOMPONEN RESTORASI: CharacterSpotlight
 * Section Spotlight Karakter Semar (Dari mainpage.html)
 * 
 * Props:
 * @param {function} onSelectCharacter - Callback ketika spotlight Semar diklik untuk bermain
 */
export default function CharacterSpotlight({ onSelectCharacter }) {
  return (
    <section className="character-spotlight-section position-relative py-5 overflow-hidden">
      {/* Megamendung Accessories */}
      <img src="/assets/megamendung.png" alt="" className="megamendung mega-semar-top flip-x" />
      <img src="/assets/megamendung.png" alt="" className="megamendung mega-semar-bottom" />

      <div className="container position-relative z-2">
        <div className="spotlight-wrapper row align-items-center g-4">
          <div className="spotlight-text col-12 col-lg-6 text-center text-lg-start">
            <h2 className="spotlight-title gold-text display-3 fw-extrabold mb-2">SEMAR</h2>
            <p className="spotlight-subtitle text-secondary fs-4 mb-4">
              Sang Pengayom Dan Penuntun
            </p>
            <p className="text-light opacity-75 mb-4 lh-lg" style={{ maxWidth: '520px' }}>
              Semar adalah perlambang nurani rakyat yang membumi, mengayomi para ksatria dengan kebenaran hakiki 
              dan canda tawa yang menggetarkan jiwa.
            </p>
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
              <button
                type="button"
                className="btn btn-pill px-4 py-2 d-flex align-items-center gap-2"
                onClick={() => onSelectCharacter('semar')}
              >
                <i className="bi bi-controller"></i>
                <span>Mainkan Kisah Semar</span>
              </button>
              <a href="#karakter-game" className="btn btn-outline-warning rounded-pill px-4 py-2">
                Pilih Tokoh Lain
              </a>
            </div>
          </div>

          <div className="spotlight-visual col-12 col-lg-6 position-relative d-flex justify-content-center align-items-center">
            {/* Spotlight Glow Aura */}
            <div 
              className="spotlight-glow position-absolute rounded-circle"
              style={{
                width: '380px',
                height: '380px',
                background: 'radial-gradient(circle, rgba(210, 159, 34, 0.35) 0%, rgba(210, 159, 34, 0) 70%)',
                filter: 'blur(30px)',
                zIndex: 1
              }}
            />
            <img 
              src="/assets/semar.png" 
              alt="Tokoh Semar Punakawan" 
              className="spotlight-character img-fluid position-relative z-2"
              style={{ maxHeight: '420px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.85))' }}
            />
          </div>
        </div>

        <div className="spotlight-bottom-call text-center mt-5">
          <a href="#karakter-game" className="text-decoration-none gold-text fw-bold fs-5 d-inline-flex align-items-center gap-2">
            <span>Pilih Karakter Kamu!</span>
            <i className="bi bi-arrow-down-circle-fill"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
