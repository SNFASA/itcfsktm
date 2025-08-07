
// components/ui/NewsFilters.tsx
'use client'

interface NewsFiltersProps {
  searchTerm: string
  selectedCategory: string
  sortBy: string
  categories: string[]
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onSortChange: (value: string) => void
  onClearFilters: () => void
}

export default function NewsFilters({
  searchTerm,
  selectedCategory,
  sortBy,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClearFilters
}: Readonly<NewsFiltersProps>) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Search */}
        <div className="flex-1 w-full lg:w-auto">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="w-full lg:w-auto">
          <label htmlFor="category-select" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-select"
            aria-label="Filter by category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full lg:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Sort */}
        <div className="w-full lg:w-auto">
          <label htmlFor="sort-select" className="sr-only">
            Sort news
          </label>
          <select
            id="sort-select"
            aria-label="Sort news"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full lg:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        
        {/* Clear Filters */}
        <button
          onClick={onClearFilters}
          className="w-full lg:w-auto px-6 py-3 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 rounded-xl border border-primary"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

