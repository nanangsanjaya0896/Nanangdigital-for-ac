/**
 * Worker untuk hosting di Cloudflare Workers (tampilan bawaan dashboard Cloudflare sekarang).
 *
 * - Semua halaman, gambar, JS, dan CSS di `dist/` disajikan langsung oleh Cloudflare sebagai
 *   static assets (gratis tanpa batas, tidak memanggil Worker ini).
 * - Hanya alamat `/api/*` yang menjalankan Worker ini, lihat `run_worker_first` di `wrangler.jsonc`.
 * - Logika API memakai fungsi yang sama dengan Cloudflare Pages Functions (`functions/api/*.js`),
 *   jadi hasilnya identik di Workers maupun Pages.
 *
 * Token rahasia (`META_CAPI_ACCESS_TOKEN`, `GEMINI_API_KEY`) dibaca dari Settings > Variables and
 * Secrets di dashboard Worker (`env`), tidak pernah dikirim ke browser.
 */
import { onRequest as aiChat } from "../functions/api/ai-chat.js";
import { onRequest as metaCapi } from "../functions/api/meta-capi.js";
import { jsonResponse } from "../server/cloudflare-utils.js";

/** @type {Record<string, (context: { request: Request; env: Record<string, any>; waitUntil: (promise: Promise<unknown>) => void }) => Promise<Response>>} */
const API_ROUTES = {
  "/api/ai-chat": aiChat,
  "/api/meta-capi": metaCapi,
};

export default {
  /**
   * @param {Request} request
   * @param {Record<string, any>} env
   * @param {{ waitUntil: (promise: Promise<unknown>) => void }} ctx
   */
  async fetch(request, env, ctx) {
    const pathname = new URL(request.url).pathname.replace(/\/+$/, "");
    const handler = API_ROUTES[pathname];

    if (!handler) {
      return jsonResponse({ ok: false, error: "Not Found" }, 404);
    }

    return handler({ request, env, waitUntil: (promise) => ctx.waitUntil(promise) });
  },
};
