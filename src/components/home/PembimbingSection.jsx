import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const PembimbingSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #0a3660 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-sky-300 mb-3"
            style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)' }}>
            Pembimbing Rayon
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Pembimbing Rayon</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
            }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #38bdf8, transparent)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #0F4C81, transparent)', transform: 'translate(-30%, 30%)' }} />

            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
              {/* Photo */}
              <div className="relative shrink-0">
                <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-sky-400/30">
                  <img
                    src="https://files.catbox.moe/vle4fm.png"
                    alt="Rizky Kurniawan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #38bdf8, #0F4C81)' }}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Rizky Kurniawan</h3>
                <p className="text-sky-300 font-medium mb-4">Pembimbing Rayon Wikrama 2</p>

                {/* Quote */}
                <blockquote className="relative">
                  <div className="text-sky-400 text-4xl font-serif leading-none absolute -top-2 -left-1">"</div>
                  <p className="text-blue-100 text-sm sm:text-base leading-relaxed italic pl-5">
                    Mendidik bukan hanya mengajar, tetapi membentuk karakter untuk masa depan.
                  </p>
                  <div className="text-sky-400 text-4xl font-serif leading-none">"</div>
                </blockquote>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PembimbingSection
