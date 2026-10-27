import { PLANS_BY_LANG, PRICING_NOTES_BY_LANG } from "../data/plans";
import type { Plan } from "../data/plans";
import { FAQ_BY_LANG } from "../data/faq";
import { PROCESS_STEPS_BY_LANG } from "../data/process";
import { BONUSES_BY_LANG } from "../data/bonuses";
import { SERVICES_BY_LANG } from "../data/services";
import type { Locale } from "../i18n/LanguageContext";

/**
 * Mesin jawaban bawaan Live AI Chat.
 *
 * Dipakai saat API key AI belum dipasang, kuota AI habis, atau koneksi ke AI gagal,
 * supaya pengunjung tetap dapat jawaban instan. Semua fakta diambil dari data website,
 * jadi harga dan isi paket selalu sama dengan yang tampil di halaman.
 */

export interface LocalReply {
  text: string;
  suggestWhatsApp: boolean;
  quickReplies: string[];
}

export const STARTER_QUICK_REPLIES: Record<Locale, string[]> = {
  id: ["Lihat harga paket", "Bedanya Basic dan Growth?", "Berapa lama jadinya?", "Cara pembayaran"],
  en: ["See pricing", "Basic vs Growth?", "How long does it take?", "Payment options"],
};

type IntentId =
  | "compare"
  | "timeline"
  | "payment"
  | "domain"
  | "revision"
  | "requirements"
  | "basic"
  | "growth"
  | "premium"
  | "ads"
  | "google"
  | "process"
  | "portfolio"
  | "international"
  | "chatbot"
  | "bonus"
  | "included"
  | "pricing"
  | "contact"
  | "thanks"
  | "greeting";

/** Kata kunci berawalan "~" dicocokkan sebagai potongan kata (contoh: "~bayar" cocok dengan "pembayaran"). */
type Keyword = [string, number];

/** Urutan array = prioritas saat skor sama. */
const INTENT_RULES: { id: IntentId; keywords: Keyword[] }[] = [
  {
    id: "compare",
    keywords: [
      ["beda", 3], ["bedanya", 3], ["perbedaan", 3], ["dibanding", 3], ["bandingkan", 3], ["vs", 3],
      ["versus", 3], ["mana yang", 2.5], ["yang mana", 2.5], ["rekomendasi", 3], ["rekomen", 3],
      ["sarankan", 2.5], ["saran paket", 3], ["compare", 3], ["comparison", 3], ["difference", 3],
      ["which", 2], ["recommend", 3], ["better", 2], ["best for", 2.5],
    ],
  },
  {
    id: "timeline",
    keywords: [
      ["berapa lama", 3.5], ["lama", 1.5], ["berapa hari", 3.5], ["durasi", 3], ["kapan jadi", 3.5],
      ["kapan selesai", 3.5], ["kapan", 1.5], ["selesai", 1.5], ["jadinya", 1.5], ["pengerjaan", 2],
      ["deadline", 3], ["how long", 3.5], ["timeline", 3], ["turnaround", 3.5], ["days", 1.5],
      ["how fast", 3], ["when", 1], ["ready", 1],
    ],
  },
  {
    id: "payment",
    keywords: [
      ["~bayar", 3], ["dp", 3], ["uang muka", 3], ["transfer", 2.5], ["qris", 3], ["e wallet", 3],
      ["ewallet", 3], ["ovo", 2], ["gopay", 2], ["~cicil", 3], ["lunas", 2.5], ["pelunasan", 2.5],
      ["termin", 2.5], ["payment", 3], ["pay", 2.5], ["deposit", 3], ["paypal", 3], ["wise", 3],
      ["invoice", 2.5], ["refund", 2.5], ["installment", 3],
    ],
  },
  {
    id: "domain",
    keywords: [
      ["domain", 3], ["hosting", 3], ["ssl", 3], ["https", 2.5], ["~perpanjang", 3], ["renewal", 3],
      ["renew", 3], ["tahun kedua", 3], ["tahun depan", 2], ["second year", 3], ["server", 1.5],
    ],
  },
  {
    id: "revision",
    keywords: [
      ["~revisi", 3], ["revision", 3], ["revisions", 3], ["ubah", 2], ["diubah", 2], ["ganti", 1.5],
      ["edit", 2], ["change", 2], ["changes", 2], ["perbaiki", 2], ["tweak", 2],
    ],
  },
  {
    id: "requirements",
    keywords: [
      ["data apa", 3.5], ["butuh apa", 3], ["perlu apa", 3], ["~siapkan", 3], ["~disiapin", 3],
      ["syarat", 3], ["persyaratan", 3], ["what do you need", 3.5], ["what do i need", 3.5],
      ["requirements", 3], ["prepare", 3],
    ],
  },
  { id: "basic", keywords: [["basic", 3], ["termurah", 2.5], ["paling murah", 2.5], ["cheapest", 2.5], ["~1 500 000", 3], ["~299", 3]] },
  { id: "growth", keywords: [["growth", 3], ["~2 000 000", 3], ["~449", 3], ["paling populer", 2.5], ["most popular", 2.5]] },
  { id: "premium", keywords: [["premium", 3], ["custom", 2.5], ["kustom", 2.5], ["paling lengkap", 2.5], ["most complete", 2.5]] },
  {
    id: "ads",
    keywords: [
      ["~iklan", 3], ["ads", 3], ["advertising", 3], ["meta", 2.5], ["facebook", 2.5], ["fb", 2],
      ["instagram", 2.5], ["ig", 2], ["campaign", 2.5], ["kampanye", 2.5], ["budget", 2], ["saldo", 2.5],
      ["ad spend", 3], ["ad budget", 3.5], ["pixel", 2], ["promosi", 2], ["marketing", 2],
    ],
  },
  {
    id: "google",
    keywords: [
      ["google", 2.5], ["maps", 3], ["gmb", 3], ["google bisnis", 3], ["business profile", 3], ["seo", 3],
      ["search console", 3], ["analytics", 3], ["ranking", 2.5], ["halaman 1", 2.5], ["page 1", 2.5],
      ["pencarian", 2], ["search", 1.5],
    ],
  },
  {
    id: "process",
    keywords: [
      ["cara pesan", 3.5], ["cara order", 3.5], ["pesan", 1.5], ["order", 2], ["mulai", 2], ["memulai", 2],
      ["proses", 2.5], ["prosesnya", 2.5], ["langkah", 2.5], ["alur", 3], ["tahapan", 3],
      ["how to start", 3.5], ["get started", 3.5], ["how to order", 3.5], ["start", 1.5], ["process", 3],
      ["steps", 2.5], ["onboarding", 3],
    ],
  },
  {
    id: "portfolio",
    keywords: [
      ["contoh", 3], ["portofolio", 3], ["portfolio", 3], ["hasil", 2], ["karya", 3], ["demo", 3],
      ["example", 3], ["examples", 3], ["sample", 3], ["samples", 3], ["referensi", 2.5],
    ],
  },
  {
    id: "international",
    keywords: [
      ["luar negeri", 3.5], ["international", 3], ["internasional", 3], ["overseas", 3], ["abroad", 3],
      ["usa", 3], ["america", 3], ["amerika", 3], ["australia", 3], ["uk", 2], ["inggris", 2],
      ["europe", 3], ["eropa", 3], ["singapore", 3], ["singapura", 3], ["canada", 3], ["usd", 2.5],
      ["dollar", 2.5], ["dolar", 2.5], ["luar kota", 3], ["kota lain", 2.5], ["seluruh indonesia", 3],
      ["jarak jauh", 3], ["remote", 3], ["anywhere", 2.5], ["lokasi", 1.5], ["location", 1.5],
      ["where are you", 2.5],
    ],
  },
  {
    id: "chatbot",
    keywords: [
      ["live chat", 3.5], ["chat ai", 3.5], ["ai chat", 3.5], ["chatbot", 3.5], ["bot", 2], ["ai", 2],
      ["asisten", 2], ["assistant", 2], ["robot", 2],
    ],
  },
  { id: "bonus", keywords: [["bonus", 3.5], ["bonuses", 3.5], ["hadiah", 2], ["freebies", 3]] },
  {
    id: "included",
    keywords: [
      ["dapat apa", 3.5], ["termasuk apa", 3.5], ["sudah termasuk", 2.5], ["termasuk", 2], ["fasilitas", 3],
      ["fitur", 2.5], ["isi paket", 3], ["include", 2.5], ["includes", 2.5], ["included", 2.5],
      ["what do i get", 3.5], ["features", 2.5], ["what s in", 2.5],
    ],
  },
  {
    id: "pricing",
    keywords: [
      ["harga", 3], ["harganya", 3], ["biaya", 3], ["biayanya", 3], ["tarif", 3], ["price", 3],
      ["prices", 3], ["pricing", 3], ["cost", 3], ["costs", 3], ["how much", 3], ["berapa", 1],
      ["murah", 2], ["mahal", 2], ["paket", 1], ["package", 1], ["packages", 1.5], ["fee", 2.5], ["quote", 2],
    ],
  },
  {
    id: "contact",
    keywords: [
      ["whatsapp", 3], ["wa", 3], ["admin", 3], ["cs", 2.5], ["manusia", 3], ["nanang", 2.5],
      ["telepon", 3], ["telpon", 3], ["hubungi", 3], ["kontak", 3], ["contact", 3], ["call", 2.5],
      ["phone", 3], ["human", 3], ["real person", 3.5], ["talk to", 3], ["speak", 2.5],
    ],
  },
  {
    id: "thanks",
    keywords: [
      ["makasih", 3.5], ["terima kasih", 3.5], ["trims", 3], ["thanks", 3.5], ["thank you", 3.5],
      ["thx", 3], ["tq", 3], ["mantap", 2], ["sip", 1.5],
    ],
  },
  {
    id: "greeting",
    keywords: [
      ["halo", 2], ["hallo", 2], ["hai", 2], ["hi", 2], ["hello", 2], ["hey", 2], ["pagi", 1.5],
      ["siang", 1.5], ["sore", 1.5], ["malam", 1.5], ["assalamualaikum", 2.5], ["permisi", 1.5],
      ["good morning", 2], ["good afternoon", 2], ["good evening", 2],
    ],
  },
];

const PLAN_INTENTS: IntentId[] = ["basic", "growth", "premium"];
const GENERIC_INTENTS: IntentId[] = ["pricing", "included", "process", "contact", "greeting"];

const EN_HINTS = new Set([
  "the", "is", "are", "what", "how", "much", "does", "do", "you", "your", "can", "i", "my", "me",
  "price", "pricing", "cost", "long", "payment", "pay", "thanks", "thank", "which", "need", "want",
  "included", "include", "hello", "quote", "deposit", "timeline", "about", "website", "get",
]);
const ID_HINTS = new Set([
  "apa", "berapa", "bisa", "yang", "saya", "aku", "harga", "biaya", "gimana", "bagaimana", "dong",
  "ya", "kak", "mas", "min", "lama", "bayar", "halo", "terima", "kasih", "makasih", "mau", "ingin",
  "untuk", "dan", "itu", "ini", "nggak", "gak", "tidak", "sudah", "udah", "kalau", "kalo", "ada",
  "pakai", "buat", "jadi", "berapaan", "dapat", "bedanya", "paket", "usaha",
]);

function normalize(text: string): string {
  const cleaned = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9$]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return ` ${cleaned} `;
}

function matches(normalizedText: string, keyword: string): boolean {
  if (keyword.startsWith("~")) {
    return normalizedText.includes(keyword.slice(1));
  }
  if (normalizedText.includes(` ${keyword} `)) return true;
  // Akhiran "-nya" yang umum di bahasa Indonesia: "bonusnya", "domainnya", "revisinya", "iklannya"
  return !keyword.includes(" ") && normalizedText.includes(` ${keyword}nya `);
}

/** Tebak bahasa pesan pengunjung supaya jawaban mengikuti bahasa yang dipakai. */
export function detectReplyLang(text: string, fallback: Locale): Locale {
  const words = normalize(text).trim().split(" ").filter(Boolean);
  let en = 0;
  let id = 0;
  for (const word of words) {
    if (EN_HINTS.has(word)) en += 1;
    if (ID_HINTS.has(word)) id += 1;
  }
  if (en > id) return "en";
  if (id > en) return "id";
  return fallback;
}

function scoreIntents(normalizedText: string): Map<IntentId, number> {
  const scores = new Map<IntentId, number>();
  for (const rule of INTENT_RULES) {
    let score = 0;
    for (const [keyword, weight] of rule.keywords) {
      if (matches(normalizedText, keyword)) score += weight;
    }
    if (score > 0) scores.set(rule.id, score);
  }
  return scores;
}

function pickIntent(scores: Map<IntentId, number>): IntentId | null {
  let best: IntentId | null = null;
  let bestScore = 0;
  for (const rule of INTENT_RULES) {
    const score = scores.get(rule.id) ?? 0;
    if (score > bestScore) {
      best = rule.id;
      bestScore = score;
    }
  }
  if (!best) return null;

  const mentionedPlans = PLAN_INTENTS.filter((id) => (scores.get(id) ?? 0) >= 2.5);
  if (mentionedPlans.length >= 2 && (GENERIC_INTENTS.includes(best) || PLAN_INTENTS.includes(best))) {
    return "compare";
  }
  if (mentionedPlans.length === 1 && GENERIC_INTENTS.includes(best)) {
    return mentionedPlans[0];
  }
  return best;
}

const STOPWORDS = new Set([
  "apa", "yang", "dan", "di", "ke", "dari", "ini", "itu", "saya", "anda", "kalau", "bisa", "ada",
  "untuk", "dengan", "sudah", "the", "and", "for", "you", "your", "can", "what", "how", "is", "are",
]);

function tokens(text: string): string[] {
  return normalize(text)
    .trim()
    .split(" ")
    .filter((word) => word.length >= 3 && !STOPWORDS.has(word));
}

/** Cocokkan ke FAQ berdasarkan kemiripan kata, untuk pertanyaan yang tidak kena kata kunci. */
function matchFaq(text: string, lang: Locale): string | null {
  const queryTokens = new Set(tokens(text));
  if (queryTokens.size === 0) return null;
  let bestAnswer: string | null = null;
  let bestScore = 0;
  for (const item of FAQ_BY_LANG[lang]) {
    const questionTokens = new Set(tokens(item.question));
    let shared = 0;
    for (const token of queryTokens) {
      if (questionTokens.has(token)) shared += 1;
    }
    const score = shared / Math.max(3, Math.min(queryTokens.size, questionTokens.size));
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = item.answer;
    }
  }
  return bestScore >= 0.5 ? bestAnswer : null;
}

function planPrice(plan: Plan, lang: Locale): string {
  if (plan.customLabel) return lang === "id" ? "sesuai permintaan" : "custom quote";
  return plan.price;
}

function findPlan(lang: Locale, id: Plan["id"]): Plan {
  const plans = PLANS_BY_LANG[lang];
  return plans.find((plan) => plan.id === id) ?? plans[0];
}

function faqAnswer(lang: Locale, id: string): string {
  return FAQ_BY_LANG[lang].find((item) => item.id === id)?.answer ?? "";
}

function halfOfPrice(plan: Plan, lang: Locale): string | null {
  if (plan.customLabel) return null;
  const digits = Number(plan.price.replace(/[^\d]/g, ""));
  if (!digits) return null;
  if (lang === "id") {
    return `Rp${Math.round(digits / 2).toLocaleString("id-ID")}`;
  }
  const half = digits / 2;
  return `$${Number.isInteger(half) ? half : half.toFixed(2)}`;
}

function planDetail(plan: Plan, lang: Locale): LocalReply {
  const isId = lang === "id";
  const features = plan.features.filter((feature) => !/^no\s/i.test(feature));
  const shown = features.slice(0, 7);
  const rest = features.length - shown.length;
  const others = PLANS_BY_LANG[lang].filter((p) => p.id !== plan.id);
  const lines = [
    `${plan.name} (${planPrice(plan, lang)}). ${plan.tagline}`,
    "",
    isId ? "Yang didapat:" : "Highlights:",
    ...shown.map((feature) => `- ${feature}`),
    ...(rest > 0 ? [isId ? `- dan ${rest} fasilitas lainnya` : `- plus ${rest} more`] : []),
    "",
    plan.priceNote,
  ];
  return {
    text: lines.join("\n"),
    suggestWhatsApp: true,
    quickReplies: [
      ...others.map((p) => (isId ? `Isi ${p.name}` : `What's in ${p.name}?`)),
      isId ? "Cara pesan" : "How to get started",
    ],
  };
}

function buildReply(intent: IntentId | null, text: string, lang: Locale, scores: Map<IntentId, number>): LocalReply {
  const isId = lang === "id";
  const plans = PLANS_BY_LANG[lang];
  const starters = STARTER_QUICK_REPLIES[lang];

  switch (intent) {
    case "greeting":
      return {
        text: isId
          ? "Halo, selamat datang di NanangDigital! Saya asisten AI yang siap bantu jawab soal paket website dan iklan untuk usaha AC Anda. Mau tanya soal apa dulu?"
          : "Hi, welcome to NanangDigital! I'm the AI assistant, here to answer questions about websites and ads for your HVAC business. What would you like to know?",
        suggestWhatsApp: false,
        quickReplies: starters,
      };

    case "pricing":
      return {
        text: [
          isId ? "Ada 3 paket website untuk usaha AC:" : "There are 3 packages:",
          ...plans.map(
            (plan) =>
              `- ${plan.name}: ${planPrice(plan, lang)}${plan.popular ? (isId ? " (paling populer)" : " (most popular)") : ""}`
          ),
          "",
          PRICING_NOTES_BY_LANG[lang][0],
          "",
          isId ? "Mau saya jelaskan bedanya?" : "Want me to explain the difference?",
        ].join("\n"),
        suggestWhatsApp: false,
        quickReplies: isId
          ? ["Bedanya Basic dan Growth?", "Isi Paket Growth", "Cara pembayaran"]
          : ["Basic vs Growth?", "What's in Growth?", "Payment options"],
      };

    case "basic":
    case "growth":
    case "premium":
      return planDetail(findPlan(lang, intent), lang);

    case "compare":
      return {
        text: [
          isId ? "Gampangnya begini:" : "In short:",
          ...plans.map((plan) => `- ${plan.name} (${planPrice(plan, lang)}): ${plan.tagline}`),
          "",
          isId
            ? "Kalau masih ragu, ceritakan kondisi usaha Anda ke Mas Nanang di WhatsApp, nanti dibantu pilihkan yang paling pas."
            : "Still unsure? Tell Nanang about your business on WhatsApp and he'll recommend the best fit.",
        ].join("\n"),
        suggestWhatsApp: true,
        quickReplies: plans.map((plan) => (isId ? `Isi ${plan.name}` : `What's in ${plan.name}?`)),
      };

    case "timeline":
      return {
        text: faqAnswer(lang, "waktu"),
        suggestWhatsApp: false,
        quickReplies: isId ? ["Cara pesan", "Cara pembayaran"] : ["How to get started", "Payment options"],
      };

    case "payment": {
      const mentioned = PLAN_INTENTS.find((id) => (scores.get(id) ?? 0) >= 2.5) as Plan["id"] | undefined;
      const plan = mentioned ? findPlan(lang, mentioned) : null;
      const half = plan ? halfOfPrice(plan, lang) : null;
      const extra =
        plan && half
          ? isId
            ? `\n\nUntuk ${plan.name}, DP 50% berarti ${half} di awal dan ${half} saat pelunasan.`
            : `\n\nFor the ${plan.name}, the 50% deposit is ${half} upfront and ${half} on approval.`
          : "";
      return {
        text: `${faqAnswer(lang, "pembayaran")}${extra}`,
        suggestWhatsApp: false,
        quickReplies: isId ? ["Lihat harga paket", "Berapa lama jadinya?"] : ["See pricing", "How long does it take?"],
      };
    }

    case "domain":
      return {
        text: faqAnswer(lang, "domain"),
        suggestWhatsApp: true,
        quickReplies: isId ? ["Lihat harga paket", "Cara pembayaran"] : ["See pricing", "Payment options"],
      };

    case "revision":
      return {
        text: faqAnswer(lang, "revisi"),
        suggestWhatsApp: false,
        quickReplies: isId ? ["Bedanya Basic dan Growth?", "Cara pesan"] : ["Basic vs Growth?", "How to get started"],
      };

    case "requirements":
      return {
        text: isId
          ? "Cukup siapkan data dasar usaha: nama usaha, daftar layanan dan tarif, area kerja, foto hasil kerja kalau ada, dan nomor WhatsApp. Teks halamannya nanti ditulis oleh Mas Nanang, Anda tinggal cek hasilnya."
          : "Just send the basics: company name, services and pricing, service area, job photos if you have them, and your contact number. Nanang writes all the website copy for you.",
        suggestWhatsApp: true,
        quickReplies: isId ? ["Berapa lama jadinya?", "Cara pembayaran"] : ["How long does it take?", "Payment options"],
      };

    case "ads": {
      const service = SERVICES_BY_LANG[lang][1];
      const adPattern = isId ? /(setup meta ads|copy iklan|kampanye)/i : /(meta ads setup|ad copy|campaign optimization)/i;
      const adLines = plans
        .map((plan) => ({ plan, items: plan.features.filter((feature) => adPattern.test(feature)) }))
        .filter((entry) => entry.items.length > 0)
        .map((entry) => `- ${entry.plan.name}: ${entry.items.join(", ")}`);
      const budgetNote = isId
        ? "Soal saldo iklan yang dibayar ke Meta, nanti dijelaskan langsung oleh Mas Nanang di WhatsApp."
        : "The ad budget paid to Meta is discussed directly with Nanang on WhatsApp.";
      // Kalau yang ditanyakan saldo/budget iklan, jawaban langsungnya ditaruh paling atas
      const asksBudget = /\b(saldo|budget|spend|biaya iklan)/.test(normalize(text));
      const details = [service.description, ...(adLines.length ? ["", ...adLines] : [])];
      return {
        text: (asksBudget ? [budgetNote, "", ...details] : [...details, "", budgetNote]).join("\n"),
        suggestWhatsApp: true,
        quickReplies: isId ? ["Isi Paket Growth", "Lihat harga paket"] : ["What's in Growth?", "See pricing"],
      };
    }

    case "google":
      return {
        text: isId
          ? "Semua paket sudah termasuk pembuatan akun Google My Business (Google Maps) supaya usaha Anda lebih mudah ditemukan warga sekitar. Paket Growth dan Premium Custom juga dapat setup Google Search Console dan Google Analytics untuk memantau pengunjung website.\n\nAda juga artikel gratis cara daftar usaha AC di Google Maps di halaman Panduan."
          : "Every package includes Google Business Profile (Google Maps) setup so local homeowners can find you more easily. Growth and Premium Custom also include Google Search Console and Google Analytics 4 setup to track your website visitors.\n\nThere are free marketing guides in the Guides section too.",
        suggestWhatsApp: false,
        quickReplies: isId ? ["Bedanya Basic dan Growth?", "Lihat harga paket"] : ["Basic vs Growth?", "See pricing"],
      };

    case "process": {
      const steps = PROCESS_STEPS_BY_LANG[lang];
      return {
        text: [
          isId ? `Alur kerjanya ada ${steps.length} langkah:` : `The process has ${steps.length} steps:`,
          // Judul langkah di website ditulis dari sudut pandang Nanang ("Saya Kerjakan..."),
          // sedangkan di chat yang bicara adalah asisten, jadi "Saya" diganti "Mas Nanang".
          ...steps.map((step, index) => `${index + 1}. ${isId ? step.title.replace(/^Saya\s/, "Mas Nanang ") : step.title}`),
          "",
          isId
            ? "Langkah pertamanya cukup chat Mas Nanang lewat tombol WhatsApp di bawah."
            : "Step one is simply messaging Nanang with the WhatsApp button below.",
        ].join("\n"),
        suggestWhatsApp: true,
        quickReplies: isId ? ["Data apa yang perlu disiapkan?", "Cara pembayaran"] : ["What do you need from me?", "Payment options"],
      };
    }

    case "portfolio":
      return {
        text: isId
          ? "Contoh tampilannya bisa dilihat di bagian Karya di halaman ini. Itu contoh desain dan demo, nanti nama usaha, warna, foto, dan daftar tarifnya disesuaikan penuh dengan usaha Anda."
          : "You can browse sample designs in the Work section on this page. They're demos and design concepts, and your site gets fully customized with your own branding, photos, and pricing.",
        suggestWhatsApp: false,
        quickReplies: isId ? ["Lihat harga paket", "Berapa lama jadinya?"] : ["See pricing", "How long does it take?"],
      };

    case "international": {
      const usdList = PLANS_BY_LANG.en.map((plan) => `${plan.name} ${planPrice(plan, "en")}`).join(", ");
      return {
        text: isId
          ? `Bisa. Semua koordinasi lewat WhatsApp, jadi usaha Anda di kota mana pun tetap bisa dilayani. Untuk usaha AC atau HVAC di luar negeri, tersedia versi bahasa Inggris dengan harga dalam USD: ${usdList}.`
          : `Yes. Everything runs over WhatsApp, so Nanang works with HVAC and AC companies anywhere. Packages: ${usdList}.`,
        suggestWhatsApp: true,
        quickReplies: starters,
      };
    }

    case "chatbot":
      return {
        text: isId
          ? "Iya, saya asisten AI di website ini. Fitur Live Chat AI seperti ini juga sudah termasuk di semua paket, jadi website usaha AC Anda nanti bisa menjawab pertanyaan calon pelanggan kapan saja."
          : "Yes, I'm the AI assistant on this site. An AI Live Chat like this one is included in every package, so your HVAC website can answer customer questions around the clock.",
        suggestWhatsApp: false,
        quickReplies: isId ? ["Lihat harga paket", "Bedanya Basic dan Growth?"] : ["See pricing", "Basic vs Growth?"],
      };

    case "bonus":
      return {
        text: [
          isId ? "Semua paket dapat bonus gratis:" : "Every package comes with free bonuses:",
          ...BONUSES_BY_LANG[lang].map((bonus) => `- ${bonus.title}`),
        ].join("\n"),
        suggestWhatsApp: false,
        quickReplies: isId ? ["Lihat harga paket", "Cara pesan"] : ["See pricing", "How to get started"],
      };

    case "included":
      return {
        text: faqAnswer(lang, "paket"),
        suggestWhatsApp: false,
        quickReplies: isId ? ["Lihat harga paket", "Bedanya Basic dan Growth?"] : ["See pricing", "Basic vs Growth?"],
      };

    case "contact":
      return {
        text: isId
          ? "Tentu, Mas Nanang bisa langsung dihubungi lewat WhatsApp. Tekan tombol hijau di bawah, nanti ada form singkat supaya pesan Anda langsung rapi."
          : "Of course. You can reach Nanang directly on WhatsApp. Tap the green button below and a quick form will format your message for you.",
        suggestWhatsApp: true,
        quickReplies: [],
      };

    case "thanks":
      return {
        text: isId
          ? "Sama-sama! Kalau masih ada yang mau ditanyakan, tanya saja. Kalau sudah siap, tombol WhatsApp di bawah langsung terhubung ke Mas Nanang."
          : "You're welcome! Ask me anything else anytime. When you're ready, the WhatsApp button below connects you straight to Nanang.",
        suggestWhatsApp: true,
        quickReplies: [],
      };

    default: {
      const faq = matchFaq(text, lang);
      if (faq) {
        return { text: faq, suggestWhatsApp: true, quickReplies: starters };
      }
      return {
        text: isId
          ? "Maaf, untuk pertanyaan itu saya belum punya jawaban pastinya. Supaya infonya tidak keliru, langsung tanya Mas Nanang lewat tombol WhatsApp di bawah, atau pilih salah satu topik ini:"
          : "Sorry, I don't have a confirmed answer for that one. To get accurate info, ask Nanang with the WhatsApp button below, or pick one of these topics:",
        suggestWhatsApp: true,
        quickReplies: starters,
      };
    }
  }
}

/** Jawaban instan dari basis pengetahuan website (tanpa memanggil AI). */
export function getLocalReply(message: string, lang: Locale): LocalReply {
  const normalizedText = normalize(message);
  const scores = scoreIntents(normalizedText);
  const intent = pickIntent(scores);
  return buildReply(intent, message, lang, scores);
}
