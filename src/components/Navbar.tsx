import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollLock } from "../hooks/useScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";

const NAV_LINKS: readonly { readonly id: string; readonly label: string }[] = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "karya", label: "Karya" },
  { id: "layanan", label: "Layanan" },
  { id: "paket", label: "Paket Harga" },
  { id: "faq", label: "FAQ" },
];

const MOBILE_EXTRA: readonly { readonly id: string; readonly label: string }[] = [
  { id: "proses", label: "Proses" },
  { id: "kontak", label: "Kontak" },
];

const NAV_ID_LIST = NAV_LINKS.map((link) => link.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_ID_LIST);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = NAV_LINKS;
  const mobileExtraLinks = MOBILE_EXTRA;

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
        Lewati ke konten utama
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled
            ? "border-line bg-[#0f1115]/85 backdrop-blur-xl"
            : "border-transparent bg-[#0f1115]/40 backdrop-blur-md"
        }`}
      >
        {/* Grid 3 kolom seimbang: kiri (Logo), tengah (Menu), kanan (tombol menu seluler) */}
        <div className="section-wrap flex h-20 items-center justify-between gap-4 lg:grid lg:h-[5.5rem] lg:grid-cols-[1fr_auto_1fr]">
          <a
            href="#beranda"
            aria-label="NanangDigital, kembali ke beranda"
            className="shrink-0 py-2 lg:justify-self-start"
          >
            <Logo className="text-xl md:text-2xl" />
          </a>

          {/* Menu desktop rata tengah sehingga kiri & kanan tetap seimbang */}
          <nav
            aria-label="Navigasi utama"
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

          {/* Kolom kanan: tombol menu seluler (di desktop kolom ini kosong agar menu tetap di tengah) */}
          <div className="flex items-center gap-2.5 lg:justify-self-end">
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-seluler"
              aria-label="Buka menu navigasi"
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
          aria-label="Menu navigasi"
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
              aria-label="Tutup menu"
              data-autofocus
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-accent/60 hover:text-accent"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Navigasi seluler"
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
