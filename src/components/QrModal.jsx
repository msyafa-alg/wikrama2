import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

const QrModal = ({ url, nama, onClose }) => {
  const fullUrl = window.location.origin + url

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.85 }}
        className="relative rounded-2xl p-8 text-center"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <X className="w-4 h-4" style={{ color: '#64748B' }} />
        </button>

        <div className="mb-4">
          <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden flex items-center justify-center p-3" style={{ background: '#FFFFFF' }}>
            <QRCodeSVG value={fullUrl} size={180} level="M" />
          </div>
        </div>

        <p className="font-semibold text-sm" style={{ color: '#0F172A' }}>{nama}</p>
        <p className="text-xs mt-1 mb-4" style={{ color: '#94A3B8' }}>Scan QR untuk lihat profil</p>

        <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          <svg className="w-3.5 h-3.5 shrink-0" style={{ color: '#64748B' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="truncate" style={{ color: '#64748B' }}>{fullUrl}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default QrModal
