'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import NewsCard from '@/components/public/ui/NewsCard'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}
  const fadeVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  }
const newsItems = [
  {
    title: "TechMecha Sprint 2025",
    description:
      "The Information Technology Club (ITC) at Universiti Tun Hussein Onn Malaysia (UTHM) proudly launches a new initiative to bridge tech and students, featuring cutting-edge workshops and collaborative projects.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/9333e1670ce109529902d7cc1407d56e1f8f7d15?width=712",
    date: "2025-06-21",
    slug: "techmecha-sprint-2025",
  },
  {
    title: "Digital Innovation Day",
    description:
      "Explore the latest student-led digital innovations happening across UTHM. Join us for exciting demos, inspiring talks, and hands-on workshops that showcase the future of technology.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/9333e1670ce109529902d7cc1407d56e1f8f7d15?width=712",
    date: "2025-07-10",
    slug: "digital-innovation-day",
  },
  {
    title: "AI Hackathon Results",
    description:
      "Winners of the 2025 AI Hackathon have been announced! Discover the top teams and their incredible solutions that are pushing the boundaries of artificial intelligence and machine learning.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/9333e1670ce109529902d7cc1407d56e1f8f7d15?width=712",
    date: "2025-07-05",
    slug: "ai-hackathon-results-2025",
  },
]

export default function NewsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="news" ref={ref} className="relative bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" ref={ref}>
        {/* Section Title */}
              <motion.div
                key="title"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariant}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center mb-16 sm:mb-20"
              >
                <div className="relative inline-block">
                  <h2 className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-section-title text-white relative z-10 tracking-tight">
                    News & Announcements
                  </h2>
                  
                  {/* Multi-layer animated underline */}
                  <motion.div
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '120%', opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '80%', opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                  />
                  
                  {/* Background glow effects */}
                  <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full transform scale-150 opacity-30 animate-pulse" />
                  <div className="absolute inset-0 bg-cyan-300/10 blur-2xl rounded-full transform scale-125 opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeVariant}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-white/80 text-base sm:text-lg lg:text-xl mt-6 max-w-3xl mx-auto font-karla leading-relaxed"
                >
                  Stay updated with the latest happenings and exciting developments
                </motion.p>
                
                {/* Decorative elements around title */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-cyan-300/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </motion.div>
              </motion.div>
        {/* News Cards */}
        <motion.div
          className="flex flex-col gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {newsItems.map((news, idx) => {
            const isEven = idx % 2 === 0
            const animationVariant = isEven ? slideInLeft : slideInRight

            return (
              <motion.div
                key={news.slug}
                variants={animationVariant}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative"
              >
                <NewsCard
                  title={news.title}
                  description={news.description}
                  image={news.image}
                  date={news.date}
                  slug={news.slug}
                  imagePosition={isEven ? 'left' : 'right'}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.a
            href="/news"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-white to-white/90 text-primary font-karla font-semibold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All News
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
