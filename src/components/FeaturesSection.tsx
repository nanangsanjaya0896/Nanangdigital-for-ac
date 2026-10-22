import { Smartphone, MessageCircle, PenTool, BadgeCheck, Target, MoveRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

interface Feature {
  icon: LucideIcon;
  feature: string;
  benefit: string;
}

const FEATURES: Feature[] = [
  {
    icon: Smartphone,
    feature: "Nyaman dibuka dari layar HP",
    benefit: "Pelanggan yang lagi buru-buru cari tukang AC bisa baca info dan klik tombol tanpa perlu zoom layar.",
  },
  {
    icon: MessageCircle,
    feature: "Tombol WhatsApp otomatis isi pesan",
    benefit: "Begitu diklik, chat langsung terisi jenis layanan sehingga Anda tidak perlu tanya dari awal lagi.",
  },
  {
    icon: PenTool,
    feature: "Teks layanan ditulisin sampai rapi",
    benefit: "Layanan cuci rutin, isi freon, dan bongkar pasang tertulis jelas pakai bahasa sehari-hari pelanggan.",
  },
  {
    icon: BadgeCheck,
    feature: "Domain resmi .com atau .id sendiri",
    benefit: "Nama usaha Anda tampil jauh lebih meyakinkan waktu dibagikan di grup warga atau Google Maps.",
  },
  {
    icon: Target,
    feature: "Siap dipasang Meta Pixel & iklan",
    benefit: "Kalau sewaktu-waktu mau jalankan iklan Facebook atau Instagram, halamannya sudah siap pakai.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="fitur"
      aria-label="Detail fasilitas website"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="06"
          eyebrow="Detail Website"
          title={
            <>
              Dibuat Praktis Supaya <span className="text-accent">Pelanggan Cepat Paham</span>.
            </>
          }
          description="Anda cukup fokus ke urusan kerja lapangan. Urusan tampilan, kata-kata, sampai teknis domain biar saya yang siapkan."
        />

        <div className="mt-14">
          {FEATURES.map((item, i) => (
            <Reveal key={item.feature} delay={i * 0.06}>
              <div className="group grid gap-4 border-b border-line py-7 transition-colors duration-300 first:border-t hover:bg-white/[0.02] md:grid-cols-[auto_1fr_auto_1.4fr] md:items-center md:gap-8 md:px-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] font-mono text-sm text-accent transition-colors duration-300 group-hover:border-accent/50">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-4">
                  <item.icon
                    className="h-5 w-5 shrink-0 text-mist transition-colors duration-300 group-hover:text-accent"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">
                    {item.feature}
                  </h3>
                </div>

                <MoveRight
                  className="hidden h-5 w-5 text-accent/60 transition-transform duration-300 group-hover:translate-x-1.5 md:block"
                  aria-hidden="true"
                />

                <p className="text-sm leading-relaxed text-mist md:text-base">{item.benefit}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
