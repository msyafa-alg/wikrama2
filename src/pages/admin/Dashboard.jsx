import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LogOut, Users, GraduationCap, BookOpen, MessageSquare,
  ArrowRight, Newspaper, Bell, Plus, UserPlus, Clock,
  BarChart3, Activity, Sparkles, ChevronRight, CalendarDays,
  TrendingUp, FileText, AlertTriangle, Zap, School,
  UserCheck, ListChecks
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const formatTime = () => {
  const now = new Date()
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const dayName = days[now.getDay()]
  const date = now.getDate()
  const month = months[now.getMonth()]
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return {
    dateStr: `${dayName}, ${date} ${month} ${year}`,
    timeStr: `${hours}:${minutes} WIB`,
  }
}

const navItems = [
  { label: 'Siswa', href: '/admin/siswa', icon: Users, color: '#1E3A5F', desc: 'Kelola data siswa' },
  { label: 'Alumni', href: '/admin/alumni', icon: GraduationCap, color: '#DC2626', desc: 'Kelola data alumni' },
  { label: 'Berita', href: '/admin/berita', icon: Newspaper, color: '#B45309', desc: 'Kelola berita rayon' },
  { label: 'Pengumuman', href: '/admin/pengumuman', icon: Bell, color: '#DC2626', desc: 'Kelola pengumuman' },
  { label: 'Pesan', href: '/admin/chat', icon: MessageSquare, color: '#059669', desc: 'Inbox chat siswa' },
]

const quickActions = [
  { label: 'Tambah Siswa', href: '/admin/siswa/tambah', icon: UserPlus, color: '#1E3A5F', bg: 'rgba(30,58,95,0.08)', desc: 'Input data siswa baru' },
  { label: 'Tambah Alumni', href: '/admin/alumni/tambah', icon: GraduationCap, color: '#DC2626', bg: 'rgba(220,38,38,0.08)', desc: 'Input data alumni baru' },
  { label: 'Tambah Berita', href: '/admin/berita/tambah', icon: Newspaper, color: '#B45309', bg: 'rgba(245,158,11,0.08)', desc: 'Publikasi berita baru' },
  { label: 'Tambah Pengumuman', href: '/admin/pengumuman/tambah', icon: Bell, color: '#DC2626', bg: 'rgba(220,38,38,0.08)', desc: 'Buat pengumuman baru' },
]

const activityIcons = {
  siswa: { icon: Users, color: '#1E3A5F', label: 'Siswa' },
  alumni: { icon: GraduationCap, color: '#DC2626', label: 'Alumni' },
  berita: { icon: Newspaper, color: '#B45309', label: 'Berita' },
  pengumuman: { icon: Bell, color: '#DC2626', label: 'Pengumuman' },
}

const Dashboard = () => {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [time, setTime] = useState(formatTime())
  const [stats, setStats] = useState({ siswa: 0, alumni: 0, kelas: 0, berita: 0, pengumuman: 0, chatNew: 0 })
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setTime(formatTime()), 10000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      const [siswaRes, alumniRes, beritaRes, pengumumanRes] = await Promise.all([
        supabase.from('students').select('id, kelas'),
        supabase.from('alumni').select('id'),
        supabase.from('berita').select('id'),
        supabase.from('pengumuman').select('id'),
      ])
      const siswa = siswaRes.data || []
      const alumni = alumniRes.data || []
      const berita = beritaRes.data || []
      const pengumuman = pengumumanRes.data || []
      setStats({
        siswa: siswa.length,
        alumni: alumni.length,
        kelas: new Set(siswa.map(s => s.kelas)).size,
        berita: berita.length,
        pengumuman: pengumuman.length,
        chatNew: 0,
      })

      const activities = []
      const recentAlumni = (alumniRes.data || []).slice(0, 2)
      recentAlumni.forEach(a => activities.push({ type: 'alumni', id: a.id, label: 'Alumni baru ditambahkan', time: 'Baru saja' }))
      const recentBerita = (beritaRes.data || []).slice(0, 2)
      recentBerita.forEach(b => activities.push({ type: 'berita', id: b.id, label: 'Berita baru dipublikasikan', time: 'Baru saja' }))
      const recentPengumuman = (pengumumanRes.data || []).slice(0, 2)
      recentPengumuman.forEach(p => activities.push({ type: 'pengumuman', id: p.id, label: 'Pengumuman baru dibuat', time: 'Baru saja' }))
      setRecentActivities(activities.slice(0, 5))

      setLoading(false)
    }
    fetchStats()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const statCards = [
    { label: 'Total Siswa', value: stats.siswa, icon: Users, color: '#1E3A5F', bg: 'rgba(30,58,95,0.08)', link: '/admin/siswa', change: '+12%' },
    { label: 'Total Alumni', value: stats.alumni, icon: GraduationCap, color: '#DC2626', bg: 'rgba(220,38,38,0.08)', link: '/admin/alumni', change: '+5%' },
    { label: 'Kelas Aktif', value: stats.kelas, icon: BookOpen, color: '#059669', bg: 'rgba(5,150,105,0.08)', link: '/admin/siswa', change: null },
    { label: 'Total Berita', value: stats.berita, icon: Newspaper, color: '#B45309', bg: 'rgba(245,158,11,0.08)', link: '/admin/berita', change: null },
    { label: 'Pengumuman', value: stats.pengumuman, icon: Bell, color: '#DC2626', bg: 'rgba(220,38,38,0.08)', link: '/admin/pengumuman', change: null },
    { label: 'Pesan Masuk', value: stats.chatNew, icon: MessageSquare, color: '#059669', bg: 'rgba(5,150,105,0.08)', link: '/admin/chat', change: null },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* SECTION 1 - HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 ring-2 ring-white/80 shadow-md">
                <img src="/favicon.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="font-bold text-lg" style={{ color: '#0F172A' }}>👋 Selamat Datang, Admin</h1>
                <p className="text-xs" style={{ color: '#64748B' }}>{session?.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs mt-1 ml-[52px] sm:ml-0">
              <span className="flex items-center gap-1.5" style={{ color: '#64748B' }}>
                <CalendarDays className="w-3.5 h-3.5" />
                {time.dateStr}
              </span>
              <span className="flex items-center gap-1.5" style={{ color: '#64748B' }}>
                <Clock className="w-3.5 h-3.5" />
                {time.timeStr}
              </span>
            </div>
          </div>
          <button onClick={handleLogout}
            className="self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-95"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#64748B' }}>
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>

        {/* SECTION 2 - NAVIGATION MENU */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4" style={{ color: '#1E3A5F' }} />
            <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>Menu Navigasi</h2>
          </div>
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 hover:scale-[1.02] active:scale-95"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#0F172A',
                  minHeight: 40,
                }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: item.color + '12' }}>
                  <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                </div>
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="rounded-2xl p-6 animate-pulse" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                  <div className="h-4 w-20 rounded bg-gray-100 mb-3" />
                  <div className="h-8 w-12 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* SECTION 3 - STATISTIK UTAMA */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4" style={{ color: '#1E3A5F' }} />
                <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>Ringkasan Data</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statCards.map((c) => (
                  <Link key={c.label} to={c.link}
                    className="rounded-2xl p-5 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg group"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>{c.label}</span>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: c.bg }}>
                        <c.icon className="w-5 h-5" style={{ color: c.color }} />
                      </div>
                    </div>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-bold" style={{ color: '#0F172A' }}>{c.value}</p>
                      {c.change && (
                        <span className="text-xs font-medium mb-1 px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(5,150,105,0.1)', color: '#059669' }}>
                          {c.change}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* SECTION 4 & 5 & 6 - GRID: QUICK ACTIONS + ACTIVITY + CHART */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* QUICK ACTIONS */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4" style={{ color: '#1E3A5F' }} />
                  <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>Aksi Cepat</h2>
                </div>
                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <Link key={action.href} to={action.href}
                      className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] group"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: action.bg }}>
                        <action.icon className="w-5 h-5" style={{ color: action.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm" style={{ color: '#0F172A' }}>{action.label}</p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: '#94A3B8' }}>{action.desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: '#CBD5E1' }} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* RECENT ACTIVITIES */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4" style={{ color: '#1E3A5F' }} />
                  <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>Aktivitas Terbaru</h2>
                </div>
                <div className="rounded-2xl p-5" style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  minHeight: 300,
                }}>
                  {recentActivities.length > 0 ? (
                    <div className="space-y-4">
                      {recentActivities.map((act, i) => {
                        const meta = activityIcons[act.type] || activityIcons.siswa
                        return (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: meta.color + '10' }}>
                              <meta.icon className="w-4 h-4" style={{ color: meta.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium" style={{ color: '#0F172A' }}>{act.label}</p>
                              <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{act.time}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 shrink-0" style={{ color: '#CBD5E1' }} />
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[250px] text-center">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(30,58,95,0.06)' }}>
                        <Activity className="w-6 h-6" style={{ color: '#94A3B8' }} />
                      </div>
                      <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>Belum ada aktivitas</p>
                    </div>
                  )}
                </div>
              </div>

              {/* CHARTS / STATISTICS */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4" style={{ color: '#1E3A5F' }} />
                  <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>Statistik</h2>
                </div>
                <div className="rounded-2xl p-5 flex flex-col items-center justify-center text-center" style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  minHeight: 300,
                }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(30,58,95,0.06)' }}>
                    <BarChart3 className="w-7 h-7" style={{ color: '#94A3B8' }} />
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#64748B' }}>Belum ada data statistik</p>
                  <p className="text-xs mt-1.5" style={{ color: '#94A3B8' }}>
                    Data grafik akan tampil setelah tersedia
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 7 - DASHBOARD SUMMARY */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="w-4 h-4" style={{ color: '#1E3A5F' }} />
                <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>Ringkasan Cepat</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {statCards.map((c) => (
                  <Link key={c.label} to={c.link}
                    className="rounded-xl p-4 text-center transition-all hover:scale-[1.02] hover:shadow-sm"
                    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: c.bg }}>
                      <c.icon className="w-4 h-4" style={{ color: c.color }} />
                    </div>
                    <p className="text-lg font-bold" style={{ color: '#0F172A' }}>{c.value}</p>
                    <p className="text-[10px] font-medium mt-0.5 truncate" style={{ color: '#94A3B8' }}>{c.label.replace('Total ', '')}</p>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
