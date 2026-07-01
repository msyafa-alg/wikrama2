import { motion } from 'framer-motion'

const formatTime = (t) => {
  if (!t) return ''
  const d = t.toDate ? t.toDate() : new Date(t)
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

const ChatBubble = ({ text, time, isOwn, status, name }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex items-end gap-2.5 mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      {!isOwn && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold overflow-hidden"
          style={{ background: '#F1F5F9', color: '#64748B' }}
        >
          <img src="/favicon.png" alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[65%]`}>
        <div
          className="px-4 py-3 text-sm leading-relaxed"
          style={{
            background: isOwn ? '#1E3A5F' : '#F1F5F9',
            color: isOwn ? '#FFFFFF' : '#0F172A',
            borderRadius: isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          }}
        >
          {text}
        </div>

        <div className="flex items-center gap-1.5 mt-1 px-1">
          {time && (
            <span
              className="text-[10px] font-medium"
              style={{ color: isOwn ? 'rgba(255,255,255,0.45)' : '#94A3B8' }}
            >
              {formatTime(time)}
            </span>
          )}
          {isOwn && (
            <span
              className="text-[10px]"
              style={{ color: status === 'read' ? '#3B82F6' : isOwn ? 'rgba(255,255,255,0.35)' : '#CBD5E1' }}
            >
              {status === 'read' ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>

      {isOwn && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold overflow-hidden"
          style={{ background: 'rgba(30,58,95,0.08)', color: '#1E3A5F' }}
        >
          {initial}
        </div>
      )}
    </motion.div>
  )
}

export default ChatBubble
