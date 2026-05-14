import { QUICK_SERVICES, NEWS } from '../data/index.js'
import styles from './Home.module.css'

function HeroBanner({ setPage }) {
  return (
    <section className={styles.hero}>
      {/* BG layers */}
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />
      <div className={styles.heroGlowBlue} />
      <div className={styles.heroGlowRed} />

      {/* Flag vertical accent */}
      <div className={styles.heroFlagAccent}>
        <div className={styles.hfAzul} />
        <div className={styles.hfBlanco} />
        <div className={styles.hfRojo} />
        <div className={styles.hfBlanco2} />
        <div className={styles.hfAzul2} />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          Sistema Electoral Nacional · Costa Rica
        </div>
        <h1 className={styles.heroH1}>
          Democracia <em>transparente</em><br />
          al servicio del pueblo
        </h1>
        <p className={styles.heroP}>
          El Tribunal Supremo de Elecciones garantiza la pureza del sufragio
          y la correcta aplicación de las normas electorales de la República de Costa Rica.
        </p>
        <div className={styles.heroActions}>
          <button className={styles.btnPrimary} onClick={() => setPage('padron')}>
            <span>🗳️</span> Consultar Padrón
          </button>
          <button className={styles.btnSecondary} onClick={() => setPage('civil')}>
            <span>🪪</span> Datos Civiles
          </button>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const data = [
    { num: '3.5M+', lbl: 'Ciudadanos inscritos' },
    { num: '7',     lbl: 'Provincias cubiertas' },
    { num: '84',    lbl: 'Cantones del país' },
    { num: '6,000+', lbl: 'Centros de votación' },
  ]
  return (
    <div className={styles.statsRow}>
      {data.map(d => (
        <div key={d.num} className={styles.statCard}>
          <div className={styles.statNum}>{d.num}</div>
          <div className={styles.statLbl}>{d.lbl}</div>
        </div>
      ))}
    </div>
  )
}

function QuickAccess({ setPage }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Servicios destacados</h2>
      </div>
      <div className={styles.quickGrid}>
        {QUICK_SERVICES.map(s => (
          <button key={s.title} className={styles.quickCard} onClick={() => setPage(s.page)}>
            <div className={styles.qcIcon}>{s.icon}</div>
            <div className={styles.qcTitle}>{s.title}</div>
            <div className={styles.qcDesc}>{s.desc}</div>
            <div className={styles.qcArrow}>→</div>
          </button>
        ))}
      </div>
    </section>
  )
}

function NewsPreview({ setPage }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Últimas noticias</h2>
        <button className={styles.seeAll} onClick={() => setPage('noticias')}>Ver todas →</button>
      </div>
      <div className={styles.newsGrid}>
        {NEWS.slice(0, 3).map(n => (
          <article key={n.id} className={styles.newsCard} onClick={() => setPage('noticias')}>
            <div className={styles.newsMeta}>
              <span className={`${styles.newsTag} ${styles[`tag_${n.color}`]}`}>{n.tag}</span>
              <span className={styles.newsDate}>{n.date}</span>
            </div>
            <h3 className={styles.newsTitle}>{n.title}</h3>
            <p className={styles.newsExcerpt}>{n.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function Home({ setPage }) {
  return (
    <main className={styles.page}>
      <HeroBanner setPage={setPage} />
      <Stats />
      <QuickAccess setPage={setPage} />
      <NewsPreview setPage={setPage} />
    </main>
  )
}
