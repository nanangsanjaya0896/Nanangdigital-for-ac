# Hasil cek Lighthouse (sementara)
Commit: 7dc0c33 | Lighthouse 13.6.0 | 2026-10-29T14:52:41.815Z

## live-desktop (desktop) https://nanangdigital.web.id/
Skor tiap run: 100, 100 | median **100**

| run | skor | FCP | LCP | TBT | CLS | SI | BI |
|---|---|---|---|---|---|---|---|
| 1 | 100 | 307 | 307 | 0 | 0.000 | 425 | 3907 |
| 2 | 100 | 310 | 310 | 0 | 0.000 | 312 | 4189 |

**Elemen LCP dan rinciannya (run median):**
- Time to first byte: 203 ms
- Element render delay: 99 ms
- elemen: `section#beranda > div.section-wrap > div.max-w-2xl > h1.hero-in` `<h1 class="hero-in hero-d2 mt-7 font-display text-[2.35rem] font-bold leading-[1.1] t…">`

**Layout shift:**

**Long tasks:**

**Main thread:**
- Other: 173
- Style & Layout: 77
- Script Evaluation: 44
- Rendering: 39
- Parse HTML & CSS: 13
- Garbage Collection: 2
- Script Parsing & Compilation: 1

**Request (urutan):**
- https://nanangdigital.web.id/ | 37 KB | VeryHigh | 1-205 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_360,c_limit/photo1 | 10 KB | High | 210-333 | 200
- https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092 | 10 KB | High | 214-303 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_face/photo1 | 3 KB | Low | 286-319 | 200
- https://nanangdigital.web.id/assets/vendor-react-6RWF-rzJ.js | 61 KB | High | 289-345 | 200
- https://nanangdigital.web.id/assets/index-jVuc5ObD.js | 38 KB | High | 289-330 | 200
- https://nanangdigital.web.id/cdn-cgi/rum? | 0 KB | High | 385-418 | 204
- https://nanangdigital.web.id/favicon.svg | 1 KB | High | 395-458 | 404

**Audit lain yang skornya di bawah 0,9:**
- unused-javascript: Est savings of 27 KiB (skor 0.5)
- cache-insight: Est savings of 4 KiB (skor 0.5)
- legacy-javascript-insight: Est savings of 10 KiB (skor 0.5)
- network-dependency-tree-insight:  (skor 0)
