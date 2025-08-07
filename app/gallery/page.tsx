// app/about/page.tsx
'use client'
import Header from '@/components/public/Header'
import GallerySection from '@/components/public/GallerySection'
import Footer from '@/components/public/Footer'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <GallerySection />
      </main>
      <Footer />
    </>
  )
}
