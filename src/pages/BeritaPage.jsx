import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

const BeritaPage = () => {
  const [berita, setBerita] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Semua')

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('berita').select('*').order('tanggal', { ascending: false })
      setBerita(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  const categories = ['Semua', ...new Set(berita.map(b => b.kategori))]

  const filtered = activeCategory === 'Semua'
    ? berita
    : berita.filter(b => b.kategori === activeCategory)

  return (
    <div className="min-h-screen pt-20" style={{ background: '#FFFFFF' }}>
      <div className="py-14 px-4" style={{ background: '#1E3A5F' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff' }}>
              Informasi Terkini
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 mt-2">Berita Rayon</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>Kabar dan informasi terbaru dari Wikrama 2</p>
          </motion.div>

          {!loading && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={activeCategory === cat
                    ? { background: '#FFFFFF', color: '#1E3A5F', fontWeight: 600 }
                    : { background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.18)' }
                  }
                  onMouseEnter={e => { if (activeCategory !== cat) e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
                  onMouseLeave={e => { if (activeCategory !== cat) e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1E3A5F', borderTopColor: 'transparent' }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to={`/berita/${item.slug}`} className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={item.gambar || '/favicon.png'} alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold shadow"
                        style={{ background: '#F59E0B', color: '#0F172A' }}>
                        {item.kategori}
                      </span>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(30,58,95,0.75), transparent)' }} />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs mb-3" style={{ color: '#94A3B8' }}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {item.penulis}
                      </span>
                    </div>
                    <h2 className="font-bold text-base mb-2 leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[#1E3A5F]" style={{ color: '#0F172A' }}>
                      {item.judul}
                    </h2>
                    <p className="text-sm leading-relaxed line-clamp-3" style={{ color: '#64748B' }}>
                      {item.konten}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: '#1E3A5F' }}>
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-medium" style={{ color: '#94A3B8' }}>Belum ada berita di kategori ini</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BeritaPage
