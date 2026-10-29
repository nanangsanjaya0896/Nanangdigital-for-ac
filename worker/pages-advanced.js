/**
 * Worker "advanced mode" untuk Cloudflare Pages yang di-deploy lewat upload manual (drag and drop).
 *
 * Upload manual di dashboard Cloudflare tidak bisa membawa folder `functions/`, tetapi bisa membawa
 * satu file `_worker.js`. File ini dibundel menjadi `_worker.js` oleh
 * `scripts/package-direct-upload.mjs` (perintah `npm run build:upload`).
 *
 * - `/api/ai-chat` dan `/api/meta-capi`: logika yang sama dengan `worker/index.js` (`worker/api.js`).
 * - Alamat lain: halaman dan file statis dari Cloudflare Pages (`env.ASSETS`). Berkat `_routes.json`,
 *   halaman biasa bahkan tidak melewati Worker ini, jadi tetap gratis tanpa batas.
 */
import { handleApi } from "./api.js";

export default {
  /**
   * @param {Request} request
   * @param {{ ASSETS: { fetch: (request: Request) => Promise<Response> } } & Record<string, any>} env
   * @param {{ waitUntil: (promise: Promise<unknown>) => void }} ctx
   */
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api" || pathname.startsWith("/api/")) {
      return handleApi(request, env, ctx);
    }
    return env.ASSETS.fetch(request);
  },
};
