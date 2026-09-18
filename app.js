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
    primary_color: '#047857',
    accent_color: '#d97706',
    font_family: 'Plus Jakarta Sans',
    border_radius: '1.5rem'
  }
};

// Preset Color Palettes
const THEME_PRESETS = {
  emerald: {
    name: 'Emerald Islamic',
    primary: '#047857',
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

// ==========================================
// 2. INITIAL DATABASE SEED
// ==========================================
const INITIAL_DB = {
  cms_settings: JSON.parse(JSON.stringify(DEFAULT_CMS_SETTINGS)),

  users: [
    { unit_id: 'unit_tk', username: 'tk_alimam', unit_name: 'TK Islam Al-Imam', role: 'Unit' },
    { unit_id: 'unit_sd', username: 'sd_alimam', unit_name: 'SD Islam Al-Imam', role: 'Unit' },
    { unit_id: 'unit_smp', username: 'smp_alimam', unit_name: 'SMP Islam Al-Imam', role: 'Unit' },
    { unit_id: 'unit_sma', username: 'sma_alimam', unit_name: 'SMA Islam Al-Imam', role: 'Unit' },
    { unit_id: 'bendahara', username: 'bendahara_yayasan', unit_name: 'Bendahara Yayasan', role: 'Bendahara' },
    { unit_id: 'admin', username: 'admin_sarpras', unit_name: 'Admin Logistik & SARPRAS', role: 'Admin' }
  ],
  
  rapbs_poin: [
    { unit_id: 'unit_tk', total_plafond: 15000000, terpakai: 2750000, saldo_tersedia: 12250000, updated_at: '2026-09-15 08:30' },
    { unit_id: 'unit_sd', total_plafond: 35000000, terpakai: 8400000, saldo_tersedia: 26600000, updated_at: '2026-09-16 10:15' },
    { unit_id: 'unit_smp', total_plafond: 30000000, terpakai: 6200000, saldo_tersedia: 23800000, updated_at: '2026-09-17 14:00' },
    { unit_id: 'unit_sma', total_plafond: 40000000, terpakai: 11500000, saldo_tersedia: 28500000, updated_at: '2026-09-18 09:00' }
  ],

  stock_inventory: [
    { batch_id: 'BATCH-202607-01', product_name: 'Spidol Whiteboard Snowman Hitam', category: 'ATK & Kertas', stock_qty: 0, unit_price: 8500, date_in: '2026-07-10', method: 'FIFO', status: 'Empty' },
    { batch_id: 'BATCH-202608-04', product_name: 'Spidol Whiteboard Snowman Hitam', category: 'ATK & Kertas', stock_qty: 12, unit_price: 9000, date_in: '2026-08-15', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202609-02', product_name: 'Spidol Whiteboard Snowman Hitam', category: 'ATK & Kertas', stock_qty: 50, unit_price: 9500, date_in: '2026-09-05', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202608-01', product_name: 'Kertas HVS A4 80gr PaperOne (Rim)', category: 'ATK & Kertas', stock_qty: 25, unit_price: 52000, date_in: '2026-08-01', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202609-01', product_name: 'Kertas HVS A4 80gr PaperOne (Rim)', category: 'ATK & Kertas', stock_qty: 40, unit_price: 54000, date_in: '2026-09-02', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202608-02', product_name: 'Kertas HVS F4 75gr SiDU (Rim)', category: 'ATK & Kertas', stock_qty: 18, unit_price: 56000, date_in: '2026-08-05', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202608-08', product_name: 'Tinta Epson 003 Black Original', category: 'Elektronik & IT', stock_qty: 8, unit_price: 85000, date_in: '2026-08-20', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202608-09', product_name: 'Tinta Epson 003 Color Set (C,M,Y)', category: 'Elektronik & IT', stock_qty: 5, unit_price: 245000, date_in: '2026-08-20', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202609-07', product_name: 'Cairan Pembersih Lantai Wipol Karbol 5 Liter', category: 'Kebersihan & Sanitasi', stock_qty: 10, unit_price: 78000, date_in: '2026-09-08', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202609-08', product_name: 'Sabun Cuci Tangan Lifebuoy Handwash 4 Liter', category: 'Kebersihan & Sanitasi', stock_qty: 6, unit_price: 110000, date_in: '2026-09-08', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202608-11', product_name: 'Sapu Lantai Ijuk Dragon & Pengki Set', category: 'Kebersihan & Sanitasi', stock_qty: 15, unit_price: 38000, date_in: '2026-08-12', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202608-15', product_name: 'Kabel HDMI 10 Meter Vention Braided', category: 'Elektronik & IT', stock_qty: 4, unit_price: 135000, date_in: '2026-08-25', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202607-09', product_name: 'Penghapus Papan Tulis Magnetik Joyko', category: 'Perlengkapan Kelas', stock_qty: 30, unit_price: 12500, date_in: '2026-07-28', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202608-20', product_name: 'Stopmap Folio Kertas Sinar Dunia (Pack 50 pcs)', category: 'ATK & Kertas', stock_qty: 14, unit_price: 65000, date_in: '2026-08-28', method: 'FIFO', status: 'Active' },
    { batch_id: 'BATCH-202607-02', product_name: 'Baterai Mic Wireless Alkaline AA (Pack 4)', category: 'Elektronik & IT', stock_qty: 0, unit_price: 32000, date_in: '2026-07-15', method: 'FIFO', status: 'Empty' }
  ],

  orders: [
    {
      order_id: 'ORD-202609-001',
      unit_id: 'unit_sd',
      order_type: 'E-Commerce',
      items_json: JSON.stringify([
        { product_name: 'Spidol Whiteboard Snowman Hitam', qty: 10, unit_price: 9000, subtotal: 90000 },
        { product_name: 'Kertas HVS A4 80gr PaperOne (Rim)', qty: 5, unit_price: 52000, subtotal: 260000 }
      ]),
      total_amount: 350000,
      status: 'Approved',
      created_at: '2026-09-16 09:30',
      approved_at: '2026-09-16 10:15',
      notes: 'Kebutuhan Ujian Siswa Semester Ganjil',
      invoice_number: 'INV/AL-IMAM/2026/09/001'
    },
    {
      order_id: 'ORD-202609-002',
      unit_id: 'unit_sd',
      order_type: 'Reimburse',
      items_json: JSON.stringify([
        { item_name: 'Servis Printer Ruang Guru SD & Ganti Head', qty: 1, unit_price: 450000, subtotal: 450000 }
      ]),
      total_amount: 450000,
      status: 'Pending_Verification',
      created_at: '2026-09-17 11:20',
      approved_at: '',
      notes: 'Servis mendesak di Mega Komputer. Pembayaran ditalangi Ust. Faik.',
      recipient_name: 'Ahmad Faik Bajsair',
      bank_account: 'BSI 7123998811',
      payment_date: '2026-09-17',
      pj_name: 'Ust. Faik Bajsair',
      attachments: {
        receipt: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
        transfer: '',
        photo: ''
      },
      invoice_number: ''
    },
    {
      order_id: 'ORD-202609-003',
      unit_id: 'unit_smp',
      order_type: 'Request_Barang_Baru',
      items_json: JSON.stringify([
        { item_name: 'Microphone Clip On Wireless Boya WM4', qty: 2, unit_price: 650000, subtotal: 1300000 }
      ]),
      total_amount: 1300000,
      status: 'Pending_Verification',
      created_at: '2026-09-17 13:45',
      approved_at: '',
      notes: 'Pengadaan mic rekaman podcast dan tahfidz studio SMP.',
      marketplace_url: 'https://www.tokopedia.com/boyaofficial/boya-by-wm4-pro-k2',
      pj_name: 'Ust. Ridwan SPd',
      invoice_number: ''
    }
  ],

  transactions_log: [
    {
      log_id: 'LOG-202609-001',
      order_id: 'ORD-202609-001',
      unit_id: 'unit_sd',
      amount_deducted: 350000,
      remaining_balance: 26600000,
      timestamp: '2026-09-16 10:15:22',
      invoice_number: 'INV/AL-IMAM/2026/09/001'
    }
  ],

  gas_api_url: 'https://script.google.com/macros/s/AKfycby5TTN97b6AXyo5YpwCE4jpJVCzq59pIqXQ968nAn8byIL7xRzWy6uyYWHBDuVS5svr/exec'
};

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
  
  // Storage keys
  STORAGE_KEY: 'ECOMMERCE_ALIMAM_DATA_V2',
  AUTH_KEY: 'ECOMMERCE_ALIMAM_AUTH_USER_V2',

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

    const primaryHex = branding.primary_color || '#047857';
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

    root.style.setProperty('--primary-50', adjustColor(primaryHex, 85));
    root.style.setProperty('--primary-100', adjustColor(primaryHex, 70));
    root.style.setProperty('--primary-200', adjustColor(primaryHex, 55));
    root.style.setProperty('--primary-500', adjustColor(primaryHex, 15));
    root.style.setProperty('--primary-600', primaryHex);
    root.style.setProperty('--primary-700', primaryHex);
    root.style.setProperty('--primary-800', adjustColor(primaryHex, -15));
    root.style.setProperty('--primary-900', adjustColor(primaryHex, -30));

    root.style.setProperty('--accent-500', accentHex);
    root.style.setProperty('--accent-600', adjustColor(accentHex, -10));
    root.style.setProperty('--accent-700', adjustColor(accentHex, -25));

    root.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${adjustColor(primaryHex, -20)} 0%, ${primaryHex} 60%, ${adjustColor(primaryHex, 15)} 100%)`);
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${accentHex} 0%, ${adjustColor(accentHex, 15)} 50%, ${adjustColor(accentHex, -15)} 100%)`);

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

    const views = ['dashboard', 'catalog', 'reimburse', 'custom-request', 'orders', 'verification', 'inventory', 'ledger', 'cms'];
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
    else if (this.currentUser.unit_id === 'unit_sma') avatarText = 'SMA';
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
          <td class="px-4 py-3 text-center">
            <button onclick="app.editUnitPlafond('${r.unit_id}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition">
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
          total_stock: 0,
          earliest_price: item.unit_price,
          latest_price: item.unit_price,
          batches: []
        };
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
            <div class="h-32 w-full rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-primary text-4xl mb-3 relative overflow-hidden">
              <i class="fa-solid ${categoryIcon}"></i>
              <div class="absolute top-2 left-2">${stockBadge}</div>
              <div class="absolute top-2 right-2">${batchTag}</div>
            </div>

            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${prod.category}</span>
            <h4 class="font-bold text-xs text-slate-800 line-clamp-2 mt-0.5 h-8 leading-snug">${prod.name}</h4>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
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
      try {
        const items = JSON.parse(ord.items_json);
        itemsSummary = items.map(i => `${i.product_name || i.item_name} <span class="text-slate-400 font-normal">x${i.qty}</span>`).join('<br/>');
      } catch (e) {
        itemsSummary = ord.notes || '-';
      }

      const invoiceCode = ord.invoice_number ? `<span class="font-mono text-brand-primary font-bold block">${ord.invoice_number}</span>` : '';

      return `
        <tr class="hover:bg-slate-50/80 transition">
          <td class="px-4 py-3 font-bold text-slate-800">
            ${invoiceCode}
            <span class="text-[10px] text-slate-400 font-normal">${ord.order_id}</span>
          </td>
          <td class="px-4 py-3">${typeBadge}</td>
          <td class="px-4 py-3 text-slate-700 leading-relaxed">${itemsSummary}</td>
          <td class="px-4 py-3 font-extrabold text-slate-900 font-heading">Rp ${this.formatNumber(ord.total_amount)}</td>
          <td class="px-4 py-3">${statusBadge}</td>
          <td class="px-4 py-3 text-[11px] text-slate-500">${ord.created_at}</td>
          <td class="px-4 py-3 text-center">
            <button onclick="app.openPrintModal('${ord.order_id}')" class="px-2.5 py-1 bg-slate-100 hover:bg-brand-light text-slate-700 hover:text-brand-primary rounded-lg text-xs font-bold transition flex items-center space-x-1 mx-auto" title="Cetak Dokumen Resmi">
              <i class="fa-solid fa-print"></i>
              <span>Cetak</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderVerificationView() {
    const pending = this.db.orders.filter(o => o.status === 'Pending_Verification');
    const container = document.getElementById('verificationCardsContainer');
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
      const hasEnoughQuota = rapbsObj.saldo_tersedia >= ord.total_amount;

      let items = [];
      try { items = JSON.parse(ord.items_json); } catch(e) {}

      let typeTag = '';
      if (ord.order_type === 'E-Commerce') {
        typeTag = '<span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg"><i class="fa-solid fa-cart-shopping mr-1"></i>E-Commerce SARPRAS</span>';
      } else if (ord.order_type === 'Reimburse') {
        typeTag = '<span class="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg"><i class="fa-solid fa-receipt mr-1"></i>Klaim Reimbursement</span>';
      } else {
        typeTag = '<span class="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-lg"><i class="fa-solid fa-link mr-1"></i>Request Barang Baru</span>';
      }

      return `
        <div class="bg-white rounded-2xl border ${hasEnoughQuota ? 'border-slate-200' : 'border-red-300 bg-red-50/20'} p-5 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div class="flex items-center space-x-2">
              ${typeTag}
              <span class="text-xs font-mono font-bold text-slate-700">${ord.order_id}</span>
              <span class="text-xs text-slate-400">• ${ord.created_at}</span>
            </div>
            
            <div class="text-left sm:text-right">
              <span class="text-xs text-slate-500 font-semibold">Pengaju:</span>
              <span class="text-xs font-black text-slate-800 ml-1">${unitObj.unit_name}</span>
            </div>
          </div>

          <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <table class="w-full text-xs text-left">
              <thead class="text-[10px] text-slate-400 uppercase font-bold">
                <tr>
                  <th class="pb-1">Rincian Item</th>
                  <th class="pb-1 text-center">Jumlah</th>
                  <th class="pb-1 text-right">Harga Satuan</th>
                  <th class="pb-1 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200/50">
                ${items.map(item => `
                  <tr>
                    <td class="py-1.5 font-semibold text-slate-800">${item.product_name || item.item_name}</td>
                    <td class="py-1.5 text-center font-bold text-slate-700">${item.qty}</td>
                    <td class="py-1.5 text-right text-slate-600">Rp ${this.formatNumber(item.unit_price)}</td>
                    <td class="py-1.5 text-right font-bold text-slate-900">Rp ${this.formatNumber(item.subtotal)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span class="text-slate-400 font-semibold block text-[11px]">Keterangan / Catatan:</span>
              <p class="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">${ord.notes || 'Tidak ada catatan tambahan.'}</p>
              
              ${ord.recipient_name ? `
                <div class="mt-2 text-[11px] text-slate-600 space-y-0.5">
                  <p><b>Penerima:</b> ${ord.recipient_name} (${ord.bank_account || '-'})</p>
                  <p><b>PJ Unit:</b> ${ord.pj_name || '-'}</p>
                </div>
              ` : ''}

              ${ord.marketplace_url ? `
                <div class="mt-2 text-[11px]">
                  <a href="${ord.marketplace_url}" target="_blank" class="text-indigo-600 font-bold hover:underline inline-flex items-center">
                    <i class="fa-solid fa-arrow-up-right-from-square mr-1"></i>Buka Link Marketplace
                  </a>
                </div>
              ` : ''}
            </div>

            <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5 text-xs">
              <div class="flex justify-between text-slate-600">
                <span>Total Pengajuan:</span>
                <span class="font-extrabold text-slate-900 font-heading">Rp ${this.formatNumber(ord.total_amount)}</span>
              </div>
              <div class="flex justify-between text-slate-600">
                <span>Saldo Poin Unit Saat Ini:</span>
                <span class="font-bold text-brand-primary">Rp ${this.formatNumber(rapbsObj.saldo_tersedia)}</span>
              </div>
              <div class="flex justify-between pt-1 border-t border-slate-200 font-bold ${hasEnoughQuota ? 'text-brand-primary' : 'text-red-600'}">
                <span>Sisa Saldo Setelah Approval:</span>
                <span>Rp ${this.formatNumber(rapbsObj.saldo_tersedia - ord.total_amount)}</span>
              </div>
            </div>
          </div>

          ${ord.attachments && ord.attachments.receipt ? `
            <div class="pt-2">
              <span class="text-[11px] font-bold text-slate-600 block mb-1">Bukti Lampiran Nota:</span>
              <a href="${ord.attachments.receipt}" target="_blank" class="inline-block px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold">
                <i class="fa-solid fa-paperclip mr-1 text-brand-primary"></i>Lihat Foto Bukti Kwitansi
              </a>
            </div>
          ` : ''}

          <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
            <button onclick="app.rejectOrder('${ord.order_id}')" class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl transition">
              <i class="fa-solid fa-xmark mr-1"></i>Tolak Pengajuan
            </button>
            <button onclick="app.approveOrder('${ord.order_id}')" class="px-5 py-2 bg-brand-primary hover:opacity-90 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-1.5">
              <i class="fa-solid fa-check-double"></i>
              <span>Setujui & Potong RAPBS (FIFO)</span>
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

      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="px-4 py-3 font-mono text-[11px] text-slate-500">${l.log_id}</td>
          <td class="px-4 py-3 font-mono font-bold text-brand-primary">${l.invoice_number || '-'}</td>
          <td class="px-4 py-3 font-semibold text-slate-800">${unitObj.unit_name}</td>
          <td class="px-4 py-3 font-extrabold text-red-600 font-heading">- Rp ${this.formatNumber(l.amount_deducted)}</td>
          <td class="px-4 py-3 font-extrabold text-brand-primary font-heading">Rp ${this.formatNumber(l.remaining_balance)}</td>
          <td class="px-4 py-3 text-slate-500 text-[11px]">${l.timestamp}</td>
        </tr>
      `;
    }).join('');
  },

  // ==========================================
  // 9. CART & CHECKOUT WORKFLOW
  // ==========================================

  addToCart(productName, price, maxStock) {
    const existing = this.cart.find(c => c.product_name === productName);
    if (existing) {
      if (existing.qty + 1 > maxStock) {
        this.showToast(`Stok maksimal barang tercapai (${maxStock})`, 'warning');
        return;
      }
      existing.qty += 1;
      existing.subtotal = existing.qty * existing.unit_price;
    } else {
      this.cart.push({
        product_name: productName,
        unit_price: price,
        qty: 1,
        subtotal: price,
        max_stock: maxStock
      });
    }

    this.showToast(`Ditambahkan ke keranjang: ${productName}`, 'success');
    this.updateCartCount();
    this.renderCartDrawer();
  },

  updateCartQty(productName, delta) {
    const item = this.cart.find(c => c.product_name === productName);
    if (!item) return;

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

  renderCartDrawer() {
    const list = document.getElementById('cartItemsList');
    const unitLabel = document.getElementById('cartUnitLabel');
    const availSaldo = document.getElementById('cartAvailableSaldo');
    const totalSub = document.getElementById('cartTotalSubtotal');
    const estRemaining = document.getElementById('cartEstimatedRemaining');
    const submitBtn = document.getElementById('btnCheckoutSubmit');

    if (unitLabel) unitLabel.textContent = this.currentUser.unit_name;

    const userRapbs = this.db.rapbs_poin.find(r => r.unit_id === this.currentUser.unit_id) || { saldo_tersedia: 0 };
    const subtotal = this.cart.reduce((acc, c) => acc + c.subtotal, 0);
    const remaining = userRapbs.saldo_tersedia - subtotal;

    if (availSaldo) availSaldo.textContent = 'Rp ' + this.formatNumber(userRapbs.saldo_tersedia);
    if (totalSub) totalSub.textContent = 'Rp ' + this.formatNumber(subtotal);
    if (estRemaining) {
      estRemaining.textContent = 'Rp ' + this.formatNumber(remaining);
      estRemaining.className = remaining < 0 ? 'text-red-600 font-extrabold' : 'text-brand-primary font-extrabold';
    }

    if (this.cart.length === 0) {
      if (list) {
        list.innerHTML = `
          <div class="h-64 flex flex-col items-center justify-center text-center text-slate-400">
            <i class="fa-solid fa-cart-arrow-down text-3xl mb-2 text-slate-300"></i>
            <p class="text-xs font-bold text-slate-600">Keranjang Pengadaan Kosong</p>
            <p class="text-[11px] text-slate-400 mt-0.5">Pilih barang dari menu Katalog untuk menambahkan pesanan.</p>
          </div>
        `;
      }
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    if (submitBtn) {
      if (remaining < 0) {
        submitBtn.disabled = true;
        submitBtn.className = 'w-full py-3 bg-red-100 text-red-700 font-bold text-xs rounded-xl cursor-not-allowed';
        submitBtn.innerHTML = '<i class="fa-solid fa-ban mr-1"></i> Saldo Poin RAPBS Tidak Cukup';
      } else {
        submitBtn.disabled = false;
        submitBtn.className = 'w-full py-3 bg-brand-primary hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2';
        submitBtn.innerHTML = '<i class="fa-solid fa-check-to-slot"></i><span>Kirim Pengajuan Pesanan</span>';
      }
    }

    if (list) {
      list.innerHTML = this.cart.map(item => `
        <div class="bg-slate-50 rounded-2xl p-3 border border-slate-200/70 flex items-center justify-between gap-2">
          <div class="min-w-0 flex-1">
            <h5 class="text-xs font-bold text-slate-800 truncate">${item.product_name}</h5>
            <p class="text-[11px] text-brand-primary font-bold">Rp ${this.formatNumber(item.unit_price)}</p>
          </div>

          <div class="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-xl p-1 shrink-0">
            <button onclick="app.updateCartQty('${this.escapeQuotes(item.product_name)}', -1)" class="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">-</button>
            <span class="w-6 text-center text-xs font-extrabold text-slate-800">${item.qty}</span>
            <button onclick="app.updateCartQty('${this.escapeQuotes(item.product_name)}', 1)" class="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center text-xs font-bold">+</button>
          </div>

          <button onclick="app.removeFromCart('${this.escapeQuotes(item.product_name)}')" class="p-1.5 text-slate-400 hover:text-red-500 rounded-lg text-xs">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `).join('');
    }
  },

  submitCartOrder() {
    if (this.cart.length === 0) return;

    const userRapbs = this.db.rapbs_poin.find(r => r.unit_id === this.currentUser.unit_id) || { saldo_tersedia: 0 };
    const totalAmount = this.cart.reduce((acc, c) => acc + c.subtotal, 0);

    if (totalAmount > userRapbs.saldo_tersedia) {
      this.showToast('Saldo Poin RAPBS Unit tidak mencukupi!', 'error');
      return;
    }

    const notesInput = document.getElementById('cartCheckoutNotes');
    const notes = notesInput ? notesInput.value.trim() : '';

    const newOrderId = 'ORD-' + this.generateTimestampId();
    const orderObj = {
      order_id: newOrderId,
      unit_id: this.currentUser.unit_id,
      order_type: 'E-Commerce',
      items_json: JSON.stringify(this.cart.map(c => ({
        product_name: c.product_name,
        qty: c.qty,
        unit_price: c.unit_price,
        subtotal: c.subtotal
      }))),
      total_amount: totalAmount,
      status: 'Pending_Verification',
      created_at: this.formatCurrentDateTime(),
      approved_at: '',
      notes: notes || 'Pengajuan E-Commerce Standar SARPRAS',
      invoice_number: ''
    };

    this.db.orders.push(orderObj);
    this.saveState();
    this.cart = [];
    if (notesInput) notesInput.value = '';

    this.toggleCartDrawer();
    this.updateUI();
    this.showToast(`Pengajuan ${newOrderId} berhasil dikirim!`, 'success');
    this.navigate('orders');

    if (this.db.gas_api_url) {
      this.syncGasOrder(orderObj);
    }
  },

  // ==========================================
  // 10. REIMBURSEMENT & CUSTOM REQUESTS
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
        { item_name: `[${category}] ${title}`, qty: 1, unit_price: amount, subtotal: amount }
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
        { item_name: `[${category}] ${itemName}`, qty: qty, unit_price: price, subtotal: totalAmount }
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
  // 11. APPROVAL HOOKS (BENDAHARA)
  // ==========================================

  approveOrder(orderId) {
    const order = this.db.orders.find(o => o.order_id === orderId);
    if (!order) return;

    const unitRapbs = this.db.rapbs_poin.find(r => r.unit_id === order.unit_id);
    if (!unitRapbs || unitRapbs.saldo_tersedia < order.total_amount) {
      this.showToast('Saldo RAPBS Unit tidak mencukupi untuk disetujui!', 'error');
      return;
    }

    if (order.order_type === 'E-Commerce') {
      try {
        const items = JSON.parse(order.items_json);
        items.forEach(item => {
          this.deductStockFIFO(item.product_name, item.qty);
        });
      } catch (e) {
        console.error('Failed to parse items for FIFO deduction', e);
      }
    }

    unitRapbs.terpakai += order.total_amount;
    unitRapbs.saldo_tersedia -= order.total_amount;
    unitRapbs.updated_at = this.formatCurrentDateTime();

    const invCount = this.db.transactions_log.length + 1;
    const schoolSlug = (this.db.cms_settings.app_name || 'AL-IMAM').toUpperCase().replace(/\s+/g, '-');
    const invNum = `INV/${schoolSlug}/2026/09/${String(invCount).padStart(3, '0')}`;

    order.status = 'Approved';
    order.approved_at = this.formatCurrentDateTime();
    order.invoice_number = invNum;

    const logId = 'LOG-' + this.generateTimestampId();
    this.db.transactions_log.push({
      log_id: logId,
      order_id: order.order_id,
      unit_id: order.unit_id,
      amount_deducted: order.total_amount,
      remaining_balance: unitRapbs.saldo_tersedia,
      timestamp: this.formatCurrentDateTime(),
      invoice_number: invNum
    });

    this.saveState();
    this.updateUI();
    this.showToast(`Pengajuan ${order.order_id} BERHASIL DISETUJUI. Invoice: ${invNum}`, 'success');
    this.renderVerificationView();

    if (this.db.gas_api_url) {
      this.syncGasApproval(order.order_id, 'Approved', invNum);
    }
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
      this.syncGasApproval(order.order_id, 'Rejected', '');
    }
  },

  // ==========================================
  // 12. RESTOCK INVENTORY BATCH
  // ==========================================

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
    
    if (this.activeView === 'inventory') this.renderInventoryTable();
    if (this.activeView === 'catalog') this.renderCatalog();
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
              <tr class="font-bold bg-slate-50">
                <td colspan="4" class="text-right uppercase">TOTAL NOMINAL BEBAN RAPBS:</td>
                <td class="text-right text-sm font-black">Rp ${this.formatNumber(ord.total_amount)}</td>
              </tr>
            </tbody>
          </table>

          <div class="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs mb-6">
            <p><b>Catatan / Keperluan:</b> ${ord.notes || '-'}</p>
          </div>

          <div class="print-signature-box grid grid-cols-3 gap-4 text-center text-xs mt-8">
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
                ${items.map((it, idx) => `
                  <tr>
                    <td class="text-center">${idx + 1}</td>
                    <td>${it.product_name || it.item_name}</td>
                    <td class="text-center">${it.qty}</td>
                    <td class="text-right">Rp ${this.formatNumber(it.unit_price)}</td>
                    <td class="text-right font-bold">Rp ${this.formatNumber(it.subtotal)}</td>
                  </tr>
                `).join('')}
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

  async syncGasApproval(orderId, status, invoiceNumber) {
    if (!this.db.gas_api_url) return;
    try {
      await fetch(this.db.gas_api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'approveOrder', order_id: orderId, status: status, invoice_number: invoiceNumber })
      });
    } catch (e) {
      console.warn('Sync approval error:', e);
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

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
