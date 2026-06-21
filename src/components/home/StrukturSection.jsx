import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const StrukturSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [zoomed, setZoomed] = useState(false)

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: '#F8FAFC' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-navy mb-3">Organisasi</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3" style={{ color: '#0F172A' }}>Struktur Organisasi</h2>
          <p className="mt-3" style={{ color: '#64748B' }}>Susunan kepengurusan Rayon Wikrama 2</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative group cursor-zoom-in"
          onClick={() => setZoomed(true)}
        >
          <div className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
            }}>
            <img
              src="https://picsum.photos/seed/struktur/1200/700"
              alt="Struktur Organisasi Rayon Wikrama 2"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            style={{ background: 'rgba(30,58,95,0.55)' }}>
            <div className="text-white text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              <p className="font-medium">Klik untuk perbesar</p>
            </div>
          </div>
        </motion.div>

        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src="https://picsum.photos/seed/struktur/1200/700"
              alt="Struktur Organisasi"
              className="max-w-full max-h-full rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white rounded-full p-2 transition-colors"
              style={{ background: 'rgba(255,255,255,0.12)' }}
              onClick={() => setZoomed(false)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default StrukturSection
