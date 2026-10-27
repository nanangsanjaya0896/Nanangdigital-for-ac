import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import type { Plugin } from "vite";
// @ts-expect-error logika inti serverless (JS murni) dipakai juga oleh dev server lokal
import { getMetaCapiHealth, processMetaCapiEvent } from "./server/meta-capi-core.js";
// @ts-expect-error logika inti serverless (JS murni) dipakai juga oleh dev server lokal
import { getAiChatHealth, processAiChatRequest } from "./server/ai-chat-core.js";
// @ts-expect-error modul ESM bersama dengan scripts/prerender.mjs
import { resolveSiteUrl } from "./scripts/site-url.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Middleware dev agar endpoint /api/meta-capi berjalan identik di lokal maupun di Cloudflare Pages / Vercel. */
function metaCapiDevPlugin(): Plugin {
  return {
    name: "meta-capi-dev-endpoint",
    configureServer(server) {
      const getEnv = () => ({
        ...loadEnv(server.config.mode, server.config.root, ""),
        ...process.env,
      });

      server.middlewares.use("/api/meta-capi", (req, res) => {
        if (req.method === "GET") {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(getMetaCapiHealth(getEnv())));
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
            env: getEnv(),
          });

          res.statusCode = result.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result.payload));
        });
      });
    },
  };
}

/**
 * Middleware dev agar endpoint /api/ai-chat berjalan identik di lokal maupun di Cloudflare Pages / Vercel.
 * Basis pengetahuan dibaca langsung dari src/data/chatKnowledge.ts supaya perubahan data
 * paket langsung terasa di Live Preview. API key bisa ditaruh di `.env.local` (tidak ikut Git).
 */
function aiChatDevPlugin(): Plugin {
  return {
    name: "ai-chat-dev-endpoint",
    configureServer(server) {
      const getEnv = () => ({
        ...loadEnv(server.config.mode, server.config.root, ""),
        ...process.env,
      });

      server.middlewares.use("/api/ai-chat", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-store");

        if (req.method === "GET") {
          res.statusCode = 200;
          res.end(JSON.stringify(getAiChatHealth(getEnv(), "", "local")));
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ ok: false, error: "Method Not Allowed" }));
          return;
        }

        let rawBody = "";
        let tooLarge = false;
        req.on("data", (chunk: Buffer) => {
          rawBody += chunk.toString("utf8");
          if (rawBody.length > 64_000) {
            tooLarge = true;
            res.statusCode = 413;
            res.end(JSON.stringify({ ok: false, error: "Payload too large" }));
            req.destroy();
          }
        });
        req.on("end", async () => {
          if (tooLarge) return;
          let parsed: Record<string, unknown> = {};
          try {
            parsed = rawBody ? (JSON.parse(rawBody) as Record<string, unknown>) : {};
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: "Invalid JSON body" }));
            return;
          }

          let knowledge: Record<string, string> | undefined;
          try {
            const mod = await server.ssrLoadModule("/src/data/chatKnowledge.ts");
            knowledge = mod.buildChatKnowledgeBundle() as Record<string, string>;
          } catch {
            knowledge = undefined;
          }

          const forwarded = req.headers["x-forwarded-for"];
          const clientIp = Array.isArray(forwarded)
            ? forwarded[0]
            : typeof forwarded === "string"
              ? forwarded.split(",")[0]
              : req.socket.remoteAddress || "";

          const result = await processAiChatRequest({
            body: parsed,
            clientKey: String(clientIp || "").trim(),
            env: getEnv(),
            ...(knowledge ? { knowledge } : {}),
          });

          res.statusCode = result.status;
          res.end(JSON.stringify(result.payload));
        });
      });
    },
  };
}

/**
 * Ganti placeholder `%SITE_URL%` di index.html (canonical, hreflang, Open Graph, JSON-LD) dengan
 * alamat website dari scripts/site-url.mjs, supaya alamat cukup diatur di satu tempat.
 */
function siteUrlHtmlPlugin(siteUrl: string): Plugin {
  return {
    name: "site-url-html",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replace(/%SITE_URL%/g, siteUrl);
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const siteUrl = resolveSiteUrl({ ...loadEnv(mode, __dirname, ""), ...process.env }) as string;

  return {
    plugins: [react(), tailwindcss(), siteUrlHtmlPlugin(siteUrl), metaCapiDevPlugin(), aiChatDevPlugin()],
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
  };
});
