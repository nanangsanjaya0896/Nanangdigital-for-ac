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
          telephone: "+62-859-7257-7637",
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
  fs.writeFileSync(path.join(rootDir, "public", "sitemap.xml"), sitemapXml, "utf8");

  fs.rmSync(ssrOutDir, { recursive: true, force: true });

  console.log(
    `✓ Prerendered ${sitemapEntries.length} static SEO pages (/, /en/, /panduan/, + ${SEO_ARTICLES.length} articles) & updated sitemap.xml`
  );
}

runPrerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
