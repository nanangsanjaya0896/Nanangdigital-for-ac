import { ArrowUp } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { useImageFallback } from "../hooks/useImageFallback";
import { BUSINESS, WA_LINK_GENERAL } from "../data/business";
import { SEO_ARTICLES } from "../data/articles";

const FOOT_NAV_LEFT: readonly { readonly id: string; readonly label: string }[] = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "karya", label: "Contoh Website" },
  { id: "layanan", label: "Layanan" },
];

const FOOT_NAV_RIGHT: readonly { readonly id: string; readonly label: string }[] = [
  { id: "paket", label: "Pilihan Paket" },
  { id: "proses", label: "Alur Kerja" },
  { id: "faq", label: "Tanya Jawab" },
  { id: "kontak", label: "Kontak" },
];

export default function Footer() {
  const { failed: logoFailed, ref: logoRef, onError: onLogoError } = useImageFallback();

  const footNavLeft = FOOT_NAV_LEFT;
  const footNavRight = FOOT_NAV_RIGHT;
  const articles = SEO_ARTICLES;
  const waLink = WA_LINK_GENERAL;

  return (
    <footer className="relative overflow-hidden border-t border-line bg-[#0b0f13]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none font-display text-[22vw] font-bold leading-none text-white/[0.025] lg:text-[16rem]"
      >
        KONTAK
      </span>

      <div className="section-wrap relative pb-10 pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1.45fr] lg:gap-10">
          {/* Kolom kiri: Logo resmi NanangDigital + deskripsi + kontak */}
          <div>
            <a
              href="#beranda"
              aria-label="NanangDigital, kembali ke atas"
              className="inline-flex items-center gap-3.5"
            >
              {!logoFailed && (
                <img
                  ref={logoRef}
                  src={BUSINESS.logoUrl}
                  alt={`Logo ${BUSINESS.brand}`}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  onError={onLogoError}
                  className="h-12 w-auto max-w-[11rem] rounded-xl border border-white/10 bg-white/[0.03] object-contain shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:h-14"
                />
              )}
              <Logo className="text-2xl md:text-3xl" />
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist md:text-base">
              {`Jasa pembuatan website dan setting iklan Meta Ads khusus ${BUSINESS.niche}. Dikerjakan langsung sampai siap dipakai menerima panggilan pelanggan.`}
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
                Chat di WhatsApp
              </a>
            </div>
          </div>

          {/* Kolom kanan: navigasi + panduan & artikel SEO usaha AC */}
          <nav
            aria-label="Navigasi footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-[0.8fr_0.8fr_1.4fr]"
          >
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Halaman
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
                Info Paket
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
                  Panduan Usaha AC
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
            Seluruh hak cipta dilindungi.
          </p>
          <p className="text-xs text-mist">
            {BUSINESS.founder}, {BUSINESS.role}
          </p>
          <a
            href="#beranda"
            aria-label="Kembali ke atas"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-mist transition-all hover:border-accent/60 hover:text-accent"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
