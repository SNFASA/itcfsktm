// app/events/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
// Import icons - replace with your preferred icon library or use inline SVGs
const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const Share2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
)

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Gift = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
)

const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const Coffee = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
)

const Car = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6H4L2 4m9 8V6l11 6H13z" />
  </svg>
)

const Globe = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)

const UserCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)
import type { EventData } from '@/lib/public/EventsData'
import { getEventById } from '@/lib/public/EventsData'

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

const slideInVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
}

export default function EventDetailPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 })
  
  const [event, setEvent] = useState<EventData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const defaultEventImage = '/images/default-event.jpg'

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        const eventData = await getEventById(eventId)
        if (!eventData) {
          setError('Event not found')
        } else {
          setEvent(eventData)
        }
        setError(null)
      } catch (err) {
        setError('Failed to load event. Please try again later.')
        console.error('Error fetching event:', err)
      } finally {
        setLoading(false)
      }
    }

    if (eventId) {
      fetchEvent()
    }
  }, [eventId])

  // Auto-play slideshow
  useEffect(() => {
    if (!event?.images || event.images.length <= 1) return

    const allImages = [event.main_image, ...event.images].filter(Boolean)
    if (allImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [event])

  // Get all images for slideshow
  const getAllImages = () => {
    if (!event) return [defaultEventImage]
    const allImages = [event.main_image, ...(event.images || [])].filter(Boolean)
    return allImages.length > 0 ? allImages : [defaultEventImage]
  }

  // Get status badge configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'upcoming':
        return {
          icon: Calendar,
          text: 'Upcoming Event',
          className: 'bg-green-100 text-green-800 border-green-200'
        }
      case 'completed':
        return {
          icon: CheckCircle,
          text: 'Event Completed',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        }
      case 'cancelled':
        return {
          icon: XCircle,
          text: 'Event Cancelled',
          className: 'bg-red-100 text-red-800 border-red-200'
        }
      case 'ongoing':
        return {
          icon: AlertCircle,
          text: 'Event in Progress',
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        }
      default:
        return {
          icon: Calendar,
          text: 'Event',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Format eligibility for display
  const formatEligibility = (eligibility: string) => {
    return eligibility.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  // Share functions
  const shareOnFacebook = () => {
    const text = encodeURIComponent(`Check out this event: ${event?.title} - ${event?.description}`)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`, '_blank')
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this event: ${event?.title} - ${event?.description}`)
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const title = encodeURIComponent(event?.title || '')
    const summary = encodeURIComponent(event?.description || '')
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${title}&summary=${summary}`, '_blank')
  }

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`Check out this event: ${event?.title} - ${event?.description} ${window.location.href}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  // Handle registration
  const handleRegister = () => {
    if (event?.registration_link) {
      window.open(event.registration_link, '_blank')
    }
  }

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 font-karla">Loading event details...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="font-karla font-bold text-xl text-gray-900 mb-2">{error}</h3>
            <div className="space-x-4">
              <button 
                onClick={() => router.push('/#events')}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Back to Events
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!event) return null

  const allImages = getAllImages()
  const statusConfig = getStatusConfig(event.status)
  const StatusIcon = statusConfig.icon

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <motion.button
        onClick={() => router.push('/#events')}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-karla font-medium">Back to Events</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Slideshow */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={allImages[currentImageIndex] || defaultEventImage}
              alt={event.title}
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
            
            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => (prev + 1) % allImages.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                  aria-label="Next image"
                >
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              </>
            )}

            {/* Dots Navigation */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {allImages.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Status Badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full border font-medium text-sm flex items-center space-x-2 ${statusConfig.className}`}>
              <StatusIcon className="w-4 h-4" />
              <span>{statusConfig.text}</span>
            </div>
          </div>
        </motion.div>

        {/* Event Information */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          {/* Title and Share */}
          <motion.div variants={slideInVariants} className="flex justify-between items-start">
            <h1 className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
              {event.title}
            </h1>
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Share event"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* Share Menu */}
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10"
                >
                  <button
                    onClick={shareOnFacebook}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md text-sm"
                  >
                    Share on Facebook
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md text-sm"
                  >
                    Share on Twitter
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md text-sm"
                  >
                    Share on LinkedIn
                  </button>
                  <button
                    onClick={shareOnWhatsApp}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md text-sm"
                  >
                    Share on WhatsApp
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={slideInVariants}
            className="text-gray-700 text-lg leading-relaxed font-karla"
          >
            {event.description}
          </motion.p>

          {/* Key Information */}
          <motion.div variants={slideInVariants} className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-700">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">{event.time}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-700">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">{event.location}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-700">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-medium">Open to {formatEligibility(event.eligibility)}</span>
            </div>
          </motion.div>

          {/* Event Details */}
          {event.details && (
            <motion.div variants={slideInVariants} className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-karla font-bold text-lg text-gray-900 mb-4">Event Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {event.details.isFree && (
                  <div className="flex items-center space-x-2 text-green-700">
                    <Gift className="w-5 h-5" />
                    <span className="text-sm font-medium">Free Event</span>
                  </div>
                )}
                
                {event.details.hasCertificate && (
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Award className="w-5 h-5" />
                    <span className="text-sm font-medium">Certificate Provided</span>
                  </div>
                )}
                
                {event.details.hasRefreshments && (
                  <div className="flex items-center space-x-2 text-orange-700">
                    <Coffee className="w-5 h-5" />
                    <span className="text-sm font-medium">Refreshments</span>
                  </div>
                )}
                
                {event.details.hasTransportation && (
                  <div className="flex items-center space-x-2 text-purple-700">
                    <Car className="w-5 h-5" />
                    <span className="text-sm font-medium">Transportation</span>
                  </div>
                )}
                
                {event.details.isOnline && (
                  <div className="flex items-center space-x-2 text-indigo-700">
                    <Globe className="w-5 h-5" />
                    <span className="text-sm font-medium">Online Event</span>
                  </div>
                )}
                
                {event.details.isLimited && (
                  <div className="flex items-center space-x-2 text-red-700">
                    <UserCheck className="w-5 h-5" />
                    <span className="text-sm font-medium">Limited Seats</span>
                  </div>
                )}
              </div>
              
              {event.details.agenda && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start space-x-2 text-gray-700">
                    <FileText className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <span className="font-medium block">Agenda:</span>
                      <p className="text-sm mt-1">{event.details.agenda}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Registration Button - Only for upcoming events */}
          {event.status === 'upcoming' && event.registration_link && (
            <motion.button
              variants={slideInVariants}
              onClick={handleRegister}
              className="w-full bg-primary text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Register Now</span>
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          )}

          {/* Registration Required Message */}
          {event.registration_required && !event.registration_link && (
            <motion.div
              variants={slideInVariants}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
            >
              <p className="text-yellow-800 font-medium">Registration required for this event. Please contact the organizers for more information.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <button
          className="fixed inset-0 z-5 cursor-default"
          onClick={() => setShowShareMenu(false)}
          aria-label="Close share menu"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowShareMenu(false)
            }
          }}
        />
      )}
    </main>
  )
}