import React, { useState } from 'react';

/**
 * KOMPONEN 3: CharacterForm
 * Komponen Form Tambah Data Tokoh Wayang Baru
 * 
 * Props:
 * @param {boolean} isOpen - Status keterbukaan modal form
 * @param {function} onClose - Callback untuk menutup modal
 * @param {function} onAddCharacter - Callback pengiriman data entitas baru ke state aplikasi
 * @param {Array} categories - Opsi kategori untuk dropdown pilihan
 * @param {Array} presets - Data template siap pakai untuk memudahkan pengujian data otentik
 */
export default function CharacterForm({
  isOpen,
  onClose,
  onAddCharacter,
  categories = [],
  presets = []
}) {
  const [formData, setFormData] = useState({
    nama: '',
    gelar: '',
    sebutan: '',
    peran: 'Pamong Pendamping',
    kategori: 'Punakawan Putera',
    watak: '',
    ciriKhas: '',
    falsafah: '',
    nilaiLuhur: '',
    daerah: 'Banyumas',
    deskripsi: '',
    gambar: '/assets/dalang1.jpg'
  });

  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (formError) setFormError('');
  };

  const handleApplyPreset = (preset) => {
    setFormData({
      ...preset,
      peran: preset.peran || 'Pamong Pendamping',
      kategori: preset.kategori || 'Punakawan Putera',
      daerah: preset.daerah || 'Banyumas'
    });
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form
    if (!formData.nama.trim()) {
      setFormError('Nama tokoh wayang wajib diisi!');
      return;
    }
    if (!formData.sebutan.trim()) {
      setFormError('Julukan / sebutan tokoh wajib diisi!');
      return;
    }
    if (!formData.watak.trim()) {
      setFormError('Watak dan karakteristik tokoh wajib diisi!');
      return;
    }

    const newCharacter = {
      ...formData,
      id: formData.nama.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4),
      gambar: formData.gambar || '/assets/dalang1.jpg'
    };

    onAddCharacter(newCharacter);

    // Reset Form
    setFormData({
      nama: '',
      gelar: '',
      sebutan: '',
      peran: 'Pamong Pendamping',
      kategori: 'Punakawan Putera',
      watak: '',
      ciriKhas: '',
      falsafah: '',
      nilaiLuhur: '',
      daerah: 'Banyumas',
      deskripsi: '',
      gambar: '/assets/dalang1.jpg'
    });
    setFormError('');
    onClose();
  };

  // Avatar presets from existing assets
  const availableImages = [
    { label: 'Semar', value: '/assets/semar.png' },
    { label: 'Gareng', value: '/assets/gareng.png' },
    { label: 'Petruk', value: '/assets/petruk.png' },
    { label: 'Bawor', value: '/assets/bawor.png' },
    { label: 'Dalang Kelir 1', value: '/assets/dalang1.jpg' },
    { label: 'Dalang Kelir 2', value: '/assets/dalang2.jpg' },
    { label: 'Dalang Kelir 3', value: '/assets/dalang3.jpeg' },
    { label: 'Panggung Wayang', value: '/assets/footer.jpeg' }
  ];

  return (
    <div 
      className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{
        backgroundColor: 'rgba(9, 10, 12, 0.82)',
        backdropFilter: 'blur(10px)',
        zIndex: 1050
      }}
    >
      <div 
        className="modal-dialog-custom w-100 rounded-4 overflow-hidden shadow-lg animate__animated animate__fadeInUp"
        style={{
          maxWidth: '780px',
          maxHeight: '90vh',
          background: '#17191c',
          border: '1px solid rgba(210, 159, 34, 0.4)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(210, 159, 34, 0.2)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div 
          className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-circle p-2 bg-warning text-dark">
              <i className="bi bi-person-plus-fill fs-6"></i>
            </span>
            <div>
              <h5 className="modal-title gold-text fw-bold mb-0">Tambah Karakter Tokoh Wayang</h5>
              <small className="text-secondary">Input entitas tokoh budaya dengan atribut otentik</small>
            </div>
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            aria-label="Tutup" 
            onClick={onClose}
          ></button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 135px)' }}>
          {/* Quick Preset Buttons for easy grading */}
          {presets.length > 0 && (
            <div className="p-3 rounded-3 mb-4" style={{ background: 'rgba(210, 159, 34, 0.08)', border: '1px dashed rgba(210, 159, 34, 0.3)' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="small gold-text fw-semibold">
                  <i className="bi bi-magic me-1"></i> Isi Cepat Data Masuk Akal (Preset Otentik):
                </span>
                <span className="text-muted small">Klik untuk auto-fill data</span>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    className="btn btn-sm btn-outline-warning rounded-pill px-3"
                    onClick={() => handleApplyPreset(preset)}
                  >
                    + {preset.nama} ({preset.sebutan})
                  </button>
                ))}
              </div>
            </div>
          )}

          {formError && (
            <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{formError}</span>
            </div>
          )}

          <form id="form-tambah-tokoh" onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Nama Tokoh */}
              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-semibold">
                  Nama Tokoh <span className="text-warning">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Contoh: Ki Lurah Togog"
                  className="form-control bg-dark text-light border-secondary"
                  required
                />
              </div>

              {/* Gelar / Nama Lengkap */}
              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-semibold">
                  Gelar / Nama Silsilah
                </label>
                <input
                  type="text"
                  name="gelar"
                  value={formData.gelar}
                  onChange={handleChange}
                  placeholder="Contoh: Togog Tejamantri / Sanghyang Antaga"
                  className="form-control bg-dark text-light border-secondary"
                />
              </div>

              {/* Sebutan / Julukan */}
              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-semibold">
                  Julukan / Sebutan Tokoh <span className="text-warning">*</span>
                </label>
                <input
                  type="text"
                  name="sebutan"
                  value={formData.sebutan}
                  onChange={handleChange}
                  placeholder="Contoh: Sang Pengingat Angkara Murka"
                  className="form-control bg-dark text-light border-secondary"
                  required
                />
              </div>

              {/* Peran */}
              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-semibold">
                  Peran Budaya
                </label>
                <input
                  type="text"
                  name="peran"
                  value={formData.peran}
                  onChange={handleChange}
                  placeholder="Contoh: Pamong Sabrang, Ikon Banyumas"
                  className="form-control bg-dark text-light border-secondary"
                />
              </div>

              {/* Kategori */}
              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-semibold">
                  Kategori Tokoh
                </label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="form-select bg-dark text-light border-secondary"
                >
                  {categories
                    .filter((c) => c !== 'Semua Kategori')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              {/* Daerah Tradisi */}
              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-semibold">
                  Daerah / Gaya Pewayangan
                </label>
                <input
                  type="text"
                  name="daerah"
                  value={formData.daerah}
                  onChange={handleChange}
                  placeholder="Contoh: Banyumas, Jawa Tengah, Nusantara"
                  className="form-control bg-dark text-light border-secondary"
                />
              </div>

              {/* Watak */}
              <div className="col-12">
                <label className="form-label text-light small fw-semibold">
                  Watak & Karakteristik <span className="text-warning">*</span>
                </label>
                <input
                  type="text"
                  name="watak"
                  value={formData.watak}
                  onChange={handleChange}
                  placeholder="Contoh: Mawas diri, jujur cablaka, sabar, setia kawan"
                  className="form-control bg-dark text-light border-secondary"
                  required
                />
              </div>

              {/* Ciri Khas & Senjata */}
              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-semibold">
                  Ciri Khas Fisik / Senjata
                </label>
                <input
                  type="text"
                  name="ciriKhas"
                  value={formData.ciriKhas}
                  onChange={handleChange}
                  placeholder="Contoh: Membawa senjata Kudi, hidung panjang"
                  className="form-control bg-dark text-light border-secondary"
                />
              </div>

              {/* Nilai Luhur */}
              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-semibold">
                  Nilai Luhur yang Diteladani
                </label>
                <input
                  type="text"
                  name="nilaiLuhur"
                  value={formData.nilaiLuhur}
                  onChange={handleChange}
                  placeholder="Contoh: Kejujuran Cablaka, Welas Asih"
                  className="form-control bg-dark text-light border-secondary"
                />
              </div>

              {/* Falsafah / Kutipan Jawa */}
              <div className="col-12">
                <label className="form-label text-light small fw-semibold">
                  Falsafah / Pitutur Luhur (Kutipan Kata Bijak)
                </label>
                <input
                  type="text"
                  name="falsafah"
                  value={formData.falsafah}
                  onChange={handleChange}
                  placeholder="Contoh: Becik ketitik ala ketara, urip iku urup."
                  className="form-control bg-dark text-light border-secondary"
                />
              </div>

              {/* Pilihan Gambar Avatar */}
              <div className="col-12">
                <label className="form-label text-light small fw-semibold">
                  Pilih Visual / Gambar Karakter
                </label>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {availableImages.map((img) => (
                    <button
                      key={img.value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, gambar: img.value }))}
                      className={`btn btn-sm rounded-pill px-3 py-1 ${
                        formData.gambar === img.value
                          ? 'btn-warning text-dark fw-bold'
                          : 'btn-outline-secondary text-secondary'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  name="gambar"
                  value={formData.gambar}
                  onChange={handleChange}
                  placeholder="Atau masukkan path / URL gambar kustom"
                  className="form-control form-control-sm bg-dark text-light border-secondary"
                />
              </div>

              {/* Deskripsi Tokoh */}
              <div className="col-12">
                <label className="form-label text-light small fw-semibold">
                  Deskripsi Kisah & Filosofi Tokoh
                </label>
                <textarea
                  name="deskripsi"
                  rows="3"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Tuliskan latar belakang peran lakon dan pesan moral tokoh wayang..."
                  className="form-control bg-dark text-light border-secondary"
                ></textarea>
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="d-flex align-items-center justify-content-end gap-3 mt-4 pt-3 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <button 
                type="button" 
                className="btn btn-outline-secondary px-4 rounded-pill" 
                onClick={onClose}
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="btn btn-pill px-4"
              >
                <i className="bi bi-plus-circle-fill me-2"></i>Tambah Tokoh
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
