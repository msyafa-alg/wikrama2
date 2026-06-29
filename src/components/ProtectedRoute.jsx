import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1E3A5F', borderTopColor: 'transparent' }} />
          <p className="text-sm font-medium" style={{ color: '#64748B' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) return <Navigate to="/admin/login" replace />

  return children
}

export default ProtectedRoute
