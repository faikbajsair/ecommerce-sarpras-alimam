# E-Commerce & Pengadaan SARPRAS (White-Label & CMS Edition)

Sistem Web Application E-Commerce Pengadaan Internal & Manajemen Plafon RAPBS SARPRAS Sekolah siap **White-Label & Jual Putus** (Commercial Ready).

---

## 🎨 Fitur Unggulan: CMS & Branding Studio (White-Label)

Aplikasi ini dilengkapi dengan modul **CMS Studio Terintegrasi** yang memungkinkan Anda atau client untuk mengganti identitas dan tema website secara instan tanpa perlu menyentuh kode program:

1. **Identitas Sekolah & Yayasan**:
   - Ganti Nama Yayasan, Nama Sekolah, Nama Brand Sistem, Slogan/Tagline.
   - Ganti Alamat Lengkap, Kota, Nomor Telepon, dan Email Resmi.
   - Atur Pejabat Penandatangan Resmi (Kaur SARPRAS, Bendahara Yayasan, Ketua Yayasan/Pimpinan).
2. **Logo & Favicon Visual**:
   - Pilihan menggunakan **Gambar Logo Sekolah Asli (Upload Base64 PNG/JPG)** atau **Simbol Icon Vektor** (Masjid, Sekolah, Topi Toga, Buku, Gedung, dll).
   - Singkatan Inisial Logo (untuk avatar navbar & watermark dashboard).
3. **Studio Tema & Warna (Appearance Studio)**:
   - **5 Preset Warna Siap Pakai**:
     - 🌲 *Emerald Islamic* (Hijau Zamrud & Emas - Standar Al-Imam / Pesantren)
     - 🌊 *Royal Sapphire* (Biru Sapphire & Amber - Sekolah Modern)
     - 🍷 *Maroon & Gold* (Merah Marun & Emas - Boarding School)
     - 🧪 *Teal Cyber* (Toska Modern & Cyan - STEM / IT High School)
     - 🖤 *Dark Luxury* (Charcoal & Gold - Executive Academy)
   - **Custom HEX Color Pickers**: Bebas memilih kode warna primer dan aksen.
   - **Pilihan Font**: *Plus Jakarta Sans*, *Outfit*, *Inter*, *Poppins*, *Roboto*.
   - **Kelengkungan Sudut (Border Radius)**: *Modern (24px)*, *Soft (14px)*, *Classic (6px)*.
4. **Manajemen Unit Sekolah & RAPBS**:
   - Tambah/Edit unit (TK, SD, SMP, SMA, Asrama, Dapur Umum, dll).
   - Atur dan ubah kuota plafon anggaran per unit.
5. **Export & Import Konfigurasi JSON (Jual Putus / Multi-Client Deploy)**:
   - **Export Configuration**: Download seluruh setelan branding dalam satu file `.json`.
   - **Import Configuration**: Terapkan preset client baru dalam hitungan 1 detik!
   - Reset ke Default jika diperlukan.

---

## 🏛️ Arsitektur Sistem (Flat MVC Model)

```
E-Commerce SARPRAS/
├── index.html       # View & UI Containers (Single Page Application, Tailwind CSS CDN)
├── app.js           # Controller & Model State, FIFO Engine, White-Label CMS Studio, Print Engine
├── styles.css       # Dynamic CSS Variables Theme Engine & Print Engine A4 (@media print)
├── Code.gs          # Google Apps Script Web App REST API Backend (doGet & doPost)
└── README.md        # Panduan White-Label, Skema Database & Deployment
```

---

## 📊 Skema Database Google Spreadsheet

Aplikasi terhubung dengan 6 sheet ternormalisasi pada Google Spreadsheet:

1. **`Users`**: `[Unit_ID, Username, Password_Hash, Unit_Name, Role]`
2. **`RAPBS_Poin`**: `[Unit_ID, Total_Plafond, Terpakai, Saldo_Tersedia, Updated_At]`
3. **`Stock_Inventory`**: `[Batch_ID, Product_Name, Category, Stock_Qty, Unit_Price, Date_In, Method, Status]` (FIFO)
4. **`Orders`**: `[Order_ID, Unit_ID, Order_Type, Items_JSON, Total_Amount, Status, Created_At, Approved_At, Notes, Attachments_JSON, Invoice_Number]`
5. **`Transactions_Log`**: `[Log_ID, Order_ID, Unit_ID, Amount_Deducted, Remaining_Balance, Timestamp, Invoice_Number]`
6. **`Settings`**: `[Key, Value, Updated_At]` (Menyimpan konfigurasi CMS & Branding)

---

## ⚙️ Panduan Setup Google Apps Script (Backend REST API)

1. Buat Spreadsheet baru di [Google Sheets](https://sheets.new).
2. Buka menu **Extensions (Ekstensi)** > **Apps Script**.
3. Tempelkan seluruh kode dari [`Code.gs`](file:///Users/faikbajsair/Downloads/E-Commerce%20Al-Imam/Code.gs).
4. Simpan (`Ctrl+S` / `Cmd+S`), lalu jalankan fungsi `initDatabase` untuk membuat 6 sheet secara otomatis.
5. Klik **Deploy** > **New deployment** > Pilih **Web app**:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Wajib)*
6. Salin Web App URL dan tempelkan di menu ⚙️ **Pengaturan** di aplikasi web.

---

## 🚀 Panduan Deployment ke Vercel (Hosting Gratis & Cepat)

1. Upload seluruh folder ke GitHub repository Anda.
2. Buka [Vercel](https://vercel.com) > **Add New Project** > Import Repo.
3. Klik **Deploy**. Website siap digunakan dan diakses publik!
