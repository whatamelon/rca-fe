import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware() {
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = { matcher: ['/pg/:path*'] }
