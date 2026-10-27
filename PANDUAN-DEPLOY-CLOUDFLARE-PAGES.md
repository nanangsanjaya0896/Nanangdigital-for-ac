# Panduan Deploy ke Cloudflare Pages

Website ini sudah disiapkan untuk **Cloudflare Pages**:

* 7 halaman statis untuk SEO: `/`, `/en/`, `/panduan/`, dan 4 artikel.
* 2 fungsi server:
  * `/api/ai-chat` untuk Live AI Chat.
  * `/api/meta-capi` untuk Meta Conversions API.

Paket gratis Cloudflare boleh dipakai untuk website bisnis:

* Halaman website gratis tanpa batas.
* Fungsi server gratis sampai 100.000 request per hari.

> Ringkasnya: sambungkan repo GitHub ini ke Cloudflare Pages lalu isi token rahasia. Setelah itu, setiap ada update di branch `main`, Cloudflare otomatis deploy ulang.

---

## Langkah 1: Buat project Pages (5 menit)

1. Daftar atau login di **[dash.cloudflare.com](https://dash.cloudflare.com)**. Gratis, tanpa kartu kredit.
2. Buka menu **Workers & Pages**, lalu klik **Create application** > **Pages** > **Connect to Git**.
   * Kalau yang tampil pilihan Workers, cari tab atau tautan **Pages**, lalu pilih **Connect to Git**.
   * Jangan pilih Workers, karena pengaturan website ini dibuat untuk Pages.
3. Pilih **GitHub**, izinkan akses (**Install & Authorize**), pilih repo **`Nanangdigital-for-ac`**, lalu klik **Begin setup**.

## Langkah 2: Isi pengaturan build

| Kolom | Isi |
| --- | --- |
| **Project name** | `nanangdigital` (alamat website menjadi `nanangdigital.pages.dev`) |
| **Production branch** | `main` |
| **Framework preset** | `React (Vite)` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | biarkan kosong |

Catatan:

* Kalau nama `nanangdigital` sudah dipakai orang lain, Cloudflare memberi akhiran acak, misalnya `nanangdigital-abc.pages.dev`. Tidak masalah. Tag SEO, sitemap, dan robots.txt otomatis mengikuti alamat yang diberikan Cloudflare.
* Versi Node.js sudah dikunci ke 22 lewat file `.nvmrc`, jadi tidak perlu diatur.

Klik **Save and Deploy**, lalu tunggu 1 sampai 2 menit sampai statusnya **Success**. Di log build ada baris seperti ini untuk memastikan alamat website sudah benar:

```text
✓ Alamat website (SITE_URL): https://nanangdigital.pages.dev [sumber: Cloudflare Pages (CF_PAGES_URL)]
```

## Langkah 3: Pasang token rahasia

1. Buka project, lalu masuk ke **Settings** > **Variables and Secrets** > **Add**.
2. Tambahkan variabel berikut. Untuk token dan API key, klik **Encrypt** supaya isinya tersimpan sebagai rahasia.

| Nama | Encrypt? | Isi | Kapan perlu |
| --- | --- | --- | --- |
| `META_CAPI_ACCESS_TOKEN` | Ya | Token `EAA...` dari Meta Events Manager > Settings > Conversions API > Generate access token | Wajib supaya Meta CAPI aktif |
| `GEMINI_API_KEY` | Ya | API key dari [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Opsional. Tanpa ini, chat memakai jawaban bawaan |
| `SITE_URL` | Tidak | Contoh `https://nanangdigital.com` | Hanya kalau memakai domain sendiri |
| `VITE_GSC_VERIFICATION` | Tidak | Kode verifikasi Google Search Console | Hanya kalau Google memberi kode yang berbeda |

3. Klik **Save**.
4. Variabel baru aktif setelah deploy ulang. Buka tab **Deployments**, klik titik tiga (`...`) pada deployment paling atas, lalu pilih **Retry deployment**.

> Jangan pernah memberi awalan `VITE_` pada token atau API key, dan jangan menaruhnya di file kode. Dengan cara di atas, rahasia hanya tersimpan di server Cloudflare dan tidak pernah terkirim ke browser pengunjung.

## Langkah 4: Cek website sudah jalan

Buka alamat berikut. Kalau alamat project Anda berbeda, sesuaikan dulu.

| Alamat | Yang harus terlihat |
| --- | --- |
| `https://nanangdigital.pages.dev/` | Website versi Indonesia |
| `https://nanangdigital.pages.dev/en/` | Website versi English dengan harga USD |
| `https://nanangdigital.pages.dev/api/meta-capi` | `"ready_for_live_capi": true` |
| `https://nanangdigital.pages.dev/api/ai-chat` | `"ai_enabled": true`, kalau `GEMINI_API_KEY` sudah diisi |
| `https://nanangdigital.pages.dev/halaman-asal` | Halaman 404 "Halaman tidak ditemukan" |

## Langkah 5: Google Search Console dan sitemap

Alamat website berubah, jadi daftarkan alamat baru di Search Console. Pakai akun Google yang sama seperti sebelumnya.

1. Buka **[search.google.com/search-console](https://search.google.com/search-console)**, klik **Tambahkan properti**, pilih **Awalan URL**, lalu ketik `https://nanangdigital.pages.dev/`.
2. Pilih metode **Tag HTML**. Website ini sudah memasang tag verifikasi akun Google Anda (`cUtDIR_P8p7d7c7WhBW26zwoCDNGvTZuHAcGcS9X-B0`). Google memakai tag yang sama untuk semua properti di satu akun, jadi biasanya cukup klik **Verifikasi**.
3. Kalau Google menampilkan kode yang berbeda:
   * Salin kodenya, lalu isi ke variabel `VITE_GSC_VERIFICATION` (Langkah 3, tanpa Encrypt).
   * Klik **Retry deployment**, lalu klik **Verifikasi** lagi.
4. Setelah terverifikasi, buka menu **Peta Situs**, ketik `sitemap.xml`, lalu klik **Kirim**.

## Langkah 6 (opsional): Pakai domain sendiri

1. Di project, buka **Custom domains** > **Set up a custom domain**, ketik domain Anda (misalnya `nanangdigital.com`), lalu ikuti petunjuk DNS dari Cloudflare.
2. Tambahkan variabel `SITE_URL` berisi `https://nanangdigital.com` (tanpa Encrypt), lalu **Retry deployment**. Semua tag SEO, sitemap, dan robots.txt langsung pindah ke domain baru.
3. Daftarkan domain baru di Google Search Console seperti Langkah 5.

---

## Batas paket gratis

* **Halaman website** (HTML, gambar, JS, CSS): gratis tanpa batas.
* **Fungsi server** `/api/ai-chat` dan `/api/meta-capi`:
  * Gratis 100.000 request per hari. Kuota direset setiap pukul 07.00 WIB.
  * Fungsi hanya dipanggil saat chat dipakai dan saat event Meta dikirim, jadi pemakaiannya jauh di bawah batas.
* **Build:** 500 kali per bulan.

## Catatan teknis

* `functions/api/*.js` adalah fungsi Cloudflare Pages.
  * Logika intinya ada di `server/`, dipakai bersama oleh Vercel (`api/*.js`) dan Live Preview lokal.
  * Jadi website tetap bisa dipindah ke Vercel kapan saja tanpa menulis ulang kode.
* `public/_headers` berisi aturan cache file JS, CSS, dan gambar.
* `public/_routes.json` membuat hanya alamat `/api/*` yang menjalankan fungsi server. Halaman lain disajikan langsung dari CDN, jadi tetap gratis tanpa batas.
* Branch selain `main` otomatis mendapat alamat preview (`<hash>.nanangdigital.pages.dev`) yang tidak diindeks Google.
* Alamat website diatur di satu tempat, yaitu `scripts/site-url.mjs`. Urutan sumbernya:
  1. `SITE_URL`, kalau diisi.
  2. Alamat dari Cloudflare, kalau build berjalan di Cloudflare.
  3. Bawaan: `https://nanangdigital.pages.dev`.

## Kalau ada masalah

| Gejala | Solusi |
| --- | --- |
| Build gagal | Buka log build. Pastikan Build command `npm run build` dan Build output directory `dist` |
| `/api/meta-capi` masih `"ready_for_live_capi": false` | Token belum diisi, atau belum **Retry deployment** setelah diisi |
| `/api/ai-chat` masih `"ai_enabled": false` padahal key sudah diisi | Cek ejaan `GEMINI_API_KEY`, lalu **Retry deployment**. Pengunjung dari Inggris dan Eropa memang dijawab mode bawaan selama memakai free tier Gemini |
| Alamat yang salah menampilkan beranda, bukan halaman 404 | Pastikan Build output directory `dist`, karena file `404.html` ada di sana |
