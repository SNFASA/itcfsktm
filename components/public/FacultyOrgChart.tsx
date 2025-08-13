'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { OrgDatabase, type ExcoMember, type OrganizedMembers } from '@/lib/public/org'

// Enhanced LeaderCard with beautiful blue theme and responsive design
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
      className="group relative w-full max-w-sm mx-auto"
    >
      <div className="text-center relative">
        {/* Enhanced background decoration with blue theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-cyan-300/5 to-blue-500/15 rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 blur-xl scale-110" />
        
        {/* Profile image container with enhanced blue effects */}
        <div className="relative inline-block mb-6 sm:mb-8">
          {/* Multi-layer blue glow effect - Enhanced for heads */}
          <div className={`absolute inset-0 bg-gradient-to-br ${isHead ? 'from-blue-400/50 via-cyan-300/40 to-blue-500/50' : 'from-blue-300/40 via-cyan-200/30 to-blue-400/40'} rounded-full blur-3xl transform scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700`} />
          <div className={`absolute inset-0 bg-gradient-to-br ${isHead ? 'from-cyan-400/40 via-blue-300/30 to-indigo-400/40' : 'from-cyan-300/30 via-blue-200/20 to-sky-300/30'} rounded-full blur-xl transform scale-115 opacity-0 group-hover:opacity-100 transition-all duration-500`} />
          
          {/* Pulsating outer ring */}
          <motion.div
            className={`absolute inset-0 ${isHead ? 'border-2 border-blue-400/30' : 'border border-blue-300/25'} rounded-full`}
            animate={inView ? {
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.7, 0.3],
            } : { scale: 1, opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + 1
            }}
          />
          
          {/* Enhanced image border - Responsive sizing */}
          <div className={`relative ${isHead ? 'w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52' : 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36'} rounded-full ${isHead ? 'bg-gradient-to-br from-blue-400/30 via-cyan-300/20 to-blue-500/30 border-2 border-blue-400/40' : 'bg-gradient-to-br from-blue-300/25 via-cyan-200/15 to-blue-400/25 border border-blue-300/30'} p-1.5 group-hover:scale-110 transition-all duration-500 backdrop-blur-sm shadow-2xl group-hover:shadow-blue-500/20`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 shadow-inner relative">
              {/* Loading placeholder */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 animate-pulse rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
            </div>
          </div>
          
          {/* Head crown indicator with blue theme */}
          {isHead && (
            <motion.div
              className="absolute -top-2 sm:-top-4 left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="drop-shadow-lg filter">👑</span>
            </motion.div>
          )}
          
          {/* Floating orbital elements with blue theme */}
          <motion.div
            className={`absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br ${isHead ? 'from-blue-400/80 to-cyan-400/80' : 'from-cyan-400/70 to-blue-400/70'} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg`}
            animate={{
              y: [0, -8, 0],
              x: [0, 4, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={`absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br ${isHead ? 'from-indigo-400/70 to-blue-400/70' : 'from-sky-400/60 to-cyan-400/60'} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-md`}
            animate={{
              y: [0, 6, 0],
              x: [0, -3, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div
            className={`absolute top-1/2 -right-4 sm:-right-6 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-br ${isHead ? 'from-cyan-400/70 to-blue-400/70' : 'from-blue-300/60 to-sky-300/60'} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 shadow-sm`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        {/* Enhanced content card with blue theme */}
        <div className={`relative ${isHead ? 'bg-gradient-to-br from-blue-500/15 via-cyan-400/10 to-blue-600/15 border-blue-400/40' : 'bg-gradient-to-br from-blue-400/10 via-cyan-300/8 to-blue-500/12 border-blue-300/30'} backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border group-hover:border-blue-300/60 ${isHead ? 'group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:via-cyan-400/15 group-hover:to-blue-600/20' : 'group-hover:bg-gradient-to-br group-hover:from-blue-400/15 group-hover:via-cyan-300/12 group-hover:to-blue-500/18'} group-hover:shadow-blue-500/10`}>
          
          {/* Animated gradient background */}
          <div className={`absolute inset-0 ${isHead ? 'bg-gradient-to-br from-blue-400/8 via-transparent to-cyan-400/12' : 'bg-gradient-to-br from-blue-300/6 via-transparent to-cyan-300/8'} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Multiple shine effects with blue tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out rounded-2xl sm:rounded-3xl" />
          <div className={`absolute inset-0 bg-gradient-to-l from-transparent ${isHead ? 'via-cyan-300/15' : 'via-blue-300/12'} to-transparent transform skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-out rounded-2xl sm:rounded-3xl delay-200`} />
          
          {/* Content with responsive text sizing */}
          <h4 className={`font-karla font-extrabold ${isHead ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl' : 'text-base sm:text-lg md:text-xl'} text-white mb-2 sm:mb-3 leading-tight relative z-10 ${isHead ? 'group-hover:text-blue-100' : 'group-hover:text-cyan-100'} transition-colors duration-300 group-hover:drop-shadow-lg`}>
            {member.name}
          </h4>
          <p className={`font-karla font-semibold ${isHead ? 'text-sm sm:text-base md:text-lg' : 'text-xs sm:text-sm md:text-base'} text-blue-100/90 relative z-10 leading-relaxed group-hover:text-blue-50 transition-colors duration-300`}>
            {member.position}
          </p>
          
          {/* Head badge with blue theme */}
          {isHead && (
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-br from-blue-400/25 to-cyan-400/25 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs font-bold text-blue-100 border border-blue-300/40 shadow-lg">
              HEAD
            </div>
          )}
          
          {/* Decorative corner elements with blue theme */}
          <div className={`absolute top-2 sm:top-3 ${isHead ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} w-6 h-6 sm:w-8 sm:h-8 ${isHead ? 'bg-gradient-to-br from-blue-300/15 to-transparent' : 'bg-gradient-to-br from-cyan-300/12 to-transparent'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          <div className={`absolute bottom-2 sm:bottom-3 ${isHead ? 'right-2 sm:right-3' : 'left-2 sm:left-3'} w-4 h-4 sm:w-6 sm:h-6 ${isHead ? 'bg-gradient-to-br from-cyan-400/15 to-transparent' : 'bg-gradient-to-br from-blue-400/12 to-transparent'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Enhanced pulse ring effect */}
          <motion.div
            className={`absolute inset-0 border-2 ${isHead ? 'border-blue-400/30' : 'border-cyan-300/25'} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100`}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating sparkles around card */}
          <motion.div
            className="absolute -top-1 -right-1 w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-1 h-1 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-100"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
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
        staggerChildren: 0.1,
      },
    },
  }

  // Enhanced function to get centered grid classes based on member count
  const getCenteredGridClasses = (memberCount: number) => {
    if (memberCount === 1) {
      return "flex justify-center"
    } else if (memberCount === 2) {
      return "flex justify-center gap-6 sm:gap-8 lg:gap-10 flex-wrap"
    } else if (memberCount === 3) {
      return "flex justify-center gap-6 sm:gap-8 lg:gap-10 flex-wrap max-w-4xl mx-auto"
    } else if (memberCount <= 4) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 justify-items-center max-w-5xl mx-auto"
    } else if (memberCount <= 6) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-items-center max-w-6xl mx-auto"
    } else {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 justify-items-center"
    }
  }

  // Proper hierarchical rendering - Head at top, members below with centered layout
  const renderHierarchicalSections = () => {
    if (!orgData?.sections || orgData.sections.length === 0) return null

    return orgData.sections.map((sectionData, sectionIndex) => {
      const sectionTitle = OrgDatabase.getSectionDisplayName(sectionData.section.category)
      const baseDelay = 0.8 + (sectionIndex * 0.3)

      return (
        <motion.div
          key={sectionData.section.id}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeVariant}
          transition={{ duration: 0.8, delay: baseDelay, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          {/* Enhanced Section Title */}
          <motion.div
            variants={fadeVariant}
            transition={{ duration: 0.8, delay: baseDelay + 0.1 }}
            className="text-center mb-12 sm:mb-16 relative"
          >
            <h3 className="font-karla font-extrabold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white relative z-10 mb-4">
              {sectionTitle}
              
              {/* Section title glow effect */}
              <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </h3>
            
            {/* Decorative line under section title */}
            {/*<motion.div
              className="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 rounded-full mx-auto shadow-lg"
              initial={{ width: 0, opacity: 0 }}
              animate={inView ? { width: 'auto', opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 1, delay: baseDelay + 0.3 }}
            />*/}
            
            {/* Floating decorative elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
              <motion.div
                className="flex items-center gap-2 sm:gap-3"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-cyan-300/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="w-1 h-1 bg-blue-300/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Section Head at the top */}
          {sectionData.head && (
            <motion.div
              className="flex justify-center mb-12 sm:mb-16 lg:mb-20"
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

          {/* Enhanced connecting line from head to members */}
          {sectionData.head && sectionData.members.length > 0 && (
            <motion.div
              className="flex justify-center mb-12 sm:mb-16"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: baseDelay + 0.6 }}
            >
              <div className="relative">
                <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-blue-400/60 via-cyan-300/40 to-transparent relative">
                  {/* Animated nodes on the line */}
                  <motion.div
                    className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400/70 rounded-full shadow-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300/60 rounded-full shadow-md"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-300/50 rounded-full shadow-sm"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>
                
                {/* Side branches for aesthetic */}
                <div className="absolute top-1/2 left-0 w-8 h-px bg-gradient-to-r from-blue-400/30 to-transparent transform -translate-y-1/2" />
                <div className="absolute top-1/2 right-0 w-8 h-px bg-gradient-to-l from-blue-400/30 to-transparent transform -translate-y-1/2" />
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
                    duration: 0.6,
                    delay: baseDelay + 0.8 + (index * 0.08),
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <LeaderCard
                    member={member}
                    isHead={false}
                    delay={baseDelay + 0.8 + (index * 0.08)}
                    inView={inView}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Enhanced section separator */}
          {sectionIndex < (orgData.sections.length - 1) && (
            <motion.div
              className="flex justify-center mt-16 sm:mt-20 lg:mt-24"
              initial={{ width: 0, opacity: 0 }}
              animate={inView ? { width: 'auto', opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: baseDelay + 1.5 }}
            >
              <div className="relative">
                <div className="w-48 sm:w-64 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400/50 rounded-full blur-sm"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-300 rounded-full"></div>
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
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 sm:py-20 lg:py-24 xl:py-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="inline-block w-16 h-16 border-4 border-blue-300/30 border-t-blue-300 rounded-full mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-white text-lg sm:text-xl font-medium"
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
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 sm:py-20 lg:py-24 xl:py-28 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">⚠️</div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Unable to Load Faculty Organization Chart</h3>
          <p className="text-blue-100 mb-8 leading-relaxed">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-medium shadow-lg hover:shadow-blue-500/20 transform hover:scale-105"
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
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 sm:py-20 lg:py-24 xl:py-28 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="text-6xl mb-6 opacity-60">👥</div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">No Dean Data Found</h3>
          <p className="text-blue-100 mb-8 leading-relaxed">
            No sections found for dean organization. Please ensure you have:
          </p>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-sm rounded-xl p-6 text-left border border-blue-400/30">
            <ol className="text-blue-100 text-sm space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-400/30 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Created sections with <code className="bg-blue-400/20 px-2 py-1 rounded text-blue-100">organization_type = 'dean'</code></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-400/30 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Added members with categories matching your sections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-400/30 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Set proper head references or is_head flags</span>
              </li>
            </ol>
          </div>
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg backdrop-blur-sm border border-blue-400/20">
            <p className="text-blue-100 text-sm mb-3">
              Debug info: Found {orgData?.sections.length || 0} sections
            </p>
            <button 
              onClick={() => setDebugMode(!debugMode)}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
            >
              Toggle Debug Mode
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden" ref={ref}>
      {/* Ultra-enhanced background effects with blue theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large animated background elements */}
        <motion.div 
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-300/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-indigo-400/8 to-blue-300/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/6 to-blue-400/8 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/3 w-48 h-48 bg-gradient-to-br from-blue-300/8 to-indigo-300/6 rounded-full blur-xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Floating geometric elements with blue theme */}
        <motion.div 
          className="absolute top-20 right-1/4 w-8 h-8 border-2 border-blue-300/30 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/3 w-6 h-6 bg-cyan-300/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-40 left-1/5 w-4 h-4 border border-blue-200/25 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.25, 0.6, 0.25]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,rgba(59,130,246,0.5)_1px,transparent_0)] bg-[length:80px_80px]" />
        
        {/* Layered gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-transparent to-indigo-800/30 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-40" />
        
        {/* Animated light rays */}
        <motion.div
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-300/20 via-transparent to-transparent transform -skew-x-12"
          animate={{
            opacity: [0, 0.6, 0],
            x: [0, 100, 200]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-cyan-300/15 via-transparent to-transparent transform skew-x-12"
          animate={{
            opacity: [0, 0.5, 0],
            x: [0, -80, -160]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Debug Panel - only in development */}
        {process.env.NODE_ENV === 'development' && debugMode && (
          <div className="fixed top-4 right-4 bg-gradient-to-br from-blue-900/95 to-indigo-900/95 backdrop-blur-md text-white p-6 rounded-xl text-sm max-w-sm z-50 max-h-96 overflow-y-auto border border-blue-400/30 shadow-2xl">
            <h4 className="font-bold mb-4 text-blue-200 border-b border-blue-400/30 pb-2">Debug Information</h4>
            <div className="space-y-2">
              <p><span className="text-blue-300">Sections:</span> {sectionCount}</p>
              <p><span className="text-blue-300">Heads:</span> {headCount}</p>
              <p><span className="text-blue-300">Total Members:</span> {totalMembers}</p>
              {orgData.sections.map(section => (
                <div key={section.section.id} className="border-t border-blue-400/20 pt-2 mt-2">
                  <p className="font-semibold text-cyan-200">{section.section.category}</p>
                  <p className="text-blue-200 text-xs">Head: {section.head ? `${section.head.name} (${section.head.position})` : 'None'}</p>
                  <p className="text-blue-300 text-xs">Members: {section.members.length}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setDebugMode(false)}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Close Debug
            </button>
          </div>
        )}

        <AnimatePresence>
          {inView && (
            <>
              {/* Enhanced Section Title with blue theme */}
              <motion.div
                key="title"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariant}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center mb-16 sm:mb-20 lg:mb-24"
              >
                <div className="relative inline-block">
                  <motion.h2 
                    className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white relative z-10 tracking-tight leading-tight"
                    whileHover={{
                      scale: 1.02,
                      textShadow: "0 0 30px rgba(59, 130, 246, 0.8)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Organization Chart Faculty
                    
                    {/* Text glow effect */}
                    <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  </motion.h2>
                  
                  {/*layer animated underline with blue theme */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                  />
                  {/* Enhanced background glow effects */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-cyan-300/20 to-blue-400/15 blur-3xl rounded-full transform scale-150"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1.5, 1.7, 1.5]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-300/15 to-indigo-400/10 blur-2xl rounded-full transform scale-125"
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1.25, 1.4, 1.25],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>
                
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeVariant}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-blue-100/90 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl mx-auto font-karla leading-relaxed"
                >
                  Excellence in leadership, innovation in education
                </motion.p>
                
                {/* Enhanced decorative elements around title */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 sm:-translate-y-12"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <motion.div 
                    className="flex items-center gap-2 sm:gap-3"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div 
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400/70 rounded-full shadow-lg"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-300/60 rounded-full shadow-md"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                    <motion.div 
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-300/50 rounded-full shadow-sm"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                  </motion.div>
                </motion.div>
                
                {/* Side floating elements */}
                <motion.div
                  className="absolute top-1/2 -left-8 sm:-left-12 transform -translate-y-1/2"
                  animate={{
                    x: [0, 10, 0],
                    y: [0, -15, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-2 h-2 bg-blue-400/50 rounded-full shadow-lg" />
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -right-8 sm:-right-12 transform -translate-y-1/2"
                  animate={{
                    x: [0, -10, 0],
                    y: [0, 15, 0],
                    rotate: [0, -360]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-cyan-300/60 rounded-full shadow-md" />
                </motion.div>
              </motion.div>

              {/* CENTERED: Hierarchical Organization Structure */}
              <div className="mb-16 sm:mb-20">
                {renderHierarchicalSections()}
              </div>

              {/* Enhanced Stats Section with blue theme */}
              <motion.div
                key="stats"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-20 md:mt-24"
              >
                {[
                  { 
                    id: 'sections-stat', 
                    number: sectionCount.toString(), 
                    label: 'Sections', 
                    icon: '📁',
                    gradient: 'from-blue-500/20 to-cyan-400/15'
                  },
                  { 
                    id: 'heads-stat', 
                    number: headCount.toString(), 
                    label: 'Department Heads', 
                    icon: '👑',
                    gradient: 'from-cyan-500/20 to-blue-400/15'
                  },
                  { 
                    id: 'leadership-stat', 
                    number: totalMembers.toString(), 
                    label: 'Leadership Team', 
                    icon: '👥',
                    gradient: 'from-indigo-500/20 to-blue-400/15'
                  },
                  { 
                    id: 'students-stat', 
                    number: '1000+', 
                    label: 'Students', 
                    icon: '🎓',
                    gradient: 'from-blue-500/20 to-indigo-400/15'
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
                    <motion.div 
                      className={`bg-gradient-to-br ${stat.gradient} backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 sm:p-8 border border-blue-300/20 hover:border-blue-300/40 transition-all duration-500 hover:bg-gradient-to-br hover:from-blue-400/15 hover:to-cyan-400/10 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10`}
                      whileHover={{ 
                        scale: 1.05,
                        y: -5
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div 
                        className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 filter drop-shadow-lg"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {stat.icon}
                      </motion.div>
                      <motion.div 
                        className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-100 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-blue-100/80 text-xs sm:text-sm lg:text-base font-medium group-hover:text-blue-50 transition-colors duration-300 leading-tight">
                        {stat.label}
                      </div>
                      
                      {/* Stat card decoration */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-cyan-400/25 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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