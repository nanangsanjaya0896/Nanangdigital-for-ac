import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";
import Logo from "./Logo";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollLock } from "../hooks/useScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/LanguageContext";

const NAV_LINKS_BY_LANG: Record<
  Locale,
  readonly { readonly id: string; readonly label: string }[]
> = {
  id: [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "karya", label: "Karya" },
    { id: "layanan", label: "Layanan" },
    { id: "paket", label: "Paket Harga" },
    { id: "faq", label: "FAQ" },
  ],
  en: [
    { id: "beranda", label: "Home" },
    { id: "tentang", label: "About" },
    { id: "karya", label: "Work" },
    { id: "layanan", label: "Services" },
    { id: "paket", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ],
};

const MOBILE_EXTRA_BY_LANG: Record<
  Locale,
  readonly { readonly id: string; readonly label: string }[]
> = {
  id: [
    { id: "proses", label: "Proses" },
    { id: "kontak", label: "Kontak" },
  ],
  en: [
    { id: "proses", label: "Process" },
    { id: "kontak", label: "Contact" },
  ],
};

const NAV_ID_LIST = NAV_LINKS_BY_LANG.id.map((link) => link.id);

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_ID_LIST);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = NAV_LINKS_BY_LANG[lang];
  const mobileExtraLinks = MOBILE_EXTRA_BY_LANG[lang];

  useScrollLock(menuOpen);
  useFocusTrap(menuRef, menuOpen, () => closeMenu(true));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = (restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) hamburgerRef.current?.focus();
  };

  return (
    <>
      <a
        href="#konten"
        className="sr-only z-[100] rounded-full bg-accent px-5 py-3 font-semibold text-[#04140c] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {lang === "id" ? "Lewati ke konten utama" : "Skip to main content"}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled
            ? "border-line bg-[#0f1115]/85 backdrop-blur-xl"
            : "border-transparent bg-[#0f1115]/40 backdrop-blur-md"
        }`}
      >
        {/* Grid 3 kolom seimbang kiri (Logo), tengah (Menu), kanan (Pilihan Bahasa) */}
        <div className="section-wrap flex h-20 items-center justify-between gap-4 lg:grid lg:h-[5.5rem] lg:grid-cols-[1fr_auto_1fr]">
          <a
            href="#beranda"
            aria-label={
              lang === "id"
                ? "NanangDigital, kembali ke beranda"
                : "NanangDigital, back to top"
            }
            className="shrink-0 py-2 lg:justify-self-start"
          >
            <Logo className="text-xl md:text-2xl" />
          </a>

          {/* Menu desktop rata tengah sehingga kiri & kanan tetap seimbang */}
          <nav
            aria-label={lang === "id" ? "Navigasi utama" : "Main navigation"}
            className="hidden lg:block lg:justify-self-center"
          >
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id} className="relative">
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative inline-block py-2.5 text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-white" : "text-mist hover:text-white"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent shadow-[0_0_12px_rgba(0,223,143,0.7)]" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Kolom kanan: Tombol Bahasa ID / EN + Hamburger Seluler */}
          <div className="flex items-center gap-2.5 lg:justify-self-end">
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

            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-seluler"
              aria-label={lang === "id" ? "Buka menu navigasi" : "Open navigation menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-accent/60 hover:text-accent lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu seluler fullscreen */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="menu-seluler"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "id" ? "Menu navigasi" : "Navigation menu"}
          className="fixed inset-0 z-[70] flex flex-col lg:hidden"
        >
          <div className="absolute inset-0 bg-[#0d1116]/95 backdrop-blur-2xl" aria-hidden="true" />
          <div
            className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]"
            aria-hidden="true"
          />

          <div className="relative flex h-20 items-center justify-between px-4 sm:px-6">
            <Logo className="text-xl" />
            <button
              type="button"
              onClick={() => closeMenu(true)}
              aria-label={lang === "id" ? "Tutup menu" : "Close menu"}
              data-autofocus
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-accent/60 hover:text-accent"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label={lang === "id" ? "Navigasi seluler" : "Mobile navigation"}
            className="relative flex-1 overflow-y-auto px-6 pb-10 sm:px-8"
          >
            <ul className="flex flex-col gap-1 pt-6">
              {[...navLinks, ...mobileExtraLinks].map((link, i) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-white/5 py-4"
                  >
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-3xl font-semibold tracking-tight transition-colors sm:text-4xl ${
                        active === link.id ? "text-accent" : "text-white group-hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-5 w-5 self-center text-mist opacity-0 transition-all group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
