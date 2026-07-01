import { useState, useEffect, useRef } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { session } = useAuth()
  const emailRef = useRef(null)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [navigate])

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen relative flex items-center justify-center px-4"
      style={{ background: '#F8FAFC' }}
    >
      <div className="absolute top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:-translate-x-0.5"
            style={{ color: '#64748B' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1E3A5F'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Website
          </Link>

          <Link to="/" className="flex items-center gap-2.5">
            <img src="/favicon.png" alt="" className="w-7 h-7 rounded-lg" />
            <span className="text-sm font-bold" style={{ color: '#94A3B8' }}>WIKRAMA 2</span>
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="w-full max-w-sm rounded-3xl p-8"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        }}
      >
        <div className="text-center mb-8">
          <img src="/favicon.png" alt="Logo" className="w-14 h-14 rounded-2xl mx-auto mb-3" />
          <h1 className="text-xl font-bold" style={{ color: '#0F172A' }}>Admin Panel</h1>
          <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>Masuk ke dashboard admin</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#64748B' }}>Email</label>
            <input
              ref={emailRef}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all duration-200"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#0F172A',
              }}
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
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all duration-200"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#0F172A',
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium"
              style={{ color: '#DC2626' }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
            style={{ background: '#1E3A5F' }}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default Login
