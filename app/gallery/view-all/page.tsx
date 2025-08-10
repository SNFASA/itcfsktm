// app/gallery/view-all/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { getAllGalleryItems, getAllCategories } from '@/lib/public/galleryEvents'
import { GalleryCard } from '@/components/public/ui/GalleryCard'
import { GalleryFilter } from '@/components/public/ui/GalleryFilter'
import type { GalleryItem, GalleryCategory } from '@/lib/public/gallery'

const ITEMS_PER_PAGE = 12

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

export default function ViewAllGalleryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortedBy, setSortedBy] = useState<'newest' | 'oldest' | 'featured' | 'title'>('newest')
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [allItems, setAllItems] = useState<GalleryItem[]>([])
  const [categories, setCategories] = useState<GalleryCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const router = useRouter()

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const [itemsData, categoriesData] = await Promise.all([
          getAllGalleryItems(),
          getAllCategories()
        ])
        
        setAllItems(itemsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load gallery data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter and sort items
  useEffect(() => {
    let items = [...allItems]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      items = items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply category filter
    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory)
    }

    // Apply sorting
    switch (sortedBy) {
      case 'newest':
        items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'oldest':
        items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'featured':
        items.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        break
      case 'title':
        items.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredItems(items)
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortedBy, allItems])

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleCardClick = (itemId: string) => {
    router.push(`/gallery/event/${itemId}`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of gallery section
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-600 font-medium text-lg">Loading gallery...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-xl text-center">
          <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

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
        className="relative min-h-screen py-20 overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </div>

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
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-blue-600 relative z-10">
                All Gallery Events
              </h1>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
              />
            </motion.div>
            <motion.p
              className="text-gray-600 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl mx-auto"
              variants={fadeInUp}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Browse every moment from our past events and programs.
            </motion.p>
            
            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mt-8"
              variants={fadeInUp}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{allItems.length}</div>
                <div className="text-gray-600 text-sm">Total Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {allItems.reduce((sum, item) => sum + (item.additional_images?.length || 0), 0)}
                </div>
                <div className="text-gray-600 text-sm">Total Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {categories.length}
                </div>
                <div className="text-gray-600 text-sm">Categories</div>
              </div>
            </motion.div>
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
            onSortChange={(value) => setSortedBy(value as 'newest' | 'oldest' | 'featured' | 'title')}
            onClearFilters={() => {
              setSearchQuery('')
              setSelectedCategory('')
              setSortedBy('newest')
              setCurrentPage(1)
            }}
          />

          {/* Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {paginatedItems.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg mb-4">
                  {filteredItems.length === 0 && (searchQuery || selectedCategory) 
                    ? 'No events found matching your filters.' 
                    : 'No events found.'
                  }
                </p>
                {(searchQuery || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('')
                      setSortedBy('newest')
                      setCurrentPage(1)
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              paginatedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={scaleIn}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: index * 0.1 
                  }}
                >
                  <GalleryCard 
                    item={item} 
                    onClick={() => handleCardClick(item.id)}
                  />
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = 
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)

                  // Show ellipsis
                  const showEllipsis = 
                    (pageNumber === 2 && currentPage > 4) ||
                    (pageNumber === totalPages - 1 && currentPage < totalPages - 3)

                  if (showEllipsis) {
                    return (
                      <span key={`ellipsis-${pageNumber}`} className="px-2 text-gray-400">
                        ...
                      </span>
                    )
                  }

                  if (!showPage) return null

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`min-w-[40px] h-10 rounded-xl font-medium transition-all duration-300 ${
                        pageNumber === currentPage
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* Results Info */}
          {filteredItems.length > 0 && (
            <motion.div
              className="text-center mt-8 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of{' '}
              {filteredItems.length} events
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}