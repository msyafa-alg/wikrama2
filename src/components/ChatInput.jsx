import { useState } from 'react'
import { Send } from 'lucide-react'

const ChatInput = ({ onSend, placeholder = 'Ketik pesan...' }) => {
  const [text, setText] = useState('')

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-2 p-3" style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none"
        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
      />
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className="p-2.5 rounded-xl transition-all disabled:opacity-40"
        style={{ background: '#1E3A5F', color: '#FFFFFF' }}
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  )
}

export default ChatInput
