/**
 * Adapter Vercel Serverless Function untuk `/api/meta-capi` (hosting alternatif).
 * Hosting utama memakai Cloudflare Pages Functions di `functions/api/meta-capi.js`.
 * Semua logika CAPI ada di `server/meta-capi-core.js`.
 */
import { getMetaCapiHealth, processMetaCapiEvent } from "../server/meta-capi-core.js";

export * from "../server/meta-capi-core.js";

/** @param {Record<string, string | string[] | undefined>} headers */
function readHeader(headers, name) {
  const value = headers[name];
  return Array.isArray(value) ? value[0] || "" : String(value || "");
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

  const forwarded = readHeader(req.headers, "x-forwarded-for");
  const rawIp = forwarded.split(",")[0] || readHeader(req.headers, "x-real-ip") || req.socket?.remoteAddress || "";

  let parsedBody = req.body;
  if (typeof parsedBody === "string") {
    try {
      parsedBody = JSON.parse(parsedBody);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid JSON body" });
    }
  }

  const outcome = await processMetaCapiEvent({
    body: parsedBody && typeof parsedBody === "object" ? parsedBody : {},
    clientIp: String(rawIp || "").trim(),
    userAgent: readHeader(req.headers, "user-agent"),
    countryCode: readHeader(req.headers, "x-vercel-ip-country"),
    env: process.env,
  });

  return res.status(outcome.status).json(outcome.payload);
}
