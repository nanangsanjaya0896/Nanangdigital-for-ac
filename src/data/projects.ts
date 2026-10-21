/**
 * Data showcase karya.
 *
 * Aturan kejujuran (sesuai PRD):
 * - Semua item saat ini berjenis "demo" atau "concept" dan SELALU diberi label jelas.
 * - Jangan menambahkan klaim klien, angka hasil, atau testimoni tanpa izin resmi.
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
      "Contoh homepage gelap untuk jasa service AC panggilan: hero tegas, daftar layanan rapi, dan CTA WhatsApp yang langsung terlihat.",
    tags: ["Mobile-Friendly", "CTA WhatsApp", "Copywriting"],
    image: "/images/karya-bintang-jaya.jpg",
    alt: "Mockup website Bintang Jaya Teknik bernuansa navy dengan hero teknisi service AC",
    overview:
      "Demo ini dibuat untuk menunjukkan bagaimana bisnis service AC bisa tampil kredibel sejak layar pertama: pesan utama jelas, identitas teknisi terasa dekat, dan tombol WhatsApp besar yang tidak terlewat. Struktur seperti ini dapat disesuaikan dengan nama, warna, dan layanan bisnis Anda.",
    scope: [
      "Struktur one-page yang fokus mengarahkan pengunjung ke WhatsApp",
      "Penulisan layanan dengan bahasa sederhana tanpa istilah teknis",
      "Penempatan CTA WhatsApp di posisi-posisi strategis",
      "Tampilan mobile-first untuk pengunjung dari ponsel",
    ],
  },
  {
    id: "coolmaster",
    slug: "coolmaster-ac",
    type: "demo",
    category: "Website Service AC",
    title: "CoolMaster AC",
    description:
      "Konsep tampilan terang dan bersih untuk jasa cuci AC rumahan, dengan kartu paket layanan yang mudah dibandingkan pengunjung.",
    tags: ["Mobile-Friendly", "Paket Layanan", "CTA WhatsApp"],
    image: "/images/karya-coolmaster.jpg",
    alt: "Mockup website CoolMaster AC bernuansa putih turquoise dengan kartu paket layanan",
    overview:
      "Demo ini menunjukkan pendekatan tampilan yang lebih ringan dan bersahabat untuk jasa cuci AC rumahan. Fokusnya: paket layanan terbaca dalam sekali lirik, sehingga calon pelanggan cepat paham dan langsung menghubungi.",
    scope: [
      "Kartu paket layanan berdampingan agar mudah dibandingkan",
      "Hierarki konten yang menuntun mata dari manfaat ke CTA",
      "Tombol WhatsApp mengambang yang selalu terjangkau",
      "Citra visual segar yang cocok untuk layanan kebersihan",
    ],
  },
  {
    id: "sinar-dingin",
    slug: "sinar-dingin-promo",
    type: "demo",
    category: "Landing Page",
    title: "Sinar Dingin Promo",
    description:
      "Demo landing page promo cuci AC dengan penawaran musiman dan tombol WhatsApp besar, siap dijadikan tujuan klik iklan.",
    tags: ["Promo", "Siap Iklan", "CTA WhatsApp"],
    image: "/images/karya-sinar-dingin.jpg",
    alt: "Mockup landing page promo Sinar Dingin dengan gradasi biru teal dan kartu promo",
    overview:
      "Demo landing page yang dirancang khusus sebagai tujuan promosi: satu penawaran utama, satu aksi utama. Struktur seperti ini membantu pengunjung dari iklan langsung paham penawaran dan menghubungi bisnis tanpa distraksi.",
    scope: [
      "Satu penawaran utama yang dominan di bagian atas",
      "Elemen urgensi dan alasan memesan sekarang",
      "CTA WhatsApp besar yang konsisten warna dan posisinya",
      "Struktur ringkas dan cepat dimuat untuk trafik iklan",
    ],
  },
  {
    id: "arctic-prima",
    slug: "arctic-prima-ads",
    type: "concept",
    category: "Kampanye Digital",
    title: "Arctic Prima Ads",
    description:
      "Konsep materi iklan Meta untuk jasa service AC: visual, headline, dan angle komunikasi yang diarahkan ke audiens lokal.",
    tags: ["Meta Ads", "Targeting Lokal", "Kreatif Iklan"],
    image: "/images/karya-arctic-prima.jpg",
    alt: "Mockup konsep iklan media sosial Arctic Prima pada layar ponsel dengan aksen neon",
    overview:
      "Konsep ini menggambarkan bentuk materi iklan yang disiapkan pada paket Growth dan Premium: visual yang berhenti di-scroll, headline yang bicara langsung ke masalah pelanggan, dan angle yang relevan untuk audiens lokal.",
    scope: [
      "Eksplorasi beberapa sudut komunikasi (angle) iklan",
      "Pasangan visual dan headline yang satu suara",
      "Format materi untuk feed dan stories",
      "Arah pengujian variasi untuk optimasi awal",
    ],
  },
  {
    id: "karyaku",
    slug: "karyaku-teknik",
    type: "concept",
    category: "Website Portfolio",
    title: "KaryaKu Teknik",
    description:
      "Konsep portfolio editorial untuk usaha teknisi AC yang ingin menonjolkan pengalaman dan galeri hasil pengerjaan.",
    tags: ["Editorial", "Galeri Karya", "Tipografi Besar"],
    image: "/images/karya-karyaku.jpg",
    alt: "Mockup konsep website portfolio KaryaKu Teknik bernuansa gelap editorial",
    overview:
      "Konsep ini menunjukkan arah desain yang lebih berani untuk usaha AC yang ingin beda: tipografi besar, galeri pengerjaan, dan narasi kepercayaan. Cocok untuk pemilik usaha yang ingin brand-nya terasa premium.",
    scope: [
      "Arah visual editorial dengan tipografi besar",
      "Struktur galeri hasil pengerjaan yang rapi",
      "Narasi kepercayaan tanpa klaim berlebihan",
      "Keseimbangan gaya dan keterbacaan di ponsel",
    ],
  },
  {
    id: "dingin-plus",
    slug: "dingin-plus-express",
    type: "demo",
    category: "Landing Page",
    title: "Dingin Plus Express",
    description:
      "Demo landing page mobile-first untuk layanan perbaikan AC cepat, dirancang nyaman ditekan dari iklan di ponsel.",
    tags: ["Mobile-First", "Siap Iklan", "CTA WhatsApp"],
    image: "/images/karya-dingin-plus.jpg",
    alt: "Mockup landing page mobile Dingin Plus dengan aksen kuning dan tombol WhatsApp",
    overview:
      "Demo ini fokus pada pengalaman layar kecil: tombol besar, daftar layanan singkat, dan rute jelas menuju WhatsApp. Struktur seperti ini ideal untuk layanan yang dibutuhkan mendesak, di mana calon pelanggan ingin cepat menghubungi.",
    scope: [
      "Prioritas konten untuk kebutuhan mendesak",
      "Ukuran tombol dan teks yang nyaman di layar kecil",
      "Daftar layanan ringkas yang cepat dipindai",
      "Satu aksi utama: chat WhatsApp tanpa berbelit",
    ],
  },
];

/** Kategori unik yang benar-benar ada pada data (untuk filter). */
export const PROJECT_CATEGORIES: string[] = Array.from(
  new Set(PROJECTS.map((project) => project.category))
);
