import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import ProjectStack from "./ProjectStack";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import { PROJECTS, PROJECT_TYPE_LABEL } from "../data/projects";
import type { Project } from "../data/projects";

const ALL_KEY = "__ALL__";

export default function WorksSection() {
  const projects = PROJECTS;
  const typeLabels = PROJECT_TYPE_LABEL;
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const [category, setCategory] = useState<string>(ALL_KEY);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalId, setModalId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const detailBtnRef = useRef<HTMLButtonElement>(null);

  const filtered =
    category === ALL_KEY ? projects : projects.filter((p) => p.category === category);
  const safeIdx = filtered.length === 0 ? 0 : activeIdx % filtered.length;
  const active = filtered[safeIdx];
  const modal = modalId ? projects.find((p) => p.id === modalId) ?? null : null;

  const chooseCategory = (next: string) => {
    setCategory(next);
    setActiveIdx(0);
  };

  const openModal = (project: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setModalId(project.id);
  };

  const closeModal = () => {
    setModalId(null);
    const target = triggerRef.current;
    requestAnimationFrame(() => target?.focus());
  };

  const next = () => setActiveIdx((i) => (i + 1) % filtered.length);
  const prev = () => setActiveIdx((i) => (i - 1 + filtered.length) % filtered.length);

  return (
    <section
      id="karya"
      aria-label="Karya dan contoh desain"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="04"
          eyebrow="Contoh Tampilan"
          title={
            <>
              Intip Gambaran <span className="text-accent">Website & Iklan</span> Usaha AC.
            </>
          }
          description="Beberapa contoh susunan halaman dan tampilan iklan yang bisa disesuaikan warnanya, daftar layanannya, sampai foto tim teknisi usaha Anda."
        />

        {/* Filter kategori */}
        <Reveal delay={0.1}>
          <div
            role="group"
            aria-label="Saring karya berdasarkan kategori"
            className="mt-12 flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => chooseCategory(ALL_KEY)}
              aria-pressed={category === ALL_KEY}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                category === ALL_KEY
                  ? "bg-accent text-[#04140c] shadow-[0_0_24px_rgba(0,223,143,0.4)]"
                  : "border border-line text-mist hover:border-accent/40 hover:text-white"
              }`}
            >
              Semua
            </button>
            {categories.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => chooseCategory(cat)}
                  aria-pressed={isActive}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-accent text-[#04140c] shadow-[0_0_24px_rgba(0,223,143,0.4)]"
                      : "border border-line text-mist hover:border-accent/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Showcase bertumpuk + detail samping */}
        {active && (
          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <ProjectStack
              projects={filtered}
              activeIdx={safeIdx}
              onSelect={setActiveIdx}
              onNext={next}
              onPrev={prev}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="lg:pt-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                    {active.category}
                  </span>
                  <span aria-hidden="true" className="text-white/25">
                    /
                  </span>
                  <span className="text-xs font-medium text-mist">{typeLabels[active.type]}</span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-4xl">
                  {active.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">
                  {active.description}
                </p>

                <ul
                  className="mt-6 flex flex-wrap gap-2"
                  aria-label="Tag karya"
                >
                  {active.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium text-white/85"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <button
                  ref={detailBtnRef}
                  type="button"
                  onClick={() => openModal(active, detailBtnRef.current ?? document.body)}
                  className="btn-ghost mt-8 text-sm"
                >
                  Lihat Detail Karya
                  <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden="true" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Grid pelengkap */}
        <div className="mt-24 border-t border-line pt-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
              {category === ALL_KEY
                ? "Semua Contoh Tampilan"
                : category}
            </h3>
            <p className="text-sm text-mist">
              {`${filtered.length} contoh tersedia. Klik kartu untuk lihat rincian isinya`}
            </p>
          </div>

          <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={openModal} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Modal detail karya */}
      <AnimatePresence>
        {modal && <ProjectDetailModal project={modal} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
}
