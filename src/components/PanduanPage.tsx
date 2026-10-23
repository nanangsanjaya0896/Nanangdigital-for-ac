import { useEffect } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Globe } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, getGeneralWaLink, waUrl } from "../data/business";
import { SEO_ARTICLES_BY_LANG, findArticleBySlug } from "../data/articles";
import type { SeoArticle } from "../data/articles";
import { useLanguage } from "../i18n/LanguageContext";

interface PanduanPageProps {
  article?: SeoArticle;
  slug?: string;
}

export default function PanduanPage({ article: initialArticle, slug }: PanduanPageProps) {
  const { lang, setLang } = useLanguage();
  const activeSlug = slug ?? initialArticle?.slug;
  const articles = SEO_ARTICLES_BY_LANG[lang];
  const article = activeSlug ? findArticleBySlug(activeSlug, lang) ?? initialArticle : undefined;

  const otherArticles = article
    ? articles.filter((item) => item.slug !== article.slug)
    : articles;

  const homeHref = lang === "en" ? "/en/" : "/";
  const pricingHref = lang === "en" ? "/en/#paket" : "/#paket";

  useEffect(() => {
    if (article) {
      document.title = article.metaTitle;
    } else {
      document.title =
        lang === "id"
          ? "Panduan Pemasaran & Digitalisasi Usaha Service AC | NanangDigital"
          : "Practical Marketing & Lead Guides for HVAC Contractors | NanangDigital";
    }
  }, [article, lang]);

  return (
    <div className="min-h-screen bg-ink text-white">
      {/* Header bersih untuk halaman panduan SEO + tombol pengalih bahasa ID / EN */}
      <header className="sticky top-0 z-50 border-b border-line bg-[#0f1115]/90 backdrop-blur-xl">
        <div className="section-wrap flex h-20 items-center justify-between gap-4">
          <a
            href={homeHref}
            aria-label={
              lang === "id"
                ? "NanangDigital, kembali ke halaman utama"
                : "NanangDigital, back to main page"
            }
            className="py-2"
          >
            <Logo className="text-xl md:text-2xl" />
          </a>

          <nav
            aria-label={lang === "id" ? "Navigasi panduan" : "Guides navigation"}
            className="flex items-center gap-3 text-sm sm:gap-5"
          >
            <a
              href="/panduan/"
              className="hidden py-2 font-medium text-mist transition-colors hover:text-white sm:inline-block"
            >
              {lang === "id" ? "Semua Panduan" : "All Guides"}
            </a>

            <div
              role="group"
              aria-label={lang === "id" ? "Pilih bahasa tampilan" : "Choose language"}
              className="inline-flex items-center rounded-full border border-line bg-white/[0.03] p-1"
            >
              <Globe className="ml-2 mr-1 hidden h-3.5 w-3.5 text-accent sm:block" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setLang("id")}
                aria-pressed={lang === "id"}
                className={`rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wider transition-all ${
                  lang === "id"
                    ? "bg-accent text-[#04140c] shadow-[0_0_12px_rgba(0,223,143,0.45)]"
                    : "text-mist hover:text-white"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wider transition-all ${
                  lang === "en"
                    ? "bg-accent text-[#04140c] shadow-[0_0_12px_rgba(0,223,143,0.45)]"
                    : "text-mist hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={pricingHref}
              className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-semibold text-accent transition-colors hover:bg-accent hover:text-[#04140c]"
            >
              {lang === "id" ? "Lihat Paket Website" : "View Packages"}
            </a>
          </nav>
        </div>
      </header>

      <main id="konten" tabIndex={-1} className="relative py-14 md:py-20">
        {article ? (
          <article className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            {/* Breadcrumb SEO */}
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-mist">
              <a href={homeHref} className="py-1 transition-colors hover:text-accent">
                {lang === "id" ? "Beranda" : "Home"}
              </a>
              <span aria-hidden="true">/</span>
              <a href="/panduan/" className="py-1 transition-colors hover:text-accent">
                {lang === "id" ? "Panduan Usaha AC" : "HVAC Growth Guides"}
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-white/90">{article.category}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full border border-accent/35 bg-accent/10 px-3 py-1 font-semibold uppercase tracking-[0.15em] text-accent">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-mist">
                <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {lang === "id"
                  ? `Baca ${article.readMinutes} menit`
                  : `${article.readMinutes} min read`}
              </span>
            </div>

            <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.6rem]">
              {article.title}
            </h1>

            <p className="mt-6 rounded-2xl border border-line bg-surface p-5 text-base leading-relaxed text-mist md:p-6 md:text-lg">
              {article.summary}
            </p>

            <div className="mt-10 space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-base leading-relaxed text-white/90"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-3 rounded-2xl border border-line bg-surface/70 p-5 md:p-6">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet.slice(0, 32)}
                          className="flex gap-3 text-sm leading-relaxed text-mist md:text-base"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Kotak konversi ke Form Pra-WA & Paket Harga */}
            <aside className="mt-14 rounded-3xl border border-accent/45 bg-gradient-to-br from-accent/[0.11] via-surface to-surface p-7 md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {lang === "id"
                  ? "Solusi Siap Pakai NanangDigital"
                  : "Turnkey NanangDigital Build"}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
                {article.ctaHeading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">
                {article.ctaBody}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3.5">
                <a
                  href={waUrl(article.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-source={`seo_article_${article.slug}`}
                  className="btn-primary text-sm"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {lang === "id"
                    ? "Konsultasi Gratis via WhatsApp"
                    : "Free WhatsApp Consultation"}
                </a>
                <a href={pricingHref} className="btn-ghost text-sm">
                  {lang === "id"
                    ? "Cek Rincian Paket Mulai Rp1,5 Jt"
                    : "View Packages from $299"}
                </a>
              </div>
            </aside>

            {/* Internal linking antar artikel agar SEO saling menguatkan */}
            <section
              aria-label={lang === "id" ? "Artikel panduan lainnya" : "More HVAC guides"}
              className="mt-16 border-t border-line pt-12"
            >
              <h2 className="font-display text-xl font-bold tracking-tight text-white">
                {lang === "id"
                  ? "Panduan Lainnya untuk Pemilik Usaha Service AC"
                  : "More Growth Guides for HVAC Contractors"}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {otherArticles.map((item) => (
                  <a
                    key={item.slug}
                    href={`/panduan/${item.slug}/`}
                    className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/50"
                  >
                    <div>
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                        {item.category}
                      </span>
                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-white transition-colors group-hover:text-accent">
                        {item.title}
                      </h3>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-mist group-hover:text-white">
                      {lang === "id" ? "Baca selengkapnya" : "Read full guide"}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href={homeHref}
                  className="inline-flex items-center gap-2 py-2 text-sm font-medium text-mist transition-colors hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {lang === "id"
                    ? "Kembali ke Halaman Utama NanangDigital"
                    : "Back to NanangDigital Main Page"}
                </a>
              </div>
            </section>
          </article>
        ) : (
          <div className="section-wrap">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {lang === "id" ? "Pusat Panduan Gratis" : "Free HVAC Growth Hub"}
              </p>
              {lang === "id" ? (
                <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  Tips Cari Pelanggan & Digitalisasi{" "}
                  <span className="text-accent">Usaha Service AC</span>.
                </h1>
              ) : (
                <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  Practical Marketing & Lead Guides for{" "}
                  <span className="text-accent">HVAC Contractors</span>.
                </h1>
              )}
              <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">
                {lang === "id"
                  ? `Kumpulan panduan praktis dari ${BUSINESS.brand} buat pemilik bengkel AC dan teknisi panggilan supaya makin mudah ditemukan pelanggan di Google maupun WhatsApp.`
                  : `Actionable guides from ${BUSINESS.brand} helping residential & commercial HVAC businesses rank higher on Google Maps and book more local calls.`}
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {articles.map((item) => (
                <a
                  key={item.slug}
                  href={`/panduan/${item.slug}/`}
                  className="group flex flex-col justify-between rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-accent/55"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="font-semibold uppercase tracking-[0.18em] text-accent">
                        {item.category}
                      </span>
                      <span className="text-mist">
                        {lang === "id"
                          ? `${item.readMinutes} menit baca`
                          : `${item.readMinutes} min read`}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-accent md:text-2xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{item.summary}</p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    {lang === "id" ? "Baca Panduan Lengkap" : "Read Full Guide"}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-14 rounded-3xl border border-accent/40 bg-surface p-7 sm:flex sm:items-center sm:justify-between sm:gap-6 md:p-9">
              <div>
                <h2 className="font-display text-xl font-bold text-white md:text-2xl">
                  {lang === "id"
                    ? "Mau Langsung Terima Beres Dibuatkan Website Usaha AC?"
                    : "Ready for a Done-For-You HVAC Website That Books Jobs?"}
                </h2>
                <p className="mt-1.5 text-sm text-mist">
                  {lang === "id"
                    ? "Selesai 3 sampai 5 hari kerja, gratis domain & hosting 1 tahun, plus akun Google Maps."
                    : "Live in 3 to 5 business days with 1st-year custom domain, fast hosting, SSL, & Google Business setup included."}
                </p>
              </div>
              <a
                href={getGeneralWaLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                data-track-source="panduan_hub_cta"
                className="btn-primary mt-5 shrink-0 text-sm sm:mt-0"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {lang === "id" ? "Chat di WhatsApp" : "Chat on WhatsApp"}
              </a>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-line bg-[#0b0f13] py-10">
        <div className="section-wrap flex flex-col items-center justify-between gap-4 text-xs text-mist sm:flex-row">
          <div className="flex items-center gap-3">
            <img
              src={BUSINESS.logoUrl}
              alt={`Logo ${BUSINESS.brand}`}
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              className="h-9 w-auto rounded-lg border border-white/10 object-contain"
            />
            <p>
              © 2026 {BUSINESS.brand}.{" "}
              {lang === "id"
                ? "Jasa Website & Meta Ads Khusus Usaha Service AC."
                : "Websites & Local Lead Ads for HVAC Contractors."}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href={homeHref} className="py-1.5 hover:text-white">
              {lang === "id" ? "Beranda" : "Home"}
            </a>
            <a href={pricingHref} className="py-1.5 hover:text-white">
              {lang === "id" ? "Paket Harga" : "Pricing"}
            </a>
            <a href="/panduan/" className="py-1.5 hover:text-white">
              {lang === "id" ? "Panduan AC" : "HVAC Guides"}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
