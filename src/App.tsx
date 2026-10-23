import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
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
import type { PreWaModalContext } from "./components/PreWhatsAppModal";
import { WA_MESSAGE_GENERAL } from "./data/business";
import { findArticleBySlug } from "./data/articles";
import { initMarketingTracking, trackPreWaModalOpened } from "./utils/tracking";

export interface AppProps {
  initialPath?: string;
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

function detectTopicLabel(source: string, message: string): string {
  if (source === "pricing_basic" || message.includes("Paket Basic")) {
    return "Paket Basic (Rp1.500.000)";
  }
  if (source === "pricing_growth" || message.includes("Paket Growth")) {
    return "Paket Growth (Rp2.000.000)";
  }
  if (source === "pricing_premium" || message.includes("Paket Premium")) {
    return "Paket Premium Custom";
  }
  if (source.startsWith("seo_article_") || source === "panduan_hub_cta") {
    return "Konsultasi dari Panduan AC";
  }
  if (source === "bonus_cta" || message.includes("bonus")) {
    return "Tanya Bonus Tambahan";
  }
  if (message.includes("melihat contoh")) {
    return "Diskusi Contoh Desain";
  }
  if (source === "faq_cta") {
    return "Tanya Jawab Layanan";
  }
  return "Konsultasi Gratis";
}

export default function App({ initialPath }: AppProps = {}) {
  const currentPath =
    initialPath ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const route = resolveRoute(currentPath);
  const matchedArticle = route.slug ? findArticleBySlug(route.slug) : undefined;

  const [preWaContext, setPreWaContext] = useState<PreWaModalContext | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    initMarketingTracking();
  }, []);

  // Tangkap klik semua tombol WhatsApp di halaman utama maupun halaman panduan SEO
  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href*="wa.me/"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.dataset.directWa === "true") return;

      event.preventDefault();
      lastTriggerRef.current = anchor;

      const explicitSource = anchor.dataset.trackSource;
      const parentSection = anchor.closest("section[id], header, footer");
      const source =
        explicitSource ||
        (parentSection?.id
          ? `section_${parentSection.id}`
          : parentSection?.tagName.toLowerCase() || "floating_cta");

      let presetMessage = WA_MESSAGE_GENERAL;
      try {
        const parsed = new URL(anchor.href);
        const textParam = parsed.searchParams.get("text");
        if (textParam && textParam.trim().length > 0) {
          presetMessage = textParam.trim();
        }
      } catch {
        // Gunakan pesan umum bila format URL tidak memiliki parameter text
      }

      const topicLabel = detectTopicLabel(source, presetMessage);
      trackPreWaModalOpened(source, topicLabel);

      setPreWaContext({
        source,
        topicLabel,
        presetMessage,
      });
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  const closePreWaModal = () => {
    setPreWaContext(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

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
    <>
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

      <AnimatePresence>
        {preWaContext && (
          <PreWhatsAppModal context={preWaContext} onClose={closePreWaModal} />
        )}
      </AnimatePresence>
    </>
  );
}
