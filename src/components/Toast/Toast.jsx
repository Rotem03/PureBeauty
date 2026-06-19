import { useEffect } from 'react'
import styles from './Toast.module.css'

export const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 2800)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {message}
    </div>
  )
}
