import { Lightbulb, Share2, MessageSquareText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Bonus {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Bonus gratis di semua paket. Dipakai oleh BonusSection dan basis pengetahuan Asisten AI. */
export const BONUSES: Bonus[] = [
  {
    icon: MessageSquareText,
    title: "Template Balas Chat Pelanggan",
    description:
      "Contoh kalimat siap salin waktu balas chat tanya harga, konfirmasi jam kedatangan teknisi, sampai minta ulasan.",
  },
  {
    icon: Lightbulb,
    title: "Diskusi Arah Promosi Area Lokal",
    description:
      "Obrolan santai membahas cara paling masuk akal mendatangkan orderan rutin di kecamatan atau kota tempat Anda buka jasa.",
  },
  {
    icon: Share2,
    title: "Perapian Profil Bio Medsos",
    description:
      "Saran kalimat singkat untuk bio Instagram, Facebook, dan info bisnis WhatsApp supaya seragam mengarah ke website baru.",
  },
];
