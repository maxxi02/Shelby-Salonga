import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const items = ['SHELBY SALONGA', 'PORTFOLIO', 'CREATIVE DEVELOPER', 'DESIGNER']
const repeated = Array(8).fill(items).flat()

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const singleWidth = track.scrollWidth / 2
    let xPos = 0
    const speed = { val: 0.8 }
    let idleTimer: ReturnType<typeof setTimeout>
    let lastScrollY = window.scrollY

    const tick = () => {
      xPos -= speed.val
      if (xPos <= -singleWidth) xPos += singleWidth
      if (xPos > 0) xPos -= singleWidth
      gsap.set(track, { x: xPos })
    }
    gsap.ticker.add(tick)

    const onScroll = () => {
      const dy = window.scrollY - lastScrollY
      lastScrollY = window.scrollY

      const velocity = dy // positive = down, negative = up
      const targetVal = (Math.abs(velocity) * 0.4 + 0.8) * (velocity < 0 ? -1 : 1)

      gsap.to(speed, { val: targetVal, duration: 0.4, ease: 'power2.out', overwrite: true })

      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        gsap.to(speed, { val: 0.8, duration: 1, ease: 'power2.out', overwrite: true })
      }, 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('scroll', onScroll)
      clearTimeout(idleTimer)
    }
  }, [])

  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ overflow: 'hidden', padding: '14px 0' }}>
        <div ref={trackRef} style={{ display: 'flex', width: 'max-content' }}>
          {repeated.map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingRight: '40px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                {item}
              </span>
              <span style={{ opacity: 0.35, fontSize: '18px', paddingLeft: '8px' }}>×</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
