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
]

const publicRoutes = ['/', '/about-us', '/contact', '/portfolio/view']

const creatorRoutes = [
  '/creative-homepage',
  '/creative-dashboard',
  '/job-hub',
  '/profile-card',
]

const recruiterRoutes = ['/recruiter-homepage', '/recruiter-job-hub']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware for static assets, API routes, and public routes
  if (
    path.startsWith('/_next') ||
    path.startsWith('/assets/') ||
    path === '/favicon.ico' ||
    path.startsWith('/api/') ||
    publicRoutes.includes(path) ||
    publicRoutes.some((route) => path.startsWith(route + '/'))
  ) {
    return NextResponse.next()
  }

  // Get cookies
  const accessToken = request.cookies.get('access_token')?.value
  const userType = request.cookies.get('userType')?.value
  const isAuthenticated = !!accessToken

  // Log for debugging in production
  console.log(
    `[Middleware] Path: ${path}, Access Token: ${accessToken}, User Type: ${userType}`
  )

  // Handle auth routes: Redirect authenticated users to their dashboard
  if (authRoutes.includes(path) || path.startsWith('/auth/')) {
    if (isAuthenticated && userType) {
      const dashboardUrl =
        userType === 'creator' ? '/creative-homepage' : '/recruiter-homepage'
      if (path !== dashboardUrl) {
        console.log(
          `[Middleware] Redirecting authenticated user to ${dashboardUrl}`
        )
        return NextResponse.redirect(new URL(dashboardUrl, request.url))
      }
    }
    return NextResponse.next()
  }

  // Handle protected routes
  const isCreatorRoute =
    creatorRoutes.includes(path) ||
    creatorRoutes.some((route) => path.startsWith(route + '/'))
  const isRecruiterRoute =
    recruiterRoutes.includes(path) ||
    recruiterRoutes.some((route) => path.startsWith(route + '/'))

  if (isCreatorRoute || isRecruiterRoute) {
    if (!isAuthenticated) {
      console.log(
        `[Middleware] Redirecting to /login from ${path} due to missing access_token`
      )
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!userType) {
      // Infer userType if missing
      const inferredType = isCreatorRoute ? 'creator' : 'recruiter'
      console.log(
        `[Middleware] Setting userType to ${inferredType} for ${path}`
      )
      const response = NextResponse.next()
      response.cookies.set('userType', inferredType, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days, matching AuthStorage
      })
      return response
    }

    // Redirect if userType doesn't match the route
    if (
      (isCreatorRoute && userType === 'recruiter') ||
      (isRecruiterRoute && userType === 'creator')
    ) {
      const redirectUrl =
        userType === 'creator' ? '/creative-homepage' : '/recruiter-homepage'
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
    '/(creative-homepage|creative-dashboard|job-hub|profile-card)/:path*',
    '/(recruiter-homepage|recruiter-job-hub)/:path*',
    // Auth routes
    '/(login|sign-up|sign-in|recruiter-sign-in|recruiter-sign-up|welcome-onboarding|why-onboarding|onboarding)',
    '/(creative-email|recruiter-email)',
    '/auth/:path*',
    // Catch-all for non-static, non-public routes
    '/((?!_next|assets|api|favicon.ico|about-us|contact|portfolio/view).*)',
  ],
}
