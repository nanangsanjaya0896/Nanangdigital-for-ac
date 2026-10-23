import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import FounderSection from "./components/FounderSection";
import WorksSection from "./components/WorksSection";
import LayananSection from "./components/LayananSection";
import FeaturesSection from "./components/FeaturesSection";
import PricingSection from "./components/PricingSection";
import ProcessSection from "./components/ProcessSection";
import BonusSection from "./components/BonusSection";
import TrustSection from "./components/TrustSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";
import Footer from "./components/Footer";
import StickyWhatsApp from "./components/StickyWhatsApp";
import PreWhatsAppModal from "./components/PreWhatsAppModal";
import PanduanPage from "./components/PanduanPage";
import { findArticleBySlug } from "./data/articles";
import { LanguageProvider, detectInitialLocale } from "./i18n/LanguageContext";
import type { Locale } from "./i18n/LanguageContext";
import { captureFbClickId } from "./utils/tracking";

export interface AppProps {
  /** Digunakan oleh skrip prerender statis untuk `/`, `/en/`, `/panduan/`, dan `/panduan/<slug>/` */
  initialPath?: string;
  initialLang?: Locale;
}

function resolveRoute(pathname: string): { isPanduan: boolean; slug?: string } {
  const clean = pathname.replace(/\/+$/, "");
  if (clean === "/panduan") {
    return { isPanduan: true };
  }
  const match = clean.match(/^\/panduan\/([^/]+)$/);
  if (match) {
    return { isPanduan: true, slug: decodeURIComponent(match[1]) };
  }
  return { isPanduan: false };
}

export default function App({ initialPath, initialLang }: AppProps = {}) {
  const [currentPath] = useState<string>(() => {
    if (initialPath) return initialPath;
    if (typeof window !== "undefined") return window.location.pathname;
    return "/";
  });

  const route = resolveRoute(currentPath);
  const matchedArticle = route.slug ? findArticleBySlug(route.slug) : undefined;
  const resolvedInitialLang = detectInitialLocale(initialLang, currentPath);

  useEffect(() => {
    captureFbClickId();
  }, []);

  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) return;
    const id = decodeURIComponent(hash.slice(1));
    const timer = window.setTimeout(() => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "auto" });
      }
    }, 150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider initialLang={resolvedInitialLang} pathname={currentPath}>
      <MotionConfig reducedMotion="user">
        {route.isPanduan ? (
          <PanduanPage article={matchedArticle} />
        ) : (
          <>
            <Navbar />
            <main id="konten" tabIndex={-1}>
              <Hero />
              <ProblemSection />
              <SolutionSection />
              <FounderSection />
              <WorksSection />
              <LayananSection />
              <FeaturesSection />
              <PricingSection />
              <ProcessSection />
              <BonusSection />
              <TrustSection />
              <FAQSection />
              <FinalCTASection />
            </main>
            <Footer />
          </>
        )}

        <StickyWhatsApp />
        <PreWhatsAppModal />
      </MotionConfig>
    </LanguageProvider>
  );
}
