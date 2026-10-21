import React from 'react';

/**
 * KOMPONEN 7: CulturalHero
 * Komponen Hero & Galeri Budaya Wayang Banyumasan
 * 
 * Props:
 * @param {string} title - Judul utama hero ("PLAYANG")
 * @param {string} subtitle - Deskripsi pengantar budaya
 * @param {function} onExploreClick - Callback untuk scroll ke daftar karakter
 * @param {Array} galleryImages - Koleksi gambar galeri dalang & kelir
 */
export default function CulturalHero({
  title = 'PLAYANG',
  subtitle = 'Yuk kenali budaya Banyumas dengan cara yang seru! Baca kisah mereka dan temukan nilai-nilai luhur di balik tawa para Punakawan.',
  onExploreClick,
  galleryImages = [
    { src: '/assets/dalang1.jpg', alt: 'Pementasan Wayang Kulit Banyumas', cls: 'card-side-outer' },
    { src: '/assets/dalang2.jpg', alt: 'Dalang Memainkan Gunungan', cls: 'card-side-inner' },
    { src: '/assets/dalang3.jpeg', alt: 'Lakon Wayang dan Lampu Blencong', cls: 'card-center' },
    { src: '/assets/dalang4.jpg', alt: 'Pertunjukan Wayang Kulit Klasik', cls: 'card-side-inner' },
    { src: '/assets/dalang5.jpg', alt: 'Bayangan Wayang Kulit di Kelir', cls: 'card-side-outer' }
  ]
}) {
  return (
    <section id="beranda" className="hero-section position-relative overflow-hidden">
      {/* Megamendung Accessories */}
      <img src="/assets/megamendung.png" alt="" className="megamendung mega-hero-left" />
      <img src="/assets/megamendung.png" alt="" className="megamendung mega-hero-right flip-x" />

      <div className="container">
        <div className="hero-content text-center mx-auto">
          <h1 className="hero-brand gold-text">{title}</h1>
          <p className="hero-subtitle">
            {subtitle}
          </p>
          <div className="hero-cta d-flex justify-content-center gap-3">
            <button 
              type="button" 
              className="btn btn-pill"
              onClick={onExploreClick}
            >
              Jelajahi Tokoh
            </button>
            <a 
              href="#ringkasan" 
              className="btn btn-outline-warning rounded-pill px-4 d-flex align-items-center"
            >
              Lihat Statistik
            </a>
          </div>
        </div>

        {/* 5-Card Curved Gallery */}
        <div className="hero-gallery">
          {galleryImages.map((img, idx) => (
            <div key={idx} className={`gallery-card ${img.cls}`}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
