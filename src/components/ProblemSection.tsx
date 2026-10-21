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
    title: "Sulit Terlihat Kredibel",
    description:
      "Calon pelanggan ragu karena tidak ada halaman bisnis yang menunjukkan layanan Anda serius dan bisa dipercaya.",
  },
  {
    icon: SearchX,
    title: "Informasi Tidak Mudah Ditemukan",
    description:
      "Daftar layanan, cakupan area, dan gambaran biaya tidak tersedia jelas sehingga calon pelanggan pergi lebih dulu.",
  },
  {
    icon: PhoneMissed,
    title: "Kontak WhatsApp Tidak Terarah",
    description:
      "Chat masuk tanpa konteks yang jelas, sehingga percakapan dimulai dari nol setiap kali ada calon pelanggan.",
  },
  {
    icon: Megaphone,
    title: "Iklan Tanpa Halaman Pendukung",
    description:
      "Promosi berbayar tidak memiliki landing page yang meyakinkan, sehingga klik iklan tidak berubah menjadi chat.",
  },
  {
    icon: Repeat,
    title: "Penjelasan Berulang Setiap Hari",
    description:
      "Harga dan layanan harus dijelaskan lagi dan lagi lewat chat, menghabiskan waktu yang seharusnya dipakai bekerja.",
  },
];

export default function ProblemSection() {
  return (
    <section id="masalah" aria-label="Masalah yang dihadapi bisnis service AC" className="relative py-24 md:py-32">
      <div className="section-wrap">
        <SectionHeader
          index="01"
          eyebrow="Masalah"
          title={
            <>
              Andal di Lapangan, tapi <span className="text-accent">Belum Terlihat</span> Online.
            </>
          }
          description="Banyak usaha service AC masih mengandalkan promosi manual, chat pribadi, dan media sosial tanpa halaman bisnis yang jelas. Akibatnya terasa setiap hari:"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((problem, i) => (
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
          <Reveal delay={PROBLEMS.length * 0.08}>
            <a
              href="#solusi"
              className="group flex h-full min-h-[13rem] flex-col justify-between rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/[0.12] to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_60px_-18px_rgba(0,223,143,0.5)] md:p-7"
            >
              <p className="font-display text-lg font-semibold leading-snug tracking-tight md:text-xl">
                Terasa familier?
                <br />
                <span className="text-accent">Ada jalan keluarnya.</span>
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Lihat solusinya
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
