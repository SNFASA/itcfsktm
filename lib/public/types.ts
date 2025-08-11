// types.ts

// Database-aligned types
export type OrganizationType = 'dean' | 'itc'

// ExcoCategory should match what's actually stored in your database
// Remove the strict typing to allow any string since categories come from database
export type ExcoCategory = string

// Commonly used categories (for reference, but not enforced)
export const COMMON_EXCO_CATEGORIES = [
  'Exco MT',
  'Exco Sukan',
  'Exco Media',
  'Exco Akademik',
  'Exco Kebajikan',
  'Exco Keusahawanan',
  'Exco Kerohanian',
  'Exco Luar',
  'Exco Penerbitan',
  'Exco ICT'
] as const

// Member interface for frontend use
export interface Member {
  id: string
  name: string
  position: string
  image?: string
}

// ExcoSection interface for frontend use  
export interface ExcoSection {
  category: ExcoCategory
  head?: Member
  members: Member[]
}

// Database table interfaces (matching your Supabase schema)
export interface ExcoMemberDB {
  id: string
  name: string
  position: string
  image: string | null
  category: string
  is_head: boolean | null
  order: number
}

export interface ExcoSectionDB {
  id: string
  category: string
  head: string | null  // UUID reference to excomember
  organization_type: OrganizationType
}

// Extended interface for joined queries
export interface ExcoSectionWithHead extends Omit<ExcoSectionDB, 'head'> {
  head: ExcoMemberDB | null
}

// Utility type for creating/updating members
export type CreateExcoMember = Omit<ExcoMemberDB, 'id'> & { id?: string }

// Utility type for creating/updating sections  
export type CreateExcoSection = Omit<ExcoSectionDB, 'id'> & { id?: string }

// Type guards for runtime type checking
export function isValidOrganizationType(type: string): type is OrganizationType {
  return type === 'dean' || type === 'itc'
}

export function isExcoMemberDB(obj: any): obj is ExcoMemberDB {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.position === 'string' &&
    (obj.image === null || typeof obj.image === 'string') &&
    typeof obj.category === 'string' &&
    (obj.is_head === null || typeof obj.is_head === 'boolean') &&
    typeof obj.order === 'number'
  )
}

export function isExcoSectionDB(obj: any): obj is ExcoSectionDB {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.category === 'string' &&
    (obj.head === null || typeof obj.head === 'string') &&
    isValidOrganizationType(obj.organization_type)
  )
}