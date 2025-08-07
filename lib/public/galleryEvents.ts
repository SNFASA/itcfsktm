// lib/galleryEvents.ts

export interface GalleryEvent {
  id: string
  title: string
  description: string
  mainImage: string
  additionalImages: string[]
  category: string
  date: string
  size: 'small' | 'medium' | 'large'
  rotation: number
  location?: string
  attendees?: number
  tags?: string[]
}

// Mock gallery data with more comprehensive information
export const allGalleryEvents: GalleryEvent[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2025',
    description: 'A comprehensive summit featuring the latest in AI, blockchain, and emerging technologies.',
    mainImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    ],
    category: 'Conference',
    date: 'Mar 15, 2025',
    size: 'large',
    rotation: -5,
    location: 'San Francisco, CA',
    attendees: 500,
    tags: ['AI', 'Blockchain', 'Innovation']
  },
  {
    id: '2',
    title: 'Student Hackathon 2025',
    description: 'A 48-hour coding marathon where students build innovative solutions to real-world problems.',
    mainImage: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
    ],
    category: 'Hackathon',
    date: 'Feb 20, 2025',
    size: 'medium',
    rotation: 3,
    location: 'MIT Campus',
    attendees: 200,
    tags: ['Coding', 'Competition', 'Students']
  },
  {
    id: '3',
    title: 'Digital Arts Workshop',
    description: 'Creative workshop exploring the intersection of technology and digital art creation.',
    mainImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
    ],
    category: 'Workshop',
    date: 'Jan 28, 2025',
    size: 'small',
    rotation: -8,
    location: 'Creative Hub NYC',
    attendees: 50,
    tags: ['Digital Art', 'Creative', 'Design']
  },
  {
    id: '4',
    title: 'AI & Machine Learning Conference',
    description: 'Deep dive into artificial intelligence, machine learning algorithms, and their practical applications.',
    mainImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=550&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=400&h=300&fit=crop',
    ],
    category: 'Conference',
    date: 'Apr 5, 2025',
    size: 'medium',
    rotation: 7,
    location: 'Seattle, WA',
    attendees: 300,
    tags: ['AI', 'Machine Learning', 'Data Science']
  },
  {
    id: '5',
    title: 'Robotics Competition',
    description: 'Annual robotics competition featuring autonomous robots and innovative engineering solutions.',
    mainImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=450&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1518618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1563207153-f403bf289096?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    ],
    category: 'Competition',
    date: 'Mar 8, 2025',
    size: 'small',
    rotation: -3,
    location: 'Boston, MA',
    attendees: 150,
    tags: ['Robotics', 'Engineering', 'Competition']
  },
  {
    id: '6',
    title: 'Web Development Bootcamp',
    description: 'Intensive bootcamp covering modern web development technologies and best practices.',
    mainImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=580&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=300&fit=crop',
    ],
    category: 'Bootcamp',
    date: 'Feb 12, 2025',
    size: 'large',
    rotation: 4,
    location: 'Austin, TX',
    attendees: 80,
    tags: ['Web Development', 'JavaScript', 'React']
  },
  {
    id: '7',
    title: 'Cybersecurity Summit',
    description: 'Leading experts discuss the latest in cybersecurity threats, solutions, and best practices.',
    mainImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
    ],
    category: 'Summit',
    date: 'May 20, 2025',
    size: 'medium',
    rotation: -6,
    location: 'Washington, DC',
    attendees: 250,
    tags: ['Cybersecurity', 'Security', 'Privacy']
  },
  {
    id: '8',
    title: 'Mobile App Development Workshop',
    description: 'Hands-on workshop for building cross-platform mobile applications using modern frameworks.',
    mainImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=450&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1607252650355-f662779e6d7b?w=400&h=300&fit=crop',
    ],
    category: 'Workshop',
    date: 'Jan 15, 2025',
    size: 'small',
    rotation: 9,
    location: 'Los Angeles, CA',
    attendees: 60,
    tags: ['Mobile Development', 'React Native', 'Flutter']
  },
  {
    id: '9',
    title: 'Data Science Symposium',
    description: 'Comprehensive exploration of data science methodologies, tools, and real-world applications.',
    mainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=520&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    ],
    category: 'Symposium',
    date: 'Apr 18, 2025',
    size: 'large',
    rotation: -4,
    location: 'Chicago, IL',
    attendees: 400,
    tags: ['Data Science', 'Analytics', 'Big Data']
  },
  {
    id: '10',
    title: 'Blockchain Developer Meetup',
    description: 'Monthly meetup for blockchain developers to share knowledge and discuss latest trends.',
    mainImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=480&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=300&fit=crop',
    ],
    category: 'Meetup',
    date: 'Every Month',
    size: 'small',
    rotation: 2,
    location: 'Denver, CO',
    attendees: 40,
    tags: ['Blockchain', 'Cryptocurrency', 'DeFi']
  },
  {
    id: '11',
    title: 'UX/UI Design Conference',
    description: 'Annual conference bringing together designers to explore user experience and interface design trends.',
    mainImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=550&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    ],
    category: 'Conference',
    date: 'Jun 10, 2025',
    size: 'medium',
    rotation: -7,
    location: 'Portland, OR',
    attendees: 180,
    tags: ['UX', 'UI', 'Design', 'User Experience']
  },
  {
    id: '12',
    title: 'Cloud Computing Workshop',
    description: 'Practical workshop on cloud architecture, deployment strategies, and modern DevOps practices.',
    mainImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
    ],
    category: 'Workshop',
    date: 'Mar 25, 2025',
    size: 'medium',
    rotation: 5,
    location: 'Atlanta, GA',
    attendees: 90,
    tags: ['Cloud Computing', 'AWS', 'DevOps']
  }
]

// Helper functions for data manipulation
export const getEventById = (id: string): GalleryEvent | undefined => {
  return allGalleryEvents.find(event => event.id === id)
}

export const getEventsByCategory = (category: string): GalleryEvent[] => {
  return allGalleryEvents.filter(event => event.category === category)
}

export const getAllCategories = (): string[] => {
  return Array.from(new Set(allGalleryEvents.map(event => event.category)))
}

export const getRecentEvents = (limit: number = 6): GalleryEvent[] => {
  return allGalleryEvents
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}