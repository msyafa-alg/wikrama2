import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageSquare, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import { motion } from 'framer-motion'

const ChatRegister = () => {
  const { signUp } = useChat()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.endsWith('@smkwikrama.sch.id')) {
      setError('Harus menggunakan email @smkwikrama.sch.id')
      return
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }

    setLoading(true)
    try {
      await signUp(email, password, name)
      navigate('/chat')
    } catch (err) {
      if (err.message?.includes('email-already-in-use')) {
        setError('Email sudah terdaftar, silakan login')
      } else {
        setError(err.message || 'Gagal daftar')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#F8FAFC' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl p-6 sm:p-8"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Link to="/chat/login" className="p-2 rounded-lg hover:bg-gray-100 transition-colors" style={{ color: '#64748B' }}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(30,58,95,0.1)' }}>
            <MessageSquare className="w-5 h-5" style={{ color: '#1E3A5F' }} />
          </div>
          <div>
            <h1 className="font-bold" style={{ color: '#0F172A' }}>Daftar Akun</h1>
            <p className="text-xs" style={{ color: '#64748B' }}>Buat akun untuk kirim kritik & saran</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Nama Lengkap</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
            />
          </div>
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
            <p className="text-[10px] mt-1" style={{ color: '#94A3B8' }}>Harus menggunakan email @smkwikrama.sch.id</p>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Minimal 6 karakter"
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
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="text-center text-xs mt-4" style={{ color: '#64748B' }}>
          Sudah punya akun?{' '}
          <Link to="/chat/login" className="font-semibold" style={{ color: '#1E3A5F' }}>Login</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default ChatRegister
