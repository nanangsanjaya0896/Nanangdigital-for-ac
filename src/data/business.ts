/**
 * Sumber tunggal untuk seluruh identitas bisnis, kontak, dan tautan WhatsApp.
 */
export const BUSINESS = {
  brand: "NanangDigital",
  founder: "Nanang Sanjaya",
  role: "Founder & Web Strategist",
  niche: "usaha service AC dan cuci AC rumahan",
  founderPhoto: {
    url: "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_560,c_limit/photo1",
    srcSet:
      "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_360,c_limit/photo1 360w, https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_560,c_limit/photo1 560w, https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_760,c_limit/photo1 760w",
    sizes: "(max-width: 640px) 300px, 340px",
    avatarUrl:
      "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_face/photo1",
    alt: "Foto Nanang Sanjaya, Founder NanangDigital",
  },
  whatsapp: {
    intl: "6285972577637",
    display: "0859-7257-7637",
    url: "https://wa.me/6285972577637",
  },
} as const;

export function waUrl(message: string): string {
  return `${BUSINESS.whatsapp.url}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGE_GENERAL =
  "Halo Mas Nanang, saya mau tanya-tanya dulu soal pembuatan website untuk usaha service AC saya.";

export const WA_LINK_GENERAL = waUrl(WA_MESSAGE_GENERAL);
