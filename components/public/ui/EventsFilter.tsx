// components/ui/EventsFilter.tsx
import React from 'react'
import { motion } from 'framer-motion'
import type { EventEligibility, EventStatus } from '@/lib/public/EventsData'

interface EventsFilterProps {
  searchTerm: string
  selectedEligibility: string
  selectedStatus: string
  sortBy: string
  showOnlineOnly: boolean
  showFreeOnly: boolean
  showWithCertificates: boolean
  onSearchChange: (value: string) => void
  onEligibilityChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSortChange: (value: string) => void
  onOnlineToggle: (value: boolean) => void
  onFreeToggle: (value: boolean) => void
  onCertificateToggle: (value: boolean) => void
  onClearFilters: () => void
  isLoading?: boolean
  resultsCount?: number
}

const eligibilityOptions: { value: EventEligibility | '', label: string }[] = [
  { value: '', label: 'All Participants'},
  { value: 'public', label: 'Open to Public' },
  { value: 'all-students', label: 'All Students'},
  { value: 'undergraduates', label: 'Undergraduates'},
  { value: 'graduates', label: 'Graduates' },
  { value: 'faculty', label: 'Faculty Only' },
  { value: 'staff', label: 'Staff Only'},
]

const statusOptions: { value: EventStatus | '', label: string}[] = [
  { value: '', label: 'All Events'},
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed'},
  { value: 'cancelled', label: 'Cancelled'},
]

const sortOptions = [
  { value: 'date-asc', label: 'Date (Earliest First)' },
  { value: 'date-desc', label: 'Date (Latest First)'},
  { value: 'title-asc', label: 'Title (A-Z)'},
  { value: 'title-desc', label: 'Title (Z-A)'},
  { value: 'created-desc', label: 'Recently Added'},
]

export function EventsFilter({
  searchTerm,
  selectedEligibility,
  selectedStatus,
  sortBy,
  showOnlineOnly,
  showFreeOnly,
  showWithCertificates,
  onSearchChange,
  onEligibilityChange,
  onStatusChange,
  onSortChange,
  onOnlineToggle,
  onFreeToggle,
  onCertificateToggle,
  onClearFilters,
  isLoading = false,
  resultsCount = 0,
}: Readonly<EventsFilterProps>) {
  const hasActiveFilters = searchTerm || selectedEligibility || selectedStatus || showOnlineOnly || showFreeOnly || showWithCertificates || sortBy !== 'date-asc'

  const activeFiltersCount = [
    searchTerm,
    selectedEligibility,
    selectedStatus,
    showOnlineOnly,
    showFreeOnly,
    showWithCertificates,
    sortBy !== 'date-asc' ? sortBy : null
  ].filter(Boolean).length

  // Handle input changes with proper event handling
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }

  const handleEligibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onEligibilityChange(e.target.value)
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value)
  }

  const handleOnlineToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onOnlineToggle(e.target.checked)
  }

  const handleFreeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFreeToggle(e.target.checked)
  }

  const handleCertificateToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCertificateToggle(e.target.checked)
  }

  const clearSearchTerm = () => {
    onSearchChange('')
  }

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-white/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header with Results Count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-gray-800">Filter & Search Events</h3>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-600/10 text-blue-600 text-xs font-semibold rounded-full">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        {resultsCount !== undefined && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2 sm:mt-0">
            <span className="inline-flex items-center gap-1">
                {isLoading ? 'Loading...' : `${resultsCount} events found`}
            </span>
          </div>
        )}
      </div>

      {/* Main Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="lg:col-span-2">
          <label htmlFor="events-search" className="block text-sm font-semibold text-gray-700 mb-2">
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
              id="events-search"
              type="text"
              placeholder="Search by title, description, or location..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              disabled={isLoading}
            />
            {searchTerm && (
              <button
                onClick={clearSearchTerm}
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Eligibility Filter */}
        <div>
          <label htmlFor="events-eligibility-select" className="block text-sm font-semibold text-gray-700 mb-2">
            Eligibility
          </label>
          <select
            id="events-eligibility-select"
            aria-label="Filter by eligibility"
            value={selectedEligibility}
            onChange={handleEligibilityChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            disabled={isLoading}
          >
            {eligibilityOptions.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="events-status-select" className="block text-sm font-semibold text-gray-700 mb-2">
             Status
          </label>
          <select
            id="events-status-select"
            aria-label="Filter by status"
            value={selectedStatus}
            onChange={handleStatusChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            disabled={isLoading}
          >
            {statusOptions.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                 {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Sort */}
        <div>
          <label htmlFor="events-sort-select" className="block text-sm font-semibold text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="events-sort-select"
            aria-label="Sort events"
            value={sortBy}
            onChange={handleSortChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            disabled={isLoading}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
               {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Filters */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
              Quick Filters
          </label>
          <div className="flex flex-wrap gap-3">
            {/* Online Only */}
            <label className="inline-flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={handleOnlineToggle}
                className="sr-only"
                disabled={isLoading}
              />
              <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                showOnlineOnly ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  showOnlineOnly ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  Online Only
              </span>
            </label>

            {/* Free Only */}
            <label className="inline-flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={handleFreeToggle}
                className="sr-only"
                disabled={isLoading}
              />
              <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                showFreeOnly ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  showFreeOnly ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  Free Only
              </span>
            </label>

            {/* Certificates */}
            <label className="inline-flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={showWithCertificates}
                onChange={handleCertificateToggle}
                className="sr-only"
                disabled={isLoading}
              />
              <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                showWithCertificates ? 'bg-purple-500' : 'bg-gray-300'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  showWithCertificates ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  With Certificates
              </span>
            </label>
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            type="button"
            disabled={!hasActiveFilters || isLoading}
            className={`w-full px-6 py-3 font-semibold rounded-xl transition-all duration-300 border-2 ${
              hasActiveFilters && !isLoading
                ? 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transform hover:scale-105 shadow-md hover:shadow-lg'
                : 'text-gray-400 border-gray-300 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              ' Clear Filters'
            )}
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div 
          className="pt-4 border-t border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-gray-600">🏷️ Active filters:</span>
            
            {searchTerm && (
              <motion.span 
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                 Search: "{searchTerm}"
                <button
                  onClick={() => onSearchChange('')}
                  type="button"
                  className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
                  disabled={isLoading}
                  aria-label="Remove search filter"
                >
                  ×
                </button>
              </motion.span>
            )}
            
            {selectedEligibility && (
              <motion.span 
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {eligibilityOptions.find(opt => opt.value === selectedEligibility)?.label}
                <button
                  onClick={() => onEligibilityChange('')}
                  type="button"
                  className="ml-1 text-green-600 hover:text-green-800 font-bold"
                  disabled={isLoading}
                  aria-label="Remove eligibility filter"
                >
                  ×
                </button>
              </motion.span>
            )}
            
            {selectedStatus && (
              <motion.span 
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full border border-purple-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {statusOptions.find(opt => opt.value === selectedStatus)?.label}
                <button
                  onClick={() => onStatusChange('')}
                  type="button"
                  className="ml-1 text-purple-600 hover:text-purple-800 font-bold"
                  disabled={isLoading}
                  aria-label="Remove status filter"
                >
                  ×
                </button>
              </motion.span>
            )}

            {showOnlineOnly && (
              <motion.span 
                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full border border-indigo-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                Online Only
                <button
                  onClick={() => onOnlineToggle(false)}
                  type="button"
                  className="ml-1 text-indigo-600 hover:text-indigo-800 font-bold"
                  disabled={isLoading}
                  aria-label="Remove online only filter"
                >
                  ×
                </button>
              </motion.span>
            )}

            {showFreeOnly && (
              <motion.span 
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full border border-emerald-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                Free Only
                <button
                  onClick={() => onFreeToggle(false)}
                  type="button"
                  className="ml-1 text-emerald-600 hover:text-emerald-800 font-bold"
                  disabled={isLoading}
                  aria-label="Remove free only filter"
                >
                  ×
                </button>
              </motion.span>
            )}

            {showWithCertificates && (
              <motion.span 
                className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full border border-amber-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                With Certificates
                <button
                  onClick={() => onCertificateToggle(false)}
                  type="button"
                  className="ml-1 text-amber-600 hover:text-amber-800 font-bold"
                  disabled={isLoading}
                  aria-label="Remove certificate filter"
                >
                  ×
                </button>
              </motion.span>
            )}

            {sortBy !== 'date-asc' && (
              <motion.span 
                className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full border border-orange-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}
                <button
                  onClick={() => onSortChange('date-asc')}
                  type="button"
                  className="ml-1 text-orange-600 hover:text-orange-800 font-bold"
                  disabled={isLoading}
                  aria-label="Reset sort to default"
                >
                  ×
                </button>
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}