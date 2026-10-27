# Panduan Deploy ke Cloudflare

Website ini bisa di-deploy gratis ke Cloudflare lewat **dua cara**. Keduanya sudah disiapkan dan dites:

| | Cara A: Workers (disarankan) | Cara B: Pages (cara lama) |
| --- | --- | --- |
| Posisi di dashboard | Tombol utama **Create application** | Link kecil di bagian bawah halaman Create application |
| Alamat website | `nanangdigital-for-ac.<nama-akun>.workers.dev` | `nanangdigital-for-ac.pages.dev` |
| Isi alamat website (`SITE_URL`) | Diisi sekali setelah deploy pertama | Otomatis |

Sejak 2025 Cloudflare menampilkan **Workers** sebagai pilihan utama, sedangkan **Pages** disembunyikan sebagai cara lama. Kalau Anda tidak menemukan menu Pages, itu normal. Pakai **Cara A**.

Isi website di kedua cara sama persis:

* 6 halaman statis untuk SEO: `/`, `/panduan/`, dan 4 artikel.
* 2 fungsi server:
  * `/api/ai-chat` untuk Live AI Chat.
  * `/api/meta-capi` untuk Meta Conversions API.

Paket gratis Cloudflare boleh dipakai untuk website bisnis.

> Kalau di tengah jalan muncul tulisan merah atau error, foto layarnya (terutama bagian log build yang merah) lalu kirim ke saya.

---

## Cara A: Cloudflare Workers (disarankan)

### Langkah 1: Hubungkan repo GitHub

1. Login di **[dash.cloudflare.com](https://dash.cloudflare.com)**. Daftar gratis, tanpa kartu kredit.
2. Di menu kiri, buka **Compute** > **Workers & Pages**. Di sebagian akun menunya langsung bernama **Workers & Pages**.
3. Klik tombol **Create application**.
4. Pilih **GitHub** (di sebagian tampilan tertulis **Import a repository** atau **Continue with GitHub**).
5. Kalau diminta, klik **Install & Authorize** di halaman GitHub.
   * Pilih **All repositories**.
   * Kalau memilih **Only select repositories**, pastikan `Nanangdigital-for-ac` dicentang.
6. Pilih repo **`Nanangdigital-for-ac`** dari daftar.

### Langkah 2: Isi pengaturan project

| Kolom | Isi |
| --- | --- |
| **Project name** | `nanangdigital-for-ac` (harus sama persis, biasanya sudah terisi otomatis) |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` (bawaan, biarkan) |
| **Preview command** atau **Non-production branch deploy command** | biarkan bawaan |
| **Path** atau **Root directory** | biarkan kosong |

Klik **Save and Deploy** (atau **Deploy**), lalu tunggu 2 sampai 3 menit sampai statusnya **Success**.

Catatan:

* Nama project dikunci di file `wrangler.jsonc`. Kalau nama di dashboard berbeda, build gagal dengan pesan *"The name in your Wrangler configuration file ... must match the name of your Worker"*.
* Versi Node.js sudah dikunci ke 22 lewat file `.nvmrc`, jadi tidak perlu diatur.

### Langkah 3: Isi alamat website (`SITE_URL`)

Di Workers, Cloudflare tidak memberi tahu alamat website ke proses build. Jadi alamatnya diisi sekali secara manual. Alamat ini dipakai untuk tag SEO, `sitemap.xml`, dan `robots.txt`.

1. Buka project `nanangdigital-for-ac`, lalu salin alamat website yang tampil, misalnya `https://nanangdigital-for-ac.namaakun.workers.dev`.
2. Buka **Settings** > **Build** > **Variables and secrets** (bagian build, bukan bagian runtime), lalu klik **Add**:
   * **Variable name:** `SITE_URL`
   * **Value:** alamat dari poin 1
3. Klik **Save**.
4. Buka tab **Deployments**, klik **View build history** di bagian bawah, klik titik tiga (`...`) pada build paling atas, lalu pilih **Retry build**.

Untuk memastikan alamatnya sudah benar, buka log build. Harus ada baris seperti ini:

```text
✓ Alamat website (SITE_URL): https://nanangdigital-for-ac.namaakun.workers.dev [sumber: SITE_URL]
```

Kalau masih muncul tulisan `⚠ SITE_URL belum diisi`, ulangi langkah ini.

### Langkah 4: Pasang token rahasia

1. Di project, buka **Settings** > **Variables and Secrets** (bagian runtime), lalu klik **Add**.
2. Tambahkan variabel berikut. Pilih tipe **Secret** supaya isinya tersimpan sebagai rahasia.

| Nama | Tipe | Isi | Kapan perlu |
| --- | --- | --- | --- |
| `META_CAPI_ACCESS_TOKEN` | Secret | Token `EAA...` dari Meta Events Manager > Settings > Conversions API > Generate access token | Wajib supaya Meta CAPI aktif |
| `GEMINI_API_KEY` | Secret | API key dari [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Opsional. Tanpa ini, chat memakai jawaban bawaan |

3. Klik **Deploy** (atau **Save**). Token langsung aktif tanpa build ulang.

> Jangan pernah memberi awalan `VITE_` pada token atau API key, dan jangan menaruhnya di file kode. Dengan cara di atas, rahasia hanya tersimpan di server Cloudflare dan tidak pernah terkirim ke browser pengunjung.

Kalau Google Search Console memberi kode verifikasi yang berbeda, isi `VITE_GSC_VERIFICATION` di bagian **Build** (seperti `SITE_URL` di Langkah 3), lalu **Retry build**.

---

## Cara B: Cloudflare Pages (cara lama)

Pakai cara ini hanya kalau Anda lebih suka Pages atau sudah terlanjur membuat project Pages.

1. Buka **Workers & Pages** > **Create application**.
2. Gulir ke bagian paling bawah, lalu klik link kecil **Looking to deploy Pages? Get started**. Di sebagian tampilan tertulis **Continue to Pages**.
3. Pilih **Import an existing Git repository** (atau **Connect to Git**), pilih **GitHub**, pilih repo **`Nanangdigital-for-ac`**, lalu klik **Begin setup**.
4. Isi pengaturan build:

| Kolom | Isi |
| --- | --- |
| **Project name** | bebas, misalnya `nanangdigital-for-ac` |
| **Production branch** | `main` |
| **Framework preset** | `React (Vite)` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | biarkan kosong |

5. Klik **Save and Deploy**. Alamat website (`SITE_URL`) otomatis mengikuti alamat `.pages.dev` dari Cloudflare.
6. Pasang token: **Settings** > **Variables and Secrets** > **Add**. Isi `META_CAPI_ACCESS_TOKEN` dan `GEMINI_API_KEY`, klik **Encrypt**, lalu **Save**.
7. Token baru aktif setelah deploy ulang. Buka tab **Deployments**, klik titik tiga (`...`) pada deployment paling atas, lalu pilih **Retry deployment**.

Di log build Pages akan muncul tulisan *"A wrangler.toml file was found but it does not appear to be valid ... Skipping file and continuing"*. Itu normal. File `wrangler.jsonc` memang khusus untuk Cara A, dan Pages tetap deploy seperti biasa.

---

## Cek website sudah jalan

Ganti `ALAMAT` dengan alamat website Anda (contoh `https://nanangdigital-for-ac.namaakun.workers.dev`).

| Alamat | Yang harus terlihat |
| --- | --- |
| `ALAMAT/` | Website NanangDigital |
| `ALAMAT/en/` | Otomatis pindah ke beranda (versi bahasa Inggris sudah dihapus) |
| `ALAMAT/api/meta-capi` | `"ready_for_live_capi": true` |
| `ALAMAT/api/ai-chat` | `"ai_enabled": true`, kalau `GEMINI_API_KEY` sudah diisi |
| `ALAMAT/halaman-asal` | Halaman 404 "Halaman tidak ditemukan" |

## Google Search Console dan sitemap

1. Buka **[search.google.com/search-console](https://search.google.com/search-console)**, klik **Tambahkan properti**, pilih **Awalan URL**, lalu ketik alamat website Anda.
2. Pilih metode **Tag HTML**. Website ini sudah memasang tag verifikasi akun Google Anda (`cUtDIR_P8p7d7c7WhBW26zwoCDNGvTZuHAcGcS9X-B0`), jadi biasanya cukup klik **Verifikasi**.
3. Kalau Google menampilkan kode yang berbeda, isi kodenya ke variabel `VITE_GSC_VERIFICATION` (Cara A: bagian Build lalu **Retry build**. Cara B: Variables and Secrets lalu **Retry deployment**), lalu klik **Verifikasi** lagi.
4. Setelah terverifikasi, buka menu **Peta Situs**, ketik `sitemap.xml`, lalu klik **Kirim**.

Panduan lengkap Search Console dan GA4 ada di [`PANDUAN-GSC-DAN-GA4.md`](./PANDUAN-GSC-DAN-GA4.md).

## Pakai domain sendiri (opsional)

**Cara A (Workers):**

1. Domain harus memakai DNS Cloudflare. Tambahkan domain lewat **Add a domain** di dashboard Cloudflare, lalu ganti nameserver di tempat Anda membeli domain sesuai petunjuk Cloudflare.
2. Di project, buka **Settings** > **Domains & Routes** > **Add** > **Custom domain**, lalu ketik domain Anda (misalnya `nanangdigital.com`).
3. Ubah build variable `SITE_URL` menjadi `https://nanangdigital.com`, lalu **Retry build**.

**Cara B (Pages):**

1. Di project, buka **Custom domains** > **Set up a custom domain**, lalu ikuti petunjuk DNS dari Cloudflare.
2. Tambahkan variabel `SITE_URL` berisi `https://nanangdigital.com` (tanpa Encrypt), lalu **Retry deployment**.

Setelah itu, daftarkan domain baru di Google Search Console.

---

## Kalau ada masalah

| Gejala | Solusi |
| --- | --- |
| Tidak ada pilihan **Pages** | Normal, tampilan baru Cloudflare. Pakai Cara A |
| Repo `Nanangdigital-for-ac` tidak muncul di daftar | Di GitHub buka **Settings** > **Applications** > **Installed GitHub Apps** > **Cloudflare Workers and Pages** > **Configure**. Di **Repository access**, pilih **All repositories** atau tambahkan repo ini, lalu **Save**. Kembali ke Cloudflare dan muat ulang halaman |
| Error *"The name in your Wrangler configuration file (nanangdigital-for-ac) must match the name of your Worker"* | Nama project di dashboard harus `nanangdigital-for-ac`. Buat ulang project dengan nama itu, atau kirim nama project Anda ke saya supaya file `wrangler.jsonc` disesuaikan |
| Error *"Missing entry-point to Worker script or to assets directory"* | Build memakai kode lama yang belum punya `wrangler.jsonc`. Pastikan branch `main` sudah terbaru, lalu **Retry build** |
| Cloudflare membuat Pull Request otomatis berisi konfigurasi Workers | Jangan di-merge, cukup tutup. Repo ini sudah punya konfigurasi sendiri |
| Error *"npm ci can only install packages when your package.json and package-lock.json ... are in sync"* | Kirim screenshot log ke saya |
| Build sukses tapi `/api/meta-capi` tidak ditemukan | Pastikan Deploy command `npx wrangler deploy`, bukan `npx wrangler pages deploy` |
| Log build menampilkan `⚠ SITE_URL belum diisi` | Isi build variable `SITE_URL` (Cara A, Langkah 3) |
| `/api/meta-capi` masih `"ready_for_live_capi": false` | Token belum diisi sebagai Secret. Di Cara B, jangan lupa **Retry deployment** setelah mengisi |
| `/api/ai-chat` masih `"ai_enabled": false` padahal key sudah diisi | Cek ejaan `GEMINI_API_KEY`. Pengunjung dari Inggris dan Eropa memang dijawab mode bawaan selama memakai free tier Gemini |
| Muncul build untuk branch selain `main` (misalnya branch revisi) | Itu build preview dan tidak mengubah website utama. Kalau tidak perlu, matikan di **Settings** > **Build** > **Branch control** dengan menonaktifkan build untuk non-production branch |

## Batas paket gratis

* **Halaman website** (HTML, gambar, JS, CSS): gratis tanpa batas, di Workers maupun Pages.
* **Fungsi server** `/api/ai-chat` dan `/api/meta-capi`: gratis 100.000 request per hari. Fungsi hanya dipanggil saat chat dipakai dan saat event Meta dikirim, jadi pemakaiannya jauh di bawah batas.
* **Build:** Workers 3.000 menit per bulan (satu build sekitar 1 sampai 2 menit). Pages 500 build per bulan.

## Catatan teknis

* **`wrangler.jsonc`**: konfigurasi Cara A.
  * Halaman dari folder `dist` disajikan langsung dari CDN.
  * Hanya `/api/*` yang menjalankan Worker (`run_worker_first`).
  * Alamat yang tidak ada membalas `404.html` dengan status 404 (`not_found_handling`).
* **`worker/index.js`**: Worker untuk `/api/ai-chat` dan `/api/meta-capi`. Isinya memanggil fungsi yang sama dengan Pages Functions di `functions/api/*.js`, jadi hasilnya identik di kedua cara.
* **`functions/api/*.js`**: fungsi server untuk Cara B. Logika intinya ada di `server/`, dipakai bersama oleh Workers, Pages, Vercel (`api/*.js`), dan Live Preview lokal.
* **`public/_headers`** (cache file) dan **`public/_redirects`** (alamat lama `/en` ke beranda) dibaca oleh Workers maupun Pages.
* **`public/_routes.json`** hanya untuk Pages. Di Workers file ini tidak ikut diunggah karena tercantum di `public/.assetsignore`.
* **Alamat website** diatur di `scripts/site-url.mjs`. Urutan sumbernya:
  1. `SITE_URL`, kalau diisi.
  2. Alamat dari Cloudflare Pages (`CF_PAGES_URL`), kalau build berjalan di Pages.
  3. Bawaan: `https://nanangdigital.pages.dev`. Di Workers, log build memberi peringatan kalau `SITE_URL` belum diisi.
* **Tes di komputer sendiri** (meniru Cloudflare Workers): `npm run build`, lalu `npx wrangler dev`.
* Versi Wrangler dikunci di `package.json`, jadi build di Cloudflare selalu memakai versi yang sama dengan yang sudah dites.
