import {
  LayoutTemplate,
  Smartphone,
  PenLine,
  MousePointerClick,
  Zap,
  Globe,
  RefreshCw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/LanguageContext";

interface Feature {
  icon: LucideIcon | null;
  title: string;
  description: string;
  isWhatsApp?: boolean;
}

const FEATURES_BY_LANG: Record<Locale, Feature[]> = {
  id: [
    {
      icon: LayoutTemplate,
      title: "Desain Disesuaikan Nama Usaha Anda",
      description:
        "Warna, logo, foto pengerjaan unit, sampai daftar layanan disusun khusus mengikuti identitas usaha AC Anda.",
    },
    {
      icon: Smartphone,
      title: "Rapi di Layar HP, Tablet, & Laptop",
      description:
        "Tampilan otomatis menyesuaikan layar HP pelanggan supaya tulisan jelas terbaca tanpa harus digeser kiri-kanan.",
    },
    {
      icon: null,
      isWhatsApp: true,
      title: "Tombol & Form Langsung ke WhatsApp",
      description:
        "Sekali klik, calon pelanggan langsung terhubung ke nomor WhatsApp Anda dengan teks pesan yang sudah rapi.",
    },
    {
      icon: PenLine,
      title: "Copywriting Layanan Sudah Ditulisin",
      description:
        "Tidak perlu pusing merangkai kata. Cukup kirim daftar jasa dan area kerja, kalimatnya saya siapkan dari nol.",
    },
    {
      icon: Zap,
      title: "SSL HTTPS, Live Chat AI, & Google Maps",
      description:
        "Sudah termasuk gembok keamanan HTTPS, fitur Live Chat AI di halaman, serta pembuatan Akun Google My Business.",
    },
    {
      icon: Globe,
      title: "Gratis Domain & Hosting 1 Tahun",
      description:
        "Nama domain pilihan Anda (misalnya namausahaac.com) dan sewa hosting tahun pertama sudah beres ditanggung.",
    },
    {
      icon: RefreshCw,
      title: "Jatah Revisi Jelas Sebelum Tayang",
      description:
        "Mulai dari 3x revisi di Basic, 5x di Growth, hingga 10x revisi di Premium supaya hasilnya benar-benar pas.",
    },
  ],
  en: [
    {
      icon: LayoutTemplate,
      title: "100% Custom Branded to Your HVAC Shop",
      description:
        "Colors, logo, truck & technician photos, service list, and city coverage tailored around your business.",
    },
    {
      icon: Smartphone,
      title: "Thumb-Friendly on Phone, Tablet & Desktop",
      description:
        "Engineered mobile-first so homeowners with broken cooling can read and book in seconds without pinching or zooming.",
    },
    {
      icon: null,
      isWhatsApp: true,
      title: "Instant WhatsApp & Pre-Filled Lead Form",
      description:
        "One tap captures customer name, phone number, city, and package interest straight to your WhatsApp dispatch line.",
    },
    {
      icon: PenLine,
      title: "Persuasive HVAC Copywriting Done For You",
      description:
        "Skip staring at a blank page. Share your core services and rates, and I write clear homeowner-ready copy for every section.",
    },
    {
      icon: Zap,
      title: "SSL HTTPS, AI Live Chat & Google Business Profile",
      description:
        "Every build ships with HTTPS security, 24/7 AI Live Chat assistant, and full Google Business Profile (Maps) setup.",
    },
    {
      icon: Globe,
      title: "Free Custom Domain & Hosting (Year 1)",
      description:
        "Your custom .com or local domain plus fast global hosting for the first 12 months are completely covered.",
    },
    {
      icon: RefreshCw,
      title: "Generous Revision Rounds Before Launch",
      description:
        "3 revisions on Basic, 5 on Growth, and up to 10 on Premium so every word and section looks spot-on before launch.",
    },
  ],
};

export default function FeaturesSection() {
  const { lang } = useLanguage();
  const features = FEATURES_BY_LANG[lang];

  return (
    <section
      id="fitur"
      aria-label={
        lang === "id"
          ? "Yang sudah termasuk dalam pengerjaan"
          : "Everything included in every build"
      }
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="06"
          eyebrow={lang === "id" ? "Fasilitas di Setiap Paket" : "Included Across All Plans"}
          title={
            lang === "id" ? (
              <>
                Terima Beres dari Domain Sampai{" "}
                <span className="text-accent">Siap Terima Chat</span>.
              </>
            ) : (
              <>
                Turnkey Delivery From Custom Domain to{" "}
                <span className="text-accent">Live Customer Leads</span>.
              </>
            )
          }
          description={
            lang === "id"
              ? "Semua komponen penting sudah masuk di dalam paket, jadi tidak ada biaya tambahan tersembunyi di tengah jalan."
              : "Every technical essential is baked right into your package upfront with zero surprise add-on invoices."
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.06}>
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_50px_-20px_rgba(0,223,143,0.25)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent">
                  {feature.isWhatsApp ? (
                    <WhatsAppIcon className="h-5 w-5" />
                  ) : feature.icon ? (
                    <feature.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                  ) : null}
                </span>
                <h3 className="mt-5 font-display text-base font-bold tracking-tight md:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">{feature.description}</p>
              </article>
            </Reveal>
          ))}

          {/* Kartu ke-8: penekanan tanpa pusing teknis */}
          <Reveal delay={features.length * 0.06}>
            <a
              href="#proses"
              className="group flex h-full min-h-[12rem] flex-col justify-between rounded-2xl border border-line bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
            >
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-mist transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <MousePointerClick className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-base font-bold tracking-tight md:text-lg">
                  {lang === "id"
                    ? "Anda Fokus Pegang Alat Kerja Saja"
                    : "Stay Focused on Jobs in the Field"}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">
                  {lang === "id"
                    ? "Setting domain, SSL, Google Maps, sampai tombol chat semuanya saya yang urus."
                    : "DNS setup, SSL security, tracking pixels, and Google Maps listing handled end-to-end for you."}
                </p>
              </div>
              <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {lang === "id" ? "Lihat alur kerja →" : "See step-by-step process →"}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
