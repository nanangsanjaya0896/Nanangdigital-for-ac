import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Jarak geser awal (px). Default 40 sesuai spesifikasi. */
  y?: number;
}

/**
 * Scroll-reveal standar: opacity 0 → 1, translateY 40 → 0,
 * durasi 0.8s, sekali saja, viewport margin -100px.
 * Pada reduced motion hanya fade singkat tanpa geser.
 */
export default function Reveal({ children, delay = 0, className, y = 40 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: reduced ? 0.3 : 0.8,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
