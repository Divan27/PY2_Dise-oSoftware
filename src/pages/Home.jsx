import { useState } from 'react'
import { QUICK_SERVICES, NEWS } from '../data/index.js'
import CedulaInput from '../components/CedulaInput'
import styles from './Home.module.css'

function HeroBanner() {

  const [showMenu, setShowMenu] = useState(false)
  const [activeForm, setActiveForm] = useState(null)

  // Cédula
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [p3, setP3] = useState('')

  // Formularios generales
  const [nombre, setNombre] = useState('')
  const [apellido1, setApellido1] = useState('')
  const [apellido2, setApellido2] = useState('')

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
                <span className={styles.menuTitle}>
                  Personas nacionales
                </span>

                <button
                  className={styles.menuItem}
                  onClick={() => setActiveForm('cedula')}
                >
                  Consulta por número de cédula
                </button>

                <button
                  className={styles.menuItem}
                  onClick={() => setActiveForm('nombre')}
                >
                  Consulta por nombre y apellido
                </button>
              </div>

              <div className={styles.menuSection}>
                <span className={styles.menuTitle}>
                  Personas extranjeras
                </span>

                <button
                  className={styles.menuItem}
                  onClick={() => setActiveForm('matrimonio')}
                >
                  Consulta de matrimonios
                </button>

                <button
                  className={styles.menuItem}
                  onClick={() => setActiveForm('defuncion')}
                >
                  Consulta de defunciones
                </button>
              </div>

            </div>
          )}
        </div>

        {/* FRAME EMERGENTE */}
        {activeForm && (
          <div className={styles.popupOverlay}>

            <div className={styles.popupFrame}>

              <button
                className={styles.closeBtn}
                onClick={() => setActiveForm(null)}
              >
                ✕
              </button>

              <h2 className={styles.popupTitle}>
                {activeForm === 'cedula' &&
                  'Consulta por número de cédula'}

                {activeForm === 'nombre' &&
                  'Consulta por nombre y apellido'}

                {activeForm === 'matrimonio' &&
                  'Consulta de matrimonios'}

                {activeForm === 'defuncion' &&
                  'Consulta de defunciones'}
              </h2>

              {/* FORMULARIO CÉDULA */}
              {activeForm === 'cedula' && (
                <>
                  <CedulaInput
                    p1={p1}
                    p2={p2}
                    p3={p3}
                    setP1={setP1}
                    setP2={setP2}
                    setP3={setP3}
                  />

                  <button className={styles.searchBtn}>
                    Buscar información
                  </button>
                </>
              )}

              {/* OTROS FORMULARIOS */}
              {activeForm !== 'cedula' && (
                <>
                  <div className={styles.formGrid}>

                    <div className={styles.inputGroup}>
                      <label>Nombre</label>

                      <input
                        type="text"
                        placeholder="Ingrese el nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Primer apellido</label>

                      <input
                        type="text"
                        placeholder="Ingrese el primer apellido"
                        value={apellido1}
                        onChange={e => setApellido1(e.target.value)}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Segundo apellido</label>

                      <input
                        type="text"
                        placeholder="Ingrese el segundo apellido"
                        value={apellido2}
                        onChange={e => setApellido2(e.target.value)}
                      />
                    </div>

                  </div>

                  <button className={styles.searchBtn}>
                    Buscar información
                  </button>
                </>
              )}

            </div>

          </div>
        )}

      </div>

    </section>
  )
}

function QuickAccess({ setPage }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>
          Servicios destacados
        </h2>
      </div>

      <div className={styles.quickGrid}>
        {QUICK_SERVICES.map(s => (
          <button
            key={s.title}
            className={styles.quickCard}
            onClick={() => setPage(s.page)}
          >
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
        <h2 className={styles.sectionTitle}>
          Últimas noticias
        </h2>

        <button
          className={styles.seeAll}
          onClick={() => setPage('noticias')}
        >
          Ver todas →
        </button>
      </div>

      <div className={styles.newsGrid}>
        {NEWS.slice(0, 3).map(n => (
          <article
            key={n.id}
            className={styles.newsCard}
            onClick={() => setPage('noticias')}
          >

            <div className={styles.newsMeta}>
              <span
                className={`${styles.newsTag} ${styles[`tag_${n.color}`]}`}
              >
                {n.tag}
              </span>

              <span className={styles.newsDate}>
                {n.date}
              </span>
            </div>

            <h3 className={styles.newsTitle}>
              {n.title}
            </h3>

            <p className={styles.newsExcerpt}>
              {n.excerpt}
            </p>

          </article>
        ))}
      </div>
    </section>
  )
}

export default function Home({ setPage }) {
  return (
    <main className={styles.page}>

      <div className={styles.mainLayout}>

        {/* IZQUIERDA */}
        <div className={styles.leftContent}>

          <HeroBanner />

          <QuickAccess setPage={setPage} />

          <NewsPreview setPage={setPage} />

        </div>

        {/* DERECHA */}
        <aside className={styles.rightPanel}>

          {/* INFORMACIÓN NACIONAL */}
          <div className={styles.sideCard}>

            <h3 className={styles.sideTitle}>
              Información Nacional
            </h3>

            <div className={styles.sideGrid}>

              <div className={styles.sideItem}>
                <span className={styles.sideNum}>3.5M+</span>
                <span className={styles.sideLbl}>
                  Ciudadanos inscritos
                </span>
              </div>

              <div className={styles.sideItem}>
                <span className={styles.sideNum}>7</span>
                <span className={styles.sideLbl}>
                  Provincias
                </span>
              </div>

              <div className={styles.sideItem}>
                <span className={styles.sideNum}>84</span>
                <span className={styles.sideLbl}>
                  Cantones
                </span>
              </div>

              <div className={styles.sideItem}>
                <span className={styles.sideNum}>6,000+</span>
                <span className={styles.sideLbl}>
                  Centros de votación
                </span>
              </div>

            </div>

          </div>

          {/* GOBIERNO */}
          <div className={styles.sideCard}>

            <h3 className={styles.sideTitle}>
              Gobierno de Costa Rica
            </h3>

            <div className={styles.sideGrid}>

              <div className={styles.sideItem}>
                <span className={styles.sideNum}>1</span>
                <span className={styles.sideLbl}>
                  Presidente
                </span>
              </div>

              <div className={styles.sideItem}>
                <span className={styles.sideNum}>2</span>
                <span className={styles.sideLbl}>
                  Vicepresidentes
                </span>
              </div>

              <div className={styles.sideItem}>
                <span className={styles.sideNum}>57</span>
                <span className={styles.sideLbl}>
                  Diputados
                </span>
              </div>

              <div className={styles.sideItem}>
                <span className={styles.sideNum}>84</span>
                <span className={styles.sideLbl}>
                  Alcaldías
                </span>
              </div>

              <div className={styles.sideItem}>
                <span className={styles.sideNum}>500+</span>
                <span className={styles.sideLbl}>
                  Regidores
                </span>
              </div>

              <div className={styles.sideItem}>
                <span className={styles.sideNum}>25+</span>
                <span className={styles.sideLbl}>
                  Instituciones públicas
                </span>
              </div>

            </div>

          </div>

        </aside>

      </div>

    </main>
  )
}
