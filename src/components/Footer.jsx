import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Mail, AtSign } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #0a3660 0%, #0F4C81 100%)' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-bold text-xl border border-white/30">
                W2
              </div>
              <div>
                <h3 className="font-bold text-xl">Wikrama 2</h3>
                <p className="text-blue-200 text-xs">SMK Wikrama Bogor</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Tempat Bertumbuh, Berkarya, dan Menginspirasi Bersama. Rayon kebanggaan SMK Wikrama Bogor.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Menu Utama</h4>
            <ul className="space-y-2">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Tentang Rayon', href: '/tentang' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Kontak', href: '/kontak' },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-blue-200 hover:text-white text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-sky-400 rounded-full" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kelas */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Daftar Murid</h4>
            <ul className="space-y-2">
              {[
                { label: 'Kelas 10', href: '/murid/kelas10' },
                { label: 'Kelas 11', href: '/murid/kelas11' },
                { label: 'Kelas 12', href: '/murid/kelas12' },
                { label: 'Alumni 2025', href: '/alumni/2025' },
                { label: 'Alumni 2024', href: '/alumni/2024' },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-blue-200 hover:text-white text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-sky-400 rounded-full" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-blue-200">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" strokeWidth={1.8} />
                Jl. Raya Wangun, RT.01/RW.06, Sindangsari, Kec. Bogor Tim., Kota Bogor, Jawa Barat 16146
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <Mail className="w-4 h-4 shrink-0 text-sky-400" strokeWidth={1.8} />
                wikrama2@smkwikrama.sch.id
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <AtSign className="w-4 h-4 shrink-0 text-sky-400" strokeWidth={1.8} />
                @wikrama2_bogor
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-blue-200 text-xs">
            © {new Date().getFullYear()} WIKRAMA 2 - SMK Wikrama Bogor. All rights reserved.
          </p>
          <p className="text-blue-300 text-xs">
            Dibuat Oleh Syafa
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
