'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0 },
}

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

const rotateIn = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section id="about" ref={ref} className="relative bg-gradient-to-br from-light-gray via-light-gray to-gray-50 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-32 sm:w-48 md:w-64 lg:w-72 h-32 sm:h-48 md:h-64 lg:h-72 bg-primary/8 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div className="absolute bottom-16 sm:bottom-32 left-8 sm:left-16 w-28 sm:w-40 md:w-56 lg:w-64 h-28 sm:h-40 md:h-56 lg:h-64 bg-primary/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute top-1/3 left-1/5 w-20 sm:w-32 md:w-40 h-20 sm:h-32 md:h-40 bg-white/15 rounded-full blur-xl sm:blur-2xl" />
        <div className="absolute bottom-1/4 right-1/3 w-24 sm:w-36 md:w-48 lg:w-56 h-24 sm:h-36 md:h-48 lg:h-56 bg-primary/4 rounded-full blur-2xl sm:blur-3xl" />
        
        {/* Animated Floating Elements */}
        <motion.div
          className="absolute top-16 sm:top-32 left-1/4 w-3 sm:w-4 md:w-5 lg:w-6 h-3 sm:h-4 md:h-5 lg:h-6 bg-primary/25 rounded-full"
          animate={{
            y: [-15, 15, -15],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-primary/30 rounded-full"
          animate={{
            y: [10, -10, 10],
            x: [5, -5, 5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/5 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 border border-2 border-primary/20 rotate-45"
          animate={{
            rotate: [45, 405, 45],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" ref={ref}>
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
          
          {/* Enhanced Decorative Shapes */}
          <motion.div
            className="relative flex-shrink-0 w-full lg:w-auto flex justify-center"
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative w-[280px] h-[220px] sm:w-[350px] sm:h-[280px] md:w-[400px] md:h-[320px] lg:w-[450px] lg:h-[350px] xl:w-[500px] xl:h-[400px]">
              
              {/* Outer Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 blur-2xl sm:blur-3xl transform scale-110"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Gray blob (outermost layer) with enhanced styling */}
              <motion.div
                className="absolute w-[260px] h-[200px] sm:w-[330px] sm:h-[260px] md:w-[380px] md:h-[300px] lg:w-[420px] lg:h-[320px] xl:w-[470px] xl:h-[370px] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-350 opacity-90 transform translate-x-8 sm:translate-x-12 md:translate-x-14 lg:translate-x-16 translate-y-6 sm:translate-y-8 md:translate-y-10 lg:translate-y-12 z-10 shadow-xl sm:shadow-2xl"
                style={{
                  borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                }}
                variants={rotateIn}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.02, rotate: 1 }}
              />

              {/* White blob (middle layer) with glass effect */}
              <motion.div
                className="absolute w-[240px] h-[180px] sm:w-[300px] sm:h-[230px] md:w-[340px] md:h-[270px] lg:w-[380px] lg:h-[290px] xl:w-[430px] xl:h-[340px] bg-gradient-to-br from-white via-white/95 to-white/90 backdrop-blur-sm opacity-95 transform translate-x-4 sm:translate-x-6 md:translate-x-7 lg:translate-x-8 translate-y-4 sm:translate-y-5 md:translate-y-6 lg:translate-y-8 z-20 shadow-lg sm:shadow-xl"
                style={{
                  borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%',
                }}
                variants={scaleIn}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.03, rotate: -1 }}
              />

              {/* Main purple blob with clear pattern background */}
              <motion.div
                className="absolute w-[220px] h-[160px] sm:w-[270px] sm:h-[210px] md:w-[300px] md:h-[240px] lg:w-[340px] lg:h-[260px] xl:w-[390px] xl:h-[310px] overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl transform translate-x-8 sm:translate-x-12 md:translate-x-14 lg:translate-x-16 translate-y-8 sm:translate-y-12 md:translate-y-14 lg:translate-y-16 z-30 group"
                style={{
                  borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                }}
                animate={{
                  y: [-4, 4, -4],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                {/* Clear Pattern Background Only */}
                <div className="w-full h-full about-pattern-bg" />
              </motion.div>

              {/* Floating Accent Elements */}
              <motion.div
                className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-primary/40 rounded-full z-40"
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-6 sm:left-8 md:left-12 w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 border border-2 border-primary/30 rounded-full z-40"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            className="flex-1 max-w-4xl space-y-6 sm:space-y-8 lg:space-y-12"
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            
            {/* Enhanced Title Section */}
            <motion.div
              className="ml-1 sm:ml-2 md:ml-4 lg:ml-8 xl:ml-16 relative"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Title Background Decoration */}
              <div className="absolute -left-2 sm:-left-3 md:-left-4 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-blue-600 via-blue/80 to-blue/40 rounded-full" />
              
              <motion.div className="relative">
                <h2 className="font-karla font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-section-title text-blue-600 relative z-10">
                  About Us
                </h2>
                
                {/* Animated Underline */}
                <motion.div
                  className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 via-blue-600 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '60%' } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
                />
                
                {/* Floating Accent */}
                <motion.div
                  className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 sm:w-3 h-2 sm:h-3 bg-primary/60 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Description with Animated Text */}
            <motion.div
              className="ml-1 sm:ml-2 md:ml-4 lg:ml-8 xl:ml-16 relative"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {/* Content Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/30 to-transparent backdrop-blur-sm rounded-xl sm:rounded-2xl transform -translate-x-2 sm:-translate-x-4 translate-y-1 sm:translate-y-2 opacity-60" />
              
              <motion.div
                className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="font-karla text-xs sm:text-sm md:text-base lg:text-lg xl:text-body text-gray-800 leading-relaxed space-y-3 sm:space-y-4 md:space-y-6">
                  {/* Split text into animated paragraphs */}
                  <motion.p
                    className="relative"
                    variants={fadeInUp}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <span className="relative z-10">
                      The Information Technology Club (ITC) at Universiti Tun Hussein Onn Malaysia (UTHM) is a{' '}
                      <motion.span
                        className="text-blue-600 font-semibold relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        dynamic student-led organization
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-primary/40 rounded-full"
                          initial={{ width: 0 }}
                          animate={inView ? { width: '100%' } : { width: 0 }}
                          transition={{ duration: 1, delay: 2 }}
                        />
                      </motion.span>
                      {' '}under the Faculty of Computer Science and Information Technology (FSKTM).
                    </span>
                  </motion.p>
                  
                  <motion.p
                    variants={fadeInUp}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  >
                    ITC provides students with hands-on opportunities to develop technical and soft skills through activities such as{' '}
                    <motion.span
                      className="text-blue-600 font-semibold"
                      whileHover={{ scale: 1.05 }}
                    >
                      workshops, coding competitions, hackathons, leadership programs, and community outreach
                    </motion.span>
                    .
                  </motion.p>
                  
                  <motion.p
                    variants={fadeInUp}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    Open to all FSKTM students and the wider public, ITC bridges academic learning with real-world experiences, fostering{' '}
                    <motion.span
                      className="text-blue-600 font-semibold relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      collaboration, innovation, and professional growth
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary/40 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: '100%' } : { width: 0 }}
                        transition={{ duration: 1, delay: 2.5 }}
                      />
                    </motion.span>
                    . The club plays a key role in shaping future-ready graduates in the tech field.
                  </motion.p>
                </div>
                
                {/* Statistics or Highlights */}
                <motion.div
                  className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-gray-200"
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {[
                      { number: '100+', label: 'Active Members' },
                      { number: '50+', label: 'Events Organized' },
                      { number: '10+', label: 'Years of Excellence' },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="text-center group"
                        variants={scaleIn}
                        transition={{ duration: 0.6, delay: 1.7 + (index * 0.1) }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-blue-600 group-hover:text-primary/80 transition-colors"
                          initial={{ scale: 0 }}
                          animate={inView ? { scale: 1 } : { scale: 0 }}
                          transition={{ duration: 0.5, delay: 2 + (index * 0.1), type: "spring" }}
                        >
                          {stat.number}
                        </motion.div>
                        <div className="text-xs sm:text-sm text-gray-600 font-medium">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Call to Action Button */}
            <motion.div
              className="ml-1 sm:ml-2 md:ml-4 lg:ml-8 xl:ml-16 pt-2 sm:pt-4"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <motion.a
                href="/about/itcOrg"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-karla font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 transform hover:scale-105 group text-xs sm:text-sm md:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Community
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}