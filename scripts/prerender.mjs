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

function customizePageHead(baseHtml, { title, description, canonicalUrl, jsonLd }) {
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
  // Hapus preload gambar Hero di halaman panduan teks agar tidak boros kuota atau memunculkan peringatan preload di console
  out = out.replace(/<link\s+rel="preconnect"\s+href="https:\/\/res\.cloudinary\.com"[^>]*>\s*/g, "");
  out = out.replace(/<link\s+rel="preload"\s+as="image"[\s\S]*?\/>\s*/g, "");
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

  await viteBuild({
    root: rootDir,
    logLevel: "warn",
    build: {
      ssr: "src/App.tsx",
      outDir: ssrOutDir,
      emptyOutDir: true,
    },
  });

  // Bangun juga modul daftar artikel agar prerender & sitemap selalu 100% sinkron
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
  const { SEO_ARTICLES, SITE_ORIGIN } = await import(
    path.join(ssrOutDir, "articles", "articles.js")
  );

  const indexPath = path.join(distDir, "index.html");
  let baseTemplate = fs.readFileSync(indexPath, "utf8");

  if (gscToken && !baseTemplate.includes(`content="${gscToken}"`)) {
    baseTemplate = baseTemplate.replace(
      '<meta name="robots" content="index, follow" />',
      `<meta name="robots" content="index, follow" />\n    <meta name="google-site-verification" content="${gscToken}" />`
    );
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

  // 4. Generate sitemap.xml otomatis mencakup seluruh 6 halaman SEO statis
  const sitemapEntries = [
    { loc: `${SITE_ORIGIN}/`, priority: "1.0", changefreq: "weekly" },
    { loc: `${SITE_ORIGIN}/panduan/`, priority: "0.9", changefreq: "weekly" },
    ...SEO_ARTICLES.map((article) => ({
      loc: `${SITE_ORIGIN}/panduan/${article.slug}/`,
      priority: "0.8",
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
  fs.writeFileSync(path.join(rootDir, "public", "sitemap.xml"), sitemapXml, "utf8");

  fs.rmSync(ssrOutDir, { recursive: true, force: true });

  console.log(
    `✓ Prerendered ${sitemapEntries.length} static SEO pages (/, /panduan/, + ${SEO_ARTICLES.length} articles) & updated sitemap.xml`
  );
}

runPrerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
