/**
 * Data terstruktur Schema.org (JSON-LD) untuk semua halaman statis.
 *
 * Dipanggil oleh scripts/prerender.mjs saat `npm run build`. Semua isi diambil dari data yang sama
 * dengan tampilan halaman (src/data/*.ts), jadi harga, paket, FAQ, dan artikel di data terstruktur
 * selalu sama dengan yang dibaca pengunjung. Ini penting untuk Google (hasil kaya/rich results) dan
 * membantu mesin jawaban AI memahami siapa NanangDigital, apa layanannya, dan berapa harganya.
 *
 * Entitas utama memakai @id tetap supaya halaman-halaman saling terhubung:
 *   Organization  <origin>/#organization
 *   Person        <origin>/#nanang-sanjaya
 *   WebSite       <origin>/#website
 */
import { BUSINESS } from "../data/business";
import { FAQ_ITEMS } from "../data/faq";
import { AD_BUDGET_NOTE, PLANS } from "../data/plans";
import type { Plan } from "../data/plans";
import { SERVICES } from "../data/services";
import { SEO_ARTICLES, articlePlainText, countWords, latestArticleUpdate } from "../data/articles";
import type { SeoArticle } from "../data/articles";

type JsonObject = Record<string, unknown>;

export interface PageInfo {
  title: string;
  description: string;
  /** Gambar utama halaman (biasanya sama dengan og:image). */
  image?: string;
  /** Tanggal terakhir halaman berubah (YYYY-MM-DD). */
  dateModified?: string;
}

const LANGUAGE = "id-ID";

const KNOWS_ABOUT = [
  "Pembuatan website usaha service AC",
  "Landing page",
  "Copywriting",
  "Iklan Meta Ads (Facebook dan Instagram)",
  "Google Business Profile (Google Maps)",
  "SEO lokal",
];

function ids(origin: string) {
  return {
    organization: `${origin}/#organization`,
    person: `${origin}/#nanang-sanjaya`,
    website: `${origin}/#website`,
    logo: `${origin}/#logo`,
    service: `${origin}/#layanan`,
  };
}

/** Gambar artikel dan halaman Panduan (1200 x 630, ada di public/images). */
export function articleImage(origin: string): string {
  return `${origin}/images/og-preview.jpg`;
}

function organizationNode(origin: string): JsonObject {
  const id = ids(origin);
  return {
    "@type": "Organization",
    "@id": id.organization,
    name: BUSINESS.brand,
    alternateName: BUSINESS.alternateName,
    url: `${origin}/`,
    logo: {
      "@type": "ImageObject",
      "@id": id.logo,
      url: `${origin}/icon-512.png`,
      contentUrl: `${origin}/icon-512.png`,
      width: 512,
      height: 512,
      caption: `Logo ${BUSINESS.brand}`,
    },
    image: { "@id": id.logo },
    description: BUSINESS.summary,
    founder: { "@id": id.person },
    areaServed: { "@type": "Country", name: BUSINESS.areaServed },
    knowsAbout: KNOWS_ABOUT,
    // Profil resmi brand di luar website. Membantu Google dan mesin AI menyatukan semua jejak
    // NanangDigital menjadi satu entitas dengan alamat utama di `url`.
    sameAs: [BUSINESS.instagram.url],
  };
}

function personNode(origin: string): JsonObject {
  const id = ids(origin);
  return {
    "@type": "Person",
    "@id": id.person,
    name: BUSINESS.founder,
    url: `${origin}/#tentang`,
    image: BUSINESS.founderPhoto.url,
    jobTitle: BUSINESS.role,
    description: BUSINESS.authorBio,
    worksFor: { "@id": id.organization },
    knowsAbout: KNOWS_ABOUT,
  };
}

function websiteNode(origin: string): JsonObject {
  const id = ids(origin);
  return {
    "@type": "WebSite",
    "@id": id.website,
    url: `${origin}/`,
    name: BUSINESS.brand,
    alternateName: BUSINESS.alternateName,
    description: BUSINESS.summary,
    inLanguage: LANGUAGE,
    publisher: { "@id": id.organization },
  };
}

function priceNumber(plan: Plan): string | null {
  if (plan.customLabel) return null;
  const digits = plan.price.replace(/[^\d]/g, "");
  return digits || null;
}

function offerNode(origin: string, plan: Plan): JsonObject {
  const features = plan.features.filter((feature) => !/^no\s/i.test(feature));
  const price = priceNumber(plan);
  const priceText = price ? "" : ` Harga ${plan.customLabel?.toLowerCase() ?? "sesuai permintaan"}.`;
  return {
    "@type": "Offer",
    name: plan.name,
    url: `${origin}/#paket`,
    priceCurrency: "IDR",
    ...(price ? { price } : {}),
    description: `${plan.tagline} ${plan.priceNote}${priceText} Isi paket: ${features.join(", ")}. ${AD_BUDGET_NOTE.title}`,
    itemOffered: {
      "@type": "Service",
      name: `Pembuatan website usaha service AC, ${plan.name}`,
    },
    seller: { "@id": ids(origin).organization },
  };
}

function serviceNode(origin: string): JsonObject {
  const id = ids(origin);
  return {
    "@type": "Service",
    "@id": id.service,
    name: "Jasa pembuatan website dan setup iklan Meta Ads untuk usaha service AC",
    serviceType: SERVICES.map((service) => service.title),
    description: BUSINESS.summary,
    url: `${origin}/#layanan`,
    provider: { "@id": id.organization },
    areaServed: { "@type": "Country", name: BUSINESS.areaServed },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Pemilik usaha service AC dan cuci AC rumahan",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Paket jasa pembuatan website usaha service AC",
      itemListElement: PLANS.map((plan) => offerNode(origin, plan)),
    },
  };
}

function faqNode(id: string, items: { question: string; answer: string }[]): JsonObject {
  return {
    "@type": "FAQPage",
    "@id": id,
    inLanguage: LANGUAGE,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function breadcrumbNode(id: string, items: { name: string; url: string }[]): JsonObject {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function graph(nodes: JsonObject[]): JsonObject {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Beranda: brand, pemilik, website, halaman, layanan + paket harga, dan FAQ beranda. */
export function buildHomeSchema(origin: string, page: PageInfo): JsonObject {
  const id = ids(origin);
  const webPage: JsonObject = {
    "@type": "WebPage",
    "@id": `${origin}/#webpage`,
    url: `${origin}/`,
    name: page.title,
    description: page.description,
    inLanguage: LANGUAGE,
    isPartOf: { "@id": id.website },
    about: { "@id": id.organization },
    mainEntity: { "@id": id.service },
    ...(page.image ? { primaryImageOfPage: { "@type": "ImageObject", url: page.image } } : {}),
    ...(page.dateModified ? { dateModified: page.dateModified } : {}),
  };
  return graph([
    organizationNode(origin),
    personNode(origin),
    websiteNode(origin),
    webPage,
    serviceNode(origin),
    faqNode(`${origin}/#faq`, FAQ_ITEMS),
  ]);
}

/** Halaman indeks /panduan/: daftar artikel. */
export function buildHubSchema(origin: string, page: PageInfo): JsonObject {
  const id = ids(origin);
  const hubUrl = `${origin}/panduan/`;
  return graph([
    organizationNode(origin),
    websiteNode(origin),
    {
      "@type": "CollectionPage",
      "@id": `${hubUrl}#webpage`,
      url: hubUrl,
      name: page.title,
      description: page.description,
      inLanguage: LANGUAGE,
      isPartOf: { "@id": id.website },
      publisher: { "@id": id.organization },
      breadcrumb: { "@id": `${hubUrl}#breadcrumb` },
      dateModified: latestArticleUpdate(),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: SEO_ARTICLES.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${origin}/panduan/${article.slug}/`,
          name: article.title,
        })),
      },
    },
    breadcrumbNode(`${hubUrl}#breadcrumb`, [
      { name: "Beranda", url: `${origin}/` },
      { name: "Panduan Usaha AC", url: hubUrl },
    ]),
  ]);
}

/** Halaman artikel: artikel lengkap dengan penulis, tanggal, breadcrumb, dan FAQ artikel. */
export function buildArticleSchema(origin: string, article: SeoArticle): JsonObject {
  const id = ids(origin);
  const url = `${origin}/panduan/${article.slug}/`;
  const image = articleImage(origin);
  const nodes: JsonObject[] = [
    organizationNode(origin),
    personNode(origin),
    websiteNode(origin),
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: article.metaTitle,
      description: article.metaDescription,
      inLanguage: LANGUAGE,
      isPartOf: { "@id": id.website },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
    },
    {
      "@type": "BlogPosting",
      "@id": `${url}#artikel`,
      headline: article.title,
      description: article.metaDescription,
      abstract: article.quickAnswer,
      articleSection: article.category,
      wordCount: countWords(articlePlainText(article)),
      inLanguage: LANGUAGE,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      image: [image],
      mainEntityOfPage: { "@id": `${url}#webpage` },
      isPartOf: { "@id": id.website },
      author: { "@id": id.person },
      publisher: { "@id": id.organization },
      ...(article.sources?.length ? { citation: article.sources.map((source) => source.url) } : {}),
    },
    breadcrumbNode(`${url}#breadcrumb`, [
      { name: "Beranda", url: `${origin}/` },
      { name: "Panduan Usaha AC", url: `${origin}/panduan/` },
      { name: article.title, url },
    ]),
  ];
  if (article.faqs.length > 0) {
    nodes.push(faqNode(`${url}#faq`, article.faqs));
  }
  return graph(nodes);
}
