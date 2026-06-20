import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [studentDropdown, setStudentDropdown] = useState(false)
  const [alumniDropdown, setAlumniDropdown] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setStudentDropdown(false)
    setAlumniDropdown(false)
  }, [location])

  const navBg = isHome
    ? scrolled
      ? 'bg-white shadow-lg'
      : 'bg-transparent'
    : 'bg-white shadow-lg'

  const textColor = isHome && !scrolled ? 'text-white' : 'text-gray-800'
  const logoColor = isHome && !scrolled ? 'text-white' : 'text-[#0F4C81]'

  const navLinks = [
    { label: 'Beranda', href: '/' },
    {
      label: 'Daftar Murid',
      dropdown: [
        { label: 'Kelas 10', href: '/murid/kelas10' },
        { label: 'Kelas 11', href: '/murid/kelas11' },
        { label: 'Kelas 12', href: '/murid/kelas12' },
      ],
    },
    {
      label: 'Foto Alumni',
      dropdown: [
        { label: 'Alumni 2025', href: '/alumni/2025' },
        { label: 'Alumni 2024', href: '/alumni/2024' },
      ],
    },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Tentang Rayon', href: '/tentang' },
    { label: 'Kontak', href: '/kontak' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md"
              style={{ background: isHome && !scrolled ? 'rgba(255,255,255,0.2)' : '#0F4C81', color: 'white', border: isHome && !scrolled ? '1px solid rgba(255,255,255,0.3)' : 'none' }}>
              W2
            </div>
            <div>
              <p className={`font-bold text-lg leading-tight transition-colors ${logoColor}`}>WIKRAMA 2</p>
              <p className={`text-xs leading-tight transition-colors ${isHome && !scrolled ? 'text-blue-200' : 'text-gray-400'}`}>SMK Wikrama Bogor</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.label === 'Daftar Murid') setStudentDropdown(true)
                    else setAlumniDropdown(true)
                  }}
                  onMouseLeave={() => {
                    if (link.label === 'Daftar Murid') setStudentDropdown(false)
                    else setAlumniDropdown(false)
                  }}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${textColor}`}
                  >
                    {link.label}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {(link.label === 'Daftar Murid' ? studentDropdown : alumniDropdown) && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0F4C81] font-medium transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${textColor} ${location.pathname === link.href ? 'bg-white/20' : ''}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${textColor} hover:bg-white/10`}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''} ${isHome && !scrolled ? 'bg-white' : 'bg-gray-700'}`} />
              <span className={`block h-0.5 rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''} ${isHome && !scrolled ? 'bg-white' : 'bg-gray-700'}`} />
              <span className={`block h-0.5 rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''} ${isHome && !scrolled ? 'bg-white' : 'bg-gray-700'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <p className="px-3 py-2 text-sm font-semibold text-[#0F4C81]">{link.label}</p>
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="block px-6 py-2 text-sm text-gray-600 hover:text-[#0F4C81] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === link.href ? 'text-[#0F4C81] bg-blue-50' : 'text-gray-700 hover:text-[#0F4C81] hover:bg-gray-50'}`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
