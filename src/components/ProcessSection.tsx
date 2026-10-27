import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import { PROCESS_STEPS_BY_LANG } from "../data/process";

export default function ProcessSection() {
  const { lang } = useLanguage();
  const steps = PROCESS_STEPS_BY_LANG[lang];

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
