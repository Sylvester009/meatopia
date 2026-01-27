// app/(admin)/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meatopia Admin',
  description: 'Admin dashboard for Meatopia',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* No CartProvider here since admin doesn't need shopping cart */}
        {children}
      </body>
    </html>
  )
}