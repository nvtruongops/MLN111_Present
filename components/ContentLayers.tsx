'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

type TopicCard = {

  id: number
  title: string
  short: string
  heroImage: string
  fullImage?: string
  sourceLabel: string
  sourceUrl?: string
  sourceFile?: string
  youtubeLabel?: string
  youtubeUrl?: string
  body: string[]
  keyPoints: string[]
  examples?: string[]
  note?: string
}

type TopicFallbackConfig = {
  bodyMin: number
  keyPointsMin: number
  examplesMin: number
  sources: {
    file?: string
    web?: string
  }
  bodyFallback: string[]
  keyPointsFallback: string[]
  examplesFallback: string[]
}

const TOPICS: TopicCard[] = [
  {
    id: 1,
    title: 'Phép biện chứng duy vật là gì?',
    short: 'Ví dụ và vai trò cụ thể từ nguồn Thư Viện Pháp Luật.',
    heroImage: '/image/phep-bien-chung.jpg',
    fullImage: '/image/phep-bien-chung.jpg',
    sourceLabel: 'Thư Viện Pháp Luật',
    sourceUrl:
      'https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/phep-bien-chung-duy-vat-la-gi-vi-du-ve-phep-bien-chung-duy-vat-cu-the-vai-tro-cua-phep-bien-chung-d-409188-174876.html',
    body: [
      'Phép biện chứng duy vật là bộ phận cơ bản của triết học Mác - Lênin, nghiên cứu mối liên hệ phổ biến và sự phát triển của mọi sự vật, hiện tượng trong tự nhiên, xã hội và tư duy.',
      'Theo mạch nội dung từ Thư Viện Pháp Luật, phép biện chứng duy vật được hiểu như học thuyết về sự vận động, phát triển khách quan, đồng thời là công cụ phương pháp luận để nhận thức và cải tạo thực tiễn.',
      'Nội dung trọng tâm: sự vật không tồn tại tách rời, mà luôn nằm trong hệ thống quan hệ qua lại; thay đổi xảy ra do mâu thuẫn nội tại và điều kiện cụ thể.',
      'Hai nguyên lý nền tảng của phép biện chứng duy vật gồm: nguyên lý về mối liên hệ phổ biến và nguyên lý về sự phát triển.',
      'Ba quy luật cơ bản gồm: lượng - chất, thống nhất và đấu tranh giữa các mặt đối lập, phủ định của phủ định.',
      'Ý nghĩa phương pháp luận: tránh nhìn một chiều, tránh tuyệt đối hóa trạng thái hiện tại, biết dự báo xu hướng và lựa chọn cách tác động phù hợp theo hoàn cảnh cụ thể.',
    ],
    keyPoints: [
      'Khoa học về mối liên hệ phổ biến và sự phát triển.',
      'Mọi sự vật vận động theo quy luật khách quan.',
      'Mâu thuẫn nội tại là nguồn gốc vận động và phát triển.',
      'Là thế giới quan và phương pháp luận khoa học.',
      'Giúp giải quyết vấn đề thực tiễn theo tiến trình cụ thể.',
    ],
    examples: [
      'Phủ định của phủ định: gà mái -> trứng -> gà con, cái mới xuất hiện qua chuỗi phủ định có kế thừa.',
      'Lượng - chất: quãng đường di chuyển tích lũy dần về lượng, đến điểm đạt đích tạo chuyển biến trạng thái (chất).',
    ],
    note:
      'Mục "Hai nguyên lý cơ bản & Ba quy luật" được tách riêng để trình bày chuyên sâu ở lớp thông tin 2 và 3.',
  },
  {
    id: 2,
    title: 'Nguyên lý về sự phát triển',
    short: 'Nội dung chuyên sâu từ transcript học tập và video YouTube.',
    heroImage: '/image/Nguyen_ly_ve_su_phat_trien.png',
    fullImage: '/image/Nguyen_ly_ve_su_phat_trien.png',
    sourceLabel: 'Transcript nội bộ dự án',
    sourceFile: 'Nguyên Lý Về Sự Phát Triển - Triết Học Mác-Lê Nin.txt',
    youtubeLabel: 'Nguồn video YouTube',
    youtubeUrl: 'https://youtu.be/JqgBTk93tNs?si=4d-AITylhiaibmiG',
    body: [
      'Nguyên lý về sự phát triển yêu cầu khi xem xét sự vật phải đặt nó trong trạng thái luôn vận động và biến đổi, không nhìn cắt lát tại một thời điểm.',
      'Sự phát triển được hiểu là quá trình đi từ thấp đến cao, từ đơn giản đến phức tạp, từ kém hoàn thiện đến hoàn thiện hơn.',
      'Quá trình này không đi theo đường thẳng mà thường quanh co, có bước lùi tương đối, rồi tiếp tục tiến lên theo hình xoáy ốc.',
      'Các tính chất nổi bật gồm: tính khách quan, tính phổ biến, tính kế thừa, và tính phong phú đa dạng của con đường phát triển.',
      'Ý nghĩa phương pháp luận: cần kiên nhẫn với tiến trình tích lũy, biết dự báo xu hướng tương lai và chủ động tạo điều kiện thúc đẩy cái mới tích cực.',
      'Transcript nhấn mạnh: không dao động trước các bước quanh co hay thụt lùi tương đối, vì đó là biểu hiện tự nhiên của tiến trình phát triển.',
    ],
    keyPoints: [
      'Mọi sự vật đều vận động và phát triển.',
      'Phát triển có tính khách quan, phổ biến, đa dạng.',
      'Con đường phát triển có thể quanh co, không tuyến tính.',
      'Cần tư duy dự báo xu hướng thay vì đánh giá tức thời.',
      'Biết nhận diện và bồi dưỡng nhân tố mới tích cực.',
    ],
    examples: [
      'Học tập: từ học kém đến khá/giỏi là tiến trình tích lũy qua thời gian, không thể đốt cháy giai đoạn.',
      'Sức khỏe: dấu hiệu bệnh nhẹ nếu bỏ qua có thể phát triển nặng, nên cần dự báo và can thiệp sớm.',
      'Xu hướng làm việc online: nhận diện chiều vận động giúp chủ động thích nghi và tạo cơ hội mới.',
    ],
  },
  {
    id: 3,
    title: 'Ba quy luật cơ bản',
    short: 'Hệ thống hóa quy luật từ transcript và nguồn video minh họa.',
    heroImage: '/image/Ba_quy_luat.png',
    fullImage: '/image/Ba_quy_luat.png',
    sourceLabel: 'Transcript nội bộ dự án',
    sourceFile: 'Các quy luật của phép biện chứng duy vật.txt',
    youtubeLabel: 'Nguồn video YouTube',
    youtubeUrl: 'https://youtu.be/m7t09vC-VaM?si=nfkX39hD2QMkH1M8',
    body: [
      'Quy luật 1 - Thống nhất và đấu tranh giữa các mặt đối lập: mâu thuẫn nội tại là nguồn gốc của vận động và phát triển.',
      'Quy luật 2 - Chuyển hóa từ lượng thành chất và ngược lại: sự tích lũy dần về lượng đến điểm nút sẽ dẫn đến bước nhảy về chất.',
      'Quy luật 3 - Phủ định của phủ định: cái mới ra đời thông qua phủ định biện chứng cái cũ, kế thừa yếu tố tích cực và phát triển ở trình độ cao hơn.',
      'Khái niệm hỗ trợ quan trọng từ transcript: chất, lượng, độ, điểm nút, bước nhảy; qua đó mô tả cơ chế chuyển hóa trong tiến trình phát triển.',
      'Ý nghĩa phương pháp luận: tránh nóng vội duy ý chí, phải tích lũy điều kiện cần thiết và lựa chọn hình thức tác động phù hợp.',
      'Khi lượng chưa đạt điểm nút, cần bền bỉ tích lũy; khi điều kiện chín muồi, cần quyết đoán thực hiện bước nhảy để tạo chuyển hóa về chất.',
    ],
    keyPoints: [
      'Mâu thuẫn là nguồn gốc phát triển.',
      'Tích lũy lượng tạo bước nhảy chất.',
      'Phủ định biện chứng có kế thừa.',
      'Tư duy hành động cần bám điều kiện khách quan.',
      'Nhận diện đúng độ và điểm nút để chọn thời điểm hành động.',
    ],
    examples: [
      'Lượng - chất: học từng ngày tích lũy lượng tri thức, đến ngưỡng sẽ tạo bước nhảy về năng lực giải quyết vấn đề.',
      'Mâu thuẫn: cạnh tranh và khác biệt trong tổ chức nếu xử lý đúng sẽ trở thành động lực đổi mới.',
      'Phủ định của phủ định: mô hình cũ được thay thế bởi mô hình mới nhưng vẫn kế thừa hạt nhân hợp lý.',
    ],
  },
]

const CONTENT_FALLBACKS: Record<number, TopicFallbackConfig> = {
  1: {
    bodyMin: 6,
    keyPointsMin: 5,
    examplesMin: 2,
    sources: {
      web: 'https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/phep-bien-chung-duy-vat-la-gi-vi-du-ve-phep-bien-chung-duy-vat-cu-the-vai-tro-cua-phep-bien-chung-d-409188-174876.html',
    },
    bodyFallback: [
      'Theo cấu hình nguồn web, phép biện chứng duy vật được trình bày như khoa học về mối liên hệ phổ biến và sự phát triển của thế giới vật chất.',
      'Nội dung nhấn mạnh cách tiếp cận tổng thể, chống tư duy phiến diện khi phân tích hiện tượng trong thực tiễn.',
    ],
    keyPointsFallback: [
      'Hai nguyên lý cơ bản là nền tảng triển khai ba quy luật cơ bản.',
      'Giá trị cốt lõi nằm ở năng lực dự báo xu hướng vận động của sự vật.',
    ],
    examplesFallback: [
      'Phân tích một hiện tượng xã hội cần đặt trong tương quan nhiều yếu tố, không xem cô lập một biến số.',
    ],
  },
  2: {
    bodyMin: 6,
    keyPointsMin: 5,
    examplesMin: 3,
    sources: {
      file: 'Nguyên Lý Về Sự Phát Triển - Triết Học Mác-Lê Nin.txt',
      web: 'https://youtu.be/JqgBTk93tNs?si=4d-AITylhiaibmiG',
    },
    bodyFallback: [
      'Nguồn transcript bổ sung rằng phát triển có tính quanh co, có bước lùi tương đối, nhưng xu hướng chủ đạo vẫn hướng tới hoàn thiện hơn.',
      'Yêu cầu phương pháp luận là kiên nhẫn tích lũy điều kiện và chủ động thúc đẩy nhân tố mới tiến bộ.',
    ],
    keyPointsFallback: [
      'Đánh giá sự vật cần theo tiến trình, không theo ảnh chụp tức thời.',
      'Nhận thức đúng tính kế thừa giúp tránh phủ định sạch trơn.',
    ],
    examplesFallback: [
      'Năng lực học tập tăng dần theo chu kỳ rèn luyện - phản hồi - điều chỉnh.',
    ],
  },
  3: {
    bodyMin: 6,
    keyPointsMin: 5,
    examplesMin: 3,
    sources: {
      file: 'Các quy luật của phép biện chứng duy vật.txt',
      web: 'https://youtu.be/m7t09vC-VaM?si=nfkX39hD2QMkH1M8',
    },
    bodyFallback: [
      'Nguồn transcript làm rõ: độ là giới hạn mà thay đổi lượng chưa làm đổi chất; điểm nút là ngưỡng phát sinh bước nhảy.',
      'Bước nhảy là giai đoạn chuyển hóa cơ bản về chất sau quá trình tích lũy lượng.',
    ],
    keyPointsFallback: [
      'Không duy ý chí: phải đủ điều kiện khách quan trước khi tạo bước nhảy.',
      'Linh hoạt hình thức tác động theo từng loại sự vật và bối cảnh.',
    ],
    examplesFallback: [
      'Quản trị thay đổi trong tổ chức: tích lũy cải tiến nhỏ trước khi tái cấu trúc lớn.',
    ],
  },
}

const mergeUnique = (base: string[] | undefined, fallback: string[], min: number) => {
  const output = [...(base || [])]
  for (const item of fallback) {
    if (!output.includes(item)) output.push(item)
    if (output.length >= min) break
  }
  return output
}

const enrichTopicIfNeeded = (topic: TopicCard): TopicCard => {
  const cfg = CONTENT_FALLBACKS[topic.id]
  if (!cfg) return topic

  const body = mergeUnique(topic.body, cfg.bodyFallback, cfg.bodyMin)
  const keyPoints = mergeUnique(topic.keyPoints, cfg.keyPointsFallback, cfg.keyPointsMin)
  const examples = mergeUnique(topic.examples, cfg.examplesFallback, cfg.examplesMin)

  const sourceBadges: string[] = []
  if (cfg.sources.file) sourceBadges.push(`File: ${cfg.sources.file}`)
  if (cfg.sources.web) sourceBadges.push('Web: nguồn tham chiếu mở rộng')

  const sourceNote = sourceBadges.length > 0 ? `Tự động bổ sung khi nội dung ngắn từ ${sourceBadges.join(' | ')}.` : ''

  return {
    ...topic,
    body,
    keyPoints,
    examples,
    note: topic.note ? `${topic.note} ${sourceNote}`.trim() : sourceNote || topic.note,
  }
}

export default function ContentLayers() {
  const topics = useMemo(() => TOPICS.map(enrichTopicIfNeeded), [])
  const [activeId, setActiveId] = useState<number | null>(null)
  const activeTopic = topics.find((topic) => topic.id === activeId) || null

  const getExpandOrigin = (id: number): 'left center' | 'center center' | 'right center' => {
    if (id === 1) return 'left center'
    if (id === 2) return 'center center'
    return 'right center'
  }

  const toggleTopic = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id))
  }

  const getOverlayEnterTransform = (id: number) => {
    if (id === 1) return 'translateX(-12%) scale(0.98)'
    if (id === 2) return 'translateX(0) scale(0.98)'
    return 'translateX(12%) scale(0.98)'
  }

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-300 font-sans selection:bg-blue-500/30 pb-32">
      {/* ── Background Image & Gradients ──────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <Image
          src="/image/anhvutru1.webp"
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
        <div className="absolute z-10 top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full opacity-40" />
        <div className="absolute z-10 top-[40%] left-[-10%] w-[500px] h-[500px] bg-amber-600/10 blur-[150px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 w-[min(1600px,calc(100vw-10px))] mx-auto px-6 pt-20 sm:pt-32">
        {/* ── Header ───────────────────────────────── */}
        <header className="mb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
            <p className="text-neutral-200 text-xs font-semibold tracking-widest uppercase">
              Tài liệu mở rộng chủ đề
            </p>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Phép biện chứng duy vật
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            Khám phá chiều sâu triết học với hệ thống kiến thức mở rộng, phân tích chi tiết các nguyên lý, 
            quy luật cốt lõi tạo nên thế giới quan và phương pháp luận khoa học của chủ nghĩa Mác - Lênin.
          </p>
        </header>

        {/* ── Topic Cards Grid ──────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          style={{
            opacity: activeTopic ? 0.38 : 1,
            transform: activeTopic ? 'scale(0.99)' : 'scale(1)',
            transition: 'opacity 0.24s ease, transform 0.24s ease',
            pointerEvents: activeTopic ? 'none' : 'auto',
          }}
        >
          {topics.map((topic) => {
            const isActive = topic.id === activeId
            return (
              <div
                key={topic.id}
                role="button"
                tabIndex={0}
                onClick={() => toggleTopic(topic.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleTopic(topic.id)
                  }
                }}
                className={`group relative rounded-3xl p-6 lg:p-8 flex flex-col min-h-[430px] cursor-pointer transition-all duration-500 overflow-hidden outline-none backdrop-blur-md ${
                  isActive
                    ? 'bg-[#0a0a0a]/80 border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]'
                    : 'bg-[#050505]/60 border border-white/[0.05] hover:bg-[#0a0a0a]/80 hover:border-white/10'
                }`}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay"></div>
                
                <div className="w-full h-52 relative rounded-2xl overflow-hidden mb-6 border border-white/5 bg-white/[0.03]">
                  <Image
                    src={topic.heroImage}
                    alt={topic.title}
                    fill
                    className="object-contain object-center p-3 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400 group-hover:from-blue-200 group-hover:to-white transition-all duration-300 mb-3 tracking-tight leading-snug">{topic.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed flex-1 group-hover:text-neutral-200 transition-colors duration-300">{topic.short}</p>
                
                <div className={`mt-6 text-sm font-medium tracking-wide uppercase flex items-center ${isActive ? 'text-blue-400' : 'text-neutral-500 group-hover:text-amber-400/80 transition-colors'}`}>
                  {isActive ? 'Đang mở tab...' : 'Xem chi tiết →'}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Overlay Modal Backdrop ──────────────────── */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            pointerEvents: activeTopic ? 'auto' : 'none',
            opacity: activeTopic ? 1 : 0,
            transition: 'opacity 0.24s ease',
          }}
          onClick={() => setActiveId(null)}
        />

        {/* ── Modal Content Window ────────────────────── */}
        <div
          style={{
            position: 'fixed',
            top: '72px',
            bottom: '24px',
            left: 'min(24px, 2vw)',
            right: 'min(24px, 2vw)',
            maxWidth: '1500px',
            margin: '0 auto',
            zIndex: 55,
            pointerEvents: activeTopic ? 'auto' : 'none',
            opacity: activeTopic ? 1 : 0,
            transform: activeTopic ? 'translateX(0) scale(1)' : activeId ? getOverlayEnterTransform(activeId) : 'translateY(12px) scale(0.98)',
            transformOrigin: activeId ? getExpandOrigin(activeId) : 'center center',
            transition: 'opacity 0.26s ease, transform 0.36s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="rounded-3xl bg-[#080808]/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
            {activeTopic && (
              <>
                <div className="flex justify-between items-start gap-4 p-6 lg:p-8 border-b border-white/10 bg-white/5">
                  <div>
                    <div className="text-xs tracking-widest text-amber-400 uppercase font-semibold mb-2">
                      Chi tiết chuyên sâu
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">{activeTopic.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 backdrop-blur-md"
                  >
                    Đóng x
                  </button>
                </div>

                <div
                  className="p-6 lg:p-10 overflow-y-auto grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] gap-8 h-full"
                >
                  {/* Left Column - Image & Sources */}
                  <div className="flex flex-col gap-6">
                    <div className="relative w-full h-[280px] lg:h-[340px] rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-inner">
                      <Image
                        src={activeTopic.fullImage || activeTopic.heroImage}
                        alt={activeTopic.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      {activeTopic.sourceUrl && (
                        <a
                          href={activeTopic.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex justify-center items-center px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all text-sm font-medium"
                        >
                          <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                          {activeTopic.sourceLabel}
                        </a>
                      )}

                      {activeTopic.youtubeUrl && activeTopic.youtubeLabel && (
                        <a
                          href={activeTopic.youtubeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex justify-center items-center px-5 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-100 transition-all text-sm font-medium"
                        >
                          <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                          {activeTopic.youtubeLabel}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Content text */}
                  <div className="flex flex-col gap-6">
                    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md">
                      <div className="space-y-4">
                        {activeTopic.body.map((paragraph, idx) => (
                          <p key={idx} className="text-base text-neutral-300 font-light leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-[30px]" />
                        <h4 className="text-lg text-blue-400 mb-4 font-semibold tracking-tight relative z-10 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          Ý chính trọng tâm
                        </h4>
                        <ul className="text-neutral-300 font-light leading-relaxed text-sm space-y-3 relative z-10 list-disc pl-4">
                          {activeTopic.keyPoints.map((point, idx) => (
                            <li key={idx} className="pl-1">{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[30px]" />
                        <h4 className="text-lg text-amber-400 mb-4 font-semibold tracking-tight relative z-10 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                          Ví dụ minh họa
                        </h4>
                        <ul className="text-neutral-300 font-light leading-relaxed text-sm space-y-3 relative z-10 list-disc pl-4">
                          {(activeTopic.examples || []).map((example, idx) => (
                            <li key={idx} className="pl-1">{example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {activeTopic.note && (
                      <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-5 flex items-start gap-4">
                        <div className="text-sm font-light text-neutral-400 leading-relaxed italic border-l-2 border-amber-500/50 pl-4 py-1">
                          {activeTopic.note}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
      </div>
    </div>
  )
}

