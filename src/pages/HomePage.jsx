import HeroSection from '../components/home/HeroSection'
import PembimbingSection from '../components/home/PembimbingSection'
import TentangSection from '../components/home/TentangSection'
import PrestasiSection from '../components/home/PrestasiSection'
import GallerySection from '../components/home/GallerySection'
import StatistikSection from '../components/home/StatistikSection'
import LokasiSection from '../components/home/LokasiSection'

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <PembimbingSection />
      <TentangSection />
      <PrestasiSection />
      <GallerySection />
      <StatistikSection />
      <LokasiSection />
    </main>
  )
}

export default HomePage
