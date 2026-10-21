import { Compass, ListChecks, Hand, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, WA_LINK_GENERAL } from "../data/business";

interface Approach {
  icon: LucideIcon;
  title: string;
  description: string;
}

const APPROACHES: Approach[] = [
  {
    icon: Compass,
    title: "Memahami kebutuhan bisnis",
    description:
      "Pengerjaan dimulai dari diskusi tentang layanan, area kerja, dan calon pelanggan Anda.",
  },
  {
    icon: ListChecks,
    title: "Menyusun informasi yang jelas",
    description:
      "Konten ditata agar pengunjung langsung paham apa yang Anda tawarkan, tanpa istilah teknis.",
  },
  {
    icon: Hand,
    title: "Mendesain yang mudah digunakan",
    description:
      "Tampilan dibuat nyaman dibaca dan mudah ditekan, terutama dari layar ponsel.",
  },
  {
    icon: MessageCircle,
    title: "Mengarahkan pengunjung ke WhatsApp",
    description:
      "Setiap halaman punya satu misi sederhana: menghasilkan chat dari calon pelanggan.",
  },
];

const SKILL_CHIPS = ["Web Development", "Landing Page", "Copywriting", "Meta Ads"];

export default function FounderSection() {
  return (
    <section id="tentang" aria-label={`Tentang ${BUSINESS.brand}`} className="relative py-24 md:py-32">
      <div className="section-wrap">
        <SectionHeader
          index="03"
          eyebrow="Tentang NanangDigital"
          title={
            <>
              Dibangun untuk Membantu Bisnis Lokal{" "}
              <span className="text-accent">Tampil Meyakinkan</span> Secara Online.
            </>
          }
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Kartu profil founder */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 md:p-8">
              <div
                aria-hidden="true"
                className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
              />
              <div className="relative flex items-center gap-5">
                <div className="bg-grid flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#101820] to-[#0d1a15]">
                  <span className="font-display text-3xl font-bold tracking-tight text-transparent [background:linear-gradient(135deg,#00df8f,#00b373)] [background-clip:text]">
                    NS
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                    {BUSINESS.founder}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {BUSINESS.role}
                  </p>
                </div>
              </div>

              <p className="relative mt-6 text-sm leading-relaxed text-mist">
                Menangani langsung setiap proyek dari konsultasi awal sampai website tayang — tidak
                ada perantara, tidak ada penjelasan berbelit. Foto resmi menyusul setelah tersedia.
              </p>

              <div className="relative mt-7 border-t border-line pt-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-mist">
                  Fokus pengerjaan
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Fokus pengerjaan">
                  {SKILL_CHIPS.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/90 transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Narasi + pendekatan */}
          <div>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-mist md:text-lg">
                {BUSINESS.brand} adalah layanan pembuatan website yang berfokus pada satu niche:{" "}
                <strong className="font-semibold text-white">
                  bisnis service AC dan cuci AC rumahan
                </strong>
                . Fokus ini dipilih dengan sengaja — agar struktur halaman, bahasa, dan alur
                konsultasinya benar-benar sesuai dengan cara pelanggan AC mencari jasa.
              </p>
              <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">
                Tidak ada birokrasi berlapis. Anda berbicara langsung dengan orang yang mengerjakan
                website Anda, dari diskusi kebutuhan sampai website siap dipakai berpromosi.
              </p>
            </Reveal>

            <ol className="mt-10 space-y-1">
              {APPROACHES.map((approach, i) => (
                <Reveal key={approach.title} delay={0.15 + i * 0.08}>
                  <li className="group flex gap-5 border-b border-line py-5 transition-colors first:border-t hover:bg-white/[0.02]">
                    <span className="font-mono text-xs text-accent/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-mist transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <approach.icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold tracking-tight md:text-lg">
                        {approach.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-mist">
                        {approach.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.5}>
              <a href={WA_LINK_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-9">
                <WhatsAppIcon className="h-4 w-4" />
                Konsultasi Gratis
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
