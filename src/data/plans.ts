/**
 * Data tiga paket jasa pembuatan website NanangDigital (harga Rupiah).
 */
export interface Plan {
  id: "basic" | "growth" | "premium";
  name: string;
  price: string;
  customLabel?: string;
  priceNote: string;
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
    name: "Paket Basic",
    price: "Rp1.500.000",
    priceNote: "Sudah termasuk domain & hosting tahun pertama, SSL HTTPS, dan akun Google Maps.",
    tagline: "Cocok buat teknisi atau usaha AC yang mau punya website resmi siap terima order.",
    popular: false,
    leadIn: "Fasilitas yang didapat:",
    features: [
      "1 landing page / website portfolio",
      "CTA Form WhatsApp",
      "Desain responsif (HP, tablet, desktop)",
      "Copywriting High Convert",
      "3x revisi ringan",
      "No Artikel",
      "Free SSL Certificate (HTTPS)",
      "Live Chat AI",
      "Gratis domain & hosting 1 tahun",
      "Akun Google My Business (Google Maps)",
      "Gratis Meta Ads",
    ],
    cta: "Ambil Paket Basic",
    waMessage:
      "Halo Mas Nanang, saya tertarik ambil Paket Basic (Rp1.500.000) untuk usaha service AC saya. Boleh diskusi sebentar?",
  },
  {
    id: "growth",
    name: "Paket Growth",
    price: "Rp2.000.000",
    priceNote: "Lengkap dengan setup Meta Ads, Google Search Console, & Google Analytics.",
    tagline: "Paling pas kalau sekalian mau langsung kejar pelanggan dari iklan lokal & Google.",
    popular: true,
    leadIn: "Fasilitas lengkap yang didapat:",
    features: [
      "Website portfolio profesional",
      "Setup Meta Ads (1 campaign)",
      "2-3 copy iklan kreatif",
      "Targeting audience lokal",
      "Basic pixel & tracking setup",
      "5x revisi ringan",
      "CTA Form WhatsApp",
      "Desain responsif (HP, tablet, desktop)",
      "Copywriting High Convert",
      "Termasuk Artikel SEO",
      "Free SSL Certificate (HTTPS)",
      "Live Chat AI",
      "Gratis domain & hosting 1 tahun",
      "Akun Google My Business (Google Maps)",
      "Gratis Meta Ads",
      "Gratis Setup Google Search Console",
      "Gratis Setup Google Analytics",
    ],
    cta: "Ambil Paket Growth",
    waMessage:
      "Halo Mas Nanang, saya tertarik Paket Growth (Rp2.000.000) yang sudah lengkap sama Meta Ads & Google setup. Boleh info detailnya?",
  },
  {
    id: "premium",
    name: "Paket Premium Custom",
    price: "Custom",
    customLabel: "Sesuai Permintaan",
    priceNote: "Untuk harga bisa disesuaikan permintaan & kebutuhan usaha Anda.",
    tagline: "Buat usaha AC yang layanannya banyak, punya beberapa tim, dan mau kampanye lebih matang.",
    popular: false,
    leadIn: "Seluruh fasilitas unggulan:",
    features: [
      "Website portfolio lebih rapi & lengkap",
      "Setup Meta Ads (2 campaign angle)",
      "Optimasi awal kampanye iklan",
      "2-3 copy iklan kreatif",
      "Targeting audience lokal",
      "Basic pixel & tracking setup",
      "Copywriting High Convert lebih kuat & persuasif",
      "CTA Form WhatsApp + form lead",
      "10x revisi",
      "Desain responsif (HP, tablet, desktop)",
      "Artikel SEO sesuai permintaan",
      "Free SSL Certificate (HTTPS)",
      "Live Chat AI",
      "Gratis domain & hosting 1 tahun",
      "Akun Google My Business (Google Maps)",
      "Gratis Meta Ads",
      "Gratis Setup Google Search Console",
      "Gratis Setup Google Analytics",
    ],
    cta: "Diskusikan Paket Premium",
    waMessage:
      "Halo Mas Nanang, saya mau tanya dan sesuaikan kebutuhan untuk Paket Premium Custom usaha service AC saya.",
  },
];

export const PRICING_NOTES: string[] = [
  "Gratis domain & hosting 1 tahun, Free SSL HTTPS, dan Live Chat AI di semua paket.",
  "Termasuk pembuatan Akun Google My Business (Google Maps) & Gratis Meta Ads.",
  "Bisa bayar lewat transfer bank, QRIS, atau e-wallet (DP 50%, lunas setelah jadi).",
];
