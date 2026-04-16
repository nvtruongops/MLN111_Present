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
    short: '',
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
    short: '',
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
    short: '',
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
  {
    id: 4,
    title: 'Phân tích "Change is the only constant in life"',
    short: '',
    heroImage: '/image/cau_noi.jpg',
    fullImage: '/image/cau_noi.jpg',
    sourceLabel: 'Nguồn tham khảo',
    body: [
      'Như triết gia Hy Lạp Heraclitus đã nói cách đây khoảng 2500 năm: "Không có gì là vĩnh cửu ngoại trừ sự thay đổi". Mặc dù câu nói này được thốt ra từ hàng trăm thế kỷ trước, nhưng nó vẫn là chân lý đúng đắn cho đến ngày nay.',
      'Câu nói này chứa đựng những bài học sâu sắc có thể thúc đẩy chúng ta chấp nhận hiện thực như nó vốn có. Mọi thứ đều thay đổi theo thời gian, và thay đổi là điều duy nhất không đổi.',
      'Đón nhận sự thay đổi: Chấp nhận sự thay đổi có thể khó khăn, nhưng nó cho phép chúng ta buông bỏ quá khứ, tha thứ cho bản thân và tiến về phía trước. Nó mở ra những cơ hội tốt hơn và tạo điều kiện cho sự phát triển cá nhân.',
      'Học cách buông bỏ: Chúng ta thường bám víu vào niềm vui và hạnh phúc mà không nhận ra rằng chúng cũng chỉ là tạm thời. Khi đối mặt với bi kịch, việc học cách buông bỏ giúp chúng ta vượt qua khó khăn dễ dàng hơn.',
      'Vấn đề cũng chỉ là tạm thời: Vì không có gì là vĩnh cửu, nên những vấn đề của chúng ta cũng không phải ngoại lệ. Khi đau khổ, hãy nhớ rằng mọi chuyện sẽ thay đổi theo thời gian.',
      'Như Steve Jobs đã nói: "Thời gian của bạn có hạn, vì vậy đừng lãng phí nó bằng cách sống cuộc đời của người khác. Hãy can đảm để làm theo trái tim và trực giác của mình."',
    ],
    keyPoints: [
      'Sự thay đổi là điều duy nhất không đổi trong cuộc sống.',
      'Đón nhận thay đổi để phát triển và tiến bộ.',
      'Học cách buông bỏ những gì tạm thời.',
      'Vấn đề không phải là vĩnh viễn, chúng sẽ qua đi.',
      'Thời gian có hạn, hãy sống theo cách của riêng bạn.',
    ],
    examples: [
      'Thay đổi thói quen làm việc cũ để cải thiện hiệu suất.',
      'Chấp nhận mất mát và tiến về phía trước với tâm thế mới.',
      'Đối mặt với khó khăn với niềm tin rằng mọi thứ sẽ tốt đẹp hơn.',
      'Dám thử nghiệm điều mới thay vì ở mãi trong vùng an toàn.',
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
  const romanNumerals = ['I', 'II', 'III', 'IV']

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#000000]/80 z-0"></div>
        <div className="absolute z-10 top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full opacity-40" />
        <div className="absolute z-10 top-[40%] left-[-10%] w-[500px] h-[500px] bg-amber-600/10 blur-[150px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 pt-20 sm:pt-32">
        {/* ── Single Unified Block ──────────────────────── */}
        <article className="max-w-7xl mx-auto rounded-3xl border border-white/10 bg-[#050505]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* ── Đề bài Header Inside Block ──────────────────────── */}
          <div className="relative px-6 sm:px-10 lg:px-16 pt-12 pb-16 border-b border-white/10">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
            <div className="relative z-10 text-center space-y-4">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/20 shadow-lg mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                <p className="text-amber-200 text-xs font-semibold tracking-widest uppercase">
                  Tài liệu mở rộng chủ đề
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
                Phép biện chứng duy vật
              </h1>
              <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                Khám phá chiều sâu triết học với hệ thống kiến thức mở rộng, phân tích chi tiết các nguyên lý, 
                quy luật cốt lõi tạo nên thế giới quan và phương pháp luận khoa học của chủ nghĩa Mác - Lênin.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-16 space-y-16">
            {topics.map((topic, topicIdx) => (
              <div key={topic.id} className="space-y-8">
                {/* Section Title with Roman Numeral */}
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-bold text-amber-400/80 tracking-wide">
                      Phần {romanNumerals[topicIdx]}.
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                      {topic.title}
                    </h2>
                  </div>
                  {topic.short && (
                    <p className="text-neutral-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                      {topic.short}
                    </p>
                  )}
                </div>

                {/* Full-Width Image */}
                <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-xl">
                  <Image
                    src={topic.fullImage || topic.heroImage}
                    alt={topic.title}
                    fill
                    className="object-contain p-6 sm:p-8"
                  />
                </div>

                {/* Content Below Image */}
                <div className="max-w-5xl mx-auto space-y-8">
                  {/* Body Text */}
                  <div className="space-y-4">
                    {topic.body.map((paragraph, idx) => (
                      <p key={idx} className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Key Points & Examples Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Points */}
                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px]" />
                      <h4 className="text-lg sm:text-xl text-blue-400 mb-5 font-semibold tracking-tight relative z-10 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Ý chính trọng tâm
                      </h4>
                      <ul className="text-neutral-300 font-light leading-relaxed text-sm sm:text-base space-y-3 relative z-10 list-disc pl-5">
                        {topic.keyPoints.map((point, idx) => (
                          <li key={idx} className="pl-1">{point}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[40px]" />
                      <h4 className="text-lg sm:text-xl text-amber-400 mb-5 font-semibold tracking-tight relative z-10 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Ví dụ minh họa
                      </h4>
                      <ul className="text-neutral-300 font-light leading-relaxed text-sm sm:text-base space-y-3 relative z-10 list-disc pl-5">
                        {(topic.examples || []).map((example, idx) => (
                          <li key={idx} className="pl-1">{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Note */}
                  {topic.note && (
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
                      <div className="text-sm font-light text-neutral-400 leading-relaxed italic border-l-2 border-amber-500/50 pl-4 py-1">
                        {topic.note}
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider between sections (except last) */}
                {topicIdx < topics.length - 1 && (
                  <div className="pt-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

