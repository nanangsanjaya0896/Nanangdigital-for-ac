import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowUp, Bot, RotateCcw, X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { waUrl } from "../data/business";
import { useScrollLock } from "../hooks/useScrollLock";
import { trackGaEvent } from "../utils/tracking";
import { STARTER_QUICK_REPLIES, getLocalReply } from "../utils/chatFallback";
import { checkAiAvailability, requestAiReply } from "../utils/chatApi";
import type { ApiChatMessage, ChatMode } from "../utils/chatApi";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: "welcome" | "ai" | "local";
  suggestWhatsApp?: boolean;
  quickReplies?: string[];
}

interface AIChatPanelProps {
  open: boolean;
  onClose: () => void;
  positionClassName: string;
}

const STORAGE_KEY = "nd_ai_chat_session_v1";
const MAX_STORED_MESSAGES = 40;
const MAX_INPUT_CHARS = 500;
const MIN_TYPING_MS = 700;

const COPY = {
  title: "Asisten AI NanangDigital",
  status: "Online 24 jam",
  welcome:
    "Halo! Saya asisten AI NanangDigital. Saya bisa bantu jelaskan paket website, harga, lama pengerjaan, sampai cara pembayarannya. Mau tanya apa dulu?",
  placeholder: "Tulis pertanyaan Anda...",
  inputLabel: "Pertanyaan untuk asisten AI",
  send: "Kirim pertanyaan",
  reset: "Mulai percakapan baru",
  close: "Tutup chat",
  typing: "Asisten sedang mengetik",
  whatsappInline: "Chat Mas Nanang di WhatsApp",
  whatsappFooter: "Lanjut ke WhatsApp",
  disclaimer: "Dijawab otomatis oleh AI dan bisa keliru. Harga dan jadwal pasti dikonfirmasi lewat WhatsApp.",
  quickRepliesLabel: "Pilihan pertanyaan cepat",
  you: "Anda",
  assistant: "Asisten",
} as const;

function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function welcomeMessage(): ChatMessage {
  return {
    id: "welcome",
    role: "assistant",
    content: COPY.welcome,
    source: "welcome",
    quickReplies: STARTER_QUICK_REPLIES,
  };
}

function loadStoredMessages(): ChatMessage[] | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    const valid = parsed.filter(
      (item): item is ChatMessage =>
        Boolean(item) &&
        typeof item === "object" &&
        typeof (item as ChatMessage).id === "string" &&
        typeof (item as ChatMessage).content === "string" &&
        ((item as ChatMessage).role === "user" || (item as ChatMessage).role === "assistant")
    );
    return valid.length > 0 ? valid.slice(-MAX_STORED_MESSAGES) : null;
  } catch {
    return null;
  }
}

function toApiMessages(messages: ChatMessage[]): ApiChatMessage[] {
  return messages
    .filter((message) => message.source !== "welcome")
    .map(({ role, content }) => ({ role, content }))
    .slice(-12);
}

function buildHandoffHref(lastQuestion?: string): string {
  const question = lastQuestion ? lastQuestion.slice(0, 200) : "";
  const message = `Halo Mas Nanang, saya barusan tanya-tanya lewat Live AI Chat di website.${
    question ? ` Pertanyaan saya: "${question}".` : ""
  } Boleh dibantu lanjut?`;
  return waUrl(message);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/** Tinggi keyboard virtual di HP, supaya kolom ketik tidak tertutup keyboard. */
function useKeyboardInset(active: boolean): number {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!active || !viewport) return;
    const update = () => {
      const hidden = window.innerHeight - viewport.height - viewport.offsetTop;
      setInset(hidden > 80 ? Math.round(hidden) : 0);
    };
    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, [active]);

  return active ? inset : 0;
}

type TextBlock = { kind: "p"; text: string } | { kind: "gap" } | { kind: "ul" | "ol"; items: string[] };

function parseBlocks(text: string): TextBlock[] {
  const blocks: TextBlock[] = [];
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    const bullet = /^[-\u2022]\s+(.+)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.+)$/.exec(line);
    if (bullet || numbered) {
      const kind: "ul" | "ol" = bullet ? "ul" : "ol";
      const item = bullet ? bullet[1] : (numbered as RegExpExecArray)[1];
      const last = blocks[blocks.length - 1];
      if (last && (last.kind === "ul" || last.kind === "ol") && last.kind === kind) {
        last.items.push(item);
      } else {
        blocks.push({ kind, items: [item] });
      }
      continue;
    }
    if (!line) {
      const last = blocks[blocks.length - 1];
      if (last && last.kind !== "gap") blocks.push({ kind: "gap" });
      continue;
    }
    blocks.push({ kind: "p", text: line });
  }
  return blocks;
}

function MessageText({ text }: { text: string }) {
  const blocks = parseBlocks(text);
  return (
    <div className="space-y-1">
      {blocks.map((block, index) => {
        if (block.kind === "gap") {
          return <span key={`gap-${index}`} className="block h-1.5" aria-hidden="true" />;
        }
        if (block.kind === "p") {
          return <p key={`p-${index}`}>{block.text}</p>;
        }
        if (block.kind === "ol") {
          return (
            <ol key={`ol-${index}`} className="ml-5 list-decimal space-y-1 marker:font-semibold marker:text-accent">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ol>
          );
        }
        return (
          <ul key={`ul-${index}`} className="space-y-1">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex gap-2">
                <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

export default function AIChatPanel({ open, onClose, positionClassName }: AIChatPanelProps) {
  const copy = COPY;

  const [messages, setMessages] = useState<ChatMessage[]>(() => loadStoredMessages() ?? [welcomeMessage()]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<ChatMode | "checking">("checking");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const messagesRef = useRef<ChatMessage[]>(messages);
  const modeRef = useRef<ChatMode | "checking">("checking");
  const availabilityRef = useRef<Promise<ChatMode> | null>(null);
  const busyRef = useRef(false);
  const mountedRef = useRef(true);
  const conversationRef = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const keyboardInset = useKeyboardInset(open && isSmallScreen);
  useScrollLock(open && isSmallScreen);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Cek sekali apakah AI generatif aktif (API key terpasang dan wilayah pengunjung diizinkan)
  useEffect(() => {
    availabilityRef.current = checkAiAvailability().then((result) => {
      modeRef.current = result;
      if (mountedRef.current) setMode(result);
      return result;
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsSmallScreen(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Simpan percakapan di sessionStorage agar tetap ada saat pindah halaman (hilang saat tab ditutup)
  useEffect(() => {
    messagesRef.current = messages;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
    } catch {
      // Abaikan bila storage dibatasi
    }
  }, [messages]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !open) return;
    list.scrollTo({ top: list.scrollHeight, behavior: messages.length > 1 ? "smooth" : "auto" });
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      if (window.matchMedia("(pointer: fine)").matches) {
        inputRef.current?.focus({ preventScroll: true });
      } else {
        panelRef.current?.focus({ preventScroll: true });
      }
    }, 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  const send = useCallback(
    async (raw: string, inputType: "typed" | "quick_reply") => {
      const text = raw.replace(/\s+/g, " ").trim().slice(0, MAX_INPUT_CHARS);
      if (!text || busyRef.current) return;

      const conversationId = conversationRef.current;
      busyRef.current = true;
      setBusy(true);
      setInput("");

      const userMessage: ChatMessage = { id: makeId(), role: "user", content: text };
      const history = [...messagesRef.current, userMessage];
      messagesRef.current = history;
      setMessages(history);

      const startedAt = Date.now();
      let currentMode = modeRef.current;
      if (currentMode === "checking") {
        currentMode = availabilityRef.current ? await availabilityRef.current : "local";
      }

      let reply: ChatMessage | null = null;
      if (currentMode === "ai") {
        const result = await requestAiReply(toApiMessages(history));
        if (result.ok) {
          reply = {
            id: makeId(),
            role: "assistant",
            content: result.reply,
            source: "ai",
            suggestWhatsApp: /whats\s?app/i.test(result.reply),
          };
        } else if (result.disableAi) {
          modeRef.current = "local";
          if (mountedRef.current) setMode("local");
        }
      }

      if (!reply) {
        const local = getLocalReply(text);
        const elapsed = Date.now() - startedAt;
        if (elapsed < MIN_TYPING_MS) await wait(MIN_TYPING_MS - elapsed);
        reply = {
          id: makeId(),
          role: "assistant",
          content: local.text,
          source: "local",
          suggestWhatsApp: local.suggestWhatsApp,
          quickReplies: local.quickReplies,
        };
      }

      if (!mountedRef.current) return;
      busyRef.current = false;
      setBusy(false);
      // Percakapan sudah di-reset saat menunggu jawaban: buang jawaban lama
      if (conversationId !== conversationRef.current) return;

      const finalHistory = [...messagesRef.current, reply];
      messagesRef.current = finalHistory;
      setMessages(finalHistory);

      trackGaEvent("ai_chat_message", {
        language: "id",
        input_type: inputType,
        reply_source: reply.source ?? "local",
        turn: finalHistory.filter((message) => message.role === "user").length,
      });
    },
    []
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input, "typed");
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
    }
  };

  const resetConversation = () => {
    conversationRef.current += 1;
    const fresh = [welcomeMessage()];
    messagesRef.current = fresh;
    setMessages(fresh);
    setInput("");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Abaikan bila storage dibatasi
    }
    trackGaEvent("ai_chat_reset", { language: "id" });
    inputRef.current?.focus({ preventScroll: true });
  };

  const lastUserQuestion = [...messages].reverse().find((message) => message.role === "user")?.content;
  const handoffHref = buildHandoffHref(lastUserQuestion);
  const lastMessage = messages[messages.length - 1];
  const quickReplies =
    !busy && lastMessage?.role === "assistant" && lastMessage.quickReplies ? lastMessage.quickReplies : [];

  return (
    <>
      {open && isSmallScreen && (
        // Latar gelap di HP: tap di luar panel untuk menutup, sekaligus mencegah tombol halaman tertekan
        <div className="ai-chat-backdrop fixed inset-0 z-[79] bg-black/60 sm:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <div
        ref={panelRef}
        id="ai-chat-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="ai-chat-title"
        tabIndex={-1}
        inert={!open}
        data-chat-mode={mode}
        onKeyDown={handleKeyDown}
        style={
          keyboardInset
            ? { bottom: keyboardInset, height: `min(88dvh, calc(100dvh - ${keyboardInset}px - 0.75rem))` }
            : undefined
        }
        className={`${positionClassName} z-[80] flex flex-col overflow-hidden border border-accent/30 bg-surface shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] transition-all duration-300 ease-out focus:outline-none ${
          open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-line bg-gradient-to-r from-[#0e2019] to-surface px-4 py-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
            <Bot className="h-5 w-5" aria-hidden="true" />
            <span
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-accent"
              aria-hidden="true"
            />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="ai-chat-title" className="truncate font-display text-[0.95rem] font-bold tracking-tight text-white">
              {copy.title}
            </h2>
            <p className="text-xs text-mist">{copy.status}</p>
          </div>
          <button
            type="button"
            onClick={resetConversation}
            aria-label={copy.reset}
            title={copy.reset}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
        >
          {messages.map((message, index) => {
            if (message.role === "user") {
              return (
                <div key={message.id} className="ai-chat-bubble flex justify-end">
                  <p className="max-w-[85%] whitespace-pre-line break-words rounded-2xl rounded-tr-md bg-accent px-3.5 py-2.5 text-[0.9rem] font-medium leading-relaxed text-[#04140c]">
                    <span className="sr-only">{copy.you}: </span>
                    {message.content}
                  </p>
                </div>
              );
            }
            const isLast = index === messages.length - 1;
            return (
              <div key={message.id} className="ai-chat-bubble flex flex-col items-start gap-2">
                <div className="max-w-[90%] break-words rounded-2xl rounded-tl-md border border-line bg-white/[0.04] px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-white/90">
                  <span className="sr-only">{copy.assistant}: </span>
                  <MessageText text={message.content} />
                </div>
                {isLast && message.suggestWhatsApp && !busy && (
                  <a
                    href={handoffHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-source="ai_chat_inline"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-deep px-4 py-2.5 text-xs font-bold text-[#04140c] transition-transform duration-200 hover:scale-[1.03]"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    {copy.whatsappInline}
                  </a>
                )}
              </div>
            );
          })}

          {busy && (
            <div className="ai-chat-bubble flex" role="status" aria-label={copy.typing}>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-line bg-white/[0.04] px-4 py-3.5">
                <span className="ai-chat-dot h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="ai-chat-dot h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="ai-chat-dot h-1.5 w-1.5 rounded-full bg-accent" />
              </div>
            </div>
          )}

          {quickReplies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label={copy.quickRepliesLabel}>
              {quickReplies.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => void send(label, "quick_reply")}
                  className="rounded-full border border-accent/40 bg-accent/[0.06] px-3.5 py-2 text-left text-xs font-semibold text-accent transition-colors hover:border-accent hover:bg-accent/15"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-line bg-ink-soft/80 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <label htmlFor="ai-chat-input" className="sr-only">
              {copy.inputLabel}
            </label>
            <input
              ref={inputRef}
              id="ai-chat-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={MAX_INPUT_CHARS}
              autoComplete="off"
              enterKeyHint="send"
              placeholder={copy.placeholder}
              className="min-w-0 flex-1 rounded-full border border-line bg-ink px-4 py-3 text-base text-white placeholder:text-mist/70 focus:border-accent focus:outline-none sm:text-sm"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label={copy.send}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-deep text-[#04140c] transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
            </button>
          </form>
          <div className="mt-2.5 flex flex-col items-center gap-1.5 px-1 text-center">
            <a
              href={handoffHref}
              target="_blank"
              rel="noopener noreferrer"
              data-track-source="ai_chat_footer"
              className="inline-flex items-center gap-1.5 py-1 text-xs font-semibold text-accent underline-offset-4 hover:underline"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              {copy.whatsappFooter}
            </a>
            <p className="text-[0.7rem] leading-snug text-mist">{copy.disclaimer}</p>
          </div>
        </div>
      </div>
    </>
  );
}
