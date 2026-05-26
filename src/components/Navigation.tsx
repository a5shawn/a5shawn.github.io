import { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
      <span className="nav-logo">
        <img src="/logo.png" alt="Shawn Kang" className="nav-logo-img" />
      </span>
      <span className="nav-tagline">Frontend → Full-Stack</span>
    </nav>
  )
}
