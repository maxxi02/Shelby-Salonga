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
  return (
    <button onClick={onToggle} style={{
      width: '40px', height: '22px', borderRadius: '11px',
      border: '1px solid var(--fg)', position: 'relative',
      transition: 'background 0.3s', flexShrink: 0,
      background: isDark ? 'transparent' : 'var(--fg)',
    }}>
      <span style={{
        position: 'absolute', top: '3px',
        left: isDark ? '3px' : 'calc(100% - 19px)',
        width: '14px', height: '14px', borderRadius: '50%',
        background: isDark ? 'var(--fg)' : 'var(--bg)',
        transition: 'left 0.3s',
      }} />
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
    gsap.fromTo(navRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' })
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
    const tl = gsap.timeline({ onComplete: () => {
      gsap.set(overlayRef.current, { display: 'none' })
      overlayRef.current!.style.pointerEvents = 'none'
      setOpen(false)
      isAnimating.current = false
    }})
    tl.fromTo(navLinksRef.current,
      { opacity: 1, x: 0 },
      { opacity: 0, x: 40, duration: 0.2, stagger: 0.05, ease: 'power2.in' }
    )
    .fromTo(sidebarRef.current, { x: '0%' }, { x: '100%', duration: 0.3, ease: 'power3.in' }, '-=0.1')
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
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', maxWidth: '100vw',
        zIndex: 1000, boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 40px',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
        overflow: 'hidden',
      }}>
        <div onClick={() => {
            if (location.pathname !== '/') {
              navigate('/')
              setTimeout(() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }), 300)
            } else {
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
            }
          }} style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '0.05em', cursor: 'pointer' }}>
          SHELBY SALONGA
        </div>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative', zIndex: 1001 }}>
          {NAV_LINKS.map(id => (
            <button key={id} onClick={() => handleNav(id)} style={{
              fontFamily: 'var(--font-body)', fontSize: '11px',
              letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7,
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              {id}
            </button>
          ))}
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => {
            if (window.innerWidth >= 1024) return
            open ? closeSidebar() : openSidebar()
          }}
          aria-label="Toggle menu"
          style={{
            display: 'none', flexDirection: 'column',
            gap: '5px', padding: '8px',
            background: 'none', border: 'none',
            position: 'fixed', top: '1rem', right: '1rem',
            zIndex: 1003,
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
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }}>
        {/* X close */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={closeSidebar} style={{ opacity: 0.6, transition: 'opacity 0.2s', fontSize: '22px', lineHeight: 1 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
          >✕</button>
        </div>

        {/* Nav links — vertically centered */}
        <nav style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', gap: '1.5rem',
        }}>
          {NAV_LINKS.map((id, i) => (
            <button key={id}
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

        {/* Theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5 }}>
            {isDark ? 'Dark' : 'Light'} Mode
          </span>
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; cursor: pointer; }
        }
        @media (min-width: 1025px) {
          .desktop-nav { display: flex !important; }
          .hamburger { display: none !important; pointer-events: none !important; }
        }
        .hamburger span { background: var(--fg) !important; }
        @media (max-width: 480px) {
          nav { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </>
  )
}
