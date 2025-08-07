// components/ui/NewsListCard.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem } from '@/lib/public/newsUtils'

interface NewsListCardProps {
  news: NewsItem
  onClick?: () => void
}

export default function NewsListCard({ news, onClick }: NewsListCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
    >
      <Link href={`/news/${news.slug}`} className="block">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-primary text-white text-xs font-karla font-semibold rounded-full">
                {news.category}
              </span>
            </div>
            
            {/* Featured Badge */}
            {news.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-karla font-semibold rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-gray-500 font-karla mb-3">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(news.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {news.readTime}
              </div>
            </div>
            
            <h3 className="font-karla font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {news.title}
            </h3>
            
            <p className="text-gray-600 font-karla leading-relaxed line-clamp-3 mb-4">
              {news.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 font-karla">
                By {news.author}
              </div>
              
              <div className="flex items-center gap-2 text-primary font-karla font-semibold group-hover:gap-3 transition-all duration-300">
                <span>Read More</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
