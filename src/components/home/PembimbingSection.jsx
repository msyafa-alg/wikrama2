import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const PembimbingSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 sm:py-20 px-4" style={{ background: '#0F172A' }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3B82F6' }}>
            Pembimbing Rayon
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Pembimbing Rayon</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="rounded-3xl p-6 sm:p-10 relative overflow-hidden transition-all duration-300"
          style={{
            background: '#111827',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          }}
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #3B82F6, transparent)', transform: 'translate(30%,-30%)' }} />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-8 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #1d4ed8, transparent)', transform: 'translate(-30%,30%)' }} />

          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative z-10">
            {/* Photo */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: '2px solid rgba(59,130,246,0.3)' }}>
                <img
                  src="https://files.catbox.moe/vle4fm.png"
                  alt="Rizky Kurniawan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #1d4ed8)' }}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
              </div>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Rizky Kurniawan</h3>
              <p className="font-medium mb-4 text-sm sm:text-base" style={{ color: '#3B82F6' }}>Pembimbing Rayon Wikrama 2</p>
              <blockquote className="relative">
                <span className="text-4xl font-serif leading-none" style={{ color: '#3B82F6' }}>"</span>
                <p className="text-sm sm:text-base leading-relaxed italic -mt-2 px-3" style={{ color: '#94A3B8' }}>
                  Mendidik bukan hanya mengajar, tetapi membentuk karakter untuk masa depan.
                </p>
                <span className="text-4xl font-serif leading-none float-right" style={{ color: '#3B82F6' }}>"</span>
                <div className="clear-both" />
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PembimbingSection
