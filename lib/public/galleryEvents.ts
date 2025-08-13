// lib/public/galleryEvents.ts
import { supabase } from "@/lib/supabaseClient"
import type { GalleryItem, GalleryCategory, GalleryFilterOptions, PaginatedGalleryResult } from "@/lib/public/gallery"

// Export the GalleryItem type so it can be used in other files
export type { GalleryItem, GalleryCategory, GalleryFilterOptions, PaginatedGalleryResult }

// Enhanced error handling wrapper
const withErrorHandling = async <T>(
  operation: () => Promise<T>,
  fallback: T,
  operationName: string
): Promise<T> => {
  try {
    if (!supabase) {
      console.error(`${operationName}: Supabase client not initialized`)
      return fallback
    }
    return await operation()
  } catch (error) {
    console.error(`${operationName} error:`, error)
    return fallback
  }
}

// Get gallery item by ID
export const getGalleryItemById = async (id: string): Promise<GalleryItem | null> => {
  return withErrorHandling(async () => {
    const { data, error } = await supabase!
      .from('galleryitem')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching gallery item by ID:', error.message)
      return null
    }

    return data as GalleryItem
  }, null, 'getGalleryItemById')
}

// Get gallery items by category
export const getGalleryItemsByCategory = async (category: GalleryCategory): Promise<GalleryItem[]> => {
  return withErrorHandling(async () => {
    const { data, error } = await supabase!
      .from('galleryitem')
      .select('*')
      .eq('category', category)
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching gallery items by category:', error.message)
      return []
    }

    return (data as GalleryItem[]) || []
  }, [], 'getGalleryItemsByCategory')
}

// Get all unique categories
export const getAllCategories = async (): Promise<GalleryCategory[]> => {
  return withErrorHandling(async () => {
    const { data, error } = await supabase!
      .from('galleryitem')
      .select('category')

    if (error) {
      console.error('Error fetching categories:', error.message)
      return []
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      return []
    }

    const categories = data
      .map(item => item.category)
      .filter(Boolean)
      .filter((category): category is GalleryCategory => 
        typeof category === 'string' && category.length > 0
      )
    
    const uniqueCategories = Array.from(new Set(categories))
    
    return uniqueCategories
  }, [], 'getAllCategories')
}

// Get recent gallery items (ordered by date descending)
export const getRecentGalleryItems = async (limit: number = 6): Promise<GalleryItem[]> => {
  return withErrorHandling(async () => {
    const { data, error } = await supabase!
      .from('galleryitem')
      .select('*')
      .order('date', { ascending: false })
      .limit(Math.max(1, limit))

    if (error) {
      console.error('Error fetching recent gallery items:', error.message)
      return []
    }

    return (data as GalleryItem[]) || []
  }, [], 'getRecentGalleryItems')
}

// Get all gallery items
export const getAllGalleryItems = async (): Promise<GalleryItem[]> => {
  return withErrorHandling(async () => {
    const { data, error } = await supabase!
      .from('galleryitem')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching all gallery items:', error.message)
      return []
    }

    return (data as GalleryItem[]) || []
  }, [], 'getAllGalleryItems')
}

// Get featured gallery items
export const getFeaturedGalleryItems = async (limit?: number): Promise<GalleryItem[]> => {
  return withErrorHandling(async () => {
    let query = supabase!
      .from('galleryitem')
      .select('*')
      .eq('featured', true)
      .order('date', { ascending: false })

    if (limit && limit > 0) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching featured gallery items:', error.message)
      return []
    }

    return (data as GalleryItem[]) || []
  }, [], 'getFeaturedGalleryItems')
}

// Search gallery items by title, description, or tags
export const searchGalleryItems = async (searchTerm: string): Promise<GalleryItem[]> => {
  return withErrorHandling(async () => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return []
    }

    const cleanedTerm = searchTerm.trim()
    
    const { data, error } = await supabase!
      .from('galleryitem')
      .select('*')
      .or(`title.ilike.%${cleanedTerm}%,description.ilike.%${cleanedTerm}%,tags.cs.{${cleanedTerm}}`)
      .order('date', { ascending: false })

    if (error) {
      console.error('Error searching gallery items:', error.message)
      return []
    }

    return (data as GalleryItem[]) || []
  }, [], 'searchGalleryItems')
}

// Get gallery items with pagination
export const getGalleryItemsPaginated = async (
  page: number = 1,
  itemsPerPage: number = 10,
  category?: GalleryCategory,
  searchTerm?: string
): Promise<PaginatedGalleryResult> => {
  return withErrorHandling(async () => {
    const safePage = Math.max(1, page)
    const safeItemsPerPage = Math.max(1, Math.min(100, itemsPerPage))
    
    const start = (safePage - 1) * safeItemsPerPage
    const end = start + safeItemsPerPage - 1

    let query = supabase!
      .from('galleryitem')
      .select('*', { count: 'exact' })
      .order('date', { ascending: false })
      .range(start, end)

    if (category) {
      query = query.eq('category', category)
    }

    if (searchTerm && searchTerm.trim()) {
      const cleanedTerm = searchTerm.trim()
      query = query.or(`title.ilike.%${cleanedTerm}%,description.ilike.%${cleanedTerm}%`)
    }

    const { data, count, error } = await query

    if (error) {
      console.error('Error fetching paginated gallery items:', error.message)
      return { items: [], totalCount: 0, totalPages: 0 }
    }

    const totalPages = Math.ceil((count || 0) / safeItemsPerPage)

    return {
      items: (data as GalleryItem[]) || [],
      totalCount: count || 0,
      totalPages
    }
  }, { items: [], totalCount: 0, totalPages: 0 }, 'getGalleryItemsPaginated')
}

// Get gallery items with advanced filtering
export const getFilteredGalleryItems = async (options: GalleryFilterOptions): Promise<GalleryItem[]> => {
  return withErrorHandling(async () => {
    let query = supabase!.from('galleryitem').select('*')

    // Apply filters
    if (options.category) {
      query = query.eq('category', options.category)
    }

    if (options.featured !== undefined) {
      query = query.eq('featured', options.featured)
    }

    if (options.searchTerm && options.searchTerm.trim()) {
      const cleanedTerm = options.searchTerm.trim()
      query = query.or(`title.ilike.%${cleanedTerm}%,description.ilike.%${cleanedTerm}%`)
    }

    if (options.tags && options.tags.length > 0) {
      query = query.overlaps('tags', options.tags)
    }

    // Apply sorting
    switch (options.sortBy) {
      case 'oldest':
        query = query.order('date', { ascending: true })
        break
      case 'title':
        query = query.order('title', { ascending: true })
        break
      case 'featured':
        query = query.order('featured', { ascending: false }).order('date', { ascending: false })
        break
      default: // 'newest'
        query = query.order('date', { ascending: false })
        break
    }

    // Apply limit
    if (options.limit && options.limit > 0) {
      query = query.limit(Math.min(100, options.limit))
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching filtered gallery items:', error.message)
      return []
    }

    return (data as GalleryItem[]) || []
  }, [], 'getFilteredGalleryItems')
}

// Test Supabase connection
export const testGallerySupabaseConnection = async (): Promise<boolean> => {
  return withErrorHandling(async () => {
    const { data, error } = await supabase!
      .from("galleryitem")
      .select("count", { count: 'exact' })
      .limit(1)

    if (error) {
      console.log("Gallery Supabase connection test failed:", error.message)
      return false
    }

    console.log("Gallery Supabase connection successful")
    return true
  }, false, 'testGallerySupabaseConnection')
}