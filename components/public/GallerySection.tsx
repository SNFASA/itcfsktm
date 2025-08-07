'use client'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { getRecentEvents, type GalleryEvent } from '@/lib/public/galleryEvents'

const fadeInUp = {
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, rotate: 0 },
  visible: { opacity: 1, scale: 1 },
}

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

  const handleMorePicsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Navigate to individual event page
    window.location.href = `/gallery/event/${event.id}`
  }

  const handleCardClick = () => {
    // Navigate to individual event page
    window.location.href = `/gallery/event/${event.id}`
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
          
          <p className="text-white/80 text-xs mb-3 line-clamp-2 font-karla">
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

export default function GallerySection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Get recent events for the homepage gallery
  const recentEvents = getRecentEvents(6)

  return (
    <section id="gallery" ref={ref} className="relative bg-gradient-to-br from-medium-gray via-medium-gray to-gray-100 py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Title */}
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
              Event Gallery
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
            Explore moments from our amazing tech events and workshops
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {recentEvents.map((event) => (
            <GalleryCard key={event.id} event={event} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link href="/gallery/view-all">
            <motion.button
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 text-white font-karla font-semibold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Gallery
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}