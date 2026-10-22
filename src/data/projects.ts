/**
 * Data showcase karya contoh tampilan.
 * Semua item saat ini berjenis "demo" atau "concept" dan diberi label jujur apa adanya.
 */
export type ProjectType = "client" | "demo" | "concept";

export interface Project {
  id: string;
  slug: string;
  type: ProjectType;
  category: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
  overview: string;
  scope: string[];
}

export const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  client: "Proyek Klien",
  demo: "Demo",
  concept: "Konsep",
};

export const PROJECTS: Project[] = [
  {
    id: "bintang-jaya",
    slug: "bintang-jaya-teknik",
    type: "demo",
    category: "Website Service AC",
    title: "Bintang Jaya Teknik",
    description:
      "Contoh tampilan bertema gelap untuk jasa panggilan perbaikan dan cuci AC dengan daftar layanan rapi serta tombol WhatsApp yang langsung kelihatan.",
    tags: ["Nyaman di HP", "Tombol WhatsApp", "Profil Teknisi"],
    image: "/images/karya-bintang-jaya.jpg",
    alt: "Mockup website Bintang Jaya Teknik bernuansa navy dengan hero teknisi service AC",
    overview:
      "Contoh ini memperlihatkan tampilan untuk bengkel atau teknisi AC panggilan yang ingin terlihat rapi dan niat sejak pertama kali dibuka pelanggan. Nama usaha, warna, foto pengerjaan, dan daftar tarifnya nanti disesuaikan penuh dengan milik Anda.",
    scope: [
      "Susunan satu halaman yang langsung mengarahkan orang ke chat WhatsApp",
      "Penjelasan layanan harian seperti cuci AC, isi freon, dan perbaikan bocor",
      "Tombol panggil teknisi di bagian atas, tengah, dan bawah halaman",
      "Ukuran tulisan dan tombol lega saat dibuka dari HP",
    ],
  },
  {
    id: "coolmaster",
    slug: "coolmaster-ac",
    type: "demo",
    category: "Website Service AC",
    title: "CoolMaster AC",
    description:
      "Contoh tampilan cerah warna putih-biru untuk jasa cuci AC rumahan, cocok bagi usaha yang ingin menonjolkan daftar paket cuci rutin.",
    tags: ["Tema Terang", "Daftar Tarif Jelas", "Cuci AC Rumah"],
    image: "/images/karya-coolmaster.jpg",
    alt: "Mockup website CoolMaster AC bernuansa putih turquoise dengan kartu paket layanan",
    overview:
      "Banyak pemilik rumah suka membandingkan harga cuci 1 unit vs borongan beberapa unit sekaligus. Desain terang seperti ini membantu pelanggan membaca rincian tarif dalam hitungan detik lalu tinggal klik pesan.",
    scope: [
      "Kartu daftar tarif cuci AC per PK atau paket beberapa unit rumah",
      "Tampilan bersih yang memberi kesan teknisi rapi di rumah pelanggan",
      "Tombol WhatsApp melayang di pojok layar supaya gampang ditekan kapan saja",
      "Informasi cakupan kecamatan atau perumahan yang dilayani",
    ],
  },
  {
    id: "sinar-dingin",
    slug: "sinar-dingin-promo",
    type: "demo",
    category: "Landing Page",
    title: "Sinar Dingin Promo",
    description:
      "Contoh halaman khusus promo musiman cuci AC yang dibuat ringkas untuk menampung klik dari iklan Facebook dan Instagram.",
    tags: ["Halaman Promo", "Tujuan Klik Iklan", "Order Cepat"],
    image: "/images/karya-sinar-dingin.jpg",
    alt: "Mockup landing page promo Sinar Dingin dengan gradasi biru teal dan kartu promo",
    overview:
      "Kalau Anda sedang bikin promo diskon cuci minimal 2 unit saat cuaca panas, halaman pendek seperti ini bekerja jauh lebih efektif daripada mengarahkan orang ke beranda medsos biasa.",
    scope: [
      "Penawaran promo langsung terpampang di layar paling atas",
      "Keterangan syarat promo singkat supaya pelanggan tidak salah paham",
      "Tombol ambil promo yang otomatis mengirim teks pemesanan ke WhatsApp",
      "Ringan dimuat meskipun sinyal internet pelanggan pas-pasan",
    ],
  },
  {
    id: "arctic-prima",
    slug: "arctic-prima-ads",
    type: "concept",
    category: "Kampanye Digital",
    title: "Arctic Prima Ads",
    description:
      "Gambaran bentuk gambar dan teks iklan Facebook/Instagram untuk menjangkau warga di sekitar lokasi bengkel AC Anda.",
    tags: ["Meta Ads", "Target Area Lokal", "Gambar & Teks Iklan"],
    image: "/images/karya-arctic-prima.jpg",
    alt: "Mockup konsep iklan media sosial Arctic Prima pada layar ponsel dengan aksen neon",
    overview:
      "Pada paket Growth dan Premium, Anda juga dibuatkan materi iklan seperti contoh ini. Fokusnya sederhana: masalah yang sering dialami warga (AC kurang dingin, netes air, atau berdebu) dan ajakan panggil teknisi terdekat.",
    scope: [
      "Beberapa variasi sudut kalimat iklan sesuai keluhan AC yang paling umum",
      "Ukuran materi pas untuk tampilan feed maupun story Instagram dan Facebook",
      "Penargetan radius wilayah supaya chat yang masuk benar-benar satu area kerja",
      "Pengujian beberapa materi di awal tayang untuk melihat mana yang paling ramai chat",
    ],
  },
  {
    id: "karyaku",
    slug: "karyaku-teknik",
    type: "concept",
    category: "Website Portfolio",
    title: "KaryaKu Teknik",
    description:
      "Konsep website profil usaha AC yang ingin menampilkan dokumentasi foto kerja lapangan untuk proyek rumah tinggal, kantor, maupun ruko.",
    tags: ["Profil Usaha", "Galeri Kerja", "Kantor & Ruko"],
    image: "/images/karya-karyaku.jpg",
    alt: "Mockup konsep website portfolio KaryaKu Teknik bernuansa gelap editorial",
    overview:
      "Cocok untuk usaha AC yang sudah punya banyak foto hasil pemasangan atau perawatan rutin di kantor, sekolah, maupun ruko, sehingga calon klien korporat makin yakin saat mengecek profil usaha Anda.",
    scope: [
      "Galeri foto dokumentasi pengerjaan di lapangan yang tertata rapi",
      "Penjelasan layanan kontrak perawatan berkala maupun panggilan harian",
      "Tampilan tegas yang mengangkat citra bengkel AC berpengalaman",
      "Tetap ringan dibuka baik dari laptop kantor maupun HP",
    ],
  },
  {
    id: "dingin-plus",
    slug: "dingin-plus-express",
    type: "demo",
    category: "Landing Page",
    title: "Dingin Plus Express",
    description:
      "Contoh halaman khusus panggilan perbaikan AC mendadak (AC mati total, bocor netes di kamar, atau tidak dingin) yang fokus dibuka dari HP.",
    tags: ["Panggilan Cepat", "Fokus Layar HP", "Langsung Chat WA"],
    image: "/images/karya-dingin-plus.jpg",
    alt: "Mockup landing page mobile Dingin Plus dengan aksen kuning dan tombol WhatsApp",
    overview:
      "Orang yang AC kamarnya tiba-tiba bocor atau panas di malam hari biasanya buru-buru cari tukang dari HP. Halaman ini memangkas basa-basi supaya mereka langsung lihat area layanan dan klik tombol panggil.",
    scope: [
      "Susunan super ringkas khusus pelanggan yang butuh teknisi segera",
      "Tombol WhatsApp ekstra jelas dan mudah dijangkau ibu jari",
      "Daftar keluhan AC yang biasa ditangani tertulis lugas",
      "Jam operasional dan area jangkauan langsung terbaca di bagian atas",
    ],
  },
];

export const PROJECT_CATEGORIES: string[] = Array.from(
  new Set(PROJECTS.map((project) => project.category))
);
