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
                style={{
                  background: '#fff8ea',
                  borderRadius: '16px',
                  padding: '14px',
                  boxShadow: '0 10px 28px rgba(0,0,0,0.14)',
                }}
              >
                <div
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
                    borderRadius: '14px',
                    border: isActive ? '2px solid #0d4f8b' : '1px solid rgba(13,79,139,0.25)',
                    background: isActive ? '#e6f1fb' : '#ffffff',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 10px 24px rgba(13,79,139,0.15)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '430px',
                    height: '100%',
                    userSelect: 'none',
                  }}
                >
                  <img
                    src={topic.heroImage}
                    alt={topic.title}
                    style={{
                      width: '100%',
                      height: '128px',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      background: '#f3f5f7',
                      borderRadius: '10px',
                      marginBottom: '12px',
                    }}
                  />
                  <h3 style={{ fontSize: '20px', color: '#102a43', marginBottom: '8px', lineHeight: 1.35, fontWeight: 700 }}>{topic.title}</h3>
                  <p style={{ fontSize: '15px', color: '#334e68', lineHeight: 1.6 }}>{topic.short}</p>
                  <div
                    style={{
                      marginTop: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: isActive ? '#0d4f8b' : '#486581',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {isActive ? 'Đang mở tab toàn vùng' : 'Bấm để mở tab chi tiết toàn màn hình'}
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
