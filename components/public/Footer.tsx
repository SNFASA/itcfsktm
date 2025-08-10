'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useState, useEffect } from "react";

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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const iconHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.2, 
    rotate: 10,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Last Updated State
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "GMT",
        timeZoneName: "short",
      });
      setDateTime(formatted);
    };

    updateTime(); // initial run
    const timer = setInterval(updateTime, 60 * 1000); // update every minute

    return () => clearInterval(timer);
  }, []);

  const logoData = [
    {
      src: "/images/itc-full.png",
      alt: "ITC",
      width: 299,
      height: 117
    },
    {
      src: "/images/2-UTHM-logo.png",
      alt: "UTHM",
      width: 279,
      height: 97
    },
    {
      src: "/images/logo_uthm_produce_professionals-20ad2fe6.webp",
      alt: "uthm produce professionals",
      width: 265,
      height: 59
    },
    {
      src: "/images/md.webp",
      alt: "Media Digital Logo",
      width: 250,
      height: 40
    },    {
      src: "/images/mdec-logo.png",
      alt: "MDEC",
      width: 265,
      height: 70
    }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600/90 py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-white/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/3 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/4 rounded-full blur-3xl" />
        
        
        {/* Floating Elements */}

        <motion.div
          className="absolute bottom-1/3 left-1/6 w-4 h-4 border border-white/30 rounded-full"
          animate={{
            rotate: [0, 360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" ref={ref}>
        
        {/* Enhanced University Logos */}
        <motion.div
          className="mb-12 sm:mb-16 lg:mb-20"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section Title */}
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
              Our Partners
            </h3>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Logos Grid - Simple Version */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {logoData.map((logo, index) => (
              <motion.div
                key={logo.alt}
                variants={scaleIn}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4 + (index * 0.1),
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain max-w-[200px] sm:max-w-[250px] lg:max-w-[280px] h-auto "
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
          
          {/* Enhanced Copyright Section */}
          <motion.div
            className="flex-1 max-w-4xl"
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Background Decoration */}
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-full" />
            
            <motion.div
              className="relative z-10 p-6 sm:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.p 
                className="font-medium text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.span
                  className="text-white font-bold"
                  whileHover={{ textShadow: "0px 0px 8px rgba(255,255,255,0.5)" }}
                >
                  ©
                </motion.span>{' '}
                Information Technology Club (ITC),Faculty of Computer Science and Information Technology (FSKTM), Universiti Tun Hussein Onn Malaysia (UTHM) ® 2025. All Rights Reserved. 
                <br className="hidden sm:block" />
                Best viewed with any modern web browsers with resolution of 1280×1024. This website is bound by the{' '}
                <motion.span 
                  className="underline decoration-white/60 hover:decoration-white cursor-pointer font-semibold"
                  whileHover={{ 
                    textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
                    scale: 1.02
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Legal Disclaimer, Privacy Policy, Security Policy and Copyright Notice
                </motion.span>{' '}
                mentioned.
              </motion.p>
              
              {/* Last Updated */}
              <motion.div
                className="mt-6 pt-4 border-t border-white/20"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <p className="text-sm text-white/70 flex items-center gap-2">
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </motion.svg>
                  Last updated on {dateTime}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Section */}
          <motion.div
            className="flex flex-col items-center lg:items-end gap-6 lg:gap-8"
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Contact Title */}
            <motion.div
              className="text-center lg:text-right"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-2 relative">
                Contact Us
                
                {/* Animated Underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 lg:right-0 lg:left-auto h-1 bg-gradient-to-r from-white via-white/80 to-white/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 1.8, ease: 'easeOut' }}
                />
              </h3>
              <motion.p
                className="text-white/80 text-sm sm:text-base mt-3"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Follow us on social media
              </motion.p>
            </motion.div>
            
            {/* Enhanced Social Media Icons */}
            <motion.div
              className="flex items-center gap-4 sm:gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {/* Instagram Icon */}
              <motion.a
                href="https://www.instagram.com/itcfsktm?igsh=MTg4ZHVkdzYyZ2FhNA=="
                className="relative group p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                variants={iconHover}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-500" />
                
                <motion.svg 
                  width="48" 
                  height="49" 
                  viewBox="0 0 56 57" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 transition-all duration-300 group-hover:stroke-pink-400"
                >
                  <path 
                    d="M40.6667 15.4375H40.6899M16.2667 4.75H39.5048C45.9218 4.75 51.1238 10.0666 51.1238 16.625V40.375C51.1238 46.9334 45.9218 52.25 39.5048 52.25H16.2667C9.84967 52.25 4.64764 46.9334 4.64764 40.375V16.625C4.64764 10.0666 9.84967 4.75 16.2667 4.75ZM37.181 27.0037C37.4678 28.9803 37.1374 30.999 36.2369 32.7727C35.3365 34.5463 33.9117 35.9846 32.1653 36.883C30.4189 37.7813 28.4398 38.094 26.5095 37.7766C24.5792 37.4591 22.796 36.5277 21.4136 35.1148C20.0311 33.7018 19.1197 31.8793 18.8091 29.9065C18.4985 27.9337 18.8044 25.911 19.6834 24.1261C20.5625 22.3413 21.9698 20.8851 23.7052 19.9648C25.4406 19.0445 27.4158 18.7069 29.3497 19C31.3225 19.299 33.1488 20.2385 34.559 21.6797C35.9692 23.121 36.8884 24.9876 37.181 27.0037Z" 
                    stroke="white" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </motion.svg>
                
                {/* Floating Accent */}
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [0, 1.2, 0],
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
                href="https://www.facebook.com/groups/fsktm.uthm/?ref=share&mibextid=NSMWBT"
                className="relative group p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                variants={iconHover}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-2xl opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-500" />
                
                <motion.svg 
                  width="48" 
                  height="49" 
                  viewBox="0 0 56 57" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 transition-all duration-300 group-hover:stroke-blue-400"
                >
                  <path 
                    d="M42.0571 4.75H35.0857C32.0042 4.75 29.0488 6.00111 26.8698 8.22811C24.6908 10.4551 23.4667 13.4756 23.4667 16.625V23.75H16.4952V33.25H23.4667V52.25H32.7619V33.25H39.7333L42.0571 23.75H32.7619V16.625C32.7619 15.9951 33.0067 15.391 33.4425 14.9456C33.8783 14.5002 34.4694 14.25 35.0857 14.25H42.0571V4.75Z" 
                    stroke="white" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </motion.svg>
                
                {/* Floating Accent */}
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [0, 1.2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.a>
            </motion.div>

            {/* Additional Contact Info */}
            <motion.div
              className="text-center lg:text-right mt-4"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.p
                className="text-white/70 text-sm flex items-center gap-2 justify-center lg:justify-end"
                whileHover={{ textShadow: "0px 0px 8px rgba(255,255,255,0.5)" }}
              >
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 2.5 4 6 4 10s-1.5 7.5-4 10m0-20c-2.5 2.5-4 6-4 10s1.5 7.5 4 10m-8-10h16"
                />
                </motion.svg>
                fsktm.uthm.edu.my
              </motion.p>
              <motion.p
                className="text-white/70 text-sm flex items-center gap-2 justify-center lg:justify-end"
                whileHover={{ textShadow: "0px 0px 8px rgba(255,255,255,0.5)" }}
              >
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </motion.svg>
                itcfsktm@uthm.edu.my
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Wave Animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 2, delay: 2.5, ease: 'easeOut' }}
        />
      </div>
    </footer>
  )
}