import { MonitorSmartphone, Megaphone, PenLine, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "../i18n/LanguageContext";

export interface Service {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const SERVICES_BY_LANG: Record<Locale, Service[]> = {
  id: [
    {
      number: "01",
      title: "Pembuatan Website Usaha Service AC",
      description:
        "Halaman resmi yang merangkum daftar jasa cuci AC, tambah freon, bongkar pasang, area jangkauan, sampai tombol panggil teknisi lewat WhatsApp.",
      icon: MonitorSmartphone,
    },
    {
      number: "02",
      title: "Setup Iklan Facebook & Instagram",
      description:
        "Iklan disetel khusus menjangkau pemilik rumah, kos, atau ruko di radius area kerja Anda supaya biaya iklan terpakai ke orang yang memang dekat.",
      icon: Megaphone,
    },
    {
      number: "03",
      title: "Penulisan Teks Halaman & Iklan",
      description:
        "Anda cukup cerita layanan dan kisaran tarif biasa di lapangan. Urusan merangkai kalimat supaya calon pelanggan yakin memesan, saya yang bereskan.",
      icon: PenLine,
    },
    {
      number: "04",
      title: "Paket Sekalian Website + Iklan",
      description:
        "Begitu website selesai, iklan langsung diarahkan ke halaman tersebut. Praktis buat pemilik usaha yang tidak sempat mengurus teknis satu-satu.",
      icon: Package,
    },
  ],
  en: [
    {
      number: "01",
      title: "High-Converting HVAC Website Design",
      description:
        "A dedicated, fast-loading site showcasing AC repair, tune-ups, mini-split installs, service areas, transparent pricing cues, and instant booking buttons.",
      icon: MonitorSmartphone,
    },
    {
      number: "02",
      title: "Local Facebook & Instagram Lead Ads",
      description:
        "Geo-targeted campaigns focused strictly on homeowners and property managers inside your exact driving radius so ad spend never gets wasted out of area.",
      icon: Megaphone,
    },
    {
      number: "03",
      title: "Done-For-You HVAC Copywriting",
      description:
        "Just share the services you run and your coverage cities. I write clear, trustworthy homeowner copy that turns urgent AC breakdowns into booked jobs.",
      icon: PenLine,
    },
    {
      number: "04",
      title: "Turnkey Website + Lead Ads Bundle",
      description:
        "Your website, pixel tracking, Google Business Profile, and local ads built to work together from day one so you stay focused on jobs in the field.",
      icon: Package,
    },
  ],
};

export const SERVICES: Service[] = SERVICES_BY_LANG.id;
