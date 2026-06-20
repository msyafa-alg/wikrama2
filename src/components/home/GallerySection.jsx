import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import galleryData from '../../data/gallery.json'

const categories = ['Semua', 'Kegiatan', 'Kebersamaan', 'Lomba', 'Dokumentasi']

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [selectedImg, setSelectedImg] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filtered = activeCategory === 'Semua'
    ? galleryData
    : galleryData.filter((g) => g.kategori === activeCategory)

  return (
    <section ref={ref} id="gallery" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-[#0F4C81] mb-3"
            style={{ background: 'rgba(15,76,129,0.08)', border: '1px solid rgba(15,76,129,0.2)' }}>
            Foto & Dokumentasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Gallery Rayon</h2>
          <p className="text-gray-500 mt-3">Momen berharga perjalanan Wikrama 2</p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              style={activeCategory === cat ? { background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' } : {}}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="masonry-item group cursor-pointer"
              onClick={() => setSelectedImg(item)}
            >
              <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  src={item.foto}
                  alt={item.judul}
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center"
                  style={{ background: 'rgba(15,76,129,0.7)', backdropFilter: 'blur(2px)' }}>
                  <svg className="w-8 h-8 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-white text-xs font-medium text-center px-2">{item.judul}</p>
                  <span className="mt-1 px-2 py-0.5 rounded-full text-xs text-sky-200 bg-sky-900/40">{item.kategori}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.foto}
                alt={selectedImg.judul}
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{selectedImg.judul}</p>
                  <span className="text-sky-300 text-sm">{selectedImg.kategori}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GallerySection
