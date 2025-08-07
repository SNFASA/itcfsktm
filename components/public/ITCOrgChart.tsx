'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

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
      ease: "easeInOut"
    }
  }
}

export default function ITCOrgChart() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Updated data structure with proper names and positions
  const excoMembers = [
    { id: 'president', name: 'PRESIDENT', position: 'Yang Dipertua' },
    { id: 'vicepresident', name: 'VICE PRESIDENT', position: 'Naib Yang Dipertua' },
    { id: 'secretary', name: 'SECRETARY', position: 'Setiausaha' },
    { id: 'treasurer', name: 'TREASURER', position: 'Bendahari' },
    { id: 'committee', name: 'COMMITTEE MEMBER', position: 'Ahli Jawatankuasa' },
  ]

  const sportsMembers = [
    { id: 'sport1', name: 'AJK SUKAN 1', position: 'Ahli Jawatankuasa Sukan' },
    { id: 'sport2', name: 'AJK SUKAN 2', position: 'Ahli Jawatankuasa Sukan' },
    { id: 'sport3', name: 'AJK SUKAN 3', position: 'Ahli Jawatankuasa Sukan' },
    { id: 'sport4', name: 'AJK SUKAN 4', position: 'Ahli Jawatankuasa Sukan' },
  ]

  const mediaMembers = [
    { id: 'media1', name: 'AJK MEDIA 1', position: 'Ahli Jawatankuasa Media' },
    { id: 'media2', name: 'AJK MEDIA 2', position: 'Ahli Jawatankuasa Media' },
    { id: 'media3', name: 'AJK MEDIA 3', position: 'Ahli Jawatankuasa Media' },
    { id: 'media4', name: 'AJK MEDIA 4', position: 'Ahli Jawatankuasa Media' },
  ]

  const MemberCard = ({
    member,
    index,
    animationDelay = 0,
    variant = scaleIn,
  }: {
    member: { name: string; position: string },
    index: number,
    animationDelay?: number,
    variant?: typeof scaleIn
  }) => (
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
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-sm rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105" />
        
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 p-6 sm:p-8">
          {/* Image Container with Enhanced Styling */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full blur-xl transform scale-110 opacity-0 group-hover:opacity-60 transition-all duration-500" />
            <motion.div
              className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 flex items-center justify-center"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/avata1.png"
                alt={member.name}
                width={160}
                height={160}
                className="rounded-full object-cover object-center w-full h-full ring-4 ring-white/50 group-hover:ring-primary/30 transition-all duration-500 shadow-lg group-hover:shadow-xl"
              />
              
              {/* Floating Accent */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100" />
            </motion.div>
          </div>
          
          {/* Name and Position with Enhanced Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-karla font-bold text-sm sm:text-base lg:text-lg text-primary mb-2 group-hover:text-primary/90 transition-colors duration-300">
              {member.name}
            </h4>
            <p className="font-karla font-medium text-xs sm:text-sm lg:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              {member.position}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <section id="itc" ref={ref} className="relative bg-gradient-to-br from-medium-gray via-medium-gray to-gray-100 py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-primary/3 rounded-full blur-3xl" />
        
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" ref={ref}>
        
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
            <h2 className="font-karla font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-section-title text-primary relative z-10">
              Organization Chart of ITC
            </h2>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
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

        {/* Advisor Section with Enhanced Styling */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={scaleIn}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="relative group">
            {/* Special Advisor Card Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-sm rounded-3xl shadow-2xl transform scale-105" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl" />
            
            <div className="relative z-10 p-8 sm:p-10 text-center">
              <motion.div
                className="relative mb-8 flex justify-center"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/50 rounded-full blur-2xl transform scale-125 opacity-30" />
                <Image
                  src="/images/avata1.png"
                  alt="Advisor"
                  width={180}
                  height={180}
                  className="rounded-full object-cover object-center ring-6 ring-white/60 shadow-2xl relative z-10 mx-auto"
                />
                
                {/* Crown Icon for Advisor */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V11a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM15 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4z" />
                  </svg>
                </div>
              </motion.div>
              
              <h3 className="font-karla font-bold text-lg sm:text-xl lg:text-2xl text-primary mb-2">
                PROF. Ts. Dr. MOHD FARHAN BIN MD. FUDZEE
              </h3>
              <p className="font-karla font-medium text-base sm:text-lg text-gray-600">
                Penasihat Kelab
              </p>
            </div>
          </div>
        </motion.div>

        {/* Executive Committee with Staggered Animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <motion.h3 
            className="font-karla font-extrabold text-xl sm:text-2xl lg:text-3xl text-primary text-center mb-12 sm:mb-16"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Executive Committee
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
            {excoMembers.map((member, index) => (
              <MemberCard
                key={member.id}
                member={member}
                index={index}
                animationDelay={1.0}
                variant={index % 2 === 0 ? slideInLeft : slideInRight}
              />
            ))}
          </div>
        </motion.div>

        {/* Sports Section with Enhanced Layout */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <motion.h3 
            className="font-karla font-extrabold text-xl sm:text-2xl lg:text-3xl text-primary text-center mb-12 sm:mb-16"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Exco Sukan
          </motion.h3>
          
          {/* Sports Head */}
          <motion.div
            className="flex justify-center mb-12 sm:mb-16"
            variants={scaleIn}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <MemberCard
              member={{ name: 'KETUA SUKAN', position: 'Ketua Bahagian Sukan' }}
              index={0}
              animationDelay={1.8}
            />
          </motion.div>

          {/* Sports Members */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center"
            variants={staggerContainer}
          >
            {sportsMembers.map((member, index) => (
              <MemberCard
                key={member.id}
                member={member}
                index={index}
                animationDelay={2.0}
                variant={slideInUp}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Media Section with Enhanced Layout */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.h3 
            className="font-karla font-extrabold text-xl sm:text-2xl lg:text-3xl text-primary text-center mb-12 sm:mb-16"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            Exco Media
          </motion.h3>
          
          {/* Media Head */}
          <motion.div
            className="flex justify-center mb-12 sm:mb-16"
            variants={scaleIn}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            <MemberCard
              member={{ name: 'KETUA MEDIA', position: 'Ketua Bahagian Media' }}
              index={0}
              animationDelay={2.8}
            />
          </motion.div>

          {/* Media Members */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center"
            variants={staggerContainer}
          >
            {mediaMembers.map((member, index) => (
              <MemberCard
                key={member.id}
                member={member}
                index={index}
                animationDelay={3.0}
                variant={slideInUp}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Call to Action */}

      </div>
    </section>
  )
}