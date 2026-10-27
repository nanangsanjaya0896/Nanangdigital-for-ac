import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { waUrl } from "../data/business";
import { PROJECT_TYPE_LABEL } from "../data/projects";
import type { Project } from "../data/projects";

interface ProjectShowcaseProps {
  project: Project;
  /** Tukar posisi gambar dan teks di desktop (untuk karya ke-2, ke-4, dan seterusnya) */
  reverse?: boolean;
}

/** Titik hijau berdenyut penanda website sedang online. */
function LiveDot() {
  return (
    <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

export default function ProjectShowcase({ project, reverse = false }: ProjectShowcaseProps) {
  const [screenIdx, setScreenIdx] = useState(0);
  const screen = project.screens[screenIdx] ?? project.screens[0];
  const titleId = `karya-${project.id}`;
  const waLink = waUrl(
    `Halo Mas Nanang, saya sudah lihat contoh website ${project.title} dan mau dibuatkan website seperti itu untuk usaha service AC saya.`
  );

  return (
    <article
      aria-labelledby={titleId}
      className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16"
    >
      {/* Tampilan website: bingkai browser (desktop) + bingkai HP */}
      <Reveal className={reverse ? "lg:order-2" : undefined}>
        {project.screens.length > 1 && (
          <div
            role="group"
            aria-label={`Pilih tampilan website ${project.title}`}
            className="mb-5 inline-flex rounded-full border border-line bg-white/[0.03] p-1"
          >
            {project.screens.map((item, i) => {
              const isActive = i === screenIdx;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setScreenIdx(i)}
                  aria-pressed={isActive}
                  className={`min-h-[40px] rounded-full px-4 text-xs font-semibold transition-all ${
                    isActive ? "bg-accent text-[#04140c]" : "text-mist hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="relative pb-10 pr-7 sm:pb-12 sm:pr-12">
          <a
            href={screen.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/40">
              <div className="flex items-center gap-3 border-b border-line bg-[#0b0f13] px-4 py-3">
                <span aria-hidden="true" className="flex shrink-0 gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1.5 text-[0.7rem] text-mist">
                  <LiveDot />
                  <span className="truncate">{screen.displayUrl}</span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-mist transition-colors group-hover:text-accent"
                />
              </div>
              {/* Semua tampilan dimuat sekaligus (lazy) supaya ganti tab langsung muncul tanpa jeda */}
              <div className="relative aspect-[16/10] w-full bg-[#0b0f13]">
                {project.screens.map((item, i) => {
                  const isActive = i === screenIdx;
                  return (
                    <img
                      key={item.src}
                      src={item.src}
                      srcSet={item.srcSet}
                      sizes={item.srcSet ? "(min-width: 1024px) 600px, 92vw" : undefined}
                      width={item.width}
                      height={item.height}
                      alt={isActive ? item.alt : ""}
                      aria-hidden={isActive ? undefined : true}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
            <span className="sr-only"> (buka di tab baru)</span>
          </a>

          {project.mobileScreen && (
            <div className="pointer-events-none absolute bottom-0 right-0 w-[27%] max-w-[170px] overflow-hidden rounded-[1.35rem] border-[5px] border-[#1c222b] bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
              <img
                src={project.mobileScreen.src}
                width={project.mobileScreen.width}
                height={project.mobileScreen.height}
                alt={project.mobileScreen.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          )}
        </div>
      </Reveal>

      {/* Penjelasan karya */}
      <Reveal delay={0.1} className={reverse ? "lg:order-1" : undefined}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1 text-xs font-medium text-white/90">
            <LiveDot />
            {`${PROJECT_TYPE_LABEL[project.type]}, sudah online`}
          </span>
        </div>

        <h3 id={titleId} className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">{project.description}</p>

        <ul className="mt-7 space-y-3">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-relaxed text-white/90">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            Lihat Website Live
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (buka di tab baru)</span>
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            data-track-source="karya_website_seperti_ini"
            className="btn-ghost text-sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Mau Website Seperti Ini
          </a>
        </div>

        {project.note && <p className="mt-6 text-xs leading-relaxed text-mist">{project.note}</p>}
      </Reveal>
    </article>
  );
}
