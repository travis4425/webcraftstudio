# 🚀 WebCraft Studio – Deploy Guide

## Địa chỉ website:
**https://webcraft.id.vn**

---

## ✅ Cách trỏ domain webcraft.id.vn về Vercel

### Bước 1 – Deploy lên Vercel trước
```bash
cd webcraftstudio
npm install
npm run build   # build thử
```
Sau đó push lên GitHub → import vào https://vercel.com/new → Deploy

### Bước 2 – Add custom domain trong Vercel
1. Vào Dashboard → chọn project → **Settings → Domains**
2. Nhập `webcraft.id.vn` → click **Add**
3. Vercel sẽ hiển thị thông tin DNS cần cấu hình

### Bước 3 – Trỏ DNS tại nhà đăng ký tên miền (.id.vn)
Đăng nhập vào nơi bạn đăng ký `webcraft.id.vn` (thường là Mắt Bão, PAVIE, VNPT...)
Vào phần **Quản lý DNS** → thêm record:

| Type  | Name           | Value                  |
|-------|----------------|------------------------|
| A     | webcraft.id.vn | 76.76.21.21            |
| CNAME | www            | cname.vercel-dns.com   |

> ⏳ Chờ 5–30 phút để DNS cập nhật

### Bước 4 – Kiểm tra
Truy cập **https://webcraft.id.vn** → website live! 🎉

---

## 📁 Cấu trúc file
```
webcraftstudio/
├── index.html          ← Entry point + SEO meta
├── vite.config.js
├── vercel.json         ← SPA routing
├── package.json
└── src/
    ├── main.jsx
    └── App.jsx         ← Toàn bộ website
```

## 🛠 Tech Stack
- React 18 + Vite 5
- CSS-in-JS animations
- Google Fonts (Sora + Space Grotesk)
- Responsive (Mobile/Tablet/Desktop)
- Dark/Light mode + Bilingual EN/VI
