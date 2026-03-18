import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01', title: 'INGENUE', year: '2024',
    tags: 'FASHION · EDITORIAL · BRANDING',
    desc: 'Complete brand system for a luxury fashion label. Logo, typography, color, and motion guidelines crafted for a modern editorial aesthetic.',
    img: 'https://picsum.photos/800/600?random=1',
  },
  {
    num: '02', title: 'SONY', year: '2024',
    tags: 'REACT · TYPESCRIPT · MOTION',
    desc: 'Immersive scroll-driven web experience for a global electronics brand. Minimal dark aesthetic with precision-engineered micro-interactions.',
    img: 'https://picsum.photos/800/600?random=2',
  },
  {
    num: '03', title: 'THE IRISH TIMES', year: '2023',
    tags: 'EDITORIAL · PRINT · DIGITAL',
    desc: 'Art direction and layout design for a leading newspaper. Bridging print tradition with digital-first reading experiences.',
    img: 'https://picsum.photos/800/600?random=3',
  },
  {
    num: '04', title: 'EMPIRE', year: '2023',
    tags: 'ARCHITECTURE · IDENTITY · WAYFINDING',
    desc: 'Visual identity and environmental graphics for a landmark architectural development. Bold typographic system applied across all touchpoints.',
    img: 'https://picsum.photos/800/600?random=4',
  },
]

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isReverse = index % 2 === 1

  useEffect(() => {
    if (!imgRef.current || !textRef.current) return
    gsap.fromTo(imgRef.current,
      { opacity: 0, x: isReverse ? 80 : -80 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: rowRef.current, start: 'top 80%' } }
    )
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: rowRef.current, start: 'top 80%' } }
    )
  }, [isReverse])

  const [open, setOpen] = useState(false)
  const commentsRef = useRef<HTMLDivElement>(null)
  const fireCounts = [24, 18, 11, 9]
  const commentCounts = [3, 2, 3, 2]
  const sampleComments = [
    { time: '2 days ago', text: 'Really clean work on this one.' },
    { time: '5 days ago', text: 'Love the direction here.' },
    { time: '1 week ago', text: "The typography system is chef's kiss." },
  ].slice(0, commentCounts[index] ?? 2)

  const toggleComments = () => {
    if (!commentsRef.current) return
    if (!open) {
      gsap.set(commentsRef.current, { display: 'flex', height: 0, opacity: 0 })
      gsap.to(commentsRef.current, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' })
      setOpen(true)
    } else {
      gsap.to(commentsRef.current, {
        height: 0, opacity: 0, duration: 0.4, ease: 'power3.in',
        onComplete: () => { gsap.set(commentsRef.current, { display: 'none' }) },
      })
      setOpen(false)
    }
  }

  return (
    <div ref={rowRef} className={`project-row${isReverse ? ' reverse' : ''}`}>
      <div ref={imgRef} className="image-column" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
          <img
            src={project.img}
            alt={project.title}
            style={{ flex: 1 }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>
        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--border)', marginTop: '1rem' }} />
        {/* Reaction row */}
        <div style={{ display: 'flex', gap: '1.5rem', padding: '0.75rem 0' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.45, transition: 'opacity 0.2s', padding: 0, color: 'var(--fg)', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}
          >
            <span style={{ fontSize: '1rem' }}>🔥</span>
            <span style={{ fontSize: '10px', letterSpacing: '0.12em' }}>{fireCounts[index] ?? 7}</span>
          </button>
          <button onClick={toggleComments} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: open ? 1 : 0.45, transition: 'opacity 0.2s', padding: 0, color: 'var(--fg)', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = open ? '1' : '0.45')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span style={{ fontSize: '10px', letterSpacing: '0.12em' }}>{commentCounts[index] ?? 2}</span>
          </button>
        </div>
        {/* Collapsible comments */}
        <div ref={commentsRef} style={{ display: 'none', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1rem', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sampleComments.map(({ time, text }, i) => (
              <div key={i} style={{ padding: '0.75rem 0', borderTop: '1px solid var(--border)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '0.3rem' }}>{time}</p>
                <p style={{ fontSize: '13px', lineHeight: 1.8, opacity: 0.7 }}>{text}</p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>
          <textarea
            placeholder="Leave an anonymous comment..."
            rows={2}
            style={{
              width: '100%', background: 'transparent',
              border: 'none', borderBottom: '1px solid var(--border)',
              color: 'var(--fg)', fontFamily: 'var(--font-body)',
              fontSize: '13px', padding: '12px 0', outline: 'none',
              letterSpacing: '0.05em', resize: 'none',
            }}
          />
          <button className="view-btn">POST →</button>
        </div>
      </div>
      <div ref={textRef} className="text-column">
        <p className="section-label" style={{ marginBottom: '0.5rem' }}>{project.num} — {project.year}</p>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(40px, 5vw, 72px)',
          letterSpacing: '0.02em', lineHeight: 0.95, marginBottom: '0.75rem',
        }}>{project.title}</h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '10px',
          letterSpacing: '0.2em', opacity: 0.45, marginBottom: '1.25rem',
        }}>{project.tags}</p>
        <p style={{ fontSize: '13px', lineHeight: 1.85, opacity: 0.65, marginBottom: '2rem', maxWidth: '420px' }}>
          {project.desc}
        </p>
        <button className="view-btn">View Project →</button>
      </div>
    </div>
  )
}

export default function Works() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <>
      <style>{`
        #works { border-top: 1px solid var(--border); }

        .works-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .project-row {
          display: grid;
          grid-template-columns: 60% 40%;
          align-items: center;
          gap: 0;
          padding: 6rem 0;
          border-top: 1px solid var(--border);
        }

        .project-row.reverse {
          grid-template-columns: 40% 60%;
        }

        .project-row.reverse .image-column { order: 2; }
        .project-row.reverse .text-column  { order: 1; }

        .image-column {
          display: flex;
          flex-direction: column;
        }

        .image-column img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: none;
          display: block;
          transition: transform 0.6s ease;
        }

        .text-column {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 4rem;
        }

        .view-btn {
          align-self: flex-start;
          padding: 12px 28px;
          border: 1px solid var(--fg);
          background: transparent;
          color: var(--fg);
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }

        .view-btn:hover {
          background: var(--fg);
          color: var(--bg);
        }

        @media (max-width: 768px) {
          .project-row,
          .project-row.reverse {
            grid-template-columns: 1fr;
            padding: 3rem 0;
          }
          .project-row.reverse .image-column,
          .project-row.reverse .text-column {
            order: unset;
          }
          .image-column { aspect-ratio: 3/2; }
          .text-column { padding: 2rem 0 0; }
          .works-inner { padding: 0 20px; }
        }
      `}</style>

      <section id="works">
        <div className="works-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '6rem 0 5rem' }}>
            <h2 ref={headingRef} style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 8rem)',
              letterSpacing: '0.02em', whiteSpace: 'nowrap', opacity: 0,
            }}>
              MY WORKS
            </h2>
            <span className="section-label">[ 04 PROJECTS ]</span>
          </div>
          {projects.map((p, i) => <ProjectRow key={p.num} project={p} index={i} />)}
        </div>
      </section>
    </>
  )
}
