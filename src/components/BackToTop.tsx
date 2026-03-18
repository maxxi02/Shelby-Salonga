import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { getLenis } from '../hooks/useLenis'

export default function BackToTop() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!btnRef.current) return
    gsap.to(btnRef.current, {
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'all' : 'none',
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [visible])

  const handleClick = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: '32px', right: '32px',
        width: '44px', height: '44px',
        border: '1px solid var(--fg)',
        background: 'var(--bg)', color: 'var(--fg)',
        borderRadius: '50%', fontSize: '18px',
        cursor: 'pointer', zIndex: 900,
        opacity: 0, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s, color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--fg)'; e.currentTarget.style.color = 'var(--bg)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.color = 'var(--fg)' }}
    >
      ↑
    </button>
  )
}
