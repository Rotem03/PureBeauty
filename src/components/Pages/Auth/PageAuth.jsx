import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useApp } from '../../../context/AppContext'
import styles from './PageAuth.module.css'

export const PageAuth = () => {
  const navigate = useNavigate()
  const { user } = useApp()
  const { signIn, signUp, loading, error } = useAuth()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [localError, setLocalError] = useState('')

  // If already signed in, send to vanity
  if (user) {
    navigate('/vanity')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    if (mode === 'signup') {
      if (!name.trim()) { setLocalError('Please enter your name.'); return }
      const { error } = await signUp(email, password, name)
      if (!error) navigate('/scan')
    } else {
      const { error } = await signIn(email, password)
      if (!error) navigate('/vanity')
    }
  }

  const handleGuest = () => navigate('/scan')

  return (
    <div className={styles.container}>
      <div className={styles.blobTop} />
      <div className={styles.blobBottom} />

      <div className={styles.card}>
        <div className={styles.logo}>PureBeauty</div>
        <h1 className={styles.heading}>
          {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className={styles.sub}>
          {mode === 'signin'
            ? 'Sign in to access your beauty profile.'
            : 'Join to save your skin analysis and matches.'}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'signup' && (
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {(error || localError) && (
            <div className={styles.error}>{localError || error}</div>
          )}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button onClick={handleGuest} className={styles.guestButton}>
          Continue as Guest →
        </button>

        <div className={styles.toggle}>
          {mode === 'signin' ? (
            <>Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className={styles.toggleLink}>Sign up</button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button onClick={() => setMode('signin')} className={styles.toggleLink}>Sign in</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
