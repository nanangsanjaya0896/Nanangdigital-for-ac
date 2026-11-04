/**
 * Titik masuk modul SEO/AEO/GEO yang dipakai scripts/prerender.mjs saat build.
 * Tidak ikut dimuat browser (hanya dijalankan di Node saat `npm run build`).
 */
export { buildHomeSchema, buildHubSchema, buildArticleSchema, articleImage } from "./schema";
export type { PageInfo } from "./schema";
export { buildLlmsTxt, buildLlmsFullTxt } from "./llms";
export { SEO_ARTICLES, latestArticleUpdate } from "../data/articles";
