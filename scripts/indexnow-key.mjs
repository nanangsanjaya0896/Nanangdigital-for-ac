/**
 * Kunci IndexNow (https://www.indexnow.org) untuk memberi tahu Bing, Yandex, Seznam, Naver, dan
 * Yep setiap kali isi website berubah. Bing juga menjadi salah satu sumber data Copilot dan
 * mesin jawaban AI lain, jadi halaman baru lebih cepat dikenal.
 *
 * Kunci ini memang publik (bukan rahasia): saat build, scripts/prerender.mjs menulis file
 * `dist/<kunci>.txt` berisi kunci yang sama sebagai bukti bahwa website ini pemiliknya.
 * Pengirimannya dilakukan oleh scripts/indexnow.mjs lewat GitHub Actions setelah deploy.
 * Kalau suatu saat ingin ganti kunci, cukup ganti nilainya di sini (32 karakter huruf a-f dan angka).
 */
export const INDEXNOW_KEY = "6b410e15b0d20a5837087311f9987168";
