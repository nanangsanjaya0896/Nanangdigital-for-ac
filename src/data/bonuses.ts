import { Crown, MapPinned, Megaphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Bonus {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Bonus gratis di semua paket. Dipakai oleh BonusSection dan basis pengetahuan Asisten AI. */
export const BONUSES: Bonus[] = [
  {
    icon: Megaphone,
    title: "Konsultasi Strategi Iklan Gratis",
    description:
      "Ngobrol langsung soal strategi iklan Facebook & Instagram, mulai dari area yang dibidik, pesan iklan, sampai budget harian yang masuk akal untuk usaha AC Anda.",
  },
  {
    icon: MapPinned,
    title: "Panduan Optimasi Google Maps",
    description:
      "Langkah praktis merapikan foto, kategori, jam buka, dan ulasan di profil Google Maps supaya usaha Anda lebih gampang ditemukan pelanggan di sekitar.",
  },
  {
    icon: Crown,
    title: "Bonus Eksklusif Template Premium",
    description:
      "Template caption Instagram & Facebook yang sudah terbukti menarik perhatian calon pelanggan bisnis AC.",
  },
];
