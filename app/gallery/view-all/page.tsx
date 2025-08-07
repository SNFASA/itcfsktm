'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Head from 'next/head'

import { allGalleryEvents, type GalleryEvent, getAllCategories } from '@/lib/public/galleryEvents'
import GalleryCard from '@/components/public/ui/GalleryCard'
import GalleryFilter from '@/components/public/ui/GalleryFilter'

const ITEMS_PER_PAGE = 12

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

export default function ViewAllGalleryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortedBy, setSortedBy] = useState<'newest' | 'oldest'>('newest')
  const [filteredEvents, setFilteredEvents] = useState<GalleryEvent[]>([])

  const categories = getAllCategories()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    let events = [...allGalleryEvents]

    // Apply search filter
    if (searchQuery) {
      events = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory) {
      events = events.filter(event => event.category === selectedCategory)
    }

    // Apply sorting
    if (sortedBy === 'newest') {
      events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else {
      events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    setFilteredEvents(events)
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortedBy])

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <>
      <Head>
        <title>All Gallery Events | Event Gallery</title>
        <meta
          name="description"
          content="Browse all past tech events, workshops and highlights in our full gallery."
        />
      </Head>

      <section
        ref={ref}
        className="relative min-h-screen bg-gradient-to-br from-medium-gray via-medium-gray to-gray-100 py-20 overflow-hidden"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Page Title */}
          <motion.div
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="inline-block relative"
              variants={fadeInUp}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h2 className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-section-title text-primary relative z-10">
                All Gallery Events
              </h2>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
              />
            </motion.div>
            <motion.p
              className="text-gray-600 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl mx-auto font-karla"
              variants={fadeInUp}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Browse every moment from our past events and programs.
            </motion.p>
          </motion.div>

          {/* Filters */}
          <GalleryFilter
            searchTerm={searchQuery}
            selectedCategory={selectedCategory}
            sortBy={sortedBy}
            categories={categories}
            onSearchChange={setSearchQuery}
            onCategoryChange={(value) => {
              setSelectedCategory(value)
              setCurrentPage(1)
            }}
            onSortChange={(value) => setSortedBy(value as 'newest' | 'oldest')}
            onClearFilters={() => {
              setSearchQuery('')
              setSelectedCategory('')
              setSortedBy('newest')
              setCurrentPage(1)
            }}
          />

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedEvents.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 font-karla">
                No events found.
              </p>
            ) : (
              paginatedEvents.map((event) => (
                <GalleryCard key={event.id} event={event} />
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-4 py-2 rounded-full font-medium font-karla ${
                    num === currentPage
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary border border-primary'
                  } hover:shadow transition`}
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
