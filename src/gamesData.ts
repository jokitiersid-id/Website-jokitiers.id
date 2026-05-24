import { Game, PaymentGateway, Article, LeaderboardUser } from './types';

// Image paths are strings to prevent tsx/Node module loader crashes in server environment
const mlbbBanner = '/images/mlbb_banner_1779415720349.png';
const jokiBanner = '/images/jasa_joki_mlbb_banner_1779415194035.png';
const mabarBanner = '/images/jasa_mabar_banner_1779415215495.png';
const ffBanner = '/images/free_fire_banner_1779415173582.png';
const pubgBanner = '/images/pubg_mobile_banner_1779415132693.png';
const hokBanner = '/images/honor_of_kings_banner_1779415153904.png';
const mcBanner = '/images/magic_chess_banner_1779416366364.png';
const abBanner = '/images/arena_breakout_banner_1779416386141.png';
const valBanner = '/images/valorant_banner_1779416408125.png';
const genshinBanner = '/images/genshin_banner_1779416430308.png';
const hsrBanner = '/images/star_rail_banner_1779416448635.png';
const robloxBanner = '/images/roblox_banner_1779416465639.png';

export const GAMES_DATA: Game[] = [
  {
    id: 'mobile-legends',
    name: 'Mobile Legends',
    developer: 'Moonton',
    category: 'games',
    logoSvg: mlbbBanner,
    isHot: true,
    accentColor: '#ef4444',
    bannerImage: mlbbBanner,
    inputFields: [
      { key: 'userId', label: 'User ID', placeholder: 'Contoh: 12345678', type: 'text' },
      { key: 'zoneId', label: 'Zone ID', placeholder: 'Contoh: 1234', type: 'text' }
    ],
    nominals: [
      { id: 'ml-5', name: '5 Diamonds', price: 1500, originalPrice: 2000 },
      { id: 'ml-12', name: '12 Diamonds', price: 3400, originalPrice: 4000 },
      { id: 'ml-53', name: '53 Diamonds', price: 14200, originalPrice: 16000 },
      { id: 'ml-86', name: '86 Diamonds', price: 21500, originalPrice: 25000 },
      { id: 'ml-wdp', name: 'Weekly Diamond Pass (WDP)', price: 27500, originalPrice: 35000, badge: 'Gacor 🔥' },
      { id: 'ml-172', name: '172 Diamonds', price: 42900, originalPrice: 50000 },
      { id: 'ml-257', name: '257 Diamonds', price: 63500, originalPrice: 75000 },
      { id: 'ml-344', name: '344 Diamonds', price: 84300, originalPrice: 100000 },
      { id: 'ml-starlight', name: 'Starlight Member', price: 140000, originalPrice: 160000, badge: 'Hot' },
      { id: 'ml-706', name: '706 Diamonds', price: 169000, originalPrice: 200000 },
      { id: 'ml-1050', name: '1050 Diamonds', price: 252000, originalPrice: 300000 },
      { id: 'ml-2195', name: '2195 Diamonds', price: 515000, originalPrice: 600000 }
    ]
  },
  {
    id: 'joki-rank',
    name: 'Joki Rank Mobile Legends',
    developer: 'JOKITIERS',
    category: 'specialist_mlbb',
    logoSvg: jokiBanner,
    isHot: true,
    accentColor: '#f59e0b',
    bannerImage: jokiBanner,
    inputFields: [
      { key: 'accountType', label: 'Tipe Login', placeholder: 'Moonton / Montoon / Facebook', type: 'select', options: ['Moonton', 'Facebook', 'Google Play', 'TikTok'] },
      { key: 'username', label: 'Email / Username Akun', placeholder: 'Masukkan Email / Username', type: 'text' },
      { key: 'password', label: 'Kata Sandi Akun', placeholder: 'Masukkan Password Akun', type: 'text' },
      { key: 'heroReq', label: 'Request Hero / Role', placeholder: 'Contoh: Claude, Gusion, Core/Goldlane', type: 'text' }
    ],
    nominals: [
      { id: 'joki-gm', name: 'Grandmaster (Per Bintang)', price: 4500, originalPrice: 6000 },
      { id: 'joki-epic', name: 'Epic (Per Bintang)', price: 7000, originalPrice: 9000 },
      { id: 'joki-legend', name: 'Legend (Per Bintang)', price: 9500, originalPrice: 12000 },
      { id: 'joki-mythic-grad', name: 'Mythic Grading (10 Match)', price: 120000, originalPrice: 150000, badge: 'Promo' },
      { id: 'joki-mythic-star', name: 'Mythic (Per Bintang)', price: 22000, originalPrice: 30000 },
      { id: 'joki-honor-star', name: 'Mythical Honor (Per Bintang)', price: 32000, originalPrice: 40000 },
      { id: 'joki-glory-star', name: 'Mythical Glory (Per Bintang)', price: 45000, originalPrice: 55000, badge: 'VIP' }
    ]
  },
  {
    id: 'jasa-mabar',
    name: 'Jasa Mabar Push',
    developer: 'JOKITIERS',
    category: 'specialist_mlbb',
    logoSvg: mabarBanner,
    isHot: true,
    accentColor: '#ea580c',
    bannerImage: mabarBanner,
    inputFields: [
      { key: 'lobbyId', label: 'ID Game & Server', placeholder: 'Contoh: 12345678 (2132)', type: 'text' },
      { key: 'waContact', label: 'ID Line / Discord', placeholder: 'ID Discord / Line untuk voice call (opsional)', type: 'text' }
    ],
    nominals: [
      { id: 'mabar-gm-1', name: 'Mabar GM (1 Match)', price: 8000, originalPrice: 10000 },
      { id: 'mabar-epic-1', name: 'Mabar Epic (1 Match)', price: 12000, originalPrice: 15000 },
      { id: 'mabar-legend-1', name: 'Mabar Legend (1 Match)', price: 16000, originalPrice: 20000 },
      { id: 'mabar-mythic-1', name: 'Mabar Mythic (1 Match)', price: 28000, originalPrice: 35000, badge: 'GG Guaranteed' }
    ]
  },
  {
    id: 'free-fire',
    name: 'Free Fire',
    developer: 'Garena',
    category: 'games',
    logoSvg: ffBanner,
    isHot: true,
    accentColor: '#f97316',
    bannerImage: ffBanner,
    inputFields: [
      { key: 'userId', label: 'Player ID', placeholder: 'Contoh: 87654321', type: 'text' }
    ],
    nominals: [
      { id: 'ff-5', name: '5 Diamonds', price: 1000, originalPrice: 1500 },
      { id: 'ff-20', name: '20 Diamonds', price: 3000, originalPrice: 4000 },
      { id: 'ff-50', name: '50 Diamonds', price: 7100, originalPrice: 9000 },
      { id: 'ff-70', name: '70 Diamonds', price: 9200, originalPrice: 11000 },
      { id: 'ff-140', name: '140 Diamonds', price: 18200, originalPrice: 22000, badge: 'Terlaris' },
      { id: 'ff-weekly', name: 'Membership Mingguan', price: 29000, originalPrice: 35000 },
      { id: 'ff-monthly', name: 'Membership Bulanan', price: 88500, originalPrice: 110000 },
      { id: 'ff-355', name: '355 Diamonds', price: 46200, originalPrice: 55000 },
      { id: 'ff-720', name: '720 Diamonds', price: 91500, originalPrice: 110000 },
      { id: 'ff-1440', name: '1440 Diamonds', price: 181500, originalPrice: 220000 }
    ]
  },
  {
    id: 'pubg-mobile',
    name: 'PUBG Mobile',
    developer: 'Tencent Games',
    category: 'games',
    logoSvg: pubgBanner,
    isHot: true,
    accentColor: '#10b981',
    bannerImage: pubgBanner,
    inputFields: [
      { key: 'userId', label: 'ID Karakter', placeholder: 'Contoh: 512345678', type: 'text' }
    ],
    nominals: [
      { id: 'pubg-30', name: '30 + 2 Unknown Cash', price: 7000, originalPrice: 8500 },
      { id: 'pubg-60', name: '60 + 3 Unknown Cash', price: 13500, originalPrice: 16000 },
      { id: 'pubg-325', name: '325 Unknown Cash', price: 68000, originalPrice: 80000 },
      { id: 'pubg-660', name: '660 Unknown Cash', price: 134000, originalPrice: 160000, badge: 'Terlaris' },
      { id: 'pubg-royal-pass', name: 'Royale Pass Upgrade', price: 155000, originalPrice: 180000 },
      { id: 'pubg-1800', name: '1800 Unknown Cash', price: 345000, originalPrice: 400000 },
      { id: 'pubg-3850', name: '3850 Unknown Cash', price: 685000, originalPrice: 800000 }
    ]
  },
  {
    id: 'honor-of-kings',
    name: 'Honor of Kings',
    developer: 'Tencent Games',
    category: 'games',
    logoSvg: hokBanner,
    isHot: true,
    accentColor: '#3b82f6',
    bannerImage: hokBanner,
    inputFields: [
      { key: 'userId', label: 'Player ID / UID', placeholder: 'Contoh: HOK123456789', type: 'text' }
    ],
    nominals: [
      { id: 'hok-8', name: '8 Tokens', price: 2000, originalPrice: 2500 },
      { id: 'hok-40', name: '40 Tokens', price: 9200, originalPrice: 11000 },
      { id: 'hok-88', name: '88 Tokens', price: 18500, originalPrice: 22000 },
      { id: 'hok-240', name: '240 Tokens', price: 47900, originalPrice: 55000, badge: 'Gacor 🔥' },
      { id: 'hok-430', name: '430 Tokens', price: 82500, originalPrice: 95000 },
      { id: 'hok-1200', name: '1200 Tokens', price: 229000, originalPrice: 260000 }
    ]
  },
  {
    id: 'magic-chess',
    name: 'Magic Chess: Go Go',
    developer: 'Moonton',
    category: 'specialist_magicchess',
    logoSvg: mcBanner,
    isHot: true,
    accentColor: '#a855f7',
    bannerImage: mcBanner,
    inputFields: [
      { key: 'userId', label: 'User ID', placeholder: 'Masukkan User ID', type: 'text' },
      { key: 'zoneId', label: 'Zone ID', placeholder: 'Masukkan Zone ID', type: 'text' }
    ],
    nominals: [
      { id: 'mc-weekly', name: 'Weekly Pass', price: 29500, originalPrice: 35000 },
      { id: 'mc-starlight', name: 'Star Member', price: 139000, originalPrice: 150000, badge: 'Hot' },
      { id: 'mc-50', name: '50 Coins', price: 14000, originalPrice: 16000 },
      { id: 'mc-100', name: '100 Coins', price: 27500, originalPrice: 32000 },
      { id: 'mc-500', name: '500 Coins', price: 135000, originalPrice: 155000 }
    ]
  },
  {
    id: 'arena-breakout',
    name: 'Arena Breakout Infinite',
    developer: 'Tencent',
    category: 'games',
    logoSvg: abBanner,
    accentColor: '#4b5563',
    bannerImage: abBanner,
    inputFields: [
      { key: 'userId', label: 'Character ID', placeholder: 'Contoh: AB-762913', type: 'text' }
    ],
    nominals: [
      { id: 'ab-60', name: '60 Bonds', price: 14500, originalPrice: 17000 },
      { id: 'ab-310', name: '310 Bonds', price: 71000, originalPrice: 85000 },
      { id: 'ab-630', name: '630 Bonds', price: 142000, originalPrice: 165000, badge: 'Recommend' },
      { id: 'ab-1300', name: '1300 Bonds', price: 285000, originalPrice: 330000 }
    ]
  },
  {
    id: 'valorant',
    name: 'Valorant',
    developer: 'Riot Games',
    category: 'voucher',
    logoSvg: valBanner,
    accentColor: '#dc2626',
    bannerImage: valBanner,
    inputFields: [
      { key: 'riotId', label: 'Riot ID / Tagline', placeholder: 'Contoh: Joki#IDN', type: 'text' }
    ],
    nominals: [
      { id: 'val-125', name: '125 Valorant Points', price: 14000, originalPrice: 16000 },
      { id: 'val-375', name: '375 Valorant Points', price: 41000, originalPrice: 48000 },
      { id: 'val-650', name: '650 Valorant Points', price: 71000, originalPrice: 80050 },
      { id: 'val-1375', name: '1375 Valorant Points', price: 139000, originalPrice: 160000, badge: 'Popular' },
      { id: 'val-2400', name: '2400 Valorant Points', price: 236000, originalPrice: 270000 }
    ]
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    developer: 'Cognosphere',
    category: 'games',
    logoSvg: genshinBanner,
    accentColor: '#0ea5e9',
    bannerImage: genshinBanner,
    inputFields: [
      { key: 'uid', label: 'UID', placeholder: 'Contoh: 182749539', type: 'text' },
      { key: 'server', label: 'Server', placeholder: 'Select Server', type: 'select', options: ['Asia', 'America', 'Europe', 'TW/HK/MO'] }
    ],
    nominals: [
      { id: 'genshin-welkin', name: 'Blessing of the Welkin Moon', price: 71000, originalPrice: 79000, badge: '🔥 Hemat' },
      { id: 'genshin-60', name: '60 Genesis Crystals', price: 14000, originalPrice: 17000 },
      { id: 'genshin-300', name: '300 + 30 Genesis Crystals', price: 71000, originalPrice: 85000 },
      { id: 'genshin-980', name: '980 + 110 Genesis Crystals', price: 212000, originalPrice: 250000 },
      { id: 'genshin-1980', name: '1980 + 260 Genesis Crystals', price: 425000, originalPrice: 500000 }
    ]
  },
  {
    id: 'star-rail',
    name: 'Honkai Star Rail',
    developer: 'Cognosphere',
    category: 'games',
    logoSvg: hsrBanner,
    accentColor: '#4f46e5',
    bannerImage: hsrBanner,
    inputFields: [
      { key: 'uid', label: 'UID', placeholder: 'Contoh: 801123456', type: 'text' },
      { key: 'server', label: 'Server', placeholder: 'Select Server', type: 'select', options: ['Asia', 'America', 'Europe', 'TW/HK/MO'] }
    ],
    nominals: [
      { id: 'hsr-pass', name: 'Express Supply Pass', price: 71000, originalPrice: 79000, badge: 'Popular' },
      { id: 'hsr-60', name: '60 Oneiric Shards', price: 14000, originalPrice: 17000 },
      { id: 'hsr-300', name: '300 + 30 Oneiric Shards', price: 71000, originalPrice: 85000 },
      { id: 'hsr-980', name: '980 + 110 Oneiric Shards', price: 212000, originalPrice: 250000 },
      { id: 'hsr-1980', name: '1980 + 260 Oneiric Shards', price: 425000, originalPrice: 500000 }
    ]
  },
  {
    id: 'roblox',
    name: 'Roblox (Robux Direct)',
    developer: 'Roblox Corp',
    category: 'specialist_roblox',
    logoSvg: robloxBanner,
    accentColor: '#374151',
    bannerImage: robloxBanner,
    inputFields: [
      { key: 'username', label: 'Username Roblox', placeholder: 'Contoh: RobloxGamer_123', type: 'text' }
    ],
    nominals: [
      { id: 'rb-80', name: '80 Robux', price: 14100, originalPrice: 18000 },
      { id: 'rb-400', name: '400 Robux', price: 68000, originalPrice: 85000 },
      { id: 'rb-800', name: '800 Robux', price: 135000, originalPrice: 170000, badge: 'Gacor 🔥' },
      { id: 'rb-1700', name: '1700 Robux', price: 285000, originalPrice: 350000 }
    ]
  }
];

export const PAYMENT_METHODS: PaymentGateway[] = [
  {
    id: 'qris',
    name: 'QRIS (Gopay, OVO, Dana, LinkAja, ShopeePay)',
    group: 'QR Code',
    fee: 300,
    instructions: [
      'Pindai QR Code QRIS JOKITIERS yang ditampilkan.',
      'Buka DANA, GoPay, OVO, LinkAja, ShopeePay atau e-wallet/M-Banking Anda.',
      'Scan QR Code lalu masukkan nominal sesuai total tagihan.',
      'Selesaikan pembayaran dan simpan bukti transaksi.',
      'Klik tombol "Verifikasi Pembayaran Otomatis" untuk update status Anda secara instan.'
    ]
  },
  {
    id: 'bca_va',
    name: 'BCA Virtual Account',
    group: 'Virtual Account',
    fee: 2500,
    instructions: [
      'Pilih Transfer > Virtual Account.',
      'Masukkan nomor Virtual Account BCA yang diberikan.',
      'Pastikan jumlah tagihan dan nama merchant "JOKITIERS" sudah sesuai.',
      'Masukkan PIN m-BCA Anda.',
      'Pembayaran Anda terdeteksi otomatis.'
    ]
  },
  {
    id: 'mandiri_va',
    name: 'Mandiri Virtual Account',
    group: 'Virtual Account',
    fee: 2500,
    instructions: [
      'Buka aplikasi Livin\' by Mandiri, pilih Bayar / Multipayment.',
      'Masukkan kode perusahaan / cari JOKITIERS.',
      'Masukkan nomor Virtual Account Mandiri yang tertera.',
      'Periksa nominal pembayaran Anda lalu tekan Konfirmasi.',
      'Transaksi Anda selesai.'
    ]
  },
  {
    id: 'bni_va',
    name: 'BNI Virtual Account',
    group: 'Virtual Account',
    fee: 2500,
    instructions: [
      'Pilih Menu Transfer > Virtual Account Billing.',
      'Masukkan nomor Virtual Account BNI Billing Anda.',
      'Periksa kesesuaian data pada layar konfirmasi.',
      'Selesaikan pembayaran m-banking BNI Anda.',
      'Status pembayaran akan diperbarui instan.'
    ]
  },
  {
    id: 'dana',
    name: 'DANA E-Wallet Transfer',
    group: 'E-Wallet',
    fee: 300,
    instructions: [
      'Buka aplikasi DANA Anda.',
      'Pilih menu "Kirim" -> "Kirim ke Nomor Telepon".',
      'Masukkan nomor tujuan DANA: 089506740917 (A/N: JOKITIERS).',
      'Masukkan nominal transfer sebesar total tagihan.',
      'Konfirmasi nama penerima JOKITIERS, lalu selesaikan pembayaran.',
      'Simpan tangkapan layar bukti transfer Anda.',
      'Kembali ke halaman tagihan dan klik "Verifikasi Pembayaran Otomatis" untuk memproses otomatis.'
    ]
  },
  {
    id: 'gopay',
    name: 'GoPay E-Wallet Transfer',
    group: 'E-Wallet',
    fee: 300,
    instructions: [
      'Buka aplikasi GoTo / Gojek Anda.',
      'Pilih menu "Pay" / "Bayar" -> "Send to Phone Number".',
      'Masukkan nomor tujuan GoPay: 089506740917 (A/N: JOKITIERS).',
      'Ketikkan nominal transfer sesuai total tagihan.',
      'Pastikan nama penerima tertulis JOKITIERS, lalu konfirmasi PIN.',
      'Simpan bukti transfer Anda.',
      'Kembali ke halaman tagihan dan klik "Verifikasi Pembayaran Otomatis" untuk memproses otomatis.'
    ]
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay Direct',
    group: 'E-Wallet',
    fee: 500,
    instructions: [
      'Klik tombol "Bayar via ShopeePay" pada tagihan Anda.',
      'Aplikasi Shopee akan terbuka otomatis.',
      'Pilih metode pembayaran ShopeePay lalu klik Bayar Sekarang.',
      'Masukkan PIN ShopeePay Anda.',
      'Selesai, sistem akan redirect kembali.'
    ]
  },
  {
    id: 'alfamart',
    name: 'Alfamart / Alfa Midi',
    group: 'Convenience Store',
    fee: 3500,
    instructions: [
      'Kunjungi gerai Alfamart terdekat.',
      'Katakan pada kasir bahwa Anda ingin membayar tagihan "PLASAPAY / JOKITIERS".',
      'Tunjukkan kode bayar / nomor tagihan Anda.',
      'Bayar tunai kepada kasir setara nominal tagihan + biaya admin.',
      'Minta struk bukti pembayaran dari kasir.'
    ]
  },
  {
    id: 'indomaret',
    name: 'Indomaret / Ceriamart',
    group: 'Convenience Store',
    fee: 3500,
    instructions: [
      'Datangi gerai Indomaret terdekat.',
      'Sampaikan pada kasir untuk pembayaran merchant online JOKITIERS.',
      'Berikan kode bayar kepada kasir.',
      'Lakukan pembayaran sesuai nominal yang disebutkan.',
      'Ambil struk pembayaran sebagai bukti sah transaksi.'
    ]
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: 'f-1',
    title: 'Most Picked Hero Mobile Legends Episode 3 - May Week 4',
    category: 'Mobile Legends',
    author: 'wawangtiktok',
    date: 'Mei 24, 2026',
    readTime: '3 Menit',
    upperText: "MOST PICKED HERO 'MEI WEEK 4'",
    isFeatured: true,
    imageUrl: '/images/mlbb_banner_1779415720349.png',
    content: `Berikut adalah rincian turnamen dan Ranked mode Original Server mengenai hero yang paling sering dipilih (Most Picked Hero) pada periode Mei Minggu ke-4:
    
1. **Harith (Gold Lane / Mid Lane)**: Sangat mendominasi setelah patch penyesuaian magic power scaling. Shield serta serangan burst harian menjadikannya pilihan gold laner terkuat.
2. **Nolan (Jungler)**: Kecepatan memotong lane serta kemudahan membersihkan monster hutan menjadikan bapak satu anak ini andalan wajib pick di tier Mythic Glory.
3. **Minsitthar (Roamer/Exp Laner)**: Efek kontrol areanya bisa membatalkan seluruh dash skill andalan assassin lincah seperti Nolan, Joy, dan Fanny.
4. **Vexana (Mid Lane)**: Kemampuan pertahanan areanya yang tinggi dan damage puppet pelindung menjadikannya midlaner paling stabil di meta saat ini.`
  },
  {
    id: 'p-1',
    title: 'Most Banned Hero Mobile Legends Episode 4 - February Week 4',
    category: 'Mobile Legends',
    author: 'wawangtiktok',
    date: 'Maret 02, 2025',
    readTime: '4 Menit',
    upperText: 'MOST BANNED HERO FEB WEEK 4',
    isPopular: true,
    imageUrl: '/images/jasa_joki_mlbb_banner_1779415194035.png',
    content: `Daftar hero yang paling sering terkena pelarangan (banned list) sepanjang Februari minggu ke-4 di tingkat Rank tinggi (Mythical Honor ke atas):

1. **Tiger / Tigreal**: Efek inisiasi kombo flicker Ultimate + skill 2 yang membalikkan tim seketika membuatnya dilarang di lebih dari 85% pertandingan.
2. **Lunox**: Kemampuan menembus item tank pertahanan keras lawan membuatnya sangat ditakuti para EXP laner tebal.
3. **Fanny**: Jika berada di tangan yang tepat, mobilitas melintasi tembok map tanpa hambatan membuatnya terlalu berisiko untuk dilepas.
4. **Mathilda**: Roamer serbaguna dengan heal instan serta mobilitas tinggi untuk menyelamatkan ataupun mengejar lawan.`
  },
  {
    id: 'p-2',
    title: 'Build Miya Tersakit 2025 - Experiment Labs Mobile Legends Episode 43',
    category: 'Mobile Legends',
    author: 'wawangtiktok',
    date: 'April 01, 2025',
    readTime: '5 Menit',
    upperText: 'EXPERIMENT LABS | BUILD MIYA',
    isPopular: true,
    imageUrl: '/images/jokitiers_banner_joki_1779412822064.png',
    content: `Rekomendasi build Miya tersakit versi laboratorium eksperimen terbaru untuk memberikan daya serang kritikal beruntun maksimal di fase late game:

- **Swift Boots** (Kecepatan Serang dasar)
- **Windtalker** (Penambahan kecepatan gerak dan percikan magic damage sampingan)
- **Bersaker\'s Fury** (Kunci utama pemicu damage kritikal berlipat ganda)
- **Haas Claws** (Memberikan efek Lifesteal agar bisa terus bertahan saat bertukar serangan dasar)
- **Malefic Roar** (Mengurangi pertahanan fisik tank musuh secara signifikan)
- **Rose Gold Meteor / Wind of Nature** (Item perlindungan darurat dari physical burster)`
  },
  {
    id: 'p-3',
    title: 'Cobain Build Alpha Ini - Experiment Labs Episode 1',
    category: 'Mobile Legends',
    author: 'wawangtiktok',
    date: 'Oktober 22, 2024',
    readTime: '4 Menit',
    upperText: 'COBAIN BUILD ALPHA | EXPERIMENT LABS',
    isPopular: true,
    imageUrl: '/images/jokitiers_banner_joki_1779412822064.png',
    content: `Build terkuat Alpha Fighter Jungler semi-tank dengan utilitas cooldown reduction maksimal serta spell vamp agresif dari pasif Beta:

- **Tough Boots - Ice Retribution**
- **Hunter Strike** (Menambah physical penetration serta movement speed tambahan)
- **War Axe** (Sinergi regenerasi damage murni panjang selama duel tim berkepanjangan)
- **Brute Force Breastplate** (Proteksi fisik dan pengurang durasi kontrol musuh)
- **Oracle** (Menaikkan penyerapan shield ekstra serta spell vamp penyembuhan)
- **Athena\'s Shield / Antique Cuirass** (Menangkal burst hero burst magic / burst physical)`
  },
  {
    id: 'p-4',
    title: 'Cara Counter Hero Hanzo Mobile Legends',
    category: 'Mobile Legends',
    author: 'wawangtiktok',
    date: 'Maret 09, 2025',
    readTime: '3 Menit',
    upperText: 'COUNTER HERO | HANZO EDITION',
    isPopular: true,
    imageUrl: '/images/mlbb_banner_1779415720349.png',
    content: `Langkah dan pilihan taktik jitu untuk mematikan pergerakan Hanzo Assassin pengintai sebelum ia menyapu bersih tim Anda menggunakan wujud bayangan iblisnya:

1. **Pick Hero Pencari Tubuh Asli**: Gunakan hero dengan jangkauan global atau mobilitas tinggi layaknya **Ling, Natalia, Helcurt, Aldous**, atau **Yi Sun-shin** untuk langsung mendeteksi dan menghantam raga aslinya yang sedang bersembunyi di semak-semak.
2. **Pantau Garis Merah Hubungan Tubuh**: Ikuti arah tali koneksi bayangan Hanzo untuk memprediksi tempat persembunyiannya yang terdekat.
3. **Infiltrasi Buff Biru di Early Game**: Hanzo sangat bergantung pada konsumsi mana/energi buff biru untuk meluncurkan bayangannya.`
  },
  {
    id: '1',
    title: 'Cara Daftar dan Aktivasi Akun di Website Takapedia',
    category: 'Mobile Legends',
    author: 'Mintime',
    date: 'November 21, 2025',
    readTime: '3 Menit',
    upperText: 'CARA DAFTAR DAN AKTIVASI AKUN DI WEBSITE TAKAPEDIA',
    imageUrl: '/images/jokitiers_banner_topup_1779412841630.png',
    content: `Berikut adalah panduan lengkap cara melakukan registrasi akun baru di Website Takapedia / JOKITIERS untuk mendapatkan akses transaksi yang lebih cepat, promo eksklusif, serta integrasi pemantauan otomatis:

1. Klik tombol **Daftar / Masuk** yang terletak di bar bagian kanan atas.
2. Masukkan alamat Surat Elektronik (E-mail) Anda yang aktif, nomor kontak WhatsApp, serta buatlah kata sandi yang kuat.
3. Klik submit dan lakukan verifikasi pendaftaran lewat tautan/kode yang dikirimkan.
4. Lakukan login akun Anda yang telah diaktivasi untuk mulai mengumpulkan poin member serta potongan harga spesial top-up!`
  },
  {
    id: '2',
    title: 'Cara Melihat Limit Weekly Diamond Pass (WDP)',
    category: 'Mobile Legends',
    author: 'Mintime',
    date: 'November 19, 2025',
    readTime: '4 Menit',
    upperText: 'CARA MELIHAT LIMIT WEEKLY DIAMOND PASS',
    badgeText: 'Rebate: 455%',
    imageUrl: '/images/jokitiers_banner_topup_1779412841630.png',
    content: `Weekly Diamond Pass (WDP) merupakan salah satu produk penawaran diskon top-up Mobile Legends terlaris saat ini. Namun, banyak pengguna yang masih bingung mengenai batasan atau limit pembelian tumpukan (stacking):

1. **Staking Limit**: Batas tumpukan maksimal pembelian Weekly Diamond Pass dalam satu akun MLBB adalah sebesar **70 Hari** (setara dengan **10 Kali Berlangganan**).
2. **Cara Cek**: Masuk ke in-game Mobile Legends Anda, klik tab Diamond di bagian atas, pilih halaman Weekly Diamond Pass. Di situ akan terlihat durasi hari pass Anda yang tersisa.
3. **Peringatan Penting**: Jika durasi tersisa Anda masih di atas 70 hari, Anda tidak dapat mengklaim tambahan tumpukan baru hingga durasi tersebut berkurang.`
  },
  {
    id: '3',
    title: 'Update Patch Notes Original Server Terbaru Versi 2.1.30 - Buff, Nerf, Adjustment Item/Equipment',
    category: 'Mobile Legends',
    author: 'Mintime',
    date: 'November 09, 2025',
    readTime: '5 Menit',
    upperText: 'UPDATE ITEMS ORI | VERSI 2.1.30',
    imageUrl: '/images/mlbb_banner_1779415720349.png',
    content: `Sambut pembaruan patch notes 2.1.30 original server untuk meta item pertahanan (defense) serta serangan physical penembus armor tank:

- **Twilight Armor**: Efek penyerapan burst damage fisik berlebih kini dipicu lebih responsif, membantu hero marksman menahan serangan mendadak kencang assassin tipe physical.
- **Thunder Belt**: Mengalami penyesuaian penanda scaling physical defense, menjadikannya item wajib offlaner fighter tebal.
- **Glowing Wand & Genius Wand**: Efek pengurangan magic defense kini disatukan secara efisien, memberikan meta mage keuntungan ruang slot item.`
  },
  {
    id: '4',
    title: 'Update Patch Notes Original Server Terbaru Versi 2.1.30 - Buff, Nerf, Adjustment Hero',
    category: 'Mobile Legends',
    author: 'Mintime',
    date: 'November 09, 2025',
    readTime: '6 Menit',
    upperText: 'UPDATE PATCH NOTES | VERSI 2.1.30',
    imageUrl: '/images/mlbb_banner_1779415720349.png',
    content: `Analisis lengkap penyesuaian hero pada Patch 2.1.30 Mobile Legends Bang Bang:

- **Nolan (Nerf)**: Pengurangan jangkauan skill Ultimate serta kenaikan cooldown di awal tier pertarungan agar memberikan ruang bernapas bagi jungler lain.
- **Harith (Buff)**: Penyesuaian peningkatan magic damage shield serta kemudahan melakukan dash terus-menerus membuatnya siap merebut meta midlane/goldlane kembali.
- **Joy (Adjustment)**: Perubahan kontrol immune efek di Ultimatenya dialihkan ke penambahan ketebalan shield pelindung agar menuntut positioning yang akurat.`
  },
  {
    id: '5',
    title: 'Most Picked Hero Mobile Legends Episode 7 - August Week 2',
    category: 'Mobile Legends',
    author: 'Mintime',
    date: 'Agustus 14, 2025',
    readTime: '3 Menit',
    upperText: "MOST PICKED HERO 'AGUSTUS WEEK 2'",
    imageUrl: '/images/jasa_joki_mlbb_banner_1779415194035.png',
    content: `Daftar hero yang paling tinggi tingkat pemilihannya sepanjang pertarungan agustus minggu ke-2:

- **Vexana (Midlane)**: Kemampuan inisiasi zoning Lord serta lord puppet tanky menjadikannya midlaner paling stabil.
- **Karrie (Goldlane)**: Meta tank buster tersakit dengan build semi-defense yang membuatnya sulit dieliminasi assassin musuh.
- **Ruby (Roamer / Fighter)**: Efek lifesteal agresif serta gangguan kontrol beruntun menjadikannya roamer inisiator favorit para pro player.`
  },
  {
    id: '6',
    title: 'Most Banned Hero Mobile Legends Episode 15 - August Week 2',
    category: 'Mobile Legends',
    author: 'Mintime',
    date: 'Agustus 14, 2025',
    readTime: '4 Menit',
    upperText: "MOST BANNED HERO 'AGUSTUS WEEK 2'",
    imageUrl: '/images/mlbb_banner_1779415720349.png',
    content: `Daftar pelarangan hero tersengit di rank Mythic sepanjang pertengahan bulan agustus:

- **Tigreal**: Sangat dilarang karena kombo flicker ulti miliknya terlalu mudah menghancurkan kerapihan positioning lawan.
- **Nolan**: Laju clear speed jungler yang terlampau cepat sehingga sering melahirkan efek snowballing level di early game.
- **Fanny**: Selalu masuk daftar ban tetap untuk mengantisipasi montase booster kabel yang merusak formasi pertahanan backline.`
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  { rank: 1, username: 'sultan_ML99', totalSpends: 18270000, avatarSeed: 'sultan' },
  { rank: 2, username: 'king_joki_ff', totalSpends: 12450000, avatarSeed: 'gamer' },
  { rank: 3, username: 'roblox_lord_id', totalSpends: 9340000, avatarSeed: 'roblox' },
  { rank: 4, username: 'mabar_terus_yuks', totalSpends: 7850000, avatarSeed: 'mabar' },
  { rank: 5, username: 'alucard_user_ganteng', totalSpends: 4320000, avatarSeed: 'alu' }
];
