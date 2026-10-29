import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Status "gambar gagal dimuat" untuk menampilkan cadangan (misalnya inisial NS).
 *
 * Gambar di HTML hasil prerender langsung diunduh browser sebelum React aktif (hydrate).
 * Kalau gambar sudah gagal duluan, event onError terlewat. Karena itu setelah React aktif
 * gambar dicek sekali lagi: selesai dimuat tapi lebarnya 0 berarti gagal.
 */
export function useImageFallback() {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const onError = useCallback(() => setFailed(true), []);

  return { failed, ref, onError };
}
