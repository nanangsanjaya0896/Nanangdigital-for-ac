# Panduan Google Search Console (GSC) & Google Analytics 4 (GA4)

Website NanangDigital di Cloudflare sudah membawa:

* **Tag verifikasi Google Search Console** milik akun Google Anda (`cUtDIR_P8p7d7c7WhBW26zwoCDNGvTZuHAcGcS9X-B0`) di semua 6 halaman statis.
* **Google Analytics 4 (`G-JY9N81NCQE`)** yang dimuat ringan tanpa menurunkan skor PageSpeed.
* **`sitemap.xml` dan `robots.txt`** yang otomatis mengikuti alamat website aktif.

Di panduan ini, `ALAMAT` berarti alamat website Anda, misalnya `https://nanangdigital-for-ac.namaakun.workers.dev` (Cloudflare Workers), `https://nanangdigital-for-ac.pages.dev` (Cloudflare Pages), atau domain sendiri. Pastikan `SITE_URL` sudah sesuai dengan alamat itu, lihat [`PANDUAN-DEPLOY-CLOUDFLARE.md`](./PANDUAN-DEPLOY-CLOUDFLARE.md).

---

## Bagian 1: Verifikasi Google Search Console

1. Buka **[search.google.com/search-console](https://search.google.com/search-console)** dan login dengan **akun Google yang sama** seperti sebelumnya.
2. Klik **Tambahkan properti**, lalu pilih kotak kanan **Awalan URL (URL prefix)**. Jangan pilih *Domain*, karena subdomain `.workers.dev` dan `.pages.dev` bukan milik Anda sendiri.
3. Ketik alamat lengkap (diakhiri garis miring) lalu klik **Lanjutkan**:
   ```text
   ALAMAT/
   ```
4. Di jendela verifikasi, buka **Metode verifikasi lainnya** > **Tag HTML**.
5. Bandingkan kode yang ditampilkan Google dengan kode yang sudah terpasang di website:
   * **Sama** (`cUtDIR_P8p7d7c7WhBW26zwoCDNGvTZuHAcGcS9X-B0`): langsung klik **Verifikasi**. Google memakai kode yang sama untuk semua properti di satu akun, jadi biasanya ini yang terjadi.
   * **Berbeda**: salin kodenya (boleh satu baris `<meta ... />` utuh atau isinya saja), lalu:
     1. **Workers:** project > **Settings** > **Build** > **Variables and secrets** > **Add**, nama `VITE_GSC_VERIFICATION`, isi kode tadi, **Save**. Lalu **Deployments** > **View build history** > titik tiga (`...`) pada build teratas > **Retry build**.
     2. **Pages:** project > **Settings** > **Variables and Secrets** > **Add**, nama `VITE_GSC_VERIFICATION`, isi kode tadi (tanpa Encrypt), **Save**. Lalu tab **Deployments** > titik tiga (`...`) pada deployment teratas > **Retry deployment**.
     3. Setelah status **Success**, kembali ke Search Console dan klik **Verifikasi**.

## Bagian 2: Kirim sitemap & minta pengindeksan

1. Di menu kiri Search Console, klik **Peta Situs (Sitemaps)**.
2. Di kolom *Tambahkan peta situs baru*, ketik `sitemap.xml`, lalu klik **Kirim**. Status akan tertulis **Sukses** (6 halaman).
3. *(Supaya lebih cepat muncul di Google)*: klik kolom **Inspeksi URL** di bagian atas, tempel `ALAMAT/`, tekan Enter, lalu klik **Minta Pengindeksan**. Ulangi untuk `ALAMAT/panduan/`.

---

## Bagian 3: Google Analytics 4

ID pengukuran **`G-JY9N81NCQE`** sudah tertanam di kode (`index.html` dan `src/utils/tracking.ts`), jadi data langsung masuk ke properti GA4 Anda begitu website live. Tidak perlu mengisi Environment Variable apa pun.

Opsional, supaya rapi: di GA4 buka **Admin** > **Aliran data (Data streams)** > pilih aliran web, lalu ubah **URL aliran** menjadi alamat website Anda. Ini hanya label; pengumpulan data tetap jalan tanpa diubah.

> Kalau suatu hari ingin memakai ID GA4 yang lain, ID tersebut perlu diganti di kode (`index.html` dan `src/utils/tracking.ts`).

### Event yang otomatis masuk ke GA4

1. **`page_view`**: setiap pengunjung yang membuka halaman.
2. **`whatsapp_modal_open`**: pengunjung menekan tombol WhatsApp dan form singkat terbuka (parameter `lead_source` = tombol yang diklik, `plan_interest` = paket yang diminati, `language`).
3. **`whatsapp_click_direct`**: pengunjung memilih langsung ke WhatsApp tanpa mengisi form.
4. **`generate_lead`**: calon klien mengisi Nama, Nomor WA, dan Kota lalu lanjut ke WhatsApp (lengkap dengan `currency` IDR dan `value`). Tandai event ini sebagai **Peristiwa Penting (Key Event)** di **Admin** > **Events**.
5. **`ai_chat_open`, `ai_chat_message`, `ai_chat_reset`**: aktivitas Live AI Chat (isi percakapan tidak pernah dikirim).
