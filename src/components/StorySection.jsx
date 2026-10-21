import React, { useState } from 'react';

/**
 * KOMPONEN RESTORASI: StorySection
 * Bagian Kisah & Sejarah Asal-Usul Punakawan (Dari mainpage.html & COPYWRITING.md Bagian 1 & 2)
 */
export default function StorySection() {
  const [activeStoryModal, setActiveStoryModal] = useState(null);

  return (
    <section id="punakawan" className="punakawan-section position-relative py-5">
      {/* Megamendung Accessories */}
      <img src="/assets/megamendung.png" alt="" className="megamendung mega-punakawan-left" />
      <img src="/assets/megamendung.png" alt="" className="megamendung mega-punakawan-right flip-x" />

      <div className="container position-relative z-2">
        <div className="section-header text-center mb-5">
          <h2 className="section-title gold-text display-5 fw-bold mb-3">PUNAKAWAN</h2>
          <p className="section-desc text-secondary mx-auto" style={{ maxWidth: '720px' }}>
            Dalam dunia wayang, punakawan hadir sebagai sosok jenaka nan bijak yang menuntun para ksatria
            dengan humor, kejujuran, dan kebijaksanaan rakyat kecil.
          </p>
        </div>

        {/* 2 Responsive Story Cards */}
        <div className="story-grid row g-4 justify-content-center">
          <div className="col-12 col-md-6">
            <article 
              className="story-card rounded-4 overflow-hidden position-relative shadow-lg" 
              role="button"
              onClick={() => setActiveStoryModal('asal-usul')}
              title="Klik untuk membaca kisah asal-usul Punakawan"
              style={{ cursor: 'pointer', height: '320px' }}
            >
              <img 
                src="/assets/dalang4.jpg" 
                alt="Dalang beraksi dengan wayang kulit" 
                className="w-100 h-100 object-fit-cover"
              />
              <div 
                className="story-overlay position-absolute bottom-0 start-0 w-100 p-4"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(18,20,22,0.95) 100%)'
                }}
              >
                <span className="badge bg-warning text-dark mb-2">Sejarah & Asal-Usul</span>
                <h3 className="story-title text-white fw-bold fs-4 mb-1">
                  Yuk Kenali Asal-usul Punakawan!
                </h3>
                <small className="text-secondary d-flex align-items-center gap-1">
                  <span>Klik untuk membaca kisah lengkap</span>
                  <i className="bi bi-arrow-right"></i>
                </small>
              </div>
            </article>
          </div>

          <div className="col-12 col-md-6">
            <article 
              className="story-card rounded-4 overflow-hidden position-relative shadow-lg" 
              role="button"
              onClick={() => setActiveStoryModal('empat-watak')}
              title="Klik untuk membaca watak 4 Punakawan"
              style={{ cursor: 'pointer', height: '320px' }}
            >
              <img 
                src="/assets/footer.jpeg" 
                alt="Panggung kelir wayang kulit klasik" 
                className="w-100 h-100 object-fit-cover"
              />
              <div 
                className="story-overlay position-absolute bottom-0 start-0 w-100 p-4"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(18,20,22,0.95) 100%)'
                }}
              >
                <span className="badge bg-warning text-dark mb-2">Filosofi Watak</span>
                <h3 className="story-title text-white fw-bold fs-4 mb-1">
                  Empat Sosok, Empat Watak, Satu Tujuan
                </h3>
                <small className="text-secondary d-flex align-items-center gap-1">
                  <span>Klik untuk membaca makna simbolik</span>
                  <i className="bi bi-arrow-right"></i>
                </small>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Modal 1: Asal-Usul Punakawan */}
      {activeStoryModal === 'asal-usul' && (
        <div 
          className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 z-3"
          style={{ background: 'rgba(9, 10, 12, 0.85)', backdropFilter: 'blur(8px)' }}
        >
          <div 
            className="p-4 rounded-4 shadow-lg text-start"
            style={{
              maxWidth: '750px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#17191c',
              border: '1px solid #d29f22'
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <h4 className="gold-text fw-bold mb-0">Yuk Kenali Asal-usul Punakawan!</h4>
              <button type="button" className="btn-close btn-close-white" onClick={() => setActiveStoryModal(null)}></button>
            </div>
            <img src="/assets/dalang4.jpg" alt="" className="w-100 rounded-3 mb-3" style={{ maxHeight: '220px', objectFit: 'cover' }} />
            <p className="text-secondary small mb-3">
              Wayang sudah menjadi bagian dari budaya Nusantara sejak berabad-abad lalu. Namun, tahukah kamu bahwa <strong>tokoh Punakawan</strong> — Semar, Gareng, Petruk, dan Bawor — <strong>tidak berasal dari India</strong> seperti wiracarita Ramayana dan Mahabharata?
            </p>
            <p className="text-secondary small mb-3">
              Ketika kebudayaan wayang masuk ke Nusantara sekitar abad ke-4, masyarakat Jawa menyesuaikan cerita itu dengan nilai dan humor lokal. Tokoh Punakawan pertama kali disebut dalam karya sastra <strong>“Gatotkacasraya”</strong> karya <em>Empu Panuluh</em> dari Kerajaan Kediri (abad ke-12) sebagai Jurudyah, Punta, dan Prasanta.
            </p>
            <p className="text-secondary small mb-3">
              Pada masa Majapahit, kitab <strong>“Sudamala”</strong> memperkenalkan sosok <strong>Semar</strong> sebagai abdi sekaligus penasihat bijak Sadewa. Kemudian pujangga Jawa menambahkan tiga tokoh lain: Gareng, Petruk, dan Bawor (Punakawan Papat).
            </p>
            <div className="modal-quote p-3 rounded-3 mb-3" style={{ background: 'rgba(210, 159, 34, 0.08)', borderLeft: '4px solid #d29f22', color: '#f7d788', fontStyle: 'italic', fontSize: '0.88rem' }}>
              "Punakawan membuktikan bahwa kebijaksanaan luhur seringkali hadir bukan dari mahkota raja, melainkan dari tawa tulus rakyat jelata."
            </div>
            <div className="text-end">
              <button type="button" className="btn btn-pill px-4" onClick={() => setActiveStoryModal(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Empat Sosok Empat Watak */}
      {activeStoryModal === 'empat-watak' && (
        <div 
          className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 z-3"
          style={{ background: 'rgba(9, 10, 12, 0.85)', backdropFilter: 'blur(8px)' }}
        >
          <div 
            className="p-4 rounded-4 shadow-lg text-start"
            style={{
              maxWidth: '750px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#17191c',
              border: '1px solid #d29f22'
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <h4 className="gold-text fw-bold mb-0">Empat Sosok, Empat Watak, Satu Tujuan</h4>
              <button type="button" className="btn-close btn-close-white" onClick={() => setActiveStoryModal(null)}></button>
            </div>
            <img src="/assets/footer.jpeg" alt="" className="w-100 rounded-3 mb-3" style={{ maxHeight: '220px', objectFit: 'cover' }} />
            <ul className="text-secondary small mb-3 ps-3">
              <li className="mb-2"><strong>Semar — Sang Pengayom:</strong> Simbol kebijaksanaan, ketulusan, dan keseimbangan hidup. Falsafah utama <em>“Urip iku urup”</em>.</li>
              <li className="mb-2"><strong>Gareng — Si Penengah:</strong> Kehati-hatian, keikhlasan, dan menunduk meski sudah di atas. Hati yang jernih dan mawas diri.</li>
              <li className="mb-2"><strong>Petruk — Si Lugas:</strong> Ki Lurah Kantong Bolong, simbol kedermawanan tanpa pamrih dan pemikiran panjang yang jernih.</li>
              <li className="mb-2"><strong>Bawor — Sang Ikon Banyumasan:</strong> Simbol kejujuran lugas (*Cablaka*), polos apa adanya, dan anti-kemunafikan.</li>
            </ul>
            <div className="modal-quote p-3 rounded-3 mb-3" style={{ background: 'rgba(210, 159, 34, 0.08)', borderLeft: '4px solid #d29f22', color: '#f7d788', fontStyle: 'italic', fontSize: '0.88rem' }}>
              "Empat watak berbeda bersatu demi satu tujuan luhur: Hamemayu Hayuning Bawana — merawat kedamaian jagad raya lewat tawa dan budi pekerti."
            </div>
            <div className="text-end">
              <button type="button" className="btn btn-pill px-4" onClick={() => setActiveStoryModal(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
