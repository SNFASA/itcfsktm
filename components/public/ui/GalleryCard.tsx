'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { GalleryEvent } from '@/lib/public/galleryEvents'

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

export default function GalleryCard({ event }: { event: GalleryEvent }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleMorePicsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `/gallery/event/${event.id}`
  }

  const handleCardClick = () => {
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
        {/* Image */}
        <div className="relative h-3/4 overflow-hidden">
          <Image
            src={event.mainImage}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          <div className="absolute top-3 left-3">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full border border-white/30">
              {event.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
              {event.date}
            </span>
          </div>
        </div>

        {/* Content */}
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

      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/50 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500 -z-10 transform translate-y-4 scale-95 group-hover:scale-100" />
    </motion.div>
  )
}
