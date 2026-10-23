# Panduan Aktivasi Meta Pixel (`2971268586402489`) + Conversions API (CAPI) di Vercel

Nomor **Meta Pixel / Dataset ID (`2971268586402489`)** sudah **ditanamkan langsung secara otomatis** di kode Browser (`src/utils/tracking.ts` & `index.html`) maupun di kode Server (`api/meta-capi.js`).

Artinya, untuk menyalakan **Meta Pixel + Meta CAPI** secara penuh 100%, Anda hanya tinggal menempel **1 baris token rahasia (`META_CAPI_ACCESS_TOKEN`)** di dashboard Vercel!

---

## Langkah 1: Tempel Token CAPI di Dashboard Vercel (1 Menit)
1. Buka dashboard project **`nanangdigital-navy`** di **[vercel.com](https://vercel.com)** -> klik tab **Settings** -> menu **Environment Variables**.
2. Tambahkan **1 variabel ini saja**:
   * **Key:** `META_CAPI_ACCESS_TOKEN`
   * **Value:** *(Tempel kode panjang `EAA...` dari Meta Events Manager > Settings > Conversions API > Generate access token)*
   * Klik **Save**.
3. *(Opsional jika ingin tes live di tab Test Events dulu)*:
   * Tambahkan sementara **Key:** `META_TEST_EVENT_CODE` dengan **Value** kode tes dari tab *Test Events* Meta (contoh: `TEST51829`) -> klik **Save**.
4. Masuk ke tab **Deployments** di Vercel -> klik titik tiga (`...`) pada deployment paling atas -> pilih **Redeploy** -> klik **Redeploy**.

---

## Langkah 2: Cara Cek 1 Detik Apakah Server CAPI Sudah Aktif!
Begitu status deploy di Vercel bertuliskan **Ready**, cukup buka alamat ini di browser HP atau laptop Anda:
```text
https://nanangdigital-navy.vercel.app/api/meta-capi
```
Jika pemasangan token berhasil, layar akan menampilkan status aman berikut (tanpa membocorkan isi token Anda):
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
Kalau tertulis `"ready_for_live_capi": true`, berarti **Meta Pixel Browser + Server CAPI Anda sudah 100% menyala penuh!**

*(Catatan penting: Jika tadi Anda sempat mengisi `META_TEST_EVENT_CODE` untuk ngetes di tab Test Events, jangan lupa hapus variabel `META_TEST_EVENT_CODE` dan Redeploy sekali lagi sebelum menyalakan kampanye iklan sungguhan).*
