import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, MapPin, Mail, Phone, Hash, CalendarDays,
  BookOpen, Briefcase, Award, Star, ChevronRight,
  ZoomIn, User, X, GraduationCap
} from 'lucide-react'
import kelas12DetailData from '../data/kelas12detail.json'
import studentsData from '../data/students.json'

const kelasLabels = {
  kelas10: 'Kelas 10',
  kelas11: 'Kelas 11',
  kelas12: 'Kelas 12',
}

const cardStyle = { background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)' }

const CertModal = ({ cert, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.85 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.85 }}
      className="relative w-full max-w-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={cert.gambar} alt={cert.nama} className="w-full rounded-2xl shadow-2xl" />
      <div className="mt-3 text-center px-2">
        <p className="text-white font-semibold text-sm sm:text-base">{cert.nama}</p>
        <p className="text-xs sm:text-sm mt-1" style={{ color: '#38bdf8' }}>{cert.penerbit} · {cert.tahun}</p>
      </div>
      <button onClick={onClose}
        className="absolute -top-3 -right-3 w-9 h-9 rounded-full text-white flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  </motion.div>
)

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: 'linear-gradient(135deg, #1E3A5F, #38bdf8)' }}>
      <Icon className="w-4 h-4 text-white" strokeWidth={2} />
    </div>
    <h2 className="text-base sm:text-lg font-bold text-white">{title}</h2>
  </div>
)

const SiswaDetailPage = () => {
  const { kelas, id } = useParams()
  const navigate = useNavigate()
  const [certModal, setCertModal] = useState(null)

  const basicData = (studentsData[kelas] || []).find((s) => s.id === parseInt(id))
  const detailData = kelas === 'kelas12' ? kelas12DetailData.find((s) => s.id === parseInt(id)) : null
  const siswa = detailData ? { ...basicData, ...detailData } : basicData

  if (!siswa) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: '#0F172A' }}>
        <div className="text-center">
          <p className="text-lg font-medium mb-4" style={{ color: '#CBD5E1' }}>Siswa tidak ditemukan</p>
          <Link to={`/murid/${kelas}`} className="font-semibold hover:underline" style={{ color: '#38bdf8' }}>
            ← Kembali ke Daftar {kelasLabels[kelas] || 'Murid'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen pt-16" style={{ background: '#0F172A' }}>

        {/* ── HERO ── */}
        <div className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #38bdf8, transparent)', transform: 'translate(30%,-30%)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-8 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #1E3A5F, transparent)', transform: 'translate(-30%,30%)' }} />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
            {/* Back */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(`/murid/${kelas}`)}
              className="flex items-center gap-2 text-sm font-medium mb-6 transition-colors group hover:text-white"
              style={{ color: '#38bdf8' }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
              Kembali ke Daftar {kelasLabels[kelas] || 'Murid'}
            </motion.button>

            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6"
            >
              {/* Photo */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                  style={{ border: '2px solid rgba(56,189,248,0.3)' }}>
                  <img src={siswa.foto} alt={siswa.nama} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-green-400 shadow"
                  style={{ border: '3px solid #0F172A' }} />
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)', color: '#38bdf8' }}>
                    {siswa.rombel}
                  </span>
                  {siswa.nisn && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                      NISN {siswa.nisn}
                    </span>
                  )}
                  {siswa.isDevWeb && (
                    <span className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black text-white shadow-xl overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7)' }}>
                      <span className="absolute inset-0 rounded-full blur-sm opacity-50"
                        style={{ background: 'linear-gradient(135deg, #4f46e5, #a855f7)' }} />
                      <span className="absolute inset-0 -translate-x-full"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', animation: 'shimmer 2.5s infinite' }} />
                      <span className="relative z-10 flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <span className="tracking-widest uppercase text-[10px]">Web Developer</span>
                      </span>
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white mb-1 leading-tight">{siswa.nama}</h1>
                <p className="text-xs sm:text-sm mb-3" style={{ color: '#CBD5E1' }}>SMK Wikrama Bogor · Wikrama 2</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {siswa.keahlian?.map((k) => (
                    <span key={k} className="px-2.5 py-1 rounded-xl text-xs font-medium text-white"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini stats */}
              <div className="flex sm:flex-col gap-3 shrink-0">
                {[
                  { val: siswa.sertifikat?.length ?? '-', label: 'Sertifikat' },
                  { val: siswa.cv?.pengalaman?.length ?? '-', label: 'Pengalaman' },
                ].map((s, i) => (
                  <div key={i} className="text-center px-4 py-2.5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p className="text-xl sm:text-2xl font-black text-white">{s.val}</p>
                    <p className="text-xs font-medium" style={{ color: '#38bdf8' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">

          {/* Tentang + Info Pribadi */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="lg:col-span-2 rounded-2xl sm:rounded-3xl p-5 sm:p-7"
              style={cardStyle}
            >
              <SectionTitle icon={User} title="Tentang Saya" />
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#CBD5E1' }}>{siswa.tentang || 'Tidak ada informasi.'}</p>
              {siswa.keahlian && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#CBD5E1' }}>Keahlian</p>
                  <div className="flex flex-wrap gap-2">
                    {siswa.keahlian?.map((k) => (
                      <span key={k} className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold"
                        style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', color: '#38bdf8' }}>
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-7"
              style={cardStyle}
            >
              <SectionTitle icon={Hash} title="Info Pribadi" />
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: CalendarDays, label: 'Tgl. Lahir', value: siswa.ttl },
                  { icon: MapPin, label: 'Alamat', value: siswa.alamat },
                  { icon: Mail, label: 'Email', value: siswa.email },
                  { icon: Phone, label: 'No. HP', value: siswa.no_hp },
                  { icon: BookOpen, label: 'Kelas', value: siswa.rombel },
                ].filter(item => item.value).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(56,189,248,0.1)' }}>
                      <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: '#38bdf8' }} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs" style={{ color: '#CBD5E1' }}>{item.label}</p>
                      <p className="text-xs sm:text-sm font-medium text-white break-words">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CV */}
          {(siswa.cv || siswa.sertifikat) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="lg:col-span-2 space-y-5 sm:space-y-6"
            >
              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={cardStyle}>
                <SectionTitle icon={GraduationCap} title="Pendidikan" />
                <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl"
                  style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)' }}>
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: '#38bdf8' }} />
                  <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>{siswa.cv?.pendidikan}</p>
                </div>
              </div>

              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={cardStyle}>
                <SectionTitle icon={Briefcase} title="Pengalaman" />
                <div className="space-y-3">
                  {siswa.cv?.pengalaman?.map((p, i) => (
                    <div key={i} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl"
                      style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-sm"
                        style={{ background: 'linear-gradient(135deg, #1E3A5F, #38bdf8)' }}>
                        {i + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white text-sm">{p.posisi}</p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: '#CBD5E1' }}>{p.tempat}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-lg text-xs font-medium"
                          style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8' }}>
                          {p.periode}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="space-y-5 sm:space-y-6"
            >
              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={cardStyle}>
                <SectionTitle icon={User} title="Organisasi" />
                <div className="space-y-2">
                  {siswa.cv?.organisasi?.map((o, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl"
                      style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <ChevronRight className="w-4 h-4 shrink-0" style={{ color: '#38bdf8' }} strokeWidth={2.5} />
                      <p className="text-xs sm:text-sm" style={{ color: '#CBD5E1' }}>{o}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={cardStyle}>
                <SectionTitle icon={Award} title="Prestasi" />
                <div className="space-y-2">
                  {siswa.cv?.prestasi?.map((p, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl"
                      style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.12)' }}>
                      <Star className="w-4 h-4 shrink-0 mt-0.5 text-yellow-400" strokeWidth={2} fill="#facc15" />
                      <p className="text-xs sm:text-sm leading-snug" style={{ color: '#CBD5E1' }}>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          )}

          {/* Sertifikat */}
          {siswa.sertifikat?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="rounded-2xl sm:rounded-3xl p-5 sm:p-7"
            style={cardStyle}
          >
            <SectionTitle icon={Award} title={`Sertifikat (${siswa.sertifikat?.length})`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {siswa.sertifikat?.map((cert) => (
                <motion.div
                  key={cert.id}
                  whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}
                  onClick={() => setCertModal(cert)}
                  className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="relative h-36 sm:h-44 overflow-hidden">
                    <img src={cert.gambar} alt={cert.nama}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(3px)' }}>
                      <ZoomIn className="w-7 h-7 text-white" strokeWidth={1.8} />
                      <p className="text-white text-xs font-semibold">Lihat Sertifikat</p>
                    </div>
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-lg text-xs font-bold text-white shadow"
                      style={{ background: 'linear-gradient(135deg, #1E3A5F, #38bdf8)' }}>
                      {cert.tahun}
                    </span>
                  </div>
                  <div className="p-3 sm:p-4">
                    <p className="font-semibold text-white text-xs sm:text-sm leading-snug line-clamp-2 mb-2">{cert.nama}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg, #1E3A5F, #38bdf8)' }}>
                        <Award className="w-3 h-3 text-white" strokeWidth={2} />
                      </div>
                      <p className="text-xs truncate" style={{ color: '#CBD5E1' }}>{cert.penerbit}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          )}

        </div>
      </div>

      <AnimatePresence>
        {certModal && <CertModal cert={certModal} onClose={() => setCertModal(null)} />}
      </AnimatePresence>
    </>
  )
}

export default SiswaDetailPage
