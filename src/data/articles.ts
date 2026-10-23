/**
 * Kumpulan artikel panduan SEO organik untuk menarik trafik gratis dari Google
 * khusus pemilik usaha service AC, teknisi panggilan, dan bengkel pendingin.
 */
export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface SeoArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  summary: string;
  sections: ArticleSection[];
  ctaHeading: string;
  ctaBody: string;
  waMessage: string;
}

export const SITE_ORIGIN = "https://nanangdigital-navy.vercel.app";

export const SEO_ARTICLES: SeoArticle[] = [
  {
    slug: "cara-promosi-jasa-service-ac",
    title: "7 Cara Promosi Jasa Service AC Agar Ramai Pelanggan Tetap Tanpa Banting Harga",
    metaTitle: "7 Cara Promosi Jasa Service AC Agar Ramai Pelanggan Tetap | NanangDigital",
    metaDescription:
      "Panduan praktis cara promosi usaha service dan cuci AC rumahan agar dapat pelanggan baru tiap minggu dari Google Maps, website, dan langganan 3 bulanan.",
    category: "Strategi Pelanggan",
    readMinutes: 5,
    publishedAt: "2026-10-23",
    summary:
      "Banyak teknisi AC punya kerjaan rapi dan jujur soal freon, tapi order masih sepi karena cuma mengandalkan kenalan lama. Ini langkah praktis yang terbukti paling cepat mendatangkan panggilan baru.",
    sections: [
      {
        heading: "1. Berhenti Ikut Perang Harga Murah di Marketplace",
        paragraphs: [
          "Kalau Anda memasang tarif cuci AC Rp35 ribu hanya supaya dilirik di grup terbuka, Anda akan habis tenaga di bensin dan waktu jalan. Pelanggan yang cuma cari harga paling murah juga jarang mau jadi pelanggan tetap.",
          "Sebaliknya, pemilik rumah di perumahan cluster, ruko, kantor kecil, dan kos eksklusif sebenarnya tidak keberatan bayar tarif wajar Rp75 ribu sampai Rp100 ribu per unit. Syaratnya cuma satu: usaha Anda terlihat jelas identitasnya, sopan saat dihubungi, dan ada garansi kerja.",
        ],
      },
      {
        heading: "2. Wajib Punya Titik Google Maps & Halaman Website Resmi",
        paragraphs: [
          "Coba posisikan diri sebagai penghuni rumah yang AC kamarnya tiba-tiba tidak dingin jam 9 malam. Hal pertama yang mereka ketik di HP hampir pasti kalimat seperti: service AC terdekat atau tukang cuci AC di kecamatan mereka.",
          "Ketika profil Google Maps Anda terhubung ke website resmi yang menampilkan daftar layanan, estimasi biaya, foto kerja asli, dan tombol WhatsApp sekali klik, tingkat kepercayaan calon pelanggan langsung naik berkali lipat dibanding nomor telepon tanpa keterangan.",
        ],
        bullets: [
          "Cantumkan area jangkauan kecamatan secara jelas di halaman website.",
          "Pasang foto asli saat pengerjaan cuci AC pakai plastik pelindung agar terlihat rapi.",
          "Tuliskan jam operasional dan keterangan garansi bocor atau kurang dingin.",
        ],
      },
      {
        heading: "3. Kunci Langganan Cuci Rutin Setiap 3 Bulan Sekali",
        paragraphs: [
          "Keuntungan terbesar usaha AC bukan dari panggilan pertama, melainkan dari jadwal cuci berkala. Begitu selesai mencuci AC rumah pelanggan dan mereka puas karena lantai tetap bersih, catat tanggal pengerjaan di buku atau HP kerja Anda.",
          "Tepat 90 hari kemudian, kirim pesan pengingat sopan di WhatsApp. Dari 10 pelanggan lama yang dihubungi, rata-rata 5 sampai 6 rumah akan langsung minta dijadwalkan ulang tanpa Anda perlu keluar biaya iklan sepeser pun.",
        ],
      },
      {
        heading: "4. Fokus Iklan Radius 5 sampai 10 Kilometer Saja",
        paragraphs: [
          "Kalau Anda ingin mempercepat order di bulan sepi, pasang iklan Facebook dan Instagram khusus radius 5 sampai 10 kilometer dari titik bengkel Anda. Jangan menargetkan satu provinsi penuh karena biaya jalan teknisi akan bengkak.",
          "Arahkan klik iklan langsung ke landing page usaha AC Anda supaya orang yang masuk ke chat WhatsApp sudah tahu tarif dasar serta layanan yang tersedia.",
        ],
      },
    ],
    ctaHeading: "Mau Punya Website Resmi Usaha AC yang Siap Dipakai Cari Pelanggan?",
    ctaBody:
      "Saya bantu buatkan website rapi lengkap dengan tombol form WhatsApp, SSL HTTPS, Live Chat AI, dan akun Google Maps dalam 3 sampai 5 hari kerja.",
    waMessage:
      "Halo Mas Nanang, saya habis baca artikel cara promosi jasa service AC dan mau tanya soal pembuatan website untuk usaha AC saya.",
  },
  {
    slug: "cara-daftar-usaha-service-ac-di-google-maps",
    title: "Cara Daftar Usaha Service AC di Google Maps Biar Muncul Paling Atas",
    metaTitle: "Cara Daftar Usaha Service AC di Google Maps (Google Business) | NanangDigital",
    metaDescription:
      "Langkah demi langkah mendaftarkan bengkel atau jasa service AC panggilan ke Google Maps / Google Business Profile agar mudah ditemukan pelanggan terdekat.",
    category: "SEO Lokal & Maps",
    readMinutes: 4,
    publishedAt: "2026-10-23",
    summary:
      "Google Maps adalah sumber order gratis paling gurih untuk jasa panggilan seperti cuci AC, bongkar pasang AC, dan isi freon. Ikuti pengaturan nama, kategori, dan website berikut agar cepat naik.",
    sections: [
      {
        heading: "1. Pilih Nama Profil yang Mengandung Kata Kunci Layanan & Kota",
        paragraphs: [
          "Saat membuat akun Google Business Profile, hindari menuliskan singkatan yang hanya dimengerti sendiri seperti BJ Teknik saja. Tambahkan jenis layanan utama secara wajar agar Google langsung paham bidang usaha Anda.",
          "Contoh penamaan yang rapi dan aman misalnya: Berkah Jaya AC, Service & Cuci AC Bekasi Selatan. Nama seperti ini terlihat meyakinkan di mata warga sekitar sekaligus jelas terbaca oleh mesin pencari Google.",
        ],
      },
      {
        heading: "2. Isi Kategori Utama, Area Layanan, dan Tautan Website",
        paragraphs: [
          "Pilih kategori yang paling relevan dengan perbaikan dan perawatan AC, lalu masukkan daftar kecamatan sekitar tempat Anda biasa menerima panggilan.",
          "Kolom Website di profil Google Maps sangat penting untuk mendongkrak peringkat lokal. Profil Maps yang punya website resmi aktif dengan nomor telepon yang sama persis dinilai jauh lebih valid oleh Google dibanding profil yang kolom websitenya kosong.",
        ],
        bullets: [
          "Samakan nomor WhatsApp di Google Maps dengan nomor yang tertulis di website.",
          "Unggah minimal 5 foto kerja asli: mencuci indoor, cek tekanan manifold, dan foto kendaraan kerja.",
          "Lengkapi daftar layanan mulai dari cuci AC split, tambah freon, perbaikan bocor air, hingga bongkar pasang.",
        ],
      },
      {
        heading: "3. Cara Mudah Mengumpulkan Ulasan Bintang 5 Pertama",
        paragraphs: [
          "Begitu Anda selesai membereskan AC pelanggan yang tadinya panas jadi dingin kembali, minta tolong dengan santun di tempat atau kirim link ulasan lewat WhatsApp sore harinya.",
          "Kumpulkan 10 sampai 15 ulasan asli yang menyebut jenis pekerjaan, contohnya: Teknisi datang tepat waktu, cuci AC bersih tidak becek. Kalimat ulasan dari pelanggan asli ini membuat titik Maps Anda jauh lebih cepat naik di halaman pertama.",
        ],
      },
    ],
    ctaHeading: "Paket Website Kami Sudah Sekalian Dibuatkan Akun Google Maps!",
    ctaBody:
      "Tidak mau pusing urus teknis pendaftaran sendiri? Di semua paket pembuatan website NanangDigital, Anda sudah otomatis dibuatkan akun Google My Business (Google Maps) sekalian.",
    waMessage:
      "Halo Mas Nanang, saya baca panduan Google Maps usaha AC. Mau tanya paket website yang sudah sekalian dibuatkan akun Google Maps.",
  },
  {
    slug: "contoh-kata-kata-promosi-service-ac",
    title: "12 Contoh Kata-Kata Promosi Service & Cuci AC untuk WhatsApp, Grup Komplek, dan Sosmed",
    metaTitle: "12 Contoh Kata-Kata Promosi Service & Cuci AC Siap Pakai | NanangDigital",
    metaDescription:
      "Kumpulan contoh kata-kata promosi jasa cuci AC dan service AC panggilan yang sopan, meyakinkan, dan langsung mengundang chat pelanggan di WA maupun Facebook.",
    category: "Copywriting AC",
    readMinutes: 5,
    publishedAt: "2026-10-23",
    summary:
      "Bingung mau nulis status WhatsApp atau posting di grup warga komplek supaya tidak terkesan nyepam? Salin dan sesuaikan contoh kalimat promosi yang fokus pada masalah nyata pemilik rumah berikut.",
    sections: [
      {
        heading: "Contoh Promosi untuk Grup WhatsApp Warga / Perumahan",
        paragraphs: [
          "Di grup warga atau paguyuban komplek, hindari huruf kapital semua dan terlalu banyak emoji. Gunakan bahasa tetangga yang sopan, jelas tarifnya, dan ada jaminan rapi.",
        ],
        bullets: [
          "Izin info Bapak/Ibu warga Cluster Melati. Kalau AC di rumah mulai kurang dingin, meneteskan air, atau sudah lewat 3 bulan belum dicuci, tim kami siap panggilan ke rumah hari ini. Pengerjaan rapi pakai terpal pelindung jadi tembok dan kasur aman. Info jadwal & biaya transparan bisa cek di website kami atau chat WA ini ya. Terima kasih.",
          "Selamat pagi Bapak/Ibu, khusus minggu ini tim teknisi kami sedang keliling jadwal cuci AC rutin area Kecamatan Cimanggis dan sekitarnya. Ambil paket cuci 3 unit sekaligus lebih hemat ongkos panggil. Bergaransi kerja, silakan chat untuk booking jam kosong.",
        ],
      },
      {
        heading: "Contoh Pesan Pengingat Pelanggan Lama (Follow Up 3 Bulanan)",
        paragraphs: [
          "Pesan singkat ke pelanggan lama ini punya rasio balasan paling tinggi karena mereka sudah kenal hasil kerja Anda.",
        ],
        bullets: [
          "Selamat siang Pak/Bu [Nama], salam sehat. Sekadar mengingatkan catatan servis terakhir AC rumah Bapak/Ibu sudah masuk bulan ke-3 sejak pencucian sebelumnya. Supaya tarikan listrik tetap irit dan udara kamar tetap bersih, apakah minggu ini mau dijadwalkan cuci rutin sekalian? Jamnya bebas mengikuti waktu luang di rumah.",
        ],
      },
      {
        heading: "Contoh Teks Iklan Facebook & Instagram Lokal",
        paragraphs: [
          "Untuk iklan berbayar di Meta Ads, kalimat baris pertama harus langsung menyentuh keluhan yang sedang dirasakan pemilik rumah.",
        ],
        bullets: [
          "AC kamar cuma keluar angin padahal setelan remot sudah 16 derajat? Jangan tunggu kompresor ikutan jebol. Teknisi kami siap datang cek & cuci bersih langsung di rumah Anda khusus area [Nama Kota]. Cek rincian layanan kami dan jadwalkan lewat tombol WhatsApp di website.",
          "Baru pindahan rumah atau ruko dan butuh bongkar pasang AC yang rapi plus vakum standar? Dikerjakan teknisi berpengalaman dengan garansi bocor air maupun instalasi. Klik Pelajari Selengkapnya untuk lihat daftar layanan dan booking jadwal.",
        ],
      },
    ],
    ctaHeading: "Ingin Teks Website Usaha AC Anda Sekalian Saya Tuliskan?",
    ctaBody:
      "Anda tidak perlu pusing merangkai kalimat sendiri. Seluruh teks penawaran yang meyakinkan di website usaha AC Anda sudah saya siapkan sampai siap tayang.",
    waMessage:
      "Halo Mas Nanang, saya habis baca contoh kata-kata promosi AC dan tertarik dibuatkan website lengkap dengan penulisan teksnya.",
  },
  {
    slug: "biaya-dan-manfaat-website-service-ac",
    title: "Berapa Biaya Pembuatan Website Usaha Service AC? Ini Rincian Jujur & Manfaatnya",
    metaTitle: "Biaya Pembuatan Website Usaha Service AC & Fasilitas Lengkap | NanangDigital",
    metaDescription:
      "Rincian transparan biaya pembuatan website khusus usaha service AC panggilan mulai Rp1.500.000 lengkap dengan domain, hosting, SSL, Live Chat AI, dan Google Maps.",
    category: "Panduan Website",
    readMinutes: 4,
    publishedAt: "2026-10-23",
    summary:
      "Masih menimbang apakah usaha service AC panggilan perlu punya website sendiri atau cukup nomor WA saja? Simak hitungan balik modalnya yang sangat masuk akal.",
    sections: [
      {
        heading: "Hitung-Hitungan Balik Modal Website untuk Teknisi AC",
        paragraphs: [
          "Harga pembuatan landing page khusus usaha AC yang sudah terima beres sama domain dan hosting satu tahun penuh mulai dari Rp1.500.000 saja, atau setara kurang lebih Rp4.100 per hari selama setahun.",
          "Bandingkan dengan nilai satu pelanggan rumah tangga yang mencuci 3 unit AC ditambah isi freon atau perbaikan ringan: sekali datang bisa menghasilkan Rp250 ribu sampai Rp400 ribu, belum dihitung panggilan ulang tiap 3 bulan. Artinya, dapat 4 sampai 5 pelanggan baru saja dalam setahun modal website Anda sudah kembali utuh.",
        ],
      },
      {
        heading: "Kenapa Kantor, Sekolah, dan Ruko Selalu Mengecek Website Lebih Dulu?",
        paragraphs: [
          "Kalau Anda ingin naik kelas mengerjakan kontrak perawatan AC kantor, klinik, minimarket, kafe, atau kos 20 pintu, bagian admin mereka hampir selalu mencari vendor yang punya profil jelas di Google.",
          "Punya website sendiri dengan gembok keamanan HTTPS, daftar layanan jelas, foto tim di lapangan, serta titik Google Maps membuat penawaran Anda langsung dipercaya untuk order borongan.",
        ],
      },
      {
        heading: "Pilihan Paket Sesuai Tahap Usaha Anda Saat Ini",
        paragraphs: [
          "Kalau fokus Anda saat ini baru ingin punya halaman profil resmi di Google plus Google Maps dan Live Chat AI, Paket Basic (Rp1.500.000) sudah sangat cukup dan lengkap.",
          "Namun kalau Anda ingin sekalian langsung dipasangkan Google Search Console, Google Analytics, Pixel tracking, serta setup kampanye iklan lokal supaya telepon cepat berdering, Paket Growth (Rp2.000.000) adalah pilihan paling hemat.",
        ],
      },
    ],
    ctaHeading: "Cek Kecocokan Paket Dulu Lewat Chat Santai di WhatsApp",
    ctaBody:
      "Pembayaran aman: cukup DP 50% di awal pengerjaan, dan sisa 50% baru dilunasi setelah website selesai dikerjakan serta Anda cocok dengan hasilnya.",
    waMessage:
      "Halo Mas Nanang, saya habis baca rincian biaya website usaha service AC dan mau konsultasi pilih paket yang pas.",
  },
];

export function findArticleBySlug(slug: string): SeoArticle | undefined {
  return SEO_ARTICLES.find((item) => item.slug === slug);
}
