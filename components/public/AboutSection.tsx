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

  const floatingAnimation = {
    animate: {
      y: [-8, 8, -8],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section id="about" ref={ref} className="relative bg-gradient-to-br from-light-gray via-light-gray to-gray-50 py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/5 w-40 h-40 bg-white/15 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-primary/4 rounded-full blur-3xl" />
        
        {/* Animated Floating Elements */}
        <motion.div
          className="absolute top-32 left-1/4 w-6 h-6 bg-primary/25 rounded-full"
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary/30 rounded-full"
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/5 w-8 h-8 border-2 border-primary/20 rotate-45"
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
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">
          
          {/* Enhanced Decorative Shapes */}
          <motion.div
            className="relative flex-shrink-0 w-full lg:w-auto flex justify-center"
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative w-[450px] h-[350px] sm:w-[500px] sm:h-[400px]">
              
              {/* Outer Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 blur-3xl transform scale-110"
                variants={pulseAnimation}
                animate="animate"
              />
              
              {/* Gray blob (outermost layer) with enhanced styling */}
              <motion.div
                className="absolute w-[420px] h-[320px] sm:w-[470px] sm:h-[370px] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-350 opacity-90 transform translate-x-16 translate-y-12 z-10 shadow-2xl"
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
                className="absolute w-[380px] h-[290px] sm:w-[430px] sm:h-[340px] bg-gradient-to-br from-white via-white/95 to-white/90 backdrop-blur-sm opacity-95 transform translate-x-8 translate-y-8 z-20 shadow-xl"
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
                className="absolute w-[340px] h-[260px] sm:w-[390px] sm:h-[310px] overflow-hidden shadow-2xl transform translate-x-16 translate-y-16 z-30 group"
                style={{
                  borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                }}
                variants={floatingAnimation}
                animate="animate"
                initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                {/* Clear Pattern Background Only */}
                <div className="w-full h-full about-pattern-bg" />
              </motion.div>

              {/* Floating Accent Elements */}
              <motion.div
                className="absolute top-8 right-8 w-4 h-4 bg-primary/40 rounded-full z-40"
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-12 left-12 w-6 h-6 border-2 border-primary/30 rounded-full z-40"
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
            className="flex-1 max-w-4xl space-y-8 lg:space-y-12"
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            
            {/* Enhanced Title Section */}
            <motion.div
              className="ml-2 md:ml-8 lg:ml-16 relative"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Title Background Decoration */}
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary/80 to-primary/40 rounded-full" />
              
              <motion.div className="relative">
                <h2 className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-section-title text-primary relative z-10">
                  About Us
                </h2>
                
                {/* Animated Underline */}
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '60%' } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
                />
                
                {/* Floating Accent */}
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-primary/60 rounded-full"
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
              className="ml-2 md:ml-8 lg:ml-16 relative"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {/* Content Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/30 to-transparent backdrop-blur-sm rounded-2xl transform -translate-x-4 translate-y-2 opacity-60" />
              
              <motion.div
                className="relative z-10 p-6 sm:p-8"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="font-karla text-sm sm:text-base lg:text-lg xl:text-body text-gray-800 leading-relaxed space-y-6">
                  {/* Split text into animated paragraphs */}
                  <motion.p
                    className="relative"
                    variants={fadeInUp}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <span className="relative z-10">
                      The Information Technology Club (ITC) at Universiti Tun Hussein Onn Malaysia (UTHM) is a{' '}
                      <motion.span
                        className="text-primary font-semibold relative"
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
                      className="text-primary font-semibold"
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
                      className="text-primary font-semibold relative"
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
                  className="mt-8 pt-6 border-t border-gray-200"
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                    {[
                      { number: '500+', label: 'Active Members' },
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
                          className="text-lg sm:text-xl lg:text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors"
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
              className="ml-2 md:ml-8 lg:ml-16 pt-4"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <motion.a
                href="/about/itcOrg"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 text-white font-karla font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 group text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                 Our Community
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
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