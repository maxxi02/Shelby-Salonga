import { useEffect, useRef, useState, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { Turnstile } from '@marsidev/react-turnstile'
import SEO from '../components/SEO'
import { sendContactForm } from '../lib/api'

const TURNSTILE_SITE_KEY = import.meta.env.DEV
  ? '1x00000000000000000000AA'
  : import.meta.env.VITE_TURNSTILE_SITE_KEY

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', timeline: '', message: '' })
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.sr')
    if (!els) return
    gsap.fromTo(els,
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
    )
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await sendContactForm(form, token!)
      setSent(true)
    } catch {
      setError('Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: '1px solid var(--border)',
    color: 'var(--fg)', fontFamily: 'var(--font-body)',
    fontSize: '13px', padding: '16px 0', outline: 'none',
    letterSpacing: '0.05em', boxSizing: 'border-box',
  }

  return (
    <>
      <SEO
        title="Contact — Shelby Salonga"
        description="Get in touch with Shelby Salonga — Creative Developer & Designer based in Manila, PH. Available for work."
        url="https://rojanns.vercel.app/contact"
      />

      {/* Noise overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundSize: '300px 300px',
      }} />

      <section id="contact-top" ref={sectionRef} style={{ position: 'relative', zIndex: 1, paddingTop: '160px', paddingBottom: '8rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>

          {/* Heading */}
          <div className="sr" style={{ marginBottom: '0.5rem' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              letterSpacing: '0.02em', lineHeight: 0.95,
            }}>
              GET IN TOUCH
            </h1>
          </div>

          <p className="sr section-label" style={{ marginBottom: '5rem' }}>[ AVAILABLE FOR WORK ]</p>

          {sent ? (
            <p className="sr" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '0.02em', opacity: 0.85,
            }}>
              MESSAGE SENT →
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '640px' }}>
              <input
                className="sr"
                required
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={inputStyle}
              />
              <input
                className="sr"
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle}
              />
              <input
                className="sr"
                required
                placeholder="Timeline — e.g. 2 weeks, 1 month"
                value={form.timeline}
                onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                style={inputStyle}
              />
              <textarea
                className="sr"
                required
                placeholder="Message"
                rows={4}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'none' }}
              />
              <div className="sr" style={{ marginTop: '2.5rem' }}>
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  onSuccess={(t) => setToken(t)}
                  onError={() => setToken(null)}
                  onExpire={() => setToken(null)}
                  options={{ theme: 'dark' }}
                />
                <button
                  type="submit"
                  className="view-btn"
                  disabled={!token || loading}
                  style={{ opacity: token ? 1 : 0.4, cursor: token ? 'pointer' : 'not-allowed', marginTop: '1rem' }}
                >
                  {loading ? 'SENDING...' : 'SEND MESSAGE →'}
                </button>
                {error && (
                  <p style={{ marginTop: '12px', fontSize: '12px', color: '#e05555', letterSpacing: '0.05em' }}>
                    {error}
                  </p>
                )}
              </div>
            </form>
          )}

        </div>
      </section>
    </>
  )
}
