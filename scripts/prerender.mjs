process.env.NODE_ENV = "production";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as viteBuild, loadEnv } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const ssrOutDir = path.join(rootDir, ".ssr-temp");

/**
 * Ekstrak kode verifikasi murni dari input pengguna, baik berupa kode langsung
 * maupun tag lengkap <meta name="google-site-verification" content="..." />.
 */
function normalizeGscVerificationToken(raw) {
  if (!raw) return "";
  const trimmed = String(raw).trim();
  const contentAttrMatch = trimmed.match(/content=["']([^"']+)["']/i);
  const token = (contentAttrMatch ? contentAttrMatch[1] : trimmed).trim();
  // Hanya izinkan karakter aman untuk atribut HTML
  return token.replace(/["'<>]/g, "");
}

async function runPrerender() {
  const env = loadEnv("production", rootDir, "");
  const rawGsc =
    process.env.VITE_GSC_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION ||
    env.VITE_GSC_VERIFICATION ||
    env.GOOGLE_SITE_VERIFICATION ||
    "";
  const gscToken = normalizeGscVerificationToken(rawGsc);

  await viteBuild({
    root: rootDir,
    logLevel: "warn",
    build: {
      ssr: "src/App.tsx",
      outDir: ssrOutDir,
      emptyOutDir: true,
    },
  });

  const { default: App } = await import(path.join(ssrOutDir, "App.js"));
  const renderedAppHtml = renderToString(React.createElement(App));

  const indexPath = path.join(distDir, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");

  // Suntikkan meta tag verifikasi Google Search Console langsung ke HTML statis bila diisi
  if (gscToken && !html.includes('name="google-site-verification"')) {
    html = html.replace(
      '<meta name="robots" content="index, follow" />',
      `<meta name="robots" content="index, follow" />\n    <meta name="google-site-verification" content="${gscToken}" />`
    );
  }

  // Inline stylesheet utama langsung ke dalam <head> untuk menghilangkan render-blocking CSS
  html = html.replace(
    /<link\s+rel="stylesheet"\s+crossorigin\s+href="(\/assets\/[^"]+\.css)"\s*\/?>/g,
    (fullMatch, href) => {
      const cssFile = path.join(distDir, href.replace(/^\//, ""));
      if (!fs.existsSync(cssFile)) return fullMatch;
      const cssContent = fs.readFileSync(cssFile, "utf8");
      return `<style>${cssContent}</style>`;
    }
  );

  // Suntikkan HTML hasil render statis langsung ke dalam #root agar FCP & LCP tampil instan tanpa menunggu JS
  html = html.replace('<div id="root"></div>', `<div id="root">${renderedAppHtml}</div>`);

  fs.writeFileSync(indexPath, html, "utf8");
  fs.rmSync(ssrOutDir, { recursive: true, force: true });

  const finalSizeKb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(1);
  console.log(
    `✓ Prerendered dist/index.html (${finalSizeKb} kB, critical CSS inlined${gscToken ? ", GSC meta injected" : ""})`
  );
}

runPrerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
