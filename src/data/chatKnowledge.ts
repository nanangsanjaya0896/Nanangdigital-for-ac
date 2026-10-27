import { BUSINESS } from "./business";
import { SERVICES_BY_LANG } from "./services";
import { PLANS_BY_LANG, PRICING_NOTES_BY_LANG } from "./plans";
import type { Plan } from "./plans";
import { FAQ_BY_LANG } from "./faq";
import { PROCESS_STEPS_BY_LANG } from "./process";
import { BONUSES_BY_LANG } from "./bonuses";
import type { Locale } from "../i18n/LanguageContext";

/**
 * Basis pengetahuan Asisten AI NanangDigital.
 *
 * Seluruh fakta diambil langsung dari data website (paket, harga, FAQ, alur kerja, bonus),
 * jadi kalau harga atau isi paket diubah di `src/data/*.ts`, jawaban AI ikut berubah.
 * File server `server/chat-knowledge.generated.js` dibuat ulang otomatis saat `npm run build`.
 */

function priceLabel(plan: Plan, lang: Locale): string {
  if (plan.customLabel) {
    return lang === "id"
      ? `${plan.customLabel} (harga custom, dibahas di WhatsApp)`
      : `${plan.customLabel} (custom quote via WhatsApp)`;
  }
  return plan.price;
}

export function buildChatKnowledge(lang: Locale): string {
  const isId = lang === "id";
  const lines: string[] = [];

  lines.push(
    isId
      ? "PASAR: Indonesia, harga dalam Rupiah (IDR)."
      : "MARKET: International HVAC and AC contractors, prices in US dollars (USD)."
  );
  lines.push(
    isId
      ? `Brand ${BUSINESS.brand} dijalankan langsung oleh ${BUSINESS.founder} (${BUSINESS.role}). Setiap website dikerjakan sendiri oleh Mas Nanang, bukan dilempar ke tim lain.`
      : `${BUSINESS.brand} is run personally by ${BUSINESS.founder} (${BUSINESS.role}). Nanang builds every website himself, nothing is outsourced.`
  );
  lines.push(
    isId
      ? `Spesialisasi: website dan iklan untuk ${BUSINESS.niche.id}. Koordinasi seluruhnya lewat WhatsApp, jadi bisa melayani usaha di kota mana saja.`
      : `Specialty: websites and ads for ${BUSINESS.niche.en}. Everything is handled over WhatsApp, so clients can be anywhere.`
  );

  lines.push("", isId ? "LAYANAN:" : "SERVICES:");
  for (const service of SERVICES_BY_LANG[lang]) {
    lines.push(`- ${service.title}: ${service.description}`);
  }

  lines.push("", isId ? "PAKET DAN HARGA:" : "PACKAGES AND PRICING:");
  for (const plan of PLANS_BY_LANG[lang]) {
    const popular = plan.popular ? (isId ? " (paling populer)" : " (most popular)") : "";
    lines.push(`- ${plan.name}: ${priceLabel(plan, lang)}${popular}. ${plan.tagline} ${plan.priceNote}`);
    lines.push(`  ${isId ? "Isi paket" : "Includes"}: ${plan.features.join("; ")}.`);
  }
  for (const note of PRICING_NOTES_BY_LANG[lang]) {
    lines.push(`- ${note}`);
  }

  lines.push("", isId ? "ALUR KERJA:" : "PROCESS:");
  PROCESS_STEPS_BY_LANG[lang].forEach((step, index) => {
    lines.push(`${index + 1}. ${step.title}: ${step.description}`);
  });

  lines.push("", isId ? "BONUS GRATIS DI SEMUA PAKET:" : "FREE BONUSES IN EVERY PACKAGE:");
  for (const bonus of BONUSES_BY_LANG[lang]) {
    lines.push(`- ${bonus.title}: ${bonus.description}`);
  }

  lines.push("", isId ? "PERTANYAAN YANG SERING DITANYAKAN:" : "FREQUENTLY ASKED QUESTIONS:");
  for (const item of FAQ_BY_LANG[lang]) {
    lines.push(`${isId ? "T" : "Q"}: ${item.question}`);
    lines.push(`${isId ? "J" : "A"}: ${item.answer}`);
  }

  lines.push("", isId ? "CATATAN PENTING:" : "IMPORTANT NOTES:");
  if (isId) {
    lines.push(
      "- \"No Artikel\" artinya paket tidak termasuk penulisan artikel blog.",
      "- \"Gratis Meta Ads\" artinya bantuan setup iklan Facebook dan Instagram. Website tidak menyebutkan apakah saldo iklan yang dibayar ke Meta sudah termasuk, jadi hal itu dijelaskan langsung oleh Mas Nanang di WhatsApp.",
      "- Contoh tampilan di bagian Karya adalah demo dan konsep desain, bukan proyek klien sungguhan. Nama usaha, warna, foto, dan tarif nanti disesuaikan dengan usaha klien.",
      "- Website juga punya halaman Panduan berisi artikel gratis seputar promosi usaha service AC dan cara daftar di Google Maps.",
      "- Pemesanan, harga Paket Premium Custom, jadwal, dan biaya perpanjangan domain dikonfirmasi lewat tombol WhatsApp di bawah chat."
    );
  } else {
    lines.push(
      "- \"No blog articles included\" means blog article writing is not part of the package.",
      "- \"Complimentary Meta Ads setup\" means help setting up Facebook and Instagram ad campaigns. The site does not say whether the ad budget paid to Meta is included, so Nanang explains ad budget directly on WhatsApp.",
      "- The examples in the portfolio section are demos and design concepts, not real client projects. Branding, photos, and pricing are customized for each client.",
      "- The site also has a free Guides section with articles about marketing an HVAC / AC service business.",
      "- Orders, Premium Custom quotes, scheduling, and domain renewal costs are confirmed through the WhatsApp button below the chat."
    );
  }

  return lines.join("\n");
}

/** Dipakai oleh skrip sinkronisasi server dan middleware dev Vite. */
export function buildChatKnowledgeBundle(): Record<Locale, string> {
  return {
    id: buildChatKnowledge("id"),
    en: buildChatKnowledge("en"),
  };
}
