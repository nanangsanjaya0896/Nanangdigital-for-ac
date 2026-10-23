import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";
import { PROJECT_TYPE_LABEL_BY_LANG } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { lang } = useLanguage();
  const typeLabel = PROJECT_TYPE_LABEL_BY_LANG[lang][project.type];

  return (
    <motion.button
      type="button"
      layout
      onClick={(event) => onOpen(project, event.currentTarget)}
      aria-label={
        lang === "id"
          ? `Lihat detail karya ${project.title}`
          : `View sample details for ${project.title}`
      }
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_24px_60px_-24px_rgba(0,223,143,0.3)]"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.alt}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] backdrop-blur ${
            project.type === "demo"
              ? "border-amber-300/40 bg-black/55 text-amber-200"
              : project.type === "concept"
                ? "border-sky-300/40 bg-black/55 text-sky-200"
                : "border-accent/50 bg-black/55 text-accent"
          }`}
        >
          {typeLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent">
          {project.category}
        </span>
        <span className="mt-2 block font-display text-lg font-bold tracking-tight md:text-xl">
          {project.title}
        </span>
        <span className="mt-2.5 line-clamp-2 block text-sm leading-relaxed text-mist">
          {project.description}
        </span>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <ul
            className="flex flex-wrap gap-1.5"
            aria-label={lang === "id" ? "Tag karya" : "Sample tags"}
          >
            {project.tags.slice(0, 2).map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-2.5 py-1 text-[0.65rem] font-medium text-mist"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-accent">
            {lang === "id" ? "Detail" : "Preview"}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
