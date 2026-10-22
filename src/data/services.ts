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
];
