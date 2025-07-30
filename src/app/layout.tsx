import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ECG Arrhythmia Classification System',
  description: 'Advanced AI-powered ECG Analysis System for Cardiac Arrhythmia Detection',
  keywords: 'ECG, Arrhythmia, AI, Machine Learning, Cardiology',
  authors: [{ name: 'ECG Classification Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
          {children}
        </div>
      </body>
    </html>
  )
} 