export default function AboutImage({ src, rotate }: { src: string; rotate: string }) {
  return (
    <div className="sr" style={{ overflow: 'hidden' }}>
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          transform: `rotate(${rotate})`,
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}
