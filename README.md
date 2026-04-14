# Vòng Xoáy Biện Chứng

Dự án web interactive thể hiện phép biện chứng duy vật thông qua hiệu ứng cuộn trang với image sequence.

## Cài đặt

```bash
npm install
```

## Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Cấu trúc dự án

- `app/` - Next.js App Router pages
- `components/` - React components
- `image/` - 283 frame ảnh cho animation
- `public/` - Static assets

## Công nghệ sử dụng

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **GSAP + ScrollTrigger** - Animation engine
- **Tailwind CSS** - Styling

## Cách hoạt động

1. Preload tất cả 283 frame ảnh
2. Sử dụng Canvas để render từng frame
3. GSAP ScrollTrigger điều khiển frame nào hiển thị dựa trên vị trí cuộn
4. 3 section tương ứng với 3 quy luật biện chứng

## Build production

```bash
npm run build
npm start
```
