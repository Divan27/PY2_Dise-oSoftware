import { useState } from 'react'
import { CIVIL_DATA } from '../data/index.js'
import CedulaInput from '../components/CedulaInput.jsx'

export default function Civil() {
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [p3, setP3] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState('')

  const valid = p1.length >= 1 && p2.length === 4 && p3.length === 4

  const handleSearch = () => {
    const cedula = `${p1}-${p2}-${p3}`
    setError(''); setResult(null); setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const found = CIVIL_DATA[cedula]
      if (found) setResult(found)
      else setError('No se encontró información civil para la cédula indicada. Verifique el número e intente de nuevo.')
    }, 950)
  }

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        {/* Page header */}
        <div className={styles.pageHeader}>
          <div className={styles.pageIcon}>🪪</div>
          <div>
            <h1 className={styles.pageTitle}>Consulta de Datos Civiles</h1>
            <p className={styles.pageDesc}>
              Verifique el estado de vigencia y los datos generales asociados a una cédula de identidad costarricense.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.flagLine}>
              <span className={styles.fl1} /><span className={styles.fl2} /><span className={styles.fl3} /><span className={styles.fl4} /><span className={styles.fl5} />
            </div>
            <h2 className={styles.cardTitle}>Datos de identificación</h2>
          </div>
          <div className={styles.cardBody}>
            <CedulaInput p1={p1} p2={p2} p3={p3} setP1={setP1} setP2={setP2} setP3={setP3} />

            <button
              className={styles.submitBtn}
              disabled={!valid || loading}
              onClick={handleSearch}
            >
              {loading ? (
                <><span className={styles.spinner} /> Consultando datos civiles...</>
              ) : (
                'Consultar datos civiles'
              )}
            </button>

            {/* RESULT */}
            {result && (
              <div className={styles.result}>
                <div className={styles.resultBadge}>
                  <span>✓</span> Registro encontrado
                </div>
                <div className={styles.resultName}>{result.nombre}</div>

                <div className={styles.resultGrid}>
                  <div className={styles.resultField}>
                    <div className={styles.rfLabel}>Cédula</div>
                    <div className={styles.rfValue}>{result.cedula}</div>
                  </div>
                  <div className={styles.resultField}>
                    <div className={styles.rfLabel}>Estado</div>
                    <div className={styles.rfValue}>
                      <span className={styles.badgeVigente}>{result.estado}</span>
                    </div>
                  </div>
                  <div className={styles.resultField}>
                    <div className={styles.rfLabel}>Sexo</div>
                    <div className={styles.rfValue}>{result.sexo}</div>
                  </div>
                  <div className={styles.resultField}>
                    <div className={styles.rfLabel}>Nacionalidad</div>
                    <div className={styles.rfValue}>{result.nacionalidad}</div>
                  </div>
                  <div className={styles.resultField}>
                    <div className={styles.rfLabel}>Fecha de nacimiento</div>
                    <div className={styles.rfValue}>{result.fechaNacimiento}</div>
                  </div>
                  <div className={styles.resultField}>
                    <div className={styles.rfLabel}>Provincia</div>
                    <div className={styles.rfValue}>{result.provincia}</div>
                  </div>
                  <div className={styles.resultField}>
                    <div className={styles.rfLabel}>Vencimiento</div>
                    <div className={styles.rfValue}>{result.vencimiento}</div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className={styles.errorBox}>
                <span>⚠</span> {error}
              </div>
            )}
          </div>
        </div>

        <div className={styles.infoNote}>
          <span>ℹ️</span>
          La información proporcionada es de carácter público y corresponde al estado actual del documento en el Registro Civil.
        </div>
      </div>
    </main>
  )
}
