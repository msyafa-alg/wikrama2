import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit3, Trash2, LogOut, Search } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../components/Toast'

const kelasLabels = {
  kelas10: 'Kelas 10',
  kelas11: 'Kelas 11',
  kelas12: 'Kelas 12',
}

const SiswaList = () => {
  const { session } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [siswa, setSiswa] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterKelas, setFilterKelas] = useState('semua')

  const fetchSiswa = async () => {
    setLoading(true)
    const { data } = await supabase.from('students').select('*').order('nama')
    setSiswa(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchSiswa() }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const handleDelete = async (id) => {
    const s = siswa.find(s => s.id === id)
    if (!s) return
    if (s?.foto) {
      const path = s.foto.replace(/.*\/student-files\//, '')
      if (path) await supabase.storage.from('student-files').remove([path])
    }
    await supabase.from('student_details').delete().eq('id', id)
    await supabase.from('students').delete().eq('id', id)
    setSiswa(prev => prev.filter(s => s.id !== id))
    toast('Siswa berhasil dihapus', 'success')
  }

  const confirmDelete = (id, nama) => {
    if (window.confirm(`Yakin hapus ${nama}? Data akan hilang permanen.`)) {
      handleDelete(id)
    }
  }

  const filtered = siswa.filter(s => {
    const matchKelas = filterKelas === 'semua' || s.kelas === filterKelas
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase())
    return matchKelas && matchSearch
  })

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="sticky top-0 z-50" style={{ background: '#1E3A5F' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="" className="w-8 h-8 rounded-lg" />
            <div>
              <p className="text-white font-bold text-sm">Admin - Siswa</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{session?.user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin/alumni"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Alumni
            </Link>
            <Link to="/admin/siswa/tambah"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Plus className="w-3.5 h-3.5" /> Tambah Siswa
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <LogOut className="w-3.5 h-3.5" /> Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94A3B8' }} />
            <input type="text" placeholder="Cari siswa..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }} />
          </div>
          <select value={filterKelas} onChange={(e) => setFilterKelas(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm focus:outline-none"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}>
            <option value="semua">Semua Kelas</option>
            {Object.entries(kelasLabels).map(([k, l]) => (
              <option key={k} value={k}>{l}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1E3A5F', borderTopColor: 'transparent' }} />
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: '#F8FAFC' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#64748B' }}>Foto</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#64748B' }}>Nama</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#64748B' }}>Kelas</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#64748B' }}>Rombel</th>
                    <th className="text-right px-4 py-3 font-semibold" style={{ color: '#64748B' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="border-t" style={{ borderColor: '#F1F5F9' }}>
                      <td className="px-4 py-3"><img src={s.foto || '/favicon.png'} alt="" className="w-10 h-10 rounded-xl object-cover" /></td>
                      <td className="px-4 py-3 font-medium" style={{ color: '#0F172A' }}>{s.nama}</td>
                      <td className="px-4 py-3" style={{ color: '#64748B' }}>{kelasLabels[s.kelas] || s.kelas}</td>
                      <td className="px-4 py-3" style={{ color: '#64748B' }}>{s.rombel}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/admin/siswa/edit/${s.id}`} className="p-2 rounded-lg" style={{ color: '#64748B' }}>
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button onClick={() => confirmDelete(s.id, s.nama)} className="p-2 rounded-lg" style={{ color: '#DC2626' }}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="font-medium" style={{ color: '#94A3B8' }}>Tidak ada siswa</p>
                <Link to="/admin/siswa/tambah" className="text-sm font-semibold hover:underline mt-1 inline-block" style={{ color: '#1E3A5F' }}>Tambah siswa sekarang</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SiswaList
