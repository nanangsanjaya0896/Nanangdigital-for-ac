import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowDown, ArrowRight, Move } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, WA_LINK_GENERAL } from "../data/business";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MARQUEE_ITEMS: string[] = [
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
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(
    null
  );

  const marqueeItems = MARQUEE_ITEMS;
  const waLink = WA_LINK_GENERAL;

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Tarik kartu tetap aktif walau animasi di perangkat dimatikan: gerakannya dikendalikan
    // pengunjung sendiri, dan label "Tarik & goyangkan kartu" selalu tampil di desktop.
    // Yang dimatikan untuk perangkat seperti itu hanya gerakan otomatis (ayunan, kilau, miring saat hover).
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
    if (dragStartRef.current) {
      const dx = Math.max(
        -55,
        Math.min(55, dragStartRef.current.origX + (e.clientX - dragStartRef.current.startX))
      );
      const dy = Math.max(
        -45,
        Math.min(55, dragStartRef.current.origY + (e.clientY - dragStartRef.current.startY))
      );
      setOffset({ x: dx, y: dy });
      setTilt({ rx: -dy * 0.14, ry: dx * 0.22 });
      return;
    }

    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -normY * 10,
      ry: normX * 12,
    });
  };

  const onPointerUp = () => {
    dragStartRef.current = null;
    setDragging(false);
    setOffset({ x: 0, y: 0 });
    setTilt({ rx: 0, ry: 0 });
  };

  const onPointerLeave = () => {
    if (!dragStartRef.current) {
      setTilt({ rx: 0, ry: 0 });
    }
  };

  const dynamicRotation = offset.x * 0.12;

  return (
    <section
      id="beranda"
      aria-label="Beranda"
      className="relative overflow-hidden"
    >
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

      <div className="section-wrap relative grid min-h-screen items-center gap-12 pb-28 pt-32 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:pb-24 lg:pt-28">
        {/* Kolom kiri */}
        <div className="max-w-2xl">
          <p className="hero-in hero-d1 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/[0.07] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {"Khusus Teknisi & Usaha Service AC"}
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
            {"Saya bantu buatkan website yang rapi plus setting iklan Facebook & Instagram untuk usaha service AC Anda. Selesai dalam 3 sampai 5 hari kerja, sudah beres sama domain dan hosting tahun pertama."}
          </p>

          <div className="hero-in hero-d4 mt-10 flex flex-wrap items-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              data-track-source="hero_primary_cta"
              className="btn-primary"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {"Chat & Konsultasi Gratis"}
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
              Lihat contoh website AC yang sudah online
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

        {/* Kolom kanan: kartu ID founder dengan tali lanyard jelas dari atas ke bawah & animasi ayun */}
        <div className="relative mx-auto w-full max-w-[21rem] lg:max-w-[23rem]">
          <span
            aria-hidden="true"
            className="absolute -right-3 top-24 z-30 hidden items-center gap-2 rounded-full border border-accent/35 bg-surface/95 px-3.5 py-2 text-[0.7rem] font-medium text-mist shadow-lg backdrop-blur lg:top-6 lg:inline-flex"
          >
            <Move className="h-3.5 w-3.5 text-accent" />
            {"Tarik & goyangkan kartu"}
          </span>

          <div className={reduced ? "" : "hero-card-float"}>
            <div
              ref={cardRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onPointerLeave={onPointerLeave}
              style={{
                transform: `perspective(950px) translate3d(${offset.x}px, ${offset.y}px, 0) rotateZ(${dynamicRotation}deg) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${dragging ? 1.025 : 1})`,
                transition: dragging ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="cursor-grab touch-pan-y select-none active:cursor-grabbing"
            >
              {/* Tali lanyard jelas memanjang dari atas lurus ke pengait kartu */}
              <div
                aria-hidden="true"
                className="relative mx-auto flex w-full flex-col items-center lg:-mt-[17rem]"
              >
                <div className="flex h-3 w-12 items-center justify-center rounded-full border border-accent/60 bg-[#0d1518] shadow-[0_0_20px_rgba(0,223,143,0.45)]">
                  <span className="h-1 w-6 rounded-full bg-accent" />
                </div>

                <div className="lanyard-strap relative flex h-24 w-5 flex-col items-center justify-center overflow-hidden border-x-2 border-accent/80 shadow-[0_0_28px_rgba(0,223,143,0.3)] sm:h-28 lg:h-[21rem]">
                  <span className="h-full w-[2px] bg-gradient-to-b from-accent via-accent/90 to-accent shadow-[0_0_10px_rgba(0,223,143,0.9)]" />
                </div>

                <div className="relative z-20 flex flex-col items-center">
                  <div className="h-3.5 w-8 rounded-md border border-accent/70 bg-gradient-to-b from-[#26323d] to-[#11171e] shadow-[0_4px_14px_rgba(0,0,0,0.75)]" />
                  <div className="-mt-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-ink shadow-[0_0_14px_rgba(0,223,143,0.65)]" />
                  <div className="-mb-2.5 -mt-1 flex h-4 w-12 items-center justify-center rounded-t-xl border border-accent/60 bg-[#121922] shadow-[0_0_18px_rgba(0,223,143,0.35)]">
                    <span className="h-1.5 w-6 rounded-full bg-accent/80" />
                  </div>
                </div>
              </div>

              {/* Kartu ID */}
              <div className="relative overflow-hidden rounded-[1.75rem] border border-accent/30 bg-surface/95 p-6 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8),0_0_40px_-18px_rgba(0,223,143,0.28)] backdrop-blur-xl sm:p-7">
                <div
                  aria-hidden="true"
                  className="mx-auto mb-4 flex h-2.5 w-14 items-center justify-center rounded-full border border-white/15 bg-ink shadow-inner"
                >
                  <span className="h-1 w-8 rounded-full bg-accent/40" />
                </div>

                {!reduced && (
                  <div
                    aria-hidden="true"
                    className="hero-card-sheen pointer-events-none absolute -inset-y-10 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                  />
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.1] via-transparent to-transparent"
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
                <div className="relative mt-5 aspect-[4/3.5] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#101820] via-[#131c26] to-[#0d1a15]">
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
                    <dd className="text-right font-medium">
                      Website Usaha AC
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-mist">Estimasi</dt>
                    <dd className="text-right font-medium text-accent">
                      3 - 5 Hari Kerja
                    </dd>
                  </div>
                </dl>

                <a
                  href={waLink}
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
                {marqueeItems.map((text) => (
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
        <span className="sr-only">{marqueeItems.join(", ")}</span>
      </div>
    </section>
  );
}
