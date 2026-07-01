import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

const ChatInput = ({ onSend, placeholder = 'Tulis kritik, saran, atau pertanyaan Anda...' }) => {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isEmpty = !text.trim()

  return (
    <div className="flex items-end gap-3">
      <div className="flex-1 relative">
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="w-full resize-none px-4 py-3 text-sm outline-none transition-all duration-200"
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            color: '#0F172A',
            borderRadius: 14,
            lineHeight: '1.5',
            minHeight: 44,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#1E3A5F'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,58,95,0.06)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0'
            e.currentTarget.style.boxShadow = 'none'
          }}
          onInput={(e) => {
            e.currentTarget.style.height = 'auto'
            e.currentTarget.style.height = Math.min(e.currentTarget.scrollHeight, 120) + 'px'
          }}
        />
      </div>

      <button
        onClick={handleSend}
        disabled={isEmpty}
        className="p-3 rounded-xl transition-all duration-200 flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: isEmpty ? '#E2E8F0' : '#1E3A5F',
          color: isEmpty ? '#94A3B8' : '#FFFFFF',
        }}
        onMouseEnter={(e) => {
          if (!isEmpty) {
            e.currentTarget.style.background = '#162D4A'
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(30,58,95,0.25)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isEmpty ? '#E2E8F0' : '#1E3A5F'
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  )
}

export default ChatInput
