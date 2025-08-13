// app/events/page.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { EventData} from '@/lib/public/EventsData'
import { getRecentEvents } from '@/lib/public/EventsData'
import EventCard from '@/components/public/ui/EventCard'
import { EventsFilter } from '@/components/public/ui/EventsFilter'

const ITEMS_PER_PAGE = 12

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const slideInVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export default function AllEventsPage() {
  const router = useRouter()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // State management
  const [allEvents, setAllEvents] = useState<EventData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEligibility, setSelectedEligibility] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('date-asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [showFreeOnly, setShowFreeOnly] = useState(false)
  const [showWithCertificates, setShowWithCertificates] = useState(false)

  const defaultEventImage = '/images/default-event.jpg'

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        // Get more events for the all events page
        const events = await getRecentEvents(100) // Fetch more events
        setAllEvents(events)
        setError(null)
      } catch (err) {
        setError('Failed to load events. Please try again later.')
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = [...allEvents]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply eligibility filter
    if (selectedEligibility) {
      filtered = filtered.filter(event => event.eligibility === selectedEligibility)
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(event => event.status === selectedStatus)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        case 'created-desc':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [allEvents, searchTerm, selectedEligibility, selectedStatus, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEvents.length / ITEMS_PER_PAGE)
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAndSortedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredAndSortedEvents, currentPage])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedEligibility, selectedStatus, sortBy])

  // Event handlers
  const handleEventDetails = (eventId: string) => {
    router.push(`/events/${eventId}`)
  }

  const handleRegister = (event: EventData) => {
    if (event.registration_link) {
      window.open(event.registration_link, '_blank')
    } else {
      router.push(`/events/${event.id}`)
    }
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedEligibility('')
    setSelectedStatus('')
    setSortBy('date-asc')
    setShowOnlineOnly(false)
    setShowFreeOnly(false)
    setShowWithCertificates(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <main className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl" />
        </div>
        {/* Main content container */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600 font-karla">Loading events...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl" />
        </div>
        {/* Main content container */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="font-karla font-bold text-xl text-gray-900 mb-2">Error Loading Events</h3>
              <p className="text-gray-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl" />
      </div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative z-10"
        >
          <motion.div
            className="inline-block relative"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-blue-600 relative z-10">
              All Events & Activities
            </h1>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
          <motion.p
            className="text-gray-600 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl mx-auto font-karla"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Discover and join our exciting tech events, workshops, and activities throughout the year.
          </motion.p>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          className="mb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600 font-karla text-sm">
            Showing {paginatedEvents.length} of {filteredAndSortedEvents.length} events
            {(searchTerm || selectedEligibility || selectedStatus) && (
              <span className="ml-2">
                • Filtered by: {[
                  searchTerm && `"${searchTerm}"`,
                  selectedEligibility && `${selectedEligibility}`,
                  selectedStatus && `${selectedStatus}`
                ].filter(Boolean).join(', ')}
              </span>
            )}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="relative z-10">
          <EventsFilter
            searchTerm={searchTerm}
            selectedEligibility={selectedEligibility}
            selectedStatus={selectedStatus}
            sortBy={sortBy}
            showOnlineOnly={showOnlineOnly}
            showFreeOnly={showFreeOnly}
            showWithCertificates={showWithCertificates}
            onSearchChange={setSearchTerm}
            onEligibilityChange={setSelectedEligibility}
            onStatusChange={setSelectedStatus}
            onSortChange={setSortBy}
            onOnlineToggle={setShowOnlineOnly}
            onFreeToggle={setShowFreeOnly}
            onCertificateToggle={setShowWithCertificates}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Events Grid */}
        {paginatedEvents.length > 0 ? (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12 relative z-10"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {paginatedEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={slideInVariants}
                  transition={{ duration: 0.6 }}
                  className="group relative"
                >
                  <div className="relative transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
                    <EventCard
                      title={event.title}
                      date={event.date}
                      image={event.main_image || defaultEventImage}
                      description={event.description}
                      time={event.time}
                      location={event.location}
                      eligibility={event.eligibility}
                      details={event.details}
                      onRegister={() => handleRegister(event)}
                      onViewDetails={() => handleEventDetails(event.id)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl transform scale-110" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center space-x-2 mt-12 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-300'
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        currentPage === pageNum
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                {/* Show dots if there are more pages */}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-300'
                  }`}
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-16 relative z-10">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h8a2 2 0 012 2v4m-6 8l2-2m-2 2l-2-2m2 2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2h2z" />
            </svg>
            <h3 className="font-karla font-bold text-xl text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
            {(searchTerm || selectedEligibility || selectedStatus) && (
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300 rounded-xl border border-blue-600 font-semibold"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  )
}