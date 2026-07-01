import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Loader, AlertCircle, Clock, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '../../context/ChatContext'
import ChatBubble from '../../components/ChatBubble'
import ChatInput from '../../components/ChatInput'
import { ADMIN_FIREBASE_EMAIL } from '../../lib/firebase'

const AdminChatDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { signInAsAdmin, user: fbUser, loading: fbLoading, sendAdminMessage, subscribeToAdminMessages, getConversation } = useChat()
  const [messages, setMessages] = useState([])
  const [msgLoading, setMsgLoading] = useState(true)
  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [fbReady, setFbReady] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)
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
        setError('Akun admin Firebase belum dibuat. Buat dulu di Firebase Console.')
        setMsgLoading(false)
      }
    }
    init()
  }, [fbLoading])

  useEffect(() => {
    if (!fbReady) return
    getConversation(id).then((conv) => {
      if (conv) {
        setStudentName(conv.studentName || 'Siswa')
        setStudentEmail(conv.studentEmail || '')
      }
    })
    const unsub = subscribeToAdminMessages(id, (msgs) => {
      setMessages(msgs)
      setMsgLoading(false)
    })
    return unsub
  }, [fbReady, id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text) => {
    try {
      await sendAdminMessage(id, text)
    } catch (err) {
      console.error(err)
    }
  }

  const statusBadge = messages.length === 0
    ? { label: 'Menunggu', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' }
    : messages[messages.length - 1].senderRole === 'admin'
      ? { label: 'Sudah Dibalas', color: '#10B981', bg: 'rgba(16,185,129,0.1)' }
      : { label: 'Menunggu', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' }

  const formatDate = (t) => {
    if (!t) return ''
    const d = t.toDate ? t.toDate() : new Date(t)
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8FAFC' }}>
      <div className="sticky top-0 z-50" style={{ background: '#1E3A5F' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin/chat')} className="p-1 rounded-lg transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img src="/favicon.png" alt="" className="w-8 h-8 rounded-lg" />
            <div>
              <p className="text-white font-bold text-sm">Admin - Chat</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{studentEmail || 'Percakapan'}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
            <button onClick={() => navigate('/admin/chat')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Kembali
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-3 sm:px-4 pb-3 sm:pb-4 pt-4 max-w-6xl mx-auto w-full">
        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          <div
            className="px-5 sm:px-6 py-4 border-b shrink-0"
            style={{ borderColor: '#F1F5F9', minHeight: 72 }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(30,58,95,0.08)' }}
                >
                  <span className="text-sm font-bold" style={{ color: '#1E3A5F' }}>
                    {(studentName || '?').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="font-bold text-sm" style={{ color: '#0F172A' }}>
                      {studentName || 'Percakapan'}
                    </h2>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: statusBadge.bg, color: statusBadge.color }}
                    >
                      {statusBadge.label}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5 truncate" style={{ color: '#64748B' }}>
                    {studentEmail || 'Memuat...'}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <img src="/favicon.png" alt="" className="w-6 h-6 rounded-full" />
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#0F172A' }}>Anda</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
                    <span className="text-[10px]" style={{ color: '#10B981' }}>Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
            {error ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#FEF2F2' }}>
                  <AlertCircle className="w-8 h-8" style={{ color: '#DC2626' }} />
                </div>
                <p className="font-semibold" style={{ color: '#DC2626' }}>Gagal terhubung</p>
                <p className="text-xs mt-1 max-w-sm mx-auto" style={{ color: '#64748B' }}>{error}</p>
              </div>
            ) : msgLoading ? (
              <div className="flex justify-center py-20">
                <Loader className="w-6 h-6 animate-spin" style={{ color: '#1E3A5F' }} />
              </div>
            ) : messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(245,158,11,0.08)' }}
                >
                  <span className="text-3xl">👋</span>
                </div>
                <h3 className="font-bold text-base" style={{ color: '#0F172A' }}>
                  Belum Ada Pesan
                </h3>
                <p className="text-sm mt-1.5 max-w-xs leading-relaxed" style={{ color: '#64748B' }}>
                  Balas pesan di bawah untuk memulai percakapan dengan siswa.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {messages.map((msg) => (
                  <ChatBubble
                    key={msg.id}
                    text={msg.text}
                    time={msg.createdAt}
                    isOwn={msg.senderRole === 'admin'}
                    name={msg.senderRole === 'admin' ? 'Admin' : studentName}
                  />
                ))}
              </AnimatePresence>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="px-5 sm:px-6 py-4 border-t shrink-0" style={{ borderColor: '#F1F5F9' }}>
            <ChatInput onSend={handleSend} placeholder="Ketik balasan..." />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 px-1">
          <button
            onClick={() => navigate('/admin/chat')}
            className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200 hover:-translate-x-0.5"
            style={{ color: '#64748B' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1E3A5F')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            Kembali ke Inbox
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminChatDetail
