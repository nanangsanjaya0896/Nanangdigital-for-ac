export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Seluruh ketentuan bisnis (harga, waktu, domain/hosting, pembayaran, revisi)
 * dipertahankan dari penawaran asli.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "paket",
    question: "Apa saja yang saya dapatkan dari paket website?",
    answer:
      "Setiap paket mencakup website landing page atau portfolio yang mobile-friendly, copywriting, CTA WhatsApp, dan revisi sesuai paket. Paket Growth menambahkan setup 1 campaign Meta Ads dengan targeting lokal serta basic pixel & tracking. Paket Premium menambahkan form lead, setup 2 campaign dengan angle berbeda, dan optimasi awal. Semua paket sudah termasuk domain .com / .id dan hosting untuk tahun pertama.",
  },
  {
    id: "waktu",
    question: "Berapa lama proses pengerjaan website?",
    answer:
      "Estimasi umum pengerjaan adalah 3–5 hari kerja setelah konsultasi selesai dan seluruh data (foto, daftar layanan, area kerja, kontak) diterima lengkap. Paket Premium dapat membutuhkan 5–7 hari kerja karena cakupannya lebih luas.",
  },
  {
    id: "domain",
    question: "Apakah domain dan hosting sudah termasuk?",
    answer:
      "Ya. Domain .com atau .id dan hosting sudah termasuk untuk tahun pertama di semua paket. Detail perpanjangan tahun berikutnya akan dibahas secara transparan saat konsultasi, jadi tidak ada biaya yang disembunyikan.",
  },
  {
    id: "pembayaran",
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Pembayaran dilakukan dalam dua tahap: 50% sebelum pengerjaan dimulai dan 50% setelah website siap dan Anda setujui. Metode pembayaran yang tersedia: transfer bank, QRIS, dan dompet digital. Seluruh pembayaran berlangsung di luar website ini melalui kanal yang disepakati saat konsultasi.",
  },
  {
    id: "revisi",
    question: "Berapa kali saya bisa melakukan revisi?",
    answer:
      "Paket Basic dan Growth mencakup 1x revisi ringan, sedangkan Paket Premium 2x. Revisi meliputi perubahan teks, warna, urutan section, atau konten. Perubahan besar yang keluar dari cakupan awal akan dibahas dan disepakati terpisah terlebih dahulu.",
  },
  {
    id: "konsultasi",
    question: "Apakah saya bisa konsultasi dulu sebelum memesan?",
    answer:
      "Tentu. Konsultasi awal gratis dan tanpa komitmen melalui WhatsApp. Ceritakan kebutuhan bisnis Anda, dan kami bantu rekomendasikan paket yang paling sesuai. Jika Anda punya kebutuhan khusus di luar paket yang ada, semuanya bisa didiskusikan melalui penawaran custom di Paket Premium.",
  },
];
