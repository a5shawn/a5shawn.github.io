import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Experience from './components/Experience'
import TechStack from './components/TechStack'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = document.querySelectorAll('.fade-in')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="grid-background" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <Navigation />
      <div className="app-layout">
        <aside className="sidebar">
          <Hero />
        </aside>
        <main className="main-content">
          <Experience />
          <TechStack />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
