// components/ui/GalleryFilter.tsx
import React from 'react'
import { motion } from 'framer-motion'
import type { GalleryCategory } from '@/lib/public/gallery'

interface GalleryFilterProps {
  searchTerm: string
  selectedCategory: string
  sortBy: string
  categories: GalleryCategory[]
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onSortChange: (value: string) => void
  onClearFilters: () => void
}

export function GalleryFilter({
  searchTerm,
  selectedCategory,
  sortBy,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClearFilters,
}: Readonly<GalleryFilterProps>) {
  // Ensure categories is always an array
  const safeCategories = Array.isArray(categories) ? categories : []

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Search */}
        <div className="flex-1 w-full lg:w-auto">
          <label htmlFor="gallery-search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Events
          </label>
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="gallery-search"
              type="text"
              placeholder="Search by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full lg:w-auto">
          <label htmlFor="gallery-category-select" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="gallery-category-select"
            aria-label="Filter by category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full lg:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-300 bg-white"
          >
            <option value="">All Categories</option>
            {safeCategories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="w-full lg:w-auto">
          <label htmlFor="gallery-sort-select" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="gallery-sort-select"
            aria-label="Sort gallery"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full lg:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-300 bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="featured">Featured First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="w-full lg:w-auto">
          <label className="block text-sm font-medium text-transparent mb-2 select-none">
            Actions
          </label>
          <button
            onClick={onClearFilters}
            className="w-full lg:w-auto px-6 py-3 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-xl border border-blue-600"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/10 text-blue-600 text-sm rounded-full">
                Search: "{searchTerm}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 text-primary hover:text-primary/70"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/10 text-blue-600 text-sm rounded-full">
                Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                <button
                  onClick={() => onCategoryChange('')}
                  className="ml-1 text-primary hover:text-primary/70"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}