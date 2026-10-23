/// <reference types="vite/client" />

/**
 * Sistem Tracking Terpadu LP NanangDigital:
 * Duet Meta Pixel (Browser) + Meta Conversions API / CAPI (/api/meta-capi)
 * dengan Deduplication otomatis berbasis event_id kembar + Advanced Matching.
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    gtag?: (...args: unknown[]) => void;
  }
}

export interface LeadUserDetails {
  name: string;
  phone: string;
  city: string;
}

export interface SubmitPreWaLeadParams {
  source: string;
  topicLabel: string;
  user: LeadUserDetails;
  destination: string;
}

const STORAGE_FBC_KEY = "nd_meta_fbc";
const STORAGE_FBP_KEY = "nd_meta_fbp";

let initialized = false;

/** Buat event_id unik untuk pencocokan (deduplication) Browser Pixel <-> Server CAPI. */
export function createEventId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function writeFirstPartyCookie(name: string, value: string, days = 90): void {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/** Normalisasi nomor WA ke format 628... untuk Advanced Matching Meta Pixel. */
export function normalizeWaPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

/**
 * Tangkap dan simpan parameter klik iklan ?fbclid= sejak detik pertama landing
 * agar tetap terselamatkan ke CAPI walau browser pengguna memakai AdBlocker.
 */
function captureClickIdentifiers(): { fbc: string; fbp: string } {
  if (typeof window === "undefined") return { fbc: "", fbp: "" };

  let fbc = readCookie("_fbc");
  try {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");
    // PENTING: fbclid bersifat case-sensitive, jangan pernah di-lowercase!
    if (fbclid && fbclid.trim().length > 0) {
      fbc = `fb.1.${Date.now()}.${fbclid.trim()}`;
      writeFirstPartyCookie("_fbc", fbc);
      localStorage.setItem(STORAGE_FBC_KEY, fbc);
    } else if (!fbc) {
      fbc = localStorage.getItem(STORAGE_FBC_KEY) || "";
    } else {
      localStorage.setItem(STORAGE_FBC_KEY, fbc);
    }
  } catch {
    // Abaikan bila mode privat memblokir storage
  }

  let fbp = readCookie("_fbp");
  try {
    if (!fbp) {
      fbp = localStorage.getItem(STORAGE_FBP_KEY) || "";
    }
    if (!fbp) {
      const randomPart = Math.floor(1_000_000_000 + Math.random() * 9_000_000_000);
      fbp = `fb.1.${Date.now()}.${randomPart}`;
      writeFirstPartyCookie("_fbp", fbp);
    }
    localStorage.setItem(STORAGE_FBP_KEY, fbp);
  } catch {
    // Abaikan bila storage dibatasi
  }

  return { fbc, fbp };
}

/** Kirim event ke endpoint server CAPI (/api/meta-capi) tanpa menahan pembukaan aplikasi WhatsApp. */
function sendServerCapiEvent(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  const body = JSON.stringify(payload);
  try {
    void fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Jangan pernah mengganggu alur pengguna bila koneksi lambat
    });
  } catch {
    // Fallback sendBeacon untuk browser seluler lama
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/meta-capi", blob);
    }
  }
}

/** Inisialisasi Meta Pixel + PageView CAPI (ter-deduplikasi lewat event_id kembar). */
export function initMarketingTracking(): void {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  const { fbc, fbp } = captureClickIdentifiers();

  const startThirdPartyScripts = () => {
    const metaPixelId = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim();
    const pageViewEventId = createEventId("pv");

    if (metaPixelId && !window.fbq) {
      const n: (...args: unknown[]) => void = function (...args: unknown[]) {
        // @ts-expect-error properti internal snippet resmi Meta Pixel
        if (n.callMethod) n.callMethod(...args);
        // @ts-expect-error properti internal snippet resmi Meta Pixel
        else n.queue.push(args);
      };
      // @ts-expect-error properti internal snippet resmi Meta Pixel
      n.push = n;
      // @ts-expect-error properti internal snippet resmi Meta Pixel
      n.loaded = true;
      // @ts-expect-error properti internal snippet resmi Meta Pixel
      n.version = "2.0";
      // @ts-expect-error properti internal snippet resmi Meta Pixel
      n.queue = [];
      window.fbq = n;
      window._fbq = n;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      window.fbq("init", metaPixelId);
      window.fbq("track", "PageView", {}, { eventID: pageViewEventId });
    }

    // Kirim PageView pasangan ke CAPI dengan event_id yang persis sama
    sendServerCapiEvent({
      event_name: "PageView",
      event_id: pageViewEventId,
      event_source_url: window.location.href,
      fbc,
      fbp,
    });

    const gaMeasurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim();
    if (gaMeasurementId && !window.gtag) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`;
      document.head.appendChild(script);

      window.gtag = function (...args: unknown[]) {
        window.dataLayer?.push(args as unknown as Record<string, unknown>);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaMeasurementId);
    }
  };

  // Tunda muatan script pihak ketiga sampai browser selesai merender tampilan awal agar skor PageSpeed maksimal
  const scheduleIdle = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => startThirdPartyScripts(), { timeout: 2000 });
    } else {
      globalThis.setTimeout(startThirdPartyScripts, 1200);
    }
  };

  if (document.readyState === "complete") {
    scheduleIdle();
  } else {
    window.addEventListener("load", scheduleIdle, { once: true });
  }
}

/** Catat interaksi pembukaan form pra-WA di GTM dataLayer (tanpa menghitungnya sebagai Lead palsu). */
export function trackPreWaModalOpened(source: string, topicLabel: string): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_modal_opened",
    cta_source: source,
    cta_topic: topicLabel,
  });
}

/**
 * Konversi Utama (Lead): dipanggil HANYA setelah calon klien mengisi Nama, No. WA, & Kota
 * lalu menekan tombol lanjut ke WhatsApp.
 *
 * Mengirim event "Lead" serentak melalui:
 * 1) Browser Meta Pixel + Advanced Matching
 * 2) Server Meta CAPI (/api/meta-capi) dengan SHA-256 hashing + event_id kembar (Deduplicated)
 * 3) Google Tag Manager dataLayer & GA4
 */
export function trackPreWaLeadSubmitted({
  source,
  topicLabel,
  user,
  destination,
}: SubmitPreWaLeadParams): string {
  const leadEventId = createEventId("lead");
  if (typeof window === "undefined") return leadEventId;

  const { fbc, fbp } = captureClickIdentifiers();
  const normalizedPhone = normalizeWaPhone(user.phone);
  const nameParts = user.name.trim().toLowerCase().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");
  const cleanCity = user.city.trim().toLowerCase().replace(/[^a-z]/g, "");

  const customData = {
    content_name: topicLabel,
    content_category: "Website Service AC Consultation",
    lead_source: source,
  };

  const metaPixelId = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim();
  if (typeof window.fbq === "function") {
    if (metaPixelId) {
      // Perbarui Advanced Matching di sisi browser agar EMQ makin tinggi
      window.fbq("init", metaPixelId, {
        ph: normalizedPhone,
        fn: firstName,
        ln: lastName || undefined,
        ct: cleanCity || undefined,
        country: "id",
      });
    }
    window.fbq("track", "Lead", customData, { eventID: leadEventId });
  }

  // Kirim pasangan event Server CAPI memakai event_id kembar
  sendServerCapiEvent({
    event_name: "Lead",
    event_id: leadEventId,
    event_source_url: window.location.href,
    fbc,
    fbp,
    user: {
      name: user.name,
      phone: user.phone,
      city: user.city,
    },
    custom_data: customData,
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_lead_submitted",
    event_id: leadEventId,
    cta_source: source,
    cta_topic: topicLabel,
    cta_destination: destination,
    lead_city: user.city.trim(),
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "whatsapp_pre_form",
      event_label: `${source}:${topicLabel}`,
    });
  }

  return leadEventId;
}
