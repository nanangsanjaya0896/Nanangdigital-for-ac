/**
 * Sumber tunggal untuk seluruh identitas bisnis, kontak, dan tautan WhatsApp.
 * Semua section wajib memakai data dari file ini agar konsisten.
 */
export const BUSINESS = {
  brand: "NanangDigital",
  founder: "Nanang Sanjaya",
  role: "Founder & Web Strategist",
  niche: "bisnis service AC dan cuci AC rumahan",
  /** Foto founder resmi yang disetujui (Cloudinary milik bisnis). */
  founderPhoto: {
    url: "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto/photo1",
    alt: "Foto Nanang Sanjaya, Founder & Web Strategist NanangDigital",
  },
  whatsapp: {
    /** Nomor format internasional tanpa tanda plus, untuk URL wa.me */
    intl: "6285972577637",
    /** Nomor format lokal yang mudah dibaca pengunjung */
    display: "0859-7257-7637",
    url: "https://wa.me/6285972577637",
  },
} as const;

/** Bangun URL WhatsApp dengan pesan yang sudah ter-encode. */
export function waUrl(message: string): string {
  return `${BUSINESS.whatsapp.url}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGE_GENERAL =
  "Halo NanangDigital, saya tertarik konsultasi gratis tentang pembuatan website untuk bisnis service AC saya.";

export const WA_LINK_GENERAL = waUrl(WA_MESSAGE_GENERAL);
