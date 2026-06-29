import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, MapPin, Mail, Phone, Hash, CalendarDays,
  BookOpen, Briefcase, Award, Star, ChevronRight,
  ZoomIn, User, X, GraduationCap, Download, Eye, FileText
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import kelas12DetailData from '../data/kelas12detail.json'
import studentsData from '../data/students.json'

const kelasLabels = {
  kelas10: 'Kelas 10',
  kelas11: 'Kelas 11',
  kelas12: 'Kelas 12',
}

const DevWebBadge = () => (
  <div
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white tracking-wide"
    style={{
      background: '#1E3A5F',
      borderLeft: '3px solid #F59E0B',
    }}
  >
    <span style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: '0.7rem' }}>&lt;/&gt;</span>
    <span>Dev Web</span>
  </div>
)

const CreatorBadge = () => (
  <div
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide"
    style={{
      background: 'linear-gradient(135deg, #1E3A5F 0%, #2d5a8e 100%)',
      borderLeft: '3px solid #F59E0B',
      boxShadow: '0 2px 8px rgba(30,58,95,0.3)',
    }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
    <span style={{ color: '#F59E0B' }}>Website Creator</span>
  </div>
)

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
      {cert.gambar ? (
        <img src={cert.gambar} alt={cert.nama} className="w-full rounded-2xl shadow-2xl" />
      ) : cert.file_pdf ? (
        <div className="w-full rounded-2xl shadow-2xl bg-white p-8 sm:p-12 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: '#FEF2F2' }}>
            <FileText className="w-10 h-10" style={{ color: '#DC2626' }} strokeWidth={1.5} />
          </div>
          <p className="font-semibold text-sm text-center mb-1" style={{ color: '#0F172A' }}>{cert.nama}</p>
          <p className="text-xs mb-4" style={{ color: '#64748B' }}>{cert.penerbit} · {cert.tahun}</p>
          <a href={cert.file_pdf} download target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: '#DC2626' }}>
            <Download className="w-4 h-4" /> Buka PDF
          </a>
        </div>
      ) : null}
      <div className="mt-3 text-center px-2">
        <p className="text-white font-semibold text-sm sm:text-base">{cert.nama}</p>
        <p className="text-xs sm:text-sm mt-1" style={{ color: '#F59E0B' }}>{cert.penerbit} · {cert.tahun}</p>
      </div>
      <button onClick={onClose}
        className="absolute -top-3 -right-3 w-9 h-9 rounded-full text-white flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}>
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  </motion.div>
)

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: '#1E3A5F' }}>
      <Icon className="w-4 h-4 text-white" strokeWidth={2} />
    </div>
    <h2 className="text-base sm:text-lg font-bold" style={{ color: '#0F172A' }}>{title}</h2>
  </div>
)

const cardStyle = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
}

const SiswaDetailPage = () => {
  const { kelas, id } = useParams()
  const navigate = useNavigate()
  const [certModal, setCertModal] = useState(null)
  const [siswa, setSiswa] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data: basic } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      let merged = null

      if (basic) {
        const { data: detail } = await supabase
          .from('student_details')
          .select('*')
          .eq('id', id)
          .maybeSingle()

        merged = detail ? { ...basic, ...detail } : basic
      }

      if (!merged) {
        const fallbackBasic = (studentsData[kelas] || []).find((s) => s.id === parseInt(id))
        const fallbackDetail = kelas === 'kelas12' ? kelas12DetailData.find((s) => s.id === parseInt(id)) : null
        merged = fallbackDetail ? { ...fallbackBasic, ...fallbackDetail } : fallbackBasic
      }

      setSiswa(merged)
      setLoading(false)
    }
    fetchData()
  }, [kelas, id])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: '#FFFFFF' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1E3A5F', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!siswa) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: '#FFFFFF' }}>
        <div className="text-center">
          <p className="text-lg font-medium mb-4" style={{ color: '#94A3B8' }}>Siswa tidak ditemukan</p>
          <Link to={`/murid/${kelas}`} className="font-semibold hover:underline" style={{ color: '#1E3A5F' }}>
            ← Kembali ke Daftar {kelasLabels[kelas] || 'Murid'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen pt-16" style={{ background: '#FFFFFF' }}>

        {/* ── HERO — biru tua ── */}
        <div className="relative overflow-hidden" style={{ background: '#1E3A5F' }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-8 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent)', transform: 'translate(30%,-30%)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-6 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent)', transform: 'translate(-30%,30%)' }} />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(`/murid/${kelas}`)}
              className="flex items-center gap-2 text-sm font-medium mb-6 transition-colors group"
              style={{ color: 'rgba(255,255,255,0.65)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
              Kembali ke Daftar {kelasLabels[kelas] || 'Murid'}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6"
            >
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                  style={{ border: '2px solid rgba(255,255,255,0.2)' }}>
                  <img src={siswa.foto} alt={siswa.nama} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-green-400 shadow"
                  style={{ border: '3px solid #1E3A5F' }} />
              </div>

              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {siswa.rombel}
                  </span>
                  {siswa.nisn && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                      NISN {siswa.nisn}
                    </span>
                  )}
                  {siswa.is_creator ? <CreatorBadge /> : siswa.is_dev_web && <DevWebBadge />}
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white mb-1 leading-tight">{siswa.nama}</h1>
                <p className="text-xs sm:text-sm mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  SMK Wikrama Bogor · Wikrama 2
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {(siswa.keahlian || []).map((k) => (
                    <span key={k} className="px-2.5 py-1 rounded-xl text-xs font-medium text-white"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <div className="flex sm:flex-col gap-3">
                  {[
                    { val: siswa.sertifikat?.length ?? '-', label: 'Sertifikat' },
                    { val: siswa.cv?.pengalaman?.length ?? '-', label: 'Pengalaman' },
                  ].map((s, i) => (
                    <div key={i} className="text-center px-4 py-2.5 rounded-2xl"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}>
                      <p className="text-xl sm:text-2xl font-black text-white">{s.val}</p>
                      <p className="text-xs font-medium" style={{ color: '#F59E0B' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
                {(siswa.cv_link || siswa.cvLink) && (
                  <a
                    href={siswa.cv_link || siswa.cvLink}
                    download
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: '#F59E0B',
                      color: '#0F172A',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <Download className="w-4 h-4" strokeWidth={2.5} />
                    Download CV
                  </a>
                )}
                {(siswa.porto_link || siswa.portoLink) && (
                  <a
                    href={siswa.porto_link || siswa.portoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.25)',
                    }}
                  >
                    <Eye className="w-4 h-4" strokeWidth={2.5} />
                    Lihat Porto
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="lg:col-span-2 rounded-2xl sm:rounded-3xl p-5 sm:p-7"
              style={cardStyle}
            >
              <SectionTitle icon={User} title="Tentang Saya" />
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#64748B' }}>{siswa.tentang || 'Tidak ada informasi.'}</p>
              {siswa.keahlian && siswa.keahlian.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#94A3B8' }}>Keahlian</p>
                  <div className="flex flex-wrap gap-2">
                    {siswa.keahlian.map((k) => (
                      <span key={k} className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold"
                        style={{ background: 'rgba(30,58,95,0.07)', border: '1px solid #E2E8F0', color: '#1E3A5F' }}>
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
                  { icon: MapPin,       label: 'Alamat',     value: siswa.alamat },
                  { icon: Mail,         label: 'Email',      value: siswa.email },
                  { icon: Phone,        label: 'No. HP',     value: siswa.no_hp },
                  { icon: BookOpen,     label: 'Kelas',      value: siswa.rombel },
                ].filter(item => item.value).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(30,58,95,0.07)' }}>
                      <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: '#1E3A5F' }} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs" style={{ color: '#94A3B8' }}>{item.label}</p>
                      <p className="text-xs sm:text-sm font-medium break-words" style={{ color: '#0F172A' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {(siswa.cv || siswa.sertifikat) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="lg:col-span-2 space-y-5 sm:space-y-6"
            >
              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={cardStyle}>
                <SectionTitle icon={GraduationCap} title="Pendidikan" />
                <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: '#1E3A5F' }} />
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{siswa.cv?.pendidikan}</p>
                </div>
              </div>

              {(siswa.cv?.pengalaman?.length > 0) && (
              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={cardStyle}>
                <SectionTitle icon={Briefcase} title="Pengalaman" />
                <div className="space-y-3">
                  {siswa.cv.pengalaman.map((p, i) => (
                    <div key={i} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl"
                      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm"
                        style={{ background: '#1E3A5F' }}>
                        {i + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm" style={{ color: '#0F172A' }}>{p.posisi}</p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: '#64748B' }}>{p.tempat}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-lg text-xs font-medium"
                          style={{ background: 'rgba(30,58,95,0.07)', color: '#1E3A5F' }}>
                          {p.periode}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="space-y-5 sm:space-y-6"
            >
              {(siswa.cv?.organisasi?.length > 0) && (
              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={cardStyle}>
                <SectionTitle icon={User} title="Organisasi" />
                <div className="space-y-2">
                  {siswa.cv.organisasi.map((o, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl"
                      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <ChevronRight className="w-4 h-4 shrink-0" style={{ color: '#1E3A5F' }} strokeWidth={2.5} />
                      <p className="text-xs sm:text-sm" style={{ color: '#64748B' }}>{o}</p>
                    </div>
                  ))}
                </div>
              </div>
              )}

              {(siswa.cv?.prestasi?.length > 0) && (
              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={cardStyle}>
                <SectionTitle icon={Award} title="Prestasi" />
                <div className="space-y-2">
                  {siswa.cv.prestasi.map((p, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl"
                      style={{ background: '#FFFBEB', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <Star className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#F59E0B' }} strokeWidth={2} fill="#F59E0B" />
                      <p className="text-xs sm:text-sm leading-snug" style={{ color: '#0F172A' }}>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
              )}
            </motion.div>
          </div>
          )}

          {siswa.sertifikat?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="rounded-2xl sm:rounded-3xl p-5 sm:p-7"
            style={cardStyle}
          >
            <SectionTitle icon={Award} title={`Sertifikat (${siswa.sertifikat.length})`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {siswa.sertifikat.map((cert) => (
                <motion.div
                  key={cert.id}
                  whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                  onClick={() => cert.gambar ? setCertModal(cert) : cert.file_pdf && window.open(cert.file_pdf, '_blank')}
                  className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  {cert.gambar ? (
                    <div className="relative h-36 sm:h-44 overflow-hidden">
                      <img src={cert.gambar} alt={cert.nama}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'rgba(30,58,95,0.68)' }}>
                        <ZoomIn className="w-7 h-7 text-white" strokeWidth={1.8} />
                        <p className="text-white text-xs font-semibold">Lihat Sertifikat</p>
                      </div>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-lg text-xs font-bold"
                        style={{ background: '#F59E0B', color: '#0F172A' }}>
                        {cert.tahun}
                      </span>
                    </div>
                  ) : (
                    <div className="relative h-36 sm:h-44 flex flex-col items-center justify-center"
                      style={{ background: '#FEF2F2' }}>
                      <FileText className="w-12 h-12 sm:w-16 sm:h-16" style={{ color: '#DC2626' }} strokeWidth={1.5} />
                      <p className="text-xs font-medium mt-2" style={{ color: '#DC2626' }}>File PDF</p>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-lg text-xs font-bold"
                        style={{ background: '#F59E0B', color: '#0F172A' }}>
                        {cert.tahun}
                      </span>
                    </div>
                  )}
                  <div className="p-3 sm:p-4">
                    <p className="font-semibold text-xs sm:text-sm leading-snug line-clamp-2 mb-2" style={{ color: '#0F172A' }}>{cert.nama}</p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: '#1E3A5F' }}>
                          <Award className="w-3 h-3 text-white" strokeWidth={2} />
                        </div>
                        <p className="text-xs truncate" style={{ color: '#94A3B8' }}>{cert.penerbit}</p>
                      </div>
                      {cert.file_pdf && (
                        <a href={cert.file_pdf} download target="_blank" rel="noopener noreferrer"
                          className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105 text-white"
                          style={{ background: '#DC2626' }}>
                          <Download className="w-3 h-3" /> PDF
                        </a>
                      )}
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
