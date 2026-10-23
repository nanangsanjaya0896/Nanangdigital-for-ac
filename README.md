# NanangDigital | Landing Page, SEO, GA4 & Meta CAPI

Landing page resmi **NanangDigital** (jasa pembuatan website & setup Meta Ads khusus usaha service AC dan cuci AC panggilan).

## Fitur Utama
- **Performa PageSpeed Hijau:** Build-time HTML prerendering, inlined critical CSS, aset WebP ringan, dan animasi GPU murni.
- **Form Singkat Pra-WhatsApp (`src/components/PreWhatsAppModal.tsx`):** Menyaring prospek serius (Nama, Nomor WA, Kota/Kecamatan) sebelum mengarahkan otomatis ke chat WhatsApp.
- **Google Search Console & Google Analytics 4 (`src/utils/tracking.ts` + `scripts/prerender.mjs`):**
  - Injeksi otomatis meta tag verifikasi Google Search Console lewat `VITE_GSC_VERIFICATION`.
  - Pelacakan otomatis funnel konversi GA4 (`page_view`, `whatsapp_modal_opened`, `generate_lead`) lewat `VITE_GA_MEASUREMENT_ID` tanpa memperlambat loading halaman.
- **Meta Pixel + Conversions API / CAPI (`api/meta-capi.js` + `src/utils/tracking.ts`):**
  - Enkripsi SHA-256 otomatis untuk Nomor WA (`628...`), Nama, Kota, dan Negara.
  - Pencocokan otomatis `event_id` kembar (*Deduplicated* antara Browser Pixel & Server CAPI).
  - Penyelamatan parameter klik iklan `?fbclid=` (`_fbc`) & `_fbp`.
- **SEO & Preview WhatsApp:** Dilengkapi `public/images/og-preview.jpg` (`1200x630`), Schema.org JSON-LD (`ProfessionalService` + `OfferCatalog`), `robots.txt`, dan `sitemap.xml`.

## Menjalankan Lokal
```bash
npm install
npm run dev
```

## Panduan Aktivasi Produksi di Vercel
- **Google Search Console & Google Analytics 4:** Lihat **[PANDUAN-GSC-DAN-GA4.md](./PANDUAN-GSC-DAN-GA4.md)**.
- **Meta Pixel + Conversions API (CAPI):** Lihat **[PANDUAN-META-PIXEL-CAPI.md](./PANDUAN-META-PIXEL-CAPI.md)**.
