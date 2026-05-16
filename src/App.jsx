import { useState } from 'react'
import Navbar   from './components/Navbar.jsx'
import Footer   from './components/Footer.jsx'
import Home     from './pages/Home.jsx'
import Civil    from './pages/Civil.jsx'
import Noticias from './pages/Noticias.jsx'

export default function App() {
  const [page,  setPage]  = useState('home')
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next === 'light' ? 'light' : '')
  }

  const renderPage = () => {
    switch (page) {
      case 'home':     return <Home setPage={setPage} />
      case 'civil':    return <Civil />
      case 'noticias': return <Noticias />
      default:         return <Home setPage={setPage} />
    }
  }

  return (
    <>
      <Navbar page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
      {renderPage()}
      <Footer />
    </>
  )
}
