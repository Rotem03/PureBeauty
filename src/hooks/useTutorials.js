import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { TUTORIAL_STEPS } from '../constants/data'

const MOCK_TUTORIAL = {
  id: 'mock',
  title: 'Foundation & Contour',
  description: 'A step-by-step AR guide for your skin profile.',
  steps: TUTORIAL_STEPS,
}

export const useTutorials = () => {
  const [tutorials, setTutorials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setTutorials([MOCK_TUTORIAL]); setLoading(false); return }
    const fetch = async () => {
      const { data, error } = await supabase.from('tutorials').select('*')
      setTutorials(data && !error && data.length > 0 ? data : [MOCK_TUTORIAL])
      setLoading(false)
    }
    fetch()
  }, [])

  return { tutorials, loading }
}

export const useTutorialProgress = (userId, tutorialId) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  const saveProgress = async (step, isDone = false) => {
    if (!userId || !tutorialId || tutorialId === 'mock' || !supabase) return
    await supabase.from('user_tutorial_progress').upsert({
      user_id: userId,
      tutorial_id: tutorialId,
      current_step: step,
      completed: isDone,
      updated_at: new Date().toISOString(),
    })
  }

  const advance = (totalSteps) => {
    const next = Math.min(currentStep + 1, totalSteps - 1)
    const done = next === totalSteps - 1
    setCurrentStep(next)
    if (done) setCompleted(true)
    saveProgress(next, done)
  }

  const back = () => {
    const prev = Math.max(currentStep - 1, 0)
    setCurrentStep(prev)
    saveProgress(prev)
  }

  return { currentStep, setCurrentStep, completed, advance, back }
}
