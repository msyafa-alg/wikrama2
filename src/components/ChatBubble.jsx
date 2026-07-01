const ChatBubble = ({ text, time, isOwn }) => {
  const formatTime = (t) => {
    if (!t) return ''
    const d = t.toDate ? t.toDate() : new Date(t)
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className="max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
        style={{
          background: isOwn ? '#1E3A5F' : '#F1F5F9',
          color: isOwn ? '#FFFFFF' : '#0F172A',
          borderBottomRightRadius: isOwn ? 4 : 12,
          borderBottomLeftRadius: isOwn ? 12 : 4,
        }}
      >
        <p>{text}</p>
        {time && (
          <p className="text-[10px] mt-1 opacity-60 text-right">{formatTime(time)}</p>
        )}
      </div>
    </div>
  )
}

export default ChatBubble
