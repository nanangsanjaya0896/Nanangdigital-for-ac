import { Smartphone, MessageCircle, PenTool, BadgeCheck, Target, MoveRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

interface Feature {
  icon: LucideIcon;
  feature: string;
  benefit: string;
}

const FEATURES: Feature[] = [
  {
    icon: Smartphone,
    feature: "Desain mobile-friendly",
    benefit: "Mudah diakses calon pelanggan dari ponsel.",
  },
  {
    icon: MessageCircle,
    feature: "CTA WhatsApp jelas",
    benefit: "Mempermudah calon pelanggan menghubungi bisnis Anda.",
  },
  {
    icon: PenTool,
    feature: "Copywriting dasar",
    benefit: "Membantu layanan lebih mudah dipahami tanpa istilah teknis.",
  },
  {
    icon: BadgeCheck,
    feature: "Landing page profesional",
    benefit: "Membantu usaha Anda terlihat lebih terpercaya.",
  },
  {
    icon: Target,
    feature: "Struktur promosi siap iklan",
    benefit: "Mendukung kampanye lokal sesuai paket yang dipilih.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="fitur"
      aria-label="Fitur dan manfaatnya untuk bisnis"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="06"
          eyebrow="Fitur & Manfaat"
          title={
            <>
              Fitur Teknis, Diterjemahkan Menjadi{" "}
              <span className="text-accent">Manfaat Bisnis</span>.
            </>
          }
          description="Anda tidak perlu memahami istilah website. Ini yang sebenarnya Anda dapatkan dari setiap fitur yang kami bangun:"
        />

        <div className="mt-14">
          {FEATURES.map((item, i) => (
            <Reveal key={item.feature} delay={i * 0.06}>
              <div className="group grid gap-4 border-b border-line py-7 transition-colors duration-300 first:border-t hover:bg-white/[0.02] md:grid-cols-[auto_1fr_auto_1.4fr] md:items-center md:gap-8 md:px-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] font-mono text-sm text-accent transition-colors duration-300 group-hover:border-accent/50">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-4">
                  <item.icon
                    className="h-5 w-5 shrink-0 text-mist transition-colors duration-300 group-hover:text-accent"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">
                    {item.feature}
                  </h3>
                </div>

                <MoveRight
                  className="hidden h-5 w-5 text-accent/60 transition-transform duration-300 group-hover:translate-x-1.5 md:block"
                  aria-hidden="true"
                />

                <p className="text-sm leading-relaxed text-mist md:text-base">{item.benefit}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
