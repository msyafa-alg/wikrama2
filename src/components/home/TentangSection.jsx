import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Users, ShieldCheck, Award } from 'lucide-react'

const carouselImages = [
  { src: 'https://picsum.photos/seed/rayon1/600/400', caption: 'Kegiatan Belajar Mengajar' },
  { src: 'https://picsum.photos/seed/rayon2/600/400', caption: 'Upacara Bendera' },
  { src: 'https://picsum.photos/seed/rayon3/600/400', caption: 'Lomba Antar Rayon' },
  { src: 'https://picsum.photos/seed/rayon4/600/400', caption: 'Outbound Bersama' },
]

const TentangSection = () => {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const features = [
    { icon: Target, label: 'Kedisiplinan' },
    { icon: Users, label: 'Kebersamaan' },
    { icon: ShieldCheck, label: 'Tanggung Jawab' },
    { icon: Award, label: 'Prestasi' },
  ]

  return (
    <section ref={ref} id="tentang" className="py-20 px-4" style={{ background: '#0F172A' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3"
            style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', color: '#38bdf8' }}>
            Mengenal Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Tentang Rayon</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              {carouselImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{ opacity: i === current ? 1 : 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.85), transparent)' }}>
                    <p className="text-white text-sm font-medium">{img.caption}</p>
                  </div>
                </motion.div>
              ))}
              <div className="absolute bottom-12 right-4 flex gap-1.5">
                {carouselImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-sky-400' : 'w-1.5 bg-white/30'}`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl shadow-xl overflow-hidden hidden sm:block"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="https://picsum.photos/seed/rayon5/200/200" alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Rayon Wikrama 2 –<br/>
              <span style={{ color: '#38bdf8' }}>Keluarga Besar yang Berprestasi</span>
            </h3>

            <p className="leading-relaxed text-base sm:text-lg" style={{ color: '#CBD5E1' }}>
              Rayon Wikrama 2 merupakan keluarga besar siswa yang menjunjung tinggi kedisiplinan, kebersamaan, tanggung jawab, dan prestasi. Menjadi tempat berkembangnya karakter serta wadah untuk saling mendukung dalam perjalanan belajar di SMK Wikrama Bogor.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300"
                  style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(56,189,248,0.1)' }}>
                    <f.icon className="w-5 h-5" style={{ color: '#38bdf8' }} strokeWidth={1.8} />
                  </div>
                  <span className="font-medium text-sm text-white">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TentangSection
