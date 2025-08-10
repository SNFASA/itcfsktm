'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import NewsCard from '@/components/public/ui/NewsCard'
import { getLatestNews, type NewsItem, formatNewsDate } from '@/lib/public/newsUtils'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Fetch latest news on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const latestNews = await getLatestNews(3)
        setNewsItems(latestNews)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Failed to load news articles')
        setNewsItems([]) // Fallback to empty array
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <section id="news" ref={ref} className="relative bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Title */}
        <motion.div
          key="title"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariant}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="relative inline-block">
            <h2 className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-section-title text-white relative z-10 tracking-tight">
              News & Announcements
            </h2>
            
            {/* Multi-layer animated underline */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '120%', opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '80%', opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
            
            {/* Background glow effects */}
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full transform scale-150 opacity-30 animate-pulse" />
            <div className="absolute inset-0 bg-cyan-300/10 blur-2xl rounded-full transform scale-125 opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeVariant}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white/80 text-base sm:text-lg lg:text-xl mt-6 max-w-3xl mx-auto font-karla leading-relaxed"
          >
            Stay updated with the latest happenings and exciting developments
          </motion.p>
          
          {/* Decorative elements around title */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-cyan-300/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>
        </motion.div>

        {/* News Content */}
        {isLoading ? (
          // Loading skeleton
          <motion.div
            className="flex flex-col gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {Array.from({ length: 3 }).map((_, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-pulse"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    <div className="w-full h-48 bg-white/20 rounded-xl" />
                  </div>
                  <div className="lg:w-2/3 space-y-4">
                    <div className="h-8 bg-white/20 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-white/20 rounded w-full" />
                      <div className="h-4 bg-white/20 rounded w-5/6" />
                      <div className="h-4 bg-white/20 rounded w-4/6" />
                    </div>
                    <div className="h-6 bg-white/20 rounded w-32" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : error ? (
          // Error state
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center py-12"
          >
            <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-white font-karla font-bold text-xl mb-2">Failed to Load News</h3>
              <p className="text-white/80 font-karla">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        ) : newsItems.length === 0 ? (
          // Empty state
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center py-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v8m4-4H9m1.5-2.5L9 12.5m1.5 2.5L9 16.5" />
                </svg>
              </div>
              <h3 className="text-white font-karla font-bold text-xl mb-2">No News Available</h3>
              <p className="text-white/80 font-karla">Check back later for the latest updates and announcements.</p>
            </div>
          </motion.div>
        ) : (
          // News Cards
          <motion.div
            className="flex flex-col gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {newsItems.map((news, idx) => {
              const isEven = idx % 2 === 0
              const animationVariant = isEven ? slideInLeft : slideInRight

              return (
                <motion.div
                  key={news.id}
                  variants={animationVariant}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.15,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="relative"
                >
                  <NewsCard
                    title={news.title}
                    description={news.description}
                    image={news.image || '/images/default-news.jpg'}
                    date={formatNewsDate(news.published_at || news.created_at)}
                    slug={news.slug}
                    imagePosition={isEven ? 'left' : 'right'}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.a
            href="/news"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-white to-white/90 text-primary font-karla font-semibold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All News
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}