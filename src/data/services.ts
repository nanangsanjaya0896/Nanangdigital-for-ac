import { MonitorSmartphone, Megaphone, PenLine, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "Pembuatan Landing Page Service AC",
    description:
      "Website satu halaman yang menjelaskan layanan Anda dengan rapi, lengkap dengan CTA WhatsApp dan tampilan profesional yang mobile-friendly.",
    icon: MonitorSmartphone,
  },
  {
    number: "02",
    title: "Setup & Optimasi Meta Ads",
    description:
      "Penyiapan kampanye Facebook dan Instagram Ads dengan targeting lokal, agar jasa Anda menjangkau calon pelanggan di area layanan.",
    icon: Megaphone,
  },
  {
    number: "03",
    title: "Copywriting Iklan & Halaman",
    description:
      "Teks iklan dan halaman yang mudah dipahami calon pelanggan, tanpa istilah teknis, dan mendorong mereka menghubungi Anda.",
    icon: PenLine,
  },
  {
    number: "04",
    title: "Bundling Website + Iklan",
    description:
      "Paket gabungan: website sebagai rumah bisnis Anda, iklan sebagai mesin penarik pengunjung yang terus bekerja.",
    icon: Package,
  },
];
