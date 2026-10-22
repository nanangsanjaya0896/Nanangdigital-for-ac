import {
  ShieldCheck,
  Clock,
  Snowflake,
  UserCheck,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: ShieldCheck,
    title: "Pelunasan Setelah Cocok",
    description: "DP 50% di awal, sisa 50% dibayar waktu website sudah beres.",
  },
  {
    icon: Clock,
    title: "Beres 3 sampai 5 Hari",
    description: "Jadwal pengerjaan jelas begitu data usaha sudah lengkap.",
  },
  {
    icon: Globe,
    title: "Terima Beres Sama Domain",
    description: "Sudah dapat domain .com atau .id plus hosting tahun pertama.",
  },
  {
    icon: UserCheck,
    title: "Ngobrol Sama Pembuatnya",
    description: "Langsung ditangani Nanang Sanjaya tanpa perantara admin.",
  },
  {
    icon: Snowflake,
    title: "Fokus Usaha Service AC",
    description: "Paham kebutuhan order cuci rutin, isi freon, dan perbaikan.",
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
          eyebrow="Kenapa Pesan di Sini"
          align="center"
          title={
            <>
              Enak Diajak Diskusi, <span className="text-accent">Jelas Hitung-hitungannya</span>.
            </>
          }
          description="Lima hal yang jadi pegangan saya setiap kali mengerjakan website milik rekan-rekan teknisi AC."
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
