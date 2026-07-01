import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, MessageSquare, ChevronLeft, Loader } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import ChatBubble from '../components/ChatBubble'
import ChatInput from '../components/ChatInput'

const ChatPage = () => {
  const { user, loading, signOut, sendMessage, subscribeToMessages } = useChat()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [msgLoading, setMsgLoading] = useState(true)
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <Loader className="w-6 h-6 animate-spin" style={{ color: '#1E3A5F' }} />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8FAFC' }}>
      <div className="sticky top-0 z-50" style={{ background: '#1E3A5F' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Kritik & Saran</p>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {user.email?.split('@')[0] || 'Siswa'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="p-1.5 rounded-lg transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-2xl mx-auto w-full">
        {msgLoading ? (
          <div className="flex justify-center py-20">
            <Loader className="w-6 h-6 animate-spin" style={{ color: '#1E3A5F' }} />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(30,58,95,0.08)' }}>
              <MessageSquare className="w-8 h-8" style={{ color: '#1E3A5F' }} />
            </div>
            <p className="font-semibold" style={{ color: '#0F172A' }}>Belum ada pesan</p>
            <p className="text-xs mt-1" style={{ color: '#64748B' }}>Ketik pesan di bawah untuk memulai</p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              text={msg.text}
              time={msg.createdAt}
              isOwn={msg.senderRole === 'student'}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <ChatInput onSend={handleSend} placeholder="Tulis kritik, saran, atau keluh kesah..." />
      </div>
    </div>
  )
}

export default ChatPage
