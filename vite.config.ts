import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
// @ts-expect-error modul ESM serverless Vercel dipakai juga oleh dev server lokal
import { getMetaCapiHealth, processMetaCapiEvent } from "./api/meta-capi.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Middleware dev agar endpoint /api/meta-capi berjalan identik di lokal maupun di Vercel. */
function metaCapiDevPlugin(): Plugin {
  return {
    name: "meta-capi-dev-endpoint",
    configureServer(server) {
      server.middlewares.use("/api/meta-capi", (req, res) => {
        if (req.method === "GET") {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(getMetaCapiHealth(process.env)));
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "Method Not Allowed" }));
          return;
        }

        let rawBody = "";
        req.on("data", (chunk: Buffer) => {
          rawBody += chunk.toString("utf8");
        });
        req.on("end", async () => {
          let parsed: Record<string, unknown> = {};
          try {
            parsed = rawBody ? (JSON.parse(rawBody) as Record<string, unknown>) : {};
          } catch {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: false, error: "Invalid JSON body" }));
            return;
          }

          const forwarded = req.headers["x-forwarded-for"];
          const clientIp = Array.isArray(forwarded)
            ? forwarded[0]
            : typeof forwarded === "string"
              ? forwarded.split(",")[0]
              : req.socket.remoteAddress || "";

          const result = await processMetaCapiEvent({
            body: parsed,
            clientIp: String(clientIp || "").trim(),
            userAgent: String(req.headers["user-agent"] || ""),
            env: process.env,
          });

          res.statusCode = result.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result.payload));
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), metaCapiDevPlugin()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-motion";
          }
          if (id.includes("node_modules/react") || id.includes("node_modules/scheduler")) {
            return "vendor-react";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
