// itcOrg.ts
import { 
  ExcoSection, 
  ExcoCategory, 
  ExcoMemberDB, 
  ExcoSectionDB, 
  ExcoSectionWithHead,
  CreateExcoMember,
  CreateExcoSection,
  OrganizationType 
} from '@/lib/public/types'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Function to fetch ITC organization data from Supabase
export async function fetchItcOrg(): Promise<ExcoSection[]> {
  try {
    // Fetch all members (no organization_type filter since it's not in the schema)
    const { data: members, error: membersError } = await supabase
      .from('excomember')
      .select('*')
      .order('category', { ascending: true })
      .order('order', { ascending: true })

    if (membersError) {
      throw new Error(`Error fetching members: ${membersError.message}`)
    }

    if (!members || members.length === 0) {
      return []
    }

    // Group members by category with proper typing
    const groupedMembers = (members as ExcoMemberDB[]).reduce((acc, member) => {
      const category = member.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(member)
      return acc
    }, {} as Record<string, ExcoMemberDB[]>)

    // Transform to ExcoSection format
    const sections: ExcoSection[] = Object.entries(groupedMembers).map(([category, categoryMembers]) => {
      // Find the head (is_head = true)
      const headMember = categoryMembers.find((member: ExcoMemberDB) => member.is_head === true)
      
      // Get non-head members
      const regularMembers = categoryMembers.filter((member: ExcoMemberDB) => member.is_head !== true)

      const section: ExcoSection = {
        category: category,
        members: regularMembers.map((member: ExcoMemberDB) => ({
          id: member.id,
          name: member.name,
          position: member.position,
          image: member.image || '/images/avata1.png'
        }))
      }

      // Add head if exists
      if (headMember) {
        section.head = {
          id: headMember.id,
          name: headMember.name,
          position: headMember.position,
          image: headMember.image || '/images/avata1.png'
        }
      }

      return section
    })

    return sections

  } catch (error) {
    console.error('Error fetching ITC organization data:', error)
    return []
  }
}

// Alternative approach: Fetch using sections table with joins
export async function fetchItcOrgWithSections(): Promise<ExcoSection[]> {
  try {
    // Fetch sections for ITC organization
    const { data: sections, error: sectionsError } = await supabase
      .from('excosection')
      .select(`
        *,
        head:excomember!excosection_head_fkey(*)
      `)
      .eq('organization_type', 'itc')

    if (sectionsError) {
      throw new Error(`Error fetching sections: ${sectionsError.message}`)
    }

    // Fetch all members for each section with proper typing
    const { data: allMembers, error: membersError } = await supabase
      .from('excomember')
      .select('*')
      .order('order', { ascending: true })

    if (membersError) {
      throw new Error(`Error fetching members: ${membersError.message}`)
    }

    // Transform to ExcoSection format with proper typing
    const result: ExcoSection[] = sections?.map((section: ExcoSectionWithHead) => {
      // Filter members for this category (excluding head) with proper typing
      const categoryMembers = (allMembers as ExcoMemberDB[])?.filter((member: ExcoMemberDB) => 
        member.category === section.category && 
        member.is_head !== true
      ) || []

      const excoSection: ExcoSection = {
        category: section.category,
        members: categoryMembers.map((member: ExcoMemberDB) => ({
          id: member.id,
          name: member.name,
          position: member.position,
          image: member.image || '/images/avata1.png'
        }))
      }

      // Add head if exists
      if (section.head) {
        excoSection.head = {
          id: section.head.id,
          name: section.head.name,
          position: section.head.position,
          image: section.head.image || '/images/avata1.png'
        }
      }

      return excoSection
    }) || []

    return result

  } catch (error) {
    console.error('Error fetching ITC organization data with sections:', error)
    return []
  }
}

// Function to insert/update member data (for admin purposes)
export async function upsertExcoMember(member: CreateExcoMember) {
  try {
    const { data, error } = await supabase
      .from('excomember')
      .upsert(member)
      .select()

    if (error) {
      throw new Error(`Error upserting member: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error upserting member:', error)
    throw error
  }
}

// Function to create/update section
export async function upsertExcoSection(section: CreateExcoSection) {
  try {
    const { data, error } = await supabase
      .from('excosection')
      .upsert(section)
      .select()

    if (error) {
      throw new Error(`Error upserting section: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error upserting section:', error)
    throw error
  }
}

// Additional utility functions

// Function to get all ITC members only
export async function fetchItcMembers(): Promise<ExcoMemberDB[]> {
  try {
    const { data: members, error } = await supabase
      .from('excomember')
      .select('*')
      .order('category', { ascending: true })
      .order('order', { ascending: true })

    if (error) {
      throw new Error(`Error fetching members: ${error.message}`)
    }

    return (members as ExcoMemberDB[]) || []
  } catch (error) {
    console.error('Error fetching ITC members:', error)
    return []
  }
}

// Function to get members by category
export async function fetchMembersByCategory(category: string): Promise<ExcoMemberDB[]> {
  try {
    const { data: members, error } = await supabase
      .from('excomember')
      .select('*')
      .eq('category', category)
      .order('order', { ascending: true })

    if (error) {
      throw new Error(`Error fetching members for category ${category}: ${error.message}`)
    }

    return (members as ExcoMemberDB[]) || []
  } catch (error) {
    console.error(`Error fetching members for category ${category}:`, error)
    return []
  }
}

// Function to get section heads only
export async function fetchSectionHeads(): Promise<ExcoMemberDB[]> {
  try {
    const { data: members, error } = await supabase
      .from('excomember')
      .select('*')
      .eq('is_head', true)
      .order('category', { ascending: true })

    if (error) {
      throw new Error(`Error fetching section heads: ${error.message}`)
    }

    return (members as ExcoMemberDB[]) || []
  } catch (error) {
    console.error('Error fetching section heads:', error)
    return []
  }
}

// Function to delete member
export async function deleteExcoMember(memberId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('excomember')
      .delete()
      .eq('id', memberId)

    if (error) {
      throw new Error(`Error deleting member: ${error.message}`)
    }

    return true
  } catch (error) {
    console.error('Error deleting member:', error)
    return false
  }
}

// Function to delete section
export async function deleteExcoSection(sectionId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('excosection')
      .delete()
      .eq('id', sectionId)

    if (error) {
      throw new Error(`Error deleting section: ${error.message}`)
    }

    return true
  } catch (error) {
    console.error('Error deleting section:', error)
    return false
  }
}

// Default export for backward compatibility
// Use fetchItcOrg() in your components instead
const itcOrg: ExcoSection[] = []

export default itcOrg