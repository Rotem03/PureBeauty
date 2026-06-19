import { useState } from 'react'
import { supabase } from '../lib/supabase'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const signUp = async (email, password, displayName) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured.' } }
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    })
    if (error) setError(error.message)
    setLoading(false)
    return { data, error }
  }

  const signIn = async (email, password) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured.' } }
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
    return { data, error }
  }

  return { signUp, signIn, loading, error }
}
