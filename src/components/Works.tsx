import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import project1adVideo from '../assets/project1-ad.mp4'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from './SEO'
import type { Project } from '../types'
import { Turnstile } from '@marsidev/react-turnstile'
import { getReactions, getComments, incrementReaction, postComment } from '../lib/api'

gsap.registerPlugin(ScrollTrigger)

const TURNSTILE_SITE_KEY = import.meta.env.DEV
  ? '1x00000000000000000000AA'
  : import.meta.env.VITE_TURNSTILE_SITE_KEY

const projects: Project[] = [
  {
    num: '01', title: 'SWEET & GRAIN', year: '2025',
    tags: 'REACT · VITE · TAILWIND · GSAP · LENIS',
    desc: 'Full artisan bakery landing page — editorial layout with scroll-driven GSAP animations, Lenis smooth scroll, real food photography, and a warm cream/terracotta design system.',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    video: project1adVideo,
    link: 'https://github.com/maxxi02/sample-project--1-sweetgrain',
    liveUrl: 'https://sample-project-1-sweetgrain.vercel.app/',
  },
  {
    num: '02', title: 'RENDEZVOUS CAFE', year: '2025',
    tags: 'RENDEZVOUS CAFE · RENDEZVOUS POS SYSTEMS',
    desc: 'A cozy café web experience paired with a full-featured POS system — seamlessly blending warm hospitality aesthetics with practical point-of-sale functionality for modern café operations.',
    img: '/project2.png',
    liveUrl: 'https://rendezvous-cafe.vercel.app/',
  },
  {
    num: '03', title: 'GIRLIES BIRTHING HOME', year: '2025',
    tags: 'CLINIC · IMS · WEB APPLICATION',
    desc: 'A full-featured Information Management System for Girlies Birthing Home — a clinic web platform designed to streamline patient records, appointments, and administrative operations for a modern birthing facility.',
    img: '/project3.png',
    liveUrl: 'https://girlies-birthing-client.vercel.app',
  },
]

// ── Lightbox ──────────────────────────────────────────────────────────────────
interface LightboxProps {
  project: Project
  triggerRect: DOMRect
  onClose: () => void
}

function Lightbox({ project, triggerRect, onClose }: LightboxProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const vw = window.innerWidth
  const vh = window.innerHeight
  const targetW = Math.min(vw * 0.9, (vh * 0.85) * (16 / 9))
  const targetH = targetW * (9 / 16)
  const targetX = (vw - targetW) / 2
  const targetY = (vh - targetH) / 2

  const close = () => {
    const scaleX = triggerRect.width / targetW
    const scaleY = triggerRect.height / targetH
    const toX = triggerRect.left - targetX
    const toY = triggerRect.top - targetY
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.4, ease: 'power3.inOut' })
    gsap.to(closeRef.current, { opacity: 0, duration: 0.15 })
    gsap.to(mediaRef.current, {
      x: toX, y: toY, scaleX, scaleY, duration: 0.45, ease: 'power3.inOut',
      onComplete: () => { document.body.style.overflow = ''; onClose() },
    })
  }

  useEffect(() => {
    const scaleX = triggerRect.width / targetW
    const scaleY = triggerRect.height / targetH
    const fromX = triggerRect.left - targetX
    const fromY = triggerRect.top - targetY

    document.body.style.overflow = 'hidden'
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 0.85, duration: 0.5, ease: 'power3.inOut' })
    gsap.fromTo(mediaRef.current,
      { x: fromX, y: fromY, scaleX, scaleY },
      { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.5, ease: 'power3.inOut' }
    )
    gsap.fromTo(closeRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.35 })

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      <div
        ref={backdropRef}
        onClick={close}
        style={{ position: 'absolute', inset: 0, background: '#000', opacity: 0 }}
      />
      <div
        ref={mediaRef}
        style={{
          position: 'absolute',
          left: targetX, top: targetY,
          width: targetW, height: targetH,
          transformOrigin: 'top left',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {project.video ? (
          <video
            src={project.video}
            autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <img
            src={project.img}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>
      <button
        ref={closeRef}
        onClick={close}
        style={{
          position: 'absolute',
          top: targetY - 44,
          left: targetX + targetW - 36,
          background: 'none', border: '1px solid var(--fg)',
          color: 'var(--fg)', width: 36, height: 36,
          cursor: 'pointer', fontSize: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0,
        }}
      >×</button>
    </div>,
    document.body
  )
}

// ── ProjectRow ────────────────────────────────────────────────────────────────
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const mediaWrapRef = useRef<HTMLDivElement>(null)
  const isReverse = index % 2 === 1

  const [lightboxRect, setLightboxRect] = useState<DOMRect | null>(null)

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

  const openLightbox = () => {
    if (!mediaWrapRef.current) return
    setLightboxRect(mediaWrapRef.current.getBoundingClientRect())
  }

  const [open, setOpen] = useState(false)
  const [hasReacted, setHasReacted] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [turnstileError, setTurnstileError] = useState(false)
  const [commentText, setCommentText] = useState('')
  const commentsRef = useRef<HTMLDivElement>(null)

  const { data: reactionsData } = useQuery({
    queryKey: ['reactions', project.num],
    queryFn: () => getReactions(project.num),
  })

  const { data: commentsData } = useQuery({
    queryKey: ['comments', project.num],
    queryFn: () => getComments(project.num),
  })

  const fireCount = reactionsData?.fire_count ?? null
  const hasReactedFromServer = reactionsData?.has_reacted ?? false
  const isReacted = hasReacted || hasReactedFromServer

  const handleReact = async () => {
    if (isReacted) return
    const data = await incrementReaction(project.num)
    if (!data.already_reacted) setHasReacted(true)
  }

  const queryClient = useQueryClient()

  const handleCommentSubmit = async () => {
    if (!token) return
    if (!commentText.trim()) return
    try {
      await postComment(project.num, commentText, token)
      queryClient.invalidateQueries({ queryKey: ['comments', project.num] })
      setCommentText('')
      setToken(null)
    } catch (err) {
      console.error('[Comment] API error:', err)
    }
  }

  const comments: { created_at: string; text: string }[] = commentsData ?? []
  const commentCount = commentsData ? comments.length : null
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
    <>
      {lightboxRect && (
        <Lightbox project={project} triggerRect={lightboxRect} onClose={() => setLightboxRect(null)} />
      )}
      <div ref={rowRef} className={`project-row${isReverse ? ' reverse' : ''}`}>
        <div ref={imgRef} className="image-column" style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            ref={mediaWrapRef}
            onClick={openLightbox}
            style={{ overflow: 'hidden', aspectRatio: '16/9', borderRadius: '4px', cursor: 'zoom-in', position: 'relative' }}
          >
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', display: 'block' }}
                onError={e => {
                  const v = e.currentTarget
                  const img = document.createElement('img')
                  img.src = project.img
                  img.alt = project.title
                  img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;'
                  v.replaceWith(img)
                }}
              />
            ) : (
              <img
                src={project.img}
                alt={project.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </div>
          {/* Divider */}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '1rem' }} />
          {/* Reaction row */}
          <div style={{ display: 'flex', gap: '1.5rem', padding: '0.75rem 0' }}>
            <button
              onClick={handleReact}
              disabled={isReacted}
              style={{ background: 'none', border: 'none', cursor: isReacted ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0, color: 'var(--fg)', fontFamily: 'var(--font-body)' }}
            >
              <span style={{
                fontSize: '1rem',
                opacity: isReacted ? 1 : 0.45,
                filter: isReacted ? 'drop-shadow(0 0 4px orange)' : 'none',
                transition: 'all 0.3s ease',
              }}>🔥</span>
              <span style={{ fontSize: '10px', letterSpacing: '0.12em', opacity: isReacted ? 1 : 0.45, transition: 'opacity 0.3s ease' }}>{fireCount ?? '...'}</span>
            </button>
            <button onClick={toggleComments} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: open ? 1 : 0.45, transition: 'opacity 0.2s', padding: 0, color: 'var(--fg)', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = open ? '1' : '0.45')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span style={{ fontSize: '10px', letterSpacing: '0.12em' }}>{commentCount ?? '...'}</span>
            </button>
          </div>
          {/* Collapsible comments */}
          <div ref={commentsRef} style={{ display: 'none', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {comments.map(({ created_at, text }, i) => (
                <div key={i} style={{ padding: '0.75rem 0', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '0.3rem' }}>{new Date(created_at).toLocaleDateString()}</p>
                  <p style={{ fontSize: '13px', lineHeight: 1.8, opacity: 0.7 }}>{text}</p>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)' }} />
            </div>
            <textarea
              placeholder="Leave an anonymous comment..."
              rows={2}
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              style={{
                width: '100%', background: 'transparent',
                border: 'none', borderBottom: '1px solid var(--border)',
                color: 'var(--fg)', fontFamily: 'var(--font-body)',
                fontSize: '13px', padding: '12px 0', outline: 'none',
                letterSpacing: '0.05em', resize: 'none',
              }}
            />
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={(t) => setToken(t)}
              onError={() => {
                setToken(null)
                setTurnstileError(true)
              }}
              onExpire={() => setToken(null)}
              options={{
                theme: 'dark',
                retry: 'auto',
                retryInterval: 8000,
                refreshExpired: 'auto',
              } as any}
            />
            {turnstileError && (
              <p style={{ fontSize: '11px', opacity: 0.5, letterSpacing: '0.1em' }}>
                Verification failed. Try disabling tracking prevention or use Chrome.
              </p>
            )}
            <button className="view-btn" onClick={handleCommentSubmit}>POST →</button>
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
          <a href={project.liveUrl ?? project.link ?? '#'} target="_blank" rel="noopener noreferrer" className="view-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>View Project →</a>
        </div>
      </div>
    </>
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
      <SEO
        title="Works — Shelby Salonga"
        description="A curated selection of projects spanning brand identity, web development, editorial design, and interactive digital experiences."
        url="https://rojanns.vercel.app/works"
      />
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
        }

        .project-row.reverse {
          grid-template-columns: 60% 40%;
        }

        .project-row.reverse .image-column { order: 2; }
        .project-row.reverse .text-column  { order: 1; padding: 0 4rem 0 0; }

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
            <span className="section-label">[ 03 PROJECTS ]</span>
          </div>
          <div>
            {projects.map((p, i) => <ProjectRow key={p.num} project={p} index={i} />)}
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            opacity: 0.35,
            paddingTop: '2rem',
            paddingBottom: '6rem',
            textTransform: 'uppercase',
          }}>More projects coming soon.</p>
        </div>
      </section>
    </>
  )
}
