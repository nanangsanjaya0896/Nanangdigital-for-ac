import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MousePointerClick } from "lucide-react";
import type { Project } from "../data/projects";
import { PROJECT_TYPE_LABEL } from "../data/projects";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface ProjectStackProps {
  projects: Project[];
  activeIdx: number;
  onSelect: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const MAX_VISIBLE = 3;

/**
 * Stack kartu 3 dimensi.
 * - Klik kartu depan: putar ke karya berikutnya.
 * - Klik kartu belakang: pilih karya tersebut.
 * - Dot dan tombol prev/next ramah keyboard.
 * - diff = (index - activeIdx + n) % n sesuai spesifikasi.
 */
export default function ProjectStack({
  projects,
  activeIdx,
  onSelect,
  onNext,
  onPrev,
}: ProjectStackProps) {
  const reduced = useReducedMotion();
  const count = projects.length;

  if (count === 0) return null;

  const visibleCount = Math.min(count, MAX_VISIBLE);
  const layers = Array.from({ length: visibleCount }, (_, diff) => {
    const index = (activeIdx + diff) % count;
    return { project: projects[index], index, diff };
  });

  return (
    <div>
      <div
        className="relative mx-auto h-[340px] w-full md:h-[450px] lg:h-[470px]"
        style={{ perspective: 1000 }}
      >
        {layers
          .slice()
          .reverse()
          .map(({ project, index, diff }) => {
            const isFront = diff === 0;
            return (
              <motion.button
                key={project.id}
                type="button"
                onClick={() => (isFront ? onNext() : onSelect(index))}
                aria-label={
                  isFront && count > 1
                    ? `${project.title}, klik untuk melihat contoh berikutnya`
                    : `Pilih contoh ${project.title}`
                }
                className="absolute inset-x-0 top-0 mx-auto w-full max-w-[33rem] cursor-pointer overflow-hidden rounded-3xl border border-line bg-surface text-left shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]"
                style={{ transformOrigin: "center bottom", transformStyle: "preserve-3d" }}
                initial={false}
                animate={{
                  y: reduced ? diff * 10 : diff * 35,
                  scale: 1 - diff * 0.05,
                  rotateX: reduced ? 0 : diff * 2,
                  opacity: 1 - diff * 0.3,
                  zIndex: MAX_VISIBLE - diff,
                }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-40 w-full object-cover md:h-56"
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] backdrop-blur ${
                      project.type === "demo"
                        ? "border-amber-300/40 bg-black/50 text-amber-200"
                        : project.type === "concept"
                          ? "border-sky-300/40 bg-black/50 text-sky-200"
                          : "border-accent/50 bg-black/50 text-accent"
                    }`}
                  >
                    {PROJECT_TYPE_LABEL[project.type]}
                  </span>
                  {isFront && count > 1 && !reduced && (
                    <span
                      aria-hidden="true"
                      className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[0.65rem] font-semibold text-white/90 backdrop-blur"
                    >
                      <MousePointerClick className="h-3 w-3" />
                      Geser contoh
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                  <div className="min-w-0">
                    <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent">
                      {project.category}
                    </span>
                    <span className="mt-1.5 block truncate font-display text-lg font-bold tracking-tight md:text-xl">
                      {project.title}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-mist/60"
                  >
                    {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </span>
                </div>

                {isFront && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-accent via-accent/60 to-transparent"
                  />
                )}
              </motion.button>
            );
          })}
      </div>

      {/* Kontrol: prev / dots / next */}
      {count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5 md:gap-7">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Karya sebelumnya"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-mist transition-all hover:border-accent/60 hover:text-accent active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-0.5" role="group" aria-label="Pilih karya langsung">
            {projects.map((project, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Karya ${i + 1}: ${project.title}`}
                  className="group inline-flex h-11 w-9 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className={`block h-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-7 bg-accent shadow-[0_0_10px_rgba(0,223,143,0.6)]"
                        : "w-2.5 bg-white/25 group-hover:bg-white/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onNext}
            aria-label="Karya berikutnya"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-mist transition-all hover:border-accent/60 hover:text-accent active:scale-95"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
