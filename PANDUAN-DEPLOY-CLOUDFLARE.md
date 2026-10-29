# Panduan Deploy ke Cloudflare + Domain nanangdigital.web.id

Alamat utama website: **`https://nanangdigital.web.id`**. Alamat ini sudah diatur di kode (`scripts/site-url.mjs`), jadi tag SEO, `sitemap.xml`, dan `robots.txt` otomatis memakai domain ini. Tidak perlu mengisi `SITE_URL` di Cloudflare.

Urutan kerjanya:

1. **Deploy website ke Cloudflare** (Bagian 1). Hasilnya alamat sementara, misalnya `nanangdigital-for-ac.namaakun.workers.dev`.
2. **Sambungkan domain** `nanangdigital.web.id` dari DomaiNesia ke Cloudflare (Bagian 2). Langkah ganti nameserver boleh dikerjakan dari sekarang, sambil menunggu deploy beres.
3. **Pasang domain ke website** dan daftarkan ke Google (Bagian 3).

> Kalau di tengah jalan muncul tulisan merah atau error, foto layarnya (terutama bagian log build yang merah) lalu kirim ke saya.

---

## Bagian 1: Deploy website

Ada **empat cara**. Pilih salah satu saja, jangan dua sekaligus.

| | Cara A: Workers + GitHub (disarankan) | Cara B: Pages + GitHub | Cara C: Pages upload manual | Cara D: GitHub Actions |
| --- | --- | --- | --- | --- |
| Butuh sambungan GitHub di Cloudflare | Ya | Ya | Tidak | Tidak |
| File yang diupload | Tidak ada, diambil otomatis dari GitHub | Tidak ada, diambil otomatis dari GitHub | Hanya 1 file: `nanangdigital-siap-upload.zip` | Tidak ada, dikirim otomatis oleh GitHub |
| Update website | Otomatis setiap ada perubahan | Otomatis setiap ada perubahan | Upload ulang zip terbaru | Otomatis setiap ada perubahan |
| Posisi di dashboard | Tombol utama **Create application** | Link kecil di bagian bawah halaman Create application | Sama dengan Cara B, lalu pilih **Drag and drop your files** | Tidak perlu membuat project, cukup membuat API token |
| Alamat sementara | `nanangdigital-for-ac.<nama-akun>.workers.dev` | `<nama-project>.pages.dev` | `<nama-project>.pages.dev` | `nanangdigital-for-ac.<nama-akun>.workers.dev` |

Sejak 2025 Cloudflare menampilkan **Workers** sebagai pilihan utama, sedangkan **Pages** disembunyikan sebagai cara lama. Kalau Anda tidak menemukan menu Pages, itu normal. Pakai **Cara A**.

Kalau sambungan GitHub di Cloudflare bermasalah (misalnya muncul tanda merah **Missing git connection**), coba dulu [perbaikannya](#memperbaiki-missing-git-connection). Kalau tetap gagal, pakai **Cara C** (upload zip) atau **Cara D** (deploy otomatis lewat GitHub Actions). Kedua cara itu tidak butuh sambungan GitHub di Cloudflare.

> **Jangan upload file kode dari GitHub** (folder `src`, `package.json`, dan sebagainya) ke Cloudflare. Itu bahan mentah yang belum dirakit, jadi website akan kosong atau error. Di Cara A dan B tidak ada file yang perlu diupload. Di Cara C, yang diupload hanya file zip siap pakai.

Isi website di keempat cara sama persis:

* 6 halaman statis untuk SEO: `/`, `/panduan/`, dan 4 artikel.
* 2 fungsi server:
  * `/api/ai-chat` untuk Live AI Chat.
  * `/api/meta-capi` untuk Meta Conversions API.

Paket gratis Cloudflare boleh dipakai untuk website bisnis.

### Cara A: Cloudflare Workers (disarankan)

**Langkah 1: Hubungkan repo GitHub**

1. Login di **[dash.cloudflare.com](https://dash.cloudflare.com)**. Daftar gratis, tanpa kartu kredit.
2. Di menu kiri, buka **Compute** > **Workers & Pages**. Di sebagian akun menunya langsung bernama **Workers & Pages**.
3. Klik tombol **Create application**.
4. Pilih **GitHub** (di sebagian tampilan tertulis **Import a repository** atau **Continue with GitHub**).
5. Kalau diminta, klik **Install & Authorize** di halaman GitHub.
   * Pilih **All repositories**.
   * Kalau memilih **Only select repositories**, pastikan `Nanangdigital-for-ac` dicentang.
6. Pilih repo **`Nanangdigital-for-ac`** dari daftar.

**Langkah 2: Isi pengaturan project**

| Kolom | Isi |
| --- | --- |
| **Project name** | `nanangdigital-for-ac` (biasanya sudah terisi otomatis) |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` (bawaan, biarkan) |
| **Preview command** atau **Non-production branch deploy command** | biarkan bawaan |
| **Path** atau **Root directory** | biarkan kosong |

Klik **Save and Deploy** (atau **Deploy**), lalu tunggu 2 sampai 3 menit sampai statusnya **Success**.

Di log build harus ada baris ini:

```text
✓ Alamat website (SITE_URL): https://nanangdigital.web.id [sumber: domain utama di scripts/site-url.mjs]
```

Catatan:

* Sebaiknya nama project `nanangdigital-for-ac`, sama dengan file `wrangler.jsonc`. Kalau terlanjur memakai nama lain, Cloudflare tetap deploy memakai nama dari dashboard, lalu bisa membuat Pull Request otomatis untuk menyamakan nama. Kabari saya kalau itu terjadi.
* Versi Node.js sudah dikunci ke 22 lewat file `.nvmrc`, jadi tidak perlu diatur.

**Langkah 3: Pasang token rahasia**

1. Di project, buka **Settings** > **Variables and Secrets**, lalu klik **Add**.
2. Tambahkan variabel berikut. Pilih tipe **Secret** supaya isinya tersimpan sebagai rahasia.

| Nama | Tipe | Isi | Kapan perlu |
| --- | --- | --- | --- |
| `META_CAPI_ACCESS_TOKEN` | Secret | Token `EAA...` dari Meta Events Manager > Settings > Conversions API > Generate access token | Wajib supaya Meta CAPI aktif |
| `GEMINI_API_KEY` | Secret | API key dari [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Opsional. Tanpa ini, chat memakai jawaban bawaan |

3. Klik **Deploy** (atau **Save**). Token langsung aktif tanpa build ulang.

> Jangan pernah memberi awalan `VITE_` pada token atau API key, dan jangan menaruhnya di file kode. Dengan cara di atas, rahasia hanya tersimpan di server Cloudflare dan tidak pernah terkirim ke browser pengunjung.

### Cara B: Cloudflare Pages (cara lama)

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

5. Klik **Save and Deploy**.
6. Pasang token: **Settings** > **Variables and Secrets** > **Add**. Isi `META_CAPI_ACCESS_TOKEN` dan `GEMINI_API_KEY`, klik **Encrypt**, lalu **Save**.
7. Token baru aktif setelah deploy ulang. Buka tab **Deployments**, klik titik tiga (`...`) pada deployment paling atas, lalu pilih **Retry deployment**.

Di log build Pages akan muncul tulisan *"A wrangler.toml file was found but it does not appear to be valid ... Skipping file and continuing"*. Itu normal. File `wrangler.jsonc` memang khusus untuk Cara A, dan Pages tetap deploy seperti biasa.

### Cara C: Cloudflare Pages lewat upload manual (tanpa GitHub)

Pakai cara ini kalau menyambungkan GitHub terus gagal. Yang diupload **hanya 1 file**, yaitu `nanangdigital-siap-upload.zip`.

**Langkah 1: Unduh paket siap upload**

Unduh di sini: **[nanangdigital-siap-upload.zip](https://github.com/nanangsanjaya0896/Nanangdigital-for-ac/releases/download/siap-upload/nanangdigital-siap-upload.zip)**

* Tidak perlu diekstrak. Langsung upload file zip-nya.
* Paket ini dibuat ulang otomatis setiap kali website diperbarui, jadi link di atas selalu berisi versi terbaru.
* Isinya website yang sudah jadi: semua halaman, gambar, file tampilan, sitemap, halaman 404, aturan cache dan redirect, plus `_worker.js` yang menjalankan Asisten AI dan Meta CAPI.

**Langkah 2: Upload ke Cloudflare**

1. Buka **Workers & Pages** > **Create application**.
2. Gulir ke paling bawah, lalu klik link kecil **Looking to deploy Pages? Get started** (atau **Continue to Pages**).
3. Pilih **Drag and drop your files** (di sebagian tampilan **Upload assets**).
4. Isi **Project name** dengan `nanangdigital-for-ac`, lalu klik **Create project**.
5. Seret file `nanangdigital-siap-upload.zip` ke kotak upload. Tunggu sampai semua file selesai terunggah, lalu klik **Deploy site**.
6. Cek alamat yang muncul. Kalau berakhiran `.pages.dev`, berarti sudah benar. Kalau berakhiran `.workers.dev`, berarti yang terbuat Worker biasa (lewat tombol upload di halaman Workers), sehingga Asisten AI dan Meta CAPI tidak jalan penuh. Hapus project itu, lalu ulangi lewat link Pages di poin 2.

**Langkah 3: Pasang token rahasia**

1. Di project, buka **Settings** > **Variables and Secrets** > **Add**. Isi `META_CAPI_ACCESS_TOKEN` dan `GEMINI_API_KEY`, klik **Encrypt**, lalu **Save**.
2. Token baru aktif setelah upload ulang. Buka tab **Deployments** > **Create deployment**, pilih **Production**, upload lagi file zip yang sama, lalu klik **Save and Deploy**.

**Setiap ada perubahan website**

Unduh lagi file zip dari link di Langkah 1, lalu upload lewat **Deployments** > **Create deployment** seperti Langkah 3 poin 2.

Catatan:

* Project upload manual tidak bisa diubah menjadi project GitHub. Kalau nanti ingin update otomatis (Cara A atau B), buat project baru, lalu pindahkan domainnya.
* Domain `nanangdigital.web.id` dipasang dengan cara yang sama seperti Cara B (lihat Bagian 3).

### Cara D: Deploy otomatis lewat GitHub Actions (tanpa sambungan GitHub di Cloudflare)

Pakai cara ini kalau sambungan GitHub di Cloudflare terus gagal, tetapi Anda ingin website tetap ter-update otomatis. Di sini GitHub sendiri yang mengirim website ke Cloudflare memakai token. Hasilnya sama dengan Cara A (Workers), dan workflow-nya sudah disiapkan di repo (`.github/workflows/deploy-cloudflare.yml`).

**Langkah 1: Buat API token di Cloudflare**

1. Di dashboard Cloudflare, klik ikon profil di kanan atas, lalu pilih **My Profile** > **API Tokens**.
2. Klik **Create Token**, cari template **Edit Cloudflare Workers**, lalu klik **Use template**.
3. Di **Account Resources**, pilih akun Anda. Di **Zone Resources**, pilih **All zones**.
4. Klik **Continue to summary**, lalu **Create Token**.
5. Salin token yang muncul. Token hanya ditampilkan sekali. Jangan kirim token ini ke siapa pun, termasuk lewat chat.

**Langkah 2: Salin Account ID**

Buka **Workers & Pages**. Di panel kanan (**Account details**), salin **Account ID**.

**Langkah 3: Simpan keduanya di GitHub**

1. Buka repo **Nanangdigital-for-ac** di GitHub, lalu **Settings** > **Secrets and variables** > **Actions**.
2. Klik **New repository secret**. Isi **Name** `CLOUDFLARE_API_TOKEN` dan **Secret** dengan token dari Langkah 1, lalu klik **Add secret**.
3. Klik **New repository secret** lagi. Isi **Name** `CLOUDFLARE_ACCOUNT_ID` dan **Secret** dengan Account ID dari Langkah 2, lalu klik **Add secret**.

**Langkah 4: Jalankan deploy pertama**

1. Di repo GitHub, buka tab **Actions**, pilih **Deploy ke Cloudflare (otomatis)**, lalu klik **Run workflow** > **Run workflow**.
2. Tunggu sekitar 1 sampai 2 menit sampai muncul centang hijau. Website muncul di **Workers & Pages** dengan nama `nanangdigital-for-ac`.

Setelah itu, setiap perubahan website otomatis ter-deploy. Token rahasia website (`META_CAPI_ACCESS_TOKEN`, `GEMINI_API_KEY`) dipasang seperti Cara A Langkah 3, dan domain dipasang seperti Cara A di Bagian 3.

Catatan:

* Kalau sebelumnya sudah ada project bertanda **Missing git connection**, hapus project itu dulu (**Settings** > paling bawah > **Delete**), supaya hanya ada satu jalur deploy.
* Kalau log deploy meminta *"register a workers.dev subdomain"*, buka **Workers & Pages** sekali, lalu atur subdomain di panel **Account details**.

### Memperbaiki Missing git connection

Tanda merah **Missing git connection** artinya Cloudflare belum mendapat izin membaca repo GitHub Anda. Ini masalah sambungan akun, bukan kode website.

1. Buka **[github.com/settings/installations](https://github.com/settings/installations)** dengan akun GitHub `nanangsanjaya0896`.
2. Cari **Cloudflare Workers and Pages**, lalu klik **Configure**.
   * Kalau ada: di **Repository access**, pilih **All repositories**, lalu **Save**. Kalau setelah itu masih merah, gulir ke paling bawah dan klik **Uninstall**.
   * Kalau tidak ada: berarti izinnya belum pernah terpasang. Lanjut ke langkah 3.
3. Di Cloudflare, hapus project yang bertanda merah (**Settings** > paling bawah > **Delete**).
4. Buat ulang lewat **Create application** > **GitHub**. Kalau diminta, klik **Connect GitHub** atau **+ Add account**, pilih akun `nanangsanjaya0896`, pilih **All repositories**, lalu **Install & Authorize**.
5. Pilih repo `Nanangdigital-for-ac` dan isi pengaturan seperti Cara A Langkah 2.

Tips: pakai jendela penyamaran (incognito) dan izinkan pop-up. Satu akun GitHub sebaiknya hanya tersambung ke satu akun Cloudflare. Kalau masih gagal juga, kemungkinan sedang ada gangguan di sisi Cloudflare. Pakai Cara C atau Cara D.

### Cek website sudah jalan

Buka alamat sementara dari Cloudflare (ganti `ALAMAT`, misalnya `https://nanangdigital-for-ac.namaakun.workers.dev`). Setelah domain tersambung, cek lagi dengan `https://nanangdigital.web.id`.

| Alamat | Yang harus terlihat |
| --- | --- |
| `ALAMAT/` | Website NanangDigital |
| `ALAMAT/en/` | Otomatis pindah ke beranda (versi bahasa Inggris sudah dihapus) |
| `ALAMAT/api/meta-capi` | `"ready_for_live_capi": true` |
| `ALAMAT/api/ai-chat` | `"ai_enabled": true`, kalau `GEMINI_API_KEY` sudah diisi |
| `ALAMAT/halaman-asal` | Halaman 404 "Halaman tidak ditemukan" |

---

## Bagian 2: Sambungkan domain nanangdigital.web.id ke Cloudflare

Bagian ini boleh dikerjakan dari sekarang, tidak perlu menunggu deploy berhasil. Domain `.web.id` bisa dipasang di Cloudflare paket gratis.

Sebelum mulai, cek di MyDomaiNesia:

* Status domain sudah **Active**. Kalau DomaiNesia meminta upload KTP atau dokumen, selesaikan dulu.
* **DNSSEC tidak aktif**. Kalau aktif, matikan dulu. Kalau DNSSEC masih aktif, Cloudflare gagal memverifikasi domain.

**Langkah 1: Tambahkan domain di Cloudflare**

1. Di dashboard Cloudflare, buka menu kiri **Domains** > **Overview**, lalu klik **Add domain** (di sebagian tampilan **Onboard a domain** atau **Connect a domain**).
2. Ketik `nanangdigital.web.id` (tanpa `www`), lalu klik **Continue**.
3. Pilih paket **Free**, lalu lanjutkan.
4. Di halaman daftar DNS hasil scan, cukup klik **Continue** (atau **Continue to activation**). Domain baru, jadi daftarnya memang boleh kosong.
5. Cloudflare menampilkan **2 nameserver**, misalnya `ada.ns.cloudflare.com` dan `bob.ns.cloudflare.com`. Salin keduanya. Nama nameserver tiap akun berbeda, jadi pakai yang muncul di layar Anda.

**Langkah 2: Ganti nameserver di DomaiNesia**

1. Login di **[my.domainesia.com](https://my.domainesia.com)**.
2. Buka menu **Domains**, lalu klik `nanangdigital.web.id`.
3. Buka tab **Nameserver**, lalu pilih **Use Custom Nameserver**.
4. Hapus nameserver lama. Isi **Nameserver 1** dan **Nameserver 2** dengan 2 nameserver dari Cloudflare.
5. Klik **Change Nameserver**.

**Langkah 3: Tunggu sampai Active**

1. Kembali ke Cloudflare, lalu klik **I updated my nameservers** (atau **Check nameservers**).
2. Tunggu status domain berubah dari **Pending** menjadi **Active**. Biasanya 1 sampai 2 jam, paling lama 24 jam. Cloudflare mengirim email kalau sudah aktif.

---

## Bagian 3: Pasang domain ke website

Kerjakan setelah deploy di Bagian 1 berhasil **dan** domain di Bagian 2 sudah **Active**.

**Langkah 1: Tambahkan custom domain**

* **Kalau memakai Cara A (Workers):** buka project `nanangdigital-for-ac` > **Settings** > **Domains & Routes** > **Add** > **Custom domain**. Ketik `nanangdigital.web.id`, lalu klik **Add domain**. Ulangi untuk `www.nanangdigital.web.id`.
* **Kalau memakai Cara B atau Cara C (Pages):** buka project > **Custom domains** > **Set up a domain**. Ketik `nanangdigital.web.id`, klik **Continue**, lalu **Activate domain**. Ulangi untuk `www.nanangdigital.web.id`.

Cloudflare otomatis membuat pengaturan DNS dan sertifikat HTTPS. Tunggu beberapa menit sampai statusnya **Active**, lalu buka `https://nanangdigital.web.id`.

**Langkah 2: Arahkan www ke alamat utama (disarankan)**

Supaya Google hanya melihat satu alamat:

1. Di Cloudflare, buka **Domains** > `nanangdigital.web.id` > **Rules** > **Redirect Rules**.
2. Klik **Create rule**, lalu pilih template **Redirect from WWW to root**.
3. Klik **Deploy**.

Setelah itu `www.nanangdigital.web.id` otomatis pindah ke `nanangdigital.web.id`.

**Langkah 3: Daftarkan ke Google Search Console**

1. Buka **[search.google.com/search-console](https://search.google.com/search-console)**, klik **Tambahkan properti**, pilih **Awalan URL**, lalu ketik `https://nanangdigital.web.id/`.
2. Pilih metode **Tag HTML**. Website ini sudah memasang tag verifikasi akun Google Anda (`cUtDIR_P8p7d7c7WhBW26zwoCDNGvTZuHAcGcS9X-B0`), jadi biasanya cukup klik **Verifikasi**.
3. Kalau Google menampilkan kode yang berbeda, kirim kodenya ke saya supaya dipasang di website. Bisa juga diisi sendiri ke variabel `VITE_GSC_VERIFICATION`: di Workers lewat **Settings** > **Build** > **Variables and secrets** lalu **Retry build**, di Pages lewat **Variables and Secrets** lalu **Retry deployment**.
4. Setelah terverifikasi, buka menu **Peta Situs**, ketik `sitemap.xml`, lalu klik **Kirim**.

Panduan lengkap Search Console dan GA4 ada di [`PANDUAN-GSC-DAN-GA4.md`](./PANDUAN-GSC-DAN-GA4.md).

**Langkah 4: Perbarui link di tempat lain**

Ganti link website ke `https://nanangdigital.web.id` di bio Instagram, Facebook Page, WhatsApp Business, dan iklan Meta.

---

## Kalau ada masalah

| Gejala | Solusi |
| --- | --- |
| Tidak ada pilihan **Pages** | Normal, tampilan baru Cloudflare. Pakai Cara A |
| Tanda merah **Missing git connection** | Cloudflare belum mendapat izin membaca GitHub. Ikuti [Memperbaiki Missing git connection](#memperbaiki-missing-git-connection). Kalau tetap gagal, pakai Cara C atau Cara D |
| Alamat `.pages.dev` menampilkan **Error 522** | Project sudah dibuat, tetapi belum ada deploy yang berhasil. Buka project > **Deployments**. Kalau ada deploy berstatus **Failed**, kirim screenshot log build-nya ke saya. Kalau belum ada deploy sama sekali, deploy berjalan otomatis saat ada perubahan berikutnya di branch `main` (kabari saya supaya saya picu) |
| Ada dua project untuk website yang sama (misalnya satu Pages dan satu Workers) | Pakai satu saja. Hapus yang tidak dipakai (**Settings** > paling bawah > **Delete**) supaya domain hanya terpasang di satu tempat |
| Workflow **Deploy ke Cloudflare (otomatis)** hanya menulis "Deploy otomatis belum aktif" | Normal selama secret `CLOUDFLARE_API_TOKEN` dan `CLOUDFLARE_ACCOUNT_ID` belum diisi (Cara D) |
| Website tampil kosong, putih, atau error setelah upload manual | Kemungkinan yang diupload file kode dari GitHub. Upload ulang memakai file `nanangdigital-siap-upload.zip` (Cara C) |
| Ada file bertanda merah saat upload manual | Upload ulang seluruh file zip lewat **Create deployment** |
| Repo `Nanangdigital-for-ac` tidak muncul di daftar | Di GitHub buka **Settings** > **Applications** > **Installed GitHub Apps** > **Cloudflare Workers and Pages** > **Configure**. Di **Repository access**, pilih **All repositories** atau tambahkan repo ini, lalu **Save**. Kembali ke Cloudflare dan muat ulang halaman |
| Error *"Missing entry-point to Worker script or to assets directory"* | Build memakai kode lama yang belum punya `wrangler.jsonc`. Pastikan branch `main` sudah terbaru, lalu **Retry build** |
| Cloudflare membuat Pull Request otomatis berisi konfigurasi Workers | Jangan di-merge dulu. Kabari saya supaya dicek |
| Error *"npm ci can only install packages when your package.json and package-lock.json ... are in sync"* | Kirim screenshot log ke saya |
| Build sukses tapi `/api/meta-capi` tidak ditemukan | Pastikan Deploy command `npx wrangler deploy`, bukan `npx wrangler pages deploy` |
| `/api/meta-capi` masih `"ready_for_live_capi": false` | Token belum diisi sebagai Secret. Di Cara B, jangan lupa **Retry deployment** setelah mengisi |
| `/api/ai-chat` masih `"ai_enabled": false` padahal key sudah diisi | Cek ejaan `GEMINI_API_KEY`. Pengunjung dari Inggris dan Eropa memang dijawab mode bawaan selama memakai free tier Gemini |
| Domain masih **Pending** di Cloudflare lebih dari 24 jam | Cek lagi 2 nameserver di DomaiNesia (harus sama persis dengan yang di Cloudflare) dan pastikan DNSSEC tidak aktif |
| `nanangdigital.web.id` tidak bisa ditambahkan sebagai custom domain | Domain harus sudah **Active** di Cloudflare, di akun yang sama dengan project website |
| Muncul build untuk branch selain `main` (misalnya branch revisi) | Itu build preview dan tidak mengubah website utama. Kalau tidak perlu, matikan di **Settings** > **Build** > **Branch control** dengan menonaktifkan build untuk non-production branch |

## Batas paket gratis

* **Halaman website** (HTML, gambar, JS, CSS): gratis tanpa batas, di Workers maupun Pages.
* **Fungsi server** `/api/ai-chat` dan `/api/meta-capi`: gratis 100.000 request per hari. Fungsi hanya dipanggil saat chat dipakai dan saat event Meta dikirim, jadi pemakaiannya jauh di bawah batas.
* **Build:** Workers 3.000 menit per bulan (satu build sekitar 1 sampai 2 menit). Pages 500 build per bulan.
* **Domain:** DNS dan sertifikat HTTPS dari Cloudflare gratis. Yang dibayar hanya perpanjangan domain tahunan di DomaiNesia.

## Catatan teknis

* **Alamat website** diatur di `scripts/site-url.mjs` lewat `PRIMARY_SITE_URL` (`https://nanangdigital.web.id`). Kalau suatu hari pindah domain, cukup ganti di sana lalu deploy ulang. Urutan sumbernya:
  1. Variabel `SITE_URL`, kalau diisi (hanya untuk keperluan khusus).
  2. `PRIMARY_SITE_URL`.
  3. Kalau `PRIMARY_SITE_URL` dikosongkan: alamat dari Cloudflare Pages (`CF_PAGES_URL`) atau Vercel, lalu cadangan `https://nanangdigital.pages.dev`.
* **`wrangler.jsonc`**: konfigurasi Cara A.
  * Halaman dari folder `dist` disajikan langsung dari CDN.
  * Hanya `/api/*` yang menjalankan Worker (`run_worker_first`).
  * Alamat yang tidak ada membalas `404.html` dengan status 404 (`not_found_handling`).
* **`worker/index.js`**: Worker untuk `/api/ai-chat` dan `/api/meta-capi`. Isinya memanggil fungsi yang sama dengan Pages Functions di `functions/api/*.js`, jadi hasilnya identik di kedua cara.
* **`functions/api/*.js`**: fungsi server untuk Cara B. Logika intinya ada di `server/`, dipakai bersama oleh Workers, Pages, Vercel (`api/*.js`), dan Live Preview lokal.
* **`public/_headers`** (cache file) dan **`public/_redirects`** (alamat lama `/en` ke beranda) dibaca oleh Workers maupun Pages.
* **`public/_routes.json`** hanya untuk Pages. Di Workers file ini tidak ikut diunggah karena tercantum di `public/.assetsignore`.
* Asisten AI dan Meta CAPI otomatis berjalan di domain mana pun (`nanangdigital.web.id`, `www`, maupun alamat sementara), tanpa pengaturan tambahan.
* **Paket upload manual (Cara C)**: `npm run build:upload` membuat `nanangdigital-siap-upload.zip` lewat `scripts/package-direct-upload.mjs`.
  * Isinya folder `dist` ditambah `_worker.js`, hasil bundel `worker/pages-advanced.js`. Upload manual di dashboard tidak bisa membawa folder `functions/`, tetapi bisa membawa `_worker.js`.
  * Workflow `.github/workflows/paket-upload-cloudflare.yml` membuat ulang paket ini setiap kali `main` berubah dan memasangnya di rilis `siap-upload`.
* **Deploy otomatis lewat GitHub Actions (Cara D)**: `.github/workflows/deploy-cloudflare.yml` menjalankan `npm run build` lalu `npx wrangler deploy` setiap kali `main` berubah. Workflow ini hanya aktif kalau secret `CLOUDFLARE_API_TOKEN` dan `CLOUDFLARE_ACCOUNT_ID` sudah diisi.
* **Tes di komputer sendiri** (meniru Cloudflare Workers): `npm run build`, lalu `npx wrangler dev`.
* Versi Wrangler dikunci di `package.json`, jadi build di Cloudflare selalu memakai versi yang sama dengan yang sudah dites.
