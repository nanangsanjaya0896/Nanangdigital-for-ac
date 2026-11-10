# Panduan AEO & GEO NanangDigital

**AEO (Answer Engine Optimization)** artinya merapikan website supaya jawabannya mudah diambil mesin jawaban, misalnya kotak jawaban Google, Ringkasan AI (AI Overviews), dan asisten suara.

**GEO (Generative Engine Optimization)** artinya membuat website mudah dibaca, dipercaya, dan dikutip AI generatif seperti ChatGPT, Gemini, Perplexity, Claude, dan Copilot.

Google sendiri menyebut optimasi untuk fitur AI di Google Penelusuran tetap bagian dari SEO biasa: halaman harus bisa di-crawl, terindeks, isinya jelas, dan berguna untuk pembaca ([panduan resmi Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). Jadi yang dipasang di website ini fokus ke dasar yang memang dipakai mesin pencari dan AI, bukan trik.

## Yang sudah dipasang otomatis di website

| Bagian | Isi | File |
| --- | --- | --- |
| Izin crawler AI | `robots.txt` mengizinkan Google, Bing, dan crawler AI (OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Meta, Amazon, DuckDuckGo, Mistral, Common Crawl) plus `Content-Signal: search=yes, ai-input=yes, ai-train=yes` | `scripts/prerender.mjs` (fungsi `buildRobotsTxt`) |
| Data terstruktur | JSON-LD Organization (dengan `sameAs` ke Instagram resmi [@nanangdigital](https://www.instagram.com/nanangdigital/)), Person (Nanang Sanjaya), WebSite, Service + 3 paket harga, FAQPage di beranda; CollectionPage di `/panduan/`; BlogPosting + penulis + tanggal + breadcrumb + FAQPage di setiap artikel | `src/seo/schema.ts` |
| Jawaban langsung | Setiap artikel dibuka kotak **Jawaban singkat** (sekitar 55 sampai 60 kata) dan ditutup **Pertanyaan yang Sering Ditanyakan** | `src/data/articles.ts` (`quickAnswer`, `faqs`) |
| FAQ beranda | 11 pertanyaan, termasuk biaya, perlu tidaknya website, muncul di Google, luar kota, dan siapa yang mengerjakan. Pertanyaan ditandai sebagai judul (h3) | `src/data/faq.ts`, `src/components/FAQSection.tsx` |
| Kepercayaan (E-E-A-T) | Nama penulis, tanggal diperbarui, kotak profil penulis, dan daftar sumber resmi (Google, Meta) di artikel | `src/components/PanduanPage.tsx` |
| Tabel perbandingan | Tabel paket Basic, Growth, Premium Custom di artikel biaya, diambil langsung dari data paket | `src/data/articles.ts` |
| Ringkasan untuk AI | `/llms.txt` dan `/llms-full.txt` (format [llmstxt.org](https://llmstxt.org)), dibuat otomatis dari data website | `src/seo/llms.ts` |
| Tanggal pembaruan | `sitemap.xml` punya `lastmod` untuk semua halaman, artikel punya `article:modified_time` | `scripts/prerender.mjs` |
| Satu alamat resmi | Salinan website di alamat Vercel selain domain utama otomatis dialihkan ke `nanangdigital.web.id`, dan salinan lama di GitHub Pages diganti halaman pengalih | `vercel.json`, `.github/workflows/github-pages-arahkan.yml` |
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

Instagram resmi [@nanangdigital](https://www.instagram.com/nanangdigital/) sudah terpasang di data terstruktur (`sameAs`) semua halaman, tombol di footer halaman utama, `llms.txt`, dan jawaban Asisten AI. Supaya hubungannya dua arah:

1. Isi kolom **Situs web** di bio Instagram dengan `https://nanangdigital.web.id` (bukan alamat lama seperti `nanangdigital.my.id`).
2. Pakai nama yang sama (**NanangDigital**) di semua profil.
3. Kalau nanti membuat akun lain (Facebook, TikTok, LinkedIn), cantumkan link website yang sama di bionya, lalu kirim link profilnya ke developer supaya ikut ditambahkan ke `sameAs` (`src/data/business.ts` dan `src/seo/schema.ts`).

### 6. Konten unik dari pengalaman sendiri (paling berpengaruh)

Menurut Google, konten dengan pengalaman langsung dan sudut pandang unik paling berpengaruh untuk tampil di fitur AI dalam jangka panjang. Yang paling berguna:

- Studi kasus klien sungguhan (dengan izin): kondisi sebelum, apa yang dikerjakan, hasilnya.
- Foto asli proses kerja dan tampilan website klien.
- Testimoni asli dengan nama usaha (dengan izin).

Jangan membuat banyak halaman tipis hanya untuk mengejar variasi kata kunci, karena Google menganggapnya spam.

### 7. Alihkan alamat lama ke domain utama

Google dan mesin AI bisa menganggap NanangDigital punya beberapa website kalau alamat lama masih bisa dibuka, apalagi kalau isinya berbeda (paket, jumlah revisi, atau klaim lama). Hasil pengecekan 10 November 2026:

| Alamat | Kondisi | Yang perlu dilakukan |
| --- | --- | --- |
| `nanangdigital.my.id` | Masih online di Vercel (project `nanangdigital`), berisi website versi lama dengan info yang sudah tidak berlaku | Pasang pengalihan di Vercel (langkah A) |
| `nanangdigital.vercel.app` | Isi sama persis dengan `nanangdigital.my.id` (alamat bawaan project yang sama) | Ikut beres dengan langkah A |
| `nanangdigital-for-ac-main.vercel.app` | Sudah mati (404 `DEPLOYMENT_NOT_FOUND`) | Tidak perlu apa-apa. Jejaknya hilang sendiri dari Google dalam beberapa minggu. Kalau project-nya masih terlihat di dashboard Vercel, hapus saja |
| `nanangsanjaya0896.github.io/Nanangdigital-for-ac/` | Dulu halaman kosong dari versi awal repo | Sudah otomatis diganti halaman pengalih ke domain utama |
| `nanangdigital-for-ac.<akun>.workers.dev` | Alamat bawaan Cloudflare, dipakai untuk pratinjau | Dibiarkan. Tag canonical-nya sudah menunjuk ke domain utama, jadi Google tetap memilih `nanangdigital.web.id` |
| `http://nanangdigital.web.id` (tanpa https) | Masih terbuka tanpa dialihkan ke https | Langkah C |

**A. Alihkan `nanangdigital.my.id` dan `nanangdigital.vercel.app` (Vercel, sekitar 5 menit, langsung aktif)**

1. Buka [vercel.com/dashboard](https://vercel.com/dashboard), pilih project **nanangdigital** (yang domainnya `nanangdigital.my.id`).
2. Klik **Firewall** di menu samping, lalu tombol **⋯ > Configure** di kanan atas.
3. Pilih **Add New... > Rule**. Isi nama, misalnya `Pindah ke nanangdigital.web.id`.
4. Bagian **If**: pilih **Request Path**, **Starts with**, isi `/` (artinya semua halaman).
5. Bagian **Then**: pilih **Redirect**, isi tujuan `https://nanangdigital.web.id/`.
6. Klik **Save Rule**, lalu **Review Changes** dan **Publish**.
7. Cek: buka `https://nanangdigital.my.id` dan `https://nanangdigital.vercel.app`. Keduanya harus langsung pindah ke `nanangdigital.web.id`.

Fitur ini gratis di semua paket Vercel. Pengalihan dari dashboard Firewall bertipe sementara (307), tapi tetap diikuti browser dan Google. Kalau ingin pengalihan permanen (301), pakai langkah B.

**B. Opsional, pengalihan permanen 301 lewat Cloudflare**

1. Dashboard Cloudflare > **Add a domain** > isi `nanangdigital.my.id` > pilih paket **Free**.
2. Cloudflare memberi 2 nameserver. Login ke member area IDwebhost > **Domains** > `nanangdigital.my.id` > **Nameservers**, ganti `ns1.idwebhost.id` dan `ns2.idwebhost.id` dengan 2 nameserver dari Cloudflare. Tunggu status domain di Cloudflare menjadi **Active**.
3. Di Cloudflare > `nanangdigital.my.id` > **DNS**: pastikan ada record `A` untuk `@` dengan status **Proxied** (awan oranye). Isinya boleh `192.0.2.1`.
4. **Rules > Redirect Rules > Create rule**: pilih **All incoming requests**, tipe **Static**, URL `https://nanangdigital.web.id/`, status **301**, lalu **Deploy**.
5. Setelah `nanangdigital.my.id` sudah pindah ke `nanangdigital.web.id`, hapus project **nanangdigital** di Vercel (**Settings > Delete Project**) supaya `nanangdigital.vercel.app` ikut hilang.

Kalau dulu `nanangdigital.my.id` pernah didaftarkan di Google Search Console, setelah pengalihan aktif pakai menu **Setelan > Perubahan alamat** di properti lama untuk memberi tahu Google bahwa website pindah ke `nanangdigital.web.id`.

**C. Paksa https di domain utama (1 klik)**

Dashboard Cloudflare > `nanangdigital.web.id` > **SSL/TLS > Edge Certificates** > nyalakan **Always Use HTTPS**.

**D. Rapikan link di luar website**

Pastikan semua link yang Anda pasang sendiri memakai `https://nanangdigital.web.id`: bio Instagram, halaman Facebook, profil WhatsApp Business, Google Business Profile, dan URL tujuan iklan Meta Ads.

Pencegahan: kalau repo ini suatu saat dideploy lagi ke Vercel, `vercel.json` otomatis mengalihkan semua alamat selain `nanangdigital.web.id` ke domain utama, jadi tidak muncul salinan kedua seperti `nanangdigital-for-ac-main.vercel.app`.

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
