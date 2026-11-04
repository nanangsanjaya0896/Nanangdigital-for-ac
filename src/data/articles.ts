/**
 * Kumpulan artikel panduan SEO organik untuk menarik trafik gratis dari Google
 * khusus pemilik usaha service AC di Indonesia.
 *
 * Setiap artikel dibuka dengan "Jawaban singkat" (jawaban langsung untuk pertanyaan di judul) dan
 * ditutup dengan tanya jawab, supaya mudah dikutip Google, Bing, maupun mesin jawaban AI seperti
 * ChatGPT, Gemini, Perplexity, dan Claude. Tanya jawab di sini juga otomatis menjadi data terstruktur
 * FAQPage di halaman artikel (lihat src/seo/schema.ts).
 */
import { PLANS } from "./plans";
import type { Plan } from "./plans";

export interface ArticleTable {
  /** Judul tabel untuk pembaca layar dan mesin pencari. */
  caption: string;
  columns: string[];
  /** Kolom pertama setiap baris dipakai sebagai judul baris. */
  rows: string[][];
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: ArticleTable;
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface ArticleSource {
  label: string;
  url: string;
}

export interface SeoArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  /** Dihitung otomatis dari panjang isi artikel (sekitar 200 kata per menit). */
  readMinutes: number;
  /** Tanggal terbit pertama (YYYY-MM-DD). */
  publishedAt: string;
  /** Tanggal terakhir isi artikel diperbarui (YYYY-MM-DD). Ubah setiap kali isi artikel diganti. */
  updatedAt: string;
  summary: string;
  /** Jawaban langsung 2 sampai 3 kalimat untuk pertanyaan utama di judul artikel. */
  quickAnswer: string;
  sections: ArticleSection[];
  /** Tanya jawab di akhir artikel (tampil di halaman + data terstruktur FAQPage). */
  faqs: ArticleFaq[];
  /** Sumber resmi yang dipakai sebagai dasar isi artikel. */
  sources?: ArticleSource[];
  ctaHeading: string;
  ctaBody: string;
  waMessage: string;
}

type ArticleData = Omit<SeoArticle, "readMinutes">;

function plan(id: Plan["id"]): Plan {
  const found = PLANS.find((item) => item.id === id);
  if (!found) throw new Error(`Paket ${id} tidak ditemukan di src/data/plans.ts`);
  return found;
}

function priceOf(id: Plan["id"]): string {
  const item = plan(id);
  return item.customLabel ?? item.price;
}

function featureOf(id: Plan["id"], pattern: RegExp, fallback: string): string {
  return plan(id).features.find((feature) => pattern.test(feature)) ?? fallback;
}

function includes(id: Plan["id"], pattern: RegExp): string {
  const feature = plan(id).features.find((item) => pattern.test(item) && !/^no\s/i.test(item));
  if (!feature) return "Tidak termasuk";
  return /sesuai permintaan/i.test(feature) ? "Sesuai permintaan" : "Termasuk";
}

/** Tabel perbandingan paket, diambil langsung dari src/data/plans.ts supaya selalu sama dengan bagian Paket Harga. */
function packageComparisonTable(): ArticleTable {
  const ids: Plan["id"][] = ["basic", "growth", "premium"];
  const row = (label: string, value: (id: Plan["id"]) => string) => [label, ...ids.map(value)];
  return {
    caption: "Perbandingan isi Paket Basic, Paket Growth, dan Paket Premium Custom NanangDigital",
    columns: ["Fasilitas", "Basic", "Growth", "Premium Custom"],
    rows: [
      row("Harga", priceOf),
      row("Website", (id) => featureOf(id, /website|landing page/i, "Termasuk")),
      row("Domain & hosting 1 tahun + SSL HTTPS", () => "Termasuk"),
      row("Akun Google Maps", (id) => includes(id, /Google My Business|Google Maps/i)),
      row("Live Chat AI", (id) => includes(id, /Live Chat AI/i)),
      row("Iklan Meta Ads", (id) =>
        id === "basic" ? featureOf(id, /Meta Ads/i, "Tidak termasuk") : featureOf(id, /^Setup Meta Ads/i, "Termasuk")
      ),
      row("Pixel & tracking iklan", (id) => includes(id, /pixel/i)),
      row("Artikel SEO", (id) => includes(id, /Artikel SEO/i)),
      row("Google Search Console & Analytics", (id) => includes(id, /Search Console/i)),
      row("Revisi", (id) => featureOf(id, /revisi/i, "Sesuai kesepakatan")),
      row("Lama pengerjaan", (id) => (id === "premium" ? "Sekitar 5 sampai 7 hari kerja" : "3 sampai 5 hari kerja")),
    ],
  };
}

const ARTICLES: ArticleData[] = [
  {
    slug: "cara-promosi-jasa-service-ac",
    title: "7 Cara Promosi Jasa Service AC Agar Ramai Pelanggan Tetap Tanpa Banting Harga",
    metaTitle: "7 Cara Promosi Jasa Service AC Agar Ramai Pelanggan Tetap | NanangDigital",
    metaDescription:
      "Panduan praktis cara promosi usaha service dan cuci AC rumahan agar dapat pelanggan baru tiap minggu dari Google Maps, website, dan langganan 3 bulanan.",
    category: "Strategi Pelanggan",
    publishedAt: "2026-10-23",
    updatedAt: "2026-11-04",
    summary:
      "Banyak teknisi AC punya kerjaan rapi dan jujur soal freon, tapi order masih sepi karena cuma mengandalkan kenalan lama. Ini langkah praktis yang terbukti paling cepat mendatangkan panggilan baru.",
    quickAnswer:
      "Cara promosi jasa service AC yang paling efektif: lengkapi profil Google Maps, punya website berisi daftar layanan dan tarif, kirim pengingat cuci rutin tiap 3 bulan ke pelanggan lama, dan pasang iklan Facebook atau Instagram di radius 5 sampai 10 km dari lokasi Anda. Tambahkan ulasan Google dari pelanggan asli, foto sebelum dan sesudah, serta kerja sama dengan pengelola perumahan atau kos.",
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
          "Ketika profil Google Maps Anda terhubung ke website resmi yang menampilkan daftar layanan, estimasi biaya, foto kerja asli, dan tombol WhatsApp sekali klik, calon pelanggan jauh lebih mudah percaya dibanding melihat nomor telepon tanpa keterangan apa pun.",
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
          "Sekitar 90 hari kemudian, kirim pesan pengingat sopan di WhatsApp sambil menyebut tanggal servis terakhir. Pelanggan yang dulu puas biasanya senang diingatkan, dan banyak yang langsung minta dijadwalkan ulang tanpa Anda perlu keluar biaya iklan sepeser pun.",
        ],
      },
      {
        heading: "4. Fokus Iklan Radius 5 sampai 10 Kilometer Saja",
        paragraphs: [
          "Kalau Anda ingin mempercepat order di bulan sepi, pasang iklan Facebook dan Instagram khusus radius 5 sampai 10 kilometer dari titik bengkel Anda. Jangan menargetkan satu provinsi penuh karena biaya jalan teknisi akan bengkak.",
          "Di Meta Ads Manager, pakai fitur Drop pin di titik bengkel atau rumah Anda lalu geser radiusnya. Kalau memilih kota atau wilayah, opsi untuk menjangkau orang di luar lokasi yang dipilih kadang sudah tercentang otomatis. Hilangkan centangnya supaya iklan tetap berputar di area kerja Anda.",
          "Arahkan klik iklan langsung ke landing page usaha AC Anda supaya orang yang masuk ke chat WhatsApp sudah tahu tarif dasar serta layanan yang tersedia.",
        ],
      },
      {
        heading: "5. Minta Ulasan Google dari Setiap Pelanggan yang Puas",
        paragraphs: [
          "Ulasan di Google Maps adalah bukti yang dibaca calon pelanggan sebelum menghubungi teknisi baru. Google sendiri menyebut jumlah ulasan dan rating positif ikut membantu peringkat lokal sebuah usaha.",
          "Kirim link ulasan lewat WhatsApp setelah pekerjaan selesai, misalnya sore harinya, dengan kalimat singkat dan sopan. Jangan memberi diskon atau imbalan sebagai ganti ulasan, dan jangan mendikte isi ulasannya. Dua hal itu melanggar kebijakan Google Maps dan ulasannya bisa dihapus.",
        ],
      },
      {
        heading: "6. Tunjukkan Bukti Kerja Lewat Foto Sebelum dan Sesudah",
        paragraphs: [
          "Calon pelanggan sulit menilai teknisi yang belum pernah mereka panggil. Foto filter yang tadinya hitam lalu bersih, air bekas cucian yang keruh, atau pemasangan pipa yang rapi jauh lebih meyakinkan daripada kalimat promosi apa pun.",
          "Ambil 2 foto dari sudut yang sama sebelum dan sesudah pengerjaan, minta izin pemilik rumah, lalu pasang di website, status WhatsApp, dan profil Google Maps. Hindari memotret wajah penghuni atau isi rumah yang bersifat pribadi.",
        ],
        bullets: [
          "Unit indoor sebelum dan sesudah dicuci.",
          "Filter dan evaporator yang sudah bersih.",
          "Instalasi baru dengan pipa, kabel, dan selang pembuangan yang rapi.",
        ],
      },
      {
        heading: "7. Jalin Kerja Sama dengan Pengelola Perumahan, Kos, dan Toko Elektronik",
        paragraphs: [
          "Satu kenalan yang tepat bisa membawa banyak unit AC sekaligus. Pengelola kos, pengurus paguyuban perumahan, admin ruko, dan toko elektronik yang menjual AC baru sering ditanya penghuni atau pembeli soal teknisi yang bisa dipercaya.",
          "Tawarkan jadwal cuci bersama di hari tertentu dengan tarif per unit yang jelas, lalu tempel stiker kecil berisi link website dan WhatsApp Anda di unit yang sudah dikerjakan. Saat AC bermasalah lagi, penghuni tinggal membuka link tersebut.",
        ],
      },
    ],
    faqs: [
      {
        question: "Promosi jasa service AC yang gratis apa saja?",
        answer:
          "Yang gratis antara lain profil Google Business Profile (Google Maps), status WhatsApp, posting di grup warga atau grup jual beli lokal, pesan pengingat cuci rutin ke pelanggan lama, dan meminta ulasan Google dari pelanggan yang puas. Yang berbayar biasanya iklan Facebook dan Instagram serta pembuatan website.",
      },
      {
        question: "Berapa radius iklan yang pas untuk jasa service AC panggilan?",
        answer:
          "Radius 5 sampai 10 km dari titik bengkel atau rumah teknisi biasanya paling masuk akal, karena ongkos dan waktu perjalanan tetap terkendali. Di Meta Ads Manager, gunakan Drop pin lalu atur radiusnya, dan pastikan opsi untuk menjangkau orang di luar lokasi yang dipilih tidak tercentang.",
      },
      {
        question: "Seberapa sering pelanggan perlu diingatkan untuk cuci AC rutin?",
        answer:
          "Umumnya setiap 3 bulan untuk AC rumah yang dipakai setiap hari, dan bisa lebih sering untuk ruko, kantor, atau rumah di dekat jalan raya yang berdebu. Kirim pengingat sopan lewat WhatsApp sekitar 90 hari setelah pengerjaan terakhir.",
      },
    ],
    sources: [
      {
        label: "Google: Cara memperbaiki peringkat lokal di Google",
        url: "https://support.google.com/business/answer/7091?hl=id",
      },
      {
        label: "Google Maps: Konten terlarang dan konten yang dibatasi (aturan ulasan)",
        url: "https://support.google.com/contributionpolicy/answer/7400114?hl=id",
      },
      {
        label: "Meta: How to choose locations for your ad",
        url: "https://www.facebook.com/business/help/365561350785642",
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
    publishedAt: "2026-10-23",
    updatedAt: "2026-11-04",
    summary:
      "Google Maps adalah sumber order gratis paling gurih untuk jasa panggilan seperti cuci AC, bongkar pasang AC, dan isi freon. Ikuti pengaturan nama, kategori, dan website berikut agar cepat naik.",
    quickAnswer:
      "Daftarkan usaha di Google Business Profile (business.google.com) dengan nama usaha asli tanpa tambahan kata kunci, pilih kategori utama yang paling sesuai, isi area layanan, jam buka, nomor WhatsApp, dan website, lalu selesaikan verifikasi. Setelah itu unggah foto kerja asli dan kumpulkan ulasan dari pelanggan sungguhan. Menurut Google, urutan hasil lokal ditentukan oleh relevansi, jarak, dan keterlihatan usaha.",
    sections: [
      {
        heading: "1. Pakai Nama Usaha Asli, Jangan Ditambah Kata Kunci",
        paragraphs: [
          "Saat membuat akun Google Business Profile, tulis nama usaha persis seperti yang dipakai di spanduk, nota, stiker, atau seragam kerja. Panduan resmi Google melarang menambahkan informasi yang tidak perlu ke dalam nama, misalnya jenis layanan, nama daerah, atau slogan. Profil yang namanya dijejali kata kunci bisa ditangguhkan.",
          "Kalau nama asli usaha Anda Berkah Jaya AC, tulis Berkah Jaya AC saja, bukan Berkah Jaya AC Service & Cuci AC Bekasi Selatan. Kata kunci seperti cuci AC, isi freon, atau nama kecamatan cukup dimasukkan ke kategori, daftar layanan, deskripsi, dan website, karena bagian itu juga dibaca Google.",
        ],
      },
      {
        heading: "2. Isi Kategori, Area Layanan, Jam Buka, dan Tautan Website",
        paragraphs: [
          "Pilih kategori utama yang paling dekat dengan pekerjaan inti Anda, yaitu servis atau perbaikan AC, lalu tambahkan kategori lain hanya kalau memang dikerjakan. Google menyarankan memakai kategori sesedikit mungkin yang sudah cukup menggambarkan usaha.",
          "Untuk jasa panggilan yang tidak menerima pelanggan di rumah sendiri, isi area layanan berupa kota atau kecamatan dan sembunyikan alamat rumah. Ini memang diwajibkan panduan Google untuk usaha yang mendatangi pelanggan. Lengkapi juga jam buka dan kolom website, karena menurut Google usaha dengan info yang lengkap dan akurat lebih berpeluang muncul di hasil pencarian lokal.",
        ],
        bullets: [
          "Samakan nama usaha dan nomor WhatsApp di Google Maps dengan yang tertulis di website dan media sosial.",
          "Unggah foto kerja asli: mencuci unit indoor, mengecek tekanan freon dengan manifold, dan kendaraan kerja.",
          "Lengkapi daftar layanan mulai dari cuci AC split, tambah freon, perbaikan bocor air, hingga bongkar pasang.",
        ],
      },
      {
        heading: "3. Kumpulkan Ulasan Asli Tanpa Melanggar Aturan Google",
        paragraphs: [
          "Google menyebut jumlah ulasan dan rating positif ikut menentukan keterlihatan sebuah usaha di hasil lokal. Cara paling aman: setelah pekerjaan selesai, kirim link ulasan lewat WhatsApp dengan pesan singkat yang sopan, lalu biarkan pelanggan menulis dengan kata-kata mereka sendiri.",
          "Ada beberapa hal yang dilarang kebijakan Google Maps: memberi imbalan seperti diskon atau servis gratis sebagai ganti ulasan, hanya meminta ulasan ke pelanggan yang puas, meminta isi ulasan tertentu, dan mendesak pelanggan menulis ulasan saat Anda masih di rumahnya. Balas setiap ulasan dengan sopan, termasuk yang kurang baik.",
        ],
        bullets: [
          "Contoh pesan permintaan ulasan: Terima kasih sudah memakai jasa kami hari ini, Pak/Bu. Kalau berkenan, boleh ceritakan pengalaman Bapak/Ibu di Google lewat link ini: [link ulasan]. Masukan apa pun sangat membantu kami.",
        ],
      },
    ],
    faqs: [
      {
        question: "Apakah daftar Google Maps untuk usaha service AC berbayar?",
        answer:
          "Tidak. Membuat dan mengelola Google Business Profile gratis. Google juga menegaskan peringkat lokal tidak bisa diminta atau dibeli, jadi hati-hati dengan tawaran jasa yang menjanjikan posisi teratas dengan bayaran.",
      },
      {
        question: "Jasa service AC panggilan tanpa toko boleh daftar Google Maps?",
        answer:
          "Boleh. Google mengizinkan usaha yang mendatangi pelanggan untuk membuat satu profil dengan area layanan. Kalau Anda tidak menerima pelanggan di alamat sendiri, isi area layanan dan sembunyikan alamat rumah dari profil.",
      },
      {
        question: "Apakah nama usaha di Google Maps boleh ditambah kata cuci AC dan nama kota?",
        answer:
          "Tidak boleh kalau kata itu bukan bagian dari nama asli usaha Anda. Panduan Google melarang menambahkan informasi layanan atau lokasi ke nama bisnis, dan pelanggarannya bisa membuat profil ditangguhkan. Masukkan kata kunci itu ke kategori, daftar layanan, dan deskripsi.",
      },
    ],
    sources: [
      {
        label: "Google: Panduan menampilkan bisnis Anda di Google",
        url: "https://support.google.com/business/answer/3038177?hl=id",
      },
      {
        label: "Google: Cara memperbaiki peringkat lokal di Google",
        url: "https://support.google.com/business/answer/7091?hl=id",
      },
      {
        label: "Google Maps: Konten terlarang dan konten yang dibatasi (aturan ulasan)",
        url: "https://support.google.com/contributionpolicy/answer/7400114?hl=id",
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
    publishedAt: "2026-10-23",
    updatedAt: "2026-11-04",
    summary:
      "Bingung mau nulis status WhatsApp atau posting di grup warga komplek supaya tidak terkesan nyepam? Salin dan sesuaikan contoh kalimat promosi yang fokus pada masalah nyata pemilik rumah berikut.",
    quickAnswer:
      "Kata-kata promosi service AC yang efektif menyebut keluhan nyata pelanggan seperti AC kurang dingin, menetes, atau berbau, lalu area layanan, jaminan pengerjaan rapi, dan cara pesan yang jelas. Artikel ini berisi 12 contoh siap pakai untuk grup WhatsApp warga, status WhatsApp, pengingat pelanggan lama, penawaran ke kantor atau kos, dan iklan Facebook atau Instagram.",
    sections: [
      {
        heading: "Contoh Promosi untuk Grup WhatsApp Warga / Perumahan",
        paragraphs: [
          "Di grup warga atau paguyuban komplek, hindari huruf kapital semua dan terlalu banyak emoji. Gunakan bahasa tetangga yang sopan, jelas tarifnya, dan ada jaminan rapi. Minta izin admin grup dulu sebelum berpromosi.",
        ],
        bullets: [
          "Izin info Bapak/Ibu warga Cluster Melati. Kalau AC di rumah mulai kurang dingin, meneteskan air, atau sudah lewat 3 bulan belum dicuci, tim kami siap panggilan ke rumah hari ini. Pengerjaan rapi pakai terpal pelindung jadi tembok dan kasur aman. Info jadwal & biaya transparan bisa cek di website kami atau chat WA ini ya. Terima kasih.",
          "Selamat pagi Bapak/Ibu, khusus minggu ini tim teknisi kami sedang keliling jadwal cuci AC rutin area Kecamatan Cimanggis dan sekitarnya. Ambil paket cuci 3 unit sekaligus lebih hemat ongkos panggil. Bergaransi kerja, silakan chat untuk booking jam kosong.",
          "Selamat sore Bapak/Ibu warga [Nama Perumahan]. AC yang sudah lama tidak dicuci sering mulai menetes karena saluran pembuangannya tersumbat kotoran. Minggu ini kami buka jadwal cek dan cuci AC di area perumahan, jamnya bisa menyesuaikan waktu luang di rumah. Daftar tarif lengkap ada di website kami, silakan chat kalau butuh. Terima kasih.",
        ],
      },
      {
        heading: "Contoh Status WhatsApp Harian",
        paragraphs: [
          "Status WhatsApp dilihat kenalan dan pelanggan lama setiap hari. Tulis singkat, sertakan foto hasil kerja, dan tutup dengan cara pesan.",
        ],
        bullets: [
          "Hari ini cuci 3 unit AC di Cluster Anggrek, filter yang tadinya hitam pekat sudah bersih lagi. Jadwal besok masih ada 2 slot kosong untuk area [Nama Kecamatan]. Chat saja untuk booking.",
          "AC kurang dingin belum tentu harus tambah freon. Bisa jadi unitnya cuma kotor, bisa juga ada kebocoran kecil. Kami cek dulu, lalu kasih tahu biayanya sebelum dikerjakan. Chat untuk jadwal kunjungan.",
          "Sebelum dan sesudah, unit yang sama. Kalau AC di rumah sudah lebih dari 3 bulan belum dicuci, sekarang waktu yang pas sebelum tagihan listrik ikut naik. Info tarif ada di link profil kami.",
        ],
      },
      {
        heading: "Contoh Pesan Pengingat Pelanggan Lama (Follow Up 3 Bulanan)",
        paragraphs: [
          "Pesan singkat ke pelanggan lama ini punya rasio balasan paling tinggi karena mereka sudah kenal hasil kerja Anda.",
        ],
        bullets: [
          "Selamat siang Pak/Bu [Nama], salam sehat. Sekadar mengingatkan catatan servis terakhir AC rumah Bapak/Ibu sudah masuk bulan ke-3 sejak pencucian sebelumnya. Supaya tarikan listrik tetap irit dan udara kamar tetap bersih, apakah minggu ini mau dijadwalkan cuci rutin sekalian? Jamnya bebas mengikuti waktu luang di rumah.",
          "Halo Pak/Bu [Nama], semoga sehat selalu. Kami sedang menyusun jadwal cuci AC minggu depan untuk area [Nama Daerah]. Karena AC Bapak/Ibu terakhir dicuci tanggal [tanggal servis], apakah mau sekalian dijadwalkan? Balas pesan ini saja untuk pilih hari dan jamnya.",
        ],
      },
      {
        heading: "Contoh Penawaran untuk Kantor, Ruko, dan Kos",
        paragraphs: [
          "Untuk pelanggan bisnis, tonjolkan jadwal rutin, catatan pekerjaan, dan kemudahan pembayaran. Mereka butuh vendor yang rapi administrasinya dan bisa dipegang omongannya.",
        ],
        bullets: [
          "Selamat pagi Bapak/Ibu pengelola [Nama Kos/Ruko]. Kami menawarkan perawatan AC berkala untuk semua unit di gedung Anda, dengan jadwal cuci tiap 3 bulan dan catatan pekerjaan per unit setelah selesai. Kalau berkenan, kami kirimkan rincian tarif per unit dan contoh catatan pekerjaannya lewat WhatsApp.",
          "Untuk kantor dan klinik: AC yang rutin dirawat membantu ruangan tetap sejuk sepanjang jam kerja dan mengurangi risiko unit mati mendadak saat ada tamu. Kami bisa datang di luar jam operasional supaya kegiatan kantor tidak terganggu. Chat kami untuk penawaran kontrak perawatan.",
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
    faqs: [
      {
        question: "Apa isi kata-kata promosi service AC yang menarik?",
        answer:
          "Sebutkan keluhan yang sedang dirasakan pelanggan, misalnya AC kurang dingin atau menetes, lalu area layanan, jaminan pengerjaan rapi, kisaran tarif atau link daftar harga, dan satu ajakan yang jelas seperti chat untuk booking jadwal. Hindari huruf kapital semua dan emoji berlebihan.",
      },
      {
        question: "Bolehkah promosi jasa AC di grup WhatsApp perumahan?",
        answer:
          "Boleh selama aturan grup mengizinkan. Minta izin admin dulu, jangan kirim pesan yang sama berulang-ulang, beri jarak beberapa minggu antar promosi, dan gunakan bahasa yang sopan supaya tidak dianggap spam.",
      },
      {
        question: "Kapan waktu terbaik mengirim pesan pengingat cuci AC ke pelanggan lama?",
        answer:
          "Sekitar 3 bulan setelah pengerjaan terakhir, di jam santai seperti siang atau sore hari. Sebutkan tanggal servis terakhir supaya pelanggan ingat, lalu tawarkan pilihan hari dan jam.",
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
    publishedAt: "2026-10-23",
    updatedAt: "2026-11-04",
    summary:
      "Masih menimbang apakah usaha service AC panggilan perlu punya website sendiri atau cukup nomor WA saja? Simak hitungan balik modalnya yang sangat masuk akal.",
    quickAnswer: `Biaya pembuatan website usaha service AC di NanangDigital mulai ${priceOf("basic")} untuk Paket Basic dan ${priceOf("growth")} untuk Paket Growth, sedangkan Paket Premium Custom harganya sesuai permintaan. Semua paket sudah termasuk domain dan hosting tahun pertama, SSL HTTPS, Live Chat AI, dan pembuatan akun Google Maps. Dengan harga ${priceOf("basic")}, biayanya setara sekitar Rp4.100 per hari selama setahun.`,
    sections: [
      {
        heading: "Hitung-Hitungan Balik Modal Website untuk Teknisi AC",
        paragraphs: [
          `Harga pembuatan landing page khusus usaha AC yang sudah terima beres sama domain dan hosting satu tahun penuh mulai dari ${priceOf("basic")} saja, atau setara kurang lebih Rp4.100 per hari selama setahun.`,
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
        heading: "Perbandingan Isi Paket Website Usaha Service AC",
        paragraphs: [
          "Tabel ini merangkum perbedaan ketiga paket. Isinya sama dengan bagian Paket Harga di halaman utama.",
        ],
        table: packageComparisonTable(),
      },
      {
        heading: "Pilihan Paket Sesuai Tahap Usaha Anda Saat Ini",
        paragraphs: [
          `Kalau fokus Anda saat ini baru ingin punya halaman profil resmi di Google plus Google Maps dan Live Chat AI, Paket Basic (${priceOf("basic")}) sudah sangat cukup dan lengkap.`,
          `Namun kalau Anda ingin sekalian langsung dipasangkan Google Search Console, Google Analytics, Pixel tracking, artikel SEO, serta setup kampanye iklan lokal supaya telepon cepat berdering, Paket Growth (${priceOf("growth")}) adalah pilihan paling hemat.`,
          "Mulai tahun kedua, yang perlu diperpanjang hanya domain dan hosting. Besarnya diinfokan di awal saat konsultasi lewat WhatsApp, jadi tidak ada biaya kejutan.",
        ],
      },
    ],
    faqs: [
      {
        question: "Berapa biaya perpanjangan website usaha AC di tahun kedua?",
        answer:
          "Tahun pertama domain dan hosting sudah termasuk harga paket. Mulai tahun kedua hanya perlu memperpanjang domain dan hosting, dan besarnya diinfokan di awal saat konsultasi lewat WhatsApp supaya tidak ada biaya kejutan.",
      },
      {
        question: "Lebih baik punya website atau cukup Instagram dan WhatsApp untuk usaha AC?",
        answer:
          "Instagram dan WhatsApp tetap penting untuk promosi dan ngobrol dengan pelanggan, tapi website bisa muncul di Google, bisa ditautkan dari Google Maps, dan merangkum layanan, tarif, area kerja, serta bukti kerja di satu halaman milik Anda sendiri. Kantor, sekolah, dan ruko juga biasanya mengecek website sebelum memilih vendor.",
      },
      {
        question: "Paket website mana yang cocok untuk teknisi AC yang baru mulai?",
        answer: `Paket Basic (${priceOf("basic")}) sudah cukup untuk punya website resmi, akun Google Maps, dan Live Chat AI. Pilih Paket Growth (${priceOf("growth")}) kalau ingin sekalian dipasangi Meta Ads, Pixel tracking, Google Search Console, Google Analytics, dan artikel SEO.`,
      },
    ],
    ctaHeading: "Cek Kecocokan Paket Dulu Lewat Chat Santai di WhatsApp",
    ctaBody:
      "Pembayaran aman: cukup DP 50% di awal pengerjaan, dan sisa 50% baru dilunasi setelah website selesai dikerjakan serta Anda cocok dengan hasilnya.",
    waMessage:
      "Halo Mas Nanang, saya habis baca rincian biaya website usaha service AC dan mau konsultasi pilih paket yang pas.",
  },
];

/** Semua teks artikel yang dibaca pengunjung, untuk menghitung lama baca dan jumlah kata. */
export function articlePlainText(
  article: Pick<SeoArticle, "title" | "quickAnswer" | "summary" | "sections" | "faqs">
): string {
  const parts: string[] = [article.title, article.quickAnswer, article.summary];
  for (const section of article.sections) {
    parts.push(section.heading, ...section.paragraphs, ...(section.bullets ?? []));
    if (section.table) {
      parts.push(...section.table.columns, ...section.table.rows.flat());
    }
  }
  for (const faq of article.faqs) {
    parts.push(faq.question, faq.answer);
  }
  return parts.join(" ");
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export const SEO_ARTICLES: SeoArticle[] = ARTICLES.map((article) => ({
  ...article,
  readMinutes: Math.max(3, Math.ceil(countWords(articlePlainText(article)) / 200)),
}));

export function findArticleBySlug(slug: string): SeoArticle | undefined {
  return SEO_ARTICLES.find((item) => item.slug === slug);
}

/** Tanggal terbaru di antara semua artikel (YYYY-MM-DD), dipakai sitemap halaman Panduan. */
export function latestArticleUpdate(): string {
  const dates = SEO_ARTICLES.map((article) => article.updatedAt).sort();
  return dates[dates.length - 1] ?? "";
}
