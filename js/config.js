/* ==========================================================
   KONFIGURASI KONTEN — edit file ini untuk mengubah isi website.
   Tidak perlu menyentuh HTML/CSS/JS lain.

   Catatan: semua teks di bawah adalah placeholder netral.
   Ganti dengan kata-katamu sendiri. Tanggal lahir, umur, dan
   kenangan pribadi sengaja DIKOSONGKAN — isi hanya jika kamu mau.
   ========================================================== */
window.SITE_CONFIG = {
  name: "Olivia Oktiana",
  nickname: "Olivia",

  // Teks di bawah judul hero.
  heroTagline: "Semoga harimu dipenuhi tawa, kejutan manis, dan hal-hal baik.",

  // Opsional. Contoh: "12 Oktober". Kosongkan ("") agar tidak ditampilkan.
  birthdayDate: "",

  // Teks berjalan (marquee). Boleh diubah / ditambah.
  marquee: [
    "Selamat Ulang Tahun",
    "Happy Birthday",
    "Make a wish",
    "Hari spesial untuk Olivia",
  ],

  // Musik (diputar berulang / loop setelah tombol Buka ditekan).
  // - src: file audio lokal. Bawaan: lagu "Selamat ulang tahun" dari HappyBirthday.html milikmu.
  // - Ganti dengan file lain, mis. "assets/music/lagu-lain.mp3", atau kosongkan ("")
  //   untuk memakai melodi sintesis bawaan (tanpa file).
  // - Jika file gagal dimuat, otomatis beralih ke melodi sintesis.
  music: { src: "assets/music/selamat-ulang-tahun.mp3" },

  // Galeri polaroid. Taruh foto di assets/photos/ lalu isi "src".
  // Jika src kosong, tampil kotak placeholder "Tempat foto".
  photos: [
    { src: "assets/photos/photo1.jpg", alt: "Foto 1", caption: "" },
    { src: "assets/photos/photo2.jpg", alt: "Foto 2", caption: "" },
    { src: "assets/photos/photo3.jpg", alt: "Foto 3", caption: "" },
    { src: "assets/photos/photo4.jpg", alt: "Foto 4", caption: "" },
    { src: "assets/photos/photo5.jpg", alt: "Foto 5", caption: "" },
  ],

  // Kartu apresiasi (depan = judul, belakang = pesan).
  cards: [
    {
      front: "Untuk Olivia",
      back: "Terima kasih telah menjadi dirimu sendiri, di dunia yang sering meminta kita menjadi orang lain.",
    },
    {
      front: "Harapan #1",
      back: "Semoga setiap langkahmu dimudahkan, bahkan ketika jalan di depan belum sepenuhnya terlihat.",
    },
    {
      front: "Harapan #2",
      back: "Semoga bahagia sering datang tanpa diundang, bahkan dari hal-hal sederhana yang kerap luput dari perhatian.",
    },
    {
      front: "Harapan #3",
      back: "Semoga impian-impian yang kau simpan diam-diam, perlahan menemukan jalannya untuk menjadi nyata.",
    },
    {
      front: "Pesan kecil",
      back: "Hari ini, rayakan dirimu. Hargai sejauh apa kamu telah melangkah, sebab kamu juga layak bahagia tanpa harus menjadi sempurna.",
    },
    {
      front: "Sebuah doa",
      back: "Selamat bertambah usia, Olivia. Semoga hatimu semakin lapang menerima kehidupan, langkahmu semakin tenang, dan hal-hal baik selalu menemukan jalan menuju dirimu.",
    },
  ],

  // Surat interaktif.

  letter: {
    greeting: "Untuk Olivia,",
    paragraphs: [
      "Selamat bertambah usia. Hari ini mungkin hanya satu tanggal di antara banyak hari yang akan kamu lalui, tetapi semoga ada kebahagiaan sederhana yang membuatmu merasa bahwa hidup tetap menyimpan banyak hal baik.",

      "Aku tidak tahu seluruh cerita yang telah membawamu sampai di titik ini. Tentang hari-hari yang membuatmu tersenyum, atau hal-hal yang mungkin kamu simpan sendiri tanpa banyak bercerita. Namun, semoga apa pun yang telah kamu lalui, semuanya mengajarimu untuk tumbuh tanpa harus kehilangan dirimu sendiri.",

      "Di usia yang baru ini, semoga langkahmu dimudahkan, impianmu perlahan menemukan jalannya, dan hatimu diberi kelapangan untuk menerima hal-hal yang belum berjalan sesuai harapan. Semoga kamu tidak terlalu sibuk mengejar apa yang belum ada sampai lupa mensyukuri hal-hal baik yang sudah kamu punya.",

      "Jangan merasa harus selalu kuat, jangan pula merasa tertinggal hanya karena perjalananmu berbeda dari orang lain. Setiap hal punya waktunya sendiri, dan kamu berhak bertumbuh dengan caramu sendiri. Semoga hidup mempertemukanmu dengan orang-orang yang tulus, kesempatan yang baik, dan alasan-alasan sederhana untuk kembali tersenyum.",

      "Selamat ulang tahun, Olivia. Semoga bertambahnya usia bukan hanya membuatmu semakin dewasa, tetapi juga semakin mengenal dirimu, semakin tenang menghadapi kehidupan, dan semakin mampu menemukan bahagia dalam hal-hal sederhana.",

      "Jika ada satu doa yang ingin kutitipkan untukmu, semoga hal-hal baik selalu menemukan jalan menuju hidupmu. Dan ketika hari-hari tidak berjalan seperti yang kamu inginkan, semoga kamu tetap punya kekuatan untuk melangkah dan hati yang cukup lapang untuk menerima.",
    ],
    closing: "Salam hangat dan doa-doa baik,",
    signature: "Mahardikarasa30.",
  },

  // Kejutan mini: kue + lilin simbolis (jumlah lilin tidak menunjukkan umur).
  surprise: {
    candleCount: 5,
    wishPrompt: "Pejamkan mata, buat satu permintaan, lalu tiup lilinnya.",
    finalMessage: "Selamat ulang tahun, Olivia! Semoga permintaanmu terkabul.",
  },
};
