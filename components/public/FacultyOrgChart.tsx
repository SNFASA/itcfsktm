'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { OrgDatabase, type ExcoMember, type OrganizedMembers } from '@/lib/public/org'

// Enhanced LeaderCard with beautiful blue theme and properly responsive design
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
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -20 },
  }

  return (
    <motion.div
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={scaleVariant}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className="group relative w-full max-w-xs mx-auto"
    >
      <div className="text-center relative">
        {/* Enhanced background decoration with blue theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-cyan-300/5 to-blue-500/15 rounded-xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 blur-sm scale-105" />
        
        {/* Profile image container with enhanced blue effects */}
        <div className="relative inline-block mb-4">
          {/* Multi-layer blue glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${isHead ? 'from-blue-400/40 via-cyan-300/30 to-blue-500/40' : 'from-blue-300/30 via-cyan-200/20 to-blue-400/30'} rounded-full blur-md transform scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500`} />
          
          {/* Pulsating outer ring */}
          <motion.div
            className={`absolute inset-0 ${isHead ? 'border border-blue-400/20' : 'border border-blue-300/15'} rounded-full`}
            animate={inView ? {
              scale: [1, 1.08, 1],
              opacity: [0.2, 0.5, 0.2],
            } : { scale: 1, opacity: 0 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + 0.5
            }}
          />
          
          {/* Normalized image border - Responsive sizing */}
          <div className={`relative ${isHead ? 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28' : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'} rounded-full ${isHead ? 'bg-gradient-to-br from-blue-400/25 via-cyan-300/15 to-blue-500/25 border border-blue-400/30' : 'bg-gradient-to-br from-blue-300/20 via-cyan-200/10 to-blue-400/20 border border-blue-300/20'} p-1 group-hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-lg group-hover:shadow-blue-500/15`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 shadow-inner relative">
              {/* Loading placeholder */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 animate-pulse rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Enhanced image with better error handling */}
              <img
                src={imageUrl}
                alt={member.name}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
            </div>
          </div>
          
          {/* Head crown indicator with blue theme */}
          {isHead && (
            <motion.div
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              animate={{
                y: [0, -3, 0],
                rotate: [0, 3, -3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="drop-shadow-md filter">👑</span>
            </motion.div>
          )}
          
          {/* Floating orbital elements with blue theme */}
          <motion.div
            className={`absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br ${isHead ? 'from-blue-400/70 to-cyan-400/70' : 'from-cyan-400/60 to-blue-400/60'} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm`}
            animate={{
              y: [0, -4, 0],
              x: [0, 2, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-br ${isHead ? 'from-indigo-400/60 to-blue-400/60' : 'from-sky-400/50 to-cyan-400/50'} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-400 shadow-sm`}
            animate={{
              y: [0, 3, 0],
              x: [0, -2, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
        </div>

        {/* Enhanced content card with blue theme */}
        <div className={`relative ${isHead ? 'bg-gradient-to-br from-blue-500/12 via-cyan-400/8 to-blue-600/12 border-blue-400/30' : 'bg-gradient-to-br from-blue-400/8 via-cyan-300/6 to-blue-500/10 border-blue-300/20'} backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border group-hover:border-blue-300/40 ${isHead ? 'group-hover:bg-gradient-to-br group-hover:from-blue-500/15 group-hover:via-cyan-400/10 group-hover:to-blue-600/15' : 'group-hover:bg-gradient-to-br group-hover:from-blue-400/10 group-hover:via-cyan-300/8 group-hover:to-blue-500/12'} group-hover:shadow-blue-500/10`}>
          
          {/* Animated gradient background */}
          <div className={`absolute inset-0 ${isHead ? 'bg-gradient-to-br from-blue-400/6 via-transparent to-cyan-400/8' : 'bg-gradient-to-br from-blue-300/4 via-transparent to-cyan-300/6'} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Shine effects with blue tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-out rounded-lg" />
          
          {/* Content with responsive text sizing */}
          <h4 className={`font-karla font-bold ${isHead ? 'text-sm sm:text-base md:text-lg' : 'text-xs sm:text-sm md:text-base'} text-white mb-1 leading-tight relative z-10 ${isHead ? 'group-hover:text-blue-100' : 'group-hover:text-cyan-100'} transition-colors duration-200`}>
            {member.name}
          </h4>
          <p className={`font-karla font-medium ${isHead ? 'text-xs sm:text-sm' : 'text-xs'} text-blue-100/80 relative z-10 leading-relaxed group-hover:text-blue-50 transition-colors duration-200`}>
            {member.position}
          </p>
          
          {/* Head badge with blue theme */}
          {isHead && (
            <div className="absolute top-1 right-1 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 backdrop-blur-sm rounded-md px-1.5 py-0.5 text-xs font-bold text-blue-100 border border-blue-300/30 shadow-sm">
              HEAD
            </div>
          )}
          
          {/* Decorative corner elements with blue theme */}
          <div className={`absolute top-1 left-1 w-3 h-3 ${isHead ? 'bg-gradient-to-br from-blue-300/10 to-transparent' : 'bg-gradient-to-br from-cyan-300/8 to-transparent'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
          <div className={`absolute bottom-1 right-1 w-2 h-2 ${isHead ? 'bg-gradient-to-br from-cyan-400/10 to-transparent' : 'bg-gradient-to-br from-blue-400/8 to-transparent'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
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
  const [debugMode, setDebugMode] = useState(false)

  // Fetch dean organization data on component mount
  useEffect(() => {
    const fetchDeanData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🏗️ Starting to fetch dean organization data...')
        
        const data = await OrgDatabase.getOrganizationSections('dean')
        console.log('✅ Dean organization data fetched:', data)
        
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  }

  const scaleVariant = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -20 },
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  // Enhanced function to get centered grid classes based on member count
  const getCenteredGridClasses = (memberCount: number) => {
    if (memberCount === 1) {
      return "flex justify-center"
    } else if (memberCount === 2) {
      return "flex justify-center gap-4 sm:gap-6 flex-wrap"
    } else if (memberCount === 3) {
      return "flex justify-center gap-4 sm:gap-6 flex-wrap max-w-3xl mx-auto"
    } else if (memberCount <= 4) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-4xl mx-auto"
    } else if (memberCount <= 6) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center max-w-5xl mx-auto"
    } else {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center"
    }
  }

  // Proper hierarchical rendering - Head at top, members below with centered layout
  const renderHierarchicalSections = () => {
    if (!orgData?.sections || orgData.sections.length === 0) return null

    return orgData.sections.map((sectionData, sectionIndex) => {
      const sectionTitle = OrgDatabase.getSectionDisplayName(sectionData.section.category)
      const baseDelay = 0.4 + (sectionIndex * 0.2)

      return (
        <motion.div
          key={sectionData.section.id}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeVariant}
          transition={{ duration: 0.6, delay: baseDelay, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 sm:mb-12 lg:mb-16"
        >
          {/* Enhanced Section Title */}
          <motion.div
            variants={fadeVariant}
            transition={{ duration: 0.6, delay: baseDelay + 0.1 }}
            className="text-center mb-6 sm:mb-8 relative"
          >
            <h3 className="font-karla font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white relative z-10 mb-2">
              {sectionTitle}
            </h3>
            
            {/* Floating decorative elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <motion.div
                className="flex items-center gap-1.5"
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-cyan-300/40 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="w-0.5 h-0.5 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Section Head at the top */}
          {sectionData.head && (
            <motion.div
              className="flex justify-center mb-6 sm:mb-8"
              variants={scaleVariant}
              transition={{ duration: 0.6, delay: baseDelay + 0.2 }}
            >
              <LeaderCard
                member={sectionData.head}
                isHead={true}
                delay={baseDelay + 0.2}
                inView={inView}
              />
            </motion.div>
          )}

          {/* Enhanced connecting line from head to members */}
          {sectionData.head && sectionData.members.length > 0 && (
            <motion.div
              className="flex justify-center mb-6 sm:mb-8"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: baseDelay + 0.4 }}
            >
              <div className="relative">
                <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-blue-400/50 via-cyan-300/30 to-transparent relative">
                  {/* Animated nodes on the line */}
                  <motion.div
                    className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400/60 rounded-full shadow-sm"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-cyan-300/50 rounded-full shadow-sm"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                </div>
                
                {/* Side branches for aesthetic */}
                <div className="absolute top-1/2 left-0 w-4 h-px bg-gradient-to-r from-blue-400/20 to-transparent transform -translate-y-1/2" />
                <div className="absolute top-1/2 right-0 w-4 h-px bg-gradient-to-l from-blue-400/20 to-transparent transform -translate-y-1/2" />
              </div>
            </motion.div>
          )}

          {/* Section Members with CENTERED responsive layout */}
          {sectionData.members.length > 0 && (
            <motion.div
              className={getCenteredGridClasses(sectionData.members.length)}
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {sectionData.members.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="flex-shrink-0"
                  variants={scaleVariant}
                  transition={{
                    duration: 0.5,
                    delay: baseDelay + 0.6 + (index * 0.06),
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <LeaderCard
                    member={member}
                    isHead={false}
                    delay={baseDelay + 0.6 + (index * 0.06)}
                    inView={inView}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Enhanced section separator */}
          {sectionIndex < (orgData.sections.length - 1) && (
            <motion.div
              className="flex justify-center mt-8 sm:mt-10 lg:mt-12"
              initial={{ width: 0, opacity: 0 }}
              animate={inView ? { width: 'auto', opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: baseDelay + 1 }}
            >
              <div className="relative">
                <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400/40 rounded-full blur-sm"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-blue-300 rounded-full"></div>
              </div>
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

  // Loading state with blue theme
  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-12 sm:py-16 lg:py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="inline-block w-12 h-12 border-3 border-blue-300/30 border-t-blue-300 rounded-full mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-white text-base sm:text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading faculty organization chart...
          </motion.p>
        </div>
      </section>
    )
  }

  // Error state with blue theme
  if (error) {
    return (
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-12 sm:py-16 lg:py-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Unable to Load Faculty Organization Chart</h3>
          <p className="text-blue-100 mb-6 leading-relaxed text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-medium shadow-md hover:shadow-blue-500/20 transform hover:scale-105"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  // No data state with blue theme
  if (!orgData || orgData.sections.length === 0) {
    return (
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-12 sm:py-16 lg:py-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-xl mx-auto px-4">
          <div className="text-4xl mb-4 opacity-60">👥</div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3">No Dean Data Found</h3>
          <p className="text-blue-100 mb-6 leading-relaxed text-sm">
            No sections found for dean organization. Please ensure you have:
          </p>
          <div className="bg-gradient-to-br from-blue-500/15 to-cyan-500/8 backdrop-blur-sm rounded-lg p-4 text-left border border-blue-400/25">
            <ol className="text-blue-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-400/25 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Created sections with <code className="bg-blue-400/15 px-1.5 py-0.5 rounded text-xs text-blue-100">organization_type = 'dean'</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-400/25 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Added members with categories matching your sections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-400/25 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Set proper head references or is_head flags</span>
              </li>
            </ol>
          </div>
          <div className="mt-6 p-3 bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-lg backdrop-blur-sm border border-blue-400/15">
            <p className="text-blue-100 text-sm mb-2">
              Debug info: Found {orgData?.sections.length || 0} sections
            </p>
            <button 
              onClick={() => setDebugMode(!debugMode)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm rounded-md hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
            >
              Toggle Debug Mode
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-12 sm:py-16 lg:py-20 overflow-hidden" ref={ref}>
      {/* Enhanced background effects with blue theme - normalized sizes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large animated background elements - reduced sizes */}
        <motion.div 
          className="absolute -top-20 -left-20 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-cyan-300/6 rounded-full blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 25, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-br from-indigo-400/6 to-blue-300/8 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.35, 0.15],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/5 to-blue-400/6 rounded-full blur-lg"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 180]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-300/6 to-indigo-300/4 rounded-full blur-md"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 15, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating geometric elements with blue theme - smaller sizes */}
        <motion.div 
          className="absolute top-16 right-1/4 w-4 h-4 border border-blue-300/25 rotate-45"
          animate={{
            rotate: [45, 225],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-24 left-1/3 w-3 h-3 bg-cyan-300/15 rounded-full"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-32 left-1/5 w-2 h-2 border border-blue-200/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Enhanced grid pattern - subtle */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.3)_1px,transparent_0)] bg-[length:40px_40px]" />
        
        {/* Layered gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/15 via-transparent to-indigo-800/20 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/3 to-transparent opacity-30" />
        
        {/* Animated light rays - smaller and subtle */}
        <motion.div
          className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-blue-300/15 via-transparent to-transparent transform -skew-x-12"
          animate={{
            opacity: [0, 0.4, 0],
            x: [0, 50, 100]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-cyan-300/10 via-transparent to-transparent transform skew-x-12"
          animate={{
            opacity: [0, 0.3, 0],
            x: [0, -40, -80]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Debug Panel - only in development - normalized size */}
        {process.env.NODE_ENV === 'development' && debugMode && (
          <div className="fixed top-4 right-4 bg-gradient-to-br from-blue-900/95 to-indigo-900/95 backdrop-blur-md text-white p-4 rounded-lg text-sm max-w-xs z-50 max-h-80 overflow-y-auto border border-blue-400/25 shadow-xl">
            <h4 className="font-bold mb-3 text-blue-200 border-b border-blue-400/25 pb-2">Debug Information</h4>
            <div className="space-y-2">
              <p><span className="text-blue-300">Sections:</span> {sectionCount}</p>
              <p><span className="text-blue-300">Heads:</span> {headCount}</p>
              <p><span className="text-blue-300">Total Members:</span> {totalMembers}</p>
              {orgData.sections.map(section => (
                <div key={section.section.id} className="border-t border-blue-400/15 pt-2 mt-2">
                  <p className="font-semibold text-cyan-200 text-xs">{section.section.category}</p>
                  <p className="text-blue-200 text-xs">Head: {section.head ? `${section.head.name} (${section.head.position})` : 'None'}</p>
                  <p className="text-blue-300 text-xs">Members: {section.members.length}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setDebugMode(false)}
              className="mt-3 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 rounded-md text-xs font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Close Debug
            </button>
          </div>
        )}

        <AnimatePresence>
          {inView && (
            <>
              {/* Enhanced Section Title with blue theme - normalized sizes */}
              <motion.div
                key="title"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariant}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center mb-10 sm:mb-12 lg:mb-16"
              >
                <div className="relative inline-block">
                  <motion.h2 
                    className="font-karla font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white relative z-10 tracking-tight leading-tight"
                    whileHover={{
                      scale: 1.02,
                      textShadow: "0 0 20px rgba(59, 130, 246, 0.6)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Organization Chart Faculty
                    
                    {/* Text glow effect */}
                    <div className="absolute inset-0 bg-blue-400/15 blur-xl rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </motion.h2>
                  
                  {/* Multi-layer animated underline with blue theme */}
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                  />
                  
                  {/* Enhanced background glow effects - normalized */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-cyan-300/15 to-blue-400/10 blur-xl rounded-full transform scale-125"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1.25, 1.35, 1.25]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/8 via-blue-300/12 to-indigo-400/8 blur-lg rounded-full transform scale-110"
                    animate={{
                      opacity: [0.15, 0.35, 0.15],
                      scale: [1.1, 1.2, 1.1],
                      rotate: [0, 90, 180]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                </div>
                
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeVariant}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-blue-100/80 text-sm sm:text-base lg:text-lg mt-3 max-w-xl mx-auto font-karla leading-relaxed"
                >
                  Excellence in leadership, innovation in education
                </motion.p>
                
                {/* Enhanced decorative elements around title - smaller sizes */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <motion.div 
                    className="flex items-center gap-1.5"
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 bg-blue-400/60 rounded-full shadow-sm"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="w-1 h-1 bg-cyan-300/50 rounded-full shadow-sm"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.25
                      }}
                    />
                    <motion.div 
                      className="w-0.5 h-0.5 bg-blue-300/40 rounded-full shadow-sm"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </motion.div>
                </motion.div>
                
                {/* Side floating elements - smaller */}
                <motion.div
                  className="absolute top-1/2 -left-6 transform -translate-y-1/2"
                  animate={{
                    x: [0, 5, 0],
                    y: [0, -8, 0],
                    rotate: [0, 180]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-1 h-1 bg-blue-400/40 rounded-full shadow-sm" />
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -right-6 transform -translate-y-1/2"
                  animate={{
                    x: [0, -5, 0],
                    y: [0, 8, 0],
                    rotate: [0, -180]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <div className="w-0.5 h-0.5 bg-cyan-300/50 rounded-full shadow-sm" />
                </motion.div>
              </motion.div>

              {/* CENTERED: Hierarchical Organization Structure */}
              <div className="mb-10 sm:mb-12">
                {renderHierarchicalSections()}
              </div>

              {/* Enhanced Stats Section with blue theme - normalized sizes */}
              <motion.div
                key="stats"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12 md:mt-16"
              >
                {[
                  { 
                    id: 'sections-stat', 
                    number: sectionCount.toString(), 
                    label: 'Sections', 
                    icon: '📁',
                    gradient: 'from-blue-500/15 to-cyan-400/10'
                  },
                  { 
                    id: 'heads-stat', 
                    number: headCount.toString(), 
                    label: 'Department Heads', 
                    icon: '👑',
                    gradient: 'from-cyan-500/15 to-blue-400/10'
                  },
                  { 
                    id: 'leadership-stat', 
                    number: totalMembers.toString(), 
                    label: 'Leadership Team', 
                    icon: '👥',
                    gradient: 'from-indigo-500/15 to-blue-400/10'
                  },
                  { 
                    id: 'students-stat', 
                    number: '1000+', 
                    label: 'Students', 
                    icon: '🎓',
                    gradient: 'from-blue-500/15 to-indigo-400/10'
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    variants={scaleVariant}
                    transition={{
                      duration: 0.5,
                      delay: 2 + (index * 0.08),
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="text-center group"
                  >
                    <motion.div 
                      className={`bg-gradient-to-br ${stat.gradient} backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-blue-300/15 hover:border-blue-300/30 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-400/10 hover:to-cyan-400/8 shadow-md hover:shadow-lg hover:shadow-blue-500/8`}
                      whileHover={{ 
                        scale: 1.03,
                        y: -2
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="text-xl sm:text-2xl mb-2 filter drop-shadow-sm"
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        {stat.icon}
                      </motion.div>
                      <motion.div 
                        className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 group-hover:text-cyan-100 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-blue-100/70 text-xs sm:text-sm font-medium group-hover:text-blue-50 transition-colors duration-200 leading-tight">
                        {stat.label}
                      </div>
                      
                      {/* Stat card decoration - smaller */}
                      <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-blue-400/25 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <div className="absolute bottom-1.5 left-1.5 w-0.5 h-0.5 bg-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
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