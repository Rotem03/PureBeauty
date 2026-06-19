import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ROUTINE } from '../constants/data'

export const useRoutine = (userId) => {
  const [routine, setRoutine] = useState(ROUTINE)
  const [loading, setLoading] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (!userId || !supabase) return
    const fetch = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('routines')
        .select('steps')
        .eq('user_id', userId)
        .eq('date', today)
        .single()
      if (data?.steps) setRoutine(data.steps)
      setLoading(false)
    }
    fetch()
  }, [userId])

  const toggleStep = async (index) => {
    const updated = routine.map((r, i) => i === index ? { ...r, done: !r.done } : r)
    setRoutine(updated)
    if (!userId || !supabase) return
    await supabase.from('routines').upsert({
      user_id: userId,
      date: today,
      steps: updated,
      updated_at: new Date().toISOString(),
    })
  }

  return { routine, loading, toggleStep }
}
