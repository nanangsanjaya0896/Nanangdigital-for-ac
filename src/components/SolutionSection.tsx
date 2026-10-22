import {
  MonitorSmartphone,
  MousePointerClick,
  PenLine,
  Rocket,
  Megaphone,
  LayoutTemplate,
  Users,
  MessagesSquare,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: MonitorSmartphone,
    title: "Tampilan usaha jauh lebih meyakinkan",
    description: "Begitu halaman dibuka, pelanggan langsung lihat usaha Anda beneran niat dan rapi.",
  },
  {
    icon: MousePointerClick,
    title: "Chat masuk sudah ada formatnya",
    description: "Tombol WhatsApp langsung mengisi pesan layanan yang dipilih calon pelanggan.",
  },
  {
    icon: LayoutTemplate,
    title: "Enteng dibuka dari HP",
    description: "Mayoritas orang cari tukang AC lewat HP, jadi ukuran teks dan tombolnya dibuat lega.",
  },
  {
    icon: PenLine,
    title: "Kalimat layanan beres ditulisin",
    description: "Anda tinggal cerita layanan sehari-hari, saya yang susun bahasanya supaya enak dibaca.",
  },
  {
    icon: Megaphone,
    title: "Tinggal sambung ke iklan lokal",
    description: "Kalau mau pasang iklan Facebook atau Instagram, halamannya sudah siap menampung klik.",
  },
  {
    icon: Rocket,
    title: "Hemat waktu balas pertanyaan dasar",
    description: "Daftar jasa, kisaran biaya, dan area jangkauan sudah tertulis jelas sejak awal.",
  },
];

const FLOW_STEPS = [
  { icon: Users, label: "Warga Cari Jasa AC", note: "Lewat Google, kiriman link, atau iklan lokal" },
  { icon: MonitorSmartphone, label: "Buka Website Usaha Anda", note: "Cek layanan, kisaran biaya, & area kerja" },
  { icon: null, label: "Klik Tombol WhatsApp", note: "Pesan otomatis terisi sesuai kebutuhan servis", isWhatsApp: true },
  { icon: MessagesSquare, label: "Cocokkan Jadwal", note: "Tinggal pastikan alamat rumah dan jam kedatangan" },
  { icon: UserCheck, label: "Berangkat Kerjakan Order", note: "Pelanggan baru masuk tanpa ribet tanya dari nol" },
];

export default function SolutionSection() {
  return (
    <section
      id="solusi"
      aria-label="Solusi dari NanangDigital"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_80%_20%,black,transparent)]"
      />
      <div className="section-wrap relative">
        <SectionHeader
          index="02"
          eyebrow="Cara Kerjanya"
          title={
            <>
              Punya Halaman Resmi Sendiri yang <span className="text-accent">Bantu Jualan</span>{" "}
              24 Jam.
            </>
          }
          description="Saat Anda fokus mengerjakan unit di lapangan, website ini yang bertugas menjelaskan layanan usaha Anda ke calon pelanggan sampai mereka klik chat WhatsApp."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Manfaat */}
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.07}>
                <div className="group flex h-full gap-4 rounded-2xl border border-line bg-surface/70 p-5 transition-colors duration-300 hover:border-accent/40">
                  <benefit.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Alur konversi */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/80 p-7 backdrop-blur md:p-9">
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Alur Pelanggan Memesan
              </p>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight md:text-2xl">
                Dari lihat halaman sampai jadi jadwal servis.
              </h3>

              <ol className="relative mt-8 space-y-0">
                {FLOW_STEPS.map((step, i) => {
                  const isLast = i === FLOW_STEPS.length - 1;
                  return (
                    <li key={step.label} className="relative flex gap-5 pb-8 last:pb-0">
                      {!isLast && (
                        <svg
                          aria-hidden="true"
                          className="absolute left-[1.4rem] top-[3.1rem] h-[calc(100%-3.2rem)] w-px text-accent/40"
                        >
                          <line
                            x1="0.5"
                            y1="0"
                            x2="0.5"
                            y2="100%"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="flow-connector"
                          />
                        </svg>
                      )}
                      <span
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
                          isLast
                            ? "border-accent bg-gradient-to-br from-accent to-accent-deep text-[#04140c] shadow-[0_0_30px_rgba(0,223,143,0.45)]"
                            : "border-line bg-ink text-accent"
                        }`}
                      >
                        {step.isWhatsApp ? (
                          <WhatsAppIcon className="h-5 w-5" />
                        ) : step.icon ? (
                          <step.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                        ) : null}
                      </span>
                      <div className="pt-1.5">
                        <p
                          className={`font-display text-base font-semibold tracking-tight ${
                            isLast ? "text-accent" : "text-white"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="mt-1 text-sm text-mist">{step.note}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="ml-auto pt-2 font-mono text-xs text-mist/50"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
