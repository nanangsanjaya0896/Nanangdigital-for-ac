import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Lock, MapPin, Phone, User, X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS } from "../data/business";
import {
  captureTrafficOrigin,
  normalizeWaPhone,
  trackPreWaLeadSubmitted,
} from "../utils/tracking";
import { useScrollLock } from "../hooks/useScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";

export interface PreWaModalContext {
  source: string;
  topicLabel: string;
  presetMessage: string;
}

interface PreWhatsAppModalProps {
  context: PreWaModalContext;
  onClose: () => void;
}

const LEAD_DRAFT_STORAGE_KEY = "nd_lead_profile_v1";

function loadSavedDraft(): { name: string; phone: string; city: string } {
  if (typeof window === "undefined") return { name: "", phone: "", city: "" };
  try {
    const raw = localStorage.getItem(LEAD_DRAFT_STORAGE_KEY);
    if (!raw) return { name: "", phone: "", city: "" };
    const parsed = JSON.parse(raw) as Partial<{ name: string; phone: string; city: string }>;
    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      phone: typeof parsed.phone === "string" ? parsed.phone : "",
      city: typeof parsed.city === "string" ? parsed.city : "",
    };
  } catch {
    return { name: "", phone: "", city: "" };
  }
}

export default function PreWhatsAppModal({ context, onClose }: PreWhatsAppModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const initial = loadSavedDraft();

  const [name, setName] = useState(initial.name);
  const [phone, setPhone] = useState(initial.phone);
  const [city, setCity] = useState(initial.city);
  const [errorMsg, setErrorMsg] = useState("");
  const [finalWaHref, setFinalWaHref] = useState<string | null>(null);

  useScrollLock(true);
  useFocusTrap(panelRef, true, onClose);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim();
    const normalizedPhone = normalizeWaPhone(phone);
    const cleanCity = city.trim();

    if (cleanName.length < 2) {
      setErrorMsg("Isi nama panggilan atau nama usaha AC Anda dulu ya.");
      return;
    }
    if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
      setErrorMsg("Masukkan nomor WhatsApp aktif yang benar, contoh: 081234567890.");
      return;
    }
    if (cleanCity.length < 2) {
      setErrorMsg("Isi kota atau kecamatan area kerja Anda supaya gampang dibahas.");
      return;
    }

    setErrorMsg("");

    try {
      localStorage.setItem(
        LEAD_DRAFT_STORAGE_KEY,
        JSON.stringify({ name: cleanName, phone: phone.trim(), city: cleanCity })
      );
    } catch {
      // Abaikan bila browser membatasi penyimpanan lokal
    }

    const origin = captureTrafficOrigin();
    const originLine = origin.campaign
      ? `${origin.channel} (${origin.campaign})`
      : origin.channel;

    const composedMessage = [
      context.presetMessage,
      "",
      `Nama / Usaha: ${cleanName}`,
      `Domisili / Area Kerja: ${cleanCity}`,
      `No. WhatsApp: ${phone.trim()}`,
      `Info dari: ${originLine}`,
    ].join("\n");

    const waHref = `${BUSINESS.whatsapp.url}?text=${encodeURIComponent(composedMessage)}`;

    // Kirim konversi Lead serentak ke Browser Meta Pixel + Server CAPI (event_id kembar)
    trackPreWaLeadSubmitted({
      source: context.source,
      topicLabel: context.topicLabel,
      user: {
        name: cleanName,
        phone: phone.trim(),
        city: cleanCity,
      },
      destination: waHref,
    });

    setFinalWaHref(waHref);

    // Buka WhatsApp langsung di dalam aksi klik pengguna agar tidak ditahan browser HP / IG
    window.open(waHref, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className="fixed inset-0 z-[95] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Latar gelap */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-modal-wa"
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-accent/35 bg-surface p-6 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)] sm:p-7"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/15 blur-3xl"
          />

          <div className="relative flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent">
              <WhatsAppIcon className="h-3.5 w-3.5" />
              {context.topicLabel}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup jendela"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-accent/60 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {!finalWaHref ? (
            <form onSubmit={handleSubmit} noValidate className="relative mt-5">
              <h3
                id="judul-modal-wa"
                className="font-display text-2xl font-bold tracking-tight text-white"
              >
                Kenalan Singkat Sebelum Masuk WhatsApp
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                Isi 3 baris singkat di bawah supaya begitu chat terbuka, saya langsung paham nama
                dan area kerja usaha AC Anda.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="prewa-name"
                    className="block text-xs font-semibold uppercase tracking-[0.15em] text-white/85"
                  >
                    Nama Anda / Nama Usaha AC
                  </label>
                  <div className="relative mt-1.5">
                    <User
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
                      aria-hidden="true"
                    />
                    <input
                      id="prewa-name"
                      type="text"
                      autoComplete="name"
                      data-autofocus
                      placeholder="Contoh: Budi / Berkah Jaya AC"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-line bg-ink py-3 pl-10 pr-4 text-sm text-white placeholder:text-mist/50 transition-colors focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="prewa-phone"
                    className="block text-xs font-semibold uppercase tracking-[0.15em] text-white/85"
                  >
                    Nomor WhatsApp Aktif
                  </label>
                  <div className="relative mt-1.5">
                    <Phone
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
                      aria-hidden="true"
                    />
                    <input
                      id="prewa-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Contoh: 0812-3456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-line bg-ink py-3 pl-10 pr-4 text-sm text-white placeholder:text-mist/50 transition-colors focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="prewa-city"
                    className="block text-xs font-semibold uppercase tracking-[0.15em] text-white/85"
                  >
                    Kota / Kecamatan Area Kerja
                  </label>
                  <div className="relative mt-1.5">
                    <MapPin
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
                      aria-hidden="true"
                    />
                    <input
                      id="prewa-city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Contoh: Bekasi Selatan / Tangerang"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-line bg-ink py-3 pl-10 pr-4 text-sm text-white placeholder:text-mist/50 transition-colors focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              {errorMsg && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border border-amber-400/35 bg-amber-400/10 px-3.5 py-2.5 text-xs leading-relaxed text-amber-200"
                >
                  {errorMsg}
                </p>
              )}

              <button type="submit" className="btn-primary mt-6 w-full !py-3.5 text-sm">
                <WhatsAppIcon className="h-4 w-4" />
                Lanjut Chat ke WhatsApp
              </button>

              <p className="mt-3.5 flex items-center justify-center gap-1.5 text-center text-[0.7rem] text-mist">
                <Lock className="h-3 w-3 shrink-0 text-accent" aria-hidden="true" />
                Data aman, hanya dipakai untuk membalas konsultasi Anda.
              </p>
            </form>
          ) : (
            <div className="relative mt-5 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3
                id="judul-modal-wa"
                className="mt-4 font-display text-2xl font-bold tracking-tight text-white"
              >
                Mengarahkan ke WhatsApp...
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                Kalau aplikasi WhatsApp belum terbuka otomatis di layar Anda, silakan tekan tombol
                di bawah ini.
              </p>

              <a
                href={finalWaHref}
                target="_blank"
                rel="noopener noreferrer"
                data-direct-wa="true"
                onClick={onClose}
                className="btn-primary mt-6 w-full !py-3.5 text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Buka WhatsApp Manual
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
