import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, getGeneralWaLink } from "../data/business";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/LanguageContext";

const FOOTER_LINKS_BY_LANG: Record<
  Locale,
  readonly { readonly href: string; readonly label: string }[]
> = {
  id: [
    { href: "#beranda", label: "Beranda" },
    { href: "#tentang", label: "Tentang" },
    { href: "#karya", label: "Karya" },
    { href: "#layanan", label: "Layanan" },
    { href: "#paket", label: "Paket Harga" },
    { href: "#proses", label: "Proses" },
    { href: "#faq", label: "FAQ" },
    { href: "/panduan/", label: "Panduan Usaha AC" },
    { href: "/en/", label: "English Version ($ USD)" },
  ],
  en: [
    { href: "#beranda", label: "Home" },
    { href: "#tentang", label: "About" },
    { href: "#karya", label: "Work" },
    { href: "#layanan", label: "Services" },
    { href: "#paket", label: "Pricing" },
    { href: "#proses", label: "Process" },
    { href: "#faq", label: "FAQ" },
    { href: "/panduan/", label: "HVAC Growth Guides (ID)" },
    { href: "/", label: "Bahasa Indonesia (IDR)" },
  ],
};

export default function Footer() {
  const { lang, setLang } = useLanguage();
  const year = new Date().getFullYear();
  const footerLinks = FOOTER_LINKS_BY_LANG[lang];
  const phoneDisplay =
    lang === "id" ? BUSINESS.whatsapp.display : BUSINESS.whatsapp.displayIntl;

  return (
    <footer className="relative border-t border-line bg-ink-soft">
      <div className="section-wrap py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          {/* Identitas brand dengan logo resmi NanangDigital */}
          <div className="max-w-sm">
            <a
              href="#beranda"
              aria-label={
                lang === "id"
                  ? "NanangDigital, kembali ke atas halaman"
                  : "NanangDigital, back to top"
              }
              className="inline-block overflow-hidden rounded-xl border border-line bg-white p-2 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={BUSINESS.logoUrl}
                alt="Logo NanangDigital"
                width={176}
                height={52}
                loading="lazy"
                decoding="async"
                className="h-11 w-auto object-contain"
              />
            </a>
            <p className="mt-5 text-sm leading-relaxed text-mist">
              {lang === "id"
                ? "Jasa pembuatan website resmi dan setup iklan Facebook & Instagram khusus teknisi maupun bengkel usaha service AC."
                : "Conversion-focused websites, Google Business setup, and local Meta lead campaigns built exclusively for HVAC & air conditioning businesses worldwide."}
            </p>
          </div>

          {/* Navigasi */}
          <nav aria-label={lang === "id" ? "Navigasi footer" : "Footer navigation"}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-mist">
              {lang === "id" ? "Navigasi" : "Navigation"}
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-y-2.5 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === "/en/") {
                        e.preventDefault();
                        setLang("en");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else if (link.href === "/") {
                        e.preventDefault();
                        setLang("id");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="inline-block py-1 text-white/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-mist">
              {lang === "id" ? "Kontak" : "Direct Contact"}
            </h2>
            <a
              href={getGeneralWaLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              data-track-source="footer_whatsapp"
              className="mt-5 inline-flex items-center gap-3 py-1 font-mono text-sm text-white transition-colors hover:text-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                <WhatsAppIcon className="h-4 w-4" />
              </span>
              {phoneDisplay}
            </a>
            <p className="mt-4 text-xs leading-relaxed text-mist">
              {lang === "id"
                ? `Dikerjakan langsung oleh ${BUSINESS.founder}. Kirim pesan kapan saja, pasti dibalas satu per satu.`
                : `Built 1-on-1 by ${BUSINESS.founder}. Serving HVAC & AC contractors globally via WhatsApp.`}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BUSINESS.brand}.{" "}
            {lang === "id" ? "Seluruh hak cipta dilindungi." : "All rights reserved."}
          </p>
          <p>
            {lang === "id"
              ? "Fokus membantu usaha service AC tampil rapi & mudah dihubungi."
              : "Helping HVAC & air conditioning businesses win more local service calls."}
          </p>
        </div>
      </div>
    </footer>
  );
}
