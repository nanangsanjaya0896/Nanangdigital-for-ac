import { useState } from "react";
import { Compass, ListChecks, Hand, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS, WA_LINK_GENERAL } from "../data/business";

interface Approach {
  icon: LucideIcon;
  title: string;
  description: string;
}

const APPROACHES: Approach[] = [
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
];

const SKILL_CHIPS = ["Website Usaha AC", "Landing Page", "Copywriting", "Meta Ads"];

export default function FounderSection() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="tentang" aria-label={`Tentang ${BUSINESS.brand}`} className="relative py-24 md:py-32">
      <div className="section-wrap">
        <SectionHeader
          index="03"
          eyebrow="Siapa yang Mengerjakan"
          title={
            <>
              Langsung Dikerjakan Sendiri oleh{" "}
              <span className="text-accent">Nanang Sanjaya</span>.
            </>
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
                      src={BUSINESS.founderPhoto.url}
                      alt={BUSINESS.founderPhoto.alt}
                      loading="lazy"
                      decoding="async"
                      onError={() => setPhotoFailed(true)}
                      className="h-full w-full object-cover object-[50%_22%]"
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
                Dari obrolan pertama di WhatsApp, penulisan isi halaman, sampai website naik tayang
                dan siap dipasang iklan, semuanya saya pegang sendiri. Jadi komunikasi cepat
                nyambung tanpa dilempar ke admin lain.
              </p>

              <div className="relative mt-7 border-t border-line pt-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-mist">
                  Yang Saya Kerjakan Sehari-hari
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Fokus pengerjaan">
                  {SKILL_CHIPS.map((chip) => (
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
              <p className="text-base leading-relaxed text-mist md:text-lg">
                Kenapa {BUSINESS.brand} cuma fokus di{" "}
                <strong className="font-semibold text-white">
                  usaha service AC dan cuci AC panggilan
                </strong>
                ? Karena kebutuhan tukang dan bengkel AC itu beda jauh dengan toko baju atau kafe.
                Pelanggan AC sering butuh cepat saat unit di kamar tiba-tiba panas atau bocor air,
                jadi halamannya harus ringkas dan meyakinkan.
              </p>
              <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">
                Anda juga tidak perlu pusing mikirin istilah koding, hosting, atau pixel iklan.
                Cukup kirim data usaha lewat chat, sisanya saya bereskan sampai siap pakai.
              </p>
            </Reveal>

            <ol className="mt-10 space-y-1">
              {APPROACHES.map((approach, i) => (
                <Reveal key={approach.title} delay={0.15 + i * 0.08}>
                  <li className="group flex gap-5 border-b border-line py-5 transition-colors first:border-t hover:bg-white/[0.02]">
                    <span className="font-mono text-xs text-accent/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-mist transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <approach.icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold tracking-tight md:text-lg">
                        {approach.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-mist">
                        {approach.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.5}>
              <a
                href={WA_LINK_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                data-track-source="founder_cta"
                className="btn-primary mt-9"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Ngobrol Langsung di WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
