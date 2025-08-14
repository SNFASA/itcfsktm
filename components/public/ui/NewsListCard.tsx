// components/ui/NewsListCard.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem } from '@/lib/public/newsUtils'
import { formatNewsDateShort, calculateReadTime, getCategoryDisplayName } from '@/lib/public/newsUtils'

interface NewsListCardProps {
  readonly news: NewsItem
  readonly onClick?: () => void
}

export default function NewsListCard({ news, onClick }: NewsListCardProps) {
  // Calculate read time from content
  const readTime = calculateReadTime(news.content)
  
  // Use published_at for display date
  const displayDate = news.published_at ? formatNewsDateShort(news.published_at) : 'No date'
  
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
    >
      <Link href={`/news/${news.slug}`} className="block">
        <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md hover:shadow-lg sm:hover:shadow-xl lg:hover:shadow-2xl transition-all duration-500 overflow-hidden">
          {/* Image */}
          <div className="relative h-32 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
            {news.image ? (
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Category Badge */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1 bg-primary text-white text-xs font-karla font-semibold rounded-full">
                {getCategoryDisplayName(news.category)}
              </span>
            </div>
            
            {/* Featured Badge - Only show for events and announcements categories */}
            {(news.category === 'events' || news.category === 'announcements') && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4">
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1 bg-yellow-500 text-white text-xs font-karla font-semibold rounded-full flex items-center gap-1">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="hidden sm:inline">Featured</span>
                </span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-gray-500 font-karla mb-2 sm:mb-3">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{displayDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readTime}</span>
              </div>
            </div>
            
            <h3 className="font-karla font-bold text-base sm:text-lg md:text-xl text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {news.title}
            </h3>
            
            <p className="text-gray-600 font-karla text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
              {news.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm text-gray-500 font-karla truncate pr-2">
                By {news.author}
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2 text-blue-600 font-karla font-semibold text-xs sm:text-sm group-hover:gap-2 sm:group-hover:gap-3 transition-all duration-300 flex-shrink-0">
                <span className="hidden sm:inline">Read More</span>
                <span className="sm:hidden">Read</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}