import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageSquare, Eye, EyeOff } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import { motion } from 'framer-motion'

const ChatLogin = () => {
  const { signIn } = useChat()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/chat')
    } catch (err) {
      if (err.message?.includes('invalid-credential')) {
        setError('Email atau password salah')
      } else {
        setError(err.message || 'Gagal login')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24" style={{ background: '#F8FAFC' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl p-6 sm:p-8"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(30,58,95,0.1)' }}>
            <MessageSquare className="w-7 h-7" style={{ color: '#1E3A5F' }} />
          </div>
          <h1 className="font-bold text-lg" style={{ color: '#0F172A' }}>Kritik & Saran</h1>
          <p className="text-xs mt-1" style={{ color: '#64748B' }}>Silakan login untuk mengirim pesan ke admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="nama@smkwikrama.sch.id"
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan password"
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none pr-10"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }}>
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl text-sm" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
            style={{ background: '#1E3A5F' }}
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-xs mt-4" style={{ color: '#64748B' }}>
          Belum punya akun?{' '}
          <Link to="/chat/register" className="font-semibold" style={{ color: '#1E3A5F' }}>Daftar</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default ChatLogin
