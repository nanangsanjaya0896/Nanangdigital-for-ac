# Panduan Pasang Meta Pixel + Conversions API (CAPI) di Vercel

Seluruh kode **Meta Pixel (Browser) + Meta Conversions API / CAPI (Server) + Form Singkat Pra-WhatsApp** sudah terpasang otomatis di project ini khusus untuk Landing Page **NanangDigital**.

Kamu **tidak perlu ubah kode apa pun lagi**. Saat siap menjalankan iklan Meta Ads, cukup ikuti 4 langkah singkat berikut:

---

## Langkah 1: Ambil Pixel ID & Access Token di Meta Events Manager
1. Buka **[business.facebook.com](https://business.facebook.com)** lalu masuk ke menu **Events Manager (Pengelola Peristiwa)**.
2. Pilih menu **Data Sources (Sumber Data)** lalu klik Dataset / Pixel milik NanangDigital (atau klik **Connect Data > Web** jika baru pertama kali membuat).
3. Masuk ke tab **Settings (Pengaturan)**:
   - Salin **Dataset ID / Pixel ID** (angka 15 sampai 16 digit).
   - Scroll ke bawah ke bagian **Conversions API > Set up direct integration**, klik **Generate access token**, lalu salin token panjang yang muncul (dimulai dengan huruf `EAA...`).

---

## Langkah 2: Deploy Project ke Vercel & Isi Environment Variables
1. Login ke **[vercel.com](https://vercel.com)** menggunakan akun GitHub kamu, lalu pilih repository **`Nanangdigital-for-ac`**.
2. Sebelum klik **Deploy** (atau lewat menu **Project Settings > Environment Variables**), tambahkan 3 variabel ini:

| Nama Variabel | Isi dengan |
| :--- | :--- |
| `VITE_META_PIXEL_ID` | Angka Dataset / Pixel ID 15-16 digit kamu |
| `META_PIXEL_ID` | Angka Dataset / Pixel ID yang sama |
| `META_CAPI_ACCESS_TOKEN` | Token rahasia `EAA...` dari Langkah 1 |

*(Opsional saat ngetes pertama kali)*:
- Buka tab **Test Events** di Meta Events Manager, salin kode tes (contoh: `TEST51829`), lalu isi sementara ke variabel `META_TEST_EVENT_CODE` di Vercel dan klik **Redeploy**.

---

## Langkah 3: Cek Apakah Deduplication Sudah Jalan (5 Menit)
1. Buka tab **Test Events** di Meta Events Manager.
2. Buka link website Vercel kamu di HP atau laptop:
   - Akan muncul **`PageView`** dari Browser & Server yang otomatis digabung menjadi **Deduplicated**.
3. Klik salah satu tombol WhatsApp di website, isi **Nama**, **Nomor WA**, dan **Kota**, lalu klik **Lanjut Chat ke WhatsApp**:
   - Akan muncul **`Lead`** dengan status **Deduplicated** lengkap dengan data terenkripsi SHA-256 (`Phone`, `First Name`, `City`, `Country`, `IP`, `User Agent`, `fbp`, `fbc`).
4. Kalau sudah muncul rapi, **hapus nilai `META_TEST_EVENT_CODE`** di Vercel lalu **Redeploy** sekali lagi supaya siap dipakai kampanye iklan asli.

---

## Langkah 4: Setting Kampanye di Meta Ads Manager
- Saat membuat kampanye iklan di Meta Ads Manager:
  - Pilih objektif **Leads (Prospek)**.
  - Pilih lokasi konversi **Website**.
  - Pilih Dataset / Pixel NanangDigital dan set **Performance Goal: Maximize number of conversions** dengan Conversion Event: **`Lead`**.
