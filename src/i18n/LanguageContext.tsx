import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Locale = "id" | "en";

interface LanguageContextValue {
  lang: Locale;
  setLang: (next: Locale) => void;
  toggleLang: () => void;
}

const LANG_STORAGE_KEY = "nd_lang_v1";

const TITLES: Record<Locale, string> = {
  id: "NanangDigital | Jasa Website & Iklan Meta Ads Khusus Usaha Service AC",
  en: "NanangDigital | Websites & Meta Lead Ads Built for HVAC & AC Businesses",
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "id",
  setLang: () => {},
  toggleLang: () => {},
});

export function detectInitialLocale(initialLang?: Locale, pathname?: string): Locale {
  if (initialLang) return initialLang;
  const path = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  if (path === "/en" || path.startsWith("/en/")) {
    return "en";
  }
  return "id";
}

export function LanguageProvider({
  initialLang,
  pathname,
  children,
}: {
  initialLang?: Locale;
  pathname?: string;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Locale>(() => detectInitialLocale(initialLang, pathname));

  // Sinkronkan preferensi tersimpan bila pengguna membuka halaman utama biasa
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/en" || currentPath.startsWith("/en/")) {
      setLangState("en");
      try {
        localStorage.setItem(LANG_STORAGE_KEY, "en");
      } catch {
        // Abaikan pembatasan storage
      }
      return;
    }

    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "en" || saved === "id") {
        setLangState(saved);
      }
    } catch {
      // Abaikan pembatasan storage
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    const isGuideRoute = window.location.pathname.startsWith("/panduan");
    if (!isGuideRoute) {
      document.title = TITLES[lang];
    }
  }, [lang]);

  const setLang = (next: Locale) => {
    setLangState(next);
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // Abaikan pembatasan storage
    }

    const { pathname: curPath, search, hash } = window.location;
    if (!curPath.startsWith("/panduan")) {
      const targetPath = next === "en" ? "/en/" : "/";
      if (curPath !== targetPath) {
        window.history.replaceState(null, "", `${targetPath}${search}${hash}`);
      }
    }
  };

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
