import { useState } from "react";
import { Compass, ListChecks, Hand, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, getGeneralWaLink } from "../data/business";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/LanguageContext";

interface Approach {
  icon: LucideIcon;
  title: string;
  description: string;
}

const APPROACHES_BY_LANG: Record<Locale, Approach[]> = {
  id: [
    {
      icon: Compass,
      title: "Ngobrol santai soal usaha Anda dulu",
      description:
        "Kita mulai dari layanan apa saja yang paling sering dipesan, area mana yang ingin dikejar, dan kebiasaan pelanggan Anda.",
    },
    {
      icon: ListChecks,
      title: "Merapikan susunan info layanan & harga",
      description:
        "Supaya orang awam sekali lihat langsung paham bedanya cuci rutin, tambah freon, atau bongkar pasang.",
    },
    {
      icon: Hand,
      title: "Bikin tampilan yang enteng di HP",
      description:
        "Tidak kebanyakan animasi berat yang bikin loading lama. Fokusnya tulisan jelas dan tombol gampang dipencet.",
    },
    {
      icon: MessageCircle,
      title: "Mengantar orang langsung chat ke nomor Anda",
      description:
        "Begitu calon pelanggan cocok lihat info di halaman, sekali klik langsung nyambung ke WhatsApp usaha Anda.",
    },
  ],
  en: [
    {
      icon: Compass,
      title: "Start with your highest-margin jobs",
      description:
        "We look at the exact calls you want more of, whether AC repairs, seasonal tune-ups, mini-splits, or commercial maintenance contracts.",
    },
    {
      icon: ListChecks,
      title: "Structure services & pricing clearly",
      description:
        "Plain-English sections so homeowners immediately understand what you offer, where you travel, and why they can trust your crew.",
    },
    {
      icon: Hand,
      title: "Engineered for speed on every phone",
      description:
        "Zero bloated templates or sluggish plugins. Pages open almost instantly even on weak cellular data.",
    },
    {
      icon: MessageCircle,
      title: "Route every lead straight to your phone",
      description:
        "Every inquiry lands directly in your WhatsApp with customer details already organized and tracked.",
    },
  ],
};

const SKILL_CHIPS_BY_LANG: Record<Locale, string[]> = {
  id: ["Website Usaha AC", "Landing Page", "Copywriting", "Meta Ads"],
  en: ["HVAC Websites", "High-Convert LPs", "HVAC Copywriting", "Meta Lead Ads"],
};

export default function FounderSection() {
  const { lang } = useLanguage();
  const [photoFailed, setPhotoFailed] = useState(false);

  const approaches = APPROACHES_BY_LANG[lang];
  const skillChips = SKILL_CHIPS_BY_LANG[lang];

  return (
    <section
      id="tentang"
      aria-label={lang === "id" ? `Tentang ${BUSINESS.brand}` : `About ${BUSINESS.brand}`}
      className="relative py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="03"
          eyebrow={lang === "id" ? "Siapa yang Mengerjakan" : "Who Builds Your Site"}
          title={
            lang === "id" ? (
              <>
                Langsung Dikerjakan Sendiri oleh{" "}
                <span className="text-accent">Nanang Sanjaya</span>.
              </>
            ) : (
              <>
                Built Directly Hand-in-Hand with{" "}
                <span className="text-accent">Nanang Sanjaya</span>.
              </>
            )
          }
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Kartu profil founder */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 md:p-8">
              <div
                aria-hidden="true"
                className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
              />
              <div className="relative flex items-center gap-5">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#101820] to-[#0d1a15]">
                  {!photoFailed ? (
                    <img
                      src={BUSINESS.founderPhoto.avatarUrl}
                      alt={BUSINESS.founderPhoto.alt[lang]}
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      onError={() => setPhotoFailed(true)}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <span className="font-display text-3xl font-bold tracking-tight text-transparent [background:linear-gradient(135deg,#00df8f,#00b373)] [background-clip:text]">
                      NS
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                    {BUSINESS.founder}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {BUSINESS.role}
                  </p>
                </div>
              </div>

              <p className="relative mt-6 text-sm leading-relaxed text-mist">
                {lang === "id"
                  ? "Dari obrolan pertama di WhatsApp, penulisan isi halaman, sampai website naik tayang dan siap dipasang iklan, semuanya saya pegang sendiri. Jadi komunikasi cepat nyambung tanpa dilempar ke admin lain."
                  : "From our first chat on WhatsApp to copywriting, page speed optimization, domain setup, and ad tracking, you work directly with me. Zero account-manager handoffs or slow agency red tape."}
              </p>

              <div className="relative mt-7 border-t border-line pt-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-mist">
                  {lang === "id" ? "Yang Saya Kerjakan Sehari-hari" : "Core Focus Areas"}
                </p>
                <ul
                  className="mt-4 flex flex-wrap gap-2"
                  aria-label={lang === "id" ? "Fokus pengerjaan" : "Core skills"}
                >
                  {skillChips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/90 transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Narasi + pendekatan */}
          <div>
            <Reveal delay={0.1}>
              {lang === "id" ? (
                <>
                  <p className="text-base leading-relaxed text-mist md:text-lg">
                    Kenapa {BUSINESS.brand} cuma fokus di{" "}
                    <strong className="font-semibold text-white">
                      usaha service AC dan cuci AC panggilan
                    </strong>
                    ? Karena kebutuhan tukang dan bengkel AC itu beda jauh dengan toko baju atau
                    kafe. Pelanggan AC sering butuh cepat saat unit di kamar tiba-tiba panas atau
                    bocor air, jadi halamannya harus ringkas dan meyakinkan.
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">
                    Anda juga tidak perlu pusing mikirin istilah koding, hosting, atau pixel iklan.
                    Cukup kirim data usaha lewat chat, sisanya saya bereskan sampai siap pakai.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base leading-relaxed text-mist md:text-lg">
                    Why does {BUSINESS.brand} specialize exclusively in{" "}
                    <strong className="font-semibold text-white">
                      HVAC, air conditioning repair, and maintenance contractors
                    </strong>
                    ? Because an urgent cooling breakdown is nothing like selling e-commerce
                    products or restaurant tables. Homeowners need fast answers, local proof, and
                    an effortless way to reach your dispatch line right away.
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">
                    You never have to wrestle with code, DNS records, SSL certificates, or tracking
                    pixels. Share your company info on WhatsApp and I handle everything end to end.
                  </p>
                </>
              )}
            </Reveal>

            <ol className="mt-10 space-y-1">
              {approaches.map((approach, i) => (
                <li key={approach.title} className="border-b border-line first:border-t">
                  <Reveal delay={0.15 + i * 0.08}>
                    <div className="group flex gap-5 py-5 transition-colors hover:bg-white/[0.02]">
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-mist transition-colors group-hover:border-accent/40 group-hover:text-accent">
                        <approach.icon
                          className="h-[1.125rem] w-[1.125rem]"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-semibold tracking-tight md:text-lg">
                          {approach.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-mist">
                          {approach.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.5}>
              <a
                href={getGeneralWaLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                data-track-source="founder_cta"
                className="btn-primary mt-9"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {lang === "id" ? "Ngobrol Langsung di WhatsApp" : "Chat Directly on WhatsApp"}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
