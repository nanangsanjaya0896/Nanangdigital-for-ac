import { MessagesSquare, LayoutTemplate, MapPin, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { waUrl } from "../data/business";

interface Bonus {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

const BONUSES: Bonus[] = [
  {
    icon: MessagesSquare,
    title: "Konsultasi Strategi Iklan Gratis",
    description:
      "Sesi diskusi strategi iklan untuk bisnis AC Anda: angle komunikasi, area targeting, dan langkah awal yang masuk akal.",
    badge: "Senilai Rp300.000",
  },
  {
    icon: LayoutTemplate,
    title: "5 Template Caption Media Sosial",
    description:
      "Caption siap pakai untuk mempromosikan layanan cuci dan service AC Anda di media sosial — tinggal sesuaikan nama bisnis.",
  },
  {
    icon: MapPin,
    title: "Panduan Optimasi Google Maps / Google Bisnis",
    description:
      "Langkah praktis agar usaha Anda lebih mudah ditemukan calon pelanggan di pencarian lokal sekitar area kerja.",
  },
];

export default function BonusSection() {
  return (
    <section id="bonus" aria-label="Bonus penawaran" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="glow-orb absolute -left-52 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full opacity-50"
      />
      <div className="section-wrap relative">
        <SectionHeader
          index="09"
          eyebrow="Bonus"
          title={
            <>
              Bonus untuk <span className="text-accent">Memperlancar Promosi</span> Anda.
            </>
          }
          description="Tiga pendamping praktis agar website baru Anda tidak berhenti sebagai halaman — tapi benar-benar mulai bekerja."
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
                {bonus.badge && (
                  <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-deep px-3.5 py-1 text-[0.68rem] font-bold tracking-wide text-[#04140c]">
                    <Gift className="h-3 w-3" aria-hidden="true" />
                    {bonus.badge}
                  </span>
                )}

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
            Penasaran dengan bonusnya?{" "}
            <a
              href={waUrl(
                "Halo NanangDigital, saya ingin tanya tentang bonus (konsultasi strategi iklan, template caption, dan panduan Google Bisnis) untuk paket website service AC."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-white"
            >
              Tanyakan langsung saat konsultasi
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
