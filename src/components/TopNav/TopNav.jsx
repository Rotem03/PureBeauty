import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import styles from './TopNav.module.css'

const LINKS = [
  { path: '/scan',      label: 'AI Scan' },
  { path: '/shop',      label: 'Shop' },
  { path: '/tutorials', label: 'Tutorials' },
  { path: '/vanity',    label: 'My Profile' },
]

export const TopNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useApp()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => navigate('/')}>
          PureBeauty
        </button>
        <nav className={styles.nav}>
          {LINKS.map(({ path, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`${styles.link} ${location.pathname === path ? styles.active : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className={styles.actions}>
          {user ? (
            <button onClick={() => navigate('/vanity')} className={styles.avatarBtn}>
              {user.email?.[0]?.toUpperCase() ?? 'U'}
            </button>
          ) : (
            <button onClick={() => navigate('/auth')} className={styles.signInBtn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
