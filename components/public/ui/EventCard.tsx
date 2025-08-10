'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'

// Import types from EventsData.ts to ensure consistency
import { EventDetails, EventEligibility } from '@/lib/public/EventsData'

interface EventCardProps {
  readonly title: string
  readonly date: string
  readonly time?: string
  readonly image?: string | null  // This represents main_image from database
  readonly description?: string
  readonly eligibility?: EventEligibility
  readonly location?: string
  readonly isComingSoon?: boolean
  readonly onRegister?: () => void
  readonly onViewDetails?: () => void
  readonly details?: EventDetails | null  // Matches database schema exactly
  readonly registration_required?: boolean  // Added from EventsData interface
  readonly status?: string  // Added from EventsData interface
}

export default function EventCard({
  title,
  date,
  time = '10:00 AM - 4:00 PM',
  image, // This is main_image from EventData
  description = 'Join us for an exciting event...',
  eligibility = 'public',
  location = 'FSKTM Auditorium',
  isComingSoon = false, // Default to false since we have status from database
  onRegister,
  onViewDetails,
  details,
  registration_required = false,
  status = 'upcoming',
}: EventCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Default fallback image
  const defaultEventImage = '/images/default-event.jpg'

  // Determine if event is coming soon based on status and date
  const isEventComingSoon = isComingSoon || status === 'upcoming' || new Date(date) > new Date()
  
  // Determine which image to use - prioritize main_image from database, fallback to default
  const displayImage = image && image.trim() !== '' && !imageError ? image : defaultEventImage

  const getEligibilityConfig = useCallback((value: EventEligibility) => {
    switch (value) {
      case 'public': 
        return { 
          bg: 'bg-gradient-to-r from-emerald-500 to-teal-600', 
          text: 'text-white',
          icon: '🌍',
          label: 'Open to Public'
        }
      case 'all-students': 
        return { 
          bg: 'bg-gradient-to-r from-blue-500 to-indigo-600', 
          text: 'text-white',
          icon: '🎓',
          label: 'All Students'
        }
      case 'undergraduates': 
        return { 
          bg: 'bg-gradient-to-r from-green-500 to-emerald-600', 
          text: 'text-white',
          icon: '📚',
          label: 'Undergraduates'
        }
      case 'graduates': 
        return { 
          bg: 'bg-gradient-to-r from-purple-500 to-violet-600', 
          text: 'text-white',
          icon: '🎯',
          label: 'Graduates'
        }
      case 'faculty': 
        return { 
          bg: 'bg-gradient-to-r from-amber-500 to-orange-600', 
          text: 'text-white',
          icon: '👨‍🏫',
          label: 'Faculty Only'
        }
      case 'staff': 
        return { 
          bg: 'bg-gradient-to-r from-rose-500 to-pink-600', 
          text: 'text-white',
          icon: '👩‍💼',
          label: 'Staff Only'
        }
      default: 
        return { 
          bg: 'bg-gradient-to-r from-gray-500 to-slate-600', 
          text: 'text-white',
          icon: '📋',
          label: 'General'
        }
    }
  }, [])

  const eligibilityConfig = getEligibilityConfig(eligibility)

  const handleDetailsClick = () => {
    if (onViewDetails) {
      onViewDetails()
    } else {
      setShowDetails(prev => !prev)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-2 border border-gray-100 h-fit"
    >
      {/* Gradient Overlay for Modern Look */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      
      {/* Image Container with Enhanced Effects */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={displayImage}
          alt={`Event image for ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
          onError={handleImageError}
          priority={false}
        />
        
        {/* Gradient Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Coming Soon / Status Badge */}
        {isEventComingSoon && (
          <div className="absolute top-4 right-4 z-20">
            <div className="relative">
              <div className={`absolute inset-0 ${
                status === 'upcoming' ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                status === 'ongoing' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                status === 'completed' ? 'bg-gradient-to-r from-gray-400 to-slate-500' :
                status === 'cancelled' ? 'bg-gradient-to-r from-red-400 to-rose-500' :
                'bg-gradient-to-r from-amber-400 to-orange-500'
              } rounded-full blur opacity-75 animate-pulse`} />
              <span className={`relative inline-flex items-center gap-1.5 ${
                status === 'upcoming' ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                status === 'ongoing' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                status === 'completed' ? 'bg-gradient-to-r from-gray-400 to-slate-500' :
                status === 'cancelled' ? 'bg-gradient-to-r from-red-400 to-rose-500' :
                'bg-gradient-to-r from-amber-400 to-orange-500'
              } text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg`}>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                {status === 'upcoming' ? 'Coming Soon' :
                 status === 'ongoing' ? 'Ongoing' :
                 status === 'completed' ? 'Completed' :
                 status === 'cancelled' ? 'Cancelled' :
                 'Coming Soon'}
              </span>
            </div>
          </div>
        )}
        
        {/* Eligibility Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="relative">
            <div className={`absolute inset-0 ${eligibilityConfig.bg} rounded-full blur opacity-50`} />
            <span className={`relative inline-flex items-center gap-1.5 ${eligibilityConfig.bg} ${eligibilityConfig.text} text-xs font-semibold px-3 py-2 rounded-full shadow-lg backdrop-blur-sm`}>
              <span>{eligibilityConfig.icon}</span>
              {eligibilityConfig.label}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          
          {/* Event Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <time className="font-medium">{formatDate(date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <span>⏰</span>
              <span className="font-medium">{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span className="font-medium truncate">{location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onRegister}
            disabled={status === 'completed' || status === 'cancelled'}
            className={`flex-1 relative ${
              status === 'completed' || status === 'cancelled' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
            } text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group/btn overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {status === 'completed' ? 'Completed' : 
               status === 'cancelled' ? 'Cancelled' :
               registration_required ? 'Register' : 'Join Event'}
            </span>
          </button>
          
          <button
            onClick={handleDetailsClick}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 group/details"
          >
            <span className="flex items-center gap-2">
              {onViewDetails ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </>
              ) : (
                <>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {showDetails ? 'Hide' : 'Details'}
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Details (only show if no onViewDetails handler) */}
      {!onViewDetails && (
        <div className={`overflow-hidden transition-all duration-500 ease-out ${showDetails ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-200 p-6 space-y-4">
            {details?.agenda && (
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>📋</span>
                  Agenda
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">{details.agenda}</p>
              </div>
            )}
            
            {/* Feature List */}
            <div className="space-y-2">
              {details?.isFree && (
                <div className="flex items-center gap-2 text-green-700">
                  <span>💰</span>
                  <span className="font-medium text-sm">Free Event</span>
                </div>
              )}
              
              {details?.hasCertificate && (
                <div className="flex items-center gap-2 text-blue-700">
                  <span>🏆</span>
                  <span className="font-medium text-sm">Certificate Provided</span>
                </div>
              )}
              
              {details?.hasRefreshments && (
                <div className="flex items-center gap-2 text-orange-700">
                  <span>🍽️</span>
                  <span className="font-medium text-sm">Refreshments Included</span>
                </div>
              )}
              
              {details?.hasTransportation && (
                <div className="flex items-center gap-2 text-purple-700">
                  <span>🚌</span>
                  <span className="font-medium text-sm">Transportation Provided</span>
                </div>
              )}
              
              {details?.isOnline && (
                <div className="flex items-center gap-2 text-indigo-700">
                  <span>💻</span>
                  <span className="font-medium text-sm">Online Event</span>
                </div>
              )}
              
              {details?.isLimited && (
                <div className="flex items-center gap-2 text-red-700">
                  <span>⚡</span>
                  <span className="font-medium text-sm">Limited Seats</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}