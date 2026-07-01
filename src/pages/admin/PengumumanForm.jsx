import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../components/Toast'

const initialPengumuman = {
  judul: '',
  konten: '',
  tanggal: new Date().toISOString().split('T')[0],
  penting: false,
}

const PengumumanForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const toast = useToast()

  const [pengumuman, setPengumuman] = useState(initialPengumuman)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEdit)

  useEffect(() => {
    if (!isEdit) return
    const fetchData = async () => {
      const { data } = await supabase.from('pengumuman').select('*').eq('id', id).single()
      if (data) setPengumuman(data)
      setLoading(false)
    }
    fetchData()
  }, [id])

  const handleSave = async () => {
    if (!pengumuman.judul.trim() || !pengumuman.konten.trim()) {
      alert('Judul dan konten wajib diisi')
      return
    }

    setSaving(true)

    if (isEdit) {
      await supabase.from('pengumuman').update(pengumuman).eq('id', id)
    } else {
      await supabase.from('pengumuman').insert(pengumuman)
    }

    setSaving(false)
    toast(isEdit ? 'Pengumuman berhasil diperbarui' : 'Pengumuman berhasil ditambahkan', 'success')
    navigate('/admin/pengumuman')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1E3A5F', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="sticky top-0 z-50" style={{ background: '#1E3A5F' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/admin/pengumuman')}
            className="flex items-center gap-2 text-sm font-medium text-white">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          <p className="text-white font-bold text-sm">{isEdit ? 'Edit Pengumuman' : 'Tambah Pengumuman'}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <h2 className="font-bold text-base mb-4" style={{ color: '#0F172A' }}>Data Pengumuman</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Judul Pengumuman *</label>
              <input value={pengumuman.judul} onChange={(e) => setPengumuman({ ...pengumuman, judul: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Tanggal</label>
              <input type="date" value={pengumuman.tanggal} onChange={(e) => setPengumuman({ ...pengumuman, tanggal: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium" style={{ color: '#0F172A' }}>
                <input type="checkbox" checked={pengumuman.penting} onChange={(e) => setPengumuman({ ...pengumuman, penting: e.target.checked })} />
                Tandai sebagai Penting
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Konten *</label>
              <textarea value={pengumuman.konten} onChange={(e) => setPengumuman({ ...pengumuman, konten: e.target.value })} rows={6}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none resize-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }} />
            </div>
          </div>
        </div>

        <div className="flex justify-end pb-10">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
            style={{ background: '#1E3A5F' }}>
            <Save className="w-4 h-4" />
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Simpan Pengumuman')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PengumumanForm
