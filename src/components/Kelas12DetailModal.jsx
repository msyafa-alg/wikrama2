import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, User, MapPin, Mail, Phone, Hash, CalendarDays,
  Award, Briefcase, BookOpen, Star, ChevronRight,
  ZoomIn, ChevronLeft
} from 'lucide-react'

// Tab component
const Tab = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
      active
        ? 'text-white shadow-md'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    }`}
    style={active ? { background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' } : {}}
  >
    {children}
  </button>
)

// Certificate viewer modal
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
      <div className="mt-3 text-center">
        <p className="text-white font-semibold">{cert.nama}</p>
        <p className="text-sky-300 text-sm">{cert.penerbit} · {cert.tahun}</p>
      </div>
      <button
        onClick={onClose}
        className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  </motion.div>
)

const Kelas12DetailModal = ({ siswa, onClose }) => {
  const [activeTab, setActiveTab] = useState('tentang')
  const [certModal, setCertModal] = useState(null)

  if (!siswa) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative shrink-0" style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #0a3660 100%)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(circle at 80% 50%, #38bdf8, transparent)' }} />

            <div className="relative z-10 p-6 flex items-center gap-5">
              <div className="relative shrink-0">
                <img
                  src={siswa.foto}
                  alt={siswa.nama}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-xl"
                />
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-green-400 border-2 border-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-white truncate">{siswa.nama}</h2>
                <p className="text-sky-300 text-sm font-medium">{siswa.rombel}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {siswa.keahlian?.slice(0, 3).map((k) => (
                    <span key={k} className="px-2 py-0.5 rounded-lg text-xs text-white font-medium"
                      style={{ background: 'rgba(56,189,248,0.25)', border: '1px solid rgba(56,189,248,0.4)' }}>
                      {k}
                    </span>
                  ))}
                  {siswa.keahlian?.length > 3 && (
                    <span className="px-2 py-0.5 rounded-lg text-xs text-sky-200"
                      style={{ background: 'rgba(255,255,255,0.1)' }}>
                      +{siswa.keahlian.length - 3} lainnya
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                className="shrink-0 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="relative z-10 px-6 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
              {[
                { key: 'tentang', label: 'Tentang' },
                { key: 'cv', label: 'CV / Riwayat' },
                { key: 'sertifikat', label: `Sertifikat (${siswa.sertifikat?.length || 0})` },
              ].map((t) => (
                <Tab key={t.key} active={activeTab === t.key} onClick={() => setActiveTab(t.key)}>
                  {t.label}
                </Tab>
              ))}
            </div>
          </div>

          {/* Body - scrollable */}
          <div className="overflow-y-auto flex-1">
            <AnimatePresence mode="wait">
              {/* ── TAB: TENTANG ── */}
              {activeTab === 'tentang' && (
                <motion.div
                  key="tentang"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 space-y-5"
                >
                  {/* Bio */}
                  <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-[#0F4C81]" strokeWidth={2} />
                      <p className="text-xs font-semibold text-[#0F4C81] uppercase tracking-wide">Tentang Saya</p>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{siswa.tentang}</p>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: CalendarDays, label: 'Tanggal Lahir', value: siswa.ttl },
                      { icon: Hash, label: 'NISN', value: siswa.nisn },
                      { icon: MapPin, label: 'Alamat', value: siswa.alamat },
                      { icon: Mail, label: 'Email', value: siswa.email },
                      { icon: Phone, label: 'No. HP', value: siswa.no_hp },
                      { icon: BookOpen, label: 'Kelas', value: siswa.rombel },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(15,76,129,0.08)' }}>
                          <item.icon className="w-4 h-4 text-[#0F4C81]" strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                          <p className="text-gray-800 text-sm font-medium truncate">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Keahlian */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-[#0F4C81]" strokeWidth={2} />
                      <p className="text-sm font-semibold text-gray-800">Keahlian</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {siswa.keahlian?.map((k) => (
                        <span key={k}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0F4C81] border"
                          style={{ background: 'rgba(15,76,129,0.06)', borderColor: 'rgba(15,76,129,0.15)' }}>
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── TAB: CV ── */}
              {activeTab === 'cv' && (
                <motion.div
                  key="cv"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 space-y-5"
                >
                  {/* Pendidikan */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-[#0F4C81]" strokeWidth={2} />
                      <p className="text-sm font-semibold text-gray-800">Pendidikan</p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <p className="text-gray-700 text-sm">{siswa.cv?.pendidikan}</p>
                    </div>
                  </div>

                  {/* Pengalaman */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="w-4 h-4 text-[#0F4C81]" strokeWidth={2} />
                      <p className="text-sm font-semibold text-gray-800">Pengalaman</p>
                    </div>
                    <div className="space-y-3">
                      {siswa.cv?.pengalaman?.map((p, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                            style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }} />
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{p.posisi}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{p.tempat} · {p.periode}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Organisasi */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-[#0F4C81]" strokeWidth={2} />
                      <p className="text-sm font-semibold text-gray-800">Organisasi</p>
                    </div>
                    <div className="space-y-2">
                      {siswa.cv?.organisasi?.map((o, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <ChevronRight className="w-4 h-4 text-sky-500 shrink-0" strokeWidth={2} />
                          <p className="text-gray-700 text-sm">{o}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prestasi */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-[#0F4C81]" strokeWidth={2} />
                      <p className="text-sm font-semibold text-gray-800">Prestasi</p>
                    </div>
                    <div className="space-y-2">
                      {siswa.cv?.prestasi?.map((p, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border"
                          style={{ background: 'rgba(15,76,129,0.04)', borderColor: 'rgba(15,76,129,0.12)' }}>
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
                            <span className="text-white text-xs font-bold">{i + 1}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── TAB: SERTIFIKAT ── */}
              {activeTab === 'sertifikat' && (
                <motion.div
                  key="sertifikat"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  {siswa.sertifikat?.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                      <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">Belum ada sertifikat</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {siswa.sertifikat?.map((cert) => (
                      <motion.div
                        key={cert.id}
                        whileHover={{ y: -4 }}
                        onClick={() => setCertModal(cert)}
                        className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-36 overflow-hidden bg-gray-100">
                          <img
                            src={cert.gambar}
                            alt={cert.nama}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                            style={{ background: 'rgba(15,76,129,0.5)', backdropFilter: 'blur(2px)' }}>
                            <div className="text-white text-center">
                              <ZoomIn className="w-7 h-7 mx-auto mb-1" strokeWidth={1.8} />
                              <p className="text-xs font-medium">Lihat Sertifikat</p>
                            </div>
                          </div>
                          {/* Year badge */}
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-lg text-xs font-bold text-white shadow"
                            style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
                            {cert.tahun}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="p-3">
                          <p className="font-semibold text-gray-800 text-xs leading-snug line-clamp-2 mb-1">
                            {cert.nama}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <Award className="w-3 h-3 text-sky-500 shrink-0" strokeWidth={2} />
                            <p className="text-gray-400 text-xs truncate">{cert.penerbit}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Certificate zoom modal */}
      <AnimatePresence>
        {certModal && (
          <CertModal cert={certModal} onClose={() => setCertModal(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default Kelas12DetailModal
