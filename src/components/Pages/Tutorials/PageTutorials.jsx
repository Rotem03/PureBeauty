import { useState } from 'react'
import { useTutorials, useTutorialProgress } from '../../../hooks/useTutorials'
import { useApp } from '../../../context/AppContext'
import { Toast } from '../../Toast/Toast'
import styles from './PageTutorials.module.css'

export const PageTutorials = () => {
  const { user } = useApp()
  const { tutorials, loading } = useTutorials()
  const [activeTutorial] = useState(0)
  const [toast, setToast] = useState(null)

  const tutorial = tutorials[activeTutorial]
  const steps = tutorial?.steps ?? []

  const { currentStep, setCurrentStep, completed, advance, back } =
    useTutorialProgress(user?.id, tutorial?.id)

  if (loading || !tutorial) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>Loading tutorial…</div>
      </div>
    )
  }

  const current = steps[currentStep]

  const handleComplete = () => {
    advance(steps.length)
    setToast({ message: 'Tutorial complete! 🎉', type: 'success' })
  }

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
        <div className={styles.faceFrame}>
          {currentStep === 0 && <div className={styles.overlayStep0} />}
          {currentStep === 1 && (
            <>
              <div className={styles.overlayStep1Left} />
              <div className={styles.overlayStep1Right} />
            </>
          )}
          {currentStep === 2 && <div className={styles.overlayStep2} />}
          {currentStep === 3 && <div className={styles.overlayStep3} />}
        </div>

        <div className={styles.stepBadge}>
          <div className={styles.stepLabel}>
            STEP {(current?.step ?? currentStep + 1)} / {steps.length}
          </div>
          <div className={styles.stepZone}>{current?.zone}</div>
        </div>

        <div className={styles.liveIndicator}>
          <div className={styles.liveDot} />
          <span>LIVE AR</span>
        </div>
      </div>

      {/* Step info card */}
      <div className={styles.stepCard}>
        <div className={styles.stepHeader}>
          <div className={styles.stepNumber}>{current?.step ?? currentStep + 1}</div>
          <div>
            <div className={styles.stepTitle}>
              Step {current?.step ?? currentStep + 1}: {current?.title}
            </div>
          </div>
        </div>
        <p className={styles.stepDescription}>{current?.desc}</p>

        <div className={styles.navButtons}>
          <button
            onClick={back}
            disabled={currentStep === 0}
            className={styles.backButton}
          >
            ← Back
          </button>
          <button
            onClick={currentStep === steps.length - 1 ? handleComplete : () => advance(steps.length)}
            className={styles.nextButton}
          >
            {currentStep === steps.length - 1 ? 'Complete ✓' : 'Next Step →'}
          </button>
        </div>
      </div>

      {/* Step dots */}
      <div className={styles.dots}>
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`${styles.dot} ${i === currentStep ? styles.active : ''} ${i < currentStep ? styles.done : ''}`}
          />
        ))}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
