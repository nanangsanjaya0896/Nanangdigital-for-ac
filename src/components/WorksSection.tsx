import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Layers } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import ProjectStack from "./ProjectStack";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import WhatsAppIcon from "./WhatsAppIcon";
import { PROJECTS, PROJECT_CATEGORIES, PROJECT_TYPE_LABEL } from "../data/projects";
import type { Project } from "../data/projects";
import { WA_LINK_GENERAL } from "../data/business";

export default function WorksSection() {
  const [filter, setFilter] = useState<string>("Semua");
  const [activeIdx, setActiveIdx] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(
    () => (filter === "Semua" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  // Reset indeks stack setiap filter berubah (termasuk menangani data kosong).
  useEffect(() => {
    setActiveIdx(0);
  }, [filter]);

  const hasProjects = filtered.length > 0;
  const activeProject = hasProjects ? filtered[Math.min(activeIdx, filtered.length - 1)] : null;

  const next = () => {
    if (filtered.length <= 1) return;
    setActiveIdx((i) => (i + 1) % filtered.length);
  };
  const prev = () => {
    if (filtered.length <= 1) return;
    setActiveIdx((i) => (i - 1 + filtered.length) % filtered.length);
  };
  const select = (index: number) => {
    if (!hasProjects) return;
    setActiveIdx(((index % filtered.length) + filtered.length) % filtered.length);
  };

  const openDetail = (project: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(project);
  };

  const closeDetail = () => {
    setSelected(null);
    // Kembalikan fokus ke elemen pemicu setelah modal tertutup.
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <section
      id="karya"
      aria-label="Karya dan contoh tampilan"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="04"
          eyebrow="Contoh Desain"
          title={
            <>
              Gambaran Tampilan untuk <span className="text-accent">Usaha Service AC</span>.
            </>
          }
          description="Silakan geser atau klik kartu di bawah untuk melihat pilihan gaya desain yang bisa kami sesuaikan dengan nama usaha Anda."
        />

        <Reveal delay={0.1}>
          <p className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] px-5 py-4 text-sm leading-relaxed text-mist">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span>
              Seluruh gambar di bawah berstatus{" "}
              <strong className="font-semibold text-amber-200">Demo</strong> dan{" "}
              <strong className="font-semibold text-sky-200">Konsep</strong> sebagai referensi
              tampilan. Nanti warna, logo, foto teknisi, dan rincian harganya diganti penuh memakai
              identitas usaha Anda sendiri.
            </span>
          </p>
        </Reveal>

        {/* Showcase: stack + panel detail */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <ProjectStack
              projects={filtered}
              activeIdx={activeIdx}
              onSelect={select}
              onNext={next}
              onPrev={prev}
            />
          </Reveal>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {activeProject ? (
                <motion.aside
                  key={activeProject.id}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-line bg-surface/70 p-7 backdrop-blur md:p-9"
                  aria-live="polite"
                  aria-label="Detail karya aktif"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[7rem] font-bold leading-none text-white/[0.04]"
                  >
                    {String(activeIdx + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] ${
                        activeProject.type === "demo"
                          ? "border-amber-300/40 text-amber-200"
                          : activeProject.type === "concept"
                            ? "border-sky-300/40 text-sky-200"
                            : "border-accent/50 text-accent"
                      }`}
                    >
                      {PROJECT_TYPE_LABEL[activeProject.type]}
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-mist">
                      {activeProject.category}
                    </span>
                  </div>

                  <h3 className="relative mt-6 font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {activeProject.title}
                  </h3>
                  <p className="relative mt-4 text-sm leading-relaxed text-mist md:text-base">
                    {activeProject.description}
                  </p>

                  <ul
                    className="relative mt-6 flex flex-wrap gap-2"
                    aria-label="Tag karya aktif"
                  >
                    {activeProject.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/85"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-8 border-t border-line pt-6">
                    <button
                      type="button"
                      onClick={(event) => openDetail(activeProject, event.currentTarget)}
                      className="btn-primary !px-7 !py-3.5 text-sm"
                    >
                      Lihat Detail Contoh
                    </button>
                    <p className="mt-4 font-mono text-xs text-mist/60">
                      Contoh {String(activeIdx + 1).padStart(2, "0")} dari{" "}
                      {String(filtered.length).padStart(2, "0")}
                    </p>
                  </div>
                </motion.aside>
              ) : (
                <motion.div
                  key="kosong"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[16rem] flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-surface/40 p-8 text-center"
                >
                  <Layers className="h-8 w-8 text-mist/60" aria-hidden="true" />
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
                    Belum ada contoh untuk kategori ini. Silakan pilih kategori lain atau tanyakan
                    langsung.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Filter + grid semua contoh */}
        <div className="mt-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                Jelajahi Semua Contoh
                <span className="text-accent">.</span>
              </h3>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter karya">
                {["Semua", ...PROJECT_CATEGORIES].map((category) => {
                  const isActive = filter === category;
                  const count =
                    category === "Semua"
                      ? PROJECTS.length
                      : PROJECTS.filter((p) => p.category === category).length;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setFilter(category)}
                      aria-pressed={isActive}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                        isActive
                          ? "border-accent bg-accent/10 text-accent shadow-[0_0_20px_rgba(0,223,143,0.2)]"
                          : "border-line text-mist hover:border-white/25 hover:text-white"
                      }`}
                    >
                      {category}
                      <span className="ml-1.5 opacity-60">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {hasProjects ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} onOpen={openDetail} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-line bg-surface/40 px-6 py-16 text-center">
              <Layers className="h-10 w-10 text-mist/50" aria-hidden="true" />
              <h4 className="mt-5 font-display text-lg font-semibold">
                Belum ada contoh di kategori ini
              </h4>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">
                Kami memilih menampilkan kategori kosong apa adanya daripada membuat karya palsu.
                Tanyakan saja contoh yang Anda butuhkan.
              </p>
              <a
                href={WA_LINK_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-7 text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Tanya via WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Modal detail karya */}
      <AnimatePresence>
        {selected && <ProjectDetailModal project={selected} onClose={closeDetail} />}
      </AnimatePresence>
    </section>
  );
}
