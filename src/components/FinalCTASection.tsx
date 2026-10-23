import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { getGeneralWaLink } from "../data/business";
import { useLanguage } from "../i18n/LanguageContext";

export default function FinalCTASection() {
  const { lang } = useLanguage();
  const waLink = getGeneralWaLink(lang);

  return (
    <section
      id="kontak"
      aria-label={
        lang === "id"
          ? "Mulai diskusi di WhatsApp"
          : "Start a conversation on WhatsApp"
      }
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
                {lang === "id"
                  ? "Siap Bikin Usaha AC Makin Rapi?"
                  : "Ready to Book More Local HVAC Jobs?"}
              </p>

              {lang === "id" ? (
                <h2 className="mt-7 font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                  Ngobrol Dulu di WhatsApp,{" "}
                  <span className="text-accent">Gratis Tanpa Paksaan</span>.
                </h2>
              ) : (
                <h2 className="mt-7 font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                  Let&apos;s Chat on WhatsApp,{" "}
                  <span className="text-accent">Zero Pressure</span>.
                </h2>
              )}

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg">
                {lang === "id"
                  ? "Ceritakan daerah layanan dan jenis jasa AC yang paling ingin Anda kejar. Saya bantu pilihkan paket yang paling pas sama kebutuhan usaha Anda sekarang."
                  : "Tell me your city, core HVAC services, and growth goals. I'll recommend the exact package that fits your shop best and get your site live in 3 to 5 days."}
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
                  {lang === "id" ? "Chat WhatsApp Sekarang" : "Message Me on WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
