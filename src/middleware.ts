import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const authRoutes = [
  '/login',
  '/sign-up',
  '/sign-in',
  '/recruiter-sign-in',
  '/recruiter-sign-up',
  '/welcome-onboarding',
  '/why-onboarding',
  '/onboarding',
  '/creative-email',
  '/recruiter-email',
]

const publicRoutes = ['/', '/about-us', '/contact', '/portfolio/view']

const creatorRoutes = [
  '/creative-dashboard',
  '/job-hub',
  '/profile-card',
  '/users/creators',
]

const recruiterRoutes = ['/recruiter-job-hub', '/users/recruiters']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware for static assets, API routes, and public routes
  if (
    path.startsWith('/_next') ||
    path.startsWith('/assets/') ||
    path === '/favicon.ico' ||
    path.startsWith('/api/') ||
    publicRoutes.includes(path) ||
    publicRoutes.some((route) => path.startsWith(`${route}/`))
  ) {
    return NextResponse.next()
  }

  // Get cookies
  const accessToken = request.cookies.get('access_token')?.value
  const userType = request.cookies.get('userType')?.value as
    | 'creator'
    | 'recruiter'
    | undefined
  const isAuthenticated = !!accessToken

  // Log for debugging
  console.log(
    `[Middleware] Path: ${path}, Authenticated: ${isAuthenticated}, UserType: ${userType}`
  )

  // Handle auth routes: Redirect authenticated users to their dashboard
  if (authRoutes.includes(path) || path.startsWith('/auth/')) {
    if (isAuthenticated && userType) {
      const dashboardUrl =
        userType === 'creator' ? '/users/creators' : '/users/recruiters'
      if (path !== dashboardUrl) {
        console.log(`[Middleware] Redirecting to ${dashboardUrl}`)
        return NextResponse.redirect(new URL(dashboardUrl, request.url))
      }
    }
    return NextResponse.next()
  }

  // Handle protected routes
  const isCreatorRoute =
    creatorRoutes.includes(path) ||
    creatorRoutes.some((route) => path.startsWith(`${route}/`)) ||
    path.startsWith('/users/creators/')
  const isRecruiterRoute =
    recruiterRoutes.includes(path) ||
    recruiterRoutes.some((route) => path.startsWith(`${route}/`)) ||
    path.startsWith('/users/recruiters/')
  const isUsersRoute =
    path.startsWith('/users/') && !isCreatorRoute && !isRecruiterRoute

  if (isCreatorRoute || isRecruiterRoute || isUsersRoute) {
    // Check authentication
    if (!isAuthenticated) {
      console.log(`[Middleware] Redirecting to /login from ${path}`)
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(path)}`, request.url)
      )
    }

    // Check or infer userType
    if (!userType) {
      // Infer userType based on route
      const inferredType = isCreatorRoute
        ? 'creator'
        : isRecruiterRoute
        ? 'recruiter'
        : 'creator' // Default to creator for other /users/* routes
      console.log(
        `[Middleware] Setting userType to ${inferredType} for ${path}`
      )
      const response = NextResponse.next()
      response.cookies.set('userType', inferredType, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })
      return response
    }

    // Redirect if userType doesn't match the route
    if (
      (isCreatorRoute && userType !== 'creator') ||
      (isRecruiterRoute && userType !== 'recruiter') ||
      (isUsersRoute && userType !== 'creator' && userType !== 'recruiter')
    ) {
      const redirectUrl =
        userType === 'creator' ? '/users/creators' : '/users/recruiters'
      console.log(
        `[Middleware] Redirecting to ${redirectUrl} due to userType mismatch`
      )
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Protected routes
    '/(creative-dashboard|job-hub|profile-card|users)/:path*',
    '/(recruiter-job-hub|users/recruiters)/:path*',
    // Auth routes
    '/(login|sign-up|sign-in|recruiter-sign-in|recruiter-sign-up|welcome-onboarding|why-onboarding|onboarding|creative-email|recruiter-email)',
    '/auth/:path*',
    // Catch-all for non-static, non-public routes
    '/((?!_next|assets|api|favicon.ico|about-us|contact|portfolio/view).*)',
  ],
}
