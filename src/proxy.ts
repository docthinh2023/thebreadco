import { verifySession } from '@/app/lib/verifysession';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const session = await verifySession(); 
  const isAuthenticated = session?.userId
  const isAdmin = session?.role==='admin'
  const protectedPaths = ['/Profile', '/Checkout', '/client/checkout', '/client/profile']  
  const {pathname} =  request.nextUrl
  const isProtected = protectedPaths.some((path) =>
  pathname.startsWith(path)
  );
   
  if (!isAuthenticated && isProtected) {
    const loginUrl = new URL('/sign-in', request.url)
    loginUrl.searchParams.set('error', 'unauthenticated')
    return NextResponse.redirect(loginUrl)
  }

  if (request.nextUrl.pathname==='/Profile/Change Product' && !isAdmin) {
    const homeUrl = new URL('/', request.url)
    homeUrl.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}

// Protect specific routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',],
}
