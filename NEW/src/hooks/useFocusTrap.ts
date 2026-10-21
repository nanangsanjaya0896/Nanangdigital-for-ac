import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Focus trap sederhana untuk dialog/menu overlay:
 * - Fokus awal ke elemen [data-autofocus] atau elemen fokusable pertama (sekali saat dibuka).
 * - Tab dan Shift+Tab berputar di dalam kontainer.
 * - Escape memanggil onEscape.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape?: () => void
): void {
  const onEscapeRef = useRef(onEscape);

  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    if (!root) return;

    const getFocusables = () =>
      Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.getClientRects().length > 0
      );

    const autofocus = root.querySelector<HTMLElement>("[data-autofocus]");
    const first = getFocusables()[0];
    (autofocus ?? first)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      const current = document.activeElement;

      if (event.shiftKey) {
        if (current === firstEl || !root.contains(current)) {
          event.preventDefault();
          lastEl.focus();
        }
      } else if (current === lastEl || !root.contains(current)) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [ref, active]);
}
