import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SEO from './SEO'
import myPhoto from '../assets/miyamoto-hero-section-img-removebg-preview.png'


export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-name-left',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.1, delay: 0.4, ease: 'power4.out' }
      )
      gsap.fromTo('.hero-name-right',
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.1, delay: 0.4, ease: 'power4.out' }
      )
      gsap.fromTo('.hero-card',
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, delay: 0.3, ease: 'power3.out' }
      )
      gsap.fromTo('.hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      )
      gsap.fromTo('.hero-hi',
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 1.0, ease: 'back.out(1.7)' }
      )
      gsap.fromTo('.hero-eyebrow',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.5, ease: 'power3.out' }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO />
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          min-height: 100dvh;
          gap: 0 clamp(2rem, 3vw, 4rem);
        }
        .hero-name-text {
          font-family: var(--font-display);
          font-size: clamp(4rem, 8.5vw, 10.5rem);
          line-height: 0.9;
          letter-spacing: -0.01em;
        }
        .hero-card-wrap {
          width: clamp(200px, 24vw, 340px);
          height: clamp(400px, 60vh, 700px);
          position: relative;
        }
        @media (max-width: 768px) {
          .hero-grid {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100dvh;
            gap: 0;
            padding: 0;
            text-align: center;
          }
          .hero-card-col { display: none !important; }
          .hero-name-left {
            order: 1;
            align-items: center !important;
            gap: 0.2rem !important;
          }
          .hero-right-col {
            order: 2;
            align-items: center !important;
            gap: 0.75rem !important;
            margin-top: 0;
          }
          .hero-name-text {
            font-size: clamp(4rem, 22vw, 7rem);
            text-align: center;
            line-height: 0.85;
          }
          .hero-right-col p {
            text-align: center !important;
            max-width: 240px !important;
            font-size: 13px !important;
            opacity: 0.5 !important;
          }
          .hero-eyebrow {
            font-size: 10px !important;
            letter-spacing: 0.25em !important;
            margin-bottom: 0 !important;
          }
          .hero-sub-btn {
            padding: 12px 28px !important;
            border: 1px solid var(--border) !important;
            border-radius: 999px !important;
            opacity: 0.6 !important;
            font-size: 10px !important;
            letter-spacing: 0.2em !important;
            margin-top: 0 !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-name-left, .hero-name-right, .hero-card, .hero-sub, .hero-hi, .hero-eyebrow {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <section id="hero" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="hero-grid">

            {/* LEFT — name eyebrow + "CREATIVE" */}
            <div className="hero-name-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: '0.5rem' }}>
              <p className="hero-eyebrow" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.4,
                margin: 0,
              }}>
                Shelby Salonga
              </p>
              <div className="hero-name-text">CREATIVE</div>
            </div>

            {/* CENTER — portrait card */}
            <div className="hero-card-col hero-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="hero-card-wrap">
                {/* Outer bezel */}
                <div style={{
                  padding: '6px',
                  borderRadius: '24px',
                  border: '1px solid var(--border)',
                  background: 'color-mix(in srgb, var(--fg) 5%, transparent)',
                }}>
                  {/* Inner card */}
                  <div style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'color-mix(in srgb, var(--fg) 8%, transparent)',
                    height: '100%',
                  }}>
                    <img
                      src={myPhoto}
                      alt="Shelby Salonga"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>

                {/* "Hi" badge — bottom-left overlapping card */}
                <div className="hero-hi" style={{
                  position: 'absolute',
                  bottom: '80px',
                  left: '-30px',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'blue',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  color: 'white',
                  boxShadow: '0 4px 24px rgba(163,230,53,0.3)',
                  userSelect: 'none',
                }}>
                  Hi
                </div>
              </div>
            </div>

            {/* RIGHT — "DEVELOPER" + subtitle + CTA */}
            <div className="hero-right-col hero-name-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: '0.75rem' }}>
              <div className="hero-name-text" style={{ textAlign: 'right' }}>DEVELOPER</div>
              <p className="hero-sub" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                lineHeight: 1.75,
                opacity: 0.45,
                maxWidth: '180px',
                textAlign: 'right',
                margin: 0,
              }}>
                Manila-based creative developer &amp; designer crafting digital experiences.
              </p>
              <button
                className="hero-sub hero-sub-btn"
                onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  opacity: 0.35,
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  padding: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.35')}
              >
                View Works ↓
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
