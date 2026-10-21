import React from 'react';

/**
 * KOMPONEN 6: CharacterDetailModal
 * Komponen Modal Dialog Interaktif & Filosofi Karakter Punakawan
 * 
 * Props:
 * @param {Object} character - Data entitas karakter yang dipilih
 * @param {boolean} isOpen - Status apakah dialog terbuka
 * @param {function} onClose - Callback untuk menutup dialog
 */
export default function CharacterDetailModal({
  character,
  isOpen,
  onClose
}) {
  if (!isOpen || !character) return null;

  const {
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
    gambar,
    deskripsi
  } = character;

  return (
    <div 
      className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{
        backgroundColor: 'rgba(9, 10, 12, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 1060
      }}
    >
      <div 
        className="modal-dialog-custom w-100 rounded-4 overflow-hidden shadow-lg"
        style={{
          maxWidth: '750px',
          maxHeight: '90vh',
          background: '#17191c',
          border: '1px solid rgba(210, 159, 34, 0.45)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(210, 159, 34, 0.25)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div 
          className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="d-flex align-items-center gap-2">
            <div>
              <h4 className="modal-title gold-text fw-bold mb-0 text-uppercase tracking-wider">
                {nama}
              </h4>
              <small className="text-secondary fst-italic">
                {gelar || sebutan}
              </small>
            </div>
            <span className="badge bg-warning text-dark ms-2">{peran}</span>
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            aria-label="Tutup" 
            onClick={onClose}
          ></button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>
          <div className="row g-4 align-items-center">
            {/* Visual Portrait */}
            <div className="col-12 col-md-5 text-center position-relative">
              <div 
                className="rounded-4 p-3 d-flex align-items-center justify-content-center"
                style={{
                  background: 'radial-gradient(circle at center, rgba(210, 159, 34, 0.18) 0%, rgba(18, 20, 22, 0.8) 75%)',
                  border: '1px solid rgba(210, 159, 34, 0.25)'
                }}
              >
                <img 
                  src={gambar || '/assets/semar.png'} 
                  alt={nama} 
                  className="img-fluid"
                  style={{ maxHeight: '250px', objectFit: 'contain', filter: 'drop-shadow(0 10px 25px rgba(210, 159, 34, 0.35))' }}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/semar.png';
                  }}
                />
              </div>

              <div className="mt-2 d-flex justify-content-center gap-2">
                <span className="badge bg-secondary bg-opacity-25 text-light">{kategori}</span>
                <span className="badge bg-secondary bg-opacity-25 text-warning">{daerah}</span>
              </div>
            </div>

            {/* Information & Wisdom */}
            <div className="col-12 col-md-7">
              <h5 className="text-white fw-bold mb-1">{sebutan}</h5>
              <p className="text-secondary small mb-3">
                {deskripsi || `${nama} adalah salah satu figur penting dalam pewayangan Jawa dan budaya Banyumasan yang senantiasa menanamkan nilai-nilai keluhuran budi pekerti.`}
              </p>

              {/* Falsafah Quote Box */}
              {falsafah && (
                <div 
                  className="modal-quote p-3 rounded-3 mb-3"
                  style={{
                    background: 'rgba(210, 159, 34, 0.08)',
                    borderLeft: '4px solid #d29f22',
                    fontStyle: 'italic',
                    color: '#f7d788',
                    fontSize: '0.88rem',
                    lineHeight: '1.6'
                  }}
                >
                  "{falsafah}"
                </div>
              )}

              {/* Attributes List */}
              <div className="bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary border-opacity-25">
                <div className="mb-2">
                  <span className="text-warning fw-semibold small d-block">Watak & Karakteristik:</span>
                  <span className="text-light small">{watak}</span>
                </div>
                {ciriKhas && (
                  <div className="mb-2">
                    <span className="text-warning fw-semibold small d-block">Ciri Fisik & Pusaka:</span>
                    <span className="text-light small">{ciriKhas}</span>
                  </div>
                )}
                {nilaiLuhur && (
                  <div>
                    <span className="text-warning fw-semibold small d-block">Nilai Luhur:</span>
                    <span className="text-light small">{nilaiLuhur}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="d-flex align-items-center justify-content-end px-4 py-3 border-top"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <button 
            type="button" 
            className="btn btn-pill px-4"
            onClick={onClose}
          >
            Tutup Dialog
          </button>
        </div>
      </div>
    </div>
  );
}
