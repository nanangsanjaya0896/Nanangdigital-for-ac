/**
 * Sinkronisasi basis pengetahuan Asisten AI ke sisi server (Vercel Function).
 *
 * Membaca `src/data/chatKnowledge.ts` (yang mengambil data paket, harga, FAQ, alur kerja,
 * dan bonus dari `src/data/*.ts`) lalu menulis hasilnya ke `server/chat-knowledge.generated.js`.
 *
 * Dijalankan otomatis di awal `npm run build`, atau manual lewat `npm run sync:chat`.
 * File hasilnya ikut di-commit supaya Vercel Function selalu punya data terbaru.
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build as viteBuild } from "vite";

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(__filename), "..");
const tempDir = path.join(rootDir, "node_modules", ".cache", "chat-knowledge");
const targetFile = path.join(rootDir, "server", "chat-knowledge.generated.js");

// Pengaman gaya penulisan: tanpa tanda pisah panjang maupun titik tengah berantai.
const FORBIDDEN_CHARS = /[\u2014\u2013\u00b7]/;

async function syncChatKnowledge() {
  await viteBuild({
    root: rootDir,
    configFile: false,
    logLevel: "warn",
    build: {
      ssr: "src/data/chatKnowledge.ts",
      outDir: tempDir,
      emptyOutDir: true,
    },
  });

  const moduleUrl = pathToFileURL(path.join(tempDir, "chatKnowledge.js")).href;
  const { buildChatKnowledgeBundle } = await import(`${moduleUrl}?t=${Date.now()}`);
  const bundle = buildChatKnowledgeBundle();

  for (const [lang, text] of Object.entries(bundle)) {
    if (typeof text !== "string" || text.length < 500) {
      throw new Error(`Basis pengetahuan "${lang}" kosong atau terlalu pendek.`);
    }
    if (FORBIDDEN_CHARS.test(text)) {
      throw new Error(
        `Basis pengetahuan "${lang}" mengandung tanda pisah panjang atau titik tengah. Perbaiki teks di src/data/*.ts.`
      );
    }
  }

  const version = createHash("sha256").update(JSON.stringify(bundle)).digest("hex").slice(0, 12);
  const fileContent = `// FILE OTOMATIS: dibuat oleh scripts/sync-chat-knowledge.mjs dari src/data/*.ts
// Jangan diedit manual. Jalankan \`npm run sync:chat\` (otomatis juga saat \`npm run build\`).

export const CHAT_KNOWLEDGE_VERSION = ${JSON.stringify(version)};

export const CHAT_KNOWLEDGE = ${JSON.stringify(bundle, null, 2)};
`;

  const previous = fs.existsSync(targetFile) ? fs.readFileSync(targetFile, "utf8") : "";
  if (previous === fileContent) {
    console.log(`✓ Basis pengetahuan Asisten AI sudah sinkron (versi ${version})`);
  } else {
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, fileContent, "utf8");
    console.log(
      `✓ Basis pengetahuan Asisten AI diperbarui (versi ${version}, ID ${bundle.id.length} karakter, EN ${bundle.en.length} karakter)`
    );
    if (process.env.VERCEL) {
      console.warn(
        "⚠ server/chat-knowledge.generated.js berubah saat build di Vercel. Jalankan `npm run build` di lokal lalu commit file tersebut supaya data AI selalu sama dengan website."
      );
    }
  }

  fs.rmSync(tempDir, { recursive: true, force: true });
}

syncChatKnowledge().catch((err) => {
  console.error("Sinkronisasi basis pengetahuan Asisten AI gagal:", err);
  process.exit(1);
});
