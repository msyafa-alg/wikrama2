import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[580px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://files.catbox.moe/5oq0eb.png"
          alt="Wikrama 2"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.90) 0%, rgba(30,58,95,0.75) 50%, rgba(15,23,42,0.80) 100%)' }} />
      </motion.div>

      {/* Decorative blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #38bdf8, transparent)' }} />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 sm:w-80 sm:h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #1E3A5F, transparent)' }} />
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-5 max-w-4xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-medium"
          style={{
            background: 'rgba(56,189,248,0.12)',
            border: '1px solid rgba(56,189,248,0.3)',
            color: '#CBD5E1',
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#38bdf8' }} />
          SMK Wikrama Bogor
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-3 leading-none"
        >
          Wikrama
          <span className="block" style={{ color: '#38bdf8' }}>2</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base sm:text-xl lg:text-2xl mb-8 max-w-xl mx-auto leading-relaxed font-light px-2"
          style={{ color: '#CBD5E1' }}
        >
          Tempat Bertumbuh, Berkarya, dan Menginspirasi Bersama.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            to="/murid/kelas10"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-base text-center"
            style={{ background: '#38bdf8', color: '#0F172A' }}
            onMouseEnter={e => e.currentTarget.style.background = '#0EA5E9'}
            onMouseLeave={e => e.currentTarget.style.background = '#38bdf8'}
          >
            Daftar Murid
          </Link>
          <Link
            to="/gallery"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 text-base text-center"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            Gallery
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs hidden sm:block" style={{ color: '#CBD5E1' }}>Scroll ke bawah</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '2px solid rgba(56,189,248,0.4)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: '#38bdf8' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
