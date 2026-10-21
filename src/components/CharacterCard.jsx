import React from 'react';

/**
 * KOMPONEN 5: CharacterCard
 * Komponen Kartu untuk Tiap Item Tokoh Wayang Punakawan
 * 
 * Props:
 * @param {Object} character - Objek entitas tokoh wayang
 * @param {function} onViewDetail - Callback untuk menampilkan dialog detail & falsafah
 * @param {function} onDelete - Callback untuk menghapus karakter dari daftar
 */
export default function CharacterCard({
  character,
  onViewDetail,
  onDelete
}) {
  if (!character) return null;

  const {
    id,
    nama,
    gelar,
    sebutan,
    peran,
    kategori,
    watak,
    ciriKhas,
    falsafah,
    nilaiLuhur,
    daerah,
    gambar
  } = character;

  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div 
        className="card character-custom-card h-100 position-relative overflow-hidden rounded-4 transition-all"
        style={{
          background: 'linear-gradient(180deg, #1d2024 0%, #16181b 60%, #121416 100%)',
          border: '1px solid rgba(210, 159, 34, 0.28)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Glow & Accent Background */}
        <div 
          className="card-glow-bg position-absolute bottom-0 start-0 w-100 pointer-events-none"
          style={{
            height: '140px',
            background: 'radial-gradient(ellipse at bottom, rgba(210, 159, 34, 0.18) 0%, rgba(0,0,0,0) 70%)',
            zIndex: 1
          }}
        />

        {/* Top Badges */}
        <div className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center z-3">
          <span className="badge rounded-pill bg-warning text-dark fw-bold px-3 py-1 shadow-sm" style={{ fontSize: '0.72rem' }}>
            {peran || 'Punakawan'}
          </span>
          <span className="badge rounded-pill border border-warning text-warning px-2 py-1 bg-dark bg-opacity-75" style={{ fontSize: '0.68rem' }}>
            {kategori || 'Budaya'}
          </span>
        </div>

        {/* Image Display */}
        <div 
          className="character-img-container d-flex align-items-center justify-content-center pt-5 pb-3 px-3 position-relative z-2"
          style={{ minHeight: '220px', cursor: 'pointer' }}
          onClick={() => onViewDetail && onViewDetail(character)}
        >
          <img 
            src={gambar || '/assets/semar.png'} 
            alt={nama}
            className="character-portrait img-fluid transition-all"
            style={{
              maxHeight: '190px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.75))'
            }}
            onError={(e) => {
              e.currentTarget.src = '/assets/semar.png';
            }}
          />
        </div>

        {/* Card Body */}
        <div className="card-body p-3 pt-0 d-flex flex-column justify-content-between position-relative z-2">
          <div>
            <div className="text-center mb-2">
              <h3 className="card-title text-white fw-bold fs-4 mb-0 text-uppercase tracking-wider">
                {nama}
              </h3>
              {gelar && (
                <div className="text-warning small fst-italic" style={{ fontSize: '0.78rem' }}>
                  {gelar}
                </div>
              )}
              <div className="text-secondary small fw-medium mt-1">
                {sebutan}
              </div>
            </div>

            {/* Daerah & Nilai Luhur */}
            <div className="d-flex align-items-center justify-content-center gap-2 mb-2 flex-wrap">
              {daerah && (
                <span className="badge bg-secondary bg-opacity-25 text-light px-2 py-1" style={{ fontSize: '0.68rem' }}>
                  <i className="bi bi-geo-alt me-1 text-warning"></i>{daerah}
                </span>
              )}
              {nilaiLuhur && (
                <span className="badge bg-secondary bg-opacity-25 text-warning px-2 py-1" style={{ fontSize: '0.68rem' }}>
                  <i className="bi bi-gem me-1"></i>{nilaiLuhur}
                </span>
              )}
            </div>

            {/* Watak Summary */}
            <p className="card-text text-light opacity-75 small mb-3 text-center line-clamp-2" style={{ fontSize: '0.82rem', minHeight: '38px' }}>
              {watak}
            </p>

            {/* Falsafah Quote */}
            {falsafah && (
              <div 
                className="falsafah-quote-box p-2 rounded-3 mb-3"
                style={{
                  background: 'rgba(210, 159, 34, 0.08)',
                  borderLeft: '3px solid #d29f22',
                  fontSize: '0.75rem',
                  fontStyle: 'italic',
                  color: '#f7d788'
                }}
              >
                "{falsafah}"
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="d-flex align-items-center gap-2 pt-2 border-top border-secondary border-opacity-25">
            <button
              type="button"
              className="btn btn-sm btn-outline-warning w-100 rounded-pill d-flex align-items-center justify-content-center gap-1"
              onClick={() => onViewDetail && onViewDetail(character)}
            >
              <i className="bi bi-info-circle"></i>
              <span>Detail & Dialog</span>
            </button>

            {onDelete && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: '34px', height: '34px', flexShrink: 0 }}
                title={`Hapus data tokoh ${nama}`}
                onClick={() => {
                  if (window.confirm(`Yakin ingin menghapus tokoh wayang "${nama}"?`)) {
                    onDelete(id);
                  }
                }}
              >
                <i className="bi bi-trash3"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
