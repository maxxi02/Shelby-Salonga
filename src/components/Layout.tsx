import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BackToTop from './BackToTop'

interface LayoutProps {
  isDark: boolean
  onToggle: () => void
}

export default function Layout({ isDark, onToggle }: LayoutProps) {
  return (
    <>
      <Navbar isDark={isDark} onToggle={onToggle} />
      <main>
        <Outlet />
      </main>
      <BackToTop />
    </>
  )
}
