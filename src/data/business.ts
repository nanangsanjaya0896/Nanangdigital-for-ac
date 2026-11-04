
/**
 * Sumber tunggal untuk seluruh identitas bisnis, kontak, dan tautan WhatsApp.
 */
export const BUSINESS = {
  brand: "NanangDigital",
  /** Penulisan lain nama brand (sesuai tulisan di logo), dipakai data terstruktur supaya mesin pencari tahu ini brand yang sama. */
  alternateName: "Nanang Digital",
  founder: "Nanang Sanjaya",
  role: "Founder & Web Strategist",
  niche: "usaha service AC dan cuci AC rumahan",
  /** Satu kalimat jati diri brand: dipakai data terstruktur, llms.txt, dan kotak penulis di artikel. */
  summary:
    "NanangDigital adalah jasa pembuatan website dan setup iklan Meta Ads (Facebook dan Instagram) khusus usaha service AC dan cuci AC rumahan di Indonesia, dikerjakan langsung oleh Nanang Sanjaya.",
  /** Profil singkat penulis artikel Panduan (E-E-A-T). */
  authorBio:
    "Membuat website, landing page, copywriting, dan setup iklan Meta Ads khusus untuk usaha service AC dan cuci AC rumahan. Setiap website dikerjakan sendiri, mulai dari menyusun isi halaman sampai online dan siap dipakai beriklan.",
  /** Wilayah layanan: semua koordinasi lewat WhatsApp, jadi bisa melayani usaha di kota mana pun di Indonesia. */
  areaServed: "Indonesia",
  founderPhoto: {
    url: "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_560,c_limit/photo1",
    srcSet:
      "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_360,c_limit/photo1 360w, https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_560,c_limit/photo1 560w, https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_760,c_limit/photo1 760w",
    sizes: "(max-width: 640px) 300px, 340px",
    avatarUrl:
      "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_face/photo1",
    alt: "Foto Nanang Sanjaya, Founder NanangDigital",
  },
  logoUrl: "https://res.cloudinary.com/col2kwnv/image/upload/f_auto/q_auto/Logo_Nanang_Digital.jpg",
  whatsapp: {
    intl: "6285972577637",
    display: "0859-7257-7637",
    displayIntl: "+62 859-7257-7637",
    url: "https://wa.me/6285972577637",
  },
} as const;

export function waUrl(message: string): string {
  return `${BUSINESS.whatsapp.url}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGE_GENERAL =
  "Halo Mas Nanang, saya mau tanya-tanya dulu soal pembuatan website untuk usaha service AC saya.";
export const WA_LINK_GENERAL = waUrl(WA_MESSAGE_GENERAL);
