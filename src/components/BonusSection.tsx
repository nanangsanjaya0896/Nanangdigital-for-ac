import { MessagesSquare, LayoutTemplate, MapPin, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { waUrl } from "../data/business";

interface Bonus {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
}

const BONUSES: Bonus[] = [
  {
    icon: MessagesSquare,
    title: "Sesi Diskusi Strategi Iklan Lokal",
    description:
      "Kita bahas cara pasang iklan yang hemat budget khusus area sekitar bengkel Anda, mulai dari penentuan radius lokasi sampai kalimat pembukanya.",
    badge: "Senilai Rp300.000",
  },
  {
    icon: LayoutTemplate,
    title: "5 Contekan Caption Siap Posting",
    description:
      "Teks promosi cuci dan perbaikan AC yang tinggal ganti nama usaha lalu pasang di Status WhatsApp, Instagram, atau grup Facebook warga.",
    badge: "Bonus Gratis #2",
  },
  {
    icon: MapPin,
    title: "Panduan Merapikan Google Maps Bisnis",
    description:
      "Langkah demi langkah supaya titik lokasi usaha AC Anda gampang nongol waktu orang sekitar mengetik 'tukang service AC terdekat' di HP.",
    badge: "Bonus Gratis #3",
  },
];

export default function BonusSection() {
  return (
    <section id="bonus" aria-label="Bonus tambahan" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="glow-orb absolute -left-52 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full opacity-50"
      />
      <div className="section-wrap relative">
        <SectionHeader
          index="09"
          eyebrow="Bonus Tambahan"
          title={
            <>
              Dapat Sekalian <span className="text-accent">3 Bekal Promosi</span> Ini.
            </>
          }
          description="Begitu website selesai, Anda juga saya bekali tiga materi praktis ini supaya usaha makin cepat dikenal warga sekitar."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {BONUSES.map((bonus, i) => (
            <Reveal key={bonus.title} delay={i * 0.1}>
              <article
                className={`group relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 md:p-8 ${
                  i === 0
                    ? "border-accent/50 bg-gradient-to-b from-accent/[0.1] to-surface"
                    : "border-line bg-surface hover:border-accent/35"
                }`}
              >
                <span
                  className={`absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[0.68rem] font-bold tracking-wide ${
                    i === 0
                      ? "bg-gradient-to-r from-accent to-accent-deep text-[#04140c]"
                      : "border border-accent/40 bg-ink text-accent"
                  }`}
                >
                  <Gift className="h-3 w-3" aria-hidden="true" />
                  {bonus.badge}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent">
                  <bonus.icon className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold tracking-tight md:text-xl">
                  {bonus.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{bonus.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 text-center text-sm text-mist">
            Mau tanya detail bonus ini untuk paket yang Anda incar?{" "}
            <a
              href={waUrl(
                "Halo Mas Nanang, saya mau tanya soal bonus tambahan kalau bikin website service AC di NanangDigital."
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-track-source="bonus_cta"
              className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-white"
            >
              Chat langsung di WhatsApp
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
