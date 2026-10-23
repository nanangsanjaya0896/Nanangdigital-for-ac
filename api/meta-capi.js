import { createHash } from "node:crypto";

const GRAPH_API_VERSION = "v21.0";
export const DEFAULT_META_DATASET_ID = "2971268586402489";
const ALLOWED_EVENTS = new Set(["PageView", "Lead", "Contact", "ViewContent"]);

/**
 * Hash string menggunakan SHA-256 sesuai standar resmi Meta Conversions API.
 * @param {string} value
 */
function sha256(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
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

/**
 * Cek status kesiapan endpoint CAPI tanpa pernah membocorkan isi token rahasia.
 * @param {Record<string, string | undefined>} [env]
 */
export function getMetaCapiHealth(env = process.env) {
  const datasetId = (
    env.META_PIXEL_ID ||
    env.VITE_META_PIXEL_ID ||
    DEFAULT_META_DATASET_ID
  ).trim();
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
 * Olah dan kirim event konversi ke Meta Graph API (dipakai oleh Vercel Serverless & Vite Dev Server).
 * @param {{
 *   body: Record<string, any>;
 *   clientIp?: string;
 *   userAgent?: string;
 *   env?: Record<string, string | undefined>;
 * }} params
 */
export async function processMetaCapiEvent({ body, clientIp = "", userAgent = "", env = process.env }) {
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

  /** @type {Record<string, any>} */
  const userData = {
    country: [sha256("id")],
  };

  if (normalizedPhone.length >= 9) {
    const hashedPhone = sha256(normalizedPhone);
    userData.ph = [hashedPhone];
    userData.external_id = [hashedPhone];
  }
  if (firstName) {
    userData.fn = [sha256(firstName)];
  }
  if (lastName) {
    userData.ln = [sha256(lastName)];
  }
  if (normalizedCity) {
    userData.ct = [sha256(normalizedCity)];
  }
  if (clientIp) {
    userData.client_ip_address = clientIp;
  }
  if (userAgent) {
    userData.client_user_agent = userAgent;
  }
  if (body?.fbc && typeof body.fbc === "string") {
    userData.fbc = body.fbc.trim();
  }
  if (body?.fbp && typeof body.fbp === "string") {
    userData.fbp = body.fbp.trim();
  }

  const eventPayload = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    event_source_url: String(body?.event_source_url || ""),
    user_data: userData,
    custom_data: body?.custom_data && typeof body.custom_data === "object" ? body.custom_data : undefined,
  };

  const datasetId = (
    env.META_PIXEL_ID ||
    env.VITE_META_PIXEL_ID ||
    DEFAULT_META_DATASET_ID
  ).trim();
  const accessToken = (env.META_CAPI_ACCESS_TOKEN || "").trim();
  const testEventCode = (env.META_TEST_EVENT_CODE || "").trim();

  /** @type {Record<string, any>} */
  const graphBody = {
    data: [eventPayload],
  };
  if (testEventCode) {
    graphBody.test_event_code = testEventCode;
  }

  // Mode simulasi aman bila token CAPI belum diisi di Environment Variables Vercel
  if (!datasetId || !accessToken) {
    return {
      status: 200,
      payload: {
        ok: true,
        dry_run: true,
        dataset_id: datasetId,
        message: "META_CAPI_ACCESS_TOKEN belum diisi di Vercel, event divalidasi lokal.",
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

/**
 * Handler resmi Vercel Serverless Function (/api/meta-capi).
 */
export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(getMetaCapiHealth(process.env));
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const forwarded = req.headers["x-forwarded-for"];
  const rawIp = Array.isArray(forwarded)
    ? forwarded[0]
    : typeof forwarded === "string"
      ? forwarded.split(",")[0]
      : req.headers["x-real-ip"] || req.socket?.remoteAddress || "";

  let parsedBody = req.body;
  if (typeof parsedBody === "string") {
    try {
      parsedBody = JSON.parse(parsedBody);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid JSON body" });
    }
  }

  const outcome = await processMetaCapiEvent({
    body: parsedBody || {},
    clientIp: String(rawIp || "").trim(),
    userAgent: String(req.headers["user-agent"] || ""),
    env: process.env,
  });

  return res.status(outcome.status).json(outcome.payload);
}
