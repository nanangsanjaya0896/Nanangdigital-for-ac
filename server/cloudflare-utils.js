/**
 * Utilitas kecil untuk Cloudflare Workers (`worker/index.js`) dan Pages Functions (`functions/api/*.js`).
 * Hanya memakai Web API standar (Request, Response, Headers).
 */

const MAX_BODY_CHARS = 64_000;

/**
 * @param {unknown} payload
 * @param {number} [status]
 * @param {Record<string, string>} [headers]
 */
export function jsonResponse(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

/**
 * Ubah Headers menjadi objek biasa dengan nama header huruf kecil (format yang dipakai logika inti).
 * @param {Headers} headers
 */
export function headersToObject(headers) {
  /** @type {Record<string, string>} */
  const result = {};
  headers.forEach((value, key) => {
    result[key.toLowerCase()] = value;
  });
  return result;
}

/**
 * Kode negara ISO pengunjung dari jaringan Cloudflare (contoh: "ID", "US", "GB").
 * @param {Request & { cf?: { country?: string } }} request
 */
export function getVisitorCountry(request) {
  return String((request.cf && request.cf.country) || request.headers.get("cf-ipcountry") || "")
    .trim()
    .toUpperCase();
}

/**
 * IP asli pengunjung yang diteruskan Cloudflare.
 * @param {Request} request
 */
export function getVisitorIp(request) {
  const forwarded = (request.headers.get("x-forwarded-for") || "").split(",")[0];
  return String(request.headers.get("cf-connecting-ip") || forwarded || "").trim();
}

/**
 * Baca body JSON dengan batas ukuran supaya endpoint tidak bisa dibebani kiriman raksasa.
 * @param {Request} request
 * @returns {Promise<{ ok: true; body: Record<string, any> } | { ok: false; status: number; error: string }>}
 */
export async function readJsonBody(request) {
  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (declaredLength > MAX_BODY_CHARS) {
    return { ok: false, status: 413, error: "Payload too large" };
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return { ok: false, status: 400, error: "Invalid body" };
  }
  if (raw.length > MAX_BODY_CHARS) {
    return { ok: false, status: 413, error: "Payload too large" };
  }
  if (!raw.trim()) {
    return { ok: true, body: {} };
  }

  try {
    const parsed = JSON.parse(raw);
    return { ok: true, body: parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {} };
  } catch {
    return { ok: false, status: 400, error: "Invalid JSON body" };
  }
}
