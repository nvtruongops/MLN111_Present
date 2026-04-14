# THE CONSTANT CHANGE — Thiết kế Web Game `/challenge`

## Tổng quan

Web game tương tác 2 phần, lấy cảm hứng từ phép biện chứng duy vật. Người chơi đồng hành cùng linh vật qua các thử thách triết học để "vươn tới đỉnh cao".

---

## Cấu trúc tổng thể

```
/challenge
├── Màn hình chào (Intro)
├── Phần 1 — Thu thập 7 thẻ bài "Nguyên lý sự phát triển"
├── Phần 2 — Cuộc đua "Vươn tới đỉnh cao" (3 Ải)
└── Màn hình kết thúc (Leaderboard / Game Over)
```

---

## Màn hình Intro

- **Asset background intro:** `public/image/intro_game.jpg` — dùng làm ảnh nền toàn màn hình cho màn hình chào, `objectFit: cover` + overlay tối nhẹ để text nổi lên
- Hiển thị tên game: **THE CONSTANT CHANGE**
- Linh vật xuất hiện, giới thiệu ngắn nhiệm vụ
- Nút **Bắt đầu hành trình**
- Hiển thị số mạng: 3 huy hiệu triết học 
  - **Asset huy hiệu:** `public/image/huy_hieu.png` (copy từ `D:\MLN111 - updated Sp24\MLN111_Present\huy_hieu.png` vào thư mục public)
  - Dùng `<img src="/image/huy_hieu.png" />` để render từng huy hiệu, lặp 3 lần
  - Khi mất mạng: áp dụng `filter: grayscale(1) opacity(0.3)` + animation vỡ vụn cho huy hiệu tương ứng

---

## Phần 1 — Thu thập 7 thẻ bài

### Mục tiêu
Trả lời đúng 7 câu hỏi về **Nguyên lý sự phát triển** để thu thập đủ 7 "Mảnh ghép tiềm lực".

### Bối cảnh câu hỏi
Câu hỏi được đặt trong các tình huống thực tiễn xen kẽ nhau:
- Sự tiến hóa của công nghệ (từ điện thoại bàn → smartphone)
- Sự phát triển của một mầm cây thành cây trưởng thành
- Quá trình học tập của một sinh viên

### Nội dung câu hỏi (7 câu)
Lượt xuất hiện,Mảnh ghép nhận được,Tính chất tương ứng,Ý nghĩa logic trong game
Câu hỏi 1,IS,Tính phổ biến,"Bắt đầu bằng việc khẳng định sự phát triển đang hiện hữu (IS) ở mọi lĩnh vực tự nhiên, xã hội, tư duy."
Câu hỏi 2,THE,Tính đa dạng,Nhấn mạnh tính độc nhất/cụ thể (THE) của con đường phát triển ở từng sự vật khác nhau.
Câu hỏi 3,ONLY,Tính phong phú,Khẳng định phát triển là xu hướng duy nhất/tất yếu (ONLY) dù có những bước lùi tương đối.
Câu hỏi 4,CONSTANT,Hướng phát triển,"Phát triển theo hình xoáy ốc là một quá trình liên tục, không ngừng nghỉ (CONSTANT)."
Câu hỏi 5,IN,Tính kế thừa,Sự phát triển luôn diễn ra ở bên trong (IN) và kế thừa những giá trị tích cực từ cái cũ.
Câu hỏi 6,LIFE,Ứng dụng thực tiễn,"Đưa lý luận vào thực tiễn cuộc sống (LIFE), giúp nhận diện xu hướng để hành động."
Câu hỏi 7 (Chốt hạ),CHANGE,Tính khách quan,"Mảnh ghép cuối cùng rơi vào vị trí đầu tiên. Khẳng định: Toàn bộ quá trình trên đều mang tính khách quan, Sự thay đổi (CHANGE) diễn ra không phụ thuộc vào ý muốn của con người!"

### Cơ chế phần thưởng
- Trả lời **đúng** → linh vật nhảy múa + trao **1 Mảnh ghép tiềm lực** ✨
  - **Asset mảnh ghép:** `public/image/7_manh_ghep.jpg` — ảnh chứa 7 mảnh, hiển thị dạng grid 7 ô xếp ngang
  - **Hiệu ứng "Locked":** các mảnh chưa tìm thấy áp dụng `filter: grayscale(1) opacity(0.2)` — trông như bị khóa/mờ
  - **Khi tìm thấy:** xóa filter, mảnh hiện màu đầy đủ kèm animation `scale(1.15)` rồi về `scale(1)` để tạo cảm giác "mở khóa"
  - Transition: `filter 0.4s ease, transform 0.3s ease`
- Trả lời **sai** → mất 1 huy hiệu 🛡️ + hiển thị giải thích ngắn
- Thu đủ 7 mảnh (tất cả bỏ filter) → mở khóa Phần 2

### Yếu tố triết học nhấn mạnh
> "Phát triển không phải đường thẳng — đó là hành trình quanh co, có bước lùi, nhưng xu hướng chủ đạo luôn hướng lên."

---

## Phần 2 — Cuộc đua "Vươn tới đỉnh cao"

Ba ải tương ứng với 3 quy luật cơ bản của phép biện chứng duy vật.

---

### Ải 1 — Đối mặt mâu thuẫn
**Quy luật:** Thống nhất & Đấu tranh các mặt đối lập

**Mô tả:**
Linh vật dừng lại trước một chướng ngại vật lớn. Người chơi phải nhận diện đúng "mâu thuẫn" ẩn trong tình huống được đưa ra.

**Cơ chế:**
- Hiển thị một tình huống thực tế (VD: cạnh tranh trong công nghệ, xung đột ý kiến trong nhóm)
- Người chơi chọn đâu là **mặt đối lập thống nhất**, đâu là **động lực phát triển**
- Trả lời đúng → linh vật "vượt qua chính mình", chướng ngại vật tan vỡ
- Thông điệp hiển thị: *"Mâu thuẫn không phải kẻ thù — đó là nguồn gốc của mọi thay đổi."*

---

### Ải 2 — Tích lũy bước nhảy
**Quy luật:** Lượng đổi → Chất đổi

**Mô tả:**
Người chơi trả lời nhanh các câu hỏi nhỏ để tích lũy **Thanh năng lượng (Lượng)**. Khi thanh đầy đến **điểm nút**, linh vật thực hiện **Bước nhảy** và biến đổi hình dạng (Chất mới).

**Cơ chế:**
- 5–7 câu hỏi nhanh (dạng trắc nghiệm, giới hạn thời gian mỗi câu)
- Mỗi câu đúng → thanh Lượng tăng một đoạn
- Khi thanh đầy → animation "Bước nhảy" + linh vật đổi hình dạng
- Trả lời sai → thanh không tăng + mất huy hiệu
- Thông điệp: *"Tích lũy đủ — rồi bước nhảy sẽ tự đến."*

---

### Ải 3 — Khẳng định cái mới
**Quy luật:** Phủ định của phủ định

**Mô tả:**
Câu hỏi khó nhất về sự kế thừa. Linh vật phải chọn: bỏ lại cái cũ lỗi thời, giữ lại giá trị tích cực, để tiến hóa lên cấp độ cao nhất theo hình xoáy ốc.

**Cơ chế:**
- Hiển thị danh sách các "yếu tố" (mix giữa lỗi thời và có giá trị)
- Người chơi kéo-thả hoặc chọn: **Giữ lại** / **Bỏ đi**
- Đánh giá dựa trên tỉ lệ chọn đúng
- Hoàn thành → linh vật tiến hóa lên hình dạng cuối, xuất hiện hình xoáy ốc
- Thông điệp: *"Cái mới không phủ nhận sạch cái cũ — nó kế thừa và vươn cao hơn."*

---

## Cơ chế Mạng

### Huy hiệu Triết học (3 Mạng)
- **Asset:** `public/image/huy_hieu.png` — render 3 cái xếp ngang
- Mỗi người chơi bắt đầu với **3 huy hiệu** (ảnh gốc, full color)
- Trả lời sai 1 câu về quy luật → 1 huy hiệu **vỡ vụn** (grayscale + fade + shake animation)
- Mất hết 3 huy hiệu → **Game Over**

### Game Over
Thông báo hiển thị:
> *"Bạn chưa đủ sự tích lũy về Lượng để thực hiện bước nhảy về Chất."*

- Người chơi bị loại khỏi bảng xếp hạng tuần
- Nút: **Thử lại** / **Xem đáp án**

### Leaderboard
Hiển thị những người đã "Vươn tới đỉnh cao" với:
- Tên người chơi
- Số thẻ bài thu thập
- Thời gian hoàn thành
- Số huy hiệu còn lại

---

## Trạng thái & Luồng game

```
Intro
  └─► Phần 1 (7 câu hỏi)
        ├─ Đúng → +Mảnh ghép
        └─ Sai  → -Huy hiệu → [Game Over nếu hết mạng]
              └─► Phần 2
                    ├─ Ải 1 → Ải 2 → Ải 3
                    └─ Sai  → -Huy hiệu → [Game Over nếu hết mạng]
                          └─► Màn hình chiến thắng + Leaderboard
```

---

## Stack kỹ thuật gợi ý

| Thành phần | Công nghệ |
|------------|-----------|
| Framework | Next.js (App Router) — tích hợp sẵn dự án |
| Animation linh vật | CSS keyframes / Framer Motion |
| Thanh năng lượng | CSS transition + state React |
| Kéo-thả Ải 3 | `@dnd-kit/core` hoặc HTML5 Drag API |
| Leaderboard | localStorage (MVP) → API route + DB (mở rộng) |
| Âm thanh | Web Audio API (tùy chọn) |

---

## Ghi chú thiết kế

- **Bối cảnh game:** `public/image/boi_canh.png` — dùng làm background toàn màn hình cho tất cả các màn chơi, áp dụng `objectFit: cover` + `filter: brightness(0.6)` để text đè lên dễ đọc
- Màu sắc và font kế thừa từ trang chính (dark theme, Inter)
- Linh vật: `public/image/linh_vat.png` — dùng làm nhân vật dẫn đường xuyên suốt game, có ít nhất 3 trạng thái visual (bình thường / vui-nhảy múa / tiến hóa) thực hiện bằng CSS animation đè lên ảnh gốc
- Mobile-first: layout responsive, câu hỏi hiển thị tốt trên màn hình nhỏ
- Tránh text dài — ưu tiên visual + câu hỏi ngắn gọn
