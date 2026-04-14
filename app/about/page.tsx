'use client'

import Link from 'next/link'
import Image from 'next/image'

const members = [
  { name: 'Nguyễn Văn Trường', code: 'SE182034' },
  { name: 'Thái Nhật Minh Quân', code: 'SS180085' },
  { name: 'Nguyễn Quí Đức', code: 'SE182087' },
  { name: 'Huỳnh Đức Anh', code: 'SE183114' },
  { name: 'Trần Hải Đăng', code: 'SE181926' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-neutral-300 font-sans selection:bg-blue-500/30 pb-32">
      {/* ── Background Image & Gradients ──────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <Image
          src="/image/anhvutru.webp"
          alt="Universe Spacial Background"
          fill
          className="object-cover object-center opacity-100"
          quality={100}
          sizes="100vw"
          priority
        />
        {/* Lớp phủ Gradient mỏng để giữ ảnh sáng tối đa */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#000000]/80 z-0"></div>
        
        {/* Ánh sáng Gradient tạo điểm nhấn */}
        <div className="absolute z-10 top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full opacity-40" />
        <div className="absolute z-10 top-[40%] right-[-10%] w-[500px] h-[500px] bg-amber-600/10 blur-[150px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 sm:pt-32">
        {/* ── Header ───────────────────────────────── */}
        <header className="mb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
            <p className="text-neutral-200 text-xs font-semibold tracking-widest uppercase">
              Về chúng tôi & Dự án
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Philosophy of <br className="sm:hidden" /> Marxism – Leninism
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Dự án trình bày môn học Triết học Mác – Lênin, hướng đến cách tiếp cận hiện đại và chuyển hóa những lý luận trừu tượng thành kiến thức trực quan.
          </p>
        </header>

        {/* ── Vision - Mission - Values ──────────────── */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vision */}
            <div className="group relative bg-[#050505] border border-white/[0.05] rounded-3xl p-8 hover:border-white/10 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-[40px] group-hover:bg-blue-500/20 transition-colors"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h2 className="text-xl font-semibold text-white tracking-tight">Vision – Tầm nhìn</h2>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed font-light relative z-10 block h-full">
                Trở thành nền tảng chia sẻ kiến thức triết học tiên tiến, nơi sinh viên có thể khám phá những quy luật thế giới quan một cách sinh động, trực quan và dễ tiếp cận nhất.
              </p>
            </div>

            {/* Mission */}
            <div className="group relative bg-[#050505] border border-white/[0.05] rounded-3xl p-8 hover:border-white/10 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[40px] group-hover:bg-amber-500/20 transition-colors"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h2 className="text-xl font-semibold text-white tracking-tight">Mission – Sứ mệnh</h2>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed font-light relative z-10 block h-full">
                Phá vỡ định kiến "triết học khô khan" bằng cách ứng dụng thiết kế hiện đại, công nghệ tương tác nhằm truyền tải các triết lý Mác - Lênin một cách dễ hiểu và ứng dụng được vào thực tiễn.
              </p>
            </div>

            {/* Values */}
            <div className="group relative bg-[#050505] border border-white/[0.05] rounded-3xl p-8 hover:border-white/10 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-[40px] group-hover:bg-purple-500/20 transition-colors"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h2 className="text-xl font-semibold text-white tracking-tight">Values – Giá trị cốt lõi</h2>
              </div>
              <ul className="text-neutral-400 text-sm leading-relaxed font-light space-y-3 relative z-10 h-full">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold mt-[-1px]">•</span> Đổi mới cách tiếp cận
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold mt-[-1px]">•</span> Minh bạch trong học thuật
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold mt-[-1px]">•</span> Sáng tạo & Trực quan
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Thông tin Môn học & Giáo viên ───────────── */}
        <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-blue-500/5 blur-[50px]"></div>
            <div className="text-xs tracking-widest text-neutral-500 uppercase font-semibold mb-4">
              Môn học
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Philosophy of Marxism – Leninism
            </h2>
            <p className="text-neutral-400 italic mb-8">Triết học Mác - Lê-nin</p>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 bg-[#12b24f]/20 border border-[#12b24f]/30 text-[#12b24f] rounded-full text-sm font-semibold tracking-wide">
                MLN111
              </span>
              <span className="text-sm text-neutral-500 font-medium">Spring 2026</span>
              <span className="text-sm text-neutral-500 font-medium ml-auto">FPT University</span>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-[#0463ab]/10 blur-[50px]"></div>
            <div className="text-xs tracking-widest text-neutral-500 uppercase font-semibold mb-4">
              Giáo viên hướng dẫn
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Tô Hải Anh
            </h2>
            <p className="text-neutral-400 font-medium tracking-wide">
              Mã giáo viên: <span className="text-[#0463ab] font-bold">AnhTH81</span>
            </p>
          </div>
        </section>

        {/* ── Chủ đề Dự án ───────────────────────────── */}
        <section className="mb-24">
          <div className="relative rounded-3xl p-10 md:p-16 border border-white/10 bg-gradient-to-br from-[#111111] to-[#050505] text-center overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10">
              <div className="text-xs tracking-[0.2em] text-neutral-400 uppercase font-semibold mb-6">
                Chủ đề dự án
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_2px_12px_rgba(255,255,255,0.1)]">
                Phép biện chứng duy vật
              </h2>
              <p className="text-xl text-neutral-400 font-light italic mb-10">
                Chương 2, Mục II — Ba quy luật cơ bản
              </p>
              
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-10"></div>
              
              <blockquote className="text-2xl md:text-3xl font-light italic text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-4 leading-relaxed">
                &ldquo;Change is the only constant in life&rdquo;
              </blockquote>
              <cite className="text-sm tracking-widest text-neutral-500 uppercase font-semibold">
                — Heraclitus
              </cite>
            </div>
          </div>
        </section>

        {/* ── Thành viên Nhóm ───────────────────────── */}
        <section>
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.2em] text-[#0463ab] uppercase font-bold mb-3">
              Nhóm 1
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Thành viên
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {members.map((m, i) => (
              <div
                key={i}
                className="group flex items-center justify-between p-6 rounded-2xl bg-[#080808] border border-white/[0.03] hover:bg-[#0a0a0a] hover:border-white/10 hover:shadow-[0_0_20px_rgba(4,99,171,0.15)] transition-all duration-300"
              >
                <h3 className="text-base font-semibold text-white group-hover:text-[#0463ab] transition-colors whitespace-nowrap">
                  {m.name}
                </h3>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-[#0463ab] tracking-wider whitespace-nowrap">
                  {m.code}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
