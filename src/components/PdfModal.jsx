import { motion } from 'framer-motion'
import { X, Download, FileText } from 'lucide-react'

const PdfModal = ({ url, title, onClose }) => {
  if (!url) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/95 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.85 }}
        className="relative w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 shrink-0" style={{ color: '#DC2626' }} />
            <span className="text-sm font-medium truncate" style={{ color: '#0F172A' }}>{title || 'PDF'}</span>
          </div>
          <div className="flex items-center gap-2">
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{ background: '#DC2626', color: '#ffffff' }}>
              <Download className="w-3.5 h-3.5" /> Download
            </a>
            <button onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <X className="w-4 h-4" style={{ color: '#64748B' }} />
            </button>
          </div>
        </div>
        <div className="flex-1">
          <iframe
            src={url}
            className="w-full h-full"
            title={title || 'PDF Viewer'}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PdfModal
