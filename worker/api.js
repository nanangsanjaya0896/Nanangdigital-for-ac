/**
 * Rute API bersama untuk `worker/index.js` (Cloudflare Workers) dan `worker/pages-advanced.js`
 * (Cloudflare Pages upload manual). Logika intinya sama dengan Pages Functions (`functions/api/*.js`).
 */
import { onRequest as aiChat } from "../functions/api/ai-chat.js";
import { onRequest as metaCapi } from "../functions/api/meta-capi.js";
import { jsonResponse } from "../server/cloudflare-utils.js";

/** @type {Record<string, (context: { request: Request; env: Record<string, any>; waitUntil: (promise: Promise<unknown>) => void }) => Promise<Response>>} */
const API_ROUTES = {
  "/api/ai-chat": aiChat,
  "/api/meta-capi": metaCapi,
};

/**
 * Jalankan rute API yang cocok. Alamat /api lain dibalas 404 JSON.
 * @param {Request} request
 * @param {Record<string, any>} env
 * @param {{ waitUntil: (promise: Promise<unknown>) => void }} ctx
 */
export function handleApi(request, env, ctx) {
  const pathname = new URL(request.url).pathname.replace(/\/+$/, "");
  const handler = API_ROUTES[pathname];
  if (!handler) {
    return jsonResponse({ ok: false, error: "Not Found" }, 404);
  }
  return handler({ request, env, waitUntil: (promise) => ctx.waitUntil(promise) });
}
