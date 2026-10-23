import type { Locale } from "../i18n/LanguageContext";

/**
 * Data tiga paket jasa pembuatan website NanangDigital (Indonesia IDR & Global USD).
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

export const PLANS_BY_LANG: Record<Locale, Plan[]> = {
  id: [
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
        "No Artikel",
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
        "No Artikel",
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
  ],
  en: [
    {
      id: "basic",
      name: "Basic Package",
      price: "$299",
      priceNote: "One-time fee. Includes 1-year domain & hosting, SSL HTTPS, and Google Business Profile.",
      tagline: "Built for solo HVAC techs and local AC shops launching a credible booking website.",
      popular: false,
      leadIn: "Everything included:",
      features: [
        "1 high-converting HVAC landing page / portfolio site",
        "Pre-filled WhatsApp / Lead Inquiry CTA Form",
        "Mobile-first responsive design (Phone, Tablet, Desktop)",
        "High-converting service copywriting done for you",
        "3 minor revision rounds",
        "No blog articles included",
        "Free SSL Certificate (HTTPS)",
        "AI Live Chat assistant",
        "Free custom domain & fast hosting for 1st year",
        "Google Business Profile (Google Maps) setup",
        "Complimentary starter Meta Ads setup",
      ],
      cta: "Start Basic ($299)",
      waMessage:
        "Hi Nanang, I'm interested in the Basic Package ($299 USD) for my HVAC / AC business. Can we discuss the details?",
    },
    {
      id: "growth",
      name: "Growth Package",
      price: "$449",
      priceNote: "Complete package with Local Meta Ads setup, Google Search Console, & Google Analytics 4.",
      tagline: "Best value for HVAC contractors ready to generate local homeowner calls right away.",
      popular: true,
      leadIn: "Full growth stack included:",
      features: [
        "Professional HVAC & AC company website",
        "Meta Ads setup (1 local lead campaign)",
        "2-3 high-converting ad copy & creative angles",
        "Local service-radius audience targeting",
        "Meta Pixel & conversion tracking setup",
        "5 minor revision rounds",
        "Pre-filled WhatsApp / Lead Inquiry CTA Form",
        "Mobile-first responsive design (Phone, Tablet, Desktop)",
        "High-converting service copywriting done for you",
        "No blog articles included",
        "Free SSL Certificate (HTTPS)",
        "AI Live Chat assistant",
        "Free custom domain & fast hosting for 1st year",
        "Google Business Profile (Google Maps) setup",
        "Complimentary Meta Ads launch setup",
        "Free Google Search Console setup",
        "Free Google Analytics 4 setup",
      ],
      cta: "Start Growth ($449)",
      waMessage:
        "Hi Nanang, I'm interested in the Growth Package ($449 USD) with Website + Meta Ads + Google setup for my HVAC business.",
    },
    {
      id: "premium",
      name: "Premium Custom",
      price: "Custom",
      customLabel: "Custom Quote",
      priceNote: "Tailored pricing based on your service locations, pages, and campaign scope.",
      tagline: "Built for multi-van HVAC companies expanding across multiple cities or service lines.",
      popular: false,
      leadIn: "All flagship deliverables:",
      features: [
        "Expanded multi-section HVAC portfolio website",
        "Meta Ads setup (2 distinct campaign angles)",
        "Early-stage campaign optimization & tuning",
        "2-3 high-converting ad copy & creative angles",
        "Local service-radius audience targeting",
        "Meta Pixel & conversion tracking setup",
        "Deep persuasive sales copywriting",
        "Instant WhatsApp CTA + structured booking lead form",
        "Up to 10 revision rounds",
        "Mobile-first responsive design (Phone, Tablet, Desktop)",
        "No blog articles included",
        "Free SSL Certificate (HTTPS)",
        "AI Live Chat assistant",
        "Free custom domain & fast hosting for 1st year",
        "Google Business Profile (Google Maps) setup",
        "Complimentary Meta Ads management kickoff",
        "Free Google Search Console setup",
        "Free Google Analytics 4 setup",
      ],
      cta: "Request Custom Quote",
      waMessage:
        "Hi Nanang, I'd like to request a custom quote for the Premium Custom HVAC Website & Ads package.",
    },
  ],
};

export const PLANS: Plan[] = PLANS_BY_LANG.id;

export const PRICING_NOTES_BY_LANG: Record<Locale, string[]> = {
  id: [
    "Gratis domain & hosting 1 tahun, Free SSL HTTPS, dan Live Chat AI di semua paket.",
    "Termasuk pembuatan Akun Google My Business (Google Maps) & Gratis Meta Ads.",
    "Bisa bayar lewat transfer bank, QRIS, atau e-wallet (DP 50%, lunas setelah jadi).",
  ],
  en: [
    "Free 1st-year domain & hosting, SSL HTTPS, and AI Live Chat included in every plan.",
    "Includes Google Business Profile (Maps) setup & Meta Ads kickoff.",
    "Easy international payment via Wise, PayPal, or Bank Transfer (50% deposit, 50% on approval).",
  ],
};

export const PRICING_NOTES = PRICING_NOTES_BY_LANG.id;
