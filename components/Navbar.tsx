'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_HEIGHT = 56

const tabs = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Nội dung', href: '/content' },
  { label: 'AI Usage', href: '/ai' },
  { label: 'Về chúng tôi', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <>
      {/* ── TOP NAV CONTAINER (LOGO & DESKTOP TABS) ── */}
      <nav
        className="mobile-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${NAV_HEIGHT}px`,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Left — Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
        >
          <img
            src="/image/fpt-logo.png"
            alt="FPT University"
            style={{
              height: '32px',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '4px',
            }}
          />
        </Link>

        {/* Right — Desktop Tab links */}
        <div className="desktop-only-tabs" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                style={{
                  padding: '8px 20px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.5px',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* ── BOTTOM MOBILE TABS CONTAINER ── */}
      {/* Placed physically outside of the backdrop-filter so it can use position: fixed to bottom perfectly */}
      <div className="mobile-only-tabs mobile-nav-tabs" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </>
  )
}

export { NAV_HEIGHT }
