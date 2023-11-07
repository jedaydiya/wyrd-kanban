import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GeistSans, GeistMono } from 'geist/font'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs/app-beta'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban App',
  description: 'wyrd-kanban',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={GeistSans.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
