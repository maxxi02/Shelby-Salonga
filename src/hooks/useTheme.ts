import { useState, useEffect } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(() =>
    (localStorage.getItem('theme') ?? 'dark') === 'dark'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  const toggle = () => setIsDark(d => {
    const next = !d
    localStorage.setItem('theme', next ? 'dark' : 'light')
    return next
  })

  return { isDark, toggle }
}
