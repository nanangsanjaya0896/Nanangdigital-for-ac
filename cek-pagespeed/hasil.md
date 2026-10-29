# Hasil cek Lighthouse (sementara)
Commit: d939b6a | Lighthouse 13.6.0 | 2026-10-29T14:48:27.845Z

## live-desktop (desktop) https://nanangdigital.web.id/
Skor tiap run: 100, 100, 100 | median **100**

| run | skor | FCP | LCP | TBT | CLS | SI | BI |
|---|---|---|---|---|---|---|---|
| 1 | 100 | 340 | 340 | 0 | 0.000 | 481 | 2436 |
| 2 | 100 | 463 | 463 | 0 | 0.000 | 486 | 2477 |
| 3 | 100 | 412 | 412 | 0 | 0.000 | 427 | 2456 |

**Elemen LCP dan rinciannya (run median):**
- Time to first byte: 263 ms
- Element render delay: 175 ms
- elemen: `section#beranda > div.section-wrap > div.max-w-2xl > h1.hero-in` `<h1 class="hero-in hero-d2 mt-7 font-display text-[2.35rem] font-bold leading-[1.1] t…">`

**Layout shift:**

**Long tasks:**

**Main thread:**
- Other: 114
- Style & Layout: 95
- Script Evaluation: 59
- Rendering: 32
- Parse HTML & CSS: 11
- Script Parsing & Compilation: 1

**Request (urutan):**
- https://nanangdigital.web.id/ | 37 KB | VeryHigh | 1-267 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_360,c_limit/photo1 | 10 KB | High | 275-398 | 200
- https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092 | 10 KB | High | 281-331 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_face/photo1 | 3 KB | Low | 340-442 | 200
- https://nanangdigital.web.id/assets/vendor-react-6RWF-rzJ.js | 61 KB | High | 383-420 | 200
- https://nanangdigital.web.id/assets/index-jVuc5ObD.js | 38 KB | High | 384-463 | 200
- https://nanangdigital.web.id/cdn-cgi/rum? | 0 KB | High | 506-534 | 204
- https://nanangdigital.web.id/favicon.svg | 1 KB | High | 518-568 | 404

**Audit lain yang skornya di bawah 0,9:**
- unused-javascript: Est savings of 27 KiB (skor 0.5)
- cache-insight: Est savings of 4 KiB (skor 0.5)
- legacy-javascript-insight: Est savings of 10 KiB (skor 0.5)
- network-dependency-tree-insight:  (skor 0)

## live-desktop-cpu-lambat (desktop, cpu x2.5) https://nanangdigital.web.id/
Skor tiap run: 100, 100, 100 | median **100**

| run | skor | FCP | LCP | TBT | CLS | SI | BI |
|---|---|---|---|---|---|---|---|
| 1 | 100 | 405 | 405 | 0 | 0.000 | 426 | 2475 |
| 2 | 100 | 408 | 408 | 0 | 0.000 | 420 | 2477 |
| 3 | 100 | 383 | 383 | 0 | 0.000 | 421 | 2482 |

**Elemen LCP dan rinciannya (run median):**
- Time to first byte: 75 ms
- Element render delay: 198 ms
- elemen: `section#beranda > div.section-wrap > div.max-w-2xl > h1.hero-in` `<h1 class="hero-in hero-d2 mt-7 font-display text-[2.35rem] font-bold leading-[1.1] t…">`

**Layout shift:**

**Long tasks:**
- https://nanangdigital.web.id/ mulai 362 durasi 71

**Main thread:**
- Other: 256
- Style & Layout: 246
- Script Evaluation: 151
- Rendering: 83
- Parse HTML & CSS: 28
- Script Parsing & Compilation: 2

**Request (urutan):**
- https://nanangdigital.web.id/ | 37 KB | VeryHigh | 2-78 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_360,c_limit/photo1 | 10 KB | High | 87-132 | 200
- https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092 | 10 KB | High | 95-142 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_face/photo1 | 3 KB | Low | 157-170 | 200
- https://nanangdigital.web.id/assets/vendor-react-6RWF-rzJ.js | 61 KB | High | 198-246 | 200
- https://nanangdigital.web.id/assets/index-jVuc5ObD.js | 38 KB | High | 198-260 | 200
- https://nanangdigital.web.id/cdn-cgi/rum? | 0 KB | High | 309-324 | 204
- https://nanangdigital.web.id/favicon.svg | 1 KB | High | 323-403 | 404

**Audit lain yang skornya di bawah 0,9:**
- unused-javascript: Est savings of 27 KiB (skor 0.5)
- cache-insight: Est savings of 4 KiB (skor 0.5)
- legacy-javascript-insight: Est savings of 10 KiB (skor 0.5)
- network-dependency-tree-insight:  (skor 0)
