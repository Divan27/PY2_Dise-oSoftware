import { useState } from 'react'
import { NEWS } from '../data/index.js'
import styles from './Noticias.module.css'

const TAG_FILTERS = ['Todos', 'Oficial', 'Servicio', 'Alerta', 'Educación']

const CARD_BG = {
  azul:  'linear-gradient(135deg, #020d2e 0%, #001555 100%)',
  rojo:  'linear-gradient(135deg, #1f0208 0%, #450a14 100%)',
  verde: 'linear-gradient(135deg, #011a0e 0%, #023318 100%)',
}

export default function Noticias() {
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos'
    ? NEWS
    : NEWS.filter(n => n.tag === active)

  return (
    <main className={styles.page}>
      {/* Hero strip */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>Sala de prensa</div>
          <h1 className={styles.heroTitle}>Noticias y Comunicados</h1>
          <p className={styles.heroSub}>Información oficial del Tribunal Supremo de Elecciones</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {TAG_FILTERS.map(f => (
          <button
            key={f}
            className={`${styles.filter} ${active === f ? styles.filterActive : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className={styles.count}>
        {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
      </p>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map(n => (
          <article key={n.id} className={styles.card}>
            <div className={styles.cardImg} style={{ background: CARD_BG[n.color] }}>
              <span className={styles.cardEmoji}>{n.emoji}</span>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardMeta}>
                <span className={`${styles.tag} ${styles[`tag_${n.color}`]}`}>{n.tag}</span>
                <span className={styles.date}>{n.date}</span>
                <span className={styles.category}>{n.category}</span>
              </div>
              <h2 className={styles.cardTitle}>{n.title}</h2>
              <p className={styles.cardExcerpt}>{n.excerpt}</p>
              <button className={styles.cardLink}>Leer comunicado →</button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <span>📭</span>
          <p>No hay noticias con ese filtro por el momento.</p>
        </div>
      )}
    </main>
  )
}
