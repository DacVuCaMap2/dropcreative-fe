import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
   
  // See "Matching Paths" below to learn more
  export const config = {
    matcher: '/admin/:path*',
}