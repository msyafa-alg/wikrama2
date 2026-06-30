const FotoPlaceholder = ({ nama, className = '' }) => {
  const initial = nama ? nama.charAt(0).toUpperCase() : '?'

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1E3A5F 0%, #2d5a8e 100%)',
        color: '#ffffff',
        fontWeight: 600,
        fontSize: '1.5rem',
      }}
    >
      <span style={{ opacity: 0.8 }}>{initial}</span>
    </div>
  )
}

export default FotoPlaceholder
