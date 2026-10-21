import React, { useState } from 'react';
import CharacterCard from './CharacterCard';

/**
 * KOMPONEN 4: CharacterList
 * Komponen Daftar / List Data Tokoh Wayang Punakawan
 * 
 * Props:
 * @param {Array} characters - Koleksi data entitas karakter wayang yang difilter
 * @param {number} totalOriginal - Total karakter mula-mula sebelum difilter
 * @param {string} searchQuery - Kata kunci pencarian nama/watak/julukan
 * @param {function} onSearchChange - Callback saat input pencarian berubah
 * @param {string} selectedCategory - Kategori terpilih saat ini
 * @param {function} onSelectCategory - Callback saat kategori diubah
 * @param {Array} categories - Seluruh daftar kategori yang tersedia
 * @param {function} onViewDetail - Callback saat kartu diklik untuk melihat detail
 * @param {function} onDeleteCharacter - Callback penghapusan karakter
 * @param {function} onOpenAddForm - Callback untuk membuka modal tambah karakter baru
 */
export default function CharacterList({
  characters = [],
  totalOriginal = 0,
  searchQuery = '',
  onSearchChange,
  selectedCategory = 'Semua Kategori',
  onSelectCategory,
  categories = [],
  onViewDetail,
  onDeleteCharacter,
  onOpenAddForm
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' atau 'table'

  return (
    <section id="karakter-katalog" className="character-list-section py-5 position-relative">
      {/* Megamendung Ornaments */}
      <img 
        src="/assets/megamendung.png" 
        alt="" 
        className="megamendung position-absolute start-0 top-0 opacity-10 pointer-events-none" 
        style={{ maxWidth: '280px' }} 
      />
      <img 
        src="/assets/megamendung.png" 
        alt="" 
        className="megamendung position-absolute end-0 top-0 opacity-10 pointer-events-none flip-x" 
        style={{ maxWidth: '280px', transform: 'scaleX(-1)' }} 
      />

      <div className="container position-relative z-2">
        {/* Section Heading */}
        <div className="text-center mb-4">
          <h2 className="gold-text fw-bold fs-1 mb-2">Daftar Tokoh Punakawan</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '680px' }}>
            Jelajahi setiap sosok tokoh wayang punakawan nusantara dan Banyumasan. Setiap tokoh mewakili watak,
            kebajikan budi pekerti, serta falsafah hidup bermasyarakat.
          </p>
        </div>

        {/* Toolbar: Search, Category Filter, View Mode Toggle */}
        <div 
          className="filter-toolbar p-3 rounded-4 mb-4 d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-3"
          style={{
            background: 'linear-gradient(135deg, #181b1e 0%, #141618 100%)',
            border: '1px solid rgba(210, 159, 34, 0.25)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
          }}
        >
          {/* Search Input Bar */}
          <div className="position-relative flex-grow-1" style={{ maxWidth: '420px' }}>
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-warning"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama, watak, atau falsafah..."
              className="form-control rounded-pill bg-dark text-light border-secondary ps-5 pe-4 py-2"
              style={{ fontSize: '0.9rem' }}
            />
            {searchQuery && (
              <button
                type="button"
                className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-secondary"
                onClick={() => onSearchChange('')}
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>

          {/* Quick Info & Action Controls */}
          <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-3 flex-wrap">
            <div className="text-secondary small">
              Menampilkan <span className="text-warning fw-bold">{characters.length}</span> dari <span className="text-light fw-bold">{totalOriginal}</span> tokoh
            </div>

            {/* View Mode Toggle (Grid vs Table) */}
            <div className="btn-group rounded-pill border border-secondary p-1" role="group">
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3 py-1 ${viewMode === 'grid' ? 'btn-warning text-dark fw-bold' : 'btn-dark text-secondary'}`}
                onClick={() => setViewMode('grid')}
                title="Tampilan Grid Kartu"
              >
                <i className="bi bi-grid-fill me-1"></i>Kartu
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3 py-1 ${viewMode === 'table' ? 'btn-warning text-dark fw-bold' : 'btn-dark text-secondary'}`}
                onClick={() => setViewMode('table')}
                title="Tampilan Tabel Data"
              >
                <i className="bi bi-table me-1"></i>Tabel
              </button>
            </div>

            {/* Quick Add Button */}
            <button
              type="button"
              className="btn btn-sm btn-pill px-3 py-2 d-flex align-items-center gap-2"
              onClick={onOpenAddForm}
            >
              <i className="bi bi-plus-lg"></i>
              <span>Tambah</span>
            </button>
          </div>
        </div>

        {/* Content Section: Grid View vs Table View */}
        {characters.length === 0 ? (
          /* Empty State */
          <div 
            className="empty-state text-center p-5 rounded-4 my-4"
            style={{
              background: 'rgba(25, 28, 32, 0.6)',
              border: '1px dashed rgba(210, 159, 34, 0.3)'
            }}
          >
            <div className="text-warning display-4 mb-3">
              <i className="bi bi-inbox"></i>
            </div>
            <h4 className="text-light fw-bold">
              {totalOriginal === 0 
                ? 'Belum ada data tokoh wayang' 
                : 'Belum ada data tokoh wayang yang sesuai kriteria'}
            </h4>
            <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '480px' }}>
              {totalOriginal === 0
                ? 'Daftar tokoh wayang masih kosong. Silakan gunakan tombol Tambah di bawah untuk menambahkan tokoh baru.'
                : `Tidak ditemukan data tokoh untuk kata kunci "${searchQuery}" atau filter "${selectedCategory}". Silakan reset filter atau tambahkan tokoh baru.`}
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-outline-warning rounded-pill px-4"
                onClick={() => {
                  onSearchChange('');
                  onSelectCategory('Semua Kategori');
                }}
              >
                Reset Filter & Pencarian
              </button>
              <button
                type="button"
                className="btn btn-pill px-4"
                onClick={onOpenAddForm}
              >
                + Tambah Karakter Baru
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View of Cards */
          <div className="row g-4 character-cards-row">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onViewDetail={onViewDetail}
                onDelete={onDeleteCharacter}
              />
            ))}
          </div>
        ) : (
          /* Table View for Data Density & Grading */
          <div 
            className="table-responsive rounded-4 overflow-hidden shadow-lg"
            style={{
              background: '#16191c',
              border: '1px solid rgba(210, 159, 34, 0.25)'
            }}
          >
            <table className="table table-dark table-hover mb-0 align-middle">
              <thead style={{ background: '#1c1f23', borderBottom: '2px solid rgba(210, 159, 34, 0.4)' }}>
                <tr>
                  <th scope="col" className="ps-4 gold-text py-3">Tokoh</th>
                  <th scope="col" className="gold-text py-3">Peran / Kategori</th>
                  <th scope="col" className="gold-text py-3">Watak & Ciri Khas</th>
                  <th scope="col" className="gold-text py-3">Falsafah Luhur</th>
                  <th scope="col" className="gold-text py-3">Daerah</th>
                  <th scope="col" className="text-end pe-4 gold-text py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {characters.map((item) => (
                  <tr key={item.id} style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={item.gambar || '/assets/semar.png'}
                          alt={item.nama}
                          className="rounded-circle bg-dark border border-warning"
                          style={{ width: '42px', height: '42px', objectFit: 'contain' }}
                          onError={(e) => {
                            e.currentTarget.src = '/assets/semar.png';
                          }}
                        />
                        <div>
                          <div className="fw-bold text-white fs-6">{item.nama}</div>
                          <small className="text-warning fst-italic">{item.sebutan}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className="badge bg-warning text-dark me-2">{item.peran}</span>
                        <div className="small text-secondary mt-1">{item.kategori}</div>
                      </div>
                    </td>
                    <td style={{ maxWidth: '280px' }}>
                      <div className="text-light small text-truncate" title={item.watak}>{item.watak}</div>
                      {item.ciriKhas && (
                        <div className="text-muted small text-truncate" style={{ fontSize: '0.75rem' }} title={item.ciriKhas}>
                          <i className="bi bi-tag me-1"></i>{item.ciriKhas}
                        </div>
                      )}
                    </td>
                    <td style={{ maxWidth: '260px' }}>
                      <span className="small fst-italic text-warning line-clamp-2" title={item.falsafah}>
                        "{item.falsafah || '-'}"
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-secondary bg-opacity-25 text-light">{item.daerah || 'Nusantara'}</span>
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-warning rounded-pill px-3"
                          onClick={() => onViewDetail && onViewDetail(item)}
                        >
                          Detail
                        </button>
                        {onDeleteCharacter && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded-circle"
                            style={{ width: '32px', height: '32px' }}
                            title="Hapus"
                            onClick={() => {
                              if (window.confirm(`Hapus tokoh "${item.nama}"?`)) {
                                onDeleteCharacter(item.id);
                              }
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
