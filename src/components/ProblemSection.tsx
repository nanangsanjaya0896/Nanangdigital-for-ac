import { EyeOff, SearchX, PhoneMissed, Megaphone, Repeat, ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

interface Problem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PROBLEMS: Problem[] = [
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
];

export default function ProblemSection() {
  const problems = PROBLEMS;

  return (
    <section
      id="masalah"
      aria-label="Kendala yang sering dialami usaha service AC"
      className="relative py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="01"
          eyebrow="Kendala di Lapangan"
          title={
            <>
              Kerjaan di Lapangan Rapi, tapi <span className="text-accent">Order Online</span>{" "}
              Masih Seret?
            </>
          }
          description="Sehari-hari Anda sudah sibuk mengurus unit AC pelanggan. Sayangnya, banyak calon pelanggan baru di sekitar area kerja Anda batal menghubungi gara-gara hal sepele seperti ini."
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
                <>
                  Sering mengalami salah satunya di usaha Anda?
                  <br />
                  <span className="text-accent">Begini cara membereskannya.</span>
                </>
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Lihat cara kerjanya
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
