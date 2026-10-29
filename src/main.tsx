import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import "./index.css";
import App from "./App";

type NdWindow = Window & { __ndSiap?: boolean };

const container = document.getElementById("root")!;
// Isi statis hasil prerender. Dipakai lagi kalau aplikasi gagal berjalan di browser pengunjung,
// supaya pengunjung tetap melihat isi website (bukan layar kosong) dan tombol WhatsApp tetap bisa diklik.
const prerenderedHtml = container.innerHTML;

let root: Root | undefined;

function onUncaughtError(error: unknown) {
  console.error(error);
  if (!prerenderedHtml) return;
  window.setTimeout(() => {
    try {
      root?.unmount();
    } catch {
      // Abaikan, yang penting isi statis dikembalikan
    }
    container.innerHTML = prerenderedHtml;
    document.documentElement.classList.add("tampil-tanpa-js");
  });
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (prerenderedHtml.trim()) {
  // HTML sudah lengkap dari prerender: cukup "dihidupkan" (hydrate), tidak dibangun ulang dari nol.
  // Tampilan tidak berkedip, animasi pembuka tidak terulang, dan kerja HP jauh lebih ringan.
  root = hydrateRoot(container, app, {
    onUncaughtError,
    onRecoverableError(error) {
      // React sudah memperbaiki sendiri (misalnya HTML diubah ekstensi browser); cukup dicatat.
      console.warn(error);
    },
  });
} else {
  root = createRoot(container, { onUncaughtError });
  root.render(app);
}

// Aplikasi sudah berjalan: cadangan tampilan di index.html tidak perlu dipakai.
(window as NdWindow).__ndSiap = true;
const htmlEl = document.documentElement;
if (htmlEl.classList.contains("tampil-tanpa-js")) {
  // Cadangan tampilan sudah terlanjur aktif (JavaScript datang lambat): semua bagian sudah terlihat,
  // jadi biarkan tetap terlihat supaya tidak hilang lalu muncul lagi.
  container.querySelectorAll(".reveal").forEach((el) => el.setAttribute("data-tampil", ""));
}
htmlEl.classList.remove("tampil-tanpa-js");
