# Panduan Menghubungkan Google Search Console (GSC) & Google Analytics 4 (GA4)

Website **`https://nanangdigital-navy.vercel.app/`** sudah disiapkan agar dapat terhubung ke **Google Search Console** dan **Google Analytics 4 (GA4)** hanya dengan memasukkan kodenya di menu **Environment Variables** pada dashboard Vercel, tanpa menurunkan skor hijau PageSpeed Insights sedikit pun.

---

## Bagian 1: Menghubungkan Google Search Console (GSC)

1. Buka **https://search.google.com/search-console** dan login memakai akun Google Anda.
2. Pada pilihan jenis properti, pilih kotak sebelah kanan yaitu **Awalan URL (URL Prefix)** (jangan pilih *Domain*, karena saat ini masih memakai subdomain bawaan `.vercel.app`).
3. Ketik alamat lengkap:
   ```text
   https://nanangdigital-navy.vercel.app/
   ```
   Lalu klik **Terus / Continue**.
4. Akan muncul jendela **Verifikasi kepemilikan**. Scroll sedikit ke bagian **Metode verifikasi lainnya**, lalu klik panah pada pilihan **Tag HTML (HTML tag)**.
5. Salin kode verifikasi yang diberikan Google (Anda boleh menyalin satu baris `<meta name="google-site-verification" content="..." />` utuh ataupun hanya isi kodenya saja, sistem otomatis mengenali keduanya).
   * *Catatan: Jangan tutup halaman Google Search Console dulu dan jangan klik Verifikasi sebelum langkah Vercel di Bagian 3 selesai.*

---

## Bagian 2: Membuat & Mengambil Kode Google Analytics 4 (GA4)

1. Buka **https://analytics.google.com/** dan klik **Mulai mengukur (Start measuring)** / buat akun baru:
   * **Nama Akun:** `NanangDigital`
   * **Nama Properti:** `Website NanangDigital AC`
   * **Zona Waktu Pelaporan:** `Indonesia` (`GMT+07:00`) & **Mata Uang:** `Indonesian Rupiah (IDR)`
2. Pada langkah pengumpulan data, pilih platform **Web**.
3. Isi detail aliran data (*Data Stream*):
   * **URL Situs:** `nanangdigital-navy.vercel.app` (pastikan pilihan di depannya `https://`)
   * **Nama Aliran:** `LP NanangDigital Utama`
   * Klik **Buat & lanjutkan**.
4. Di pojok kanan atas halaman **Detail aliran web (Web stream details)**, salin **ID Pengukuran (Measurement ID)** yang diawali huruf **`G-`** (contoh: `G-9ABC123DEF`).

---

## Bagian 3: Memasang Keduanya Sekaligus di Dashboard Vercel

1. Buka dashboard project Anda di **Vercel** -> klik tab **Settings** -> klik menu **Environment Variables** di sebelah kiri.
2. Tambahkan 2 variabel baru berikut (biarkan centang *Production*, *Preview*, *Development* aktif):
   * **Key 1:** `VITE_GSC_VERIFICATION`
     * **Value:** Tempel kode dari Google Search Console tadi -> klik **Save**.
   * **Key 2:** `VITE_GA_MEASUREMENT_ID`
     * **Value:** Tempel ID Pengukuran GA4 tadi (contoh: `G-9ABC123DEF`) -> klik **Save**.
3. Agar Vercel menerapkan variabel baru tersebut ke website live:
   * Klik tab **Deployments** di bagian atas dashboard Vercel.
   * Klik ikon titik tiga (`...`) pada deployment paling atas -> pilih **Redeploy** -> klik tombol **Redeploy**.
4. Tunggu sekitar **30 sampai 45 detik** hingga status berubah menjadi **Ready**.

---

## Bagian 4: Klik Verifikasi & Submit Sitemap di Google Search Console

Setelah redeploy Vercel selesai (**Ready**):

1. Kembali ke tab **Google Search Console** tadi -> klik tombol **Verifikasi (Verify)** pada bagian **Tag HTML**. Status akan langsung berubah hijau (**Kepemilikan diverifikasi**).
2. Klik **Buka Properti (Go to Property)**.
3. Di menu sebelah kiri Google Search Console, klik **Peta Situs (Sitemaps)**.
4. Pada kolom *Tambahkan peta situs baru*, ketik:
   ```text
   sitemap.xml
   ```
   Lalu klik **Kirim (Submit)**. Statusnya akan tertulis **Sukses**.
5. *(Tips supaya cepat muncul di Google)*: Klik kolom pencarian paling atas (**Inspeksi URL apa pun...**), tempel `https://nanangdigital-navy.vercel.app/` -> tekan Enter -> klik **Minta Pengindeksan (Request Indexing)**.

---

## Data Event Otomatis yang Masuk ke Google Analytics 4

Begitu `VITE_GA_MEASUREMENT_ID` aktif, website otomatis mengirimkan 3 sinyal penting ke GA4 Anda:
1. **`page_view`**: Setiap pengunjung yang membuka landing page.
2. **`whatsapp_modal_opened`**: Setiap pengunjung yang menekan tombol CTA WhatsApp dan membuka form singkat (lengkap dengan info tombol mana yang diklik lewat parameter `cta_source` dan paket yang diminati lewat `cta_topic`).
3. **`generate_lead`**: Setiap calon klien yang benar-benar mengisi Nama, Nomor WA, serta Kota/Kecamatan lalu lanjut ke chat WhatsApp. Anda bisa menandai event `generate_lead` ini sebagai **Peristiwa Penting (Key Event)** di menu *Admin > Events* GA4.
