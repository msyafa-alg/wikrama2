import { motion } from 'framer-motion'
import { ScrollText, Rocket, Star, GraduationCap, Quote } from 'lucide-react'

const TentangPage = () => {
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

  const cardStyle = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: '#FFFFFF' }}>
      {/* Header — biru tua */}
      <div className="py-14 px-4" style={{ background: '#1E3A5F' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff' }}>
              Profil Rayon
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">Tentang Wikrama 2</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-14">
        {/* Sejarah */}
        <motion.section variants={container} initial="hidden" animate="show">
          <motion.h2 variants={item} className="text-2xl font-bold mb-5 flex items-center gap-3" style={{ color: '#0F172A' }}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ background: '#1E3A5F' }}>
              <ScrollText className="w-4 h-4" strokeWidth={2} />
            </span>
            Sejarah Rayon Wikrama 2
          </motion.h2>
          <motion.div variants={item} className="rounded-2xl p-7" style={cardStyle}>
            {sejarah.split('\n\n').map((para, i) => (
              <p key={i} className={`leading-relaxed ${i > 0 ? 'mt-4' : ''}`} style={{ color: '#64748B' }}>{para}</p>
            ))}
          </motion.div>
        </motion.section>

        {/* Visi Misi Motto */}
        <motion.section
          variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Visi */}
          <motion.div variants={item} className="rounded-2xl p-6 col-span-1" style={cardStyle}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(30,58,95,0.08)' }}>
              <Rocket className="w-5 h-5" style={{ color: '#1E3A5F' }} strokeWidth={1.8} />
            </div>
            <h3 className="font-bold text-lg mb-3" style={{ color: '#0F172A' }}>Visi</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{visi}</p>
          </motion.div>

          {/* Misi */}
          <motion.div variants={item} className="rounded-2xl p-6 lg:col-span-2" style={cardStyle}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(30,58,95,0.08)' }}>
              <Star className="w-5 h-5" style={{ color: '#1E3A5F' }} strokeWidth={1.8} />
            </div>
            <h3 className="font-bold text-lg mb-3" style={{ color: '#0F172A' }}>Misi</h3>
            <ul className="space-y-2">
              {misi.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#64748B' }}>
                  <span className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: '#1E3A5F' }}>
                    {i + 1}
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Motto — bg biru tua */}
          <motion.div variants={item}
            className="lg:col-span-3 rounded-2xl p-8 text-center"
            style={{ background: '#1E3A5F' }}>
            <div className="flex justify-center mb-3">
              <Star className="w-10 h-10" style={{ color: '#F59E0B' }} strokeWidth={1.5} fill="#F59E0B" />
            </div>
            <p className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Motto Kami
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              "Disiplin, Bersatu, Berprestasi"
            </h3>
          </motion.div>
        </motion.section>

        {/* Pembimbing */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3" style={{ color: '#0F172A' }}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ background: '#1E3A5F' }}>
              <GraduationCap className="w-4 h-4" strokeWidth={2} />
            </span>
            Pembimbing Rayon
          </h2>
          <div className="rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
            style={{
              background: '#1E3A5F',
              border: '1px solid rgba(255,255,255,0.12)',
            }}>
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: '2px solid rgba(245,158,11,0.4)' }}>
                <img
                  src="https://files.catbox.moe/vle4fm.png"
                  alt="Rizky Kurniawan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Rizky Kurniawan</h3>
              <p className="font-semibold mb-4 text-sm sm:text-base" style={{ color: '#F59E0B' }}>
                Pembimbing Rayon Wikrama 2
              </p>
              <div className="flex gap-2">
                <div className="hidden sm:block shrink-0">
                  <Quote className="w-6 h-6 mt-0.5" style={{ color: '#F59E0B' }} strokeWidth={2} />
                </div>
                <p className="text-sm sm:text-base leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  "Mendidik bukan hanya mengajar, tetapi membentuk karakter untuk masa depan."
                </p>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  )
}

export default TentangPage
