import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useApp } from '../context/AppContext'

const MOCK_PROFILE = {
  id: 'mock',
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

export const useSkinProfile = () => {
  const { user, skinProfile, setSkinProfile } = useApp()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user || !supabase || skinProfile) return
    const fetch = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('skin_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      if (error) setError(error.message)
      else setSkinProfile(data)
      setLoading(false)
    }
    fetch()
  }, [user])

  return { profile: skinProfile ?? MOCK_PROFILE, loading, error }
}

export const saveSkinProfile = async (userId, profileData) => {
  if (!supabase) return { data: null, error: null }
  const { data, error } = await supabase
    .from('skin_profiles')
    .insert({ user_id: userId, ...profileData })
    .select()
    .single()
  return { data, error }
}
