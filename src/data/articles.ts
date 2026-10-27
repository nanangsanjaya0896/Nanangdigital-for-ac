import type { Locale } from "../i18n/LanguageContext";

/**
 * Kumpulan artikel panduan SEO organik untuk menarik trafik gratis dari Google
 * khusus pemilik usaha service AC (ID) maupun kontraktor HVAC global (EN).
 */
export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface SeoArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  summary: string;
  sections: ArticleSection[];
  ctaHeading: string;
  ctaBody: string;
  waMessage: string;
}

export const SEO_ARTICLES_BY_LANG: Record<Locale, SeoArticle[]> = {
  id: [
    {
      slug: "cara-promosi-jasa-service-ac",
      title: "7 Cara Promosi Jasa Service AC Agar Ramai Pelanggan Tetap Tanpa Banting Harga",
      metaTitle: "7 Cara Promosi Jasa Service AC Agar Ramai Pelanggan Tetap | NanangDigital",
      metaDescription:
        "Panduan praktis cara promosi usaha service dan cuci AC rumahan agar dapat pelanggan baru tiap minggu dari Google Maps, website, dan langganan 3 bulanan.",
      category: "Strategi Pelanggan",
      readMinutes: 5,
      publishedAt: "2026-10-23",
      summary:
        "Banyak teknisi AC punya kerjaan rapi dan jujur soal freon, tapi order masih sepi karena cuma mengandalkan kenalan lama. Ini langkah praktis yang terbukti paling cepat mendatangkan panggilan baru.",
      sections: [
        {
          heading: "1. Berhenti Ikut Perang Harga Murah di Marketplace",
          paragraphs: [
            "Kalau Anda memasang tarif cuci AC Rp35 ribu hanya supaya dilirik di grup terbuka, Anda akan habis tenaga di bensin dan waktu jalan. Pelanggan yang cuma cari harga paling murah juga jarang mau jadi pelanggan tetap.",
            "Sebaliknya, pemilik rumah di perumahan cluster, ruko, kantor kecil, dan kos eksklusif sebenarnya tidak keberatan bayar tarif wajar Rp75 ribu sampai Rp100 ribu per unit. Syaratnya cuma satu: usaha Anda terlihat jelas identitasnya, sopan saat dihubungi, dan ada garansi kerja.",
          ],
        },
        {
          heading: "2. Wajib Punya Titik Google Maps & Halaman Website Resmi",
          paragraphs: [
            "Coba posisikan diri sebagai penghuni rumah yang AC kamarnya tiba-tiba tidak dingin jam 9 malam. Hal pertama yang mereka ketik di HP hampir pasti kalimat seperti: service AC terdekat atau tukang cuci AC di kecamatan mereka.",
            "Ketika profil Google Maps Anda terhubung ke website resmi yang menampilkan daftar layanan, estimasi biaya, foto kerja asli, dan tombol WhatsApp sekali klik, tingkat kepercayaan calon pelanggan langsung naik berkali lipat dibanding nomor telepon tanpa keterangan.",
          ],
          bullets: [
            "Cantumkan area jangkauan kecamatan secara jelas di halaman website.",
            "Pasang foto asli saat pengerjaan cuci AC pakai plastik pelindung agar terlihat rapi.",
            "Tuliskan jam operasional dan keterangan garansi bocor atau kurang dingin.",
          ],
        },
        {
          heading: "3. Kunci Langganan Cuci Rutin Setiap 3 Bulan Sekali",
          paragraphs: [
            "Keuntungan terbesar usaha AC bukan dari panggilan pertama, melainkan dari jadwal cuci berkala. Begitu selesai mencuci AC rumah pelanggan dan mereka puas karena lantai tetap bersih, catat tanggal pengerjaan di buku atau HP kerja Anda.",
            "Tepat 90 hari kemudian, kirim pesan pengingat sopan di WhatsApp. Dari 10 pelanggan lama yang dihubungi, rata-rata 5 sampai 6 rumah akan langsung minta dijadwalkan ulang tanpa Anda perlu keluar biaya iklan sepeser pun.",
          ],
        },
        {
          heading: "4. Fokus Iklan Radius 5 sampai 10 Kilometer Saja",
          paragraphs: [
            "Kalau Anda ingin mempercepat order di bulan sepi, pasang iklan Facebook dan Instagram khusus radius 5 sampai 10 kilometer dari titik bengkel Anda. Jangan menargetkan satu provinsi penuh karena biaya jalan teknisi akan bengkak.",
            "Arahkan klik iklan langsung ke landing page usaha AC Anda supaya orang yang masuk ke chat WhatsApp sudah tahu tarif dasar serta layanan yang tersedia.",
          ],
        },
      ],
      ctaHeading: "Mau Punya Website Resmi Usaha AC yang Siap Dipakai Cari Pelanggan?",
      ctaBody:
        "Saya bantu buatkan website rapi lengkap dengan tombol form WhatsApp, SSL HTTPS, Live Chat AI, dan akun Google Maps dalam 3 sampai 5 hari kerja.",
      waMessage:
        "Halo Mas Nanang, saya habis baca artikel cara promosi jasa service AC dan mau tanya soal pembuatan website untuk usaha AC saya.",
    },
    {
      slug: "cara-daftar-usaha-service-ac-di-google-maps",
      title: "Cara Daftar Usaha Service AC di Google Maps Biar Muncul Paling Atas",
      metaTitle: "Cara Daftar Usaha Service AC di Google Maps (Google Business) | NanangDigital",
      metaDescription:
        "Langkah demi langkah mendaftarkan bengkel atau jasa service AC panggilan ke Google Maps / Google Business Profile agar mudah ditemukan pelanggan terdekat.",
      category: "SEO Lokal & Maps",
      readMinutes: 4,
      publishedAt: "2026-10-23",
      summary:
        "Google Maps adalah sumber order gratis paling gurih untuk jasa panggilan seperti cuci AC, bongkar pasang AC, dan isi freon. Ikuti pengaturan nama, kategori, dan website berikut agar cepat naik.",
      sections: [
        {
          heading: "1. Pilih Nama Profil yang Mengandung Kata Kunci Layanan & Kota",
          paragraphs: [
            "Saat membuat akun Google Business Profile, hindari menuliskan singkatan yang hanya dimengerti sendiri seperti BJ Teknik saja. Tambahkan jenis layanan utama secara wajar agar Google langsung paham bidang usaha Anda.",
            "Contoh penamaan yang rapi dan aman misalnya: Berkah Jaya AC, Service & Cuci AC Bekasi Selatan. Nama seperti ini terlihat meyakinkan di mata warga sekitar sekaligus jelas terbaca oleh mesin pencari Google.",
          ],
        },
        {
          heading: "2. Isi Kategori Utama, Area Layanan, dan Tautan Website",
          paragraphs: [
            "Pilih kategori yang paling relevan dengan perbaikan dan perawatan AC, lalu masukkan daftar kecamatan sekitar tempat Anda biasa menerima panggilan.",
            "Kolom Website di profil Google Maps sangat penting untuk mendongkrak peringkat lokal. Profil Maps yang punya website resmi aktif dengan nomor telepon yang sama persis dinilai jauh lebih valid oleh Google dibanding profil yang kolom websitenya kosong.",
          ],
          bullets: [
            "Samakan nomor WhatsApp di Google Maps dengan nomor yang tertulis di website.",
            "Unggah minimal 5 foto kerja asli: mencuci indoor, cek tekanan manifold, dan foto kendaraan kerja.",
            "Lengkapi daftar layanan mulai dari cuci AC split, tambah freon, perbaikan bocor air, hingga bongkar pasang.",
          ],
        },
        {
          heading: "3. Cara Mudah Mengumpulkan Ulasan Bintang 5 Pertama",
          paragraphs: [
            "Begitu Anda selesai membereskan AC pelanggan yang tadinya panas jadi dingin kembali, minta tolong dengan santun di tempat atau kirim link ulasan lewat WhatsApp sore harinya.",
            "Kumpulkan 10 sampai 15 ulasan asli yang menyebut jenis pekerjaan, contohnya: Teknisi datang tepat waktu, cuci AC bersih tidak becek. Kalimat ulasan dari pelanggan asli ini membuat titik Maps Anda jauh lebih cepat naik di halaman pertama.",
          ],
        },
      ],
      ctaHeading: "Paket Website Kami Sudah Sekalian Dibuatkan Akun Google Maps!",
      ctaBody:
        "Tidak mau pusing urus teknis pendaftaran sendiri? Di semua paket pembuatan website NanangDigital, Anda sudah otomatis dibuatkan akun Google My Business (Google Maps) sekalian.",
      waMessage:
        "Halo Mas Nanang, saya baca panduan Google Maps usaha AC. Mau tanya paket website yang sudah sekalian dibuatkan akun Google Maps.",
    },
    {
      slug: "contoh-kata-kata-promosi-service-ac",
      title: "12 Contoh Kata-Kata Promosi Service & Cuci AC untuk WhatsApp, Grup Komplek, dan Sosmed",
      metaTitle: "12 Contoh Kata-Kata Promosi Service & Cuci AC Siap Pakai | NanangDigital",
      metaDescription:
        "Kumpulan contoh kata-kata promosi jasa cuci AC dan service AC panggilan yang sopan, meyakinkan, dan langsung mengundang chat pelanggan di WA maupun Facebook.",
      category: "Copywriting AC",
      readMinutes: 5,
      publishedAt: "2026-10-23",
      summary:
        "Bingung mau nulis status WhatsApp atau posting di grup warga komplek supaya tidak terkesan nyepam? Salin dan sesuaikan contoh kalimat promosi yang fokus pada masalah nyata pemilik rumah berikut.",
      sections: [
        {
          heading: "Contoh Promosi untuk Grup WhatsApp Warga / Perumahan",
          paragraphs: [
            "Di grup warga atau paguyuban komplek, hindari huruf kapital semua dan terlalu banyak emoji. Gunakan bahasa tetangga yang sopan, jelas tarifnya, dan ada jaminan rapi.",
          ],
          bullets: [
            "Izin info Bapak/Ibu warga Cluster Melati. Kalau AC di rumah mulai kurang dingin, meneteskan air, atau sudah lewat 3 bulan belum dicuci, tim kami siap panggilan ke rumah hari ini. Pengerjaan rapi pakai terpal pelindung jadi tembok dan kasur aman. Info jadwal & biaya transparan bisa cek di website kami atau chat WA ini ya. Terima kasih.",
            "Selamat pagi Bapak/Ibu, khusus minggu ini tim teknisi kami sedang keliling jadwal cuci AC rutin area Kecamatan Cimanggis dan sekitarnya. Ambil paket cuci 3 unit sekaligus lebih hemat ongkos panggil. Bergaransi kerja, silakan chat untuk booking jam kosong.",
          ],
        },
        {
          heading: "Contoh Pesan Pengingat Pelanggan Lama (Follow Up 3 Bulanan)",
          paragraphs: [
            "Pesan singkat ke pelanggan lama ini punya rasio balasan paling tinggi karena mereka sudah kenal hasil kerja Anda.",
          ],
          bullets: [
            "Selamat siang Pak/Bu [Nama], salam sehat. Sekadar mengingatkan catatan servis terakhir AC rumah Bapak/Ibu sudah masuk bulan ke-3 sejak pencucian sebelumnya. Supaya tarikan listrik tetap irit dan udara kamar tetap bersih, apakah minggu ini mau dijadwalkan cuci rutin sekalian? Jamnya bebas mengikuti waktu luang di rumah.",
          ],
        },
        {
          heading: "Contoh Teks Iklan Facebook & Instagram Lokal",
          paragraphs: [
            "Untuk iklan berbayar di Meta Ads, kalimat baris pertama harus langsung menyentuh keluhan yang sedang dirasakan pemilik rumah.",
          ],
          bullets: [
            "AC kamar cuma keluar angin padahal setelan remot sudah 16 derajat? Jangan tunggu kompresor ikutan jebol. Teknisi kami siap datang cek & cuci bersih langsung di rumah Anda khusus area [Nama Kota]. Cek rincian layanan kami dan jadwalkan lewat tombol WhatsApp di website.",
            "Baru pindahan rumah atau ruko dan butuh bongkar pasang AC yang rapi plus vakum standar? Dikerjakan teknisi berpengalaman dengan garansi bocor air maupun instalasi. Klik Pelajari Selengkapnya untuk lihat daftar layanan dan booking jadwal.",
          ],
        },
      ],
      ctaHeading: "Ingin Teks Website Usaha AC Anda Sekalian Saya Tuliskan?",
      ctaBody:
        "Anda tidak perlu pusing merangkai kalimat sendiri. Seluruh teks penawaran yang meyakinkan di website usaha AC Anda sudah saya siapkan sampai siap tayang.",
      waMessage:
        "Halo Mas Nanang, saya habis baca contoh kata-kata promosi AC dan tertarik dibuatkan website lengkap dengan penulisan teksnya.",
    },
    {
      slug: "biaya-dan-manfaat-website-service-ac",
      title: "Berapa Biaya Pembuatan Website Usaha Service AC? Ini Rincian Jujur & Manfaatnya",
      metaTitle: "Biaya Pembuatan Website Usaha Service AC & Fasilitas Lengkap | NanangDigital",
      metaDescription:
        "Rincian transparan biaya pembuatan website khusus usaha service AC panggilan mulai Rp1.500.000 lengkap dengan domain, hosting, SSL, Live Chat AI, dan Google Maps.",
      category: "Panduan Website",
      readMinutes: 4,
      publishedAt: "2026-10-23",
      summary:
        "Masih menimbang apakah usaha service AC panggilan perlu punya website sendiri atau cukup nomor WA saja? Simak hitungan balik modalnya yang sangat masuk akal.",
      sections: [
        {
          heading: "Hitung-Hitungan Balik Modal Website untuk Teknisi AC",
          paragraphs: [
            "Harga pembuatan landing page khusus usaha AC yang sudah terima beres sama domain dan hosting satu tahun penuh mulai dari Rp1.500.000 saja, atau setara kurang lebih Rp4.100 per hari selama setahun.",
            "Bandingkan dengan nilai satu pelanggan rumah tangga yang mencuci 3 unit AC ditambah isi freon atau perbaikan ringan: sekali datang bisa menghasilkan Rp250 ribu sampai Rp400 ribu, belum dihitung panggilan ulang tiap 3 bulan. Artinya, dapat 4 sampai 5 pelanggan baru saja dalam setahun modal website Anda sudah kembali utuh.",
          ],
        },
        {
          heading: "Kenapa Kantor, Sekolah, dan Ruko Selalu Mengecek Website Lebih Dulu?",
          paragraphs: [
            "Kalau Anda ingin naik kelas mengerjakan kontrak perawatan AC kantor, klinik, minimarket, kafe, atau kos 20 pintu, bagian admin mereka hampir selalu mencari vendor yang punya profil jelas di Google.",
            "Punya website sendiri dengan gembok keamanan HTTPS, daftar layanan jelas, foto tim di lapangan, serta titik Google Maps membuat penawaran Anda langsung dipercaya untuk order borongan.",
          ],
        },
        {
          heading: "Pilihan Paket Sesuai Tahap Usaha Anda Saat Ini",
          paragraphs: [
            "Kalau fokus Anda saat ini baru ingin punya halaman profil resmi di Google plus Google Maps dan Live Chat AI, Paket Basic (Rp1.500.000) sudah sangat cukup dan lengkap.",
            "Namun kalau Anda ingin sekalian langsung dipasangkan Google Search Console, Google Analytics, Pixel tracking, serta setup kampanye iklan lokal supaya telepon cepat berdering, Paket Growth (Rp2.000.000) adalah pilihan paling hemat.",
          ],
        },
      ],
      ctaHeading: "Cek Kecocokan Paket Dulu Lewat Chat Santai di WhatsApp",
      ctaBody:
        "Pembayaran aman: cukup DP 50% di awal pengerjaan, dan sisa 50% baru dilunasi setelah website selesai dikerjakan serta Anda cocok dengan hasilnya.",
      waMessage:
        "Halo Mas Nanang, saya habis baca rincian biaya website usaha service AC dan mau konsultasi pilih paket yang pas.",
    },
  ],
  en: [
    {
      slug: "cara-promosi-jasa-service-ac",
      title: "7 Ways to Get Consistent Local HVAC & AC Service Customers Without Discount Wars",
      metaTitle: "7 Ways to Get Local HVAC & AC Customers | NanangDigital",
      metaDescription:
        "Practical local marketing playbook for HVAC and AC repair contractors to generate steady high-margin residential calls via Google Maps, websites, and seasonal maintenance plans.",
      category: "Lead Generation",
      readMinutes: 5,
      publishedAt: "2026-10-23",
      summary:
        "Great technicians often struggle with slow shoulder seasons when relying purely on word-of-mouth. Here are the exact local channels that fill dispatch schedules consistently without racing to the bottom on price.",
      sections: [
        {
          heading: "1. Stop Competing With Lowball Lead-Aggregator Directories",
          paragraphs: [
            "Competing on shared lead sites where five other contractors call the same price-shopper burns fuel, time, and morale. Price-only shoppers rarely convert into long-term maintenance agreements.",
            "Homeowners in established neighborhoods happily pay fair residential rates when your company looks legitimate online, communicates clearly, and stands behind its workmanship.",
          ],
        },
        {
          heading: "2. Pair Your Google Business Profile With a Fast Dedicated Website",
          paragraphs: [
            "Picture a homeowner whose AC starts blowing warm air at 8 PM. Their immediate reflex is searching their phone for AC repair near me or HVAC service in their suburb.",
            "Linking your Google Business Profile directly to a clean, fast-loading HVAC website with real technician photos, clear service coverage, and one-tap booking multiplies conversion rates overnight.",
          ],
          bullets: [
            "List every town, suburb, and zip code inside your primary service radius.",
            "Show real photos of neat indoor work, drop cloths, gauges, and service vans.",
            "Display operating hours, workmanship guarantees, and clear next steps.",
          ],
        },
        {
          heading: "3. Lock In Biannual & Quarterly Tune-Up Agreements",
          paragraphs: [
            "Your highest profit comes from repeat visits rather than first-time repairs. Log every completed tune-up date and follow up automatically every 90 to 180 days.",
            "Half of satisfied past customers will happily rebook seasonal maintenance from a polite reminder text or WhatsApp message at zero ad cost.",
          ],
        },
        {
          heading: "4. Run Tight Radius Meta Lead Campaigns Around Your Shop",
          paragraphs: [
            "During slower months, run geo-fenced Facebook & Instagram ads strictly within a 5 to 15 mile radius of your base so windshield time stays short and profitable.",
            "Send clicks straight to a dedicated HVAC landing page rather than a cluttered social feed so every lead arrives pre-qualified.",
          ],
        },
      ],
      ctaHeading: "Want a High-Converting HVAC Website Built in 3 to 5 Days?",
      ctaBody:
        "Every NanangDigital package includes custom HVAC copywriting, instant WhatsApp / lead inquiry form, SSL HTTPS, AI Live Chat, domain & hosting, plus Google Business Profile setup starting at $299 USD.",
      waMessage:
        "Hi Nanang, I just read your 7 HVAC Lead Generation guide and want to discuss building a website for my AC business.",
    },
    {
      slug: "cara-daftar-usaha-service-ac-di-google-maps",
      title: "How to Rank Your HVAC & Air Conditioning Business Higher on Google Maps",
      metaTitle: "Google Business Profile Guide for HVAC Contractors | NanangDigital",
      metaDescription:
        "Step-by-step guide to setting up and ranking an HVAC or AC repair company on Google Maps / Google Business Profile for free local calls.",
      category: "Local SEO & Maps",
      readMinutes: 4,
      publishedAt: "2026-10-23",
      summary:
        "Google Maps drives the highest-intent organic phone calls in the residential HVAC trade. Follow these exact category, website, and review steps to climb your local Map Pack.",
      sections: [
        {
          heading: "1. Choose Clean Branding & Accurate HVAC Categories",
          paragraphs: [
            "Select HVAC contractor and Air conditioning repair service as primary and secondary categories so Google knows exactly which emergency searches match your business.",
            "Define your exact service cities and suburbs clearly instead of leaving coverage blank.",
          ],
        },
        {
          heading: "2. Connect an Authoritative Matching HVAC Website",
          paragraphs: [
            "Google cross-checks your Business Profile against your linked website. Profiles linked to a fast HTTPS website carrying matching phone numbers, service descriptions, and local cities consistently outrank bare listings with no website.",
          ],
          bullets: [
            "Match your phone/WhatsApp number identically on both your website and Google Business Profile.",
            "Upload authentic field photos: coil cleaning, refrigerant diagnostics, and branded trucks.",
            "List individual services clearly: AC repair, seasonal tune-ups, mini-split installs, and drain clearing.",
          ],
        },
        {
          heading: "3. Build Steady 5-Star Homeowner Reviews",
          paragraphs: [
            "Right after restoring cooling for a relieved homeowner, send your direct Google review link via WhatsApp or SMS before leaving the driveway.",
            "Reviews naturally mentioning specific services such as AC repair or tune-up help Google surface your company for those exact searches.",
          ],
        },
      ],
      ctaHeading: "Every Website Package Includes Google Business Profile Setup!",
      ctaBody:
        "Skip technical headaches. All NanangDigital HVAC website packages ($299 Basic, $449 Growth, & Custom) include Google Business Profile setup ready to capture local Maps searches.",
      waMessage:
        "Hi Nanang, I read your Google Maps guide for HVAC contractors and would like to ask about your website packages.",
    },
    {
      slug: "contoh-kata-kata-promosi-service-ac",
      title: "12 Proven HVAC & AC Tune-Up Ad Scripts for Facebook, Instagram, & Customer Follow-Ups",
      metaTitle: "12 Proven HVAC Ad & Follow-Up Copy Templates | NanangDigital",
      metaDescription:
        "Ready-to-use HVAC ad hooks, neighborhood group posts, and customer maintenance reminder scripts that turn homeowners into booked jobs.",
      category: "HVAC Copywriting",
      readMinutes: 5,
      publishedAt: "2026-10-23",
      summary:
        "Not sure what to write in local ads or customer reminder messages without sounding pushy? Swipe these field-tested HVAC copy angles focused on real homeowner pain points.",
      sections: [
        {
          heading: "Neighborhood Community & Local Homeowner Group Posts",
          paragraphs: [
            "Skip ALL CAPS and hype. Speak like a helpful local neighbor offering clean work, shoe covers, and upfront pricing.",
          ],
          bullets: [
            "Hi neighbors in [Suburb/Area]! With temperatures climbing this week, if your AC is blowing warm air, dripping water indoors, or overdue for its seasonal tune-up, our local crew has open slots tomorrow. Clean in-home service, upfront pricing, and guaranteed workmanship. Check our rates or book in 1 tap on our website.",
            "Quick heads-up for homeowners around [City]: our technicians are running multi-unit AC tune-up & coil cleaning bundles in the neighborhood this week. Book 2+ units together and save on dispatch. Message us anytime to lock in a window.",
          ],
        },
        {
          heading: "Past-Customer Seasonal Maintenance Reminder Script",
          paragraphs: [
            "Sending this simple check-in message to past customers generates the highest ROI in residential HVAC.",
          ],
          bullets: [
            "Hi [Name], hope you're doing great! Just a quick friendly reminder that it's been 6 months since we last serviced your AC system. Want us to pop by this week for a quick tune-up and drain check so energy bills stay low and cooling stays ice-cold? Let me know what day works best for you.",
          ],
        },
        {
          heading: "High-Converting Facebook & Instagram Local Lead Ad Hooks",
          paragraphs: [
            "On Meta Ads, your first line must call out an unmistakable homeowner symptom plus your exact city.",
          ],
          bullets: [
            "Thermostat set to 68°F in [City] and your vents are still blowing warm air? Don't wait for a full compressor failure. Our local techs handle fast residential diagnostics & repairs with upfront pricing. Tap Learn More to book.",
            "Planning a mini-split installation or replacing an aging AC unit in [City]? Neat workmanship, proper vacuum & commissioning, and full warranty backed by a local crew. Tap below to get a fast quote.",
          ],
        },
      ],
      ctaHeading: "Want All Your Website & Ad Copy Written Done-For-You?",
      ctaBody:
        "Every word on your new HVAC website (and ad creatives in our $449 Growth plan) is written from scratch for your business so you never stare at a blank screen.",
      waMessage:
        "Hi Nanang, I checked out your 12 HVAC copywriting templates and want a custom HVAC website + copy built for my shop.",
    },
    {
      slug: "biaya-dan-manfaat-website-service-ac",
      title: "How Much Should an HVAC Contractor Website Cost? Transparent ROI Breakdown",
      metaTitle: "HVAC Website Cost & ROI Breakdown ($299-$449) | NanangDigital",
      metaDescription:
        "Honest breakdown of HVAC website pricing, agency traps to avoid, and how a $299-$449 one-time site pays for itself in 1-2 service calls.",
      category: "Website ROI Guide",
      readMinutes: 4,
      publishedAt: "2026-10-23",
      summary:
        "Traditional web agencies charge $3,000+ upfront plus steep monthly retainers. Here is how modern HVAC contractors launch faster and break even on their very first job.",
      sections: [
        {
          heading: "The Real Math: 1 Booked Repair Pays Off Your Entire Website",
          paragraphs: [
            "A complete turnkey HVAC website at NanangDigital starts at $299 one-time (including 1st-year custom domain, fast hosting, SSL HTTPS, AI Live Chat, and Google Business setup).",
            "Compare that against a single residential AC repair ($250 to $650+) or a single system install ($5,000+). Landing just one or two local calls in an entire year puts you permanently in profit with full ownership of your domain.",
          ],
        },
        {
          heading: "Why Commercial Property Managers Always Check Your Website First",
          paragraphs: [
            "If you want lucrative recurring maintenance contracts for offices, clinics, restaurants, or retail stores, facility managers always vet your website before requesting a bid.",
            "Having a fast, modern HTTPS site with clear commercial & residential capabilities immediately sets you apart from one-man operations.",
          ],
        },
        {
          heading: "Which Package Fits Your Current Stage?",
          paragraphs: [
            "Choose Basic ($299 USD) if you want a sharp, trustworthy online headquarters connected to Google Maps and WhatsApp within 3 to 5 days.",
            "Choose Growth ($449 USD) if you also want Google Search Console, Google Analytics 4, Meta Pixel + CAPI tracking, and a complete local Meta Lead Ads campaign ready to generate calls immediately.",
          ],
        },
      ],
      ctaHeading: "Chat Directly on WhatsApp With 50/50 Milestone Protection",
      ctaBody:
        "Pay just 50% upfront to start and the final 50% only after previewing and approving your finished live HVAC website.",
      waMessage:
        "Hi Nanang, I read your HVAC website pricing & ROI guide and would like to pick the best package for my business.",
    },
  ],
};

export const SEO_ARTICLES: SeoArticle[] = SEO_ARTICLES_BY_LANG.id;

export function findArticleBySlug(slug: string, lang: Locale = "id"): SeoArticle | undefined {
  return SEO_ARTICLES_BY_LANG[lang].find((item) => item.slug === slug);
}
