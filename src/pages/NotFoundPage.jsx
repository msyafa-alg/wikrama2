import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FFFFFF' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <span className="text-4xl font-black" style={{ color: '#1E3A5F' }}>404</span>
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#0F172A' }}>Halaman Tidak Ditemukan</h1>
        <p className="text-sm mb-6" style={{ color: '#94A3B8' }}>
          Halaman yang kamu cari mungkin sudah dipindah atau tidak tersedia.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
          style={{ background: '#1E3A5F' }}
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFoundPage
