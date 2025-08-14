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
  hidden: { opacity: 0, y: 30 },
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

const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

const scaleInSection = {
  hidden: { opacity: 0, scale: 0.9, rotate: 0 },
  visible: { opacity: 1, scale: 1 },
}

const getSizeClassesSection = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return 'w-full h-48 sm:h-56 md:h-60'
    case 'medium':
      return 'w-full h-52 sm:h-60 md:h-64 lg:h-68'
    case 'large':
      return 'w-full h-56 sm:h-64 md:h-68 lg:h-72'
    default:
      return 'w-full h-52 sm:h-60 md:h-64 lg:h-68'
  }
}

const getRandomRotationSection = (id: string) => {
  // Use the ID to generate a consistent "random" rotation
  const hash = id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  return (hash % 10) - 5 // Reduced range from -5 to 5 degrees for mobile
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
        scale: 1.02,
        zIndex: 10,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      onClick={handleCardClick}
    >
      {/* Main Card */}
      <div className={`${getSizeClassesSection(item.size)} relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600/90`}>
        {/* Image Container */}
        <div className="relative h-2/3 sm:h-3/4 overflow-hidden">
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
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-white/30 capitalize">
              {item.category}
            </span>
          </div>

          {/* Date badge */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
              {formatDate(item.date)}
            </span>
          </div>

          {/* Featured badge */}
          {item.featured && (
            <div className="absolute top-8 left-2 sm:top-12 sm:left-3">
              <span className="bg-yellow-500/90 backdrop-blur-sm text-black text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-yellow-400">
                <span className="hidden sm:inline">Featured</span>
                <span className="sm:hidden">★</span>
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4 bg-gradient-to-t from-blue-600 via-blue-600/95 to-transparent">
          <h3 className="font-bold text-white text-xs sm:text-sm md:text-base mb-1 sm:mb-2 line-clamp-2">
            {item.title}
          </h3>
          
          <p className="text-white/80 text-xs mb-2 sm:mb-3 line-clamp-1 sm:line-clamp-2">
            {item.description}
          </p>
          
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2 sm:mb-2">
              {item.tags.slice(0, window.innerWidth < 640 ? 1 : 2).map((tag, idx) => (
                <span key={idx} className="bg-white/10 text-white text-xs px-1.5 py-0.5 sm:px-2 rounded-full">
                  {tag}
                </span>
              ))}
              {item.tags.length > (window.innerWidth < 640 ? 1 : 2) && (
                <span className="bg-white/10 text-white text-xs px-1.5 py-0.5 sm:px-2 rounded-full">
                  +{item.tags.length - (window.innerWidth < 640 ? 1 : 2)}
                </span>
              )}
            </div>
          )}
          
          <button 
            onClick={handleMorePicsClick}
            className="relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-full transition-all duration-300 group/btn border border-white/20 hover:border-white/40"
          >
            <span className="relative z-10 flex items-center gap-1">
              <span className="hidden sm:inline">More Pics</span>
              <span className="sm:hidden">More</span>
              ({item.additional_images?.length || 0})
              <svg className="w-2 h-2 sm:w-3 sm:h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full" />
          </button>
        </div>

        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ padding: '1px' }}>
          <div className="w-full h-full rounded-lg sm:rounded-xl bg-transparent" />
        </div>
      </div>

      {/* Additional Images Preview - Hidden on mobile */}
      <AnimatePresence>
        {showPreview && item.additional_images && item.additional_images.length > 0 && (
          <motion.div
            className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2 z-20"
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
                    className="relative w-16 h-12 lg:w-20 lg:h-16 rounded-md overflow-hidden"
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-blue-600/50 rounded-lg sm:rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500 -z-10 transform translate-y-4 scale-95 group-hover:scale-100" />
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
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">Loading gallery...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      id="gallery"
      ref={ref}
      className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-blue-600/3 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Title with white theme */}
        <motion.div
          key="title"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariant}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20"
        >
          <div className="relative inline-block">
            <motion.h2 
              className="font-karla font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-blue-600 relative z-10 tracking-tight leading-tight"
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 30px rgba(255, 255, 255, 0.8)"
              }}
              transition={{ duration: 0.3 }}
            >
              Gallery Highlights
              
              {/* Text glow effect */}
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </motion.h2>
            
            {/* Animated underline with white theme */}
            <motion.div
              className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
            
            {/* Enhanced background glow effects */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-200/15 via-blue-300/20 to-blue-200/15 blur-3xl rounded-full transform scale-150"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1.5, 1.7, 1.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-100/10 via-blue-200/15 to-blue-300/10 blur-2xl rounded-full transform scale-125"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1.25, 1.4, 1.25],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
          
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeVariant}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-gray-600 text-sm sm:text-base lg:text-lg xl:text-xl mt-3 sm:mt-4 max-w-2xl mx-auto font-karla leading-relaxed"
          >
            Capturing memories from our most memorable events and activities
          </motion.p>
          
          {/* Enhanced decorative elements around title */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 sm:-translate-y-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div 
              className="flex items-center gap-1 sm:gap-2"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-blue-300/70 rounded-full shadow-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-blue-200/60 rounded-full shadow-md"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div 
                className="w-0.5 h-0.5 sm:w-1 sm:h-1 lg:w-1.5 lg:h-1.5 bg-blue-100/50 rounded-full shadow-sm"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Side floating elements */}
          <motion.div
            className="absolute top-1/2 -left-4 sm:-left-8 transform -translate-y-1/2"
            animate={{
              x: [0, 5, 0],
              y: [0, -8, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-1 sm:w-2 sm:h-2 bg-gray-300/50 rounded-full shadow-lg" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2"
            animate={{
              x: [0, -5, 0],
              y: [0, 8, 0],
              rotate: [0, -360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-200/60 rounded-full shadow-md" />
          </motion.div>
        </motion.div>

        {/* Gallery Grid */}
        {galleryItems.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {galleryItems.map((item) => (
              <GalleryCardSection key={item.id} item={item} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg">No gallery items available at the moment.</p>
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
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <span className="hidden sm:inline">View All Gallery Events</span>
            <span className="sm:hidden">View All</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}