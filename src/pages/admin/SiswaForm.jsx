import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, X, Plus, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../components/Toast'

const kelasOptions = [
  { value: 'kelas10', label: 'Kelas 10' },
  { value: 'kelas11', label: 'Kelas 11' },
  { value: 'kelas12', label: 'Kelas 12' },
]

const initialSiswa = {
  nama: '',
  rombel: '',
  alamat: '',
  kelas: 'kelas10',
  is_dev_web: false,
  is_creator: false,
}

const initialDetail = {
  ttl: '',
  nisn: '',
  email: '',
  no_hp: '',
  tentang: '',
  keahlian: [],
  porto_link: '',
  portofolio_pdf: '',
  sertifikat: [],
  cv: {
    pendidikan: '',
    pengalaman: [],
    organisasi: [],
    prestasi: [],
  },
}

const SiswaForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [siswa, setSiswa] = useState(initialSiswa)
  const [detail, setDetail] = useState(initialDetail)
  const [fotoFile, setFotoFile] = useState(null)
  const [cvFile, setCvFile] = useState(null)
  const [portofolioPdfFile, setPortofolioPdfFile] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEdit)
  const toast = useToast()
  const [keahlianInput, setKeahlianInput] = useState('')
  const [sertifikatFiles, setSertifikatFiles] = useState({})
  const [sertifikatPdfFiles, setSertifikatPdfFiles] = useState({})

  useEffect(() => {
    if (!isEdit) return
    const fetchData = async () => {
      const { data: s } = await supabase.from('students').select('*').eq('id', id).single()
      if (s) {
        setSiswa(s)
        setFotoPreview(s.foto)
      }

      const { data: d } = await supabase.from('student_details').select('*').eq('id', id).single()
      if (d) {
        setDetail({
          ttl: d.ttl || '',
          nisn: d.nisn || '',
          email: d.email || '',
          no_hp: d.no_hp || '',
          tentang: d.tentang || '',
          keahlian: d.keahlian || [],
          porto_link: d.porto_link || '',
          portofolio_pdf: d.portofolio_pdf || '',
          sertifikat: d.sertifikat || [],
          cv: d.cv || initialDetail.cv,
        })
      }

      setLoading(false)
    }
    fetchData()
  }, [id])

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFotoFile(file)
    setFotoPreview(URL.createObjectURL(file))
  }

  const handleCvChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCvFile(file)
  }

  const addKeahlian = () => {
    const v = keahlianInput.trim()
    if (v && !detail.keahlian.includes(v)) {
      setDetail({ ...detail, keahlian: [...detail.keahlian, v] })
    }
    setKeahlianInput('')
  }

  const removeKeahlian = (idx) => {
    setDetail({ ...detail, keahlian: detail.keahlian.filter((_, i) => i !== idx) })
  }

  const addSertifikat = () => {
    const id = Date.now()
    setDetail({
      ...detail,
      sertifikat: [...detail.sertifikat, { id, nama: '', penerbit: '', tahun: '', gambar: '', file_pdf: '' }],
    })
    setSertifikatFiles(prev => ({ ...prev, [id]: null }))
    setSertifikatPdfFiles(prev => ({ ...prev, [id]: null }))
  }

  const updateSertifikat = (idx, field, value) => {
    const updated = [...detail.sertifikat]
    updated[idx] = { ...updated[idx], [field]: value }
    setDetail({ ...detail, sertifikat: updated })
  }

  const handleSertifikatFile = (id, file) => {
    setSertifikatFiles(prev => ({ ...prev, [id]: file }))
  }

  const handleSertifikatPdf = (id, file) => {
    setSertifikatPdfFiles(prev => ({ ...prev, [id]: file }))
  }

  const removeSertifikat = (idx) => {
    const removed = detail.sertifikat[idx]
    setSertifikatFiles(prev => { const n = { ...prev }; delete n[removed.id]; return n })
    setSertifikatPdfFiles(prev => { const n = { ...prev }; delete n[removed.id]; return n })
    setDetail({ ...detail, sertifikat: detail.sertifikat.filter((_, i) => i !== idx) })
  }

  const addCvItem = (field) => {
    const updated = { ...detail, cv: { ...detail.cv } }
    if (field === 'pengalaman') {
      updated.cv.pengalaman = [...(updated.cv.pengalaman || []), { posisi: '', tempat: '', periode: '' }]
    } else {
      updated.cv[field] = [...(updated.cv[field] || []), '']
    }
    setDetail(updated)
  }

  const updateCvItem = (field, idx, value) => {
    const updated = { ...detail, cv: { ...detail.cv } }
    if (field === 'pengalaman') {
      updated.cv.pengalaman = [...updated.cv.pengalaman]
      updated.cv.pengalaman[idx] = { ...updated.cv.pengalaman[idx], ...value }
    } else {
      updated.cv[field] = [...updated.cv[field]]
      updated.cv[field][idx] = value
    }
    setDetail(updated)
  }

  const removeCvItem = (field, idx) => {
    const updated = { ...detail, cv: { ...detail.cv } }
    updated.cv[field] = updated.cv[field].filter((_, i) => i !== idx)
    setDetail(updated)
  }

  const handleSave = async () => {
    if (!siswa.nama.trim()) {
      alert('Nama siswa wajib diisi')
      return
    }

    setSaving(true)

    let fotoUrl = fotoPreview || ''

    if (fotoFile) {
      const ext = fotoFile.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadErr } = await supabase.storage.from('student-files').upload(path, fotoFile)
      if (uploadErr) {
        alert('Gagal upload foto: ' + uploadErr.message)
        setSaving(false)
        return
      }
      const { data: urlData } = supabase.storage.from('student-files').getPublicUrl(path)
      fotoUrl = urlData.publicUrl
    }

    let cvLink = detail.porto_link ? '' : ''
    if (isEdit) {
      const { data: oldDetail } = await supabase.from('student_details').select('cv_link').eq('id', id).single()
      cvLink = oldDetail?.cv_link || ''
    }

    if (cvFile) {
      const ext = cvFile.name.split('.').pop()
      const path = `cv/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadErr } = await supabase.storage.from('student-files').upload(path, cvFile)
      if (uploadErr) {
        alert('Gagal upload CV: ' + uploadErr.message)
        setSaving(false)
        return
      }
      const { data: urlData } = supabase.storage.from('student-files').getPublicUrl(path)
      cvLink = urlData.publicUrl
    }



    const siswaPayload = {
      nama: siswa.nama,
      rombel: siswa.rombel,
      alamat: siswa.alamat,
      kelas: siswa.kelas,
      foto: fotoUrl,
      is_dev_web: siswa.is_dev_web,
      is_creator: siswa.is_creator,
    }

    let siswaId = id

    if (isEdit) {
      const { error: upErr } = await supabase.from('students').update(siswaPayload).eq('id', id)
      if (upErr) {
        alert('Gagal update siswa: ' + upErr.message)
        setSaving(false)
        return
      }
    } else {
      const { data: newSiswa, error: insertErr } = await supabase.from('students').insert(siswaPayload).select('id').single()
      if (insertErr) {
        alert('Gagal simpan siswa: ' + insertErr.message)
        setSaving(false)
        return
      }
      siswaId = newSiswa.id
    }

    const updatedSertifikat = []
    for (const sert of detail.sertifikat) {
      const file = sertifikatFiles[sert.id]
      const pdfFile = sertifikatPdfFiles[sert.id]
      let gambarUrl = sert.gambar || ''
      let pdfUrl = sert.file_pdf || ''

      if (file) {
        const ext = file.name.split('.').pop()
        const path = `sertifikat/${siswaId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error: upErr } = await supabase.storage.from('student-files').upload(path, file)
        if (upErr) { alert('Gagal upload gambar sertifikat: ' + upErr.message); setSaving(false); return }
        const { data: urlData } = supabase.storage.from('student-files').getPublicUrl(path)
        gambarUrl = urlData.publicUrl
      }

      if (pdfFile) {
        const ext = pdfFile.name.split('.').pop()
        const path = `sertifikat/${siswaId}/pdf/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error: upErr } = await supabase.storage.from('student-files').upload(path, pdfFile)
        if (upErr) { alert('Gagal upload PDF sertifikat: ' + upErr.message); setSaving(false); return }
        const { data: urlData } = supabase.storage.from('student-files').getPublicUrl(path)
        pdfUrl = urlData.publicUrl
      }

      updatedSertifikat.push({ ...sert, gambar: gambarUrl, file_pdf: pdfUrl })
    }

    let portofolioPdfUrl = detail.portofolio_pdf || ''
    if (portofolioPdfFile) {
      const ext = portofolioPdfFile.name.split('.').pop()
      const path = `portofolio/${siswaId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: upErr } = await supabase.storage.from('student-files').upload(path, portofolioPdfFile)
      if (upErr) { alert('Gagal upload PDF portofolio: ' + upErr.message); setSaving(false); return }
      const { data: urlData } = supabase.storage.from('student-files').getPublicUrl(path)
      portofolioPdfUrl = urlData.publicUrl
    }

    const detailPayload = {
      ttl: detail.ttl,
      nisn: detail.nisn,
      email: detail.email,
      no_hp: detail.no_hp,
      tentang: detail.tentang,
      keahlian: detail.keahlian,
      porto_link: detail.porto_link,
      portofolio_pdf: portofolioPdfUrl,
      cv_link: cvLink,
      sertifikat: updatedSertifikat,
      cv: detail.cv,
    }

    if (isEdit) {
      await supabase.from('student_details').upsert({ id: siswaId, ...detailPayload })
    } else {
      await supabase.from('student_details').insert({ id: siswaId, ...detailPayload })
    }

    setSaving(false)
    toast(isEdit ? 'Siswa berhasil diperbarui' : 'Siswa berhasil ditambahkan', 'success')
    navigate('/admin/siswa')
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
          <button onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-sm font-medium text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          <p className="text-white font-bold text-sm">{isEdit ? 'Edit Siswa' : 'Tambah Siswa'}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Data Dasar */}
        <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <h2 className="font-bold text-base mb-4" style={{ color: '#0F172A' }}>Data Dasar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Nama Lengkap *</label>
              <input value={siswa.nama} onChange={(e) => setSiswa({ ...siswa, nama: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Kelas</label>
              <select value={siswa.kelas} onChange={(e) => setSiswa({ ...siswa, kelas: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              >
                {kelasOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Rombel</label>
              <input value={siswa.rombel} onChange={(e) => setSiswa({ ...siswa, rombel: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Alamat</label>
              <input value={siswa.alamat} onChange={(e) => setSiswa({ ...siswa, alamat: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
            </div>
            <div className="sm:col-span-2 flex gap-6">
              <label className="flex items-center gap-2 text-sm" style={{ color: '#0F172A' }}>
                <input type="checkbox" checked={siswa.is_dev_web} onChange={(e) => setSiswa({ ...siswa, is_dev_web: e.target.checked })} />
                Dev Web
              </label>
              <label className="flex items-center gap-2 text-sm" style={{ color: '#0F172A' }}>
                <input type="checkbox" checked={siswa.is_creator} onChange={(e) => setSiswa({ ...siswa, is_creator: e.target.checked })} />
                Creator
              </label>
            </div>
          </div>
        </div>

        {/* Foto & CV Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <h2 className="font-bold text-sm mb-3" style={{ color: '#0F172A' }}>Foto Siswa</h2>
            {fotoPreview && (
              <img src={fotoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl mb-3" />
            )}
            <input type="file" accept="image/*" onChange={handleFotoChange}
              className="text-sm" style={{ color: '#64748B' }}
            />
          </div>
          <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <h2 className="font-bold text-sm mb-3" style={{ color: '#0F172A' }}>CV (PDF)</h2>
            {cvFile && <p className="text-sm mb-2" style={{ color: '#64748B' }}>{cvFile.name}</p>}
            <input type="file" accept=".pdf" onChange={handleCvChange}
              className="text-sm" style={{ color: '#64748B' }}
            />
          </div>
        </div>

        {/* Detail */}
        <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <h2 className="font-bold text-base mb-4" style={{ color: '#0F172A' }}>Detail Siswa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>TTL</label>
              <input value={detail.ttl} onChange={(e) => setDetail({ ...detail, ttl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>NISN</label>
              <input value={detail.nisn} onChange={(e) => setDetail({ ...detail, nisn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Email</label>
              <input value={detail.email} onChange={(e) => setDetail({ ...detail, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>No. HP</label>
              <input value={detail.no_hp} onChange={(e) => setDetail({ ...detail, no_hp: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Tentang</label>
              <textarea value={detail.tentang} onChange={(e) => setDetail({ ...detail, tentang: e.target.value })} rows={3}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none resize-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Portfolio Link</label>
              <input value={detail.porto_link} onChange={(e) => setDetail({ ...detail, porto_link: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Portfolio PDF</label>
              {portofolioPdfFile && <p className="text-xs mb-1" style={{ color: '#64748B' }}>{portofolioPdfFile.name}</p>}
              <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) setPortofolioPdfFile(f) }}
                className="text-sm w-full" style={{ color: '#64748B' }} />
            </div>
          </div>
        </div>

        {/* Keahlian */}
        <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <h2 className="font-bold text-sm mb-3" style={{ color: '#0F172A' }}>Keahlian</h2>
          <div className="flex gap-2 mb-3">
            <input value={keahlianInput} onChange={(e) => setKeahlianInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeahlian())}
              className="flex-1 px-3 py-2 rounded-xl text-sm focus:outline-none"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              placeholder="Tambah keahlian..."
            />
            <button onClick={addKeahlian}
              className="px-3 py-2 rounded-xl text-white text-sm font-medium"
              style={{ background: '#1E3A5F' }}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {detail.keahlian.map((k, i) => (
              <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium"
                style={{ background: 'rgba(30,58,95,0.07)', border: '1px solid #E2E8F0', color: '#1E3A5F' }}>
                {k}
                <button onClick={() => removeKeahlian(i)} className="hover:opacity-60"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Sertifikat */}
        <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm" style={{ color: '#0F172A' }}>Sertifikat</h2>
            <button onClick={addSertifikat}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: '#1E3A5F' }}
            >
              <Plus className="w-3.5 h-3.5" /> Tambah
            </button>
          </div>
          <div className="space-y-3">
            {detail.sertifikat.map((sert, i) => {
              const file = sertifikatFiles[sert.id]
              const previewUrl = file ? URL.createObjectURL(file) : (sert.gambar || null)
              return (
                <div key={sert.id} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  {previewUrl && (
                    <img src={previewUrl} alt={sert.nama} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  )}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input value={sert.nama} onChange={(e) => updateSertifikat(i, 'nama', e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg text-xs focus:outline-none"
                      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
                      placeholder="Nama sertifikat"
                    />
                    <input value={sert.penerbit} onChange={(e) => updateSertifikat(i, 'penerbit', e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg text-xs focus:outline-none"
                      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
                      placeholder="Penerbit"
                    />
                    <div className="flex gap-2">
                      <input value={sert.tahun} onChange={(e) => updateSertifikat(i, 'tahun', e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg text-xs focus:outline-none"
                        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
                        placeholder="Tahun"
                      />
                      <label className="shrink-0 px-2 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
                        style={{ background: 'rgba(30,58,95,0.1)', border: '1px solid #E2E8F0', color: '#1E3A5F' }}>
                        <input type="file" accept="image/*" className="hidden"
                          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleSertifikatFile(sert.id, f) }} />
                        {sert.gambar || sertifikatFiles[sert.id] ? 'Ganti' : 'Foto'}
                      </label>
                      <label className="shrink-0 px-2 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
                        style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
                        <input type="file" accept=".pdf" className="hidden"
                          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleSertifikatPdf(sert.id, f) }} />
                        {sert.file_pdf || sertifikatPdfFiles[sert.id] ? 'PDF' : 'PDF'}
                      </label>
                    </div>
                  </div>
                  <button onClick={() => removeSertifikat(i)} className="p-1.5 rounded-lg hover:opacity-60" style={{ color: '#DC2626' }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* CV */}
        <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <h2 className="font-bold text-sm mb-4" style={{ color: '#0F172A' }}>CV</h2>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Pendidikan</label>
            <textarea value={detail.cv.pendidikan} onChange={(e) => setDetail({ ...detail, cv: { ...detail.cv, pendidikan: e.target.value } })} rows={2}
              className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none resize-none"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
            />
          </div>

          {/* Pengalaman */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: '#64748B' }}>Pengalaman</span>
              <button onClick={() => addCvItem('pengalaman')} className="text-xs font-semibold" style={{ color: '#1E3A5F' }}>+ Tambah</button>
            </div>
            {(detail.cv.pengalaman || []).map((p, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input value={p.posisi} onChange={(e) => updateCvItem('pengalaman', i, { posisi: e.target.value })}
                    className="px-2.5 py-1.5 rounded-lg text-xs focus:outline-none"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
                    placeholder="Posisi"
                  />
                  <input value={p.tempat} onChange={(e) => updateCvItem('pengalaman', i, { tempat: e.target.value })}
                    className="px-2.5 py-1.5 rounded-lg text-xs focus:outline-none"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
                    placeholder="Tempat"
                  />
                  <input value={p.periode} onChange={(e) => updateCvItem('pengalaman', i, { periode: e.target.value })}
                    className="px-2.5 py-1.5 rounded-lg text-xs focus:outline-none"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
                    placeholder="Periode"
                  />
                </div>
                <button onClick={() => removeCvItem('pengalaman', i)} className="p-1.5" style={{ color: '#DC2626' }}><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
          </div>

          {/* Organisasi */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: '#64748B' }}>Organisasi</span>
              <button onClick={() => addCvItem('organisasi')} className="text-xs font-semibold" style={{ color: '#1E3A5F' }}>+ Tambah</button>
            </div>
            {(detail.cv.organisasi || []).map((o, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <input value={o} onChange={(e) => updateCvItem('organisasi', i, e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded-lg text-xs focus:outline-none"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
                  placeholder="Nama organisasi"
                />
                <button onClick={() => removeCvItem('organisasi', i)} className="p-1.5" style={{ color: '#DC2626' }}><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
          </div>

          {/* Prestasi */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: '#64748B' }}>Prestasi</span>
              <button onClick={() => addCvItem('prestasi')} className="text-xs font-semibold" style={{ color: '#1E3A5F' }}>+ Tambah</button>
            </div>
            {(detail.cv.prestasi || []).map((p, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <input value={p} onChange={(e) => updateCvItem('prestasi', i, e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded-lg text-xs focus:outline-none"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
                  placeholder="Prestasi"
                />
                <button onClick={() => removeCvItem('prestasi', i)} className="p-1.5" style={{ color: '#DC2626' }}><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pb-10">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
            style={{ background: '#1E3A5F' }}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Simpan Siswa')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SiswaForm
