/**
 * Worker untuk hosting di Cloudflare Workers (tampilan bawaan dashboard Cloudflare sekarang).
 *
 * - Beranda (`/`) dikirim langsung dari Worker ini. HTML-nya dibuat saat build oleh
 *   `scripts/prerender.mjs` (file `halaman-utama.generated.js`, isinya sama persis dengan
 *   `dist/index.html`). Kode Worker sudah tersebar di semua lokasi Cloudflare sejak deploy, jadi
 *   beranda selalu cepat di mana pun, termasuk di lokasi yang belum pernah menyimpan halaman di cache.
 * - Halaman lain, gambar, JS, dan CSS di `dist/` disajikan langsung oleh Cloudflare sebagai
 *   static assets (gratis tanpa batas, tidak memanggil Worker ini).
 * - Alamat `/api/*` menjalankan logika API, lihat `run_worker_first` di `wrangler.jsonc`.
 *   Logika API memakai fungsi yang sama dengan Cloudflare Pages Functions (`functions/api/*.js`),
 *   jadi hasilnya identik di Workers maupun Pages.
 *
 * Token rahasia (`META_CAPI_ACCESS_TOKEN`, `GEMINI_API_KEY`) dibaca dari Settings > Variables and
 * Secrets di dashboard Worker (`env`), tidak pernah dikirim ke browser.
 */
import { onRequest as aiChat } from "../functions/api/ai-chat.js";
import { onRequest as metaCapi } from "../functions/api/meta-capi.js";
import { jsonResponse } from "../server/cloudflare-utils.js";
import { HOME_ETAG, HOME_HTML } from "./halaman-utama.generated.js";

/** @type {Record<string, (context: { request: Request; env: Record<string, any>; waitUntil: (promise: Promise<unknown>) => void }) => Promise<Response>>} */
const API_ROUTES = {
  "/api/ai-chat": aiChat,
  "/api/meta-capi": metaCapi,
};

/**
 * @param {Request} request
 */
function homeResponse(request) {
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    // Sama seperti static assets: browser selalu cek versi terbaru, tapi cukup balasan 304 kalau tidak berubah
    "Cache-Control": "public, max-age=0, must-revalidate",
    ETag: HOME_ETAG,
  });
  const ifNoneMatch = request.headers.get("If-None-Match") || "";
  const sameVersion = ifNoneMatch
    .split(",")
    .map((tag) => tag.trim().replace(/^W\//, ""))
    .includes(HOME_ETAG);
  if (sameVersion) {
    return new Response(null, { status: 304, headers });
  }
  return new Response(request.method === "HEAD" ? null : HOME_HTML, { status: 200, headers });
}

export default {
  /**
   * @param {Request} request
   * @param {Record<string, any>} env
   * @param {{ waitUntil: (promise: Promise<unknown>) => void }} ctx
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/" && HOME_HTML && (request.method === "GET" || request.method === "HEAD")) {
      return homeResponse(request);
    }

    const pathname = url.pathname.replace(/\/+$/, "");
    const handler = API_ROUTES[pathname];
    if (handler) {
      return handler({ request, env, waitUntil: (promise) => ctx.waitUntil(promise) });
    }

    // Selain API (misalnya beranda dengan metode lain): serahkan ke static assets
    if (env.ASSETS && !pathname.startsWith("/api")) {
      return env.ASSETS.fetch(request);
    }

    return jsonResponse({ ok: false, error: "Not Found" }, 404);
  },
};
