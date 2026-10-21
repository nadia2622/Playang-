import React from 'react';

/**
 * KOMPONEN 2: SummaryStats
 * Komponen Ringkasan Jumlah Data / Statistik Entitas Tokoh Wayang
 * 
 * Props:
 * @param {Array} characters - Seluruh daftar entitas tokoh wayang
 * @param {string} selectedCategory - Kategori yang sedang dipilih untuk filter
 * @param {function} onCategorySelect - Callback ketika filter kategori diklik
 * @param {function} onResetFilter - Callback untuk mereset seluruh filter data
 */
export default function SummaryStats({
  characters = [],
  selectedCategory = 'Semua Kategori',
  onCategorySelect,
  onResetFilter
}) {
  const totalTokoh = characters.length;
  
  // Hitung jumlah karakter berdasarkan kategori spesifik
  const banyumasCount = characters.filter(c => 
    c.kategori === 'Punakawan Banyumas' || (c.daerah && c.daerah.toLowerCase().includes('banyumas'))
  ).length;

  const pamongCount = characters.filter(c => 
    c.kategori === 'Pamong Sepuh' || c.kategori === 'Pamong Seberang' || c.peran.toLowerCase().includes('pamong')
  ).length;

  const falsafahCount = characters.filter(c => Boolean(c.falsafah)).length;

  // Rekapitulasi unik kategori
  const categoriesList = ['Semua Kategori', ...new Set(characters.map(c => c.kategori).filter(Boolean))];

  return (
    <section id="ringkasan" className="summary-section py-5 position-relative">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="gold-text fw-bold fs-2 mb-2">Statistik Budaya Wayang Punakawan</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '640px' }}>
            Ringkasan data entitas tokoh wayang yang terdata dalam sistem Playang. Data terhubung langsung 
            dengan atribut watak, peran, dan nilai filosofis tradisi Banyumasan.
          </p>
        </div>

        {/* 4 Kartu Ringkasan Data (Summary Stat Cards) */}
        <div className="row g-3 g-lg-4 mb-4">
          {[
            {
              title: 'Total Tokoh',
              value: totalTokoh,
              desc: 'Entitas karakter wayang terdata',
              icon: 'bi-people-fill'
            },
            {
              title: 'Khas Banyumas',
              value: banyumasCount,
              desc: 'Berwatak Cablaka Banyumasan',
              icon: 'bi-geo-alt-fill'
            },
            {
              title: 'Pamong & Penuntun',
              value: pamongCount,
              desc: 'Pamong ksatria & nurani rakyat',
              icon: 'bi-shield-check'
            },
            {
              title: 'Falsafah Hidup',
              value: falsafahCount,
              desc: 'Kutipan pitutur luhur Jawa',
              icon: 'bi-quote'
            }
          ].map((stat, idx) => (
            <div key={idx} className="col-6 col-lg-3">
              <div className="stat-card-premium p-3 p-md-4 h-100 d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="stat-title">{stat.title}</span>
                  <div className="stat-icon-badge">
                    <i className={`bi ${stat.icon} fs-5`}></i>
                  </div>
                </div>
                <div>
                  <span className="stat-number-display">{stat.value}</span>
                  <p className="stat-desc">{stat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Kategori Interaktif Berdasarkan Data */}
        <div 
          className="p-3 p-md-4 rounded-4 d-flex flex-wrap align-items-center justify-content-between gap-3" 
          style={{ 
            background: 'linear-gradient(145deg, rgba(24, 27, 31, 0.9) 0%, rgba(16, 18, 21, 0.95) 100%)', 
            border: '1px solid rgba(210, 159, 34, 0.2)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-funnel-fill text-warning fs-6"></i>
            <span className="text-light fw-semibold" style={{ fontSize: '0.9rem' }}>Filter Kategori:</span>
          </div>

          <div className="d-flex flex-wrap gap-2">
            {categoriesList.map((cat) => {
              const count = cat === 'Semua Kategori' 
                ? totalTokoh 
                : characters.filter(c => c.kategori === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onCategorySelect && onCategorySelect(cat)}
                  className={`btn btn-sm rounded-pill px-3 py-1 transition-all ${
                    isActive 
                      ? 'btn-warning text-dark fw-bold shadow-sm' 
                      : 'btn-outline-secondary text-light'
                  }`}
                  style={{ 
                    fontSize: '0.84rem',
                    borderColor: isActive ? '#d29f22' : 'rgba(210, 159, 34, 0.3)',
                    background: isActive ? '#f7d788' : 'rgba(255, 255, 255, 0.03)'
                  }}
                >
                  {cat} <span className={isActive ? 'text-dark fw-bold ms-1' : 'text-warning ms-1'}>({count})</span>
                </button>
              );
            })}

            {selectedCategory !== 'Semua Kategori' && (
              <button
                type="button"
                onClick={onResetFilter}
                className="btn btn-sm btn-link text-warning text-decoration-none px-2"
                style={{ fontSize: '0.84rem' }}
              >
                <i className="bi bi-x-circle me-1"></i>Reset Filter
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
