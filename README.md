# NanangDigital (Bilingual ID / EN)

Website resmi dan mesin akuisisi lead untuk **NanangDigital** (oleh **Nanang Sanjaya**), spesialis pembuatan website konversi tinggi dan kampanye Meta Ads lokal khusus usaha **Service AC & HVAC Contractors** di Indonesia maupun pasar internasional (AS, Australia, Inggris, Eropa, Singapura, Malaysia).

## Rute & Bahasa Aktif

- **Pasar Indonesia (`/` , `lang="id"`):**
  - Paket Basic `Rp1.500.000`, Paket Growth `Rp2.000.000`, dan Paket Premium Custom (`Sesuai Permintaan`).
  - Dilengkapi pusat artikel SEO organik statis di `/panduan/` beserta 4 panduan teknis usaha service AC.
- **Pasar Global HVAC (`/en/`, `lang="en"`):**
  - Posisi khusus kontraktor HVAC & Air Conditioning internasional dengan harga USD: **Basic `$299`**, **Growth `$449`**, dan **Premium `Custom`**.
  - Prerender HTML statis murni di `dist/en/index.html` lengkap dengan `hreflang` dua arah (`id`, `en`, `x-default`), `OfferCatalog` berdenominasi `USD`, tombol CTA langsung ke URL WhatsApp, dan pelacakan nilai konversi `USD` otomatis ke GA4 serta Meta Pixel + Server CAPI.
- **Pengalih Bahasa Instan (`ID | EN`):**
  - Tersedia langsung di bilah navigasi atas (desktop & seluler) untuk mengganti 100% bahasa seluruh bagian halaman, modal pra-WhatsApp, dan template pesan chat secara instan tanpa muat ulang halaman.

## Live AI Chat (Asisten AI NanangDigital)

- Tombol **Tanya Asisten AI** di pojok kanan bawah semua halaman, dua bahasa (`ID` & `EN`), dan otomatis mengikuti bahasa yang diketik pengunjung.
- Tanpa API key, chat langsung menjawab dari data website (paket, harga, FAQ, alur kerja, bonus). Setelah `GEMINI_API_KEY` (gratis dari Google AI Studio) dipasang di Vercel, chat dijawab AI generatif lewat endpoint serverless `/api/ai-chat`.
- Tombol WhatsApp di dalam chat tetap lewat form kenalan + tracking GA4 dan Meta Pixel/CAPI yang sama.
- Panel chat dimuat hanya saat tombol disentuh, jadi tidak membebani skor PageSpeed.
- Panduan lengkap aktivasi dan aturan free tier Gemini: [`PANDUAN-LIVE-AI-CHAT.md`](./PANDUAN-LIVE-AI-CHAT.md).

## Pelacakan Analitik & Konversi

- **Google Search Console:** Tag verifikasi tertanam permanen di seluruh 7 halaman statis (`/` , `/en/`, `/panduan/`, dan 4 artikel panduan).
- **Google Analytics 4 (`G-JY9N81NCQE`):** Melacak tampilan halaman dan konversi `generate_lead` lengkap dengan mata uang (`IDR` / `USD`) serta bahasa aktif.
- **Meta Pixel + Server Conversions API (`2971268586402489`):** Deduplikasi `event_id` identik antara browser dan endpoint serverless `/api/meta-capi`, termasuk hashing SHA-256 otomatis untuk nomor telepon E.164 lokal maupun internasional. Cukup isi variabel rahasia `META_CAPI_ACCESS_TOKEN` di dashboard Vercel Environment Variables.

## Menjalankan Proyek Secara Lokal

```bash
npm install
npm run dev
```

Build produksi penuh (termasuk prerender 7 halaman SEO statis & inline critical CSS):

```bash
npm run build
```
