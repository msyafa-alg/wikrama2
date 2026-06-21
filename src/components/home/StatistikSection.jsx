import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, GraduationCap, Trophy, Camera } from 'lucide-react'

const stats = [
  { icon: Users,          label: 'Total Murid',    value: 360, suffix: '+', iconColor: '#93C5FD', iconBg: 'rgba(147,197,253,0.15)' },
  { icon: GraduationCap,  label: 'Total Alumni',   value: 480, suffix: '+', iconColor: '#BAE6FD', iconBg: 'rgba(186,230,253,0.15)' },
  { icon: Trophy,         label: 'Prestasi',       value: 24,  suffix: '',  iconColor: '#F59E0B', iconBg: 'rgba(245,158,11,0.18)' },
  { icon: Camera,         label: 'Dokumentasi',    value: 120, suffix: '+', iconColor: '#6EE7B7', iconBg: 'rgba(110,231,183,0.15)' },
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
      if (start >= target) { setCount(target); clearInterval(timer) }
      else { setCount(Math.floor(start)) }
    }, 16)
    return () => clearInterval(timer)
  }, [isActive, target])

  return <span>{count}</span>
}

const StatistikSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: '#1E3A5F' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff' }}>
            Dalam Angka
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Statistik Rayon</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-2xl text-center transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: stat.iconBg }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.iconColor }} strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white mb-1">
                <CountUp target={stat.value} isActive={isInView} />
                {stat.suffix}
              </p>
              <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatistikSection
