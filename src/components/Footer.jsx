import logoTse from '../assets/logo-tse.png'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <img src={logoTse} alt="TSE" className={styles.logo} />
          <div>
            <div className={styles.name}>Tribunal Supremo de Elecciones</div>
            <div className={styles.country}>República de Costa Rica</div>
          </div>
        </div>
        <div className={styles.links}>
          <span>Mapa del sitio</span>
          <span>Política de privacidad</span>
          <span>Términos de uso</span>
          <span>Contacto</span>
        </div>
        <div className={styles.copy}>© 2026 · Sitio actualizado diariamente</div>
      </div>
      <div className={styles.flagBar}>
        <div style={{flex:1, background:'#002B7F'}} />
        <div style={{flex:0.55, background:'#fff'}} />
        <div style={{flex:1.4, background:'#CE1126'}} />
        <div style={{flex:0.55, background:'#fff'}} />
        <div style={{flex:1, background:'#002B7F'}} />
      </div>
    </footer>
  )
}
