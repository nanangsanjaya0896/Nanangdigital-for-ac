# Panduan AEO & GEO NanangDigital

**AEO (Answer Engine Optimization)** artinya merapikan website supaya jawabannya mudah diambil mesin jawaban, misalnya kotak jawaban Google, Ringkasan AI (AI Overviews), dan asisten suara.

**GEO (Generative Engine Optimization)** artinya membuat website mudah dibaca, dipercaya, dan dikutip AI generatif seperti ChatGPT, Gemini, Perplexity, Claude, dan Copilot.

Google sendiri menyebut optimasi untuk fitur AI di Google Penelusuran tetap bagian dari SEO biasa: halaman harus bisa di-crawl, terindeks, isinya jelas, dan berguna untuk pembaca ([panduan resmi Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). Jadi yang dipasang di website ini fokus ke dasar yang memang dipakai mesin pencari dan AI, bukan trik.

## Yang sudah dipasang otomatis di website

| Bagian | Isi | File |
| --- | --- | --- |
| Izin crawler AI | `robots.txt` mengizinkan Google, Bing, dan crawler AI (OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Meta, Amazon, DuckDuckGo, Mistral, Common Crawl) plus `Content-Signal: search=yes, ai-input=yes, ai-train=yes` | `scripts/prerender.mjs` (fungsi `buildRobotsTxt`) |
| Data terstruktur | JSON-LD Organization, Person (Nanang Sanjaya), WebSite, Service + 3 paket harga, FAQPage di beranda; CollectionPage di `/panduan/`; BlogPosting + penulis + tanggal + breadcrumb + FAQPage di setiap artikel | `src/seo/schema.ts` |
| Jawaban langsung | Setiap artikel dibuka kotak **Jawaban singkat** (sekitar 55 sampai 60 kata) dan ditutup **Pertanyaan yang Sering Ditanyakan** | `src/data/articles.ts` (`quickAnswer`, `faqs`) |
| FAQ beranda | 11 pertanyaan, termasuk biaya, perlu tidaknya website, muncul di Google, luar kota, dan siapa yang mengerjakan. Pertanyaan ditandai sebagai judul (h3) | `src/data/faq.ts`, `src/components/FAQSection.tsx` |
| Kepercayaan (E-E-A-T) | Nama penulis, tanggal diperbarui, kotak profil penulis, dan daftar sumber resmi (Google, Meta) di artikel | `src/components/PanduanPage.tsx` |
| Tabel perbandingan | Tabel paket Basic, Growth, Premium Custom di artikel biaya, diambil langsung dari data paket | `src/data/articles.ts` |
| Ringkasan untuk AI | `/llms.txt` dan `/llms-full.txt` (format [llmstxt.org](https://llmstxt.org)), dibuat otomatis dari data website | `src/seo/llms.ts` |
| Tanggal pembaruan | `sitemap.xml` punya `lastmod` untuk semua halaman, artikel punya `article:modified_time` | `scripts/prerender.mjs` |
| Kabari Bing otomatis | Setiap `main` berubah, GitHub Actions mengirim daftar halaman ke IndexNow (Bing, Yandex, Seznam, Naver, Yep) | `.github/workflows/indexnow.yml`, `scripts/indexnow.mjs` |

Catatan jujur soal `llms.txt`: Google menyatakan tidak memakainya, dan belum ada bukti kuat AI lain membacanya. File ini dipasang karena gratis, otomatis, dan diperiksa audit Lighthouse bagian Agentic Browsing, tapi bukan faktor utama.

## Yang perlu Anda lakukan sendiri (sekali saja)

### 1. Google Search Console: pastikan website ikut fitur AI Google

1. Buka [search.google.com/search-console](https://search.google.com/search-console), pilih properti `nanangdigital.web.id`.
2. Masuk **Setelan > AI generatif Penelusuran**. Pastikan pilihan **Sertakan link dan konten situs saya dalam fitur AI generatif Penelusuran** aktif (ini bawaan, cukup dicek).
3. Pastikan `https://nanangdigital.web.id/sitemap.xml` sudah dikirim di menu **Sitemap**.
4. Untuk melihat hasilnya nanti, buka laporan **Performa AI Generatif**.

### 2. Bing Webmaster Tools (sumber data Copilot dan sebagian mesin jawaban AI)

1. Buka [bing.com/webmasters](https://www.bing.com/webmasters) dan masuk dengan akun Google/Microsoft.
2. Pilih **Import from Google Search Console**, centang `nanangdigital.web.id`. Verifikasi selesai otomatis.
3. Sitemap ikut terimpor. Pengiriman halaman baru lewat IndexNow sudah berjalan otomatis dari GitHub Actions.

### 3. Cloudflare: pastikan crawler AI tidak diblokir

Per 4 November 2026 sudah dites dari server luar (GitHub) memakai nama user agent masing-masing crawler: Googlebot, Bingbot, dan semua crawler AI di atas mendapat status 200 dan isi halaman lengkap, tidak ada yang diblokir. Kalau suatu saat setelan Cloudflare berubah, cek di sini:

1. Dashboard Cloudflare > domain `nanangdigital.web.id` > **AI Crawl Control** > tab **Crawlers**. Pastikan crawler pencarian AI (OAI-SearchBot, Claude-SearchBot, PerplexityBot) tidak berstatus **Block**.
2. **Security > Settings**: kalau ada setelan AI bot (Search, Training, Agent), pilih **Allow**, minimal untuk Search.
3. Jangan aktifkan **Managed robots.txt** kalau ingin konten tetap boleh dipakai AI.

### 4. Google Business Profile untuk NanangDigital

Google menyebut Google Business Profile membantu usaha tampil di jawaban AI dan hasil lokal. Buat profil sebagai **bisnis jasa tanpa alamat** (area layanan: Indonesia atau kota Anda), nama persis **NanangDigital**, kategori yang paling dekat dengan jasa pembuatan website, dan isi kolom website `https://nanangdigital.web.id`.

### 5. Profil media sosial

Pakai nama yang sama (NanangDigital) dan cantumkan link `https://nanangdigital.web.id` di bio Instagram, Facebook, TikTok, atau LinkedIn. Kirim link profilnya ke developer supaya ditambahkan ke data terstruktur (`sameAs`), jadi Google dan AI tahu semua profil itu milik brand yang sama.

### 6. Konten unik dari pengalaman sendiri (paling berpengaruh)

Menurut Google, konten dengan pengalaman langsung dan sudut pandang unik paling berpengaruh untuk tampil di fitur AI dalam jangka panjang. Yang paling berguna:

- Studi kasus klien sungguhan (dengan izin): kondisi sebelum, apa yang dikerjakan, hasilnya.
- Foto asli proses kerja dan tampilan website klien.
- Testimoni asli dengan nama usaha (dengan izin).

Jangan membuat banyak halaman tipis hanya untuk mengejar variasi kata kunci, karena Google menganggapnya spam.

## Cara mengecek hasilnya

- **Search Console** > **Performa AI Generatif**: tayangan dan klik dari Ringkasan AI dan Mode AI.
- **Google Analytics 4** > Laporan > Akuisisi > **Akuisisi traffic**, ganti dimensi ke **Sumber sesi**. Kunjungan dari AI biasanya tercatat sebagai `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, atau `claude.ai`.
- **Tes manual sebulan sekali**: tanya di ChatGPT, Gemini, Perplexity, dan Copilot, misalnya "jasa pembuatan website untuk usaha service AC" atau "berapa biaya website usaha service AC". Catat apakah NanangDigital disebut atau dikutip.

Hasil di mesin AI biasanya butuh beberapa minggu sampai beberapa bulan, tergantung seberapa cepat halaman di-crawl ulang.

## Menambah atau mengubah artikel

Edit `src/data/articles.ts`. Setiap artikel wajib punya:

- `quickAnswer`: jawaban langsung 2 sampai 3 kalimat untuk pertanyaan di judul.
- `faqs`: 2 sampai 4 tanya jawab (otomatis tampil di halaman dan jadi FAQPage).
- `updatedAt`: ubah ke tanggal hari ini setiap kali isi artikel diganti.
- `sources` (opsional): link sumber resmi yang dipakai.

Setelah `npm run build`, data terstruktur, `llms.txt`, `llms-full.txt`, dan `sitemap.xml` ikut diperbarui otomatis. Build akan gagal kalau ada tanda pisah panjang atau titik tengah di teks, sesuai aturan gaya penulisan website ini.
