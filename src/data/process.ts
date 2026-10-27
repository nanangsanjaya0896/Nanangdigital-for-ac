import { MessagesSquare, FileText, Hammer, Eye, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Lima tahapan kerja. Dipakai oleh ProcessSection dan basis pengetahuan Asisten AI. */
export const PROCESS_STEPS: ProcessStep[] = [
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
];
