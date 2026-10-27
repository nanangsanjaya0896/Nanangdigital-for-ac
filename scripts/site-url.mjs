/**
 * Satu sumber alamat utama website (SITE_URL).
 *
 * Dipakai oleh `vite.config.ts` (tag canonical, hreflang, Open Graph, dan JSON-LD di index.html)
 * serta `scripts/prerender.mjs` (7 halaman statis, sitemap.xml, dan robots.txt), jadi alamat
 * website cukup diatur di satu tempat.
 *
 * Urutan prioritas:
 * 1. Environment Variable `SITE_URL` (atau `VITE_SITE_URL`). Isi ini kalau memakai domain sendiri,
 *    contoh: `https://nanangdigital.com`.
 * 2. Otomatis di Cloudflare Pages: `CF_PAGES_URL` (selalu berbentuk https://<hash>.<project>.pages.dev)
 *    diubah menjadi alamat produksi https://<project>.pages.dev.
 * 3. Otomatis di Vercel: `VERCEL_PROJECT_PRODUCTION_URL`.
 * 4. Bawaan: https://nanangdigital.pages.dev
 *
 * Di Cloudflare Workers (Workers Builds) alamat website tidak dikirim otomatis ke proses build,
 * jadi `SITE_URL` wajib diisi sebagai Build variable. Kalau belum diisi, log build menampilkan peringatan.
 */

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
