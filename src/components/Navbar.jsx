import { useState } from 'react'
import logoTse from '../assets/logo-tse.png'
import styles from './Navbar.module.css'

export default function Navbar({ theme, toggleTheme, setPage }) {

  const [menuOpen, setMenuOpen] = useState(false)

  const menuItems = [
    'Consultas Civiles',
    'Padrón Electoral',
    'Certificaciones Digitales',
    'Documentos de Identidad',
    'Sobre el TSE',
    'Servicios de Registración Civil',
    'Elecciones y Partidos Políticos',
    'Jurisprudencia y Normativa',
    'Formación en Democracia',
    'Publicaciones',
    'Transparencia y Rendición de Cuentas',
    'Revista de Derecho Electoral',
    'Participación Política de las Mujeres'
  ]

  return (
    <header className={styles.header}>

      {/* Bandera superior */}
      <div className={styles.flagStripe}>
        <div className={styles.s1} />
        <div className={styles.s2} />
        <div className={styles.s3} />
        <div className={styles.s4} />
        <div className={styles.s5} />
      </div>

      <nav className={styles.nav}>

  {/* IZQUIERDA */}
  <div
    className={styles.menuWrapper}
    onMouseEnter={() => setMenuOpen(true)}
    onMouseLeave={() => setMenuOpen(false)}
  >

    {/* BOTÓN HAMBURGUESA */}
    <button className={styles.hamburger}>
      <span className={`${styles.bar} ${menuOpen ? styles.bar1 : ''}`} />
      <span className={`${styles.bar} ${menuOpen ? styles.bar2 : ''}`} />
      <span className={`${styles.bar} ${menuOpen ? styles.bar3 : ''}`} />
    </button>

    {/* DROPDOWN */}
    <div className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ''}`}>

      <div className={styles.dropdownHeader}>
        <img src={logoTse} alt="TSE" className={styles.dropdownLogo} />
        <div>
          <h3>Tribunal Supremo de Elecciones</h3>
          <p>República de Costa Rica</p>
        </div>
      </div>

      <div className={styles.dropdownItems}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={styles.dropdownItem}
          >
            {item}
          </button>
        ))}
      </div>

    </div>

  </div>

  {/* LOGO CENTRADO */}
  <div
    className={styles.centerLogo}
    onClick={() => setPage('home')}
  >
    <img
      src={logoTse}
      alt="TSE"
      className={styles.centerLogoImg}
    />

    <div className={styles.centerText}>
      <span className={styles.centerTitle}>
        Tribunal Supremo de Elecciones
      </span>

      <span className={styles.centerSub}>
        República de Costa Rica
      </span>
    </div>
  </div>

  {/* DERECHA */}
  <div className={styles.right}>
    
    {/* BOTÓN NOTICIAS */}
  <button
    className={styles.newsButton}
    onClick={() => setPage('noticias')}
    
  >
    Novedades
  </button>

    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className={`${styles.toggleTrack} ${theme === 'light' ? styles.trackLight : ''}`}>
        <span className={`${styles.toggleThumb} ${theme === 'light' ? styles.thumbLight : ''}`}>
          <span className={styles.thumbIcon}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
        </span>
      </span>
    </button>

  </div>

</nav>

    </header>
  )
}
