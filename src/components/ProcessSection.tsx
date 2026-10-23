import { MessagesSquare, FileText, Hammer, Eye, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/LanguageContext";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS_BY_LANG: Record<Locale, Step[]> = {
  id: [
    {
      icon: MessagesSquare,
      title: "Ngobrol Santai di WhatsApp",
      description:
        "Ceritakan layanan AC apa saja yang Anda kerjakan dan daerah mana yang paling ingin dikejar orderannya.",
    },
    {
      icon: FileText,
      title: "Kirim Data & DP 50%",
      description:
        "Kirim nama usaha, daftar tarif, foto kerja (kalau ada), dan nomor WA. Pembayaran awal cukup DP 50%.",
    },
    {
      icon: Hammer,
      title: "Saya Kerjakan Sampai Rapi",
      description:
        "Tampilan halaman, susunan kalimat layanan, sampai tombol chat saya siapkan dalam 3 sampai 5 hari kerja.",
    },
    {
      icon: Eye,
      title: "Anda Cek & Minta Revisi",
      description:
        "Saya kirim link hasilnya untuk Anda coba buka dari HP sendiri. Kalau ada yang kurang pas, tinggal minta ubah.",
    },
    {
      icon: Rocket,
      title: "Pelunasan & Langsung Online",
      description:
        "Begitu sudah cocok semua, lunasi sisa 50% dan website resmi usaha AC Anda langsung aktif menerima pelanggan.",
    },
  ],
  en: [
    {
      icon: MessagesSquare,
      title: "Quick Discovery Chat on WhatsApp",
      description:
        "Share your HVAC services, target towns or zip codes, and which package best fits your current stage.",
    },
    {
      icon: FileText,
      title: "Send Basics & 50% Kickoff Deposit",
      description:
        "Send your company name, service list, contact number, and any job photos along with a 50% starter deposit.",
    },
    {
      icon: Hammer,
      title: "Full Design, Copy & Setup (3-5 Days)",
      description:
        "I write the copy, build the mobile-first layout, wire lead tracking, and prepare your ad creatives.",
    },
    {
      icon: Eye,
      title: "Live Preview & Revisions",
      description:
        "Test your live preview link directly on your phone and request any copy or visual tweaks effortlessly.",
    },
    {
      icon: Rocket,
      title: "Final 50% & Official Launch",
      description:
        "Once you're 100% happy, settle the remaining 50% and your custom domain, tracking, and campaigns go live.",
    },
  ],
};

export default function ProcessSection() {
  const { lang } = useLanguage();
  const steps = STEPS_BY_LANG[lang];

  return (
    <section
      id="proses"
      aria-label={lang === "id" ? "Alur pengerjaan" : "Project workflow"}
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="08"
          eyebrow={lang === "id" ? "Tahapan Kerja" : "Simple 5-Step Process"}
          title={
            lang === "id" ? (
              <>
                Lima Langkah Jelas, <span className="text-accent">3 Sampai 5 Hari</span> Sudah Jadi.
              </>
            ) : (
              <>
                Five Clear Steps, Live in <span className="text-accent">3 to 5 Business Days</span>.
              </>
            )
          }
          description={
            lang === "id"
              ? "Tidak perlu rapat bertele-tele. Semua koordinasi cukup lewat chat WhatsApp di sela waktu kerja Anda."
              : "Zero long Zoom calls or complicated onboarding forms. Everything runs smoothly right over WhatsApp around your schedule."
          }
        />

        <div className="relative mt-16">
          {/* Garis penghubung desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-10 right-10 top-6 hidden h-px bg-gradient-to-r from-accent/60 via-accent/25 to-transparent lg:block"
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.08}>
                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-ink font-mono text-xs font-bold text-accent shadow-[0_0_0_6px_#161b22]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <step.icon className="h-5 w-5 text-mist" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 font-display text-lg font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
