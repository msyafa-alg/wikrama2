import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageSquare, LogOut, ChevronRight, Loader, AlertCircle, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useChat } from '../../context/ChatContext'
import { useToast } from '../../components/Toast'
import { ADMIN_FIREBASE_EMAIL } from '../../lib/firebase'

const statusBadge = (conv) => {
  if (!conv.lastMessage) return { label: 'Menunggu', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' }
  return { label: 'Sudah Dibaca', color: '#10B981', bg: 'rgba(16,185,129,0.1)' }
}

const AdminChat = () => {
  const { session } = useAuth()
  const { signInAsAdmin, subscribeToConversations, deleteConversation, user: fbUser, loading: fbLoading } = useChat()
  const navigate = useNavigate()
  const toast = useToast()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [fbReady, setFbReady] = useState(false)
  const [error, setError] = useState('')
  const initRef = useRef(false)

  useEffect(() => {
    if (fbLoading || initRef.current) return
    initRef.current = true
    const init = async () => {
      try {
        if (fbUser && fbUser.email === ADMIN_FIREBASE_EMAIL) {
          setFbReady(true)
          return
        }
        await signInAsAdmin()
        setFbReady(true)
      } catch {
        setError('Akun admin Firebase belum dibuat. Buat dulu di Firebase Console → Authentication → Users → admin@smkwikrama.sch.id')
        setLoading(false)
      }
    }
    init()
  }, [fbLoading])

  useEffect(() => {
    if (!fbReady) return
    const unsub = subscribeToConversations((convs) => {
      setConversations(convs)
      setLoading(false)
    })
    return unsub
  }, [fbReady])

  const handleDelete = async (e, id, name) => {
    e.preventDefault()
    e.stopPropagation()
    if (!window.confirm(`Hapus percakapan dengan ${name || 'siswa ini'}? Semua pesan akan dihapus permanen.`)) return
    try {
      await deleteConversation(id)
      toast('Percakapan berhasil dihapus', 'success')
    } catch {
      toast('Gagal menghapus percakapan', 'error')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const formatTime = (t) => {
    if (!t) return ''
    const d = t.toDate ? t.toDate() : new Date(t)
    const now = new Date()
    const diff = now - d
    if (diff < 86400000) {
      return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="sticky top-0 z-50" style={{ background: '#1E3A5F' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="" className="w-8 h-8 rounded-lg" />
            <div>
              <p className="text-white font-bold text-sm">Admin - Chat</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{session?.user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
            <Link to="/admin/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Dashboard
            </Link>
            <Link to="/admin/siswa"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Siswa
            </Link>
            <Link to="/admin/alumni"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Alumni
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <LogOut className="w-3.5 h-3.5" /> Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(30,58,95,0.08)' }}>
            <MessageSquare className="w-5 h-5" style={{ color: '#1E3A5F' }} />
          </div>
          <div>
            <h1 className="font-bold text-lg" style={{ color: '#0F172A' }}>Inbox Pesan</h1>
            <p className="text-xs" style={{ color: '#64748B' }}>
              {loading ? 'Memuat...' : `${conversations.length} percakapan`}
            </p>
          </div>
        </div>

        {error ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#FEF2F2' }}>
              <AlertCircle className="w-8 h-8" style={{ color: '#DC2626' }} />
            </div>
            <p className="font-semibold mb-1" style={{ color: '#DC2626' }}>Gagal terhubung</p>
            <p className="text-xs max-w-sm mx-auto" style={{ color: '#64748B' }}>{error}</p>
          </div>
        ) : loading || !fbReady ? (
          <div className="flex justify-center py-20">
            <Loader className="w-6 h-6 animate-spin" style={{ color: '#1E3A5F' }} />
          </div>
        ) : conversations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(30,58,95,0.06)' }}>
              <MessageSquare className="w-8 h-8" style={{ color: '#CBD5E1' }} />
            </div>
            <p className="font-semibold" style={{ color: '#0F172A' }}>Belum ada pesan</p>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>Tunggu siswa mengirim pesan</p>
          </motion.div>
        ) : (
          <div
            className="overflow-hidden"
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
            }}
          >
            <AnimatePresence>
              {conversations.map((conv, idx) => {
                const status = statusBadge(conv)
                return (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                  >
                    <Link
                      to={`/admin/chat/${conv.id}`}
                      className="flex items-center gap-4 px-5 sm:px-6 py-4 transition-all duration-200 border-b hover:bg-[#F8FAFC] group"
                      style={{ borderColor: '#F1F5F9' }}
                    >
                      <div className="relative shrink-0">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(30,58,95,0.08)' }}>
                          <span className="text-sm font-bold" style={{ color: '#1E3A5F' }}>
                            {(conv.studentName || '?').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span
                          className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                          style={{ background: status.color, borderColor: '#FFFFFF' }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-sm truncate" style={{ color: '#0F172A' }}>
                            {conv.studentName || 'Siswa'}
                          </p>
                          <span className="text-[11px] shrink-0" style={{ color: '#94A3B8' }}>
                            {formatTime(conv.lastMessageAt)}
                          </span>
                        </div>
                        <p className="text-xs mt-0.5 truncate" style={{ color: '#64748B' }}>
                          {conv.studentEmail}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p
                            className="text-xs truncate flex-1"
                            style={{ color: conv.lastMessage ? '#94A3B8' : '#CBD5E1' }}
                          >
                            {conv.lastMessage || 'Belum ada pesan'}
                          </p>
                          <span
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0"
                            style={{ background: status.bg, color: status.color }}
                          >
                            {status.label}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => handleDelete(e, conv.id, conv.studentName)}
                          className="p-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-red-50"
                          style={{ color: '#94A3B8' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#DC2626'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <ChevronRight className="w-4 h-4 shrink-0" style={{ color: '#CBD5E1' }} />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminChat
