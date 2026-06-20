import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://files.catbox.moe/5oq0eb.png"
          alt="Wikrama 2 Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,76,129,0.85) 0%, rgba(10,54,96,0.7) 50%, rgba(0,0,0,0.6) 100%)' }} />
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #38bdf8, transparent)' }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #0F4C81, transparent)' }} />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium text-white"
          style={{ background: 'rgba(56,189,248,0.2)', border: '1px solid rgba(56,189,248,0.4)' }}
        >
          <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
          SMK Wikrama Bogor
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-4 leading-none"
        >
          Wikrama
          <span className="block" style={{ color: '#38bdf8' }}>2</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Tempat Bertumbuh, Berkarya, dan Menginspirasi Bersama.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/murid/kelas10"
            className="px-8 py-3.5 rounded-xl font-semibold text-[#0F4C81] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-base"
            style={{ background: 'linear-gradient(135deg, #ffffff, #e0f2fe)' }}
          >
            Daftar Murid
          </Link>
          <Link
            to="/gallery"
            className="px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 text-base"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-blue-200 text-xs">Scroll ke bawah</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-blue-300/50 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-blue-300 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
