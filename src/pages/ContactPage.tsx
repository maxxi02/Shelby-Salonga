import { useEffect, useRef, useState, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal')
    if (!els) return
    gsap.fromTo(els,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: '1px solid var(--border)',
    color: 'var(--fg)', fontFamily: 'var(--font-body)',
    fontSize: '13px', padding: '16px 0', outline: 'none',
    letterSpacing: '0.05em',
  }

  return (
    <>
      {/* Noise overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundSize: '300px 300px',
      }} />

      <section id="contact-top" ref={sectionRef} className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">

          {/* Big heading */}
          <div className="reveal" style={{ paddingTop: '40px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 12vw, 14rem)',
              lineHeight: 0.9, letterSpacing: '-0.02em',
            }}>
              CONTACT
            </h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', paddingTop: '80px' }}>
            {/* Left: info */}
            <div>
              <p className="reveal" style={{ fontSize: '13px', lineHeight: 1.9, opacity: 0.7, marginBottom: '48px', maxWidth: '360px' }}>
                Have a project in mind? Let's talk. I'm always open to discussing new opportunities, creative collaborations, or just a good conversation about design.
              </p>
              <div className="reveal" style={{ marginBottom: '24px' }}>
                <p className="section-label" style={{ marginBottom: '8px' }}>Email</p>
                <a href="mailto:hello@shelbysalonga.com" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '0.05em' }}>
                  HELLO@SHELBYSALONGA.COM
                </a>
              </div>
              <div className="reveal">
                <p className="section-label" style={{ marginBottom: '12px' }}>Socials</p>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {['Instagram', 'LinkedIn', 'Dribbble', 'GitHub'].map(s => (
                    <a key={s} href="#" style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, transition: 'opacity 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                    >{s}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="reveal">
              {sent ? (
                <div style={{ padding: '60px 0' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '40px', letterSpacing: '0.05em' }}>MESSAGE SENT ✓</p>
                  <p style={{ fontSize: '13px', opacity: 0.6, marginTop: '16px' }}>I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input required placeholder="Your Name" style={inputStyle} />
                  <input required type="email" placeholder="Email Address" style={inputStyle} />
                  <input placeholder="Subject" style={inputStyle} />
                  <textarea required placeholder="Your Message" rows={5} style={{ ...inputStyle, resize: 'none', marginTop: '8px' }} />
                  <button type="submit" style={{
                    marginTop: '32px', padding: '18px 48px',
                    border: '1px solid var(--fg)', background: 'transparent',
                    color: 'var(--fg)', fontFamily: 'var(--font-body)',
                    fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    cursor: 'pointer', alignSelf: 'flex-start',
                    transition: 'background 0.3s, color 0.3s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--fg)'; e.currentTarget.style.color = 'var(--bg)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg)' }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </>
  )
}
