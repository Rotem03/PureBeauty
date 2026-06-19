import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { saveSkinProfile } from '../../../hooks/useSkinProfile'
import styles from './PageScanner.module.css'

// Mock AI result — replace with real Edge Function call once backend is ready
const MOCK_RESULT = {
  undertone: 'Warm Neutral',
  undertone_hex: '#D4956A',
  face_shape: 'Oval',
  eye_shape: 'Almond',
  symmetry_pct: 94,
  hydration_pct: 82,
  oiliness_pct: 65,
  pores_pct: 38,
  t_zone: 'Sebum — oily',
  cheeks: 'Normal — well hydrated',
  under_eye: 'Slightly dry',
  glow_score: 87,
}

export const PageScanner = () => {
  const navigate = useNavigate()
  const { user, setSkinProfile } = useApp()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0) // 0=idle, 1=scanning, 2=done
  const [dots, setDots] = useState([])
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    return () => {
      // Stop camera on unmount
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      setCameraActive(true)
    } catch {
      setCameraError('Camera not available — using simulated scan.')
      setCameraActive(false)
    }
  }

  const runScan = () => {
    setPhase(1)
    setProgress(0)

    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 4 + 1
      if (p >= 100) {
        p = 100
        clearInterval(iv)
        setPhase(2)
        streamRef.current?.getTracks().forEach(t => t.stop())
      }
      setProgress(Math.round(p))
    }, 80)

    const genDots = () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: 30 + Math.random() * 40,
        y: 15 + Math.random() * 70,
        opacity: Math.random() * 0.7 + 0.3,
      }))
    setDots(genDots())
    const dv = setInterval(() => setDots(genDots()), 600)
    setTimeout(() => clearInterval(dv), 8000)
  }

  const startScan = async () => {
    await startCamera()
    runScan()
  }

  const viewResults = async () => {
    setSaving(true)
    setSkinProfile(MOCK_RESULT)
    if (user) {
      await saveSkinProfile(user.id, MOCK_RESULT)
    }
    setSaving(false)
    navigate('/results')
  }

  const PHASES = ['Align your face', 'Scanning in progress...', 'Analysis complete!']

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.label}>AI Scanner</div>
          <h2 className={styles.title}>
            Biometric Skin<br />
            <span>Topography</span>
          </h2>
        </div>
        <div className={styles.headerInfo}>
          Real-time AR mapping<br />
          42 facial anchors
        </div>
      </div>

      <div className={styles.cameraFrame}>
        {/* Live camera or face illustration */}
        {cameraActive && phase === 1 ? (
          <video
            ref={videoRef}
            className={styles.videoFeed}
            autoPlay
            playsInline
            muted
          />
        ) : (
          <div className={styles.faceContainer}>
            <div className={styles.faceFrame}>
              {dots.map((d) => (
                <div
                  key={d.id}
                  className={styles.meshDot}
                  style={{ left: `${d.x}%`, top: `${d.y}%`, opacity: d.opacity }}
                />
              ))}
            </div>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Corner brackets */}
        {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h]) => (
          <div key={v + h} className={`${styles.bracket} ${styles[v]} ${styles[h]}`} />
        ))}

        {phase === 1 && <div className={styles.scanline} />}

        {phase >= 1 && (
          <>
            <div className={`${styles.chip} ${styles.chipTop} ${styles.chipLeft}`}>
              <div className={styles.chipTitle}>◉ COLORIMETRY</div>
              <div className={styles.chipContent}>
                Undertone: <span className={styles.accent}>Warm/Golden</span>
              </div>
            </div>
            <div className={`${styles.chip} ${styles.chipTop} ${styles.chipRight}`}>
              <div className={styles.chipTitle}>△ GEOMETRY</div>
              <div className={styles.chipContent}>Face Shape: Oval</div>
              <div className={styles.chipSubtext}>Symmetry Index: 94%</div>
            </div>
            {phase === 2 && (
              <div className={`${styles.chip} ${styles.chipBottom} ${styles.chipRight}`}>
                <div className={styles.chipTitle}>⊕ HYDRATION MAP</div>
                <div className={styles.chipContent}>Hydrated with oily T-zone</div>
                <div className={styles.chipTags}>
                  <span className={styles.tag}>Cheeks: Normal</span>
                  <span className={styles.tag}>T-Zone: Sebum</span>
                </div>
              </div>
            )}
          </>
        )}

        {phase >= 1 && (
          <div className={styles.progressContainer}>
            <div className={styles.progressLabel}>
              <span>{phase === 2 ? 'SCAN COMPLETE' : 'SCANNING FEATURES...'}</span>
              <span className={styles.percentage}>{progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {cameraError && <p className={styles.cameraError}>{cameraError}</p>}

      <div className={styles.ctaSection}>
        <p className={styles.statusText}>{PHASES[phase]}</p>
        {phase === 0 && (
          <button onClick={startScan} className={styles.beginButton}>
            Begin Scan
          </button>
        )}
        {phase === 2 && (
          <button onClick={viewResults} disabled={saving} className={styles.resultsButton}>
            {saving ? 'Saving…' : 'View My Results →'}
          </button>
        )}
      </div>
    </div>
  )
}
