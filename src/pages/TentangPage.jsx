import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollText, Rocket, Star, GraduationCap, Building2 } from 'lucide-react'

const TentangPage = () => {
  const [zoomed, setZoomed] = useState(false)

  const visi = 'Menjadi rayon unggulan yang mencetak generasi berkarakter, berprestasi, dan berdaya saing tinggi dalam era global.'

  const misi = [
    'Menumbuhkan sikap disiplin, bertanggung jawab, dan berintegritas pada setiap siswa.',
    'Mendorong kreativitas dan inovasi melalui berbagai kegiatan akademik dan non-akademik.',
    'Membangun kebersamaan dan rasa kekeluargaan antar warga rayon.',
    'Menciptakan lingkungan belajar yang kondusif, bersih, dan nyaman.',
    'Mengembangkan potensi siswa secara optimal untuk meraih prestasi terbaik.',
  ]

  const sejarah = `Rayon Wikrama 2 didirikan sebagai bagian dari struktur organisasi SMK Wikrama Bogor dengan tujuan memberikan wadah pembinaan yang lebih terstruktur dan personal bagi setiap siswa. Sejak berdirinya, Wikrama 2 telah berkembang menjadi salah satu rayon yang paling aktif dan berprestasi di lingkungan sekolah.

Dengan semangat kebersamaan dan jiwa kompetitif yang sehat, rayon ini telah melahirkan banyak alumni yang sukses di berbagai bidang, baik dalam dunia kerja maupun pendidikan tinggi. Wikrama 2 terus berkomitmen untuk menjadi tempat terbaik bagi siswa untuk tumbuh dan berkembang.`

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="py-14 px-4" style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #0a3660 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-sky-300 mb-3"
              style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)' }}>
              Profil Rayon
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Tentang Wikrama 2</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-14">
        {/* Sejarah */}
        <motion.section variants={container} initial="hidden" animate="show">
          <motion.h2 variants={item} className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
              <ScrollText className="w-4 h-4" strokeWidth={2} />
            </span>
            Sejarah Rayon Wikrama 2
          </motion.h2>
          <motion.div variants={item} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
            {sejarah.split('\n\n').map((para, i) => (
              <p key={i} className={`text-gray-600 leading-relaxed ${i > 0 ? 'mt-4' : ''}`}>{para}</p>
            ))}
          </motion.div>
        </motion.section>

        {/* Visi Misi Motto */}
        <motion.section
          variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Visi */}
          <motion.div variants={item} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 col-span-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(15,76,129,0.08)' }}>
              <Rocket className="w-5 h-5 text-[#0F4C81]" strokeWidth={1.8} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-3">Visi</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{visi}</p>
          </motion.div>

          {/* Misi */}
          <motion.div variants={item} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(15,76,129,0.08)' }}>
              <Star className="w-5 h-5 text-[#0F4C81]" strokeWidth={1.8} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-3">Misi</h3>
            <ul className="space-y-2">
              {misi.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
                    {i + 1}
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Motto */}
          <motion.div variants={item}
            className="lg:col-span-3 rounded-2xl p-8 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0F4C81, #0a3660)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(circle at 50% 50%, #38bdf8, transparent)' }} />
            <div className="relative z-10">
              <div className="flex justify-center mb-3">
                <Star className="w-10 h-10 text-yellow-400" strokeWidth={1.5} fill="#facc15" />
              </div>
              <p className="text-sky-300 text-sm font-medium mb-2">Motto Kami</p>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                "Disiplin, Bersatu, Berprestasi"
              </h3>
            </div>
          </motion.div>
        </motion.section>

        {/* Pembimbing */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
              <GraduationCap className="w-4 h-4" strokeWidth={2} />
            </span>
            Pembimbing Rayon
          </h2>
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
            <img
              src="https://i.pravatar.cc/200?img=12"
              alt="Rizky Kurniawan"
              className="w-28 h-28 rounded-2xl object-cover shadow-lg ring-4 ring-sky-100"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Rizky Kurniawan S.Pd</h3>
              <p className="text-[#0F4C81] font-medium mb-3">Pembimbing Rayon Wikrama 2</p>
              <blockquote className="text-gray-600 text-sm italic leading-relaxed border-l-4 border-sky-300 pl-4">
                "Mendidik bukan hanya mengajar, tetapi membentuk karakter untuk masa depan."
              </blockquote>
            </div>
          </div>
        </motion.section>

        {/* Struktur */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
              <Building2 className="w-4 h-4" strokeWidth={2} />
            </span>
            Struktur Organisasi
          </h2>
          <div className="relative group cursor-zoom-in rounded-2xl overflow-hidden shadow-xl border border-gray-100"
            onClick={() => setZoomed(true)}>
            <img
              src="https://picsum.photos/seed/struktur/1200/700"
              alt="Struktur Organisasi"
              className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              style={{ background: 'rgba(15,76,129,0.3)', backdropFilter: 'blur(4px)' }}>
              <p className="text-white font-medium">Klik untuk perbesar</p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Zoom modal */}
      {zoomed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src="https://picsum.photos/seed/struktur/1200/700"
            alt="Struktur Organisasi"
            className="max-w-full max-h-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={() => setZoomed(false)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default TentangPage
