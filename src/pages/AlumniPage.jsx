import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import alumniData from '../data/alumni.json'

const AlumniPage = () => {
  const { tahun } = useParams()
  const [selected, setSelected] = useState(null)

  const key = `alumni${tahun}`
  const alumni = alumniData[key] || []

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="py-14 px-4" style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #0a3660 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-sky-300 mb-3"
              style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)' }}>
              Alumni Wikrama 2
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Foto Alumni {tahun}</h1>
            <p className="text-blue-200">{alumni.length} alumni angkatan {tahun}</p>
          </motion.div>

          <div className="flex justify-center gap-3 mt-8">
            {['2025', '2024'].map((y) => (
              <Link
                key={y}
                to={`/alumni/${y}`}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  tahun === y ? 'bg-white text-[#0F4C81] shadow-lg' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                Alumni {y}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {alumni.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
              onClick={() => setSelected(item)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(15,76,129,0.6)', backdropFilter: 'blur(2px)' }}>
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <p className="font-semibold text-gray-800 text-sm truncate">{item.nama}</p>
                  <p className="text-sky-600 text-xs mt-0.5">Angkatan {item.angkatan}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img src={selected.foto} alt={selected.nama} className="w-full h-64 object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,76,129,0.8), transparent 60%)' }} />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{selected.nama}</h3>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4"
                  style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
                  Angkatan {selected.angkatan}
                </span>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 font-medium mb-1">Aktivitas Sekarang</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{selected.aktivitas}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AlumniPage
