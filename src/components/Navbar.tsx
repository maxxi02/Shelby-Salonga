import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

interface NavbarProps {
  isDark: boolean
  onToggle: () => void
}

const NAV_LINKS = ['works', 'about', 'contact'] as const
type NavLink = typeof NAV_LINKS[number]

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  const iconRef = useRef<HTMLSpanElement>(null)

  const handleToggle = () => {
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed; inset: 0; background: var(--fg);
      z-index: 9999; pointer-events: none; opacity: 0;
    `
    document.body.appendChild(overlay)
    gsap.timeline()
      .to(overlay, { opacity: 0.08, duration: 0.15, ease: 'power2.in' })
      .to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.out', onComplete: () => overlay.remove() })
    if (iconRef.current) {
      gsap.fromTo(iconRef.current,
        { rotation: 0, scale: 0.5, opacity: 0 },
        { rotation: 360, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }
    onToggle()
  }

  return (
    <button
      onClick={handleToggle}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--fg)', fontFamily: 'var(--font-body)',
        fontSize: '18px', opacity: 0.6, transition: 'opacity 0.2s',
        display: 'flex', alignItems: 'center', padding: '4px',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
    >
      <span ref={iconRef} style={{ display: 'inline-block' }}>
        {isDark ? '☀' : '☾'}
      </span>
    </button>
  )
}

export default function Navbar({ isDark, onToggle }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const line1 = useRef<HTMLSpanElement>(null)
  const line2 = useRef<HTMLSpanElement>(null)
  const line3 = useRef<HTMLSpanElement>(null)
  const navLinksRef = useRef<HTMLButtonElement[]>([])
  const [open, setOpen] = useState(false)
  const isAnimating = useRef(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: 'power3.out' }
    )
  }, [])

  const openSidebar = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true
    setOpen(true)
    gsap.set(sidebarRef.current, { x: '100%' })
    gsap.set(overlayRef.current, { display: 'block', opacity: 0 })
    overlayRef.current!.style.pointerEvents = 'all'
    gsap.set(navLinksRef.current, { opacity: 0, x: 40 })
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 })
    const tl = gsap.timeline({ onComplete: () => { isAnimating.current = false } })
    tl.fromTo(sidebarRef.current, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' })
      .fromTo(navLinksRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' },
        '-=0.2'
      )
    gsap.to(line1.current, { y: 7, rotate: 45, duration: 0.3, ease: 'power2.out' })
    gsap.to(line2.current, { opacity: 0, scaleX: 0, duration: 0.2 })
    gsap.to(line3.current, { y: -7, rotate: -45, duration: 0.3, ease: 'power2.out' })
  }, [])

  const closeSidebar = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.35 })
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlayRef.current, { display: 'none' })
        overlayRef.current!.style.pointerEvents = 'none'
        setOpen(false)
        isAnimating.current = false
      },
    })
    tl.fromTo(navLinksRef.current,
      { opacity: 1, x: 0 },
      { opacity: 0, x: 40, duration: 0.2, stagger: 0.05, ease: 'power2.in' }
    ).fromTo(sidebarRef.current, { x: '0%' }, { x: '100%', duration: 0.3, ease: 'power3.in' }, '-=0.1')
    gsap.to(line1.current, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(line2.current, { opacity: 1, scaleX: 1, duration: 0.3 })
    gsap.to(line3.current, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.out' })
  }, [])

  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = useCallback((id: NavLink) => {
    if (open) closeSidebar()
    const delay = open ? 400 : 0
    if (id === 'works') {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }), 300 + delay)
      } else {
        setTimeout(() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }), delay)
      }
    } else if (id === 'about') {
      if (location.pathname !== '/about') {
        navigate('/about')
        setTimeout(() => document.getElementById('about-top')?.scrollIntoView({ behavior: 'smooth' }), 300 + delay)
      } else {
        setTimeout(() => document.getElementById('about-top')?.scrollIntoView({ behavior: 'smooth' }), delay)
      }
    } else if (id === 'contact') {
      if (location.pathname !== '/contact') {
        navigate('/contact')
        setTimeout(() => document.getElementById('contact-top')?.scrollIntoView({ behavior: 'smooth' }), 300 + delay)
      } else {
        setTimeout(() => document.getElementById('contact-top')?.scrollIntoView({ behavior: 'smooth' }), delay)
      }
    }
  }, [open, location.pathname, navigate, closeSidebar])

  const lineStyle: React.CSSProperties = {
    display: 'block', width: '22px', height: '2px',
    background: 'var(--fg)', borderRadius: '2px',
    transformOrigin: 'center',
  }

  return (
    <>
      {/* Floating pill navbar */}
      <nav ref={navRef} className="floating-nav" style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 10px 8px 20px',
        borderRadius: '999px',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(20px) saturate(180%)',
        background: 'color-mix(in srgb, var(--bg) 72%, transparent)',
        boxShadow: 'inset 0 1px 0 color-mix(in srgb, var(--fg) 6%, transparent), 0 8px 32px -8px color-mix(in srgb, var(--fg) 12%, transparent)',
        whiteSpace: 'nowrap',
      }}>

        {/* Nav links — desktop */}
        <div className="pill-links" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {(['works', 'about'] as NavLink[]).map(id => {
            const isActive = id === 'works'
              ? location.pathname === '/'
              : location.pathname === `/${id}`
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                  padding: '9px 20px',
                  borderRadius: '999px',
                  transition: 'opacity 0.2s, background 0.2s, transform 0.15s',
                  background: isActive ? 'var(--fg)' : 'none',
                  color: isActive ? 'var(--bg)' : 'var(--fg)',
                  opacity: isActive ? 1 : 0.65,
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.background = 'color-mix(in srgb, var(--fg) 8%, transparent)'
                  }
                  e.currentTarget.style.transform = 'scale(1.03)'
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.opacity = '0.65'
                    e.currentTarget.style.background = 'none'
                  }
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
                onMouseUp={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            )
          })}
        </div>

        {/* Contact CTA pill */}
        <button
          className="pill-links"
          onClick={() => handleNav('contact')}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            letterSpacing: '0.04em',
            padding: '9px 20px',
            borderRadius: '999px',
            background: location.pathname === '/contact' ? 'var(--fg)' : 'color-mix(in srgb, var(--fg) 12%, transparent)',
            color: location.pathname === '/contact' ? 'var(--bg)' : 'var(--fg)',
            transition: 'opacity 0.2s, transform 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.03)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1.03)')}
        >
          Contact
        </button>

        {/* Theme toggle — desktop */}
        <div className="pill-links" style={{ paddingLeft: '2px' }}>
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
        </div>

        {/* Hamburger — mobile */}
        <button
          className="hamburger"
          onClick={() => (open ? closeSidebar() : openSidebar())}
          aria-label="Toggle menu"
          style={{
            display: 'none', flexDirection: 'column',
            gap: '5px', padding: '8px',
            background: 'none', border: 'none',
          }}
        >
          <span ref={line1} style={lineStyle} />
          <span ref={line2} style={lineStyle} />
          <span ref={line3} style={lineStyle} />
        </button>
      </nav>

      {/* Overlay */}
      <div ref={overlayRef} onClick={closeSidebar} style={{
        display: 'none', position: 'fixed', inset: 0,
        zIndex: 1001, background: 'rgba(0,0,0,0.5)',
        pointerEvents: 'none',
      }} />

      {/* Sidebar */}
      <div ref={sidebarRef} style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '280px', zIndex: 1002,
        background: 'var(--bg)',
        borderLeft: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        padding: '32px 32px 48px',
        transform: 'translateX(100%)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={closeSidebar}
            style={{ opacity: 0.6, transition: 'opacity 0.2s', fontSize: '22px', lineHeight: 1 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
          >✕</button>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
          {NAV_LINKS.map((id, i) => (
            <button
              key={id}
              ref={el => { if (el) navLinksRef.current[i] = el }}
              onClick={() => handleNav(id)}
              style={{
                fontFamily: 'var(--font-display)', fontSize: '48px',
                letterSpacing: '0.03em', textAlign: 'left',
                opacity: 0.9, transition: 'opacity 0.2s, transform 0.2s',
                lineHeight: 1.1,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateX(6px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateX(0)' }}
            >
              {id.toUpperCase()}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5 }}>
            {isDark ? 'Dark' : 'Light'} Mode
          </span>
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .pill-links { display: none !important; }
          .hamburger { display: flex !important; cursor: pointer; }
          .floating-nav { padding: 6px 6px 6px 6px !important; left: auto !important; right: 20px !important; transform: none !important; }
        }
        @media (min-width: 601px) {
          .pill-links { display: flex !important; }
          .hamburger { display: none !important; pointer-events: none !important; }
        }
      `}</style>
    </>
  )
}
