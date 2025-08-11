// org.ts - Complete Database operations for organization members
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Type definitions
export interface ExcoMember {
  id: string
  name: string
  position: string
  image?: string
  category: string
  is_head: boolean
  order: number
}

export interface ExcoSection {
  id: string
  category: string
  head?: string
  organization_type: string
}

export interface SectionWithMembers {
  section: ExcoSection
  head?: ExcoMember
  members: ExcoMember[]
}

export interface OrganizedMembers {
  sections: SectionWithMembers[]
}

// Database operations
export class OrgDatabase {
  
  // Helper function to get section ordering priority
  static getSectionOrderPriority(category: string): number {
    if (this.isAdvisorSection(category)) return 1;
    if (this.isMTSection(category)) return 2;
    if (this.isRSSection(category)) return 3;
    return 4; // Other sections come last
  }
  
  // Generic method to fetch sections by organization type with proper ordering
  static async getOrganizationSections(organizationType: string): Promise<OrganizedMembers> {
    try {
      console.log(`Fetching organization sections for: ${organizationType}`)
      
      // First, get all sections for the specified organization
      const { data: sections, error: sectionsError } = await supabase
        .from('excosection')
        .select('*')
        .eq('organization_type', organizationType)
        .order('category')

      if (sectionsError) {
        console.error(`Error fetching ${organizationType} sections:`, sectionsError)
        throw sectionsError
      }

      console.log(`Found ${sections?.length || 0} sections for ${organizationType}:`, sections)

      if (!sections || sections.length === 0) {
        console.warn(`No sections found for organization type: ${organizationType}`)
        return { sections: [] }
      }

      // Get all categories for this organization
      const categories = sections.map(section => section.category)
      console.log(`Categories for ${organizationType}:`, categories)

      // Fetch all members for these categories
      const { data: allMembers, error: membersError } = await supabase
        .from('excomember')
        .select('*')
        .in('category', categories)
        .order('order', { ascending: true })

      if (membersError) {
        console.error(`Error fetching ${organizationType} members:`, membersError)
        throw membersError
      }

      console.log(`Found ${allMembers?.length || 0} members for ${organizationType}:`, allMembers)

      // Organize data by sections
      const organizedSections: SectionWithMembers[] = []

      for (const section of sections) {
        console.log(`Processing section: ${section.category}`, section)
        
        const sectionMembers = (allMembers || []).filter(
          member => member.category === section.category
        )
        
        console.log(`Members in ${section.category}:`, sectionMembers)

        // Find head member - check section.head first, then is_head flag
        let headMember: ExcoMember | undefined
        
        if (section.head) {
          headMember = sectionMembers.find(member => member.id === section.head)
          console.log(`Head found by section.head reference:`, headMember)
        }
        
        if (!headMember) {
          headMember = sectionMembers.find(member => member.is_head)
          console.log(`Head found by is_head flag:`, headMember)
        }

        // Get non-head members
        const nonHeadMembers = sectionMembers.filter(
          member => member.id !== headMember?.id
        )

        console.log(`Final section data for ${section.category}:`, {
          head: headMember,
          members: nonHeadMembers
        })

        organizedSections.push({
          section,
          head: headMember,
          members: nonHeadMembers
        })
      }

      // Sort sections by priority: Advisor → MT → RS → Others
      const sortedSections = organizedSections.sort((a, b) => {
        const priorityA = this.getSectionOrderPriority(a.section.category);
        const priorityB = this.getSectionOrderPriority(b.section.category);
        return priorityA - priorityB;
      });

      console.log(`Final organized sections for ${organizationType} (sorted):`, sortedSections)
      return { sections: sortedSections }

    } catch (error) {
      console.error(`Failed to fetch ${organizationType} sections:`, error)
      return { sections: [] }
    }
  }

  // Fetch all Dean sections with their members
  static async getDeanSections(): Promise<OrganizedMembers> {
    return this.getOrganizationSections('dean')
  }

  // Fetch all ITC sections with their members
  static async getITCSections(): Promise<OrganizedMembers> {
    return this.getOrganizationSections('itc')
  }

  // Fetch members by category (for specific organization)
  static async getMembersByCategory(category: string, organizationType: string = 'itc'): Promise<ExcoMember[]> {
    try {
      // First check if this category exists for the organization
      const { data: section, error: sectionError } = await supabase
        .from('excosection')
        .select('*')
        .eq('category', category)
        .eq('organization_type', organizationType)
        .single()

      if (sectionError || !section) {
        console.log(`No section found for category ${category} in ${organizationType}`)
        return []
      }

      // Fetch members for this category
      const { data, error } = await supabase
        .from('excomember')
        .select('*')
        .eq('category', category)
        .order('order', { ascending: true })

      if (error) {
        console.error(`Error fetching ${category} members:`, error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error(`Failed to fetch ${category} members:`, error)
      return []
    }
  }

  // Add a new section
  static async addSection(section: Omit<ExcoSection, 'id'>): Promise<ExcoSection | null> {
    try {
      const { data, error } = await supabase
        .from('excosection')
        .insert([section])
        .select()
        .single()

      if (error) {
        console.error('Error adding section:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to add section:', error)
      return null
    }
  }

  // Add a new member
  static async addMember(member: Omit<ExcoMember, 'id'>): Promise<ExcoMember | null> {
    try {
      const { data, error } = await supabase
        .from('excomember')
        .insert([member])
        .select()
        .single()

      if (error) {
        console.error('Error adding member:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to add member:', error)
      return null
    }
  }

  // Update a member
  static async updateMember(id: string, updates: Partial<Omit<ExcoMember, 'id'>>): Promise<ExcoMember | null> {
    try {
      const { data, error } = await supabase
        .from('excomember')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating member:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to update member:', error)
      return null
    }
  }

  // Update section head
  static async updateSectionHead(sectionId: string, headMemberId: string | null): Promise<ExcoSection | null> {
    try {
      const { data, error } = await supabase
        .from('excosection')
        .update({ head: headMemberId })
        .eq('id', sectionId)
        .select()
        .single()

      if (error) {
        console.error('Error updating section head:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to update section head:', error)
      return null
    }
  }

  // Delete a member
  static async deleteMember(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('excomember')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting member:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Failed to delete member:', error)
      return false
    }
  }

  // Delete a section
  static async deleteSection(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('excosection')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting section:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Failed to delete section:', error)
      return false
    }
  }

  // Upload image to Supabase storage
  static async uploadMemberImage(file: File, memberId: string): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${memberId}_${Date.now()}.${fileExt}`
      const filePath = `member-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('organization')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Error uploading image:', uploadError)
        throw uploadError
      }

      // Get public URL
      const { data } = supabase.storage
        .from('organization')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Failed to upload image:', error)
      return null
    }
  }

  // Delete image from Supabase storage
  static async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/')
      const filePath = urlParts.slice(-2).join('/')

      const { error } = await supabase.storage
        .from('organization')
        .remove([filePath])

      if (error) {
        console.error('Error deleting image:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Failed to delete image:', error)
      return false
    }
  }

  // IMPROVED: Get default avatar with fallback options
  static getDefaultAvatar(): string {
    // Try multiple fallback options
    const fallbacks = [
      '/images/avata1.jpg',
      '/images/avatar2.jpg',
      '/images/default-avatar.png',
      'https://via.placeholder.com/150/e2e8f0/64748b?text=👤'
    ]
    
    // For now, return the first option but you can enhance this to test which exists
    return fallbacks[0]
  }

  // Helper function to validate if URL is accessible
  static async isImageUrlValid(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      })
      return response.ok
    } catch (error) {
      console.warn(`Image URL validation failed for: ${url}`, error)
      return false
    }
  }

  // IMPROVED: Enhanced image URL processing with comprehensive logging
  static getMemberImageUrl(member: ExcoMember): string {
    console.log(`🖼️ Processing image for ${member.name}:`, {
      rawImage: member.image,
      category: member.category,
      position: member.position
    })

    if (!member.image || member.image.trim() === '' || member.image === 'null' || member.image === 'undefined') {
      console.log(`❌ No valid image URL for ${member.name}, using default`)
      return this.getDefaultAvatar()
    }

    const imageUrl = member.image.trim()
    console.log(`🔍 Raw image URL for ${member.name}:`, imageUrl)

    try {
      // Handle relative paths (local images)
      if (!imageUrl.startsWith('http') && !imageUrl.startsWith('//') && !imageUrl.startsWith('data:')) {
        const publicUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
        console.log(`📁 Converted relative path for ${member.name}:`, publicUrl)
        return publicUrl
      }

      // Handle data URLs (base64 images)
      if (imageUrl.startsWith('data:image/')) {
        console.log(`📊 Data URL detected for ${member.name}`)
        return imageUrl
      }

      const url = new URL(imageUrl)
      console.log(`🌐 Parsed URL for ${member.name}:`, {
        hostname: url.hostname,
        pathname: url.pathname,
        search: url.search
      })

      // Handle Google Photos links - these don't work for direct embedding
      if (url.hostname.includes('photos.app.goo.gl') || 
          url.hostname.includes('photos.google.com') ||
          (url.hostname.includes('lh3.googleusercontent.com') && url.pathname.includes('photos'))) {
        console.warn(`🚫 Google Photos link detected for ${member.name}. These don't work for direct embedding.`)
        return this.getDefaultAvatar()
      }

      // Handle Google Drive links - convert to direct link format
      if (url.hostname.includes('drive.google.com')) {
        const fileId = this.extractGoogleDriveFileId(imageUrl)
        if (fileId) {
          const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
          console.log(`🔄 Converted Google Drive URL for ${member.name}:`, directUrl)
          return directUrl
        }
        console.warn(`❌ Could not extract file ID from Google Drive URL for ${member.name}`)
        return this.getDefaultAvatar()
      }

      // Handle Dropbox links
      if (url.hostname.includes('dropbox.com')) {
        let directUrl = imageUrl.replace('dropbox.com', 'dl.dropboxusercontent.com')
        if (directUrl.includes('?dl=0')) {
          directUrl = directUrl.replace('?dl=0', '')
        }
        console.log(`🔄 Converted Dropbox URL for ${member.name}:`, directUrl)
        return directUrl
      }

      // Handle OneDrive links - these are tricky to convert
      if (url.hostname.includes('1drv.ms') || url.hostname.includes('onedrive.live.com')) {
        console.warn(`🚫 OneDrive link detected for ${member.name}. Please use a direct image URL.`)
        return this.getDefaultAvatar()
      }

      // Handle Supabase storage URLs
      if (url.hostname.includes('supabase')) {
        console.log(`✅ Supabase storage URL for ${member.name}:`, imageUrl)
        return imageUrl
      }

      // Handle common image hosting services
      if (url.hostname.includes('imgur.com')) {
        // Ensure we're using the direct image URL
        if (!imageUrl.includes('.jpg') && !imageUrl.includes('.png') && !imageUrl.includes('.gif') && !imageUrl.includes('.webp')) {
          const directUrl = imageUrl.replace('imgur.com/', 'i.imgur.com/') + '.jpg'
          console.log(`🔄 Converted Imgur URL for ${member.name}:`, directUrl)
          return directUrl
        }
      }

      // Handle GitHub URLs
      if (url.hostname.includes('github.com') || url.hostname.includes('githubusercontent.com')) {
        if (url.hostname === 'github.com' && imageUrl.includes('/blob/')) {
          const directUrl = imageUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/')
          console.log(`🔄 Converted GitHub URL for ${member.name}:`, directUrl)
          return directUrl
        }
      }

      // For other URLs, validate they look like image URLs
      if (this.isValidImageUrl(imageUrl)) {
        console.log(`✅ Valid image URL for ${member.name}:`, imageUrl)
        return imageUrl
      } else {
        console.warn(`❌ URL doesn't appear to be a direct image link for ${member.name}:`, imageUrl)
        return this.getDefaultAvatar()
      }

    } catch (error) {
      console.error(`❌ Invalid URL format for member ${member.name}:`, imageUrl, error)
      return this.getDefaultAvatar()
    }
  }

  // IMPROVED: Enhanced image URL validation with detailed logging
  private static isValidImageUrl(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.avif', '.jfif']
    const lowerUrl = url.toLowerCase()
    
    // Check if URL ends with image extension
    const hasImageExtension = imageExtensions.some(ext => lowerUrl.includes(ext))
    
    // Check if URL contains image-like patterns (including query parameters)
    const hasImagePattern = /\.(jpg|jpeg|png|gif|webp|bmp|svg|avif|jfif)(\?|#|$|&)/i.test(lowerUrl)
    
    // Allow Supabase storage URLs
    const isSupabaseStorage = lowerUrl.includes('supabase') && lowerUrl.includes('storage')
    
    // Allow common CDN patterns
    const isCdnPattern = /\/(images?|media|assets|uploads?|files?)\//i.test(lowerUrl)
    
    // Allow direct image serving domains
    const isImageDomain = /\.(imgur|cloudinary|imagekit|unsplash|pexels|pixabay)\./.test(lowerUrl)
    
    // Allow base64 data URLs
    const isDataUrl = lowerUrl.startsWith('data:image/')
    
    // Allow placeholder services
    const isPlaceholder = lowerUrl.includes('placeholder.com') || lowerUrl.includes('picsum.photos')
    
    const isValid = hasImageExtension || hasImagePattern || isSupabaseStorage || isCdnPattern || isImageDomain || isDataUrl || isPlaceholder
    
    console.log(`🔍 Image validation for ${url}:`, {
      hasImageExtension,
      hasImagePattern,
      isSupabaseStorage,
      isCdnPattern,
      isImageDomain,
      isDataUrl,
      isPlaceholder,
      isValid
    })
    
    return isValid
  }

  // IMPROVED: Better Google Drive file ID extraction with more patterns
  private static extractGoogleDriveFileId(url: string): string | null {
    console.log(`🔍 Extracting Google Drive file ID from: ${url}`)
    
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9-_]+)/,
      /[?&]id=([a-zA-Z0-9-_]+)/,
      /\/d\/([a-zA-Z0-9-_]+)/,
      /drive\.google\.com\/.*\/([a-zA-Z0-9-_]{25,})/,
      /docs\.google\.com\/.*\/d\/([a-zA-Z0-9-_]+)/
    ]

    for (const pattern of patterns) {
      const match = pattern.exec(url)
      if (match?.[1] && match[1].length >= 25) {
        console.log(`✅ Extracted file ID: ${match[1]}`)
        return match[1]
      }
    }
    
    console.warn(`❌ Could not extract Google Drive file ID from: ${url}`)
    return null
  }

  // Helper function to get section display name
  static getSectionDisplayName(category: string): string {
    const displayNames: Record<string, string> = {
      // Dean organization
      'dean': 'Dean',
      'dekan': 'Dekan',
      'deputy_dean': 'Deputy Dean',
      'timbalan_dekan': 'Timbalan Dekan',
      'faculty_leadership': 'Faculty Leadership',
      'kepimpinan_fakulti': 'Kepimpinan Fakulti',
      
      // ITC organization
      'advisor': 'Advisor',
      'adviser': 'Advisor', 
      'penasihat': 'Penasihat Kelab',
      'mt': 'Majlis Tertinggi',
      'majlis tertinggi itc': 'Majlis Tertinggi',
      'majlis tertinggi': 'Majlis Tertinggi',
      'rakan strategik': 'Rakan Strategik',
      'rakan strategik itc': 'Rakan Strategik',
      'executive': 'Executive Committee',
      'exco': 'Executive Committee',
      'sports': 'Exco Sukan',
      'sukan': 'Exco Sukan',
      'media': 'Exco Media',
      'publikasi': 'Exco Publikasi',
      'technical': 'Exco Technical',
      'teknikal': 'Exco Teknikal'
    }

    const displayName = displayNames[category.toLowerCase()] || 
                       category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ')
    
    console.log(`📝 Display name for category '${category}': '${displayName}'`)
    return displayName
  }

  // Helper function to check if section is advisor type
  static isAdvisorSection(category: string): boolean {
    const advisorCategories = ['advisor', 'adviser', 'penasihat'];
    return advisorCategories.includes(category.toLowerCase());
  }

  // Helper function to check if section is MT ITC
  static isMTSection(category: string): boolean {
    const MTCategories = ['mt', 'majlis tertinggi itc', 'majlis tertinggi'];
    return MTCategories.includes(category.toLowerCase());
  }

  // Helper function to check if section is RS
  static isRSSection(category: string): boolean {
    const RSCategories = ['rakan strategik', 'rakan strategik itc', 'strategic partner'];
    return RSCategories.includes(category.toLowerCase());
  }

  // NEW: Method to test image loading with detailed results
  static async testImageLoad(url: string): Promise<{ success: boolean, error?: string, timing?: number }> {
    const startTime = Date.now()
    
    return new Promise((resolve) => {
      if (!url || url.trim() === '') {
        resolve({ success: false, error: 'No URL provided' })
        return
      }

      const img = new Image()
      const timeout = setTimeout(() => {
        const timing = Date.now() - startTime
        resolve({ success: false, error: 'Timeout after 10 seconds', timing })
      }, 10000)

      img.onload = () => {
        clearTimeout(timeout)
        const timing = Date.now() - startTime
        resolve({ success: true, timing })
      }

      img.onerror = (error) => {
        clearTimeout(timeout)
        const timing = Date.now() - startTime
        resolve({ success: false, error: `Load failed: ${error}`, timing })
      }

      // Set CORS to anonymous to handle cross-origin images
      img.crossOrigin = 'anonymous'
      img.src = url
    })
  }

  // Helper function to preload images
  static preloadImage(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.crossOrigin = 'anonymous'
      img.src = src
    })
  }

  // Batch validate member images
  static async validateMemberImages(members: ExcoMember[]): Promise<Map<string, boolean>> {
    const validationResults = new Map<string, boolean>()
    
    const validationPromises = members.map(async (member) => {
      if (!member.image) {
        validationResults.set(member.id, true) // Default avatar is always valid
        return
      }
      
      const imageUrl = this.getMemberImageUrl(member)
      const isValid = await this.preloadImage(imageUrl)
      validationResults.set(member.id, isValid)
    })

    await Promise.allSettled(validationPromises)
    return validationResults
  }

  // NEW: Comprehensive image diagnostics for debugging
  static async diagnoseImageIssues(member: ExcoMember): Promise<any> {
    const rawUrl = member.image || ''
    const processedUrl = this.getMemberImageUrl(member)
    const defaultAvatar = this.getDefaultAvatar()

    const diagnostics = {
      member: {
        name: member.name,
        id: member.id,
        rawImageValue: rawUrl,
        category: member.category,
        position: member.position
      },
      urls: {
        raw: rawUrl,
        processed: processedUrl,
        default: defaultAvatar,
        isUsingDefault: processedUrl === defaultAvatar,
        isRelativePath: !rawUrl.startsWith('http') && !rawUrl.startsWith('//') && !rawUrl.startsWith('data:'),
        isDataUrl: rawUrl.startsWith('data:'),
        isGoogleDrive: rawUrl.includes('drive.google.com'),
        isDropbox: rawUrl.includes('dropbox.com')
      },
      tests: {
        raw: rawUrl ? await this.testImageLoad(rawUrl) : { success: false, error: 'No raw URL' },
        processed: await this.testImageLoad(processedUrl),
        default: await this.testImageLoad(defaultAvatar)
      }
    }

    console.log(`🔍 Complete image diagnostics for ${member.name}:`, diagnostics)
    return diagnostics
  }

  // NEW: Batch diagnose all members in an organization
  static async diagnoseAllImages(organizationType: string): Promise<Map<string, any>> {
    const orgData = await this.getOrganizationSections(organizationType)
    const allMembers: ExcoMember[] = []
    
    orgData.sections.forEach(section => {
      if (section.head) allMembers.push(section.head)
      allMembers.push(...section.members)
    })
    
    const diagnostics = new Map()
    
    for (const member of allMembers) {
      const memberDiagnostics = await this.diagnoseImageIssues(member)
      diagnostics.set(member.id, memberDiagnostics)
    }
    
    return diagnostics
  }

  // NEW: Get organization statistics
  static async getOrganizationStats(organizationType: string): Promise<any> {
    try {
      const orgData = await this.getOrganizationSections(organizationType)
      
      let totalMembers = 0
      let totalHeads = 0
      let membersWithImages = 0
      let workingImages = 0
      
      for (const section of orgData.sections) {
        if (section.head) {
          totalHeads++
          totalMembers++
          if (section.head.image) membersWithImages++
        }
        
        totalMembers += section.members.length
        membersWithImages += section.members.filter(m => m.image).length
      }
      
      return {
        organizationType,
        totalSections: orgData.sections.length,
        totalMembers,
        totalHeads,
        membersWithImages,
        membersWithoutImages: totalMembers - membersWithImages,
        sections: orgData.sections.map(s => ({
          category: s.section.category,
          hasHead: !!s.head,
          memberCount: s.members.length,
          membersWithImages: s.members.filter(m => m.image).length,
          priority: this.getSectionOrderPriority(s.section.category)
        }))
      }
    } catch (error) {
      console.error(`Error getting stats for ${organizationType}:`, error)
      return null
    }
  }
}