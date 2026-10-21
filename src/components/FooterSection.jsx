import React from 'react';

/**
 * KOMPONEN: FooterSection
 * Komponen Footer Budaya Playang dengan Aksara Jawa, Quote Semar, & Social Media
 * Sesuai copywriting di COPYWRITING.md & footer klasik
 */
export default function FooterSection() {
  return (
    <footer className="site-footer position-relative py-5 overflow-hidden">
      {/* Stage Kelir Background */}
      <div className="footer-stage-bg position-absolute inset-0 z-0">
        <img src="/assets/footer.jpeg" alt="Panggung Wayang Kelir" />
      </div>

      {/* Megamendung Accessories */}
      <img src="/assets/megamendung.png" alt="" className="megamendung mega-footer-left" />
      <img src="/assets/megamendung.png" alt="" className="megamendung mega-footer-right flip-x" />

      <div className="container footer-content text-center mx-auto position-relative z-2">
        <h2 className="footer-brand gold-text display-4 fw-extrabold mb-2">PLAYANG</h2>

        {/* Aksara Jawa: Urip Iku Urup */}
        <div className="aksara-jawa fs-3 mb-2" style={{ letterSpacing: '0.08em' }}>
          ꦈꦫꦶꦥ꧀ꦆꦏꦸꦈꦫꦸꦥ꧀
        </div>
        <p className="text-warning fst-italic fs-6 mb-4">
          "Urip iku urup" &mdash; Ki Lurah Semar
        </p>

        {/* Social Media Glass Icons */}
        <div className="footer-socials d-flex align-items-center justify-content-center gap-3 mb-4">
          <a href="#instagram" className="social-btn" aria-label="Instagram" title="Instagram @playang.id">
            <i className="bi bi-instagram fs-5"></i>
          </a>
          <a href="#twitter" className="social-btn" aria-label="X Twitter" title="X / Twitter @playang">
            <i className="bi bi-twitter-x fs-5"></i>
          </a>
          <a href="#linkedin" className="social-btn" aria-label="LinkedIn" title="LinkedIn Playang Culture">
            <i className="bi bi-linkedin fs-5"></i>
          </a>
          <a href="#tiktok" className="social-btn" aria-label="TikTok" title="TikTok @playang.official">
            <i className="bi bi-tiktok fs-5"></i>
          </a>
          <a href="#telegram" className="social-btn" aria-label="Telegram" title="Telegram Komunitas Wayang">
            <i className="bi bi-telegram fs-5"></i>
          </a>
        </div>

        {/* Copyright Notice & Credits */}
        <p className="text-secondary small mb-1">
          Didesain & dikembangkan oleh <strong>Tim Pocong Bulutangkis</strong> mengucapkan <em>“Selamat, Berjuang, Sukses”</em> 👏
        </p>
        <p className="footer-copy text-muted small mb-0">
          &copy; {new Date().getFullYear()} Playang &mdash; Game Edukasi Budaya Wayang Punakawan Banyumas
        </p>
      </div>
    </footer>
  );
}
