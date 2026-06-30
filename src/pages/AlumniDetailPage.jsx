import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, MapPin, Mail, Phone, Hash, CalendarDays,
  BookOpen, Briefcase, Award, Star, ChevronRight,
  ZoomIn, User, X, GraduationCap, Download, Eye, FileText
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { DetailSkeleton } from '../components/Skeleton'
import FotoPlaceholder from '../components/FotoPlaceholder'
import PdfModal from '../components/PdfModal'
import QrModal from '../components/QrModal'
import Timeline from '../components/Timeline'

const CertModal = ({ cert, onClose }) => {
  const [showPdf, setShowPdf] = useState(false)

  return (
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
      className="relative w-full max-w-4xl"
      onClick={(e) => e.stopPropagation()}
    >
      {cert.file_pdf && showPdf ? (
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#FFFFFF', height: '70vh' }}>
          <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
            <span className="text-sm font-medium truncate" style={{ color: '#0F172A' }}>{cert.nama} - PDF</span>
            <div className="flex items-center gap-2">
              {cert.gambar && (
                <button onClick={() => setShowPdf(false)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#1E3A5F' }}>
                  Lihat Gambar
                </button>
              )}
              <a href={cert.file_pdf} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                style={{ background: '#DC2626' }}>
                <Download className="w-3.5 h-3.5" /> Download
              </a>
            </div>
          </div>
          <iframe src={cert.file_pdf} className="w-full h-[calc(70vh-44px)]" title={cert.nama} />
        </div>
      ) : cert.gambar ? (
        <div className="relative">
          <img src={cert.gambar} alt={cert.nama} className="w-full rounded-2xl shadow-2xl" />
          {cert.file_pdf && (
            <button onClick={() => setShowPdf(true)}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-lg transition-all hover:scale-105"
              style={{ background: '#DC2626' }}>
              <FileText className="w-3.5 h-3.5" /> Lihat PDF
            </button>
          )}
        </div>
      ) : cert.file_pdf ? (
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#FFFFFF', height: '70vh' }}>
          <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
            <span className="text-sm font-medium truncate" style={{ color: '#0F172A' }}>{cert.nama}</span>
            <a href={cert.file_pdf} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: '#DC2626' }}>
              <Download className="w-3.5 h-3.5" /> Download
            </a>
          </div>
          <iframe src={cert.file_pdf} className="w-full h-[calc(70vh-44px)]" title={cert.nama} />
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
}

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

const AlumniDetailPage = () => {
  const { id, tahun } = useParams()
  const navigate = useNavigate()
  const [certModal, setCertModal] = useState(null)
  const [pdfModal, setPdfModal] = useState(null)
  const [qrModal, setQrModal] = useState(null)
  const [siswa, setSiswa] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data: basic } = await supabase.from('alumni').select('*').eq('id', id).maybeSingle()
      let merged = null
      if (basic) {
        const { data: detail } = await supabase.from('alumni_details').select('*').eq('id', id).maybeSingle()
        merged = detail ? { ...basic, ...detail } : basic
      }
      setSiswa(merged)
      setLoading(false)
    }
    fetchData()
  }, [id, tahun])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 max-w-4xl mx-auto px-4 py-10" style={{ background: '#FFFFFF' }}>
        <DetailSkeleton />
      </div>
    )
  }

  if (!siswa) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: '#FFFFFF' }}>
        <div className="text-center">
          <p className="text-lg font-medium mb-4" style={{ color: '#94A3B8' }}>Alumni tidak ditemukan</p>
          <Link to={`/alumni/${tahun}`} className="font-semibold hover:underline" style={{ color: '#1E3A5F' }}>
            ← Kembali ke Daftar Alumni
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
            {/* Back */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/alumni/2026')}
              className="flex items-center gap-2 text-sm font-medium mb-6 transition-colors group"
              style={{ color: 'rgba(255,255,255,0.65)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
              Kembali ke Daftar Alumni
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
                  style={{ border: '2px solid rgba(255,255,255,0.2)' }}>
                  {siswa.foto ? (
                    <img src={siswa.foto} alt={siswa.nama} className="w-full h-full object-cover" />
                  ) : (
                    <FotoPlaceholder nama={siswa.nama} className="w-full h-full text-4xl" />
                  )}
                </div>
                <button onClick={() => setQrModal(`/alumni/${tahun}/${id}`)}
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  style={{ background: '#1E3A5F' }}>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {siswa.rombel}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: 'rgba(245,158,11,0.3)', border: '1px solid rgba(245,158,11,0.5)' }}>
                    Alumni {siswa.angkatan}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white mb-1 leading-tight">{siswa.nama}</h1>
                <p className="text-xs sm:text-sm mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  SMK Wikrama Bogor · Wikrama 2
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {siswa.keahlian?.map((k) => (
                    <span key={k} className="px-2.5 py-1 rounded-xl text-xs font-medium text-white"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini stats + Download CV */}
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
                  <button
                    onClick={() => setPdfModal({ url: siswa.cv_link || siswa.cvLink, title: `CV ${siswa.nama}` })}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105 w-full"
                    style={{
                      background: '#F59E0B',
                      color: '#0F172A',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <Eye className="w-4 h-4" strokeWidth={2.5} />
                    Lihat CV
                  </button>
                )}
                {(siswa.portoLink || siswa.porto_link) && (
                  <a
                    href={siswa.portoLink || siswa.porto_link}
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
                {siswa.portofolio_pdf && (
                  <button
                    onClick={() => setPdfModal({ url: siswa.portofolio_pdf, title: `Portofolio ${siswa.nama}` })}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105 w-full"
                    style={{
                      background: 'rgba(220,38,38,0.15)',
                      color: '#ffffff',
                      border: '1px solid rgba(220,38,38,0.25)',
                    }}
                  >
                    <FileText className="w-4 h-4" strokeWidth={2.5} />
                    Porto PDF
                  </button>
                )}
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
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#64748B' }}>{siswa.tentang || 'Tidak ada informasi.'}</p>
              {siswa.keahlian?.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#94A3B8' }}>Keahlian</p>
                  <div className="flex flex-wrap gap-2">
                    {siswa.keahlian?.map((k) => (
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
                  { icon: GraduationCap, label: 'Angkatan',  value: siswa.angkatan },
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
                {siswa.aktivitas && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(30,58,95,0.07)' }}>
                      <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: '#1E3A5F' }} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Aktivitas Sekarang</p>
                      <p className="text-xs sm:text-sm font-medium break-words" style={{ color: '#0F172A' }}>{siswa.aktivitas}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* CV */}
          {(siswa.cv?.pendidikan || siswa.cv?.pengalaman?.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="lg:col-span-2 space-y-5 sm:space-y-6"
            >
              <Timeline items={siswa.cv?.pendidikan ? [siswa.cv.pendidikan] : []} type="pendidikan" title="Pendidikan" />
              <Timeline items={siswa.cv?.pengalaman || []} type="pengalaman" title="Pengalaman" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="space-y-5 sm:space-y-6"
            >
              <Timeline items={siswa.cv?.organisasi || []} type="organisasi" title="Organisasi" />
              <Timeline items={siswa.cv?.prestasi || []} type="prestasi" title="Prestasi" />
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
        {pdfModal && <PdfModal url={pdfModal.url} title={pdfModal.title} onClose={() => setPdfModal(null)} />}
        {qrModal && <QrModal url={qrModal} nama={siswa?.nama} onClose={() => setQrModal(null)} />}
      </AnimatePresence>
    </>
  )
}

export default AlumniDetailPage
