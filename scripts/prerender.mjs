process.env.NODE_ENV = "production";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as viteBuild } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const ssrOutDir = path.join(rootDir, ".ssr-temp");

async function runPrerender() {
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
  console.log(`✓ Prerendered dist/index.html (${finalSizeKb} kB, critical CSS inlined, 0 blocking CSS)`);
}

runPrerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
