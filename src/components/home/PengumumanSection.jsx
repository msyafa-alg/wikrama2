import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Bell, AlertTriangle, Calendar, ChevronDown } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const PengumumanSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [pengumuman, setPengumuman] = useState([])
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('pengumuman').select('*').order('tanggal', { ascending: false })
      setPengumuman(data || [])
    }
    fetch()
  }, [])

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: '#F8FAFC' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-navy mb-3">Informasi Resmi</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3" style={{ color: '#0F172A' }}>Pengumuman</h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: '#64748B' }}>
            Pemberitahuan resmi untuk seluruh siswa Wikrama 2
          </p>
        </motion.div>

        <div className="space-y-3">
          {pengumuman.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer"
                style={{
                  background: '#FFFFFF',
                  border: item.penting ? '1.5px solid #DC2626' : '1px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5">
                      {item.penting ? (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(220,38,38,0.1)' }}>
                          <AlertTriangle className="w-5 h-5" style={{ color: '#DC2626' }} />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(30,58,95,0.08)' }}>
                          <Bell className="w-5 h-5" style={{ color: '#1E3A5F' }} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {item.penting && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                            style={{ background: '#DC2626', color: '#FFFFFF' }}>
                            PENTING
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8' }}>
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm" style={{ color: '#0F172A' }}>{item.judul}</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${expandedId === item.id ? 'rotate-180' : ''}`}
                      style={{ color: '#94A3B8' }} />
                  </div>
                  <AnimatePresence initial={false}>
                    {expandedId === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pl-14">
                          <p className="text-sm" style={{ color: '#475569' }}>{item.konten}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link to="/pengumuman"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:gap-3"
            style={{ background: '#1E3A5F', color: '#FFFFFF' }}>
            Lihat Semua Pengumuman
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default PengumumanSection
