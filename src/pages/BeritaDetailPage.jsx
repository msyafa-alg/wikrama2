import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'

const BeritaDetailPage = () => {
  const { slug } = useParams()
  const [berita, setBerita] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('berita').select('*').eq('slug', slug).single()
      setBerita(data)
      setLoading(false)
    }
    fetch()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: '#FFFFFF' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1E3A5F', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!berita) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center" style={{ background: '#FFFFFF' }}>
        <p className="text-lg font-semibold" style={{ color: '#64748B' }}>Berita tidak ditemukan</p>
        <Link to="/berita" className="mt-4 text-sm font-semibold" style={{ color: '#1E3A5F' }}>Kembali ke daftar berita</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: '#FFFFFF' }}>
      <div className="py-14 px-4" style={{ background: '#1E3A5F' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/berita" className="inline-flex items-center gap-1.5 text-sm font-medium mb-4"
              style={{ color: 'rgba(255,255,255,0.7)' }}>
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Berita
            </Link>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold shadow mb-4"
              style={{ background: '#F59E0B', color: '#0F172A' }}>
              {berita.kategori}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mt-3 leading-tight">{berita.judul}</h1>
            <div className="flex items-center gap-4 mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(berita.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {berita.penulis}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <img src={berita.gambar || '/favicon.png'} alt={berita.judul}
            className="w-full rounded-2xl max-h-[500px] object-cover mb-8 shadow-lg" />

          <div className="prose prose-sm sm:prose-base max-w-none leading-relaxed" style={{ color: '#334155' }}>
            {berita.konten.split('\n').map((par, i) => (
              <p key={i} className="mb-4">{par}</p>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t" style={{ borderColor: '#E2E8F0' }}>
            <Link to="/berita"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2"
              style={{ color: '#1E3A5F' }}>
              <ArrowLeft className="w-4 h-4" />
              Berita Lainnya
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BeritaDetailPage
