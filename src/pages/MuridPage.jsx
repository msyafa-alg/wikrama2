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

  const isKelas12 = kelas === 'kelas12'

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
    if (!isKelas12) return
    navigate(`/murid/kelas12/${student.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="py-14 px-4" style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #0a3660 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-sky-300 mb-3"
              style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)' }}>
              Daftar Siswa
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Daftar Murid {kelasLabels[kelas]}
            </h1>
            <p className="text-blue-200 text-base">{allStudents.length} siswa terdaftar</p>
          </motion.div>

          {/* Kelas tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {Object.entries(kelasLabels).map(([key, label]) => (
              <Link
                key={key}
                to={`/murid/${key}`}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  kelas === key ? 'bg-white text-[#0F4C81] shadow-lg' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama atau alamat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 text-sm"
              style={{ '--tw-ring-color': '#0F4C81' }}
            />
          </div>

          {/* Filter rombel */}
          <select
            value={filterRombel}
            onChange={(e) => setFilterRombel(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none text-sm text-gray-700 min-w-[160px]"
          >
            {rombels.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Count */}
        <p className="text-sm text-gray-500 mb-6">
          Menampilkan {paginated.length} dari {filtered.length} siswa
        </p>

        {/* Info banner kelas 12 */}
        {isKelas12 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
            style={{ background: 'rgba(15,76,129,0.06)', border: '1px solid rgba(15,76,129,0.15)' }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'rgba(15,76,129,0.1)' }}>
              <svg className="w-4 h-4 text-[#0F4C81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[#0F4C81] font-medium">
              Klik kartu siswa untuk melihat profil lengkap, CV, dan sertifikat.
            </p>
          </motion.div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginated.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => handleCardClick(student)}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group ${isKelas12 ? 'cursor-pointer' : ''}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={student.foto}
                  alt={student.nama}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(15,76,129,0.6), transparent)' }} />
                {/* Kelas 12 badge */}
                {isKelas12 && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-white shadow"
                    style={{ background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Detail
                  </div>
                )}
                {/* Kelas 12 hover overlay */}
                {isKelas12 && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(15,76,129,0.55)', backdropFilter: 'blur(2px)' }}>
                    <div className="text-white text-center px-3">
                      <svg className="w-8 h-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <p className="text-xs font-semibold">Lihat Detail</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{student.nama}</h3>
                <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-medium text-[#0F4C81] mb-2"
                  style={{ background: 'rgba(15,76,129,0.08)' }}>
                  {student.rombel}
                </span>
                <p className="text-gray-400 text-xs flex items-start gap-1.5">
                  <svg className="w-3 h-3 mt-0.5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="text-center py-20 text-gray-400">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                  page === p ? 'text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                style={page === p ? { background: 'linear-gradient(135deg, #0F4C81, #38bdf8)' } : {}}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
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
