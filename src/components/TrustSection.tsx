import {
  Smartphone,
  MessagesSquare,
  Snowflake,
  ClipboardList,
  MousePointerClick,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Hanya memuat hal faktual tentang layanan — tanpa statistik atau klaim
 * yang belum tervalidasi (sesuai PRD §11.11).
 */
const TRUST_ITEMS: TrustItem[] = [
  {
    icon: Smartphone,
    title: "Mobile-Friendly",
    description: "Setiap website dirancang nyaman dibuka dari ponsel.",
  },
  {
    icon: MessagesSquare,
    title: "Dukungan Konsultasi",
    description: "Diskusi kebutuhan sebelum dan selama pengerjaan.",
  },
  {
    icon: Snowflake,
    title: "Fokus Niche AC",
    description: "Struktur dan bahasa yang relevan untuk bisnis service AC.",
  },
  {
    icon: ClipboardList,
    title: "Proses Jelas",
    description: "Empat langkah terukur dari konsultasi sampai live.",
  },
  {
    icon: MousePointerClick,
    title: "CTA WhatsApp Mudah Ditemukan",
    description: "Pengunjung selalu tahu cara menghubungi Anda.",
  },
];

export default function TrustSection() {
  return (
    <section
      id="kepercayaan"
      aria-label="Alasan memilih NanangDigital"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="10"
          eyebrow="Kenapa NanangDigital"
          align="center"
          title={
            <>
              Sederhana, Jelas, dan <span className="text-accent">Fokus pada Hasil</span>.
            </>
          }
          description="Tidak ada janji berlebihan. Ini hal yang benar-benar kami kerjakan untuk setiap website."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="group flex h-full flex-col items-center rounded-2xl border border-line bg-surface/70 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white/[0.03] text-accent transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_24px_rgba(0,223,143,0.3)]">
                  <item.icon className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-mist">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
