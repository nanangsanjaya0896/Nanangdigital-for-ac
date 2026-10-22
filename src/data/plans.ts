/**
 * Data tiga paket penawaran NanangDigital.
 */
export interface Plan {
  id: "basic" | "growth" | "premium";
  name: string;
  price: string;
  tagline: string;
  popular: boolean;
  leadIn?: string;
  features: string[];
  cta: string;
  waMessage: string;
}

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp1.500.000",
    tagline: "Cocok buat teknisi atau usaha AC yang baru mau punya halaman resmi sendiri.",
    popular: false,
    features: [
      "1 halaman website profil & daftar layanan AC",
      "Penulisan teks layanan yang rapi dan gampang dipahami pelanggan",
      "Tombol chat WhatsApp otomatis terisi format pesan",
      "Tampilan ringan di HP Android maupun iPhone",
      "Sudah termasuk domain .com / .id & hosting 1 tahun",
      "1x revisi ringan dan panduan pakai",
    ],
    cta: "Ambil Paket Basic",
    waMessage:
      "Halo Mas Nanang, saya tertarik ambil Paket Basic (Rp1.500.000) untuk usaha service AC saya. Boleh diskusi sebentar?",
  },
  {
    id: "growth",
    name: "Growth",
    price: "Rp2.000.000",
    tagline: "Paling pas kalau sekalian mau langsung pasang iklan cari pelanggan di sekitar lokasi.",
    popular: true,
    leadIn: "Dapat semua isi Paket Basic, ditambah:",
    features: [
      "Setup 1 campaign iklan Facebook & Instagram (Meta Ads)",
      "2 sampai 3 variasi teks iklan siap tayang",
      "Setting target lokasi khusus kecamatan / kota area kerja Anda",
      "Pemasangan Meta Pixel supaya klik WA dari iklan tercatat",
      "Sudah termasuk domain .com / .id & hosting 1 tahun",
      "1x revisi ringan",
    ],
    cta: "Ambil Paket Growth",
    waMessage:
      "Halo Mas Nanang, saya tertarik Paket Growth (Rp2.000.000) yang sudah sekalian setup iklan Meta Ads. Boleh info detailnya?",
  },
  {
    id: "premium",
    name: "Premium",
    price: "Custom",
    tagline: "Buat usaha AC yang layanannya banyak, punya beberapa tim, atau mau kejar order lebih kencang.",
    popular: false,
    leadIn: "Cakupan disesuaikan dengan kebutuhan usaha:",
    features: [
      "Website lebih lengkap untuk banyak jenis layanan & area",
      "Penulisan materi halaman dan penawaran lebih mendalam",
      "Tombol WhatsApp + formulir jadwal panggilan servis",
      "Setup 2 campaign iklan dengan sudut penawaran berbeda",
      "Pendampingan optimasi awal iklan setelah tayang",
      "2x revisi + gratis domain .com / .id & hosting 1 tahun",
    ],
    cta: "Diskusikan Paket Premium",
    waMessage:
      "Halo Mas Nanang, saya mau ngobrol dulu soal Paket Premium untuk usaha service AC saya.",
  },
];

export const PRICING_NOTES = [
  "Gratis domain .com / .id dan hosting tahun pertama di semua paket.",
  "Sudah termasuk 3 bonus tambahan untuk bantu promosi awal.",
  "Bisa bayar lewat transfer bank, QRIS, atau e-wallet.",
];
