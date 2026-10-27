# NanangDigital

Website resmi dan mesin akuisisi lead untuk **NanangDigital** (oleh **Nanang Sanjaya**), spesialis pembuatan website konversi tinggi dan kampanye Meta Ads lokal khusus usaha **Service AC di Indonesia**.

## Halaman

- **Beranda (`/`):** Paket Basic `Rp1.500.000`, Paket Growth `Rp2.000.000`, dan Paket Premium Custom (`Sesuai Permintaan`).
- **Panduan (`/panduan/`):** pusat artikel SEO organik statis beserta 4 panduan usaha service AC.
- **Contoh Website (bagian Karya di beranda):** menampilkan website demo [ARKTIS Home Service](https://arktishomeservices.vercel.app/) yang sudah online, lengkap dengan screenshot halaman utama, form booking, dan tampilan HP, plus tombol untuk membuka website aslinya. Website demo diberi label jujur sebagai demo, bukan proyek klien. Untuk menambah website berikutnya, cukup tambahkan datanya di `src/data/projects.ts` dan simpan screenshot WebP di `public/images/`. Asisten AI otomatis ikut mengenali website baru itu setelah `npm run build`.
- **Bahasa:** seluruh website memakai Bahasa Indonesia. Versi bahasa Inggris (`/en/`) sudah dihapus, dan alamat lama `/en` otomatis diarahkan (301) ke beranda lewat `public/_redirects` (Cloudflare) dan `vercel.json` (Vercel), termasuk parameter iklan seperti `fbclid` dan UTM. Kode versi dua bahasa terakhir tersimpan di riwayat Git (commit `4f4b0b9`) kalau suatu saat ingin dipakai lagi.

## Deploy (Cloudflare Pages)

Hosting utama: **Cloudflare Pages**, gratis dan boleh dipakai untuk website bisnis. Panduan lengkap langkah demi langkah ada di [`PANDUAN-DEPLOY-CLOUDFLARE-PAGES.md`](./PANDUAN-DEPLOY-CLOUDFLARE-PAGES.md).

| Pengaturan | Isi |
| --- | --- |
| Framework preset | `React (Vite)` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` |
| Variables and Secrets | `META_CAPI_ACCESS_TOKEN` (wajib), `GEMINI_API_KEY` (opsional), `SITE_URL` (hanya untuk domain sendiri) |

- **Alamat website** diatur di satu tempat (`scripts/site-url.mjs`). Canonical, JSON-LD, `sitemap.xml`, dan `robots.txt` otomatis mengikuti alamat yang diberikan Cloudflare (bawaan `https://nanangdigital.pages.dev`), atau `SITE_URL` kalau memakai domain sendiri.
- **Fungsi server** ada di `functions/api/` (Cloudflare Pages Functions). Logika intinya di `server/` dipakai bersama oleh adapter Vercel di `api/` dan Live Preview lokal, jadi website tetap bisa dideploy ke Vercel (`vercel.json`) kapan saja.
- **`public/_routes.json`** membuat hanya `/api/*` yang menjalankan fungsi server, sehingga semua halaman tetap gratis tanpa batas. **`public/_headers`** mengatur cache file JS, CSS, dan gambar. **`public/_redirects`** mengarahkan alamat lama `/en` ke beranda.
- **Halaman 404 statis** (`dist/404.html`) memastikan alamat yang tidak ada membalas status 404 asli, bukan menampilkan beranda.

## Live AI Chat (Asisten AI NanangDigital)

- Tombol **Tanya Asisten AI** di pojok kanan bawah semua halaman, berbahasa Indonesia dengan harga Rupiah. Pertanyaan berbahasa lain tetap dijawab, dan harga selalu dalam Rupiah.
- Tanpa API key, chat langsung menjawab dari data website (paket, harga, FAQ, alur kerja, bonus, contoh website). Setelah `GEMINI_API_KEY` (gratis dari Google AI Studio) dipasang di Cloudflare Pages (Settings > Variables and Secrets), chat dijawab AI generatif lewat fungsi server `/api/ai-chat`.
- Tombol WhatsApp di dalam chat tetap lewat form kenalan + tracking GA4 dan Meta Pixel/CAPI yang sama.
- Panel chat dimuat hanya saat tombol disentuh, jadi tidak membebani skor PageSpeed.
- Panduan lengkap aktivasi dan aturan free tier Gemini: [`PANDUAN-LIVE-AI-CHAT.md`](./PANDUAN-LIVE-AI-CHAT.md).

## Pelacakan Analitik & Konversi

- **Google Search Console:** Tag verifikasi tertanam permanen di seluruh 6 halaman statis (`/`, `/panduan/`, dan 4 artikel panduan). Tag tambahan bisa dipasang lewat `VITE_GSC_VERIFICATION` tanpa mengubah kode.
- **Google Analytics 4 (`G-JY9N81NCQE`):** Melacak tampilan halaman dan konversi `generate_lead` lengkap dengan nilai paket dalam Rupiah (`IDR`).
- **Meta Pixel + Server Conversions API (`2971268586402489`):** Deduplikasi `event_id` identik antara browser dan fungsi server `/api/meta-capi`. Data pengunjung di-hash SHA-256 di browser, lalu server meneruskan hash tersebut beserta `fbc`/`fbp`, IP, user agent, dan negara pengunjung ke Meta. Cukup isi variabel rahasia `META_CAPI_ACCESS_TOKEN` di Cloudflare Pages. Panduan: [`PANDUAN-META-PIXEL-CAPI.md`](./PANDUAN-META-PIXEL-CAPI.md).

## Menjalankan Proyek Secara Lokal

```bash
npm install
npm run dev
```

Build produksi penuh (termasuk prerender 6 halaman SEO statis, inline critical CSS, sitemap, robots.txt, dan halaman 404):

```bash
npm run build
```
