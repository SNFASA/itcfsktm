// components/ui/NewsCard.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface NewsCardProps {
  readonly title: string
  readonly description: string
  readonly image: string
  readonly date: string
  readonly slug: string
  readonly imagePosition?: 'left' | 'right'
}

export default function NewsCard({
  title,
  description,
  image,
  date,
  slug,
  imagePosition = 'left'
}: NewsCardProps) {
  const cardContent = (
    <>
      {/* Image Section */}
      <div className={`w-full lg:w-1/2 ${imagePosition === 'right' ? 'lg:order-2' : ''}`}>
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-xl sm:rounded-2xl overflow-hidden group">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      
      {/* Content Section */}
      <div className={`w-full lg:w-1/2 flex flex-col justify-center ${
        imagePosition === 'right' ? 'lg:order-1 lg:pr-6 xl:pr-8' : 'lg:pl-6 xl:pl-8'
      }`}>
        <div className="space-y-3 sm:space-y-4">
          <div className="text-blue-600 font-karla font-medium text-xs sm:text-sm uppercase tracking-wider">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          <h3 className="font-karla font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-600 font-karla text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-blue-600 font-karla font-semibold group-hover:gap-3 transition-all duration-300">
            <span className="text-sm sm:text-base">Read More</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link href={`/news/${slug}`} className="block">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-center">
            {cardContent}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}