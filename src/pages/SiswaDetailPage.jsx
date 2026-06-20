import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, MapPin, Mail, Phone, Hash, CalendarDays,
  BookOpen, Briefcase, Award, Star, ChevronRight,
  ZoomIn, User, X, GraduationCap
} from 'lucide-react'
import kelas12DetailData from '../data/kelas12detail.json'

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
      className="relative max-w-2xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={cert.gambar} alt={cert.nama} className="w-full rounded-2xl shadow-2xl" />
      <div className="mt-4 text-center">
        <p className="text-white font-semibold text-base">{cert.nama}</p>
        <p className="text-sky-300 text-sm mt-1">{cert.penerbit} · {cert.tahun}</p>
      </div>
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  </motion.div>
)

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
      style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
      <Icon className="w-4 h-4 text-white" strokeWidth={2} />
    </div>
    <h2 className="text-lg font-bold text-gray-800">{title}</h2>
  </div>
)

const SiswaDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [certModal, setCertModal] = useState(null)

  const siswa = kelas12DetailData.find((s) => s.id === parseInt(id))

  if (!siswa) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl font-medium mb-4">Siswa tidak ditemukan</p>
          <Link to="/murid/kelas12" className="text-[#0F4C81] font-semibold hover:underline">
            ← Kembali ke Daftar Kelas 12
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16">

        {/* ── HERO BANNER ── */}
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #0a3660 100%)' }}>
          {/* decorative blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #38bdf8, transparent)', transform: 'translate(30%,-30%)' }} />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #0F4C81, transparent)', transform: 'translate(-30%,30%)' }} />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/murid/kelas12')}
              className="flex items-center gap-2 text-sky-300 hover:text-white text-sm font-medium mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
              Kembali ke Daftar Kelas 12
            </motion.button>

            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
            >
              {/* Photo */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden ring-4 shadow-2xl"
                  style={{ ringColor: 'rgba(255,255,255,0.2)' }}>
                  <img
                    src={siswa.foto}
                    alt={siswa.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-400 border-4 border-[#0a3660] shadow" />
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-sky-200"
                    style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)' }}>
                    {siswa.rombel}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    NISN {siswa.nisn}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">{siswa.nama}</h1>
                <p className="text-blue-200 text-sm mb-4">SMK Wikrama Bogor · Wikrama 2</p>

                {/* Skill tags */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {siswa.keahlian?.map((k) => (
                    <span key={k}
                      className="px-3 py-1 rounded-xl text-xs font-medium text-white"
                      style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats mini */}
              <div className="flex sm:flex-col gap-3 shrink-0">
                <div className="text-center px-5 py-3 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <p className="text-2xl font-black text-white">{siswa.sertifikat?.length}</p>
                  <p className="text-sky-300 text-xs font-medium">Sertifikat</p>
                </div>
                <div className="text-center px-5 py-3 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <p className="text-2xl font-black text-white">{siswa.cv?.pengalaman?.length}</p>
                  <p className="text-sky-300 text-xs font-medium">Pengalaman</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

          {/* Row 1: Tentang + Info Pribadi */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tentang */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white rounded-3xl p-7 shadow-sm border border-gray-100"
            >
              <SectionTitle icon={User} title="Tentang Saya" />
              <p className="text-gray-600 leading-relaxed">{siswa.tentang}</p>

              <div className="mt-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Keahlian</p>
                <div className="flex flex-wrap gap-2">
                  {siswa.keahlian?.map((k) => (
                    <span key={k}
                      className="px-3 py-1.5 rounded-xl text-sm font-semibold text-[#0F4C81]"
                      style={{ background: 'rgba(15,76,129,0.07)', border: '1px solid rgba(15,76,129,0.15)' }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Info Pribadi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100"
            >
              <SectionTitle icon={Hash} title="Info Pribadi" />
              <div className="space-y-4">
                {[
                  { icon: CalendarDays, label: 'Tgl. Lahir', value: siswa.ttl },
                  { icon: MapPin, label: 'Alamat', value: siswa.alamat },
                  { icon: Mail, label: 'Email', value: siswa.email },
                  { icon: Phone, label: 'No. HP', value: siswa.no_hp },
                  { icon: BookOpen, label: 'Kelas', value: siswa.rombel },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(15,76,129,0.07)' }}>
                      <item.icon className="w-4 h-4 text-[#0F4C81]" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium text-gray-800 break-words">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Row 2: CV */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pendidikan + Pengalaman */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Pendidikan */}
              <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
                <SectionTitle icon={GraduationCap} title="Pendidikan" />
                <div className="flex items-start gap-4 p-4 rounded-2xl"
                  style={{ background: 'rgba(15,76,129,0.04)', border: '1px solid rgba(15,76,129,0.1)' }}>
                  <div className="w-3 h-3 rounded-full mt-1 shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }} />
                  <p className="text-gray-700 text-sm leading-relaxed">{siswa.cv?.pendidikan}</p>
                </div>
              </div>

              {/* Pengalaman */}
              <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
                <SectionTitle icon={Briefcase} title="Pengalaman" />
                <div className="space-y-3">
                  {siswa.cv?.pengalaman?.map((p, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-sm"
                        style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{p.posisi}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{p.tempat}</p>
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium text-sky-700"
                          style={{ background: 'rgba(14,165,233,0.1)' }}>
                          {p.periode}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Organisasi + Prestasi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Organisasi */}
              <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
                <SectionTitle icon={User} title="Organisasi" />
                <div className="space-y-2">
                  {siswa.cv?.organisasi?.map((o, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <ChevronRight className="w-4 h-4 text-sky-500 shrink-0" strokeWidth={2.5} />
                      <p className="text-gray-700 text-sm">{o}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prestasi */}
              <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
                <SectionTitle icon={Award} title="Prestasi" />
                <div className="space-y-2">
                  {siswa.cv?.prestasi?.map((p, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl border"
                      style={{ background: 'rgba(15,76,129,0.03)', borderColor: 'rgba(15,76,129,0.12)' }}>
                      <Star className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" strokeWidth={2} fill="#facc15" />
                      <p className="text-gray-700 text-sm leading-snug">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 3: Sertifikat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100"
          >
            <SectionTitle icon={Award} title={`Sertifikat (${siswa.sertifikat?.length})`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {siswa.sertifikat?.map((cert) => (
                <motion.div
                  key={cert.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setCertModal(cert)}
                  className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <img
                      src={cert.gambar}
                      alt={cert.nama}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(15,76,129,0.65)', backdropFilter: 'blur(3px)' }}>
                      <ZoomIn className="w-8 h-8 text-white" strokeWidth={1.8} />
                      <p className="text-white text-xs font-semibold">Lihat Sertifikat</p>
                    </div>
                    {/* Year badge */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow"
                      style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
                      {cert.tahun}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 mb-2">{cert.nama}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
                        <Award className="w-3 h-3 text-white" strokeWidth={2} />
                      </div>
                      <p className="text-gray-400 text-xs truncate">{cert.penerbit}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Certificate zoom modal */}
      <AnimatePresence>
        {certModal && (
          <CertModal cert={certModal} onClose={() => setCertModal(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default SiswaDetailPage
