/**
 * Logika inti Meta Conversions API (`/api/meta-capi`), tanpa ketergantungan ke hosting tertentu.
 *
 * Dipakai bersama oleh:
 * - Cloudflare Pages Functions: `functions/api/meta-capi.js` (hosting utama)
 * - Vercel Serverless Function: `api/meta-capi.js` (alternatif)
 * - Vite Dev Server: `vite.config.ts` (Live Preview lokal)
 *
 * Hashing SHA-256 memakai Web Crypto (`crypto.subtle`) yang tersedia di Cloudflare Workers
 * maupun Node.js 20+, jadi tidak perlu flag `nodejs_compat` di Cloudflare.
 */

const GRAPH_API_VERSION = "v21.0";
export const DEFAULT_META_DATASET_ID = "2971268586402489";
const ALLOWED_EVENTS = new Set(["PageView", "Lead", "Contact", "ViewContent"]);

// Field user_data Meta yang wajib berbentuk hash SHA-256 (64 karakter heksadesimal huruf kecil).
const PREHASHED_FIELDS = ["ph", "em", "fn", "ln", "ct", "country", "external_id"];
const SHA256_HEX = /^[a-f0-9]{64}$/;

const textEncoder = new TextEncoder();

/** Environment Variables Node.js kalau ada (Vercel/lokal). Di Cloudflare, env selalu dikirim adapter. */
function getProcessEnv() {
  return (typeof process !== "undefined" && process && process.env) || {};
}

/**
 * Hash string menggunakan SHA-256 sesuai standar resmi Meta Conversions API.
 * @param {string} value
 * @returns {Promise<string>}
 */
export async function sha256Hex(value) {
  const subtle = globalThis.crypto && globalThis.crypto.subtle;
  if (!subtle) {
    throw new Error("Web Crypto (crypto.subtle) tidak tersedia di runtime ini.");
  }
  const digest = await subtle.digest("SHA-256", textEncoder.encode(String(value)));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Ambil nilai hash yang valid dari browser (string atau array berisi string).
 * Nilai yang bukan hash SHA-256 dibuang supaya data pribadi mentah tidak pernah terkirim ke Meta.
 * @param {unknown} value
 */
function pickPrehashed(value) {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (typeof candidate !== "string") return "";
  const normalized = candidate.trim().toLowerCase();
  return SHA256_HEX.test(normalized) ? normalized : "";
}

/**
 * Cookie klik iklan Meta (`_fbc` / `_fbp`) dikirim apa adanya (tidak di-hash).
 * @param {unknown} value
 */
function pickClickCookie(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  return /^fb\.\d+\.\d+\.\S+$/.test(trimmed) && trimmed.length <= 512 ? trimmed : "";
}

/**
 * Normalisasi nomor WhatsApp Indonesia ke format internasional digit saja (contoh: 6281234567890).
 * @param {string | undefined} rawPhone
 */
export function normalizeIndonesianPhone(rawPhone) {
  if (!rawPhone) return "";
  const digits = String(rawPhone).replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

/** @param {Record<string, string | undefined>} env */
function resolveDatasetId(env) {
  return (env.META_PIXEL_ID || env.VITE_META_PIXEL_ID || DEFAULT_META_DATASET_ID).trim();
}

/**
 * Cek status kesiapan endpoint CAPI tanpa pernah membocorkan isi token rahasia.
 * @param {Record<string, string | undefined>} [env]
 */
export function getMetaCapiHealth(env = getProcessEnv()) {
  const datasetId = resolveDatasetId(env);
  const tokenConfigured = Boolean((env.META_CAPI_ACCESS_TOKEN || "").trim());
  const testModeActive = Boolean((env.META_TEST_EVENT_CODE || "").trim());

  return {
    ok: true,
    service: "NanangDigital Meta Conversions API",
    dataset_id: datasetId,
    capi_token_configured: tokenConfigured,
    test_event_mode: testModeActive,
    ready_for_live_capi: Boolean(datasetId && tokenConfigured),
  };
}

/**
 * Susun `user_data` Meta dari dua format kiriman browser:
 * 1. `user_data` yang sudah di-hash SHA-256 di browser (format website saat ini), plus `fbc`/`fbp`.
 * 2. `user` mentah (format lama: phone, name, city) yang di-hash di server.
 * Negara (`country`) diambil dari hash browser, atau dari lokasi IP yang diberikan hosting.
 * @param {{ body: Record<string, any>; clientIp: string; userAgent: string; countryCode: string }} params
 */
async function buildUserData({ body, clientIp, userAgent, countryCode }) {
  /** @type {Record<string, any>} */
  const userData = {};

  // Format lama: data mentah di-hash di server
  const rawUser = body?.user && typeof body.user === "object" ? body.user : {};
  const normalizedPhone = normalizeIndonesianPhone(rawUser.phone);
  const fullName = String(rawUser.name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
  const [firstName = "", ...restName] = fullName ? fullName.split(" ") : [];
  const lastName = restName.join(" ");
  // Aturan Meta untuk ct (city): huruf kecil a-z tanpa spasi maupun tanda baca
  const normalizedCity = String(rawUser.city || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");

  if (normalizedPhone.length >= 9) {
    userData.ph = [await sha256Hex(normalizedPhone)];
  }
  if (firstName) {
    userData.fn = [await sha256Hex(firstName)];
  }
  if (lastName) {
    userData.ln = [await sha256Hex(lastName)];
  }
  if (normalizedCity) {
    userData.ct = [await sha256Hex(normalizedCity)];
  }

  // Format website saat ini: hash SHA-256 dari browser
  const prehashed = body?.user_data && typeof body.user_data === "object" ? body.user_data : {};
  for (const field of PREHASHED_FIELDS) {
    if (userData[field]) continue;
    const hashed = pickPrehashed(prehashed[field]);
    if (hashed) userData[field] = [hashed];
  }

  if (userData.ph && !userData.external_id) {
    userData.external_id = [...userData.ph];
  }

  const geoCountry = String(countryCode || "").trim().toLowerCase();
  if (!userData.country && /^[a-z]{2}$/.test(geoCountry) && geoCountry !== "xx" && geoCountry !== "t1") {
    userData.country = [await sha256Hex(geoCountry)];
  }

  if (clientIp) {
    userData.client_ip_address = clientIp;
  }
  if (userAgent) {
    userData.client_user_agent = userAgent;
  }

  const fbc = pickClickCookie(body?.fbc) || pickClickCookie(prehashed.fbc);
  if (fbc) userData.fbc = fbc;
  const fbp = pickClickCookie(body?.fbp) || pickClickCookie(prehashed.fbp);
  if (fbp) userData.fbp = fbp;

  return userData;
}

/**
 * Olah dan kirim event konversi ke Meta Graph API.
 * @param {{
 *   body: Record<string, any>;
 *   clientIp?: string;
 *   userAgent?: string;
 *   countryCode?: string;
 *   env?: Record<string, string | undefined>;
 * }} params
 */
export async function processMetaCapiEvent({
  body,
  clientIp = "",
  userAgent = "",
  countryCode = "",
  env = getProcessEnv(),
}) {
  const eventName = String(body?.event_name || "");
  if (!ALLOWED_EVENTS.has(eventName)) {
    return {
      status: 400,
      payload: { ok: false, error: "Unsupported event_name" },
    };
  }

  const eventId = String(body?.event_id || "").trim();
  if (!eventId) {
    return {
      status: 400,
      payload: { ok: false, error: "Missing event_id for deduplication" },
    };
  }

  const userData = await buildUserData({ body, clientIp, userAgent, countryCode });

  const eventPayload = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    event_source_url: String(body?.event_source_url || ""),
    user_data: userData,
    custom_data: body?.custom_data && typeof body.custom_data === "object" ? body.custom_data : undefined,
  };

  const datasetId = resolveDatasetId(env);
  const accessToken = (env.META_CAPI_ACCESS_TOKEN || "").trim();
  const testEventCode = (env.META_TEST_EVENT_CODE || "").trim();

  /** @type {Record<string, any>} */
  const graphBody = {
    data: [eventPayload],
  };
  if (testEventCode) {
    graphBody.test_event_code = testEventCode;
  }

  // Mode simulasi aman bila token CAPI belum diisi di pengaturan hosting
  if (!datasetId || !accessToken) {
    return {
      status: 200,
      payload: {
        ok: true,
        dry_run: true,
        dataset_id: datasetId,
        message: "META_CAPI_ACCESS_TOKEN belum diisi di pengaturan hosting, event hanya divalidasi tanpa dikirim ke Meta.",
        event_name: eventName,
        deduplication_event_id: eventId,
        matched_fields: Object.keys(userData),
      },
    };
  }

  try {
    const endpoint = `https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(datasetId)}/events?access_token=${encodeURIComponent(accessToken)}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphBody),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        status: response.status,
        payload: {
          ok: false,
          error: "Meta Graph API rejected event",
          details: result,
        },
      };
    }

    return {
      status: 200,
      payload: {
        ok: true,
        dry_run: false,
        dataset_id: datasetId,
        deduplication_event_id: eventId,
        meta_response: result,
      },
    };
  } catch (err) {
    return {
      status: 502,
      payload: {
        ok: false,
        error: err instanceof Error ? err.message : "Network failure calling Meta CAPI",
      },
    };
  }
}
