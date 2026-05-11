import { useState } from "react";
import { theme } from "../../../constants/theme";
import styles from "./PageScanner.module.css";

export const PageScanner = ({ onNav }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=idle,1=scanning,2=done
  const [dots, setDots] = useState([]);

  const startScan = () => {
    setPhase(1);
    setProgress(0);
    // Animate progress
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 4 + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setPhase(2);
      }
      setProgress(Math.round(p));
    }, 80);
    // Animate dots
    const genDots = () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: 30 + Math.random() * 40,
        y: 15 + Math.random() * 70,
        opacity: Math.random() * 0.7 + 0.3,
      }));
    setDots(genDots());
    const dv = setInterval(() => setDots(genDots()), 600);
    setTimeout(() => clearInterval(dv), 8000);
  };

  const PHASES = [
    "Align your face",
    "Scanning in progress...",
    "Analysis complete!",
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
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

      {/* Camera frame */}
      <div className={styles.cameraFrame}>
        {/* Face illustration */}
        <div className={styles.faceContainer}>
          <div className={styles.faceFrame}>
            {/* Mesh dots */}
            {dots.map((d) => (
              <div
                key={d.id}
                className={styles.meshDot}
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  opacity: d.opacity,
                }}
              />
            ))}
          </div>
        </div>

        {/* Corner brackets */}
        {[
          ["top", "left"],
          ["top", "right"],
          ["bottom", "left"],
          ["bottom", "right"],
        ].map(([v, h]) => (
          <div
            key={v + h}
            className={`${styles.bracket} ${styles[v]} ${styles[h]}`}
          />
        ))}

        {/* Scan line */}
        {phase === 1 && <div className={styles.scanline} />}

        {/* AI chips */}
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

        {/* Progress bar */}
        {phase >= 1 && (
          <div className={styles.progressContainer}>
            <div className={styles.progressLabel}>
              <span>
                {phase === 2 ? "SCAN COMPLETE" : "SCANNING FEATURES..."}
              </span>
              <span className={styles.percentage}>{progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Status + CTA */}
      <div className={styles.ctaSection}>
        <p className={styles.statusText}>{PHASES[phase]}</p>
        {phase === 0 && (
          <button onClick={startScan} className={styles.beginButton}>
            Begin Scan
          </button>
        )}
        {phase === 2 && (
          <button onClick={() => onNav("results")} className={styles.resultsButton}>
            View My Results →
          </button>
        )}
      </div>
    </div>
  );
};
