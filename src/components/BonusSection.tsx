import { Gift } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import { BONUSES_BY_LANG } from "../data/bonuses";

export default function BonusSection() {
  const { lang } = useLanguage();
  const bonuses = BONUSES_BY_LANG[lang];

  return (
    <section
      id="bonus"
      aria-label={lang === "id" ? "Bonus tambahan" : "Included bonuses"}
      className="relative py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="09"
          eyebrow={lang === "id" ? "Bonus Gratis" : "Complimentary Bonuses"}
          title={
            lang === "id" ? (
              <>
                Bonus Tambahan di <span className="text-accent">Semua Paket</span>, Tanpa Biaya
                Ekstra.
              </>
            ) : (
              <>
                Included Free With <span className="text-accent">Every Package</span> at Zero Extra
                Cost.
              </>
            )
          }
          description={
            lang === "id"
              ? "Biar begitu website beres, Anda juga punya bekal praktis buat meladeni chat pelanggan dan memajang link di medsos."
              : "Extra practical tools so the moment your HVAC website launches, closing incoming inquiries feels effortless."
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {bonuses.map((bonus, i) => (
            <Reveal key={bonus.title} delay={i * 0.1}>
              <article className="relative h-full overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-b from-accent/[0.06] to-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/55">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <bonus.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent">
                    <Gift className="h-3 w-3" aria-hidden="true" />
                    {lang === "id" ? "Gratis" : "Free Bonus"}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold tracking-tight md:text-xl">
                  {bonus.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{bonus.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
