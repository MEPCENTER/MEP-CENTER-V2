# MEP Center — Website v2 (Futuristic Neon Theme)

Versi restyled dari website MEP Center dengan tema **Arang Neon Futuristik**.

## Struktur Folder

```
mep-center/
├── index.html          ← Halaman utama
├── css/
│   └── style.css       ← Semua styling tema neon futuristik
├── js/
│   └── script.js       ← Semua interaksi JS
├── img/                ← Letakkan semua file gambar di sini (salin dari proyek lama)
│   ├── ok1.png
│   ├── ok2.png
│   ├── Paket_lengkap.png
│   ├── SINGLE LINE DIAGRAM.png
│   ├── 2D ISOMETRIK.png
│   └── ... (semua gambar gallery)
└── README.md
```

## Cara Pakai

1. **Salin folder `img/` dari proyek lama** ke dalam folder ini
2. Buka `index.html` di browser — tidak butuh server lokal
3. Link ke halaman lain (mep.html, plumbing.html, dll.) tetap berfungsi — salin halaman tersebut juga

## Fitur JavaScript

- Dark/Light mode toggle (dengan localStorage)
- Navbar active link + scroll effect
- Gallery click → modal popup dengan deskripsi lengkap
- Animated counter statistik
- Scroll reveal per elemen
- Circuit canvas animasi di hero
- Smooth scroll

## Kustomisasi Warna

Edit variabel di `css/style.css` bagian `:root`:
```css
--neon-cyan:   #00d4ff;   /* Aksen utama */
--neon-orange: #ff6b2b;   /* Aksen sekunder */
--dark-bg:     #0b0e14;   /* Background */
--card-bg:     #161b22;   /* Card background */
```

## Dependensi (CDN — tidak perlu install)

- Bootstrap 5.3.3
- Font Awesome 6.5.0
- AOS (Animate On Scroll) 2.3.4
- Google Fonts: Rajdhani, Exo 2, Share Tech Mono

---
*© 2025 MEP Center — Andri Susandianto ST*
