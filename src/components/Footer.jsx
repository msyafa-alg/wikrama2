import { Link } from 'react-router-dom'
import { MapPin, Mail, AtSign } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={{ background: '#1E3A5F', borderTop: '1px solid rgba(255,255,255,0.08)' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="Logo Wikrama 2" className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-xl text-white">Wikrama 2</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>SMK Wikrama Bogor</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Tempat Bertumbuh, Berkarya, dan Menginspirasi Bersama. Rayon kebanggaan SMK Wikrama Bogor.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-white">Menu Utama</h4>
            <ul className="space-y-2">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Tentang Rayon', href: '/tentang' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Kontak', href: '/kontak' },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href}
                    className="text-sm transition-colors flex items-center gap-2 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#F59E0B' }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kelas */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-white">Daftar Murid</h4>
            <ul className="space-y-2">
              {[
                { label: 'Kelas 10', href: '/murid/kelas10' },
                { label: 'Kelas 11', href: '/murid/kelas11' },
                { label: 'Kelas 12', href: '/murid/kelas12' },
                { label: 'Alumni 2026', href: '/alumni/2026' },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href}
                    className="text-sm transition-colors flex items-center gap-2 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#F59E0B' }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-white">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#F59E0B' }} strokeWidth={1.8} />
                Jl. Raya Wangun, RT.01/RW.06, Sindangsari, Kec. Bogor Tim., Kota Bogor, Jawa Barat 16146
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <Mail className="w-4 h-4 shrink-0" style={{ color: '#F59E0B' }} strokeWidth={1.8} />
                wikrama2@smkwikrama.sch.id
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <AtSign className="w-4 h-4 shrink-0" style={{ color: '#F59E0B' }} strokeWidth={1.8} />
                @wikrama2_bogor
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            © {new Date().getFullYear()} WIKRAMA 2 - SMK Wikrama Bogor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
