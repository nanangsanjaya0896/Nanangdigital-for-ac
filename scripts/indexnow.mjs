/**
 * Kirim daftar halaman website ke IndexNow (Bing, Yandex, Seznam, Naver, Yep) setelah deploy.
 *
 * Dijalankan otomatis oleh GitHub Actions (.github/workflows/indexnow.yml) setiap kali isi website
 * di branch main berubah. Bisa juga manual: `node scripts/indexnow.mjs`.
 *
 * Alurnya:
 * 1. Tunggu sampai versi baru website sudah tayang (isi beranda berubah dibanding saat mulai,
 *    paling lama sekitar 8 menit), karena Cloudflare butuh waktu untuk build dan deploy.
 * 2. Pastikan file kunci https://<domain>/<kunci>.txt sudah bisa dibuka.
 * 3. Ambil semua alamat dari sitemap.xml yang sedang tayang, lalu kirim ke api.indexnow.org.
 *
 * Google tidak memakai IndexNow. Untuk Google, sitemap.xml sudah cukup (didaftarkan di Search Console).
 */
import crypto from "node:crypto";
import { INDEXNOW_KEY } from "./indexnow-key.mjs";
import { PRIMARY_SITE_URL, normalizeSiteUrl } from "./site-url.mjs";

const SITE = normalizeSiteUrl(process.env.SITE_URL || PRIMARY_SITE_URL);
const WAIT_FOR_DEPLOY_MS = Number(process.env.INDEXNOW_WAIT_MS ?? 8 * 60 * 1000);
const POLL_MS = 15 * 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url) {
  const response = await fetch(`${url}${url.includes("?") ? "&" : "?"}indexnow=${Date.now()}`, {
    headers: { "User-Agent": "NanangDigital-IndexNow/1.0", "Cache-Control": "no-cache" },
  });
  return { status: response.status, text: await response.text() };
}

const hash = (text) => crypto.createHash("sha256").update(text).digest("hex");

async function waitForNewDeploy() {
  if (WAIT_FOR_DEPLOY_MS <= 0) return;
  const start = await fetchText(`${SITE}/`);
  const startHash = hash(start.text);
  const deadline = Date.now() + WAIT_FOR_DEPLOY_MS;
  console.log(`Menunggu versi baru tayang di ${SITE} (maksimal ${Math.round(WAIT_FOR_DEPLOY_MS / 60000)} menit)...`);
  while (Date.now() < deadline) {
    await sleep(POLL_MS);
    try {
      const now = await fetchText(`${SITE}/`);
      if (now.status === 200 && hash(now.text) !== startHash) {
        console.log("Versi baru sudah tayang.");
        return;
      }
    } catch (error) {
      console.log(`Belum bisa dicek (${error.message}), coba lagi...`);
    }
  }
  console.log("Isi beranda tidak berubah dalam batas waktu (mungkin perubahan hanya di halaman lain). Lanjut kirim.");
}

async function main() {
  if (!/^[a-f0-9]{32}$/.test(INDEXNOW_KEY)) throw new Error("INDEXNOW_KEY tidak valid.");
  if (!SITE) throw new Error("Alamat website tidak ditemukan.");

  await waitForNewDeploy();

  const keyFile = await fetchText(`${SITE}/${INDEXNOW_KEY}.txt`);
  if (keyFile.status !== 200 || keyFile.text.trim() !== INDEXNOW_KEY) {
    throw new Error(`File kunci ${SITE}/${INDEXNOW_KEY}.txt belum bisa dibuka (status ${keyFile.status}). Coba jalankan ulang nanti.`);
  }

  const sitemap = await fetchText(`${SITE}/sitemap.xml`);
  const urls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  if (urls.length === 0) throw new Error("sitemap.xml kosong atau tidak bisa dibaca.");

  const host = new URL(SITE).host;
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`, urlList: urls }),
  });
  const body = await response.text();
  console.log(`IndexNow membalas ${response.status} untuk ${urls.length} alamat:`);
  urls.forEach((url) => console.log(`- ${url}`));
  if (body.trim()) console.log(body.trim().slice(0, 500));

  // 200 = diterima, 202 = diterima dan kunci sedang divalidasi. 429 = terlalu sering, aman diabaikan.
  if (response.status === 429) {
    console.log("::warning::IndexNow meminta jeda (429). Halaman tetap akan di-crawl lewat sitemap.");
    return;
  }
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow menolak permintaan (status ${response.status}).`);
  }
  console.log(`::notice::IndexNow menerima ${urls.length} alamat dari sitemap (status ${response.status}).`);
}

main().catch((error) => {
  console.error(`::error::${error.message}`);
  process.exit(1);
});
