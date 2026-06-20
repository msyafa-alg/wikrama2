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
          style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #0a3660 50%, #1a6ab5 100%)' }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo/Icon */}
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-2xl border border-white/30">
              <span className="text-white font-bold text-4xl">W2</span>
            </div>

            <div className="text-center">
              <h1 className="text-white text-3xl font-bold">WIKRAMA 2</h1>
              <p className="text-blue-200 text-sm mt-1">SMK Wikrama Bogor</p>
            </div>

            {/* Loading bar */}
            <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full bg-white rounded-full"
              />
            </div>

            <p className="text-blue-200 text-xs animate-pulse">Memuat halaman...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
