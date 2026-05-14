import logoTse from '../assets/logo-tse.png'
import styles from './Navbar.module.css'

export default function Navbar({ page, setPage, theme, toggleTheme }) {
  const links = [
    { key: 'home',     label: 'Inicio' },
    { key: 'padron',   label: 'Padrón Electoral' },
    { key: 'civil',    label: 'Consulta Civil' },
    { key: 'noticias', label: 'Noticias' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.flagStripe}>
        <div className={styles.s1} /><div className={styles.s2} /><div className={styles.s3} /><div className={styles.s4} /><div className={styles.s5} />
      </div>
      <nav className={styles.nav}>
        <button className={styles.brand} onClick={() => setPage('home')}>
          <img src={logoTse} alt="TSE" className={styles.logo} />
          <div className={styles.brandText}>
            <span className={styles.brandMain}>Tribunal Supremo de Elecciones</span>
            <span className={styles.brandSub}>República de Costa Rica</span>
          </div>
        </button>
        <div className={styles.right}>
          <div className={styles.links}>
            {links.map(l => (
              <button key={l.key} className={`${styles.link} ${page === l.key ? styles.active : ''}`} onClick={() => setPage(l.key)}>
                {l.label}
              </button>
            ))}
          </div>
          <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
            <span className={`${styles.toggleTrack} ${theme === 'light' ? styles.trackLight : ''}`}>
              <span className={`${styles.toggleThumb} ${theme === 'light' ? styles.thumbLight : ''}`}>
                <span className={styles.thumbIcon}>{theme === 'dark' ? '🌙' : '☀️'}</span>
              </span>
            </span>
          </button>
        </div>
      </nav>
    </header>
  )
}
