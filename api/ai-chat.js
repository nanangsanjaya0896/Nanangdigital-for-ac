/**
 * Adapter Vercel Serverless Function untuk `/api/ai-chat` (hosting alternatif).
 * Hosting utama memakai Cloudflare Pages Functions di `functions/api/ai-chat.js`.
 * Semua logika chat ada di `server/ai-chat-core.js`.
 */
import { getAiChatHealth, isAllowedOrigin, processAiChatRequest } from "../server/ai-chat-core.js";

export * from "../server/ai-chat-core.js";

/** @param {Record<string, string | string[] | undefined>} headers */
function readHeader(headers, name) {
  const value = headers[name];
  return Array.isArray(value) ? value[0] || "" : String(value || "");
}

/**
 * Handler resmi Vercel Serverless Function (/api/ai-chat).
 */
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const countryCode = readHeader(req.headers, "x-vercel-ip-country");

  if (req.method === "GET") {
    return res.status(200).json(getAiChatHealth(process.env, countryCode, "vercel"));
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  if (!isAllowedOrigin(req.headers, process.env)) {
    return res.status(403).json({ ok: false, error: "Origin not allowed" });
  }

  let parsedBody = req.body;
  if (typeof parsedBody === "string") {
    try {
      parsedBody = JSON.parse(parsedBody);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid JSON body" });
    }
  }

  const forwarded = readHeader(req.headers, "x-forwarded-for");
  const clientIp = (forwarded.split(",")[0] || readHeader(req.headers, "x-real-ip") || req.socket?.remoteAddress || "").trim();

  const outcome = await processAiChatRequest({
    body: parsedBody && typeof parsedBody === "object" ? parsedBody : {},
    clientKey: clientIp,
    countryCode,
    env: process.env,
  });

  return res.status(outcome.status).json(outcome.payload);
}
