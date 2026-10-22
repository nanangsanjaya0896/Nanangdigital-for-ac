import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeaderProps {
  index: string;
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
        className={`inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent ${
          centered ? "mx-auto" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        {eyebrow}
      </p>

      <h2 className="mt-5 font-display text-3xl font-bold leading-[1.14] tracking-tight sm:text-4xl lg:text-5xl">
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
