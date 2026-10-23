import { useEffect, useState } from "react";
import WhatsAppIcon from "./WhatsAppIcon";
import { getGeneralWaLink } from "../data/business";
import { useLanguage } from "../i18n/LanguageContext";

export default function StickyWhatsApp() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={getGeneralWaLink(lang)}
      target="_blank"
      rel="noopener noreferrer"
      data-track-source="sticky_whatsapp_float"
      aria-label={
        lang === "id"
          ? "Hubungi NanangDigital melalui WhatsApp"
          : "Chat with NanangDigital on WhatsApp"
      }
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-accent-deep py-3.5 pl-4 pr-5 text-sm font-bold text-[#04140c] shadow-[0_14px_40px_-8px_rgba(0,223,143,0.65)] transition-all duration-500 hover:scale-105 focus:outline-none md:bottom-7 md:right-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#04140c]/15">
        <WhatsAppIcon className="h-4 w-4" />
      </span>
      <span className="hidden sm:inline">
        {lang === "id" ? "Tanya via WhatsApp" : "Chat on WhatsApp"}
      </span>
      <span className="sm:hidden">{lang === "id" ? "Chat WA" : "WhatsApp"}</span>
    </a>
  );
}
