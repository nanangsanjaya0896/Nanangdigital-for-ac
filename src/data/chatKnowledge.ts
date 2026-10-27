import { BUSINESS } from "./business";
import { SERVICES } from "./services";
import { PLANS, PRICING_NOTES } from "./plans";
import type { Plan } from "./plans";
import { FAQ_ITEMS } from "./faq";
import { PROCESS_STEPS } from "./process";
import { BONUSES } from "./bonuses";

/**
 * Basis pengetahuan Asisten AI NanangDigital.
 *
 * Seluruh fakta diambil langsung dari data website (paket, harga, FAQ, alur kerja, bonus),
 * jadi kalau harga atau isi paket diubah di `src/data/*.ts`, jawaban AI ikut berubah.
 * File server `server/chat-knowledge.generated.js` dibuat ulang otomatis saat `npm run build`.
 */

function priceLabel(plan: Plan): string {
  if (plan.customLabel) {
    return `${plan.customLabel} (harga custom, dibahas di WhatsApp)`;
  }
  return plan.price;
}

export function buildChatKnowledge(): string {
  const lines: string[] = [];

  lines.push("PASAR: Indonesia, harga dalam Rupiah (IDR).");
  lines.push(
    `Brand ${BUSINESS.brand} dijalankan langsung oleh ${BUSINESS.founder} (${BUSINESS.role}). Setiap website dikerjakan sendiri oleh Mas Nanang, bukan dilempar ke tim lain.`
  );
  lines.push(
    `Spesialisasi: website dan iklan untuk ${BUSINESS.niche}. Koordinasi seluruhnya lewat WhatsApp, jadi bisa melayani usaha di kota mana saja.`
  );

  lines.push("", "LAYANAN:");
  for (const service of SERVICES) {
    lines.push(`- ${service.title}: ${service.description}`);
  }

  lines.push("", "PAKET DAN HARGA:");
  for (const plan of PLANS) {
    const popular = plan.popular ? " (paling populer)" : "";
    lines.push(`- ${plan.name}: ${priceLabel(plan)}${popular}. ${plan.tagline} ${plan.priceNote}`);
    lines.push(`  Isi paket: ${plan.features.join("; ")}.`);
  }
  for (const note of PRICING_NOTES) {
    lines.push(`- ${note}`);
  }

  lines.push("", "ALUR KERJA:");
  PROCESS_STEPS.forEach((step, index) => {
    lines.push(`${index + 1}. ${step.title}: ${step.description}`);
  });

  lines.push("", "BONUS GRATIS DI SEMUA PAKET:");
  for (const bonus of BONUSES) {
    lines.push(`- ${bonus.title}: ${bonus.description}`);
  }

  lines.push("", "PERTANYAAN YANG SERING DITANYAKAN:");
  for (const item of FAQ_ITEMS) {
    lines.push(`T: ${item.question}`);
    lines.push(`J: ${item.answer}`);
  }

  lines.push("", "CATATAN PENTING:");
  lines.push(
    "- \"No Artikel\" artinya paket tidak termasuk penulisan artikel blog.",
    "- \"Gratis Meta Ads\" artinya bantuan setup iklan Facebook dan Instagram. Website tidak menyebutkan apakah saldo iklan yang dibayar ke Meta sudah termasuk, jadi hal itu dijelaskan langsung oleh Mas Nanang di WhatsApp.",
    "- Contoh tampilan di bagian Karya adalah demo dan konsep desain, bukan proyek klien sungguhan. Nama usaha, warna, foto, dan tarif nanti disesuaikan dengan usaha klien.",
    "- Website juga punya halaman Panduan berisi artikel gratis seputar promosi usaha service AC dan cara daftar di Google Maps.",
    "- Pemesanan, harga Paket Premium Custom, jadwal, dan biaya perpanjangan domain dikonfirmasi lewat tombol WhatsApp di bawah chat."
  );

  return lines.join("\n");
}

/** Dipakai oleh skrip sinkronisasi server dan middleware dev Vite. */
export function buildChatKnowledgeBundle(): { id: string } {
  return { id: buildChatKnowledge() };
}
