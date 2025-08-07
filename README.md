# ITC Website - Information Technology Club UTHM

A modern, responsive website for the Information Technology Club at Universiti Tun Hussein Onn Malaysia (UTHM).

## Features

- **Modern Design**: Clean, professional layout matching university standards
- **Responsive**: Optimized for desktop, tablet, and mobile devices
- **Next.js 14**: Built with the latest Next.js App Router
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Component-Based**: Modular, reusable React components

## Sections

1. **Header**: Navigation menu with logo and social media links
2. **Hero Section**: Welcome banner with curved background design
3. **About Us**: Club description with decorative elements
4. **Faculty Organization Chart**: Leadership hierarchy display
5. **ITC Organization Chart**: Student organization structure
6. **Events & Activities**: Interactive event cards with registration
7. **News & Announcements**: Latest updates and news articles
8. **Footer**: University logos and contact information

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/
│   │   ├── Button.tsx    # Reusable button component
│   │   ├── EventCard.tsx # Event card component
│   │   └── NewsCard.tsx  # News card component
│   ├── Header.tsx        # Navigation header
│   ├── HeroSection.tsx   # Hero banner
│   ├── AboutSection.tsx  # About us section
│   ├── FacultyOrgChart.tsx # Faculty organization
│   ├── ITCOrgChart.tsx   # ITC organization
│   ├── EventsSection.tsx # Events display
│   ├── NewsSection.tsx   # News display
│   └── Footer.tsx        # Footer section
└── public/               # Static assets
```

## Styling

The project uses:
- **Tailwind CSS** for utility-first styling
- **Custom CSS variables** for design system colors
- **Karla & Inter fonts** for typography
- **Responsive design** with mobile-first approach

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## License

© Faculty of Computer Science and Information Technology (FSKTM), Universiti Tun Hussein Onn Malaysia (UTHM) ® 2025. All Rights Reserved.
