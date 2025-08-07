'use client'
import { getAllGalleryEvents } from '@/lib/public/galleryEvents'
import type { GalleryEvent } from '@/lib/public/galleryEvents'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const getSizeClasses = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return 'w-full sm:w-64 md:w-72 h-48 sm:h-56'
    case 'medium':
      return 'w-full sm:w-72 md:w-80 h-56 sm:h-64'
    case 'large':
      return 'w-full sm:w-80 md:w-96 h-64 sm:h-72'
    default:
      return 'w-full sm:w-72 md:w-80 h-56 sm:h-64'
  }
}

function GalleryCard({ event }: { event: GalleryEvent }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const router = useRouter()

  const handleMorePicsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/gallery/event/${event.id}`)
  }

  const handleCardClick = () => {
    router.push(`/gallery/event/${event.id}`)
  }

  return (
    <motion.div
      className="relative group cursor-pointer"
      style={{ rotate: `${event.rotation}deg` }}
      variants={scaleIn}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => {
        setIsHovered(true)
        setTimeout(() => setShowPreview(true), 200)
      }}
      onHoverEnd={() => {
        setIsHovered(false)
        setShowPreview(false)
      }}
      whileHover={{ 
        rotate: 0,
        scale: 1.05,
        zIndex: 10,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      onClick={handleCardClick}
    >
      {/* Main Card */}
      <div className={`${getSizeClasses(event.size)} relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-primary via-primary to-primary/90`}>
        {/* Image Container */}
        <div className="relative h-3/4 overflow-hidden">
          <Image
            src={event.mainImage}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
          
          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full border border-white/30">
              {event.category}
            </span>
          </div>

          {/* Date badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
              {event.date}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary via-primary/95 to-transparent">
          <h3 className="font-karla font-bold text-white text-sm sm:text-base mb-2 line-clamp-2">
            {event.title}
          </h3>
          
          <p className="text-white/80 text-xs mb-3 line-clamp-2">
            {event.description}
          </p>
          
          <button 
            onClick={handleMorePicsClick}
            className="relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 group/btn border border-white/20 hover:border-white/40"
          >
            <span className="relative z-10 flex items-center gap-1">
              More Pics ({event.additionalImages.length})
              <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full" />
          </button>
        </div>

        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ padding: '1px' }}>
          <div className="w-full h-full rounded-xl bg-transparent" />
        </div>
      </div>

      {/* Additional Images Preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-20"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-lg p-3 shadow-2xl border border-white/20 max-w-48">
              <p className="text-xs font-medium text-gray-700 mb-2">More from this event:</p>
              <div className="grid grid-cols-2 gap-2">
                {event.additionalImages.slice(0, 4).map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="relative w-20 h-16 rounded-md overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    <Image
                      src={img}
                      alt={`${event.title} ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                      sizes="80px"
                    />
                  </motion.div>
                ))}
              </div>
              {event.additionalImages.length > 4 && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  +{event.additionalImages.length - 4} more
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced drop shadow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/50 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500 -z-10 transform translate-y-4 scale-95 group-hover:scale-100" />
    </motion.div>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex space-x-1">
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              page === currentPage
                ? 'bg-primary text-white shadow-lg'
                : page === '...'
                ? 'text-gray-400 cursor-default'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default function ViewAllGalleryPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const itemsPerPage = 10
  const totalPages = Math.ceil(allGalleryEvents.length / itemsPerPage)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = allGalleryEvents.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setIsLoading(true)
      setCurrentPage(page)
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // Simulate loading delay for better UX
      setTimeout(() => setIsLoading(false), 300)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medium-gray via-medium-gray to-gray-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-8 sm:py-12 lg:py-16">
        {/* Back button */}
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300 mb-8 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Main Gallery
        </motion.button>

        {/* Page Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="inline-block relative"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-section-title text-primary relative z-10 mb-4">
              Complete Event Gallery
            </h1>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
          <motion.p
            className="text-gray-600 text-base sm:text-lg lg:text-xl mt-6 max-w-3xl mx-auto font-karla"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Explore our comprehensive collection of tech events, workshops, and conferences. 
            Discover moments that shaped our community's journey in technology and innovation.
          </motion.p>
          
          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-8"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{allGalleryEvents.length}</div>
              <div className="text-gray-600 text-sm">Total Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {allGalleryEvents.reduce((sum, event) => sum + event.additionalImages.length, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Photos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {new Set(allGalleryEvents.map(event => event.category)).size}
              </div>
              <div className="text-gray-600 text-sm">Categories</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white rounded-lg p-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-gray-600 font-medium">Loading events...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        <motion.div
          ref={ref}
          className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {currentEvents.map((event, index) => (
            <motion.div
              key={`${event.id}-${currentPage}`}
              variants={scaleIn}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.1 
              }}
            >
              <GalleryCard event={event} />
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-primary">{startIndex + 1}</span> to{' '}
                <span className="font-semibold text-primary">{Math.min(endIndex, allGalleryEvents.length)}</span> of{' '}
                <span className="font-semibold text-primary">{allGalleryEvents.length}</span> events
              </p>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </motion.div>

        {/* Categories Overview */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h3 className="font-karla font-bold text-xl sm:text-2xl text-primary mb-6">
            Event Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from(new Set(allGalleryEvents.map(event => event.category))).map((category) => {
              const count = allGalleryEvents.filter(event => event.category === category).length
              return (
                <motion.span
                  key={category}
                  className="bg-white/60 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-white/30 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category} ({count})
                </motion.span>
              )
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 sm:p-12 backdrop-blur-sm border border-primary/20">
            <h3 className="font-karla font-bold text-xl sm:text-2xl lg:text-3xl text-primary mb-4">
              Want to be part of our next event?
            </h3>
            <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Join our vibrant tech community and be the first to know about upcoming workshops, 
              conferences, and networking opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 text-white font-karla font-semibold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe to Updates
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
              <motion.button
                className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-primary font-karla font-semibold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Upcoming Events
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
'use client'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface GalleryEvent {
  id: string
  title: string
  mainImage: string
  additionalImages: string[]
  size: 'small' | 'medium' | 'large'
  rotation: number
  date: string
  category: string
  description: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, rotate: 0 },
  visible: { opacity: 1, scale: 1 },
}

// Extended mock gallery data with 25 events
