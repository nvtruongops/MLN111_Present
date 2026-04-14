# BÁO CÁO KẾ HOẠCH DỰ ÁN: VÒNG XOÁY BIỆN CHỨNG

## Thông tin chung

**Chủ đề:** Phép biện chứng duy vật (Chương 2, Mục II) & Nhận định của Heraclitus: *"Change is the only constant in life"*

**Nguồn lý thuyết:** Giáo trình Triết học Mác - Lênin (2021), trang 182-257

---

## I. MỤC TIÊU DỰ ÁN

Biến các khái niệm lý thuyết trừu tượng của Triết học Mác - Lênin thành một **trải nghiệm số (Digital Experience)** có tính tương tác cao. 

Sản phẩm sẽ chứng minh rằng **"sự thay đổi"** không chỉ là lý thuyết trên sách vở, mà là cốt lõi của vạn vật – từ sự tiến hóa của tự nhiên đến sự phát triển của hệ thống phần mềm.

---

## II. CẤU TRÚC SẢN PHẨM

### Phần 1: Hành trình của Ánh sáng (Landing Page - Scroll Driven)

Sử dụng hiệu ứng cuộn trang (**Image Sequence Scrolling**) để người dùng tự tay "điều khiển" sự biến đổi, qua đó truyền tải 3 nội dung cốt lõi:

#### Trạng thái 1: Vận động tự thân
- **Hình ảnh:** Đốm lửa nhỏ bập bùng
- **Thông điệp:** Mọi sự vật luôn ở trong trạng thái vận động không ngừng. Đứng yên chỉ là tương đối.
- **Nguyên lý:** Quy luật vận động tự thân của sự vật

#### Trạng thái 2: Quy luật Lượng - Chất
- **Hình ảnh:** Đốm lửa nén lại, biến thành dây tóc bóng đèn rực sáng
- **Thông điệp:** Sự tích lũy đủ về lượng sẽ tạo ra bước nhảy vọt về chất, mở ra kỷ nguyên công nghệ mới.
- **Nguyên lý:** Quy luật chuyển hóa từ lượng sang chất

#### Trạng thái 3: Quy luật Phủ định của phủ định
- **Hình ảnh:** Bóng đèn bung tỏa thành luồng dữ liệu/mạch điện quang phổ
- **Thông điệp:** Sự phát triển mang tính kế thừa, đi lên theo hình xoáy ốc. Ánh sáng giờ mang theo thông tin ở một trình độ cao hơn.
- **Nguyên lý:** Quy luật phủ định của phủ định

#### Chốt hạ cuối trang
Nút **"Bắt đầu thử thách"** hiện ra dưới câu nói:
> *"Change is the only constant in life"* - Heraclitus

---

### Phần 2: Thử thách "Con đường Biện chứng" (Game nhập vai)

Trò chơi tương tác **Text-based** với cơ chế **3 mạng (linh hồn)**.

#### Cơ chế Game

**Kịch bản If/Else:** Đưa ra các tình huống kết hợp giữa công nghệ và đời sống. Người chơi phải đưa ra quyết định.

**Logic:**
- ✅ **Chọn hướng giải quyết theo Phép biện chứng** (nhìn nhận sự vật trong mối liên hệ và sự vận động)
  - → Đúng, đi tiếp
  
- ❌ **Chọn hướng theo Tư duy siêu hình** (nhìn nhận sự vật cô lập, tĩnh tại)
  - → Sai, mất 1 mạng, kèm theo lời giải thích triết học

#### Kết quả
- **Thắng:** Nhận thông điệp về việc làm chủ sự thay đổi
- **Thua (hết mạng):** Nhận thông điệp nhắc nhở về lăng kính siêu hình

---

## III. GIẢI PHÁP KỸ THUẬT (IT Implementation)

### Frontend
- **Framework:** React / Next.js
  - Xây dựng UI
  - Quản lý state (số mạng, câu hỏi) của game
- **Animation:** GSAP / ScrollTrigger
  - Xử lý hiệu ứng cuộn mượt mà
  - Điều khiển image sequence scrolling

### Backend & Data
- **Framework:** NestJS
- **Database:** SQLite / PostgreSQL
  - Lưu tên người chơi
  - Lưu điểm số và thống kê

### Deployment
- **Containerization:** Docker
  - Đóng gói toàn bộ dự án
  - Đảm bảo tính nhất quán môi trường

### Demo trực tiếp
- **Hardware:** ThinkCentre M720q
- **Network:** Tailscale
  - Chia sẻ link cục bộ cho giảng viên
  - Trải nghiệm ngay tại lớp
  - Không cần public domain

---

## IV. GIẢI TRÌNH ỨNG DỤNG AI (Tính minh bạch)

AI được ứng dụng trong các khâu:

### 1. Hệ thống hóa nội dung lý thuyết
- Trích xuất và tổng hợp từ giáo trình Triết học Mác - Lênin (2021)
- Phạm vi: Trang 182-257
- Chuyển đổi ngôn ngữ học thuật thành nội dung dễ tiếp cận

### 2. Lên ý tưởng kịch bản
- **Kịch bản hình ảnh:** Sự tiến hóa của ánh sáng (lửa → bóng đèn → dữ liệu)
- **Logic rẽ nhánh:** Thiết kế cây quyết định If/Else cho phần Game
- Đảm bảo tính logic và liên kết với lý thuyết triết học

### 3. Tối ưu hóa kỹ thuật
- Cấu trúc code cho hiệu ứng cuộn ảnh
- Tối ưu performance trên nền tảng web
- Đề xuất giải pháp kỹ thuật phù hợp

---

## V. TIMELINE DỰ KIẾN

| Giai đoạn | Công việc | Thời gian |
|-----------|-----------|-----------|
| **Phase 1** | Thiết kế UI/UX & Storyboard | 3-5 ngày |
| **Phase 2** | Phát triển Landing Page (Scroll Animation) | 5-7 ngày |
| **Phase 3** | Phát triển Game Logic & Database | 5-7 ngày |
| **Phase 4** | Tích hợp Frontend + Backend | 2-3 ngày |
| **Phase 5** | Testing & Deployment (Docker) | 2-3 ngày |
| **Phase 6** | Chuẩn bị Demo & Tài liệu | 2 ngày |

**Tổng thời gian:** 19-27 ngày

---

## VI. KẾT QUẢ MONG ĐỢI

1. **Sản phẩm hoàn chỉnh:** Web application tương tác cao, kết hợp giữa nghệ thuật và công nghệ
2. **Trải nghiệm học tập mới:** Biến lý thuyết trừu tượng thành trải nghiệm cụ thể
3. **Chứng minh năng lực:** Ứng dụng công nghệ hiện đại vào giáo dục triết học
4. **Demo thực tế:** Trình diễn trực tiếp tại lớp với thiết bị cá nhân

---

## VII. TÀI LIỆU THAM KHẢO

- Giáo trình Triết học Mác - Lênin (2021), Chương 2, Mục II, trang 182-257
- Heraclitus: "Change is the only constant in life"
- Các công nghệ: React, Next.js, GSAP, NestJS, Docker, Tailscale

---

*Dự án được thực hiện với sự hỗ trợ của AI trong việc hệ thống hóa kiến thức, thiết kế kịch bản và tối ưu kỹ thuật.*
