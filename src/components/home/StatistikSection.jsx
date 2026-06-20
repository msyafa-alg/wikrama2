import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, GraduationCap, Trophy, Camera } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Total Murid', value: 360, suffix: '+', color: '#0F4C81' },
  { icon: GraduationCap, label: 'Total Alumni', value: 480, suffix: '+', color: '#0ea5e9' },
  { icon: Trophy, label: 'Prestasi', value: 24, suffix: '', color: '#f59e0b' },
  { icon: Camera, label: 'Dokumentasi', value: 120, suffix: '+', color: '#10b981' },
]

const CountUp = ({ target, isActive }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    let start = 0
    const duration = 1800
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isActive, target])

  return <span>{count}</span>
}

const StatistikSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #0a3660 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-sky-300 mb-3"
            style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)' }}>
            Dalam Angka
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Statistik Rayon</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative p-6 sm:p-8 rounded-2xl text-center overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div className="absolute inset-0 opacity-5 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}, transparent)` }} />

              <div className="flex justify-center mb-3 relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}22` }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color === '#0F4C81' ? '#7dd3fc' : stat.color }} strokeWidth={1.8} />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-3xl sm:text-4xl font-black text-white mb-1">
                  <CountUp target={stat.value} isActive={isInView} />
                  {stat.suffix}
                </p>
                <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatistikSection
