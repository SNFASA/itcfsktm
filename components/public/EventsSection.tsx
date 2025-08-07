'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  }
  const slideInVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }

  const events: EventData[] = getRecentEvents()

  const isComingSoon = (dateStr: string): boolean => {
    const today = new Date()
    const eventDate = new Date(dateStr)
    return eventDate > today
  }

  return (
    <section id="events" ref={ref} className="relative bg-gradient-to-br from-medium-gray via-medium-gray to-gray-100 py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden"  >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse animate-delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/4 rounded-full blur-2xl animate-pulse animate-delay-1000" />
        <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-white/3 rounded-full blur-xl animate-pulse animate-delay-3000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="inline-block relative"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-section-title text-primary relative z-10">
              Events & Activities
            </h2>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
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
            Join us for exciting tech events, workshops, and activities throughout the year
          </motion.p>
        </motion.div>              
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
                  image={event.image}
                  description={event.description}
                  time={event.time}
                  location={event.location}
                  eligibility={event.eligibility}
                  details={event.details}
                  onRegister={() => console.log(`Register for ${event.title}`)}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl transform scale-110" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
