import { BUSINESS } from "../data/business";

interface LogoProps {
  className?: string;
}

/** Logo brand: NanangDigital dengan titik neon green. */
export default function Logo({ className }: LogoProps) {
  return (
    <span className={`font-display font-bold tracking-tight ${className ?? ""}`}>
      {BUSINESS.brand}
      <span className="text-accent" aria-hidden="true">
        .
      </span>
    </span>
  );
}
