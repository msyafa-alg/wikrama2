import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, Loader, Clock, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '../context/ChatContext'
import ChatBubble from '../components/ChatBubble'
import ChatInput from '../components/ChatInput'

const getStatus = (messages) => {
  if (messages.length === 0) return { label: 'Menunggu Admin', color: '#F59E0B', dot: '🟡' }
  const last = messages[messages.length - 1]
  if (last.senderRole === 'admin') return { label: 'Sudah Dibalas', color: '#10B981', dot: '🟢' }
  return { label: 'Menunggu Admin', color: '#F59E0B', dot: '🟡' }
}

const ChatPage = () => {
  const { user, loading, signOut, sendMessage, subscribeToMessages } = useChat()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [msgLoading, setMsgLoading] = useState(true)
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!loading && !user) {
      navigate('/chat/login')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    if (!user) return
    setMsgLoading(true)
    const unsub = subscribeToMessages((msgs) => {
      setMessages(msgs)
      setMsgLoading(false)
    })
    return unsub
  }, [user])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text) => {
    try {
      await sendMessage(text)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/chat/login')
  }

  const status = getStatus(messages)
  const userName = user?.email?.split('@')[0] || 'Siswa'
  const userEmail = user?.email || ''
  const displayName = userName
    .split(/[._-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16" style={{ background: '#F8FAFC' }}>
        <Loader className="w-6 h-6 animate-spin" style={{ color: '#1E3A5F' }} />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="pt-16 px-3 sm:px-4 pb-3 sm:pb-4 min-h-screen flex flex-col">
        <div
          className="w-full max-w-[1000px] mx-auto flex-1 flex flex-col overflow-hidden"
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04)',
          }}
        >
          <div className="px-5 sm:px-6 pt-4 pb-3 border-b shrink-0" style={{ borderColor: '#F1F5F9' }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(30,58,95,0.08)' }}
                >
                  <MessageSquare className="w-5 h-5" style={{ color: '#1E3A5F' }} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="font-bold text-base" style={{ color: '#0F172A' }}>
                      Kritik & Saran
                    </h1>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{
                        background: `${status.color}14`,
                        color: status.color,
                      }}
                    >
                      {status.dot} {status.label}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5 font-medium truncate" style={{ color: '#64748B' }}>
                    {displayName}
                  </p>
                  <p className="text-[10px] truncate" style={{ color: '#94A3B8' }}>
                    {userEmail}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end shrink-0">
                <div className="flex items-center gap-2">
                  <img src="/favicon.png" alt="" className="w-5 h-5 rounded-full" />
                  <span className="text-xs font-semibold" style={{ color: '#0F172A' }}>
                    Admin Rayon
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#10B981' }}
                  />
                  <span className="text-[10px]" style={{ color: '#10B981' }}>
                    Online
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2.5 text-[11px]" style={{ color: '#94A3B8' }}>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Admin biasanya membalas dalam 24 jam
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
            {msgLoading ? (
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
                  Selamat Datang
                </h3>
                <p className="text-sm mt-1.5 max-w-xs leading-relaxed" style={{ color: '#64748B' }}>
                  Silakan kirim kritik, saran, atau pertanyaan Anda. Admin akan membalas secepat mungkin.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {messages.map((msg) => (
                  <ChatBubble
                    key={msg.id}
                    text={msg.text}
                    time={msg.createdAt}
                    isOwn={msg.senderRole === 'student'}
                    status={msg.senderRole === 'student' ? 'sent' : undefined}
                    name={msg.senderRole === 'student' ? displayName : 'Admin'}
                  />
                ))}
              </AnimatePresence>
            )}

            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex items-center gap-2.5 mb-4"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                  style={{ background: '#F1F5F9' }}
                >
                  <img src="/favicon.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div
                  className="px-4 py-3 rounded-2xl flex items-center gap-1"
                  style={{ background: '#F1F5F9' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#94A3B8' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#94A3B8', animationDelay: '0.1s' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#94A3B8', animationDelay: '0.2s' }} />
                </div>
              </motion.div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="px-5 sm:px-6 py-4 border-t shrink-0" style={{ borderColor: '#F1F5F9' }}>
            <ChatInput onSend={handleSend} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 max-w-[1000px] mx-auto w-full px-1">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200 hover:-translate-x-0.5"
            style={{ color: '#64748B' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1E3A5F')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            Kembali ke Website
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200"
            style={{ color: '#64748B' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#DC2626')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
          >
            Keluar
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
