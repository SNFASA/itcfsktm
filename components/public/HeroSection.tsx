'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}

export default function HeroSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section className="relative overflow-hidden h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
      {/* Enhanced Background with Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/fsktm.jpg"
          alt="Background"
          className="w-full h-full object-cover block"
        />
        
        {/* Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-4 h-4 bg-white/20 rounded-full"
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 left-20 w-6 h-6 border border-white/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-8 h-8 border border-white/15 rotate-45"
          animate={{
            rotate: [45, 405, 45],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Enhanced Hero Content */}
      <div id="home"  className="relative z-10 flex flex-col justify-center h-full px-4 max-w-7xl mx-auto -mt-16" ref={ref}>
        <motion.div
          className="ml-4 md:ml-16 lg:ml-32"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Main Title with Enhanced Animation */}
          <motion.div
            variants={slideInLeft}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6"
          >
            <motion.h1 
              className="font-karla font-extrabold text-white leading-none relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                className="block text-4xl md:text-6xl lg:text-hero relative z-10"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                WELCOME TO
                
                {/* Animated Underline */}
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '80%' } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
                />
              </motion.span>
              
              <motion.span 
                className="block text-4xl md:text-6xl lg:text-hero mt-2 relative"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="relative z-10">ITC</span>
                
                {/* Glowing Effect Behind ITC */}
                <motion.div
                  className="absolute inset-0 bg-primary/30 blur-xl rounded-lg transform scale-110"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 0.6 } : { opacity: 0 }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
                
                {/* Floating Accent */}
                <motion.div
                  className="absolute -top-4 -right-4 w-4 h-4 bg-primary rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 2, type: "spring" }}
                />
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle with Enhanced Styling */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* Background Decoration */}
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary/60 to-transparent rounded-full" />
            
            <motion.h2 
              className="font-karla font-extrabold text-white text-xl md:text-3xl lg:text-subtitle relative z-10 pl-4"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="relative"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                #WE NETWORK FOR ALL
                
                {/* Hashtag Animation */}
                <motion.span
                  className="text-primary"
                  animate={{
                    textShadow: [
                      '0 0 0px rgba(59, 130, 246, 0)',
                      '0 0 20px rgba(59, 130, 246, 0.8)',
                      '0 0 0px rgba(59, 130, 246, 0)'
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  #
                </motion.span>
              </motion.span>
            </motion.h2>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Animated Waves */}
      <motion.div 
        className="absolute -bottom-1 left-0 w-full leading-none z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <motion.svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.path
            fill="#e2e8f0"
            d="M0,224L60,202.7C120,181,240,139,360,122.7C480,107,600,117,720,144C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.path
            fill="#f5f5f5"
            d="M0,256L60,240C120,224,240,192,360,176C480,160,600,160,720,165.3C840,171,960,181,1080,197.3C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.3 }}
          />
        </motion.svg>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{
              scaleY: [1, 0.5, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}