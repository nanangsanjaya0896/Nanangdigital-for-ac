import { Check } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { PLANS_BY_LANG, PRICING_NOTES_BY_LANG } from "../data/plans";
import { waUrl } from "../data/business";
import { useLanguage } from "../i18n/LanguageContext";

export default function PricingSection() {
  const { lang } = useLanguage();
  const plans = PLANS_BY_LANG[lang];
  const notes = PRICING_NOTES_BY_LANG[lang];

  return (
    <section
      id="paket"
      aria-label={lang === "id" ? "Pilihan paket dan harga" : "Packages and pricing"}
      className="relative py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="glow-orb pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-40"
      />
      <div className="section-wrap relative">
        <SectionHeader
          index="07"
          eyebrow={lang === "id" ? "Paket & Harga" : "Transparent Pricing"}
          title={
            lang === "id" ? (
              <>
                Paket Jasa Pembuatan Website, <span className="text-accent">Transparan</span> Sesuai
                Kebutuhan Usaha.
              </>
            ) : (
              <>
                Clear One-Time Packages Built Around Your{" "}
                <span className="text-accent">Growth Stage</span>.
              </>
            )
          }
          description={
            lang === "id"
              ? "Tiga pilihan jelas dari Paket Basic, Paket Growth, sampai Paket Premium Custom. Semua sudah termasuk domain & hosting tahun pertama, SSL HTTPS, Live Chat AI, dan Google My Business."
              : "Choose from Basic ($299), Growth ($449), or Premium Custom. Every package includes 1st-year custom domain & hosting, SSL HTTPS, AI Live Chat, and Google Business Profile setup."
          }
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1}>
              <article
                className={`relative flex h-full flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5 md:p-8 ${
                  plan.popular
                    ? "border-2 border-accent/70 bg-gradient-to-b from-[#13221c] via-surface to-surface shadow-[0_30px_90px_-25px_rgba(0,223,143,0.4)]"
                    : "border border-line bg-surface hover:border-accent/40"
                }`}
              >
                {plan.popular && (
                  <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#04140c]">
                    {lang === "id" ? "Paling Populer" : "Most Popular"}
                  </span>
                )}

                <h3 className="font-display text-2xl font-bold tracking-tight">{plan.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{plan.tagline}</p>

                <div className="mt-7 border-y border-line py-6">
                  {plan.customLabel && (
                    <span className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent">
                      {plan.customLabel}
                    </span>
                  )}
                  <p className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {plan.price}
                    {lang === "en" && plan.price !== "Custom" && (
                      <span className="ml-1.5 font-sans text-sm font-medium text-mist">USD</span>
                    )}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-mist">{plan.priceNote}</p>
                </div>

                {plan.leadIn && (
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    {plan.leadIn}
                  </p>
                )}

                <ul className="mt-5 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-relaxed text-white/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waUrl(plan.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-source={`pricing_${plan.id}`}
                  data-track-plan={plan.name}
                  className={`mt-9 text-sm ${
                    plan.popular ? "btn-primary w-full" : "btn-ghost w-full justify-center"
                  }`}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {plan.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Catatan transparan */}
        <Reveal delay={0.3}>
          <ul
            aria-label={lang === "id" ? "Keterangan paket" : "Package notes"}
            className="mt-12 grid gap-3 rounded-2xl border border-line bg-surface/60 p-6 sm:grid-cols-3 md:p-7"
          >
            {notes.map((note) => (
              <li key={note} className="flex gap-3 text-xs leading-relaxed text-mist sm:text-sm">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {note}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
