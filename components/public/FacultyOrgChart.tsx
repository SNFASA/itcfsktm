'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function FacultyOrgChart() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fadeVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  }

  const scaleVariant = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -40 },
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const deputyDeans = [
    {
      name: 'PUAN ZURAIDA BINTI BOSRI',
      title: 'Timbalan Pendaftar',
    },
    {
      name: 'Ts. Dr. ZUBAILE BIN ABDULLAH',
      title: 'Timbalan Dekan (Akademik dan Antarabangsa)',
    },
    {
      name: 'PROF. MADYA Dr. SHAHREEN BINTI KASIM',
      title: 'Tim. Dekan (Penyelidikan, Pembangunan & Penerbitan)',
    },
    {
      name: 'PROF. MADYA Dr. MUHAINI BINTI OTHMAN',
      title: 'Timbalan Dekan (Hal Ehwal Pelajar dan Alumni)',
    },
  ]

  type Person = {
    name: string;
    title: string;
  };

  const LeaderCard = ({
    person,
    isDean = false,
    delay = 0,
  }: {
    person: Person;
    isDean?: boolean;
    delay?: number;
  }) => (
    <motion.div
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={scaleVariant}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className="group relative"
    >
      <div className="text-center relative">
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/20 rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 blur-xl" />
        
        {/* Profile image container with enhanced effects */}
        <div className="relative inline-block mb-8">
          {/* Multi-layer glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/40 rounded-full blur-2xl transform scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/30 via-blue-300/20 to-purple-300/30 rounded-full blur-lg transform scale-115 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Enhanced image border */}
          <div className={`relative ${isDean ? 'w-44 h-44' : 'w-32 h-32'} rounded-full bg-gradient-to-br from-white/30 via-white/20 to-white/30 p-1.5 group-hover:scale-110 transition-all duration-500 backdrop-blur-sm border border-white/20`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-white shadow-inner">
              <Image
                src="/images/avata1.png"
                alt={person.name}
                width={isDean ? 176 : 128}
                height={isDean ? 176 : 128}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
          </div>
          
          {/* Floating orbital elements */}
          <div className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-br from-cyan-400/60 to-blue-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce" />
          <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-gradient-to-br from-purple-400/60 to-pink-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 -right-6 w-2 h-2 bg-gradient-to-br from-yellow-400/60 to-orange-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>

        {/* Enhanced content card */}
        <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 group-hover:border-white/40 group-hover:bg-white/15">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Multiple shine effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cyan-300/10 to-transparent transform skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-out rounded-3xl delay-200" />
          
          {/* Content */}
          <h4 className={`font-karla font-extrabold ${isDean ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'} text-white mb-3 leading-tight relative z-10 group-hover:text-cyan-100 transition-colors duration-300`}>
            {person.name}
          </h4>
          <p className={`font-karla font-bold ${isDean ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} text-gray-200 relative z-10 leading-relaxed group-hover:text-gray-100 transition-colors duration-300`}>
            {person.title}
          </p>
          
          {/* Decorative corner elements */}
          <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-3 left-3 w-6 h-6 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Pulse ring effect */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-3xl opacity-0 group-hover:opacity-100 animate-ping" />
        </div>
      </div>
    </motion.div>
  )

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
      {/* Ultra-enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large animated background elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-white/8 to-cyan-300/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-300/5 to-white/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-300/5 to-white/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-gradient-to-br from-white/6 to-pink-300/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 right-1/4 w-8 h-8 border-2 border-white/20 rotate-45 animate-spin opacity-30" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-32 left-1/3 w-6 h-6 bg-white/10 rounded-full animate-bounce opacity-40" style={{ animationDelay: '2s' }} />
        <div className="absolute top-40 left-1/5 w-4 h-4 border border-white/15 rounded-full animate-ping opacity-25" style={{ animationDelay: '4s' }} />
        
        {/* Enhanced grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" ref={ref}>
        <AnimatePresence>
          {inView && (
            <>
              {/* Enhanced Section Title */}
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
                    Organization Chart Faculty
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
                  Excellence in leadership, innovation in education
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

              {/* Dean Section with Enhanced Styling */}
              <motion.div
                key="dean"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={scaleVariant}
                transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-center mb-20 sm:mb-24"
              >
                <LeaderCard 
                  person={{
                    name: 'PROF. Ts. Dr. MOHD FARHAN BIN MD. FUDZEE',
                    title: 'Dekan'
                  }}
                  isDean={true}
                />
                
                {/* Connecting line decoration */}
                <motion.div
                  className="w-px h-16 bg-gradient-to-b from-white/40 via-white/20 to-transparent mt-8"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </motion.div>

              {/* Deputy Deans with Enhanced Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 justify-items-center"
              >
                {deputyDeans.map((person, i) => (
                  <LeaderCard
                    key={`deputy-${i}`}
                    person={person}
                    delay={0.8 + (i * 0.15)}
                  />
                ))}
              </motion.div>

              {/* Enhanced Call to Action 
              <motion.div
                key="cta"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariant}
                transition={{ duration: 1, delay: 2.5 }}
                className="text-center mt-20 sm:mt-24"
              >
                <div className="relative inline-block">
                  <motion.button
                    className="relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-karla font-semibold px-10 py-5 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 group shadow-2xl hover:shadow-3xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Learn More About Faculty
                      <svg 
                        className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    
                     /* Enhanced button effects
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/10 via-blue-300/10 to-purple-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-lg" />
                  </motion.button>
                  
                  * Enhanced decorative rings *
                  <motion.div
                    className="absolute inset-0 border-2 border-white/20 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 border border-cyan-300/15 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1,
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 border border-white/10 rounded-full"
                    animate={{
                      scale: [1, 1.7, 1],
                      opacity: [0.2, 0, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 2,
                    }}
                  />
                </div>
              </motion.div>
               */}     
              {/* Stats Section */}
              <motion.div
                key="stats"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={staggerContainer}
                className="flex flex-wrap justify-center gap-8 mt-16 sm:mt-20"
              >
                {[
                  { number: '1', label: 'Dean', icon: '👑' },
                  { number: '4', label: 'Deputy Deans', icon: '🎯' },
                  { number: '1000+', label: 'Students', icon: '🎓' },
                  { number: '50+', label: 'Academic Staff', icon: '👥' },
                ].map((stat, index) => (
                  <motion.div
                    key={`stat-${index}`}
                    variants={scaleVariant}
                    transition={{
                      duration: 0.6,
                      delay: 3 + (index * 0.1),
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="text-center group"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/25 transition-all duration-300 hover:bg-white/10 group-hover:scale-105">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                        {stat.number}
                      </div>
                      <div className="text-white/70 text-sm font-medium group-hover:text-white/90 transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}