'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'
import EventCard from '@/components/public/ui/EventCard'
import { getRecentEvents, type EventData } from '@/lib/public/EventsData'

export default function EventsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
    const fadeVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  }

  const fadeInUpSection = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  }

  const router = useRouter()
  const [events, setEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)

  const defaultEventImage = '/images/default-event.jpg'

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getRecentEvents()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleViewAllEvents = () => {
    router.push('/events/view-all/')
  }

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

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="events"
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
              {/* Enhanced Section Title with white theme */}
              <motion.div
                key="title"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariant}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center mb-16 sm:mb-20 lg:mb-24"
              >
                <div className="relative inline-block">
                  <motion.h2 
                    className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-blue-600 relative z-10 tracking-tight leading-tight"
                    whileHover={{
                      scale: 1.02,
                      textShadow: "0 0 30px rgba(255, 255, 255, 0.8)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Events & Activities
                    
                    {/* Text glow effect */}
                    <div className="absolute inset-0 bg-white/20 blur-3xl rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  </motion.h2>
                  
                  {/*layer animated underline with white theme */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                  />
                  {/* Enhanced background glow effects */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-200/15 via-blue-300/20 to-blue-200/15 blur-3xl rounded-full transform scale-150"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1.5, 1.7, 1.5]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-100/10 via-blue-200/15 to-blue-300/10 blur-2xl rounded-full transform scale-125"
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1.25, 1.4, 1.25],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>
                
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeVariant}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-gray-600 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl mx-auto font-karla leading-relaxed"
                >
                   Join us for exciting tech events, workshops, and activities throughout the year
                </motion.p>
                
                {/* Enhanced decorative elements around title */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 sm:-translate-y-12"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <motion.div 
                    className="flex items-center gap-2 sm:gap-3"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div 
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-300/70 rounded-full shadow-lg"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-200/60 rounded-full shadow-md"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                    <motion.div 
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-100/50 rounded-full shadow-sm"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                  </motion.div>
                </motion.div>
                
                {/* Side floating elements */}
                <motion.div
                  className="absolute top-1/2 -left-8 sm:-left-12 transform -translate-y-1/2"
                  animate={{
                    x: [0, 10, 0],
                    y: [0, -15, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-2 h-2 bg-gray-300/50 rounded-full shadow-lg" />
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -right-8 sm:-right-12 transform -translate-y-1/2"
                  animate={{
                    x: [0, -10, 0],
                    y: [0, 15, 0],
                    rotate: [0, -360]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-gray-200/60 rounded-full shadow-md" />
                </motion.div>
              </motion.div>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-center text-gray-500 font-karla text-lg mt-4">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 font-karla text-lg">No events available at the moment.</p>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={slideInVariants}
                  transition={{ duration: 0.6 }}
                  className="group relative"
                >
                  <div className="absolute -top-3 -left-3 z-20 w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white/80 font-bold text-sm">{index + 1}</span>
                  </div>

                  <div className="relative transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
                    <EventCard
                      key={event.id}
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

            {/* View All Events Button */}
            <motion.div
              className="text-center mt-12 sm:mt-16 lg:mt-20"
              variants={fadeInUpSection}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <button
                onClick={handleViewAllEvents}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View All Events
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}