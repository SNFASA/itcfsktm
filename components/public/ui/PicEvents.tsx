'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import { getEventById } from '@/lib/public/galleryEvents'

interface EventImage {
  id: string
  url: string
  caption?: string
  timestamp?: string
}

interface EventDetail {
  id: string
  title: string
  description: string
  date: string
  location: string
  mainImage: string
  images: EventImage[]
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

function LightboxModal({ image, onClose }: { image: EventImage | null; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!image) return null

  const downloadImage = async () => {
    try {
      const response = await fetch(image.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `event-image-${image.id}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl max-h-[90vh] w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          aria-label="Close lightbox"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative w-full h-full max-h-[70vh] rounded-xl overflow-hidden">
          <Image
            src={image.url}
            alt={image.caption || 'Event image'}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-b-xl p-4 mt-2">
          <div className="flex items-center justify-between">
            <div>
              {image.caption && (
                <h3 className="font-semibold text-gray-800 text-lg mb-1">{image.caption}</h3>
              )}
              {image.timestamp && <p className="text-gray-600 text-sm">{image.timestamp}</p>}
            </div>
            <button
              onClick={downloadImage}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ImageCard({ image, onClick }: { image: EventImage; onClick: () => void }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <motion.div
      className="group cursor-pointer relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
      variants={scaleIn}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image.url}
          alt={image.caption || 'Event image'}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-110 ${
            isLoading ? 'blur-sm' : 'blur-0'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}
      </div>
    </motion.div>
  )
}

export default function PicEvent() {
  const router = useRouter()
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const rawEvent = getEventById(params?.id as string)

  const eventDetail: EventDetail | null = rawEvent
    ? {
        id: rawEvent.id,
        title: rawEvent.title,
        description: rawEvent.description,
        date: rawEvent.date,
        location: (rawEvent as any).location || 'Unknown',
        mainImage: rawEvent.mainImage,
        images: 'additionalImages' in rawEvent
          ? rawEvent.additionalImages.map((url: string, index: number) => ({
              id: `${index + 1}`,
              url,
              caption: `${rawEvent.title} - Image ${index + 1}`,
            }))
          : [],
      }
    : null

  if (!eventDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 font-semibold">
        Event not found.
      </div>
    )
  }

  const handleDownloadAll = () => {
    eventDetail.images.forEach((img, index) => {
      setTimeout(() => {
        const a = document.createElement('a')
        a.href = img.url
        a.download = `event-${eventDetail.id}-image-${index + 1}.jpg`
        a.click()
      }, index * 500)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-8 sm:py-12 lg:py-16">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 mb-8 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Gallery
        </motion.button>

        <motion.div className="mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
            <Image
              src={eventDetail.mainImage}
              alt={eventDetail.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-2">{eventDetail.title}</h1>
              <div className="flex flex-wrap gap-4 text-white/90 text-sm sm:text-base">
                <span className="flex items-center gap-2">📅 {eventDetail.date}</span>
                <span className="flex items-center gap-2">📍 {eventDetail.location}</span>
              </div>
            </div>
          </div>

          <motion.p
            className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-4xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {eventDetail.description}
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl text-blue-600">
              Event Photos ({eventDetail.images.length})
            </h2>
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 text-sm sm:text-base font-medium"
            >
              ⬇️ Download All
            </button>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {eventDetail.images.map((image: EventImage) => (
              <ImageCard key={image.id} image={image} onClick={() => setSelectedImage(image)} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <LightboxModal image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
