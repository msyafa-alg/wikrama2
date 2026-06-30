import { motion } from 'framer-motion'
import { Briefcase, BookOpen, Users, Award } from 'lucide-react'

const icons = {
  pengalaman: Briefcase,
  pendidikan: BookOpen,
  organisasi: Users,
  prestasi: Award,
}

const colors = {
  pengalaman: { dot: '#F59E0B', line: 'rgba(245,158,11,0.25)' },
  pendidikan: { dot: '#1E3A5F', line: 'rgba(30,58,95,0.25)' },
  organisasi: { dot: '#059669', line: 'rgba(5,150,105,0.25)' },
  prestasi: { dot: '#DC2626', line: 'rgba(220,38,38,0.25)' },
}

const TimelineItem = ({ item, icon: Icon, color, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="relative flex gap-4 pb-8 last:pb-0"
  >
    <div className="flex flex-col items-center">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 z-10 shadow-sm"
        style={{ background: color.dot }}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="w-0.5 flex-1 mt-1" style={{ background: color.line }} />
    </div>
    <div className="flex-1 pt-1 pb-2">
      {typeof item === 'string' ? (
        <p className="text-sm font-medium" style={{ color: 'var(--text, #0F172A)' }}>{item}</p>
      ) : (
        <>
          <p className="text-sm font-semibold" style={{ color: 'var(--text, #0F172A)' }}>{item.posisi || item.nama || item.judul}</p>
          {item.tempat && <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary, #64748B)' }}>{item.tempat}</p>}
          {item.periode && <p className="text-xs mt-0.5 font-medium" style={{ color: color.dot }}>{item.periode}</p>}
        </>
      )}
    </div>
  </motion.div>
)

const Timeline = ({ items = [], type = 'pengalaman', title }) => {
  const Icon = icons[type] || Briefcase
  const color = colors[type] || colors.pengalaman

  if (!items || items.length === 0) return null

  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E2E8F0)' }}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: color.dot }}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-bold text-sm" style={{ color: 'var(--text, #0F172A)' }}>{title}</h3>
        </div>
      )}
      <div className="pl-1">
        {items.map((item, i) => (
          <TimelineItem key={i} item={item} icon={Icon} color={color} index={i} />
        ))}
      </div>
    </div>
  )
}

export default Timeline
