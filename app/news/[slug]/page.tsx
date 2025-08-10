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
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 font-karla">Loading article...</p>
          </div>
        </div>
      </main>
    )
  }

  // Error state
  if (error) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="font-karla font-bold text-xl text-gray-900 mb-2">Error Loading Article</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
              <button 
                onClick={() => router.push('/news')} 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to News
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }
  if (!article) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="font-karla font-bold text-xl text-gray-900 mb-2">Article Not Found</h3>
            <p className="text-gray-500 mb-4">The requested article could not be found.</p>
            <button 
              onClick={() => router.push('/news')} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to News
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <NewsArticle
        news={article}
        onBack={handleBack}
      />
    </main>
  )
}