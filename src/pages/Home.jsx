import { useState } from 'react'
import { QUICK_SERVICES, NEWS } from '../data/index.js'
import styles from './Home.module.css'

// ─── API helpers ─────────────────────────────────────────────────────────────

function looksLikeCedula(q) { return /^[\d\-]+$/.test(q.trim()) }
function cleanCedula(q)     { return q.replace(/[-\s]/g, '') }

async function buscarGometa(query) {
  const term = looksLikeCedula(query) ? cleanCedula(query) : query.trim().replace(/\s+/g, ' ')
  const res  = await fetch(`https://apis.gometa.org/cedulas/${encodeURIComponent(term)}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  if (Array.isArray(data.results) && data.results.length > 0) return data.results
  if (data.cedula || data.nombre) return [data]
  return []
}

const TIPO_LABEL  = { F: 'Física', J: 'Jurídica' }
const CLASS_LABEL = { N: 'Nacional', E: 'Extranjero' }

// ─── ResultCard mini (para el popup) ─────────────────────────────────────────

function ResultCardMini({ data }) {
  const nombre    = data.fullname  || data.nombre   || '—'
  const cedula    = data.cedula    || data.rawcedula || '—'
  const tipo      = TIPO_LABEL[data.type]   || data.guess_type || '—'
  const clase     = CLASS_LABEL[data.class] || '—'
  const apellido1 = data.lastname1 || data.lastname  || ''
  const apellido2 = data.lastname2 || ''
  const nombre1   = data.firstname || ''

  return (
    <div className={styles.miniCard}>
      <div className={styles.miniName}>{nombre}</div>
      <div className={styles.miniGrid}>
        <div className={styles.miniField}><span className={styles.miniLabel}>Cédula</span><span className={styles.miniValue}>{cedula}</span></div>
        <div className={styles.miniField}><span className={styles.miniLabel}>Tipo</span><span className={styles.miniValue}>{tipo}</span></div>
        <div className={styles.miniField}><span className={styles.miniLabel}>Clase</span><span className={styles.miniValue}>{clase}</span></div>
        {apellido1 && <div className={styles.miniField}><span className={styles.miniLabel}>1er apellido</span><span className={styles.miniValue}>{apellido1}</span></div>}
        {apellido2 && <div className={styles.miniField}><span className={styles.miniLabel}>2do apellido</span><span className={styles.miniValue}>{apellido2}</span></div>}
        {nombre1   && <div className={styles.miniField}><span className={styles.miniLabel}>Nombre</span><span className={styles.miniValue}>{nombre1}</span></div>}
      </div>
    </div>
  )
}

// ─── HeroBanner ──────────────────────────────────────────────────────────────

function HeroBanner() {
  const [showMenu,   setShowMenu]   = useState(false)
  const [activeForm, setActiveForm] = useState(null)
  const [query,      setQuery]      = useState('')
  const [loading,    setLoading]    = useState(false)
  const [results,    setResults]    = useState(null)
  const [error,      setError]      = useState('')

  const canSearch = query.trim().length >= 3

  const handleSearch = async () => {
    const q = query.trim()
    if (!q) return
    setError(''); setResults(null); setLoading(true)
    try {
      const items = await buscarGometa(q)
      if (!items.length) setError('No se encontraron resultados para esa búsqueda.')
      else               setResults(items)
    } catch {
      setError('No se pudo conectar con el servicio. Intente de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = e => { if (e.key === 'Enter' && canSearch) handleSearch() }

  const handleClose = () => {
    setActiveForm(null)
    setQuery(''); setResults(null); setError('')
  }

  // Placeholder según el tipo de formulario activo
  const placeholder = activeForm === 'cedula'
    ? 'Ej: 102300456 o 1-0230-0456'
    : 'Ej: OSCAR ARIAS SANCHEZ'

  return (
    <section className={styles.hero}>

      {/* BG layers */}
      <div className={styles.heroBg} />
      <div className={styles.heroImage} />
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
          6 de febrero 2028 | Votaciones municipales
        </div>

        <h1 className={styles.heroH1}>
          Democracia fuerte -
          <em> participación consciente</em>
        </h1>

        <p className={styles.heroP}>
          El Tribunal Supremo de Elecciones garantiza la pureza del sufragio
          y la correcta aplicación de las normas electorales de la República
          de Costa Rica.
        </p>

        {/* BOTÓN + MENÚ */}
        <div
          className={styles.heroActions}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <button className={styles.btnPrimary}>
            <span>🪪</span>
            Consultas Civiles
          </button>

          {showMenu && (
            <div className={styles.civilMenu}>
              <div className={styles.menuSection}>
                <span className={styles.menuTitle}>Personas nacionales</span>
                <button className={styles.menuItem} onClick={() => { setActiveForm('cedula'); setShowMenu(false) }}>
                  Consulta por número de cédula
                </button>
                <button className={styles.menuItem} onClick={() => { setActiveForm('nombre'); setShowMenu(false) }}>
                  Consulta por nombre y apellido
                </button>
              </div>
              <div className={styles.menuSection}>
                <span className={styles.menuTitle}>Personas jurídicas</span>
                <button className={styles.menuItem} onClick={() => { setActiveForm('juridica'); setShowMenu(false) }}>
                  Consulta por razón social o cédula jurídica
                </button>
              </div>
            </div>
          )}
        </div>

        {/* POPUP */}
        {activeForm && (
          <div className={styles.popupOverlay} onClick={e => e.target === e.currentTarget && handleClose()}>
            <div className={styles.popupFrame}>

              <button className={styles.closeBtn} onClick={handleClose}>✕</button>

              <h2 className={styles.popupTitle}>
                {activeForm === 'cedula'   && 'Consulta por número de cédula'}
                {activeForm === 'nombre'   && 'Consulta por nombre y apellido'}
                {activeForm === 'juridica' && 'Consulta de persona jurídica'}
              </h2>

              {/* Input unificado */}
              <div className={styles.popupInputWrap}>
                <input
                  className={styles.popupInput}
                  type="text"
                  placeholder={placeholder}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setResults(null); setError('') }}
                  onKeyDown={handleKey}
                  autoComplete="off"
                  autoFocus
                />
              </div>

              <button
                className={styles.searchBtn}
                disabled={!canSearch || loading}
                onClick={handleSearch}
              >
                {loading
                  ? <><span className={styles.spinner} /> Consultando…</>
                  : 'Buscar información'}
              </button>

              {/* Resultados */}
              {results && (
                <div className={styles.popupResults}>
                  <p className={styles.popupCount}>
                    ✓ {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
                  </p>
                  {results.map((r, i) => <ResultCardMini key={i} data={r} />)}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className={styles.popupError}>⚠ {error}</div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  )
}

// ─── QuickAccess ─────────────────────────────────────────────────────────────

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

// ─── NewsPreview ──────────────────────────────────────────────────────────────

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

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home({ setPage }) {
  return (
    <main className={styles.page}>
      <div className={styles.mainLayout}>

        <div className={styles.leftContent}>
          <HeroBanner />
          <QuickAccess setPage={setPage} />
          <NewsPreview setPage={setPage} />
        </div>

        <aside className={styles.rightPanel}>

          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Información Nacional</h3>
            <div className={styles.sideGrid}>
              <div className={styles.sideItem}><span className={styles.sideNum}>3.5M+</span><span className={styles.sideLbl}>Ciudadanos inscritos</span></div>
              <div className={styles.sideItem}><span className={styles.sideNum}>7</span><span className={styles.sideLbl}>Provincias</span></div>
              <div className={styles.sideItem}><span className={styles.sideNum}>84</span><span className={styles.sideLbl}>Cantones</span></div>
              <div className={styles.sideItem}><span className={styles.sideNum}>6,000+</span><span className={styles.sideLbl}>Centros de votación</span></div>
            </div>
          </div>

          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Gobierno de Costa Rica</h3>
            <div className={styles.sideGrid}>
              <div className={styles.sideItem}><span className={styles.sideNum}>1</span><span className={styles.sideLbl}>Presidente</span></div>
              <div className={styles.sideItem}><span className={styles.sideNum}>2</span><span className={styles.sideLbl}>Vicepresidentes</span></div>
              <div className={styles.sideItem}><span className={styles.sideNum}>57</span><span className={styles.sideLbl}>Diputados</span></div>
              <div className={styles.sideItem}><span className={styles.sideNum}>84</span><span className={styles.sideLbl}>Alcaldías</span></div>
              <div className={styles.sideItem}><span className={styles.sideNum}>500+</span><span className={styles.sideLbl}>Regidores</span></div>
              <div className={styles.sideItem}><span className={styles.sideNum}>25+</span><span className={styles.sideLbl}>Instituciones públicas</span></div>
            </div>
          </div>

        </aside>
      </div>
    </main>
  )
}
