/**
 * Cloudflare Pages Function untuk `/api/ai-chat` (hosting utama).
 *
 * Logika chat ada di `server/ai-chat-core.js`, dipakai bersama oleh Vercel (`api/ai-chat.js`)
 * dan Vite Dev Server. API key dibaca dari Settings > Variables and Secrets di dashboard
 * Cloudflare Pages (`context.env`), tidak pernah dikirim ke browser.
 */
import { getAiChatHealth, isAllowedOrigin, processAiChatRequest } from "../../server/ai-chat-core.js";
import {
  getVisitorCountry,
  getVisitorIp,
  headersToObject,
  jsonResponse,
  readJsonBody,
} from "../../server/cloudflare-utils.js";

/**
 * @param {{ request: Request; env: Record<string, string | undefined> }} context
 */
export async function onRequest({ request, env }) {
  const countryCode = getVisitorCountry(request);

  if (request.method === "GET") {
    return jsonResponse(getAiChatHealth(env, countryCode, "cloudflare"));
  }

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method Not Allowed" }, 405, { Allow: "GET, POST" });
  }

  if (!isAllowedOrigin(headersToObject(request.headers), env)) {
    return jsonResponse({ ok: false, error: "Origin not allowed" }, 403);
  }

  const parsed = await readJsonBody(request);
  if (!parsed.ok) {
    return jsonResponse({ ok: false, error: parsed.error }, parsed.status);
  }

  const outcome = await processAiChatRequest({
    body: parsed.body,
    clientKey: getVisitorIp(request),
    countryCode,
    env,
  });

  return jsonResponse(outcome.payload, outcome.status);
}
