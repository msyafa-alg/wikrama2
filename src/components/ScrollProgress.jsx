import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(percent)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9998] bg-transparent">
      <motion.div
        className="h-full rounded-r-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #0F4C81, #38bdf8)',
        }}
        transition={{ ease: 'linear' }}
      />
    </div>
  )
}

export default ScrollProgress
