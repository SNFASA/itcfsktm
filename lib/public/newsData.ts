// lib/newsData.ts

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  date: string;
  image?: string;
};

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Launching of Innovation Week 2025",
    slug: "innovation-week-2025",
    summary: "Join us for Innovation Week with inspiring tech talks and exhibitions.",
    content: `We are excited to announce the launch of Innovation Week 2025, 
      filled with events focusing on technology, creativity, and problem-solving.`,
    date: "2025-07-20",
    image: "/images/news/innovation.jpg",
  },
  {
    id: 2,
    title: "New Lab Facilities Opened",
    slug: "new-lab-facilities",
    summary: "The university unveils upgraded computer labs with high-end workstations.",
    content: `Our new lab facilities are now open to support student projects, research, and 
      innovation with the latest hardware and software tools.`,
    date: "2025-07-15",
    image: "/images/news/lab.jpg",
  },
];
