// lib/newsUtils.ts
export interface NewsItem {
  id: number
  title: string
  description: string
  image: string
  date: string
  slug: string
  category: string
  author: string
  readTime: string
  featured: boolean
  content: string
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "TechMecha Sprint 2025",
    description: "The Information Technology Club (ITC) at Universiti Tun Hussein Onn Malaysia (UTHM) proudly launches a new initiative to bridge tech and students, featuring cutting-edge workshops and collaborative projects.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9333e1670ce109529902d7cc1407d56e1f8f7d15?width=712",
    date: "2025-06-21",
    slug: "techmecha-sprint-2025",
    category: "Technology",
    author: "ITC Team",
    readTime: "5 min read",
    featured: true,
    content: `
      <p>The Information Technology Club (ITC) at Universiti Tun Hussein Onn Malaysia (UTHM) is excited to announce the launch of TechMecha Sprint 2025, a groundbreaking initiative designed to bridge the gap between cutting-edge technology and student innovation.</p>
      
      <p>This comprehensive program features a series of hands-on workshops, collaborative projects, and mentorship opportunities that will empower students to explore the latest trends in technology, from artificial intelligence and machine learning to web development and cybersecurity.</p>
      
      <p>Participants will have the opportunity to work on real-world projects, collaborate with industry professionals, and develop skills that are highly sought after in today's tech landscape. The initiative aims to foster a culture of innovation and creativity among students while providing them with practical experience that will benefit their future careers.</p>
      
      <p>Registration is now open for all UTHM students, and we encourage anyone with an interest in technology to join us on this exciting journey. Together, we'll shape the future of technology and create solutions that make a difference in our community and beyond.</p>
    `
  },
  {
    id: 2,
    title: "Digital Innovation Day",
    description: "Explore the latest student-led digital innovations happening across UTHM. Join us for exciting demos, inspiring talks, and hands-on workshops that showcase the future of technology.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9333e1670ce109529902d7cc1407d56e1f8f7d15?width=712",
    date: "2025-07-10",
    slug: "digital-innovation-day",
    category: "Innovation",
    author: "Innovation Team",
    readTime: "4 min read",
    featured: false,
    content: `
      <p>Digital Innovation Day represents a celebration of student creativity and technological advancement at UTHM. This annual event brings together the brightest minds from across our campus to showcase their innovative projects and ideas.</p>
      
      <p>The day will feature interactive demonstrations of student-developed applications, robots, IoT devices, and digital solutions that address real-world challenges. Attendees will have the opportunity to see firsthand how our students are pushing the boundaries of what's possible with technology.</p>
      
      <p>In addition to the project showcases, the event will include inspiring keynote presentations from industry leaders, hands-on workshops where participants can learn new skills, and networking sessions that connect students with potential mentors and collaborators.</p>
      
      <p>Whether you're a technology enthusiast, a prospective student, or simply curious about the future of digital innovation, this event promises to be both educational and inspiring. Join us as we celebrate the innovative spirit that drives our community forward.</p>
    `
  },
  {
    id: 3,
    title: "AI Hackathon Results",
    description: "Winners of the 2025 AI Hackathon have been announced! Discover the top teams and their incredible solutions that are pushing the boundaries of artificial intelligence and machine learning.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9333e1670ce109529902d7cc1407d56e1f8f7d15?width=712",
    date: "2025-07-05",
    slug: "ai-hackathon-results-2025",
    category: "AI & Machine Learning",
    author: "Hackathon Committee",
    readTime: "6 min read",
    featured: true,
    content: `
      <p>The 2025 AI Hackathon has concluded with remarkable success, showcasing the exceptional talent and creativity of our participating teams. Over the course of 48 intense hours, students from various disciplines came together to develop innovative AI-powered solutions to real-world problems.</p>
      
      <p>The winning team, "Neural Nexus," developed an intelligent healthcare monitoring system that uses machine learning to predict potential health issues before they become critical. Their solution combines wearable sensor data with advanced algorithms to provide personalized health insights and recommendations.</p>
      
      <p>The second-place team, "Data Dynamos," created an AI-powered educational platform that adapts to individual learning styles and provides personalized tutoring experiences. Their innovative approach to personalized education has the potential to revolutionize how students learn and engage with educational content.</p>
      
      <p>Third place went to "Algorithm Architects" for their smart city traffic optimization system that uses real-time data and predictive modeling to reduce congestion and improve urban mobility. Their solution demonstrates the practical applications of AI in solving urban challenges.</p>
      
      <p>All participating teams showed exceptional skill and creativity, and we're excited to see how these projects will evolve and potentially impact our communities in the future.</p>
    `
  }
]

export function getAllNews(): NewsItem[] {
  return newsData
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsData.find(news => news.slug === slug)
}

export function getFeaturedNews(): NewsItem[] {
  return newsData.filter(news => news.featured)
}

export function getNewsByCategory(category: string): NewsItem[] {
  return newsData.filter(news => news.category === category)
}

