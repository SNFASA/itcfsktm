// lib/public/gallery.ts
export type GalleryCategory = 
  | 'events' 
  | 'campus' 
  | 'academic' 
  | 'sports' 
  | 'cultural' 
  | 'graduation' 
  | 'workshop' 
  | 'conference' 
  | 'seminar'

export interface GalleryItem {
  id: string
  title: string
  description: string
  main_image: string
  additional_images: string[]
  tags: string[]
  category: GalleryCategory
  size: 'small' | 'medium' | 'large'
  date: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface GalleryFilterOptions {
  category?: GalleryCategory
  featured?: boolean
  searchTerm?: string
  sortBy?: 'newest' | 'oldest' | 'title' | 'featured'
  limit?: number
  tags?: string[]
}

export interface PaginatedGalleryResult {
  items: GalleryItem[]
  totalCount: number
  totalPages: number
}

// Legacy support - alias for backward compatibility
export type GalleryEvent = GalleryItem