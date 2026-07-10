# Evaluasi Run: PNG to WebP Converter

Dokumen ini berisi evaluasi dari sesi AI-coding (Antigravity) dalam membangun aplikasi *client-side* pengonversi PNG ke WebP.

## 1. Pencapaian & Hal yang Berjalan Baik
- **Pengembangan Aplikasi Cepat**: Aplikasi berhasil dibangun dari nol hanya dengan Vanilla HTML, CSS, dan JavaScript tanpa menggunakan *framework* atau *build tools*.
- **Pemenuhan Syarat Fungsional**: Aplikasi memenuhi semua syarat utama:
  - Proses konversi 100% berjalan di *client-side* menggunakan *Canvas API* (privasi terjaga).
  - Validasi *file* (hanya PNG) berjalan dengan baik.
  - Terdapat fungsi perbandingan ukuran *file* dan tombol *download* yang bekerja.
- **Implementasi UI/UX**: Desain antarmuka ala terminal (*terminal-inspired aesthetic*) berhasil diimplementasikan menggunakan latar belakang hitam, teks hijau cerah (`#00ff00`), serta animasi *hover* (efek *glow* & pembesaran skala) untuk interaksi. Penggunaan font *JetBrains Mono* memperkuat identitas desain yang diminta.
- **Adaptasi Kebutuhan Baru**: Penambahan fitur baru secara instan, seperti tombol **START OVER** berwarna merah yang muncul secara dinamis setelah proses *download* berhasil dilakukan.

## 2. Kendala & Hal yang Perlu Diperhatikan
- **Pengujian Browser Otomatis Gagal**: Sub-agen peramban (*browser subagent*) yang bertugas mengambil tangkapan layar otomatis gagal dieksekusi karena *tool* tersebut (`local chrome mode`) saat ini tidak mendukung lingkungan Windows, yang mengharuskan verifikasi UI dilakukan secara manual.
- **Masalah Encoding CSS**: Penggunaan perintah terminal (`echo >>`) lewat PowerShell untuk menambahkan CSS pada tahap awal sempat menyebabkan isu *encoding* (tercampurnya UTF-16 LE dan UTF-8). Hal ini membuat beberapa baris *style* gagal terbaca oleh *browser*. Masalah ini langsung diatasi dengan menulis ulang *file* CSS secara utuh menggunakan *tool file-writing* yang lebih andal.
- **Konflik Direktori Kerja**: Secara *default*, sistem AI bekerja pada *isolated worktree* untuk mencegah kerusakan *file* pengguna. Karena pengguna mengira *file* belum dibuat, agen harus memindahkan secara eksplisit *file-file* tersebut ke direktori asli pengguna.
- **Masalah Kredensial Git Push**: Eksekusi `git push` gagal berulang kali (`ERROR: Permission to ... denied`). Penyebab utamanya adalah pengguna menggunakan akun Google yang berbeda untuk integrasi Git (GitHub) dan sesi Antigravity ini, sehingga kunci otentikasi SSH/HTTPS tidak cocok. *Commit* tetap berhasil disimpan secara lokal dan pengguna memutuskan untuk melakukan *push* secara mandiri.

## 3. Kesimpulan
Secara keseluruhan, tujuan pembuatan aplikasi tercapai dengan sempurna sesuai desain dan fungsi yang diminta. Segala kendala yang muncul lebih berkaitan dengan keterbatasan *environment* dan pengaturan otentikasi di sisi sistem dan infrastruktur, bukan pada kapabilitas pembuatan kodenya itu sendiri.
