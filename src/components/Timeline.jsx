import { Briefcase, BookOpen, Users, Award } from 'lucide-react'

const icons = {
  pengalaman: Briefcase,
  pendidikan: BookOpen,
  organisasi: Users,
  prestasi: Award,
}

const colors = {
  pengalaman: { dot: '#F59E0B', line: '#FEF3C7' },
  pendidikan: { dot: '#1E3A5F', line: '#E2E8F0' },
  organisasi: { dot: '#059669', line: '#D1FAE5' },
  prestasi: { dot: '#DC2626', line: '#FEE2E2' },
}

const TimelineItem = ({ item, color, isLast }) => {
  return (
    <div className="relative flex gap-4 pb-1">
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ring-2 ring-white" style={{ background: color.dot }} />
        {!isLast && <div className="w-px flex-1 mt-0.5" style={{ background: color.line }} />}
      </div>
      <div className="flex-1 pb-4">
        {typeof item === 'string' ? (
          <p className="text-sm font-medium leading-snug" style={{ color: '#0F172A' }}>{item}</p>
        ) : (
          <>
            <p className="text-sm font-semibold leading-snug" style={{ color: '#0F172A' }}>
              {item.posisi || item.nama || item.judul || '—'}
            </p>
            {item.tempat && (
              <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{item.tempat}</p>
            )}
            {item.periode && (
              <p className="text-xs mt-1 font-medium" style={{ color: color.dot }}>{item.periode}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const Timeline = ({ items = [], type = 'pengalaman', title }) => {
  const Icon = icons[type] || Briefcase
  const color = colors[type] || colors.pengalaman

  if (!items || items.length === 0) return null

  return (
    <div className="rounded-2xl" style={{ background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E2E8F0)' }}>
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: color.dot }}>
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
        <h3 className="font-bold text-sm" style={{ color: '#0F172A' }}>{title}</h3>
      </div>
      <div className="px-5 pb-5">
        {items.map((item, i) => (
          <TimelineItem key={i} item={item} color={color} isLast={i === items.length - 1} />
        ))}
      </div>
    </div>
  )
}

export default Timeline
