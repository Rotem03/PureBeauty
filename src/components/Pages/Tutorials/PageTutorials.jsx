import { useState } from "react";
import { TUTORIAL_STEPS } from "../../../constants/data";
import { theme } from "../../../constants/theme";
import styles from "./PageTutorials.module.css";

export const PageTutorials = () => {
  const [step, setStep] = useState(0);
  const current = TUTORIAL_STEPS[step];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.label}>Tutorial Studio</div>
        <h2 className={styles.title}>
          AR Application<br />
          <span>Guide</span>
        </h2>
      </div>

      {/* AR feed simulation */}
      <div className={styles.arFrame}>
        {/* Face frame */}
        <div className={styles.faceFrame}>
          {/* AR overlay zones based on step */}
          {step === 0 && <div className={styles.overlayStep0} />}
          {step === 1 && (
            <>
              <div className={styles.overlayStep1Left} />
              <div className={styles.overlayStep1Right} />
            </>
          )}
          {step === 2 && <div className={styles.overlayStep2} />}
          {step === 3 && <div className={styles.overlayStep3} />}
        </div>

        {/* Step badge */}
        <div className={styles.stepBadge}>
          <div className={styles.stepLabel}>
            STEP {current.step} / {TUTORIAL_STEPS.length}
          </div>
          <div className={styles.stepZone}>{current.zone}</div>
        </div>

        {/* Live indicator */}
        <div className={styles.liveIndicator}>
          <div className={styles.liveDot} />
          <span>LIVE AR</span>
        </div>
      </div>

      {/* Step info card */}
      <div className={styles.stepCard}>
        <div className={styles.stepHeader}>
          <div className={styles.stepNumber}>{current.step}</div>
          <div>
            <div className={styles.stepTitle}>
              Step {current.step}: {current.title}
            </div>
          </div>
        </div>
        <p className={styles.stepDescription}>{current.desc}</p>

        {/* Nav buttons */}
        <div className={styles.navButtons}>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className={styles.backButton}
          >
            ← Back
          </button>
          <button
            onClick={() => setStep((s) => Math.min(TUTORIAL_STEPS.length - 1, s + 1))}
            disabled={step === TUTORIAL_STEPS.length - 1}
            className={styles.nextButton}
          >
            {step === TUTORIAL_STEPS.length - 1 ? "Complete ✓" : "Next Step →"}
          </button>
        </div>
      </div>

      {/* Step dots */}
      <div className={styles.dots}>
        {TUTORIAL_STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`${styles.dot} ${i === step ? styles.active : ""}`}
          />
        ))}
      </div>
    </div>
  );
};
