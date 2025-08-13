'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { OrgDatabase, type ExcoMember, type SectionWithMembers, type OrganizedMembers } from '@/lib/public/org'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

const slideInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const floatingAnimation = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
}

// Define a union type for animation variants
type AnimationVariant = typeof fadeInUp | typeof slideInLeft | typeof slideInRight | typeof scaleIn | typeof slideInUp;

export default function ITCOrgChart() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // State for organization data
  const [orgData, setOrgData] = useState<OrganizedMembers | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugMode, setDebugMode] = useState(false)

  // Fetch organization data on component mount
  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🏗️ Starting to fetch ITC organization data...')
        
        const data = await OrgDatabase.getITCSections()
        console.log('✅ ITC organization data fetched:', data)
        
        // Sort sections: advisor sections first, then others
        const sortedSections = [...data.sections].sort((a, b) => {
          const aIsAdvisor = OrgDatabase.isAdvisorSection(a.section.category)
          const bIsAdvisor = OrgDatabase.isAdvisorSection(b.section.category)
          
          if (aIsAdvisor && !bIsAdvisor) return -1
          if (!aIsAdvisor && bIsAdvisor) return 1
          return 0
        })
        
        // Sort members within each section by order field
        const sectionsWithSortedMembers = sortedSections.map(section => ({
          ...section,
          members: [...section.members].sort((a, b) => a.order - b.order)
        }))
        
        console.log('📊 Sorted sections with ordered members:', sectionsWithSortedMembers)
        
        setOrgData({ sections: sectionsWithSortedMembers })
        
        // Get organization stats for debugging
        if (process.env.NODE_ENV === 'development') {
          const stats = await OrgDatabase.getOrganizationStats('itc')
          console.log('📊 ITC organization statistics:', stats)
        }
        
      } catch (err) {
        console.error('❌ Error fetching organization data:', err)
        setError('Failed to load organization data')
      } finally {
        setLoading(false)
      }
    }

    fetchOrgData()
  }, [])

  
  const MemberCard = ({
    member,
    index,
    animationDelay = 0,
    variant = scaleIn,
    isAdvisor = false,
    isHead = false,
  }: {
    member: ExcoMember,
    index: number,
    animationDelay?: number,
    variant?: AnimationVariant,
    isAdvisor?: boolean,
    isHead?: boolean
  }) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    // Initialize image URL
    useEffect(() => {
      const processedUrl = OrgDatabase.getMemberImageUrl(member)
      setImageUrl(processedUrl)
      console.log(`🖼️ MemberCard for ${member.name} using URL:`, processedUrl)
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

    // Determine sizing based on role
    const sizing = isAdvisor 
      ? 'w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48' 
      : isHead
      ? 'w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40'
      : 'w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36'

    const padding = isAdvisor 
      ? 'p-8 sm:p-10' 
      : isHead
      ? 'p-6 sm:p-8'
      : 'p-5 sm:p-6'

    const textSizing = isAdvisor 
      ? { name: 'text-lg sm:text-xl lg:text-2xl', position: 'text-base sm:text-lg' }
      : isHead
      ? { name: 'text-base sm:text-lg lg:text-xl', position: 'text-sm sm:text-base' }
      : { name: 'text-sm sm:text-base lg:text-lg', position: 'text-xs sm:text-sm lg:text-base' }

    return (
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variant}
        transition={{ 
          duration: 0.8, 
          delay: animationDelay + (index * 0.1), 
          ease: [0.25, 0.1, 0.25, 1] 
        }}
        className="group relative"
      >
        <motion.div
          className="text-center transform transition-all duration-500 group-hover:scale-105"
          whileHover={{ y: -8 }}
          variants={floatingAnimation}
          animate="animate"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {/* Card Background with Gradient */}
          <div className={`absolute inset-0 backdrop-blur-sm rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 ${
            isAdvisor 
              ? 'bg-gradient-to-br from-white/90 via-white/70 to-white/50 scale-105' 
              : isHead
              ? 'bg-gradient-to-br from-white/85 via-white/65 to-white/45 scale-102'
              : 'bg-gradient-to-br from-white/80 via-white/60 to-white/40'
          }`} />
          
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className={`relative z-10 ${padding}`}>
            {/* Image Container with Enhanced Styling */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full blur-xl transform scale-110 opacity-0 group-hover:opacity-60 transition-all duration-500" />
              <motion.div
                className={`relative mx-auto flex items-center justify-center ${sizing}`}
                whileHover={{ rotate: isAdvisor ? 2 : isHead ? 3 : 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  {/* Loading placeholder */}
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {/* Enhanced image with better error handling */}
                  <img
                    src={imageUrl}
                    alt={member.name}
                    className={`w-full h-full object-cover object-center transition-all duration-500 shadow-lg group-hover:shadow-xl ${
                      isAdvisor 
                        ? 'ring-6 ring-white/60' 
                        : isHead
                        ? 'ring-5 ring-white/55'
                        : 'ring-4 ring-white/50 group-hover:ring-primary/30'
                    } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  
                  {/* Debug overlay - remove in production */}
                  {process.env.NODE_ENV === 'development' && debugMode && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {imageError ? '❌ Error' : imageLoaded ? '✅ Loaded' : '⏳ Loading'}
                    </div>
                  )}
                </div>
                
                {/* Special indicator for advisor */}
                {isAdvisor && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    ⭐ ADVISOR
                  </div>
                )}

                {/* Head indicator for section heads */}
                {isHead && !isAdvisor && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    👑 HEAD
                  </div>
                )}

                {/* Floating Accent for regular members */}
                {!isAdvisor && !isHead && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100" />
                )}
              </motion.div>
            </div>
            
            {/* Name and Position with Enhanced Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className={`font-karla font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors duration-300 ${textSizing.name}`}>
                {member.name}
              </h4>
              <p className={`font-karla font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-300 ${textSizing.position}`}>
                {member.position}
              </p>
              
              {/* Debug info for development */}
              {process.env.NODE_ENV === 'development' && debugMode && (
                <div className="mt-2 text-xs text-gray-500">
                  <p>ID: {member.id.slice(0, 8)}...</p>
                  <p>Category: {member.category}</p>
                  <p>Order: {member.order}</p>
                  <p>Is Head: {member.is_head ? 'Yes' : 'No'}</p>
                  <p>Image: {member.image ? '✅' : '❌'}</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  
  const renderSection = (sectionData: SectionWithMembers, sectionIndex: number) => {
    const isAdvisor = OrgDatabase.isAdvisorSection(sectionData.section.category);
    const sectionTitle = OrgDatabase.getSectionDisplayName(sectionData.section.category);
    const baseDelay = 0.8 + (sectionIndex * 0.8);

    console.log(`🏢 Rendering section: ${sectionTitle}`, {
      category: sectionData.section.category,
      isAdvisor,
      hasHead: !!sectionData.head,
      memberCount: sectionData.members.length
    });

    // Special handling for Advisor sections (larger display)
    if (isAdvisor && sectionData.head) {
      return (
        <motion.div
          key={sectionData.section.id}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={scaleIn}
          transition={{ duration: 1, delay: baseDelay, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center mb-16 sm:mb-20 lg:mb-24"
        >
          <MemberCard
            member={sectionData.head}
            index={0}
            animationDelay={baseDelay}
            variant={scaleIn}
            isAdvisor={true}
          />
        </motion.div>
      );
    }

    // Standard section rendering for all other sections (MT, RS, and others)
    return (
      <motion.div
        key={sectionData.section.id}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: baseDelay, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-16 sm:mb-20 lg:mb-24"
      >
        {/* Section Title */}
        <motion.h3 
          className="font-karla font-extrabold text-xl sm:text-2xl lg:text-3xl text-blue-600 text-center mb-12 sm:mb-16"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: baseDelay + 0.1 }}
        >
          {sectionTitle}
          {debugMode && (
            <span className="text-sm font-normal text-gray-500 block mt-2">
              ({sectionData.section.category} - Head: {sectionData.head ? '✅' : '❌'} - Members: {sectionData.members.length})
            </span>
          )}
        </motion.h3>
        
        {/* Section Head Display (if exists) */}
        {sectionData.head && (
          <motion.div
            className="flex justify-center mb-12 sm:mb-16"
            variants={scaleIn}
            transition={{ duration: 0.8, delay: baseDelay + 0.3 }}
          >
            <MemberCard
              member={sectionData.head}
              index={0}
              animationDelay={baseDelay + 0.3}
              variant={scaleIn}
              isHead={true}
            />
          </motion.div>
        )}

        {/* Section Members Grid (if any members exist) */}
        {sectionData.members.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-6 sm:gap-8"
            variants={staggerContainer}
          >
            {sectionData.members.map((member, index) => (
              <motion.div
                key={member.id}
                className="flex-shrink-0"
                variants={staggerContainer}
              >
                <MemberCard
                  member={member}
                  index={index}
                  animationDelay={baseDelay + 0.5}
                  variant={index % 2 === 0 ? slideInLeft : slideInRight}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <section id="itc" ref={ref} className="relative bg-gradient-to-br from-medium-gray via-medium-gray to-gray-100 py-16 sm:py-20 lg:py-24 xl:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600 text-lg">Loading organization chart...</p>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error || !orgData) {
    return (
      <section id="itc" ref={ref} className="relative bg-gradient-to-br from-medium-gray via-medium-gray to-gray-100 py-16 sm:py-20 lg:py-24 xl:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Organization Chart</h3>
            <p className="text-gray-600">{error || 'Please try again later'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  // No sections found
  if (orgData.sections.length === 0) {
    return (
      <section id="itc" ref={ref} className="relative bg-gradient-to-br from-medium-gray via-medium-gray to-gray-100 py-16 sm:bp-20 lg:py-24 xl:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Organization Data Found</h3>
            <p className="text-gray-600 mb-6">Please add sections and members to the ITC organization in the database.</p>
            <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto">
              <h4 className="font-semibold mb-2">Required Steps:</h4>
              <ol className="text-sm space-y-1 text-gray-600">
                <li>1. Create sections with <code className="bg-gray-200 px-1 rounded">organization_type = 'itc'</code></li>
                <li>2. Add members with categories matching your sections</li>
                <li>3. Set proper head references or is_head flags</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Calculate stats
  const totalMembers = orgData.sections.reduce((acc, section) => {
    return acc + (section.head ? 1 : 0) + section.members.length
  }, 0)

  const totalHeads = orgData.sections.filter(section => section.head).length

  return (
    <section id="itc" 
      ref={ref} 
      className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
      >
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl" />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-1/4 w-4 h-4 bg-primary/30 rounded-full"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-6 h-6 bg-primary/20 rounded-full"
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Debug Panel - only in development */}
        {process.env.NODE_ENV === 'development' && debugMode && (
          <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50 max-h-96 overflow-y-auto">
            <h4 className="font-bold mb-2">ITC Debug Info</h4>
            <div className="space-y-1">
              <p>Sections: {orgData?.sections.length || 0}</p>
              <p>Total Members: {totalMembers}</p>
              <p>Section Heads: {totalHeads}</p>
              {orgData?.sections.map(section => (
                <div key={section.section.id} className="border-t border-gray-600 pt-1 mt-1">
                  <p className="font-semibold">{section.section.category}</p>
                  <p className="text-gray-300">Head: {section.head ? '✅' : '❌'}</p>
                  <p className="text-gray-300">Members: {section.members.length}</p>
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
        
        {/* Enhanced Title Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="inline-block relative"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-section-title text-blue-600 relative z-10">
              Organization Chart of ITC
            </h2>
            
            {/* Debug toggle button */}
            {/*{process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => setDebugMode(!debugMode)}
                className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-primary/20 text-primary text-xs px-2 py-1 rounded hover:bg-primary/30 transition-colors"
              >
                Debug
              </button>
            )}*/}
            
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
          <motion.p
            className="text-gray-600 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl mx-auto font-karla"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Meet our dedicated team leading the Information Technology Club
          </motion.p>
        </motion.div>

        {/* Render all ITC sections dynamically */}
        {orgData.sections.map((sectionData, sectionIndex) => 
          renderSection(sectionData, sectionIndex)
        )}

        {/* Enhanced Statistics Section */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-6 mt-16 sm:mt-20"
        >
          {[
            { 
              id: 'sections-stat', 
              number: orgData.sections.length.toString(), 
              label: 'Sections', 
              icon: '📁' 
            },
            { 
              id: 'heads-stat', 
              number: totalHeads.toString(), 
              label: 'Section Heads', 
              icon: '👨‍💼' 
            },
            { 
              id: 'members-stat', 
              number: totalMembers.toString(), 
              label: 'Total Members', 
              icon: '👥' 
            },
            { 
              id: 'projects-stat', 
              number: '15+', 
              label: 'Projects', 
              icon: '🚀' 
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.id}
              variants={scaleIn}
              transition={{
                duration: 0.6,
                delay: 2 + (index * 0.1),
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="text-center group"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:bg-white group-hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium group-hover:text-gray-700 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}