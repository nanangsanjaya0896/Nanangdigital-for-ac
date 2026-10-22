import { ArrowUp } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, WA_LINK_GENERAL } from "../data/business";

const FOOT_NAV_LEFT = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "karya", label: "Contoh Desain" },
  { id: "layanan", label: "Layanan" },
] as const;

const FOOT_NAV_RIGHT = [
  { id: "paket", label: "Pilihan Paket" },
  { id: "proses", label: "Alur Kerja" },
  { id: "faq", label: "Tanya Jawab" },
  { id: "kontak", label: "Kontak" },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-[#0b0f13]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none font-display text-[22vw] font-bold leading-none text-white/[0.025] lg:text-[16rem]"
      >
        KONTAK
      </span>

      <div className="section-wrap relative pb-10 pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {/* Kolom kiri */}
          <div>
            <a href="#beranda" aria-label="NanangDigital, kembali ke atas">
              <Logo className="text-2xl md:text-3xl" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist md:text-base">
              Jasa pembuatan website dan setting iklan Meta Ads khusus {BUSINESS.niche}. Dikerjakan
              langsung sampai siap dipakai menerima panggilan pelanggan.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={WA_LINK_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                data-track-source="footer_cta"
                className="btn-primary text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat di WhatsApp
              </a>
              <a
                href={BUSINESS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                data-track-source="footer_phone"
                className="font-mono text-sm tracking-wide text-mist transition-colors hover:text-accent"
                aria-label={`Nomor WhatsApp ${BUSINESS.whatsapp.display}`}
              >
                {BUSINESS.whatsapp.display}
              </a>
            </div>
          </div>

          {/* Kolom kanan: navigasi */}
          <nav aria-label="Navigasi footer" className="grid grid-cols-2 gap-8 md:justify-items-end">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Halaman
              </h3>
              <ul className="mt-5 space-y-3">
                {FOOT_NAV_LEFT.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="text-sm text-mist transition-colors hover:text-white"
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
              <ul className="mt-5 space-y-3">
                {FOOT_NAV_RIGHT.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="text-sm text-mist transition-colors hover:text-white"
                    >
                      {link.label}
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
            © 2026 {BUSINESS.brand}. Seluruh hak cipta dilindungi.
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
