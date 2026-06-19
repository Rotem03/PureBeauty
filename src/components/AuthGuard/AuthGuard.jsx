import { Navigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export const AuthGuard = ({ children }) => {
  const { user, loading } = useApp()

  if (loading) return null

  if (!user) return <Navigate to="/auth" replace />

  return children
}
