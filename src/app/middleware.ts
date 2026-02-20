// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // Importe de next/server!

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userType = request.cookies.get('userType')?.value;
  
  const { pathname } = request.nextUrl;

  // Proteção para Admin
  if (pathname.startsWith('/admin')) {
    if (!token || userType !== 'Admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Proteção para Vendedores
  if (pathname.startsWith('/vendedor')) {
    const isVendedor = userType === 'Rca' || userType === 'Televendas';
    if (!token || !isVendedor) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/vendedor/:path*'],
};