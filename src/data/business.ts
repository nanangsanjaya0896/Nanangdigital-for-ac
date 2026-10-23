import type { Locale } from "../i18n/LanguageContext";

/**
 * Sumber tunggal untuk seluruh identitas bisnis, kontak, dan tautan WhatsApp (ID & EN).
 */
export const BUSINESS = {
  brand: "NanangDigital",
  founder: "Nanang Sanjaya",
  role: "Founder & Web Strategist",
  niche: {
    id: "usaha service AC dan cuci AC rumahan",
    en: "residential & light commercial HVAC and AC service businesses",
  },
  founderPhoto: {
    url: "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_560,c_limit/photo1",
    srcSet:
      "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_360,c_limit/photo1 360w, https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_560,c_limit/photo1 560w, https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_760,c_limit/photo1 760w",
    sizes: "(max-width: 640px) 300px, 340px",
    avatarUrl:
      "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_face/photo1",
    alt: {
      id: "Foto Nanang Sanjaya, Founder NanangDigital",
      en: "Photo of Nanang Sanjaya, Founder of NanangDigital",
    },
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

export const WA_MESSAGE_BY_LANG: Record<Locale, string> = {
  id: "Halo Mas Nanang, saya mau tanya-tanya dulu soal pembuatan website untuk usaha service AC saya.",
  en: "Hi Nanang, I'd like to discuss building a conversion-ready website for my HVAC / AC service business.",
};

export const WA_MESSAGE_GENERAL = WA_MESSAGE_BY_LANG.id;
export const WA_LINK_GENERAL = waUrl(WA_MESSAGE_GENERAL);

export function getGeneralWaLink(lang: Locale): string {
  return waUrl(WA_MESSAGE_BY_LANG[lang]);
}
