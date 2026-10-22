# NanangDigital | Landing Page & Meta CAPI

Landing page resmi **NanangDigital** (jasa pembuatan website & setup Meta Ads khusus usaha service AC dan cuci AC panggilan).

## Fitur Utama
- **Landing Page Konversi Tinggi:** Copywriting natural berbahasa Indonesia, responsif mobile-first, dan navigasi lengkap.
- **Form Singkat Pra-WhatsApp (`src/components/PreWhatsAppModal.tsx`):** Menyaring prospek serius (Nama, Nomor WA, Kota/Kecamatan) sebelum mengarahkan otomatis ke chat WhatsApp.
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

## Deploy ke Vercel & Aktivasi Meta Pixel + CAPI
Lihat panduan lengkap langkah demi langkah di **[PANDUAN-META-PIXEL-CAPI.md](./PANDUAN-META-PIXEL-CAPI.md)**.
