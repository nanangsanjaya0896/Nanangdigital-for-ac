# Panduan Live AI Chat (Asisten AI NanangDigital)

Tombol **Tanya Asisten AI** muncul di pojok kanan bawah semua halaman (`/`, `/panduan/`, dan artikel). Pengunjung bisa bertanya soal paket, harga, lama pengerjaan, pembayaran, revisi, sampai iklan Meta, lalu dilanjutkan ke WhatsApp lewat form kenalan yang sudah ada (tracking Meta Pixel + CAPI dan GA4 tetap jalan).

Chat memakai Bahasa Indonesia dengan harga Rupiah. Jawaban bawaan selalu berbahasa Indonesia. AI generatif juga menjawab dalam Bahasa Indonesia, kecuali pengunjung jelas menulis dalam bahasa lain, dan harga tidak pernah dikonversi ke mata uang lain.

Chat ini punya **dua mode** dan selalu menjawab, tidak pernah error di depan pengunjung:

| Mode | Kapan aktif | Cara menjawab |
| --- | --- | --- |
| **Jawaban bawaan** | API key belum dipasang, kuota AI habis, atau koneksi AI gagal | Instan, dari data website (paket, harga, FAQ, alur kerja, bonus) |
| **AI generatif (Gemini)** | Setelah `GEMINI_API_KEY` dipasang di dashboard Cloudflare | Bahasa natural, bisa menjawab pertanyaan bebas, tetap hanya memakai fakta dari website |

---

## Langkah 1: Ambil API key Gemini gratis (2 menit)

1. Buka **[aistudio.google.com/apikey](https://aistudio.google.com/apikey)** lalu login dengan akun Google Anda.
2. Klik **Create API key**, lalu salin kode yang muncul.

## Langkah 2: Tempel di dashboard Cloudflare (1 menit)

1. Buka **[dash.cloudflare.com](https://dash.cloudflare.com)**, masuk ke **Workers & Pages**, lalu pilih project website.
2. Klik **Settings** > **Variables and Secrets** > **Add**, lalu isi:
   * **Variable name:** `GEMINI_API_KEY`
   * **Value:** *(tempel API key dari Langkah 1)*
3. Simpan sesuai jenis project:
   * **Workers** (Cara A di panduan deploy): pilih tipe **Secret**, lalu klik **Deploy**. Langsung aktif.
   * **Pages** (Cara B): klik **Encrypt**, lalu **Save**. Setelah itu buka tab **Deployments**, klik titik tiga (`...`) pada deployment paling atas, lalu pilih **Retry deployment**.

> Jangan pernah menulis API key dengan awalan `VITE_` dan jangan menaruhnya di file kode. Dengan cara di atas, API key hanya tersimpan di server Cloudflare dan tidak pernah terkirim ke browser pengunjung.
>
> Kalau website dideploy ke Vercel, caranya sama: isi `GEMINI_API_KEY` di Vercel > Settings > Environment Variables, lalu Redeploy.

## Langkah 3: Cek apakah AI sudah aktif

Buka alamat berikut di browser. Ganti `ALAMAT` dengan alamat website Anda, misalnya `https://nanangdigital-for-ac.namaakun.workers.dev`:

```text
ALAMAT/api/ai-chat
```

Kalau berhasil, akan tampil seperti ini:

```json
{
  "ok": true,
  "service": "NanangDigital Live AI Chat",
  "ai_configured": true,
  "ai_enabled": true,
  "provider": "gemini",
  "model": "gemini-3.5-flash-lite"
}
```

`"ai_enabled": true` artinya chat sudah dijawab AI generatif.

---

## Penting: aturan free tier Google Gemini

1. **Isi chat di free tier boleh dipakai Google** untuk meningkatkan produknya dan bisa dibaca peninjau manusia. Karena itu, nomor HP dan email yang diketik pengunjung **otomatis disembunyikan** sebelum dikirim ke Google, dan asisten diatur untuk tidak pernah meminta data pribadi.
2. **Free tier tidak boleh melayani pengunjung dari Uni Eropa/EEA, Swiss, dan Inggris.** Pengunjung dari negara tersebut otomatis dijawab mode jawaban bawaan. Kalau ingin mereka juga dilayani AI:
   * Aktifkan billing di Google AI Studio.
   * Tambahkan `GEMINI_PAID_TIER` dengan nilai `true` di dashboard Cloudflare (Settings > Variables and Secrets, tipe Text). Di Pages, lanjutkan dengan **Retry deployment**.
   * Perkiraan biaya model bawaan sekitar US$2 per 1.000 pesan (cek harga terbaru di halaman pricing Gemini API).
3. **Kuota free tier terbatas per hari.** Kalau kuota model utama habis, chat otomatis mencoba model cadangan (`gemini-flash-lite-latest`, lalu `gemini-flash-latest`), dan kalau semuanya sibuk, pindah ke jawaban bawaan.

---

## Mengubah isi jawaban

Semua fakta yang dipakai AI diambil langsung dari data website:

* Paket dan harga: `src/data/plans.ts`
* FAQ: `src/data/faq.ts`
* Alur kerja: `src/data/process.ts`
* Bonus: `src/data/bonuses.ts`
* Layanan: `src/data/services.ts`

Setelah data diubah, jalankan `npm run build`. Perintah itu otomatis memperbarui `server/chat-knowledge.generated.js` (basis pengetahuan untuk server). Commit file tersebut bersama perubahan data supaya jawaban AI selalu sama dengan isi website.

Aturan perilaku asisten (gaya bahasa, larangan mengarang harga, larangan menjanjikan saldo iklan gratis, dan sebagainya) ada di fungsi `buildSystemPrompt` dalam `server/ai-chat-core.js`. File itu dipakai bersama oleh Cloudflare Workers (`worker/index.js`), Cloudflare Pages (`functions/api/ai-chat.js`), adapter Vercel (`api/ai-chat.js`), dan Live Preview lokal.

---

## Pengaturan opsional (Variables and Secrets)

| Key | Isi | Fungsi |
| --- | --- | --- |
| `GEMINI_API_KEY` | API key dari AI Studio | Menyalakan AI generatif |
| `AI_CHAT_MODEL` | contoh `gemini-3.8-flash` | Mengganti model utama |
| `GEMINI_PAID_TIER` | `true` | Setelah billing aktif, AI juga melayani EEA, Swiss, dan Inggris |
| `AI_CHAT_BASE_URL` + `AI_CHAT_API_KEY` + `AI_CHAT_MODEL` | URL, key, dan nama model | Memakai provider lain yang OpenAI-compatible (misalnya Groq atau OpenRouter) |
| `AI_CHAT_ALLOWED_ORIGINS` | contoh `www.domainanda.com` | Domain tambahan yang boleh memanggil `/api/ai-chat` |

---

## Data yang tercatat di Google Analytics 4

* `ai_chat_open`: chat dibuka.
* `ai_chat_message`: pengunjung mengirim pesan (`input_type`, `reply_source` berisi `ai` atau `local`, dan `turn`).
* `ai_chat_reset`: pengunjung memulai percakapan baru.
* Klik WhatsApp dari dalam chat tercatat sebagai `whatsapp_modal_open` dengan `lead_source` bernilai `ai_chat_inline` atau `ai_chat_footer`, lalu `generate_lead` + Meta `Lead` seperti biasa saat form dikirim.

Isi percakapan **tidak** dikirim ke GA4 maupun Meta.

---

## Keamanan bawaan

* API key hanya ada di server Cloudflare (Workers atau Pages Functions).
* Endpoint `/api/ai-chat` hanya menerima permintaan dari halaman website sendiri.
* Dibatasi 25 pesan per 10 menit per pengunjung supaya kuota AI tidak disalahgunakan.
* Riwayat chat hanya disimpan di browser pengunjung selama tab terbuka (sessionStorage), tidak disimpan di server.
