import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import prestasiData from '../../data/prestasi.json'

const PrestasiSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-navy mb-3">Kebanggaan Kami</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3" style={{ color: '#0F172A' }}>Prestasi Rayon</h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: '#64748B' }}>
            Berbagai pencapaian yang telah diraih oleh siswa-siswi Wikrama 2
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prestasiData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              className="group rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.foto}
                  alt={item.nama}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Year badge — kuning */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold shadow"
                    style={{ background: '#F59E0B', color: '#0F172A' }}>
                    {item.tahun}
                  </span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(30,58,95,0.75), transparent)' }} />
              </div>

              <div className="p-5">
                <h3
                  className="font-bold text-base mb-2 leading-snug line-clamp-2 transition-colors duration-200"
                  style={{ color: '#0F172A' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1E3A5F'}
                  onMouseLeave={e => e.currentTarget.style.color = '#0F172A'}
                >
                  {item.nama}
                </h3>
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: '#64748B' }}>{item.deskripsi}</p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#1E3A5F' }}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium" style={{ color: '#94A3B8' }}>Rayon Wikrama 2</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PrestasiSection
