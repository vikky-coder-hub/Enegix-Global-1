import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === "/admin-login" || path == "/admin-signup" || path == "/";

    
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail"
  ]
}