import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { WA_LINK_GENERAL } from "../data/business";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollLock } from "../hooks/useScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";

const NAV_LINKS = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "karya", label: "Karya" },
  { id: "layanan", label: "Layanan" },
  { id: "faq", label: "FAQ" },
] as const;

const NAV_ID_LIST = NAV_LINKS.map((link) => link.id);

const MOBILE_EXTRA_LINKS = [
  { id: "paket", label: "Paket Harga" },
  { id: "proses", label: "Proses" },
  { id: "kontak", label: "Kontak" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_ID_LIST);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
        <div className="section-wrap flex h-20 items-center justify-between gap-6 lg:h-[5.5rem]">
          <a href="#beranda" aria-label="NanangDigital — kembali ke beranda" className="shrink-0">
            <Logo className="text-xl md:text-2xl" />
          </a>

          {/* Menu desktop */}
          <nav aria-label="Navigasi utama" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id} className="relative">
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-white" : "text-mist hover:text-white"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent shadow-[0_0_12px_rgba(0,223,143,0.7)]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WA_LINK_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden !px-6 !py-3 text-sm lg:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Konsultasi Gratis
            </a>

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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="menu-seluler"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            className="fixed inset-0 z-[70] flex flex-col lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[#0d1116]/92 backdrop-blur-2xl" aria-hidden="true" />
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

            <nav aria-label="Navigasi seluler" className="relative flex-1 overflow-y-auto px-6 sm:px-8">
              <ul className="flex flex-col gap-1 pt-6">
                {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.45, delay: 0.06 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-white/5 py-4"
                    >
                      <span className="font-mono text-xs text-accent/70">
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
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pb-10 pt-8"
              >
                <a
                  href={WA_LINK_GENERAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Konsultasi Gratis via WhatsApp
                </a>
                <p className="mt-4 text-center text-xs text-mist">
                  Gratis, tanpa komitmen · Bahasa sederhana
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
