import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessagesSquare,
  Wrench,
  ClipboardCheck,
  Rocket,
  Plus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: MessagesSquare,
    title: "Konsultasi Gratis",
    description:
      "Ceritakan kebutuhan bisnis Anda via WhatsApp. Gratis dan tanpa komitmen apa pun.",
  },
  {
    icon: Wrench,
    title: "Pengerjaan Website",
    description:
      "Website dikerjakan sekitar 3–5 hari kerja setelah seluruh data diterima lengkap.",
  },
  {
    icon: ClipboardCheck,
    title: "Review & Revisi",
    description:
      "Anda meninjau hasilnya dan memberi masukan untuk revisi sesuai cakupan paket.",
  },
  {
    icon: Rocket,
    title: "Live & Siap Iklan",
    description:
      "Website tayang dan siap dipakai untuk promosi organik maupun iklan berbayar.",
  },
];

const METHODOLOGY = [
  {
    id: "briefing",
    title: "Briefing",
    description:
      "Diskusi singkat untuk menangkap kebutuhan, layanan prioritas, dan area kerja bisnis Anda.",
  },
  {
    id: "analisis",
    title: "Analisis Kebutuhan",
    description:
      "Menentukan paket yang paling sesuai serta apa saja yang perlu disiapkan sebelum pengerjaan.",
  },
  {
    id: "struktur",
    title: "Struktur & Konten",
    description:
      "Menyusun urutan halaman dan menulis konten dengan bahasa yang mudah dipahami calon pelanggan.",
  },
  {
    id: "desain",
    title: "Desain & Pengembangan",
    description:
      "Mengubah struktur menjadi tampilan website profesional yang selesai dibangun dan berfungsi penuh.",
  },
  {
    id: "uji",
    title: "Uji Responsif",
    description:
      "Memastikan website nyaman dibuka di ponsel, tablet, dan komputer sebelum diserahkan ke Anda.",
  },
  {
    id: "tayang",
    title: "Finalisasi & Tayang",
    description:
      "Revisi dibereskan, website di-online-kan, dan Anda menerima panduan penggunaan dasarnya.",
  },
];

export default function ProcessSection() {
  const [openId, setOpenId] = useState<string | null>("briefing");

  return (
    <section
      id="proses"
      aria-label="Proses kerja"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="08"
          eyebrow="Proses Kerja"
          title={
            <>
              Empat Langkah Menuju <span className="text-accent">Online</span>.
            </>
          }
          description="Proses dibuat sederhana dan jelas dari awal — Anda selalu tahu sedang berada di tahap mana."
        />

        {/* Timeline 4 langkah */}
        <div className="relative mt-16">
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[1.875rem] top-8 w-px bg-gradient-to-b from-accent/60 via-accent/25 to-transparent lg:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute left-[9%] right-[9%] top-[1.875rem] hidden h-px bg-gradient-to-r from-accent/5 via-accent/50 to-accent/5 lg:block"
          />

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <li className="relative flex gap-6 lg:block">
                  <div className="relative z-10 flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-full border border-accent/40 bg-ink shadow-[0_0_30px_rgba(0,223,143,0.2)]">
                    <step.icon className="h-5 w-5 text-accent" strokeWidth={1.9} aria-hidden="true" />
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2 py-0.5 font-mono text-[0.6rem] font-bold text-[#04140c]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="pt-1 lg:mt-8 lg:pr-4">
                    <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist">{step.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Accordion metodologi (single-open) */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Di Balik Empat Langkah Itu
              <span className="text-accent">.</span>
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist md:text-base">
              Agar hasilnya rapi, setiap tahap besar dikerjakan lewat metodologi kecil yang runtut —
              dari briefing sampai website tayang. Klik untuk melihat rinciannya.
            </p>
          </Reveal>

          <div className="space-y-3" role="group" aria-label="Rincian metodologi pengerjaan">
            {METHODOLOGY.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <Reveal key={item.id} delay={i * 0.05}>
                  <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`metodologi-panel-${item.id}`}
                      id={`metodologi-trigger-${item.id}`}
                      className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-white/[0.02]"
                    >
                      <span className="font-mono text-xs text-accent/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-base font-semibold tracking-tight md:text-lg">
                        {item.title}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isOpen ? "border-accent/60 text-accent" : "border-line text-mist"
                        }`}
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          id={`metodologi-panel-${item.id}`}
                          role="region"
                          aria-labelledby={`metodologi-trigger-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-white/5 px-5 pb-5 pl-14 pt-4 text-sm leading-relaxed text-mist">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
