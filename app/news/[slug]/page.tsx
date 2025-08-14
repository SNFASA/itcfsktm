'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { getNewsBySlug } from '@/lib/public/newsUtils'
import type { NewsItem } from '@/lib/public/newsUtils'
import NewsArticle from '@/components/public/ui/NewsArticle'

interface NewsDetailPageProps {
  readonly params: Promise<{ readonly slug: string }>
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const [article, setArticle] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  // Unwrap the params promise
  const resolvedParams = use(params)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const fetchedArticle = await getNewsBySlug(resolvedParams.slug)
        
        if (!fetchedArticle) {
          // Article not found, redirect to 404
          router.replace('/404')
          return
        }
        
        setArticle(fetchedArticle)
        setError(null)
      } catch (err) {
        setError('Failed to load article. Please try again later.')
        console.error('Error fetching article:', err)
      } finally {
        setLoading(false)
      }
    }

    if (resolvedParams.slug) {
      fetchArticle()
    }
  }, [resolvedParams.slug, router])

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      // Try to go back, but fallback to news page if no history
      if (window.history.length > 1) {
        window.history.back()
      } else {
        router.push('/news')
      }
    }
  }

  // Loading state
  if (loading) {
    return (
      <main className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden min-h-screen">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-4 sm:top-12 sm:left-6 md:top-16 md:left-8 lg:top-20 lg:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-blue-600/5 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute bottom-8 right-4 sm:bottom-12 sm:right-6 md:bottom-16 md:right-8 lg:bottom-20 lg:right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-600/3 rounded-full blur-2xl sm:blur-3xl" />
        </div>
        {/* Main content container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-primary mx-auto mb-3 sm:mb-4"></div>
              <p className="text-gray-600 font-karla text-sm sm:text-base">Loading article...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Error state
  if (error) {
    return (
      <main className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden min-h-screen">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-4 sm:top-12 sm:left-6 md:top-16 md:left-8 lg:top-20 lg:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-blue-600/5 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute bottom-8 right-4 sm:bottom-12 sm:right-6 md:bottom-16 md:right-8 lg:bottom-20 lg:right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-600/3 rounded-full blur-2xl sm:blur-3xl" />
        </div>
        {/* Main content container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
            <div className="text-center max-w-md mx-auto">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-red-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="font-karla font-bold text-lg sm:text-xl text-gray-900 mb-2">Error Loading Article</h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base px-4">{error}</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 md:px-5 md:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base font-medium"
                >
                  Try Again
                </button>
                <button 
                  onClick={() => router.push('/news')} 
                  className="px-4 py-2 md:px-5 md:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base font-medium"
                >
                  Back to News
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
  
  if (!article) {
    return (
      <main className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden min-h-screen">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-4 sm:top-12 sm:left-6 md:top-16 md:left-8 lg:top-20 lg:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-blue-600/5 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute bottom-8 right-4 sm:bottom-12 sm:right-6 md:bottom-16 md:right-8 lg:bottom-20 lg:right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-600/3 rounded-full blur-2xl sm:blur-3xl" />
        </div>
        {/* Main content container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
            <div className="text-center max-w-md mx-auto">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-karla font-bold text-lg sm:text-xl text-gray-900 mb-2">Article Not Found</h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base px-4">The requested article could not be found.</p>
              <button 
                onClick={() => router.push('/news')} 
                className="px-4 py-2 md:px-5 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-600/90 transition-colors text-sm sm:text-base font-medium"
              >
                Back to News
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
        <div className="absolute top-8 left-4 sm:top-12 sm:left-6 md:top-16 md:left-8 lg:top-20 lg:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-blue-600/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-8 right-4 sm:bottom-12 sm:right-6 md:bottom-16 md:right-8 lg:bottom-20 lg:right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-600/3 rounded-full blur-2xl sm:blur-3xl" />
      </div>
      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <NewsArticle
          news={article}
          onBack={handleBack}
        />
      </div>
    </main>
  )
}