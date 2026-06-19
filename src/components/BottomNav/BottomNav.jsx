import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '../Icon/Icon'
import { NAV_ITEMS } from '../../constants/data'
import { theme } from '../../constants/theme'
import styles from './BottomNav.module.css'

export const BottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(({ id, icon, label }) => {
        const path = id === 'home' ? '/' : `/${id}`
        const active = location.pathname === path
        return (
          <button
            key={id}
            onClick={() => navigate(path)}
            className={styles.navButton}
          >
            <Icon
              name={icon}
              size={22}
              color={active ? theme.accent : theme.muted}
            />
            <span className={`${styles.label} ${active ? styles.active : ''}`}>
              {label}
            </span>
            {active && <div className={styles.dot} />}
          </button>
        )
      })}
    </nav>
  )
}
