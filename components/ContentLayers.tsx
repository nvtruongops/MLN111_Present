'use client'

import { useMemo, useState } from 'react'

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
      'Phép biện chứng duy vật là một nhánh cốt lõi trong triết học Mác - Lênin, kết hợp giữa tư duy biện chứng và lập trường duy vật để lý giải sự vận động của thế giới khách quan.',
      'Ph.Ăngghen xác định đây là "khoa học về sự liên hệ phổ biến" — tức là không sự vật nào tồn tại cô lập; mọi hiện tượng đều chịu tác động qua lại trong một hệ thống rộng lớn hơn.',
      'V.I.Lênin bổ sung chiều cạnh nhận thức: phép biện chứng là học thuyết về sự phát triển dưới hình thức hoàn bị và sâu sắc nhất, phản ánh thế giới vật chất luôn biến đổi không ngừng.',
      'Hai nguyên lý nền tảng: (1) mối liên hệ phổ biến — sự vật luôn tồn tại trong quan hệ tương tác; (2) sự phát triển — vận động đi từ thấp đến cao, từ đơn giản đến phức tạp theo quy luật khách quan.',
      'Ba quy luật vận hành: chuyển hóa lượng - chất (tích lũy dẫn đến bước nhảy); thống nhất và đấu tranh của các mặt đối lập (mâu thuẫn là động lực); phủ định của phủ định (cái mới thay thế cái cũ nhưng có kế thừa).',
      'Vai trò thực tiễn: là công cụ phương pháp luận giúp tránh tư duy phiến diện, biết đặt sự vật trong bối cảnh vận động và dự báo xu hướng thay vì chỉ nhìn trạng thái tức thời.',
      'Trước khi chủ nghĩa duy vật phát triển, nhận thức con người bị chi phối nhiều bởi yếu tố tâm linh và siêu hình. Phép biện chứng duy vật đã đưa tư duy trở nên đa chiều và có cơ sở khoa học hơn.',
    ],
    keyPoints: [
      'Kết hợp biện chứng và duy vật — hai trụ cột của triết học Mác - Lênin.',
      'Mọi sự vật đều liên hệ và vận động theo quy luật khách quan.',
      'Mâu thuẫn nội tại là nguồn gốc của mọi sự phát triển.',
      'Nhận thức phải bám theo tiến trình vận động, không cắt lát tại một thời điểm.',
      'Là thế giới quan lẫn phương pháp luận — vừa giải thích vừa hướng dẫn hành động.',
      'Giúp dự báo xu hướng và lựa chọn cách tác động phù hợp với từng hoàn cảnh.',
    ],
    examples: [
      'Phủ định của phủ định: gà mái đẻ trứng (phủ định 1), trứng nở thành gà con (phủ định 2) — cái mới ra đời qua chuỗi phủ định có kế thừa, mang tính chu kỳ.',
      'Lượng - chất: người đi xe máy 5km từ cơ quan về nhà — từng mét di chuyển là thay đổi về lượng, đến đích là bước chuyển về chất (hoàn thành hành trình).',
      'Liên hệ phổ biến: một quyết định kinh doanh không thể đánh giá tách rời — phải xét trong bối cảnh thị trường, đối thủ, xu hướng xã hội và nguồn lực nội tại.',
    ],
    note: 'Nguyên lý và ba quy luật được trình bày chuyên sâu hơn ở tab 2 và tab 3.',
  },
  {
    id: 2,
    title: 'Nguyên lý về sự phát triển',
    short: 'Nội dung chuyên sâu từ transcript học tập và video YouTube.',
    heroImage: '/image/Nguyen_ly_ve_su_phat_trien.png',
    fullImage: '/image/Nguyen_ly_ve_su_phat_trien.png',
    sourceLabel: 'Transcript nội bộ dự án',
    sourceFile: 'Nguyên Lý Về Sự Phát Triển',
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
      file: 'Nguyên Lý Về Sự Phát Triển',
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
      file: 'Các quy luật của phép biện chứng duy vật',
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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(170deg, #f5b13a 0%, #f18b2b 35%, #e6642f 100%)',
        color: '#1a1a1a',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        paddingTop: '100px',
        paddingBottom: '80px',
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.38) 0%, transparent 55%)',
        }}
      />

      <div
        className="mobile-page-wrapper"
        style={{
          position: 'relative',
          zIndex: 1,
          width: 'min(1600px, calc(100vw - 10px))',
          margin: '0 auto',
          padding: '0',
        }}
      >
        <div style={{ marginBottom: '56px', textAlign: 'center' }}>
          <div
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.6)',
              marginBottom: '16px',
              fontWeight: 700,
            }}
          >
            Tài liệu mở rộng chủ đề
          </div>
          <h1
            className="mobile-page-title"
            style={{
              fontSize: '40px',
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: '24px',
              color: '#102a43',
              textShadow: '0 2px 10px rgba(16,42,67,0.18)',
            }}
          >
            Phép biện chứng duy vật
          </h1>
          <div style={{ width: '60px', height: '3px', background: '#102a43', margin: '0 auto', borderRadius: '2px' }} />
        </div>

        <div
          className="mobile-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '18px',
            alignItems: 'stretch',
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
                style={{
                  textAlign: 'left',
                  borderRadius: '0px',
                  background: isActive ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.82)',
                  padding: '0',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive
                    ? '0 16px 48px rgba(16,42,67,0.22), 0 2px 8px rgba(16,42,67,0.1)'
                    : '0 6px 24px rgba(16,42,67,0.10)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  userSelect: 'none',
                  transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                <img
                  src={topic.heroImage}
                  alt={topic.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '20px 22px 24px' }}>
                  <h3 style={{ fontSize: '20px', color: '#102a43', marginBottom: '8px', lineHeight: 1.35, fontWeight: 700 }}>{topic.title}</h3>
                  <p style={{ fontSize: '15px', color: '#486581', lineHeight: 1.6, marginBottom: '16px' }}>{topic.short}</p>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: isActive ? '#0d4f8b' : '#102a43',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {isActive ? '✓ Đang xem' : 'Xem chi tiết →'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(7, 17, 32, 0.42)',
            backdropFilter: 'blur(3px)',
            pointerEvents: activeTopic ? 'auto' : 'none',
            opacity: activeTopic ? 1 : 0,
            transition: 'opacity 0.24s ease',
          }}
          onClick={() => setActiveId(null)}
        />

        <div
          style={{
            position: 'fixed',
            top: '92px',
            bottom: '24px',
            left: '24px',
            right: '24px',
            maxWidth: '1500px',
            margin: '0 auto',
            borderRadius: '14px',
            zIndex: 55,
            background: 'linear-gradient(180deg, #f7fbff 0%, #eef6ff 100%)',
            border: '1px solid rgba(16,42,67,0.18)',
            boxShadow: '0 20px 55px rgba(16,42,67,0.24)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            pointerEvents: activeTopic ? 'auto' : 'none',
            opacity: activeTopic ? 1 : 0,
            transform: activeTopic ? 'translateX(0) scale(1)' : activeId ? getOverlayEnterTransform(activeId) : 'translateY(12px) scale(0.98)',
            transformOrigin: activeId ? getExpandOrigin(activeId) : 'center center',
            transition: 'opacity 0.26s ease, transform 0.36s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
            {activeTopic && (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(16,42,67,0.14)',
                    background: 'rgba(255,255,255,0.8)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#486581', fontWeight: 700 }}>
                      Chi tiết chuyên sâu
                    </div>
                    <h3 style={{ fontSize: '24px', lineHeight: 1.3, color: '#102a43', marginTop: '4px', fontWeight: 800 }}>{activeTopic.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    style={{
                      border: 'none',
                      background: '#102a43',
                      color: '#fff',
                      borderRadius: '999px',
                      padding: '8px 14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Đóng tab
                  </button>
                </div>

                <div
                  className="mobile-grid"
                  style={{
                    padding: '18px 20px 24px',
                    overflowY: 'auto',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(240px, 320px) minmax(0, 1fr)',
                    gap: '18px',
                    height: '100%',
                  }}
                >
                  <div>
                    <img
                      src={activeTopic.fullImage || activeTopic.heroImage}
                      alt={activeTopic.title}
                      style={{
                        width: '100%',
                        height: '260px',
                        borderRadius: '12px',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        background: '#f3f5f7',
                        border: '1px solid rgba(16,42,67,0.12)',
                      }}
                    />
                    <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {activeTopic.sourceUrl && (
                        <a
                          href={activeTopic.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            padding: '8px 12px',
                            borderRadius: '999px',
                            textDecoration: 'none',
                            background: '#102a43',
                            color: '#fff',
                            fontSize: '13px',
                            fontWeight: 600,
                          }}
                        >
                          Nguồn: {activeTopic.sourceLabel}
                        </a>
                      )}

                      {activeTopic.youtubeUrl && activeTopic.youtubeLabel && (
                        <a
                          href={activeTopic.youtubeUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            padding: '8px 12px',
                            borderRadius: '999px',
                            textDecoration: 'none',
                            background: '#c62828',
                            color: '#fff',
                            fontSize: '13px',
                            fontWeight: 600,
                          }}
                        >
                          {activeTopic.youtubeLabel}
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        borderRadius: '12px',
                        border: '1px solid rgba(13,79,139,0.14)',
                        background: '#ffffff',
                        padding: '14px 14px 6px',
                        marginBottom: '12px',
                      }}
                    >
                      {activeTopic.body.map((paragraph, idx) => (
                        <p key={idx} style={{ fontSize: '15px', color: '#243b53', lineHeight: 1.7, marginBottom: '10px' }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="mobile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                      <div
                        style={{
                          borderRadius: '12px',
                          border: '1px solid rgba(13,79,139,0.14)',
                          background: '#f4f9ff',
                          padding: '12px',
                        }}
                      >
                        <h4 style={{ fontSize: '15px', color: '#102a43', marginBottom: '8px', fontWeight: 700 }}>Ý chính trọng tâm</h4>
                        <ul style={{ paddingLeft: '18px', color: '#334e68', lineHeight: 1.65, fontSize: '14px' }}>
                          {activeTopic.keyPoints.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div
                        style={{
                          borderRadius: '12px',
                          border: '1px solid rgba(13,79,139,0.14)',
                          background: '#fff8ef',
                          padding: '12px',
                        }}
                      >
                        <h4 style={{ fontSize: '15px', color: '#102a43', marginBottom: '8px', fontWeight: 700 }}>Ví dụ minh họa</h4>
                        <ul style={{ paddingLeft: '18px', color: '#334e68', lineHeight: 1.65, fontSize: '14px' }}>
                          {(activeTopic.examples || []).map((example, idx) => (
                            <li key={idx}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {activeTopic.note && (
                      <div
                        style={{
                          marginTop: '12px',
                          borderRadius: '10px',
                          background: 'rgba(16,42,67,0.07)',
                          color: '#243b53',
                          fontSize: '14px',
                          lineHeight: 1.6,
                          padding: '10px 12px',
                        }}
                      >
                        {activeTopic.note}
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
