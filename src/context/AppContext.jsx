import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [skinProfile, setSkinProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = () => supabase?.auth.signOut()

  return (
    <AppContext.Provider value={{ user, session, skinProfile, setSkinProfile, loading, signOut }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
