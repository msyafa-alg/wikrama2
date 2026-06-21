import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const PembimbingSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 sm:py-20 px-4" style={{ background: '#1E3A5F' }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff' }}>
            Pembimbing Rayon
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Pembimbing Rayon</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="rounded-3xl p-6 sm:p-10 transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Photo */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: '2px solid rgba(245,158,11,0.4)' }}>
                <img
                  src="https://files.catbox.moe/vle4fm.png"
                  alt="Rizky Kurniawan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Rizky Kurniawan</h3>
              <p className="font-medium mb-4 text-sm sm:text-base" style={{ color: '#F59E0B' }}>
                Pembimbing Rayon Wikrama 2
              </p>
              <blockquote className="relative">
                <span className="text-4xl font-serif leading-none" style={{ color: '#F59E0B' }}>"</span>
                <p className="text-sm sm:text-base leading-relaxed italic -mt-2 px-3"
                  style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Mendidik bukan hanya mengajar, tetapi membentuk karakter untuk masa depan.
                </p>
                <span className="text-4xl font-serif leading-none float-right" style={{ color: '#F59E0B' }}>"</span>
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
