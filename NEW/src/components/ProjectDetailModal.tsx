import { useRef } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { Project } from "../data/projects";
import { PROJECT_TYPE_LABEL } from "../data/projects";
import WhatsAppIcon from "./WhatsAppIcon";
import { waUrl } from "../data/business";
import { useScrollLock } from "../hooks/useScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

/**
 * Modal detail karya — tidak berpindah halaman.
 * role dialog, aria-modal, Escape, focus trap, klik backdrop menutup.
 */
export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(true);
  useFocusTrap(panelRef, true, onClose);

  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-detail-karya"
          className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl"
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Gambar header */}
          <div className="relative">
            <img
              src={project.image}
              alt={project.alt}
              className="h-52 w-full object-cover md:h-72"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"
            />
            <span
              className={`absolute left-5 top-5 rounded-full border px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] backdrop-blur ${
                project.type === "demo"
                  ? "border-amber-300/40 bg-black/60 text-amber-200"
                  : project.type === "concept"
                    ? "border-sky-300/40 bg-black/60 text-sky-200"
                    : "border-accent/50 bg-black/60 text-accent"
              }`}
            >
              {PROJECT_TYPE_LABEL[project.type]}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup detail karya"
              data-autofocus
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-accent/60 hover:text-accent"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Isi */}
          <div className="p-6 md:p-9">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-accent">
              {project.category}
            </p>
            <h3
              id="judul-detail-karya"
              className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl"
            >
              {project.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/90 md:text-lg">
              {project.description}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-mist md:text-base">
              {project.overview}
            </p>

            {/* Ruang lingkup */}
            <div className="mt-8 rounded-2xl border border-line bg-white/[0.02] p-5 md:p-6">
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                Yang ditampilkan pada contoh ini
              </h4>
              <ul className="mt-4 space-y-3">
                {project.scope.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tag karya">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-mist"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
              <a
                href={waUrl(
                  `Halo NanangDigital, saya melihat contoh ${PROJECT_TYPE_LABEL[project.type].toLowerCase()} "${project.title}" di website Anda. Saya ingin diskusi tampilan serupa untuk bisnis service AC saya.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Diskusikan tampilan seperti ini
              </a>
              <p className="text-xs leading-relaxed text-mist">
                Karya ini adalah {PROJECT_TYPE_LABEL[project.type].toLowerCase()} untuk menunjukkan
                contoh tampilan — bukan klaim hasil proyek klien.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
