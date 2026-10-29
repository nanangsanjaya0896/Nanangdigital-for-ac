/**
 * Worker untuk hosting di Cloudflare Workers (tampilan bawaan dashboard Cloudflare sekarang).
 *
 * - Beranda (`/`) dikirim langsung dari Worker ini. HTML-nya dibuat saat build oleh
 *   `scripts/prerender.mjs` (file `halaman-utama.generated.js`, isinya sama persis dengan
 *   `dist/index.html`). Kode Worker sudah tersebar di semua lokasi Cloudflare sejak deploy, jadi
 *   beranda selalu cepat di mana pun, termasuk di lokasi yang belum pernah menyimpan halaman di cache.
 * - Halaman lain, gambar, JS, dan CSS di `dist/` disajikan langsung oleh Cloudflare sebagai
 *   static assets (gratis tanpa batas, tidak memanggil Worker ini).
 * - Alamat `/api/*` menjalankan logika API (`worker/api.js`), lihat `run_worker_first` di `wrangler.jsonc`.
 *
 * Token rahasia (`META_CAPI_ACCESS_TOKEN`, `GEMINI_API_KEY`) dibaca dari Settings > Variables and
 * Secrets di dashboard Worker (`env`), tidak pernah dikirim ke browser.
 */
import { handleApi } from "./api.js";
import { HOME_ETAG, HOME_HTML } from "./halaman-utama.generated.js";

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
    const { pathname } = new URL(request.url);

    if (pathname === "/api" || pathname.startsWith("/api/")) {
      return handleApi(request, env, ctx);
    }

    if (pathname === "/" && HOME_HTML && (request.method === "GET" || request.method === "HEAD")) {
      return homeResponse(request);
    }

    // Selain itu (misalnya beranda dengan metode lain): serahkan ke static assets
    return env.ASSETS.fetch(request);
  },
};
