'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState} from 'react'
import Image from 'next/image'

const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const iconHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  }
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  
  // Transform header background based on scroll
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(229, 231, 235, 0.95)", "rgba(229, 231, 235, 0.98)"]
  )
  
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.1)"]
  )

const navItems = [
  { href: "/", label: "Home" },           
  { href: "/#about", label: "About Us" },
  { href: "/#events", label: "Events" },
  { href: "/#news", label: "News" },
  { href: "/#gallery", label: "Gallery" },
]


  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/20"
        style={{ 
          backgroundColor: headerBackground,
          boxShadow: headerShadow
        }}
        initial="hidden"
        animate="visible"
        variants={fadeInDown}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-primary/5 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-0 right-1/3 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary/3 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 flex items-center justify-between max-w-7xl h-14 sm:h-16 md:h-18 lg:h-20 xl:h-[90px] relative z-10">
          
          {/* Enhanced Logo */}
          <motion.div 
            className="flex-shrink-0 relative group"
            variants={slideInLeft}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Logo Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-110" />
            
            <motion.div
              className="relative z-10"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/itc-full.png"
                alt="ITC Logo"
                width={358}
                height={107}
                className="h-auto w-auto object-contain
                          max-h-8 max-w-24
                          sm:max-h-10 sm:max-w-28
                          md:max-h-12 md:max-w-32
                          lg:max-h-14 lg:max-w-40
                          xl:max-h-16 xl:max-w-44"
                priority
              />
              
              {/* Floating Accent */}
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced Navigation Menu */}
          <motion.nav 
            className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6"
            variants={staggerContainer}
            transition={{ delay: 0.4 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                variants={fadeInDown}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative group"
              >
                <motion.a
                  href={item.href}
                  className="font-karla font-bold text-gray-800 hover:text-blue-600 transition-all duration-300 relative z-10 py-2 px-2 lg:px-3 rounded-lg
                           text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  whileHover={{ 
                    y: -2,
                    textShadow: "0px 2px 4px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  
                  {/* Animated Underline */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Background Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 -z-10"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.div>
            ))}
          </motion.nav>

          {/* Enhanced Social Media Icons */}
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4"
            variants={slideInRight}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Instagram Icon */}
            <motion.a
              href="https://www.instagram.com/itcfsktm?igsh=MTg4ZHVkdzYyZ2FhNA=="
              className="relative group p-1 sm:p-2 rounded-full"
              variants={iconHover}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
            >
              {/* Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.svg 
                className="relative z-10 transition-colors duration-300 group-hover:stroke-pink-600
                          w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                viewBox="0 0 30 36" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M21.3333 9.75H21.3455M8.53335 3H20.7238C24.0901 3 26.8191 6.35786 26.8191 10.5V25.5C26.8191 29.6421 24.0901 33 20.7238 33H8.53335C5.16704 33 2.43811 29.6421 2.43811 25.5V10.5C2.43811 6.35786 5.16704 3 8.53335 3ZM19.5048 17.055C19.6552 18.3034 19.4819 19.5783 19.0095 20.6985C18.5372 21.8187 17.7898 22.7271 16.8736 23.2945C15.9575 23.8619 14.9193 24.0594 13.9066 23.8589C12.894 23.6584 11.9586 23.0701 11.2333 22.1777C10.5081 21.2854 10.03 20.1343 9.86707 18.8883C9.70412 17.6423 9.86463 16.3648 10.3257 15.2376C10.7869 14.1103 11.5251 13.1906 12.4355 12.6094C13.3459 12.0281 14.382 11.8149 15.3966 12C16.4315 12.1888 17.3895 12.7822 18.1293 13.6925C18.8691 14.6027 19.3513 15.7816 19.5048 17.055Z" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </motion.svg>
              
              {/* Floating Accent */}
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.a>

            {/* Facebook Icon */}
            <motion.a
              href="https://www.instagram.com/itcfsktm?igsh=MTg4ZHVkdzYyZ2FhNA=="
              className="relative group p-1 sm:p-2 rounded-full"
              variants={iconHover}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
            >
              {/* Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-full opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.svg 
                className="relative z-10 transition-colors duration-300 group-hover:stroke-blue-600
                          w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                viewBox="0 0 30 36" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M22.6858 3H19.0286C17.4121 3 15.8617 3.79018 14.7186 5.1967C13.5756 6.60322 12.9334 8.51088 12.9334 10.5V15H9.27625V21H12.9334V33H17.8096V21H21.4667L22.6858 15H17.8096V10.5C17.8096 10.1022 17.938 9.72064 18.1666 9.43934C18.3952 9.15804 18.7053 9 19.0286 9H22.6858V3Z" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </motion.svg>
              
              {/* Floating Accent */}
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeInDown}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-around"
                animate={isMobileMenuOpen ? "open" : "closed"}
              >
                <motion.span
                  className="w-full h-0.5 bg-gray-800 rounded-full origin-center"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-gray-800 rounded-full"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-gray-800 rounded-full origin-center"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Mobile Menu */}
        <motion.div
          className="md:hidden absolute top-full left-0 right-0 bg-light-gray/95 backdrop-blur-md border-b border-white/20 shadow-xl"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ overflow: "hidden" }}
        >
          <motion.nav 
            className="px-4 py-4 sm:py-6 space-y-2 sm:space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate={isMobileMenuOpen ? "visible" : "hidden"}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="block font-karla font-bold text-gray-800 hover:text-primary transition-colors py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-white/30
                          text-base sm:text-lg md:text-xl"
                variants={fadeInDown}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ x: 8 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>
      </motion.header>

      {/* Spacer for fixed header - responsive height */}
      <div className="h-14 sm:h-16 md:h-18 lg:h-20 xl:h-[90px]" />
    </>
  )
}