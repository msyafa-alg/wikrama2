import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, AtSign, Clock } from 'lucide-react'

const LokasiSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const info = [
    { icon: MapPin, label: 'Alamat', value: 'Jl. Raya Wangun, RT.01/RW.06, Sindangsari, Kec. Bogor Tim., Kota Bogor, Jawa Barat 161466' },
    { icon: Mail, label: 'Email', value: 'wikrama2@smkwikrama.sch.id' },
    { icon: AtSign, label: 'Instagram', value: '@wikrama2_bogor' },
    { icon: Clock, label: 'Jam Sekolah', value: 'Senin–Jumat: 07.00 – 16.00 WIB' },
  ]

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-[#0F4C81] mb-3"
            style={{ background: 'rgba(15,76,129,0.08)', border: '1px solid rgba(15,76,129,0.2)' }}>
            Temukan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Lokasi Kami</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Maps */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl border border-gray-100"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4004.2953180831933!2d106.84130407504139!3d-6.645191993349424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c89505b4c37d%3A0x307fc4a38e65fa2b!2sSMK%20Wikrama%20Bogor!5e1!3m2!1sid!2sid!4v1781933306852!5m2!1sid!2sid"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi SMK Wikrama Bogor"
            />
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-2xl p-6 space-y-4 shadow-xl border border-gray-100"
            style={{ background: 'linear-gradient(135deg, #0F4C81, #0a3660)' }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Informasi Rayon</h3>
            {info.map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(56,189,248,0.2)' }}>
                  <item.icon className="w-4 h-4 text-sky-300" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sky-300 text-xs font-medium mb-0.5">{item.label}</p>
                  <p className="text-white text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LokasiSection
