import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brush, Recycle, Leaf, Clock } from 'lucide-react'

const JadwalPiketSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const tips = [
    { icon: Brush, text: 'Menjaga kebersihan kelas adalah tanggung jawab bersama seluruh warga rayon.' },
    { icon: Recycle, text: 'Buang sampah pada tempatnya dan pisahkan organik dan anorganik.' },
    { icon: Leaf, text: 'Lingkungan bersih mencerminkan karakter siswa yang disiplin dan bertanggung jawab.' },
    { icon: Clock, text: 'Piket dilaksanakan setiap hari sesuai jadwal yang telah ditentukan.' },
  ]

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-[#0F4C81] mb-3"
            style={{ background: 'rgba(15,76,129,0.08)', border: '1px solid rgba(15,76,129,0.2)' }}>
            Kebersihan Rayon
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Jadwal Piket</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Poster */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://picsum.photos/seed/piket/600/750"
                alt="Jadwal Piket Rayon Wikrama 2"
                className="w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-xl shadow-xl overflow-hidden hidden sm:block">
              <img src="https://picsum.photos/seed/piket2/100/100" alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              Menjaga Kebersihan adalah<br/>
              <span style={{ color: '#0F4C81' }}>Tanggung Jawab Bersama</span>
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Kebersihan lingkungan rayon merupakan cerminan kedisiplinan dan rasa tanggung jawab seluruh warga Rayon Wikrama 2. Setiap siswa wajib menjaga kebersihan kelas dan lingkungan sekolah.
            </p>

            <div className="space-y-3">
              {tips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(15,76,129,0.08)' }}>
                    <tip.icon className="w-5 h-5 text-[#0F4C81]" strokeWidth={1.8} />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default JadwalPiketSection
