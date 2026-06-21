import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import galleryData from '../data/gallery.json'

const categories = ['Semua', 'Kegiatan', 'Kebersamaan', 'Lomba', 'Dokumentasi']

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [selectedImg, setSelectedImg] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const filtered = activeCategory === 'Semua'
    ? galleryData
    : galleryData.filter((g) => g.kategori === activeCategory)

  const openModal = (item, index) => {
    setSelectedImg(item)
    setSelectedIndex(index)
  }

  const goNext = (e) => {
    e.stopPropagation()
    const nextIndex = (selectedIndex + 1) % filtered.length
    setSelectedImg(filtered[nextIndex])
    setSelectedIndex(nextIndex)
  }

  const goPrev = (e) => {
    e.stopPropagation()
    const prevIndex = (selectedIndex - 1 + filtered.length) % filtered.length
    setSelectedImg(filtered[prevIndex])
    setSelectedIndex(prevIndex)
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: '#FFFFFF' }}>
      {/* Header — biru tua */}
      <div className="py-14 px-4" style={{ background: '#1E3A5F' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff' }}>
              Foto &amp; Dokumentasi
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 mt-2">Gallery Wikrama 2</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>Momen berharga perjalanan kami</p>
          </motion.div>

          {/* Category filter in header */}
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
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="masonry-grid">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="masonry-item group cursor-pointer"
              onClick={() => openModal(item, i)}
            >
              <div className="relative rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'}
              >
                <img
                  src={item.foto}
                  alt={item.judul}
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-start p-3"
                  style={{ background: 'rgba(30,58,95,0.72)' }}>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: '#F59E0B', color: '#0F172A' }}>{item.kategori}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(30,58,95,0.85), transparent)' }}>
                  <p className="text-white text-xs font-medium">{item.judul}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal with nav */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.foto}
                alt={selectedImg.judul}
                className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain"
              />

              <div className="mt-3 flex items-center justify-between px-2">
                <div>
                  <p className="text-white font-semibold">{selectedImg.judul}</p>
                  <span className="text-sm font-medium" style={{ color: '#F59E0B' }}>{selectedImg.kategori}</span>
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {selectedIndex + 1} / {filtered.length}
                </span>
              </div>

              <button onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.12)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.12)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button onClick={() => setSelectedImg(null)}
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GalleryPage
