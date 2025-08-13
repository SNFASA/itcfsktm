'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { fadeInUp } from '@/lib/public/animations'
import { 
  type NewsItem, 
  formatNewsDate, 
  calculateReadTime, 
  getCategoryDisplayName, 
  getCategoryColor 
} from '@/lib/public/newsUtils'

interface NewsArticleProps {
  readonly news: NewsItem
  readonly onBack: () => void
}

export default function NewsArticle({ news, onBack }: NewsArticleProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const articleDate = formatNewsDate(news.published_at || news.created_at)
  const readTime = calculateReadTime(news.content)
  const categoryDisplay = getCategoryDisplayName(news.category)
  const categoryColor = getCategoryColor(news.category)

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-blue-600 font-karla font-semibold hover:gap-3 transition-all duration-300 group"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Back to News
      </motion.button>

      {/* Article Header */}
      <div className="mb-8" ref={ref}>
        <motion.div
          className="mb-6"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className={`px-4 py-2 text-sm font-karla font-semibold rounded-full ${categoryColor}`}>
              {categoryDisplay}
            </span>
            {(news.category === 'events' || news.category === 'announcements') && (
              <span className="px-4 py-2 bg-yellow-500 text-white text-sm font-karla font-semibold rounded-full flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured Article
              </span>
            )}
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              news.status === 'published' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {news.status === 'published' ? 'Published' : 'Draft'}
            </span>
          </div>
          
          <h1 className="font-karla font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            {news.title}
          </h1>
          
          <p className="text-gray-600 font-karla text-lg sm:text-xl leading-relaxed mb-6">
            {news.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-500 font-karla">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {articleDate}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              By {news.author}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime}
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          className="relative h-96 sm:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden mb-8"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image
            src={news.image || '/images/default-news.jpg'}
            alt={news.title}
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Article Content */}
      <motion.div
        className="prose prose-lg max-w-none"
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div 
          className="font-karla text-gray-700 leading-relaxed space-y-6 prose-headings:font-karla prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </motion.div>

      {/* Article Meta Information */}
      <motion.div
        className="mt-8 p-6 bg-gray-50 rounded-2xl"
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <h3 className="font-karla font-bold text-lg text-gray-900 mb-4">Article Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Created:</span> {formatNewsDate(news.created_at)}
          </div>
          <div>
            <span className="font-medium">Last Updated:</span> {formatNewsDate(news.updated_at)}
          </div>
          {news.published_at && (
            <div>
              <span className="font-medium">Published:</span> {formatNewsDate(news.published_at)}
            </div>
          )}
          <div>
            <span className="font-medium">Article ID:</span> {news.id.slice(0, 8)}...
          </div>
        </div>
      </motion.div>

      {/* Share Section */}
      <motion.div
        className="mt-12 pt-8 border-t border-gray-200"
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3 className="font-karla font-bold text-xl text-gray-900 mb-4">Share this article</h3>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              const url = `${window.location.origin}/news/${news.slug}`
              const text = `Check out this article: ${news.title}`
              if (navigator.share) {
                navigator.share({ title: news.title, text, url })
              } else {
                navigator.clipboard.writeText(`${text} ${url}`)
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            Share
          </button>
          <button 
            onClick={() => {
              const url = `${window.location.origin}/news/${news.slug}`
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
          <button 
            onClick={() => {
              const url = `${window.location.origin}/news/${news.slug}`
              const text = `Check out this article: ${news.title}`
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </button>
          <button 
            onClick={() => {
              const url = `${window.location.origin}/news/${news.slug}`
              navigator.clipboard.writeText(url)
              // You could add a toast notification here
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Link
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}