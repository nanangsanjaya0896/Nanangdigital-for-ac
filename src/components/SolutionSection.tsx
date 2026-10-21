import {
  MonitorSmartphone,
  MousePointerClick,
  PenLine,
  Rocket,
  Megaphone,
  LayoutTemplate,
  Users,
  MessagesSquare,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: MonitorSmartphone,
    title: "Website yang profesional",
    description: "Tampilan rapi yang membuat usaha Anda langsung terlihat serius.",
  },
  {
    icon: MousePointerClick,
    title: "CTA WhatsApp yang jelas",
    description: "Pengunjung selalu tahu langkah berikutnya untuk menghubungi Anda.",
  },
  {
    icon: LayoutTemplate,
    title: "Mobile-friendly",
    description: "Nyaman dibuka dari ponsel, tempat sebagian besar calon pelanggan berada.",
  },
  {
    icon: PenLine,
    title: "Copywriting dasar",
    description: "Layanan dijelaskan dengan bahasa sederhana yang mudah dipahami.",
  },
  {
    icon: Megaphone,
    title: "Siap dipromosikan",
    description: "Dukungan setup iklan Meta sesuai paket yang Anda pilih.",
  },
  {
    icon: Rocket,
    title: "Fokus pada lead",
    description: "Struktur halaman diarahkan ke satu tujuan: chat dari calon pelanggan.",
  },
];

const FLOW_STEPS = [
  { icon: Users, label: "Pengunjung", note: "Dari Google, media sosial, atau iklan" },
  { icon: MonitorSmartphone, label: "Website Profesional", note: "Melihat layanan Anda dengan tampilan rapi" },
  { icon: null, label: "Klik WhatsApp", note: "Menekan CTA yang mudah ditemukan", isWhatsApp: true },
  { icon: MessagesSquare, label: "Konsultasi", note: "Ngobrol langsung tentang kebutuhan" },
  { icon: UserCheck, label: "Potensi Pelanggan", note: "Siap dijadwalkan untuk servis" },
];

export default function SolutionSection() {
  return (
    <section
      id="solusi"
      aria-label="Solusi dari NanangDigital"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_80%_20%,black,transparent)]"
      />
      <div className="section-wrap relative">
        <SectionHeader
          index="02"
          eyebrow="Solusi"
          title={
            <>
              Satu Website yang <span className="text-accent">Bekerja Menjemput</span> Calon
              Pelanggan.
            </>
          }
          description="NanangDigital merancang website khusus niche service AC yang siap pakai: bukan sekadar bagus dilihat, tapi mengalirkan pengunjung sampai menjadi chat WhatsApp."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Manfaat */}
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.07}>
                <div className="group flex h-full gap-4 rounded-2xl border border-line bg-surface/70 p-5 transition-colors duration-300 hover:border-accent/40">
                  <benefit.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Alur konversi */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/80 p-7 backdrop-blur md:p-9">
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Alur yang dirancang
              </p>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight md:text-2xl">
                Dari klik pertama sampai chat masuk.
              </h3>

              <ol className="relative mt-8 space-y-0">
                {FLOW_STEPS.map((step, i) => {
                  const isLast = i === FLOW_STEPS.length - 1;
                  return (
                    <li key={step.label} className="relative flex gap-5 pb-8 last:pb-0">
                      {!isLast && (
                        <svg
                          aria-hidden="true"
                          className="absolute left-[1.4rem] top-[3.1rem] h-[calc(100%-3.2rem)] w-px text-accent/40"
                        >
                          <line
                            x1="0.5"
                            y1="0"
                            x2="0.5"
                            y2="100%"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="flow-connector"
                          />
                        </svg>
                      )}
                      <span
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
                          isLast
                            ? "border-accent bg-gradient-to-br from-accent to-accent-deep text-[#04140c] shadow-[0_0_30px_rgba(0,223,143,0.45)]"
                            : "border-line bg-ink text-accent"
                        }`}
                      >
                        {step.isWhatsApp ? (
                          <WhatsAppIcon className="h-5 w-5" />
                        ) : step.icon ? (
                          <step.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                        ) : null}
                      </span>
                      <div className="pt-1.5">
                        <p
                          className={`font-display text-base font-semibold tracking-tight ${
                            isLast ? "text-accent" : "text-white"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="mt-1 text-sm text-mist">{step.note}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="ml-auto pt-2 font-mono text-xs text-mist/50"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
