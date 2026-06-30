import * as XLSX from 'xlsx'

const kelasLabels = {
  kelas10: 'Kelas 10',
  kelas11: 'Kelas 11',
  kelas12: 'Kelas 12',
}

export const exportSiswa = (data) => {
  const rows = data.map(s => ({
    Nama: s.nama,
    Kelas: kelasLabels[s.kelas] || s.kelas,
    Rombel: s.rombel || '',
    Alamat: s.alamat || '',
  }))

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, ws, 'Siswa')
  XLSX.writeFile(wb, `data-siswa-${new Date().toISOString().slice(0, 10)}.xlsx`)
}

export const exportAlumni = (data) => {
  const rows = data.map(a => ({
    Nama: a.nama,
    Angkatan: a.angkatan || '',
    Rombel: a.rombel || '',
    Aktivitas: a.aktivitas || '',
    Alamat: a.alamat || '',
  }))

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, ws, 'Alumni')
  XLSX.writeFile(wb, `data-alumni-${new Date().toISOString().slice(0, 10)}.xlsx`)
}
