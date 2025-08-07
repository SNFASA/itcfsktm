'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'

interface EventDetails {
  agenda?: string
  isFree?: boolean
  hasCertificate?: boolean
  hasRefreshments?: boolean
  isLimited?: boolean
}

interface EventCardProps {
  readonly title: string
  readonly date: string
  readonly time?: string
  readonly image: string
  readonly description?: string
  readonly eligibility?: 'Open' | 'Faculty Students' | 'Members Only'
  readonly location?: string
  readonly isComingSoon?: boolean
  readonly onRegister?: () => void
  readonly details?: EventDetails
}

export default function EventCard({
  title,
  date,
  time = '10:00 AM - 4:00 PM',
  image,
  description = 'Join us for an exciting event...',
  eligibility = 'Open',
  location = 'FSKTM Auditorium',
  isComingSoon = true,
  onRegister,
  details,
}: EventCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getEligibilityConfig = useCallback((value: string) => {
    switch (value) {
      case 'Open': 
        return { 
          bg: 'bg-gradient-to-r from-emerald-500 to-teal-600', 
          text: 'text-white',
          icon: '🌍'
        }
      case 'Faculty Students': 
        return { 
          bg: 'bg-gradient-to-r from-blue-500 to-indigo-600', 
          text: 'text-white',
          icon: '🎓'
        }
      case 'Members Only': 
        return { 
          bg: 'bg-gradient-to-r from-purple-500 to-pink-600', 
          text: 'text-white',
          icon: '👑'
        }
      default: 
        return { 
          bg: 'bg-gradient-to-r from-gray-500 to-slate-600', 
          text: 'text-white',
          icon: '📋'
        }
    }
  }, [])

  const eligibilityConfig = getEligibilityConfig(eligibility)

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-2 border border-gray-100 h-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Overlay for Modern Look */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      
      {/* Image Container with Enhanced Effects */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={image}
          alt={`Event image for ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Gradient Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Coming Soon Badge */}
        {isComingSoon && (
          <div className="absolute top-4 right-4 z-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur opacity-75 animate-pulse" />
              <span className="relative inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                Coming Soon
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
              {eligibility}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">
            {title}
          </h3>
          
          {/* Event Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <time className="font-medium">{date}</time>
            </div>
            <div className="flex items-center gap-2">
              <span>⏰</span>
              <span className="font-medium">{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span className="font-medium">{location}</span>
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
            className="flex-1 relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group/btn overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Register
            </span>
          </button>
          
          <button
            onClick={() => setShowDetails(prev => !prev)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 group/details"
          >
            <span className="flex items-center gap-2">
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {showDetails ? 'Hide' : 'Details'}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Details with Enhanced Animation */}
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
            
            {details?.isLimited && (
              <div className="flex items-center gap-2 text-purple-700">
                <span>⚡</span>
                <span className="font-medium text-sm">Limited Seats</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}