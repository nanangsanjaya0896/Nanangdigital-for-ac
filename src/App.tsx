import { Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";
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
import AIChatWidget from "./components/AIChatWidget";
import PreWhatsAppModal from "./components/PreWhatsAppModal";
import PanduanPage from "./components/PanduanPage";
import { findArticleBySlug } from "./data/articles";
import { captureFbClickId } from "./utils/tracking";

export interface AppProps {
  /** Digunakan oleh skrip prerender statis untuk `/`, `/panduan/`, dan `/panduan/<slug>/` */
  initialPath?: string;
}

/**
 * Pembungkus tiap bagian halaman. HTML-nya sudah lengkap dari prerender, jadi React cukup
 * "menghidupkan" (hydrate) tiap bagian satu per satu di waktu luang browser. Hasilnya tidak ada
 * satu tugas JavaScript panjang yang membuat HP atau laptop lama terasa macet (Total Blocking Time rendah).
 */
function Bagian({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
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

export default function App({ initialPath }: AppProps = {}) {
  const [currentPath] = useState<string>(() => {
    if (initialPath) return initialPath;
    if (typeof window !== "undefined") return window.location.pathname;
    return "/";
  });

  const route = resolveRoute(currentPath);
  const matchedArticle = route.slug ? findArticleBySlug(route.slug) : undefined;

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
    <>
      {route.isPanduan ? (
        <PanduanPage article={matchedArticle} slug={route.slug} />
      ) : (
        <>
          <Bagian>
            <Navbar />
          </Bagian>
          <main id="konten" tabIndex={-1}>
            <Bagian>
              <Hero />
            </Bagian>
            <Bagian>
              <ProblemSection />
            </Bagian>
            <Bagian>
              <SolutionSection />
            </Bagian>
            <Bagian>
              <FounderSection />
            </Bagian>
            <Bagian>
              <WorksSection />
            </Bagian>
            <Bagian>
              <LayananSection />
            </Bagian>
            <Bagian>
              <FeaturesSection />
            </Bagian>
            <Bagian>
              <PricingSection />
            </Bagian>
            <Bagian>
              <ProcessSection />
            </Bagian>
            <Bagian>
              <BonusSection />
            </Bagian>
            <Bagian>
              <TrustSection />
            </Bagian>
            <Bagian>
              <FAQSection />
            </Bagian>
            <Bagian>
              <FinalCTASection />
            </Bagian>
          </main>
          <Bagian>
            <Footer />
          </Bagian>
        </>
      )}

      <StickyWhatsApp />
      <Bagian>
        <AIChatWidget />
      </Bagian>
      <PreWhatsAppModal />
    </>
  );
}
