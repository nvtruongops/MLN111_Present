'use client'

import Link from 'next/link'
// Metadata must be in layout or a server component. Since we use 'use client', we map the metadata to a separate layout if needed, or remove it here. Removing as we're in 'use client'.
// export const metadata = {
//   title: 'Về chúng tôi — Vòng Xoáy Biện Chứng',
//   description: 'Giới thiệu nhóm 1, dự án môn Triết học Mác – Lênin (MLN111), FPT University',
// }

const members = [
  { name: 'Nguyễn Văn Trường', code: 'SE182034' },
  { name: 'Thái Nhật Minh Quân', code: 'SS180085' },
  { name: 'Nguyễn Quí Đức', code: 'SE182087' },
  { name: 'Huỳnh Đức Anh', code: 'SE183114' },
  { name: 'Trần Hải Đăng', code: 'SE181926' },
]

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#e96d23',
        color: '#000',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      {/* ── Background decoration ──────────────────── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0.05) 0%, transparent 50%)',
        }}
      />

      <div
        className="mobile-page-wrapper"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 32px',
        }}
      >
        {/* ── Header ───────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <h1
            className="mobile-page-title"
            style={{
              fontSize: '40px',
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: '24px',
              color: '#0463ab',
              textShadow: '0 2px 10px rgba(4,99,171,0.2)',
            }}
          >
            Philosophy of Marxism – Leninism
          </h1>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(0,0,0,0.7)',
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            Dự án trình bày cho môn học Triết học Mác – Lênin
          </p>
        </div>

        {/* ── Course Info ──────────────────────────── */}
        <section style={{ marginBottom: '64px' }}>
          <div
            className="mobile-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
            }}
          >
            {/* Course card */}
            <div
              style={{
                background: '#0463ab',
                boxShadow: '0 10px 30px rgba(4,99,171,0.3)',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '16px',
                  fontWeight: 500,
                }}
              >
                Môn học
              </div>
              <h2
                className="mobile-text-wrap"
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                }}
              >
                Philosophy of Marxism – Leninism
              </h2>
              <p
                style={{
                  fontSize: '17px',
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  marginBottom: '20px',
                }}
              >
                Triết học Mác - Lê-nin
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    padding: '6px 14px',
                    background: '#12b24f',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '1px',
                  }}
                >
                  MLN111
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  Spring 2024
                </span>
              </div>
            </div>

            {/* Teacher card */}
            <div
              style={{
                background: '#0463ab',
                boxShadow: '0 10px 30px rgba(4,99,171,0.3)',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '16px',
                  fontWeight: 500,
                }}
              >
                Giáo viên hướng dẫn
              </div>
              <h2
                className="mobile-text-wrap"
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '8px',
                  whiteSpace: 'nowrap',
                }}
              >
                Tô Hải Anh
              </h2>
              <p
                style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '20px',
                  fontWeight: 500,
                }}
              >
                Mã giáo viên: AnhTH81
              </p>
              <div
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6,
                }}
              >
                FPT University
              </div>
            </div>
          </div>
        </section>

        {/* ── Topic ────────────────────────────────── */}
        <section style={{ marginBottom: '64px' }}>
          <div
            className="mobile-page-box"
            style={{
              background: '#12b24f',
              boxShadow: '0 10px 30px rgba(18,178,79,0.3)',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '20px',
                fontWeight: 500,
              }}
            >
              Chủ đề dự án
            </div>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '16px',
                lineHeight: 1.3,
              }}
            >
              Phép biện chứng duy vật
            </h2>
            <p
              style={{
                fontSize: '18px',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.6)',
                fontWeight: 300,
                marginBottom: '12px',
              }}
            >
              Chương 2, Mục II — Ba quy luật cơ bản
            </p>
            <div
              style={{
                width: '50px',
                height: '3px',
                background: '#fff',
                margin: '24px auto',
                borderRadius: '2px',
              }}
            />
            <p
              style={{
                fontSize: '22px',
                fontStyle: 'italic',
                color: '#fff',
                fontWeight: 600,
              }}
            >
              &ldquo;Change is the only constant in life&rdquo;
            </p>
            <p
              style={{
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.8)',
                marginTop: '8px',
              }}
            >
              — Heraclitus
            </p>
          </div>
        </section>

        {/* ── Team Members ─────────────────────────── */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div
              style={{
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#0463ab',
                marginBottom: '12px',
                fontWeight: 700,
              }}
            >
              Nhóm 1
            </div>
            <h2
              style={{
                fontSize: '36px',
                fontWeight: 800,
                color: '#000',
              }}
            >
              Thành viên
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            {members.slice(0, 2).map((m, i) => (
              <div
                key={i}
                className="mobile-team-card"
                style={{
                  background: '#0463ab',
                  boxShadow: '0 6px 20px rgba(4,99,171,0.2)',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 'calc(50% - 8px)',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{m.name}</div>
                <span
                  style={{
                    fontSize: '12px', fontWeight: 700, letterSpacing: '1px',
                    color: '#0463ab', background: '#fff',
                    padding: '4px 12px', borderRadius: '6px', whiteSpace: 'nowrap',
                  }}
                >
                  {m.code}
                </span>
              </div>
            ))}
            {members.slice(2, 5).map((m, i) => (
              <div
                key={i + 2}
                className="mobile-team-card"
                style={{
                  background: '#0463ab',
                  boxShadow: '0 6px 20px rgba(4,99,171,0.2)',
                  borderRadius: '12px',
                  padding: '24px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 'calc(33.333% - 11px)',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{m.name}</div>
                <span
                  style={{
                    fontSize: '12px', fontWeight: 700, letterSpacing: '1px',
                    color: '#0463ab', background: '#fff',
                    padding: '4px 12px', borderRadius: '6px', whiteSpace: 'nowrap',
                  }}
                >
                  {m.code}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Global styles for about page ──────────── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  )
}
