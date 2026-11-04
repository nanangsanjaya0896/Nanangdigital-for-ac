/**
 * Isi file /llms.txt dan /llms-full.txt (format https://llmstxt.org).
 *
 * File ini ringkasan website dalam format Markdown untuk asisten dan agen AI (ChatGPT, Claude,
 * Perplexity, dan sejenisnya). Google Search tidak memakainya, jadi ini pelengkap, bukan pengganti
 * SEO. Isinya dibuat otomatis saat `npm run build` dari data yang sama dengan halaman website,
 * sehingga harga, paket, FAQ, dan artikel selalu sinkron.
 */
import { BUSINESS } from "../data/business";
import { FAQ_ITEMS } from "../data/faq";
import { PLANS } from "../data/plans";
import type { Plan } from "../data/plans";
import { SERVICES } from "../data/services";
import { PROCESS_STEPS } from "../data/process";
import { BONUSES } from "../data/bonuses";
import { PROJECTS, PROJECT_TYPE_LABEL } from "../data/projects";
import { SEO_ARTICLES } from "../data/articles";
import type { ArticleTable, SeoArticle } from "../data/articles";

function planPrice(plan: Plan): string {
  return plan.customLabel ? `harga ${plan.customLabel.toLowerCase()}` : plan.price;
}

function planFeatureText(feature: string): string {
  return /^no artikel$/i.test(feature) ? "Tidak termasuk artikel SEO" : feature;
}

function articleUrl(origin: string, article: SeoArticle): string {
  return `${origin}/panduan/${article.slug}/`;
}

function markdownTable(table: ArticleTable): string {
  const escape = (cell: string) => cell.replace(/\|/g, "\\|");
  const lines = [
    `| ${table.columns.map(escape).join(" | ")} |`,
    `| ${table.columns.map(() => "---").join(" | ")} |`,
    ...table.rows.map((row) => `| ${row.map(escape).join(" | ")} |`),
  ];
  return lines.join("\n");
}

function keyFacts(origin: string): string[] {
  const priceList = PLANS.map((plan) => `${plan.name} ${planPrice(plan)}${plan.popular ? " (paling populer)" : ""}`).join(", ");
  return [
    `- Pemilik dan pengerja: ${BUSINESS.founder} (${BUSINESS.role}). Setiap website dikerjakan sendiri, tidak dilempar ke tim lain.`,
    `- Wilayah layanan: seluruh ${BUSINESS.areaServed}. Semua koordinasi lewat WhatsApp, jadi tidak perlu bertemu langsung.`,
    `- Paket dan harga: ${priceList}.`,
    `- Isi semua paket: domain dan hosting tahun pertama, SSL HTTPS, Live Chat AI, dan pembuatan akun Google Maps (Google Business Profile). Rincian lengkap di ${origin}/#paket`,
    "- Lama pengerjaan: rata-rata 3 sampai 5 hari kerja sejak data usaha diterima, Paket Premium Custom sekitar 5 sampai 7 hari kerja.",
    "- Pembayaran: DP 50% di awal, sisa 50% setelah website selesai dan dicek klien. Bisa lewat transfer bank, QRIS, atau e-wallet.",
    `- Kontak dan pemesanan: WhatsApp ${BUSINESS.whatsapp.url}`,
  ];
}

/** /llms.txt: ringkasan singkat + daftar halaman penting. */
export function buildLlmsTxt(origin: string): string {
  const lines: string[] = [
    `# ${BUSINESS.brand}`,
    "",
    `> ${BUSINESS.summary}`,
    "",
    "Fakta utama:",
    "",
    ...keyFacts(origin),
    "",
    "## Halaman utama",
    "",
    `- [Beranda ${BUSINESS.brand}](${origin}/): layanan, contoh website, paket harga, alur kerja, bonus, dan tanya jawab.`,
    `- [Paket harga](${origin}/#paket): rincian isi ${PLANS.map((plan) => plan.name).join(", ")}.`,
    `- [Tanya jawab](${origin}/#faq): pertanyaan yang paling sering diajukan calon klien.`,
    `- [Contoh website](${origin}/#karya): ${PROJECTS.map((project) => `${project.title} (${PROJECT_TYPE_LABEL[project.type].toLowerCase()}, ${project.liveUrl})`).join(", ")}.`,
    "",
    "## Panduan untuk pemilik usaha service AC",
    "",
    ...SEO_ARTICLES.map((article) => `- [${article.title}](${articleUrl(origin, article)}): ${article.metaDescription}`),
    "",
    "## Optional",
    "",
    `- [Isi lengkap website dalam satu file](${origin}/llms-full.txt): paket, FAQ, alur kerja, bonus, dan seluruh artikel Panduan.`,
    `- [Daftar semua halaman (sitemap.xml)](${origin}/sitemap.xml)`,
    "",
  ];
  return lines.join("\n");
}

/** /llms-full.txt: seluruh isi penting website dalam satu file Markdown. */
export function buildLlmsFullTxt(origin: string, updatedAt: string): string {
  const lines: string[] = [
    `# ${BUSINESS.brand}: isi lengkap website`,
    "",
    `> ${BUSINESS.summary}`,
    "",
    `Sumber: ${origin}/ (data per ${updatedAt}). Bahasa Indonesia, harga dalam Rupiah.`,
    "",
    "## Fakta utama",
    "",
    ...keyFacts(origin),
    "",
    "## Layanan",
    "",
    ...SERVICES.map((service) => `- ${service.title}: ${service.description}`),
    "",
    "## Paket dan harga",
    "",
  ];

  for (const plan of PLANS) {
    lines.push(`### ${plan.name}: ${planPrice(plan)}${plan.popular ? " (paling populer)" : ""}`, "");
    lines.push(`${plan.tagline} ${plan.priceNote}`, "");
    lines.push(...plan.features.map((feature) => `- ${planFeatureText(feature)}`), "");
  }

  lines.push("## Alur kerja", "");
  PROCESS_STEPS.forEach((step, index) => lines.push(`${index + 1}. ${step.title}: ${step.description}`));
  lines.push("", "## Bonus gratis di semua paket", "");
  lines.push(...BONUSES.map((bonus) => `- ${bonus.title}: ${bonus.description}`), "");

  lines.push("## Contoh website", "");
  for (const project of PROJECTS) {
    lines.push(`- ${project.title} (${PROJECT_TYPE_LABEL[project.type]}, ${project.liveUrl}): ${project.description}`);
    if (project.note) lines.push(`  Catatan: ${project.note}`);
  }
  lines.push("", "## Tanya jawab", "");
  for (const item of FAQ_ITEMS) {
    lines.push(`### ${item.question}`, "", item.answer, "");
  }

  lines.push("## Panduan untuk pemilik usaha service AC", "");
  for (const article of SEO_ARTICLES) {
    lines.push(`### ${article.title}`, "");
    lines.push(`Alamat: ${articleUrl(origin, article)}`);
    lines.push(`Penulis: ${BUSINESS.founder}. Terbit ${article.publishedAt}, diperbarui ${article.updatedAt}.`, "");
    lines.push(`Jawaban singkat: ${article.quickAnswer}`, "");
    lines.push(article.summary, "");
    for (const section of article.sections) {
      lines.push(`#### ${section.heading}`, "");
      for (const paragraph of section.paragraphs) lines.push(paragraph, "");
      if (section.bullets?.length) lines.push(...section.bullets.map((bullet) => `- ${bullet}`), "");
      if (section.table) lines.push(markdownTable(section.table), "");
    }
    if (article.faqs.length) {
      lines.push("#### Pertanyaan yang sering ditanyakan", "");
      for (const faq of article.faqs) lines.push(`**${faq.question}** ${faq.answer}`, "");
    }
    if (article.sources?.length) {
      lines.push("Sumber:", ...article.sources.map((source) => `- [${source.label}](${source.url})`), "");
    }
  }

  return lines.join("\n");
}
