/**
 * Satu sumber data untuk ketiga paket penawaran.
 * Dipakai oleh PricingSection dan ringkasan harga di section lain.
 */
export interface Plan {
  id: "basic" | "growth" | "premium";
  name: string;
  /** Harga apa adanya sesuai penawaran bisnis (rupiah atau "Custom"). */
  price: string;
  tagline: string;
  popular: boolean;
  features: string[];
  cta: string;
  waMessage: string;
}

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp1.500.000",
    tagline: "Untuk teknisi yang baru mulai tampil online.",
    popular: false,
    features: [
      "1 landing page / website portfolio",
      "Copywriting dasar",
      "CTA WhatsApp yang jelas",
      "Tampilan mobile-friendly",
      "1x revisi ringan",
      "Panduan penggunaan basic",
    ],
    cta: "Pilih Paket Basic",
    waMessage:
      "Halo NanangDigital, saya tertarik dengan Paket Basic (Rp1.500.000) untuk website bisnis service AC saya. Boleh info lebih lanjut?",
  },
  {
    id: "growth",
    name: "Growth",
    price: "Rp2.000.000",
    tagline: "Untuk usaha yang ingin mulai menarik lead lewat iklan.",
    popular: true,
    features: [
      "Website portfolio profesional",
      "2–3 copy iklan kreatif",
      "Setup 1 campaign Meta Ads",
      "Targeting lokal sesuai area layanan",
      "Basic pixel & tracking",
      "1x revisi ringan",
    ],
    cta: "Pilih Paket Growth",
    waMessage:
      "Halo NanangDigital, saya tertarik dengan Paket Growth (Rp2.000.000) termasuk setup 1 campaign iklan. Boleh info lebih lanjut?",
  },
  {
    id: "premium",
    name: "Premium",
    price: "Custom",
    tagline: "Untuk bisnis yang butuh solusi lebih lengkap.",
    popular: false,
    features: [
      "Website portfolio lebih rapi & lengkap",
      "Copywriting lebih persuasif",
      "CTA WhatsApp + form lead",
      "Setup 2 campaign dengan angle berbeda",
      "Optimasi awal iklan",
      "2x revisi",
      "Scope mengikuti kesepakatan konsultasi",
    ],
    cta: "Konsultasikan Paket Premium",
    waMessage:
      "Halo NanangDigital, saya ingin berkonsultasi mengenai Paket Premium (harga custom) untuk bisnis service AC saya.",
  },
];

export const PRICING_NOTES = [
  "Sudah termasuk domain .com / .id dan hosting untuk tahun pertama.",
  "Pembayaran dua tahap: 50% sebelum pengerjaan, 50% setelah website siap dan disetujui.",
  "Metode: transfer bank, QRIS, atau dompet digital — di luar website ini.",
];
