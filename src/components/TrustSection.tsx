import { UserCheck, RefreshCw, MessageCircle, FileCheck2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { BUSINESS } from "../data/business";

interface Commitment {
  icon: LucideIcon;
  title: string;
  description: string;
}

const COMMITMENTS: Commitment[] = [
  {
    icon: UserCheck,
    title: "Langsung Ditangani Nanang Sendiri",
    description:
      "Bukan dilempar ke tim magang. Yang ngobrol di chat sama Anda, itu juga yang ngerjain websitenya sampai beres.",
  },
  {
    icon: FileCheck2,
    title: "Lunasnya Nanti Kalau Sudah Jadi",
    description:
      "Awal pengerjaan cukup DP 50%. Sisa 50% baru dibayar setelah website selesai dan Anda cek sendiri di HP.",
  },
  {
    icon: RefreshCw,
    title: "Revisi Enak, Tinggal Sebut di Chat",
    description:
      "Mau ganti foto, ubah kisaran tarif cuci AC, atau tambah nama perumahan area layanan? Tinggal kabari saja.",
  },
  {
    icon: MessageCircle,
    title: "Habis Tayang Tidak Ditinggal Kabur",
    description:
      "Kalau besok-besok bingung cara pakai atau mau nanya soal iklan, nomor WhatsApp saya tetap aktif dan siap bantu.",
  },
];

export default function TrustSection() {
  const commitments = COMMITMENTS;

  return (
    <section
      id="komitmen"
      aria-label="Komitmen kerja NanangDigital"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="10"
          eyebrow="Enaknya Kerja Bareng"
          title={
            <>
              Transparan dari Awal, <span className="text-accent">Aman Sampai Beres</span>.
            </>
          }
          description={
            `Saya tidak mengarang cerita muluk-muluk. Ini empat hal pasti yang selalu saya pegang tiap mengerjakan website klien di ${BUSINESS.brand}.`
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {commitments.map((commitment, i) => (
            <Reveal key={commitment.title} delay={i * 0.08}>
              <article className="flex h-full gap-5 rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-accent/40 md:p-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent">
                  <commitment.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
                    {commitment.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist md:text-base">
                    {commitment.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
