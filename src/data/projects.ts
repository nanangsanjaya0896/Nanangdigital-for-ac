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
];
