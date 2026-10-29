import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

type NdWindow = Window & { __ndSiap?: boolean };

const container = document.getElementById("root")!;
// Isi statis hasil prerender. Dipakai lagi kalau aplikasi gagal berjalan di browser pengunjung,
// supaya pengunjung tetap melihat isi website (bukan layar kosong) dan tombol WhatsApp tetap bisa diklik.
const prerenderedHtml = container.innerHTML;

const root = createRoot(container, {
  onUncaughtError(error) {
    console.error(error);
    if (!prerenderedHtml) return;
    window.setTimeout(() => {
      try {
        root.unmount();
      } catch {
        // Abaikan, yang penting isi statis dikembalikan
      }
      container.innerHTML = prerenderedHtml;
      document.documentElement.classList.add("tampil-tanpa-js");
    });
  },
});

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Aplikasi sudah berjalan: cadangan tampilan di index.html tidak perlu dipakai.
(window as NdWindow).__ndSiap = true;
document.documentElement.classList.remove("tampil-tanpa-js");
