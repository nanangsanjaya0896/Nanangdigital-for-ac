import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessagesSquare,
  Wrench,
  ClipboardCheck,
  Rocket,
  Plus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: MessagesSquare,
    title: "Ngobrol di WhatsApp",
    description:
      "Ceritakan nama usaha, jenis jasa AC yang dilayani, dan daerah mana saja jangkauan teknisi Anda.",
  },
  {
    icon: Wrench,
    title: "Pengerjaan 3 sampai 5 Hari",
    description:
      "Setelah data masuk dan DP 50%, website langsung saya kerjakan sampai rapi luar dalam.",
  },
  {
    icon: ClipboardCheck,
    title: "Cek Hasil & Revisi",
    description:
      "Link website saya kirim untuk Anda coba buka dari HP sendiri. Kurang srek tinggal bilang.",
  },
  {
    icon: Rocket,
    title: "Pelunasan & Langsung Aktif",
    description:
      "Begitu cocok, lunasi sisa 50% dan website resmi siap dipakai cari pelanggan maupun pasang iklan.",
  },
];

const METHODOLOGY = [
  {
    id: "briefing",
    title: "Tanya Jawab Singkat di Chat",
    description:
      "Anda cukup kirim daftar layanan (misal cuci AC, isi freon, bongkar pasang), kisaran harga, area kecamatan, dan foto kerja kalau sudah ada.",
  },
  {
    id: "analisis",
    title: "Menentukan Paket yang Pas",
    description:
      "Kita lihat bareng apakah saat ini cukup website dulu (Basic) atau sekalian nyalakan iklan lokal (Growth).",
  },
  {
    id: "struktur",
    title: "Menyusun Isi & Kalimat Halaman",
    description:
      "Semua info dirangkai pakai bahasa obrolan yang gampang ditangkap pemilik rumah, kos, maupun kantor.",
  },
  {
    id: "desain",
    title: "Pembuatan Tampilan & Tombol WA",
    description:
      "Halaman dirakit lengkap dengan tombol chat WhatsApp yang otomatis mengisi format pesan sesuai layanan.",
  },
  {
    id: "uji",
    title: "Tes Buka di Berbagai Layar HP",
    description:
      "Saya cek ukuran tulisan, kecepatan buka halaman, dan fungsi semua tombol baik di HP maupun laptop.",
  },
  {
    id: "tayang",
    title: "Serah Terima & Panduan Pakai",
    description:
      "Website dihubungkan ke domain resmi pilihan Anda, siap dibagikan ke pelanggan dan disambungkan ke iklan.",
  },
];

export default function ProcessSection() {
  const [openId, setOpenId] = useState<string | null>("briefing");

  return (
    <section
      id="proses"
      aria-label="Alur pengerjaan"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="08"
          eyebrow="Alur Pengerjaan"
          title={
            <>
              Empat Tahap Praktis Sampai <span className="text-accent">Website Jadi</span>.
            </>
          }
          description="Alurnya dibuat sesederhana mungkin supaya tidak menyita waktu kerja Anda di lapangan."
        />

        {/* Timeline 4 langkah */}
        <div className="relative mt-16">
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[1.875rem] top-8 w-px bg-gradient-to-b from-accent/60 via-accent/25 to-transparent lg:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute left-[9%] right-[9%] top-[1.875rem] hidden h-px bg-gradient-to-r from-accent/5 via-accent/50 to-accent/5 lg:block"
          />

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <li className="relative flex gap-6 lg:block">
                  <div className="relative z-10 flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-full border border-accent/40 bg-ink shadow-[0_0_30px_rgba(0,223,143,0.2)]">
                    <step.icon className="h-5 w-5 text-accent" strokeWidth={1.9} aria-hidden="true" />
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2 py-0.5 font-mono text-[0.6rem] font-bold text-[#04140c]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="pt-1 lg:mt-8 lg:pr-4">
                    <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist">{step.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Accordion metodologi */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Rincian yang Saya Kerjakan di Balik Layar
              <span className="text-accent">.</span>
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist md:text-base">
              Penasaran apa saja yang dibereskan selama proses pembuatan? Klik salah satu tahap di
              samping untuk melihat detailnya.
            </p>
          </Reveal>

          <div className="space-y-3" role="group" aria-label="Rincian proses pengerjaan">
            {METHODOLOGY.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <Reveal key={item.id} delay={i * 0.05}>
                  <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`metodologi-panel-${item.id}`}
                      id={`metodologi-trigger-${item.id}`}
                      className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-white/[0.02]"
                    >
                      <span className="font-mono text-xs text-accent/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-base font-semibold tracking-tight md:text-lg">
                        {item.title}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isOpen ? "border-accent/60 text-accent" : "border-line text-mist"
                        }`}
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          id={`metodologi-panel-${item.id}`}
                          role="region"
                          aria-labelledby={`metodologi-trigger-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-white/5 px-5 pb-5 pl-14 pt-4 text-sm leading-relaxed text-mist">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
