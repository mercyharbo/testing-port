// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'

// const authRoutes = [
//   '/login',
//   '/sign-up',
//   '/sign-in',
//   '/recruiter-sign-in',
//   '/recruiter-sign-up',
//   '/welcome-onboarding',
//   '/why-onboarding',
//   '/onboarding',
//   '/creative-email',
//   '/recruiter-email',
// ]

// const publicRoutes = ['/', '/about-us', '/contact', '/portfolio/view']

// const creatorRoutes = ['/creative-dashboard', '/job-hub', '/profile-card']

// const recruiterRoutes = ['/recruiter-job-hub']

// // User routes that require specific user type
// const protectedUserRoutes = {
//   creator: '/users/creators',
//   recruiter: '/users/recruiters',
// }

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname

//   // Skip middleware for static assets, API routes, and public routes
//   if (
//     path.startsWith('/_next') ||
//     path.startsWith('/assets/') ||
//     path === '/favicon.ico' ||
//     path.startsWith('/api/') ||
//     publicRoutes.includes(path) ||
//     publicRoutes.some((route) => path.startsWith(`${route}/`))
//   ) {
//     return NextResponse.next()
//   }

//   // Get cookies
//   const accessToken = request.cookies.get('access_token')?.value
//   const userType = request.cookies.get('userType')?.value as
//     | 'creator'
//     | 'recruiter'
//     | undefined
//   const isAuthenticated = !!accessToken

//   // Log for debugging
//   console.log(
//     `[Middleware] Path: ${path}, Authenticated: ${isAuthenticated}, UserType: ${userType}`
//   )

//   // Handle auth routes and email verification
//   if (authRoutes.includes(path) || path.startsWith('/auth/')) {
//     // Always allow access to email verification routes
//     if (path === '/creative-email' || path === '/recruiter-email') {
//       return NextResponse.next()
//     }

//     // Only redirect authenticated users with valid access tokens
//     if (isAuthenticated && userType && accessToken) {
//       const dashboardUrl =
//         userType === 'creator' ? '/users/creators' : '/users/recruiters'
//       if (path !== dashboardUrl) {
//         console.log(`[Middleware] Redirecting to ${dashboardUrl}`)
//         return NextResponse.redirect(new URL(dashboardUrl, request.url))
//       }
//     }
//     return NextResponse.next()
//   }

//   // Handle protected routes
//   const isUserRoute = path.startsWith('/users/')
//   const isCreatorUserRoute = path.startsWith('/users/creators')
//   const isRecruiterUserRoute = path.startsWith('/users/recruiters')

//   const isCreatorRoute =
//     creatorRoutes.includes(path) ||
//     creatorRoutes.some((route) => path.startsWith(`${route}/`)) ||
//     isCreatorUserRoute

//   const isRecruiterRoute =
//     recruiterRoutes.includes(path) ||
//     recruiterRoutes.some((route) => path.startsWith(`${route}/`)) ||
//     isRecruiterUserRoute

//   if (isCreatorRoute || isRecruiterRoute || isUserRoute) {
//     // Check for valid authentication with access token
//     if (!isAuthenticated || !accessToken) {
//       console.log(`[Middleware] Redirecting to /login from ${path}`)
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${encodeURIComponent(path)}`, request.url)
//       )
//     }

//     // Handle user type check and redirection
//     if (!userType) {
//       console.log('[Middleware] No userType found, redirecting to login')
//       return NextResponse.redirect(new URL('/login', request.url))
//     }

//     // If trying to access the wrong user type's routes
//     if (
//       (isCreatorUserRoute && userType !== 'creator') ||
//       (isRecruiterUserRoute && userType !== 'recruiter')
//     ) {
//       // Redirect to their correct dashboard
//       const correctPath = protectedUserRoutes[userType]
//       console.log(
//         `[Middleware] Redirecting user to their correct route: ${correctPath}`
//       )
//       return NextResponse.redirect(new URL(correctPath, request.url))
//     }

//     // If accessing a generic /users route without specific type
//     if (isUserRoute && !isCreatorUserRoute && !isRecruiterUserRoute) {
//       // Redirect to their type-specific route
//       const correctPath = protectedUserRoutes[userType]
//       console.log(
//         `[Middleware] Redirecting to type-specific route: ${correctPath}`
//       )
//       return NextResponse.redirect(new URL(correctPath, request.url))
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     // Protected routes
//     '/users/:path*',
//     '/(creative-dashboard|job-hub|profile-card)/:path*',
//     '/recruiter-job-hub/:path*',
//     // Auth routes
//     '/(login|sign-up|sign-in|recruiter-sign-in|recruiter-sign-up|welcome-onboarding|why-onboarding|onboarding|creative-email|recruiter-email)',
//     '/auth/:path*',
//     // Catch-all for non-static, non-public routes
//     '/((?!_next|assets|api|favicon.ico|about-us|contact|portfolio/view).*)',
//   ],
// }

// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const accessToken = request.cookies.get('access_token')?.value
  const userType = request.cookies.get('userType')?.value // expected: 'creator' or 'recruiter'

  // Redirect logged-in users away from /login and /signup
  if (
    (pathname === '/login' || pathname === '/signup') &&
    accessToken &&
    userType
  ) {
    return NextResponse.redirect(new URL(`/users/${userType}`, request.url))
  }

  // Protect all /users routes (including /users itself)
  if (pathname === '/users' || pathname.startsWith('/users/')) {
    // Not logged in — redirect to login
    if (!accessToken || !userType) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Optional strict match: prevent logged-in users from accessing the other dashboard
    if (
      (pathname.startsWith('/users/creator') && userType !== 'creator') ||
      (pathname.startsWith('/users/recruiter') && userType !== 'recruiter')
    ) {
      return NextResponse.redirect(new URL(`/users/${userType}`, request.url))
    }
  }

  // All other paths: allow through
  return NextResponse.next()
}

// Apply middleware to all routes except static files
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
