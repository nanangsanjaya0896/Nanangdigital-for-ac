# Panduan Aktivasi Meta Pixel (`2971268586402489`) + Conversions API (CAPI) di Cloudflare

Nomor **Meta Pixel / Dataset ID (`2971268586402489`)** sudah **ditanamkan langsung** di kode browser (`src/utils/tracking.ts` & `index.html`) maupun di kode server (`server/meta-capi-core.js`, dijalankan oleh `worker/index.js` di Cloudflare Workers atau `functions/api/meta-capi.js` di Cloudflare Pages).

Artinya, untuk menyalakan **Meta Pixel + Meta CAPI** secara penuh, Anda hanya perlu menempel **1 token rahasia (`META_CAPI_ACCESS_TOKEN`)** di dashboard Cloudflare.

---

## Langkah 1: Tempel token CAPI di dashboard Cloudflare (1 menit)

1. Buka **[dash.cloudflare.com](https://dash.cloudflare.com)**, masuk ke **Workers & Pages**, lalu pilih project website (misalnya `nanangdigital-for-ac`).
2. Klik **Settings** > **Variables and Secrets** > **Add**, lalu isi:
   * **Variable name:** `META_CAPI_ACCESS_TOKEN`
   * **Value:** *(tempel kode panjang `EAA...` dari Meta Events Manager > Settings > Conversions API > Generate access token)*
3. *(Opsional, kalau ingin tes dulu di tab Test Events Meta)*:
   * Tambahkan sementara variabel `META_TEST_EVENT_CODE` berisi kode tes dari tab *Test Events* (contoh: `TEST51829`).
4. Simpan sesuai jenis project:
   * **Workers** (Cara A di panduan deploy): pilih tipe **Secret** untuk token, lalu klik **Deploy**. Langsung aktif.
   * **Pages** (Cara B): klik **Encrypt**, lalu **Save**. Setelah itu buka tab **Deployments**, klik titik tiga (`...`) pada deployment paling atas, lalu pilih **Retry deployment**.

---

## Langkah 2: Cek apakah server CAPI sudah aktif

Setelah token tersimpan, buka alamat ini di browser HP atau laptop. Kalau domain belum tersambung, ganti `https://nanangdigital.web.id` dengan alamat sementara dari Cloudflare (misalnya `https://nanangdigital-for-ac.namaakun.workers.dev`):

```text
https://nanangdigital.web.id/api/meta-capi
```

Kalau token sudah terpasang, akan tampil status berikut (isi token tidak pernah ditampilkan):

```json
{
  "ok": true,
  "service": "NanangDigital Meta Conversions API",
  "dataset_id": "2971268586402489",
  "capi_token_configured": true,
  "test_event_mode": false,
  "ready_for_live_capi": true
}
```

Kalau tertulis `"ready_for_live_capi": true`, berarti **Meta Pixel di browser + CAPI di server sudah menyala penuh**.

*(Penting: kalau tadi Anda mengisi `META_TEST_EVENT_CODE` untuk tes, hapus variabel tersebut sebelum menyalakan iklan sungguhan. Di Workers cukup hapus lalu klik **Deploy**. Di Pages, setelah dihapus lakukan **Retry deployment** sekali lagi.)*

---

## Data yang dikirim server ke Meta

Setiap event `Contact` dan `Lead` dikirim dua kali dengan `event_id` yang sama, dari Pixel di browser dan dari server, lalu Meta menggabungkannya (deduplikasi). Data dari server:

* **Hash SHA-256 dari browser:** nomor WhatsApp (`ph`, juga dipakai sebagai `external_id`), nama depan (`fn`), nama belakang (`ln`), dan kota (`ct`). Data mentah tidak pernah dikirim; nilai yang bukan hash otomatis dibuang.
* **Negara (`country`):** dari form di website selalu `id` (Indonesia). Kalau data negara dari browser tidak ada, server memakai lokasi IP pengunjung yang diberikan Cloudflare.
* **Cookie klik iklan `fbc` dan `fbp`:** penting supaya Meta tahu lead berasal dari iklan yang mana.
* **IP dan user agent pengunjung.**

Semakin lengkap data ini, semakin tinggi **Event Match Quality** di Events Manager dan semakin akurat optimasi iklan Meta.

> Website juga tetap bisa dideploy ke Vercel (`api/meta-capi.js`). Caranya sama: isi `META_CAPI_ACCESS_TOKEN` di Vercel > Settings > Environment Variables, lalu Redeploy.
