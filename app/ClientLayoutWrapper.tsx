"use client";

import { usePathname } from 'next/navigation';
import { CartProvider } from '@/context/CartContext'
import { SearchProvider } from '@/context/SearchContext'
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
      <SearchProvider>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </SearchProvider>
    </CartProvider>
  );
}
