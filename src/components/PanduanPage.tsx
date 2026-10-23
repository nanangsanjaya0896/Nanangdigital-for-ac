import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, waUrl, WA_LINK_GENERAL } from "../data/business";
import { SEO_ARTICLES } from "../data/articles";
import type { SeoArticle } from "../data/articles";

interface PanduanPageProps {
  article?: SeoArticle;
}

export default function PanduanPage({ article }: PanduanPageProps) {
  const otherArticles = article
    ? SEO_ARTICLES.filter((item) => item.slug !== article.slug)
    : SEO_ARTICLES;

  return (
    <div className="min-h-screen bg-ink text-white">
      {/* Header bersih untuk halaman panduan SEO */}
      <header className="sticky top-0 z-50 border-b border-line bg-[#0f1115]/90 backdrop-blur-xl">
        <div className="section-wrap flex h-20 items-center justify-between gap-4">
          <a href="/" aria-label="NanangDigital, kembali ke halaman utama" className="py-2">
            <Logo className="text-xl md:text-2xl" />
          </a>

          <nav aria-label="Navigasi panduan" className="flex items-center gap-5 text-sm">
            <a
              href="/panduan/"
              className="py-2 font-medium text-mist transition-colors hover:text-white"
            >
              Semua Panduan
            </a>
            <a
              href="/#paket"
              className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-semibold text-accent transition-colors hover:bg-accent hover:text-[#04140c]"
            >
              Lihat Paket Website
            </a>
          </nav>
        </div>
      </header>

      <main id="konten" tabIndex={-1} className="relative py-14 md:py-20">
        {article ? (
          <article className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            {/* Breadcrumb SEO */}
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-mist">
              <a href="/" className="py-1 transition-colors hover:text-accent">
                Beranda
              </a>
              <span aria-hidden="true">/</span>
              <a href="/panduan/" className="py-1 transition-colors hover:text-accent">
                Panduan Usaha AC
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
                Baca {article.readMinutes} menit
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
                Solusi Siap Pakai NanangDigital
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
                  Konsultasi Gratis via WhatsApp
                </a>
                <a href="/#paket" className="btn-ghost text-sm">
                  Cek Rincian Paket Mulai Rp1,5 Jt
                </a>
              </div>
            </aside>

            {/* Internal linking antar artikel agar SEO saling menguatkan */}
            <section aria-label="Artikel panduan lainnya" className="mt-16 border-t border-line pt-12">
              <h2 className="font-display text-xl font-bold tracking-tight text-white">
                Panduan Lainnya untuk Pemilik Usaha Service AC
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
                      Baca selengkapnya
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
                  href="/"
                  className="inline-flex items-center gap-2 py-2 text-sm font-medium text-mist transition-colors hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Kembali ke Halaman Utama NanangDigital
                </a>
              </div>
            </section>
          </article>
        ) : (
          <div className="section-wrap">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Pusat Panduan Gratis
              </p>
              <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Tips Cari Pelanggan & Digitalisasi <span className="text-accent">Usaha Service AC</span>.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">
                Kumpulan panduan praktis dari {BUSINESS.brand} buat pemilik bengkel AC dan teknisi
                panggilan supaya makin mudah ditemukan pelanggan di Google maupun WhatsApp.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {SEO_ARTICLES.map((item) => (
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
                      <span className="text-mist">{item.readMinutes} menit baca</span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-accent md:text-2xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{item.summary}</p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Baca Panduan Lengkap
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
                  Mau Langsung Terima Beres Dibuatkan Website Usaha AC?
                </h2>
                <p className="mt-1.5 text-sm text-mist">
                  Selesai 3 sampai 5 hari kerja, gratis domain & hosting 1 tahun, plus akun Google Maps.
                </p>
              </div>
              <a
                href={WA_LINK_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                data-track-source="panduan_hub_cta"
                className="btn-primary mt-5 shrink-0 text-sm sm:mt-0"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat di WhatsApp
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
            <p>© 2026 {BUSINESS.brand}. Jasa Website & Meta Ads Khusus Usaha Service AC.</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="py-1.5 hover:text-white">
              Beranda
            </a>
            <a href="/#paket" className="py-1.5 hover:text-white">
              Paket Harga
            </a>
            <a href="/panduan/" className="py-1.5 hover:text-white">
              Panduan AC
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
