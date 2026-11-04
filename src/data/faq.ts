import { PLANS } from "./plans";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

function planPrice(id: "basic" | "growth" | "premium"): string {
  const plan = PLANS.find((item) => item.id === id);
  if (!plan) throw new Error(`Paket ${id} tidak ditemukan di src/data/plans.ts`);
  return plan.customLabel ?? plan.price;
}

/**
 * Pertanyaan yang sering ditanyakan calon klien. Tampil di bagian FAQ beranda dan ikut menjadi
 * data terstruktur FAQPage + basis pengetahuan Asisten AI. Jawaban sengaja dibuka dengan jawaban
 * langsung di kalimat pertama supaya mudah dikutip mesin pencari dan mesin jawaban AI.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "paket",
    question: "Apa saja yang sudah didapat kalau pesan paket website di sini?",
    answer:
      "Semua paket sudah termasuk pembuatan website responsif, copywriting high convert, CTA Form WhatsApp, Free SSL (HTTPS), Live Chat AI, domain & hosting gratis 1 tahun, Akun Google My Business (Google Maps), serta Gratis Meta Ads. Khusus Paket Growth dan Paket Premium Custom juga sudah termasuk artikel SEO, setup Google Search Console, Google Analytics, Pixel tracking, dan materi iklan kreatif.",
  },
  {
    id: "waktu",
    question: "Berapa hari pengerjaan sampai websitenya jadi?",
    answer:
      "Rata-rata 3 sampai 5 hari kerja terhitung sejak data dasar usaha Anda (nama usaha, daftar layanan, area kerja, foto jika ada, dan nomor WhatsApp) saya terima. Untuk Paket Premium Custom yang cakupannya lebih lengkap biasanya sekitar 5 sampai 7 hari kerja.",
  },
  {
    id: "domain",
    question: "Apakah sudah termasuk biaya domain dan hosting?",
    answer:
      "Sudah. Tahun pertama domain dan hosting sudah masuk ke harga paket, lengkap dengan Free SSL Certificate (HTTPS), jadi Anda tinggal terima beres. Biaya perpanjangan tahun depannya juga saya infokan di awal saat ngobrol di WhatsApp supaya sama-sama enak dan transparan.",
  },
  {
    id: "pembayaran",
    question: "Bagaimana cara bayarnya? Aman tidak?",
    answer:
      "Pembayaran dibagi dua tahap. Awal pengerjaan cukup DP 50% dulu, lalu sisa 50% baru dilunasi setelah website selesai dikerjakan dan Anda cek sendiri hasilnya. Pembayaran bisa lewat transfer bank, QRIS, atau e-wallet sesuai kesepakatan di chat.",
  },
  {
    id: "revisi",
    question: "Kalau ada bagian tulisan atau tampilan yang kurang srek, bisa minta ubah?",
    answer:
      "Bisa banget. Paket Basic mendapat kuota 3x revisi ringan, Paket Growth mendapat 5x revisi ringan, sedangkan Paket Premium Custom mendapat hingga 10x revisi. Anda bebas minta sesuaikan teks layanan, tarif, foto, atau urutan bagian halaman sebelum website dinaikkan penuh.",
  },
  {
    id: "konsultasi",
    question: "Boleh tanya-tanya dulu di WhatsApp walaupun belum pasti pesan sekarang?",
    answer:
      "Santai saja, boleh banget. Chat dulu ceritakan kondisi usaha AC Anda sekarang dan daerah mana saja yang dilayani. Saya bantu kasih saran jujur paket mana yang paling masuk akal buat kebutuhan Anda saat ini, tanpa paksaan harus langsung jadi.",
  },
  {
    id: "biaya",
    question: "Berapa biaya bikin website untuk usaha service AC di NanangDigital?",
    answer: `Paket Basic ${planPrice("basic")}, Paket Growth ${planPrice("growth")}, dan Paket Premium Custom harganya disesuaikan dengan kebutuhan usaha. Ketiganya sudah termasuk domain dan hosting tahun pertama, SSL HTTPS, Live Chat AI, dan pembuatan akun Google Maps. Biaya perpanjangan domain dan hosting untuk tahun berikutnya diinfokan di awal lewat WhatsApp.`,
  },
  {
    id: "perlu-website",
    question: "Apakah usaha service AC masih perlu website kalau sudah punya Google Maps dan WhatsApp?",
    answer:
      "Perlu, karena fungsinya berbeda. Google Maps membantu usaha Anda ditemukan orang di sekitar dan WhatsApp dipakai untuk ngobrol, sedangkan website menjelaskan daftar layanan, kisaran tarif, area kerja, dan bukti kerja dalam satu halaman yang bisa ditautkan dari Google Maps, iklan Facebook, maupun Instagram. Calon pelanggan jadi sudah yakin sebelum mengirim chat.",
  },
  {
    id: "google",
    question: "Apakah website dari NanangDigital bisa muncul di Google?",
    answer:
      "Bisa. Website dibuat dengan struktur yang mudah dibaca Google, sudah memakai HTTPS, dan disambungkan ke akun Google Maps usaha Anda. Paket Growth dan Paket Premium Custom juga dipasangi Google Search Console, Google Analytics, dan artikel SEO. Posisi pertama tidak bisa dijamin oleh siapa pun karena urutan hasil pencarian ditentukan Google, tapi semua dasar teknisnya sudah disiapkan.",
  },
  {
    id: "luar-kota",
    question: "Apakah bisa melayani usaha service AC di luar kota?",
    answer:
      "Bisa. Semua koordinasi lewat WhatsApp, jadi usaha service AC di kota mana pun di Indonesia tetap bisa dilayani tanpa harus bertemu langsung. Untuk saat ini NanangDigital fokus melayani usaha di Indonesia dengan harga dalam Rupiah.",
  },
  {
    id: "pengerjaan",
    question: "Siapa yang mengerjakan websitenya?",
    answer:
      "Dikerjakan langsung oleh Nanang Sanjaya, founder NanangDigital. Mulai dari ngobrol soal usaha Anda, menulis isi halaman, sampai website online dan siap dipasang iklan, semuanya dipegang sendiri. Jadi komunikasi cepat nyambung tanpa dilempar ke admin lain.",
  },
];
