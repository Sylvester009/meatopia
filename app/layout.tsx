// app/layout.tsx - Keep as server component
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import './globals.css'
import ClientLayoutWrapper from './ClientLayoutWrapper'

const workSans = Work_Sans({ 
  subsets: ['latin'],
  variable: '--font-work-sans'
})

export const metadata: Metadata = {
  title: 'Meatopia - Premium Meats',
  description: 'Fresh, premium quality meats sourced locally',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={workSans.className}>
      <body className="font-sans">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  )
}