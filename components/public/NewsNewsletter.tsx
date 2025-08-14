'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeInUp } from '@/lib/public/animations'
import { supabase } from '@/lib/supabaseClient'

interface NewsletterSubscription {
  id?: string
  email: string
  subscribed_at?: string
  status?: 'active' | 'unsubscribed'
}

export default function NewsNewsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setError(null)
    
    try {
      // Check if email already exists
      const { data: existingSubscription, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      if (existingSubscription) {
        if (existingSubscription.status === 'active') {
          setError('This email is already subscribed to our newsletter.')
          setIsLoading(false)
          return
        } else {
          // Reactivate subscription
          const { error: updateError } = await supabase
            .from('newsletter_subscriptions')
            .update({ 
              status: 'active',
              subscribed_at: new Date().toISOString()
            })
            .eq('id', existingSubscription.id)

          if (updateError) throw updateError
        }
      } else {
        // Create new subscription
        const { error: insertError } = await supabase
          .from('newsletter_subscriptions')
          .insert({
            email: email.trim().toLowerCase(),
            status: 'active',
            subscribed_at: new Date().toISOString()
          })

        if (insertError) throw insertError
      }

      setIsSubscribed(true)
      setEmail('')

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false)
      }, 5000)

    } catch (err: any) {
      console.error('Newsletter subscription error:', err)
      setError(err.message || 'Failed to subscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return (
    <motion.div
      ref={ref}
      className="mt-8 md:mt-12 lg:mt-16 xl:mt-20 bg-gradient-to-r from-primary to-primary/90 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 text-center text-white relative overflow-hidden"
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.8, delay: 1.8 }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 right-4 md:top-4 md:right-8 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-white/10 rounded-full blur-xl md:blur-2xl" />
        <div className="absolute bottom-4 left-6 md:bottom-8 md:left-12 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 bg-white/5 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 bg-white/5 rounded-full blur-2xl md:blur-3xl" />
      </div>

      <div className="relative z-10">
        {isSubscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-karla font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-2">
              Successfully Subscribed!
            </h3>
            <p className="text-white/90 text-base md:text-lg max-w-md mx-auto">
              Thank you for joining our newsletter. You'll receive the latest news and updates directly in your inbox.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.h2
              className="font-karla font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              Stay Updated
            </motion.h2>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            >
              Subscribe to our newsletter and never miss breaking news, exclusive interviews, and in-depth analysis
            </motion.p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 md:mb-6 p-3 md:p-4 bg-red-500/20 border border-red-500/30 rounded-lg max-w-sm md:max-w-md mx-auto"
              >
                <p className="text-red-200 text-sm">{error}</p>
              </motion.div>
            )}

            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xs sm:max-w-md md:max-w-lg mx-auto px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2.4 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError(null)
                }}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 md:px-5 md:py-3 lg:px-6 lg:py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-white/30 transition-all duration-300 border-2 border-transparent focus:border-white/20 text-sm md:text-base"
                required
                disabled={isLoading}
              />
              
              <motion.button
                type="submit"
                disabled={isLoading || !email.trim() || !isValidEmail(email.trim())}
                className="px-6 py-3 md:px-7 md:py-3 lg:px-8 lg:py-4 bg-white text-primary font-semibold rounded-full hover:bg-white/90 focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] md:min-w-[140px] text-sm md:text-base"
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </motion.form>

            <motion.div
              className="mt-4 md:mt-6 space-y-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 2.6 }}
            >
              <p className="text-white/70 text-xs md:text-sm">
                We respect your privacy. Unsubscribe at any time.
              </p>
              <div className="flex items-center justify-center gap-3 md:gap-4 text-white/60 text-xs flex-wrap">
                <span>✓ No spam</span>
                <span>✓ Weekly digest</span>
                <span>✓ Breaking news alerts</span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}