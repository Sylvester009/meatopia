// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminCookie = request.cookies.get('adminLoggedIn');
    const isLoggedIn = adminCookie?.value === 'true';
    
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }
    
    // Redirect to login if not authenticated
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};