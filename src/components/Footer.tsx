import { useState } from "react";
import { ArrowUp } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, getGeneralWaLink } from "../data/business";
import { SEO_ARTICLES_BY_LANG } from "../data/articles";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/LanguageContext";

const FOOT_NAV_LEFT_BY_LANG: Record<
  Locale,
  readonly { readonly id: string; readonly label: string }[]
> = {
  id: [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "karya", label: "Contoh Desain" },
    { id: "layanan", label: "Layanan" },
  ],
  en: [
    { id: "beranda", label: "Home" },
    { id: "tentang", label: "About" },
    { id: "karya", label: "Sample Layouts" },
    { id: "layanan", label: "Services" },
  ],
};

const FOOT_NAV_RIGHT_BY_LANG: Record<
  Locale,
  readonly { readonly id: string; readonly label: string }[]
> = {
  id: [
    { id: "paket", label: "Pilihan Paket" },
    { id: "proses", label: "Alur Kerja" },
    { id: "faq", label: "Tanya Jawab" },
    { id: "kontak", label: "Kontak" },
  ],
  en: [
    { id: "paket", label: "Pricing Plans" },
    { id: "proses", label: "How It Works" },
    { id: "faq", label: "FAQ" },
    { id: "kontak", label: "Contact" },
  ],
};

export default function Footer() {
  const { lang } = useLanguage();
  const [logoFailed, setLogoFailed] = useState(false);

  const footNavLeft = FOOT_NAV_LEFT_BY_LANG[lang];
  const footNavRight = FOOT_NAV_RIGHT_BY_LANG[lang];
  const articles = SEO_ARTICLES_BY_LANG[lang];
  const waLink = getGeneralWaLink(lang);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-[#0b0f13]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none font-display text-[22vw] font-bold leading-none text-white/[0.025] lg:text-[16rem]"
      >
        {lang === "id" ? "KONTAK" : "CONTACT"}
      </span>

      <div className="section-wrap relative pb-10 pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1.45fr] lg:gap-10">
          {/* Kolom kiri: Logo resmi NanangDigital + deskripsi + kontak */}
          <div>
            <a
              href="#beranda"
              aria-label={
                lang === "id"
                  ? "NanangDigital, kembali ke atas"
                  : "NanangDigital, back to top"
              }
              className="inline-flex items-center gap-3.5"
            >
              {!logoFailed && (
                <img
                  src={BUSINESS.logoUrl}
                  alt={`Logo ${BUSINESS.brand}`}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  onError={() => setLogoFailed(true)}
                  className="h-12 w-auto max-w-[11rem] rounded-xl border border-white/10 bg-white/[0.03] object-contain shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:h-14"
                />
              )}
              <Logo className="text-2xl md:text-3xl" />
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist md:text-base">
              {lang === "id"
                ? `Jasa pembuatan website dan setting iklan Meta Ads khusus ${BUSINESS.niche.id}. Dikerjakan langsung sampai siap dipakai menerima panggilan pelanggan.`
                : `Conversion-focused websites and local Meta Lead Ads built specifically for ${BUSINESS.niche.en}. Handled end-to-end until ready to book jobs.`}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                data-track-source="footer_cta"
                className="btn-primary text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {lang === "id" ? "Chat di WhatsApp" : "Chat on WhatsApp"}
              </a>
            </div>
          </div>

          {/* Kolom kanan: navigasi + panduan & artikel SEO usaha AC */}
          <nav
            aria-label={lang === "id" ? "Navigasi footer" : "Footer navigation"}
            className="grid grid-cols-2 gap-8 sm:grid-cols-[0.8fr_0.8fr_1.4fr]"
          >
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {lang === "id" ? "Halaman" : "Pages"}
              </h3>
              <ul className="mt-5 space-y-2">
                {footNavLeft.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="inline-block py-1.5 text-sm text-mist transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {lang === "id" ? "Info Paket" : "Packages"}
              </h3>
              <ul className="mt-5 space-y-2">
                {footNavRight.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="inline-block py-1.5 text-sm text-mist transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                <a href="/panduan/" className="hover:underline">
                  {lang === "id" ? "Panduan Usaha AC" : "HVAC Growth Guides"}
                </a>
              </h3>
              <ul className="mt-5 space-y-2">
                {articles.map((article) => (
                  <li key={article.slug}>
                    <a
                      href={`/panduan/${article.slug}/`}
                      className="inline-block py-1.5 text-sm leading-snug text-mist transition-colors hover:text-white"
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bar bawah */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-mist">
            © 2026 {BUSINESS.brand}.{" "}
            {lang === "id" ? "Seluruh hak cipta dilindungi." : "All rights reserved."}
          </p>
          <p className="text-xs text-mist">
            {BUSINESS.founder}, {BUSINESS.role}
          </p>
          <a
            href="#beranda"
            aria-label={lang === "id" ? "Kembali ke atas" : "Back to top"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-mist transition-all hover:border-accent/60 hover:text-accent"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
