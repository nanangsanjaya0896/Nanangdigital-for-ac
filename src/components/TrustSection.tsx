import { UserCheck, RefreshCw, MessageCircle, FileCheck2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { BUSINESS } from "../data/business";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/LanguageContext";

interface Commitment {
  icon: LucideIcon;
  title: string;
  description: string;
}

const COMMITMENTS_BY_LANG: Record<Locale, Commitment[]> = {
  id: [
    {
      icon: UserCheck,
      title: "Langsung Ditangani Nanang Sendiri",
      description:
        "Bukan dilempar ke tim magang. Yang ngobrol di chat sama Anda, itu juga yang ngerjain websitenya sampai beres.",
    },
    {
      icon: FileCheck2,
      title: "Lunasnya Nanti Kalau Sudah Jadi",
      description:
        "Awal pengerjaan cukup DP 50%. Sisa 50% baru dibayar setelah website selesai dan Anda cek sendiri di HP.",
    },
    {
      icon: RefreshCw,
      title: "Revisi Enak, Tinggal Sebut di Chat",
      description:
        "Mau ganti foto, ubah kisaran tarif cuci AC, atau tambah nama perumahan area layanan? Tinggal kabari saja.",
    },
    {
      icon: MessageCircle,
      title: "Habis Tayang Tidak Ditinggal Kabur",
      description:
        "Kalau besok-besok bingung cara pakai atau mau nanya soal iklan, nomor WhatsApp saya tetap aktif dan siap bantu.",
    },
  ],
  en: [
    {
      icon: UserCheck,
      title: "Direct 1-on-1 Execution by Nanang",
      description:
        "Never passed off to junior interns. The person chatting with you on WhatsApp builds every line of your site personally.",
    },
    {
      icon: FileCheck2,
      title: "Pay the Final 50% Only After Approval",
      description:
        "Start with a 50% deposit and settle the remaining 50% only once you've tested and approved your live website.",
    },
    {
      icon: RefreshCw,
      title: "Zero-Friction Revisions via Chat",
      description:
        "Want to tweak service pricing, add new cities, or swap photos before launch? Send a quick message and consider it done.",
    },
    {
      icon: MessageCircle,
      title: "Ongoing Support After Launch Day",
      description:
        "I don't vanish after launch. My WhatsApp stays open whenever you want advice scaling ads or adding new offers.",
    },
  ],
};

export default function TrustSection() {
  const { lang } = useLanguage();
  const commitments = COMMITMENTS_BY_LANG[lang];

  return (
    <section
      id="komitmen"
      aria-label={lang === "id" ? "Komitmen kerja NanangDigital" : "Our working commitments"}
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="10"
          eyebrow={lang === "id" ? "Enaknya Kerja Bareng" : "Zero-Risk Guarantee"}
          title={
            lang === "id" ? (
              <>
                Transparan dari Awal, <span className="text-accent">Aman Sampai Beres</span>.
              </>
            ) : (
              <>
                Straightforward Terms, <span className="text-accent">Protected From Day One</span>.
              </>
            )
          }
          description={
            lang === "id"
              ? `Saya tidak mengarang cerita muluk-muluk. Ini empat hal pasti yang selalu saya pegang tiap mengerjakan website klien di ${BUSINESS.brand}.`
              : `No inflated agency promises or multi-year lock-in contracts. Just four rock-solid commitments on every ${BUSINESS.brand} project.`
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {commitments.map((commitment, i) => (
            <Reveal key={commitment.title} delay={i * 0.08}>
              <article className="flex h-full gap-5 rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-accent/40 md:p-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent">
                  <commitment.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
                    {commitment.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist md:text-base">
                    {commitment.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
