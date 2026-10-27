import type { Locale } from "../i18n/LanguageContext";

/**
 * Penghubung widget Live AI Chat dengan Vercel Function `/api/ai-chat`.
 * Semua kegagalan (AI belum dipasang, kuota habis, jaringan putus) dikembalikan sebagai
 * hasil "tidak ok" supaya widget bisa langsung memakai jawaban bawaan tanpa error di layar.
 */

export type ChatMode = "ai" | "local";

export interface ApiChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type AiReplyResult = { ok: true; reply: string } | { ok: false; disableAi: boolean };

const ENDPOINT = "/api/ai-chat";

export async function checkAiAvailability(): Promise<ChatMode> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(ENDPOINT, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return "local";
    const data = (await response.json()) as { ai_enabled?: boolean } | null;
    return data?.ai_enabled ? "ai" : "local";
  } catch {
    return "local";
  } finally {
    window.clearTimeout(timer);
  }
}

export async function requestAiReply(lang: Locale, messages: ApiChatMessage[]): Promise<AiReplyResult> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ lang, messages }),
      signal: controller.signal,
    });
    const data = (await response.json().catch(() => null)) as {
      ok?: boolean;
      reply?: string;
      ai_enabled?: boolean;
    } | null;

    if (response.ok && data?.ok && typeof data.reply === "string" && data.reply.trim()) {
      return { ok: true, reply: data.reply.trim() };
    }
    return {
      ok: false,
      disableAi: data?.ai_enabled === false || response.status === 403 || response.status === 404,
    };
  } catch {
    return { ok: false, disableAi: false };
  } finally {
    window.clearTimeout(timer);
  }
}
