import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit3, Trash2, LogOut, Search } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../components/Toast'

const BeritaList = () => {
  const { session } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [berita, setBerita] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchBerita = async () => {
    setLoading(true)
    const { data } = await supabase.from('berita').select('*').order('tanggal', { ascending: false })
    setBerita(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchBerita() }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus berita ini?')) return
    await supabase.from('berita').delete().eq('id', id)
    setBerita(prev => prev.filter(b => b.id !== id))
    toast('Berita berhasil dihapus', 'success')
  }

  const filtered = berita.filter(b =>
    b.judul.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="sticky top-0 z-50" style={{ background: '#1E3A5F' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="" className="w-8 h-8 rounded-lg" />
            <div>
              <p className="text-white font-bold text-sm">Admin - Berita</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{session?.user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
            <Link to="/admin/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Dashboard
            </Link>
            <Link to="/admin/pengumuman"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Pengumuman
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
            <input type="text" placeholder="Cari berita..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }} />
          </div>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <Link to="/admin/berita/tambah"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{ background: '#1E3A5F', color: '#FFFFFF' }}>
            <Plus className="w-3.5 h-3.5" /> Tambah Berita
          </Link>
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
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#64748B' }}>Gambar</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#64748B' }}>Judul</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#64748B' }}>Kategori</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#64748B' }}>Tanggal</th>
                    <th className="text-right px-4 py-3 font-semibold" style={{ color: '#64748B' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="border-t" style={{ borderColor: '#F1F5F9' }}>
                      <td className="px-4 py-3">
                        <img src={b.gambar || '/favicon.png'} alt="" className="w-14 h-10 rounded-lg object-cover" />
                      </td>
                      <td className="px-4 py-3 font-medium max-w-xs truncate" style={{ color: '#0F172A' }}>{b.judul}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: 'rgba(245,158,11,0.15)', color: '#B45309' }}>
                          {b.kategori}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ color: '#64748B' }}>
                        {new Date(b.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/admin/berita/edit/${b.id}`} className="p-2 rounded-lg" style={{ color: '#64748B' }}>
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete(b.id)} className="p-2 rounded-lg" style={{ color: '#DC2626' }}>
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
                <p className="font-medium" style={{ color: '#94A3B8' }}>Tidak ada berita</p>
                <Link to="/admin/berita/tambah" className="text-sm font-semibold hover:underline mt-1 inline-block" style={{ color: '#1E3A5F' }}>Tambah berita sekarang</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BeritaList
