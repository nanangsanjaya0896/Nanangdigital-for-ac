import { useEffect } from "react";
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

/**
 * NanangDigital — single-page landing page.
 * Seluruh konten berada dalam halaman "/" dengan navigasi anchor.
 */
export default function App() {
  // Deep-link: saat halaman dibuka dengan hash (mis. /#paket),
  // scroll ke section target setelah layout stabil.
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
      <StickyWhatsApp />
    </>
  );
}
