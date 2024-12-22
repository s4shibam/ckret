import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (!pathname.startsWith('/@')) {
    return NextResponse.next()
  }

  const remainingPath = pathname.slice(2)
  const pathSegments = remainingPath.split('/')

  if (pathSegments.length > 1) {
    if (pathSegments[1] === 'msg') {
      pathSegments[1] = 'message'
    } else if (pathSegments[1] === 'skc') {
      pathSegments[1] = 'sketch'
    }
  }

  const newPath = pathSegments.join('/')
  const newUrl = new URL(`/cl/${newPath}`, request.url)

  return NextResponse.redirect(newUrl)
}
