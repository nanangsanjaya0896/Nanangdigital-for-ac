import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { WA_LINK_GENERAL } from "../data/business";

export default function FinalCTASection() {
  const waLink = WA_LINK_GENERAL;

  return (
    <section
      id="kontak"
      aria-label="Mulai diskusi di WhatsApp"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <div className="section-wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-accent/35 bg-gradient-to-br from-[#0e2019] via-surface to-surface px-6 py-16 text-center sm:px-12 md:py-24">
            <div
              aria-hidden="true"
              className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
            />
            <div
              aria-hidden="true"
              className="glow-orb pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            />

            <div className="relative mx-auto max-w-3xl">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/35 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                Siap Bikin Usaha AC Makin Rapi?
              </p>

              <h2 className="mt-7 font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                Ngobrol Dulu di WhatsApp,{" "}
                <span className="text-accent">Gratis Tanpa Paksaan</span>.
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg">
                Ceritakan daerah layanan dan jenis jasa AC yang paling ingin Anda kejar. Saya bantu pilihkan paket yang paling pas sama kebutuhan usaha Anda sekarang.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-source="final_cta_section"
                  className="btn-primary px-9 py-4 text-base"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Chat WhatsApp Sekarang
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
