import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import alumniData from '../data/alumni.json'

const AlumniPage = () => {
  const { tahun } = useParams()
  const navigate = useNavigate()
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('alumni')
        .select('*')
        .eq('angkatan', tahun)
        .order('nama')
      if (data && data.length > 0) {
        setAlumni(data)
      } else {
        const key = `alumni${tahun}`
        setAlumni(alumniData[key] || [])
      }
      setLoading(false)
    }
    fetch()
  }, [tahun])

  return (
    <div className="min-h-screen pt-20" style={{ background: '#FFFFFF' }}>
      {/* Header — biru tua */}
      <div className="py-14 px-4" style={{ background: '#1E3A5F' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff' }}>
              Alumni Wikrama 2
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 mt-2">Foto Alumni {tahun}</h1>
            {!loading && <p style={{ color: 'rgba(255,255,255,0.65)' }}>{alumni.length} alumni angkatan {tahun}</p>}
          </motion.div>

          <div className="flex justify-center gap-3 mt-8">
            {['2026'].map((y) => (
              <Link
                key={y}
                to={`/alumni/${y}`}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                style={tahun === y
                  ? { background: '#FFFFFF', color: '#1E3A5F' }
                  : { background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.18)' }
                }
                onMouseEnter={e => { if (tahun !== y) e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
                onMouseLeave={e => { if (tahun !== y) e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              >
                Alumni {y}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1E3A5F', borderTopColor: 'transparent' }} />
          </div>
        ) : alumni.length === 0 ? (
          <div className="text-center py-20">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16" style={{ color: '#CBD5E1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="font-medium" style={{ color: '#94A3B8' }}>Belum ada data alumni angkatan {tahun}</p>
            <p className="text-sm mt-1" style={{ color: '#CBD5E1' }}>Data akan ditambahkan setelah kelulusan</p>
          </div>
        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {alumni.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -2 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/alumni/${tahun}/${item.id}`)}
            >
              <div className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)'}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(30,58,95,0.62)' }}>
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <p className="font-semibold text-sm truncate" style={{ color: '#0F172A' }}>{item.nama}</p>
                  <p className="text-xs mt-0.5 font-medium" style={{ color: '#1E3A5F' }}>Angkatan {item.angkatan}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </div>
  )
}

export default AlumniPage
