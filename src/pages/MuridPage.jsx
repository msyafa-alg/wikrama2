import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import studentsData from '../data/students.json'

const ITEMS_PER_PAGE = 8

const kelasLabels = {
  kelas10: 'Kelas 10',
  kelas11: 'Kelas 11',
  kelas12: 'Kelas 12',
}

const MuridPage = () => {
  const { kelas } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filterRombel, setFilterRombel] = useState('Semua')
  const [page, setPage] = useState(1)

  const allStudents = studentsData[kelas] || []
  const rombels = ['Semua', ...new Set(allStudents.map((s) => s.rombel))]

  const filtered = allStudents.filter((s) => {
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) ||
      s.alamat.toLowerCase().includes(search.toLowerCase())
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

  useEffect(() => {
    setPage(1)
  }, [search, filterRombel])

  const handleCardClick = (student) => {
    navigate(`/murid/${kelas}/${student.id}`)
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: '#0F172A' }}>
      {/* Header */}
      <div className="py-10 sm:py-14 px-4" style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3"
              style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.3)', color: '#38bdf8' }}>
              Daftar Siswa
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Daftar Murid {kelasLabels[kelas]}
            </h1>
            <p className="text-sm" style={{ color: '#CBD5E1' }}>{allStudents.length} siswa terdaftar</p>
          </motion.div>

          {/* Kelas tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {Object.entries(kelasLabels).map(([key, label]) => (
              <Link key={key} to={`/murid/${key}`}
                className="px-4 sm:px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                style={kelas === key
                  ? { background: '#38bdf8', color: '#0F172A' }
                  : { background: 'rgba(255,255,255,0.06)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.12)' }
                }>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#CBD5E1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama atau alamat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2"
              style={{
                background: '#1E293B',
                border: '1px solid rgba(255,255,255,0.08)',
                '--tw-ring-color': '#38bdf8',
              }}
            />
          </div>

          {/* Filter rombel */}
          <select
            value={filterRombel}
            onChange={(e) => setFilterRombel(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm focus:outline-none min-w-[160px]"
            style={{
              background: '#1E293B',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#CBD5E1',
            }}
          >
            {rombels.map((r) => (
              <option key={r} value={r} style={{ background: '#1E293B' }}>{r}</option>
            ))}
          </select>
        </div>

        {/* Count */}
        <p className="text-sm mb-6" style={{ color: '#CBD5E1' }}>
          Menampilkan {paginated.length} dari {filtered.length} siswa
        </p>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)' }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(56,189,248,0.1)' }}>
            <svg className="w-4 h-4" style={{ color: '#38bdf8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-medium" style={{ color: '#38bdf8' }}>
            Klik kartu siswa untuk melihat profil lengkap.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {paginated.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}
              onClick={() => handleCardClick(student)}
              className="rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer"
              style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="relative h-36 sm:h-48 overflow-hidden">
                <img
                  src={student.foto}
                  alt={student.nama}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.7), transparent)' }} />
                {/* Dev Web badge */}
                {student.isDevWeb && (
                  <div className="absolute top-2 left-2 z-10">
                    <div className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black text-white shadow-2xl overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7)' }}>
                      <div className="absolute inset-0 -translate-x-full"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', animation: 'shimmer 2.5s infinite' }} />
                      <div className="absolute inset-0 rounded-xl opacity-60 blur-sm"
                        style={{ background: 'linear-gradient(135deg, #4f46e5, #a855f7)' }} />
                      <span className="relative z-10 flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <span className="tracking-wide">Web Dev</span>
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-xl blur-md opacity-70 -z-10"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }} />
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(2px)' }}>
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
                <h3 className="font-bold text-white text-sm mb-1 truncate">{student.nama}</h3>
                <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-medium mb-2"
                  style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8' }}>
                  {student.rombel}
                </span>
                <p className="text-xs flex items-start gap-1.5" style={{ color: '#CBD5E1' }}>
                  <svg className="w-3 h-3 mt-0.5 shrink-0" style={{ color: '#CBD5E1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="line-clamp-2">{student.alamat}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: '#CBD5E1' }}>
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16" style={{ color: '#334155' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="font-medium">Tidak ada siswa yang ditemukan</p>
            <p className="text-sm mt-1">Coba ubah kata kunci pencarian</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', color: '#CBD5E1' }}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-9 h-9 rounded-xl text-sm font-medium transition-all"
                style={page === p
                  ? { background: '#38bdf8', color: '#0F172A', fontWeight: 700 }
                  : { background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', color: '#CBD5E1' }
                }
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', color: '#CBD5E1' }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MuridPage
