import { EyeOff, SearchX, PhoneMissed, Megaphone, Repeat, ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/LanguageContext";

interface Problem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PROBLEMS_BY_LANG: Record<Locale, Problem[]> = {
  id: [
    {
      icon: EyeOff,
      title: "Calon pelanggan ragu panggil teknisi baru",
      description:
        "Orang mau memasukkan tukang ke dalam rumahnya. Tanpa halaman usaha yang jelas, mereka sering lebih percaya jasa sebelah yang profilnya rapi.",
    },
    {
      icon: Repeat,
      title: "Capek mengetik info harga berulang-ulang",
      description:
        "Lagi sibuk di atas tangga cuci outdoor, HP bunyi tanya 'Cuci 1 PK berapa? Area mana saja?'. Waktu kerja habis buat balas chat yang sama tiap hari.",
    },
    {
      icon: Megaphone,
      title: "Sudah pasang iklan, tapi yang chat sepi",
      description:
        "Biaya iklan jalan terus, tapi orang cuma mampir sebentar ke medsos lalu keluar lagi karena bingung mau pesan layanan yang mana.",
    },
    {
      icon: SearchX,
      title: "Info area & jenis layanan tercecer",
      description:
        "Pelanggan ingin tahu cepat apakah Anda terima isi freon, bongkar pasang, dan menjangkau daerah mereka hari ini juga.",
    },
    {
      icon: PhoneMissed,
      title: "Chat masuk cuma 'P' atau 'Masih buka?'",
      description:
        "Karena belum ada tombol format pesan, obrolan selalu mulai dari nol sebelum ketahuan keluhan AC dan lokasi rumahnya.",
    },
  ],
  en: [
    {
      icon: EyeOff,
      title: "Homeowners hesitate to call an unknown tech",
      description:
        "Inviting a technician inside the house requires real trust. Without a credible website, homeowners pick the competitor down the street who looks established.",
    },
    {
      icon: Repeat,
      title: "Answering the same price questions on a ladder",
      description:
        "Mid-job on a rooftop condenser and your phone buzzes asking 'Do you cover my zip code? How much is a tune-up?'. Hours vanish repeating basics.",
    },
    {
      icon: Megaphone,
      title: "Boosting social posts with zero booked jobs",
      description:
        "Ad budget burns away sending clicks to a cluttered social profile where homeowners can't see your service areas, offers, or next step.",
    },
    {
      icon: SearchX,
      title: "Service areas & specialties buried out of sight",
      description:
        "Homeowners with a warm house want instant confirmation that you service mini-splits, central AC, or refrigerant leaks in their neighborhood today.",
    },
    {
      icon: PhoneMissed,
      title: "Vague 'Are you available?' messages",
      description:
        "Without a structured inquiry button, every chat starts from zero before you even know the unit issue or the customer's city.",
    },
  ],
};

export default function ProblemSection() {
  const { lang } = useLanguage();
  const problems = PROBLEMS_BY_LANG[lang];

  return (
    <section
      id="masalah"
      aria-label={
        lang === "id"
          ? "Kendala yang sering dialami usaha service AC"
          : "Common bottlenecks for HVAC businesses"
      }
      className="relative py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="01"
          eyebrow={lang === "id" ? "Kendala di Lapangan" : "Field Reality"}
          title={
            lang === "id" ? (
              <>
                Kerjaan di Lapangan Rapi, tapi <span className="text-accent">Order Online</span>{" "}
                Masih Seret?
              </>
            ) : (
              <>
                Top-Notch HVAC Work, Yet <span className="text-accent">Online Leads</span> Feel
                Slow?
              </>
            )
          }
          description={
            lang === "id"
              ? "Sehari-hari Anda sudah sibuk mengurus unit AC pelanggan. Sayangnya, banyak calon pelanggan baru di sekitar area kerja Anda batal menghubungi gara-gara hal sepele seperti ini."
              : "You deliver clean, honest work on every unit. Yet nearby homeowners still scroll past and call someone else over fixable gaps like these."
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => (
            <Reveal key={problem.title} delay={i * 0.08}>
              <article className="group h-full rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_50px_-20px_rgba(0,223,143,0.25)] md:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-mist transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                  <problem.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight md:text-xl">
                  {problem.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{problem.description}</p>
              </article>
            </Reveal>
          ))}

          {/* Kartu penutup menuju solusi */}
          <Reveal delay={problems.length * 0.08}>
            <a
              href="#solusi"
              className="group flex h-full min-h-[13rem] flex-col justify-between rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/[0.12] to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_60px_-18px_rgba(0,223,143,0.5)] md:p-7"
            >
              <p className="font-display text-lg font-semibold leading-snug tracking-tight md:text-xl">
                {lang === "id" ? (
                  <>
                    Sering mengalami salah satunya di usaha Anda?
                    <br />
                    <span className="text-accent">Begini cara membereskannya.</span>
                  </>
                ) : (
                  <>
                    Sound familiar in your HVAC business?
                    <br />
                    <span className="text-accent">Here is how we fix all of it.</span>
                  </>
                )}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                {lang === "id" ? "Lihat cara kerjanya" : "See how it works"}
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
