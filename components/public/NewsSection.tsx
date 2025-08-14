'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import NewsCard from '@/components/public/ui/NewsCard'
import { getLatestNews, type NewsItem, formatNewsDate } from '@/lib/public/newsUtils'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
}

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
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
    <section id="news" ref={ref} className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600/90 py-8 sm:py-12 lg:py-16 xl:py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Enhanced Section Title with blue theme */}
        <motion.div
          key="title"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariant}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20"
        >
          <div className="relative inline-block">
            <motion.h2 
              className="font-karla font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white relative z-10 tracking-tight leading-tight"
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 20px rgba(59, 130, 246, 0.8)"
              }}
              transition={{ duration: 0.3 }}
            >
              News & Announcements              
              {/* Text glow effect */}
              <div className="absolute inset-0 bg-blue-400/20 blur-2xl sm:blur-3xl rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </motion.h2>
            
            {/* Multi-layer animated underline with blue theme */}
            <motion.div
              className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
            {/* Enhanced background glow effects */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-cyan-300/20 to-blue-400/15 blur-2xl sm:blur-3xl rounded-full transform scale-125 sm:scale-150"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1.25, 1.4, 1.25]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-300/15 to-indigo-400/10 blur-xl sm:blur-2xl rounded-full transform scale-110 sm:scale-125"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1.1, 1.25, 1.1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeVariant}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white text-sm sm:text-base lg:text-lg xl:text-xl mt-3 sm:mt-4 max-w-xl lg:max-w-2xl mx-auto font-karla leading-relaxed px-4"
          >
            Stay updated with the latest happenings and exciting developments
          </motion.p>
          
          {/* Enhanced decorative elements around title */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 sm:-translate-y-6 lg:-translate-y-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div 
              className="flex items-center gap-1.5 sm:gap-2 lg:gap-3"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-blue-400/70 rounded-full shadow-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-cyan-300/60 rounded-full shadow-md"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div 
                className="w-0.5 h-0.5 sm:w-1 sm:h-1 lg:w-1.5 lg:h-1.5 bg-blue-300/50 rounded-full shadow-sm"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Side floating elements - hidden on small screens */}
          <motion.div
            className="hidden sm:block absolute top-1/2 -left-6 lg:-left-8 xl:-left-12 transform -translate-y-1/2"
            animate={{
              x: [0, 8, 0],
              y: [0, -10, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-400/50 rounded-full shadow-lg" />
          </motion.div>
          <motion.div
            className="hidden sm:block absolute top-1/2 -right-6 lg:-right-8 xl:-right-12 transform -translate-y-1/2"
            animate={{
              x: [0, -8, 0],
              y: [0, 10, 0],
              rotate: [0, -360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-cyan-300/60 rounded-full shadow-md" />
          </motion.div>
        </motion.div>

        {/* News Content */}
        {isLoading ? (
          // Loading skeleton
          <motion.div
            className="flex flex-col gap-4 sm:gap-6 lg:gap-8 xl:gap-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {Array.from({ length: 3 }).map((_, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 animate-pulse"
              >
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                  <div className="lg:w-1/3">
                    <div className="w-full h-32 sm:h-40 lg:h-48 bg-white/20 rounded-lg lg:rounded-xl" />
                  </div>
                  <div className="lg:w-2/3 space-y-3 sm:space-y-4">
                    <div className="h-6 sm:h-8 bg-white/20 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-3 sm:h-4 bg-white/20 rounded w-full" />
                      <div className="h-3 sm:h-4 bg-white/20 rounded w-5/6" />
                      <div className="h-3 sm:h-4 bg-white/20 rounded w-4/6" />
                    </div>
                    <div className="h-5 sm:h-6 bg-white/20 rounded w-24 sm:w-32" />
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
            className="text-center py-8 sm:py-12"
          >
            <div className="bg-red-500/20 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 sm:p-8 max-w-sm sm:max-w-md mx-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-white font-karla font-bold text-lg sm:text-xl mb-2">Failed to Load News</h3>
              <p className="text-white/80 font-karla text-sm sm:text-base">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-white/20 hover:bg-white/30 text-white text-sm sm:text-base rounded-full transition-all duration-300"
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
            className="text-center py-8 sm:py-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 sm:p-8 max-w-sm sm:max-w-md mx-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v8m4-4H9m1.5-2.5L9 12.5m1.5 2.5L9 16.5" />
                </svg>
              </div>
              <h3 className="text-white font-karla font-bold text-lg sm:text-xl mb-2">No News Available</h3>
              <p className="text-white/80 font-karla text-sm sm:text-base">Check back later for the latest updates and announcements.</p>
            </div>
          </motion.div>
        ) : (
          // News Cards
          <motion.div
            className="flex flex-col gap-4 sm:gap-6 lg:gap-8 xl:gap-10"
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
                    delay: idx * 0.1,
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
          className="text-center mt-8 sm:mt-12 lg:mt-16"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.a
            href="/news"
            className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-white to-white/90 text-blue-600 font-karla font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All News
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
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