import React from 'react';
import logoPlayang from '../../assets/logoPlayang.png';

/**
 * KOMPONEN 1: NavbarHeader
 * Komponen Header / Judul Aplikasi Playang
 * Menyatukan navigasi klasik (Beranda, Kisah, Bermain) dengan modul ensiklopedia & gamifikasi
 * 
 * Props:
 * @param {string} appName - Nama utama aplikasi (default: "PLAYANG")
 * @param {string} tagline - Tagline budaya aplikasi
 * @param {number} totalCharacters - Total data entitas karakter yang aktif
 * @param {string} activeNav - ID menu navigasi yang sedang aktif
 * @param {function} onNavClick - Callback untuk perpindahan navigasi
 * @param {function} onOpenAddForm - Callback untuk memunculkan modal form tambah data
 * @param {function} onStartGame - Callback cepat untuk langsung membuka Game Dialog
 */
export default function NavbarHeader({
  appName = 'PLAYANG',
  tagline = 'Kisah Wayang Punakawan Banyumas',
  totalCharacters = 0,
  activeNav = 'beranda',
  onNavClick,
  onOpenAddForm,
  onStartGame
}) {
  return (
    <header className="site-header navbar navbar-expand-lg sticky-top">
      <div className="container nav-container">
        {/* Brand Logo & Title */}
        <a 
          href="#beranda" 
          className="navbar-brand brand-logo d-flex align-items-center gap-3 text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            onNavClick && onNavClick('beranda');
          }}
        >
          <img
            src={logoPlayang}
            alt="Logo Playang"
            className="logo-icon"
            style={{
              width: '38px',
              height: '38px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 10px rgba(247, 215, 136, 0.55))'
            }}
          />
          <div className="d-flex flex-column">
            <span className="brand-text gold-text fw-bold fs-4 lh-1 tracking-wider">{appName}</span>
            <small className="text-secondary" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
              {tagline}
            </small>
          </div>
        </a>

        {/* Action Buttons & Navigation */}
        <div className="d-flex align-items-center gap-3 ms-auto">
          <nav className="d-none d-lg-flex align-items-center gap-4 main-nav">
            <button
              type="button"
              className={`nav-link btn btn-link text-decoration-none px-0 ${activeNav === 'beranda' ? 'active' : ''}`}
              onClick={() => onNavClick && onNavClick('beranda')}
            >
              Beranda
            </button>
            <button
              type="button"
              className={`nav-link btn btn-link text-decoration-none px-0 ${activeNav === 'punakawan' ? 'active' : ''}`}
              onClick={() => onNavClick && onNavClick('punakawan')}
            >
              Tentang & Kisah
            </button>
            <button
              type="button"
              className={`nav-link btn btn-link text-decoration-none px-0 ${activeNav === 'karakter-game' ? 'active' : ''}`}
              onClick={() => onNavClick && onNavClick('karakter-game')}
            >
              <i className="bi bi-controller me-1 text-warning"></i>Bermain Game
            </button>
            <button
              type="button"
              className={`nav-link btn btn-link text-decoration-none px-0 ${activeNav === 'ringkasan' ? 'active' : ''}`}
              onClick={() => onNavClick && onNavClick('ringkasan')}
            >
              Statistik
            </button>
            <button
              type="button"
              className={`nav-link btn btn-link text-decoration-none px-0 ${activeNav === 'karakter-katalog' ? 'active' : ''}`}
              onClick={() => onNavClick && onNavClick('karakter-katalog')}
            >
              Ensiklopedia
              <span className="badge rounded-pill bg-warning text-dark ms-2" style={{ fontSize: '0.72rem' }}>
                {totalCharacters}
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
