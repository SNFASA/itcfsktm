// app/news/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { getAllNews } from '@/lib/public/newsUtils'
import { useInView } from 'react-intersection-observer'
import type { NewsItem } from '@/lib/public/newsUtils'
import NewsListCard from '@/components/public/ui/NewsListCard'
import NewsFilters from '@/components/public/ui/NewsFilters'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function NewsPage() {
  const [allNews, setAllNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Move the useInView hook inside the component
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const news = await getAllNews()
        setAllNews(news)
        
        // Create categories with display names
        const uniqueCategories = ['All', ...Array.from(new Set(news.map(n => n.category)))]
        setCategories(uniqueCategories)
        setError(null)
      } catch (err) {
        setError('Failed to load news articles. Please try again later.')
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  useEffect(() => {
    let filtered = [...allNews]

    if (searchTerm) {
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(news => news.category === selectedCategory)
    }

    // Sort by published_at instead of date
    if (sortBy === 'newest') {
      filtered.sort((a, b) => {
        const dateA = a.published_at ? new Date(a.published_at).getTime() : 0
        const dateB = b.published_at ? new Date(b.published_at).getTime() : 0
        return dateB - dateA
      })
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => {
        const dateA = a.published_at ? new Date(a.published_at).getTime() : 0
        const dateB = b.published_at ? new Date(b.published_at).getTime() : 0
        return dateA - dateB
      })
    }

    setFilteredNews(filtered)
  }, [allNews, searchTerm, selectedCategory, sortBy])

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSortBy('newest')
  }

  if (loading) {
    return (
      <main className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden min-h-screen">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-blue-600/3 rounded-full blur-3xl" />
        </div>
        {/* Main content container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600 font-karla text-sm sm:text-base">Loading news articles...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden min-h-screen">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-blue-600/3 rounded-full blur-3xl" />
        </div>
        {/* Main content container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <div className="text-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="font-karla font-bold text-lg sm:text-xl text-gray-900 mb-2">Error Loading News</h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base px-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-blue-600/3 rounded-full blur-3xl" />
      </div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 relative z-10"
        >
          <motion.div
            className="inline-block relative"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="font-karla font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-600 relative z-10 px-4">
              All News & Updates
            </h1>
            <motion.div
              className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
          <motion.p
            className="text-gray-600 text-sm sm:text-base lg:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto font-karla px-4"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Stay informed with the latest news, announcements, and updates from our community.
          </motion.p>
        </motion.div>
        
        <div className="relative z-10 mb-6 sm:mb-8">
          <NewsFilters
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            categories={categories}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative z-10">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NewsListCard news={news} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 sm:py-16">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-karla font-bold text-lg sm:text-xl text-gray-900 mb-2 px-4">No articles found</h3>
              <p className="text-gray-500 text-sm sm:text-base px-4">Try adjusting your search or filter criteria.</p>
              {(searchTerm || selectedCategory !== 'All') && (
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-600/80 transition-colors text-sm sm:text-base"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}