/**
 * Membuat paket siap upload untuk Cloudflare Pages (cara upload manual / drag and drop).
 *
 * Jalankan: `npm run build:upload`
 * Hasil:    `nanangdigital-siap-upload.zip` di folder utama project (tidak ikut Git).
 *
 * Isi paket:
 * - Semua hasil `npm run build` (folder `dist`): halaman, gambar, JS, CSS, sitemap, robots, 404,
 *   `_headers`, `_redirects`, dan `_routes.json`.
 * - `_worker.js`: fungsi server `/api/ai-chat` dan `/api/meta-capi` (dari `worker/pages-advanced.js`),
 *   karena upload manual tidak bisa membawa folder `functions/`.
 *
 * Semua file berada langsung di akar zip (index.html paling atas), sesuai format yang diminta
 * Cloudflare Pages untuk upload manual.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const stageDir = path.join(rootDir, "upload");
const zipName = "nanangdigital-siap-upload.zip";
const zipPath = path.join(rootDir, zipName);

/** File di `dist` yang khusus Cloudflare Workers dan tidak perlu ikut ke Pages. */
const SKIP_FILES = new Set([".assetsignore"]);

if (!fs.existsSync(path.join(distDir, "index.html"))) {
  console.error("✗ Folder dist belum ada. Jalankan `npm run build` dulu (atau langsung `npm run build:upload`).");
  process.exit(1);
}

// 1. Salin hasil build ke folder sementara
fs.rmSync(stageDir, { recursive: true, force: true });
fs.cpSync(distDir, stageDir, {
  recursive: true,
  filter: (source) => !SKIP_FILES.has(path.basename(source)),
});

// 2. Bundel fungsi server menjadi satu file _worker.js (format ES module, tanpa modul Node.js)
await build({
  entryPoints: [path.join(rootDir, "worker/pages-advanced.js")],
  outfile: path.join(stageDir, "_worker.js"),
  bundle: true,
  format: "esm",
  platform: "neutral",
  target: "es2022",
  minify: true,
  legalComments: "none",
  logLevel: "warning",
});

// 3. Kemas menjadi zip dengan semua file langsung di akar zip
fs.rmSync(zipPath, { force: true });
try {
  execFileSync("zip", ["-r", "-q", "-X", zipPath, "."], { cwd: stageDir, stdio: "inherit" });
} catch (error) {
  console.error("✗ Gagal membuat zip. Pastikan perintah `zip` tersedia di komputer ini.");
  throw error;
}

const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push(full);
  }
})(stageDir);

const workerKb = (fs.statSync(path.join(stageDir, "_worker.js")).size / 1024).toFixed(1);
const zipKb = (fs.statSync(zipPath).size / 1024).toFixed(1);
console.log(`✓ Paket siap upload: ${zipName} (${zipKb} KB, ${files.length} file, termasuk _worker.js ${workerKb} KB)`);
console.log("  Upload file zip ini di Cloudflare Pages: Create application > Pages > Drag and drop your files.");
