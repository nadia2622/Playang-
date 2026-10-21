import React, { useState } from 'react';
// Komponen Inti & Navigasi
import NavbarHeader from './components/NavbarHeader';
import CulturalHero from './components/CulturalHero';
import StorySection from './components/StorySection';
import CtaBanner from './components/CtaBanner';
import CharacterSpotlight from './components/CharacterSpotlight';
import CharacterSelector from './components/CharacterSelector';
import DialogueGame from './components/DialogueGame';

// Komponen Tugas Penugasan (5 Komponen Wajib)
import SummaryStats from './components/SummaryStats';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm';
import CharacterDetailModal from './components/CharacterDetailModal';
import FooterSection from './components/FooterSection';

// Data Entitas
import { INITIAL_CHARACTERS, CATEGORIES, DEFAULT_PRESETS } from './data/punakawanData';
import './App.css';

export default function App() {
  // State 1: Koleksi data entitas karakter
  const [characters, setCharacters] = useState(INITIAL_CHARACTERS);

  // State 2: Filter pencarian & kategori
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');

  // State 3: Modal form tambah data
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // State 4: Modal detail karakter
  const [detailCharacter, setDetailCharacter] = useState(null);

  // State 5: Game Edukasi Dialog Wayang
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [gameCharacterId, setGameCharacterId] = useState('semar');

  // State 6: Notifikasi toast
  const [toastMessage, setToastMessage] = useState(null);

  // State 7: Navigasi aktif
  const [activeNav, setActiveNav] = useState('beranda');

  // Helper menampilkan pesan notifikasi sementara
  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handler: Mulai Game Edukasi Dialog untuk karakter tertentu
  const handleStartGame = (charId = 'semar') => {
    setGameCharacterId(charId);
    setIsGameOpen(true);
  };

  // Handler: Tambah entitas baru
  const handleAddCharacter = (newChar) => {
    setCharacters((prev) => [newChar, ...prev]);
    showToast(`Tokoh "${newChar.nama}" berhasil ditambahkan ke daftar!`);
  };

  // Handler: Hapus entitas
  const handleDeleteCharacter = (id) => {
    const target = characters.find((c) => c.id === id);
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    showToast(`Tokoh "${target ? target.nama : id}" telah dihapus.`, 'warning');
  };

  // Handler: Filter kategori
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
  };

  // Handler: Reset filter
  const handleResetFilter = () => {
    setSelectedCategory('Semua Kategori');
    setSearchQuery('');
  };

  // Handler: Navigasi menu
  const handleNavClick = (sectionId) => {
    setActiveNav(sectionId);

    // Otomatis tutup game jika sedang aktif agar halaman tujuan langsung tampil
    setIsGameOpen(false);

    // Smooth scroll ke section tujuan setelah state diperbarui
    setTimeout(() => {
      if (sectionId === 'karakter-game') {
        const element = document.getElementById('karakter-game');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 60);
  };

  // Handler: Melihat detail dari ID string
  const handleViewDetailById = (charId) => {
    const found = characters.find((c) => c.id.toLowerCase() === charId.toLowerCase());
    if (found) {
      setDetailCharacter(found);
    }
  };

  // Filter komputasi karakter
  const filteredCharacters = characters.filter((char) => {
    const matchesCategory =
      selectedCategory === 'Semua Kategori' || char.kategori === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      char.nama.toLowerCase().includes(query) ||
      (char.sebutan && char.sebutan.toLowerCase().includes(query)) ||
      (char.watak && char.watak.toLowerCase().includes(query)) ||
      (char.falsafah && char.falsafah.toLowerCase().includes(query)) ||
      (char.peran && char.peran.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="playang-app min-vh-100 d-flex flex-column bg-dark text-light">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div 
          className="position-fixed top-0 start-50 translate-middle-x mt-4 p-3 rounded-pill shadow-lg z-3 d-flex align-items-center gap-2 animate__animated animate__fadeInDown"
          style={{
            background: toastMessage.type === 'warning' ? '#854d0e' : '#1e3a1e',
            color: '#ffffff',
            border: `1px solid ${toastMessage.type === 'warning' ? '#eab308' : '#22c55e'}`,
            zIndex: 1100
          }}
        >
          <i className={`bi ${toastMessage.type === 'warning' ? 'bi-exclamation-circle' : 'bi-check-circle-fill'}`}></i>
          <span className="small fw-semibold">{toastMessage.msg}</span>
        </div>
      )}

      {/* ======================================================================
          KOMPONEN 1: HEADER & JUDUL APLIKASI
          ====================================================================== */}
      <NavbarHeader
        appName="PLAYANG"
        tagline="Kisah Wayang Punakawan Banyumas"
        totalCharacters={characters.length}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onOpenAddForm={() => {
          setIsGameOpen(false);
          setIsAddFormOpen(true);
        }}
        onStartGame={() => handleStartGame('semar')}
      />

      <main className="flex-grow-1">
        {/* ====================================================================
            BAGIAN HERO: BANNER UTAMA & 5-CARD CURVED GALLERY
            ==================================================================== */}
        <CulturalHero
          title="PLAYANG"
          subtitle="Yuk kenali budaya Banyumas dengan cara yang seru! Baca kisah mereka dan temukan nilai-nilai luhur di balik tawa para Punakawan."
          onExploreClick={() => handleNavClick('karakter-game')}
        />

        {/* ====================================================================
            BAGIAN 1 & 2 (ORIGINAL): KISAH ASAL-USUL & WATAK PUNAKAWAN
            ==================================================================== */}
        <StorySection />

        {/* ====================================================================
            BAGIAN 4 (ORIGINAL): CTA SECTION "Udah kenal mereka semua, kan?"
            ==================================================================== */}
        <CtaBanner onStartGame={() => handleNavClick('karakter-game')} />

        {/* ====================================================================
            BAGIAN 5 (ORIGINAL): CHARACTER SPOTLIGHT (SEMAR)
            ==================================================================== */}
        <CharacterSpotlight onSelectCharacter={(id) => handleStartGame(id)} />

        {/* ====================================================================
            BAGIAN 6 (ORIGINAL & GAMIFIKASI): CHARACTER SELECTOR "Pilih Karakter Kamu!"
            ==================================================================== */}
        <CharacterSelector
          onPlayCharacter={(charId) => handleStartGame(charId)}
          onViewDetail={(charId) => handleViewDetailById(charId)}
        />

        {/* ====================================================================
            KOMPONEN 2 (TUGAS): RINGKASAN JUMLAH DATA & STATISTIK ENTITAS
            ==================================================================== */}
        <SummaryStats
          characters={characters}
          selectedCategory={selectedCategory}
          onCategorySelect={handleSelectCategory}
          onResetFilter={handleResetFilter}
        />

        {/* ====================================================================
            KOMPONEN 4 & 5 (TUGAS): DAFTAR TOKOH & KARTU DATA ITEM
            ==================================================================== */}
        <CharacterList
          characters={filteredCharacters}
          totalOriginal={characters.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          categories={CATEGORIES}
          onViewDetail={(char) => setDetailCharacter(char)}
          onDeleteCharacter={handleDeleteCharacter}
          onOpenAddForm={() => setIsAddFormOpen(true)}
        />
      </main>

      {/* ======================================================================
          SISTEM GAMIFIKASI: GAME EDUKASI DIALOG WAYANG (BERBASIS COPYWRITING.MD)
          ====================================================================== */}
      <DialogueGame
        characterId={gameCharacterId}
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        onSelectAnother={() => {
          setIsGameOpen(false);
          handleNavClick('karakter-game');
        }}
        onNavigateSection={(sectionId) => handleNavClick(sectionId)}
      />

      {/* ======================================================================
          KOMPONEN 3 (TUGAS): FORM TAMBAH DATA KARAKTER
          ====================================================================== */}
      <CharacterForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddCharacter={handleAddCharacter}
        categories={CATEGORIES}
        presets={DEFAULT_PRESETS}
      />

      {/* ======================================================================
          MODAL DETAIL & DIALOG FILOSOFI TOKOH
          ====================================================================== */}
      <CharacterDetailModal
        character={detailCharacter}
        isOpen={Boolean(detailCharacter)}
        onClose={() => setDetailCharacter(null)}
      />

      {/* ======================================================================
          BAGIAN FOOTER: AKSARA JAWA & KREDIT TIM POCONG BULUTANGKIS
          ====================================================================== */}
      <FooterSection />
    </div>
  );
}
