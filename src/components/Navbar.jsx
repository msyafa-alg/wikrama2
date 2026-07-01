import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownTimer = useRef(null)
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  const isChatPage = location.pathname === '/chat'

  const transparent = isHomePage && !scrolled

  const navHeight = transparent || isChatPage ? 64 : 54

  if (isChatPage) {
    return (
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-[100]"
        style={{
          height: 56,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <img src="/favicon.png" alt="" className="w-8 h-8 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide" style={{ color: '#0F172A' }}>WIKRAMA 2</span>
                <span className="text-xs" style={{ color: '#CBD5E1' }}>/</span>
                <span className="text-sm font-semibold" style={{ color: '#1E3A5F' }}>Kritik & Saran</span>
              </div>
            </Link>
          </div>
        </div>
      </motion.nav>
    )
  }

  const navItems = [
    { label: 'Beranda', href: '/' },
    {
      label: 'Informasi',
      dropdown: [
        { label: 'Berita', href: '/berita' },
        { label: 'Pengumuman', href: '/pengumuman' },
      ],
    },
    {
      label: 'Murid',
      dropdown: [
        { label: 'Daftar Murid', href: '/murid' },
        { label: 'Foto Alumni', href: '/alumni' },
      ],
    },
    {
      label: 'Tentang',
      dropdown: [
        { label: 'Tentang Rayon', href: '/tentang' },
        { label: 'Kontak', href: '/kontak' },
        { label: 'Kritik & Saran', href: '/chat' },
      ],
    },
    { label: 'Gallery', href: '/gallery' },
  ]

  const isActive = (item) => {
    if (item.href === '/') return location.pathname === '/'
    if (item.href) return location.pathname.startsWith(item.href)
    return false
  }

  const isDropdownActive = (item) => {
    if (!item.dropdown) return false
    return item.dropdown.some((child) => {
      if (child.href === '/murid' && location.pathname.startsWith('/murid')) return true
      if (child.href === '/alumni' && location.pathname.startsWith('/alumni')) return true
      return location.pathname === child.href
    })
  }

  const isAnyActive = (item) => isActive(item) || isDropdownActive(item)

  const handleDropdownEnter = (label) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
    setActiveDropdown(label)
  }

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  const textColor = transparent ? '#FFFFFF' : '#0F172A'
  const subtitleColor = transparent ? 'rgba(255,255,255,0.45)' : 'rgba(100,116,139,0.6)'
  const primaryColor = '#1E3A5F'
  const accentColor = '#F59E0B'

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-[100]"
      style={{
        height: navHeight,
        background: transparent
          ? 'transparent'
          : 'rgba(255,255,255,0.97)',
        backdropFilter: transparent ? 'none' : 'blur(24px)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(24px)',
        borderBottom: transparent ? '1px solid transparent' : '1px solid #E2E8F0',
        boxShadow: transparent
          ? 'none'
          : '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        transition: 'all 300ms ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/favicon.png"
              alt="Logo Wikrama 2"
              className="w-10 h-10 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div>
              <p
                className="font-extrabold text-xl leading-tight tracking-wide transition-colors duration-300"
                style={{ color: textColor }}
              >
                WIKRAMA <span style={{ color: accentColor }}>2</span>
              </p>
              <p
                className="text-xs leading-tight transition-colors duration-300"
                style={{ color: subtitleColor }}
              >
                SMK Wikrama Bogor
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className="relative flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-[0.5px]"
                    style={{
                      color: isAnyActive(item) ? primaryColor : textColor,
                    }}
                    onMouseEnter={(e) => {
                      if (!isAnyActive(item)) e.currentTarget.style.color = primaryColor
                    }}
                    onMouseLeave={(e) => {
                      if (!isAnyActive(item)) e.currentTarget.style.color = textColor
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-all duration-300 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                      style={{ opacity: 0.5 }}
                    />
                    {isAnyActive(item) && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-2 right-2 rounded-full"
                        style={{
                          height: 3,
                          background: accentColor,
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 w-48 overflow-hidden"
                        style={{
                          borderRadius: 14,
                          background: transparent
                            ? 'rgba(255,255,255,0.8)'
                            : 'rgba(255,255,255,0.85)',
                          backdropFilter: 'blur(24px)',
                          WebkitBackdropFilter: 'blur(24px)',
                          border: `1px solid ${
                            transparent ? 'rgba(255,255,255,0.2)' : 'rgba(226,232,240,0.8)'
                          }`,
                          boxShadow: '0 10px 40px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div className="py-1.5">
                          {item.dropdown.map((child) => {
                            const childActive =
                              location.pathname === child.href ||
                              (child.href === '/murid' && location.pathname.startsWith('/murid')) ||
                              (child.href === '/alumni' && location.pathname.startsWith('/alumni'))
                            return (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="block px-4 py-2.5 text-sm font-medium transition-all duration-150"
                                style={{
                                  color: childActive ? primaryColor : '#0F172A',
                                  background: childActive
                                    ? 'rgba(30,58,95,0.06)'
                                    : 'transparent',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(30,58,95,0.06)'
                                  e.currentTarget.style.color = primaryColor
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = childActive
                                    ? 'rgba(30,58,95,0.06)'
                                    : 'transparent'
                                  e.currentTarget.style.color = childActive
                                    ? primaryColor
                                    : '#0F172A'
                                }}
                              >
                                {child.label}
                              </Link>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-[0.5px]"
                  style={{ color: isActive(item) ? primaryColor : textColor }}
                  onMouseEnter={(e) => {
                    if (!isActive(item)) e.currentTarget.style.color = primaryColor
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item)) e.currentTarget.style.color = textColor
                  }}
                >
                  {item.label}
                  {isActive(item) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-2 right-2 rounded-full"
                      style={{
                        height: 3,
                        background: accentColor,
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              )
            )}

            <div className="ml-6">
              <Link
                to="/admin/login"
                className="relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden group"
                style={{
                  color: transparent ? '#FFFFFF' : primaryColor,
                  border: `1.5px solid ${
                    transparent ? 'rgba(255,255,255,0.35)' : primaryColor
                  }`,
                  background: transparent ? 'rgba(255,255,255,0.06)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = primaryColor
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.borderColor = primaryColor
                  e.currentTarget.style.boxShadow =
                    '0 0 0 1px rgba(30,58,95,0.1), 0 4px 24px rgba(30,58,95,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = transparent
                    ? 'rgba(255,255,255,0.06)'
                    : 'transparent'
                  e.currentTarget.style.color = transparent ? '#FFFFFF' : primaryColor
                  e.currentTarget.style.borderColor = transparent
                    ? 'rgba(255,255,255,0.35)'
                    : primaryColor
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span className="relative z-10">Login Admin</span>
              </Link>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/admin/login"
              className="px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300"
              style={{
                color: transparent ? 'rgba(255,255,255,0.85)' : primaryColor,
                border: `1px solid ${
                  transparent ? 'rgba(255,255,255,0.3)' : primaryColor
                }`,
              }}
            >
              Admin
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg transition-all duration-300"
              style={{ color: textColor }}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] rounded-full transition-all duration-300 ${
                    mobileOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                  style={{ background: textColor }}
                />
                <span
                  className={`block h-[1.5px] rounded-full transition-all duration-300 ${
                    mobileOpen ? 'opacity-0' : ''
                  }`}
                  style={{ background: textColor }}
                />
                <span
                  className={`block h-[1.5px] rounded-full transition-all duration-300 ${
                    mobileOpen ? '-rotate-45 -translate-y-2.5' : ''
                  }`}
                  style={{ background: textColor }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid #E2E8F0',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            }}
          >
            <div className="px-4 py-4 space-y-0.5">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200"
                      style={{
                        color: isAnyActive(item) ? primaryColor : '#0F172A',
                        background: isAnyActive(item)
                          ? 'rgba(30,58,95,0.06)'
                          : 'transparent',
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-all duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        style={{ opacity: 0.45 }}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div
                            className="ml-3 mt-1 space-y-0.5 border-l-2 pl-3"
                            style={{ borderColor: 'rgba(30,58,95,0.12)' }}
                          >
                            {item.dropdown.map((child) => {
                              const childActive =
                                location.pathname === child.href ||
                                (child.href === '/murid' &&
                                  location.pathname.startsWith('/murid')) ||
                                (child.href === '/alumni' &&
                                  location.pathname.startsWith('/alumni'))
                              return (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  className="block px-3 py-2.5 text-sm rounded-xl transition-all duration-150"
                                  style={{
                                    color: childActive ? primaryColor : '#64748B',
                                    background: childActive
                                      ? 'rgba(30,58,95,0.06)'
                                      : 'transparent',
                                    fontWeight: childActive ? 600 : 400,
                                  }}
                                >
                                  {child.label}
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block px-3 py-2.5 text-sm rounded-xl transition-all duration-200"
                    style={{
                      color: isActive(item) ? primaryColor : '#0F172A',
                      background: isActive(item)
                        ? 'rgba(30,58,95,0.06)'
                        : 'transparent',
                      fontWeight: isActive(item) ? 600 : 500,
                    }}
                  >
                    {item.label}
                  </Link>
                )
              )}

              <hr
                className="my-4"
                style={{ borderColor: 'rgba(226,232,240,0.6)' }}
              />

              <Link
                to="/admin/login"
                className="block px-3 py-2.5 text-sm font-semibold rounded-xl text-center transition-all duration-200"
                style={{
                  color: '#FFFFFF',
                  background: primaryColor,
                }}
              >
                Login Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
