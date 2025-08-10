import { supabase } from "@/lib/supabaseClient"

export interface NewsItem {
  id: string
  title: string
  description: string
  image: string | null
  content: string
  slug: string
  category: 'general' | 'academic' | 'research' | 'events' | 'announcements' | 'student-life'
  author: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
  published_at: string | null
}

// Get all published news articles
export async function getAllNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data as NewsItem[]
}

// Get latest published news (for homepage)
export async function getLatestNews(limit: number = 3): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)
  
  if (error) throw new Error(error.message)
  return data as NewsItem[]
}

// Get news by slug
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null // No rows found
    }
    throw new Error(error.message)
  }
  
  return data as NewsItem
}

// Get news by category
export async function getNewsByCategory(category: NewsItem['category']): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data as NewsItem[]
}

// Get featured news (events and announcements)
export async function getFeaturedNews(limit: number = 5): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('*')
    .eq('status', 'published')
    .in('category', ['events', 'announcements'])
    .order('published_at', { ascending: false })
    .limit(limit)
  
  if (error) throw new Error(error.message)
  return data as NewsItem[]
}

// Get news by multiple categories
export async function getNewsByCategories(categories: NewsItem['category'][]): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('*')
    .eq('status', 'published')
    .in('category', categories)
    .order('published_at', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data as NewsItem[]
}

// Search news articles
export async function searchNews(query: string): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('*')
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`)
    .order('published_at', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data as NewsItem[]
}

// Get news count by category
export async function getNewsCategoryCount(): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('category')
    .eq('status', 'published')
  
  if (error) throw new Error(error.message)
  
  const counts: Record<string, number> = {
    general: 0,
    academic: 0,
    research: 0,
    events: 0,
    announcements: 0,
    'student-life': 0
  }
  
  data.forEach(item => {
    if (item.category in counts) {
      counts[item.category]++
    }
  })
  
  return counts
}

// Utility function to format date for display
export function formatNewsDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Utility function to format date in a shorter format
export function formatNewsDateShort(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Utility function to calculate read time
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Utility function to get category display name
export function getCategoryDisplayName(category: NewsItem['category']): string {
  const categoryMap: Record<NewsItem['category'], string> = {
    'general': 'General',
    'academic': 'Academic',
    'research': 'Research',
    'events': 'Events',
    'announcements': 'Announcements',
    'student-life': 'Student Life'
  }
  return categoryMap[category]
}

// Utility function to get category color/styling
export function getCategoryColor(category: NewsItem['category']): string {
  const colorMap: Record<NewsItem['category'], string> = {
    'general': 'bg-gray-100 text-gray-800',
    'academic': 'bg-blue-100 text-blue-800',
    'research': 'bg-purple-100 text-purple-800',
    'events': 'bg-green-100 text-green-800',
    'announcements': 'bg-red-100 text-red-800',
    'student-life': 'bg-yellow-100 text-yellow-800'
  }
  return colorMap[category]
}

// Utility function to truncate content for previews
export function truncateContent(content: string, maxLength: number = 150): string {
  const plainText = content.replace(/<[^>]*>/g, '')
  if (plainText.length <= maxLength) return plainText
  return plainText.slice(0, maxLength).trim() + '...'
}

// Utility function to get time ago format
export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`
  
  return formatNewsDateShort(dateString)
}