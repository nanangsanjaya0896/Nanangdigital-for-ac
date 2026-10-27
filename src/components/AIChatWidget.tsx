import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { Bot, X } from "lucide-react";
import { trackGaEvent } from "../utils/tracking";

/**
 * Tombol melayang Live AI Chat.
 *
 * - Panel chat baru diunduh saat tombol disentuh atau diklik (lazy load), jadi tidak
 *   menambah beban awal halaman dan skor PageSpeed tetap hijau.
 * - Posisi tombol naik otomatis di atas tombol WhatsApp melayang saat tombol itu muncul.
 * - Saat chat terbuka, tombol WhatsApp melayang disembunyikan karena chat sudah punya
 *   tombol WhatsApp sendiri (tetap lewat form kenalan + tracking Pixel/CAPI yang sama).
 */

const loadPanel = () => import("./AIChatPanel");
const AIChatPanel = lazy(loadPanel);

/** Sama dengan ambang scroll tombol WhatsApp melayang (StickyWhatsApp). */
const WA_STICKY_THRESHOLD = 520;
const TEASER_DELAY_MS = 15000;
const TEASER_VISIBLE_MS = 12000;
const TEASER_SESSION_KEY = "nd_ai_chat_teaser_v1";

const PANEL_POSITION =
  "fixed inset-x-0 bottom-0 h-[min(88dvh,46rem)] rounded-t-[1.75rem] sm:inset-x-auto sm:bottom-[5.5rem] sm:right-5 sm:h-[min(38rem,calc(100dvh-7.5rem))] sm:w-[23.5rem] sm:rounded-[1.75rem] md:bottom-[6rem] md:right-7";

const COPY = {
  launcher: "Tanya Asisten AI",
  // Label pembaca layar wajib memuat teks yang terlihat (WCAG 2.5.3 Label in Name)
  open: "Tanya Asisten AI, buka Live AI Chat NanangDigital",
  close: "Tutup Live AI Chat",
  closeShort: "Tutup",
  teaser: "Ada yang mau ditanyakan soal paket website? Tanya saya, langsung dijawab.",
  teaserClose: "Tutup pesan",
  loading: "Memuat chat...",
} as const;

export default function AIChatWidget() {
  const copy = COPY;

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [waVisible, setWaVisible] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Dirender setelah hydration supaya HTML statis hasil prerender tidak berubah
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setWaVisible(window.scrollY > WA_STICKY_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.setAttribute("data-ai-chat-open", "");
    } else {
      root.removeAttribute("data-ai-chat-open");
    }
    return () => root.removeAttribute("data-ai-chat-open");
  }, [open]);

  // Sapaan singkat sekali per sesi (hanya layar tablet/desktop) untuk mengundang pertanyaan
  useEffect(() => {
    if (everOpened) return;
    try {
      if (sessionStorage.getItem(TEASER_SESSION_KEY)) return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => {
      setTeaserVisible(true);
      try {
        sessionStorage.setItem(TEASER_SESSION_KEY, "1");
      } catch {
        // Abaikan bila storage dibatasi
      }
    }, TEASER_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [everOpened]);

  useEffect(() => {
    if (!teaserVisible) return;
    const timer = window.setTimeout(() => setTeaserVisible(false), TEASER_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [teaserVisible]);

  const preloadPanel = useCallback(() => {
    void loadPanel();
  }, []);

  const openChat = useCallback(() => {
    setEverOpened(true);
    setOpen(true);
    setTeaserVisible(false);
    trackGaEvent("ai_chat_open", { language: "id" });
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }));
  }, []);

  if (!mounted) return null;

  const lifted = waVisible && !open;

  return (
    <>
      <div
        className={`pointer-events-none fixed bottom-5 right-5 z-[45] flex flex-col items-end gap-3 transition-transform duration-500 ease-out md:bottom-7 md:right-7 ${
          lifted ? "-translate-y-[4.5rem]" : "translate-y-0"
        }`}
      >
        {teaserVisible && !open && (
          <div className="ai-chat-teaser pointer-events-auto relative hidden max-w-[17rem] items-start gap-1 rounded-2xl border border-accent/35 bg-surface/95 py-3 pl-4 pr-1.5 text-sm text-white shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85)] backdrop-blur sm:flex">
            <button type="button" onClick={openChat} className="text-left leading-snug">
              {copy.teaser}
            </button>
            <button
              type="button"
              onClick={() => setTeaserVisible(false)}
              aria-label={copy.teaserClose}
              className="-mt-1.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-mist transition-colors hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <button
          ref={launcherRef}
          type="button"
          onClick={open ? closeChat : openChat}
          onPointerEnter={preloadPanel}
          onFocus={preloadPanel}
          onTouchStart={preloadPanel}
          aria-expanded={open}
          aria-controls={everOpened ? "ai-chat-panel" : undefined}
          aria-label={open ? copy.close : copy.open}
          className={`pointer-events-auto relative inline-flex h-14 w-14 items-center justify-center gap-2.5 rounded-full border border-accent/45 bg-surface/95 text-white shadow-[0_14px_40px_-10px_rgba(0,0,0,0.85)] backdrop-blur transition-all duration-300 hover:scale-105 hover:border-accent focus:outline-none sm:w-auto sm:pl-2.5 sm:pr-5 ${
            open ? "max-sm:hidden" : ""
          }`}
        >
          {!everOpened && <span className="ai-chat-ping" aria-hidden="true" />}
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Bot className="h-5 w-5" aria-hidden="true" />}
            {!open && (
              <span
                className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent"
                aria-hidden="true"
              />
            )}
          </span>
          <span className="hidden text-sm font-semibold sm:inline">{open ? copy.closeShort : copy.launcher}</span>
        </button>
      </div>

      {everOpened && (
        <Suspense
          fallback={
            open ? (
              <div
                role="status"
                className={`${PANEL_POSITION} z-[80] flex items-center justify-center border border-accent/30 bg-surface text-sm text-mist`}
              >
                {copy.loading}
              </div>
            ) : null
          }
        >
          <AIChatPanel open={open} onClose={closeChat} positionClassName={PANEL_POSITION} />
        </Suspense>
      )}
    </>
  );
}
