import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { SERVICES } from "../data/services";

export default function LayananSection() {
  return (
    <section id="layanan" aria-label="Layanan NanangDigital" className="relative py-24 md:py-32">
      <div className="section-wrap">
        <SectionHeader
          index="05"
          eyebrow="Layanan"
          title={
            <>
              Empat Layanan, Satu Tujuan: <span className="text-accent">Calon Pelanggan</span>.
            </>
          }
          description="Semua layanan dirancang khusus untuk kebutuhan bisnis service AC — dari halaman bisnis sampai materi promosinya."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.number} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_24px_70px_-28px_rgba(0,223,143,0.35)] md:p-9">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[5.5rem] font-bold leading-none text-white/[0.04] transition-colors duration-300 group-hover:text-accent/[0.07]"
                >
                  {service.number}
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white/[0.03] text-accent transition-colors duration-300 group-hover:border-accent/50">
                  <service.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>

                <h3 className="mt-7 font-display text-xl font-bold tracking-tight md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-mist md:text-base">
                  {service.description}
                </p>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-accent to-accent-deep transition-all duration-500 group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 flex flex-wrap items-center gap-2 text-sm text-mist">
            Butuh kombinasi lain di luar empat layanan ini?
            <a
              href="#paket"
              className="group inline-flex items-center gap-1.5 font-semibold text-accent transition-colors hover:text-white"
            >
              Lihat paket atau konsultasikan kebutuhan Anda
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
