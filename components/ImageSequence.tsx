'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 283

interface PanelDef {
  position: 'left' | 'right' | 'center'
  fadeIn: number
  full: number
  fadeOut: number
  gone: number
}

const PANELS: PanelDef[] = [
  { position: 'center', fadeIn: -0.01, full: 0.02, fadeOut: 0.13, gone: 0.16 },

  // 15% - 35%: Nguyen ly ve su phat trien
  { position: 'left', fadeIn: 0.18, full: 0.20, fadeOut: 0.23, gone: 0.26 },
  { position: 'right', fadeIn: 0.23, full: 0.25, fadeOut: 0.28, gone: 0.31 },
  { position: 'left', fadeIn: 0.28, full: 0.30, fadeOut: 0.33, gone: 0.36 },

  // 35% - 55%: Quy luat 1 + 2
  { position: 'left', fadeIn: 0.36, full: 0.39, fadeOut: 0.44, gone: 0.47 },
  { position: 'right', fadeIn: 0.46, full: 0.49, fadeOut: 0.54, gone: 0.57 },

  // 55% - 75%: Quy luat 3
  { position: 'left', fadeIn: 0.58, full: 0.61, fadeOut: 0.69, gone: 0.72 },

  // 75% - 90%: Lien he thuc tien
  { position: 'right', fadeIn: 0.76, full: 0.79, fadeOut: 0.87, gone: 0.90 },

  // 90% - 100%: Ket luan + CTA
  { position: 'center', fadeIn: 0.90, full: 0.93, fadeOut: 0.97, gone: 0.99 },
  { position: 'center', fadeIn: 0.96, full: 0.98, fadeOut: 1.10, gone: 1.20 },
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
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', letterSpacing: '1px' }}>
              Dang tai: {loadProgress}
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
          opacity: (scrollProgress > 0.16 && scrollProgress < 0.72)
                   ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }} />
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
          opacity: (scrollProgress > 0.22 && scrollProgress < 0.57) ||
                   (scrollProgress > 0.74 && scrollProgress < 0.90)
                   ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }} />

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
          opacity: (scrollProgress > 0.12 && scrollProgress < 0.92) ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }} />

        <div style={{
          position: 'fixed', inset: 0, zIndex: 2,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, transparent 75%)',
          opacity: scrollProgress < 0.16 || scrollProgress > 0.89 ? 1 : 0,
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

        {/* PANEL 0 — HOOK */}
        {renderPanel(0, <>
          <div style={{
            fontSize: '13px', letterSpacing: '4px',
            textTransform: 'uppercase', fontWeight: 500,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '24px',
          }}>
            Mở đầu
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
            Từ thay đổi nhỏ nhất của đốm lửa đến bước nhảy công nghệ,
            bạn đang nhìn thấy logic của sự phát triển trong thế giới vật chất.
          </p>
          <div style={{
            marginTop: '52px', fontSize: '13px', letterSpacing: '3px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            Cuộn để bắt đầu ↓
          </div>
        </>)}

        {/* PANEL 1 — NGUYEN LY (20%) */}
        {renderPanel(1, <>
          <div style={labelStyle}>Nguyên lý về sự phát triển</div>
          <h2 style={titleStyle}>
            Mọi sự vật luôn vận động
          </h2>
          <p style={subtitleStyle}>
            Vận động và biến đổi là phương thức tồn tại của vật chất
          </p>
          <div style={dividerStyle} />
          <p style={bodyStyle}>
            Nội dung cốt lõi: không có sự vật nào đứng yên tuyệt đối.
            Sự tồn tại của sự vật chính là quá trình tự biến đổi.
          </p>
        </>)}

        {/* PANEL 2 — NGUYEN LY (25%) */}
        {renderPanel(2, <>
          <div style={labelStyle}>Đặc điểm phát triển</div>
          <p style={bodyStyle}>
            Không có gì đứng yên tuyệt đối.
            Càng quan sát sâu, bạn càng thấy mọi hệ thống
            đều đang dao động, điều chỉnh và tái cấu trúc.
          </p>
          <p style={bodyDimStyle}>
            Đặc điểm của sự phát triển:
            khách quan, phổ biến và đa dạng (quanh co, không tuyến tính).
          </p>
          <div style={dividerStyle} />
          <p style={{ ...bodyDimStyle, fontStyle: 'italic', fontSize: '17px' }}>
            &ldquo;Change is the only constant in life.&rdquo;
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            — Heraclitus
          </p>
        </>)}

        {/* PANEL 3 — NGUYEN LY (30%) */}
        {renderPanel(3, <>
          <div style={labelStyle}>Tính tất yếu</div>
          <h2 style={titleStyle}>
            Phát triển là tất yếu
          </h2>
          <p style={subtitleStyle}>
            Từ thấp đến cao, từ đơn giản đến phức tạp
          </p>
          <div style={dividerStyle} />
          <p style={bodyStyle}>
            Đây là phần nguyên lý bổ sung để đầy đủ đề:
            sự phát triển không phụ thuộc ý chí chủ quan,
            mà là quy luật khách quan của thế giới vật chất.
          </p>
        </>)}

        {/* PANEL 4 — QUY LUAT 1 */}
        {renderPanel(4, <>
          <div style={labelStyle}>Quy luật 1</div>
          <h2 style={titleStyle}>
            Thống nhất và đấu tranh
            <br />của các mặt đối lập
          </h2>
          <p style={bodyStyle}>
            Nội dung: các mặt đối lập tồn tại trong cùng một sự vật.
            Vai trò: mâu thuẫn là nguồn gốc của sự phát triển.
          </p>
          <div style={dividerStyle} />
          <p style={bodyDimStyle}>
            &ldquo;Mâu thuẫn tạo ra thay đổi.&rdquo;
          </p>
        </>)}

        {/* PANEL 5 — QUY LUAT 2 */}
        {renderPanel(5, <>
          <div style={labelStyle}>Quy luật 2</div>
          <h2 style={titleStyle}>
            Chuyển hóa từ lượng
            <br />thành chất
          </h2>
          <p style={bodyStyle}>
            Nội dung: lượng tích lũy dần, đạt ngưỡng sẽ biến đổi chất.
            Vai trò: đây là cách thức của sự phát triển.
          </p>
          <p style={bodyDimStyle}>
            &ldquo;Tích lũy - bước nhảy.&rdquo;
          </p>
          <div style={dividerStyle} />
          <p style={{ ...bodyDimStyle, color: 'rgba(255,255,255,0.4)' }}>
            Từ dao động của đốm lửa đến bóng đèn dây tóc,
            đó là quá trình thay đổi có tích lũy, không đột ngột.
          </p>
        </>)}

        {/* PANEL 6 — QUY LUAT 3 */}
        {renderPanel(6, <>
          <div style={labelStyle}>Quy luật 3</div>
          <h2 style={titleStyle}>
            Phủ định của phủ định
          </h2>
          <p style={subtitleStyle}>
            Khuynh hướng phát triển theo đường xoáy ốc
          </p>
          <div style={dividerStyle} />
          <p style={bodyStyle}>
            Nội dung: cái mới thay thế cái cũ,
            nhưng kế thừa các yếu tố tích cực.
          </p>
          <p style={bodyDimStyle}>
            &ldquo;Thay đổi là liên tục, nhưng có kế thừa
            để phát triển cao hơn.&rdquo;
          </p>
        </>)}

        {/* PANEL 7 — LIEN HE THUC TIEN */}
        {renderPanel(7, <>
          <div style={labelStyle}>Liên hệ thực tiễn</div>
          <h2 style={titleStyle}>
            Lý thuyết đi vào thực tế
          </h2>
          <p style={bodyStyle}>
            AI thay đổi cách làm việc.
            Cyber Security: Hacker ↔ Defense tạo động lực tiến bộ.
            Xã hội luôn biến đổi, xu hướng mới liên tục xuất hiện.
          </p>
          <div style={dividerStyle} />
          <p style={{ ...bodyDimStyle, fontStyle: 'italic', fontSize: '17px' }}>
            Mâu thuẫn trong công nghệ và đời sống thực sự
            đang vận hành đúng logic biện chứng.
          </p>
        </>)}

        {/* ── CTA Background Image ──────────────────────── */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1,
          pointerEvents: 'none',
          opacity: scrollProgress > 0.89 ? Math.min((scrollProgress - 0.89) / 0.04, 1) : 0,
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

        {/* PANEL 8 — KET LUAN */}
        {renderPanel(8, <>
          <div style={{
            fontSize: '14px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '22px',
          }}>
            Kết luận
          </div>
          <h2 style={{ ...titleStyle, marginBottom: '24px', maxWidth: '860px' }}>
            Thay đổi không chỉ là hiện tượng
            <br />mà là quy luật của thế giới
          </h2>
          <p style={{ ...bodyDimStyle, fontSize: '17px', marginBottom: 0 }}>
            Toàn bộ hành trình từ đốm lửa đến mạng dữ liệu cho thấy
            sự phát triển là quy luật khách quan, phổ biến và đa tầng.
          </p>
        </>)}

        {/* PANEL 9 — FINAL QUOTE + QUIZ CTA */}
        {renderPanel(9, <>
          <p style={{
            fontSize: '32px',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.92)',
            marginBottom: '10px',
            fontWeight: 300,
            textShadow: '0 2px 30px rgba(0,0,0,0.6)',
            lineHeight: 1.4,
          }}>
            &ldquo;Change is the only constant in life&rdquo;
          </p>
          <p style={{
            fontSize: '13px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '32px',
          }}>
            — Heraclitus
          </p>
          <Link
            href="/quiz"
            style={{
              pointerEvents: 'auto',
              display: 'inline-block',
              cursor: 'pointer',
              padding: '16px 52px',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '1px',
              color: '#000',
              background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
              borderRadius: '50px',
              textDecoration: 'none',
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
            Chuyển sang trang Quiz
          </Link>
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
