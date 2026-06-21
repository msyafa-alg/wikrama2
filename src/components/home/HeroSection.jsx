import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background image — desktop */}
      <div className="absolute inset-0 z-0 hidden sm:block">
        <img
          src="https://files.catbox.moe/5oq0eb.png"
          alt="Wikrama 2"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(30,58,95,0.78) 0%, rgba(30,58,95,0.58) 40%, rgba(30,58,95,0.88) 100%)' }} />
      </div>

      {/* Background image — mobile */}
      <div className="absolute inset-0 z-0 sm:hidden">
        <img
          src="https://files.catbox.moe/5oq0eb.png"
          alt="Wikrama 2"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(30,58,95,0.78) 0%, rgba(30,58,95,0.58) 40%, rgba(30,58,95,0.88) 100%)' }} />
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-5 max-w-5xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: '#ffffff',
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#F59E0B' }} />
          SMK Wikrama Bogor
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-extrabold text-white leading-none tracking-tight mb-4"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
        >
          Wikrama<span style={{ color: '#F59E0B' }}>2</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl mb-10 max-w-lg mx-auto leading-relaxed px-2"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          Tempat Bertumbuh, Berkarya, dan Menginspirasi Bersama.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14"
        >
          {/* Primary — biru tua */}
          <Link
            to="/murid/kelas10"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold shadow-xl transition-all duration-300 hover:scale-105 text-base text-center text-white"
            style={{ background: '#1E3A5F' }}
            onMouseEnter={e => e.currentTarget.style.background = '#152d4a'}
            onMouseLeave={e => e.currentTarget.style.background = '#1E3A5F'}
          >
            Daftar Murid
          </Link>
          {/* Secondary — glass putih */}
          <Link
            to="/gallery"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 text-base text-center"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            Gallery
          </Link>
        </motion.div>

        {/* Floating stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {[
            { num: '30+', label: 'Murid' },
            { num: '100+', label: 'Alumni' },
            { num: '20+', label: 'Prestasi' },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-6 py-3 rounded-2xl text-center"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              <p className="text-xl font-bold" style={{ color: '#F59E0B' }}>{stat.num}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.75)' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs hidden sm:block" style={{ color: 'rgba(255,255,255,0.5)' }}>Scroll ke bawah</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '2px solid rgba(255,255,255,0.45)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.8)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
