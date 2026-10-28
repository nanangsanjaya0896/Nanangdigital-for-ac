/**
 * Satu sumber alamat utama website (SITE_URL).
 *
 * Dipakai oleh `vite.config.ts` (tag canonical, hreflang, Open Graph, dan JSON-LD di index.html)
 * serta `scripts/prerender.mjs` (7 halaman statis, sitemap.xml, dan robots.txt), jadi alamat
 * website cukup diatur di satu tempat.
 *
 * Urutan prioritas:
 * 1. Environment Variable `SITE_URL` (atau `VITE_SITE_URL`). Hanya untuk keperluan khusus, misalnya
 *    mengetes alamat lain. Biasanya tidak perlu diisi.
 * 2. Domain utama di file ini: `PRIMARY_SITE_URL` (https://nanangdigital.web.id). Berlaku di semua
 *    hosting (Cloudflare Workers, Cloudflare Pages, Vercel), termasuk alamat preview, jadi Google
 *    selalu diarahkan ke domain utama.
 * 3. Kalau `PRIMARY_SITE_URL` dikosongkan: otomatis di Cloudflare Pages lewat `CF_PAGES_URL`
 *    (https://<hash>.<project>.pages.dev diubah menjadi https://<project>.pages.dev).
 * 4. Otomatis di Vercel: `VERCEL_PROJECT_PRODUCTION_URL`.
 * 5. Cadangan terakhir: https://nanangdigital.pages.dev
 *
 * Di Cloudflare Workers (Workers Builds) alamat website tidak dikirim otomatis ke proses build.
 * Kalau `PRIMARY_SITE_URL` dikosongkan dan `SITE_URL` belum diisi, log build menampilkan peringatan.
 */

/** Domain utama website. Ganti di sini kalau pindah domain, lalu deploy ulang. */
export const PRIMARY_SITE_URL = "https://nanangdigital.web.id";

/** Cadangan terakhir kalau domain utama dikosongkan dan hosting tidak memberi alamat. */
export const DEFAULT_SITE_URL = "https://nanangdigital.pages.dev";

/**
 * Rapikan input menjadi origin saja (tanpa path dan garis miring di akhir).
 * @param {string | undefined} raw
 */
export function normalizeSiteUrl(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(withProtocol).origin.toLowerCase();
  } catch {
    return "";
  }
}

/**
 * https://3deb2073.nanangdigital.pages.dev -> https://nanangdigital.pages.dev
 * @param {string | undefined} raw
 */
export function siteUrlFromCloudflarePagesUrl(raw) {
  const match = String(raw || "")
    .trim()
    .match(/^https?:\/\/(?:[^./]+\.)?([^./]+)\.pages\.dev\/?$/i);
  return match ? `https://${match[1].toLowerCase()}.pages.dev` : "";
}

/**
 * @param {Record<string, string | undefined>} [env]
 * @returns {{ url: string; source: string }}
 */
export function resolveSiteUrlWithSource(env = process.env) {
  const explicit = normalizeSiteUrl(env.SITE_URL || env.VITE_SITE_URL);
  if (explicit) return { url: explicit, source: env.SITE_URL ? "SITE_URL" : "VITE_SITE_URL" };

  const primary = normalizeSiteUrl(PRIMARY_SITE_URL);
  if (primary) return { url: primary, source: "domain utama di scripts/site-url.mjs" };

  const fromCloudflare = siteUrlFromCloudflarePagesUrl(env.CF_PAGES_URL);
  if (fromCloudflare) return { url: fromCloudflare, source: "Cloudflare Pages (CF_PAGES_URL)" };

  const fromVercel = normalizeSiteUrl(env.VERCEL_PROJECT_PRODUCTION_URL);
  if (fromVercel) return { url: fromVercel, source: "Vercel (VERCEL_PROJECT_PRODUCTION_URL)" };

  return { url: DEFAULT_SITE_URL, source: "bawaan" };
}

/**
 * Pesan peringatan untuk log build kalau alamat website belum diatur di Cloudflare Workers.
 * @param {Record<string, string | undefined>} [env]
 * @returns {string}
 */
export function siteUrlWarning(env = process.env) {
  const { source } = resolveSiteUrlWithSource(env);
  if (source !== "bawaan" || !env.WORKERS_CI) return "";
  return [
    "⚠ SITE_URL belum diisi. Tag SEO, sitemap.xml, dan robots.txt sementara memakai alamat bawaan.",
    "  Isi di dashboard Cloudflare: Worker > Settings > Build > Variables and secrets > Add,",
    "  nama SITE_URL, isi alamat website (contoh https://nanangdigital-for-ac.namaakun.workers.dev),",
    "  lalu jalankan ulang build (Retry build).",
  ].join("\n");
}

/** @param {Record<string, string | undefined>} [env] */
export function resolveSiteUrl(env = process.env) {
  return resolveSiteUrlWithSource(env).url;
}
