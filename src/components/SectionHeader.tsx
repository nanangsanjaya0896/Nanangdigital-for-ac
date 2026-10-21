import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeaderProps {
  /** Nomor urut editorial, mis. "01". */
  index: string;
  /** Label kecil uppercase, mis. "MASALAH". */
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <Reveal className={`relative ${centered ? "text-center" : ""}`}>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-8 select-none font-display text-7xl font-bold text-white/[0.04] md:text-8xl ${
          centered ? "left-1/2 -translate-x-1/2" : "right-0"
        }`}
      >
        {index}
      </span>

      <p
        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-accent/70" aria-hidden="true" />}
      </p>

      <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-mist md:text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
