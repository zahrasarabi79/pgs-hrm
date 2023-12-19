import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// NOTE :although this middleware works but still there is a problem in deleting cookies directly from browser itself
//
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('access_token')?.value || '';
  const isPublicPath = path === '/login';
  const isBasePath = path === '/';

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  if ((isPublicPath || isBasePath) && token) {
    return NextResponse.redirect(new URL('/workflow-management/dashboard', request.nextUrl));
  }
}

export const config = {
  matcher: ['/workflow-management/dashboard', '/public/:path*', '/login'],
};
