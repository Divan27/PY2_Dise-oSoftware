import styles from './CedulaInput.module.css'

export default function CedulaInput({ p1, p2, p3, setP1, setP2, setP3 }) {
  return (
    <div className={styles.wrap}>
      <label className={styles.label}>Número de Cédula</label>
      <div className={styles.row}>
        <input
          className={styles.partSmall}
          placeholder="X"
          maxLength={2}
          value={p1}
          onChange={e => setP1(e.target.value.replace(/\D/g, ''))}
          aria-label="Provincia"
        />
        <span className={styles.sep}>—</span>
        <input
          className={styles.part}
          placeholder="0000"
          maxLength={4}
          value={p2}
          onChange={e => setP2(e.target.value.replace(/\D/g, ''))}
          aria-label="Número"
        />
        <span className={styles.sep}>—</span>
        <input
          className={styles.part}
          placeholder="0000"
          maxLength={4}
          value={p3}
          onChange={e => setP3(e.target.value.replace(/\D/g, ''))}
          aria-label="Verificador"
        />
      </div>
      <p className={styles.hint}>
        Ej: <strong>1-0000-0000</strong> · <strong>2-1234-5678</strong> · <strong>3-0987-6543</strong>
      </p>
    </div>
  )
}
