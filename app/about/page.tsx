// app/about/page.tsx
'use client'
import Header from '@/components/public/Header'
import AboutSection from '@/components/public/AboutSection'
import Footer from '@/components/public/Footer'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
