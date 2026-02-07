// app/layout.tsx - Keep as server component
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import './globals.css'
import ClientLayoutWrapper from './ClientLayoutWrapper'
import { CartProvider } from '@/context/CartContext'
import { SearchProvider } from '@/context/SearchContext'


const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap'
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
        <CartProvider>
          <SearchProvider>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  )
}