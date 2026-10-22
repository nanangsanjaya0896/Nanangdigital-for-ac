import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WhatsAppIcon from "./WhatsAppIcon";
import { WA_LINK_GENERAL } from "../data/business";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Tombol konsultasi mengambang.
 * Muncul sekitar 1,5 detik setelah halaman dimuat (sesuai PRD FR-07).
 */
export default function StickyWhatsApp() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WA_LINK_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          data-track-source="sticky_whatsapp_cta"
          aria-label="Konsultasi gratis via WhatsApp"
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-gradient-to-br from-accent to-accent-deep p-4 text-[#04140c] shadow-[0_10px_36px_-6px_rgba(0,223,143,0.55)] sm:bottom-6 sm:right-6 sm:pr-5 sm:pl-4"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 24 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          whileHover={reduced ? undefined : { scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {!reduced && (
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/40 [animation-duration:2.4s]"
            />
          )}
          <WhatsAppIcon className="h-6 w-6 shrink-0" />
          <span className="hidden text-sm font-bold sm:block">Konsultasi Gratis</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
