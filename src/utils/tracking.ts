/**
 * Utilitas pelacakan konversi terpusat NanangDigital:
 * 1. Google Analytics 4 (`G-JY9N81NCQE`)
 * 2. Meta Pixel Browser + Server Conversions API (`2971268586402489`) dengan deduplikasi `event_id` identik
 * 3. Penyimpanan `fbclid` -> cookie `_fbc` & pembacaan `_fbp` untuk Event Match Quality (EMQ) tinggi
 */

export const GA4_MEASUREMENT_ID = "G-JY9N81NCQE";
export const META_PIXEL_ID = "2971268586402489";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: unknown;
  }
}

export interface LeadUserData {
  fullName?: string;
  phone?: string;
  city?: string;
  email?: string;
  /** Kode negara ISO 2 huruf huruf kecil bila diketahui pasti (contoh: 'id') */
  countryCode?: string;
}

export interface TrackEventOptions {
  eventId?: string;
  currency?: string;
  value?: number;
  contentName?: string;
  leadSource?: string;
  userData?: LeadUserData;
  extraParams?: Record<string, string | number | boolean>;
}

/** Buat UUID unik untuk deduplikasi 1:1 antara Meta Pixel Browser dan Server CAPI */
export function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `nd-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string, days = 90): void {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * Tangkap parameter URL `?fbclid=...` sejak pendaratan pertama dan simpan ke cookie `_fbc`
 * sesuai format resmi Meta: `fb.1.<timestamp_ms>.<fbclid>` (tanpa mengubah huruf besar/kecil fbclid).
 */
export function captureFbClickId(): { fbc?: string; fbp?: string } {
  if (typeof window === "undefined") return {};

  let fbc = getCookie("_fbc");
  const fbp = getCookie("_fbp");

  try {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");
    if (fbclid) {
      fbc = `fb.1.${Date.now()}.${fbclid}`;
      setCookie("_fbc", fbc, 90);
    }
  } catch {
    // Abaikan bila URLSearchParams gagal
  }

  return { fbc, fbp };
}

/** SHA-256 hex lowercase untuk hashing PII sebelum keluar dari browser (dan diverifikasi ulang di server) */
export async function sha256Hex(input: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const encoded = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest("SHA-256", encoded);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return "";
}

/**
 * Normalisasi nomor WhatsApp/telepon ke format digit E.164 murni:
 * - `0859...` / `859...` -> `62859...`
 * - Nomor yang diawali `+` (kode negara lain) dipertahankan apa adanya.
 */
export function normalizePhoneForCapi(rawPhone: string): string {
  const hasExplicitPlus = rawPhone.trim().startsWith("+");
  let digits = rawPhone.replace(/\D/g, "");
  if (!digits) return "";

  if (!hasExplicitPlus) {
    if (digits.startsWith("0")) {
      digits = `62${digits.slice(1)}`;
    } else if (digits.startsWith("8")) {
      digits = `62${digits}`;
    }
  }

  return digits;
}

/** Normalisasi nama depan & nama belakang sesuai aturan Meta CAPI (lowercase, tanpa spasi berlebih) */
export function splitNormalizedName(fullName: string): { fn?: string; ln?: string } {
  const cleaned = fullName.trim().toLowerCase().replace(/\s+/g, " ");
  if (!cleaned) return {};
  const parts = cleaned.split(" ");
  const fn = parts[0]?.replace(/[^a-z]/g, "") || undefined;
  const ln =
    parts.length > 1
      ? parts.slice(1).join("").replace(/[^a-z]/g, "") || undefined
      : undefined;
  return { fn, ln };
}

/** Normalisasi nama kota sesuai aturan Meta CAPI (`lowercase`, hanya huruf `a-z` tanpa spasi) */
export function normalizeCityForCapi(rawCity: string): string {
  return rawCity.trim().toLowerCase().replace(/[^a-z]/g, "");
}

/** Kirim event ke Google Analytics 4 */
export function trackGaEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/**
 * Kirim event konversi Meta secara sinkron antara:
 * 1) Browser Meta Pixel (`fbq('track', eventName, customData, { eventID })`)
 * 2) Fungsi server `/api/meta-capi` (Cloudflare Pages Functions / Vercel) dengan `event_id` yang SAMA PERSIS untuk deduplikasi
 */
export async function trackMetaConversion(
  eventName: "Contact" | "Lead" | "ViewContent",
  options: TrackEventOptions = {}
): Promise<string> {
  const eventId = options.eventId || generateEventId();
  const currency = options.currency || "IDR";
  const value = options.value ?? 1500000;
  const { fbc, fbp } = captureFbClickId();

  const customData: Record<string, unknown> = {
    currency,
    value,
  };
  if (options.contentName) {
    customData.content_name = options.contentName;
  }
  if (options.leadSource) {
    customData.lead_source = options.leadSource;
  }
  if (options.extraParams) {
    Object.assign(customData, options.extraParams);
  }

  // 1. Browser Meta Pixel (dengan eventID untuk deduplikasi Meta)
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, customData, { eventID: eventId });
  }

  // 2. Hash PII di sisi klien sebelum dikirim ke endpoint Serverless CAPI
  const hashedUserData: Record<string, string> = {};
  const ud = options.userData;
  if (ud?.phone) {
    const normPhone = normalizePhoneForCapi(ud.phone);
    if (normPhone) {
      const hashed = await sha256Hex(normPhone);
      if (hashed) hashedUserData.ph = hashed;
    }
  }
  if (ud?.fullName) {
    const { fn, ln } = splitNormalizedName(ud.fullName);
    if (fn) {
      const hFn = await sha256Hex(fn);
      if (hFn) hashedUserData.fn = hFn;
    }
    if (ln) {
      const hLn = await sha256Hex(ln);
      if (hLn) hashedUserData.ln = hLn;
    }
  }
  if (ud?.city) {
    const normCity = normalizeCityForCapi(ud.city);
    if (normCity) {
      const hCt = await sha256Hex(normCity);
      if (hCt) hashedUserData.ct = hCt;
    }
  }
  if (ud?.email) {
    const normEmail = ud.email.trim().toLowerCase();
    if (normEmail) {
      const hEm = await sha256Hex(normEmail);
      if (hEm) hashedUserData.em = hEm;
    }
  }
  if (ud?.countryCode) {
    const hCountry = await sha256Hex(ud.countryCode.trim().toLowerCase());
    if (hCountry) hashedUserData.country = hCountry;
  }

  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: typeof window !== "undefined" ? window.location.href : "",
    user_data: {
      ...hashedUserData,
      ...(fbc ? { fbc } : {}),
      ...(fbp ? { fbp } : {}),
    },
    custom_data: customData,
  };

  // Kirim via keepalive fetch agar tetap terkirim walaupun pengguna berpindah ke aplikasi WhatsApp
  if (typeof window !== "undefined" && typeof fetch === "function") {
    const body = JSON.stringify(payload);
    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Abaikan kegagalan jaringan di browser agar UX pengguna tidak pernah terganggu
    });
  }

  return eventId;
}
