/**
 * Data karya untuk bagian "Contoh Website" (#karya).
 *
 * Setiap karya adalah website sungguhan yang sudah online. Tambahkan objek baru di `PROJECTS`
 * kalau ada website berikutnya, maka otomatis tampil sebagai blok showcase baru.
 * Screenshot disimpan di `public/images/` dalam format WebP.
 */
export type ProjectType = "client" | "demo";

export interface ProjectScreen {
  /** Nama tab, contoh: "Halaman Utama" */
  label: string;
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
  /** Alamat bagian website yang dibuka saat gambar diklik */
  href: string;
  /** Teks alamat yang tampil di bilah browser */
  displayUrl: string;
}

export interface Project {
  id: string;
  type: ProjectType;
  category: string;
  title: string;
  description: string;
  liveUrl: string;
  /** Tampilan desktop (bisa lebih dari satu, dipilih lewat tab) */
  screens: ProjectScreen[];
  /** Tampilan di HP */
  mobileScreen?: Omit<ProjectScreen, "label" | "href" | "displayUrl">;
  features: string[];
  /** Keterangan jujur soal isi website (misalnya kalau website demo) */
  note?: string;
}

export const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  client: "Proyek Klien",
  demo: "Website Demo",
};

export const PROJECTS: Project[] = [
  {
    id: "arktis-home-service",
    type: "demo",
    category: "Website Servis AC",
    title: "ARKTIS Home Service",
    description:
      "Landing page jasa servis AC rumahan yang siap menerima pesanan: paket harga transparan, form booking 3 menit, foto before dan after, serta tombol WhatsApp di setiap bagian.",
    liveUrl: "https://arktishomeservices.vercel.app/",
    screens: [
      {
        label: "Halaman Utama",
        src: "/images/karya-arktis-desktop-1280.webp",
        srcSet: "/images/karya-arktis-desktop-640.webp 640w, /images/karya-arktis-desktop-1280.webp 1280w",
        width: 1280,
        height: 800,
        alt: "Halaman utama website ARKTIS Home Service",
        href: "https://arktishomeservices.vercel.app/",
        displayUrl: "arktishomeservices.vercel.app",
      },
      {
        label: "Form Booking",
        src: "/images/karya-arktis-booking-1280.webp",
        srcSet: "/images/karya-arktis-booking-640.webp 640w, /images/karya-arktis-booking-1280.webp 1280w",
        width: 1280,
        height: 800,
        alt: "Form booking cepat website ARKTIS Home Service",
        href: "https://arktishomeservices.vercel.app/#booking",
        displayUrl: "arktishomeservices.vercel.app/#booking",
      },
    ],
    mobileScreen: {
      src: "/images/karya-arktis-mobile-480.webp",
      width: 480,
      height: 817,
      alt: "Website ARKTIS Home Service di layar HP",
    },
    features: [
      "Bagian pembuka dengan tombol Pesan Servis yang langsung terlihat",
      "6 paket layanan lengkap dengan estimasi waktu dan harga mulai",
      "Form booking cepat: nama, nomor WhatsApp, layanan, dan tanggal",
      "Slider foto before dan after untuk menunjukkan hasil kerja",
      "Bagian testimoni, galeri, bonus, dan tanya jawab",
      "Tombol WhatsApp melayang dan tampilan rapi di HP",
    ],
    note: "Ini website demo. Nama usaha, foto, testimoni, dan angka di dalamnya hanya contoh, tetapi semua fitur dan tampilannya bisa Anda coba langsung.",
  },
  {
    id: "sejukin",
    type: "demo",
    category: "Website Company Profile AC",
    title: "Sejukin",
    description:
      "Website company profile jasa AC dengan beberapa halaman: profil usaha, layanan dan paket harga, portofolio proyek, artikel, sampai halaman kontak dengan form booking. Cocok untuk usaha AC yang melayani rumah, kantor, dan gedung komersial.",
    liveUrl: "https://sejukin-ac.vercel.app/",
    screens: [
      {
        label: "Beranda",
        src: "/images/karya-sejukin-beranda-1280.webp",
        srcSet: "/images/karya-sejukin-beranda-640.webp 640w, /images/karya-sejukin-beranda-1280.webp 1280w",
        width: 1280,
        height: 800,
        alt: "Halaman beranda website company profile Sejukin",
        href: "https://sejukin-ac.vercel.app/",
        displayUrl: "sejukin-ac.vercel.app",
      },
      {
        label: "Layanan",
        src: "/images/karya-sejukin-layanan-1280.webp",
        srcSet: "/images/karya-sejukin-layanan-640.webp 640w, /images/karya-sejukin-layanan-1280.webp 1280w",
        width: 1280,
        height: 800,
        alt: "Halaman layanan dan harga website Sejukin",
        href: "https://sejukin-ac.vercel.app/services",
        displayUrl: "sejukin-ac.vercel.app/services",
      },
      {
        label: "Form Booking",
        src: "/images/karya-sejukin-booking-1280.webp",
        srcSet: "/images/karya-sejukin-booking-640.webp 640w, /images/karya-sejukin-booking-1280.webp 1280w",
        width: 1280,
        height: 800,
        alt: "Form booking servis AC di halaman kontak website Sejukin",
        href: "https://sejukin-ac.vercel.app/contact",
        displayUrl: "sejukin-ac.vercel.app/contact",
      },
    ],
    mobileScreen: {
      src: "/images/karya-sejukin-mobile-480.webp",
      width: 480,
      height: 817,
      alt: "Website Sejukin di layar HP",
    },
    features: [
      "6 halaman: Beranda, Tentang, Layanan, Proyek, Artikel, dan Kontak",
      "6 layanan AC dengan harga mulai dan rincian pekerjaan tiap layanan",
      "3 paket harga, dari servis rumahan sampai kontrak perawatan kantor",
      "Portofolio proyek dengan filter kategori dan halaman detail tiap proyek",
      "Form booking lengkap: jenis layanan, merek AC, tipe AC, jumlah unit, dan tanggal",
      "Asisten AI, tombol WhatsApp, dan tanya jawab, rapi dibuka dari HP",
    ],
    note: "Ini website demo. Nama usaha, foto, nomor telepon, nama klien, dan angka di dalamnya hanya contoh, tetapi semua halaman dan fiturnya bisa Anda coba langsung.",
  },
];
