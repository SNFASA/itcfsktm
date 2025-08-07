// app/news/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { getAllNews } from '@/lib//public/newsUtils'
import type { NewsItem } from '@/lib//public/newsUtils'
import NewsListCard from '@/components/public/ui/NewsListCard'
import NewsFilters from '@/components/public/ui/NewsFilters'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

export default function NewsPage() {
  const [allNews, setAllNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const news = getAllNews()
    setAllNews(news)
    
    const uniqueCategories = ['All', ...Array.from(new Set(news.map(n => n.category)))]
    setCategories(uniqueCategories)
  }, [])

  useEffect(() => {
    let filtered = [...allNews]

    if (searchTerm) {
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(news => news.category === selectedCategory)
    }

    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    setFilteredNews(filtered)
  }, [allNews, searchTerm, selectedCategory, sortBy])

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSortBy('newest')
  }

  return (
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-karla font-extrabold text-4xl lg:text-5xl text-gray-900 mb-4">
            All News & Updates
          </h1>
          <p className="text-gray-600 font-karla text-lg lg:text-xl mb-8 max-w-2xl">
            Stay informed with the latest news, announcements, and updates from our community.
          </p>
        </motion.div>
        
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NewsListCard news={news} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-karla font-bold text-xl text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </main>
  )
}

