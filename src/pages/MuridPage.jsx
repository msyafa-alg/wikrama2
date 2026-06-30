import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { CardSkeleton } from '../components/Skeleton'
import FotoPlaceholder from '../components/FotoPlaceholder'

const ITEMS_PER_PAGE = 8

const kelasLabels = {
  kelas10: 'Kelas 10',
  kelas11: 'Kelas 11',
  kelas12: 'Kelas 12',
}

const DevWebBadge = () => (
  <div className="absolute top-2 left-2 z-10">
    <div
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white tracking-wide"
      style={{
        background: '#1E3A5F',
        borderLeft: '3px solid #F59E0B',
      }}
    >
      <span style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: '0.7rem' }}>&lt;/&gt;</span>
      <span>Dev Web</span>
    </div>
  </div>
)

const CreatorBadge = () => (
  <div className="absolute top-2 left-2 z-10">
    <div
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide"
      style={{
        background: 'linear-gradient(135deg, #1E3A5F 0%, #2d5a8e 100%)',
        borderLeft: '3px solid #F59E0B',
        boxShadow: '0 2px 8px rgba(30,58,95,0.3)',
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <span style={{ color: '#F59E0B' }}>Creator</span>
    </div>
  </div>
)

const MuridPage = () => {
  const { kelas } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filterRombel, setFilterRombel] = useState('Semua')
  const [page, setPage] = useState(1)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('students')
        .select('*')
        .eq('kelas', kelas)
        .order('nama')

      setStudents(data || [])
      setLoading(false)
    }
    fetchStudents()
  }, [kelas])

  const allStudents = students
  const rombels = ['Semua', ...new Set(allStudents.map((s) => s.rombel).filter(Boolean))]

  const filtered = allStudents.filter((s) => {
    const matchSearch =
      s.nama.toLowerCase().includes(search.toLowerCase()) ||
      (s.alamat || '').toLowerCase().includes(search.toLowerCase())
    const matchRombel = filterRombel === 'Semua' || s.rombel === filterRombel
    return matchSearch && matchRombel
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  useEffect(() => {
    setPage(1)
    setSearch('')
    setFilterRombel('Semua')
  }, [kelas])

  useEffect(() => { setPage(1) }, [search, filterRombel])

  const handleCardClick = (student) => navigate(`/murid/${kelas}/${student.id}`)

  return (
    <div className="min-h-screen pt-20" style={{ background: '#FFFFFF' }}>
      <div className="py-10 sm:py-14 px-4" style={{ background: '#1E3A5F' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff' }}>
              Daftar Siswa
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 mt-2">
              Daftar Murid {kelasLabels[kelas]}
            </h1>
            {!loading && <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{allStudents.length} siswa terdaftar</p>}
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {Object.entries(kelasLabels).map(([key, label]) => (
              <Link key={key} to={`/murid/${key}`}
                className="px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={kelas === key
                  ? { background: '#FFFFFF', color: '#1E3A5F' }
                  : { background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.18)' }
                }
                onMouseEnter={e => { if (kelas !== key) e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
                onMouseLeave={e => { if (kelas !== key) e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 && !loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: '#F1F5F9' }}>
              <Users className="w-8 h-8" style={{ color: '#94A3B8' }} />
            </div>
            <p className="font-medium" style={{ color: '#94A3B8' }}>Tidak ada siswa ditemukan</p>
            <p className="text-sm mt-1" style={{ color: '#CBD5E1' }}>Coba ubah kata kunci atau filter</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94A3B8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari nama atau alamat..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
                />
              </div>
              <select
                value={filterRombel}
                onChange={(e) => setFilterRombel(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-sm focus:outline-none min-w-[160px]"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              >
                {rombels.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <p className="text-sm mb-4" style={{ color: '#64748B' }}>
              Menampilkan {paginated.length} dari {filtered.length} siswa
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(30,58,95,0.08)' }}>
                <svg className="w-4 h-4" style={{ color: '#1E3A5F' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-medium" style={{ color: '#1E3A5F' }}>
                Klik kartu siswa untuk melihat profil lengkap.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {paginated.map((student, i) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -2 }}
                  onClick={() => handleCardClick(student)}
                  className="rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)'}
                >
                  <div className="relative h-36 sm:h-48 overflow-hidden">
                    {student.foto ? (
                      <img
                        src={student.foto}
                        alt={student.nama}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        onError={e => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex' }}
                      />
                    ) : null}
                    <div className="w-full h-full absolute inset-0" style={{ display: student.foto ? 'none' : 'flex' }}>
                      <FotoPlaceholder nama={student.nama} className="w-full h-full" />
                    </div>
                    {student.is_creator ? <CreatorBadge /> : student.is_dev_web && <DevWebBadge />}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(30,58,95,0.58)' }}>
                      <div className="text-white text-center px-3">
                        <svg className="w-8 h-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <p className="text-xs font-semibold">Lihat Detail</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1 truncate" style={{ color: '#0F172A' }}>{student.nama}</h3>
                    <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-medium mb-2"
                      style={{ background: 'rgba(30,58,95,0.07)', color: '#1E3A5F' }}>
                      {student.rombel}
                    </span>
                    <p className="text-xs flex items-start gap-1.5" style={{ color: '#94A3B8' }}>
                      <svg className="w-3 h-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="line-clamp-2">{student.alamat}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16" style={{ color: '#CBD5E1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="font-medium" style={{ color: '#94A3B8' }}>Tidak ada siswa yang ditemukan</p>
                <p className="text-sm mt-1" style={{ color: '#CBD5E1' }}>Coba ubah kata kunci pencarian</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
                  onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.background = '#F8FAFC' }}
                  onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="w-9 h-9 rounded-xl text-sm font-medium transition-all"
                    style={page === p
                      ? { background: '#1E3A5F', color: '#ffffff', fontWeight: 700 }
                      : { background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }
                    }
                    onMouseEnter={e => { if (page !== p) e.currentTarget.style.background = '#F8FAFC' }}
                    onMouseLeave={e => { if (page !== p) e.currentTarget.style.background = '#FFFFFF' }}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
                  onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.background = '#F8FAFC' }}
                  onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MuridPage
