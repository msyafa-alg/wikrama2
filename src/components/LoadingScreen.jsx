import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#1E3A5F' }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo */}
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
              <img src="/favicon.png" alt="Logo Wikrama 2" className="w-full h-full object-cover" />
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-black text-white">WIKRAMA 2</h1>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>SMK Wikrama Bogor</p>
            </div>

            {/* Loading bar */}
            <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full rounded-full"
                style={{ background: '#F59E0B' }}
              />
            </div>

            <p className="text-xs animate-pulse" style={{ color: 'rgba(255,255,255,0.5)' }}>Memuat halaman...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
