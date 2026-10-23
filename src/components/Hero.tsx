import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowDown, ArrowRight, Move } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, WA_LINK_GENERAL } from "../data/business";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MARQUEE_ITEMS = [
  "Website Usaha Service AC",
  "Setup Meta Ads Lokal",
  "Teks Layanan Jelas",
  "Nyaman Dibuka dari HP",
  "Tombol Chat WhatsApp",
  "Gratis Domain & Hosting 1 Tahun",
];

export default function Hero() {
  const reduced = useReducedMotion();
  const [photoFailed, setPhotoFailed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(
    null
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || typeof window === "undefined" || window.innerWidth < 1024) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: offset.x,
      origY: offset.y,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const dx = Math.max(-50, Math.min(50, dragStartRef.current.origX + (e.clientX - dragStartRef.current.startX)));
    const dy = Math.max(-50, Math.min(50, dragStartRef.current.origY + (e.clientY - dragStartRef.current.startY)));
    setOffset({ x: dx, y: dy });
  };

  const onPointerUp = () => {
    dragStartRef.current = null;
    setDragging(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <section id="beranda" aria-label="Beranda" className="relative overflow-hidden">
      {/* Latar: grid + glow */}
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black_30%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="glow-orb absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full opacity-70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-0 select-none font-display text-[20vw] font-bold leading-none text-white/[0.03] lg:text-[17rem]"
      >
        DIGITAL
      </span>

      <div className="section-wrap relative grid min-h-screen items-center gap-14 pb-28 pt-36 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:pb-24 lg:pt-28">
        {/* Kolom kiri */}
        <div className="max-w-2xl">
          <p className="hero-in hero-d1 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/[0.07] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Khusus Teknisi & Usaha Service AC
          </p>

          <h1 className="hero-in hero-d2 mt-7 font-display text-[2.35rem] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.55rem] xl:text-[4rem]">
            Biar Usaha <span className="text-accent">Service AC</span> Anda Gampang Ditemukan &{" "}
            <span className="relative inline-block">
              Dihubungi <span className="text-outline">Pelanggan</span>.
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-accent/70 to-transparent"
              />
            </span>
          </h1>

          <p className="hero-in hero-d3 mt-7 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            Saya bantu buatkan website yang rapi plus setting iklan Facebook & Instagram untuk usaha
            service AC Anda. Selesai dalam 3 sampai 5 hari kerja, sudah beres sama domain dan
            hosting tahun pertama.
          </p>

          <div className="hero-in hero-d4 mt-10 flex flex-wrap items-center gap-4">
            <a
              href={WA_LINK_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              data-track-source="hero_primary_cta"
              className="btn-primary"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat & Konsultasi Gratis
            </a>
            <a href="#paket" className="btn-ghost">
              Cek Paket Mulai Rp1,5 Jt
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="hero-in hero-d5 mt-6">
            <a
              href="#karya"
              className="group inline-flex items-center gap-2 py-2 text-sm font-medium text-mist transition-colors hover:text-accent"
            >
              Intip contoh tampilan website AC
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <p className="mt-3 text-xs tracking-wide text-mist">
              Boleh tanya-tanya dulu santai di WA. Pelunasan 50% baru dibayar setelah website jadi.
            </p>
          </div>
        </div>

        {/* Kolom kanan: kartu ID founder */}
        <div className="relative mx-auto w-full max-w-[21rem] lg:max-w-[23rem]">
          <span
            aria-hidden="true"
            className="absolute -right-4 -top-12 z-30 hidden items-center gap-2 rounded-full border border-line bg-surface/90 px-3.5 py-2 text-[0.7rem] font-medium text-mist backdrop-blur lg:inline-flex"
          >
            <Move className="h-3.5 w-3.5 text-accent" />
            Kartu bisa digeser
          </span>

          <div className={reduced ? "" : "hero-card-float"}>
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${dragging ? 1.02 : 1})`,
                transition: dragging ? "none" : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="lg:cursor-grab lg:active:cursor-grabbing"
            >
              {/* Tali lanyard */}
              <div aria-hidden="true" className="relative mx-auto flex w-full flex-col items-center">
                <div className="h-10 w-[3px] rounded-full bg-gradient-to-b from-accent/20 via-accent/60 to-accent/90" />
                <div className="relative z-10 -mb-[3px] h-3.5 w-9 rounded-t-md border border-accent/50 bg-ink shadow-[0_0_16px_rgba(0,223,143,0.35)]" />
              </div>

              {/* Kartu ID */}
              <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface/90 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.09] via-transparent to-transparent"
                />

                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-mist">
                    NanangDigital ID
                  </span>
                  <span aria-hidden="true" className="flex h-5 items-end gap-[3px]">
                    {[3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2].map((w, i) => (
                      <span
                        key={i}
                        className="inline-block h-full bg-mist/50"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </span>
                </div>

                {/* Foto founder resmi */}
                <div className="relative mt-6 aspect-[4/3.5] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#101820] via-[#131c26] to-[#0d1a15]">
                  {!photoFailed ? (
                    <>
                      <img
                        src={BUSINESS.founderPhoto.url}
                        srcSet={BUSINESS.founderPhoto.srcSet}
                        sizes={BUSINESS.founderPhoto.sizes}
                        alt={BUSINESS.founderPhoto.alt}
                        width={400}
                        height={350}
                        fetchPriority="high"
                        decoding="async"
                        onError={() => setPhotoFailed(true)}
                        className="absolute inset-0 h-full w-full object-cover object-[50%_22%]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                      />
                    </>
                  ) : (
                    <div className="bg-grid relative flex h-full w-full items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl"
                      />
                      <span className="font-display text-[5.5rem] font-bold leading-none tracking-tight text-transparent sm:text-[6.5rem] [background:linear-gradient(135deg,#00df8f,#00b373)] [background-clip:text]">
                        NS
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative mt-6">
                  <h2 className="font-display text-2xl font-bold tracking-tight">
                    {BUSINESS.founder}
                  </h2>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-accent">
                    {BUSINESS.role}
                  </p>
                </div>

                <dl className="relative mt-6 space-y-3 border-t border-line pt-5 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-mist">Spesialis</dt>
                    <dd className="text-right font-medium">Website Usaha AC</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-mist">WhatsApp</dt>
                    <dd className="text-right font-mono text-[0.8rem]">
                      {BUSINESS.whatsapp.display}
                    </dd>
                  </div>
                </dl>

                <a
                  href={WA_LINK_GENERAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-source="hero_id_card_cta"
                  className="relative mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-deep py-3.5 text-sm font-bold text-[#04140c] transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  NGOBROL DI WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee layanan */}
      <div className="relative border-y border-line bg-ink-soft/70 py-4 backdrop-blur-sm">
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max" aria-hidden="true">
            {[0, 1].map((group) => (
              <div key={group} className="flex items-center gap-10 pr-10">
                {MARQUEE_ITEMS.map((text) => (
                  <span
                    key={text}
                    className="flex items-center gap-10 whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em] text-mist"
                  >
                    {text}
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent/70" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only">{MARQUEE_ITEMS.join(", ")}</span>
      </div>
    </section>
  );
}
