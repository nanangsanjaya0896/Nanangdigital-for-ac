import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Jarak geser awal (px). Default 40 sesuai spesifikasi. */
  y?: number;
}

type RevealStyle = CSSProperties & { "--reveal-y"?: string; "--reveal-delay"?: string };

const SHOWN_ATTR = "data-tampil";

let sharedObserver: IntersectionObserver | null = null;

/** Satu IntersectionObserver untuk semua elemen Reveal (lebih ringan daripada satu per elemen). */
function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute(SHOWN_ATTR, "");
          observer.unobserve(entry.target);
        }
      },
      // Sama seperti sebelumnya: muncul setelah masuk 100px ke dalam layar, sekali saja
      { rootMargin: "-100px" }
    );
  }
  return sharedObserver;
}

/**
 * Scroll-reveal standar: opacity 0 → 1, translateY 40 → 0,
 * durasi 0.8s, sekali saja, viewport margin -100px.
 * Pada reduced motion hanya fade singkat tanpa geser (lihat `.reveal` di index.css).
 *
 * Animasinya murni CSS transition yang dipicu atribut `data-tampil`, jadi tidak perlu
 * library animasi besar dan tidak membuat React merender ulang saat elemen muncul.
 */
export default function Reveal({ children, delay = 0, className, y = 40 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = getObserver();
    if (!observer) {
      el.setAttribute(SHOWN_ATTR, "");
      return;
    }
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const style: RevealStyle = {};
  if (y !== 40) style["--reveal-y"] = `${y}px`;
  if (delay) style["--reveal-delay"] = `${delay}s`;

  return (
    <div ref={ref} className={className ? `reveal ${className}` : "reveal"} style={style}>
      {children}
    </div>
  );
}
