/**
 * Cloudflare Pages Function untuk `/api/meta-capi` (hosting utama).
 *
 * Logika CAPI ada di `server/meta-capi-core.js`, dipakai bersama oleh Vercel (`api/meta-capi.js`)
 * dan Vite Dev Server. Token `META_CAPI_ACCESS_TOKEN` dibaca dari Settings > Variables and Secrets
 * di dashboard Cloudflare Pages (`context.env`), tidak pernah dikirim ke browser.
 */
import { getMetaCapiHealth, processMetaCapiEvent } from "../../server/meta-capi-core.js";
import { getVisitorCountry, getVisitorIp, jsonResponse, readJsonBody } from "../../server/cloudflare-utils.js";

/**
 * @param {{ request: Request; env: Record<string, string | undefined> }} context
 */
export async function onRequest({ request, env }) {
  if (request.method === "GET") {
    return jsonResponse(getMetaCapiHealth(env));
  }

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method Not Allowed" }, 405, { Allow: "GET, POST" });
  }

  const parsed = await readJsonBody(request);
  if (!parsed.ok) {
    return jsonResponse({ ok: false, error: parsed.error }, parsed.status);
  }

  const outcome = await processMetaCapiEvent({
    body: parsed.body,
    clientIp: getVisitorIp(request),
    userAgent: request.headers.get("user-agent") || "",
    countryCode: getVisitorCountry(request),
    env,
  });

  return jsonResponse(outcome.payload, outcome.status);
}
