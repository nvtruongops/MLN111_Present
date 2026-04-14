'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 283

// ─── Panel definitions ──────────────────────────────────────────
// Each panel has: position (left/right/center), content, and scroll range
// Total panels: 10, spread over 1200vh
//
//  Panel 0  (0.00–0.08)  CENTER  Intro — Chủ đề
//  Panel 1  (0.08–0.18)  LEFT    State 1: Title
//  Panel 2  (0.18–0.28)  RIGHT   State 1: Giải thích
//  Panel 3  (0.28–0.38)  LEFT    State 2: Title
//  Panel 4  (0.38–0.48)  RIGHT   State 2: Giải thích
//  Panel 5  (0.48–0.58)  LEFT    State 2: Ví dụ
//  Panel 6  (0.58–0.68)  LEFT    State 3: Title
//  Panel 7  (0.68–0.78)  RIGHT   State 3: Giải thích
//  Panel 8  (0.78–0.88)  LEFT    State 3: Tổng hợp
//  Panel 9  (0.90–1.00)  CENTER  CTA

interface PanelDef {
  position: 'left' | 'right' | 'center'
  fadeIn: number
  full: number
  fadeOut: number
  gone: number
}

const PANELS: PanelDef[] = [
  { position: 'center', fadeIn: -0.01, full: 0.02, fadeOut: 0.06, gone: 0.09 },
  { position: 'left',   fadeIn: 0.08,  full: 0.11, fadeOut: 0.16, gone: 0.19 }, // 1 Title
  { position: 'right',  fadeIn: 0.18,  full: 0.21, fadeOut: 0.26, gone: 0.29 }, // 1 Giải thích
  
  { position: 'left',   fadeIn: 0.28,  full: 0.31, fadeOut: 0.36, gone: 0.39 }, // 2 Title
  { position: 'right',  fadeIn: 0.38,  full: 0.41, fadeOut: 0.46, gone: 0.49 }, // 2 Giải thích
  { position: 'left',   fadeIn: 0.48,  full: 0.51, fadeOut: 0.56, gone: 0.59 }, // 2 Ví dụ
  
  { position: 'left',   fadeIn: 0.58,  full: 0.61, fadeOut: 0.66, gone: 0.69 }, // 3 Title
  { position: 'right',  fadeIn: 0.68,  full: 0.71, fadeOut: 0.76, gone: 0.79 }, // 3 Giải thích
  { position: 'left',   fadeIn: 0.78,  full: 0.81, fadeOut: 0.86, gone: 0.89 }, // 3 Tổng hợp
  { position: 'center', fadeIn: 0.90,  full: 0.93, fadeOut: 1.10, gone: 1.20 },
]

export default function ImageSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const imagesRef = useRef<HTMLImageElement[]>([])
  const frameIndexRef = useRef({ frame: 0 })

  // ─── Image preloading ─────────────────────────────────────
  useEffect(() => {
    const loadImages = async () => {
      let loaded = 0
      const promises = []
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image()
        img.src = `/image/ezgif-frame-${i.toString().padStart(3, '0')}.png`
        imagesRef.current[i - 1] = img
        promises.push(new Promise((resolve) => {
          img.onload = img.onerror = () => {
            loaded++
            setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
            resolve(null)
          }
        }))
      }
      await Promise.all(promises)
      setImagesLoaded(true)
    }
    loadImages()
  }, [])

  // ─── GSAP ScrollTrigger ───────────────────────────────────
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const render = () => {
      const idx = Math.min(Math.floor(frameIndexRef.current.frame), TOTAL_FRAMES - 1)
      const img = imagesRef.current[idx]
      if (img?.complete) {
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Mức độ hạ tâm ảnh xuống để ngọn lửa không bị navbar che
        const yShift = 70 
        
        const s = Math.max(canvas.width / img.width, canvas.height / img.height)
        const x = (canvas.width - img.width * s) / 2
        const y = (canvas.height - img.height * s) / 2 + yShift
        
        ctx.drawImage(img, x, y, img.width * s, img.height * s)

        // Phủ lớp gradient đen mềm mại ở trên đỉnh để xóa ranh giới cứng của các viền khung hình (nếu ảnh gốc bị cắt mép/letterbox)
        const topFade = ctx.createLinearGradient(0, 0, 0, 250)
        topFade.addColorStop(0, 'rgba(0,0,0,1)')
        topFade.addColorStop(0.4, 'rgba(0,0,0,0.8)')
        topFade.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = topFade
        ctx.fillRect(0, 0, canvas.width, 250)
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      render()
    }
    resize()
    window.addEventListener('resize', resize)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        pin: canvas,
        anticipatePin: 1,
        onUpdate: (self) => setScrollProgress(self.progress),
      }
    })

    tl.to(frameIndexRef.current, {
      frame: TOTAL_FRAMES - 1,
      ease: 'none',
      onUpdate: render,
    })

    return () => {
      window.removeEventListener('resize', resize)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [imagesLoaded])

  // ─── Helpers ──────────────────────────────────────────────
  const getOpacity = (p: PanelDef) => {
    const s = scrollProgress
    if (s < p.fadeIn) return 0
    if (s < p.full) return (s - p.fadeIn) / (p.full - p.fadeIn)
    if (s < p.fadeOut) return 1
    if (s < p.gone) return 1 - (s - p.fadeOut) / (p.gone - p.fadeOut)
    return 0
  }

  const getSlide = (p: PanelDef) => {
    const s = scrollProgress
    // Slide in from below, slide out upward
    if (s < p.fadeIn) return 50
    if (s < p.full) return 50 * (1 - (s - p.fadeIn) / (p.full - p.fadeIn))
    if (s < p.fadeOut) return 0
    if (s < p.gone) return -30 * ((s - p.fadeOut) / (p.gone - p.fadeOut))
    return -30
  }

  // Position styles
  const leftStyle: React.CSSProperties = {
    position: 'fixed', top: 0, bottom: 0, left: 0,
    width: '45%', zIndex: 5,
    display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
    pointerEvents: 'none',
  }
  const rightStyle: React.CSSProperties = {
    position: 'fixed', top: 0, bottom: 0, right: 0,
    width: '45%', zIndex: 5,
    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
    pointerEvents: 'none',
  }
  const centerStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 5,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    pointerEvents: 'none',
  }

  const getPositionStyle = (pos: string) => {
    if (pos === 'left') return leftStyle
    if (pos === 'right') return rightStyle
    return centerStyle
  }

  const getContentPad = (pos: string): React.CSSProperties => {
    if (pos === 'left') return { padding: '0 40px 0 6%', maxWidth: '600px', textAlign: 'left' }
    if (pos === 'right') return { padding: '0 6% 0 40px', maxWidth: '600px', textAlign: 'left' }
    return { padding: '0 40px', maxWidth: '700px', textAlign: 'center' }
  }

  // ─── Panel render helper ──────────────────────────────────
  const renderPanel = (index: number, children: React.ReactNode) => {
    const p = PANELS[index]
    // Intro panel (0): always starts visible, fades out when scrolling
    let opacity: number
    let translateY: number
    if (index === 0) {
      const p0 = PANELS[0]
      // Always visible until fadeOut point, then fade out
      if (scrollProgress < p0.fadeOut) {
        opacity = 1
      } else if (scrollProgress < p0.gone) {
        opacity = 1 - (scrollProgress - p0.fadeOut) / (p0.gone - p0.fadeOut)
      } else {
        opacity = 0
      }
      translateY = scrollProgress > p0.fadeOut ? -30 * ((scrollProgress - p0.fadeOut) / (p0.gone - p0.fadeOut)) : 0
    } else {
      opacity = getOpacity(p)
      translateY = getSlide(p)
    }

    return (
      <div
        key={index}
        className={p.position !== 'center' ? "mobile-panel" : undefined}
        style={{
          ...getPositionStyle(p.position),
          opacity,
          transform: `translateY(${translateY}px)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className={p.position !== 'center' ? "mobile-panel-pad" : undefined} style={getContentPad(p.position)}>
          {children}
        </div>
      </div>
    )
  }

  // ─── Shared text styles ───────────────────────────────────
  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    letterSpacing: '5px',
    textTransform: 'uppercase',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '24px',
    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '52px',
    fontWeight: 700,
    lineHeight: 1.15,
    color: '#fff',
    marginBottom: '16px',
    textShadow: '0 4px 40px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)',
  }

  const subtitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 300,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 1.6,
    marginBottom: '24px',
    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
  }

  const bodyStyle: React.CSSProperties = {
    fontSize: '18px',
    lineHeight: 1.85,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 300,
    marginBottom: '22px',
    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
  }

  const bodyDimStyle: React.CSSProperties = {
    ...bodyStyle,
    color: 'rgba(255,255,255,0.7)',
  }

  const dividerStyle: React.CSSProperties = {
    width: '50px',
    height: '2px',
    background: 'rgba(255,255,255,0.35)',
    marginBottom: '24px',
  }

  return (
    <>
      {/* ── Loading ──────────────────────────────────── */}
      {!imagesLoaded && (
        <div style={{
          position: 'fixed', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#000', zIndex: 50,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px', height: '48px',
              border: '2px solid rgba(255,255,255,0.08)',
              borderTop: '2px solid rgba(255,255,255,0.7)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 24px',
            }} />
            <div style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', letterSpacing: '3px' }}>
              {loadProgress}%
            </div>
          </div>
        </div>
      )}

      {/* ── Canvas ───────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100vh', zIndex: 0 }}
      />

      {/* ── Scroll container — 1200vh ────────────────── */}
      <div ref={containerRef} style={{ position: 'relative', height: '1200vh' }}>

        {/* Gradient overlays for text readability */}
        {/* Left gradient — for left-aligned panels */}
        <div className="desktop-gradient" style={{
          position: 'fixed', inset: 0, zIndex: 2,
          pointerEvents: 'none',
          background: `linear-gradient(
            to right,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.5) 30%,
            rgba(0,0,0,0.1) 48%,
            transparent 55%
          )`,
          opacity: (scrollProgress > 0.07 && scrollProgress < 0.30) ||
                   (scrollProgress > 0.27 && scrollProgress < 0.60) ||
                   (scrollProgress > 0.57 && scrollProgress < 0.90)
                   ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }} />
        {/* Right gradient — for right-aligned panels */}
        <div className="desktop-gradient" style={{
          position: 'fixed', inset: 0, zIndex: 2,
          pointerEvents: 'none',
          background: `linear-gradient(
            to left,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.5) 30%,
            rgba(0,0,0,0.1) 48%,
            transparent 55%
          )`,
          opacity: (scrollProgress > 0.17 && scrollProgress < 0.30) ||
                   (scrollProgress > 0.37 && scrollProgress < 0.50) ||
                   (scrollProgress > 0.67 && scrollProgress < 0.80)
                   ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }} />

        {/* Bottom gradient — strictly for mobile readability over bright sequences */}
        <div className="mobile-gradient" style={{
          position: 'fixed', inset: 0, zIndex: 2,
          pointerEvents: 'none',
          background: `linear-gradient(
            to top,
            rgba(0,0,0,0.95) 0%,
            rgba(0,0,0,0.85) 15%,
            rgba(0,0,0,0.6) 30%,
            rgba(0,0,0,0.2) 45%,
            transparent 60%
          )`,
          opacity: (scrollProgress > 0.07 && scrollProgress < 0.90) ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }} />
        {/* Center vignette — for intro & CTA */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, transparent 75%)',
          opacity: scrollProgress < 0.09 || scrollProgress > 0.89 ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }} />

        {/* ── Progress bar (right edge) ──────────────── */}
        <div style={{
          position: 'fixed', right: '16px', top: '50%',
          transform: 'translateY(-50%)', zIndex: 10,
          height: '100px',
          opacity: scrollProgress > 0.03 ? 0.6 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          <div style={{
            width: '2px', height: '100%',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '1px', position: 'relative',
          }}>
            <div style={{
              width: '2px',
              height: `${Math.min(scrollProgress * 100, 100)}%`,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '1px',
              transition: 'height 0.15s ease',
            }} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════ */}
        {/* PANEL 0 — INTRO (CENTER)                      */}
        {/* ══════════════════════════════════════════════ */}
        {renderPanel(0, <>
          <div style={{
            fontSize: '13px', letterSpacing: '4px',
            textTransform: 'uppercase', fontWeight: 500,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '24px',
          }}>
            Triết học Mác — Lênin · Chương 2, Mục II
          </div>
          <h1 style={{
            fontSize: '56px', fontWeight: 700,
            lineHeight: 1.15, color: '#fff',
            marginBottom: '20px',
            textShadow: '0 4px 40px rgba(0,0,0,0.5)',
          }}>
            Phép biện chứng duy vật
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'rgba(255,255,255,0.4)', margin: '0 auto 28px' }} />
          <p style={{
            fontSize: '24px', fontStyle: 'italic',
            lineHeight: 1.5, fontWeight: 300,
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '12px',
          }}>
            &ldquo;Change is the only constant in life&rdquo;
          </p>
          <p style={{
            fontSize: '14px', letterSpacing: '4px',
            textTransform: 'uppercase', fontWeight: 400,
            color: 'rgba(255,255,255,0.5)', marginBottom: '36px',
          }}>
            — Heraclitus
          </p>
          <p style={{
            fontSize: '16px', lineHeight: 1.8,
            color: 'rgba(255,255,255,0.75)',
            fontWeight: 300,
          }}>
            Cuộn xuống để khám phá ba quy luật cơ bản của phép biện chứng
            thông qua hành trình tiến hóa của ánh sáng.
          </p>
          <div style={{
            marginTop: '52px', fontSize: '13px', letterSpacing: '3px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            Cuộn để bắt đầu ↓
          </div>
        </>)}

        {/* ══════════════════════════════════════════════ */}
        {/* PANEL 1 — STATE 1 TITLE (LEFT)                */}
        {/* ══════════════════════════════════════════════ */}
        {renderPanel(1, <>
          <div style={labelStyle}>Phần 1</div>
          <h2 style={titleStyle}>
            Vận động<br />tự thân
          </h2>
          <p style={subtitleStyle}>
            Quy luật vận động tự thân của sự vật
          </p>
          <div style={dividerStyle} />
          <p style={bodyStyle}>
            Đốm lửa nhỏ bập bùng trước mắt bạn chính là
            hiện thân của nguyên lý nền tảng nhất trong
            phép biện chứng: mọi sự vật, hiện tượng
            đều luôn luôn vận động, biến đổi không ngừng.
          </p>
        </>)}

        {/* ══════════════════════════════════════════════ */}
        {/* PANEL 2 — STATE 1 DETAIL (RIGHT)              */}
        {/* ══════════════════════════════════════════════ */}
        {renderPanel(2, <>
          <div style={labelStyle}>Vận động tự thân</div>
          <p style={bodyStyle}>
            Theo triết học Mác — Lênin, vận động là phương thức
            tồn tại của vật chất. Không có vật chất không vận động
            và không có vận động ngoài vật chất.
          </p>
          <p style={bodyDimStyle}>
            Ngọn lửa tồn tại nhờ phản ứng hóa học liên tục
            giữa nhiên liệu và oxy — nếu ngừng phản ứng,
            lửa tắt, ngừng tồn tại.
          </p>
          <div style={dividerStyle} />
          <p style={{ ...bodyDimStyle, fontStyle: 'italic', fontSize: '17px' }}>
            &ldquo;Bạn không thể bước xuống cùng
            một dòng sông hai lần.&rdquo;
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            — Heraclitus
          </p>
        </>)}

        {/* ══════════════════════════════════════════════ */}
        {/* PANEL 3 — STATE 2 TITLE (LEFT)                */}
        {/* ══════════════════════════════════════════════ */}
        {renderPanel(3, <>
          <div style={labelStyle}>Phần 2</div>
          <h2 style={titleStyle}>
            Lượng — Chất
          </h2>
          <p style={subtitleStyle}>
            Quy luật chuyển hóa từ những thay đổi về lượng
            thành những thay đổi về chất
          </p>
          <div style={dividerStyle} />
          <p style={bodyStyle}>
            Đốm lửa không còn bập bùng ngẫu nhiên —
            nó đang được nén lại, chế ngự, biến thành
            dây tóc bóng đèn rực sáng.
          </p>
        </>)}

        {/* ══════════════════════════════════════════════ */}
        {/* PANEL 4 — STATE 2 DETAIL (RIGHT)              */}
        {/* ══════════════════════════════════════════════ */}
        {renderPanel(4, <>
          <div style={labelStyle}>Lượng — Chất</div>
          <p style={bodyStyle}>
            Mọi sự vật đều là sự thống nhất giữa lượng và chất.
            Khi lượng thay đổi dần dần, tích lũy đến một giới hạn
            nhất định — gọi là điểm nút — sẽ dẫn đến
            sự thay đổi căn bản về chất.
          </p>
          <div style={dividerStyle} />
          <p style={bodyDimStyle}>
            Đây chính là khoảnh khắc &ldquo;nhảy vọt về chất&rdquo;
            mà phép biện chứng mô tả: một bước ngoặt
            không thể đảo ngược.
          </p>
        </>)}

        {/* ══════════════════════════════════════════════ */}
        {/* PANEL 5 — STATE 2 EXAMPLE (LEFT)              */}
        {/* ══════════════════════════════════════════════ */}
        {renderPanel(5, <>
          <div style={labelStyle}>Ví dụ minh họa</div>
          <p style={bodyStyle}>
            Loài người tích lũy hàng nghìn năm kinh nghiệm sử dụng lửa:
            từ đuốc, nến, đèn dầu — đó là sự thay đổi về lượng.
          </p>
          <p style={bodyDimStyle}>
            Cho đến khi Thomas Edison phát minh bóng đèn sợi đốt
            năm 1879, một bước nhảy vọt về chất đã xảy ra:
            ánh sáng không còn phụ thuộc vào ngọn lửa trần nữa.
          </p>
          <div style={dividerStyle} />
          <p style={{ ...bodyDimStyle, color: 'rgba(255,255,255,0.4)' }}>
            Chất mới lại tạo nền tảng cho tích lũy về lượng mới,
            mở ra kỷ nguyên công nghệ điện — chu kỳ lượng-chất
            tiếp tục lặp lại ở trình độ cao hơn.
          </p>
        </>)}

        {/* ══════════════════════════════════════════════ */}
        {/* PANEL 6 — STATE 3 TITLE (LEFT)                */}
        {/* ══════════════════════════════════════════════ */}
        {renderPanel(6, <>
          <div style={labelStyle}>Phần 3</div>
          <h2 style={titleStyle}>
            Phủ định của<br />phủ định
          </h2>
          <p style={subtitleStyle}>
            Sự phát triển đi lên theo hình xoáy ốc
          </p>
          <div style={dividerStyle} />
          <p style={bodyStyle}>
            Bóng đèn giờ đây bung tỏa thành những luồng dữ liệu,
            mạch điện, quang phổ kỹ thuật số.
            Ánh sáng không biến mất — nó được kế thừa
            và nâng lên một trình độ hoàn toàn mới.
          </p>
        </>)}

        {/* ══════════════════════════════════════════════ */}
        {/* PANEL 7 — STATE 3 DETAIL (RIGHT)              */}
        {/* ══════════════════════════════════════════════ */}
        {renderPanel(7, <>
          <div style={labelStyle}>Phủ định biện chứng</div>
          <p style={bodyStyle}>
            Sự phát triển không phải là đường thẳng,
            cũng không phải vòng tròn lặp lại —
            mà là đường xoáy ốc đi lên.
          </p>
          <p style={bodyDimStyle}>
            Mỗi lần phủ định là một bước tiến:
            cái mới ra đời trên cơ sở kế thừa
            những yếu tố tích cực của cái cũ,
            đồng thời loại bỏ những gì lỗi thời.
          </p>
        </>)}

        {/* ══════════════════════════════════════════════ */}
        {/* PANEL 8 — STATE 3 SYNTHESIS (LEFT)            */}
        {/* ══════════════════════════════════════════════ */}
        {renderPanel(8, <>
          <div style={labelStyle}>Tổng hợp</div>
          <p style={bodyStyle}>
            Lửa bị phủ định bởi bóng đèn.
            Bóng đèn lại bị phủ định bởi công nghệ số.
            Nhưng cáp quang ngày nay vẫn truyền tải ánh sáng —
            bản chất của lửa được bảo tồn ở trình độ cao hơn.
          </p>
          <div style={dividerStyle} />
          <p style={{ ...bodyDimStyle, fontStyle: 'italic', fontSize: '17px' }}>
            Con đường từ lửa đến dữ liệu quang học
            minh chứng: sự thay đổi là hằng số duy nhất,
            nhưng mỗi sự thay đổi đều mang theo
            di sản của quá khứ.
          </p>
        </>)}

        {/* ── CTA Background Image ──────────────────────── */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1,
          pointerEvents: 'none',
          opacity: scrollProgress > 0.88 ? Math.min((scrollProgress - 0.88) / 0.04, 1) : 0,
          transition: 'opacity 0.8s ease',
        }}>
          <img
            src="/image/cta-background.png"
            alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.6)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%)',
          }} />
        </div>

        {/* ══════════════════════════════════════════════ */}
        {/* PANEL 9 — CTA (CENTER)                        */}
        {/* ══════════════════════════════════════════════ */}
        {renderPanel(9, <>
          <p style={{
            fontSize: '34px', fontStyle: 'italic',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '12px', fontWeight: 300,
            textShadow: '0 2px 30px rgba(0,0,0,0.6)',
            lineHeight: 1.4,
          }}>
            &ldquo;Change is the only constant in life&rdquo;
          </p>
          <p style={{
            fontSize: '13px', letterSpacing: '4px',
            textTransform: 'uppercase', fontWeight: 400,
            color: 'rgba(255,255,255,0.3)', marginBottom: '40px',
          }}>
            — Heraclitus
          </p>
          <p style={{ ...bodyDimStyle, fontSize: '15px', marginBottom: '44px' }}>
            Ba quy luật của phép biện chứng duy vật giải thích
            sự vận động của tự nhiên, xã hội và tư duy —
            kim chỉ nam cho mọi biến đổi.
          </p>
          <button
            style={{
              pointerEvents: 'auto', cursor: 'pointer',
              padding: '16px 52px',
              fontSize: '15px', fontWeight: 600,
              letterSpacing: '1px', color: '#000',
              background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
              border: 'none', borderRadius: '50px',
              boxShadow: '0 4px 30px rgba(255,255,255,0.2), 0 0 60px rgba(255,255,255,0.08)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 6px 40px rgba(255,255,255,0.35), 0 0 80px rgba(255,255,255,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 30px rgba(255,255,255,0.2), 0 0 60px rgba(255,255,255,0.08)'
            }}
          >
            Thử thách "Con đường Biện chứng"
          </button>
        </>)}

      </div>

      {/* ── Global styles ────────────────────────────── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        html { scroll-behavior: auto; }

        body {
          overflow-x: hidden;
          background: #000;
          color: #fff;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        ::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }

        ::selection {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }
      `}</style>
    </>
  )
}
