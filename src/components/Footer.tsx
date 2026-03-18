import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 0',
    }}>
      <div className="container" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', letterSpacing: '0.05em' }}>
          SHELBY SALONGA © 2026
        </span>

        <div style={{ display: 'flex', gap: '24px' }}>
          {[['About', '/about'], ['Contact', '/contact']].map(([label, to]) => (
            <Link key={to} to={to} style={{
              fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
              opacity: 0.5, transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
            >{label}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
