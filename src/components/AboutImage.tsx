export default function AboutImage({ src, rotate }: { src: string; rotate: string }) {
  return (
    <div className="sr" style={{ overflow: 'hidden' }}>
      <img
        src={src}
        alt=""
        style={{
          width: '100%', display: 'block',
          filter: 'none',
          transform: `rotate(${rotate})`,
          transformOrigin: 'center',
          transition: 'transform 0.6s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)')}
        onMouseLeave={e => (e.currentTarget.style.transform = `rotate(${rotate}) scale(1)`)}
      />
    </div>
  )
}
