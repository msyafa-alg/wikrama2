import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../components/Toast'

const kategoriOptions = ['Kegiatan', 'Prestasi', 'Pengumuman']

const initialBerita = {
  judul: '',
  slug: '',
  konten: '',
  gambar: '',
  penulis: '',
  tanggal: new Date().toISOString().split('T')[0],
  kategori: 'Kegiatan',
}

const BeritaForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const toast = useToast()

  const [berita, setBerita] = useState(initialBerita)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEdit)
  const [gambarFile, setGambarFile] = useState(null)
  const [gambarPreview, setGambarPreview] = useState(null)

  useEffect(() => {
    if (!isEdit) return
    const fetchData = async () => {
      const { data } = await supabase.from('berita').select('*').eq('id', id).single()
      if (data) {
        setBerita(data)
        setGambarPreview(data.gambar)
      }
      setLoading(false)
    }
    fetchData()
  }, [id])

  const generateSlug = (judul) => {
    return judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  const handleJudulChange = (value) => {
    setBerita(prev => ({
      ...prev,
      judul: value,
      slug: isEdit ? prev.slug : generateSlug(value),
    }))
  }

  const handleGambarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setGambarFile(file)
    setGambarPreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!berita.judul.trim() || !berita.konten.trim()) {
      alert('Judul dan konten wajib diisi')
      return
    }

    setSaving(true)

    let gambarUrl = berita.gambar || ''

    if (gambarFile) {
      const ext = gambarFile.name.split('.').pop()
      const path = `berita/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadErr } = await supabase.storage.from('student-files').upload(path, gambarFile)
      if (uploadErr) {
        alert('Gagal upload gambar: ' + uploadErr.message)
        setSaving(false)
        return
      }
      const { data: urlData } = supabase.storage.from('student-files').getPublicUrl(path)
      gambarUrl = urlData.publicUrl
    }

    const payload = {
      ...berita,
      gambar: gambarUrl,
      slug: berita.slug || generateSlug(berita.judul),
    }

    if (isEdit) {
      await supabase.from('berita').update(payload).eq('id', id)
    } else {
      await supabase.from('berita').insert(payload)
    }

    setSaving(false)
    toast(isEdit ? 'Berita berhasil diperbarui' : 'Berita berhasil ditambahkan', 'success')
    navigate('/admin/berita')
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
          <button onClick={() => navigate('/admin/berita')}
            className="flex items-center gap-2 text-sm font-medium text-white">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          <p className="text-white font-bold text-sm">{isEdit ? 'Edit Berita' : 'Tambah Berita'}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <h2 className="font-bold text-base mb-4" style={{ color: '#0F172A' }}>Data Berita</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Judul Berita *</label>
              <input value={berita.judul} onChange={(e) => handleJudulChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Slug (URL)</label>
              <input value={berita.slug} onChange={(e) => setBerita({ ...berita, slug: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Kategori</label>
              <select value={berita.kategori} onChange={(e) => setBerita({ ...berita, kategori: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}>
                {kategoriOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Tanggal</label>
              <input type="date" value={berita.tanggal} onChange={(e) => setBerita({ ...berita, tanggal: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Penulis</label>
              <input value={berita.penulis} onChange={(e) => setBerita({ ...berita, penulis: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Gambar Cover</label>
                  {gambarPreview ? (
                    <img src={gambarPreview} alt="Preview" className="w-full h-32 object-cover rounded-xl mb-2" />
                  ) : (
                    <div className="w-full h-32 rounded-xl mb-2 flex items-center justify-center text-xs" style={{ background: '#F8FAFC', border: '1px dashed #E2E8F0', color: '#94A3B8' }}>
                      Belum ada gambar
                    </div>
                  )}
              <input type="file" accept="image/*" onChange={handleGambarChange}
                className="text-sm" style={{ color: '#64748B' }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Konten *</label>
              <textarea value={berita.konten} onChange={(e) => setBerita({ ...berita, konten: e.target.value })} rows={8}
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
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Simpan Berita')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BeritaForm
