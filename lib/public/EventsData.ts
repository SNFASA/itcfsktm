import { supabase } from "@/lib/supabaseClient"

export type EventEligibility =
  | "all-students"
  | "undergraduates"
  | "graduates"
  | "faculty"
  | "staff"
  | "public"

export type EventStatus =
  | "upcoming"
  | "ongoing"
  | "completed"
  | "cancelled"

export interface EventDetails {
  agenda?: string
  isFree?: boolean
  hasCertificate?: boolean
  hasRefreshments?: boolean
  hasTransportation?: boolean
  isOnline?: boolean
  isLimited?: boolean
}

export interface EventData {
  id: string
  title: string
  description: string
  image?: string
  date: string
  time: string
  location: string
  eligibility: EventEligibility
  registration_required: boolean
  details?: EventDetails
  status: EventStatus
  created_at: string
  updated_at: string
  registration_link?: string
  images?: string[]
}

// Get recent events
export const getRecentEvents = async (limit = 6): Promise<EventData[]> => {
  const { data, error } = await supabase
    .from("event")
    .select("*")
    .order("date", { ascending: true })
    .limit(limit)

  if (error) throw new Error(error.message)
  return data as EventData[]
}

// Get events by eligibility
export const getEventsByEligibility = async (
  eligibility: EventEligibility
): Promise<EventData[]> => {
  const { data, error } = await supabase
    .from("event")
    .select("*")
    .eq("eligibility", eligibility)

  if (error) throw new Error(error.message)
  return data as EventData[]
}

// Get only free events
export const getFreeEvents = async (): Promise<EventData[]> => {
  const { data, error } = await supabase
    .from("event")
    .select("*")
    .filter("details->>isFree", "eq", "true") // JSONB boolean as string

  if (error) throw new Error(error.message)
  return data as EventData[]
}

// Get events that provide certificates
export const getEventsWithCertificates = async (): Promise<EventData[]> => {
  const { data, error } = await supabase
    .from("event")
    .select("*")
    .filter("details->>hasCertificate", "eq", "true")

  if (error) throw new Error(error.message)
  return data as EventData[]
}

// Get upcoming events
export const getUpcomingEvents = async (): Promise<EventData[]> => {
  const nowISO = new Date().toISOString().split("T")[0]

  const { data, error } = await supabase
    .from("event")
    .select("*")
    .gte("date", nowISO)
    .order("date", { ascending: true })

  if (error) throw new Error(error.message)
  return data as EventData[]
}

// Get event by ID
export const getEventById = async (id: string): Promise<EventData | null> => {
  const { data, error } = await supabase
    .from("event")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw new Error(error.message)
  return data as EventData
}

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  const { error } = await supabase
    .from("event")
    .select("id", { count: "exact", head: true })
    .limit(1)

  return !error
}
