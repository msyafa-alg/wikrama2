import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { session } = useAuth()

  if (session) return <Navigate to="/admin/dashboard" replace />

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: err } = await supabase.auth.signInWithPassword({ email, password })

    if (err) {
      setError(err.message === 'Invalid login credentials'
        ? 'Email atau password salah'
        : err.message)
    } else {
      navigate('/admin/dashboard')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#F8FAFC' }}>
      <div className="w-full max-w-sm rounded-3xl p-8" style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
      }}>
        <div className="text-center mb-8">
          <img src="/favicon.png" alt="Logo" className="w-14 h-14 rounded-2xl mx-auto mb-3" />
          <h1 className="text-xl font-bold" style={{ color: '#0F172A' }}>Admin Panel</h1>
          <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>Masuk ke dashboard admin</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#64748B' }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#64748B' }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm font-medium" style={{ color: '#DC2626' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
            style={{ background: '#1E3A5F' }}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
