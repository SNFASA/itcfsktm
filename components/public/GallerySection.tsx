// components/public/GallerySection.tsx
'use client'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { getRecentGalleryItems } from '@/lib/public/galleryEvents'
import type { GalleryItem } from '@/lib/public/gallery'

const fadeInUpSection = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const scaleInSection = {
  hidden: { opacity: 0, scale: 0.8, rotate: 0 },
  visible: { opacity: 1, scale: 1 },
}

const getSizeClassesSection = (size: 'small' | 'medium' | 'large') => {
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

const getRandomRotationSection = (id: string) => {
  // Use the ID to generate a consistent "random" rotation
  const hash = id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  return (hash % 15) - 7.5 // Range from -7.5 to 7.5 degrees
}

function GalleryCardSection({ item }: { item: GalleryItem }) {
  const [showPreview, setShowPreview] = useState(false)

  const handleMorePicsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `/gallery/event/${item.id}`
  }

  const handleCardClick = () => {
    window.location.href = `/gallery/event/${item.id}`
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    } catch {
      return dateString
    }
  }

  const rotation = getRandomRotationSection(item.id)

  return (
    <motion.div
      className="relative group cursor-pointer"
      style={{ rotate: `${rotation}deg` }}
      variants={scaleInSection}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => {
        setTimeout(() => setShowPreview(true), 200)
      }}
      onHoverEnd={() => {
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
      <div className={`${getSizeClassesSection(item.size)} relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600/90`}>
        {/* Image Container */}
        <div className="relative h-3/4 overflow-hidden">
          <Image
            src={item.main_image}
            alt={item.title}
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
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full border border-white/30 capitalize">
              {item.category}
            </span>
          </div>

          {/* Date badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
              {formatDate(item.date)}
            </span>
          </div>

          {/* Featured badge */}
          {item.featured && (
            <div className="absolute top-12 left-3">
              <span className="bg-yellow-500/90 backdrop-blur-sm text-black text-xs font-bold px-2 py-1 rounded-full border border-yellow-400">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-blue-600 via-blue-600/95 to-transparent">
          <h3 className="font-bold text-white text-sm sm:text-base mb-2 line-clamp-2">
            {item.title}
          </h3>
          
          <p className="text-white/80 text-xs mb-3 line-clamp-2">
            {item.description}
          </p>
          
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {item.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
              {item.tags.length > 2 && (
                <span className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full">
                  +{item.tags.length - 2}
                </span>
              )}
            </div>
          )}
          
          <button 
            onClick={handleMorePicsClick}
            className="relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 group/btn border border-white/20 hover:border-white/40"
          >
            <span className="relative z-10 flex items-center gap-1">
              More Pics ({item.additional_images?.length || 0})
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
        {showPreview && item.additional_images && item.additional_images.length > 0 && (
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
                {item.additional_images.slice(0, 4).map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="relative w-20 h-16 rounded-md overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    <Image
                      src={img}
                      alt={`${item.title} ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                      sizes="80px"
                    />
                  </motion.div>
                ))}
              </div>
              {item.additional_images.length > 4 && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  +{item.additional_images.length - 4} more
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-blue-600/50 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500 -z-10 transform translate-y-4 scale-95 group-hover:scale-100" />
    </motion.div>
  )
}

// Main GallerySection Component
export default function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const items = await getRecentGalleryItems(6) // Get 6 recent items
        setGalleryItems(items)
      } catch (err) {
        console.error('Error fetching gallery items:', err)
        setError('Failed to load gallery items')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading gallery...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
       id="gallery"
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUpSection}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="inline-block relative"
            variants={fadeInUpSection}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="font-bold text-3xl lg:text-4xl xl:text-5xl text-blue-600 relative z-10">
              Gallery Highlights
            </h2>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
          
          <motion.p
            className="text-gray-600 text-lg lg:text-xl mt-4 max-w-2xl mx-auto"
            variants={fadeInUpSection}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Capturing memories from our most memorable events and activities
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        {galleryItems.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {galleryItems.map((item) => (
              <GalleryCardSection key={item.id} item={item} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No gallery items available at the moment.</p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center"
          variants={fadeInUpSection}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            href="/gallery/view-all"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Gallery Events
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}