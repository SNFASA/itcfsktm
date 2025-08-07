// app/about/page.tsx
'use client'
import Header from '@/components/public/Header'
import EventsSection from '@/components/public/EventsSection'
import Footer from '@/components/public/Footer'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <EventsSection />
      </main>
      <Footer />
    </>
  )
}
