export interface EventData {
  id: string
  title: string
  date: string
  image: string
  description?: string
  time?: string
  location?: string
  eligibility?: 'Open' | 'Faculty Students' | 'Members Only'
  details?: {
    agenda?: string
    isFree?: boolean
    hasCertificate?: boolean
    hasRefreshments?: boolean
    hasTrasportation?: boolean
    isOnline?: boolean
    isLimited?: boolean
  }
}

export const events: EventData[] = [
  {
    id: 'event-1',
    title: "ITC Debug",
    date: "24 April 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "10:00 AM - 4:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Open',
    details: {
      agenda: "Introduction to debugging techniques, hands-on workshops, and Q&A sessions",
      isFree: true,
      hasCertificate: true,
      hasRefreshments: true,
      isLimited: false
    }
  },
  {
    id: 'event-2',
    title: "ITC Workshop",
    date: "15 May 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "9:00 AM - 5:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Faculty Students',
    details: {
      agenda: "Full-day technical workshop covering latest industry trends and practices",
      isFree: true,
      hasCertificate: true,
      hasRefreshments: true,
      isLimited: true
    }
  },
  {
    id: 'event-3',
    title: "ITC Hackathon",
    date: "10 June 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "8:00 AM - 6:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Members Only',
    details: {
      agenda: "24-hour coding challenge with team formation, mentorship, and final presentations",
      isFree: false,
      hasCertificate: true,
      hasRefreshments: true,
      isLimited: true
    }
  },
  {
    id: 'event-4',
    title: "ITC Competition",
    date: "20 July 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "10:00 AM - 4:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Open',
    details: {
      agenda: "Multi-round technical competition with prizes for winners",
      isFree: true,
      hasCertificate: true,
      hasRefreshments: false,
      isLimited: false
    }
  },
  {
    id: 'event-5',
    title: "ITC Seminar",
    date: "5 August 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities",
    time: "9:00 AM - 5:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Faculty Students',
    details: {
      agenda: "Industry expert talks on emerging technologies and career guidance",
      isFree: true,
      hasCertificate: false,
      hasRefreshments: true,
      isLimited: true
    }
  },
  {
    id: 'event-6',
    title: "ITC Gaming Tournament",
    date: "25 August 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "8:00 AM - 6:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Members Only',
    details: {
      agenda: "Esports tournament with multiple game categories and championship rounds",
      isFree: false,
      hasCertificate: false,
      hasRefreshments: true,
      isLimited: true
    }
  },
  {
    id: 'event-7',
    title: "ITC Tech Talk",
    date: "12 September 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "10:00 AM - 4:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Open',
    details: {
      agenda: "Guest speaker sessions on cutting-edge technology and innovation",
      isFree: true,
      hasCertificate: false,
      hasRefreshments: true,
      isLimited: false
    }
  },
  {
    id: 'event-8',
    title: "ITC Annual Dinner",
    date: "30 September 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "6:00 PM - 10:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Faculty Students',
    details: {
      agenda: "Formal dinner with awards ceremony and entertainment program",
      isFree: false,
      hasCertificate: false,
      hasRefreshments: true,
      isLimited: true
    }
  },
  {
    id: 'event-9',
    title: "ITC Code Review",
    date: "15 October 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "9:00 AM - 5:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Members Only',
    details: {
      agenda: "Peer code review sessions and best practices sharing",
      isFree: true,
      hasCertificate: true,
      hasRefreshments: false,
      isLimited: true
    }
  },
  {
    id: 'event-10',
    title: "ITC Career Fair",
    date: "8 November 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "10:00 AM - 4:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Open',
    details: {
      agenda: "Company booths, job interviews, and career counseling sessions",
      isFree: true,
      hasCertificate: false,
      hasRefreshments: true,
      isLimited: false
    }
  },
  {
    id: 'event-11',
    title: "ITC Innovation Day",
    date: "22 November 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "9:00 AM - 5:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Faculty Students',
    details: {
      agenda: "Project showcases, innovation pitches, and technology demonstrations",
      isFree: true,
      hasCertificate: true,
      hasRefreshments: true,
      isLimited: true
    }
  },
  {
    id: 'event-12',
    title: "ITC Year End Party",
    date: "15 December 2025",
    image: "/images/NEW POSTER.png",
    description: "Join us for an exciting event that will enhance your technical skills and provide networking opportunities with fellow students and industry professionals.",
    time: "6:00 PM - 10:00 PM",
    location: "FSKTM Auditorium",
    eligibility: 'Members Only',
    details: {
      agenda: "Celebration party with games, music, and year-end recognition",
      isFree: true,
      hasCertificate: false,
      hasRefreshments: true,
      isLimited: true
    }
  }
]

// Helper functions for data manipulation
import { supabase } from "@/lib/supabaseClient"


// Get recent events by ascending date
export const getRecentEvents = async (limit = 6): Promise<EventData[]> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("Error fetching recent events:", error)
    return []
  }

  return data as EventData[]
}

// Get events by eligibility
export const getEventsByEligibility = async (
  eligibility: EventData["eligibility"]
): Promise<EventData[]> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("eligibility", eligibility)

  if (error) {
    console.error("Error fetching events by eligibility:", error)
    return []
  }

  return data as EventData[]
}

// Get only free events
export const getFreeEvents = async (): Promise<EventData[]> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("details->>isFree", "true") // details is a JSON column

  if (error) {
    console.error("Error fetching free events:", error)
    return []
  }

  return data as EventData[]
}

// Get events that provide certificates
export const getEventsWithCertificates = async (): Promise<EventData[]> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("details->>hasCertificate", "true") // from JSON field

  if (error) {
    console.error("Error fetching certificate events:", error)
    return []
  }

  return data as EventData[]
}

// Get upcoming events
export const getUpcomingEvents = async (): Promise<EventData[]> => {
  const nowISO = new Date().toISOString()

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gt("date", nowISO)
    .order("date", { ascending: true })

  if (error) {
    console.error("Error fetching upcoming events:", error)
    return []
  }

  return data as EventData[]
}

// Get event by ID
export const getEventById = async (id: string): Promise<EventData | null> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching event by ID:", error)
    return null
  }

  return data as EventData
}
