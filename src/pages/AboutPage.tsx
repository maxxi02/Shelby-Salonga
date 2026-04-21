import { useRef } from 'react'
import aboutImage1 from '../assets/miyamoto-about-image-1.png'
import aboutImage2 from '../assets/miyamoto-about-image-2.png'
import SEO from '../components/SEO'
import { useSectionReveal } from '../hooks/useSectionReveal'

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`

interface SectionProps {
  children: React.ReactNode
  first?: boolean
}

function Section({ children, first }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)
  return (
    <section id="about-top" ref={ref} className={first ? 'about-section about-section--first' : 'about-section'} style={{ position: 'relative', zIndex: 1 }}>
      <div className="about-container">
        {children}
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About — Shelby Salonga"
        description="Creative Developer & Designer based in Manila, PH. I build precise, beautiful digital experiences at the intersection of design and code, specializing in React, TypeScript, and Node.js."
        url="https://rojanns.vercel.app/about"
      />
      {/* Noise overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: NOISE, backgroundSize: '300px 300px',
      }} />

      {/* ── Section 1 — What I Do ── */}
      <Section first>
        <div className="about-intro-grid">
          {/* Left — label → text → image */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p className="section-label sr">WHAT I DO</p>
            <p className="sr" style={{ fontSize: '13px', lineHeight: 1.95, opacity: 0.7, maxWidth: '520px' }}>
              I am a Full-stack Developer based in Batangas, PH. I build scalable web and mobile applications across React, Node.js, Flutter, FastAPI, and PostgreSQL — focused on clean architecture, end-to-end implementation, and delivering user-friendly digital solutions.
            </p>
            <p className="sr" style={{ fontSize: '13px', lineHeight: 1.95, opacity: 0.7, maxWidth: '520px' }}>
              I leverage AI-assisted development tools like Claude, Amazon Q, and GitHub Copilot to ship faster without compromising code quality.
            </p>
            <img src={aboutImage1} alt="Shelby Salonga — developer portrait" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          {/* Right — image → label → text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <img src={aboutImage2} alt="Shelby Salonga — workspace" style={{ width: '100%', height: 'auto', display: 'block' }} />
            <p className="section-label sr">BEFORE THIS...</p>
            <p className="sr" style={{ fontSize: '13px', lineHeight: 1.95, opacity: 0.7, maxWidth: '520px' }}>
              I was a Software Engineer Intern at Solar Works (Jan–Apr 2026) where I built a role-based POS system using Next.js, TypeScript, MongoDB, and serverless architecture — with real-time features via Socket.IO, secure authentication, and a responsive UI with shadcn/ui.
            </p>
            <p className="sr" style={{ fontSize: '13px', lineHeight: 1.95, opacity: 0.7, maxWidth: '520px' }}>
              Before that, I worked as a Freelance Full-stack Developer (Jan 2025–Present) building end-to-end applications with React, Node.js, MongoDB, TypeScript, Flutter, FastAPI, and PostgreSQL — including JWT authentication, RESTful APIs, WebSocket, and CI/CD-driven architectures.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Section 3 — For Fun ── */}
      <Section>
        <div className="about-grid">
          {/* Left — text */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
            <p className="section-label sr">FOR FUN...</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                'I code side projects.',
                'I explore design trends.',
                'I play video games.',
                'I obsess over clean code and great UX.',
              ].map(line => (
                <p key={line} className="sr" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
                  letterSpacing: '0.02em', lineHeight: 1.1, opacity: 0.85,
                }}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div>
            <img src={aboutImage2} alt="Shelby Salonga — workspace" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </Section>

      {/* ── Section 4 — Find Me On ── */}
      <Section>
        <p className="section-label sr" style={{ marginBottom: '40px' }}>FIND ME ON</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            ['GitHub', 'https://github.com/maxxi02'],
            ['LinkedIn', 'https://linkedin.com/in/rojannotorio6'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="sr find-link"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '28px 0', borderTop: '1px solid var(--border)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 5rem)',
                letterSpacing: '0.02em', lineHeight: 1,
                opacity: 0.7, transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              {label}
              <span style={{ fontSize: '0.4em', opacity: 0.4, letterSpacing: '0.1em' }}>↗</span>
            </a>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </Section>

      <style>{`
        .about-section { padding: 6rem 0; }
        .about-section--first { padding: 160px 0 6rem; }
        .about-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }

        .about-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .about-grid--reverse > *:first-child { order: 1; }
        .about-grid--reverse > *:last-child  { order: 0; }

        @media (max-width: 768px) {
          .about-section--first { padding: 100px 0 3rem; }
          .about-section { padding: 3rem 0; }
          .about-container { padding: 0 20px; }

          .about-intro-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .about-grid--reverse > *:first-child { order: 0; }
          .about-grid--reverse > *:last-child  { order: 1; }
        }
      `}</style>
    </>
  )
}
