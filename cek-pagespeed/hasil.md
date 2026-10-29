# Hasil cek Lighthouse (sementara)
Commit: 1d786e1 | Lighthouse 13.6.0 | 2026-10-29T15:01:53.689Z

## live-desktop (desktop) https://nanangdigital.web.id/
Skor tiap run: 100, 100 | median **100**

| run | skor | FCP | LCP | TBT | CLS | SI | BI |
|---|---|---|---|---|---|---|---|
| 1 | 100 | 347 | 347 | 0 | 0.000 | 804 | 2144 |
| 2 | 100 | 382 | 382 | 0 | 0.000 | 408 | 2474 |

**Elemen LCP dan rinciannya (run median):**
- Time to first byte: 791 ms
- Element render delay: 219 ms
- elemen: `section#beranda > div.section-wrap > div.max-w-2xl > h1.hero-in` `<h1 class="hero-in hero-d2 mt-7 font-display text-[2.35rem] font-bold leading-[1.1] t…">`

**Layout shift:**

**Long tasks:**

**Main thread:**
- Other: 176
- Style & Layout: 101
- Script Evaluation: 91
- Rendering: 38
- Parse HTML & CSS: 17
- Script Parsing & Compilation: 1

**Request (urutan):**
- https://nanangdigital.web.id/ | 37 KB | VeryHigh | 5-792 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_360,c_limit/photo1 | 10 KB | High | 810-876 | 200
- https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092 | 10 KB | High | 815-865 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_face/photo1 | 3 KB | Low | 921-935 | 200
- https://nanangdigital.web.id/assets/vendor-react-6RWF-rzJ.js | 61 KB | High | 964-1019 | 200
- https://nanangdigital.web.id/assets/index-jVuc5ObD.js | 38 KB | High | 965-1030 | 200
- https://nanangdigital.web.id/cdn-cgi/rum? | 0 KB | High | 1107-1148 | 204
- https://nanangdigital.web.id/favicon.svg | 1 KB | High | 1121-1156 | 404

**Audit lain yang skornya di bawah 0,9:**
- unused-javascript: Est savings of 27 KiB (skor 0.5)
- cache-insight: Est savings of 4 KiB (skor 0.5)
- legacy-javascript-insight: Est savings of 10 KiB (skor 0.5)
- network-dependency-tree-insight:  (skor 0)
