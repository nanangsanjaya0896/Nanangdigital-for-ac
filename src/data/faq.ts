import type { Locale } from "../i18n/LanguageContext";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_BY_LANG: Record<Locale, FaqItem[]> = {
  id: [
    {
      id: "paket",
      question: "Apa saja yang sudah didapat kalau pesan paket website di sini?",
      answer:
        "Semua paket sudah termasuk pembuatan website responsif, copywriting high convert, CTA Form WhatsApp, Free SSL (HTTPS), Live Chat AI, domain & hosting gratis 1 tahun, Akun Google My Business (Google Maps), serta Gratis Meta Ads. Khusus Paket Growth dan Paket Premium Custom juga sudah termasuk setup Google Search Console, Google Analytics, Pixel tracking, dan materi iklan kreatif.",
    },
    {
      id: "waktu",
      question: "Berapa hari pengerjaan sampai websitenya jadi?",
      answer:
        "Rata-rata 3 sampai 5 hari kerja terhitung sejak data dasar usaha Anda (nama usaha, daftar layanan, area kerja, foto jika ada, dan nomor WhatsApp) saya terima. Untuk Paket Premium Custom yang cakupannya lebih lengkap biasanya sekitar 5 sampai 7 hari kerja.",
    },
    {
      id: "domain",
      question: "Apakah sudah termasuk biaya domain dan hosting?",
      answer:
        "Sudah. Tahun pertama domain dan hosting sudah masuk ke harga paket, lengkap dengan Free SSL Certificate (HTTPS), jadi Anda tinggal terima beres. Biaya perpanjangan tahun depannya juga saya infokan di awal saat ngobrol di WhatsApp supaya sama-sama enak dan transparan.",
    },
    {
      id: "pembayaran",
      question: "Bagaimana cara bayarnya? Aman tidak?",
      answer:
        "Pembayaran dibagi dua tahap. Awal pengerjaan cukup DP 50% dulu, lalu sisa 50% baru dilunasi setelah website selesai dikerjakan dan Anda cek sendiri hasilnya. Pembayaran bisa lewat transfer bank, QRIS, atau e-wallet sesuai kesepakatan di chat.",
    },
    {
      id: "revisi",
      question: "Kalau ada bagian tulisan atau tampilan yang kurang srek, bisa minta ubah?",
      answer:
        "Bisa banget. Paket Basic mendapat kuota 3x revisi ringan, Paket Growth mendapat 5x revisi ringan, sedangkan Paket Premium Custom mendapat hingga 10x revisi. Anda bebas minta sesuaikan teks layanan, tarif, foto, atau urutan bagian halaman sebelum website dinaikkan penuh.",
    },
    {
      id: "konsultasi",
      question: "Boleh tanya-tanya dulu di WhatsApp walaupun belum pasti pesan sekarang?",
      answer:
        "Santai saja, boleh banget. Chat dulu ceritakan kondisi usaha AC Anda sekarang dan daerah mana saja yang dilayani. Saya bantu kasih saran jujur paket mana yang paling masuk akal buat kebutuhan Anda saat ini, tanpa paksaan harus langsung jadi.",
    },
  ],
  en: [
    {
      id: "paket",
      question: "What exactly is included when I order a website package?",
      answer:
        "Every plan includes a mobile-first HVAC website, conversion copywriting, instant WhatsApp / lead inquiry form, Free SSL (HTTPS), AI Live Chat, 1 full year of custom domain & fast hosting, Google Business Profile setup, and starter Meta Ads setup. Growth ($449) and Premium Custom also include Google Search Console, Google Analytics 4, Meta Pixel tracking, and ad creative copy.",
    },
    {
      id: "waktu",
      question: "How fast is the turnaround time?",
      answer:
        "Most Basic and Growth HVAC websites go live within 3 to 5 business days once I receive your company details (business name, services offered, coverage cities, phone/WhatsApp number, and any job photos). Larger Premium Custom builds typically take 5 to 7 business days.",
    },
    {
      id: "domain",
      question: "Are the custom domain name and hosting really included?",
      answer:
        "Yes. Your first full year of custom domain (.com or local extension) and high-speed hosting with SSL HTTPS are 100% covered in your package price with zero hidden setup fees. Annual renewal afterward is completely transparent and affordable.",
    },
    {
      id: "pembayaran",
      question: "How do international payments work, and is my deposit safe?",
      answer:
        "Payments are split 50/50 for complete peace of mind: 50% deposit to kick off the build, and the remaining 50% only after you preview and approve the finished live website on your own phone and desktop. International clients can pay easily via Wise, PayPal, or bank transfer.",
    },
    {
      id: "revisi",
      question: "Can I request changes to copy, colors, or layout before launch?",
      answer:
        "Of course. Basic includes 3 revision rounds, Growth includes 5 revision rounds, and Premium Custom includes up to 10 revision rounds so your services, pricing notes, photos, and branding feel 100% right before launch.",
    },
    {
      id: "konsultasi",
      question: "Can we chat first on WhatsApp even if I'm still deciding?",
      answer:
        "Anytime. Send a quick message on WhatsApp sharing your city, services, and goals. I'll give you straightforward advice on what fits your stage best with zero pressure.",
    },
  ],
};

export const FAQ_ITEMS: FaqItem[] = FAQ_BY_LANG.id;
