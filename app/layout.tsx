import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Information Technology Club (ITC) - UTHM',
  description:
    'The Information Technology Club at Universiti Tun Hussein Onn Malaysia (UTHM) - A dynamic student-led organization fostering innovation and professional growth.',
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} scroll-smooth`}><Header />{children}<Footer /></body>
    </html>
  )
}
console.log("Rendering on:", typeof window === 'undefined' ? "Server" : "Client");