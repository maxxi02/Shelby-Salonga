import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/globals.css'
import { useTheme } from './hooks/useTheme'
import { useLenis } from './hooks/useLenis'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function AppInner() {
  const { isDark, toggle } = useTheme()
  useLenis()

  return (
    <Routes>
      <Route element={<Layout isDark={isDark} onToggle={toggle} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
