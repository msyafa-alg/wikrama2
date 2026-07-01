import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageSquare, LogOut, ChevronRight, Loader, Users } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useChat } from '../../context/ChatContext'

const AdminChat = () => {
  const { session } = useAuth()
  const { signInAsAdmin, subscribeToConversations, user: fbUser, loading: fbLoading } = useChat()
  const navigate = useNavigate()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [fbReady, setFbReady] = useState(false)

  useEffect(() => {
    if (!fbLoading && !fbUser) {
      signInAsAdmin().catch(console.error)
    } else if (!fbLoading && fbUser) {
      setFbReady(true)
    }
  }, [fbUser, fbLoading])

  useEffect(() => {
    if (!fbReady) return
    const unsub = subscribeToConversations((convs) => {
      setConversations(convs)
      setLoading(false)
    })
    return unsub
  }, [fbReady])

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="font-bold text-lg mb-5" style={{ color: '#0F172A' }}>
          <span className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" style={{ color: '#1E3A5F' }} />
            Inbox Pesan
          </span>
        </h1>

        {loading || !fbReady ? (
          <div className="flex justify-center py-20">
            <Loader className="w-6 h-6 animate-spin" style={{ color: '#1E3A5F' }} />
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(30,58,95,0.08)' }}>
              <MessageSquare className="w-8 h-8" style={{ color: '#94A3B8' }} />
            </div>
            <p className="font-semibold" style={{ color: '#0F172A' }}>Belum ada pesan</p>
            <p className="text-xs mt-1" style={{ color: '#64748B' }}>Tunggu siswa mengirim pesan</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            {conversations.map((conv) => (
              <Link
                key={conv.id}
                to={`/admin/chat/${conv.id}`}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50 border-b last:border-b-0"
                style={{ borderColor: '#F1F5F9' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(30,58,95,0.1)' }}>
                  <Users className="w-5 h-5" style={{ color: '#1E3A5F' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm truncate" style={{ color: '#0F172A' }}>
                      {conv.studentName || 'Siswa'}
                    </p>
                    <span className="text-[10px] shrink-0" style={{ color: '#94A3B8' }}>
                      {formatTime(conv.lastMessageAt)}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5 truncate" style={{ color: '#64748B' }}>
                    {conv.studentEmail}
                  </p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: conv.lastMessage ? '#94A3B8' : '#CBD5E1' }}>
                    {conv.lastMessage || 'Belum ada pesan'}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0" style={{ color: '#CBD5E1' }} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminChat
