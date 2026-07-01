import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, AlertTriangle, Bell, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

const PengumumanPage = () => {
  const [pengumuman, setPengumuman] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [filterPenting, setFilterPenting] = useState('semua')

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('pengumuman').select('*').order('tanggal', { ascending: false })
      setPengumuman(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = filterPenting === 'semua'
    ? pengumuman
    : filterPenting === 'penting'
      ? pengumuman.filter(p => p.penting)
      : pengumuman.filter(p => !p.penting)

  return (
    <div className="min-h-screen pt-20" style={{ background: '#F8FAFC' }}>
      <div className="py-14 px-4" style={{ background: '#1E3A5F' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff' }}>
              Informasi Resmi
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 mt-2">Pengumuman</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>Informasi dan pemberitahuan resmi Rayon Wikrama 2</p>
          </motion.div>

          {!loading && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {[
                { value: 'semua', label: 'Semua' },
                { value: 'penting', label: 'Penting' },
                { value: 'biasa', label: 'Biasa' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilterPenting(opt.value)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={filterPenting === opt.value
                    ? { background: '#FFFFFF', color: '#1E3A5F', fontWeight: 600 }
                    : { background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.18)' }
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1E3A5F', borderTopColor: 'transparent' }} />
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="mb-4"
              >
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer"
                  style={{
                    background: '#FFFFFF',
                    border: item.penting ? '1.5px solid #DC2626' : '1px solid #E2E8F0',
                    boxShadow: expandedId === item.id
                      ? '0 4px 20px rgba(0,0,0,0.08)'
                      : '0 1px 3px rgba(0,0,0,0.06)',
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
                        <h3 className="font-bold text-base" style={{ color: '#0F172A' }}>{item.judul}</h3>
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
                            <div className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                              {item.konten.split('\n').map((par, i) => (
                                <p key={i} className="mb-2 last:mb-0">{par}</p>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-medium" style={{ color: '#94A3B8' }}>Tidak ada pengumuman</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PengumumanPage
