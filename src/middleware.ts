import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server'

const PUBLIC_ROUTES = [
  {
    path: '/sign-in',
    whenAuthenticated: 'redirect',
  },
  {
    path: '/about',
    whenAuthenticated: 'next',
  }
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in'

const REDIRECT_WHEN_AUTHENTICATED_ROUTE = '/'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const publicRoute = PUBLIC_ROUTES.find((route) => route.path === path)
  const privateRoute = !publicRoute

  const authToken = request.cookies.get('authToken')

  /**
   * Not authenticated and public router
   */
  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  /**
   * Not authenticated and private router
   */
  if (!authToken && privateRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  /**
   * Authenticated and public route to only not authenticated
   */
  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  /**
   * Authenticated and private router
   */
  if (authToken && privateRoute) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
