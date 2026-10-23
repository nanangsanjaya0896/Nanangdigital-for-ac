import {
  MonitorSmartphone,
  MousePointerClick,
  PenLine,
  Rocket,
  Megaphone,
  LayoutTemplate,
  Users,
  MessagesSquare,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/LanguageContext";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FlowStep {
  icon: LucideIcon | null;
  label: string;
  note: string;
  isWhatsApp?: boolean;
}

const BENEFITS_BY_LANG: Record<Locale, Benefit[]> = {
  id: [
    {
      icon: MonitorSmartphone,
      title: "Tampilan usaha jauh lebih meyakinkan",
      description: "Begitu halaman dibuka, pelanggan langsung lihat usaha Anda beneran niat dan rapi.",
    },
    {
      icon: MousePointerClick,
      title: "Chat masuk sudah ada formatnya",
      description: "Tombol WhatsApp langsung mengisi pesan layanan yang dipilih calon pelanggan.",
    },
    {
      icon: LayoutTemplate,
      title: "Enteng dibuka dari HP",
      description: "Mayoritas orang cari tukang AC lewat HP, jadi ukuran teks dan tombolnya dibuat lega.",
    },
    {
      icon: PenLine,
      title: "Kalimat layanan beres ditulisin",
      description: "Anda tinggal cerita layanan sehari-hari, saya yang susun bahasanya supaya enak dibaca.",
    },
    {
      icon: Megaphone,
      title: "Tinggal sambung ke iklan lokal",
      description: "Kalau mau pasang iklan Facebook atau Instagram, halamannya sudah siap menampung klik.",
    },
    {
      icon: Rocket,
      title: "Hemat waktu balas pertanyaan dasar",
      description: "Daftar jasa, kisaran biaya, dan area jangkauan sudah tertulis jelas sejak awal.",
    },
  ],
  en: [
    {
      icon: MonitorSmartphone,
      title: "Instant contractor credibility",
      description: "Homeowners see a sharp, trustworthy brand within seconds instead of a bare phone number.",
    },
    {
      icon: MousePointerClick,
      title: "Pre-qualified booking messages",
      description: "Every inquiry arrives with the customer's name, city, phone, and service selected.",
    },
    {
      icon: LayoutTemplate,
      title: "Lightning-fast on mobile",
      description: "Over 80% of AC repair searches happen on a phone, so buttons and text stay effortless to tap.",
    },
    {
      icon: PenLine,
      title: "Service copy written for you",
      description: "Tell me what services you offer and I write clear homeowner-friendly copy from scratch.",
    },
    {
      icon: Megaphone,
      title: "Built ready for paid ad traffic",
      description: "Pre-wired with Meta Pixel, server CAPI deduplication, and Google Analytics 4.",
    },
    {
      icon: Rocket,
      title: "Fewer repetitive questions",
      description: "Your service list, coverage towns, and process are crystal clear before they message you.",
    },
  ],
};

const FLOW_BY_LANG: Record<Locale, FlowStep[]> = {
  id: [
    { icon: Users, label: "Warga Cari Jasa AC", note: "Lewat Google, kiriman link, atau iklan lokal" },
    { icon: MonitorSmartphone, label: "Buka Website Usaha Anda", note: "Cek layanan, kisaran biaya, & area kerja" },
    { icon: null, label: "Klik Tombol WhatsApp", note: "Pesan otomatis terisi sesuai kebutuhan servis", isWhatsApp: true },
    { icon: MessagesSquare, label: "Cocokkan Jadwal", note: "Tinggal pastikan alamat rumah dan jam kedatangan" },
    { icon: UserCheck, label: "Berangkat Kerjakan Order", note: "Pelanggan baru masuk tanpa ribet tanya dari nol" },
  ],
  en: [
    { icon: Users, label: "Homeowner Searches for AC Help", note: "Via Google search, Maps, referral, or local ads" },
    { icon: MonitorSmartphone, label: "Lands on Your HVAC Website", note: "Sees your services, service radius, & proof" },
    { icon: null, label: "Submits Quick Booking Inquiry", note: "Name, phone, city & issue pre-filled cleanly", isWhatsApp: true },
    { icon: MessagesSquare, label: "Confirm Dispatch Slot", note: "Lock in address & arrival window in seconds" },
    { icon: UserCheck, label: "Complete Job & Win Repeat Plan", note: "Turn urgent calls into recurring maintenance clients" },
  ],
};

export default function SolutionSection() {
  const { lang } = useLanguage();
  const benefits = BENEFITS_BY_LANG[lang];
  const flowSteps = FLOW_BY_LANG[lang];

  return (
    <section
      id="solusi"
      aria-label={lang === "id" ? "Solusi dari NanangDigital" : "How NanangDigital helps"}
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_80%_20%,black,transparent)]"
      />
      <div className="section-wrap relative">
        <SectionHeader
          index="02"
          eyebrow={lang === "id" ? "Cara Kerjanya" : "How It Works"}
          title={
            lang === "id" ? (
              <>
                Punya Halaman Resmi Sendiri yang <span className="text-accent">Bantu Jualan</span>{" "}
                24 Jam.
              </>
            ) : (
              <>
                A Dedicated Website That <span className="text-accent">Books Jobs 24/7</span> While
                You Work.
              </>
            )
          }
          description={
            lang === "id"
              ? "Saat Anda fokus mengerjakan unit di lapangan, website ini yang bertugas menjelaskan layanan usaha Anda ke calon pelanggan sampai mereka klik chat WhatsApp."
              : "While you and your crew handle repairs in the field, your website explains your services, builds trust, and sends pre-qualified homeowner inquiries straight to your phone."
          }
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Manfaat */}
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.07}>
                <div className="group flex h-full gap-4 rounded-2xl border border-line bg-surface/70 p-5 transition-colors duration-300 hover:border-accent/40">
                  <benefit.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Alur konversi */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/80 p-7 backdrop-blur md:p-9">
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {lang === "id" ? "Alur Pelanggan Memesan" : "Customer Booking Flow"}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight md:text-2xl">
                {lang === "id"
                  ? "Dari lihat halaman sampai jadi jadwal servis."
                  : "From first visit to confirmed service appointment."}
              </h3>

              <ol className="relative mt-8 space-y-0">
                {flowSteps.map((step, i) => {
                  const isLast = i === flowSteps.length - 1;
                  return (
                    <li key={step.label} className="relative flex gap-5 pb-8 last:pb-0">
                      {!isLast && (
                        <svg
                          aria-hidden="true"
                          className="absolute left-[1.4rem] top-[3.1rem] h-[calc(100%-3.2rem)] w-px text-accent/40"
                        >
                          <line
                            x1="0.5"
                            y1="0"
                            x2="0.5"
                            y2="100%"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="flow-connector"
                          />
                        </svg>
                      )}
                      <span
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
                          isLast
                            ? "border-accent bg-gradient-to-br from-accent to-accent-deep text-[#04140c] shadow-[0_0_30px_rgba(0,223,143,0.45)]"
                            : "border-line bg-ink text-accent"
                        }`}
                      >
                        {step.isWhatsApp ? (
                          <WhatsAppIcon className="h-5 w-5" />
                        ) : step.icon ? (
                          <step.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                        ) : null}
                      </span>
                      <div className="pt-1.5">
                        <p
                          className={`font-display text-base font-semibold tracking-tight ${
                            isLast ? "text-accent" : "text-white"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="mt-1 text-sm text-mist">{step.note}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="ml-auto pt-2 font-mono text-xs text-mist/50"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
