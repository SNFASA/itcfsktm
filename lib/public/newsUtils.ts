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
export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error && error.code !== 'PGRST116') throw new Error(error.message)
  return data as NewsItem | undefined
}

// Get news by category
export async function getNewsByCategory(category: string): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as NewsItem[]
}

// Get featured news (you might want to add a featured column later)
export async function getFeaturedNews(limit: number = 5): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('newsarticle')
    .select('*')
    .eq('status', 'published')
    .in('category', ['events', 'announcements']) // Treat events and announcements as featured
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)
  return data as NewsItem[]
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

// Utility function to calculate read time
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Utility function to get category display name
export function getCategoryDisplayName(category: string): string {
  const categoryMap: Record<string, string> = {
    'general': 'General',
    'academic': 'Academic',
    'research': 'Research',
    'events': 'Events',
    'announcements': 'Announcements',
    'student-life': 'Student Life'
  }
  return categoryMap[category] || category
}