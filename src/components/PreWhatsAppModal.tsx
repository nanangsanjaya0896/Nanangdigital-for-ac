import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { X, ArrowUpRight, ShieldCheck } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS } from "../data/business";
import { useScrollLock } from "../hooks/useScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";
import {
  generateEventId,
  trackGaEvent,
  trackMetaConversion,
} from "../utils/tracking";

const STORAGE_KEY = "nd_lead_profile_v1";

interface SavedLeadProfile {
  fullName: string;
  phone: string;
  city: string;
  planInterest: string;
}

interface PlanOption {
  label: string;
  value: number;
}

const PLAN_OPTIONS: PlanOption[] = [
  { label: "Paket Basic (Rp1.500.000)", value: 1500000 },
  { label: "Paket Growth (Rp2.000.000)", value: 2000000 },
  { label: "Paket Premium Custom", value: 3000000 },
  { label: "Tanya & Konsultasi Dulu", value: 1500000 },
];

function inferPlanOption(href: string, explicitPlan: string | null): string {
  const options = PLAN_OPTIONS;
  const combined = `${explicitPlan || ""} ${decodeURIComponent(href)}`.toLowerCase();
  if (combined.includes("growth") || combined.includes("2.000.000")) {
    return options[1].label;
  }
  if (combined.includes("premium") || combined.includes("custom")) {
    return options[2].label;
  }
  if (combined.includes("basic") || combined.includes("1.500.000")) {
    return options[0].label;
  }
  return options[3].label;
}

export default function PreWhatsAppModal() {
  const planOptions = PLAN_OPTIONS;

  const [open, setOpen] = useState(false);
  const [targetHref, setTargetHref] = useState("");
  const [clickSource, setClickSource] = useState("whatsapp_cta");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [planInterest, setPlanInterest] = useState<string>(planOptions[3].label);
  const [errorMsg, setErrorMsg] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useFocusTrap(dialogRef, open, () => setOpen(false));

  // Muat isian sebelumnya dari localStorage agar pengunjung yang kembali tidak perlu ketik ulang
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<SavedLeadProfile>;
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.city) setCity(parsed.city);
      }
    } catch {
      // Abaikan bila mode privat membatasi storage
    }
  }, []);

  // Delegasi klik global pada seluruh tautan WhatsApp (`wa.me/6285972577637`)
  useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!href.includes("wa.me/6285972577637")) return;

      // Abaikan tombol lewati langsung di dalam modal
      if (anchor.dataset.bypassLeadModal === "true") return;

      e.preventDefault();

      const source =
        anchor.dataset.trackSource ||
        anchor.closest("section")?.id ||
        "general_whatsapp_cta";
      const detectedPlan = inferPlanOption(href, anchor.dataset.trackPlan || null);

      setTargetHref(href);
      setClickSource(source);
      setPlanInterest(detectedPlan);
      setErrorMsg("");
      setOpen(true);

      trackGaEvent("whatsapp_modal_open", {
        lead_source: source,
        plan_interest: detectedPlan,
        language: "id",
      });
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, []);

  const handleDirectBypass = () => {
    const eventId = generateEventId();
    const currency = "IDR";
    const fallbackValue = 1500000;

    trackGaEvent("whatsapp_click_direct", {
      lead_source: clickSource,
      plan_interest: planInterest,
      language: "id",
    });
    void trackMetaConversion("Contact", {
      eventId,
      currency,
      value: fallbackValue,
      contentName: planInterest,
      leadSource: `${clickSource}_direct`,
    });
    setOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedCity = city.trim();

    if (trimmedName.length < 2) {
      setErrorMsg("Mohon isi nama panggilan atau nama usaha AC Anda.");
      return;
    }
    const digitCount = trimmedPhone.replace(/\D/g, "").length;
    if (digitCount < 8) {
      setErrorMsg("Mohon isi nomor WhatsApp aktif (minimal 8 digit) supaya mudah dihubungi kembali.");
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          fullName: trimmedName,
          phone: trimmedPhone,
          city: trimmedCity,
          planInterest,
        })
      );
    } catch {
      // Abaikan bila storage penuh
    }

    const currency = "IDR";
    const matchedOption = planOptions.find((opt) => opt.label === planInterest);
    const value = matchedOption ? matchedOption.value : 1500000;
    const eventId = generateEventId();

    // 1. Kirim Lead ke Meta Pixel + Server CAPI dengan event_id identik + PII ter-hash (EMQ tinggi)
    void trackMetaConversion("Lead", {
      eventId,
      currency,
      value,
      contentName: planInterest,
      leadSource: clickSource,
      userData: {
        fullName: trimmedName,
        phone: trimmedPhone,
        city: trimmedCity,
        countryCode: "id",
      },
    });

    // 2. Kirim event generate_lead ke Google Analytics 4
    trackGaEvent("generate_lead", {
      currency,
      value,
      lead_source: clickSource,
      plan_interest: planInterest,
      city: trimmedCity || "unspecified",
      language: "id",
    });

    // 3. Susun pesan WhatsApp yang rapi
    const messageLines = [
      "Halo Mas Nanang, saya mau diskusi pembuatan website usaha service AC:",
      "",
      `Nama / Usaha: ${trimmedName}`,
      `No. WA Aktif: ${trimmedPhone}`,
      ...(trimmedCity ? [`Area Layanan: ${trimmedCity}`] : []),
      `Pilihan Paket: ${planInterest}`,
      "",
      "Mohon info langkah selanjutnya ya Mas. Terima kasih!",
    ];

    const finalWaUrl = `${BUSINESS.whatsapp.url}?text=${encodeURIComponent(
      messageLines.join("\n")
    )}`;

    setOpen(false);
    window.open(finalWaUrl, "_blank", "noopener,noreferrer");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      {/* Latar gelap blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-accent/35 bg-surface p-6 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.9)] sm:p-7"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
              <WhatsAppIcon className="h-3 w-3" />
              Konsultasi Langsung
            </span>
            <h2
              id="lead-modal-title"
              className="mt-3 font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
            >
              Kenalan Singkat Sebelum ke WhatsApp
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup jendela"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-accent/50 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="relative mt-2 text-xs leading-relaxed text-mist sm:text-sm">
          Isi 10 detik supaya pesan chat Anda otomatis rapi dan saya bisa langsung menyiapkan saran sesuai area kerja usaha AC Anda.
        </p>

        <form onSubmit={handleSubmit} className="relative mt-5 space-y-4" noValidate>
          <div>
            <label
              htmlFor="lead-name"
              className="block text-xs font-semibold uppercase tracking-[0.15em] text-white/90"
            >
              Nama Anda / Nama Usaha AC *
            </label>
            <input
              id="lead-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              data-autofocus
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="Contoh: Pak Budi / Berkah Jaya AC"
              className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:border-accent focus:outline-none"
            />
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="lead-phone"
                className="block text-xs font-semibold uppercase tracking-[0.15em] text-white/90"
              >
                Nomor WhatsApp *
              </label>
              <input
                id="lead-phone"
                name="tel"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="0812xxxx"
                className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="lead-city"
                className="block text-xs font-semibold uppercase tracking-[0.15em] text-white/90"
              >
                Kota / Area Kerja
              </label>
              <input
                id="lead-city"
                name="address-level2"
                type="text"
                autoComplete="address-level2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Contoh: Bekasi / Sidoarjo"
                className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lead-plan"
              className="block text-xs font-semibold uppercase tracking-[0.15em] text-white/90"
            >
              Paket yang Diminati
            </label>
            <select
              id="lead-plan"
              name="plan"
              value={planInterest}
              onChange={(e) => setPlanInterest(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
            >
              {planOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {errorMsg && (
            <p role="alert" className="rounded-xl border border-red-400/35 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-200">
              {errorMsg}
            </p>
          )}

          <button type="submit" className="btn-primary w-full justify-center py-3.5 text-sm">
            <WhatsAppIcon className="h-4 w-4" />
            Lanjut Chat ke WhatsApp
          </button>

          <div className="flex items-center justify-between gap-2 pt-1 text-xs text-mist">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {"Data aman & bebas spam"}
            </span>

            {targetHref && (
              <a
                href={targetHref}
                target="_blank"
                rel="noopener noreferrer"
                data-bypass-lead-modal="true"
                onClick={handleDirectBypass}
                className="inline-flex items-center gap-1 font-medium text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent"
              >
                Langsung ke WA
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
