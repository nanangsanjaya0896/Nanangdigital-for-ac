import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { SERVICES } from "../data/services";

export default function LayananSection() {
  const services = SERVICES;

  return (
    <section
      id="layanan"
      aria-label="Layanan NanangDigital"
      className="relative py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="05"
          eyebrow="Cakupan Pengerjaan"
          title={
            <>
              Dari Halaman Website Sampai <span className="text-accent">Setting Iklan Lokal</span>,
              Bisa Sekalian.
            </>
          }
          description={
            "Mau mulai dari punya website dulu boleh, mau langsung sekalian dipasangin iklan Facebook & Instagram juga siap."
          }
        />

        <div className="mt-14 divide-y divide-line border-y border-line">
          {services.map((service, i) => (
            <Reveal key={service.number} delay={i * 0.08}>
              <article className="group grid items-start gap-5 py-8 transition-colors duration-300 hover:bg-white/[0.015] md:grid-cols-[5rem_1fr_1.15fr_auto] md:items-center md:gap-10 md:px-4 md:py-10">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-medium text-accent">
                    {service.number}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-mist transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent md:hidden">
                    <service.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-mist transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent md:flex">
                    <service.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent md:text-2xl">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-mist md:text-base">
                  {service.description}
                </p>

                <a
                  href="#paket"
                  aria-label={
                    `Lihat paket untuk ${service.title}`
                  }
                  className="inline-flex h-11 w-11 items-center justify-center justify-self-start rounded-full border border-line text-mist transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-[#04140c] md:justify-self-end"
                >
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
