import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [studentDropdown, setStudentDropdown] = useState(false)
  const [alumniDropdown, setAlumniDropdown] = useState(false)
  const location = useLocation()

  const isHomePage = location.pathname === '/'

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

  const transparent = isHomePage && !scrolled

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
        { label: 'Alumni 2026', href: '/alumni/2026' },
      ],
    },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Tentang Rayon', href: '/tentang' },
    { label: 'Kontak', href: '/kontak' },
    { label: 'Kritik & Saran', href: '/chat' },
    { label: 'Admin', href: '/admin/login' },
  ]

  const isActive = (href) => location.pathname === href

  const textColor = transparent ? '#ffffff' : '#0F172A'
  const subtitleColor = transparent ? 'rgba(255,255,255,0.55)' : '#64748B'

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-300"
      style={{
        background: transparent ? 'transparent' : 'rgba(255,255,255,0.95)',
        backdropFilter: transparent ? 'none' : 'blur(20px)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(20px)',
        borderBottom: transparent ? '1px solid transparent' : '1px solid #E2E8F0',
        boxShadow: transparent ? 'none' : '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/favicon.png" alt="Logo Wikrama 2" className="w-9 h-9 rounded-xl object-cover" />
            <div>
              <p className="font-extrabold text-lg leading-tight tracking-wide" style={{ color: textColor }}>WIKRAMA 2</p>
              <p className="text-xs leading-tight" style={{ color: subtitleColor }}>SMK Wikrama Bogor</p>
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
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{ color: textColor }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1E3A5F'}
                    onMouseLeave={e => e.currentTarget.style.color = textColor}
                  >
                    {link.label}
                    <svg className="w-3.5 h-3.5 mt-0.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        className="absolute top-full left-0 mt-2 w-44 rounded-xl overflow-hidden"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
                        }}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="block px-4 py-2.5 text-sm font-medium transition-colors duration-150"
                            style={{ color: '#0F172A' }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#1E3A5F'; e.currentTarget.style.background = '#F8FAFC' }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.background = 'transparent' }}
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
                  className="px-3 py-2 rounded-lg text-sm transition-all duration-200"
                  style={{
                    color: isActive(link.href) ? '#1E3A5F' : textColor,
                    fontWeight: isActive(link.href) ? 700 : 500,
                  }}
                  onMouseEnter={e => { if (!isActive(link.href)) e.currentTarget.style.color = '#1E3A5F' }}
                  onMouseLeave={e => { if (!isActive(link.href)) e.currentTarget.style.color = textColor }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: textColor }}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                style={{ background: textColor }} />
              <span className={`block h-0.5 rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
                style={{ background: textColor }} />
              <span className={`block h-0.5 rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
                style={{ background: textColor }} />
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
            className="lg:hidden overflow-hidden"
            style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <p className="px-3 py-2 text-sm font-semibold" style={{ color: '#1E3A5F' }}>{link.label}</p>
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="block px-6 py-2 text-sm rounded-lg transition-colors"
                        style={{ color: '#0F172A' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block px-3 py-2 text-sm rounded-lg transition-colors"
                    style={{
                      color: isActive(link.href) ? '#1E3A5F' : '#0F172A',
                      background: isActive(link.href) ? '#F8FAFC' : 'transparent',
                      fontWeight: isActive(link.href) ? 700 : 500,
                    }}
                    onMouseEnter={e => { if (!isActive(link.href)) e.currentTarget.style.background = '#F8FAFC' }}
                    onMouseLeave={e => { if (!isActive(link.href)) e.currentTarget.style.background = 'transparent' }}
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
