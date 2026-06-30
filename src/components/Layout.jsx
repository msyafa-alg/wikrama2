import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import BackToTop from './BackToTop'

const Layout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTop />
    </>
  )
}

export default Layout
