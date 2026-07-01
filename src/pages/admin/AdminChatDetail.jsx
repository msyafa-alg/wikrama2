import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Loader } from 'lucide-react'
import { useChat } from '../../context/ChatContext'
import ChatBubble from '../../components/ChatBubble'
import ChatInput from '../../components/ChatInput'

const AdminChatDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { signInAsAdmin, user: fbUser, loading: fbLoading, sendAdminMessage, subscribeToAdminMessages } = useChat()
  const [messages, setMessages] = useState([])
  const [msgLoading, setMsgLoading] = useState(true)
  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [fbReady, setFbReady] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!fbLoading && !fbUser) {
      signInAsAdmin().catch(console.error)
    } else if (!fbLoading && fbUser) {
      setFbReady(true)
    }
  }, [fbUser, fbLoading])

  useEffect(() => {
    if (!fbReady) return
    const unsub = subscribeToAdminMessages(id, (msgs) => {
      setMessages(msgs)
      setMsgLoading(false)
    })
    return unsub
  }, [fbReady, id])

  useEffect(() => {
    if (messages.length > 0) {
      const first = messages[0]
      setStudentName(first.senderRole === 'student' ? 'Siswa' : 'Siswa')
    }
  }, [messages])

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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8FAFC' }}>
      <div className="sticky top-0 z-50" style={{ background: '#1E3A5F' }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin/chat')} className="p-1 rounded-lg transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                {studentName || 'Percakapan'}
              </p>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {studentEmail || 'Memuat...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-4xl mx-auto w-full">
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
            <p className="text-xs mt-1" style={{ color: '#64748B' }}>Balas untuk memulai percakapan</p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              text={msg.text}
              time={msg.createdAt}
              isOwn={msg.senderRole === 'admin'}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <ChatInput onSend={handleSend} placeholder="Ketik balasan..." />
      </div>
    </div>
  )
}

export default AdminChatDetail
