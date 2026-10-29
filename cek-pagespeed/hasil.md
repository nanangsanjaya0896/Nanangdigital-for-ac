# Hasil cek Lighthouse (sementara)
Commit: c60b396 | Lighthouse 13.6.0 | 2026-10-29T15:23:33.753Z

## preview-desktop (desktop) https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/
Skor tiap run: 100, 99, 99 | median **99**

| run | skor | FCP | LCP | TBT | CLS | SI | BI |
|---|---|---|---|---|---|---|---|
| 1 | 100 | 428 | 428 | 20 | 0.000 | 632 | 2029 |
| 2 | 99 | 811 | 811 | 0 | 0.000 | 811 | 2493 |
| 3 | 99 | 764 | 764 | 0 | 0.000 | 764 | 2480 |

**Elemen LCP dan rinciannya (run median):**
- Time to first byte: 330 ms
- Element render delay: 165 ms
- elemen: `section#beranda > div.section-wrap > div.max-w-2xl > h1.hero-in` `<h1 class="hero-in hero-d2 mt-7 font-display text-[2.35rem] font-bold leading-[1.1] t…">`

**Layout shift:**

**Long tasks:**

**Main thread:**
- Other: 142
- Style & Layout: 108
- Script Evaluation: 47
- Rendering: 46
- Parse HTML & CSS: 10
- Script Parsing & Compilation: 1

**Request (urutan):**
- https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/ | 36 KB | VeryHigh | 1-361 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_360,c_limit/photo1 | 10 KB | High | 357-377 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_face/photo1 | 3 KB | Low | 399-410 | 200
- https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/assets/vendor-react-6 | 61 KB | High | 459-674 | 200
- https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/assets/index-DVhxsFYC | 38 KB | High | 460-834 | 200
- https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/favicon.svg | 1 KB | High | 480-653 | 404

**Audit lain yang skornya di bawah 0,9:**
- unused-javascript: Est savings of 28 KiB (skor 0.5)
- network-dependency-tree-insight:  (skor 0)

## preview-mobile (mobile) https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/
Skor tiap run: 100, 100, 100 | median **100**

| run | skor | FCP | LCP | TBT | CLS | SI | BI |
|---|---|---|---|---|---|---|---|
| 1 | 100 | 1329 | 1329 | 4 | 0.000 | 1329 | 2477 |
| 2 | 100 | 1503 | 1503 | 20 | 0.000 | 1503 | 2476 |
| 3 | 100 | 1472 | 1472 | 17 | 0.000 | 1472 | 2482 |

**Elemen LCP dan rinciannya (run median):**
- Time to first byte: 238 ms
- Element render delay: 109 ms
- elemen: `section#beranda > div.section-wrap > div.max-w-2xl > h1.hero-in` `<h1 class="hero-in hero-d2 mt-7 font-display text-[2.35rem] font-bold leading-[1.1] t…">`

**Layout shift:**

**Long tasks:**
- https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/ mulai 1270 durasi 117
- Unattributable mulai 1171 durasi 58

**Main thread:**
- Other: 609
- Style & Layout: 408
- Rendering: 219
- Script Evaluation: 191
- Parse HTML & CSS: 36
- Script Parsing & Compilation: 4

**Request (urutan):**
- https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/ | 36 KB | VeryHigh | 1-248 | 200
- https://res.cloudinary.com/col2kwnv/image/upload/f_auto,q_auto,w_560,c_limit/photo1 | 15 KB | Low | 255-288 | 200
- https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/assets/vendor-react-6 | 61 KB | High | 339-543 | 200
- https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/assets/index-DVhxsFYC | 38 KB | High | 339-488 | 200
- https://arena-ded5308d-nanangdigital-for-ac-nanangdigital-for-ac.wong-moghey.workers.dev/favicon.svg | 1 KB | High | 593-679 | 404

**Audit lain yang skornya di bawah 0,9:**
- unused-javascript: Est savings of 27 KiB (skor 0.5)
- network-dependency-tree-insight:  (skor 0)
