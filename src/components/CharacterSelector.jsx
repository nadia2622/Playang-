import React from 'react';

/**
 * KOMPONEN RESTORASI: CharacterSelector
 * Section "Pilih Karakter Kamu!" (Dari mainpage.html Section 6 & COPYWRITING.md Bagian 3)
 * Menjadi gerbang utama untuk memilih karakter dan memulai Game Edukasi Dialog Wayang!
 * 
 * Props:
 * @param {function} onPlayCharacter - Callback untuk memulai Game Edukasi dengan ID karakter
 * @param {function} onViewDetail - Callback untuk melihat dialog detail karakter
 */
export default function CharacterSelector({
  onPlayCharacter,
  onViewDetail
}) {
  const characters = [
    {
      id: 'semar',
      nama: 'SEMAR',
      moniker: 'Sang Pengayom dan Penuntun',
      badge: 'Sang Pamong',
      gambar: '/assets/semar.png',
      falsafah: 'Urip iku urup.'
    },
    {
      id: 'gareng',
      nama: 'GARENG',
      moniker: 'Si Penengah yang Rendah Hati',
      badge: 'Nala Gareng',
      gambar: '/assets/gareng.png',
      falsafah: 'Aja dumeh, aja gumede.'
    },
    {
      id: 'petruk',
      nama: 'PETRUK',
      moniker: 'Si Lugas dan Panjang Akal',
      badge: 'Kanthong Bolong',
      gambar: '/assets/petruk.png',
      falsafah: 'Guyu iku nambani lara ati.'
    },
    {
      id: 'bawor',
      nama: 'BAWOR',
      moniker: 'Si Jujur dan Apa Adanya',
      badge: 'Cablaka Banyumas',
      gambar: '/assets/bawor.png',
      falsafah: 'Wong urip sing penting cablaka.'
    }
  ];

  return (
    <section id="karakter-game" className="character-select-section position-relative py-5">
      {/* Megamendung Accessories */}
      <img src="/assets/megamendung.png" alt="" className="megamendung mega-select-left" />
      <img src="/assets/megamendung.png" alt="" className="megamendung mega-select-right flip-x" />

      <div className="container position-relative z-2">
        <div className="character-select-header text-center mx-auto mb-5">
          <h2 className="character-select-title gold-text display-5 fw-bold mb-3">
            Pilih Karakter Kamu!
          </h2>
          <p className="character-select-desc text-secondary mx-auto" style={{ maxWidth: '680px' }}>
            Pilih tokoh favoritmu, mainkan dialognya, dan lihat sendiri bagaimana nilai-nilai Punakawan
            hidup lewat candaan mereka. Siap? Yuh jajal saiki!
          </p>
        </div>

        {/* 4 Cards Grid (Matching mainpage.html layout) */}
        <div className="character-grid row g-4 position-relative z-2 justify-content-center">
          {characters.map((char) => (
            <div key={char.id} className="col-12 col-sm-6 col-lg-3">
              <div 
                className="char-card h-100 position-relative rounded-4 overflow-hidden shadow-lg transition-all"
                style={{
                  minHeight: '410px',
                  background: 'linear-gradient(180deg, rgba(25, 28, 32, 0.6) 0%, rgba(20, 22, 25, 0.95) 100%)',
                  border: '1px solid rgba(210, 159, 34, 0.35)',
                  cursor: 'pointer'
                }}
              >
                {/* Backdrop & Glow */}
                <div className="char-backdrop position-absolute inset-0 z-0" />
                <div 
                  className="char-glow position-absolute bottom-0 start-0 w-100" 
                  style={{
                    height: '160px',
                    background: 'radial-gradient(ellipse at bottom, rgba(243, 208, 121, 0.3) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                />

                {/* Character Image */}
                <div 
                  className="char-image-wrapper position-relative z-2 d-flex align-items-center justify-content-center pt-4"
                  style={{ height: '240px' }}
                  onClick={() => onPlayCharacter(char.id)}
                >
                  <img 
                    src={char.gambar} 
                    alt={char.nama} 
                    className="img-fluid transition-all"
                    style={{ maxHeight: '200px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))' }}
                  />
                </div>

                {/* Info & Action Buttons */}
                <div className="char-info p-3 text-center position-relative z-3">
                  <h3 className="char-name text-white fw-bold fs-4 mb-1">
                    {char.nama}
                  </h3>
                  <p className="char-moniker text-secondary small mb-3">
                    {char.moniker}
                  </p>

                  <div className="d-flex flex-column gap-2">
                    <button
                      type="button"
                      className="btn btn-pill w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => onPlayCharacter(char.id)}
                    >
                      <i className="bi bi-play-fill fs-5"></i>
                      <span>Mainkan Dialog</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary text-secondary w-100 rounded-pill"
                      onClick={() => onViewDetail && onViewDetail(char.id)}
                    >
                      Pelajari Watak
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
