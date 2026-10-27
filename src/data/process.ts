import { MessagesSquare, FileText, Hammer, Eye, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "../i18n/LanguageContext";

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Lima tahapan kerja (ID & EN). Dipakai oleh ProcessSection dan basis pengetahuan Asisten AI. */
export const PROCESS_STEPS_BY_LANG: Record<Locale, ProcessStep[]> = {
  id: [
    {
      icon: MessagesSquare,
      title: "Ngobrol Santai di WhatsApp",
      description:
        "Ceritakan layanan AC apa saja yang Anda kerjakan dan daerah mana yang paling ingin dikejar orderannya.",
    },
    {
      icon: FileText,
      title: "Kirim Data & DP 50%",
      description:
        "Kirim nama usaha, daftar tarif, foto kerja (kalau ada), dan nomor WA. Pembayaran awal cukup DP 50%.",
    },
    {
      icon: Hammer,
      title: "Saya Kerjakan Sampai Rapi",
      description:
        "Tampilan halaman, susunan kalimat layanan, sampai tombol chat saya siapkan dalam 3 sampai 5 hari kerja.",
    },
    {
      icon: Eye,
      title: "Anda Cek & Minta Revisi",
      description:
        "Saya kirim link hasilnya untuk Anda coba buka dari HP sendiri. Kalau ada yang kurang pas, tinggal minta ubah.",
    },
    {
      icon: Rocket,
      title: "Pelunasan & Langsung Online",
      description:
        "Begitu sudah cocok semua, lunasi sisa 50% dan website resmi usaha AC Anda langsung aktif menerima pelanggan.",
    },
  ],
  en: [
    {
      icon: MessagesSquare,
      title: "Quick Discovery Chat on WhatsApp",
      description:
        "Share your HVAC services, target towns or zip codes, and which package best fits your current stage.",
    },
    {
      icon: FileText,
      title: "Send Basics & 50% Kickoff Deposit",
      description:
        "Send your company name, service list, contact number, and any job photos along with a 50% starter deposit.",
    },
    {
      icon: Hammer,
      title: "Full Design, Copy & Setup (3-5 Days)",
      description:
        "I write the copy, build the mobile-first layout, wire lead tracking, and prepare your ad creatives.",
    },
    {
      icon: Eye,
      title: "Live Preview & Revisions",
      description:
        "Test your live preview link directly on your phone and request any copy or visual tweaks effortlessly.",
    },
    {
      icon: Rocket,
      title: "Final 50% & Official Launch",
      description:
        "Once you're 100% happy, settle the remaining 50% and your custom domain, tracking, and campaigns go live.",
    },
  ],
};
