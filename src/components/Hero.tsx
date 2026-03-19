import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SEO from './SEO'
import myPhoto from '../assets/miyamoto-hero-section-img-removebg-preview.png'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const lines = containerRef.current?.querySelectorAll('.hero-line')
    if (!lines) return
    gsap.fromTo(lines,
      { opacity: 0, y: 80, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, stagger: 0.1, delay: 0.5, ease: 'power4.out' }
    )
  }, [])

  return (
    <>
      <SEO />
      <style>{`
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          min-height: 100vh;
          padding-top: 80px;
          padding-bottom: 4rem;
        }
        .hero-right-empty {
          display: block;
        }
        @media (max-width: 768px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }
          .hero-right-empty {
            display: none;
          }
        }
      `}</style>

      <section id="hero" ref={containerRef} style={{
        position: 'relative', overflow: 'hidden', borderTop: 'none',
      }}>
        {/* CSS noise background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-inner">

            {/* Left — all content */}
            <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)' }}>
              <div style={{ overflow: 'hidden' }}>
                <div className="hero-line" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(6rem, 11vw, 14rem)',
                  lineHeight: 0.9, letterSpacing: '-0.02em',
                }}>
                  SHELBY
                </div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div className="hero-line" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(6rem, 11vw, 14rem)',
                  lineHeight: 0.9, letterSpacing: '-0.02em',
                }}>
                  SALONGA
                </div>
              </div>

              <div className="hero-line" style={{ borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />

              <div className="hero-line" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontVariant: 'small-caps', textTransform: 'uppercase', opacity: 0.9, margin: 0 }}>
                  Creative Developer &amp; Designer
                </p>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.08em', opacity: 0.45, margin: 0 }}>
                  📍 Manila, PH &nbsp;·&nbsp; Available for Work
                </p>
                <button
                  onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    opacity: 0.45,
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'opacity 0.2s',
                    marginTop: '0.5rem',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}
                >
                  View My Works &nbsp;↓
                </button>
              </div>
            </div>

            {/* Right — photo */}
            <div className="hero-right-empty" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
              <div className="hero-line" style={{ overflow: 'hidden', width: '100%', maxWidth: '480px' }}>
                <img
                  src={myPhoto}
                  alt="Shelby Salonga"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '70vh',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                    filter: 'grayscale(100%)',
                    transform: 'rotate(1.5deg)',
                    transformOrigin: 'center',
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
