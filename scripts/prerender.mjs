process.env.NODE_ENV = "production";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as viteBuild, loadEnv } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";
import { resolveSiteUrlWithSource } from "./site-url.mjs";

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

function buildEnglishHomeSchemaGraph(siteOrigin) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": `${siteOrigin}/en/#organization`,
          name: "NanangDigital",
          url: `${siteOrigin}/en/`,
          image:
            "https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_560,c_limit/photo1",
          priceRange: "$299 - $449+",
          founder: {
            "@type": "Person",
            name: "Nanang Sanjaya",
            jobTitle: "Founder & Web Strategist",
          },
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "Australia" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Canada" },
            { "@type": "Country", name: "Singapore" },
            { "@type": "Country", name: "Malaysia" },
          ],
          description:
            "Conversion-focused websites, Google Business Profile setup, and local Meta lead campaigns tailored exclusively for HVAC and air conditioning contractors worldwide.",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "HVAC Website & Lead Ads Packages",
            itemListElement: [
              {
                "@type": "Offer",
                name: "Basic Package",
                priceCurrency: "USD",
                price: "299",
                description:
                  "High-converting HVAC website, WhatsApp / Lead Inquiry Form, conversion copywriting, Free SSL HTTPS, AI Live Chat, 1st-year custom domain & hosting, Google Business Profile, and starter Meta Ads setup.",
              },
              {
                "@type": "Offer",
                name: "Growth Package",
                priceCurrency: "USD",
                price: "449",
                description:
                  "Complete HVAC contractor website, 1 local Meta Ads lead campaign, 2-3 ad creatives, Pixel & CAPI tracking, Google Search Console, Google Analytics 4, plus 1st-year domain & hosting.",
              },
              {
                "@type": "Offer",
                name: "Premium Custom Package",
                priceCurrency: "USD",
                description:
                  "Multi-section commercial & residential HVAC website, 2 Meta Ads campaign angles, early campaign optimization, lead form + WhatsApp CTA, and up to 10 revisions.",
              },
            ],
          },
        },
        {
          "@type": "FAQPage",
          "@id": `${siteOrigin}/en/#faqpage`,
          mainEntity: [
            {
              "@type": "Question",
              name: "What exactly is included when I order an HVAC website package?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Every package includes a mobile-first HVAC website, conversion copywriting, WhatsApp / lead inquiry form, Free SSL HTTPS, AI Live Chat, 1 full year of custom domain & fast hosting, Google Business Profile setup, and starter Meta Ads setup.",
              },
            },
            {
              "@type": "Question",
              name: "How fast is the turnaround time?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most Basic ($299) and Growth ($449) HVAC websites go live within 3 to 5 business days after receiving your company details.",
              },
            },
            {
              "@type": "Question",
              name: "How do international payments work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Payments are split 50% upfront to kick off your build and 50% only after you preview and approve the finished live website on your own devices via Wise, PayPal, or bank transfer.",
              },
            },
          ],
        },
      ],
    },
    null,
    2
  );
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

function customizePageHead(
  baseHtml,
  { lang = "id", title, description, canonicalUrl, stripHeroPreload = true, stripHreflang = true, jsonLd }
) {
  let out = baseHtml;
  if (lang === "en") {
    out = out.replace('<html lang="id"', '<html lang="en"');
    out = out.replace(
      /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/,
      '<meta property="og:locale" content="en_US" />'
    );
  }
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );
  if (stripHreflang) {
    out = out.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>/g, "");
  }
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

  // Alamat utama website untuk canonical, hreflang, JSON-LD, sitemap.xml, dan robots.txt
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

  // 1. Prerender Landing Page Utama Bahasa Indonesia (/)
  const homeHtml = baseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${renderToString(
      React.createElement(App, { initialPath: "/", initialLang: "id" })
    )}</div>`
  );
  fs.writeFileSync(indexPath, homeHtml, "utf8");

  // 2. Prerender Landing Page Internasional Bahasa Inggris (/en/)
  const enDir = path.join(distDir, "en");
  fs.mkdirSync(enDir, { recursive: true });
  const enTemplate = customizePageHead(baseTemplate, {
    lang: "en",
    title: "NanangDigital | Websites & Meta Lead Ads Built for HVAC & AC Businesses",
    description:
      "Fast, conversion-focused websites, Google Business setup, and local Meta lead campaigns for HVAC & air conditioning contractors. Packages from $299 USD including 1-year domain & hosting.",
    canonicalUrl: `${SITE_ORIGIN}/en/`,
    stripHeroPreload: false,
    stripHreflang: false,
    jsonLd: buildEnglishHomeSchemaGraph(SITE_ORIGIN),
  });
  const enHtml = enTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${renderToString(
      React.createElement(App, { initialPath: "/en/", initialLang: "en" })
    )}</div>`
  );
  fs.writeFileSync(path.join(enDir, "index.html"), enHtml, "utf8");

  // 3. Prerender Halaman Indeks Panduan (/panduan/)
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

  // 4. Prerender Seluruh Artikel SEO (/panduan/<slug>/)
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

  // 5. Generate sitemap.xml otomatis mencakup seluruh 7 halaman SEO statis + hreflang ID/EN
  const hreflangLinks = [
    `    <xhtml:link rel="alternate" hreflang="id" href="${SITE_ORIGIN}/" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_ORIGIN}/en/" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/en/" />`,
  ].join("\n");

  const sitemapEntries = [
    { loc: `${SITE_ORIGIN}/`, priority: "1.0", changefreq: "weekly", withHreflang: true },
    { loc: `${SITE_ORIGIN}/en/`, priority: "0.95", changefreq: "weekly", withHreflang: true },
    { loc: `${SITE_ORIGIN}/panduan/`, priority: "0.9", changefreq: "weekly", withHreflang: false },
    ...SEO_ARTICLES.map((article) => ({
      loc: `${SITE_ORIGIN}/panduan/${article.slug}/`,
      priority: "0.85",
      changefreq: "monthly",
      lastmod: article.publishedAt,
      withHreflang: false,
    })),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>${entry.withHreflang ? `\n${hreflangLinks}` : ""}
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>\n    ` : ""}<changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");

  // 6. robots.txt mengikuti alamat website yang aktif
  fs.writeFileSync(
    path.join(distDir, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
    "utf8"
  );

  // 7. Halaman 404 statis: Cloudflare Pages & Vercel membalas status 404 asli untuk alamat yang tidak ada
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
    `✓ Prerendered ${sitemapEntries.length} static SEO pages (/, /en/, /panduan/, + ${SEO_ARTICLES.length} articles) & updated sitemap.xml, robots.txt, 404.html`
  );
  console.log(`✓ Alamat website (SITE_URL): ${SITE_ORIGIN} [sumber: ${siteUrlSource}]`);
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
      h1 { margin: 0 0 4px; font-size: clamp(1.6rem, 6vw, 2.2rem); line-height: 1.2; }
      .en { margin: 0 0 18px; font-size: 1.05rem; }
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
      <p class="en" lang="en">Page not found</p>
      <p>Alamat yang Anda buka tidak ada atau sudah dipindahkan.</p>
      <p lang="en">The page you are looking for does not exist or has moved.</p>
      <nav aria-label="Navigasi">
        <a class="primary" href="/">Ke Beranda</a>
        <a href="/en/" lang="en">English Site</a>
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
