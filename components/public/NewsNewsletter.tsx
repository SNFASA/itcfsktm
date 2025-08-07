'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeInUp } from '@/lib/public/animations'

export default function NewsNewsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')

    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false)
    }, 3000)
  }

  return (
    <motion.div
      ref={ref}
      className="mt-20 bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.8, delay: 1.8 }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-8 left-12 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {isSubscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-karla font-bold text-2xl sm:text-3xl mb-2">
              Successfully Subscribed!
            </h3>
            <p className="text-white/90 text-lg">
              Thank you for joining our newsletter. You'll receive the latest news and updates directly in your inbox.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.h2
              className="font-karla font-bold text-3xl sm:text-4xl lg:text-5xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              Stay Updated
            </motion.h2>
            
            <motion.p
              className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            >
              Subscribe to our newsletter and never miss breaking news, exclusive interviews, and in-depth analysis
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2.4 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
                required
                disabled={isLoading}
              />
              
              <motion.button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </motion.form>

            <motion.p
              className="text-white/70 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 2.6 }}
            >
              We respect your privacy. Unsubscribe at any time.
            </motion.p>
          </>
        )}
      </div>
    </motion.div>
  )
}