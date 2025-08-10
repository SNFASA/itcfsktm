
import HeroSection from '@/components/public/HeroSection'
import AboutSection from '@/components/public/AboutSection'
import FacultyOrgChart from '@/components/public/FacultyOrgChart'
import EventsSection from '@/components/public/EventsSection'
import NewsSection from '@/components/public/NewsSection'
import GallerySection from '@/components/public/GallerySection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FacultyOrgChart/>
      <EventsSection />
      <NewsSection />
      <GallerySection/>
    </main>
  )
}
