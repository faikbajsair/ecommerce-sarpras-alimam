/**
 * E-COMMERCE AL-IMAM - APPLICATION CONTROLLER & STATE ENGINE
 * MVC Architecture for Internal Procurement & RAPBS SARPRAS Management
 * Enhanced with White-Label CMS & Dynamic Appearance Studio
 */

// ==========================================
// 1. DEFAULT CMS & BRANDING CONFIGURATION
// ==========================================
const DEFAULT_CMS_SETTINGS = {
  foundation_name: 'YAYASAN PENDIDIKAN ISLAM AL-IMAM',
  school_name: 'Sekolah Islam Al-Imam',
  app_name: 'AL-IMAM',
  system_badge: 'SARPRAS',
  tagline: 'Sistem Pengadaan & E-Commerce Internal Sekolah',
  address: 'Jl. Al-Imam Islamic Centre No. 01, Kebayoran Baru, Jakarta Selatan 12110',
  phone: '(021) 8899-7766',
  email: 'sarpras@al-imam.sch.id',
  city: 'Jakarta',
  
  signers: {
    kaur_name: 'Ustadz Faik Bajsair, S.T',
    kaur_title: 'Kaur SARPRAS Yayasan',
    bendahara_name: 'H. Ahmad Fauzi, SE',
    bendahara_title: 'Bendahara Yayasan Al-Imam',
    leader_name: 'Dr. H. Muhammad Ridwan, M.Pd',
    leader_title: 'Ketua Dewan Pembina Yayasan'
  },

  branding: {
    logo_mode: 'icon', // 'icon' or 'image'
    logo_icon: 'fa-mosque',
    logo_image: '',
    logo_short: 'AI',
    theme_preset: 'emerald',
    primary_color: '#00a86b',
    accent_color: '#d97706',
    font_family: 'Plus Jakarta Sans',
    border_radius: '1.5rem'
  }
};

// Preset Color Palettes
const THEME_PRESETS = {
  emerald: {
    name: 'Emerald Islamic (Mint & Green)',
    primary: '#00a86b',
    accent: '#d97706'
  },
  royal_blue: {
    name: 'Royal Sapphire',
    primary: '#1d4ed8',
    accent: '#f59e0b'
  },
  maroon: {
    name: 'Maroon & Gold',
    primary: '#881337',
    accent: '#d97706'
  },
  teal: {
    name: 'Teal Cyber',
    primary: '#0f766e',
    accent: '#06b6d4'
  },
  dark_gold: {
    name: 'Dark Luxury',
    primary: '#1e293b',
    accent: '#eab308'
  }
};

const AVAILABLE_ICONS = [
  { icon: 'fa-mosque', label: 'Masjid' },
  { icon: 'fa-school', label: 'Sekolah' },
  { icon: 'fa-graduation-cap', label: 'Topi Toga' },
  { icon: 'fa-book-quran', label: 'Al-Qur\'an / Buku' },
  { icon: 'fa-building-columns', label: 'Universitas' },
  { icon: 'fa-bag-shopping', label: 'Toko / Belanja' },
  { icon: 'fa-boxes-stacked', label: 'Gudang' },
  { icon: 'fa-shield-halved', label: 'Perisai' },
  { icon: 'fa-rocket', label: 'Modern / Roket' }
];

// Preset Curated High-Definition Photos for Indonesian School SARPRAS & Office Supplies
const CURATED_PRODUCT_PHOTOS = [
  {
    keywords: ['spidol', 'snowman', 'whiteboard', 'marker', 'boardmarker', 'tulis'],
    title: 'Spidol Whiteboard Snowman Hitam',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['kertas', 'hvs', 'paperone', 'a4', 'rim', 'fotocopy'],
    title: 'Kertas HVS PaperOne A4 80gr',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['kertas', 'hvs', 'sidu', 'f4', 'folio'],
    title: 'Kertas HVS Sinar Dunia F4 75gr',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['tinta', 'epson', '003', 'printer', 'black', 'hitam', 'l3110'],
    title: 'Tinta Epson 003 Black Original',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['tinta', 'epson', 'color', 'cmyk', 'warna', 'set'],
    title: 'Tinta Epson 003 Color Set',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['wipol', 'karbol', 'lantai', 'pembersih', 'pine', 'cemara'],
    title: 'Wipol Karbol Pembersih Lantai 5L',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['sabun', 'lifebuoy', 'handwash', 'cuci', 'tangan', 'liquid'],
    title: 'Sabun Cuci Tangan Lifebuoy 4L',
    image: 'https://images.unsplash.com/photo-1608248597359-bb4f5e08df05?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['sapu', 'ijuk', 'dragon', 'pengki', 'kebersihan', 'pel'],
    title: 'Sapu Lantai Ijuk & Pengki Set',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['hdmi', 'kabel', 'vention', 'display', 'monitor', 'tv'],
    title: 'Kabel HDMI 10 Meter Braided',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['penghapus', 'whiteboard', 'joyko', 'magnetik', 'papan'],
    title: 'Penghapus Papan Tulis Joyko',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['stopmap', 'map', 'folio', 'sidu', 'dokumen', 'amplop'],
    title: 'Stopmap Folio Kertas Sinar Dunia',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['baterai', 'battery', 'alkaline', 'aa', 'aaa', 'wireless', 'mic'],
    title: 'Baterai Alkaline AA Pack',
    image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['proyektor', 'projector', 'epson', 'infocus', 'lcd', 'hd'],
    title: 'Proyektor LCD Epson Infocus',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['microphone', 'mic', 'wireless', 'clip on', 'boya', 'podcast', 'imam'],
    title: 'Microphone Wireless Clip-On Boya',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['mouse', 'logitech', 'keyboard', 'komputer', 'wireless'],
    title: 'Mouse & Keyboard Wireless Logitech',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['buku', 'modul', 'pelajaran', 'tahfidz', 'alquran', 'iqro', 'tulis'],
    title: 'Buku Pelajaran & Modul Sekolah',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['meja', 'kursi', 'siswa', 'kelas', 'kayu', 'bangku'],
    title: 'Meja & Kursi Belajar Siswa',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['dispenser', 'galon', 'air', 'minum', 'miyako', 'panas'],
    title: 'Dispenser Air Galon Kantor',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['alat', 'kebersihan', 'ob', 'cleaning', 'pel', 'sapu', 'caddy', 'ember'],
    title: 'Alat Kebersihan OB Set',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['tinta', 'white', 'board', 'whiteboard', 'botol', 'refill', 'snowman'],
    title: 'Tinta Whiteboard Refill Botol',
    image: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['kertas', 'hvs', 'f4', 'admin', 'guru', 'folio'],
    title: 'Kertas HVS F4 Admin Guru',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['kertas', 'hvs', 'f4', 'admin', 'kantor', 'folio'],
    title: 'Kertas HVS F4 Admin Kantor',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['pewangi', 'kelas', 'ruangan', 'stella', 'glade', 'spray', 'pengharum'],
    title: 'Pewangi & Pengharum Kelas',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['gayung', 'ember', 'toilet', 'kamar mandi', 'sanitasi'],
    title: 'Gayung & Ember Set',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['penghapus', 'papan', 'tulis', 'whiteboard', 'joyko', 'magnetik'],
    title: 'Penghapus Papan Tulis',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['tinta', 'printer', 'hitam', 'warna', 'set', '4 btl', 'epson', 'canon', 'hp'],
    title: 'Tinta Printer 1 Set 4 Botol (6 Bulan)',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['fotocopy', 'copy', 'cetak', 'print', 'penggandaan', 'modul', 'ujian'],
    title: 'Layanan Fotocopy & Modul Ujian',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['kertas', 'spr', 'lembar', 'formulir', 'ujian'],
    title: 'Kertas SPR Ujian / Form',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['kertas', 'dinas', 'surat', 'kop', 'rim'],
    title: 'Kertas Dinas Cetak Kop (Rim)',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['pena', 'pensil', 'penghapus', 'alat tulis', 'atk', 'set'],
    title: 'Set Alat Tulis (Pena, Pensil, Penghapus)',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['sabun', 'kamar mandi', 'batang', 'toilet', 'pembersih'],
    title: 'Sabun Kamar Mandi & Toilet',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['pewangi', 'kamar mandi', 'toilet', 'kamper', 'gantung'],
    title: 'Pewangi & Kamper Kamar Mandi',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['obat', 'pel', 'lantai', 'cairan', 'wipol', 'sos'],
    title: 'Obat Pel Pembersih Lantai',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['lampu', 'kelas', 'led', 'philips', 'bohlam'],
    title: 'Lampu LED Kelas Hemat Energi',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['kebutuhan', 'kebersihan', 'paket', 'janitor', 'cleaning'],
    title: 'Paket Kebutuhan Kebersihan Janitor',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['maintenance', 'ac', 'servis', 'cuci ac', 'freon', 'teknisi'],
    title: 'Jasa Maintenance & Servis AC',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['alat', 'peraga', 'olah raga', 'olahraga', 'bola', 'matras', 'futsal', 'basket'],
    title: 'Alat Peraga Olah Raga & Edukasi',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80'
  }
];

// ==========================================
// 2. INITIAL DATABASE SEED
// ==========================================
const INITIAL_DB = {
  cms_settings: JSON.parse(JSON.stringify(DEFAULT_CMS_SETTINGS)),

  users: [
    { unit_id: 'unit_tk', username: 'tk_alimam', unit_name: 'TK Islam Al-Imam', role: 'Unit' },
    { unit_id: 'unit_sd', username: 'sd_alimam', unit_name: 'SD Islam Al-Imam', role: 'Unit' },
    { unit_id: 'unit_smp', username: 'smp_alimam', unit_name: 'SMP Islam Al-Imam', role: 'Unit' },
    { unit_id: 'bendahara', username: 'bendahara_yayasan', unit_name: 'Bendahara Yayasan', role: 'Bendahara' },
    { unit_id: 'admin', username: 'admin_sarpras', unit_name: 'Admin Logistik & SARPRAS', role: 'Admin' }
  ],
  
  rapbs_poin: [
    { unit_id: 'unit_tk', total_plafond: 15000000, terpakai: 510000, saldo_tersedia: 14490000, updated_at: '2026-07-10 10:45' },
    { unit_id: 'unit_sd', total_plafond: 35884000, terpakai: 965329, saldo_tersedia: 34918671, updated_at: '2026-09-28 10:00' },
    { unit_id: 'unit_smp', total_plafond: 24506000, terpakai: 1730387, saldo_tersedia: 22775613, updated_at: '2026-09-04 13:30' }
  ],

  // Rincian Pos Sumber Dana RAPBS SARPRAS (TK, SD & SMP)
  rapbs_breakdowns: {
    unit_tk: {
      code: 'D.1',
      title: 'OPERASIONAL & SARPRAS PG-TK',
      unit_name: 'TK Islam Al-Imam',
      total_plafond: 15000000,
      academic_year: '2026/2027',
      description: 'Rincian alokasi belanja operasional sentra, mainan edukatif APE, dan pemeliharaan sarpras TK Islam Al-Imam Tahun Ajaran 2026/2027.',
      items: [
        { no: 1, name: 'Maintenance AC (Cuci 6 Unit)', unit_price: 85000, qty_req: 6, qty_people: 1, total: 510000, category: 'Jasa & Operasional', image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80' },
        { no: 2, name: 'Kertas HVS & ATK Sentra / Kelas PG-TK', unit_price: 50000, qty_req: 10, qty_people: 7, total: 3500000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80' },
        { no: 3, name: 'Kebutuhan Alat Kebersihan & Sanitasi Anak', unit_price: 250000, qty_req: 10, qty_people: 1, total: 2500000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80' },
        { no: 4, name: 'Mainan Edukatif & Alat Peraga Edukasi (APE)', unit_price: 1000000, qty_req: 4, qty_people: 1, total: 4000000, category: 'Perlengkapan Kelas', image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80' },
        { no: 5, name: 'Perlengkapan Kelas & P3K Anak', unit_price: 500000, qty_req: 4, qty_people: 1, total: 2000000, category: 'Perlengkapan Kelas', image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80' },
        { no: 6, name: 'Tinta Printer & Administrasi TK', unit_price: 249000, qty_req: 10, qty_people: 1, total: 2490000, category: 'Elektronik & IT', image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' }
      ]
    },
    unit_sd: {
      code: 'D.1',
      title: 'SARPRAS RINGAN',
      unit_name: 'SD Islam Al-Imam',
      total_plafond: 35884000,
      academic_year: '2026/2027',
      description: 'Rincian alokasi belanja operasional dan sarana prasarana ringan SD Islam Al-Imam Tahun Ajaran 2026/2027.',
      items: [
        { no: 1, name: 'Alat kebersihan OB', unit_price: 100000, qty_req: 12, qty_people: 2, total: 2400000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80' },
        { no: 2, name: 'Tinta white board 1 kelas/2/1botol', unit_price: 15000, qty_req: 13, qty_people: 20, total: 3900000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=600&auto=format&fit=crop&q=80' },
        { no: 3, name: 'Spidol', unit_price: 10000, qty_req: 13, qty_people: 1, total: 130000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80' },
        { no: 4, name: 'Kertas HVS F4 untuk admin guru', unit_price: 60000, qty_req: 13, qty_people: 12, total: 9360000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80' },
        { no: 5, name: 'Kertas HVS F4 untuk admin kantor', unit_price: 50000, qty_req: 13, qty_people: 12, total: 7800000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80' },
        { no: 6, name: 'Pewangi kelas', unit_price: 10000, qty_req: 13, qty_people: 12, total: 1560000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80' },
        { no: 7, name: 'Gayung, Ember', unit_price: 35000, qty_req: 4, qty_people: 1, total: 140000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80' },
        { no: 8, name: 'Penghapus papan tulis', unit_price: 10000, qty_req: 13, qty_people: 1, total: 130000, category: 'Perlengkapan Kelas', image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80' },
        { no: 9, name: 'Tinta Printer Hitam dan warna 6 bln 1 set (4 btl)', unit_price: 700000, qty_req: 7, qty_people: 1, total: 4900000, category: 'Elektronik & IT', image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' },
        { no: 10, name: 'Fotocopy', unit_price: 2000, qty_req: 13, qty_people: 214, total: 5564000, category: 'Jasa & Operasional', image_url: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=80' }
      ]
    },
    unit_smp: {
      code: 'D',
      title: 'ATK & KEBUTUHAN KELAS',
      unit_name: 'SMP Islam Al-Imam',
      total_plafond: 24506000,
      academic_year: '2026/2027',
      description: 'Rincian alokasi belanja ATK, kebutuhan kelas, dan operasional sarpras SMP Islam Al-Imam Tahun Ajaran 2026/2027.',
      items: [
        { no: 1, name: 'Kertas SPR', unit_price: 500, qty_req: 3, qty_people: 140, total: 210000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80' },
        { no: 2, name: 'Kertas Dinas (rim)', unit_price: 50000, qty_req: 3, qty_people: 2, total: 300000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80' },
        { no: 3, name: 'Tinta white board 1 kelas @10 botol', unit_price: 15000, qty_req: 6, qty_people: 6, total: 540000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=600&auto=format&fit=crop&q=80' },
        { no: 4, name: 'Pena, Pensil, Penghapus', unit_price: 15000, qty_req: 3, qty_people: 10, total: 450000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80' },
        { no: 5, name: 'Spidol', unit_price: 15000, qty_req: 6, qty_people: 6, total: 540000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80' },
        { no: 6, name: 'Kertas HVS F4 untuk admin guru', unit_price: 50000, qty_req: 10, qty_people: 5, total: 2500000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80' },
        { no: 7, name: 'Kertas HVS F4 untuk admin kantor', unit_price: 50000, qty_req: 10, qty_people: 5, total: 2500000, category: 'ATK & Kertas', image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80' },
        { no: 8, name: 'Sabun kamar mandi', unit_price: 10000, qty_req: 6, qty_people: 12, total: 720000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80' },
        { no: 9, name: 'Sabun Cuci tangan', unit_price: 13000, qty_req: 6, qty_people: 12, total: 936000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1608248597359-bb4f5e08df05?w=600&auto=format&fit=crop&q=80' },
        { no: 10, name: 'Pewangi kamar mandi', unit_price: 10000, qty_req: 6, qty_people: 12, total: 720000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80' },
        { no: 11, name: 'Pewangi kelas', unit_price: 10000, qty_req: 6, qty_people: 12, total: 720000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80' },
        { no: 12, name: 'Obat pel', unit_price: 15000, qty_req: 6, qty_people: 5, total: 450000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80' },
        { no: 13, name: 'Lampu kelas @4 setahun', unit_price: 35000, qty_req: 4, qty_people: 5, total: 700000, category: 'Elektronik & IT', image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80' },
        { no: 14, name: 'Gayung, Ember', unit_price: 35000, qty_req: 4, qty_people: 3, total: 420000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80' },
        { no: 15, name: 'Kebutuhan Kebersihan', unit_price: 300000, qty_req: 12, qty_people: 1, total: 3600000, category: 'Kebersihan & Sanitasi', image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80' },
        { no: 16, name: 'Maintenance AC', unit_price: 75000, qty_req: 14, qty_people: 4, total: 4200000, category: 'Jasa & Operasional', image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80' },
        { no: 17, name: 'Alat Peraga Olah Raga dll', unit_price: 1000000, qty_req: 1, qty_people: 5, total: 5000000, category: 'Perlengkapan Kelas', image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80' }
      ]
    }
  },

  stock_inventory: [
    { batch_id: 'BATCH-202609-01', product_name: 'Alat kebersihan OB', category: 'Kebersihan & Sanitasi', stock_qty: 24, unit_price: 100000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-02', product_name: 'Tinta white board 1 kelas/2/1botol', category: 'ATK & Kertas', stock_qty: 60, unit_price: 15000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-03', product_name: 'Spidol', category: 'ATK & Kertas', stock_qty: 50, unit_price: 10000, date_in: '2026-09-05', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-04', product_name: 'Kertas HVS F4 untuk admin guru', category: 'ATK & Kertas', stock_qty: 40, unit_price: 50000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-05', product_name: 'Kertas HVS F4 untuk admin kantor', category: 'ATK & Kertas', stock_qty: 35, unit_price: 50000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-06', product_name: 'Pewangi kelas', category: 'Kebersihan & Sanitasi', stock_qty: 50, unit_price: 10000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-07', product_name: 'Gayung, Ember', category: 'Kebersihan & Sanitasi', stock_qty: 20, unit_price: 35000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-08', product_name: 'Penghapus papan tulis', category: 'Perlengkapan Kelas', stock_qty: 40, unit_price: 10000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-09', product_name: 'Tinta Printer Hitam dan warna 6 bln 1 set (4 btl)', category: 'Elektronik & IT', stock_qty: 15, unit_price: 700000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-10', product_name: 'Fotocopy', category: 'Jasa & Operasional', stock_qty: 5000, unit_price: 2000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=80' },
    // SMP specific items
    { batch_id: 'BATCH-202609-20', product_name: 'Kertas SPR', category: 'ATK & Kertas', stock_qty: 500, unit_price: 500, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-21', product_name: 'Kertas Dinas (rim)', category: 'ATK & Kertas', stock_qty: 20, unit_price: 50000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-22', product_name: 'Tinta white board 1 kelas @10 botol', category: 'ATK & Kertas', stock_qty: 36, unit_price: 15000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-23', product_name: 'Pena, Pensil, Penghapus', category: 'ATK & Kertas', stock_qty: 30, unit_price: 15000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-24', product_name: 'Sabun kamar mandi', category: 'Kebersihan & Sanitasi', stock_qty: 72, unit_price: 10000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-25', product_name: 'Pewangi kamar mandi', category: 'Kebersihan & Sanitasi', stock_qty: 72, unit_price: 10000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-26', product_name: 'Obat pel', category: 'Kebersihan & Sanitasi', stock_qty: 30, unit_price: 15000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-27', product_name: 'Lampu kelas @4 setahun', category: 'Elektronik & IT', stock_qty: 20, unit_price: 35000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-28', product_name: 'Kebutuhan Kebersihan', category: 'Kebersihan & Sanitasi', stock_qty: 12, unit_price: 300000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-29', product_name: 'Maintenance AC', category: 'Jasa & Operasional', stock_qty: 56, unit_price: 75000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-30', product_name: 'Alat Peraga Olah Raga dll', category: 'Perlengkapan Kelas', stock_qty: 5, unit_price: 1000000, date_in: '2026-09-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202607-01', product_name: 'Spidol Whiteboard Snowman Hitam', category: 'ATK & Kertas', stock_qty: 0, unit_price: 8500, date_in: '2026-07-10', method: 'FIFO', status: 'Empty', image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202608-04', product_name: 'Spidol Whiteboard Snowman Hitam', category: 'ATK & Kertas', stock_qty: 12, unit_price: 9000, date_in: '2026-08-15', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202608-01', product_name: 'Kertas HVS A4 80gr PaperOne (Rim)', category: 'ATK & Kertas', stock_qty: 25, unit_price: 52000, date_in: '2026-08-01', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-11', product_name: 'Kertas HVS A4 80gr PaperOne (Rim)', category: 'ATK & Kertas', stock_qty: 40, unit_price: 54000, date_in: '2026-09-02', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202608-08', product_name: 'Tinta Epson 003 Black Original', category: 'Elektronik & IT', stock_qty: 8, unit_price: 85000, date_in: '2026-08-20', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202608-09', product_name: 'Tinta Epson 003 Color Set (C,M,Y)', category: 'Elektronik & IT', stock_qty: 5, unit_price: 245000, date_in: '2026-08-20', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-12', product_name: 'Cairan Pembersih Lantai Wipol Karbol 5 Liter', category: 'Kebersihan & Sanitasi', stock_qty: 10, unit_price: 78000, date_in: '2026-09-08', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202609-13', product_name: 'Sabun Cuci Tangan Lifebuoy Handwash 4 Liter', category: 'Kebersihan & Sanitasi', stock_qty: 6, unit_price: 110000, date_in: '2026-09-08', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1608248597359-bb4f5e08df05?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202608-11', product_name: 'Sapu Lantai Ijuk Dragon & Pengki Set', category: 'Kebersihan & Sanitasi', stock_qty: 15, unit_price: 38000, date_in: '2026-08-12', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202608-15', product_name: 'Kabel HDMI 10 Meter Vention Braided', category: 'Elektronik & IT', stock_qty: 4, unit_price: 135000, date_in: '2026-08-25', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202608-20', product_name: 'Stopmap Folio Kertas Sinar Dunia (Pack 50 pcs)', category: 'ATK & Kertas', stock_qty: 14, unit_price: 65000, date_in: '2026-08-28', method: 'FIFO', status: 'Active', image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80' },
    { batch_id: 'BATCH-202607-02', product_name: 'Baterai Mic Wireless Alkaline AA (Pack 4)', category: 'Elektronik & IT', stock_qty: 0, unit_price: 32000, date_in: '2026-07-15', method: 'FIFO', status: 'Empty', image_url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=600&auto=format&fit=crop&q=80' }
  ],

  orders: [
    {
      order_id: 'ORD-AC-20260710-01',
      unit_id: 'unit_smp',
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: '[Maintenance AC] Cuci AC Rutin 2 Unit SMP (Kelas 7 Utsman & 7 Aisyah)', qty: 2, unit_price: 85163, subtotal: 170326 }
      ]),
      total_amount: 170326,
      status: 'Approved',
      created_at: '2026-07-10 08:30',
      approved_at: '2026-07-10 09:00',
      notes: 'Pengeluaran Maintenance AC: 2 unit cuci SMP (Pos D Item 16)',
      invoice_number: 'INV/AC/2026/0701'
    },
    {
      order_id: 'ORD-AC-20260710-02',
      unit_id: 'unit_tk',
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: '[Maintenance AC] Cuci AC Rutin 6 Unit PG-TK (Kelas TK A, B, Playgroup, Kantor, UKS, R. Makan)', qty: 6, unit_price: 85000, subtotal: 510000 }
      ]),
      total_amount: 510000,
      status: 'Approved',
      created_at: '2026-07-10 10:15',
      approved_at: '2026-07-10 10:45',
      notes: 'Pengeluaran Maintenance AC: 6 unit cuci TK',
      invoice_number: 'INV/AC/2026/0702'
    },
    {
      order_id: 'ORD-AC-20260716-01',
      unit_id: 'unit_smp',
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: '[Maintenance AC] Instalasi & Penggantian Kabel AC Ruang Yayasan', qty: 1, unit_price: 110061, subtotal: 110061 }
      ]),
      total_amount: 110061,
      status: 'Approved',
      created_at: '2026-07-16 11:00',
      approved_at: '2026-07-16 11:30',
      notes: 'Pengeluaran Maintenance AC: Kabel AC ruang yys',
      invoice_number: 'INV/AC/2026/0703'
    },
    {
      order_id: 'ORD-AC-20260717-01',
      unit_id: 'unit_smp',
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: '[Maintenance AC] Paket Service SMP: 4 Unit Cuci, 1 Unit Isi Freon, 1 Unit Service/Perbaikan', qty: 1, unit_price: 700000, subtotal: 700000 }
      ]),
      total_amount: 700000,
      status: 'Approved',
      created_at: '2026-07-17 08:30',
      approved_at: '2026-07-17 09:00',
      notes: 'Pengeluaran Maintenance AC: 4 unit cuci, 1 unit isi freon, 1 unit Service SMP (Pos D Item 16)',
      invoice_number: 'INV/AC/2026/0704'
    },
    {
      order_id: 'ORD-AC-20260731-01',
      unit_id: 'unit_sd',
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: '[Maintenance AC] Perbaikan & Service AC SD (1 Unit Kelas SD)', qty: 1, unit_price: 175000, subtotal: 175000 }
      ]),
      total_amount: 175000,
      status: 'Approved',
      created_at: '2026-07-31 09:00',
      approved_at: '2026-07-31 09:30',
      notes: 'Pengeluaran Maintenance AC: 1 unit service SD',
      invoice_number: 'INV/AC/2026/0705'
    },
    {
      order_id: 'ORD-AC-20260731-02',
      unit_id: 'unit_smp',
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: '[Maintenance AC] Cuci AC Rutin 2 Unit SMP (Kelas 8 Khodijah)', qty: 2, unit_price: 75000, subtotal: 150000 }
      ]),
      total_amount: 150000,
      status: 'Approved',
      created_at: '2026-07-31 13:00',
      approved_at: '2026-07-31 13:30',
      notes: 'Pengeluaran Maintenance AC: 2 unit cuci SMP (Pos D Item 16)',
      invoice_number: 'INV/AC/2026/0706'
    },
    {
      order_id: 'ORD-AC-20260829-01',
      unit_id: 'unit_sd',
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: '[Maintenance AC] Service & Pengecekan 1 Unit AC SD (Kelas 4 Ali)', qty: 1, unit_price: 90329, subtotal: 90329 }
      ]),
      total_amount: 90329,
      status: 'Approved',
      created_at: '2026-08-29 10:00',
      approved_at: '2026-08-29 10:30',
      notes: 'Pengeluaran Maintenance AC: 1 unit service SD',
      invoice_number: 'INV/AC/2026/0801'
    },
    {
      order_id: 'ORD-AC-20260904-01',
      unit_id: 'unit_smp',
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: '[Maintenance AC] Cuci AC Rutin 4 Unit SMP (Batch 1 - Kelas 8 Umar & 9 Abu Bakar)', qty: 4, unit_price: 75000, subtotal: 300000 }
      ]),
      total_amount: 300000,
      status: 'Approved',
      created_at: '2026-09-04 08:30',
      approved_at: '2026-09-04 09:00',
      notes: 'Pengeluaran Maintenance AC: 4 unit cuci SMP (Pos D Item 16)',
      invoice_number: 'INV/AC/2026/0901'
    },
    {
      order_id: 'ORD-AC-20260904-02',
      unit_id: 'unit_smp',
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: '[Maintenance AC] Cuci AC Rutin 4 Unit SMP (Batch 2 - Kelas 9 Ummu & Kantor Guru)', qty: 4, unit_price: 75000, subtotal: 300000 }
      ]),
      total_amount: 300000,
      status: 'Approved',
      created_at: '2026-09-04 13:00',
      approved_at: '2026-09-04 13:30',
      notes: 'Pengeluaran Maintenance AC: 4 unit cuci 4 SMP (Pos D Item 16)',
      invoice_number: 'INV/AC/2026/0902'
    },
    {
      order_id: 'ORD-AC-20260928-01',
      unit_id: 'unit_sd',
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: '[Maintenance AC] Paket 4 Unit Cleaning AC Kelas 1 (2 Ruang), Tambah Freon 1.5-2 PK Guru Kls 4, & Bocor Air Perpus', qty: 1, unit_price: 700000, subtotal: 700000 }
      ]),
      total_amount: 700000,
      status: 'Approved',
      created_at: '2026-09-28 09:30',
      approved_at: '2026-09-28 10:00',
      notes: 'Pengeluaran Maintenance AC: 4 Unit Cleaning AC Kelas 1 (2 Ruang), Guru Kelas 4 Tambah Freon 1,5-2pk 1 Unit, Penanganan Bocor Air Ruang Perpus',
      invoice_number: 'INV/AC/2026/0903'
    }
  ],

  transactions_log: [
    { log_id: 'LOG-AC-20260710-01', order_id: 'ORD-AC-20260710-01', unit_id: 'unit_smp', keterangan: 'Pembayaran Layanan Maintenance AC: 2 unit cuci SMP', amount_deducted: 170326, debet: 0, kredit: 170326, remaining_balance: 24335674, timestamp: '2026-07-10 09:00', invoice_number: 'INV/AC/2026/0701' },
    { log_id: 'LOG-AC-20260710-02', order_id: 'ORD-AC-20260710-02', unit_id: 'unit_tk', keterangan: 'Pembayaran Layanan Maintenance AC: 6 unit cuci TK', amount_deducted: 510000, debet: 0, kredit: 510000, remaining_balance: 14490000, timestamp: '2026-07-10 10:45', invoice_number: 'INV/AC/2026/0702' },
    { log_id: 'LOG-AC-20260716-01', order_id: 'ORD-AC-20260716-01', unit_id: 'unit_smp', keterangan: 'Pembayaran Layanan Maintenance AC: Kabel AC ruang yys', amount_deducted: 110061, debet: 0, kredit: 110061, remaining_balance: 24225613, timestamp: '2026-07-16 11:30', invoice_number: 'INV/AC/2026/0703' },
    { log_id: 'LOG-AC-20260717-01', order_id: 'ORD-AC-20260717-01', unit_id: 'unit_smp', keterangan: 'Pembayaran Layanan Maintenance AC: 4 unit cuci, 1 unit isi freon, 1 unit Service SMP', amount_deducted: 700000, debet: 0, kredit: 700000, remaining_balance: 23525613, timestamp: '2026-07-17 09:00', invoice_number: 'INV/AC/2026/0704' },
    { log_id: 'LOG-AC-20260731-01', order_id: 'ORD-AC-20260731-01', unit_id: 'unit_sd', keterangan: 'Pembayaran Layanan Maintenance AC: 1 unit service SD', amount_deducted: 175000, debet: 0, kredit: 175000, remaining_balance: 35709000, timestamp: '2026-07-31 09:30', invoice_number: 'INV/AC/2026/0705' },
    { log_id: 'LOG-AC-20260731-02', order_id: 'ORD-AC-20260731-02', unit_id: 'unit_smp', keterangan: 'Pembayaran Layanan Maintenance AC: 2 unit cuci SMP', amount_deducted: 150000, debet: 0, kredit: 150000, remaining_balance: 23375613, timestamp: '2026-07-31 13:30', invoice_number: 'INV/AC/2026/0706' },
    { log_id: 'LOG-AC-20260829-01', order_id: 'ORD-AC-20260829-01', unit_id: 'unit_sd', keterangan: 'Pembayaran Layanan Maintenance AC: 1 unit service SD', amount_deducted: 90329, debet: 0, kredit: 90329, remaining_balance: 35618671, timestamp: '2026-08-29 10:30', invoice_number: 'INV/AC/2026/0801' },
    { log_id: 'LOG-AC-20260904-01', order_id: 'ORD-AC-20260904-01', unit_id: 'unit_smp', keterangan: 'Pembayaran Layanan Maintenance AC: 4 unit cuci SMP (Batch 1)', amount_deducted: 300000, debet: 0, kredit: 300000, remaining_balance: 23075613, timestamp: '2026-09-04 09:00', invoice_number: 'INV/AC/2026/0901' },
    { log_id: 'LOG-AC-20260904-02', order_id: 'ORD-AC-20260904-02', unit_id: 'unit_smp', keterangan: 'Pembayaran Layanan Maintenance AC: 4 unit cuci 4 SMP (Batch 2)', amount_deducted: 300000, debet: 0, kredit: 300000, remaining_balance: 22775613, timestamp: '2026-09-04 13:30', invoice_number: 'INV/AC/2026/0902' },
    { log_id: 'LOG-AC-20260928-01', order_id: 'ORD-AC-20260928-01', unit_id: 'unit_sd', keterangan: 'Pembayaran Layanan Maintenance AC: 4 Unit Cleaning AC Kelas 1, Tambah Freon Guru Kls 4 & Bocor Air Perpus', amount_deducted: 700000, debet: 0, kredit: 700000, remaining_balance: 34918671, timestamp: '2026-09-28 10:00', invoice_number: 'INV/AC/2026/0903' }
  ],

  // ==========================================
  // AC MANAGEMENT SPECIAL MODULE DATA
  // ==========================================
  ac_pricing_catalogue: [
    {
      service_id: 'AC-SRV-CUCI-RUTIN',
      name: 'Cuci AC Rutin (Indoor + Outdoor + Filter)',
      unit_price: 75000,
      category: 'Cuci Berkala',
      badge: 'Paling Populer',
      badge_color: 'bg-sky-100 text-sky-800',
      description: 'Pembersihan evaporator, filter debu indoor, condensor outdoor, talang air, dan cek tekanan freon standar PSI.',
      icon: 'fa-soap',
      image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80'
    },
    {
      service_id: 'AC-SRV-CUCI-OVERHAUL',
      name: 'Cuci Besar / Overhaul + Desinfektan Anti-Jamur',
      unit_price: 150000,
      category: 'Cuci Berat',
      badge: 'Deep Cleaning',
      badge_color: 'bg-indigo-100 text-indigo-800',
      description: 'Turun unit indoor, cuci kimia talang & pipa pembuangan, sterilisasi bau apek dan bakteri di ruang kelas.',
      icon: 'fa-spray-can-sparkles',
      image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80'
    },
    {
      service_id: 'AC-SRV-FREON-TAMBAH',
      name: 'Tambah Freon R32 / R410A / R22 (Per Unit)',
      unit_price: 125000,
      category: 'Freon & Gas',
      badge: 'Optimal Dingin',
      badge_color: 'bg-teal-100 text-teal-800',
      description: 'Penambahan gas pendingin untuk unit yang kurang dingin akibat penurunan tekanan normal sistem sirkulasi.',
      icon: 'fa-temperature-arrow-down',
      image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80'
    },
    {
      service_id: 'AC-SRV-FREON-ISI-TOTAL',
      name: 'Isi Ulang Freon Total (0 s/d Full) + Vakum Pipa',
      unit_price: 250000,
      category: 'Freon & Gas',
      badge: 'Kuras & Isi Baru',
      badge_color: 'bg-blue-100 text-blue-800',
      description: 'Pemeriksaan kebocoran sambungan nepel flare, vakum sirkulasi pipa instalasi, dan pengisian full freon baru.',
      icon: 'fa-gauge-high',
      image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80'
    },
    {
      service_id: 'AC-SRV-PERBAIKAN-KAPASITOR',
      name: 'Perbaikan Modul / Ganti Kapasitor & Motor Fan',
      unit_price: 175000,
      category: 'Sparepart & Servis',
      badge: 'Kerusakan Komponen',
      badge_color: 'bg-amber-100 text-amber-800',
      description: 'Penggantian komponen starting capacitor 25-45 uF, perbaikan sensor suhu thermistor atau bearing kipas blower.',
      icon: 'fa-bolt',
      image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80'
    },
    {
      service_id: 'AC-SRV-BONGKAR-PASANG',
      name: 'Jasa Bongkar Pasang / Relokasi AC Antar Ruangan',
      unit_price: 300000,
      category: 'Instalasi & Relokasi',
      badge: 'Relokasi Kelas',
      badge_color: 'bg-purple-100 text-purple-800',
      description: 'Pemindahan unit indoor & outdoor antar ruang kelas/kantor, termasuk re-flaring, vakum ulang dan pengetesan pipa.',
      icon: 'fa-dolly',
      image_url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80'
    },
    {
      service_id: 'AC-UNIT-BARU-1PK-STD',
      name: 'Pengadaan Unit AC Baru 1 PK Standard (Sharp / Panasonic)',
      unit_price: 3850000,
      category: 'Unit Baru',
      badge: 'Unit Baru Komplit',
      badge_color: 'bg-emerald-100 text-emerald-800',
      description: 'Paket lengkap unit indoor+outdoor, pipa tembaga tebal 0.6mm (3m), kabel Supreme, bracket outdoor, MCB & pasang.',
      icon: 'fa-box-open',
      image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80'
    },
    {
      service_id: 'AC-UNIT-BARU-1PK-INVERTER',
      name: 'Pengadaan Unit AC Baru 1 PK Inverter (Daikin Flash Inverter)',
      unit_price: 4650000,
      category: 'Unit Baru',
      badge: 'Hemat Listrik 50%',
      badge_color: 'bg-sky-100 text-sky-800',
      description: 'Teknologi inverter hening dan hemat listrik, filter PM2.5 anti virus, ideal untuk ruang kelas belajar & kantor guru.',
      icon: 'fa-leaf',
      image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80'
    }
  ],

  ac_inventory: [
    // PG-TK AC Assets (8 units)
    { ac_id: 'AC-TK-01', unit_id: 'unit_tk', room_name: 'Kelas TK A (Sentra Balok)', brand: 'Daikin FTKC25 (Inverter)', capacity_pk: '1 PK', condition: 'Baik / Normal', last_service_date: '2026-07-10', next_service_date: '2026-10-10', install_year: 2024, total_service_count: 1, notes: 'Outdoor di balkon lantai 1' },
    { ac_id: 'AC-TK-02', unit_id: 'unit_tk', room_name: 'Kelas TK B (Sentra Imtaq)', brand: 'Sharp AH-A9UCY', capacity_pk: '1 PK', condition: 'Baik / Normal', last_service_date: '2026-07-10', next_service_date: '2026-10-10', install_year: 2024, total_service_count: 1, notes: 'Outdoor samping lorong bermain' },
    { ac_id: 'AC-TK-03', unit_id: 'unit_tk', room_name: 'Kelas Playgroup (Sentra Main Peran)', brand: 'Panasonic CS-YN9WKJ', capacity_pk: '1 PK', condition: 'Baik / Normal', last_service_date: '2026-07-10', next_service_date: '2026-10-10', install_year: 2025, total_service_count: 1, notes: 'Indoor bersih' },
    { ac_id: 'AC-TK-04', unit_id: 'unit_tk', room_name: 'Kantor Kepala & Guru PG-TK', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-07-10', next_service_date: '2026-10-10', install_year: 2023, total_service_count: 1, notes: 'Outdoor aman beratap' },
    { ac_id: 'AC-TK-05', unit_id: 'unit_tk', room_name: 'Ruang UKS & Konseling PG-TK', brand: 'Gree Eco King GWC-05MOO', capacity_pk: '0.5 PK', condition: 'Baik / Normal', last_service_date: '2026-07-10', next_service_date: '2026-10-10', install_year: 2025, total_service_count: 1, notes: 'Unit baru dipasang awal tahun' },
    { ac_id: 'AC-TK-06', unit_id: 'unit_tk', room_name: 'Ruang Makan / Daycare Balita', brand: 'Panasonic Low Watt 1 PK', capacity_pk: '1 PK', condition: 'Baik / Normal', last_service_date: '2026-07-10', next_service_date: '2026-10-10', install_year: 2023, total_service_count: 1, notes: 'Sering dipakai full day' },
    { ac_id: 'AC-TK-07', unit_id: 'unit_tk', room_name: 'Ruang Sentra Bahan Alam', brand: 'Sharp Standard 1 PK', capacity_pk: '1 PK', condition: 'Baik / Normal', last_service_date: '2026-08-01', next_service_date: '2026-11-01', install_year: 2024, total_service_count: 1, notes: 'Outdoor di taman belakang' },
    { ac_id: 'AC-TK-08', unit_id: 'unit_tk', room_name: 'Lobby & Ruang Tunggu Orang Tua TK', brand: 'Daikin Inverter 2 PK', capacity_pk: '2 PK', condition: 'Baik / Normal', last_service_date: '2026-08-01', next_service_date: '2026-11-01', install_year: 2025, total_service_count: 1, notes: 'Heavy duty lobby' },

    // SD AC Assets (18 units)
    { ac_id: 'AC-SD-01', unit_id: 'unit_sd', room_name: 'Kantor Kepala SD', brand: 'Gree Eco 1/2 PK', capacity_pk: '0.5 PK', condition: 'Baik / Normal', last_service_date: '2026-07-31', next_service_date: '2026-10-31', install_year: 2024, total_service_count: 1, notes: 'Kantor Kepala Sekolah SD' },
    { ac_id: 'AC-SD-02', unit_id: 'unit_sd', room_name: 'Kantor Guru Ikhwan', brand: 'Gree Eco 1/2 PK', capacity_pk: '0.5 PK', condition: 'Baik / Normal', last_service_date: '2026-07-31', next_service_date: '2026-10-31', install_year: 2024, total_service_count: 1, notes: 'Ruang Kerja Guru Ikhwan' },
    { ac_id: 'AC-SD-03', unit_id: 'unit_sd', room_name: "Kantor Kabid Al-Qur'an", brand: 'Gree Eco 1/2 PK', capacity_pk: '0.5 PK', condition: 'Baik / Normal', last_service_date: '2026-07-16', next_service_date: '2026-10-16', install_year: 2024, total_service_count: 1, notes: "Gedung Pusat Al-Qur'an Al-Imam (Kabel AC baru diganti)" },
    { ac_id: 'AC-SD-04', unit_id: 'unit_sd', room_name: 'Ruang Guru SD', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-28', next_service_date: '2026-12-28', install_year: 2024, total_service_count: 1, notes: 'Ruang Guru SD' },
    { ac_id: 'AC-SD-05', unit_id: 'unit_sd', room_name: 'Kelas 1 Abdullah (Unit 1)', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-28', next_service_date: '2026-12-28', install_year: 2024, total_service_count: 1, notes: 'Cleaning AC Kelas 1 (28/9/2026)' },
    { ac_id: 'AC-SD-06', unit_id: 'unit_sd', room_name: 'Kelas 1 Abdullah (Unit 2)', brand: 'Gree Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-28', next_service_date: '2026-12-28', install_year: 2024, total_service_count: 1, notes: 'Cleaning AC Kelas 1 (28/9/2026)' },
    { ac_id: 'AC-SD-07', unit_id: 'unit_sd', room_name: 'Kelas 2 Saad (Unit 1)', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-28', next_service_date: '2026-12-28', install_year: 2024, total_service_count: 1, notes: 'Cleaning AC Kelas 2 (28/9/2026)' },
    { ac_id: 'AC-SD-08', unit_id: 'unit_sd', room_name: 'Kelas 2 Saad (Unit 2)', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-28', next_service_date: '2026-12-28', install_year: 2024, total_service_count: 1, notes: 'Cleaning AC Kelas 2 (28/9/2026)' },
    { ac_id: 'AC-SD-09', unit_id: 'unit_sd', room_name: "Kelas 3 Ka'ab (Unit 1)", brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-07-31', next_service_date: '2026-10-31', install_year: 2024, total_service_count: 1, notes: 'Servis rutin 31/7/2026' },
    { ac_id: 'AC-SD-10', unit_id: 'unit_sd', room_name: "Kelas 3 Ka'ab (Unit 2)", brand: 'Gree Heavy Duty 2 PK', capacity_pk: '2 PK', condition: 'Baik / Normal', last_service_date: '2026-07-31', next_service_date: '2026-10-31', install_year: 2024, total_service_count: 1, notes: 'Servis rutin 31/7/2026' },
    { ac_id: 'AC-SD-11', unit_id: 'unit_sd', room_name: 'Kelas 4 Ali', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-08-29', next_service_date: '2026-11-29', install_year: 2024, total_service_count: 1, notes: 'Servis & pengecekan (29/8/2026)' },
    { ac_id: 'AC-SD-12', unit_id: 'unit_sd', room_name: 'Kelas 4 Sumayyah / Ruang Guru Kls 4', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-28', next_service_date: '2026-12-28', install_year: 2024, total_service_count: 1, notes: 'Tambah freon 1.5-2 PK (28/9/2026)' },
    { ac_id: 'AC-SD-13', unit_id: 'unit_sd', room_name: 'Kelas 5 Utsman', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-08-15', next_service_date: '2026-11-15', install_year: 2024, total_service_count: 1, notes: 'Lantai 2 Gedung SD' },
    { ac_id: 'AC-SD-14', unit_id: 'unit_sd', room_name: 'Kelas 5 Rumaysha', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-08-15', next_service_date: '2026-11-15', install_year: 2024, total_service_count: 1, notes: 'Lantai 2 Gedung SD' },
    { ac_id: 'AC-SD-15', unit_id: 'unit_sd', room_name: 'Kelas 6 Umar', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-08-10', next_service_date: '2026-11-10', install_year: 2024, total_service_count: 1, notes: 'Lantai 2 Gedung SD' },
    { ac_id: 'AC-SD-16', unit_id: 'unit_sd', room_name: 'Kelas 6 Hafsah', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-08-10', next_service_date: '2026-11-10', install_year: 2024, total_service_count: 1, notes: 'Lantai 2 Gedung SD' },
    { ac_id: 'AC-SD-17', unit_id: 'unit_sd', room_name: 'Lab Komputer SD', brand: 'Daikin Heavy Duty 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-08-01', next_service_date: '2026-11-01', install_year: 2025, total_service_count: 1, notes: 'Ruang Laboratorium Komputer' },
    { ac_id: 'AC-SD-18', unit_id: 'unit_sd', room_name: 'Lab IPA SD', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-08-01', next_service_date: '2026-11-01', install_year: 2024, total_service_count: 1, notes: 'Ruang Praktikum Sains & IPA' },

    // SMP AC Assets (15 units)
    { ac_id: 'AC-SMP-01', unit_id: 'unit_smp', room_name: 'Kantor TU SD SMP (Unit 1)', brand: 'Daikin Inverter 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-07-10', next_service_date: '2026-10-10', install_year: 2024, total_service_count: 1, notes: 'Kantor Tata Usaha Bersama SD-SMP' },
    { ac_id: 'AC-SMP-02', unit_id: 'unit_smp', room_name: 'Kantor TU SD SMP (Unit 2)', brand: 'Gree Standard 2 PK', capacity_pk: '2 PK', condition: 'Baik / Normal', last_service_date: '2026-07-10', next_service_date: '2026-10-10', install_year: 2024, total_service_count: 1, notes: 'Kantor Tata Usaha Bersama SD-SMP' },
    { ac_id: 'AC-SMP-03', unit_id: 'unit_smp', room_name: 'Kantor Kepala Sekolah SMP', brand: 'Gree Eco 1/2 PK', capacity_pk: '0.5 PK', condition: 'Baik / Normal', last_service_date: '2026-07-17', next_service_date: '2026-10-17', install_year: 2024, total_service_count: 1, notes: 'Kantor Kepala Sekolah SMP' },
    { ac_id: 'AC-SMP-04', unit_id: 'unit_smp', room_name: 'Perpustakaan Al-Imam (SD/SMP)', brand: 'Gree Low Watt 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-28', next_service_date: '2026-12-28', install_year: 2024, total_service_count: 1, notes: 'Penanganan bocor air tuntas 28/9/2026' },
    { ac_id: 'AC-SMP-05', unit_id: 'unit_smp', room_name: 'Kelas 7 Utsman', brand: 'Gree Heavy Duty 2 PK', capacity_pk: '2 PK', condition: 'Baik / Normal', last_service_date: '2026-07-10', next_service_date: '2026-10-10', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 10/7/2026 (Pos D Item 16)' },
    { ac_id: 'AC-SMP-06', unit_id: 'unit_smp', room_name: 'Kelas 7 Aisyah', brand: 'Daikin Inverter 2 PK', capacity_pk: '2 PK', condition: 'Baik / Normal', last_service_date: '2026-07-10', next_service_date: '2026-10-10', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 10/7/2026 (Pos D Item 16)' },
    { ac_id: 'AC-SMP-07', unit_id: 'unit_smp', room_name: 'Kantor Guru Akhwat SMP', brand: 'Daikin Inverter 2 PK', capacity_pk: '2 PK', condition: 'Baik / Normal', last_service_date: '2026-09-04', next_service_date: '2026-12-04', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 4/9/2026 (Pos D Item 16)' },
    { ac_id: 'AC-SMP-08', unit_id: 'unit_smp', room_name: 'Kelas 9 Ummu (Unit 1)', brand: 'Gree Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-04', next_service_date: '2026-12-04', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 4/9/2026 (Pos D Item 16)' },
    { ac_id: 'AC-SMP-09', unit_id: 'unit_smp', room_name: 'Kelas 9 Ummu (Unit 2)', brand: 'Gree Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-04', next_service_date: '2026-12-04', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 4/9/2026 (Pos D Item 16)' },
    { ac_id: 'AC-SMP-10', unit_id: 'unit_smp', room_name: 'Kelas 8 Khodijah (Unit 1)', brand: 'Daikin Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-07-31', next_service_date: '2026-10-31', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 31/7/2026 (Pos D Item 16)' },
    { ac_id: 'AC-SMP-11', unit_id: 'unit_smp', room_name: 'Kelas 8 Khodijah (Unit 2)', brand: 'Gree Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-07-31', next_service_date: '2026-10-31', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 31/7/2026 (Pos D Item 16)' },
    { ac_id: 'AC-SMP-12', unit_id: 'unit_smp', room_name: 'Kelas 8 Umar bin Khattab (Unit 1)', brand: 'Gree Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-04', next_service_date: '2026-12-04', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 4/9/2026 (Pos D Item 16)' },
    { ac_id: 'AC-SMP-13', unit_id: 'unit_smp', room_name: 'Kelas 8 Umar bin Khattab (Unit 2)', brand: 'Gree Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-04', next_service_date: '2026-12-04', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 4/9/2026 (Pos D Item 16)' },
    { ac_id: 'AC-SMP-14', unit_id: 'unit_smp', room_name: 'Kelas 9 Abu Bakar (Unit 1)', brand: 'Daikin Inverter 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-04', next_service_date: '2026-12-04', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 4/9/2026 (Pos D Item 16)' },
    { ac_id: 'AC-SMP-15', unit_id: 'unit_smp', room_name: 'Kelas 9 Abu Bakar (Unit 2)', brand: 'Gree Standard 1.5 PK', capacity_pk: '1.5 PK', condition: 'Baik / Normal', last_service_date: '2026-09-04', next_service_date: '2026-12-04', install_year: 2024, total_service_count: 1, notes: 'Cuci rutin 4/9/2026 (Pos D Item 16)' }
  ],

  ac_service_requests: [
    {
      request_id: 'AC-REQ-202607-01',
      unit_id: 'unit_smp',
      room_name: 'Kelas 7 Utsman & 7 Aisyah SMP',
      ac_id: 'AC-SMP-05',
      service_name: 'Cuci AC Rutin SMP (2 Unit)',
      service_id: 'AC-SRV-CUCI-RUTIN',
      qty: 2,
      unit_price: 85163,
      total_amount: 170326,
      funding_source: 'RAPBS_POIN',
      scheduled_date: '2026-07-10',
      vendor_name: 'CV Sarana Sejuk Al-Imam',
      status: 'Selesai',
      created_at: '2026-07-10 08:30',
      approved_at: '2026-07-10 09:00',
      notes: '2 unit cuci SMP - Realisasi biaya Rp 170.326 (Pos D Item 16 Maintenance AC)'
    },
    {
      request_id: 'AC-REQ-202607-02',
      unit_id: 'unit_tk',
      room_name: 'Area PG-TK (Kelas TK A, TK B, Playgroup, Kantor, UKS, Ruang Makan)',
      ac_id: 'AC-TK-01',
      service_name: 'Cuci AC Rutin PG-TK (6 Unit)',
      service_id: 'AC-SRV-CUCI-RUTIN',
      qty: 6,
      unit_price: 85000,
      total_amount: 510000,
      funding_source: 'RAPBS_POIN',
      scheduled_date: '2026-07-10',
      vendor_name: 'CV Sarana Sejuk Al-Imam',
      status: 'Selesai',
      created_at: '2026-07-10 10:15',
      approved_at: '2026-07-10 10:45',
      notes: '6 unit cuci TK - Realisasi biaya Rp 510.000'
    },
    {
      request_id: 'AC-REQ-202607-03',
      unit_id: 'unit_smp',
      room_name: "Ruang Yayasan / Kantor Kabid Al-Qur'an",
      ac_id: 'AC-SD-03',
      service_name: 'Instalasi & Penggantian Kabel AC Ruang Yayasan',
      service_id: 'AC-SRV-PERBAIKAN-KAPASITOR',
      qty: 1,
      unit_price: 110061,
      total_amount: 110061,
      funding_source: 'RAPBS_POIN',
      scheduled_date: '2026-07-16',
      vendor_name: 'CV Sarana Sejuk Al-Imam',
      status: 'Selesai',
      created_at: '2026-07-16 11:00',
      approved_at: '2026-07-16 11:30',
      notes: 'Kabel AC ruang yys - Realisasi biaya Rp 110.061'
    },
    {
      request_id: 'AC-REQ-202607-04',
      unit_id: 'unit_smp',
      room_name: 'Kelas 8 & 9 SMP (4 Ruang Kelas)',
      ac_id: 'AC-SMP-08',
      service_name: 'Paket Service Komplit SMP (4 Unit Cuci, 1 Unit Isi Freon, 1 Unit Service)',
      service_id: 'AC-SRV-FREON-ISI-TOTAL',
      qty: 6,
      unit_price: 116666,
      total_amount: 700000,
      funding_source: 'RAPBS_POIN',
      scheduled_date: '2026-07-17',
      vendor_name: 'CV Sarana Sejuk Al-Imam',
      status: 'Selesai',
      created_at: '2026-07-17 08:30',
      approved_at: '2026-07-17 09:00',
      notes: '4 unit cuci, 1 unit isi freon, 1 unit Service SMP - Realisasi biaya Rp 700.000 (Pos D Item 16)'
    },
    {
      request_id: 'AC-REQ-202607-05',
      unit_id: 'unit_sd',
      room_name: "Ruang Kelas 3 Ka'ab SD",
      ac_id: 'AC-SD-09',
      service_name: 'Perbaikan & Service AC SD (1 Unit)',
      service_id: 'AC-SRV-PERBAIKAN-KAPASITOR',
      qty: 1,
      unit_price: 175000,
      total_amount: 175000,
      funding_source: 'RAPBS_POIN',
      scheduled_date: '2026-07-31',
      vendor_name: 'CV Sarana Sejuk Al-Imam',
      status: 'Selesai',
      created_at: '2026-07-31 09:00',
      approved_at: '2026-07-31 09:30',
      notes: '1 unit service SD - Realisasi biaya Rp 175.000'
    },
    {
      request_id: 'AC-REQ-202607-06',
      unit_id: 'unit_smp',
      room_name: 'Kelas 8 Khodijah SMP (2 Unit)',
      ac_id: 'AC-SMP-10',
      service_name: 'Cuci AC Rutin SMP (2 Unit)',
      service_id: 'AC-SRV-CUCI-RUTIN',
      qty: 2,
      unit_price: 75000,
      total_amount: 150000,
      funding_source: 'RAPBS_POIN',
      scheduled_date: '2026-07-31',
      vendor_name: 'CV Sarana Sejuk Al-Imam',
      status: 'Selesai',
      created_at: '2026-07-31 13:00',
      approved_at: '2026-07-31 13:30',
      notes: '2 unit cuci SMP - Realisasi biaya Rp 150.000 (Pos D Item 16)'
    },
    {
      request_id: 'AC-REQ-202608-01',
      unit_id: 'unit_sd',
      room_name: 'Ruang Kelas 4 Ali SD',
      ac_id: 'AC-SD-11',
      service_name: 'Service & Pengecekan AC SD (1 Unit)',
      service_id: 'AC-SRV-PERBAIKAN-KAPASITOR',
      qty: 1,
      unit_price: 90329,
      total_amount: 90329,
      funding_source: 'RAPBS_POIN',
      scheduled_date: '2026-08-29',
      vendor_name: 'CV Sarana Sejuk Al-Imam',
      status: 'Selesai',
      created_at: '2026-08-29 10:00',
      approved_at: '2026-08-29 10:30',
      notes: '1 unit service SD - Realisasi biaya Rp 90.329'
    },
    {
      request_id: 'AC-REQ-202609-01',
      unit_id: 'unit_smp',
      room_name: 'Kelas 8 Umar & 9 Abu Bakar (Batch 1 - 4 Unit)',
      ac_id: 'AC-SMP-12',
      service_name: 'Cuci AC Rutin SMP (4 Unit)',
      service_id: 'AC-SRV-CUCI-RUTIN',
      qty: 4,
      unit_price: 75000,
      total_amount: 300000,
      funding_source: 'RAPBS_POIN',
      scheduled_date: '2026-09-04',
      vendor_name: 'CV Sarana Sejuk Al-Imam',
      status: 'Selesai',
      created_at: '2026-09-04 08:30',
      approved_at: '2026-09-04 09:00',
      notes: '4 unit cuci SMP - Realisasi biaya Rp 300.000 (Pos D Item 16)'
    },
    {
      request_id: 'AC-REQ-202609-02',
      unit_id: 'unit_smp',
      room_name: 'Kelas 9 Ummu & Kantor Guru Akhwat (Batch 2 - 4 Unit)',
      ac_id: 'AC-SMP-08',
      service_name: 'Cuci AC Rutin SMP (4 Unit)',
      service_id: 'AC-SRV-CUCI-RUTIN',
      qty: 4,
      unit_price: 75000,
      total_amount: 300000,
      funding_source: 'RAPBS_POIN',
      scheduled_date: '2026-09-04',
      vendor_name: 'CV Sarana Sejuk Al-Imam',
      status: 'Selesai',
      created_at: '2026-09-04 13:00',
      approved_at: '2026-09-04 13:30',
      notes: '4 unit cuci 4 SMP - Realisasi biaya Rp 300.000 (Pos D Item 16)'
    },
    {
      request_id: 'AC-REQ-202609-03',
      unit_id: 'unit_sd',
      room_name: 'Kelas 1 Abdullah (2 Unit), Guru Kelas 4 & Perpus SD/SMP',
      ac_id: 'AC-SD-05',
      service_name: 'Paket Cleaning AC Kelas 1 (2 Ruang), Tambah Freon 1.5-2 PK Guru Kls 4, & Bocor Air Perpus',
      service_id: 'AC-SRV-FREON-TAMBAH',
      qty: 6,
      unit_price: 116666,
      total_amount: 700000,
      funding_source: 'RAPBS_POIN',
      scheduled_date: '2026-09-28',
      vendor_name: 'CV Sarana Sejuk Al-Imam',
      status: 'Selesai',
      created_at: '2026-09-28 09:30',
      approved_at: '2026-09-28 10:00',
      notes: '4 Unit Cleaning AC Kelas 1 (2 Ruang), Guru Kelas 4 Tambah Freon 1,5-2pk 1 Unit Kelas 4, Penanganan Bocor Air Ruang Perpus - Realisasi Rp 700.000'
    }
  ],

  ac_vendors: [
    {
      vendor_id: 'VEN-AC-01',
      name: 'CV Sarana Sejuk Al-Imam',
      badge: 'Mitra Prioritas',
      pic: 'Bpk. Hendra Kurniawan, S.T.',
      phone: '0812-8899-7711',
      rating: 4.9,
      review_count: 86,
      sla: 'Maksimal 24 Jam Pengerjaan',
      warranty: 'Garansi Servis & Cuci 30 Hari',
      address: 'Jl. Pemuda No. 45, Jakarta Timur',
      description: 'Vendor rekanan utama tata udara sekolah Al-Imam. Melayani cuci rutin terjadwal, pengadaan unit baru Sharp/Daikin/Panasonic dengan teknisi tersertifikasi BNSP.'
    },
    {
      vendor_id: 'VEN-AC-02',
      name: 'PT Prima Dinamika Teknik AC',
      badge: 'Spesialis Heavy Duty & Lab',
      pic: 'Bpk. Supardi',
      phone: '0857-1122-3344',
      rating: 4.8,
      review_count: 52,
      sla: 'Layanan Darurat & Akhir Pekan',
      warranty: 'Garansi Sparepart Pabrik 6-12 Bulan',
      address: 'Komp. Ruko Niaga Graha Asri Blok C-12',
      description: 'Spesialis sistem AC ruang server, Lab Komputer, Aula Sekolah, dan pengadaan inverter komersial berkapasitas besar.'
    },
    {
      vendor_id: 'VEN-AC-03',
      name: 'Tim Teknisi Internal SARPRAS Yayasan',
      badge: 'Internal SARPRAS',
      pic: 'Bpk. Ridho (Admin Logistik & Sarpras)',
      phone: '0813-9988-2200',
      rating: 5.0,
      review_count: 120,
      sla: 'Penanganan Langsung Hari yang Sama (Same Day)',
      warranty: 'Perawatan Berkala Internal Sekolah',
      address: 'Gedung Workshop SARPRAS Al-Imam',
      description: 'Tim teknisi operasional SARPRAS Al-Imam untuk pembersihan filter mingguan, perbaikan darurat ringan, dan pengecekan kebocoran talang.'
    }
  ],

  // ==========================================
  // RENOVATION, MATERIAL & HANDYMAN MODULE DATA
  // ==========================================
  renov_pricing_catalogue: [
    {
      material_id: 'RNV-MAT-CAT-INT-20KG',
      name: 'Cat Tembok Interior Dulux / Catylac 20kg (Pail)',
      unit_price: 650000,
      category: 'Cat & Finishing',
      badge: 'Interior Utama',
      badge_color: 'bg-amber-100 text-amber-800',
      description: 'Cat interior bermutu tinggi anti lumut, warna cerah, daya tutup luas untuk ruang kelas & kantor.',
      icon: 'fa-paint-roller',
      image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80'
    },
    {
      material_id: 'RNV-MAT-CAT-EXT-20KG',
      name: 'Cat Exterior Weathershield 20kg (Pail)',
      unit_price: 1150000,
      category: 'Cat & Finishing',
      badge: 'Tahan Cuaca Luar',
      badge_color: 'bg-emerald-100 text-emerald-800',
      description: 'Cat luar gedung tahan panas hujan 5 tahun, anti jamur & flek untuk fasad depan dan pagar sekolah.',
      icon: 'fa-brush',
      image_url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80'
    },
    {
      material_id: 'RNV-MAT-SEMEN-50KG',
      name: 'Semen Tiga Roda / Holcim 50kg (Sak)',
      unit_price: 72000,
      category: 'Bahan Material Dasar',
      badge: 'Standar SNI',
      badge_color: 'bg-slate-100 text-slate-800',
      description: 'Semen portland serbaguna untuk plesteran dinding, cor pondasi, acian halus, dan pasang keramik.',
      icon: 'fa-cubes-stacked',
      image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'
    },
    {
      material_id: 'RNV-MAT-PASIR-RIT',
      name: 'Pasir Pasang / Cor Per Pick-up (Rit)',
      unit_price: 350000,
      category: 'Bahan Material Dasar',
      badge: 'Pasir Bangka Bersih',
      badge_color: 'bg-yellow-100 text-yellow-800',
      description: 'Pasir hitam/bangka ayakan halus tanpa lumpur untuk adukan plester dinding dan cor dak lantai.',
      icon: 'fa-truck-ramp-box',
      image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80'
    },
    {
      material_id: 'RNV-MAT-KERAMIK-40X40',
      name: 'Keramik Lantai 40x40 Dus (Mulia / Roman)',
      unit_price: 85000,
      category: 'Lantai & Dinding',
      badge: 'Anti Slip / Kasar',
      badge_color: 'bg-blue-100 text-blue-800',
      description: 'Keramik lantai motif batu/kasar anti slip untuk toilet siswa, teras kelas dan koridor.',
      icon: 'fa-border-all',
      image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80'
    },
    {
      material_id: 'RNV-MAT-KUAS-ROLL-SET',
      name: 'Perlengkapan Cat (Roll + Bak + Kuas + Thinner)',
      unit_price: 120000,
      category: 'Alat & Perlengkapan',
      badge: 'Paket Alat Cat',
      badge_color: 'bg-purple-100 text-purple-800',
      description: '1 Set roll cat bulu tebal 9 inch, bak cat tebal, kuas 3 & 4 inch, amplas dan thinner 1 liter.',
      icon: 'fa-fill-drip',
      image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80'
    },
    {
      material_id: 'RNV-LAB-TUKANG-HARIAN',
      name: 'Jasa Kepala Tukang Bangunan Harian',
      unit_price: 175000,
      category: 'Upah Tukang',
      badge: 'Tukang Ahli',
      badge_color: 'bg-orange-100 text-orange-800',
      description: 'Tenaga ahli pengerjaan plamir cat, pasang keramik, perbaikan plafon atap, perapian dinding.',
      icon: 'fa-user-gear',
      image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'
    },
    {
      material_id: 'RNV-LAB-KENEK-HARIAN',
      name: 'Jasa Pembantu Tukang / Kenek Harian',
      unit_price: 125000,
      category: 'Upah Tukang',
      badge: 'Tenaga Pembantu',
      badge_color: 'bg-slate-100 text-slate-800',
      description: 'Tenaga pembantu pengadukan semen pasir, pengamplasan dinding, angkut material, dan pembersihan lokasi.',
      icon: 'fa-person-digging',
      image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80'
    },
    {
      material_id: 'RNV-PKG-CAT-1KELAS',
      name: 'Paket Cat 1 Ruang Kelas Lengkap (Bahan + Borongan)',
      unit_price: 1850000,
      category: 'Paket Borongan',
      badge: 'Paket All-In',
      badge_color: 'bg-rose-100 text-rose-800',
      description: 'Pengecatan 1 ruang kelas (4 sisi dinding + plafon) termasuk 2 pail cat Dulux, plamir retak dan upah kerja.',
      icon: 'fa-school',
      image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80'
    },
    {
      material_id: 'RNV-PKG-REPAIR-PLAFON',
      name: 'Paket Perbaikan Plafon & Atap Bocor (Gypsum + Rangka)',
      unit_price: 950000,
      category: 'Paket Borongan',
      badge: 'Perbaikan Bocor',
      badge_color: 'bg-teal-100 text-teal-800',
      description: 'Penggantian lembaran gypsum 9mm basah akibat bocor, kompon sambungan, pengecatan dan sealing seng.',
      icon: 'fa-hammer',
      image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
    }
  ],

  renov_projects: [
    {
      project_id: 'PRJ-TK-01',
      unit_id: 'unit_tk',
      location_name: 'Pagar Depan & Area Bermain TK',
      category: 'Pengecatan Gedung / Kelas',
      budget_estimate: 3500000,
      progress_pct: 75,
      target_date: '2026-10-05',
      status: 'Dalam Pengerjaan',
      notes: 'Pengecatan pagar warna-warni ramah anak dan perbaikan ayunan.',
      created_at: '2026-09-20'
    },
    {
      project_id: 'PRJ-TK-02',
      unit_id: 'unit_tk',
      location_name: 'Sentra Bahan Alam & Selasar TK',
      category: 'Pekerjaan Sipil Lainnya',
      budget_estimate: 1800000,
      progress_pct: 100,
      target_date: '2026-09-20',
      status: 'Selesai',
      notes: 'Pemasangan paving block dan perapian selasar bermain.',
      created_at: '2026-09-10'
    },
    {
      project_id: 'PRJ-SD-01',
      unit_id: 'unit_sd',
      location_name: 'Dinding Kelas 1A, 1B & Koridor Lantai 1',
      category: 'Pengecatan Gedung / Kelas',
      budget_estimate: 5800000,
      progress_pct: 50,
      target_date: '2026-10-10',
      status: 'Dalam Pengerjaan',
      notes: 'Pengecatan ulang Dulux Catylac interior dan perapian plamir retak rambut.',
      created_at: '2026-09-22'
    },
    {
      project_id: 'PRJ-SD-02',
      unit_id: 'unit_sd',
      location_name: 'Toilet Siswa & Guru SD (Lantai 1)',
      category: 'Renovasi Toilet & Sanitasi',
      budget_estimate: 4200000,
      progress_pct: 25,
      target_date: '2026-10-15',
      status: 'Dalam Pengerjaan',
      notes: 'Penggantian keramik lantai anti slip, kran air dan perbaikan saluran pembuangan.',
      created_at: '2026-09-25'
    },
    {
      project_id: 'PRJ-SD-03',
      unit_id: 'unit_sd',
      location_name: 'Perbaikan Plafon Lab Komputer & Perpustakaan SD',
      category: 'Perbaikan Plafon & Atap',
      budget_estimate: 2500000,
      progress_pct: 100,
      target_date: '2026-09-18',
      status: 'Selesai',
      notes: 'Penggantian gypsum jebol akibat bocor talang air hujan.',
      created_at: '2026-09-12'
    },
    {
      project_id: 'PRJ-SMP-01',
      unit_id: 'unit_smp',
      location_name: 'Pengecatan Koridor & Kelas 7-9 SMP',
      category: 'Pengecatan Gedung / Kelas',
      budget_estimate: 6500000,
      progress_pct: 60,
      target_date: '2026-10-08',
      status: 'Dalam Pengerjaan',
      notes: 'Pengecatan dinding koridor utama dan pintu kelas SMP.',
      created_at: '2026-09-21'
    },
    {
      project_id: 'PRJ-SMP-02',
      unit_id: 'unit_smp',
      location_name: 'Renovasi Meja & Saluran Lab IPA SMP',
      category: 'Pekerjaan Sipil Lainnya',
      budget_estimate: 3200000,
      progress_pct: 0,
      target_date: '2026-10-25',
      status: 'Perencanaan',
      notes: 'Perbaikan bak cuci piring lab kimia dan keramik meja praktikum.',
      created_at: '2026-09-26'
    }
  ],

  renov_requests: [],

  renov_vendors: [
    {
      vendor_id: 'VEN-RNV-01',
      name: 'TB. Al-Imam Jaya Material (Toko Rekanan Utama)',
      badge: 'Toko Material Resmi',
      pic: 'H. Syamsudin',
      phone: '0812-7788-9900',
      rating: 4.9,
      review_count: 110,
      sla: 'Pengiriman < 4 Jam ke Sekolah',
      warranty: 'Jaminan Retur Barang Cacat/Rusak',
      address: 'Jl. Raya Condet No. 18, Jakarta Timur',
      description: 'Penyedia resmi bahan bangunan lengkap: Cat Dulux/Catylac/Mowilex, Semen Holcim/Tiga Roda, Pasir Bangka, Gypsum Elephant & perlengkapan tukang dengan faktur resmi sekolah.'
    },
    {
      vendor_id: 'VEN-RNV-02',
      name: 'CV Mandor Berkah Bangunan & Sipil',
      badge: 'Mandor & Jasa Borongan',
      pic: 'Bpk. Mandor Wardi',
      phone: '0858-2233-4455',
      rating: 4.8,
      review_count: 74,
      sla: 'Tenaga Kerja Siap H+1 Panggilan',
      warranty: 'Garansi Hasil Cat & Sipil 3 Bulan',
      address: 'Pusat Workshop Jl. Kramat Jati No. 8',
      description: 'Tim mandor dan tukang ahli spesialis pengecatan dinding tinggi, perbaikan atap bocor, instalasi keramik kamar mandi dan partisi gypsum sekolah Al-Imam.'
    },
    {
      vendor_id: 'VEN-RNV-03',
      name: 'TB. Mitra Bangunan Sejahtera (Sanitasi & Keramik)',
      badge: 'Spesialis Keramik & Pipa',
      pic: 'Bpk. Robert Wijaya',
      phone: '0813-4455-6677',
      rating: 4.9,
      review_count: 65,
      sla: 'Same Day Delivery',
      warranty: 'Garansi Keramik Presisi 100%',
      address: 'Jl. Otista Raya No. 102, Jakarta Timur',
      description: 'Distributor aneka motif keramik lantai anti slip, perlengkapan sanitasi Toto/American Standard, pipa PVC Rucika, dan kran wastafel sekolah.'
    }
  ],

  gas_api_url: 'https://script.google.com/macros/s/AKfycby5TTN97b6AXyo5YpwCE4jpJVCzq59pIqXQ968nAn8byIL7xRzWy6uyYWHBDuVS5svr/exec'
};

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeQuotes(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ==========================================
// 3. MAIN APP MVC OBJECT & CONTROLLER
// ==========================================
const app = {
  // State variables
  currentUser: null,
  activeView: 'dashboard',
  categoryFilter: 'ALL',
  searchQuery: '',
  cart: [],
  currentPrintDoc: null,
  currentPrintType: 'invoice',
  activeCmsTab: 'identity',
  
  // Dedicated AC Management State
  activeAcSubTab: 'services',
  acUnitFilter: 'all',
  acSearchQuery: '',
  editingAcId: null,
  
  // Dedicated Renovation, Paint, Material & Handyman Labor State
  activeRenovSubTab: 'materials',
  renovUnitFilter: 'all',
  renovSearchQuery: '',
  editingProjectId: null,
  
  // State for Care Unit Split & Approval Center
  careUnitSplitSdPercent: 50,
  careUnitSplitSmpPercent: 50,
  orderItemApprovals: {}, // orderId -> [true, true, ...]
  orderItemRevisions: {}, // orderId -> [{ unit_price, qty, original_unit_price, original_qty, is_revised, revision_reason }]
  pendingTransferProofs: {}, // orderId -> base64/url
  currentRevisionTarget: { orderId: null, itemIdx: null },
  editingOrderId: null,

  // Bulk Product Input State
  bulkProductRows: [],
  bulkProductActiveTab: 'grid',
  
  // Storage keys
  STORAGE_KEY: 'ECOMMERCE_ALIMAM_DATA_V4',
  AUTH_KEY: 'ECOMMERCE_ALIMAM_AUTH_USER_V4',

  // Initialize Application
  init() {
    this.loadState();
    this.applyThemeSettings();
    this.applyBrandingDOM();
    this.setupEventListeners();
    this.checkStockAlerts();
    this.populateCmsForm();
    this.navigate('dashboard');
    this.updateUI();
  },

  // Load state from localStorage or seed
  loadState() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) {
      try {
        this.db = JSON.parse(raw);
        if (!this.db.gas_api_url) {
          this.db.gas_api_url = INITIAL_DB.gas_api_url;
        }
      } catch (e) {
        this.db = JSON.parse(JSON.stringify(INITIAL_DB));
      }
    } else {
      this.db = JSON.parse(JSON.stringify(INITIAL_DB));
      this.saveState();
    }

    // Filter out legacy dummy orders, logs, and mock requests
    const dummyOrderIds = ['ORD-202609-001', 'ORD-202609-002', 'ORD-202609-003'];
    const dummyLogIds = ['LOG-202609-001'];
    const dummyAcReqIds = ['AC-REQ-202609-01-MOCK', 'AC-REQ-202609-02-MOCK', 'AC-REQ-202609-03-MOCK'];
    const dummyRnvReqIds = ['RNV-REQ-202609-01', 'RNV-REQ-202609-02', 'RNV-REQ-202609-03', 'RNV-REQ-202609-04'];

    if (this.db) {
      if (this.db.orders) {
        this.db.orders = this.db.orders.filter(o => !dummyOrderIds.includes(o.order_id));
      } else {
        this.db.orders = [];
      }
      if (this.db.transactions_log) {
        this.db.transactions_log = this.db.transactions_log.filter(l => !dummyLogIds.includes(l.log_id));
      } else {
        this.db.transactions_log = [];
      }
      if (this.db.ac_service_requests) {
        this.db.ac_service_requests = this.db.ac_service_requests.filter(r => !dummyAcReqIds.includes(r.request_id));
      } else {
        this.db.ac_service_requests = [];
      }
      if (this.db.renov_requests) {
        this.db.renov_requests = this.db.renov_requests.filter(r => !dummyRnvReqIds.includes(r.request_id));
      } else {
        this.db.renov_requests = [];
      }
    }

    // Sync seed real AC service requests if empty
    if (!this.db.ac_service_requests || this.db.ac_service_requests.length === 0) {
      this.db.ac_service_requests = JSON.parse(JSON.stringify(INITIAL_DB.ac_service_requests));
    }

    // Sync real AC asset inventory
    if (!this.db.ac_inventory || this.db.ac_inventory.length < INITIAL_DB.ac_inventory.length) {
      this.db.ac_inventory = JSON.parse(JSON.stringify(INITIAL_DB.ac_inventory));
    }

    // Sync seed orders and logs if empty
    if (!this.db.orders || this.db.orders.length === 0) {
      this.db.orders = JSON.parse(JSON.stringify(INITIAL_DB.orders));
    }
    if (!this.db.transactions_log || this.db.transactions_log.length === 0) {
      this.db.transactions_log = JSON.parse(JSON.stringify(INITIAL_DB.transactions_log));
    }

    // Ensure rapbs_breakdowns is present in db with all units
    if (!this.db.rapbs_breakdowns) {
      this.db.rapbs_breakdowns = JSON.parse(JSON.stringify(INITIAL_DB.rapbs_breakdowns));
    }
    if (!this.db.rapbs_breakdowns.unit_tk && INITIAL_DB.rapbs_breakdowns.unit_tk) {
      this.db.rapbs_breakdowns.unit_tk = JSON.parse(JSON.stringify(INITIAL_DB.rapbs_breakdowns.unit_tk));
    }
    if (!this.db.rapbs_breakdowns.unit_sd && INITIAL_DB.rapbs_breakdowns.unit_sd) {
      this.db.rapbs_breakdowns.unit_sd = JSON.parse(JSON.stringify(INITIAL_DB.rapbs_breakdowns.unit_sd));
    }
    if (!this.db.rapbs_breakdowns.unit_smp && INITIAL_DB.rapbs_breakdowns.unit_smp) {
      this.db.rapbs_breakdowns.unit_smp = JSON.parse(JSON.stringify(INITIAL_DB.rapbs_breakdowns.unit_smp));
    }

    // Ensure AC Management data structures exist in db
    if (!this.db.ac_pricing_catalogue || this.db.ac_pricing_catalogue.length === 0) {
      this.db.ac_pricing_catalogue = JSON.parse(JSON.stringify(INITIAL_DB.ac_pricing_catalogue));
    }
    if (!this.db.ac_vendors || this.db.ac_vendors.length === 0) {
      this.db.ac_vendors = JSON.parse(JSON.stringify(INITIAL_DB.ac_vendors));
    }

    // Ensure Renovation & Material data structures exist in db
    if (!this.db.renov_pricing_catalogue || this.db.renov_pricing_catalogue.length === 0) {
      this.db.renov_pricing_catalogue = JSON.parse(JSON.stringify(INITIAL_DB.renov_pricing_catalogue));
    }
    if (!this.db.renov_projects || this.db.renov_projects.length === 0) {
      this.db.renov_projects = JSON.parse(JSON.stringify(INITIAL_DB.renov_projects));
    }
    if (!this.db.renov_vendors || this.db.renov_vendors.length === 0) {
      this.db.renov_vendors = JSON.parse(JSON.stringify(INITIAL_DB.renov_vendors));
    }

    // Recalculate real RAPBS balance and realisasi from approved orders
    if (this.db && this.db.rapbs_poin) {
      this.db.rapbs_poin.forEach(r => {
        if (r.unit_id === 'unit_sd') r.total_plafond = 35884000;
        if (r.unit_id === 'unit_smp') r.total_plafond = 24506000;
        if (r.unit_id === 'unit_tk') r.total_plafond = 15000000;

        const approvedOrders = (this.db.orders || []).filter(o => o.unit_id === r.unit_id && o.status === 'Approved');
        r.terpakai = approvedOrders.reduce((acc, o) => acc + (Number(o.total_amount) || 0), 0);
        r.saldo_tersedia = r.total_plafond - r.terpakai;
      });
      this.saveState();
    }

    // Auto-update theme color to mint-emerald if on legacy default
    if (this.db && this.db.cms_settings && this.db.cms_settings.branding) {
      if (this.db.cms_settings.branding.primary_color === '#047857') {
        this.db.cms_settings.branding.primary_color = '#00a86b';
      }
    }

    // Filter out SMA (unit_sma) from existing localStorage state
    if (this.db) {
      if (this.db.users) this.db.users = this.db.users.filter(u => u.unit_id !== 'unit_sma');
      if (this.db.rapbs_poin) this.db.rapbs_poin = this.db.rapbs_poin.filter(r => r.unit_id !== 'unit_sma');
      if (this.db.ac_inventory) this.db.ac_inventory = this.db.ac_inventory.filter(a => a.unit_id !== 'unit_sma');
      if (this.db.renov_projects) this.db.renov_projects = this.db.renov_projects.filter(p => p.unit_id !== 'unit_sma');
      if (this.db.ac_service_requests) this.db.ac_service_requests = this.db.ac_service_requests.filter(r => r.unit_id !== 'unit_sma');
      if (this.db.renov_requests) this.db.renov_requests = this.db.renov_requests.filter(r => r.unit_id !== 'unit_sma');
    }

    // Synchronize newly added seed products to stock_inventory if missing
    if (this.db && this.db.stock_inventory) {
      INITIAL_DB.stock_inventory.forEach(seedItem => {
        const exists = this.db.stock_inventory.some(existing => existing.product_name === seedItem.product_name);
        if (!exists) {
          this.db.stock_inventory.push(JSON.parse(JSON.stringify(seedItem)));
        }
      });
    }

    // Ensure existing cached stock items have image_url if available
    if (this.db && this.db.stock_inventory) {
      this.db.stock_inventory.forEach(item => {
        if (!item.image_url) {
          const seedMatch = INITIAL_DB.stock_inventory.find(s => s.product_name === item.product_name && s.image_url);
          if (seedMatch) {
            item.image_url = seedMatch.image_url;
          } else {
            const photoMatch = CURATED_PRODUCT_PHOTOS.find(p => {
              const tokens = item.product_name.toLowerCase().split(/\s+/);
              return tokens.some(t => p.keywords.some(k => k.includes(t) || t.includes(k)));
            });
            if (photoMatch) item.image_url = photoMatch.image;
          }
        }
      });
    }

    // Load active user
    const savedUser = localStorage.getItem(this.AUTH_KEY);
    if (savedUser && this.db.users.find(u => u.unit_id === savedUser)) {
      this.currentUser = this.db.users.find(u => u.unit_id === savedUser);
    } else {
      this.currentUser = this.db.users.find(u => u.unit_id === 'unit_sd') || this.db.users[0];
      localStorage.setItem(this.AUTH_KEY, this.currentUser.unit_id);
    }

    // Set today's date on date inputs
    const todayStr = new Date().toISOString().split('T')[0];
    const reimbDate = document.getElementById('reimbDate');
    const restockDate = document.getElementById('restockDateIn');
    if (reimbDate) reimbDate.value = todayStr;
    if (restockDate) restockDate.value = todayStr;

    // Load GAS API URL input if configured
    const gasInput = document.getElementById('gasEndpointUrl');
    if (gasInput && this.db.gas_api_url) {
      gasInput.value = this.db.gas_api_url;
    }
  },

  saveState() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.db));
  },

  // ==========================================
  // 4. DYNAMIC THEME & BRANDING INJECTOR
  // ==========================================

  // Apply CSS Variables at runtime
  applyThemeSettings() {
    const cms = this.db.cms_settings || DEFAULT_CMS_SETTINGS;
    const branding = cms.branding || DEFAULT_CMS_SETTINGS.branding;
    const root = document.documentElement;

    const primaryHex = branding.primary_color || '#00a86b';
    const accentHex = branding.accent_color || '#d97706';

    // Helper to generate color tints
    const adjustColor = (hex, percent) => {
      const num = parseInt(hex.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    };

    root.style.setProperty('--primary-50', '#eefbf6');
    root.style.setProperty('--primary-100', '#d5f5e8');
    root.style.setProperty('--primary-200', '#abebd1');
    root.style.setProperty('--primary-500', '#10b981');
    root.style.setProperty('--primary-600', primaryHex);
    root.style.setProperty('--primary-700', adjustColor(primaryHex, -8));
    root.style.setProperty('--primary-800', adjustColor(primaryHex, -20));
    root.style.setProperty('--primary-900', adjustColor(primaryHex, -35));

    root.style.setProperty('--accent-500', accentHex);
    root.style.setProperty('--accent-600', adjustColor(accentHex, -10));
    root.style.setProperty('--accent-700', adjustColor(accentHex, -25));

    root.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${primaryHex} 0%, ${adjustColor(primaryHex, -10)} 60%, ${adjustColor(primaryHex, -25)} 100%)`);
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${accentHex} 0%, ${adjustColor(accentHex, 15)} 50%, ${adjustColor(accentHex, -15)} 100%)`);
    root.style.setProperty('--canvas-gradient', `linear-gradient(135deg, #edf9f4 0%, #e2f6ee 50%, #d8f2e7 100%)`);

    if (branding.font_family) {
      root.style.setProperty('--font-base', `'${branding.font_family}', sans-serif`);
      root.style.setProperty('--font-heading', `'${branding.font_family}', sans-serif`);
    }

    if (branding.border_radius) {
      root.style.setProperty('--app-radius', branding.border_radius);
    }
  },

  // Update DOM text and logos from CMS Settings
  applyBrandingDOM() {
    const cms = this.db.cms_settings || DEFAULT_CMS_SETTINGS;
    const branding = cms.branding || DEFAULT_CMS_SETTINGS.branding;

    // 1. Page Title & Meta
    document.title = `${cms.app_name} ${cms.system_badge} - ${cms.school_name}`;
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) pageTitle.textContent = `${cms.app_name} ${cms.system_badge} - ${cms.school_name}`;

    // 2. Navigation Branding
    const navSchoolName = document.getElementById('navBrandSchoolName');
    const navBadge = document.getElementById('navBrandSystemBadge');
    const navTagline = document.getElementById('navBrandTagline');
    
    if (navSchoolName) navSchoolName.textContent = cms.app_name;
    if (navBadge) navBadge.textContent = cms.system_badge || 'SARPRAS';
    if (navTagline) navTagline.textContent = cms.tagline;

    // 3. Navigation Logo (Icon vs Image)
    const navIcon = document.getElementById('navBrandIcon');
    const navImg = document.getElementById('navBrandImg');
    const dashWatermark = document.getElementById('dashWatermarkIcon');

    if (branding.logo_mode === 'image' && branding.logo_image) {
      if (navIcon) navIcon.classList.add('hidden');
      if (navImg) {
        navImg.src = branding.logo_image;
        navImg.classList.remove('hidden');
      }
    } else {
      if (navImg) navImg.classList.add('hidden');
      if (navIcon) {
        navIcon.className = `fa-solid ${branding.logo_icon || 'fa-mosque'} text-lg`;
        navIcon.classList.remove('hidden');
      }
    }

    if (dashWatermark) {
      dashWatermark.className = `fa-solid ${branding.logo_icon || 'fa-mosque'} text-[220px]`;
    }

    // 4. Dashboard Banners & Rules
    const dashSchool = document.getElementById('dashSchoolNameBanner');
    const dashRules = document.getElementById('dashRulesFoundationName');
    const footerSchool = document.getElementById('footerSchoolName');

    if (dashSchool) dashSchool.textContent = cms.school_name;
    if (dashRules) dashRules.textContent = `Aturan ${cms.foundation_name}`;
    if (footerSchool) footerSchool.textContent = `${cms.app_name} ${cms.system_badge} ${cms.school_name}`;
  },

  // Setup DOM listeners
  setupEventListeners() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
      });
    }

    document.addEventListener('click', (e) => {
      const menu = document.getElementById('userMenuDropdown');
      const btn = document.getElementById('userMenuBtn');
      if (menu && !menu.classList.contains('hidden')) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
          menu.classList.add('hidden');
        }
      }
    });
  },

  toggleUserMenu() {
    const menu = document.getElementById('userMenuDropdown');
    if (menu) menu.classList.toggle('hidden');
  },

  switchUser(unitId) {
    const user = this.db.users.find(u => u.unit_id === unitId);
    if (!user) return;
    this.currentUser = user;
    localStorage.setItem(this.AUTH_KEY, user.unit_id);
    
    const menu = document.getElementById('userMenuDropdown');
    if (menu) menu.classList.add('hidden');

    this.showToast(`Berhasil beralih akun: ${user.unit_name}`, 'success');
    this.updateUI();
    
    if (user.role === 'Bendahara' && this.activeView === 'verification') {
      this.renderVerificationView();
    } else {
      this.navigate(this.activeView);
    }
  },

  // Single Page View Router
  navigate(viewName) {
    this.activeView = viewName;

    const views = ['dashboard', 'catalog', 'reimburse', 'custom-request', 'ac-service', 'renov-material', 'orders', 'verification', 'inventory', 'ledger', 'cms'];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.classList.add('hidden');
      
      const navBtn = document.getElementById(`nav-${v}`);
      if (navBtn) navBtn.classList.remove('nav-tab-active');
    });

    const activeEl = document.getElementById(`view-${viewName}`);
    if (activeEl) activeEl.classList.remove('hidden');

    const activeNav = document.getElementById(`nav-${viewName}`);
    if (activeNav) activeNav.classList.add('nav-tab-active');

    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth < 1024) {
      sidebar.classList.add('hidden');
    }

    switch (viewName) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'catalog':
        this.renderCatalog();
        break;
      case 'ac-service':
        this.renderAcServiceView();
        break;
      case 'renov-material':
        this.renderRenovServiceView();
        break;
      case 'orders':
        this.renderOrdersTable();
        break;
      case 'verification':
        this.renderVerificationView();
        break;
      case 'inventory':
        this.renderInventoryTable();
        break;
      case 'ledger':
        this.renderLedgerTable();
        break;
      case 'cms':
        this.populateCmsForm();
        this.renderCmsUnitsTable();
        break;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Update Global Header & User info
  updateUI() {
    const isBendahara = this.currentUser.role === 'Bendahara';
    const isAdmin = this.currentUser.role === 'Admin';
    const isUnit = this.currentUser.role === 'Unit';

    document.getElementById('userNameDisplay').textContent = this.currentUser.unit_name;
    document.getElementById('userRoleDisplay').textContent = this.currentUser.role;
    document.getElementById('dropdownFullName').textContent = this.currentUser.unit_name;
    
    let avatarText = this.db.cms_settings.branding.logo_short || 'AI';
    if (this.currentUser.unit_id === 'unit_tk') avatarText = 'TK';
    else if (this.currentUser.unit_id === 'unit_sd') avatarText = 'SD';
    else if (this.currentUser.unit_id === 'unit_smp') avatarText = 'SMP';
    else if (this.currentUser.unit_id === 'bendahara') avatarText = 'BY';
    else if (this.currentUser.unit_id === 'admin') avatarText = 'ADM';
    document.getElementById('userAvatar').textContent = avatarText;

    const userRapbs = this.db.rapbs_poin.find(r => r.unit_id === this.currentUser.unit_id) || {
      total_plafond: 0, terpakai: 0, saldo_tersedia: 0
    };

    const navPill = document.getElementById('unitQuotaPill');
    const sidebarCard = document.getElementById('sidebarSaldoCard');
    
    if (isUnit) {
      if (navPill) navPill.classList.remove('hidden');
      if (sidebarCard) sidebarCard.classList.remove('hidden');
      
      document.getElementById('navSaldoPoin').textContent = this.formatNumber(userRapbs.saldo_tersedia);
      document.getElementById('navUnitName').textContent = this.currentUser.unit_name;
      
      document.getElementById('sidebarSaldoTersedia').textContent = 'Rp ' + this.formatNumber(userRapbs.saldo_tersedia);
      document.getElementById('sidebarTerpakai').textContent = 'Rp ' + this.formatNumber(userRapbs.terpakai);
      document.getElementById('sidebarTotalPlafond').textContent = 'Rp ' + this.formatNumber(userRapbs.total_plafond);
      
      const pct = userRapbs.total_plafond > 0 ? (userRapbs.terpakai / userRapbs.total_plafond) * 100 : 0;
      document.getElementById('sidebarProgressBar').style.width = Math.min(100, Math.round(pct)) + '%';
    } else {
      if (navPill) navPill.classList.remove('hidden');
      const totalAllAvailable = this.db.rapbs_poin.reduce((acc, r) => acc + r.saldo_tersedia, 0);
      document.getElementById('navSaldoPoin').textContent = this.formatNumber(totalAllAvailable);
      document.getElementById('navUnitName').textContent = 'Total Kas RAPBS';
      
      if (sidebarCard) {
        sidebarCard.classList.remove('hidden');
        document.getElementById('sidebarSaldoTersedia').textContent = 'Rp ' + this.formatNumber(totalAllAvailable);
        const totalUsed = this.db.rapbs_poin.reduce((acc, r) => acc + r.terpakai, 0);
        const totalCap = this.db.rapbs_poin.reduce((acc, r) => acc + r.total_plafond, 0);
        document.getElementById('sidebarTerpakai').textContent = 'Rp ' + this.formatNumber(totalUsed);
        document.getElementById('sidebarTotalPlafond').textContent = 'Rp ' + this.formatNumber(totalCap);
        const pct = totalCap > 0 ? (totalUsed / totalCap) * 100 : 0;
        document.getElementById('sidebarProgressBar').style.width = Math.min(100, Math.round(pct)) + '%';
      }
    }

    const adminSection = document.getElementById('adminNavSection');
    if (adminSection) adminSection.classList.remove('hidden');

    const isStaff = this.currentUser.role === 'Admin' || this.currentUser.role === 'Bendahara';
    const catalogAdminBadge = document.getElementById('catalogAdminBadge');
    const btnAdminAddProductCatalog = document.getElementById('btnAdminAddProductCatalog');
    if (catalogAdminBadge) {
      if (isStaff) catalogAdminBadge.classList.remove('hidden');
      else catalogAdminBadge.classList.add('hidden');
    }
    if (btnAdminAddProductCatalog) {
      if (isStaff) btnAdminAddProductCatalog.classList.remove('hidden');
      else btnAdminAddProductCatalog.classList.add('hidden');
    }

    const pendingOrders = this.db.orders.filter(o => o.status === 'Pending_Verification');
    const pendingBadge = document.getElementById('pendingApprovalBadge');
    if (pendingBadge) pendingBadge.textContent = pendingOrders.length;
    
    const verifPendingHeader = document.getElementById('verifPendingCountHeader');
    if (verifPendingHeader) verifPendingHeader.textContent = `${pendingOrders.length} Pengajuan`;

    const apiBadge = document.getElementById('apiStatusBadge');
    const apiText = document.getElementById('apiStatusText');
    if (this.db.gas_api_url && this.db.gas_api_url.trim() !== '') {
      if (apiBadge) apiBadge.className = 'flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition border border-emerald-300 bg-emerald-50 text-emerald-800';
      if (apiText) apiText.textContent = 'Mode: GAS Live';
    } else {
      if (apiBadge) apiBadge.className = 'flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition border border-amber-300 bg-amber-50 text-amber-800';
      if (apiText) apiText.textContent = 'Mode: Simulasi';
    }

    this.updateCartCount();
  },

  // ==========================================
  // 5. CMS & BRANDING STUDIO CONTROLLERS
  // ==========================================

  switchCmsTab(tabId) {
    this.activeCmsTab = tabId;
    const tabs = ['identity', 'logo', 'theme', 'units', 'presets'];
    
    tabs.forEach(t => {
      const el = document.getElementById(`cmsSubTab-${t}`);
      const btn = document.getElementById(`cmsTabBtn-${t}`);
      if (el) el.classList.add('hidden');
      if (btn) {
        btn.className = 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition flex items-center space-x-2 shrink-0';
      }
    });

    const activeEl = document.getElementById(`cmsSubTab-${tabId}`);
    const activeBtn = document.getElementById(`cmsTabBtn-${tabId}`);
    if (activeEl) activeEl.classList.remove('hidden');
    if (activeBtn) {
      activeBtn.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 transition flex items-center space-x-2 shrink-0';
    }

    if (tabId === 'units') this.renderCmsUnitsTable();
  },

  populateCmsForm() {
    const cms = this.db.cms_settings || DEFAULT_CMS_SETTINGS;
    const branding = cms.branding || DEFAULT_CMS_SETTINGS.branding;

    // Identitas
    document.getElementById('cmsFoundationName').value = cms.foundation_name || '';
    document.getElementById('cmsSchoolName').value = cms.school_name || '';
    document.getElementById('cmsAppName').value = cms.app_name || '';
    document.getElementById('cmsTagline').value = cms.tagline || '';
    document.getElementById('cmsAddress').value = cms.address || '';
    document.getElementById('cmsPhone').value = cms.phone || '';
    document.getElementById('cmsEmail').value = cms.email || '';

    // Pejabat TTD
    const signers = cms.signers || DEFAULT_CMS_SETTINGS.signers;
    document.getElementById('cmsSignerKaurName').value = signers.kaur_name || '';
    document.getElementById('cmsSignerKaurTitle').value = signers.kaur_title || '';
    document.getElementById('cmsSignerBendaharaName').value = signers.bendahara_name || '';
    document.getElementById('cmsSignerBendaharaTitle').value = signers.bendahara_title || '';
    document.getElementById('cmsSignerLeaderName').value = signers.leader_name || '';
    document.getElementById('cmsSignerLeaderTitle').value = signers.leader_title || '';

    // Logo Mode
    this.toggleLogoMode(branding.logo_mode || 'icon');
    document.getElementById('cmsLogoShort').value = branding.logo_short || 'AI';
    
    // Logo Preview Image
    const previewImg = document.getElementById('cmsLogoPreviewImg');
    const placeholder = document.getElementById('cmsLogoPreviewPlaceholder');
    const removeBtn = document.getElementById('btnRemoveLogoImg');
    if (branding.logo_image) {
      if (previewImg) { previewImg.src = branding.logo_image; previewImg.classList.remove('hidden'); }
      if (placeholder) placeholder.classList.add('hidden');
      if (removeBtn) removeBtn.classList.remove('hidden');
    } else {
      if (previewImg) previewImg.classList.add('hidden');
      if (placeholder) placeholder.classList.remove('hidden');
      if (removeBtn) removeBtn.classList.add('hidden');
    }

    // Render Vector Icons Grid
    this.renderCmsIconsGrid(branding.logo_icon || 'fa-mosque');

    // Theme & Colors
    document.getElementById('cmsColorPrimaryPicker').value = branding.primary_color || '#047857';
    document.getElementById('cmsColorPrimaryHex').value = branding.primary_color || '#047857';
    document.getElementById('cmsColorAccentPicker').value = branding.accent_color || '#d97706';
    document.getElementById('cmsColorAccentHex').value = branding.accent_color || '#d97706';
    document.getElementById('cmsFontFamily').value = branding.font_family || 'Plus Jakarta Sans';
    document.getElementById('cmsBorderRadius').value = branding.border_radius || '1.5rem';
  },

  toggleLogoMode(mode) {
    const radioIcon = document.getElementById('logoModeIcon');
    const radioImg = document.getElementById('logoModeImage');
    const imgContainer = document.getElementById('cmsImageUploadContainer');
    const iconContainer = document.getElementById('cmsIconPickerContainer');

    if (mode === 'image') {
      if (radioImg) radioImg.checked = true;
      if (imgContainer) imgContainer.classList.remove('hidden');
      if (iconContainer) iconContainer.classList.add('hidden');
    } else {
      if (radioIcon) radioIcon.checked = true;
      if (imgContainer) imgContainer.classList.add('hidden');
      if (iconContainer) iconContainer.classList.remove('hidden');
    }

    this.db.cms_settings.branding.logo_mode = mode;
  },

  renderCmsIconsGrid(selectedIcon) {
    const container = document.getElementById('cmsIconGrid');
    if (!container) return;

    container.innerHTML = AVAILABLE_ICONS.map(i => {
      const isSelected = i.icon === selectedIcon;
      return `
        <div onclick="app.selectCmsIcon('${i.icon}')" class="p-3 rounded-2xl border-2 text-center cursor-pointer transition ${isSelected ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold' : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'}">
          <i class="fa-solid ${i.icon} text-2xl mb-1 block"></i>
          <span class="text-[10px] block truncate">${i.label}</span>
        </div>
      `;
    }).join('');
  },

  selectCmsIcon(iconName) {
    this.db.cms_settings.branding.logo_icon = iconName;
    this.renderCmsIconsGrid(iconName);
    this.applyBrandingDOM();
  },

  handleCmsLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      this.db.cms_settings.branding.logo_image = base64;
      this.db.cms_settings.branding.logo_mode = 'image';
      
      const previewImg = document.getElementById('cmsLogoPreviewImg');
      const placeholder = document.getElementById('cmsLogoPreviewPlaceholder');
      const removeBtn = document.getElementById('btnRemoveLogoImg');
      
      if (previewImg) { previewImg.src = base64; previewImg.classList.remove('hidden'); }
      if (placeholder) placeholder.classList.add('hidden');
      if (removeBtn) removeBtn.classList.remove('hidden');

      this.applyBrandingDOM();
      this.showToast('Logo sekolah berhasil diupload!', 'success');
    };
    reader.readAsDataURL(file);
  },

  removeCmsLogoImage() {
    this.db.cms_settings.branding.logo_image = '';
    this.db.cms_settings.branding.logo_mode = 'icon';
    this.toggleLogoMode('icon');
    
    const previewImg = document.getElementById('cmsLogoPreviewImg');
    const placeholder = document.getElementById('cmsLogoPreviewPlaceholder');
    const removeBtn = document.getElementById('btnRemoveLogoImg');

    if (previewImg) previewImg.classList.add('hidden');
    if (placeholder) placeholder.classList.remove('hidden');
    if (removeBtn) removeBtn.classList.add('hidden');

    this.applyBrandingDOM();
    this.showToast('Logo gambar dihapus. Beralih ke icon simbol.', 'info');
  },

  applyThemePreset(presetKey) {
    const preset = THEME_PRESETS[presetKey];
    if (!preset) return;

    this.db.cms_settings.branding.theme_preset = presetKey;
    this.db.cms_settings.branding.primary_color = preset.primary;
    this.db.cms_settings.branding.accent_color = preset.accent;

    document.getElementById('cmsColorPrimaryPicker').value = preset.primary;
    document.getElementById('cmsColorPrimaryHex').value = preset.primary;
    document.getElementById('cmsColorAccentPicker').value = preset.accent;
    document.getElementById('cmsColorAccentHex').value = preset.accent;

    this.applyThemeSettings();
    this.showToast(`Tema diterapkan: ${preset.name}`, 'success');
  },

  updatePrimaryColorFromPicker(hex) {
    document.getElementById('cmsColorPrimaryHex').value = hex;
    this.db.cms_settings.branding.primary_color = hex;
    this.applyThemeSettings();
  },

  updatePrimaryColorFromHex(hex) {
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      document.getElementById('cmsColorPrimaryPicker').value = hex;
      this.db.cms_settings.branding.primary_color = hex;
      this.applyThemeSettings();
    }
  },

  updateAccentColorFromPicker(hex) {
    document.getElementById('cmsColorAccentHex').value = hex;
    this.db.cms_settings.branding.accent_color = hex;
    this.applyThemeSettings();
  },

  updateAccentColorFromHex(hex) {
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      document.getElementById('cmsColorAccentPicker').value = hex;
      this.db.cms_settings.branding.accent_color = hex;
      this.applyThemeSettings();
    }
  },

  updateFontFamily(font) {
    this.db.cms_settings.branding.font_family = font;
    this.applyThemeSettings();
  },

  updateBorderRadius(radius) {
    this.db.cms_settings.branding.border_radius = radius;
    this.applyThemeSettings();
  },

  // Save all CMS settings
  saveCmsSettings() {
    const cms = this.db.cms_settings;

    cms.foundation_name = document.getElementById('cmsFoundationName').value.trim();
    cms.school_name = document.getElementById('cmsSchoolName').value.trim();
    cms.app_name = document.getElementById('cmsAppName').value.trim();
    cms.tagline = document.getElementById('cmsTagline').value.trim();
    cms.address = document.getElementById('cmsAddress').value.trim();
    cms.phone = document.getElementById('cmsPhone').value.trim();
    cms.email = document.getElementById('cmsEmail').value.trim();

    cms.signers.kaur_name = document.getElementById('cmsSignerKaurName').value.trim();
    cms.signers.kaur_title = document.getElementById('cmsSignerKaurTitle').value.trim();
    cms.signers.bendahara_name = document.getElementById('cmsSignerBendaharaName').value.trim();
    cms.signers.bendahara_title = document.getElementById('cmsSignerBendaharaTitle').value.trim();
    cms.signers.leader_name = document.getElementById('cmsSignerLeaderName').value.trim();
    cms.signers.leader_title = document.getElementById('cmsSignerLeaderTitle').value.trim();

    cms.branding.logo_short = document.getElementById('cmsLogoShort').value.trim().toUpperCase() || 'AI';
    cms.branding.primary_color = document.getElementById('cmsColorPrimaryHex').value.trim();
    cms.branding.accent_color = document.getElementById('cmsColorAccentHex').value.trim();
    cms.branding.font_family = document.getElementById('cmsFontFamily').value;
    cms.branding.border_radius = document.getElementById('cmsBorderRadius').value;

    this.saveState();
    this.applyThemeSettings();
    this.applyBrandingDOM();
    this.updateUI();

    this.showToast('Semua perubahan CMS & Branding BERHASIL disimpan!', 'success');
  },

  // Export JSON Config
  exportBrandingConfig() {
    const config = {
      cms_settings: this.db.cms_settings,
      users: this.db.users,
      rapbs_poin: this.db.rapbs_poin,
      exported_at: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const schoolSlug = (this.db.cms_settings.school_name || 'Client').toLowerCase().replace(/[^a-z0-9]/g, '_');
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `branding_config_${schoolSlug}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();

    this.showToast('File konfigurasi branding berhasil didownload!', 'success');
  },

  // Import JSON Config
  importBrandingConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.cms_settings) {
          this.db.cms_settings = imported.cms_settings;
          if (imported.users) this.db.users = imported.users;
          if (imported.rapbs_poin) this.db.rapbs_poin = imported.rapbs_poin;

          this.saveState();
          this.applyThemeSettings();
          this.applyBrandingDOM();
          this.populateCmsForm();
          this.updateUI();
          this.showToast('Konfigurasi client berhasil di-import!', 'success');
        } else {
          this.showToast('Format file JSON tidak valid.', 'error');
        }
      } catch (err) {
        this.showToast('Gagal membaca file JSON.', 'error');
      }
    };
    reader.readAsText(file);
  },

  resetCmsToDefault() {
    if (confirm('Kembalikan seluruh identitas dan tema ke standar Al-Imam?')) {
      this.db.cms_settings = JSON.parse(JSON.stringify(DEFAULT_CMS_SETTINGS));
      this.saveState();
      this.applyThemeSettings();
      this.applyBrandingDOM();
      this.populateCmsForm();
      this.updateUI();
      this.showToast('CMS berhasil direset ke Default Al-Imam.', 'info');
    }
  },

  // ==========================================
  // 6. UNIT MANAGER CONTROLLERS
  // ==========================================

  renderCmsUnitsTable() {
    const tbody = document.getElementById('cmsUnitsTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.db.rapbs_poin.map(r => {
      const u = this.db.users.find(user => user.unit_id === r.unit_id) || { unit_name: r.unit_id };
      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="px-4 py-3 font-mono font-bold text-slate-700">${r.unit_id}</td>
          <td class="px-4 py-3 font-bold text-slate-800">${u.unit_name}</td>
          <td class="px-4 py-3 font-extrabold text-slate-900">Rp ${this.formatNumber(r.total_plafond)}</td>
          <td class="px-4 py-3 text-slate-600">Rp ${this.formatNumber(r.terpakai)}</td>
          <td class="px-4 py-3 font-bold text-brand-primary">Rp ${this.formatNumber(r.saldo_tersedia)}</td>
          <td class="px-4 py-3 text-center space-x-1.5 whitespace-nowrap">
            <button onclick="app.openRapbsBreakdownModal('${r.unit_id}')" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition inline-flex items-center">
              <i class="fa-solid fa-list-check mr-1"></i>Rincian Pos
            </button>
            <button onclick="app.editUnitPlafond('${r.unit_id}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition inline-flex items-center">
              <i class="fa-solid fa-pen-to-square mr-1"></i>Edit Plafon
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  openAddUnitModal() {
    document.getElementById('unitModalId').value = '';
    document.getElementById('unitModalName').value = '';
    document.getElementById('unitModalPlafond').value = '';
    document.getElementById('unitModal').classList.remove('hidden');
  },

  closeUnitModal() {
    document.getElementById('unitModal').classList.add('hidden');
  },

  handleSaveUnit(event) {
    event.preventDefault();
    const id = document.getElementById('unitModalId').value.trim().toLowerCase().replace(/\s+/g, '_');
    const name = document.getElementById('unitModalName').value.trim();
    const plafond = Number(document.getElementById('unitModalPlafond').value);

    // Check if user exists
    let existingUser = this.db.users.find(u => u.unit_id === id);
    if (!existingUser) {
      this.db.users.push({
        unit_id: id,
        username: id,
        unit_name: name,
        role: 'Unit'
      });
    } else {
      existingUser.unit_name = name;
    }

    // Check if rapbs entry exists
    let existingRapbs = this.db.rapbs_poin.find(r => r.unit_id === id);
    if (!existingRapbs) {
      this.db.rapbs_poin.push({
        unit_id: id,
        total_plafond: plafond,
        terpakai: 0,
        saldo_tersedia: plafond,
        updated_at: this.formatCurrentDateTime()
      });
    } else {
      existingRapbs.total_plafond = plafond;
      existingRapbs.saldo_tersedia = plafond - existingRapbs.terpakai;
      existingRapbs.updated_at = this.formatCurrentDateTime();
    }

    this.saveState();
    this.closeUnitModal();
    this.renderCmsUnitsTable();
    this.updateUI();
    this.showToast(`Unit ${name} berhasil disimpan!`, 'success');
  },

  editUnitPlafond(unitId) {
    const rapbs = this.db.rapbs_poin.find(r => r.unit_id === unitId);
    const user = this.db.users.find(u => u.unit_id === unitId);
    if (!rapbs) return;

    const newPlafondStr = prompt(`Ubah Total Plafon Anggaran untuk ${user ? user.unit_name : unitId} (Rp):`, rapbs.total_plafond);
    if (newPlafondStr && !isNaN(newPlafondStr)) {
      const newPlafond = Number(newPlafondStr);
      rapbs.total_plafond = newPlafond;
      rapbs.saldo_tersedia = newPlafond - rapbs.terpakai;
      rapbs.updated_at = this.formatCurrentDateTime();

      this.saveState();
      this.renderCmsUnitsTable();
      this.updateUI();
      this.showToast('Plafon berhasil diperbarui!', 'success');
    }
  },

  // ==========================================
  // 7. INVENTORY & FIFO ENGINE
  // ==========================================
  
  getAggregatedProducts() {
    const map = {};

    this.db.stock_inventory.forEach(item => {
      if (!map[item.product_name]) {
        map[item.product_name] = {
          name: item.product_name,
          category: item.category,
          image_url: item.image_url || '',
          total_stock: 0,
          earliest_price: item.unit_price,
          latest_price: item.unit_price,
          batches: []
        };
      } else if (!map[item.product_name].image_url && item.image_url) {
        map[item.product_name].image_url = item.image_url;
      }

      if (item.status === 'Active' && item.stock_qty > 0) {
        map[item.product_name].total_stock += Number(item.stock_qty);
        map[item.product_name].batches.push(item);
      }
    });

    Object.values(map).forEach(prod => {
      prod.batches.sort((a, b) => new Date(a.date_in) - new Date(b.date_in));
      if (prod.batches.length > 0) {
        prod.earliest_price = prod.batches[0].unit_price;
        prod.latest_price = prod.batches[prod.batches.length - 1].unit_price;
      }
    });

    return Object.values(map);
  },

  checkStockAlerts() {
    const products = this.getAggregatedProducts();
    const zeroStock = products.filter(p => p.total_stock === 0);
    const lowStock = products.filter(p => p.total_stock > 0 && p.total_stock <= 5);

    const alertBanner = document.getElementById('dashboardAlertBanner');
    const lowStockBadge = document.getElementById('lowStockNavBadge');

    if (zeroStock.length > 0 || lowStock.length > 0) {
      if (lowStockBadge) lowStockBadge.classList.remove('hidden');

      if (alertBanner) {
        alertBanner.classList.remove('hidden');
        alertBanner.innerHTML = `
          <div class="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start justify-between shadow-sm">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center text-sm shrink-0 mt-0.5">
                <i class="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div>
                <h4 class="text-xs font-bold text-red-900 uppercase tracking-wide">Peringatan Stok SARPRAS Kritis</h4>
                <p class="text-xs text-red-700 mt-0.5">
                  Terdapat <b>${zeroStock.length} barang habis</b> dan <b>${lowStock.length} barang menipis</b> di gudang logistik.
                </p>
                <div class="mt-2 flex flex-wrap gap-1.5">
                  ${zeroStock.map(z => `<span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded border border-red-200">${z.name} (Stok: 0)</span>`).join('')}
                  ${lowStock.map(l => `<span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">${l.name} (Sisa: ${l.total_stock})</span>`).join('')}
                </div>
              </div>
            </div>
            <button onclick="app.openRestockModal()" class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shrink-0 ml-3 transition">
              <i class="fa-solid fa-plus mr-1"></i>Restock Sekarang
            </button>
          </div>
        `;
      }
    } else {
      if (alertBanner) alertBanner.classList.add('hidden');
      if (lowStockBadge) lowStockBadge.classList.add('hidden');
    }
  },

  deductStockFIFO(productName, qtyRequested) {
    let remainingToDeduct = Number(qtyRequested);
    
    const batches = this.db.stock_inventory
      .filter(item => item.product_name === productName && item.status === 'Active' && item.stock_qty > 0)
      .sort((a, b) => new Date(a.date_in) - new Date(b.date_in));

    for (let batch of batches) {
      if (remainingToDeduct <= 0) break;

      if (batch.stock_qty <= remainingToDeduct) {
        remainingToDeduct -= batch.stock_qty;
        batch.stock_qty = 0;
        batch.status = 'Empty';
      } else {
        batch.stock_qty -= remainingToDeduct;
        remainingToDeduct = 0;
      }
    }

    this.saveState();
    return remainingToDeduct === 0;
  },

  // ==========================================
  // 8. VIEW RENDERERS (DASHBOARD, CATALOG, ETC.)
  // ==========================================

  renderDashboard() {
    const isUnit = this.currentUser.role === 'Unit';
    const userRapbs = this.db.rapbs_poin.find(r => r.unit_id === this.currentUser.unit_id) || {
      total_plafond: 0, terpakai: 0, saldo_tersedia: 0
    };

    document.getElementById('dashUnitNameGreeting').textContent = this.currentUser.unit_name;
    
    if (isUnit) {
      document.getElementById('metricTotalPlafond').textContent = 'Rp ' + this.formatNumber(userRapbs.total_plafond);
      document.getElementById('metricTerpakai').textContent = 'Rp ' + this.formatNumber(userRapbs.terpakai);
      document.getElementById('metricSaldoTersedia').textContent = 'Rp ' + this.formatNumber(userRapbs.saldo_tersedia);
      
      const pct = userRapbs.total_plafond > 0 ? ((userRapbs.terpakai / userRapbs.total_plafond) * 100).toFixed(1) : 0;
      document.getElementById('metricUsagePercent').textContent = `${pct}% dari total plafon`;

      const unitPending = this.db.orders.filter(o => o.unit_id === this.currentUser.unit_id && o.status === 'Pending_Verification').length;
      document.getElementById('metricPendingCount').textContent = unitPending;
    } else {
      const totalAllCap = this.db.rapbs_poin.reduce((acc, r) => acc + r.total_plafond, 0);
      const totalAllUsed = this.db.rapbs_poin.reduce((acc, r) => acc + r.terpakai, 0);
      const totalAllAvail = this.db.rapbs_poin.reduce((acc, r) => acc + r.saldo_tersedia, 0);
      
      document.getElementById('metricTotalPlafond').textContent = 'Rp ' + this.formatNumber(totalAllCap);
      document.getElementById('metricTerpakai').textContent = 'Rp ' + this.formatNumber(totalAllUsed);
      document.getElementById('metricSaldoTersedia').textContent = 'Rp ' + this.formatNumber(totalAllAvail);
      
      const pct = totalAllCap > 0 ? ((totalAllUsed / totalAllCap) * 100).toFixed(1) : 0;
      document.getElementById('metricUsagePercent').textContent = `${pct}% total penyerapan kas`;

      const totalPending = this.db.orders.filter(o => o.status === 'Pending_Verification').length;
      document.getElementById('metricPendingCount').textContent = totalPending;
    }

    const recentOrdersContainer = document.getElementById('dashRecentOrdersList');
    let ordersToShow = this.db.orders;
    if (isUnit) {
      ordersToShow = ordersToShow.filter(o => o.unit_id === this.currentUser.unit_id);
    }
    ordersToShow = ordersToShow.slice().reverse().slice(0, 5);

    if (ordersToShow.length === 0) {
      recentOrdersContainer.innerHTML = `
        <div class="py-8 text-center text-xs text-slate-400">
          <i class="fa-solid fa-folder-open text-2xl mb-2"></i>
          <p>Belum ada riwayat pengajuan barang.</p>
        </div>
      `;
    } else {
      recentOrdersContainer.innerHTML = ordersToShow.map(ord => {
        let statusBadge = '';
        if (ord.status === 'Approved') {
          statusBadge = '<span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">Disetujui</span>';
        } else if (ord.status === 'Pending_Verification') {
          statusBadge = '<span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">Verifikasi</span>';
        } else {
          statusBadge = '<span class="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded-md">Ditolak</span>';
        }

        let typeIcon = 'fa-cart-shopping text-emerald-600 bg-emerald-50';
        if (ord.order_type === 'Reimburse') typeIcon = 'fa-receipt text-amber-600 bg-amber-50';
        else if (ord.order_type === 'Request_Barang_Baru') typeIcon = 'fa-link text-indigo-600 bg-indigo-50';

        let itemsSummary = '';
        try {
          const items = JSON.parse(ord.items_json);
          itemsSummary = items.map(i => `${i.product_name || i.item_name} (${i.qty})`).join(', ');
        } catch (e) {
          itemsSummary = ord.notes || 'Pengajuan Barang';
        }

        return `
          <div class="py-3 flex items-center justify-between gap-4">
            <div class="flex items-center space-x-3 min-w-0">
              <div class="w-9 h-9 rounded-xl ${typeIcon} flex items-center justify-center text-sm shrink-0">
                <i class="fa-solid ${typeIcon.split(' ')[0]}"></i>
              </div>
              <div class="min-w-0">
                <div class="flex items-center space-x-2">
                  <p class="text-xs font-bold text-slate-800 truncate">${ord.order_id}</p>
                  <span class="text-[10px] text-slate-400">• ${ord.created_at.split(' ')[0]}</span>
                </div>
                <p class="text-[11px] text-slate-500 truncate max-w-sm">${itemsSummary}</p>
              </div>
            </div>
            
            <div class="text-right shrink-0">
              <p class="text-xs font-black text-slate-900 font-heading">Rp ${this.formatNumber(ord.total_amount)}</p>
              <div class="mt-0.5">${statusBadge}</div>
            </div>
          </div>
        `;
      }).join('');
    }

    this.checkStockAlerts();
  },

  renderCatalog() {
    const products = this.getAggregatedProducts();
    const query = this.searchQuery.toLowerCase().trim();
    
    const filtered = products.filter(p => {
      const matchCat = (this.categoryFilter === 'ALL' || p.category === this.categoryFilter);
      const matchQuery = p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    const grid = document.getElementById('catalogGrid');
    const emptyState = document.getElementById('catalogEmptyState');

    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    const isStaff = this.currentUser.role === 'Admin' || this.currentUser.role === 'Bendahara';

    grid.innerHTML = filtered.map(prod => {
      const isOutOfStock = prod.total_stock <= 0;
      const isLowStock = prod.total_stock > 0 && prod.total_stock <= 5;
      
      let stockBadge = `<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Stok: ${prod.total_stock}</span>`;
      if (isOutOfStock) {
        stockBadge = `<span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Habis</span>`;
      } else if (isLowStock) {
        stockBadge = `<span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Menipis (${prod.total_stock})</span>`;
      }

      const batchCount = prod.batches.length;
      const batchTag = batchCount > 1 
        ? `<span class="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold" title="Tersedia dalam ${batchCount} batch restock FIFO">${batchCount} Batch FIFO</span>`
        : `<span class="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">1 Batch</span>`;

      let categoryIcon = 'fa-box';
      if (prod.category.includes('ATK')) categoryIcon = 'fa-pen-ruler';
      else if (prod.category.includes('Kebersihan')) categoryIcon = 'fa-broom';
      else if (prod.category.includes('Elektronik')) categoryIcon = 'fa-plug';
      else if (prod.category.includes('Kelas')) categoryIcon = 'fa-chalkboard-user';
      else if (prod.category.includes('Buku')) categoryIcon = 'fa-book';

      return `
        <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm card-hover flex flex-col justify-between">
          <div>
            <div class="h-36 w-full rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-brand-primary text-4xl mb-3 relative overflow-hidden group">
              ${prod.image_url ? `
                <img src="${prod.image_url}" alt="${prod.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.onerror=null; this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden');">
                <div class="hidden w-full h-full flex items-center justify-center bg-slate-50 text-brand-primary text-4xl">
                  <i class="fa-solid ${categoryIcon}"></i>
                </div>
              ` : `
                <div class="w-full h-full flex items-center justify-center bg-slate-50 text-brand-primary text-4xl">
                  <i class="fa-solid ${categoryIcon}"></i>
                </div>
              `}
              <div class="absolute top-2 left-2 z-10 shadow-sm">${stockBadge}</div>
              <div class="absolute top-2 right-2 z-10 shadow-sm">${batchTag}</div>
            </div>

            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${prod.category}</span>
            <h4 class="font-bold text-xs text-slate-800 line-clamp-2 mt-0.5 h-8 leading-snug">${prod.name}</h4>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-[10px] text-slate-400 block leading-none">Harga RAPBS</span>
                <span class="text-sm font-extrabold text-brand-primary font-heading">Rp ${this.formatNumber(prod.earliest_price)}</span>
              </div>

              <button 
                onclick="app.addToCart('${this.escapeQuotes(prod.name)}', ${prod.earliest_price}, ${prod.total_stock})"
                ${isOutOfStock ? 'disabled' : ''}
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
                  isOutOfStock 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-brand-primary hover:opacity-90 text-white shadow-sm'
                }">
                <i class="fa-solid fa-cart-plus"></i>
                <span>Tambah</span>
              </button>
            </div>

            ${isStaff ? `
              <div class="flex items-center justify-between gap-1.5 pt-1.5 border-t border-dashed border-slate-100">
                <button onclick="app.openEditProductModal('${this.escapeQuotes(prod.name)}')" class="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition flex items-center justify-center space-x-1" title="Edit Data Master Produk">
                  <i class="fa-solid fa-pen text-amber-600"></i>
                  <span>Edit Produk</span>
                </button>
                <button onclick="app.openRestockModalFor('${this.escapeQuotes(prod.name)}', '${prod.category}')" class="flex-1 py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold transition flex items-center justify-center space-x-1" title="Tambah Batch Restock Masuk">
                  <i class="fa-solid fa-plus"></i>
                  <span>Restock</span>
                </button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  },

  setCategoryFilter(cat) {
    this.categoryFilter = cat;
    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(p => {
      if (p.getAttribute('data-cat') === cat) {
        p.className = 'category-pill active px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-primary text-white transition shadow-sm';
      } else {
        p.className = 'category-pill px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition';
      }
    });

    this.renderCatalog();
  },

  filterCatalog() {
    const input = document.getElementById('catalogSearchInput');
    this.searchQuery = input ? input.value : '';
    this.renderCatalog();
  },

  renderOrdersTable() {
    const filter = document.getElementById('orderStatusFilter') ? document.getElementById('orderStatusFilter').value : 'ALL';
    const isUnit = this.currentUser.role === 'Unit';
    
    let orders = this.db.orders;
    if (isUnit) {
      orders = orders.filter(o => o.unit_id === this.currentUser.unit_id);
    }
    if (filter !== 'ALL') {
      orders = orders.filter(o => o.status === filter);
    }

    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    if (orders.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-10 text-slate-400 text-xs">
            <i class="fa-solid fa-file-circle-xmark text-2xl mb-2"></i>
            <p>Tidak ada riwayat pengajuan pada filter ini.</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = orders.slice().reverse().map(ord => {
      let statusBadge = '';
      if (ord.status === 'Approved') {
        statusBadge = '<span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-lg inline-flex items-center"><i class="fa-solid fa-check mr-1"></i>Disetujui</span>';
      } else if (ord.status === 'Pending_Verification') {
        statusBadge = '<span class="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-lg inline-flex items-center"><i class="fa-solid fa-clock mr-1"></i>Menunggu</span>';
      } else {
        statusBadge = '<span class="px-2.5 py-1 bg-red-100 text-red-800 text-[10px] font-extrabold rounded-lg inline-flex items-center"><i class="fa-solid fa-xmark mr-1"></i>Ditolak</span>';
      }

      let typeBadge = '';
      if (ord.order_type === 'E-Commerce') {
        typeBadge = '<span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">E-Commerce</span>';
      } else if (ord.order_type === 'Reimburse') {
        typeBadge = '<span class="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold rounded">Reimbursement</span>';
      } else {
        typeBadge = '<span class="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded">Barang Baru</span>';
      }

      let itemsSummary = '';
      let hasItemRevision = Boolean(ord.is_price_revised);
      try {
        const items = JSON.parse(ord.items_json);
        itemsSummary = items.map(i => {
          if (i.is_price_revised || i.is_revised) hasItemRevision = true;
          return `${i.product_name || i.item_name} <span class="text-slate-400 font-normal">x${i.qty}</span>`;
        }).join('<br/>');
      } catch (e) {
        itemsSummary = ord.notes || '-';
      }

      const invoiceCode = ord.invoice_number 
        ? `<button type="button" onclick="app.openInvoiceDetailModal('${ord.order_id}', '', '${escapeQuotes(ord.invoice_number)}')" class="group inline-flex items-center space-x-1 font-mono text-brand-primary hover:text-emerald-700 font-bold hover:underline decoration-emerald-300 block text-left" title="Klik untuk melihat rincian nota & transaksi">
            <i class="fa-solid fa-file-invoice text-[10px] text-emerald-600"></i>
            <span>${ord.invoice_number}</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[8px] opacity-70 group-hover:opacity-100"></i>
          </button>` 
        : '';
      const revisedBadge = hasItemRevision ? '<span class="px-1.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-extrabold rounded-md ml-1"><i class="fa-solid fa-pen-to-square mr-0.5"></i>Revisi Harga</span>' : '';

      return `
        <tr class="hover:bg-slate-50/80 transition">
          <td class="px-4 py-3 font-bold text-slate-800">
            ${invoiceCode}
            <span class="text-[10px] text-slate-400 font-normal">${ord.order_id}</span>
          </td>
          <td class="px-4 py-3">${typeBadge}</td>
          <td class="px-4 py-3 text-slate-700 leading-relaxed">
            ${itemsSummary}
            ${revisedBadge}
          </td>
          <td class="px-4 py-3 font-extrabold text-slate-900 font-heading">Rp ${this.formatNumber(ord.total_amount)}</td>
          <td class="px-4 py-3">${statusBadge}</td>
          <td class="px-4 py-3 text-[11px] text-slate-500">${ord.created_at}</td>
          <td class="px-4 py-3 text-center">
            <div class="flex items-center justify-center space-x-1.5">
              ${ord.status === 'Pending_Verification' ? `
                <button onclick="app.openEditPendingOrderModal('${ord.order_id}')" class="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition flex items-center space-x-1" title="Edit / Revisi Pengajuan">
                  <i class="fa-solid fa-pen-to-square text-[11px]"></i>
                  <span>Edit</span>
                </button>
              ` : ''}
              <button onclick="app.openPrintModal('${ord.order_id}')" class="px-2.5 py-1 bg-slate-100 hover:bg-brand-light text-slate-700 hover:text-brand-primary rounded-lg text-xs font-bold transition flex items-center space-x-1" title="Cetak Dokumen Resmi">
                <i class="fa-solid fa-print text-[11px]"></i>
                <span>Cetak</span>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderVerificationView() {
    const pending = this.db.orders.filter(o => o.status === 'Pending_Verification');
    const container = document.getElementById('verificationCardsContainer');
    const badge = document.getElementById('verifPendingCountHeader');
    if (badge) badge.textContent = `${pending.length} Pengajuan`;
    if (!container) return;

    if (pending.length === 0) {
      container.innerHTML = `
        <div class="bg-slate-50 rounded-2xl p-12 text-center text-slate-400">
          <div class="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto mb-3">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h4 class="text-sm font-bold text-slate-700">Semua Pengajuan Telah Diverifikasi!</h4>
          <p class="text-xs text-slate-400 mt-1">Tidak ada antrean pesanan atau reimburse yang menunggu persetujuan.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = pending.map(ord => {
      const unitObj = this.db.users.find(u => u.unit_id === ord.unit_id) || { unit_name: ord.unit_id };
      const rapbsObj = this.db.rapbs_poin.find(r => r.unit_id === ord.unit_id) || { saldo_tersedia: 0 };

      let items = [];
      try { items = JSON.parse(ord.items_json); } catch(e) {}

      // Initialize item-level approvals state if not yet defined
      if (!this.orderItemApprovals[ord.order_id]) {
        this.orderItemApprovals[ord.order_id] = items.map(it => it.status !== 'Rejected');
      }

      // Initialize item-level price & qty revisions state if not yet defined
      if (!this.orderItemRevisions[ord.order_id]) {
        this.orderItemRevisions[ord.order_id] = items.map(it => ({
          product_name: it.product_name || it.item_name || '',
          unit_price: Number(it.unit_price) || 0,
          qty: Number(it.qty) || 1,
          original_unit_price: Number(it.original_unit_price !== undefined ? it.original_unit_price : it.unit_price) || 0,
          original_qty: Number(it.original_qty !== undefined ? it.original_qty : it.qty) || 1,
          is_revised: Boolean(it.is_price_revised || it.is_revised || (it.original_unit_price !== undefined && it.original_unit_price !== it.unit_price)),
          revision_reason: it.revision_reason || ''
        }));
      }

      const approvals = this.orderItemApprovals[ord.order_id] || [];
      const revisions = this.orderItemRevisions[ord.order_id] || [];

      // Calculate dynamically approved amount & initial amounts
      const calculatedItems = items.map((item, idx) => {
        const rev = revisions[idx] || {
          unit_price: Number(item.unit_price) || 0,
          qty: Number(item.qty) || 1,
          original_unit_price: Number(item.unit_price) || 0,
          original_qty: Number(item.qty) || 1,
          is_revised: false,
          revision_reason: ''
        };
        const effPrice = Number(rev.unit_price !== undefined ? rev.unit_price : item.unit_price) || 0;
        const effQty = Number(rev.qty !== undefined ? rev.qty : item.qty) || 1;
        const origPrice = Number(rev.original_unit_price !== undefined ? rev.original_unit_price : item.unit_price) || 0;
        const origQty = Number(rev.original_qty !== undefined ? rev.original_qty : item.qty) || 1;
        const isApproved = approvals[idx] !== false;
        const effSubtotal = effPrice * effQty;
        const origSubtotal = origPrice * origQty;
        const priceDiff = effPrice - origPrice;
        const subtotalDiff = effSubtotal - origSubtotal;

        return {
          ...item,
          idx,
          effPrice,
          effQty,
          origPrice,
          origQty,
          effSubtotal,
          origSubtotal,
          priceDiff,
          subtotalDiff,
          is_revised: rev.is_revised,
          revision_reason: rev.revision_reason || '',
          is_approved: isApproved
        };
      });

      const approvedItems = calculatedItems.filter(it => it.is_approved);
      const approvedTotalAmount = approvedItems.reduce((acc, it) => acc + it.effSubtotal, 0);
      const originalTotalAmount = calculatedItems.reduce((acc, it) => acc + it.origSubtotal, 0);
      const hasAnyRevision = revisions.some(r => r && r.is_revised);
      const totalVariance = approvedTotalAmount - originalTotalAmount;
      const hasEnoughQuota = rapbsObj.saldo_tersedia >= approvedTotalAmount;

      let typeTag = '';
      if (ord.order_type === 'E-Commerce') {
        typeTag = '<span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg"><i class="fa-solid fa-cart-shopping mr-1"></i>E-Commerce SARPRAS</span>';
      } else if (ord.order_type === 'Reimburse') {
        typeTag = '<span class="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg"><i class="fa-solid fa-receipt mr-1"></i>Klaim Reimbursement</span>';
      } else if (ord.order_type === 'Sarpras_Bersama') {
        typeTag = '<span class="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-lg"><i class="fa-solid fa-users-gear mr-1"></i>Sarpras Bersama (Care Unit)</span>';
      } else {
        typeTag = '<span class="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-lg"><i class="fa-solid fa-link mr-1"></i>Request Barang Baru</span>';
      }

      const receiptUrl = (ord.attachments && ord.attachments.receipt) ? ord.attachments.receipt : '';
      const transferUrl = this.pendingTransferProofs[ord.order_id] || (ord.attachments && ord.attachments.transfer) || '';

      return `
        <div class="bg-white rounded-2xl border ${hasEnoughQuota ? 'border-slate-200' : 'border-red-300 bg-red-50/20'} p-5 shadow-sm space-y-4">
          <!-- Header Card -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div class="flex items-center space-x-2">
              ${typeTag}
              <span class="text-xs font-mono font-bold text-slate-700">${ord.order_id}</span>
              <span class="text-xs text-slate-400">• ${ord.created_at}</span>
              ${hasAnyRevision ? '<span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full border border-amber-300"><i class="fa-solid fa-pen-to-square mr-1"></i>Ada Revisi Harga</span>' : ''}
            </div>
            
            <div class="text-left sm:text-right">
              <span class="text-xs text-slate-500 font-semibold">Pengaju:</span>
              <span class="text-xs font-black text-slate-800 ml-1">${unitObj.unit_name}</span>
            </div>
          </div>

          <!-- Item Table with Per-Item Approval & Price Revision -->
          <div class="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 space-y-2">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span class="text-[11px] font-bold text-slate-700 uppercase flex items-center">
                <i class="fa-solid fa-list-check text-brand-primary mr-1.5"></i>Persetujuan & Revisi Harga Per-Item:
              </span>
              <span class="text-[10px] text-slate-400">Gunakan tombol <b>"Revisi Harga"</b> jika harga beli di nota fisik berbeda dengan pengajuan.</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-xs text-left">
                <thead class="text-[10px] text-slate-400 uppercase font-bold border-b border-slate-200/60 pb-1">
                  <tr>
                    <th class="pb-1.5 w-24 text-center">Status Item</th>
                    <th class="pb-1.5 min-w-[200px]">Rincian Barang / Jasa</th>
                    <th class="pb-1.5 text-center w-16">Jumlah</th>
                    <th class="pb-1.5 text-right min-w-[120px]">Harga Satuan (Beli)</th>
                    <th class="pb-1.5 text-right min-w-[110px]">Subtotal</th>
                    <th class="pb-1.5 text-center w-28">Aksi Revisi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200/50">
                  ${calculatedItems.map((item) => {
                    const isCustomReq = item.item_type === 'custom_request' || ord.order_type === 'Request_Barang_Baru';
                    const isReimb = item.item_type === 'reimbursement' || ord.order_type === 'Reimburse';
                    const isRev = item.is_revised;

                    return `
                      <tr class="${item.is_approved ? (isRev ? 'bg-amber-50/40' : 'bg-white/80') : 'bg-red-50/50 text-slate-400'} transition">
                        <td class="py-2 text-center">
                          <button type="button" onclick="app.toggleItemApproval('${ord.order_id}', ${item.idx})" class="px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center space-x-1 mx-auto shadow-xs ${item.is_approved ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800' : 'bg-red-100 hover:bg-red-200 text-red-800'}">
                            <i class="fa-solid ${item.is_approved ? 'fa-check' : 'fa-xmark'}"></i>
                            <span>${item.is_approved ? 'Disetujui' : 'Ditolak'}</span>
                          </button>
                        </td>
                        <td class="py-2 font-semibold ${item.is_approved ? 'text-slate-800' : 'line-through text-slate-400'}">
                          <div class="flex flex-wrap items-center gap-1">
                            ${isCustomReq ? '<span class="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-[9px] font-bold rounded">Barang Baru</span>' : ''}
                            ${isReimb ? '<span class="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">Reimburse</span>' : ''}
                            <span>${item.product_name || item.item_name}</span>
                            ${isRev ? '<span class="px-1.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-extrabold rounded"><i class="fa-solid fa-pen-to-square mr-0.5 text-amber-600"></i>Revisi</span>' : ''}
                          </div>
                          ${item.revision_reason ? `
                            <div class="text-[10px] text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-md border border-amber-200/60 mt-1 flex items-start space-x-1">
                              <i class="fa-solid fa-circle-info text-amber-600 mt-0.5 shrink-0"></i>
                              <span><b>Alasan:</b> ${item.revision_reason}</span>
                            </div>
                          ` : ''}
                          ${item.marketplace_url ? `
                            <a href="${item.marketplace_url}" target="_blank" class="text-[10px] text-indigo-600 font-semibold hover:underline inline-flex items-center mt-0.5">
                              <i class="fa-solid fa-arrow-up-right-from-square mr-1 text-[9px]"></i>Link Toko
                            </a>
                          ` : ''}
                        </td>
                        <td class="py-2 text-center font-bold ${item.is_approved ? 'text-slate-700' : 'line-through text-slate-400'}">
                          ${item.origQty !== item.effQty ? `<span class="line-through text-slate-400 text-[10px] mr-1">${item.origQty}</span>` : ''}
                          <span>${item.effQty}</span>
                        </td>
                        <td class="py-2 text-right ${item.is_approved ? 'text-slate-600' : 'line-through text-slate-400'}">
                          ${isRev ? `
                            <span class="text-[10px] text-slate-400 line-through block">Pengajuan: Rp ${this.formatNumber(item.origPrice)}</span>
                            <span class="font-black text-amber-800 text-xs block">Rp ${this.formatNumber(item.effPrice)}</span>
                            <span class="text-[9px] font-bold ${item.priceDiff >= 0 ? 'text-amber-700 bg-amber-100' : 'text-emerald-700 bg-emerald-100'} px-1 py-0.2 rounded inline-block">
                              ${item.priceDiff >= 0 ? '+' : ''}Rp ${this.formatNumber(item.priceDiff)}/pcs
                            </span>
                          ` : `
                            <span>Rp ${this.formatNumber(item.effPrice)}</span>
                          `}
                        </td>
                        <td class="py-2 text-right font-bold ${item.is_approved ? 'text-slate-900 font-heading' : 'line-through text-red-400'}">
                          ${isRev ? `
                            <span class="text-[10px] text-slate-400 line-through block font-normal">Rp ${this.formatNumber(item.origSubtotal)}</span>
                            <span class="font-extrabold text-slate-900 text-xs block font-heading">Rp ${this.formatNumber(item.effSubtotal)}</span>
                          ` : `
                            <span>Rp ${this.formatNumber(item.effSubtotal)}</span>
                          `}
                        </td>
                        <td class="py-2 text-center">
                          <div class="flex items-center justify-center space-x-1">
                            <button type="button" onclick="app.openPriceRevisionModal('${ord.order_id}', ${item.idx})" class="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-[10px] font-bold transition flex items-center space-x-1 shadow-2xs whitespace-nowrap">
                              <i class="fa-solid fa-pen-to-square text-amber-600"></i>
                              <span>${isRev ? 'Ubah' : 'Revisi'}</span>
                            </button>
                            ${isRev ? `
                              <button type="button" onclick="app.resetItemPriceRevision('${ord.order_id}', ${item.idx})" title="Reset ke harga pengajuan awal" class="p-1 text-slate-400 hover:text-red-600 rounded-lg transition">
                                <i class="fa-solid fa-rotate-left"></i>
                              </button>
                            ` : ''}
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Notes, Receipt Preview & Calculation Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <div class="space-y-3">
              <div>
                <span class="text-slate-400 font-semibold block text-[11px] mb-1">Keterangan / Catatan Pengaju:</span>
                <p class="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">${ord.notes || 'Tidak ada catatan tambahan.'}</p>
              </div>
              
              ${ord.recipient_name ? `
                <div class="text-[11px] text-slate-700 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/60 space-y-0.5">
                  <p><b>Penerima Dana:</b> ${ord.recipient_name}</p>
                  <p><b>Rekening Tujuan:</b> ${ord.bank_account || '-'}</p>
                  <p><b>PJ Unit:</b> ${ord.pj_name || '-'}</p>
                </div>
              ` : ''}

              <!-- Nota Kwitansi Interactive Preview -->
              ${receiptUrl ? `
                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span class="text-[11px] font-bold text-slate-700 block flex items-center">
                    <i class="fa-solid fa-receipt text-amber-600 mr-1.5"></i>Bukti Lampiran Nota Kwitansi:
                  </span>
                  <div class="flex items-center space-x-3">
                    <div class="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 cursor-pointer shadow-sm group relative" onclick="app.viewReceiptImage('${receiptUrl}', 'Bukti Kwitansi Nota: ${ord.order_id}', 'Pengaju: ${unitObj.unit_name} | Total: Rp ${this.formatNumber(ord.total_amount)}')">
                      <img src="${receiptUrl}" class="w-full h-full object-cover group-hover:scale-105 transition" onerror="this.src='https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80'">
                      <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
                        <i class="fa-solid fa-magnifying-glass-plus"></i>
                      </div>
                    </div>
                    <div class="space-y-1">
                      <p class="text-[11px] font-bold text-slate-800">Foto Nota Lampiran Unit</p>
                      <button type="button" onclick="app.viewReceiptImage('${receiptUrl}', 'Bukti Kwitansi Nota: ${ord.order_id}', 'Pengaju: ${unitObj.unit_name} | Total: Rp ${this.formatNumber(ord.total_amount)}')" class="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold transition flex items-center space-x-1 shadow-sm">
                        <i class="fa-solid fa-up-right-and-down-left-from-center text-amber-600"></i>
                        <span>🔍 Zoom Bukti Nota Resolusi Penuh</span>
                      </button>
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- Upload Bukti Transfer Pelunasan Bendahara -->
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span class="text-[11px] font-bold text-slate-700 block flex items-center justify-between">
                  <span class="flex items-center"><i class="fa-solid fa-money-bill-transfer text-emerald-600 mr-1.5"></i>Bukti Transfer Pelunasan (Bendahara):</span>
                  <span class="text-[10px] text-slate-400">Opsional / Saat disetujui</span>
                </span>

                <div class="flex items-center space-x-3">
                  <div class="w-14 h-14 rounded-xl bg-white border-2 border-dashed border-slate-300 overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                    ${transferUrl ? `<img src="${transferUrl}" class="w-full h-full object-cover">` : '<i class="fa-solid fa-file-invoice-dollar text-xl text-slate-300"></i>'}
                  </div>
                  <div class="space-y-1.5">
                    <label class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer shadow-sm inline-flex">
                      <i class="fa-solid fa-cloud-arrow-up"></i>
                      <span>${transferUrl ? 'Ganti Bukti Transfer' : 'Upload Bukti Transfer Bank'}</span>
                      <input type="file" accept="image/*" onchange="app.handleTransferProofUpload(event, '${ord.order_id}')" class="hidden">
                    </label>
                    <p class="text-[10px] text-slate-400">${transferUrl ? '✅ Bukti transfer siap dilampirkan' : 'Foto bukti transfer m-banking / ATM'}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Calculation Box -->
            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex justify-between text-slate-500">
                  <span>Total Pengajuan Awal:</span>
                  <span class="font-bold text-slate-700">Rp ${this.formatNumber(originalTotalAmount)}</span>
                </div>
                <div class="flex justify-between text-slate-700 font-bold border-t border-slate-200/60 pt-1.5">
                  <span class="text-brand-primary">Total Disetujui (${approvedItems.length} Item):</span>
                  <span class="font-black text-brand-primary text-sm font-heading">Rp ${this.formatNumber(approvedTotalAmount)}</span>
                </div>
                ${hasAnyRevision ? `
                  <div class="flex justify-between text-[11px] pt-0.5">
                    <span class="text-slate-500">Selisih Realisasi Harga:</span>
                    <span class="${totalVariance >= 0 ? 'text-amber-700 font-bold' : 'text-emerald-700 font-bold'}">
                      ${totalVariance >= 0 ? '+' : ''}Rp ${this.formatNumber(totalVariance)} (${totalVariance >= 0 ? 'Penyesuaian Biaya' : 'Hemat Anggaran'})
                    </span>
                  </div>
                ` : ''}
                <div class="flex justify-between text-slate-500">
                  <span>Saldo Poin Unit Saat Ini:</span>
                  <span class="font-bold text-slate-800">Rp ${this.formatNumber(rapbsObj.saldo_tersedia)}</span>
                </div>
                <div class="flex justify-between pt-2 border-t border-slate-200 font-bold ${hasEnoughQuota ? 'text-emerald-700' : 'text-red-600'}">
                  <span>Sisa Saldo Setelah Approval:</span>
                  <span class="font-heading">Rp ${this.formatNumber(rapbsObj.saldo_tersedia - approvedTotalAmount)}</span>
                </div>
                ${!hasEnoughQuota ? `
                  <div class="p-2 bg-red-100 text-red-800 rounded-xl text-[10px] font-bold flex items-center space-x-1">
                    <i class="fa-solid fa-triangle-exclamation text-red-600"></i>
                    <span>Peringatan: Total nominal melebihi sisa saldo RAPBS unit!</span>
                  </div>
                ` : ''}
              </div>

              <div class="p-2.5 bg-white rounded-xl border border-slate-200/80 text-[10px] text-slate-500 space-y-0.5">
                <p><i class="fa-solid fa-shield-check text-brand-primary mr-1"></i><b>Otomatisasi Sistem:</b></p>
                <p>• Harga beli revisi akan menjadi patokan pemotongan RAPBS & Master Produk baru.</p>
                <p>• Item yang ditolak tidak memotong saldo RAPBS unit maupun stok gudang.</p>
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
            <button type="button" onclick="app.rejectOrder('${ord.order_id}')" class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl transition">
              <i class="fa-solid fa-xmark mr-1"></i>Tolak Seluruh Pengajuan
            </button>
            <button type="button" onclick="app.approveOrderWithItemStates('${ord.order_id}')" ${!hasEnoughQuota ? 'disabled' : ''} class="px-5 py-2.5 bg-brand-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-1.5">
              <i class="fa-solid fa-check-double"></i>
              <span>Setujui & Potong RAPBS (${approvedItems.length} Item Disetujui)</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  renderInventoryTable() {
    const tbody = document.getElementById('inventoryTableBody');
    const activeCount = document.getElementById('activeBatchCount');
    if (!tbody) return;

    const batches = this.db.stock_inventory;
    const active = batches.filter(b => b.status === 'Active' && b.stock_qty > 0);
    if (activeCount) activeCount.textContent = active.length;

    if (batches.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-8 text-slate-400">Belum ada data batch inventaris.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = batches.map(b => {
      const isStatusActive = b.status === 'Active' && b.stock_qty > 0;
      const statusTag = isStatusActive
        ? '<span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Active</span>'
        : '<span class="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">Empty / Depleted</span>';

      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="px-4 py-3 font-mono font-bold text-slate-700">${b.batch_id}</td>
          <td class="px-4 py-3 font-semibold text-slate-800">${b.product_name}</td>
          <td class="px-4 py-3 text-slate-500">${b.category}</td>
          <td class="px-4 py-3 font-bold ${b.stock_qty === 0 ? 'text-red-600' : 'text-slate-900'}">${b.stock_qty}</td>
          <td class="px-4 py-3">Rp ${this.formatNumber(b.unit_price)}</td>
          <td class="px-4 py-3 text-slate-500">${b.date_in}</td>
          <td class="px-4 py-3"><span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">${b.method || 'FIFO'}</span></td>
          <td class="px-4 py-3">${statusTag}</td>
          <td class="px-4 py-3 text-center">
            <div class="flex items-center justify-center space-x-1.5">
              <button onclick="app.openEditBatchModal('${b.batch_id}')" class="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded font-bold text-xs transition" title="Edit Batch">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button onclick="app.handleDeleteBatchDirect('${b.batch_id}')" class="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-bold text-xs transition" title="Hapus Batch">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  switchInventoryTab(tab) {
    const tabBatches = document.getElementById('invSubTab-batches');
    const tabProducts = document.getElementById('invSubTab-products');
    const btnBatches = document.getElementById('invTabBtn-batches');
    const btnProducts = document.getElementById('invTabBtn-products');

    if (tab === 'batches') {
      if (tabBatches) tabBatches.classList.remove('hidden');
      if (tabProducts) tabProducts.classList.add('hidden');
      if (btnBatches) btnBatches.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 transition flex items-center space-x-2';
      if (btnProducts) btnProducts.className = 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition flex items-center space-x-2';
      this.renderInventoryTable();
    } else {
      if (tabBatches) tabBatches.classList.add('hidden');
      if (tabProducts) tabProducts.classList.remove('hidden');
      if (btnBatches) btnBatches.className = 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition flex items-center space-x-2';
      if (btnProducts) btnProducts.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 transition flex items-center space-x-2';
      this.renderMasterProductsTable();
    }
  },

  renderMasterProductsTable() {
    const tbody = document.getElementById('masterProductsTableBody');
    const totalCountEl = document.getElementById('totalProductsCount');
    if (!tbody) return;

    const prods = this.getAggregatedProducts();
    if (totalCountEl) totalCountEl.textContent = prods.length;

    if (prods.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-8 text-slate-400">Belum ada master produk terdaftar.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = prods.map(p => {
      let stockBadge = `<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">${p.total_stock} Unit</span>`;
      if (p.total_stock <= 0) {
        stockBadge = `<span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Habis</span>`;
      } else if (p.total_stock <= 5) {
        stockBadge = `<span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Menipis (${p.total_stock})</span>`;
      }

      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="px-4 py-3 font-bold text-slate-800">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-brand-primary text-xs">
                ${p.image_url ? `<img src="${p.image_url}" class="w-full h-full object-cover" onerror="this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden');">` : ''}
                <i class="fa-solid fa-box ${p.image_url ? 'hidden' : ''}"></i>
              </div>
              <span class="truncate max-w-xs">${p.name}</span>
            </div>
          </td>
          <td class="px-4 py-3 text-slate-500">${p.category}</td>
          <td class="px-4 py-3">${stockBadge}</td>
          <td class="px-4 py-3 font-extrabold text-brand-primary font-heading">Rp ${this.formatNumber(p.earliest_price)}</td>
          <td class="px-4 py-3 text-slate-600 font-semibold">${p.batches.length} Batch</td>
          <td class="px-4 py-3 text-center">
            <div class="flex items-center justify-center space-x-2">
              <button onclick="app.openEditProductModal('${this.escapeQuotes(p.name)}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition flex items-center space-x-1" title="Edit Master Produk">
                <i class="fa-solid fa-pen text-amber-600"></i>
                <span>Edit</span>
              </button>
              <button onclick="app.openRestockModalFor('${this.escapeQuotes(p.name)}', '${p.category}')" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold transition flex items-center space-x-1" title="Tambah Batch Restock">
                <i class="fa-solid fa-plus"></i>
                <span>Restock</span>
              </button>
              <button onclick="app.handleDeleteProductDirect('${this.escapeQuotes(p.name)}')" class="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition" title="Hapus Produk">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderLedgerTable() {
    const tbody = document.getElementById('ledgerTableBody');
    if (!tbody) return;

    const logs = this.db.transactions_log;
    if (logs.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-10 text-slate-400 text-xs">
            <i class="fa-solid fa-book-open text-2xl mb-2"></i>
            <p>Belum ada catatan mutasi transaksi pada buku kas.</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = logs.slice().reverse().map(l => {
      const unitObj = this.db.users.find(u => u.unit_id === l.unit_id) || { unit_name: l.unit_id };
      const invNumSafe = escapeQuotes(l.invoice_number || '');

      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="px-4 py-3 font-mono text-[11px] text-slate-500">${l.log_id}</td>
          <td class="px-4 py-3">
            ${l.invoice_number ? `
              <button type="button" 
                onclick="app.openInvoiceDetailModal('${l.order_id || ''}', '${l.log_id}', '${invNumSafe}')" 
                class="invoice-link-badge group inline-flex items-center space-x-1.5 font-mono font-extrabold text-brand-primary hover:text-emerald-700 bg-emerald-50/90 hover:bg-emerald-100/90 px-2.5 py-1 rounded-lg border border-emerald-200/80 transition shadow-2xs hover:shadow-xs text-left cursor-pointer"
                title="Klik untuk melihat rincian nota & invoice lengkap">
                <i class="fa-solid fa-file-invoice text-[11px] text-emerald-600 group-hover:scale-110 transition-transform"></i>
                <span class="underline decoration-emerald-300 underline-offset-2">${l.invoice_number}</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px] opacity-70 group-hover:opacity-100 ml-0.5"></i>
              </button>
            ` : `<span class="text-slate-400 font-mono text-xs">-</span>`}
          </td>
          <td class="px-4 py-3 font-semibold text-slate-800">${unitObj.unit_name}</td>
          <td class="px-4 py-3 font-extrabold text-red-600 font-heading">- Rp ${this.formatNumber(l.amount_deducted)}</td>
          <td class="px-4 py-3 font-extrabold text-brand-primary font-heading">Rp ${this.formatNumber(l.remaining_balance)}</td>
          <td class="px-4 py-3 text-slate-500 text-[11px]">${l.timestamp}</td>
        </tr>
      `;
    }).join('');
  },

  // ==========================================
  // 9. UNIFIED CART & CHECKOUT WORKFLOW
  // ==========================================

  addToCart(productName, price, maxStock) {
    const existing = this.cart.find(c => c.product_name === productName);
    const prod = this.getAggregatedProducts().find(p => p.name === productName);
    const imageUrl = prod ? (prod.image_url || '') : '';

    if (existing) {
      if (existing.qty + 1 > maxStock) {
        this.showToast(`Stok maksimal barang tercapai (${maxStock})`, 'warning');
        return;
      }
      existing.qty += 1;
      existing.subtotal = existing.qty * existing.unit_price;
    } else {
      this.cart.push({
        id: 'cat-' + Date.now() + '-' + Math.floor(Math.random() * 100),
        type: 'catalog',
        product_name: productName,
        raw_product_name: productName,
        unit_price: price,
        qty: 1,
        subtotal: price,
        max_stock: maxStock,
        image_url: imageUrl
      });
    }

    this.showToast(`Ditambahkan ke keranjang: ${productName}`, 'success');
    this.updateCartCount();
    this.renderCartDrawer();
  },

  submitCustomRequestToCart(event) {
    if (event) event.preventDefault();

    const nameInput = document.getElementById('custItemName');
    const urlInput = document.getElementById('custItemUrl');
    const qtyInput = document.getElementById('custItemQty');
    const priceInput = document.getElementById('custItemPrice');
    const categoryInput = document.getElementById('custItemCategory');
    const pjInput = document.getElementById('custItemPJ');
    const notesInput = document.getElementById('custItemNotes');

    const itemName = nameInput ? nameInput.value.trim() : '';
    const url = urlInput ? urlInput.value.trim() : '';
    const qty = qtyInput ? Number(qtyInput.value) : 1;
    const price = priceInput ? Number(priceInput.value) : 0;
    const category = categoryInput ? categoryInput.value : 'ATK & Kertas';
    const pj = pjInput ? pjInput.value.trim() : '';
    const notes = notesInput ? notesInput.value.trim() : '';

    if (!itemName || price <= 0 || qty <= 0) {
      this.showToast('Lengkapi nama barang, estimasi harga, dan jumlah!', 'warning');
      return;
    }

    const subtotal = qty * price;
    this.cart.push({
      id: 'cust-' + Date.now() + '-' + Math.floor(Math.random() * 100),
      type: 'custom_request',
      product_name: `[Barang Baru] ${itemName}`,
      raw_product_name: itemName,
      unit_price: price,
      qty: qty,
      subtotal: subtotal,
      max_stock: 999,
      category: category,
      marketplace_url: url,
      pj_name: pj,
      notes: notes,
      image_url: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&auto=format&fit=crop&q=80'
    });

    const form = document.getElementById('customRequestForm');
    if (form) form.reset();

    this.showToast(`Request barang "${itemName}" ditambahkan ke keranjang!`, 'success');
    this.updateCartCount();
    this.renderCartDrawer();
    this.toggleCartDrawer();
  },

  submitReimburseToCart(event) {
    if (event) event.preventDefault();

    const titleInput = document.getElementById('reimbTitle');
    const amountInput = document.getElementById('reimbAmount');
    const dateInput = document.getElementById('reimbDate');
    const recipientInput = document.getElementById('reimbRecipient');
    const bankInput = document.getElementById('reimbBank');
    const pjInput = document.getElementById('reimbPJ');
    const categoryInput = document.getElementById('reimbCategory');
    const notesInput = document.getElementById('reimbNotes');

    const receipt = document.getElementById('receiptBase64') ? document.getElementById('receiptBase64').value : '';
    const transfer = document.getElementById('transferBase64') ? document.getElementById('transferBase64').value : '';
    const photo = document.getElementById('photoBase64') ? document.getElementById('photoBase64').value : '';

    const title = titleInput ? titleInput.value.trim() : '';
    const amount = amountInput ? Number(amountInput.value) : 0;
    const date = dateInput ? dateInput.value : '';
    const recipient = recipientInput ? recipientInput.value.trim() : '';
    const bank = bankInput ? bankInput.value.trim() : '';
    const pj = pjInput ? pjInput.value.trim() : '';
    const category = categoryInput ? categoryInput.value : 'Pemeliharaan & Servis';
    const notes = notesInput ? notesInput.value.trim() : '';

    if (!title || amount <= 0 || !recipient) {
      this.showToast('Lengkapi judul pengeluaran, nominal biaya, dan penerima!', 'warning');
      return;
    }

    this.cart.push({
      id: 'reimb-' + Date.now() + '-' + Math.floor(Math.random() * 100),
      type: 'reimbursement',
      product_name: `[Reimburse] ${title}`,
      raw_product_name: title,
      unit_price: amount,
      qty: 1,
      subtotal: amount,
      max_stock: 1,
      category: category,
      recipient_name: recipient,
      bank_account: bank,
      payment_date: date,
      pj_name: pj,
      notes: notes,
      image_url: receipt || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      attachments: {
        receipt: receipt || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
        transfer: transfer,
        photo: photo
      }
    });

    const form = document.getElementById('reimburseForm');
    if (form) form.reset();

    this.showToast(`Klaim reimbursement "${title}" ditambahkan ke keranjang!`, 'success');
    this.updateCartCount();
    this.renderCartDrawer();
    this.toggleCartDrawer();
  },

  updateCartQty(productName, delta) {
    const item = this.cart.find(c => c.product_name === productName);
    if (!item) return;

    if (item.type === 'reimbursement') {
      this.showToast('Jumlah klaim reimbursement adalah 1 paket.', 'warning');
      return;
    }

    const newQty = item.qty + delta;
    if (newQty <= 0) {
      this.cart = this.cart.filter(c => c.product_name !== productName);
    } else if (newQty > item.max_stock) {
      this.showToast(`Maksimal stok tersedia: ${item.max_stock}`, 'warning');
      return;
    } else {
      item.qty = newQty;
      item.subtotal = item.qty * item.unit_price;
    }

    this.updateCartCount();
    this.renderCartDrawer();
  },

  removeFromCart(productName) {
    this.cart = this.cart.filter(c => c.product_name !== productName);
    this.updateCartCount();
    this.renderCartDrawer();
  },

  clearCart() {
    this.cart = [];
    this.updateCartCount();
    this.renderCartDrawer();
  },

  updateCartCount() {
    const totalCount = this.cart.reduce((acc, c) => acc + c.qty, 0);
    const badge = document.getElementById('cartCountBadge');
    if (badge) badge.textContent = totalCount;
  },

  toggleCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer || !backdrop) return;

    const isHidden = drawer.classList.contains('translate-x-full');
    if (isHidden) {
      this.renderCartDrawer();
      drawer.classList.remove('translate-x-full');
      backdrop.classList.remove('hidden');
    } else {
      drawer.classList.add('translate-x-full');
      backdrop.classList.add('hidden');
    }
  },

  onCartAllocationChange() {
    const sel = document.getElementById('cartAllocationType');
    const controls = document.getElementById('cartCareUnitSplitControls');
    if (sel && controls) {
      if (sel.value === 'care_unit') {
        controls.classList.remove('hidden');
      } else {
        controls.classList.add('hidden');
      }
    }
    this.renderCartDrawer();
  },

  setCareUnitSplitRatio(sdPercent, smpPercent) {
    this.careUnitSplitSdPercent = sdPercent;
    this.careUnitSplitSmpPercent = smpPercent;

    const btn50 = document.getElementById('splitBtn5050');
    const btn60 = document.getElementById('splitBtn6040');

    if (btn50 && btn60) {
      if (sdPercent === 50) {
        btn50.className = 'px-2 py-0.5 bg-amber-500 text-slate-900 font-bold rounded text-[10px] shadow-sm';
        btn60.className = 'px-2 py-0.5 bg-white text-slate-700 font-semibold rounded text-[10px] border border-amber-300';
      } else {
        btn60.className = 'px-2 py-0.5 bg-amber-500 text-slate-900 font-bold rounded text-[10px] shadow-sm';
        btn50.className = 'px-2 py-0.5 bg-white text-slate-700 font-semibold rounded text-[10px] border border-amber-300';
      }
    }

    this.renderCartDrawer();
  },

  renderCartDrawer() {
    const list = document.getElementById('cartItemsList');
    const unitLabel = document.getElementById('cartUnitLabel');
    const availSaldo = document.getElementById('cartAvailableSaldo');
    const totalSub = document.getElementById('cartTotalSubtotal');
    const estRemaining = document.getElementById('cartEstimatedRemaining');
    const submitBtn = document.getElementById('btnCheckoutSubmit');
    const adminAllocationSection = document.getElementById('cartAdminAllocationSection');
    const allocationSelect = document.getElementById('cartAllocationType');

    const isStaff = this.currentUser.role === 'Admin' || this.currentUser.role === 'Bendahara';
    if (adminAllocationSection) {
      if (isStaff) adminAllocationSection.classList.remove('hidden');
      else adminAllocationSection.classList.add('hidden');
    }

    const isCareUnit = isStaff && allocationSelect && allocationSelect.value === 'care_unit';

    if (unitLabel) {
      unitLabel.textContent = isCareUnit ? 'Sarpras Bersama / Care Unit (SD & SMP)' : this.currentUser.unit_name;
    }

    const subtotal = this.cart.reduce((acc, c) => acc + c.subtotal, 0);

    let hasEnoughBalance = true;
    let balanceLabelText = '';
    let remainingLabelText = '';

    if (isCareUnit) {
      const sdRapbs = this.db.rapbs_poin.find(r => r.unit_id === 'unit_sd') || { saldo_tersedia: 0 };
      const smpRapbs = this.db.rapbs_poin.find(r => r.unit_id === 'unit_smp') || { saldo_tersedia: 0 };

      const sdAmount = Math.round((subtotal * this.careUnitSplitSdPercent) / 100);
      const smpAmount = subtotal - sdAmount;

      const sdRemaining = sdRapbs.saldo_tersedia - sdAmount;
      const smpRemaining = smpRapbs.saldo_tersedia - smpAmount;

      hasEnoughBalance = sdRemaining >= 0 && smpRemaining >= 0;

      const sdPercentEl = document.getElementById('cartSplitSdPercentLabel');
      const sdAmountEl = document.getElementById('cartSplitSdAmount');
      const sdRemEl = document.getElementById('cartSplitSdRemaining');

      const smpPercentEl = document.getElementById('cartSplitSmpPercentLabel');
      const smpAmountEl = document.getElementById('cartSplitSmpAmount');
      const smpRemEl = document.getElementById('cartSplitSmpRemaining');

      if (sdPercentEl) sdPercentEl.textContent = this.careUnitSplitSdPercent;
      if (sdAmountEl) sdAmountEl.textContent = 'Rp ' + this.formatNumber(sdAmount);
      if (sdRemEl) {
        sdRemEl.textContent = `Sisa SD: Rp ${this.formatNumber(sdRemaining)}`;
        sdRemEl.className = sdRemaining < 0 ? 'text-[9px] text-red-600 font-bold block' : 'text-[9px] text-emerald-600 font-medium block';
      }

      if (smpPercentEl) smpPercentEl.textContent = this.careUnitSplitSmpPercent;
      if (smpAmountEl) smpAmountEl.textContent = 'Rp ' + this.formatNumber(smpAmount);
      if (smpRemEl) {
        smpRemEl.textContent = `Sisa SMP: Rp ${this.formatNumber(smpRemaining)}`;
        smpRemEl.className = smpRemaining < 0 ? 'text-[9px] text-red-600 font-bold block' : 'text-[9px] text-emerald-600 font-medium block';
      }

      const totalAvailBoth = sdRapbs.saldo_tersedia + smpRapbs.saldo_tersedia;
      balanceLabelText = 'Rp ' + this.formatNumber(totalAvailBoth) + ' (SD + SMP)';
      remainingLabelText = 'Rp ' + this.formatNumber(totalAvailBoth - subtotal);
    } else {
      const userRapbs = this.db.rapbs_poin.find(r => r.unit_id === this.currentUser.unit_id) || { saldo_tersedia: 0 };
      const remaining = userRapbs.saldo_tersedia - subtotal;
      hasEnoughBalance = remaining >= 0;

      balanceLabelText = 'Rp ' + this.formatNumber(userRapbs.saldo_tersedia);
      remainingLabelText = 'Rp ' + this.formatNumber(remaining);
    }

    if (availSaldo) availSaldo.textContent = balanceLabelText;
    if (totalSub) totalSub.textContent = 'Rp ' + this.formatNumber(subtotal);
    if (estRemaining) {
      estRemaining.textContent = remainingLabelText;
      estRemaining.className = !hasEnoughBalance ? 'text-red-600 font-extrabold' : 'text-brand-primary font-extrabold';
    }

    if (this.cart.length === 0) {
      if (list) {
        list.innerHTML = `
          <div class="h-64 flex flex-col items-center justify-center text-center text-slate-400">
            <i class="fa-solid fa-cart-arrow-down text-3xl mb-2 text-slate-300"></i>
            <p class="text-xs font-bold text-slate-600">Keranjang Pengadaan Kosong</p>
            <p class="text-[11px] text-slate-400 mt-0.5">Pilih barang katalog, ajukan barang baru, atau klaim reimburse.</p>
          </div>
        `;
      }
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    if (submitBtn) {
      if (!hasEnoughBalance) {
        submitBtn.disabled = true;
        submitBtn.className = 'w-full py-3 bg-red-100 text-red-700 font-bold text-xs rounded-xl cursor-not-allowed';
        submitBtn.innerHTML = '<i class="fa-solid fa-ban mr-1"></i> Saldo Poin RAPBS Tidak Cukup';
      } else if (isCareUnit) {
        submitBtn.disabled = false;
        submitBtn.className = 'w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2';
        submitBtn.innerHTML = '<i class="fa-solid fa-bolt text-yellow-300"></i><span>⚡ Checkout & Auto-Approve Sarpras Bersama</span>';
      } else {
        submitBtn.disabled = false;
        submitBtn.className = 'w-full py-3 bg-brand-primary hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2';
        submitBtn.innerHTML = '<i class="fa-solid fa-check-to-slot"></i><span>Kirim Pengajuan Pesanan</span>';
      }
    }

    if (list) {
      list.innerHTML = this.cart.map(item => {
        let badgeHTML = '';
        if (item.type === 'custom_request') {
          badgeHTML = '<span class="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-[9px] font-bold rounded">Barang Baru</span>';
        } else if (item.type === 'reimbursement') {
          badgeHTML = '<span class="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">Reimburse</span>';
        } else {
          badgeHTML = '<span class="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">Katalog</span>';
        }

        const isReimb = item.type === 'reimbursement';

        return `
          <div class="bg-slate-50 rounded-2xl p-3 border border-slate-200/70 flex items-center justify-between gap-3 shadow-sm">
            <div class="w-11 h-11 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-brand-primary text-base">
              ${item.image_url ? `<img src="${item.image_url}" class="w-full h-full object-cover" onerror="this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden');">` : ''}
              <i class="fa-solid fa-box ${item.image_url ? 'hidden' : ''}"></i>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center space-x-1.5 mb-0.5">
                ${badgeHTML}
                <h5 class="text-xs font-bold text-slate-800 truncate">${item.product_name}</h5>
              </div>
              <p class="text-[11px] text-brand-primary font-bold">Rp ${this.formatNumber(item.unit_price)} ${item.qty > 1 ? `<span class="text-slate-400 font-normal">x ${item.qty}</span>` : ''}</p>
              ${item.recipient_name ? `<p class="text-[10px] text-slate-500">Penerima: ${item.recipient_name}</p>` : ''}
            </div>

            ${!isReimb ? `
              <div class="flex items-center space-x-1 bg-white border border-slate-200 rounded-xl p-0.5 shrink-0">
                <button onclick="app.updateCartQty('${this.escapeQuotes(item.product_name)}', -1)" class="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">-</button>
                <span class="w-5 text-center text-xs font-extrabold text-slate-800">${item.qty}</span>
                <button onclick="app.updateCartQty('${this.escapeQuotes(item.product_name)}', 1)" class="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center text-xs font-bold">+</button>
              </div>
            ` : ''}

            <button onclick="app.removeFromCart('${this.escapeQuotes(item.product_name)}')" class="p-1.5 text-slate-400 hover:text-red-500 rounded-lg text-xs" title="Hapus Item">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `;
      }).join('');
    }
  },

  submitCartOrder() {
    if (this.cart.length === 0) return;

    const isStaff = this.currentUser.role === 'Admin' || this.currentUser.role === 'Bendahara';
    const allocationSelect = document.getElementById('cartAllocationType');
    const isCareUnit = isStaff && allocationSelect && allocationSelect.value === 'care_unit';

    const totalAmount = this.cart.reduce((acc, c) => acc + c.subtotal, 0);
    const notesInput = document.getElementById('cartCheckoutNotes');
    const notes = notesInput ? notesInput.value.trim() : '';

    // If Sarpras Bersama (Care Unit) - Split SD & SMP with Instant Auto-Approval
    if (isCareUnit) {
      const sdRapbs = this.db.rapbs_poin.find(r => r.unit_id === 'unit_sd');
      const smpRapbs = this.db.rapbs_poin.find(r => r.unit_id === 'unit_smp');

      if (!sdRapbs || !smpRapbs) {
        this.showToast('Unit SD atau SMP tidak ditemukan dalam database!', 'error');
        return;
      }

      const sdAmount = Math.round((totalAmount * this.careUnitSplitSdPercent) / 100);
      const smpAmount = totalAmount - sdAmount;

      if (sdRapbs.saldo_tersedia < sdAmount || smpRapbs.saldo_tersedia < smpAmount) {
        this.showToast('Saldo RAPBS salah satu unit tidak mencukupi untuk alokasi split!', 'error');
        return;
      }

      // Deduct FIFO stock for catalog items
      this.cart.forEach(c => {
        if (c.type === 'catalog') {
          this.deductStockFIFO(c.raw_product_name || c.product_name, c.qty);
        }
      });

      // Deduct RAPBS from both units
      sdRapbs.terpakai += sdAmount;
      sdRapbs.saldo_tersedia -= sdAmount;
      sdRapbs.updated_at = this.formatCurrentDateTime();

      smpRapbs.terpakai += smpAmount;
      smpRapbs.saldo_tersedia -= smpAmount;
      smpRapbs.updated_at = this.formatCurrentDateTime();

      const invCount = this.db.transactions_log.length + 1;
      const schoolSlug = (this.db.cms_settings.app_name || 'AL-IMAM').toUpperCase().replace(/\s+/g, '-');
      const invNum = `INV/${schoolSlug}/2026/09/${String(invCount).padStart(3, '0')}`;

      const newOrderId = 'CARE-' + this.generateTimestampId();
      const orderObj = {
        order_id: newOrderId,
        unit_id: 'care_unit',
        order_type: 'Sarpras_Bersama',
        items_json: JSON.stringify(this.cart.map(c => ({
          product_name: c.raw_product_name || c.product_name,
          qty: c.qty,
          unit_price: c.unit_price,
          subtotal: c.subtotal,
          status: 'Approved',
          item_type: c.type || 'catalog',
          marketplace_url: c.marketplace_url || '',
          category: c.category || 'Kebersihan & Sanitasi',
          image_url: c.image_url || ''
        }))),
        total_amount: totalAmount,
        status: 'Approved',
        created_at: this.formatCurrentDateTime(),
        approved_at: this.formatCurrentDateTime(),
        notes: notes || 'Pengadaan Bersama Tim Kebersihan / Care Unit (SD & SMP)',
        invoice_number: invNum,
        split_units: [
          { unit_id: 'unit_sd', unit_name: 'SD Islam Al-Imam', amount: sdAmount, percent: this.careUnitSplitSdPercent },
          { unit_id: 'unit_smp', unit_name: 'SMP Islam Al-Imam', amount: smpAmount, percent: this.careUnitSplitSmpPercent }
        ]
      };

      // Auto-create Master Product for custom request items
      this.cart.forEach(c => {
        if (c.type === 'custom_request') {
          this.autoCreateMasterProductFromRequest({
            product_name: c.raw_product_name || c.product_name,
            category: c.category || 'Kebersihan & Sanitasi',
            unit_price: c.unit_price,
            image_url: c.image_url || '',
            qty: c.qty
          });
        }
      });

      this.db.orders.push(orderObj);

      // Add two transaction log records (one for SD, one for SMP)
      const logId1 = 'LOG-' + this.generateTimestampId() + '-SD';
      const logId2 = 'LOG-' + this.generateTimestampId() + '-SMP';

      this.db.transactions_log.push({
        log_id: logId1,
        order_id: newOrderId,
        unit_id: 'unit_sd',
        amount_deducted: sdAmount,
        remaining_balance: sdRapbs.saldo_tersedia,
        timestamp: this.formatCurrentDateTime(),
        invoice_number: `${invNum} (Split SD)`
      });

      this.db.transactions_log.push({
        log_id: logId2,
        order_id: newOrderId,
        unit_id: 'unit_smp',
        amount_deducted: smpAmount,
        remaining_balance: smpRapbs.saldo_tersedia,
        timestamp: this.formatCurrentDateTime(),
        invoice_number: `${invNum} (Split SMP)`
      });

      this.saveState();
      this.cart = [];
      if (notesInput) notesInput.value = '';

      this.toggleCartDrawer();
      this.updateUI();
      this.showToast(`Pengadaan Sarpras Bersama ${newOrderId} berhasil & otomatis disetujui!`, 'success');
      this.navigate('orders');

      if (this.db.gas_api_url) {
        this.syncGasApproval(orderObj.order_id, 'Approved', invNum);
      }
      return;
    }

    // Standard Single Unit Order Checkout
    const userRapbs = this.db.rapbs_poin.find(r => r.unit_id === this.currentUser.unit_id) || { saldo_tersedia: 0 };
    if (totalAmount > userRapbs.saldo_tersedia) {
      this.showToast('Saldo Poin RAPBS Unit tidak mencukupi!', 'error');
      return;
    }

    const newOrderId = 'ORD-' + this.generateTimestampId();
    const orderObj = {
      order_id: newOrderId,
      unit_id: this.currentUser.unit_id,
      order_type: 'E-Commerce',
      items_json: JSON.stringify(this.cart.map(c => ({
        product_name: c.raw_product_name || c.product_name,
        qty: c.qty,
        unit_price: c.unit_price,
        subtotal: c.subtotal,
        status: 'Approved',
        item_type: c.type || 'catalog',
        marketplace_url: c.marketplace_url || '',
        category: c.category || 'ATK & Kertas',
        image_url: c.image_url || '',
        recipient_name: c.recipient_name || '',
        bank_account: c.bank_account || '',
        attachments: c.attachments || null
      }))),
      total_amount: totalAmount,
      status: 'Pending_Verification',
      created_at: this.formatCurrentDateTime(),
      approved_at: '',
      notes: notes || 'Pengajuan Pengadaan Terpadu SARPRAS',
      invoice_number: ''
    };

    // Attach first reimbursement attachment if present
    const firstReimb = this.cart.find(c => c.type === 'reimbursement');
    if (firstReimb) {
      orderObj.recipient_name = firstReimb.recipient_name;
      orderObj.bank_account = firstReimb.bank_account;
      orderObj.pj_name = firstReimb.pj_name;
      orderObj.attachments = firstReimb.attachments;
    }

    this.db.orders.push(orderObj);
    this.saveState();
    this.cart = [];
    if (notesInput) notesInput.value = '';

    this.toggleCartDrawer();
    this.updateUI();
    this.showToast(`Pengajuan ${newOrderId} berhasil dikirim ke Bendahara!`, 'success');
    this.navigate('orders');

    if (this.db.gas_api_url) {
      this.syncGasOrder(orderObj);
    }
  },

  // ==========================================
  // 10. REIMBURSEMENT & CUSTOM REQUESTS DIRECT SUBMIT
  // ==========================================

  handleFileUpload(event, previewId, hiddenInputId) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      this.showToast('Ukuran file maksimal 4 MB!', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      const hiddenInput = document.getElementById(hiddenInputId);
      if (hiddenInput) hiddenInput.value = base64;

      const preview = document.getElementById(previewId);
      if (preview) {
        preview.innerHTML = `
          <div class="space-y-1">
            <i class="fa-solid fa-circle-check text-2xl text-emerald-600"></i>
            <p class="text-xs font-bold text-slate-800">File Terpilih</p>
            <p class="text-[10px] text-slate-500 truncate max-w-[120px] mx-auto">${file.name}</p>
          </div>
        `;
      }
    };
    reader.readAsDataURL(file);
  },

  handleReimburseSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('reimbTitle').value.trim();
    const amount = Number(document.getElementById('reimbAmount').value);
    const date = document.getElementById('reimbDate').value;
    const recipient = document.getElementById('reimbRecipient').value.trim();
    const bank = document.getElementById('reimbBank').value.trim();
    const pj = document.getElementById('reimbPJ').value.trim();
    const category = document.getElementById('reimbCategory').value;
    const notes = document.getElementById('reimbNotes').value.trim();

    const receipt = document.getElementById('receiptBase64').value;
    const transfer = document.getElementById('transferBase64').value;
    const photo = document.getElementById('photoBase64').value;

    const userRapbs = this.db.rapbs_poin.find(r => r.unit_id === this.currentUser.unit_id) || { saldo_tersedia: 0 };
    if (amount > userRapbs.saldo_tersedia) {
      this.showToast('Nominal klaim melebihi Saldo Poin RAPBS yang tersedia!', 'error');
      return;
    }

    const newOrderId = 'REIMB-' + this.generateTimestampId();
    const orderObj = {
      order_id: newOrderId,
      unit_id: this.currentUser.unit_id,
      order_type: 'Reimburse',
      items_json: JSON.stringify([
        { item_name: `[${category}] ${title}`, qty: 1, unit_price: amount, subtotal: amount, status: 'Approved', item_type: 'reimbursement' }
      ]),
      total_amount: amount,
      status: 'Pending_Verification',
      created_at: this.formatCurrentDateTime(),
      approved_at: '',
      notes: notes,
      recipient_name: recipient,
      bank_account: bank,
      payment_date: date,
      pj_name: pj,
      attachments: {
        receipt: receipt || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
        transfer: transfer,
        photo: photo
      },
      invoice_number: ''
    };

    this.db.orders.push(orderObj);
    this.saveState();

    document.getElementById('reimburseForm').reset();
    this.updateUI();
    this.showToast(`Klaim Reimbursement ${newOrderId} berhasil diajukan!`, 'success');
    this.navigate('orders');

    if (this.db.gas_api_url) {
      this.syncGasOrder(orderObj);
    }
  },

  handleCustomRequestSubmit(event) {
    event.preventDefault();

    const itemName = document.getElementById('custItemName').value.trim();
    const url = document.getElementById('custItemUrl').value.trim();
    const qty = Number(document.getElementById('custItemQty').value);
    const price = Number(document.getElementById('custItemPrice').value);
    const category = document.getElementById('custItemCategory').value;
    const pj = document.getElementById('custItemPJ').value.trim();
    const notes = document.getElementById('custItemNotes').value.trim();

    const totalAmount = qty * price;
    const newOrderId = 'REQ-' + this.generateTimestampId();

    const orderObj = {
      order_id: newOrderId,
      unit_id: this.currentUser.unit_id,
      order_type: 'Request_Barang_Baru',
      items_json: JSON.stringify([
        { item_name: `[${category}] ${itemName}`, qty: qty, unit_price: price, subtotal: totalAmount, status: 'Approved', item_type: 'custom_request', marketplace_url: url, category: category }
      ]),
      total_amount: totalAmount,
      status: 'Pending_Verification',
      created_at: this.formatCurrentDateTime(),
      approved_at: '',
      notes: notes,
      marketplace_url: url,
      pj_name: pj,
      invoice_number: ''
    };

    this.db.orders.push(orderObj);
    this.saveState();

    document.getElementById('customRequestForm').reset();
    this.updateUI();
    this.showToast(`Pengajuan pengadaan barang baru ${newOrderId} terkirim!`, 'success');
    this.navigate('orders');

    if (this.db.gas_api_url) {
      this.syncGasOrder(orderObj);
    }
  },

  // ==========================================
  // 11. ITEM APPROVAL & RECEIPT VIEWER CONTROLLER
  // ==========================================

  toggleItemApproval(orderId, itemIdx) {
    if (!this.orderItemApprovals[orderId]) {
      const ord = this.db.orders.find(o => o.order_id === orderId);
      if (!ord) return;
      try {
        const items = JSON.parse(ord.items_json);
        this.orderItemApprovals[orderId] = items.map(it => it.status !== 'Rejected');
      } catch (e) {
        this.orderItemApprovals[orderId] = [];
      }
    }

    this.orderItemApprovals[orderId][itemIdx] = !this.orderItemApprovals[orderId][itemIdx];
    this.renderVerificationView();
  },

  handleTransferProofUpload(event, orderId) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      this.showToast('Ukuran file maksimal 4 MB!', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      this.pendingTransferProofs[orderId] = base64;
      this.renderVerificationView();
      this.showToast('Bukti transfer berhasil dipilih!', 'success');
    };
    reader.readAsDataURL(file);
  },

  viewReceiptImage(imageUrl, title, details) {
    const modal = document.getElementById('receiptViewerModal');
    const img = document.getElementById('receiptViewerImage');
    const titleEl = document.getElementById('receiptViewerTitle');
    const detailsEl = document.getElementById('receiptViewerDetails');
    const downloadBtn = document.getElementById('receiptViewerDownloadBtn');

    if (!modal || !img) return;

    img.src = imageUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80';
    if (titleEl) titleEl.textContent = title || 'Bukti Kwitansi Nota';
    if (detailsEl) detailsEl.innerHTML = `<span class="text-xs font-semibold text-slate-700">${details || ''}</span>`;
    if (downloadBtn) downloadBtn.href = img.src;

    modal.classList.remove('hidden');
  },

  closeReceiptViewer() {
    const modal = document.getElementById('receiptViewerModal');
    if (modal) modal.classList.add('hidden');
  },

  autoCreateMasterProductFromRequest(req) {
    const prodName = req.product_name;
    const existing = this.db.stock_inventory.find(s => s.product_name.toLowerCase() === prodName.toLowerCase());
    if (existing) return;

    const dateStr = new Date().toISOString().split('T')[0];
    const batchId = `BATCH-${dateStr.replace(/-/g, '').slice(0, 6)}-${Math.floor(Math.random() * 90 + 10)}`;
    
    this.db.stock_inventory.push({
      batch_id: batchId,
      product_name: prodName,
      category: req.category || 'ATK & Kertas',
      stock_qty: Number(req.qty) || 1,
      unit_price: Number(req.unit_price) || 0,
      date_in: dateStr,
      method: 'FIFO',
      status: 'Active',
      image_url: req.image_url || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&auto=format&fit=crop&q=80'
    });

    this.showToast(`Master produk baru "${prodName}" otomatis ditambahkan ke katalog!`, 'success');
  },

  approveOrderWithItemStates(orderId) {
    const order = this.db.orders.find(o => o.order_id === orderId);
    if (!order) return;

    let items = [];
    try { items = JSON.parse(order.items_json); } catch(e) {}

    const approvals = this.orderItemApprovals[orderId] || items.map(() => true);
    const revisions = this.orderItemRevisions[orderId] || [];

    // Map each item with effective revised prices and quantities
    const updatedItems = items.map((it, idx) => {
      const rev = revisions[idx] || {};
      const effPrice = Number(rev.unit_price !== undefined ? rev.unit_price : it.unit_price) || 0;
      const effQty = Number(rev.qty !== undefined ? rev.qty : it.qty) || 1;
      const origPrice = Number(rev.original_unit_price !== undefined ? rev.original_unit_price : it.unit_price) || 0;
      const origQty = Number(rev.original_qty !== undefined ? rev.original_qty : it.qty) || 1;
      const isRev = Boolean(rev.is_revised || (origPrice !== effPrice) || (origQty !== effQty));
      const revReason = rev.revision_reason || it.revision_reason || '';
      const isApproved = approvals[idx] !== false;

      return {
        ...it,
        unit_price: effPrice,
        qty: effQty,
        original_unit_price: origPrice,
        original_qty: origQty,
        subtotal: effPrice * effQty,
        is_price_revised: isRev,
        is_revised: isRev,
        revision_reason: revReason,
        status: isApproved ? 'Approved' : 'Rejected'
      };
    });

    const approvedItems = updatedItems.filter(it => it.status === 'Approved');

    if (approvedItems.length === 0) {
      this.showToast('Semua item ditolak. Silakan gunakan tombol Tolak Seluruh Pengajuan.', 'warning');
      return;
    }

    const approvedAmount = approvedItems.reduce((acc, it) => acc + (Number(it.subtotal) || 0), 0);

    const unitRapbs = this.db.rapbs_poin.find(r => r.unit_id === order.unit_id);
    if (order.unit_id !== 'care_unit' && (!unitRapbs || unitRapbs.saldo_tersedia < approvedAmount)) {
      this.showToast('Saldo RAPBS Unit tidak mencukupi untuk nominal yang disetujui!', 'error');
      return;
    }

    // Deduct stock for approved catalog items
    approvedItems.forEach(item => {
      if (item.item_type === 'catalog' || (!item.item_type && order.order_type === 'E-Commerce')) {
        this.deductStockFIFO(item.product_name || item.item_name, item.qty);
      }
    });

    // Auto-create Master Products for approved custom requests with REVISED actual purchase price
    approvedItems.forEach(item => {
      if (item.item_type === 'custom_request' || order.order_type === 'Request_Barang_Baru') {
        this.autoCreateMasterProductFromRequest({
          product_name: item.raw_product_name || item.product_name || item.item_name,
          category: item.category || 'ATK & Kertas',
          unit_price: item.unit_price,
          image_url: item.image_url || '',
          qty: item.qty
        });
      }
    });

    // Update RAPBS balance
    if (unitRapbs) {
      unitRapbs.terpakai += approvedAmount;
      unitRapbs.saldo_tersedia -= approvedAmount;
      unitRapbs.updated_at = this.formatCurrentDateTime();
    }

    const invCount = this.db.transactions_log.length + 1;
    const schoolSlug = (this.db.cms_settings.app_name || 'AL-IMAM').toUpperCase().replace(/\s+/g, '-');
    const invNum = `INV/${schoolSlug}/2026/09/${String(invCount).padStart(3, '0')}`;

    const hasAnyRevision = updatedItems.some(it => it.is_price_revised);

    order.items_json = JSON.stringify(updatedItems);
    order.total_amount = approvedAmount;
    order.original_total_amount = order.original_total_amount || order.total_amount;
    order.is_price_revised = hasAnyRevision;
    order.status = 'Approved';
    order.approved_at = this.formatCurrentDateTime();
    order.invoice_number = invNum;

    // Attach transfer proof if uploaded
    if (this.pendingTransferProofs[orderId]) {
      if (!order.attachments) order.attachments = {};
      order.attachments.transfer = this.pendingTransferProofs[orderId];
      order.transfer_proof = this.pendingTransferProofs[orderId];
    }

    const logId = 'LOG-' + this.generateTimestampId();
    this.db.transactions_log.push({
      log_id: logId,
      order_id: order.order_id,
      unit_id: order.unit_id,
      amount_deducted: approvedAmount,
      remaining_balance: unitRapbs ? unitRapbs.saldo_tersedia : 0,
      timestamp: this.formatCurrentDateTime(),
      invoice_number: invNum
    });

    this.saveState();
    this.updateUI();
    this.showToast(`Pengajuan ${order.order_id} BERHASIL DISETUJUI (${approvedItems.length} item). Invoice: ${invNum}`, 'success');
    this.renderVerificationView();

    if (this.db.gas_api_url) {
      this.syncGasApproval(order.order_id, 'Approved', invNum, updatedItems, approvedAmount, order.transfer_proof || '');
    }
  },

  approveOrder(orderId) {
    this.approveOrderWithItemStates(orderId);
  },

  rejectOrder(orderId) {
    const order = this.db.orders.find(o => o.order_id === orderId);
    if (!order) return;

    order.status = 'Rejected';
    order.approved_at = this.formatCurrentDateTime();

    this.saveState();
    this.updateUI();
    this.showToast(`Pengajuan ${order.order_id} telah DITOLAK.`, 'warning');
    this.renderVerificationView();

    if (this.db.gas_api_url) {
      this.syncGasApproval(order.order_id, 'Rejected', '', [], 0, '');
    }
  },

  // ==========================================
  // PRICE REVISION CONTROLLER (Verifikasi Pengajuan)
  // ==========================================
  openPriceRevisionModal(orderId, itemIdx) {
    const order = this.db.orders.find(o => o.order_id === orderId);
    if (!order) return;

    let items = [];
    try { items = JSON.parse(order.items_json); } catch(e) {}
    const item = items[itemIdx];
    if (!item) return;

    if (!this.orderItemRevisions[orderId]) {
      this.orderItemRevisions[orderId] = items.map(it => ({
        product_name: it.product_name || it.item_name || '',
        unit_price: Number(it.unit_price) || 0,
        qty: Number(it.qty) || 1,
        original_unit_price: Number(it.original_unit_price !== undefined ? it.original_unit_price : it.unit_price) || 0,
        original_qty: Number(it.original_qty !== undefined ? it.original_qty : it.qty) || 1,
        is_revised: Boolean(it.is_price_revised || it.is_revised || (it.original_unit_price !== undefined && it.original_unit_price !== it.unit_price)),
        revision_reason: it.revision_reason || ''
      }));
    }

    const currentRev = this.orderItemRevisions[orderId][itemIdx] || {
      unit_price: item.unit_price,
      qty: item.qty,
      original_unit_price: item.unit_price,
      original_qty: item.qty,
      is_revised: false,
      revision_reason: ''
    };
    this.currentRevisionTarget = { orderId, itemIdx };

    const unitObj = this.db.users.find(u => u.unit_id === order.unit_id) || { unit_name: order.unit_id };

    const elRevOrderId = document.getElementById('revOrderId');
    const elRevItemIdx = document.getElementById('revItemIdx');
    const elRevOrigPrice = document.getElementById('revOriginalUnitPrice');
    const elRevOrigQty = document.getElementById('revOriginalQty');

    if (elRevOrderId) elRevOrderId.value = orderId;
    if (elRevItemIdx) elRevItemIdx.value = itemIdx;
    if (elRevOrigPrice) elRevOrigPrice.value = currentRev.original_unit_price;
    if (elRevOrigQty) elRevOrigQty.value = currentRev.original_qty;

    const elBadge = document.getElementById('revOrderIdBadge');
    const elUnit = document.getElementById('revUnitNameBadge');
    const elName = document.getElementById('revItemNameDisplay');

    if (elBadge) elBadge.textContent = orderId;
    if (elUnit) elUnit.textContent = unitObj.unit_name;
    if (elName) elName.textContent = item.product_name || item.item_name || 'Barang / Jasa';

    const elDispPrice = document.getElementById('revDisplayOrigPrice');
    const elDispQty = document.getElementById('revDisplayOrigQty');
    const elDispSub = document.getElementById('revDisplayOrigSubtotal');

    if (elDispPrice) elDispPrice.textContent = `Rp ${this.formatNumber(currentRev.original_unit_price)}`;
    if (elDispQty) elDispQty.textContent = `${currentRev.original_qty} pcs`;
    if (elDispSub) elDispSub.textContent = `Rp ${this.formatNumber(currentRev.original_unit_price * currentRev.original_qty)}`;

    const elInputPrice = document.getElementById('revInputPrice');
    const elInputQty = document.getElementById('revInputQty');
    const elInputReason = document.getElementById('revInputReason');

    if (elInputPrice) elInputPrice.value = currentRev.unit_price;
    if (elInputQty) elInputQty.value = currentRev.qty;
    if (elInputReason) elInputReason.value = currentRev.revision_reason || '';

    this.onPriceRevisionInput();

    const modal = document.getElementById('priceRevisionModal');
    if (modal) modal.classList.remove('hidden');
  },

  closePriceRevisionModal() {
    const modal = document.getElementById('priceRevisionModal');
    if (modal) modal.classList.add('hidden');
    this.currentRevisionTarget = { orderId: null, itemIdx: null };
  },

  onPriceRevisionInput() {
    const origPrice = Number(document.getElementById('revOriginalUnitPrice')?.value) || 0;
    const origQty = Number(document.getElementById('revOriginalQty')?.value) || 1;
    const newPrice = Number(document.getElementById('revInputPrice')?.value) || 0;
    const newQty = Number(document.getElementById('revInputQty')?.value) || 1;

    const unitDiff = newPrice - origPrice;
    const origSubtotal = origPrice * origQty;
    const newSubtotal = newPrice * newQty;
    const totalDiff = newSubtotal - origSubtotal;

    const badge = document.getElementById('revVarianceBadge');
    const unitDiffEl = document.getElementById('revUnitDiffDisplay');
    const totalDiffEl = document.getElementById('revTotalDiffDisplay');

    if (unitDiff === 0 && newQty === origQty) {
      if (badge) {
        badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700';
        badge.textContent = 'Sama dengan Pengajuan Awal';
      }
      if (unitDiffEl) unitDiffEl.textContent = 'Rp 0';
      if (totalDiffEl) totalDiffEl.textContent = 'Rp 0';
    } else if (totalDiff > 0) {
      if (badge) {
        badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300';
        badge.textContent = `+Rp ${this.formatNumber(totalDiff)} (Biaya Lebih Tinggi)`;
      }
      if (unitDiffEl) unitDiffEl.innerHTML = `<span class="text-amber-700 font-bold">+Rp ${this.formatNumber(unitDiff)}/pcs</span>`;
      if (totalDiffEl) totalDiffEl.innerHTML = `<span class="text-amber-700 font-bold font-heading">+Rp ${this.formatNumber(totalDiff)}</span>`;
    } else {
      if (badge) {
        badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300';
        badge.textContent = `-Rp ${this.formatNumber(Math.abs(totalDiff))} (Penghematan Biaya)`;
      }
      if (unitDiffEl) unitDiffEl.innerHTML = `<span class="text-emerald-700 font-bold">-Rp ${this.formatNumber(Math.abs(unitDiff))}/pcs</span>`;
      if (totalDiffEl) totalDiffEl.innerHTML = `<span class="text-emerald-700 font-bold font-heading">-Rp ${this.formatNumber(Math.abs(totalDiff))}</span>`;
    }
  },

  setRevisionPresetReason(text) {
    const input = document.getElementById('revInputReason');
    if (input) input.value = text;
  },

  applyPriceRevision(event) {
    if (event) event.preventDefault();

    const orderId = document.getElementById('revOrderId').value;
    const itemIdx = Number(document.getElementById('revItemIdx').value);
    const origPrice = Number(document.getElementById('revOriginalUnitPrice').value) || 0;
    const origQty = Number(document.getElementById('revOriginalQty').value) || 1;
    const newPrice = Number(document.getElementById('revInputPrice').value);
    const newQty = Number(document.getElementById('revInputQty').value);
    const reason = document.getElementById('revInputReason').value.trim();

    if (isNaN(newPrice) || newPrice < 0) {
      this.showToast('Harga satuan harus valid (minimal 0)!', 'warning');
      return;
    }
    if (isNaN(newQty) || newQty <= 0) {
      this.showToast('Jumlah qty harus minimal 1!', 'warning');
      return;
    }

    if (!this.orderItemRevisions[orderId]) {
      this.orderItemRevisions[orderId] = [];
    }

    const isChanged = (newPrice !== origPrice) || (newQty !== origQty);

    this.orderItemRevisions[orderId][itemIdx] = {
      unit_price: newPrice,
      qty: newQty,
      original_unit_price: origPrice,
      original_qty: origQty,
      is_revised: isChanged,
      revision_reason: reason
    };

    this.closePriceRevisionModal();
    this.renderVerificationView();
    this.showToast(isChanged ? `Revisi harga item berhasil diterapkan (Rp ${this.formatNumber(newPrice)})` : 'Harga item disimpan sesuai pengajuan.', 'success');
  },

  resetItemPriceRevision(orderId, itemIdx) {
    if (!this.orderItemRevisions[orderId] || !this.orderItemRevisions[orderId][itemIdx]) return;
    const rev = this.orderItemRevisions[orderId][itemIdx];
    rev.unit_price = rev.original_unit_price;
    rev.qty = rev.original_qty;
    rev.is_revised = false;
    rev.revision_reason = '';

    this.renderVerificationView();
    this.showToast('Harga item direset ke estimasi pengajuan awal.', 'info');
  },

  resetCurrentItemRevisionModal() {
    const origPrice = Number(document.getElementById('revOriginalUnitPrice').value) || 0;
    const origQty = Number(document.getElementById('revOriginalQty').value) || 1;
    const elInputPrice = document.getElementById('revInputPrice');
    const elInputQty = document.getElementById('revInputQty');
    const elInputReason = document.getElementById('revInputReason');

    if (elInputPrice) elInputPrice.value = origPrice;
    if (elInputQty) elInputQty.value = origQty;
    if (elInputReason) elInputReason.value = '';
    this.onPriceRevisionInput();
  },

  // ==========================================
  // EDIT PENDING ORDER CONTROLLER (Riwayat & Dokumen)
  // ==========================================
  openEditPendingOrderModal(orderId) {
    const order = this.db.orders.find(o => o.order_id === orderId);
    if (!order) return;

    this.editingOrderId = orderId;
    document.getElementById('editOrderId').value = orderId;
    document.getElementById('editOrderIdDisplay').textContent = orderId;
    document.getElementById('editOrderNotes').value = order.notes || '';
    document.getElementById('editOrderRecipient').value = order.recipient_name || '';
    document.getElementById('editOrderBank').value = order.bank_account || '';

    let items = [];
    try { items = JSON.parse(order.items_json); } catch(e) {}

    const container = document.getElementById('editOrderItemsList');
    if (container) {
      container.innerHTML = items.map((it, idx) => `
        <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div class="font-bold text-slate-800 text-[11px]">${it.product_name || it.item_name}</div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] text-slate-400 font-semibold mb-0.5">Jumlah (Qty):</label>
              <input type="number" min="1" id="editItemQty_${idx}" value="${it.qty}" oninput="app.onEditOrderQtyOrPriceChange()" class="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-brand-primary">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-semibold mb-0.5">Harga Satuan (Rp):</label>
              <input type="number" min="0" id="editItemPrice_${idx}" value="${it.unit_price}" oninput="app.onEditOrderQtyOrPriceChange()" class="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-brand-primary">
            </div>
          </div>
        </div>
      `).join('');
    }

    this.onEditOrderQtyOrPriceChange();

    const modal = document.getElementById('editOrderModal');
    if (modal) modal.classList.remove('hidden');
  },

  closeEditOrderModal() {
    const modal = document.getElementById('editOrderModal');
    if (modal) modal.classList.add('hidden');
    this.editingOrderId = null;
  },

  onEditOrderQtyOrPriceChange() {
    const orderId = this.editingOrderId;
    if (!orderId) return;
    const order = this.db.orders.find(o => o.order_id === orderId);
    if (!order) return;

    let items = [];
    try { items = JSON.parse(order.items_json); } catch(e) {}

    let total = 0;
    items.forEach((_, idx) => {
      const qtyEl = document.getElementById(`editItemQty_${idx}`);
      const priceEl = document.getElementById(`editItemPrice_${idx}`);
      const qty = qtyEl ? Number(qtyEl.value) || 0 : 0;
      const price = priceEl ? Number(priceEl.value) || 0 : 0;
      total += (qty * price);
    });

    const display = document.getElementById('editOrderTotalDisplay');
    if (display) display.textContent = `Rp ${this.formatNumber(total)}`;
  },

  handleSaveEditPendingOrder(event) {
    if (event) event.preventDefault();
    const orderId = this.editingOrderId;
    if (!orderId) return;
    const order = this.db.orders.find(o => o.order_id === orderId);
    if (!order) return;

    let items = [];
    try { items = JSON.parse(order.items_json); } catch(e) {}

    let total = 0;
    const updatedItems = items.map((it, idx) => {
      const qtyEl = document.getElementById(`editItemQty_${idx}`);
      const priceEl = document.getElementById(`editItemPrice_${idx}`);
      const qty = qtyEl ? Math.max(1, Number(qtyEl.value) || 1) : it.qty;
      const price = priceEl ? Math.max(0, Number(priceEl.value) || 0) : it.unit_price;
      const sub = qty * price;
      total += sub;
      return {
        ...it,
        qty: qty,
        unit_price: price,
        subtotal: sub
      };
    });

    order.notes = document.getElementById('editOrderNotes').value.trim();
    order.recipient_name = document.getElementById('editOrderRecipient').value.trim();
    order.bank_account = document.getElementById('editOrderBank').value.trim();
    order.items_json = JSON.stringify(updatedItems);
    order.total_amount = total;

    // Reset staged revisions if order was edited
    delete this.orderItemRevisions[orderId];

    this.saveState();
    this.updateUI();
    this.closeEditOrderModal();
    this.showToast(`Pengajuan ${orderId} berhasil diperbarui!`, 'success');

    if (this.db.gas_api_url) {
      this.syncGasUpdateOrder(orderId, {
        notes: order.notes,
        items_json: order.items_json,
        total_amount: order.total_amount
      });
    }
  },

  // ==========================================
  // BULK PRODUCT INPUT CONTROLLER (Massal)
  // ==========================================
  openBulkProductModal() {
    const modal = document.getElementById('bulkProductModal');
    if (!modal) return;

    if (!this.bulkProductRows || this.bulkProductRows.length === 0) {
      const today = new Date().toISOString().split('T')[0];
      this.bulkProductRows = [
        { product_name: '', category: 'ATK & Kertas', unit_price: '', stock_qty: 10, date_in: today, image_url: '' },
        { product_name: '', category: 'ATK & Kertas', unit_price: '', stock_qty: 10, date_in: today, image_url: '' },
        { product_name: '', category: 'Kebersihan & Sanitasi', unit_price: '', stock_qty: 10, date_in: today, image_url: '' }
      ];
    }

    this.switchBulkTab('grid');
    this.renderBulkGrid();
    modal.classList.remove('hidden');
  },

  closeBulkProductModal() {
    const modal = document.getElementById('bulkProductModal');
    if (modal) modal.classList.add('hidden');
  },

  switchBulkTab(tabName) {
    this.bulkProductActiveTab = tabName;
    ['grid', 'paste', 'upload'].forEach(t => {
      const sec = document.getElementById(`bulkSection-${t}`);
      const btn = document.getElementById(`bulkTabBtn-${t}`);
      if (sec) sec.classList.toggle('hidden', t !== tabName);
      if (btn) {
        if (t === tabName) {
          btn.className = 'px-3.5 py-1.5 rounded-xl font-bold transition bg-brand-primary text-white shadow-xs flex items-center space-x-1.5';
        } else {
          btn.className = 'px-3.5 py-1.5 rounded-xl font-semibold text-slate-600 hover:text-slate-900 transition flex items-center space-x-1.5';
        }
      }
    });

    if (tabName === 'grid') {
      this.renderBulkGrid();
    }
  },

  addBulkRow(count = 1) {
    const today = new Date().toISOString().split('T')[0];
    for (let i = 0; i < count; i++) {
      this.bulkProductRows.push({
        product_name: '',
        category: 'ATK & Kertas',
        unit_price: '',
        stock_qty: 10,
        date_in: today,
        image_url: ''
      });
    }
    this.renderBulkGrid();
  },

  removeBulkRow(index) {
    if (this.bulkProductRows.length <= 1) {
      this.bulkProductRows = [{
        product_name: '',
        category: 'ATK & Kertas',
        unit_price: '',
        stock_qty: 10,
        date_in: new Date().toISOString().split('T')[0],
        image_url: ''
      }];
    } else {
      this.bulkProductRows.splice(index, 1);
    }
    this.renderBulkGrid();
  },

  clearBulkRows() {
    const today = new Date().toISOString().split('T')[0];
    this.bulkProductRows = [
      { product_name: '', category: 'ATK & Kertas', unit_price: '', stock_qty: 10, date_in: today, image_url: '' }
    ];
    this.renderBulkGrid();
    this.showToast('Tabel baris produk dibersihkan.', 'info');
  },

  onBulkRowChange(index, field, value) {
    if (!this.bulkProductRows[index]) return;
    this.bulkProductRows[index][field] = value;

    if (field === 'product_name') {
      const name = String(value).trim();
      if (name.length >= 3 && !this.bulkProductRows[index].image_url) {
        const match = CURATED_PRODUCT_PHOTOS.find(item => {
          const qTokens = name.toLowerCase().split(/\s+/);
          return qTokens.some(tok => item.keywords.some(k => k.includes(tok) || tok.includes(k)));
        });
        if (match) {
          this.bulkProductRows[index].image_url = match.image;
          const imgInput = document.getElementById(`bulkImg_${index}`);
          if (imgInput) imgInput.value = match.image;
          const thumbEl = document.getElementById(`bulkThumb_${index}`);
          if (thumbEl) {
            thumbEl.src = match.image;
            thumbEl.classList.remove('hidden');
          }
        }
      }
    }

    this.updateBulkSummary();
  },

  renderBulkGrid() {
    const tbody = document.getElementById('bulkProductTableBody');
    if (!tbody) return;

    const categories = [
      'ATK & Kertas',
      'Kebersihan & Sanitasi',
      'Elektronik & IT',
      'Perlengkapan Kelas',
      'Buku & Modul',
      'Sarana Olahraga & Ekstra',
      'Lain-lain'
    ];

    tbody.innerHTML = this.bulkProductRows.map((row, idx) => `
      <tr class="hover:bg-slate-50/60 transition">
        <td class="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">${idx + 1}</td>
        <td class="py-2 px-3">
          <input type="text" value="${escapeHtml(row.product_name)}" placeholder="Nama barang / spidol / kertas..." oninput="app.onBulkRowChange(${idx}, 'product_name', this.value)" class="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-primary">
        </td>
        <td class="py-2 px-3">
          <select onchange="app.onBulkRowChange(${idx}, 'category', this.value)" class="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-brand-primary">
            ${categories.map(c => `<option value="${c}" ${row.category === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </td>
        <td class="py-2 px-3">
          <div class="relative">
            <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold">Rp</span>
            <input type="number" min="0" placeholder="0" value="${row.unit_price !== '' ? row.unit_price : ''}" oninput="app.onBulkRowChange(${idx}, 'unit_price', Number(this.value))" class="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-right focus:bg-white focus:outline-none focus:border-brand-primary">
          </div>
        </td>
        <td class="py-2 px-3">
          <input type="number" min="0" value="${row.stock_qty !== undefined ? row.stock_qty : 10}" oninput="app.onBulkRowChange(${idx}, 'stock_qty', Number(this.value))" class="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center focus:bg-white focus:outline-none focus:border-brand-primary">
        </td>
        <td class="py-2 px-3">
          <input type="date" value="${row.date_in || new Date().toISOString().split('T')[0]}" onchange="app.onBulkRowChange(${idx}, 'date_in', this.value)" class="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-brand-primary">
        </td>
        <td class="py-2 px-3">
          <div class="flex items-center space-x-1.5">
            <img id="bulkThumb_${idx}" src="${row.image_url || ''}" class="${row.image_url ? '' : 'hidden'} w-7 h-7 object-cover rounded-lg border border-slate-200 shrink-0">
            <input type="text" id="bulkImg_${idx}" value="${escapeHtml(row.image_url || '')}" placeholder="URL Gambar..." oninput="app.onBulkRowChange(${idx}, 'image_url', this.value)" class="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-mono focus:bg-white focus:outline-none focus:border-brand-primary">
          </div>
        </td>
        <td class="py-2 px-2 text-center">
          <button type="button" onclick="app.removeBulkRow(${idx})" class="w-7 h-7 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Hapus baris ini">
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </td>
      </tr>
    `).join('');

    this.updateBulkSummary();
  },

  updateBulkSummary() {
    const validRows = this.bulkProductRows.filter(r => r && r.product_name && r.product_name.trim() !== '');
    const totalItems = validRows.length;
    const totalQty = validRows.reduce((acc, r) => acc + (Number(r.stock_qty) || 0), 0);
    const totalValuation = validRows.reduce((acc, r) => acc + ((Number(r.stock_qty) || 0) * (Number(r.unit_price) || 0)), 0);

    const elItems = document.getElementById('bulkSummaryTotalItems');
    const elQty = document.getElementById('bulkSummaryTotalQty');
    const elVal = document.getElementById('bulkSummaryTotalValuation');

    if (elItems) elItems.textContent = `${totalItems} item siap simpan`;
    if (elQty) elQty.textContent = `${totalQty} pcs`;
    if (elVal) elVal.textContent = `Rp ${this.formatNumber(totalValuation)}`;
  },

  parsePastedSpreadsheet() {
    const textarea = document.getElementById('bulkPasteTextarea');
    const text = textarea ? textarea.value.trim() : '';
    if (!text) {
      this.showToast('Silakan tempelkan teks dari Excel terlebih dahulu!', 'warning');
      return;
    }

    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) {
      this.showToast('Tidak ada baris data yang terdeteksi!', 'warning');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newRows = [];

    lines.forEach((line) => {
      let cols = line.split('\t');
      if (cols.length < 2) cols = line.split(';');
      if (cols.length < 2) cols = line.split(',');

      const name = cols[0] ? cols[0].trim().replace(/^["']|["']$/g, '') : '';
      if (!name || name.toLowerCase().includes('nama produk') || name.toLowerCase().includes('product_name')) {
        return;
      }

      const cat = cols[1] ? cols[1].trim().replace(/^["']|["']$/g, '') : 'ATK & Kertas';
      const rawPrice = cols[2] ? cols[2].replace(/[^0-9]/g, '') : '0';
      const price = Number(rawPrice) || 0;
      const rawQty = cols[3] ? cols[3].replace(/[^0-9]/g, '') : '10';
      const qty = Number(rawQty) || 10;
      const dateIn = (cols[4] && cols[4].match(/^\d{4}-\d{2}-\d{2}$/)) ? cols[4].trim() : today;
      let img = cols[5] ? cols[5].trim().replace(/^["']|["']$/g, '') : '';

      if (!img && name.length >= 3) {
        const match = CURATED_PRODUCT_PHOTOS.find(item => {
          const qTokens = name.toLowerCase().split(/\s+/);
          return qTokens.some(tok => item.keywords.some(k => k.includes(tok) || tok.includes(k)));
        });
        if (match) img = match.image;
      }

      newRows.push({
        product_name: name,
        category: cat || 'ATK & Kertas',
        unit_price: price,
        stock_qty: qty,
        date_in: dateIn,
        image_url: img
      });
    });

    if (newRows.length === 0) {
      this.showToast('Gagal mem-parse data. Pastikan format kolom sesuai panduan!', 'error');
      return;
    }

    this.bulkProductRows = newRows;
    this.switchBulkTab('grid');
    this.showToast(`Berhasil mem-parse ${newRows.length} baris dari Excel!`, 'success');
  },

  copyBulkSampleTemplate() {
    const template = "Nama Produk\tKategori\tHarga Satuan\tStok Awal\tTanggal Masuk\tURL Foto\nSpidol Whiteboard Snowman Hitam\tATK & Kertas\t9000\t50\t2026-10-03\t\nKertas HVS PaperOne A4 80gr\tATK & Kertas\t52000\t20\t2026-10-03\t\nSapu Lantai Ijuk Dragon\tKebersihan & Sanitasi\t28000\t15\t2026-10-03\t\nStop Kontak Uticon 4 Lubang 3M\tElektronik & IT\t65000\t8\t2026-10-03\t";
    navigator.clipboard.writeText(template).then(() => {
      this.showToast('Format template Excel disalin ke clipboard! Silakan paste di Excel.', 'success');
    }).catch(() => {
      this.showToast('Gagal menyalin, silakan gunakan tombol Unduh Template CSV.', 'warning');
    });
  },

  downloadBulkTemplateCSV() {
    const csv = "Nama Produk,Kategori,Harga Satuan,Stok Awal,Tanggal Masuk,URL Foto\n" +
      "Spidol Whiteboard Snowman Hitam,ATK & Kertas,9000,50,2026-10-03,\n" +
      "Kertas HVS PaperOne A4 80gr,ATK & Kertas,52000,20,2026-10-03,\n" +
      "Sapu Lantai Ijuk Dragon,Kebersihan & Sanitasi,28000,15,2026-10-03,\n" +
      "Stop Kontak Uticon 4 Lubang 3M,Elektronik & IT,65000,8,2026-10-03,";

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Template_Bulk_Input_Produk_SARPRAS.csv';
    link.click();
    this.showToast('File template CSV berhasil diunduh.', 'success');
  },

  handleBulkCsvUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const textarea = document.getElementById('bulkPasteTextarea');
      if (textarea) textarea.value = content;
      this.parsePastedSpreadsheet();
    };
    reader.readAsText(file);
  },

  handleSaveBulkProducts() {
    const validRows = this.bulkProductRows.filter(r => r && r.product_name && r.product_name.trim() !== '');
    if (validRows.length === 0) {
      this.showToast('Silakan isi minimal 1 nama produk pada tabel!', 'warning');
      return;
    }

    const dateStr = new Date().toISOString().split('T')[0];
    const newBatches = validRows.map((r) => {
      const batchId = `BATCH-${dateStr.replace(/-/g, '').slice(0, 6)}-${Math.floor(Math.random() * 900 + 100)}`;
      const qty = Number(r.stock_qty) || 0;
      const price = Number(r.unit_price) || 0;

      let photo = r.image_url || '';
      if (!photo) {
        const match = CURATED_PRODUCT_PHOTOS.find(item => {
          const qTokens = r.product_name.toLowerCase().split(/\s+/);
          return qTokens.some(tok => item.keywords.some(k => k.includes(tok) || tok.includes(k)));
        });
        if (match) photo = match.image;
        else photo = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80';
      }

      return {
        batch_id: batchId,
        product_name: r.product_name.trim(),
        category: r.category || 'ATK & Kertas',
        stock_qty: qty,
        unit_price: price,
        date_in: r.date_in || dateStr,
        method: 'FIFO',
        status: qty > 0 ? 'Active' : 'Empty',
        image_url: photo
      };
    });

    this.db.stock_inventory.push(...newBatches);
    this.saveState();

    this.clearBulkRows();
    this.closeBulkProductModal();
    this.updateUI();
    this.checkStockAlerts();

    if (this.activeView === 'inventory') {
      this.renderInventoryTable();
      this.renderMasterProductsTable();
    }
    if (this.activeView === 'catalog') this.renderCatalog();

    this.showToast(`🎉 Berhasil menambahkan ${newBatches.length} master produk baru secara massal!`, 'success');

    if (this.db.gas_api_url) {
      this.syncGasBulkProducts(newBatches);
    }
  },

  // ==========================================
  // 12. RESTOCK INVENTORY BATCH
  // ==========================================

  // ==========================================
  // 12. MASTER PRODUCT & BATCH MANAGEMENT (CRUD)
  // ==========================================

  openAddProductModal() {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    document.getElementById('productModalMode').value = 'add';
    document.getElementById('productModalOriginalName').value = '';
    document.getElementById('productModalTitle').textContent = 'Tambah Master Produk Baru';
    document.getElementById('productModalSubmitBtnText').textContent = 'Simpan Master Produk';
    
    document.getElementById('productModalName').value = '';
    document.getElementById('productModalCategory').value = 'ATK & Kertas';
    document.getElementById('productModalPrice').value = '';
    document.getElementById('productModalStock').value = '10';
    document.getElementById('productModalDateIn').value = new Date().toISOString().split('T')[0];

    const urlInput = document.getElementById('productModalMarketplaceUrl');
    if (urlInput) urlInput.value = '';
    this.setProductModalPhoto('');
    const galleryContainer = document.getElementById('productPhotoGalleryContainer');
    if (galleryContainer) galleryContainer.classList.add('hidden');

    const stockContainer = document.getElementById('productModalAddStockContainer');
    if (stockContainer) stockContainer.classList.remove('hidden');

    const btnDelete = document.getElementById('btnDeleteProduct');
    if (btnDelete) btnDelete.classList.add('hidden');

    modal.classList.remove('hidden');
  },

  openEditProductModal(productName) {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    const prods = this.getAggregatedProducts();
    const prod = prods.find(p => p.name === productName);
    if (!prod) {
      this.showToast('Produk tidak ditemukan', 'error');
      return;
    }

    document.getElementById('productModalMode').value = 'edit';
    document.getElementById('productModalOriginalName').value = productName;
    document.getElementById('productModalTitle').textContent = `Edit Master Produk: ${productName}`;
    document.getElementById('productModalSubmitBtnText').textContent = 'Simpan Perubahan Master';

    document.getElementById('productModalName').value = prod.name;
    document.getElementById('productModalCategory').value = prod.category;
    document.getElementById('productModalPrice').value = prod.earliest_price;

    const urlInput = document.getElementById('productModalMarketplaceUrl');
    if (urlInput) urlInput.value = '';
    this.setProductModalPhoto(prod.image_url || '');
    const galleryContainer = document.getElementById('productPhotoGalleryContainer');
    if (galleryContainer) galleryContainer.classList.add('hidden');

    const stockContainer = document.getElementById('productModalAddStockContainer');
    if (stockContainer) stockContainer.classList.add('hidden');

    const btnDelete = document.getElementById('btnDeleteProduct');
    if (btnDelete) btnDelete.classList.remove('hidden');

    modal.classList.remove('hidden');
  },

  closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) modal.classList.add('hidden');
  },

  onProductNameInput() {
    // When typing product name, if no photo selected yet, auto populate suggestions
    const name = document.getElementById('productModalName').value.trim();
    if (name.length >= 3) {
      const currentPhoto = document.getElementById('productModalImage').value;
      if (!currentPhoto) {
        // Find best match silently
        const match = CURATED_PRODUCT_PHOTOS.find(item => {
          const qTokens = name.toLowerCase().split(/\s+/);
          return qTokens.some(tok => item.keywords.some(k => k.includes(tok) || tok.includes(k)));
        });
        if (match) {
          this.setProductModalPhoto(match.image);
        }
      }
    }
  },

  async fetchMarketplaceProduct() {
    const urlInput = document.getElementById('productModalMarketplaceUrl');
    const url = urlInput ? urlInput.value.trim() : '';
    if (!url) {
      this.showToast('Silakan tempelkan link produk Shopee / Tokopedia / URL Gambar terlebih dahulu!', 'warning');
      return;
    }

    const btn = document.getElementById('btnFetchMarketplace');
    const originalBtnText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Ambil...</span>';
      btn.disabled = true;
    }

    try {
      // 1. Direct Image URL check
      const lower = url.toLowerCase();
      if (lower.match(/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i) || lower.includes('img.susercontent.com') || lower.includes('images.tokopedia.net')) {
        this.setProductModalPhoto(url);
        this.showToast('Foto berhasil dimuat dari link gambar langsung!', 'success');
        return;
      }

      // 2. Call Google Apps Script REST backend scraper if URL configured
      if (this.db.gas_api_url) {
        try {
          const response = await fetch(`${this.db.gas_api_url}?action=fetchMarketplaceInfo&url=${encodeURIComponent(url)}`);
          const json = await response.json();
          if (json.status === 'success' && json.data && json.data.image_url) {
            this.setProductModalPhoto(json.data.image_url);
            
            const nameInput = document.getElementById('productModalName');
            if (nameInput && (!nameInput.value || nameInput.value.trim() === '') && json.data.title) {
              nameInput.value = json.data.title;
            }
            const priceInput = document.getElementById('productModalPrice');
            if (priceInput && (!priceInput.value || Number(priceInput.value) === 0) && json.data.price > 0) {
              priceInput.value = json.data.price;
            }

            this.showToast('Foto & Info produk berhasil diambil dari marketplace!', 'success');
            return;
          }
        } catch (e) {
          console.warn('Backend scrape error, falling back:', e);
        }
      }

      // 3. Fallback Smart Client-Side Extractor for Shopee & Tokopedia
      let extractedImage = '';
      let extractedTitle = '';

      if (url.includes('shopee.co.id')) {
        const matchFile = url.match(/file\/([a-zA-Z0-9_-]+)/);
        if (matchFile) {
          extractedImage = `https://down-id.img.susercontent.com/file/${matchFile[1]}`;
        } else {
          const slug = url.split('shopee.co.id/')[1]?.split('?')[0] || '';
          const cleanTitle = slug.replace(/-i\.\d+\.\d+/, '').replace(/-/g, ' ').trim();
          if (cleanTitle) extractedTitle = cleanTitle;
        }
      } else if (url.includes('tokopedia.com')) {
        const slug = url.split('tokopedia.com/')[1]?.split('?')[0] || '';
        const parts = slug.split('/');
        if (parts.length > 1) {
          extractedTitle = parts[parts.length - 1].replace(/-/g, ' ');
        }
      }

      if (extractedImage) {
        this.setProductModalPhoto(extractedImage);
        this.showToast('Foto produk berhasil diekstrak!', 'success');
      } else if (extractedTitle) {
        const nameInput = document.getElementById('productModalName');
        if (nameInput && !nameInput.value) nameInput.value = extractedTitle;
        this.searchAutoProductPhotos(extractedTitle);
        this.showToast(`Info produk "${extractedTitle}" terdeteksi! Menampilkan rekomendasi foto...`, 'info');
      } else {
        this.searchAutoProductPhotos(document.getElementById('productModalName').value || 'ATK');
        this.showToast('Menampilkan rekomendasi foto produk yang cocok.', 'info');
      }
    } catch (err) {
      console.warn('Fetch error:', err);
      this.showToast('Gagal memproses link marketplace. Silakan gunakan tombol "Cari Foto Otomatis".', 'error');
    } finally {
      if (btn) {
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
      }
    }
  },

  setProductModalPhoto(imageUrl) {
    const inputHidden = document.getElementById('productModalImage');
    if (inputHidden) inputHidden.value = imageUrl;
    const preview = document.getElementById('productModalImagePreview');
    const placeholder = document.getElementById('productModalImagePlaceholder');
    const btnRemove = document.getElementById('btnRemoveProductPhoto');

    if (imageUrl) {
      if (preview) {
        preview.src = imageUrl;
        preview.classList.remove('hidden');
      }
      if (placeholder) placeholder.classList.add('hidden');
      if (btnRemove) btnRemove.classList.remove('hidden');
    } else {
      if (preview) {
        preview.src = '';
        preview.classList.add('hidden');
      }
      if (placeholder) placeholder.classList.remove('hidden');
      if (btnRemove) btnRemove.classList.add('hidden');
    }
  },

  removeProductPhoto() {
    this.setProductModalPhoto('');
    const urlInput = document.getElementById('productModalMarketplaceUrl');
    if (urlInput) urlInput.value = '';
    this.showToast('Foto produk dihapus.', 'info');
  },

  searchAutoProductPhotos(customQuery) {
    const query = (customQuery || document.getElementById('productModalName').value || '').toLowerCase().trim();
    const container = document.getElementById('productPhotoGalleryContainer');
    const suggestionsGrid = document.getElementById('productPhotoGallerySuggestions');
    if (!container || !suggestionsGrid) return;

    let matched = CURATED_PRODUCT_PHOTOS.filter(item => {
      if (!query) return true;
      const qTokens = query.split(/\s+/);
      return qTokens.some(tok => item.keywords.some(k => k.includes(tok) || tok.includes(k)));
    });

    if (matched.length === 0) {
      matched = CURATED_PRODUCT_PHOTOS.slice(0, 6);
    }

    container.classList.remove('hidden');
    suggestionsGrid.innerHTML = matched.slice(0, 8).map(m => `
      <div onclick="app.selectSuggestedPhoto('${m.image}')" class="group relative rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:border-brand-primary hover:shadow-md transition bg-white aspect-square flex flex-col justify-between p-1">
        <img src="${m.image}" alt="${m.title}" class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition duration-200">
        <div class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition rounded-xl flex items-center justify-center">
          <span class="opacity-0 group-hover:opacity-100 bg-brand-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">Pilih</span>
        </div>
      </div>
    `).join('');
  },

  selectSuggestedPhoto(imageUrl) {
    this.setProductModalPhoto(imageUrl);
    const container = document.getElementById('productPhotoGalleryContainer');
    if (container) container.classList.add('hidden');
    this.showToast('Foto produk berhasil dipilih!', 'success');
  },

  handleProductImageUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      this.showToast('Ukuran gambar maksimal 2MB!', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      this.setProductModalPhoto(base64);
      this.showToast('Foto berhasil diupload!', 'success');
    };
    reader.readAsDataURL(file);
  },

  handleSaveProduct(event) {
    event.preventDefault();

    const mode = document.getElementById('productModalMode').value;
    const originalName = document.getElementById('productModalOriginalName').value;
    const newName = document.getElementById('productModalName').value.trim();
    const category = document.getElementById('productModalCategory').value;
    const price = Number(document.getElementById('productModalPrice').value);
    const imageUrl = document.getElementById('productModalImage').value || '';

    if (!newName) {
      this.showToast('Nama produk tidak boleh kosong!', 'warning');
      return;
    }

    if (mode === 'add') {
      const initialStock = Number(document.getElementById('productModalStock').value) || 0;
      const dateIn = document.getElementById('productModalDateIn').value || new Date().toISOString().split('T')[0];
      const batchId = 'BATCH-' + dateIn.replace(/-/g, '').slice(0, 6) + '-' + String(Math.floor(Math.random() * 90 + 10));

      const newBatch = {
        batch_id: batchId,
        product_name: newName,
        category: category,
        stock_qty: initialStock,
        unit_price: price,
        date_in: dateIn,
        method: 'FIFO',
        status: initialStock > 0 ? 'Active' : 'Empty',
        image_url: imageUrl
      };

      this.db.stock_inventory.push(newBatch);
      this.saveState();
      this.closeProductModal();
      this.updateUI();
      this.showToast(`Master produk '${newName}' berhasil ditambahkan ke katalog!`, 'success');

      if (this.db.gas_api_url) {
        this.syncGasProduct('add', '', {
          product_name: newName,
          category: category,
          unit_price: price,
          initial_stock: initialStock,
          date_in: dateIn,
          batch_id: batchId,
          image_url: imageUrl
        });
      }
    } else {
      let updatedCount = 0;
      this.db.stock_inventory.forEach(b => {
        if (b.product_name === originalName) {
          b.product_name = newName;
          b.category = category;
          b.unit_price = price;
          if (imageUrl) b.image_url = imageUrl;
          updatedCount++;
        }
      });

      this.saveState();
      this.closeProductModal();
      this.updateUI();
      this.showToast(`Master produk '${newName}' (${updatedCount} batch) berhasil diperbarui!`, 'success');

      if (this.db.gas_api_url) {
        this.syncGasProduct('edit', originalName, {
          product_name: newName,
          category: category,
          unit_price: price,
          image_url: imageUrl
        });
      }
    }

    if (this.activeView === 'catalog') this.renderCatalog();
    if (this.activeView === 'inventory') {
      this.renderInventoryTable();
      this.renderMasterProductsTable();
    }
  },

  handleDeleteProductModal() {
    const originalName = document.getElementById('productModalOriginalName').value;
    if (originalName) {
      this.closeProductModal();
      this.handleDeleteProductDirect(originalName);
    }
  },

  handleDeleteProductDirect(productName) {
    if (!confirm(`Apakah Anda yakin ingin menghapus produk "${productName}" beserta seluruh batch stoknya dari sistem?`)) {
      return;
    }

    const initialLength = this.db.stock_inventory.length;
    this.db.stock_inventory = this.db.stock_inventory.filter(b => b.product_name !== productName);
    const removedCount = initialLength - this.db.stock_inventory.length;

    this.saveState();
    this.updateUI();
    this.showToast(`Produk "${productName}" (${removedCount} batch) berhasil dihapus!`, 'success');

    if (this.db.gas_api_url) {
      this.syncGasDeleteProduct(productName);
    }

    if (this.activeView === 'catalog') this.renderCatalog();
    if (this.activeView === 'inventory') {
      this.renderInventoryTable();
      this.renderMasterProductsTable();
    }
  },

  openEditBatchModal(batchId) {
    const batch = this.db.stock_inventory.find(b => b.batch_id === batchId);
    if (!batch) {
      this.showToast('Batch tidak ditemukan!', 'error');
      return;
    }

    const modal = document.getElementById('editBatchModal');
    if (!modal) return;

    document.getElementById('editBatchId').value = batch.batch_id;
    document.getElementById('editBatchIdDisplay').textContent = batch.batch_id;
    document.getElementById('editBatchProdName').value = batch.product_name;
    document.getElementById('editBatchCategory').value = batch.category;
    document.getElementById('editBatchStatus').value = batch.status;
    document.getElementById('editBatchQty').value = batch.stock_qty;
    document.getElementById('editBatchPrice').value = batch.unit_price;
    document.getElementById('editBatchDateIn').value = batch.date_in;

    modal.classList.remove('hidden');
  },

  closeEditBatchModal() {
    const modal = document.getElementById('editBatchModal');
    if (modal) modal.classList.add('hidden');
  },

  handleSaveBatchEdit(event) {
    event.preventDefault();

    const batchId = document.getElementById('editBatchId').value;
    const batch = this.db.stock_inventory.find(b => b.batch_id === batchId);
    if (!batch) {
      this.showToast('Batch tidak ditemukan!', 'error');
      return;
    }

    batch.product_name = document.getElementById('editBatchProdName').value.trim();
    batch.category = document.getElementById('editBatchCategory').value;
    batch.status = document.getElementById('editBatchStatus').value;
    batch.stock_qty = Number(document.getElementById('editBatchQty').value);
    batch.unit_price = Number(document.getElementById('editBatchPrice').value);
    batch.date_in = document.getElementById('editBatchDateIn').value;

    if (batch.stock_qty <= 0 && batch.status === 'Active') {
      batch.status = 'Empty';
    }

    this.saveState();
    this.closeEditBatchModal();
    this.updateUI();
    this.showToast(`Batch ${batchId} berhasil diperbarui!`, 'success');

    if (this.db.gas_api_url) {
      this.syncGasBatchEdit(batch);
    }

    if (this.activeView === 'inventory') {
      this.renderInventoryTable();
      this.renderMasterProductsTable();
    }
    if (this.activeView === 'catalog') this.renderCatalog();
  },

  handleDeleteBatchModal() {
    const batchId = document.getElementById('editBatchId').value;
    if (batchId) {
      this.closeEditBatchModal();
      this.handleDeleteBatchDirect(batchId);
    }
  },

  handleDeleteBatchDirect(batchId) {
    if (!confirm(`Hapus batch ${batchId} dari inventaris?`)) return;

    this.db.stock_inventory = this.db.stock_inventory.filter(b => b.batch_id !== batchId);
    this.saveState();
    this.updateUI();
    this.showToast(`Batch ${batchId} berhasil dihapus!`, 'success');

    if (this.db.gas_api_url) {
      this.syncGasDeleteBatch(batchId);
    }

    if (this.activeView === 'inventory') {
      this.renderInventoryTable();
      this.renderMasterProductsTable();
    }
    if (this.activeView === 'catalog') this.renderCatalog();
  },

  openRestockModalFor(productName, category) {
    this.openRestockModal();
    const nameInput = document.getElementById('restockProdName');
    const catInput = document.getElementById('restockCategory');
    if (nameInput) nameInput.value = productName;
    if (catInput && category) catInput.value = category;
  },

  openRestockModal() {
    const modal = document.getElementById('restockModal');
    if (modal) modal.classList.remove('hidden');
  },

  closeRestockModal() {
    const modal = document.getElementById('restockModal');
    if (modal) modal.classList.add('hidden');
  },

  handleRestockSubmit(event) {
    event.preventDefault();

    const prodName = document.getElementById('restockProdName').value.trim();
    const category = document.getElementById('restockCategory').value;
    const method = document.getElementById('restockMethod').value;
    const qty = Number(document.getElementById('restockQty').value);
    const price = Number(document.getElementById('restockPrice').value);
    const dateIn = document.getElementById('restockDateIn').value;

    const newBatchId = 'BATCH-' + dateIn.replace(/-/g, '').slice(0, 6) + '-' + String(Math.floor(Math.random() * 90 + 10));

    const newBatch = {
      batch_id: newBatchId,
      product_name: prodName,
      category: category,
      stock_qty: qty,
      unit_price: price,
      date_in: dateIn,
      method: method || 'FIFO',
      status: 'Active'
    };

    this.db.stock_inventory.push(newBatch);
    this.saveState();

    this.closeRestockModal();
    this.updateUI();
    this.checkStockAlerts();
    this.showToast(`Batch restock ${newBatchId} (${prodName}) berhasil dicatat!`, 'success');
    
    if (this.db.gas_api_url) {
      this.syncGasRestock(newBatch);
    }

    if (this.activeView === 'inventory') {
      this.renderInventoryTable();
      this.renderMasterProductsTable();
    }
    if (this.activeView === 'catalog') this.renderCatalog();
  },

  // ==========================================
  // 12B. INVOICE & TRANSACTION DETAIL MODAL
  // ==========================================
  currentInvoiceDetailTarget: null,

  openInvoiceDetailModal(orderIdOrInvNum, logId, invNumFallback) {
    // 1. Find log if logId provided, or by order_id or invoice_number
    let log = null;
    if (logId) {
      log = this.db.transactions_log.find(l => l.log_id === logId);
    }
    if (!log && orderIdOrInvNum) {
      log = this.db.transactions_log.find(l => l.order_id === orderIdOrInvNum || l.invoice_number === orderIdOrInvNum);
    }

    // 2. Find order
    let order = null;
    if (orderIdOrInvNum) {
      order = this.db.orders.find(o => o.order_id === orderIdOrInvNum || o.invoice_number === orderIdOrInvNum);
    }
    if (!order && log && log.order_id) {
      order = this.db.orders.find(o => o.order_id === log.order_id);
    }

    // Determine values with graceful fallbacks
    const invoiceNumber = (order && order.invoice_number) || (log && log.invoice_number) || invNumFallback || (order ? order.order_id : '-');
    const unitId = (order && order.unit_id) || (log && log.unit_id) || 'unit_sd';
    const unitObj = this.db.users.find(u => u.unit_id === unitId) || { unit_name: unitId === 'unit_sd' ? 'SD Islam Al-Imam' : (unitId === 'unit_smp' ? 'SMP Islam Al-Imam' : unitId) };
    const amountDeducted = (log && log.amount_deducted !== undefined) ? log.amount_deducted : (order ? order.total_amount : 0);
    const remainingBalance = (log && log.remaining_balance !== undefined) ? log.remaining_balance : ((this.db.rapbs_poin && this.db.rapbs_poin.find(r => r.unit_id === unitId)?.saldo_tersedia) || 0);
    const timestamp = (log && log.timestamp) || (order && (order.approved_at || order.created_at)) || this.formatCurrentDateTime();
    const orderId = (order && order.order_id) || (log && log.order_id) || '-';
    const orderType = (order && order.order_type) ? order.order_type.replace(/_/g, ' ') : 'Pengadaan SARPRAS';
    const status = (order && order.status) || 'Approved';

    this.currentInvoiceDetailTarget = { order, log, orderId, invoiceNumber };

    // Fill UI elements
    const elInvNum = document.getElementById('invDetailInvoiceNumber');
    if (elInvNum) elInvNum.textContent = invoiceNumber;

    const elStatus = document.getElementById('invDetailStatusBadge');
    if (elStatus) {
      if (status === 'Approved') {
        elStatus.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300';
        elStatus.textContent = 'LUNAS / APPROVED';
      } else if (status === 'Pending_Verification') {
        elStatus.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300';
        elStatus.textContent = 'MENUNGGU VERIFIKASI';
      } else {
        elStatus.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-800 border border-red-300';
        elStatus.textContent = 'DITOLAK';
      }
    }

    const elUnitName = document.getElementById('invDetailUnitName');
    if (elUnitName) elUnitName.textContent = unitObj.unit_name;

    const elAmtDeducted = document.getElementById('invDetailAmountDeducted');
    if (elAmtDeducted) elAmtDeducted.textContent = `- Rp ${this.formatNumber(amountDeducted)}`;

    const elOrderType = document.getElementById('invDetailOrderType');
    if (elOrderType) elOrderType.textContent = orderType;

    const elRemaining = document.getElementById('invDetailRemainingBalance');
    if (elRemaining) elRemaining.textContent = `Rp ${this.formatNumber(remainingBalance)}`;

    const elTimestamp = document.getElementById('invDetailTimestamp');
    if (elTimestamp) elTimestamp.textContent = timestamp;

    const elOrderId = document.getElementById('invDetailOrderId');
    if (elOrderId) elOrderId.textContent = `Ref: ${orderId}`;

    // Parse Items
    let items = [];
    if (order && order.items_json) {
      try {
        items = typeof order.items_json === 'string' ? JSON.parse(order.items_json) : order.items_json;
      } catch (e) {
        items = [];
      }
    }

    const tbody = document.getElementById('invDetailItemsTableBody');
    const elCountBadge = document.getElementById('invDetailItemCountBadge');
    const elTotalFooter = document.getElementById('invDetailTotalAmountFooter');

    if (tbody) {
      if (items.length > 0) {
        if (elCountBadge) elCountBadge.textContent = `${items.length} Item`;
        let totalSum = 0;
        tbody.innerHTML = items.map((it, idx) => {
          const isItemApproved = it.status !== 'Rejected';
          const isRevised = it.is_price_revised || (it.original_unit_price && it.original_unit_price !== it.unit_price);
          const sub = Number(it.subtotal) || (Number(it.qty) * Number(it.unit_price)) || 0;
          if (isItemApproved) totalSum += sub;

          return `
            <tr class="hover:bg-slate-50/80 transition ${isItemApproved ? '' : 'text-slate-400 bg-red-50/20'}">
              <td class="py-2.5 px-3 text-center text-slate-400 font-mono text-[11px]">${idx + 1}</td>
              <td class="py-2.5 px-3">
                <span class="${isItemApproved ? 'font-bold text-slate-800' : 'line-through text-slate-400'} block">
                  ${escapeHtml(it.product_name || it.item_name)}
                </span>
                ${isRevised ? `
                  <div class="text-[10px] text-amber-700 font-normal mt-0.5 flex items-center space-x-1 flex-wrap">
                    <span class="px-1.5 py-0.2 bg-amber-100 border border-amber-300 rounded font-semibold text-[9px]">Revisi Nota</span>
                    <span>Semula Rp ${this.formatNumber(it.original_unit_price || 0)}</span>
                    ${it.revision_reason ? `<span class="italic text-slate-600">(${escapeHtml(it.revision_reason)})</span>` : ''}
                  </div>
                ` : ''}
              </td>
              <td class="py-2.5 px-3 text-center font-bold text-slate-700">${it.qty}</td>
              <td class="py-2.5 px-3 text-right">
                ${isRevised ? `<span class="text-[10px] line-through text-slate-400 block">Rp ${this.formatNumber(it.original_unit_price)}</span>` : ''}
                <span class="font-semibold text-slate-800">Rp ${this.formatNumber(it.unit_price)}</span>
              </td>
              <td class="py-2.5 px-3 text-right font-black font-heading ${isItemApproved ? 'text-slate-900' : 'line-through text-red-500'}">
                Rp ${this.formatNumber(sub)}
              </td>
            </tr>
          `;
        }).join('');

        if (elTotalFooter) elTotalFooter.textContent = `Rp ${this.formatNumber(totalSum || amountDeducted)}`;
      } else {
        if (elCountBadge) elCountBadge.textContent = `1 Transaksi`;
        tbody.innerHTML = `
          <tr>
            <td class="py-3 px-3 text-center text-slate-400">1</td>
            <td class="py-3 px-3 font-semibold text-slate-800">${(order && order.notes) ? escapeHtml(order.notes) : 'Pengadaan Sarana Operasional'}</td>
            <td class="py-3 px-3 text-center font-bold">1</td>
            <td class="py-3 px-3 text-right font-semibold">Rp ${this.formatNumber(amountDeducted)}</td>
            <td class="py-3 px-3 text-right font-black text-slate-900 font-heading">Rp ${this.formatNumber(amountDeducted)}</td>
          </tr>
        `;
        if (elTotalFooter) elTotalFooter.textContent = `Rp ${this.formatNumber(amountDeducted)}`;
      }
    }

    // Notes & PJ
    const elNotes = document.getElementById('invDetailNotes');
    if (elNotes) elNotes.textContent = (order && order.notes) || '-';

    const elPjName = document.getElementById('invDetailPjName');
    if (elPjName) elPjName.textContent = (order && order.pj_name) || unitObj.unit_name;

    // Reimbursement Details
    const elReimb = document.getElementById('invDetailReimburseDetails');
    if (elReimb) {
      if (order && (order.recipient_name || order.bank_account)) {
        elReimb.classList.remove('hidden');
        const rName = document.getElementById('invDetailRecipient');
        const bAcc = document.getElementById('invDetailBankAccount');
        if (rName) rName.textContent = order.recipient_name || '-';
        if (bAcc) bAcc.textContent = order.bank_account || '-';
      } else {
        elReimb.classList.add('hidden');
      }
    }

    // Attachments
    const attachContainer = document.getElementById('invDetailAttachmentsContainer');
    const attachList = document.getElementById('invDetailAttachmentsList');
    if (attachContainer && attachList) {
      const attachments = order ? (order.attachments || (order.transfer_proof ? { transfer: order.transfer_proof } : null)) : null;
      let attachHTML = '';

      if (attachments) {
        if (attachments.receipt) {
          attachHTML += `
            <div class="flex items-center space-x-3 p-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-emerald-500 hover:shadow-sm transition group" onclick="app.viewReceiptImage('${attachments.receipt}', 'Bukti Kwitansi / Nota', 'Invoice: ${invoiceNumber}')">
              <img src="${attachments.receipt}" class="w-12 h-12 object-cover rounded-lg border border-slate-200 group-hover:opacity-90">
              <div>
                <span class="text-xs font-bold text-slate-800 block group-hover:text-brand-primary">1. Nota Kwitansi Fisik</span>
                <span class="text-[10px] text-slate-400 block"><i class="fa-solid fa-magnifying-glass-plus mr-1"></i>Klik perbesar</span>
              </div>
            </div>
          `;
        }
        if (attachments.transfer) {
          attachHTML += `
            <div class="flex items-center space-x-3 p-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-emerald-500 hover:shadow-sm transition group" onclick="app.viewReceiptImage('${attachments.transfer}', 'Bukti Transfer Bank', 'Invoice: ${invoiceNumber}')">
              <img src="${attachments.transfer}" class="w-12 h-12 object-cover rounded-lg border border-slate-200 group-hover:opacity-90">
              <div>
                <span class="text-xs font-bold text-slate-800 block group-hover:text-brand-primary">2. Bukti Transfer Bank</span>
                <span class="text-[10px] text-slate-400 block"><i class="fa-solid fa-magnifying-glass-plus mr-1"></i>Klik perbesar</span>
              </div>
            </div>
          `;
        }
      }

      if (attachHTML) {
        attachList.innerHTML = attachHTML;
        attachContainer.classList.remove('hidden');
      } else {
        attachContainer.classList.add('hidden');
      }
    }

    // Toggle Print Document Button
    const btnPrint = document.getElementById('btnInvDetailPrintDoc');
    if (btnPrint) {
      if (order) {
        btnPrint.classList.remove('hidden');
      } else {
        btnPrint.classList.add('hidden');
      }
    }

    const modal = document.getElementById('invoiceDetailModal');
    if (modal) modal.classList.remove('hidden');
  },

  closeInvoiceDetailModal() {
    const modal = document.getElementById('invoiceDetailModal');
    if (modal) modal.classList.add('hidden');
  },

  openPrintModalFromDetail() {
    if (this.currentInvoiceDetailTarget && this.currentInvoiceDetailTarget.order) {
      this.closeInvoiceDetailModal();
      this.openPrintModal(this.currentInvoiceDetailTarget.order.order_id);
    }
  },

  // ==========================================
  // 13. PRINT ENGINE & TEMPLATE GENERATORS
  // ==========================================

  openPrintModal(orderId) {
    const order = this.db.orders.find(o => o.order_id === orderId);
    if (!order) return;

    this.currentPrintDoc = order;
    this.currentPrintType = 'invoice';
    this.renderPrintDocument();

    const modal = document.getElementById('printModal');
    if (modal) modal.classList.remove('hidden');
  },

  closePrintModal() {
    const modal = document.getElementById('printModal');
    if (modal) modal.classList.add('hidden');
  },

  switchPrintDocType(type) {
    this.currentPrintType = type;

    ['invoice', 'proposal', 'lpj'].forEach(t => {
      const btn = document.getElementById(`btnPrintType${t.charAt(0).toUpperCase() + t.slice(1)}`);
      if (btn) {
        if (t === type) {
          btn.className = 'px-2.5 py-1 bg-brand-light font-bold text-xs rounded-lg';
        } else {
          btn.className = 'px-2.5 py-1 bg-slate-100 text-slate-600 font-semibold text-xs rounded-lg hover:bg-slate-200';
        }
      }
    });

    this.renderPrintDocument();
  },

  renderPrintDocument() {
    if (!this.currentPrintDoc) return;
    const container = document.getElementById('printDocumentContent');
    if (!container) return;

    const ord = this.currentPrintDoc;
    const unitObj = this.db.users.find(u => u.unit_id === ord.unit_id) || { unit_name: ord.unit_id };
    const cms = this.db.cms_settings || DEFAULT_CMS_SETTINGS;
    const signers = cms.signers || DEFAULT_CMS_SETTINGS.signers;
    const branding = cms.branding || DEFAULT_CMS_SETTINGS.branding;

    let items = [];
    try { items = JSON.parse(ord.items_json); } catch(e) {}

    // Letterhead Logo in Print
    let printLogoHTML = '';
    if (branding.logo_mode === 'image' && branding.logo_image) {
      printLogoHTML = `<img src="${branding.logo_image}" class="w-12 h-12 object-contain rounded" alt="Logo">`;
    } else {
      printLogoHTML = `<div class="w-12 h-12 rounded bg-slate-900 text-white flex items-center justify-center text-lg font-bold"><i class="fa-solid ${branding.logo_icon || 'fa-mosque'}"></i></div>`;
    }

    // 1. Template: KWITANSI / INVOICE PEMBELIAN LUNAS
    if (this.currentPrintType === 'invoice') {
      const stampBadge = ord.status === 'Approved' 
        ? '<div class="stamp-lunas">LUNAS / APPROVED</div>'
        : (ord.status === 'Pending_Verification' ? '<div class="stamp-pending">PENDING VERIF</div>' : '<div class="stamp-rejected">REJECTED</div>');

      container.innerHTML = `
        <div class="print-page text-black font-sans">
          <div class="print-header flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-4">
            <div class="flex items-center space-x-3">
              ${printLogoHTML}
              <div>
                <h1 class="text-base font-extrabold tracking-tight uppercase">${cms.foundation_name}</h1>
                <h2 class="text-xs font-bold uppercase">${cms.school_name} • BIDANG SARPRAS</h2>
                <p class="text-[10px] text-slate-600">${cms.address} • Telp: ${cms.phone}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-xs font-bold uppercase text-slate-500 block">BUKTI TRANSAKSI SARPRAS</span>
              <span class="text-sm font-mono font-extrabold text-slate-900">${ord.invoice_number || ord.order_id}</span>
            </div>
          </div>

          <div class="my-4 flex justify-between items-start">
            <div>
              <h3 class="text-sm font-bold uppercase underline">KWITANSI / NOTA PENGADAAN INTERNAL</h3>
              <p class="text-xs mt-1"><b>Unit Pemohon:</b> ${unitObj.unit_name}</p>
              <p class="text-xs"><b>Tanggal:</b> ${ord.created_at}</p>
              <p class="text-xs"><b>Beban Anggaran:</b> RAPBS Poin SARPRAS</p>
            </div>
            <div class="text-right">${stampBadge}</div>
          </div>

          <table class="print-table w-full text-xs my-4">
            <thead>
              <tr class="bg-slate-100">
                <th class="text-center w-8">No</th>
                <th>Uraian Barang / Jasa</th>
                <th class="text-center w-16">Qty</th>
                <th class="text-right w-28">Harga Satuan</th>
                <th class="text-right w-28">Jumlah (Rp)</th>
                <th class="text-center w-24">Status</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((it, idx) => {
                const isItemApproved = it.status !== 'Rejected';
                const isRevised = it.is_price_revised || (it.original_unit_price && it.original_unit_price !== it.unit_price);
                return `
                  <tr class="${isItemApproved ? '' : 'text-slate-400 bg-red-50/20'}">
                    <td class="text-center">${idx + 1}</td>
                    <td class="${isItemApproved ? 'font-semibold' : 'line-through'}">
                      ${it.product_name || it.item_name}
                      ${isRevised ? `
                        <div class="text-[10px] text-amber-700 font-normal mt-0.5">
                          *Harga Realisasi Nota (Pengajuan Awal: Rp ${this.formatNumber(it.original_unit_price || 0)})
                          ${it.revision_reason ? ` • <i>Ket: ${it.revision_reason}</i>` : ''}
                        </div>
                      ` : ''}
                    </td>
                    <td class="text-center">${it.qty}</td>
                    <td class="text-right">
                      ${isRevised ? `<span class="line-through text-slate-400 text-[10px] block">Rp ${this.formatNumber(it.original_unit_price)}</span>` : ''}
                      <span>Rp ${this.formatNumber(it.unit_price)}</span>
                    </td>
                    <td class="text-right font-bold ${isItemApproved ? '' : 'line-through text-red-500'}">Rp ${this.formatNumber(it.subtotal)}</td>
                    <td class="text-center text-[10px] font-bold ${isItemApproved ? 'text-emerald-700' : 'text-red-600'}">${isItemApproved ? 'Disetujui' : 'Ditolak'}</td>
                  </tr>
                `;
              }).join('')}
              <tr class="font-bold bg-slate-50">
                <td colspan="4" class="text-right uppercase">TOTAL NOMINAL BEBAN RAPBS:</td>
                <td colspan="2" class="text-right text-sm font-black">Rp ${this.formatNumber(ord.total_amount)}</td>
              </tr>
            </tbody>
          </table>

          <div class="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs mb-4">
            <p><b>Catatan / Keperluan:</b> ${ord.notes || '-'}</p>
            ${ord.recipient_name ? `<p class="mt-1"><b>Penerima / No. Rek:</b> ${ord.recipient_name} (${ord.bank_account || '-'})</p>` : ''}
          </div>

          ${ord.attachments && (ord.attachments.receipt || ord.attachments.transfer) ? `
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 text-xs">
              <span class="font-bold text-slate-700 block mb-2">Lampiran Bukti Transaksi:</span>
              <div class="flex flex-wrap gap-4">
                ${ord.attachments.receipt ? `
                  <div class="space-y-1">
                    <span class="text-[10px] font-semibold text-slate-500 block">1. Nota Kwitansi:</span>
                    <img src="${ord.attachments.receipt}" class="h-24 w-auto rounded border border-slate-300 object-contain">
                  </div>
                ` : ''}
                ${ord.attachments.transfer ? `
                  <div class="space-y-1">
                    <span class="text-[10px] font-semibold text-slate-500 block">2. Bukti Transfer Bank:</span>
                    <img src="${ord.attachments.transfer}" class="h-24 w-auto rounded border border-slate-300 object-contain">
                  </div>
                ` : ''}
              </div>
            </div>
          ` : ''}

          <div class="print-signature-box grid grid-cols-3 gap-4 text-center text-xs mt-6">
            <div>
              <p class="text-slate-500 mb-12">Pemohon / PJ Unit,</p>
              <p class="font-bold underline">${ord.pj_name || unitObj.unit_name}</p>
              <p class="text-[10px] text-slate-500">${unitObj.unit_name}</p>
            </div>
            <div>
              <p class="text-slate-500 mb-12">Mengetahui,</p>
              <p class="font-bold underline">${signers.kaur_name}</p>
              <p class="text-[10px] text-slate-500">${signers.kaur_title}</p>
            </div>
            <div>
              <p class="text-slate-500 mb-12">Diverifikasi & Disetujui,</p>
              <p class="font-bold underline">${signers.bendahara_name}</p>
              <p class="text-[10px] text-slate-500">${signers.bendahara_title}</p>
            </div>
          </div>
        </div>
      `;
    }

    // 2. Template: PROPOSAL PENGAJUAN
    else if (this.currentPrintType === 'proposal') {
      container.innerHTML = `
        <div class="print-page text-black font-sans">
          <div class="print-header flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-4">
            <div class="flex items-center space-x-3">
              ${printLogoHTML}
              <div>
                <h1 class="text-base font-extrabold uppercase">${cms.foundation_name}</h1>
                <h2 class="text-xs font-bold uppercase">PROPOSAL PENGAJUAN PENGADAAN SARPRAS</h2>
              </div>
            </div>
            <div class="text-right text-xs font-mono">
              <span>No. Dok: PROP/${ord.order_id}</span>
            </div>
          </div>

          <div class="text-xs space-y-3 leading-relaxed">
            <p>Kepada Yth.<br/><b>Pimpinan Yayasan / Urusan SARPRAS</b><br/>Di Tempat</p>
            
            <p>Assalamu’alaikum Warahmatullahi Wabarakatuh,</p>
            <p>Bersama surat ini kami dari <b>${unitObj.unit_name}</b> mengajukan permohonan pengadaan barang/sarana prasarana:</p>

            <table class="print-table w-full my-3">
              <thead>
                <tr class="bg-slate-100">
                  <th class="w-8">No</th>
                  <th>Nama Barang / Deskripsi</th>
                  <th class="w-16 text-center">Qty</th>
                  <th class="w-28 text-right">Est. Biaya</th>
                  <th class="w-28 text-right">Total Est. (Rp)</th>
                </tr>
              </thead>
              <tbody>
                ${items.map((it, idx) => `
                  <tr>
                    <td class="text-center">${idx + 1}</td>
                    <td><b>${it.product_name || it.item_name}</b></td>
                    <td class="text-center">${it.qty}</td>
                    <td class="text-right">Rp ${this.formatNumber(it.unit_price)}</td>
                    <td class="text-right font-bold">Rp ${this.formatNumber(it.subtotal)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="bg-slate-50 p-3 border border-slate-200 rounded text-xs space-y-1">
              <p><b>Justifikasi Kebutuhan:</b> ${ord.notes || 'Pengadaan sarana operasional unit'}</p>
              ${ord.marketplace_url ? `<p><b>Referensi Pembelian:</b> ${ord.marketplace_url}</p>` : ''}
              <p><b>Alokasi Anggaran:</b> Pos RAPBS Unit ${unitObj.unit_name}</p>
            </div>

            <p>Demikian proposal pengajuan ini kami sampaikan, atas perhatian dan persetujuannya kami ucapkan terima kasih.</p>
          </div>

          <div class="print-signature-box grid grid-cols-2 gap-8 text-center text-xs mt-10">
            <div>
              <p class="text-slate-500 mb-12">Pemohon,</p>
              <p class="font-bold underline">${ord.pj_name || unitObj.unit_name}</p>
              <p class="text-[10px] text-slate-500">PJ Sarpras Unit</p>
            </div>
            <div>
              <p class="text-slate-500 mb-12">Disetujui Oleh,</p>
              <p class="font-bold underline">${signers.bendahara_name}</p>
              <p class="text-[10px] text-slate-500">${signers.bendahara_title}</p>
            </div>
          </div>
        </div>
      `;
    }

    // 3. Template: LAPORAN PERTANGGUNGJAWABAN (LPJ)
    else if (this.currentPrintType === 'lpj') {
      container.innerHTML = `
        <div class="print-page text-black font-sans">
          <div class="print-header flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-4">
            <div class="flex items-center space-x-3">
              ${printLogoHTML}
              <div>
                <h1 class="text-base font-extrabold uppercase">${cms.foundation_name}</h1>
                <h2 class="text-xs font-bold uppercase">LAPORAN PERTANGGUNGJAWABAN (LPJ) SARPRAS</h2>
              </div>
            </div>
            <div class="text-right text-xs font-mono">
              <span>LPJ Ref: ${ord.invoice_number || ord.order_id}</span>
            </div>
          </div>

          <div class="text-xs space-y-3">
            <p><b>Unit Sekolah:</b> ${unitObj.unit_name}<br/>
            <b>Penanggung Jawab:</b> ${ord.pj_name || 'Koordinator Sarpras'}<br/>
            <b>Tanggal Realisasi:</b> ${ord.approved_at || ord.created_at}</p>

            <h4 class="font-bold uppercase text-xs border-b border-slate-300 pb-1">I. REALISASI ANGGARAN & PENGELUARAN</h4>
            <table class="print-table w-full">
              <thead>
                <tr class="bg-slate-100">
                  <th class="w-8">No</th>
                  <th>Uraian Pengeluaran</th>
                  <th class="w-16 text-center">Qty</th>
                  <th class="w-28 text-right">Biaya Satuan</th>
                  <th class="w-28 text-right">Total Realisasi</th>
                </tr>
              </thead>
              <tbody>
                ${items.map((it, idx) => {
                  const isRevised = it.is_price_revised || (it.original_unit_price && it.original_unit_price !== it.unit_price);
                  return `
                    <tr>
                      <td class="text-center">${idx + 1}</td>
                      <td>
                        <b>${it.product_name || it.item_name}</b>
                        ${isRevised ? `
                          <div class="text-[10px] text-amber-700 font-normal mt-0.5">
                            *Revisi Realisasi Nota (Pengajuan: Rp ${this.formatNumber(it.original_unit_price || 0)})
                            ${it.revision_reason ? ` - ${it.revision_reason}` : ''}
                          </div>
                        ` : ''}
                      </td>
                      <td class="text-center">${it.qty}</td>
                      <td class="text-right">
                        ${isRevised ? `<span class="line-through text-slate-400 text-[10px] block">Rp ${this.formatNumber(it.original_unit_price)}</span>` : ''}
                        Rp ${this.formatNumber(it.unit_price)}
                      </td>
                      <td class="text-right font-bold">Rp ${this.formatNumber(it.subtotal)}</td>
                    </tr>
                  `;
                }).join('')}
                <tr class="font-bold bg-slate-50">
                  <td colspan="4" class="text-right">TOTAL LAPORAN:</td>
                  <td class="text-right">Rp ${this.formatNumber(ord.total_amount)}</td>
                </tr>
              </tbody>
            </table>

            <h4 class="font-bold uppercase text-xs border-b border-slate-300 pb-1 pt-2">II. KETERANGAN & BUKTI FISIK</h4>
            <p class="text-[11px] leading-relaxed">${ord.notes || 'Pekerjaan/pembelian telah selesai dilaksanakan sesuai spesifikasi dan ketentuan sarpras.'}</p>

            ${ord.attachments && ord.attachments.receipt ? `
              <div class="my-2 p-2 border border-slate-200 rounded text-center">
                <p class="text-[10px] text-slate-500 mb-1">Lampiran Nota / Bukti Bayar Terverifikasi:</p>
                <img src="${ord.attachments.receipt}" class="max-h-40 mx-auto rounded border" alt="Nota Bukti">
              </div>
            ` : ''}
          </div>

          <div class="print-signature-box grid grid-cols-2 gap-8 text-center text-xs mt-8">
            <div>
              <p class="text-slate-500 mb-12">Yang Membuat Laporan,</p>
              <p class="font-bold underline">${ord.pj_name || unitObj.unit_name}</p>
              <p class="text-[10px] text-slate-500">PJ Sarpras Unit</p>
            </div>
            <div>
              <p class="text-slate-500 mb-12">Diverifikasi & Diterima,</p>
              <p class="font-bold underline">${signers.bendahara_name}</p>
              <p class="text-[10px] text-slate-500">${signers.bendahara_title}</p>
            </div>
          </div>
        </div>
      `;
    }
  },

  // ==========================================
  // 14. GAS BACKEND SYNC
  // ==========================================

  openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.classList.remove('hidden');
    
    const input = document.getElementById('gasEndpointUrl');
    if (input) input.value = this.db.gas_api_url || '';

    const statusEl = document.getElementById('settingsModeStatus');
    if (statusEl) {
      if (this.db.gas_api_url) {
        statusEl.innerHTML = `Terkoneksi ke Google Apps Script: <br/><code class="text-[10px] break-all">${this.db.gas_api_url}</code>`;
      } else {
        statusEl.textContent = 'Aplikasi saat ini berjalan dalam Mode Simulasi (Local Storage Cache).';
      }
    }
  },

  closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.classList.add('hidden');
  },

  saveSettings() {
    const input = document.getElementById('gasEndpointUrl');
    if (input) {
      this.db.gas_api_url = input.value.trim();
      this.saveState();
      this.showToast('Pengaturan API berhasil disimpan!', 'success');
      this.closeSettingsModal();
      this.updateUI();
    }
  },

  resetDemoData() {
    if (confirm('Kembalikan semua data transaksi ke pengaturan awal?')) {
      const currentCms = this.db.cms_settings;
      this.db = JSON.parse(JSON.stringify(INITIAL_DB));
      this.db.cms_settings = currentCms; // Preserve client branding
      this.saveState();
      this.showToast('Data simulasi berhasil direset ke standar awal.', 'success');
      this.closeSettingsModal();
      this.updateUI();
      this.navigate('dashboard');
    }
  },

  async testGasConnection() {
    const input = document.getElementById('gasEndpointUrl');
    const url = input ? input.value.trim() : '';

    if (!url) {
      this.showToast('Masukkan URL Google Apps Script Web App terlebih dahulu!', 'warning');
      return;
    }

    this.showToast('Menghubungi Google Apps Script...', 'info');

    try {
      const response = await fetch(`${url}?action=getCatalog`, { method: 'GET' });
      const resData = await response.json();
      
      if (resData && resData.status === 'success') {
        this.showToast('Koneksi ke Google Sheets BERHASIL!', 'success');
      } else {
        this.showToast('Terhubung ke GAS, namun respons database kosong.', 'info');
      }
    } catch (err) {
      console.warn('GAS fetch test error:', err);
      this.showToast('Gagal terhubung. Pastikan Web App di-deploy dengan akses "Anyone" (Siapa Saja).', 'error');
    }
  },

  async syncGasOrder(orderObj) {
    if (!this.db.gas_api_url) return;
    try {
      await fetch(this.db.gas_api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'createOrder', order: orderObj })
      });
    } catch (e) {
      console.warn('Sync order error:', e);
    }
  },

  async syncGasApproval(orderId, status, invoiceNumber, items = [], approvedAmount = 0, transferProof = '') {
    if (!this.db.gas_api_url) return;
    try {
      await fetch(this.db.gas_api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'approveOrder',
          order_id: orderId,
          status: status,
          invoice_number: invoiceNumber,
          items: items,
          approved_amount: approvedAmount,
          transfer_proof: transferProof
        })
      });
    } catch (e) {
      console.warn('Sync approval error:', e);
    }
  },

  async syncGasProduct(mode, originalName, productData) {
    if (!this.db.gas_api_url) return;
    try {
      await fetch(this.db.gas_api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'saveProduct',
          mode: mode,
          original_name: originalName,
          ...productData
        })
      });
    } catch (err) {
      console.warn('Sync Product to GAS error:', err);
    }
  },

  async syncGasDeleteProduct(productName) {
    if (!this.db.gas_api_url) return;
    try {
      await fetch(this.db.gas_api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'deleteProduct',
          product_name: productName
        })
      });
    } catch (err) {
      console.warn('Sync Delete Product to GAS error:', err);
    }
  },

  async syncGasBatchEdit(batchData) {
    if (!this.db.gas_api_url) return;
    try {
      await fetch(this.db.gas_api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'updateBatch',
          batch_id: batchData.batch_id,
          product_name: batchData.product_name,
          category: batchData.category,
          stock_qty: batchData.stock_qty,
          unit_price: batchData.unit_price,
          date_in: batchData.date_in,
          status: batchData.status,
          image_url: batchData.image_url || ''
        })
      });
    } catch (err) {
      console.warn('Sync Batch Edit to GAS error:', err);
    }
  },

  async syncGasDeleteBatch(batchId) {
    if (!this.db.gas_api_url) return;
    try {
      await fetch(this.db.gas_api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'deleteBatch',
          batch_id: batchId
        })
      });
    } catch (err) {
      console.warn('Sync Delete Batch to GAS error:', err);
    }
  },

  async syncGasRestock(batch) {
    if (!this.db.gas_api_url) return;
    try {
      await fetch(this.db.gas_api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'restockInventory', batch: batch })
      });
    } catch (e) {
      console.warn('Sync restock error:', e);
    }
  },

  exportTransactionsCSV() {
    const logs = this.db.transactions_log;
    if (logs.length === 0) {
      this.showToast('Tidak ada transaksi untuk diexport!', 'warning');
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Log ID,Order ID,Invoice Number,Unit ID,Amount Deducted,Remaining Balance,Timestamp\n";

    logs.forEach(l => {
      csvContent += `"${l.log_id}","${l.order_id}","${l.invoice_number}","${l.unit_id}","${l.amount_deducted}","${l.remaining_balance}","${l.timestamp}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Transactions_Log_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // ==========================================
  // 14.5. RAPBS BREAKDOWN & POS D.1 SARPRAS
  // ==========================================

  openRapbsBreakdownModal(unitId) {
    try {
      let targetUnit = unitId;
      if (!targetUnit || targetUnit === 'admin' || targetUnit === 'bendahara') {
        if (this.currentUser && this.currentUser.unit_id && (this.currentUser.unit_id === 'unit_tk' || this.currentUser.unit_id === 'unit_sd' || this.currentUser.unit_id === 'unit_smp')) {
          targetUnit = this.currentUser.unit_id;
        } else {
          targetUnit = this.currentBreakdownUnitId || 'unit_sd';
        }
      }
      this.currentBreakdownUnitId = targetUnit;
      const modal = document.getElementById('rapbsBreakdownModal');
      if (!modal) {
        console.error('Modal #rapbsBreakdownModal not found in DOM');
        return;
      }
      this.renderRapbsBreakdown(targetUnit);
      modal.classList.remove('hidden');
    } catch (err) {
      console.error('Error opening RAPBS breakdown modal:', err);
    }
  },

  closeRapbsBreakdownModal() {
    const modal = document.getElementById('rapbsBreakdownModal');
    if (modal) modal.classList.add('hidden');
  },

  switchBreakdownUnit(unitId) {
    this.currentBreakdownUnitId = unitId;
    this.renderRapbsBreakdown(unitId);
  },

  renderRapbsBreakdown(unitId = 'unit_sd') {
    try {
      this.currentBreakdownUnitId = unitId;
      const defaultData = (INITIAL_DB.rapbs_breakdowns && (INITIAL_DB.rapbs_breakdowns[unitId] || INITIAL_DB.rapbs_breakdowns.unit_sd)) || {
        code: 'D.1',
        title: 'SARPRAS',
        unit_name: 'Sekolah Islam Al-Imam',
        total_plafond: 35884000,
        description: 'Rincian alokasi belanja RAPBS.',
        items: []
      };

      const unitRapbs = (this.db && this.db.rapbs_poin && this.db.rapbs_poin.find(r => r.unit_id === unitId)) || { 
        total_plafond: defaultData.total_plafond, 
        terpakai: 0, 
        saldo_tersedia: defaultData.total_plafond 
      };
      
      const unitUser = (this.db && this.db.users && this.db.users.find(u => u.unit_id === unitId)) || { 
        unit_name: defaultData.unit_name || (unitId === 'unit_smp' ? 'SMP Islam Al-Imam' : (unitId === 'unit_tk' ? 'TK Islam Al-Imam' : 'SD Islam Al-Imam')) 
      };
      
      // Get breakdown from DB or seed
      const breakdown = (this.db && this.db.rapbs_breakdowns && this.db.rapbs_breakdowns[unitId]) || defaultData;

      const titleEl = document.getElementById('rapbsBreakdownTitle');
      const unitBadgeEl = document.getElementById('rapbsBreakdownUnitBadge');
      const descEl = document.getElementById('rapbsBreakdownDescription');
      const totalPlafondEl = document.getElementById('rapbsBreakdownTotalPlafond');
      const terpakaiEl = document.getElementById('rapbsBreakdownTerpakai');
      const saldoEl = document.getElementById('rapbsBreakdownSaldo');
      const tableBody = document.getElementById('rapbsBreakdownTableBody');
      const grandTotalEl = document.getElementById('rapbsBreakdownGrandTotal');

      // Unit Tab Buttons inside Modal
      const tabTk = document.getElementById('rapbsModalTabTk');
      const tabSd = document.getElementById('rapbsModalTabSd');
      const tabSmp = document.getElementById('rapbsModalTabSmp');
      const activeClass = 'px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-sm transition';
      const inactiveClass = 'px-3 py-1 bg-transparent hover:bg-slate-300/50 text-slate-700 text-xs font-semibold rounded-xl transition';

      if (tabTk) tabTk.className = unitId === 'unit_tk' ? activeClass : inactiveClass;
      if (tabSd) tabSd.className = unitId === 'unit_sd' ? activeClass : inactiveClass;
      if (tabSmp) tabSmp.className = unitId === 'unit_smp' ? activeClass : inactiveClass;

      if (titleEl) titleEl.textContent = `Pos ${breakdown.code || 'D.1'} ${breakdown.title || 'SARPRAS'}`;
      if (unitBadgeEl) unitBadgeEl.textContent = unitUser.unit_name || defaultData.unit_name;
      if (descEl) descEl.textContent = breakdown.description || 'Rincian alokasi belanja operasional dan sarana prasarana sekolah.';
      if (totalPlafondEl) totalPlafondEl.textContent = 'Rp ' + this.formatNumber(breakdown.total_plafond || unitRapbs.total_plafond);
      if (terpakaiEl) terpakaiEl.textContent = 'Rp ' + this.formatNumber(unitRapbs.terpakai);
      if (saldoEl) saldoEl.textContent = 'Rp ' + this.formatNumber(unitRapbs.saldo_tersedia);
      if (grandTotalEl) grandTotalEl.textContent = 'Rp ' + this.formatNumber(breakdown.total_plafond || unitRapbs.total_plafond);

      if (tableBody) {
        if (breakdown.items && breakdown.items.length > 0) {
          tableBody.innerHTML = breakdown.items.map((item, idx) => {
            const itemImg = item.image_url || '';
            const itemNameEsc = this.escapeHtml(item.name || '');
            const itemCatEsc = this.escapeHtml(item.category || 'SARPRAS');
            return `
              <tr class="hover:bg-amber-50/50 transition border-b border-slate-100">
                <td class="px-3.5 py-3 text-center font-bold text-slate-600">${item.no || (idx + 1)}</td>
                <td class="px-4 py-3 font-bold text-slate-800">
                  <div class="flex items-center space-x-2.5">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center border border-slate-200">
                      ${itemImg ? `<img src="${itemImg}" class="w-full h-full object-cover" onerror="this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden');">` : ''}
                      <i class="fa-solid fa-box text-slate-400 text-xs ${itemImg ? 'hidden' : ''}"></i>
                    </div>
                    <div>
                      <span class="block">${itemNameEsc}</span>
                      <span class="text-[10px] text-slate-400 font-medium">${itemCatEsc}</span>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-right font-medium text-slate-700">Rp ${this.formatNumber(item.unit_price)}</td>
                <td class="px-4 py-3 text-center font-semibold text-slate-700">${item.qty_req || '-'}</td>
                <td class="px-4 py-3 text-center font-semibold text-slate-700">${item.qty_people || '-'}</td>
                <td class="px-4 py-3 text-right font-black text-slate-900 bg-amber-50/30">Rp ${this.formatNumber(item.total)}</td>
                <td class="px-3.5 py-3 text-center">
                  <button type="button" onclick="app.quickAddBreakdownToCart(${idx}, '${unitId}')" class="px-2.5 py-1.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-[11px] rounded-lg shadow-sm transition inline-flex items-center space-x-1" title="Tambah ke Keranjang Belanja">
                    <i class="fa-solid fa-cart-plus"></i>
                    <span class="hidden sm:inline">Pesan</span>
                  </button>
                </td>
              </tr>
            `;
          }).join('');
        } else {
          tableBody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-slate-400 text-xs">Belum ada rincian item pos untuk unit ini.</td></tr>`;
        }
      }
    } catch (err) {
      console.error('Error rendering RAPBS breakdown:', err);
    }
  },

  quickAddBreakdownToCart(itemIdx, unitId = 'unit_sd') {
    try {
      const breakdown = (this.db && this.db.rapbs_breakdowns && this.db.rapbs_breakdowns[unitId]) || INITIAL_DB.rapbs_breakdowns[unitId] || INITIAL_DB.rapbs_breakdowns.unit_sd;
      if (!breakdown || !breakdown.items || !breakdown.items[itemIdx]) return;

      const item = breakdown.items[itemIdx];
      this.addToCart(item.name, item.unit_price, 999);
      this.showToast(`"${item.name}" berhasil ditambahkan ke keranjang!`, 'success');
    } catch (err) {
      console.error('Error quick adding to cart:', err);
    }
  },

  printRapbsBreakdown(targetUnitId) {
    try {
      const unitId = targetUnitId || this.currentBreakdownUnitId || 'unit_sd';
      const breakdown = (this.db && this.db.rapbs_breakdowns && this.db.rapbs_breakdowns[unitId]) || INITIAL_DB.rapbs_breakdowns[unitId] || INITIAL_DB.rapbs_breakdowns.unit_sd;
      const unitRapbs = (this.db && this.db.rapbs_poin && this.db.rapbs_poin.find(r => r.unit_id === unitId)) || { total_plafond: breakdown.total_plafond, terpakai: 0, saldo_tersedia: breakdown.total_plafond };
      const unitUser = (this.db && this.db.users && this.db.users.find(u => u.unit_id === unitId)) || { unit_name: breakdown.unit_name || 'Sekolah Islam Al-Imam' };
      const cms = (this.db && this.db.cms_settings) || DEFAULT_CMS_SETTINGS;

      const printWin = window.open('', '_blank');
      if (!printWin) {
        alert('Mohon izinkan pop-up window pada browser untuk mencetak dokumen.');
        return;
      }

      const itemsHTML = (breakdown.items || []).map((it, idx) => `
        <tr>
          <td style="text-align:center; padding: 6px; border: 1px solid #333;">${it.no || (idx + 1)}</td>
          <td style="padding: 6px; border: 1px solid #333; font-weight: 600;">${it.name}</td>
          <td style="text-align:right; padding: 6px; border: 1px solid #333;">Rp ${this.formatNumber(it.unit_price)}</td>
          <td style="text-align:center; padding: 6px; border: 1px solid #333;">${it.qty_req || '-'}</td>
          <td style="text-align:center; padding: 6px; border: 1px solid #333;">${it.qty_people || '-'}</td>
          <td style="text-align:right; padding: 6px; border: 1px solid #333; font-weight: bold;">Rp ${this.formatNumber(it.total)}</td>
        </tr>
      `).join('');

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rincian RAPBS ${breakdown.code} ${breakdown.title} - ${unitUser.unit_name}</title>
        <style>
          body { font-family: 'Arial', sans-serif; margin: 30px; font-size: 12px; color: #111; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
          .header h2 { margin: 0 0 4px 0; font-size: 16px; text-transform: uppercase; }
          .header h3 { margin: 0 0 4px 0; font-size: 14px; font-weight: normal; }
          .header p { margin: 0; font-size: 11px; color: #555; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th { background: #f2f2f2; font-weight: bold; text-align: center; padding: 8px 6px; border: 1px solid #333; font-size: 11px; }
          .total-row { background: #f8f8f8; font-weight: bold; }
          .signatures { margin-top: 40px; display: flex; justify-content: space-between; }
          .sign-box { text-align: center; width: 200px; }
          .sign-line { margin-top: 60px; border-top: 1px solid #000; font-weight: bold; padding-top: 4px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>${cms.foundation_name || 'YAYASAN PENDIDIKAN ISLAM AL-IMAM'}</h2>
          <h3>${unitUser.unit_name} - UNIT SARANA PRASARANA</h3>
          <p>${cms.address || 'Jakarta'}</p>
        </div>

        <h3 style="text-align: center; margin-bottom: 4px; text-transform: uppercase;">RENCANA ANGGARAN PENDAPATAN & BELANJA SEKOLAH (RAPBS)</h3>
        <p style="text-align: center; margin-top: 0; font-size: 11px; color: #444;">POS ${breakdown.code}: ${breakdown.title} • TAHUN AJARAN ${breakdown.academic_year || '2026/2027'}</p>

        <table>
          <thead>
            <tr>
              <th style="width: 40px;">NO</th>
              <th>NAMA BARANG</th>
              <th style="width: 110px;">HARGA SATUAN</th>
              <th style="width: 100px;">KEBUTUHAN KELAS/HARI</th>
              <th style="width: 90px;">JUMLAH ORANG</th>
              <th style="width: 130px;">TOTAL (Rp)</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
            <tr class="total-row">
              <td colspan="5" style="text-align: right; padding: 8px; border: 1px solid #333;">TOTAL PLAFON ANGGARAN (${breakdown.code}):</td>
              <td style="text-align: right; padding: 8px; border: 1px solid #333; font-size: 13px;">Rp ${this.formatNumber(breakdown.total_plafond || 35884000)}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 20px; font-size: 11px;">
          <p><b>Status Realisasi:</b> Terpakai: Rp ${this.formatNumber(unitRapbs.terpakai)} | Sisa Saldo: Rp ${this.formatNumber(unitRapbs.saldo_tersedia)}</p>
        </div>

        <div class="signatures">
          <div class="sign-box">
            <p>Mengetahui,<br>Kepala Sekolah / Unit</p>
            <div class="sign-line">${unitUser.unit_name}</div>
          </div>
          <div class="sign-box">
            <p>Disetujui,<br>Bendahara Yayasan</p>
            <div class="sign-line">${cms.signers.bendahara_name || 'Bendahara Yayasan'}</div>
          </div>
          <div class="sign-box">
            <p>Penanggung Jawab,<br>Kaur SARPRAS</p>
            <div class="sign-line">${cms.signers.kaur_name || 'Kaur SARPRAS'}</div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
    } catch (err) {
      console.error('Error printing RAPBS breakdown:', err);
    }
  },

  // ==========================================
  // 14.6. DEDICATED AC MANAGEMENT & SERVICE MODULE (PG-TK, SD, SMP)
  // ==========================================

  renderAcServiceView() {
    // 1. Calculate and update top metrics
    const inventory = this.db.ac_inventory || [];
    const requests = this.db.ac_service_requests || [];
    
    const totalUnits = inventory.length;
    const totalCost = requests.reduce((sum, r) => sum + (Number(r.total_amount) || 0), 0);
    
    // Check units due for cleaning (last service > 80 days ago or condition not normal)
    const today = new Date();
    const dueUnits = inventory.filter(u => {
      if (u.condition && u.condition.includes('Perlu Cuci')) return true;
      if (u.condition && u.condition.includes('Kurang Dingin')) return true;
      if (u.next_service_date) {
        const nextDate = new Date(u.next_service_date);
        const diffDays = (nextDate - today) / (1000 * 60 * 60 * 24);
        return diffDays <= 15; // Due within 15 days or overdue
      }
      return false;
    });

    const activeRequests = requests.filter(r => r.status === 'Pending_Verification' || r.status === 'Dalam Pengerjaan' || r.status === 'Menunggu Teknisi');

    const metricUnitsEl = document.getElementById('metricAcTotalUnits');
    const metricCostEl = document.getElementById('metricAcTotalCost');
    const metricDueEl = document.getElementById('metricAcDueCleaning');
    const metricActiveEl = document.getElementById('metricAcActiveRequests');

    if (metricUnitsEl) metricUnitsEl.textContent = `${totalUnits} Unit`;
    if (metricCostEl) metricCostEl.textContent = 'Rp ' + this.formatNumber(totalCost);
    if (metricDueEl) metricDueEl.textContent = `${dueUnits.length} Unit`;
    if (metricActiveEl) metricActiveEl.textContent = activeRequests.length;

    // 2. Setup Form Default Values
    this.populateAcFormDropdowns();
    
    const dateInput = document.getElementById('acFormDate');
    if (dateInput && !dateInput.value) {
      const tmr = new Date();
      tmr.setDate(tmr.getDate() + 1);
      dateInput.value = tmr.toISOString().split('T')[0];
    }
    this.calculateAcFormTotal();

    // 3. Render Active Sub-Tab
    this.switchAcSubTab(this.activeAcSubTab || 'services');
  },

  switchAcSubTab(tabName) {
    this.activeAcSubTab = tabName;
    const tabs = ['services', 'inventory', 'analytics', 'vendors'];

    tabs.forEach(t => {
      const el = document.getElementById(`acSubTab-${t}`);
      const btn = document.getElementById(`acSubTabBtn-${t}`);
      if (el) el.classList.add('hidden');
      if (btn) {
        btn.className = 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition flex items-center space-x-2 shrink-0';
      }
    });

    const activeEl = document.getElementById(`acSubTab-${tabName}`);
    const activeBtn = document.getElementById(`acSubTabBtn-${tabName}`);
    if (activeEl) activeEl.classList.remove('hidden');
    if (activeBtn) {
      activeBtn.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-sky-100 text-sky-900 transition flex items-center space-x-2 shrink-0';
    }

    if (tabName === 'services') this.renderAcPackagesGrid();
    else if (tabName === 'inventory') this.renderAcInventoryTable();
    else if (tabName === 'analytics') this.renderAcAnalytics();
    else if (tabName === 'vendors') this.renderAcVendors();
  },

  renderAcPackagesGrid() {
    const container = document.getElementById('acPackagesGrid');
    if (!container) return;

    const packages = this.db.ac_pricing_catalogue || INITIAL_DB.ac_pricing_catalogue;

    container.innerHTML = packages.map(pkg => `
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm card-hover flex flex-col justify-between group transition">
        <div>
          <div class="flex items-start justify-between gap-2 mb-3">
            <span class="inline-block px-2.5 py-0.5 ${pkg.badge_color || 'bg-sky-100 text-sky-800'} text-[10px] font-bold rounded-full">
              ${pkg.badge}
            </span>
            <div class="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-sm shrink-0 group-hover:scale-110 transition-transform">
              <i class="fa-solid ${pkg.icon || 'fa-snowflake'}"></i>
            </div>
          </div>
          
          <h4 class="font-extrabold text-sm text-slate-900 font-heading leading-snug mb-1">
            ${pkg.name}
          </h4>
          <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-3">
            ${pkg.description}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">Tarif Standar</span>
            <span class="text-sm font-black text-slate-900 font-heading">Rp ${this.formatNumber(pkg.unit_price)}</span>
          </div>
          <button onclick="app.selectAcPackage('${pkg.service_id}')" class="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center space-x-1">
            <i class="fa-solid fa-check"></i>
            <span>Pilih</span>
          </button>
        </div>
      </div>
    `).join('');
  },

  selectAcPackage(serviceId) {
    const packages = this.db.ac_pricing_catalogue || INITIAL_DB.ac_pricing_catalogue;
    const pkg = packages.find(p => p.service_id === serviceId);
    if (!pkg) return;

    const selectEl = document.getElementById('acFormServiceType');
    const priceEl = document.getElementById('acFormUnitPrice');

    if (selectEl) selectEl.value = pkg.service_id;
    if (priceEl) priceEl.value = pkg.unit_price;

    this.calculateAcFormTotal();

    const formContainer = document.getElementById('acServiceRequestForm');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formContainer.parentElement.classList.add('ring-2', 'ring-sky-400');
      setTimeout(() => {
        if (formContainer.parentElement) formContainer.parentElement.classList.remove('ring-2', 'ring-sky-400');
      }, 1200);
    }

    this.showToast(`Paket "${pkg.name}" dipilih!`, 'info');
  },

  populateAcFormDropdowns() {
    const unitSelect = document.getElementById('acFormUnitSelect');
    if (unitSelect && this.currentUser && this.currentUser.unit_id) {
      if (['unit_tk', 'unit_sd', 'unit_smp'].includes(this.currentUser.unit_id)) {
        unitSelect.value = this.currentUser.unit_id;
      }
    }
    this.onAcUnitSelectChange();
  },

  onAcUnitSelectChange() {
    const unitSelect = document.getElementById('acFormUnitSelect');
    const assetSelect = document.getElementById('acFormAssetSelect');
    if (!unitSelect || !assetSelect) return;

    const selectedUnit = unitSelect.value;
    const inventory = this.db.ac_inventory || [];
    const unitAcs = inventory.filter(u => u.unit_id === selectedUnit);

    assetSelect.innerHTML = '<option value="">-- Pilih Unit AC Terdaftar (atau isi manual) --</option>' + 
      unitAcs.map(a => `<option value="${a.ac_id}">[${a.ac_id}] ${a.room_name} - ${a.brand} (${a.capacity_pk})</option>`).join('') +
      '<option value="NEW_UNIT">+ Pengadaan Unit AC Baru / Ruang Baru</option>';
  },

  onAcAssetSelectChange() {
    const assetSelect = document.getElementById('acFormAssetSelect');
    const roomInput = document.getElementById('acFormRoomName');
    if (!assetSelect || !roomInput) return;

    const val = assetSelect.value;
    if (!val || val === 'NEW_UNIT') {
      if (val === 'NEW_UNIT') roomInput.value = 'Pengadaan Unit Baru / Ruang Baru';
      return;
    }

    const inventory = this.db.ac_inventory || [];
    const item = inventory.find(a => a.ac_id === val);
    if (item) {
      roomInput.value = item.room_name;
    }
  },

  onAcServiceTypeChange() {
    const serviceSelect = document.getElementById('acFormServiceType');
    const priceInput = document.getElementById('acFormUnitPrice');
    if (!serviceSelect || !priceInput) return;

    const packages = this.db.ac_pricing_catalogue || INITIAL_DB.ac_pricing_catalogue;
    const pkg = packages.find(p => p.service_id === serviceSelect.value);
    if (pkg) {
      priceInput.value = pkg.unit_price;
    }
    this.calculateAcFormTotal();
  },

  calculateAcFormTotal() {
    const qtyInput = document.getElementById('acFormQty');
    const priceInput = document.getElementById('acFormUnitPrice');
    const totalEl = document.getElementById('acFormGrandTotal');

    const qty = Number(qtyInput ? qtyInput.value : 1) || 1;
    const price = Number(priceInput ? priceInput.value : 75000) || 0;
    const total = qty * price;

    if (totalEl) totalEl.textContent = 'Rp ' + this.formatNumber(total);
    return total;
  },

  submitAcServiceRequest(event) {
    event.preventDefault();

    const unitSelect = document.getElementById('acFormUnitSelect');
    const assetSelect = document.getElementById('acFormAssetSelect');
    const roomInput = document.getElementById('acFormRoomName');
    const serviceSelect = document.getElementById('acFormServiceType');
    const qtyInput = document.getElementById('acFormQty');
    const priceInput = document.getElementById('acFormUnitPrice');
    const dateInput = document.getElementById('acFormDate');
    const vendorSelect = document.getElementById('acFormVendor');
    const fundingSelect = document.getElementById('acFormFundingSource');
    const notesInput = document.getElementById('acFormNotes');

    const unitId = unitSelect ? unitSelect.value : 'unit_sd';
    const acId = assetSelect ? assetSelect.value : '';
    const roomName = roomInput ? roomInput.value.trim() : '';
    const serviceId = serviceSelect ? serviceSelect.value : 'AC-SRV-CUCI-RUTIN';
    const serviceName = serviceSelect && serviceSelect.options[serviceSelect.selectedIndex] ? serviceSelect.options[serviceSelect.selectedIndex].text : 'Layanan AC';
    const qty = Number(qtyInput ? qtyInput.value : 1) || 1;
    const unitPrice = Number(priceInput ? priceInput.value : 75000) || 0;
    const totalAmount = qty * unitPrice;
    const scheduledDate = dateInput ? dateInput.value : '';
    const vendorId = vendorSelect ? vendorSelect.value : 'VEN-AC-01';
    const vendorName = vendorSelect && vendorSelect.options[vendorSelect.selectedIndex] ? vendorSelect.options[vendorSelect.selectedIndex].text : 'CV Sarana Sejuk Al-Imam';
    const fundingSource = fundingSelect ? fundingSelect.value : 'RAPBS_POIN';
    const notes = notesInput ? notesInput.value.trim() : '';

    if (!roomName) {
      this.showToast('Mohon isi nama ruangan / lokasi kelas!', 'warning');
      return;
    }

    const requestId = `AC-REQ-${this.generateTimestampId()}`;
    const newRequest = {
      request_id: requestId,
      unit_id: unitId,
      room_name: roomName,
      ac_id: acId === 'NEW_UNIT' ? '' : acId,
      service_id: serviceId,
      service_type_name: serviceName,
      qty: qty,
      unit_price: unitPrice,
      total_amount: totalAmount,
      funding_source: fundingSource,
      scheduled_date: scheduledDate,
      vendor_id: vendorId,
      vendor_name: vendorName,
      status: this.currentUser.role === 'Admin' || this.currentUser.role === 'Bendahara' ? 'Dalam Pengerjaan' : 'Pending_Verification',
      created_at: this.formatCurrentDateTime(),
      approved_at: this.currentUser.role === 'Admin' || this.currentUser.role === 'Bendahara' ? this.formatCurrentDateTime() : '',
      notes: notes
    };

    if (!this.db.ac_service_requests) this.db.ac_service_requests = [];
    this.db.ac_service_requests.unshift(newRequest);

    // If funding source is RAPBS, also create an official order entry so it is tracked by Bendahara & RAPBS balance
    const orderId = `ORD-AC-${this.generateTimestampId()}`;
    const newOrder = {
      order_id: orderId,
      unit_id: unitId,
      order_type: 'AC_Service',
      items_json: JSON.stringify([
        { product_name: `[Layanan AC] ${serviceName} - ${roomName}`, qty: qty, unit_price: unitPrice, subtotal: totalAmount }
      ]),
      total_amount: totalAmount,
      status: this.currentUser.role === 'Admin' || this.currentUser.role === 'Bendahara' ? 'Approved' : 'Pending_Verification',
      created_at: this.formatCurrentDateTime(),
      approved_at: this.currentUser.role === 'Admin' || this.currentUser.role === 'Bendahara' ? this.formatCurrentDateTime() : '',
      notes: `Pengajuan Layanan AC: ${serviceName} untuk ${roomName} (${qty} unit). Jadwal: ${scheduledDate}. Vendor: ${vendorName}. ${notes}`,
      invoice_number: `INV/AC/${new Date().getFullYear()}/${orderId.slice(-4)}`
    };

    if (!this.db.orders) this.db.orders = [];
    this.db.orders.unshift(newOrder);

    // Auto-update AC Inventory condition if existing asset was targeted
    if (acId && acId !== 'NEW_UNIT' && this.db.ac_inventory) {
      const acUnit = this.db.ac_inventory.find(a => a.ac_id === acId);
      if (acUnit) {
        if (serviceId.includes('CUCI')) {
          acUnit.condition = 'Sedang Dijadwalkan Cuci';
        } else if (serviceId.includes('PERBAIKAN') || serviceId.includes('FREON')) {
          acUnit.condition = 'Dalam Penanganan Teknisi';
        }
        acUnit.total_service_count = (Number(acUnit.total_service_count) || 0) + 1;
      }
    }

    this.saveState();
    this.showToast(`Pengajuan layanan AC "${serviceName}" berhasil dikirim! (ID: ${requestId})`, 'success');

    // Reset form
    if (notesInput) notesInput.value = '';
    this.calculateAcFormTotal();
    this.renderAcServiceView();
  },

  renderAcInventoryTable() {
    const tableBody = document.getElementById('acInventoryTableBody');
    const countLabel = document.getElementById('acInventoryCountLabel');
    if (!tableBody) return;

    let items = this.db.ac_inventory || [];

    // Filter by unit
    if (this.acUnitFilter && this.acUnitFilter !== 'all') {
      items = items.filter(a => a.unit_id === this.acUnitFilter);
    }

    // Filter by search query
    if (this.acSearchQuery && this.acSearchQuery.trim() !== '') {
      const q = this.acSearchQuery.toLowerCase().trim();
      items = items.filter(a => 
        (a.ac_id && a.ac_id.toLowerCase().includes(q)) ||
        (a.room_name && a.room_name.toLowerCase().includes(q)) ||
        (a.brand && a.brand.toLowerCase().includes(q)) ||
        (a.notes && a.notes.toLowerCase().includes(q))
      );
    }

    if (countLabel) countLabel.textContent = `Menampilkan ${items.length} unit AC`;

    if (items.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="px-4 py-8 text-center text-slate-400">
            <i class="fa-solid fa-wind text-2xl mb-2 text-slate-300 block"></i>
            <span>Tidak ada data unit AC yang cocok dengan filter.</span>
          </td>
        </tr>
      `;
      return;
    }

    const today = new Date();

    tableBody.innerHTML = items.map(ac => {
      let condBadge = 'bg-emerald-100 text-emerald-800';
      if (ac.condition && (ac.condition.includes('Perlu Cuci') || ac.condition.includes('Dijadwalkan'))) {
        condBadge = 'bg-amber-100 text-amber-800';
      } else if (ac.condition && (ac.condition.includes('Rusak') || ac.condition.includes('Kurang Dingin') || ac.condition.includes('Menetes'))) {
        condBadge = 'bg-rose-100 text-rose-800';
      }

      let unitBadge = 'bg-slate-100 text-slate-700';
      if (ac.unit_id === 'unit_tk') unitBadge = 'bg-amber-100 text-amber-800';
      else if (ac.unit_id === 'unit_sd') unitBadge = 'bg-emerald-100 text-emerald-800';
      else if (ac.unit_id === 'unit_smp') unitBadge = 'bg-blue-100 text-blue-800';

      const unitNameMap = {
        unit_tk: 'PG-TK',
        unit_sd: 'SD',
        unit_smp: 'SMP'
      };

      return `
        <tr class="hover:bg-sky-50/40 transition border-b border-slate-100">
          <td class="px-4 py-3 text-center">
            <span class="inline-block px-2 py-0.5 bg-sky-100 text-sky-900 font-extrabold text-[10px] rounded-md font-mono">
              ${ac.ac_id}
            </span>
          </td>
          <td class="px-4 py-3 font-bold text-slate-800">
            <div class="flex items-center space-x-2">
              <span class="px-1.5 py-0.5 ${unitBadge} text-[9px] font-black rounded">${unitNameMap[ac.unit_id] || 'Unit'}</span>
              <span>${ac.room_name}</span>
            </div>
            ${ac.notes ? `<span class="text-[10px] text-slate-400 font-normal block mt-0.5"><i class="fa-solid fa-location-dot text-sky-400 mr-1"></i>${ac.notes}</span>` : ''}
          </td>
          <td class="px-4 py-3 text-slate-700 font-semibold">
            <div>${ac.brand}</div>
            <span class="text-[10px] text-slate-400 font-bold bg-slate-100 px-1.5 py-0.2 rounded">${ac.capacity_pk || '1 PK'}</span>
          </td>
          <td class="px-4 py-3 text-center">
            <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${condBadge}">
              ${ac.condition || 'Baik / Normal'}
            </span>
          </td>
          <td class="px-4 py-3 text-center text-slate-600 font-medium">${ac.last_service_date || '-'}</td>
          <td class="px-4 py-3 text-center font-bold text-slate-800">${ac.next_service_date || '-'}</td>
          <td class="px-4 py-3 text-center font-extrabold text-sky-700">${ac.total_service_count || 0}x</td>
          <td class="px-4 py-3 text-center">
            <div class="flex items-center justify-center space-x-1.5">
              <button onclick="app.quickScheduleAcWash('${ac.ac_id}')" title="Jadwalkan Cuci Rutin Cepat" class="w-7 h-7 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 flex items-center justify-center text-xs transition border border-sky-200">
                <i class="fa-solid fa-soap"></i>
              </button>
              <button onclick="app.openAcUnitHistoryModal('${ac.ac_id}')" title="Lihat Riwayat & Log Servis" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs transition border border-slate-200">
                <i class="fa-solid fa-clock-rotate-left"></i>
              </button>
              <button onclick="app.openAddAcUnitModal('${ac.ac_id}')" title="Edit Data Unit AC" class="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center text-xs transition border border-amber-200">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button onclick="app.deleteAcUnit('${ac.ac_id}')" title="Hapus Unit AC" class="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center text-xs transition border border-rose-200">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  filterAcInventory(unitId) {
    this.acUnitFilter = unitId;
    const buttons = ['all', 'unit_tk', 'unit_sd', 'unit_smp'];

    buttons.forEach(b => {
      const btn = document.getElementById(`acFilterUnit-${b}`);
      if (btn) {
        if (b === unitId) {
          btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-600 text-white shadow-xs transition';
        } else {
          btn.className = 'px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition';
        }
      }
    });

    this.renderAcInventoryTable();
  },

  onAcSearchChange(term) {
    this.acSearchQuery = term;
    this.renderAcInventoryTable();
  },

  openAddAcUnitModal(editAcId = null) {
    this.editingAcId = editAcId;
    const modal = document.getElementById('acAddUnitModal');
    const titleEl = document.getElementById('acAddUnitModalTitle');
    const editIdInput = document.getElementById('acEditUnitId');
    const schoolSelect = document.getElementById('acUnitModalSchool');
    const roomInput = document.getElementById('acUnitModalRoom');
    const brandInput = document.getElementById('acUnitModalBrand');
    const capSelect = document.getElementById('acUnitModalCapacity');
    const condSelect = document.getElementById('acUnitModalCondition');
    const lastDateInput = document.getElementById('acUnitModalLastService');
    const notesInput = document.getElementById('acUnitModalNotes');

    if (!modal) return;

    if (editAcId) {
      const inventory = this.db.ac_inventory || [];
      const item = inventory.find(a => a.ac_id === editAcId);
      if (item) {
        if (titleEl) titleEl.textContent = `Edit Unit AC: ${item.ac_id}`;
        if (editIdInput) editIdInput.value = item.ac_id;
        if (schoolSelect) schoolSelect.value = item.unit_id || 'unit_sd';
        if (roomInput) roomInput.value = item.room_name || '';
        if (brandInput) brandInput.value = item.brand || '';
        if (capSelect) capSelect.value = item.capacity_pk || '1 PK';
        if (condSelect) condSelect.value = item.condition || 'Baik / Normal';
        if (lastDateInput) lastDateInput.value = item.last_service_date || '';
        if (notesInput) notesInput.value = item.notes || '';
      }
    } else {
      if (titleEl) titleEl.textContent = 'Daftarkan Unit AC Baru';
      if (editIdInput) editIdInput.value = '';
      if (roomInput) roomInput.value = '';
      if (brandInput) brandInput.value = 'Daikin FTKC25 (Inverter)';
      if (capSelect) capSelect.value = '1 PK';
      if (condSelect) condSelect.value = 'Baik / Normal';
      if (lastDateInput) lastDateInput.value = new Date().toISOString().split('T')[0];
      if (notesInput) notesInput.value = '';
    }

    modal.classList.remove('hidden');
  },

  closeAddAcUnitModal() {
    const modal = document.getElementById('acAddUnitModal');
    if (modal) modal.classList.add('hidden');
  },

  saveAcUnit(event) {
    event.preventDefault();

    const editId = document.getElementById('acEditUnitId').value;
    const unitId = document.getElementById('acUnitModalSchool').value;
    const roomName = document.getElementById('acUnitModalRoom').value.trim();
    const brand = document.getElementById('acUnitModalBrand').value.trim();
    const capacity = document.getElementById('acUnitModalCapacity').value;
    const condition = document.getElementById('acUnitModalCondition').value;
    const lastServiceDate = document.getElementById('acUnitModalLastService').value;
    const notes = document.getElementById('acUnitModalNotes').value.trim();

    if (!roomName || !brand) {
      this.showToast('Mohon lengkapi nama ruangan dan merk AC!', 'warning');
      return;
    }

    if (!this.db.ac_inventory) this.db.ac_inventory = [];

    // Calculate next service date (90 days from last service)
    let nextServiceDate = '';
    if (lastServiceDate) {
      const d = new Date(lastServiceDate);
      d.setDate(d.getDate() + 90);
      nextServiceDate = d.toISOString().split('T')[0];
    }

    if (editId) {
      // Update existing
      const existing = this.db.ac_inventory.find(a => a.ac_id === editId);
      if (existing) {
        existing.unit_id = unitId;
        existing.room_name = roomName;
        existing.brand = brand;
        existing.capacity_pk = capacity;
        existing.condition = condition;
        existing.last_service_date = lastServiceDate;
        existing.next_service_date = nextServiceDate;
        existing.notes = notes;
      }
      this.showToast(`Data unit AC ${editId} berhasil diperbarui!`, 'success');
    } else {
      // Generate unique AC ID
      const prefixMap = { unit_tk: 'AC-TK', unit_sd: 'AC-SD', unit_smp: 'AC-SMP' };
      const prefix = prefixMap[unitId] || 'AC-GEN';
      const countForUnit = this.db.ac_inventory.filter(a => a.unit_id === unitId).length + 1;
      const padNum = String(countForUnit).padStart(2, '0');
      const newAcId = `${prefix}-${padNum}`;

      const newUnit = {
        ac_id: newAcId,
        unit_id: unitId,
        room_name: roomName,
        brand: brand,
        capacity_pk: capacity,
        condition: condition,
        last_service_date: lastServiceDate,
        next_service_date: nextServiceDate,
        install_year: new Date().getFullYear(),
        total_service_count: 0,
        notes: notes
      };
      this.db.ac_inventory.push(newUnit);
      this.showToast(`Unit AC ${newAcId} berhasil didaftarkan!`, 'success');
    }

    this.saveState();
    this.closeAddAcUnitModal();
    this.renderAcServiceView();
  },

  deleteAcUnit(acId) {
    if (!confirm(`Apakah Anda yakin ingin menghapus unit AC ${acId} dari database master?`)) return;

    this.db.ac_inventory = (this.db.ac_inventory || []).filter(a => a.ac_id !== acId);
    this.saveState();
    this.showToast(`Unit AC ${acId} telah dihapus.`, 'info');
    this.renderAcServiceView();
  },

  openAcUnitHistoryModal(acId) {
    const inventory = this.db.ac_inventory || [];
    const unit = inventory.find(a => a.ac_id === acId);
    if (!unit) return;

    const modal = document.getElementById('acUnitHistoryModal');
    const titleEl = document.getElementById('acHistoryModalTitle');
    const subtitleEl = document.getElementById('acHistoryModalSubtitle');
    const assetCodeEl = document.getElementById('acHistoryAssetCode');
    const brandEl = document.getElementById('acHistoryBrand');
    const nextDateEl = document.getElementById('acHistoryNextDate');
    const totalSpentEl = document.getElementById('acHistoryTotalSpent');
    const itemsContainer = document.getElementById('acHistoryItemsContainer');
    const quickOrderBtn = document.getElementById('acHistoryQuickOrderBtn');

    if (!modal) return;

    if (titleEl) titleEl.textContent = `Riwayat Perawatan: ${unit.ac_id}`;
    if (subtitleEl) subtitleEl.textContent = `${unit.room_name} • ${unit.brand}`;
    if (assetCodeEl) assetCodeEl.textContent = unit.ac_id;
    if (brandEl) brandEl.textContent = `${unit.brand} (${unit.capacity_pk})`;
    if (nextDateEl) nextDateEl.textContent = unit.next_service_date || 'Belum Dijadwalkan';

    // Filter requests matching this AC ID
    const requests = (this.db.ac_service_requests || []).filter(r => r.ac_id === acId || (r.room_name && r.room_name.includes(unit.room_name)));
    const totalSpent = requests.reduce((sum, r) => sum + (Number(r.total_amount) || 0), 0);
    if (totalSpentEl) totalSpentEl.textContent = 'Rp ' + this.formatNumber(totalSpent);

    if (quickOrderBtn) {
      quickOrderBtn.onclick = () => {
        this.closeAcUnitHistoryModal();
        this.quickScheduleAcWash(acId);
      };
    }

    if (itemsContainer) {
      if (requests.length === 0) {
        itemsContainer.innerHTML = `
          <div class="text-center py-8 text-slate-400">
            <i class="fa-solid fa-clock-rotate-left text-2xl mb-2 text-slate-300 block"></i>
            <p class="text-xs">Belum ada riwayat transaksi servis untuk unit AC ini.</p>
          </div>
        `;
      } else {
        itemsContainer.innerHTML = requests.map(r => `
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs">
            <div class="space-y-1">
              <div class="flex items-center space-x-2">
                <span class="font-extrabold text-slate-900">${r.service_type_name}</span>
                <span class="px-2 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-bold rounded-full">${r.status}</span>
              </div>
              <p class="text-[11px] text-slate-500 font-medium">
                <i class="fa-solid fa-calendar-day mr-1 text-slate-400"></i>${r.created_at || r.scheduled_date} • Vendor: ${r.vendor_name || 'CV Sarana Sejuk'}
              </p>
              ${r.notes ? `<p class="text-[11px] text-slate-600 italic bg-white p-2 rounded-xl border border-slate-100 mt-1">${r.notes}</p>` : ''}
            </div>
            <div class="text-right shrink-0">
              <span class="text-xs font-black text-slate-900 font-heading">Rp ${this.formatNumber(r.total_amount)}</span>
              <span class="block text-[10px] text-slate-400">${r.funding_source === 'RAPBS_POIN' ? 'RAPBS Pos Maintenance' : 'Reimburse'}</span>
            </div>
          </div>
        `).join('');
      }
    }

    modal.classList.remove('hidden');
  },

  closeAcUnitHistoryModal() {
    const modal = document.getElementById('acUnitHistoryModal');
    if (modal) modal.classList.add('hidden');
  },

  quickScheduleAcWash(acId) {
    const inventory = this.db.ac_inventory || [];
    const unit = inventory.find(a => a.ac_id === acId);
    if (!unit) return;

    this.switchAcSubTab('services');

    const unitSelect = document.getElementById('acFormUnitSelect');
    if (unitSelect) {
      unitSelect.value = unit.unit_id;
      this.onAcUnitSelectChange();
    }

    const assetSelect = document.getElementById('acFormAssetSelect');
    if (assetSelect) {
      assetSelect.value = acId;
      this.onAcAssetSelectChange();
    }

    this.selectAcPackage('AC-SRV-CUCI-RUTIN');
    this.showToast(`Form pengajuan siap untuk cuci AC unit ${acId} (${unit.room_name})`, 'info');
  },

  renderAcAnalytics() {
    // 1. Render unit budget cards
    const cardsContainer = document.getElementById('acUnitBudgetCardsContainer');
    if (cardsContainer) {
      const units = [
        { id: 'unit_tk', name: 'PG-TK Al-Imam', plafond_ac: 3500000 },
        { id: 'unit_sd', name: 'SD Al-Imam', plafond_ac: 5500000 },
        { id: 'unit_smp', name: 'SMP Al-Imam', plafond_ac: 4200000 } // Pos D SMP Item 16 Maintenance AC = 4.200.000
      ];

      const requests = this.db.ac_service_requests || [];

      cardsContainer.innerHTML = units.map(u => {
        const unitReqs = requests.filter(r => r.unit_id === u.id);
        const spent = unitReqs.reduce((sum, r) => sum + (Number(r.total_amount) || 0), 0);
        const pct = Math.min(100, Math.round((spent / u.plafond_ac) * 100));

        return `
          <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800">${u.name}</span>
              <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full ${pct > 80 ? 'bg-rose-100 text-rose-800' : 'bg-sky-100 text-sky-800'}">${pct}% Terpakai</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-semibold block">Realisasi / Plafon AC</span>
              <div class="text-lg font-black text-slate-900 font-heading">
                Rp ${this.formatNumber(spent)} <span class="text-xs text-slate-400 font-normal">/ Rp ${this.formatNumber(u.plafond_ac)}</span>
              </div>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div class="h-full bg-sky-500 rounded-full transition-all duration-500" style="width: ${pct}%"></div>
            </div>
            <p class="text-[10px] text-slate-400">${unitReqs.length} transaksi perawatan tercatat</p>
          </div>
        `;
      }).join('');
    }

    // 2. Render service requests log table
    const tableBody = document.getElementById('acRequestsLogTableBody');
    if (tableBody) {
      const requests = this.db.ac_service_requests || [];

      if (requests.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="9" class="px-4 py-8 text-center text-slate-400">
              <i class="fa-solid fa-file-invoice text-2xl mb-2 text-slate-300 block"></i>
              <span>Belum ada log pengajuan perawatan AC.</span>
            </td>
          </tr>
        `;
        return;
      }

      tableBody.innerHTML = requests.map(r => {
        let statusBadge = 'bg-amber-100 text-amber-800';
        if (r.status === 'Selesai') statusBadge = 'bg-emerald-100 text-emerald-800';
        else if (r.status === 'Dalam Pengerjaan') statusBadge = 'bg-blue-100 text-blue-800';
        else if (r.status === 'Ditolak') statusBadge = 'bg-rose-100 text-rose-800';

        const unitNameMap = { unit_tk: 'PG-TK', unit_sd: 'SD', unit_smp: 'SMP' };

        return `
          <tr class="hover:bg-slate-50 transition border-b border-slate-100 text-xs">
            <td class="px-4 py-3 text-center font-mono font-bold text-sky-800">${r.request_id}</td>
            <td class="px-4 py-3 font-bold text-slate-800">
              <span class="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded mr-1">${unitNameMap[r.unit_id] || 'Unit'}</span>
              <span>${r.room_name}</span>
            </td>
            <td class="px-4 py-3 font-semibold text-slate-700">${r.service_type_name}</td>
            <td class="px-4 py-3 text-center font-bold text-slate-800">${r.qty || 1}</td>
            <td class="px-4 py-3 text-right font-black text-slate-900">Rp ${this.formatNumber(r.total_amount)}</td>
            <td class="px-4 py-3 text-center">
              <span class="text-[10px] font-semibold text-slate-600">${r.funding_source === 'RAPBS_POIN' ? 'Poin RAPBS' : 'Reimburse'}</span>
            </td>
            <td class="px-4 py-3 text-center text-slate-500 font-medium">${r.scheduled_date || r.created_at}</td>
            <td class="px-4 py-3 text-center">
              <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusBadge}">
                ${r.status}
              </span>
            </td>
            <td class="px-4 py-3 text-center">
              ${r.status !== 'Selesai' ? `
                <button onclick="app.updateAcServiceStatus('${r.request_id}', 'Selesai')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition" title="Tandai Selesai & Update Jadwal Cuci">
                  Selesai
                </button>
              ` : `
                <span class="text-[10px] text-emerald-600 font-bold"><i class="fa-solid fa-check-double mr-1"></i>Tuntas</span>
              `}
            </td>
          </tr>
        `;
      }).join('');
    }
  },

  renderAcVendors() {
    const container = document.getElementById('acVendorsContainer');
    if (!container) return;

    const vendors = this.db.ac_vendors || INITIAL_DB.ac_vendors;

    container.innerHTML = vendors.map(v => `
      <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm card-hover flex flex-col justify-between space-y-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-bold rounded-full">
              ${v.badge}
            </span>
            <div class="flex items-center space-x-1 text-amber-500 text-xs font-bold">
              <i class="fa-solid fa-star"></i>
              <span>${v.rating} (${v.review_count})</span>
            </div>
          </div>

          <h4 class="font-extrabold text-base text-slate-900 font-heading">
            ${v.name}
          </h4>

          <p class="text-xs text-slate-500 leading-relaxed">
            ${v.description}
          </p>

          <div class="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-user-tie text-sky-600 w-4"></i>
              <span>PIC: <b>${v.pic}</b></span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-shield-halved text-emerald-600 w-4"></i>
              <span>Garansi: <b>${v.warranty}</b></span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-stopwatch text-amber-600 w-4"></i>
              <span>SLA: <b>${v.sla}</b></span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-location-dot text-rose-500 w-4"></i>
              <span class="truncate">${v.address}</span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100">
          <a href="https://wa.me/${v.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(v.name)},%20kami%20dari%20SARPRAS%20Sekolah%20Al-Imam%20ingin%20memesan%20layanan%20AC." target="_blank" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center space-x-2">
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>Hubungi WhatsApp Rekanan</span>
          </a>
        </div>
      </div>
    `).join('');
  },

  updateAcServiceStatus(requestId, newStatus) {
    const requests = this.db.ac_service_requests || [];
    const req = requests.find(r => r.request_id === requestId);
    if (!req) return;

    req.status = newStatus;
    if (newStatus === 'Selesai') {
      req.completed_at = this.formatCurrentDateTime();

      // If tied to an AC Asset, update last_service_date and next_service_date (+90 days)
      if (req.ac_id && this.db.ac_inventory) {
        const acUnit = this.db.ac_inventory.find(a => a.ac_id === req.ac_id);
        if (acUnit) {
          const todayStr = new Date().toISOString().split('T')[0];
          const nextDate = new Date();
          nextDate.setDate(nextDate.getDate() + 90);
          acUnit.last_service_date = todayStr;
          acUnit.next_service_date = nextDate.toISOString().split('T')[0];
          acUnit.condition = 'Baik / Normal';
        }
      }
    }

    this.saveState();
    this.showToast(`Status pengajuan ${requestId} berhasil diperbarui menjadi "${newStatus}"!`, 'success');
    this.renderAcServiceView();
  },

  printAcReport() {
    const cms = this.db.cms_settings || DEFAULT_CMS_SETTINGS;
    const inventory = this.db.ac_inventory || [];
    const requests = this.db.ac_service_requests || [];
    
    const totalCost = requests.reduce((sum, r) => sum + (Number(r.total_amount) || 0), 0);

    const container = document.getElementById('acPrintReportContent');
    const modal = document.getElementById('acPrintReportModal');
    if (!container || !modal) return;

    const unitCounts = {
      unit_tk: inventory.filter(a => a.unit_id === 'unit_tk').length,
      unit_sd: inventory.filter(a => a.unit_id === 'unit_sd').length,
      unit_smp: inventory.filter(a => a.unit_id === 'unit_smp').length,
    };

    const unitExpense = {
      unit_tk: requests.filter(r => r.unit_id === 'unit_tk').reduce((s, r) => s + (Number(r.total_amount) || 0), 0),
      unit_sd: requests.filter(r => r.unit_id === 'unit_sd').reduce((s, r) => s + (Number(r.total_amount) || 0), 0),
      unit_smp: requests.filter(r => r.unit_id === 'unit_smp').reduce((s, r) => s + (Number(r.total_amount) || 0), 0),
    };

    const tableRows = requests.map((r, idx) => `
      <tr>
        <td style="text-align: center; padding: 6px; border: 1px solid #333;">${idx + 1}</td>
        <td style="padding: 6px; border: 1px solid #333; font-family: monospace;">${r.request_id}</td>
        <td style="padding: 6px; border: 1px solid #333; font-weight: bold;">${r.room_name}</td>
        <td style="padding: 6px; border: 1px solid #333;">${r.service_type_name}</td>
        <td style="text-align: center; padding: 6px; border: 1px solid #333;">${r.qty || 1}</td>
        <td style="text-align: right; padding: 6px; border: 1px solid #333; font-weight: bold;">Rp ${this.formatNumber(r.total_amount)}</td>
        <td style="padding: 6px; border: 1px solid #333;">${r.vendor_name || 'CV Sarana Sejuk'}</td>
        <td style="text-align: center; padding: 6px; border: 1px solid #333;">${r.status}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="print-page text-slate-900" style="font-family: Arial, sans-serif; font-size: 11pt;">
        <!-- Header Kop Surat -->
        <div style="text-align: center; border-bottom: 2.5px solid #000; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 4px 0; font-size: 16pt; text-transform: uppercase; font-weight: bold;">${cms.foundation_name || 'YAYASAN PENDIDIKAN ISLAM AL-IMAM'}</h2>
          <h3 style="margin: 0 0 4px 0; font-size: 13pt; font-weight: 600;">DIVISI SARANA PRASARANA & TATA UDARA SEKOLAH</h3>
          <p style="margin: 0; font-size: 10pt; color: #444;">${cms.address || 'Jakarta'} • Telp: ${cms.phone || '(021) 8899-7711'}</p>
        </div>

        <h3 style="text-align: center; margin: 0 0 4px 0; text-transform: uppercase; font-size: 13pt;">REKAPITULASI BIAYA & PERAWATAN AC SEKOLAH</h3>
        <p style="text-align: center; margin: 0 0 20px 0; font-size: 10pt; color: #555;">Tahun Ajaran 2026/2027 • Pos Anggaran Perawatan & Pengadaan AC (PG-TK, SD, SMP)</p>

        <!-- Summary Table per Unit -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="border: 1px solid #333; padding: 7px; text-align: left;">Unit Sekolah</th>
              <th style="border: 1px solid #333; padding: 7px; text-align: center;">Total Unit AC</th>
              <th style="border: 1px solid #333; padding: 7px; text-align: right;">Alokasi RAPBS AC</th>
              <th style="border: 1px solid #333; padding: 7px; text-align: right;">Realisasi Biaya</th>
              <th style="border: 1px solid #333; padding: 7px; text-align: center;">Persentase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #333; padding: 6px; font-weight: bold;">PG-TK Islam Al-Imam</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${unitCounts.unit_tk} Unit</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right;">Rp 3.500.000</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right; font-weight: bold;">Rp ${this.formatNumber(unitExpense.unit_tk)}</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${Math.round((unitExpense.unit_tk / 3500000) * 100)}%</td>
            </tr>
            <tr>
              <td style="border: 1px solid #333; padding: 6px; font-weight: bold;">SD Islam Al-Imam</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${unitCounts.unit_sd} Unit</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right;">Rp 5.500.000</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right; font-weight: bold;">Rp ${this.formatNumber(unitExpense.unit_sd)}</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${Math.round((unitExpense.unit_sd / 5500000) * 100)}%</td>
            </tr>
            <tr>
              <td style="border: 1px solid #333; padding: 6px; font-weight: bold;">SMP Islam Al-Imam (Pos D Item 16)</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${unitCounts.unit_smp} Unit</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right;">Rp 4.200.000</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right; font-weight: bold;">Rp ${this.formatNumber(unitExpense.unit_smp)}</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${Math.round((unitExpense.unit_smp / 4200000) * 100)}%</td>
            </tr>
            <tr style="background: #f8fafc; font-weight: bold;">
              <td style="border: 1px solid #333; padding: 7px;">TOTAL KESELURUHAN</td>
              <td style="border: 1px solid #333; padding: 7px; text-align: center;">${inventory.length} Unit</td>
              <td style="border: 1px solid #333; padding: 7px; text-align: right;">Rp 13.200.000</td>
              <td style="border: 1px solid #333; padding: 7px; text-align: right; font-size: 12pt; color: #0369a1;">Rp ${this.formatNumber(totalCost)}</td>
              <td style="border: 1px solid #333; padding: 7px; text-align: center;">${Math.round((totalCost / 13200000) * 100)}%</td>
            </tr>
          </tbody>
        </table>

        <!-- Detailed Transactions Table -->
        <h4 style="margin: 15px 0 6px 0; font-size: 11pt; text-transform: uppercase;">Log Rincian Pengerjaan Servis & Pengadaan:</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 9.5pt;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="border: 1px solid #333; padding: 6px; width: 30px; text-align: center;">No</th>
              <th style="border: 1px solid #333; padding: 6px; text-align: center;">ID</th>
              <th style="border: 1px solid #333; padding: 6px; text-align: left;">Lokasi / Ruangan</th>
              <th style="border: 1px solid #333; padding: 6px; text-align: left;">Layanan</th>
              <th style="border: 1px solid #333; padding: 6px; width: 40px; text-align: center;">Qty</th>
              <th style="border: 1px solid #333; padding: 6px; text-align: right;">Total Biaya</th>
              <th style="border: 1px solid #333; padding: 6px; text-align: left;">Vendor Teknisi</th>
              <th style="border: 1px solid #333; padding: 6px; text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>

        <!-- Signatures Box -->
        <div style="margin-top: 35px; display: flex; justify-content: space-between; page-break-inside: avoid;">
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0 0 50px 0;">Mengetahui,<br><b>Kaur Logistik & SARPRAS</b></p>
            <p style="margin: 0; border-top: 1px solid #000; padding-top: 4px; font-weight: bold;">${cms.signers.kaur_name || 'Kaur SARPRAS'}</p>
          </div>
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0 0 50px 0;">Disetujui,<br><b>Bendahara Yayasan</b></p>
            <p style="margin: 0; border-top: 1px solid #000; padding-top: 4px; font-weight: bold;">${cms.signers.bendahara_name || 'Bendahara Yayasan'}</p>
          </div>
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0 0 50px 0;">Diverifikasi,<br><b>Teknisi Rekanan Utama</b></p>
            <p style="margin: 0; border-top: 1px solid #000; padding-top: 4px; font-weight: bold;">Bpk. Hendra Kurniawan, S.T.</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  },

  closeAcPrintModal() {
    const modal = document.getElementById('acPrintReportModal');
    if (modal) modal.classList.add('hidden');
  },

  // ==========================================
  // 14B. RENOVATION, MATERIAL & HANDYMAN LABOR CONTROLLER
  // ==========================================

  renderRenovServiceView() {
    const projects = this.db.renov_projects || [];
    const requests = this.db.renov_requests || [];

    // 1. Calculate and update Top KPI Stats
    const activeProjectsCount = projects.filter(p => p.status !== 'Selesai').length;
    const totalSpent = requests.reduce((sum, r) => sum + (Number(r.total_amount) || 0), 0);
    const laborSpent = requests.reduce((sum, r) => sum + (Number(r.labor_subtotal) || 0), 0);
    const pendingCount = requests.filter(r => ['Menunggu Persetujuan', 'Menunggu Pengiriman', 'Dalam Pengerjaan'].includes(r.status)).length;

    const elActive = document.getElementById('metricRenovActiveProjects');
    const elTotal = document.getElementById('metricRenovTotalExpense');
    const elLabor = document.getElementById('metricRenovLaborExpense');
    const elPending = document.getElementById('metricRenovPendingRequests');

    if (elActive) elActive.textContent = `${activeProjectsCount} Titik`;
    if (elTotal) elTotal.textContent = `Rp ${this.formatNumber(totalSpent)}`;
    if (elLabor) elLabor.textContent = `Rp ${this.formatNumber(laborSpent)}`;
    if (elPending) elPending.textContent = pendingCount;

    // 2. Populate form dropdowns and sync current active tab
    this.populateRenovFormDropdowns();
    this.switchRenovSubTab(this.activeRenovSubTab || 'materials');
  },

  switchRenovSubTab(tabName) {
    this.activeRenovSubTab = tabName;

    const tabs = ['materials', 'projects', 'analytics', 'vendors'];
    tabs.forEach(t => {
      const btn = document.getElementById(`renovSubTabBtn-${t}`);
      const pane = document.getElementById(`renovSubTab-${t}`);

      if (btn) {
        if (t === tabName) {
          btn.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 transition flex items-center space-x-2 shrink-0';
        } else {
          btn.className = 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition flex items-center space-x-2 shrink-0';
        }
      }

      if (pane) {
        if (t === tabName) pane.classList.remove('hidden');
        else pane.classList.add('hidden');
      }
    });

    if (tabName === 'materials') {
      this.renderRenovPackagesGrid();
      this.calculateRenovFormTotal();
    } else if (tabName === 'projects') {
      this.renderRenovProjectsTable();
    } else if (tabName === 'analytics') {
      this.renderRenovAnalytics();
    } else if (tabName === 'vendors') {
      this.renderRenovVendors();
    }
  },

  renderRenovPackagesGrid() {
    const container = document.getElementById('renovPackagesGrid');
    if (!container) return;

    const packages = this.db.renov_pricing_catalogue || INITIAL_DB.renov_pricing_catalogue;

    container.innerHTML = packages.map(pkg => `
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm card-hover flex flex-col justify-between group transition">
        <div>
          <div class="flex items-start justify-between gap-2 mb-3">
            <span class="inline-block px-2.5 py-0.5 ${pkg.badge_color || 'bg-amber-100 text-amber-800'} text-[10px] font-bold rounded-full">
              ${pkg.badge}
            </span>
            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm shrink-0 group-hover:scale-110 transition-transform">
              <i class="fa-solid ${pkg.icon || 'fa-paint-roller'}"></i>
            </div>
          </div>
          
          <h4 class="font-extrabold text-sm text-slate-900 font-heading leading-snug mb-1">
            ${pkg.name}
          </h4>
          <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-3">
            ${pkg.description}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">${pkg.category}</span>
            <span class="text-sm font-black text-slate-900 font-heading">Rp ${this.formatNumber(pkg.unit_price)}</span>
          </div>
          <button onclick="app.selectRenovPackage('${pkg.material_id}')" class="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center space-x-1">
            <i class="fa-solid fa-check"></i>
            <span>Pilih</span>
          </button>
        </div>
      </div>
    `).join('');
  },

  selectRenovPackage(materialId) {
    const packages = this.db.renov_pricing_catalogue || INITIAL_DB.renov_pricing_catalogue;
    const pkg = packages.find(p => p.material_id === materialId);
    if (!pkg) return;

    const selectEl = document.getElementById('renovFormMaterialSelect');
    const priceEl = document.getElementById('renovFormUnitPrice');
    const catEl = document.getElementById('renovFormCategory');

    if (selectEl) selectEl.value = pkg.material_id;
    if (priceEl) priceEl.value = pkg.unit_price;

    if (catEl) {
      if (pkg.category.includes('Cat')) catEl.value = 'Pengecatan Gedung / Kelas';
      else if (pkg.category.includes('Lantai')) catEl.value = 'Renovasi Toilet & Sanitasi';
      else if (pkg.name.toLowerCase().includes('plafon')) catEl.value = 'Perbaikan Plafon & Atap';
    }

    this.calculateRenovFormTotal();

    const formContainer = document.getElementById('renovRequestForm');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formContainer.parentElement.classList.add('ring-2', 'ring-amber-400');
      setTimeout(() => {
        if (formContainer.parentElement) formContainer.parentElement.classList.remove('ring-2', 'ring-amber-400');
      }, 1200);
    }

    this.showToast(`Material / Jasa "${pkg.name}" dipilih!`, 'info');
  },

  populateRenovFormDropdowns() {
    const unitSelect = document.getElementById('renovFormUnitSelect');
    if (unitSelect && this.currentUser && this.currentUser.unit_id) {
      if (['unit_tk', 'unit_sd', 'unit_smp'].includes(this.currentUser.unit_id)) {
        unitSelect.value = this.currentUser.unit_id;
      }
    }

    const materialSelect = document.getElementById('renovFormMaterialSelect');
    if (materialSelect) {
      const catalogue = this.db.renov_pricing_catalogue || INITIAL_DB.renov_pricing_catalogue;
      materialSelect.innerHTML = catalogue.map(m => `
        <option value="${m.material_id}">${m.name} - Rp ${this.formatNumber(m.unit_price)}</option>
      `).join('') + '<option value="CUSTOM_MATERIAL">+ Bahan / Material Custom Lainnya</option>';
    }

    const dateInput = document.getElementById('renovFormDate');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    this.onRenovUnitSelectChange();
  },

  onRenovUnitSelectChange() {
    const unitSelect = document.getElementById('renovFormUnitSelect');
    const projectSelect = document.getElementById('renovFormProjectSelect');
    if (!unitSelect || !projectSelect) return;

    const selectedUnit = unitSelect.value;
    const projects = this.db.renov_projects || [];
    const unitProjects = projects.filter(p => p.unit_id === selectedUnit);

    projectSelect.innerHTML = '<option value="">-- Pilih Titik Proyek Terdaftar (atau isi manual) --</option>' + 
      unitProjects.map(p => `<option value="${p.project_id}">[${p.project_id}] ${p.location_name} (${p.category})</option>`).join('') +
      '<option value="NEW_PROJECT">+ Daftarkan Titik Renovasi Baru</option>';
  },

  onRenovProjectSelectChange() {
    const projectSelect = document.getElementById('renovFormProjectSelect');
    const locInput = document.getElementById('renovFormLocation');
    const catSelect = document.getElementById('renovFormCategory');
    if (!projectSelect) return;

    const val = projectSelect.value;
    if (!val || val === 'NEW_PROJECT') {
      if (val === 'NEW_PROJECT') {
        this.openAddRenovProjectModal();
      }
      return;
    }

    const projects = this.db.renov_projects || [];
    const item = projects.find(p => p.project_id === val);
    if (item) {
      if (locInput) locInput.value = item.location_name;
      if (catSelect && item.category) catSelect.value = item.category;
    }
  },

  onRenovMaterialSelectChange() {
    const materialSelect = document.getElementById('renovFormMaterialSelect');
    const priceInput = document.getElementById('renovFormUnitPrice');
    if (!materialSelect || !priceInput) return;

    if (materialSelect.value === 'CUSTOM_MATERIAL') {
      priceInput.removeAttribute('readonly');
      priceInput.focus();
      return;
    }

    const catalogue = this.db.renov_pricing_catalogue || INITIAL_DB.renov_pricing_catalogue;
    const item = catalogue.find(m => m.material_id === materialSelect.value);
    if (item) {
      priceInput.value = item.unit_price;
    }
    this.calculateRenovFormTotal();
  },

  calculateRenovFormTotal() {
    const qtyInput = document.getElementById('renovFormQty');
    const priceInput = document.getElementById('renovFormUnitPrice');
    const laborCountInput = document.getElementById('renovFormLaborCount');
    const laborDaysInput = document.getElementById('renovFormLaborDays');
    const laborRateInput = document.getElementById('renovFormLaborRate');

    const subMatEl = document.getElementById('renovFormSubtotalMaterial');
    const subLaborEl = document.getElementById('renovFormSubtotalLabor');
    const grandTotalEl = document.getElementById('renovFormGrandTotal');

    const qty = Number(qtyInput ? qtyInput.value : 1) || 0;
    const price = Number(priceInput ? priceInput.value : 0) || 0;
    const matSubtotal = qty * price;

    const laborCount = Number(laborCountInput ? laborCountInput.value : 0) || 0;
    const laborDays = Number(laborDaysInput ? laborDaysInput.value : 0) || 0;
    const laborRate = Number(laborRateInput ? laborRateInput.value : 0) || 0;
    const laborSubtotal = laborCount * laborDays * laborRate;

    const grandTotal = matSubtotal + laborSubtotal;

    if (subMatEl) subMatEl.textContent = 'Rp ' + this.formatNumber(matSubtotal);
    if (subLaborEl) subLaborEl.textContent = 'Rp ' + this.formatNumber(laborSubtotal);
    if (grandTotalEl) grandTotalEl.textContent = 'Rp ' + this.formatNumber(grandTotal);

    return { matSubtotal, laborSubtotal, grandTotal };
  },

  submitRenovRequest(event) {
    event.preventDefault();

    const unitSelect = document.getElementById('renovFormUnitSelect');
    const projectSelect = document.getElementById('renovFormProjectSelect');
    const locInput = document.getElementById('renovFormLocation');
    const catSelect = document.getElementById('renovFormCategory');
    const matSelect = document.getElementById('renovFormMaterialSelect');
    const qtyInput = document.getElementById('renovFormQty');
    const priceInput = document.getElementById('renovFormUnitPrice');
    const laborCountInput = document.getElementById('renovFormLaborCount');
    const laborDaysInput = document.getElementById('renovFormLaborDays');
    const laborRateInput = document.getElementById('renovFormLaborRate');
    const dateInput = document.getElementById('renovFormDate');
    const vendorSelect = document.getElementById('renovFormVendor');
    const fundingSelect = document.getElementById('renovFormFundingSource');
    const notesInput = document.getElementById('renovFormNotes');

    const unitId = unitSelect ? unitSelect.value : 'unit_sd';
    const projectId = projectSelect ? projectSelect.value : '';
    const locationName = locInput ? locInput.value.trim() : '';
    const category = catSelect ? catSelect.value : 'Pengecatan Gedung / Kelas';
    const materialId = matSelect ? matSelect.value : 'RNV-MAT-CAT-INT-20KG';
    const materialName = matSelect && matSelect.options[matSelect.selectedIndex] ? matSelect.options[matSelect.selectedIndex].text.split(' - ')[0] : 'Material Bangunan';
    const qty = Number(qtyInput ? qtyInput.value : 1) || 1;
    const unitPrice = Number(priceInput ? priceInput.value : 0) || 0;
    const laborCount = Number(laborCountInput ? laborCountInput.value : 0) || 0;
    const laborDays = Number(laborDaysInput ? laborDaysInput.value : 0) || 0;
    const laborRate = Number(laborRateInput ? laborRateInput.value : 0) || 0;
    const scheduledDate = dateInput ? dateInput.value : '';
    const vendorName = vendorSelect && vendorSelect.options[vendorSelect.selectedIndex] ? vendorSelect.options[vendorSelect.selectedIndex].text : 'TB. Al-Imam Jaya Material';
    const fundingSource = fundingSelect ? fundingSelect.value : 'RAPBS_POIN';
    const notes = notesInput ? notesInput.value.trim() : '';

    if (!locationName) {
      this.showToast('Mohon isi lokasi / titik pekerjaan renovasi!', 'warning');
      return;
    }

    const { matSubtotal, laborSubtotal, grandTotal } = this.calculateRenovFormTotal();

    if (grandTotal <= 0) {
      this.showToast('Total biaya tidak boleh Rp 0!', 'warning');
      return;
    }

    // Check RAPBS Quota if using RAPBS Poin
    if (fundingSource === 'RAPBS_POIN' && this.db.rapbs_poin) {
      const userRapbs = this.db.rapbs_poin.find(r => r.unit_id === unitId);
      if (userRapbs) {
        if (userRapbs.saldo_tersedia < grandTotal) {
          this.showToast(`Saldo RAPBS ${unitId.toUpperCase()} tidak mencukupi! (Sisa: Rp ${this.formatNumber(userRapbs.saldo_tersedia)})`, 'error');
          return;
        }
        userRapbs.saldo_tersedia -= grandTotal;
        userRapbs.terpakai += grandTotal;
        userRapbs.updated_at = this.formatCurrentDateTime();
      }
    }

    const requestId = `RNV-REQ-${this.generateTimestampId()}`;

    const newRequest = {
      request_id: requestId,
      project_id: projectId || `PRJ-${unitId.replace('unit_', '').toUpperCase()}-GEN`,
      unit_id: unitId,
      location_name: locationName,
      category: category,
      material_name: materialName,
      material_id: materialId,
      qty: qty,
      unit_price: unitPrice,
      material_subtotal: matSubtotal,
      labor_count: laborCount,
      labor_days: laborDays,
      labor_rate: laborRate,
      labor_subtotal: laborSubtotal,
      total_amount: grandTotal,
      scheduled_date: scheduledDate,
      vendor_name: vendorName,
      funding_source: fundingSource,
      notes: notes,
      status: 'Dalam Pengerjaan',
      created_at: this.formatCurrentDateTime(),
      approved_at: this.formatCurrentDateTime()
    };

    if (!this.db.renov_requests) this.db.renov_requests = [];
    this.db.renov_requests.unshift(newRequest);

    this.saveState();
    this.updateUI();

    this.showToast(`Pengajuan material & tukang ${requestId} (Rp ${this.formatNumber(grandTotal)}) berhasil dibuat!`, 'success');

    // Reset Form
    if (locInput) locInput.value = '';
    if (notesInput) notesInput.value = '';
    if (laborCountInput) laborCountInput.value = '0';
    if (laborDaysInput) laborDaysInput.value = '0';
    this.calculateRenovFormTotal();

    this.renderRenovServiceView();
  },

  renderRenovProjectsTable() {
    const tbody = document.getElementById('renovProjectsTableBody');
    const countLabel = document.getElementById('renovProjectCountLabel');
    if (!tbody) return;

    let list = this.db.renov_projects || [];

    // Filter by unit
    if (this.renovUnitFilter && this.renovUnitFilter !== 'all') {
      list = list.filter(p => p.unit_id === this.renovUnitFilter);
    }

    // Search filter
    if (this.renovSearchQuery) {
      const q = this.renovSearchQuery.toLowerCase();
      list = list.filter(p => 
        (p.project_id && p.project_id.toLowerCase().includes(q)) ||
        (p.location_name && p.location_name.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.notes && p.notes.toLowerCase().includes(q))
      );
    }

    if (countLabel) countLabel.textContent = `Menampilkan ${list.length} titik proyek`;

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-10 text-slate-400">
            <i class="fa-solid fa-folder-open text-3xl mb-2 block"></i>
            <p>Tidak ada data titik renovasi yang cocok.</p>
          </td>
        </tr>
      `;
      return;
    }

    const unitMap = {
      unit_tk: { name: 'PG-TK Islam Al-Imam', badge: 'bg-emerald-100 text-emerald-800' },
      unit_sd: { name: 'SD Islam Al-Imam', badge: 'bg-blue-100 text-blue-800' },
      unit_smp: { name: 'SMP Islam Al-Imam', badge: 'bg-indigo-100 text-indigo-800' }
    };

    tbody.innerHTML = list.map(p => {
      const u = unitMap[p.unit_id] || { name: p.unit_id, badge: 'bg-slate-100 text-slate-800' };
      const pct = Number(p.progress_pct) || 0;
      let barColor = 'bg-amber-500';
      if (pct === 100) barColor = 'bg-emerald-500';
      else if (pct <= 25) barColor = 'bg-sky-500';

      return `
        <tr class="hover:bg-slate-50/80 transition">
          <td class="px-4 py-3.5 text-center font-bold font-mono text-slate-700">${p.project_id}</td>
          <td class="px-4 py-3.5">
            <div class="flex items-center space-x-2 mb-0.5">
              <span class="px-2 py-0.5 ${u.badge} text-[10px] font-extrabold rounded-full">${u.name}</span>
            </div>
            <div class="font-extrabold text-slate-900">${p.location_name}</div>
          </td>
          <td class="px-4 py-3.5">
            <span class="inline-block font-semibold text-slate-800">${p.category}</span>
            <p class="text-[11px] text-slate-400 truncate max-w-xs">${p.notes || '-'}</p>
          </td>
          <td class="px-4 py-3.5 text-right font-black text-slate-900 font-heading">
            Rp ${this.formatNumber(p.budget_estimate)}
          </td>
          <td class="px-4 py-3.5 text-center w-36">
            <div class="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-1">
              <span>Progres</span>
              <span>${pct}%</span>
            </div>
            <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full ${barColor} rounded-full transition-all duration-500" style="width: ${pct}%"></div>
            </div>
          </td>
          <td class="px-4 py-3.5 text-center text-slate-600 font-semibold">
            ${p.target_date || '-'}
          </td>
          <td class="px-4 py-3.5 text-center">
            <span class="px-2.5 py-1 text-[10px] font-bold rounded-full ${
              p.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
              p.status === 'Dalam Pengerjaan' ? 'bg-amber-100 text-amber-800' :
              'bg-slate-100 text-slate-700'
            }">
              ${p.status}
            </span>
          </td>
          <td class="px-4 py-3.5 text-center">
            <div class="flex items-center justify-center space-x-1.5">
              <button onclick="app.openRenovDetailModal('${p.project_id}')" class="w-7 h-7 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-xs transition" title="Lihat Riwayat Material & Tukang">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button onclick="app.openAddRenovProjectModal('${p.project_id}')" class="w-7 h-7 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center text-xs transition" title="Edit Titik Renovasi">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button onclick="app.deleteRenovProject('${p.project_id}')" class="w-7 h-7 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center text-xs transition" title="Hapus Titik">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  filterRenovProjects(unitId) {
    this.renovUnitFilter = unitId;

    const btns = ['all', 'unit_tk', 'unit_sd', 'unit_smp'];
    btns.forEach(b => {
      const el = document.getElementById(`renovFilterUnit-${b}`);
      if (el) {
        if (b === unitId) {
          el.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-600 text-white shadow-xs transition';
        } else {
          el.className = 'px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition';
        }
      }
    });

    this.renderRenovProjectsTable();
  },

  onRenovSearchChange(query) {
    this.renovSearchQuery = (query || '').toLowerCase();
    this.renderRenovProjectsTable();
  },

  openAddRenovProjectModal(projectId = null) {
    this.editingProjectId = projectId;
    const modal = document.getElementById('renovAddProjectModal');
    const title = document.getElementById('renovAddProjectModalTitle');
    const editIdInput = document.getElementById('renovEditProjectId');

    const schoolSelect = document.getElementById('renovProjectModalSchool');
    const locInput = document.getElementById('renovProjectModalLocation');
    const catSelect = document.getElementById('renovProjectModalCategory');
    const budgetInput = document.getElementById('renovProjectModalBudget');
    const progressSelect = document.getElementById('renovProjectModalProgress');
    const targetInput = document.getElementById('renovProjectModalTargetDate');
    const notesInput = document.getElementById('renovProjectModalNotes');

    if (projectId) {
      const project = (this.db.renov_projects || []).find(p => p.project_id === projectId);
      if (project) {
        if (title) title.textContent = `Edit Titik Renovasi [${project.project_id}]`;
        if (editIdInput) editIdInput.value = project.project_id;
        if (schoolSelect) schoolSelect.value = project.unit_id;
        if (locInput) locInput.value = project.location_name;
        if (catSelect) catSelect.value = project.category;
        if (budgetInput) budgetInput.value = project.budget_estimate;
        if (progressSelect) progressSelect.value = String(project.progress_pct);
        if (targetInput) targetInput.value = project.target_date || '';
        if (notesInput) notesInput.value = project.notes || '';
      }
    } else {
      if (title) title.textContent = 'Daftarkan Titik Renovasi Baru';
      if (editIdInput) editIdInput.value = '';
      if (locInput) locInput.value = '';
      if (budgetInput) budgetInput.value = '2500000';
      if (progressSelect) progressSelect.value = '0';
      if (targetInput) {
        const nextMonth = new Date();
        nextMonth.setDate(nextMonth.getDate() + 14);
        targetInput.value = nextMonth.toISOString().split('T')[0];
      }
      if (notesInput) notesInput.value = '';
    }

    if (modal) modal.classList.remove('hidden');
  },

  closeAddRenovProjectModal() {
    const modal = document.getElementById('renovAddProjectModal');
    if (modal) modal.classList.add('hidden');
    this.editingProjectId = null;
  },

  saveRenovProject(event) {
    event.preventDefault();

    const editId = document.getElementById('renovEditProjectId').value;
    const unitId = document.getElementById('renovProjectModalSchool').value;
    const locationName = document.getElementById('renovProjectModalLocation').value.trim();
    const category = document.getElementById('renovProjectModalCategory').value;
    const budgetEstimate = Number(document.getElementById('renovProjectModalBudget').value) || 0;
    const progressPct = Number(document.getElementById('renovProjectModalProgress').value) || 0;
    const targetDate = document.getElementById('renovProjectModalTargetDate').value;
    const notes = document.getElementById('renovProjectModalNotes').value.trim();

    if (!locationName) {
      this.showToast('Lokasi pekerjaan wajib diisi!', 'warning');
      return;
    }

    let status = 'Dalam Pengerjaan';
    if (progressPct === 100) status = 'Selesai';
    else if (progressPct === 0) status = 'Perencanaan';

    if (!this.db.renov_projects) this.db.renov_projects = [];

    if (editId) {
      const idx = this.db.renov_projects.findIndex(p => p.project_id === editId);
      if (idx !== -1) {
        this.db.renov_projects[idx] = {
          ...this.db.renov_projects[idx],
          unit_id: unitId,
          location_name: locationName,
          category: category,
          budget_estimate: budgetEstimate,
          progress_pct: progressPct,
          target_date: targetDate,
          status: status,
          notes: notes
        };
        this.showToast(`Proyek ${editId} berhasil diperbarui!`, 'success');
      }
    } else {
      const unitCode = unitId.replace('unit_', '').toUpperCase();
      const newId = `PRJ-${unitCode}-${Math.floor(Math.random() * 89 + 10)}`;
      const newProject = {
        project_id: newId,
        unit_id: unitId,
        location_name: locationName,
        category: category,
        budget_estimate: budgetEstimate,
        progress_pct: progressPct,
        target_date: targetDate,
        status: status,
        notes: notes,
        created_at: new Date().toISOString().split('T')[0]
      };
      this.db.renov_projects.unshift(newProject);
      this.showToast(`Titik proyek ${newId} berhasil ditambahkan!`, 'success');
    }

    this.saveState();
    this.closeAddRenovProjectModal();
    this.populateRenovFormDropdowns();
    this.renderRenovProjectsTable();
    this.renderRenovServiceView();
  },

  deleteRenovProject(projectId) {
    if (!confirm(`Apakah Anda yakin ingin menghapus titik proyek ${projectId}?`)) return;

    this.db.renov_projects = (this.db.renov_projects || []).filter(p => p.project_id !== projectId);
    this.saveState();
    this.showToast(`Titik proyek ${projectId} berhasil dihapus.`, 'info');
    this.populateRenovFormDropdowns();
    this.renderRenovProjectsTable();
    this.renderRenovServiceView();
  },

  openRenovDetailModal(projectId) {
    const project = (this.db.renov_projects || []).find(p => p.project_id === projectId);
    if (!project) return;

    const modal = document.getElementById('renovDetailModal');
    const title = document.getElementById('renovDetailModalTitle');
    const subtitle = document.getElementById('renovDetailModalSubtitle');
    const codeEl = document.getElementById('renovDetailProjectCode');
    const catEl = document.getElementById('renovDetailCategory');
    const progEl = document.getElementById('renovDetailProgress');
    const totalEl = document.getElementById('renovDetailTotalSpent');
    const container = document.getElementById('renovDetailItemsContainer');
    const quickAddBtn = document.getElementById('renovDetailQuickAddMaterialBtn');

    const requests = (this.db.renov_requests || []).filter(r => r.project_id === projectId || (r.location_name && r.location_name.includes(project.location_name)));
    const spent = requests.reduce((sum, r) => sum + (Number(r.total_amount) || 0), 0);

    if (title) title.textContent = project.location_name;
    if (subtitle) subtitle.textContent = `Master Data Titik Proyek [${project.project_id}]`;
    if (codeEl) codeEl.textContent = project.project_id;
    if (catEl) catEl.textContent = project.category;
    if (progEl) progEl.textContent = `${project.progress_pct}% (${project.status})`;
    if (totalEl) totalEl.textContent = `Rp ${this.formatNumber(spent)}`;

    if (quickAddBtn) {
      quickAddBtn.onclick = () => {
        this.closeRenovDetailModal();
        this.switchRenovSubTab('materials');
        const projSelect = document.getElementById('renovFormProjectSelect');
        if (projSelect) {
          projSelect.value = project.project_id;
          this.onRenovProjectSelectChange();
        }
      };
    }

    if (container) {
      if (requests.length === 0) {
        container.innerHTML = `
          <div class="text-center py-8 text-slate-400">
            <i class="fa-solid fa-clipboard-list text-3xl mb-2 block"></i>
            <p>Belum ada riwayat transaksi material atau upah tukang untuk proyek ini.</p>
          </div>
        `;
      } else {
        container.innerHTML = requests.map(r => `
          <div class="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center space-x-2">
                <span class="font-mono text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">${r.request_id}</span>
                <span class="text-xs font-bold text-slate-900">${r.material_name} (x${r.qty})</span>
              </div>
              <p class="text-[11px] text-slate-500">
                <i class="fa-solid fa-store mr-1 text-slate-400"></i>${r.vendor_name || 'Toko Material'} • 
                <i class="fa-regular fa-calendar mr-1 text-slate-400"></i>${r.scheduled_date || r.created_at}
              </p>
              ${r.labor_count > 0 ? `
                <div class="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded inline-block font-semibold">
                  <i class="fa-solid fa-users-gear mr-1"></i>${r.labor_count} Tukang x ${r.labor_days} Hari (@Rp ${this.formatNumber(r.labor_rate)}) = Rp ${this.formatNumber(r.labor_subtotal)}
                </div>
              ` : ''}
              ${r.notes ? `<p class="text-[10px] text-slate-400 italic">"${r.notes}"</p>` : ''}
            </div>

            <div class="text-right shrink-0">
              <span class="text-[10px] text-slate-400 block font-medium">Total Biaya</span>
              <span class="text-sm font-black text-slate-900 font-heading">Rp ${this.formatNumber(r.total_amount)}</span>
              <span class="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold rounded-full ${
                r.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }">${r.status}</span>
            </div>
          </div>
        `).join('');
      }
    }

    if (modal) modal.classList.remove('hidden');
  },

  closeRenovDetailModal() {
    const modal = document.getElementById('renovDetailModal');
    if (modal) modal.classList.add('hidden');
  },

  renderRenovAnalytics() {
    const cardsContainer = document.getElementById('renovUnitBudgetCardsContainer');
    const tableBody = document.getElementById('renovRequestsLogTableBody');
    const requests = this.db.renov_requests || [];

    const units = [
      { id: 'unit_tk', name: 'PG-TK Islam Al-Imam', budget: 4500000, icon: 'fa-shapes', color: 'emerald' },
      { id: 'unit_sd', name: 'SD Islam Al-Imam', budget: 12500000, icon: 'fa-school', color: 'blue' },
      { id: 'unit_smp', name: 'SMP Islam Al-Imam', budget: 9700000, icon: 'fa-graduation-cap', color: 'indigo' }
    ];

    if (cardsContainer) {
      cardsContainer.innerHTML = units.map(u => {
        const spent = requests.filter(r => r.unit_id === u.id).reduce((s, r) => s + (Number(r.total_amount) || 0), 0);
        const sisa = Math.max(0, u.budget - spent);
        const pct = Math.min(100, Math.round((spent / u.budget) * 100));

        return `
          <div class="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="w-9 h-9 rounded-2xl bg-${u.color}-50 text-${u.color}-600 flex items-center justify-center text-sm">
                  <i class="fa-solid ${u.icon}"></i>
                </div>
                <span class="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full">${pct}% Terpakai</span>
              </div>
              <div>
                <h4 class="font-extrabold text-xs text-slate-900 font-heading">${u.name}</h4>
                <div class="text-lg font-black text-slate-900 mt-1">Rp ${this.formatNumber(spent)}</div>
                <div class="text-[10px] text-slate-400">Plafond: Rp ${this.formatNumber(u.budget)}</div>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 mt-3">
              <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                <div class="h-full bg-${u.color}-500 rounded-full" style="width: ${pct}%"></div>
              </div>
              <div class="flex items-center justify-between text-[10px] font-bold text-slate-500">
                <span>Sisa Alokasi</span>
                <span class="text-emerald-700">Rp ${this.formatNumber(sisa)}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    if (tableBody) {
      if (requests.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="9" class="text-center py-8 text-slate-400">
              <i class="fa-solid fa-receipt text-3xl mb-2 block"></i>
              <p>Belum ada riwayat pembelanjaan material / upah tukang.</p>
            </td>
          </tr>
        `;
        return;
      }

      tableBody.innerHTML = requests.map(r => `
        <tr class="hover:bg-slate-50/80 transition">
          <td class="px-4 py-3 text-center font-mono font-bold text-amber-800">${r.request_id}</td>
          <td class="px-4 py-3">
            <div class="font-extrabold text-slate-900">${r.location_name}</div>
            <div class="text-[10px] text-slate-400">${r.unit_id.toUpperCase()} • ${r.category}</div>
          </td>
          <td class="px-4 py-3">
            <span class="font-semibold text-slate-800">${r.material_name} (x${r.qty})</span>
            ${r.labor_count > 0 ? `<div class="text-[10px] text-indigo-600">${r.labor_count} Tukang (${r.labor_days} hari)</div>` : ''}
          </td>
          <td class="px-4 py-3 text-right font-bold text-slate-800">Rp ${this.formatNumber(r.material_subtotal || (r.qty * r.unit_price))}</td>
          <td class="px-4 py-3 text-right font-bold text-indigo-700">Rp ${this.formatNumber(r.labor_subtotal || 0)}</td>
          <td class="px-4 py-3 text-right font-black text-slate-900 font-heading">Rp ${this.formatNumber(r.total_amount)}</td>
          <td class="px-4 py-3 text-center text-slate-500">${r.scheduled_date || r.created_at}</td>
          <td class="px-4 py-3 text-center">
            <span class="px-2.5 py-1 text-[10px] font-bold rounded-full ${
              r.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }">
              ${r.status}
            </span>
          </td>
          <td class="px-4 py-3 text-center">
            ${r.status !== 'Selesai' ? `
              <button onclick="app.updateRenovRequestStatus('${r.request_id}', 'Selesai')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition">
                Selesai
              </button>
            ` : `
              <span class="text-[10px] text-emerald-600 font-bold"><i class="fa-solid fa-check-double mr-1"></i>Tuntas</span>
            `}
          </td>
        </tr>
      `).join('');
    }
  },

  renderRenovVendors() {
    const container = document.getElementById('renovVendorsContainer');
    if (!container) return;

    const vendors = this.db.renov_vendors || INITIAL_DB.renov_vendors;

    container.innerHTML = vendors.map(v => `
      <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm card-hover flex flex-col justify-between space-y-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-full">
              ${v.badge}
            </span>
            <div class="flex items-center space-x-1 text-amber-500 text-xs font-bold">
              <i class="fa-solid fa-star"></i>
              <span>${v.rating} (${v.review_count})</span>
            </div>
          </div>

          <h4 class="font-extrabold text-base text-slate-900 font-heading">
            ${v.name}
          </h4>

          <p class="text-xs text-slate-500 leading-relaxed">
            ${v.description}
          </p>

          <div class="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-user-tie text-amber-600 w-4"></i>
              <span>Kontak: <b>${v.pic}</b></span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-shield-halved text-emerald-600 w-4"></i>
              <span>Garansi: <b>${v.warranty}</b></span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-truck-fast text-sky-600 w-4"></i>
              <span>SLA: <b>${v.sla}</b></span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-location-dot text-rose-500 w-4"></i>
              <span class="truncate">${v.address}</span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100">
          <a href="https://wa.me/${v.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(v.name)},%20kami%20dari%20SARPRAS%20Sekolah%20Al-Imam%20ingin%20memesan%20material%20bangunan%20dan%20jasa%20tukang." target="_blank" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center space-x-2">
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>Hubungi WhatsApp Mitra</span>
          </a>
        </div>
      </div>
    `).join('');
  },

  updateRenovRequestStatus(requestId, newStatus) {
    const requests = this.db.renov_requests || [];
    const req = requests.find(r => r.request_id === requestId);
    if (!req) return;

    req.status = newStatus;
    if (newStatus === 'Selesai') {
      req.completed_at = this.formatCurrentDateTime();

      if (req.project_id && this.db.renov_projects) {
        const prj = this.db.renov_projects.find(p => p.project_id === req.project_id);
        if (prj) {
          prj.progress_pct = 100;
          prj.status = 'Selesai';
        }
      }
    }

    this.saveState();
    this.showToast(`Status pengajuan ${requestId} berhasil diperbarui menjadi "${newStatus}"!`, 'success');
    this.renderRenovServiceView();
  },

  printRenovReport() {
    const cms = this.db.cms_settings || DEFAULT_CMS_SETTINGS;
    const projects = this.db.renov_projects || [];
    const requests = this.db.renov_requests || [];

    const totalCost = requests.reduce((sum, r) => sum + (Number(r.total_amount) || 0), 0);
    const totalMaterial = requests.reduce((sum, r) => sum + (Number(r.material_subtotal) || 0), 0);
    const totalLabor = requests.reduce((sum, r) => sum + (Number(r.labor_subtotal) || 0), 0);

    const modal = document.getElementById('renovPrintReportModal');
    const container = document.getElementById('renovPrintReportContent');
    if (!modal || !container) return;

    const unitExpense = {
      unit_tk: requests.filter(r => r.unit_id === 'unit_tk').reduce((s, r) => s + (Number(r.total_amount) || 0), 0),
      unit_sd: requests.filter(r => r.unit_id === 'unit_sd').reduce((s, r) => s + (Number(r.total_amount) || 0), 0),
      unit_smp: requests.filter(r => r.unit_id === 'unit_smp').reduce((s, r) => s + (Number(r.total_amount) || 0), 0),
    };

    const tableRows = requests.map((r, idx) => `
      <tr>
        <td style="text-align: center; padding: 6px; border: 1px solid #333;">${idx + 1}</td>
        <td style="padding: 6px; border: 1px solid #333; font-family: monospace;">${r.request_id}</td>
        <td style="padding: 6px; border: 1px solid #333; font-weight: bold;">${r.location_name}</td>
        <td style="padding: 6px; border: 1px solid #333;">${r.material_name} (x${r.qty})</td>
        <td style="text-align: right; padding: 6px; border: 1px solid #333;">Rp ${this.formatNumber(r.material_subtotal || 0)}</td>
        <td style="text-align: right; padding: 6px; border: 1px solid #333;">Rp ${this.formatNumber(r.labor_subtotal || 0)}</td>
        <td style="text-align: right; padding: 6px; border: 1px solid #333; font-weight: bold;">Rp ${this.formatNumber(r.total_amount)}</td>
        <td style="padding: 6px; border: 1px solid #333;">${r.vendor_name || 'TB. Al-Imam Jaya'}</td>
        <td style="text-align: center; padding: 6px; border: 1px solid #333;">${r.status}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="print-page text-slate-900" style="font-family: Arial, sans-serif; font-size: 11pt;">
        <!-- Header Kop Surat -->
        <div style="text-align: center; border-bottom: 2.5px solid #000; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 4px 0; font-size: 16pt; text-transform: uppercase; font-weight: bold;">${cms.foundation_name || 'YAYASAN PENDIDIKAN ISLAM AL-IMAM'}</h2>
          <h3 style="margin: 0 0 4px 0; font-size: 13pt; font-weight: 600;">DIVISI SARANA PRASARANA & PEMELIHARAAN BANGUNAN SIPIL</h3>
          <p style="margin: 0; font-size: 10pt; color: #444;">${cms.address || 'Jakarta'} • Telp: ${cms.phone || '(021) 8899-7711'}</p>
        </div>

        <h3 style="text-align: center; margin: 0 0 4px 0; text-transform: uppercase; font-size: 13pt;">REKAPITULASI BIAYA MATERIAL, CAT & UPAH TUKANG</h3>
        <p style="text-align: center; margin: 0 0 20px 0; font-size: 10pt; color: #555;">Tahun Ajaran 2026/2027 • Pemeliharaan Fisik Gedung (PG-TK, SD, SMP)</p>

        <!-- Summary Table per Unit -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="border: 1px solid #333; padding: 7px; text-align: left;">Unit Sekolah</th>
              <th style="border: 1px solid #333; padding: 7px; text-align: center;">Titik Proyek</th>
              <th style="border: 1px solid #333; padding: 7px; text-align: right;">Alokasi RAPBS Renovasi</th>
              <th style="border: 1px solid #333; padding: 7px; text-align: right;">Realisasi Biaya</th>
              <th style="border: 1px solid #333; padding: 7px; text-align: center;">Persentase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #333; padding: 6px; font-weight: bold;">PG-TK Islam Al-Imam</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${projects.filter(p => p.unit_id === 'unit_tk').length} Titik</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right;">Rp 4.500.000</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right; font-weight: bold;">Rp ${this.formatNumber(unitExpense.unit_tk)}</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${Math.round((unitExpense.unit_tk / 4500000) * 100)}%</td>
            </tr>
            <tr>
              <td style="border: 1px solid #333; padding: 6px; font-weight: bold;">SD Islam Al-Imam</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${projects.filter(p => p.unit_id === 'unit_sd').length} Titik</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right;">Rp 12.500.000</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right; font-weight: bold;">Rp ${this.formatNumber(unitExpense.unit_sd)}</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${Math.round((unitExpense.unit_sd / 12500000) * 100)}%</td>
            </tr>
            <tr>
              <td style="border: 1px solid #333; padding: 6px; font-weight: bold;">SMP Islam Al-Imam</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${projects.filter(p => p.unit_id === 'unit_smp').length} Titik</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right;">Rp 9.700.000</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: right; font-weight: bold;">Rp ${this.formatNumber(unitExpense.unit_smp)}</td>
              <td style="border: 1px solid #333; padding: 6px; text-align: center;">${Math.round((unitExpense.unit_smp / 9700000) * 100)}%</td>
            </tr>
            <tr style="background: #f8fafc; font-weight: bold;">
              <td style="border: 1px solid #333; padding: 7px;">TOTAL KESELURUHAN</td>
              <td style="border: 1px solid #333; padding: 7px; text-align: center;">${projects.length} Titik</td>
              <td style="border: 1px solid #333; padding: 7px; text-align: right;">Rp 26.700.000</td>
              <td style="border: 1px solid #333; padding: 7px; text-align: right; font-size: 12pt; color: #b45309;">Rp ${this.formatNumber(totalCost)}</td>
              <td style="border: 1px solid #333; padding: 7px; text-align: center;">${Math.round((totalCost / 26700000) * 100)}%</td>
            </tr>
          </tbody>
        </table>

        <!-- Detailed Transactions Table -->
        <h4 style="margin: 15px 0 6px 0; font-size: 11pt; text-transform: uppercase;">Rincian Pembelian Material & Upah Kerja:</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="border: 1px solid #333; padding: 5px; width: 25px; text-align: center;">No</th>
              <th style="border: 1px solid #333; padding: 5px; text-align: center;">ID</th>
              <th style="border: 1px solid #333; padding: 5px; text-align: left;">Titik Pekerjaan</th>
              <th style="border: 1px solid #333; padding: 5px; text-align: left;">Bahan Material</th>
              <th style="border: 1px solid #333; padding: 5px; text-align: right;">Bahan</th>
              <th style="border: 1px solid #333; padding: 5px; text-align: right;">Tukang</th>
              <th style="border: 1px solid #333; padding: 5px; text-align: right;">Total</th>
              <th style="border: 1px solid #333; padding: 5px; text-align: left;">Mitra / Toko</th>
              <th style="border: 1px solid #333; padding: 5px; text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>

        <!-- Signatures Box -->
        <div style="margin-top: 35px; display: flex; justify-content: space-between; page-break-inside: avoid;">
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0 0 50px 0;">Mengetahui,<br><b>Kaur Logistik & SARPRAS</b></p>
            <p style="margin: 0; border-top: 1px solid #000; padding-top: 4px; font-weight: bold;">${cms.signers.kaur_name || 'Kaur SARPRAS'}</p>
          </div>
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0 0 50px 0;">Disetujui,<br><b>Bendahara Yayasan</b></p>
            <p style="margin: 0; border-top: 1px solid #000; padding-top: 4px; font-weight: bold;">${cms.signers.bendahara_name || 'Bendahara Yayasan'}</p>
          </div>
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0 0 50px 0;">Diverifikasi,<br><b>Mandor / Mitra Rekanan</b></p>
            <p style="margin: 0; border-top: 1px solid #000; padding-top: 4px; font-weight: bold;">Bpk. Mandor Wardi</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  },

  closeRenovPrintModal() {
    const modal = document.getElementById('renovPrintReportModal');
    if (modal) modal.classList.add('hidden');
  },

  // ==========================================
  // 15. HELPER UTILITIES
  // ==========================================
  
  formatNumber(num) {
    if (isNaN(num)) return '0';
    return Number(num).toLocaleString('id-ID');
  },

  formatCurrentDateTime() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  },

  generateTimestampId() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(Math.floor(Math.random() * 900 + 100))}`;
  },

  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  escapeQuotes(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'");
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast bg-white border border-slate-200 text-slate-800 shadow-xl';

    let icon = '<i class="fa-solid fa-circle-info text-blue-600 text-lg"></i>';
    if (type === 'success') icon = '<i class="fa-solid fa-circle-check text-emerald-600 text-lg"></i>';
    else if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation text-amber-500 text-lg"></i>';
    else if (type === 'error') icon = '<i class="fa-solid fa-circle-xmark text-red-600 text-lg"></i>';

    toast.innerHTML = `
      ${icon}
      <div class="text-xs font-semibold flex-1 leading-snug">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Explicitly bind to global window for inline HTML onclick handlers
if (typeof window !== 'undefined') {
  window.app = app;
}

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
