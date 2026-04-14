import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: 'AI Usage Documentation — Vòng Xoáy Biện Chứng',
  description: 'Chi tiết quá trình sử dụng trí tuệ nhân tạo, quy trình kiểm chứng và cam kết liêm chính học thuật.',
}

export default function AiUsagePage() {
  return (
    <div className="min-h-screen bg-[#000000] text-neutral-300 font-sans selection:bg-blue-500/30 pb-32">
      {/* ── Background Image & Gradients ──────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <Image
          src="/image/anhvutru2.png"
          alt="Universe Spacial Background"
          fill
          className="object-cover object-center opacity-100"
          quality={100}
          sizes="100vw"
          priority
        />
        {/* Lớp phủ Gradient cực mỏng chỉ để đảm bảo chữ Text vẫn đọc được, giữ ảnh sáng tối đa */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#000000]/60 z-0"></div>
        
        {/* Ánh sáng Gradient tạo điểm nhấn */}
        <div className="absolute z-10 top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full opacity-40" />
        <div className="absolute z-10 top-[40%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 sm:pt-32">
        
        {/* ── Header ───────────────────────────────── */}
        <header className="mb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
            <p className="text-neutral-200 text-xs font-semibold tracking-widest uppercase">
              Minh bạch & Công nghệ
            </p>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Báo cáo sử dụng<br className="hidden sm:block" /> Trí Tuệ Nhân Tạo
          </h1>
          <p className="text-lg sm:text-xl text-neutral-100 max-w-2xl leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Tài liệu này công khai minh bạch toàn bộ quy trình, mục đích sử dụng các mô hình AI trong dự án và cam kết về liêm chính học thuật của nhóm phát triển.
          </p>
        </header>

        {/* ── Mục tiêu sử dụng ──────────────────────── */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-mono text-neutral-500">01</span>
            <h2 className="text-2xl font-medium text-white tracking-tight">
              Mục tiêu sử dụng
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          <div className="bg-[#050505] border border-white/[0.05] rounded-3xl p-10 md:p-12 shadow-2xl shadow-black/50">
            <p className="text-lg md:text-xl leading-relaxed text-neutral-300 font-light">
              Trí tuệ nhân tạo được áp dụng với mục tiêu <strong className="text-white font-medium">hỗ trợ hóa quá trình kỹ thuật và hình ảnh</strong>, mang lại trải nghiệm tương tác tốt nhất (Scroll-based storytelling). AI giúp tối ưu hóa thời gian lập trình, tạo hình ảnh minh họa trừu tượng mang tính triết học, và quy hoạch dữ liệu thông tin để tái hiện kiến thức Triết học Mác - Lênin một cách trực quan và dễ tiếp cận nhất.
            </p>
          </div>
        </section>

        {/* ── Công cụ AI & Chỉnh sửa ────────────────── */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-mono text-neutral-500">02</span>
            <h2 className="text-2xl font-medium text-white tracking-tight">
              Công cụ AI & Sự can thiệp
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="group relative bg-[#050505] border border-white/[0.05] rounded-3xl p-8 hover:border-white/10 transition-all duration-500 flex flex-col">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl mix-blend-overlay"></div>
              <h3 className="text-2xl font-semibold text-white mb-1">Claude / ChatGPT</h3>
              <p className="text-sm text-neutral-500 mb-8 font-medium tracking-wide uppercase">Tham vấn & Xử lý ngôn ngữ</p>
              
              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="text-xs text-neutral-500 tracking-wider uppercase mb-2">Mục đích</h4>
                  <p className="text-neutral-300 leading-relaxed font-light border-l border-white/10 pl-4">Sắp xếp dàn ý, cô đọng nội dung và cung cấp góc nhìn đa chiều về các quy luật triết học.</p>
                </div>
                <div>
                  <h4 className="text-xs text-blue-400 tracking-wider uppercase mb-2">Sinh viên chỉnh sửa</h4>
                  <p className="text-neutral-300 leading-relaxed font-light border-l border-blue-500/30 pl-4">Đối chiếu với giáo trình chính thống để loại bỏ thông tin sai lệch. Viết lại bằng văn phong của nhóm để đảm bảo tính học thuật.</p>
                </div>
              </div>
            </div>

            <div className="group relative bg-[#050505] border border-white/[0.05] rounded-3xl p-8 hover:border-white/10 transition-all duration-500 flex flex-col">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl mix-blend-overlay"></div>
              <h3 className="text-2xl font-semibold text-white mb-1">Midjourney / DALL-E</h3>
              <p className="text-sm text-neutral-500 mb-8 font-medium tracking-wide uppercase">Sản xuất hình ảnh</p>
              
              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="text-xs text-neutral-500 tracking-wider uppercase mb-2">Mục đích</h4>
                  <p className="text-neutral-300 leading-relaxed font-light border-l border-white/10 pl-4">Tạo các khối hình không gian vũ trụ, đại diện cho khái niệm trừu tượng (như mâu thuẫn, biến đổi lượng - chất).</p>
                </div>
                <div>
                  <h4 className="text-xs text-purple-400 tracking-wider uppercase mb-2">Sinh viên chỉnh sửa</h4>
                  <p className="text-neutral-300 leading-relaxed font-light border-l border-purple-500/30 pl-4">Viết prompt chuyên tả chi tiết vật lý, loại bỏ các chi tiết thừa từ ảnh render ra, thiết kế lại hiệu ứng hạt phân tử để khớp với UI/UX.</p>
                </div>
              </div>
            </div>

            <div className="group relative bg-[#050505] border border-white/[0.05] rounded-3xl p-8 hover:border-white/10 transition-all duration-500 lg:col-span-2 flex flex-col">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl mix-blend-overlay"></div>
              <div className="lg:pr-1/2">
                <h3 className="text-2xl font-semibold text-white mb-1">GitHub Copilot / Cursor</h3>
                <p className="text-sm text-neutral-500 mb-8 font-medium tracking-wide uppercase">Lập trình & Kỹ thuật UI</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                <div>
                  <h4 className="text-xs text-neutral-500 tracking-wider uppercase mb-2">Mục đích</h4>
                  <p className="text-neutral-300 leading-relaxed font-light border-l border-white/10 pl-4">Hỗ trợ boilerplate code với NextJS và TailwindCSS, debug các lỗi render 3D và tối ưu memory leak.</p>
                </div>
                <div>
                  <h4 className="text-xs text-green-400 tracking-wider uppercase mb-2">Sinh viên chỉnh sửa</h4>
                  <p className="text-neutral-300 leading-relaxed font-light border-l border-green-500/30 pl-4">Trực tiếp thiết kế thuật toán logic cuộn trang (scroll-tracking), tự cấu hình luồng ánh sáng WebGL không tiêu hao tài nguyên.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quy trình kiểm chứng ──────────────────── */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-mono text-neutral-500">03</span>
            <h2 className="text-2xl font-medium text-white tracking-tight">
              Quy trình kiểm chứng
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-[27px] top-[40px] bottom-[40px] w-[1px] bg-white/[0.05] hidden md:block"></div>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center font-mono text-lg text-white shadow-lg relative z-10 md:mx-0 mx-auto">
                  01
                </div>
                <div className="pt-2 text-center md:text-left">
                  <h4 className="text-xl font-medium text-white mb-3">Tạo bản nháp thô (Drafting)</h4>
                  <p className="text-white">Sử dụng AI để phác thảo các kiến trúc lập trình và sinh ra các đoạn tóm tắt kiến thức thô từ khóa tìm kiếm. Tạo bộ khung nền tảng ban đầu để phát triển.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center font-mono text-lg text-white shadow-lg relative z-10 md:mx-0 mx-auto">
                  02
                </div>
                <div className="pt-2 text-center md:text-left">
                  <h4 className="text-xl font-medium text-white mb-3">Đối chiếu học thuật (Cross-checking)</h4>
                  <p className="text-white">Thành viên trong nhóm trực tiếp đối chiếu độc lập nội dung AI tạo ra với Giáo trình Triết học Mác - Lênin (NXB CTQG Sự Thật) để xác minh độ chuẩn xác.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center font-mono text-lg text-white shadow-lg relative z-10 md:mx-0 mx-auto">
                  03
                </div>
                <div className="pt-2 text-center md:text-left">
                  <h4 className="text-xl font-medium text-white mb-3">Phê duyệt & Tinh chỉnh (Refinement)</h4>
                  <p className="text-white">Biên dịch lại ngôn ngữ phù hợp văn phong tiếng Việt chuyên ngành, tinh chỉnh code logic. Khẳng định sản phẩm cuối cùng là kết quả của trí tuệ con người.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cam kết & Lưu ý ───────────────────────── */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-neutral-900 to-[#0a0a0a] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px]"></div>
            <h2 className="text-xl font-medium text-white tracking-tight mb-4 relative z-10 flex items-center">
              <svg className="w-5 h-5 mr-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Lưu ý quan trọng
            </h2>
            <p className="text-neutral-200 relative z-10">
              Trí tuệ nhân tạo chỉ đóng vai trò hỗ trợ kỹ thuật và là công cụ biên tập phụ trợ. Mọi <strong>kết luận học thuật</strong>, <strong>luận điểm triết học</strong> và <strong>nội dung trình tự</strong> đều do nhóm sinh viên tự kiểm chứng, quyết định và chịu trách nhiệm.
            </p>
          </div>

          <div className="p-10 rounded-3xl bg-gradient-to-br from-neutral-900 to-[#0a0a0a] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px]"></div>
            <h2 className="text-xl font-medium text-white tracking-tight mb-4 relative z-10 flex items-center">
              <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Cam kết liêm chính
            </h2>
            <p className="text-neutral-200 relative z-10">
              Sản phẩm phản ánh quá trình tiếp thu kiến thức môn học một cách chủ động. Chúng tôi tuyệt đối tuân thủ các quy chuẩn đạo đức học thuật, không lạm dụng AI để thay thế tư duy và năng lực cốt lõi.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}


