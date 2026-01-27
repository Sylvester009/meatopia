// app/ClientLayoutWrapper.tsx - Client component
"use client";

import { usePathname } from 'next/navigation';
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}