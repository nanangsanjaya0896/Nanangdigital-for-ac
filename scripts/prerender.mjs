process.env.NODE_ENV = "production";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as viteBuild, loadEnv } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";
import { resolveSiteUrlWithSource, siteUrlWarning } from "./site-url.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const ssrOutDir = path.join(rootDir, ".ssr-temp");

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeGscVerificationToken(raw) {
  if (!raw) return "";
  const trimmed = String(raw).trim();
  const contentAttrMatch = trimmed.match(/content=["']([^"']+)["']/i);
  const unwrapped = (contentAttrMatch ? contentAttrMatch[1] : trimmed)
    .trim()
    .replace(/^google-site-verification=/i, "")
    .trim();
  return unwrapped.replace(/["'<>]/g, "");
}

function buildArticleSchemaGraph(siteOrigin, article) {
  const articleUrl = `${siteOrigin}/panduan/${article.slug}/`;
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: `${siteOrigin}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Panduan Usaha AC",
              item: `${siteOrigin}/panduan/`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: articleUrl,
            },
          ],
        },
        {
          "@type": "Article",
          headline: article.title,
          description: article.metaDescription,
          datePublished: article.publishedAt,
          dateModified: article.publishedAt,
          inLanguage: "id-ID",
          mainEntityOfPage: articleUrl,
          image: `${siteOrigin}/images/og-preview.jpg`,
          author: {
            "@type": "Person",
            name: "Nanang Sanjaya",
          },
          publisher: {
            "@type": "Organization",
            name: "NanangDigital",
            url: `${siteOrigin}/`,
          },
        },
      ],
    },
    null,
    2
  );
}

function customizePageHead(baseHtml, { title, description, canonicalUrl, stripHeroPreload = true, jsonLd }) {
  let out = baseHtml;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );
  if (stripHeroPreload) {
    out = out.replace(
      /<link\s+rel="preconnect"\s+href="https:\/\/res\.cloudinary\.com"[^>]*>\s*/g,
      ""
    );
    out = out.replace(/<link\s+rel="preload"\s+as="image"[\s\S]*?\/>\s*/g, "");
  }
  if (jsonLd) {
    out = out.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${jsonLd}\n    </script>`
    );
  }
  return out;
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

  // Alamat utama website untuk canonical, JSON-LD, sitemap.xml, dan robots.txt
  const { url: SITE_ORIGIN, source: siteUrlSource } = resolveSiteUrlWithSource({ ...env, ...process.env });

  await viteBuild({
    root: rootDir,
    logLevel: "warn",
    build: {
      ssr: "src/App.tsx",
      outDir: ssrOutDir,
      emptyOutDir: true,
    },
  });

  await viteBuild({
    root: rootDir,
    logLevel: "warn",
    build: {
      ssr: "src/data/articles.ts",
      outDir: path.join(ssrOutDir, "articles"),
      emptyOutDir: true,
    },
  });

  const { default: App } = await import(path.join(ssrOutDir, "App.js"));
  const { SEO_ARTICLES } = await import(
    path.join(ssrOutDir, "articles", "articles.js")
  );

  const indexPath = path.join(distDir, "index.html");
  let baseTemplate = fs.readFileSync(indexPath, "utf8");

  // Tag verifikasi Google Search Console tambahan dari Environment Variable (misalnya setelah pindah
  // alamat website). Tag yang sudah ada tetap dipertahankan; Google mengizinkan beberapa tag sekaligus.
  if (gscToken && !baseTemplate.includes(`content="${gscToken}"`)) {
    const gscTag = `<meta name="google-site-verification" content="${escapeHtml(gscToken)}" />`;
    const existingTag = baseTemplate.match(/<meta\s+name="google-site-verification"[^>]*>/);
    baseTemplate = existingTag
      ? baseTemplate.replace(existingTag[0], `${existingTag[0]}\n    ${gscTag}`)
      : baseTemplate.replace(/<meta\s+charset="[^"]*"\s*\/?>/i, (charsetTag) => `${charsetTag}\n    ${gscTag}`);
  }

  // Inline stylesheet utama langsung ke dalam <head> untuk menghilangkan render-blocking CSS
  baseTemplate = baseTemplate.replace(
    /<link\s+rel="stylesheet"\s+crossorigin\s+href="(\/assets\/[^"]+\.css)"\s*\/?>/g,
    (fullMatch, href) => {
      const cssFile = path.join(distDir, href.replace(/^\//, ""));
      if (!fs.existsSync(cssFile)) return fullMatch;
      const cssContent = fs.readFileSync(cssFile, "utf8");
      return `<style>${cssContent}</style>`;
    }
  );

  // JavaScript aplikasi baru dimuat setelah tampilan pertama tergambar (lihat buildAppLoader)
  baseTemplate = deferAppScripts(baseTemplate);

  // 1. Prerender Landing Page Utama (/)
  const homeHtml = baseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${renderToString(React.createElement(App, { initialPath: "/" }))}</div>`
  );
  fs.writeFileSync(indexPath, homeHtml, "utf8");

  // 2. Prerender Halaman Indeks Panduan (/panduan/)
  const hubDir = path.join(distDir, "panduan");
  fs.mkdirSync(hubDir, { recursive: true });
  const hubTemplate = customizePageHead(baseTemplate, {
    title: "Panduan Pemasaran & Digitalisasi Usaha Service AC | NanangDigital",
    description:
      "Kumpulan panduan gratis cara cari pelanggan, optimasi Google Maps, contoh kalimat promosi WhatsApp, dan tips website untuk usaha service AC.",
    canonicalUrl: `${SITE_ORIGIN}/panduan/`,
    jsonLd: null,
  });
  const hubHtml = hubTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${renderToString(React.createElement(App, { initialPath: "/panduan" }))}</div>`
  );
  fs.writeFileSync(path.join(hubDir, "index.html"), hubHtml, "utf8");

  // 3. Prerender Seluruh Artikel SEO (/panduan/<slug>/)
  for (const article of SEO_ARTICLES) {
    const articleDir = path.join(distDir, "panduan", article.slug);
    fs.mkdirSync(articleDir, { recursive: true });
    const articleUrl = `${SITE_ORIGIN}/panduan/${article.slug}/`;
    const articleTemplate = customizePageHead(baseTemplate, {
      title: article.metaTitle,
      description: article.metaDescription,
      canonicalUrl: articleUrl,
      jsonLd: buildArticleSchemaGraph(SITE_ORIGIN, article),
    });
    const articleHtml = articleTemplate.replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(
        React.createElement(App, { initialPath: `/panduan/${article.slug}` })
      )}</div>`
    );
    fs.writeFileSync(path.join(articleDir, "index.html"), articleHtml, "utf8");
  }

  // 4. Generate sitemap.xml otomatis mencakup seluruh halaman SEO statis
  const sitemapEntries = [
    { loc: `${SITE_ORIGIN}/`, priority: "1.0", changefreq: "weekly" },
    { loc: `${SITE_ORIGIN}/panduan/`, priority: "0.9", changefreq: "weekly" },
    ...SEO_ARTICLES.map((article) => ({
      loc: `${SITE_ORIGIN}/panduan/${article.slug}/`,
      priority: "0.85",
      changefreq: "monthly",
      lastmod: article.publishedAt,
    })),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>\n    ` : ""}<changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");

  // 5. robots.txt mengikuti alamat website yang aktif
  fs.writeFileSync(
    path.join(distDir, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
    "utf8"
  );

  // 6. Halaman 404 statis: Cloudflare Pages & Vercel membalas status 404 asli untuk alamat yang tidak ada
  // (tanpa file ini Cloudflare Pages menganggap website SPA dan menampilkan beranda untuk semua alamat).
  fs.writeFileSync(path.join(distDir, "404.html"), build404Html(), "utf8");

  fs.rmSync(ssrOutDir, { recursive: true, force: true });

  // Pengaman: tidak boleh ada placeholder %SITE_URL% yang tertinggal di hasil build
  const leftovers = listFiles(distDir).filter(
    (file) => /\.(html|xml|txt)$/.test(file) && fs.readFileSync(file, "utf8").includes("%SITE_URL%")
  );
  if (leftovers.length) {
    throw new Error(`Placeholder %SITE_URL% belum terganti di: ${leftovers.map((f) => path.relative(distDir, f)).join(", ")}`);
  }

  console.log(
    `✓ Prerendered ${sitemapEntries.length} static SEO pages (/, /panduan/, + ${SEO_ARTICLES.length} articles) & updated sitemap.xml, robots.txt, 404.html`
  );
  console.log(`✓ Alamat website (SITE_URL): ${SITE_ORIGIN} [sumber: ${siteUrlSource}]`);
  const siteWarning = siteUrlWarning({ ...env, ...process.env });
  if (siteWarning) console.warn(siteWarning);
}

/**
 * Ganti tag <script type="module"> dan <link rel="modulepreload"> buatan Vite dengan pemuat kecil di
 * akhir <body>. Isi halaman (HTML + CSS inline) langsung tergambar dulu, baru JavaScript aplikasi
 * diunduh dan dijalankan. Hasilnya angka FCP/LCP di PageSpeed stabil dan tidak ikut menunggu
 * JavaScript, sementara pengunjung tidak merasakan bedanya (selisih sekitar satu frame).
 * @param {string} html
 */
function deferAppScripts(html) {
  const entryRe = /<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>\s*/;
  const preloadRe = /<link rel="modulepreload" crossorigin href="(\/assets\/[^"]+\.js)">\s*/g;
  const entry = html.match(entryRe);
  if (!entry) {
    throw new Error("Tag <script type=\"module\"> buatan Vite tidak ditemukan di dist/index.html");
  }
  const preloads = [...html.matchAll(preloadRe)].map((m) => m[1]);
  let out = html.replace(entryRe, "").replace(preloadRe, "");
  out = out.replace("</body>", `${buildAppLoader(entry[1], preloads)}\n  </body>`);
  return out;
}

/**
 * @param {string} entrySrc
 * @param {string[]} preloadHrefs
 */
function buildAppLoader(entrySrc, preloadHrefs) {
  return `    <script>
      (function () {
        var mulai = false;
        function muatAplikasi() {
          if (mulai) return;
          mulai = true;
          ${JSON.stringify(preloadHrefs)}.forEach(function (href) {
            var l = document.createElement("link");
            l.rel = "modulepreload";
            l.crossOrigin = "";
            l.href = href;
            document.head.appendChild(l);
          });
          var s = document.createElement("script");
          s.type = "module";
          s.crossOrigin = "";
          s.src = ${JSON.stringify(entrySrc)};
          document.head.appendChild(s);
        }
        // Setelah frame pertama tergambar. Cadangan 1,5 detik untuk tab yang dibuka di latar belakang.
        requestAnimationFrame(function () {
          setTimeout(muatAplikasi, 0);
        });
        setTimeout(muatAplikasi, 1500);
      })();
    </script>`;
}

/** @param {string} dir */
function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

function build404Html() {
  return `<!doctype html>
<html lang="id" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <meta name="theme-color" content="#0f1115" />
    <meta name="color-scheme" content="dark" />
    <title>Halaman tidak ditemukan | NanangDigital</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background: #0d1116;
        color: #ffffff;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      }
      main { max-width: 34rem; text-align: center; }
      .code { margin: 0 0 12px; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #00df8f; }
      h1 { margin: 0 0 16px; font-size: clamp(1.6rem, 6vw, 2.2rem); line-height: 1.2; }
      p { margin: 0 0 8px; line-height: 1.6; color: #a9b4c4; }
      nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 28px; }
      a {
        display: inline-flex;
        align-items: center;
        min-height: 48px;
        padding: 0 22px;
        border-radius: 999px;
        border: 1px solid rgb(255 255 255 / 0.16);
        color: #ffffff;
        font-weight: 700;
        text-decoration: none;
      }
      a.primary { background: linear-gradient(135deg, #00df8f, #00b373); border-color: transparent; color: #04140c; }
      a:focus-visible { outline: 2px solid #00df8f; outline-offset: 3px; }
    </style>
  </head>
  <body>
    <main>
      <p class="code">Error 404</p>
      <h1>Halaman tidak ditemukan</h1>
      <p>Alamat yang Anda buka tidak ada atau sudah dipindahkan.</p>
      <nav aria-label="Navigasi">
        <a class="primary" href="/">Ke Beranda</a>
        <a href="/panduan/">Panduan Usaha AC</a>
      </nav>
    </main>
  </body>
</html>
`;
}

runPrerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
