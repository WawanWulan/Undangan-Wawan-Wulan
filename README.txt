# Undangan Wawan & Wulan

Undangan Pernikahan Digital

📅 Sabtu, 17 Oktober 2026
💍 Wawan & Wulan

## Website

https://wawanwulan.github.io/Undangan-Wawan-Wulan/

## Fitur

- Countdown pernikahan
- Musik
- Informasi mempelai
- Rangkaian acara
- Google Maps
- Wedding Gift
- RSVP & Wishes
- Penyimpanan RSVP ke Google Sheets
- Nama tamu otomatis dari link
- Link unik untuk setiap tamu
- Halaman daftar tamu dengan tombol Salin Link dan WhatsApp

## Cara membuat link tamu

Data tamu ada di `tamu.json`:

```json
{
  "budi-santoso": "Budi Santoso",
  "andi-keluarga": "Andi & Keluarga"
}
```

Link tamu:

`https://wawanwulan.github.io/Undangan-Wawan-Wulan/?to=budi-santoso`

Halaman pengelolaan link:

`https://wawanwulan.github.io/Undangan-Wawan-Wulan/tamu.html`

Catatan: GitHub Pages bersifat statis. Penambahan tamu permanen dilakukan dengan mengubah `tamu.json` lalu push/commit ke GitHub.
