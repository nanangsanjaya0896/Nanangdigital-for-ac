import { Lightbulb, Share2, MessageSquareText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "../i18n/LanguageContext";

export interface Bonus {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Bonus gratis di semua paket (ID & EN). Dipakai oleh BonusSection dan basis pengetahuan Asisten AI. */
export const BONUSES_BY_LANG: Record<Locale, Bonus[]> = {
  id: [
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
  ],
  en: [
    {
      icon: MessageSquareText,
      title: "Ready-to-Send Dispatch Reply Scripts",
      description:
        "Proven copy-paste WhatsApp & SMS scripts for quoting jobs, confirming technician arrival windows, and collecting 5-star reviews.",
    },
    {
      icon: Lightbulb,
      title: "1-on-1 Local Lead Generation Strategy",
      description:
        "Actionable advice on mapping your highest-profit neighborhoods and getting steady calls during both peak summer and shoulder seasons.",
    },
    {
      icon: Share2,
      title: "Social & WhatsApp Business Bio Makeover",
      description:
        "Clean bio copy for your Instagram, Facebook Page, and WhatsApp Business profile aligned seamlessly with your new website.",
    },
  ],
};
