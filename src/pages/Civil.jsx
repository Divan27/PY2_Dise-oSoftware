import { useState, useRef } from 'react'
import styles from './Civil.module.css'

// ─── helpers ────────────────────────────────────────────────────────────────

function normalize(str) {
  return str.trim().replace(/\s+/g, ' ')
}

// Detecta si el input parece una cédula (solo dígitos y guiones)
function looksLikeCedula(q) {
  return /^[\d\-]+$/.test(q.trim())
}

// Limpia una cédula: quita guiones y espacios
function cleanCedula(q) {
  return q.replace(/[\-\s]/g, '')
}

async function buscarGometa(query) {
  const encoded = encodeURIComponent(query)
  const res = await fetch(`https://apis.gometa.org/cedulas/${encoded}`)
  if (!res.ok) throw new Error(`Error ${res.status}`)
  const data = await res.json()
  // La API devuelve los resultados dentro de data.results[]
  // pero también puede tener datos de nivel superior (nombre, cedula)
  // Normalizamos: si results existe y tiene items, los usamos;
  // si no, intentamos construir uno desde el nivel raíz
  if (data.results && data.results.length > 0) return data.results
  if (data.cedula || data.nombre) return [data]
  return []
}

// ─── componente ─────────────────────────────────────────────────────────────

export default function Civil() {
  const [query, setQuery]     = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)   // array de resultados
  const [error, setError]     = useState('')
  const inputRef              = useRef(null)

  const canSearch = query.trim().length >= 3

  const handleSearch = async () => {
    const q = normalize(query)
    if (!q) return

    setError('')
    setResults(null)
    setLoading(true)

    try {
      const searchTerm = looksLikeCedula(q) ? cleanCedula(q) : q
      const items = await buscarGometa(searchTerm)

      if (!items || items.length === 0) {
        setError('No se encontraron resultados. Verifique el número de cédula o el nombre ingresado.')
      } else {
        setResults(items)
      }
    } catch (err) {
      setError('No se pudo conectar con el servicio de consulta. Intente de nuevo en unos momentos.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && canSearch) handleSearch()
  }

  const handleClear = () => {
    setQuery('')
    setResults(null)
    setError('')
    inputRef.current?.focus()
  }

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>

        {/* ── Encabezado ── */}
        <div className={styles.pageHeader}>
          <div className={styles.pageIcon}>🪪</div>
          <div>
            <h1 className={styles.pageTitle}>Consulta de Datos Civiles</h1>
            <p className={styles.pageDesc}>
              Busque por número de cédula física o jurídica, o por nombre completo.
            </p>
          </div>
        </div>

        {/* ── Card principal ── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.flagLine}>
              <span className={styles.fl1} /><span className={styles.fl2} />
              <span className={styles.fl3} /><span className={styles.fl4} />
              <span className={styles.fl5} />
            </div>
            <h2 className={styles.cardTitle}>Búsqueda unificada</h2>
          </div>

          <div className={styles.cardBody}>

            {/* ── Search box ── */}
            <div className={styles.searchWrap}>
              <label className={styles.searchLabel}>
                Número de cédula o nombre
              </label>

              <div className={styles.searchRow}>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>🔍</span>
                  <input
                    ref={inputRef}
                    className={styles.searchInput}
                    type="text"
                    placeholder="Ej: 1-0123-0456  ó  OSCAR ARIAS SANCHEZ"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleKey}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {query && (
                    <button
                      className={styles.clearBtn}
                      onClick={handleClear}
                      aria-label="Limpiar"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  className={styles.submitBtn}
                  disabled={!canSearch || loading}
                  onClick={handleSearch}
                >
                  {loading
                    ? <><span className={styles.spinner} /> Consultando…</>
                    : 'Consultar'}
                </button>
              </div>

              <p className={styles.hint}>
                Para cédulas: escriba el número con o sin guiones.
                Para nombres: use palabras de 4+ letras (ej: OSCAR ARIAS).
              </p>
            </div>

            {/* ── Resultados ── */}
            {results && (
              <div className={styles.resultsSection}>
                <div className={styles.resultsBadge}>
                  <span>✓</span>
                  {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                </div>

                <div className={styles.resultsList}>
                  {results.map((r, i) => (
                    <ResultCard key={i} data={r} />
                  ))}
                </div>
              </div>
            )}

            {/* ── Error ── */}
            {error && (
              <div className={styles.errorBox}>
                <span>⚠</span> {error}
              </div>
            )}

          </div>
        </div>

        {/* ── Nota legal ── */}
        <div className={styles.infoNote}>
          <span>ℹ️</span>
          La información es de carácter público. Fuente: Ministerio de Hacienda / Registro Civil de Costa Rica.
        </div>

      </div>
    </main>
  )
}

// ─── tarjeta de resultado individual ────────────────────────────────────────

// type: "F" = Física, "J" = Jurídica
const TIPO_LABEL = { F: 'Física', J: 'Jurídica' }
const CLASS_LABEL = { N: 'Nacional', E: 'Extranjero' }

function ResultCard({ data }) {
  const tipo      = TIPO_LABEL[data.type]      || data.type      || data.guess_type || '—'
  const clase     = CLASS_LABEL[data.class]    || data.class     || '—'
  const cedula    = data.cedula                || data.rawcedula || '—'
  const nombre    = data.fullname              || data.nombre    || '—'
  const nombre1   = data.firstname             || ''
  const apellido1 = data.lastname1             || data.lastname  || ''
  const apellido2 = data.lastname2             || ''

  const fields = [
    { label: 'Cédula',          value: cedula    },
    { label: 'Tipo',            value: tipo      },
    { label: 'Clasificación',   value: clase     },
    apellido1 && { label: 'Primer apellido',  value: apellido1 },
    apellido2 && { label: 'Segundo apellido', value: apellido2 },
    nombre1   && { label: 'Nombre',           value: nombre1   },
  ].filter(Boolean)

  return (
    <div className={styles.resultCard}>
      <div className={styles.resultName}>{nombre}</div>
      <div className={styles.resultGrid}>
        {fields.map(f => (
          <div key={f.label} className={styles.resultField}>
            <div className={styles.rfLabel}>{f.label}</div>
            <div className={styles.rfValue}>{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
