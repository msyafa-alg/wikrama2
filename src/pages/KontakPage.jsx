import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, AtSign, MapPin, Clock } from 'lucide-react'

const KontakPage = () => {
  const [form, setForm] = useState({ nama: '', email: '', subjek: '', pesan: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ nama: '', email: '', subjek: '', pesan: '' })
    }, 4000)
  }

  const contacts = [
    { icon: Mail,   label: 'Email',            value: 'wikrama2@smkwikrama.sch.id',   link: 'mailto:wikrama2@smkwikrama.sch.id' },
    { icon: AtSign, label: 'Instagram',         value: '@wikrama2_bogor',              link: 'https://instagram.com/wikrama2_bogor' },
    { icon: MapPin, label: 'Alamat',            value: 'Jl. Raya Wangun, RT.01/RW.06, Sindangsari, Kec. Bogor Tim., Kota Bogor, Jawa Barat 16146', link: null },
    { icon: Clock,  label: 'Jam Operasional',   value: 'Senin–Jumat: 07.00 – 16.00 WIB', link: null },
  ]

  const inputStyle = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    color: '#0F172A',
    borderRadius: '0.75rem',
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: '#FFFFFF' }}>
      {/* Header — biru tua */}
      <div className="py-14 px-4" style={{ background: '#1E3A5F' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff' }}>
              Hubungi Kami
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">Kontak</h1>
            <p className="mt-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Kami siap membantu. Jangan ragu untuk menghubungi kami.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0F172A' }}>Kirim Pesan</h2>

            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-2xl p-8 text-center"
                style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(16,185,129,0.12)' }}>
                    <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold text-emerald-600 text-lg mb-2">Pesan Terkirim!</h3>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>Nama Lengkap</label>
                    <input
                      type="text" name="nama" required
                      value={form.nama} onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                      style={{ ...inputStyle, '--tw-ring-color': '#1E3A5F' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>Email</label>
                    <input
                      type="email" name="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                      style={{ ...inputStyle, '--tw-ring-color': '#1E3A5F' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>Subjek</label>
                  <input
                    type="text" name="subjek" required
                    value={form.subjek} onChange={handleChange}
                    placeholder="Subjek pesan"
                    className="w-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ ...inputStyle, '--tw-ring-color': '#1E3A5F' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>Pesan</label>
                  <textarea
                    name="pesan" required rows={5}
                    value={form.pesan} onChange={handleChange}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all resize-none"
                    style={{ ...inputStyle, '--tw-ring-color': '#1E3A5F' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all"
                  style={{ background: '#1E3A5F', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#152d4a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#1E3A5F'}
                >
                  Kirim Pesan →
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0F172A' }}>Informasi Kontak</h2>

            {contacts.map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl"
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(30,58,95,0.08)' }}>
                  <c.icon className="w-5 h-5" style={{ color: '#1E3A5F' }} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-xs font-medium mb-0.5" style={{ color: '#64748B' }}>{c.label}</p>
                  {c.link ? (
                    <a href={c.link} target="_blank" rel="noopener noreferrer"
                      className="font-semibold text-sm hover:underline" style={{ color: '#1E3A5F' }}>
                      {c.value}
                    </a>
                  ) : (
                    <p className="font-medium text-sm" style={{ color: '#0F172A' }}>{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Maps */}
            <div className="rounded-2xl overflow-hidden mt-4"
              style={{
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4004.2953180831933!2d106.84130407504139!3d-6.645191993349424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c89505b4c37d%3A0x307fc4a38e65fa2b!2sSMK%20Wikrama%20Bogor!5e1!3m2!1sid!2sid!4v1781933306852!5m2!1sid!2sid"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default KontakPage
