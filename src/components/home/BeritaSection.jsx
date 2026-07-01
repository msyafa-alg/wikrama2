import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const BeritaSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [berita, setBerita] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('berita').select('*').order('tanggal', { ascending: false }).limit(3)
      setBerita(data || [])
    }
    fetch()
  }, [])

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-navy mb-3">Informasi Terbaru</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3" style={{ color: '#0F172A' }}>Berita Rayon</h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: '#64748B' }}>
            Kabar dan kegiatan terbaru dari Wikrama 2
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {berita.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/berita/${item.slug}`} className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={item.gambar || '/favicon.png'} alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold shadow"
                      style={{ background: '#F59E0B', color: '#0F172A' }}>
                      {item.kategori}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: '#94A3B8' }}>
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="font-bold text-sm leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[#1E3A5F]" style={{ color: '#0F172A' }}>
                    {item.judul}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link to="/berita"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:gap-3"
            style={{ background: '#1E3A5F', color: '#FFFFFF' }}>
            Lihat Semua Berita
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default BeritaSection
