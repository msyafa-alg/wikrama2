import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, Download, FileText, ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

const PdfModal = ({ url, title, onClose }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfError, setPdfError] = useState(false)

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages)
    setPdfError(false)
  }, [])

  const onDocumentLoadError = useCallback(() => {
    setPdfError(true)
  }, [])

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

        <div className="flex-1 flex flex-col overflow-hidden">
          {pdfError ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <FileText className="w-12 h-12" style={{ color: '#DC2626' }} strokeWidth={1.5} />
              <p className="text-sm font-medium" style={{ color: '#64748B' }}>Gagal memuat PDF</p>
              <a href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white"
                style={{ background: '#1E3A5F' }}>
                <Download className="w-3.5 h-3.5" /> Download PDF
              </a>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto flex justify-center p-4">
                <Document
                  file={url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex items-center justify-center h-full py-20">
                      <Loader className="w-6 h-6 animate-spin" style={{ color: '#1E3A5F' }} />
                    </div>
                  }
                >
                  <Page pageNumber={pageNumber} width={Math.min(800, window.innerWidth - 80)} />
                </Document>
              </div>

              {numPages > 1 && (
                <div className="flex items-center justify-center gap-4 px-4 py-3 shrink-0"
                  style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
                  <button
                    onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                    disabled={pageNumber <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105"
                    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
                  >
                    <ChevronLeft className="w-4 h-4" style={{ color: '#1E3A5F' }} />
                  </button>
                  <span className="text-xs font-semibold" style={{ color: '#64748B' }}>
                    {pageNumber} / {numPages}
                  </span>
                  <button
                    onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                    disabled={pageNumber >= numPages}
                    className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105"
                    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
                  >
                    <ChevronRight className="w-4 h-4" style={{ color: '#1E3A5F' }} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PdfModal
