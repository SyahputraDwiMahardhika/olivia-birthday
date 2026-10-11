# Website Ulang Tahun Olivia Oktiana

Website ulang tahun interaktif bergaya **Neo-Brutalism × Romantic Scrapbook**.
Dibuat dengan HTML5, CSS3, dan Vanilla JavaScript — tanpa backend, tanpa framework, tanpa internet (semua font memakai font sistem).

## Fitur

- **Opening screen**: satu tombol "Buka" untuk masuk ke website; musik menyala saat tombol ditekan.
- **Hero**: judul besar, tombol hujan konfeti, dan teks berjalan.
- **Galeri polaroid**: klik foto untuk memperbesar (lightbox, bisa ditutup dengan Esc).
- **Kartu apresiasi**: kartu yang bisa dibalik.
- **Surat interaktif**: amplop yang dibuka, isi surat muncul bertahap.
- **Mini birthday surprise**: kue dengan lilin simbolis, padamkan satu per satu atau sekaligus.
- **Konfeti** berbasis canvas.
- **Musik otomatis**: menyala saat tombol Buka ditekan dan bisa dimatikan/dinyalakan dengan satu klik pada tombol musik (kanan bawah). Memutar lagu "Selamat ulang tahun" secara berulang (loop); cadangan: melodi sintesis Web Audio.
- **Responsif** (ponsel sampai desktop) dan **aksesibel**: skip link, navigasi keyboard, label ARIA, fokus terlihat, dan menghormati pengaturan `prefers-reduced-motion`.

## Cara menjalankan

1. Ekstrak ZIP.
2. Buka `index.html` di browser (klik dua kali). Tidak perlu server.

Opsional, jika ingin lewat server lokal:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Struktur proyek

```
olivia-birthday-website/
├── index.html          # struktur halaman
├── css/style.css       # tampilan
├── js/
│   ├── config.js       # <-- SEMUA KONTEN yang mudah diedit
│   └── main.js         # logika interaksi
├── assets/photos/      # taruh fotomu di sini
├── assets/music/       # file musik (selamat-ulang-tahun.mp3)
└── README.md
```

## Cara mengedit konten

Buka **`js/config.js`**. Semua teks, foto, kartu, surat, dan pengaturan kejutan ada di sana.

### Mengganti foto

1. Salin fotomu ke `assets/photos/`, misalnya `foto1.jpg`.
2. Di `config.js`, isi:
   ```js
   { src: "assets/photos/foto1.jpg", alt: "Deskripsi foto", caption: "Keterangan" }
   ```
3. Tambah atau kurangi objek di array `photos` sesuai kebutuhan.

Jika `src` kosong, tampil kotak placeholder "Tempat foto". Isi `alt` agar pengguna pembaca layar tahu isi foto.

### Mengganti isi surat dan kartu

Ubah `letter.paragraphs`, `letter.signature`, dan array `cards`.

### Tanggal lahir

`birthdayDate` sengaja **kosong**. Isi hanya jika kamu tahu dan ingin menampilkannya (misalnya `"12 Oktober"`).

### Musik

- Bawaan: lagu **"Selamat ulang tahun"** yang diambil dari `HappyBirthday.html` milikmu, disimpan di `assets/music/selamat-ulang-tahun.mp3`.
- Musik diputar **berulang (loop)** setelah tombol Buka ditekan.
- Ganti lagu: taruh file baru di `assets/music/` lalu ubah `music: { src: "assets/music/nama-file.mp3" }` di `js/config.js`. Pastikan kamu punya hak memakai lagu tersebut.
- Kosongkan `src` (`""`) untuk memakai melodi sintesis bawaan. Jika file gagal dimuat, website otomatis beralih ke melodi ini.

Musik dimulai oleh klik tombol Buka sehingga lolos aturan autoplay browser. Klik tombol musik (kanan bawah) kapan saja untuk mematikan atau menyalakan lagi.

### Warna dan gaya

Warna ada di bagian `:root` pada `css/style.css` (`--pink`, `--yellow`, `--mint`, dan seterusnya).

## Catatan konten

Semua teks bawaan adalah placeholder netral berupa ucapan umum. Proyek ini tidak memuat tanggal lahir, umur, kenangan pribadi, atau klaim tentang hubungan apa pun. Tambahkan sendiri bagian yang personal.

## Publikasi (opsional)

Karena situs statis, kamu bisa mengunggah foldernya ke GitHub Pages, Netlify, atau Cloudflare Pages.
