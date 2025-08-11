'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { OrgDatabase, type ExcoMember, type OrganizedMembers } from '@/lib/public/org'

//  Enhanced LeaderCard with better image handling
const LeaderCard = ({
  member,
  isHead = false,
  delay = 0,
  inView = false,
}: {
  member: ExcoMember;
  isHead?: boolean;
  delay?: number;
  inView?: boolean;
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  // Initialize image URL
  useEffect(() => {
    const processedUrl = OrgDatabase.getMemberImageUrl(member)
    setImageUrl(processedUrl)
    console.log(`🖼️ LeaderCard for ${member.name} using URL:`, processedUrl)
  }, [member])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`❌ Image failed to load for ${member.name}:`, {
      src: e.currentTarget.src,
      member: member,
      rawImage: member.image
    })
    
    if (!imageError) {
      setImageError(true)
      // Try default avatar if not already using it
      const defaultAvatar = OrgDatabase.getDefaultAvatar()
      if (e.currentTarget.src !== defaultAvatar) {
        console.log(`🔄 Switching to default avatar for ${member.name}`)
        setImageUrl(defaultAvatar)
      }
    }
  }

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log(`✅ Image loaded successfully for ${member.name}:`, e.currentTarget.src)
    setImageLoaded(true)
    setImageError(false)
  }

  const scaleVariant = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -40 },
  }

  return (
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
          {/* Multi-layer glow effect - Enhanced for heads */}
          <div className={`absolute inset-0 bg-gradient-to-br ${isHead ? 'from-yellow-300/40 via-white/30 to-yellow-300/40' : 'from-white/40 via-white/20 to-white/40'} rounded-full blur-2xl transform scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse`} />
          <div className={`absolute inset-0 bg-gradient-to-br ${isHead ? 'from-amber-300/30 via-yellow-300/20 to-orange-300/30' : 'from-cyan-300/30 via-blue-300/20 to-purple-300/30'} rounded-full blur-lg transform scale-115 opacity-0 group-hover:opacity-100 transition-all duration-500`} />
          
          {/* Enhanced image border - Larger for heads */}
          <div className={`relative ${isHead ? 'w-48 h-48 md:w-52 md:h-52' : 'w-32 h-32'} rounded-full ${isHead ? 'bg-gradient-to-br from-yellow-300/30 via-white/20 to-amber-300/30 border-2 border-yellow-300/30' : 'bg-gradient-to-br from-white/30 via-white/20 to-white/30 border border-white/20'} p-1.5 group-hover:scale-110 transition-all duration-500 backdrop-blur-sm`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-white shadow-inner relative">
              {/* Loading placeholder */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Enhanced image with better error handling */}
              <img
                src={imageUrl}
                alt={member.name}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              
              {/* Debug overlay - remove in production */}
            </div>
          </div>
          {/* Head crown indicator */}
          {isHead && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce">
              👑
            </div>
          )}
          
          {/* Floating orbital elements */}
          <div className={`absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-br ${isHead ? 'from-yellow-400/60 to-amber-400/60' : 'from-cyan-400/60 to-blue-400/60'} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce`} />
          <div className={`absolute -bottom-3 -left-3 w-3 h-3 bg-gradient-to-br ${isHead ? 'from-orange-400/60 to-red-400/60' : 'from-purple-400/60 to-pink-400/60'} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-bounce [animation-delay:0.5s]`} />
          <div className={`absolute top-1/2 -right-6 w-2 h-2 bg-gradient-to-br ${isHead ? 'from-amber-400/60 to-yellow-400/60' : 'from-yellow-400/60 to-orange-400/60'} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 animate-bounce [animation-delay:1s]`} />
        </div>

        {/* Enhanced content card */}
        <div className={`relative ${isHead ? 'bg-gradient-to-br from-yellow-500/10 via-white/10 to-amber-500/10 border-yellow-300/30' : 'bg-white/10 border-white/20'} backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border group-hover:border-white/40 ${isHead ? 'group-hover:bg-gradient-to-br group-hover:from-yellow-500/15 group-hover:via-white/15 group-hover:to-amber-500/15' : 'group-hover:bg-white/15'}`}>
          {/* Animated gradient background */}
          <div className={`absolute inset-0 ${isHead ? 'bg-gradient-to-br from-yellow-300/5 via-transparent to-amber-300/10' : 'bg-gradient-to-br from-white/5 via-transparent to-white/10'} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Multiple shine effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out rounded-3xl" />
          <div className={`absolute inset-0 bg-gradient-to-l from-transparent ${isHead ? 'via-yellow-300/10' : 'via-cyan-300/10'} to-transparent transform skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-out rounded-3xl delay-200`} />
          
          {/* Content */}
          <h4 className={`font-karla font-extrabold ${isHead ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl'} text-white mb-3 leading-tight relative z-10 ${isHead ? 'group-hover:text-yellow-100' : 'group-hover:text-cyan-100'} transition-colors duration-300`}>
            {member.name}
          </h4>
          <p className={`font-karla font-bold ${isHead ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} text-gray-200 relative z-10 leading-relaxed group-hover:text-gray-100 transition-colors duration-300`}>
            {member.position}
          </p>
          
          {/* Head badge */}
          {isHead && (
            <div className="absolute top-3 right-3 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-yellow-100 border border-yellow-300/30">
              HEAD
            </div>
          )}
          
          {/* Debug info - remove in production */}
          
          {/* Decorative corner elements */}
          <div className={`absolute top-3 ${isHead ? 'left-3' : 'right-3'} w-8 h-8 ${isHead ? 'bg-gradient-to-br from-yellow-300/10 to-transparent' : 'bg-gradient-to-br from-white/10 to-transparent'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          <div className={`absolute bottom-3 ${isHead ? 'right-3' : 'left-3'} w-6 h-6 ${isHead ? 'bg-gradient-to-br from-amber-400/10 to-transparent' : 'bg-gradient-to-br from-cyan-400/10 to-transparent'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Pulse ring effect */}
          <div className={`absolute inset-0 border-2 ${isHead ? 'border-yellow-300/20' : 'border-white/20'} rounded-3xl opacity-0 group-hover:opacity-100 animate-ping`} />
        </div>
      </div>
    </motion.div>
  )
}

export default function FacultyOrgChart() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // State for organization data
  const [orgData, setOrgData] = useState<OrganizedMembers | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugMode, setDebugMode] = useState(false) // Toggle for debug info

  // Fetch dean organization data on component mount
  useEffect(() => {
    const fetchDeanData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🏗️ Starting to fetch dean organization data...')
        
        // Use the existing method to get dean organization data
        const data = await OrgDatabase.getOrganizationSections('dean')
        console.log('✅ Dean organization data fetched:', data)
        
        // Get organization stats for debugging
        if (process.env.NODE_ENV === 'development') {
          const stats = await OrgDatabase.getOrganizationStats('dean')
          console.log('📊 Dean organization statistics:', stats)
        }
        
        setOrgData(data)
      } catch (err) {
        console.error('❌ Error fetching dean organization data:', err)
        setError('Failed to load dean organization data')
      } finally {
        setLoading(false)
      }
    }

    fetchDeanData()
  }, [])

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

  //Proper hierarchical rendering - Head at top, members below
  const renderHierarchicalSections = () => {
    if (!orgData?.sections || orgData.sections.length === 0) return null

    return orgData.sections.map((sectionData, sectionIndex) => {
      const sectionTitle = OrgDatabase.getSectionDisplayName(sectionData.section.category)
      const baseDelay = 0.8 + (sectionIndex * 0.4)

      return (
        <motion.div
          key={sectionData.section.id}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeVariant}
          transition={{ duration: 0.8, delay: baseDelay, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 sm:mb-24 lg:mb-28"
        >
          {/* Section Title */}
          <motion.h3 
            className="font-karla font-extrabold text-xl sm:text-2xl lg:text-3xl text-white text-center mb-12 sm:mb-16"
            variants={fadeVariant}
            transition={{ duration: 0.8, delay: baseDelay + 0.1 }}
          >
            {sectionTitle}
            {/* Debug info */}
          </motion.h3>
          
          {/*  Section Head at the top */}
          {sectionData.head && (
            <motion.div
              className="flex justify-center mb-16 sm:mb-20"
              variants={scaleVariant}
              transition={{ duration: 0.8, delay: baseDelay + 0.3 }}
            >
              <LeaderCard
                member={sectionData.head}
                isHead={true}
                delay={baseDelay + 0.3}
                inView={inView}
              />
            </motion.div>
          )}

          {/* Connecting line from head to members */}
          {sectionData.head && sectionData.members.length > 0 && (
            <motion.div
              className="flex justify-center mb-16"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: baseDelay + 0.6 }}
            >
              <div className="w-px h-16 bg-gradient-to-b from-white/40 via-white/20 to-transparent relative">
                {/* Decorative nodes on the line */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/40 rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
              </div>
            </motion.div>
          )}

          {/*  Section Members below the head */}
          {sectionData.members.length > 0 && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 justify-items-center"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {sectionData.members.map((member, index) => (
                <LeaderCard
                  key={member.id}
                  member={member}
                  isHead={false}
                  delay={baseDelay + 0.8 + (index * 0.1)}
                  inView={inView}
                />
              ))}
            </motion.div>
          )}

          {/* Section separator */}
          {sectionIndex < (orgData.sections.length - 1) && (
            <motion.div
              className="flex justify-center mt-16 sm:mt-20"
              initial={{ width: 0, opacity: 0 }}
              animate={inView ? { width: '200px', opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 1, delay: baseDelay + 1.5 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </motion.div>
          )}
        </motion.div>
      )
    })
  }

  // Get total counts for stats
  const getTotalCounts = () => {
    if (!orgData?.sections) return { sections: 0, heads: 0, members: 0 }
    
    const sections = orgData.sections.length
    const heads = orgData.sections.filter(section => section.head).length
    const members = orgData.sections.reduce((total, section) => {
      return total + (section.head ? 1 : 0) + section.members.length
    }, 0)

    return { sections, heads, members }
  }

  const { sections: sectionCount, heads: headCount, members: totalMembers } = getTotalCounts()

  // Loading state
  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600/90 py-16 sm:py-20 lg:py-24 xl:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-white text-lg">Loading faculty organization chart...</p>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600/90 py-16 sm:py-20 lg:py-24 xl:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <div className="text-white text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-white mb-2">Unable to Load Faculty Organization Chart</h3>
            <p className="text-white/80">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  // No data state
  if (!orgData || orgData.sections.length === 0) {
    return (
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600/90 py-16 sm:py-20 lg:py-24 xl:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <div className="text-white/60 text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-white mb-2">No Dean Data Found</h3>
            <p className="text-white/80 mb-6">
              No sections found for dean organization. Please ensure you have:
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left max-w-md mx-auto">
              <ol className="text-white/90 text-sm space-y-2">
                <li>1. Created sections with <code className="bg-white/20 px-2 py-1 rounded">organization_type = 'dean'</code></li>
                <li>2. Added members with categories matching your sections</li>
                <li>3. Set proper head references or is_head flags</li>
              </ol>
            </div>
            <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-white/90 text-sm">
                Debug info: Found {orgData?.sections.length || 0} sections
              </p>
              <button 
                onClick={() => setDebugMode(!debugMode)}
                className="mt-2 px-4 py-1 bg-white/20 text-white text-xs rounded hover:bg-white/30 transition-colors"
              >
                Toggle Debug Mode
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600/90 py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden" ref={ref}>
      {/* Ultra-enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large animated background elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-white/8 to-cyan-300/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-300/5 to-white/8 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-300/5 to-white/6 rounded-full blur-2xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-gradient-to-br from-white/6 to-pink-300/5 rounded-full blur-xl animate-pulse [animation-delay:3s]" />
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 right-1/4 w-8 h-8 border-2 border-white/20 rotate-45 animate-spin opacity-30 [animation-duration:20s]" />
        <div className="absolute bottom-32 left-1/3 w-6 h-6 bg-white/10 rounded-full animate-bounce opacity-40 [animation-delay:2s]" />
        <div className="absolute top-40 left-1/5 w-4 h-4 border border-white/15 rounded-full animate-ping opacity-25 [animation-delay:4s]" />
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:60px_60px]" />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/50 to-transparent opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Debug Panel - only in development */}
        {process.env.NODE_ENV === 'development' && debugMode && (
          <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50 max-h-96 overflow-y-auto">
            <h4 className="font-bold mb-2">Debug Info</h4>
            <div className="space-y-1">
              <p>Sections: {sectionCount}</p>
              <p>Heads: {headCount}</p>
              <p>Total Members: {totalMembers}</p>
              {orgData.sections.map(section => (
                <div key={section.section.id} className="border-t border-gray-600 pt-1 mt-1">
                  <p className="font-semibold">{section.section.category}</p>
                  <p className="text-gray-300">Head: {section.head ? `${section.head.name} (${section.head.position})` : 'None'}</p>
                  <p className="text-gray-400">Members: {section.members.length}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setDebugMode(false)}
              className="mt-2 px-2 py-1 bg-red-600 rounded text-xs"
            >
              Close
            </button>
          </div>
        )}

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
                  
                  {/* Debug toggle button */}
                  {/* {process.env.NODE_ENV === 'development' && (
                    <button
                      onClick={() => setDebugMode(!debugMode)}
                      className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-white/20 text-white text-xs px-2 py-1 rounded hover:bg-white/30 transition-colors"
                    >
                      Debug
                    </button>
                  )}*/}
                  
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
                  <div className="absolute inset-0 bg-cyan-300/10 blur-2xl rounded-full transform scale-125 opacity-20 animate-pulse [animation-delay:1s]" />
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
                    <div className="w-2 h-2 bg-cyan-300/30 rounded-full animate-pulse [animation-delay:0.5s]" />
                    <div className="w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse [animation-delay:1s]" />
                  </div>
                </motion.div>
              </motion.div>

              {/* FIXED: Hierarchical Organization Structure */}
              <div className="mb-16">
                {renderHierarchicalSections()}
              </div>

              {/* Stats Section - Dynamic stats based on actual data */}
              <motion.div
                key="stats"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={staggerContainer}
                className="flex flex-wrap justify-center gap-8 mt-16 sm:mt-20"
              >
                {[
                  { 
                    id: 'sections-stat', 
                    number: sectionCount.toString(), 
                    label: 'Sections', 
                    icon: '📁' 
                  },
                  { 
                    id: 'heads-stat', 
                    number: headCount.toString(), 
                    label: 'Department Heads', 
                    icon: '👑' 
                  },
                  { 
                    id: 'leadership-stat', 
                    number: totalMembers.toString(), 
                    label: 'Leadership Team', 
                    icon: '👥' 
                  },
                  { 
                    id: 'students-stat', 
                    number: '1000+', 
                    label: 'Students', 
                    icon: '🎓' 
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.id}
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