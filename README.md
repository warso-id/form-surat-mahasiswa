# FIKOM Digital Service — Production Baseline

## Frontend
Deploy `index.html`, `css/`, `js/`, `components/` ke GitHub Pages.

## GAS
Masukkan seluruh file `.gs` dari folder `gas/` ke satu project Apps Script.

## Konfigurasi wajib sebelum production
Project Settings → Script Properties:
- `INITIAL_ADMIN_PASSWORD`: password sementara admin pertama. Minimal 10 karakter, huruf besar/kecil/angka.
- `FIKOM_SETUP_KEY`: boleh dibuat oleh `initializeProduction()`; jangan dibagikan publik.
- `FIKOM_JWT_SECRET`: dibuat otomatis bila belum ada.

Jalankan fungsi `initializeProduction()` sekali dari editor GAS. Setelah setup, hapus `INITIAL_ADMIN_PASSWORD` dari Script Properties atau ganti sesuai kebijakan internal.

## Password
Password TIDAK disimpan plaintext di spreadsheet. Sheet USERS menyimpan:
`password_hash` + `password_salt`.
Hash menggunakan HMAC-SHA-256 berulang dengan salt.

## Role & modul
Role: SUPERADMIN, ADMIN, KAPRODI, WADEK, DEKAN, MAHASISWA.
Kolom `modules` pada USERS mengontrol modul. Backend selalu memeriksa role dan modul; frontend hanya menyembunyikan menu.

Contoh:
`DASHBOARD,CHAT,PENGAJUAN,WORKFLOW,APPROVAL,DOCUMENT,MASTER`

## Upload
Server melakukan validasi ulang:
- PDF/JPG/JPEG/PNG
- MIME allowlist
- extension allowlist
- maksimum 10 MB/file
- maksimum 25 MB/transaksi
- nama file dibatasi
- Base64 di-decode server-side dan ukuran byte diverifikasi sebelum Drive createFile.

## Tahun akademik
Periode:
01 September → 31 Agustus.
Folder otomatis:
`ARSIP SURAT DIGITAL FIKOM/TA 2026/2027 (01 September - 31 Agustus)/PGJ-...`

## Deployment
Web App: Execute as owner, akses sesuai kebutuhan organisasi. Jangan membuat endpoint setup publik setelah provisioning. Jika deployment URL berubah, update `WEB_APP_URL` di `js/api.js`.

## Catatan production
Baseline ini memperkuat autentikasi aplikasi password-based. Untuk lingkungan dengan Google Workspace, pertimbangkan migrasi login ke Google Identity/OAuth/SSO agar password tidak perlu dikelola aplikasi.
