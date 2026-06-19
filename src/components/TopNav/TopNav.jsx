import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useBag } from '../../context/BagContext'
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
  const { collection, setIsOpen } = useBag()

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
          <button className={styles.bagBtn} onClick={() => setIsOpen(true)} title="My Bag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {collection.length > 0 && (
              <span className={styles.bagCount}>{collection.length}</span>
            )}
          </button>
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
