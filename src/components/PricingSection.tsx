import { Check, ShieldCheck, Gift, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { PLANS, PRICING_NOTES } from "../data/plans";
import { waUrl } from "../data/business";

export default function PricingSection() {
  return (
    <section
      id="paket"
      aria-label="Paket jasa pembuatan website"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="glow-orb absolute left-1/2 top-0 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full opacity-60"
      />

      <div className="section-wrap relative">
        <SectionHeader
          index="07"
          eyebrow="Paket Jasa Pembuatan Website"
          align="center"
          title={
            <>
              Biaya Jelas di Awal, <span className="text-accent">Tinggal Terima Beres</span>.
            </>
          }
          description="Pilih paket pembuatan website sesuai kebutuhan usaha AC Anda saat ini. Semuanya sudah termasuk domain, hosting 1 tahun, SSL, Live Chat AI, dan Google Maps."
        />

        {/* Banner Jaminan Pembayaran Aman */}
        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-accent/40 bg-gradient-to-r from-accent/[0.11] via-surface to-surface px-6 py-4 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/15 text-accent">
                <ShieldCheck className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-sm font-bold tracking-tight text-white md:text-base">
                  Aman, Pelunasan Setelah Website Jadi
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-mist md:text-sm">
                  Cukup DP <strong className="text-white">50%</strong> saat mulai pengerjaan, sisa{" "}
                  <strong className="text-accent">50% baru dibayar setelah website selesai dan Anda cocok</strong>.
                </p>
              </div>
            </div>
            <a
              href="#bonus"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-[#04140c]"
            >
              <Gift className="h-3.5 w-3.5" aria-hidden="true" />
              Dapat 3 Bonus Gratis
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-3xl border p-7 md:p-8 ${
                  plan.popular
                    ? "border-accent/70 bg-gradient-to-b from-accent/[0.08] to-surface shadow-[0_0_70px_-18px_rgba(0,223,143,0.45)]"
                    : "border-line bg-surface"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-accent to-accent-deep px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#04140c] shadow-[0_8px_30px_-6px_rgba(0,223,143,0.6)]">
                    Paling Banyak Dipilih
                  </span>
                )}

                <h3 className="font-display text-lg font-bold uppercase tracking-[0.14em] text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 min-h-[2.5rem] text-sm leading-snug text-mist">{plan.tagline}</p>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-mist">
                    Biaya Pembuatan
                  </p>
                  <p
                    className={`mt-2 font-display font-bold tracking-tight ${
                      plan.price === "Custom"
                        ? "text-3xl text-accent md:text-4xl"
                        : "text-4xl md:text-[2.6rem]"
                    }`}
                  >
                    {plan.price === "Custom" ? "Sesuai Permintaan" : plan.price}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-mist">{plan.priceNote}</p>
                </div>

                {plan.leadIn && (
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {plan.leadIn}
                  </p>
                )}

                <ul className={`${plan.leadIn ? "mt-3.5" : "mt-7"} flex-1 space-y-3`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-relaxed text-white/90">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.popular ? "bg-accent/20" : "bg-white/[0.06]"
                        }`}
                      >
                        <Check className="h-3 w-3 text-accent" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={waUrl(plan.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-source={`pricing_${plan.id}`}
                  className={`mt-9 w-full text-sm ${plan.popular ? "btn-primary" : "btn-ghost"}`}
                  aria-label={`${plan.cta}, ${plan.name} ${plan.price}`}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {plan.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {PRICING_NOTES.map((note) => (
              <li
                key={note}
                className="flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-5 py-2.5 text-xs leading-snug text-mist"
              >
                <Check className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={3} aria-hidden="true" />
                {note}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
