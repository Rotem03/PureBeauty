import { useNavigate } from 'react-router-dom'
import { CircleProgress } from '../../CircleProgress/CircleProgress'
import { Toast } from '../../Toast/Toast'
import { useSkinProfile } from '../../../hooks/useSkinProfile'
import { useApp } from '../../../context/AppContext'
import { theme } from '../../../constants/theme'
import styles from './PageResults.module.css'
import { useState } from 'react'

const UNDERTONE_SWATCHES = {
  'Warm Neutral': ['#D4956A', '#C87E5A', '#E8B08A', '#F5C8A4', '#E0A882'],
  'Cool':         ['#C8A0B4', '#B48EA8', '#D4B8CC', '#E8D0DE', '#BCA4B8'],
  'Neutral':      ['#C8A890', '#B89278', '#D4BAAA', '#E8CEBC', '#BCAA98'],
}

export const PageResults = () => {
  const navigate = useNavigate()
  const { user } = useApp()
  const { profile, loading } = useSkinProfile()
  const [toast, setToast] = useState(null)

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>Analyzing your results…</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p>No scan found. <button onClick={() => navigate('/scan')} className={styles.linkBtn}>Run your scan →</button></p>
        </div>
      </div>
    )
  }

  const swatches = UNDERTONE_SWATCHES[profile.undertone] ?? UNDERTONE_SWATCHES['Warm Neutral']

  const handleSave = () => {
    if (!user) {
      navigate('/auth')
      return
    }
    setToast({ message: 'Profile saved to My Vanity ✓', type: 'success' })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.label}>Analysis Results</div>
        <h2 className={styles.title}>
          Your Skin<br />
          <span>Profile</span>
        </h2>
      </div>

      {/* Undertone card */}
      <div className={styles.undertoneCard}>
        <div className={styles.cardLabel}>◉ Matched Undertone</div>
        <div className={styles.cardValue}>{profile.undertone}</div>
        <div className={styles.cardDetail}>
          {profile.undertone === 'Warm Neutral' ? 'Golden-Peachy base tones' :
           profile.undertone === 'Cool' ? 'Pink-Rosy base tones' : 'Balanced base tones'}
        </div>
        <div className={styles.swatches}>
          {swatches.map((c) => (
            <div
              key={c}
              className={styles.swatch}
              style={{ background: c, boxShadow: `0 2px 8px ${c}60` }}
            />
          ))}
        </div>
      </div>

      {/* Metrics row */}
      <div className={styles.metricsGrid}>
        {[
          { label: 'Hydration', pct: profile.hydration_pct, color: theme.accent },
          { label: 'Oiliness',  pct: profile.oiliness_pct,  color: '#8A9E7B' },
          { label: 'Pores',     pct: profile.pores_pct,      color: '#7B8FAE' },
        ].map((m) => (
          <div key={m.label} className={styles.metricCard}>
            <CircleProgress pct={m.pct} size={70} stroke={5} color={m.color} />
            <div className={styles.metricLabel}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Face zone card */}
      <div className={styles.zoneCard}>
        <div className={styles.cardLabel}>△ Facial Structure</div>
        <div className={styles.zoneContent}>
          {[
            ['Face Shape', profile.face_shape],
            ['Eye Shape',  profile.eye_shape],
            ['Symmetry',   `${profile.symmetry_pct}%`],
          ].map(([k, v]) => (
            <div key={k} className={styles.zoneItem}>
              <div className={styles.zoneValue}>{v}</div>
              <div className={styles.zoneLabel}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skin zones */}
      <div className={styles.skinZones}>
        <div className={styles.cardLabel}>⊕ Skin Zone Map</div>
        {[
          ['T-Zone',    profile.t_zone,    '#E8D5C8'],
          ['Cheeks',    profile.cheeks,    '#D4E8D0'],
          ['Under-eye', profile.under_eye, '#D0D8E8'],
        ].map(([z, d, c]) => (
          <div key={z} className={styles.zoneMapItem}>
            <div className={styles.colorBox} style={{ background: c }} />
            <span className={styles.zoneMapName}>{z}</span>
            <span className={styles.zoneMapDesc}>{d}</span>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button onClick={() => navigate('/shop')} className={styles.ctaButton}>
          View My Matched Products →
        </button>
        {!user && (
          <button onClick={handleSave} className={styles.saveButton}>
            Save Profile
          </button>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
