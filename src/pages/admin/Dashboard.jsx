import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Users, GraduationCap, BookOpen, ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ siswa: 0, alumni: 0, kelas: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const { data: siswa } = await supabase.from('students').select('id, kelas')
      const { data: alumni } = await supabase.from('alumni').select('id')
      setStats({
        siswa: siswa?.length || 0,
        alumni: alumni?.length || 0,
        kelas: new Set(siswa?.map(s => s.kelas) || []).size,
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const cards = [
    { label: 'Total Siswa', value: stats.siswa, icon: Users, color: '#1E3A5F', bg: 'rgba(30,58,95,0.08)', link: '/admin/siswa' },
    { label: 'Total Alumni', value: stats.alumni, icon: GraduationCap, color: '#DC2626', bg: 'rgba(220,38,38,0.08)', link: '/admin/alumni' },
    { label: 'Kelas Aktif', value: stats.kelas, icon: BookOpen, color: '#059669', bg: 'rgba(5,150,105,0.08)', link: '/admin/siswa' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="sticky top-0 z-50" style={{ background: '#1E3A5F' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="" className="w-8 h-8 rounded-lg" />
            <div>
              <p className="text-white font-bold text-sm">Admin Dashboard</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{session?.user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <LogOut className="w-3.5 h-3.5" /> Keluar
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-2xl p-6 animate-pulse" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <div className="h-4 w-24 rounded bg-gray-200 mb-3" />
                <div className="h-8 w-16 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {cards.map(c => (
              <Link key={c.label} to={c.link}
                className="rounded-2xl p-6 transition-all hover:scale-[1.02]"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>{c.label}</span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.bg }}>
                    <c.icon className="w-5 h-5" style={{ color: c.color }} />
                  </div>
                </div>
                <p className="text-3xl font-bold" style={{ color: '#0F172A' }}>{c.value}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link to="/admin/siswa"
            className="rounded-2xl p-6 transition-all hover:scale-[1.02] flex items-center justify-between"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(30,58,95,0.08)' }}>
                <Users className="w-6 h-6" style={{ color: '#1E3A5F' }} />
              </div>
              <div>
                <p className="font-semibold" style={{ color: '#0F172A' }}>Kelola Siswa</p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>Tambah, edit, hapus data siswa</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5" style={{ color: '#94A3B8' }} />
          </Link>
          <Link to="/admin/alumni"
            className="rounded-2xl p-6 transition-all hover:scale-[1.02] flex items-center justify-between"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.08)' }}>
                <GraduationCap className="w-6 h-6" style={{ color: '#DC2626' }} />
              </div>
              <div>
                <p className="font-semibold" style={{ color: '#0F172A' }}>Kelola Alumni</p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>Tambah, edit, hapus data alumni</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5" style={{ color: '#94A3B8' }} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
