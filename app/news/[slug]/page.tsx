// app/news/[slug]/page.tsx
'use client'

import { getNewsBySlug } from '@/lib/public/newsUtils'
import { notFound } from 'next/navigation'
import NewsArticle from '@/components/public/ui/NewsArticle'


export default function NewsDetailPage({ params }: { readonly params: { readonly slug: string } }) {
  const article = getNewsBySlug(params.slug)

  if (!article) return notFound()

  return (
   <main className="container mx-auto px-4 py-12">
      <NewsArticle 
        news={article} 
        onBack={() => {
          // This will be handled on the client side
          if (typeof window !== 'undefined') {
            window.history.back()
          }
        }} 
      />
    </main>   
  )
}