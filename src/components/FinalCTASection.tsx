import { Check } from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, WA_LINK_GENERAL } from "../data/business";

const REASSURANCES = [
  "Tidak perlu menyiapkan apa pun",
  "Konsultasi gratis & tanpa komitmen",
  "Dibantu sampai Anda paham",
];

export default function FinalCTASection() {
  return (
    <section id="kontak" aria-label="Mulai konsultasi" className="relative py-24 md:py-32">
      <div className="section-wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-accent/25 bg-surface px-6 py-16 text-center md:px-12 md:py-24">
            {/* Ornamen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-accent/15"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full border border-accent/15"
            />
            <div
              aria-hidden="true"
              className="glow-orb pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full"
            />
            <div
              aria-hidden="true"
              className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]"
            />

            <div className="relative">
              <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
                12 · Mulai Sekarang
                <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
              </p>

              <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
                Siap Membuat Website Bisnis AC Anda Terlihat{" "}
                <span className="text-accent">Lebih Profesional</span>?
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg">
                Ceritakan kebutuhan Anda lewat WhatsApp. Konsultasi gratis, tanpa komitmen — kami
                bantu rekomendasikan paket yang paling sesuai untuk bisnis Anda.
              </p>

              {/* Nomor WhatsApp */}
              <div className="mt-9 inline-flex items-center gap-4 rounded-2xl border border-line bg-black/30 px-6 py-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-[#04140c]">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <span className="text-left">
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-mist">
                    WhatsApp resmi
                  </span>
                  <a
                    href={BUSINESS.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-lg font-semibold tracking-wide text-white transition-colors hover:text-accent md:text-2xl"
                  >
                    {BUSINESS.whatsapp.display}
                  </a>
                </span>
              </div>

              <div className="mt-9">
                <a
                  href={WA_LINK_GENERAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !px-9 !py-4 text-base"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Konsultasi Gratis via WhatsApp
                </a>
              </div>

              <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
                {REASSURANCES.map((text) => (
                  <li key={text} className="flex items-center gap-2 text-xs text-mist md:text-sm">
                    <Check className="h-3.5 w-3.5 text-accent" strokeWidth={3} aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
