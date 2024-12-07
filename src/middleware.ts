import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/@')) {
    const remainingPath = pathname.slice(2)

    const newUrl = new URL(`/cl/${remainingPath}`, request.url)

    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}
export const config = {
  matcher: '/@:username*'
}
