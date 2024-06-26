import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserId } from './actions/user.actions'

export function middleware(request: NextRequest) {

  let userId 
  const getCurrentUserId = async () => {
    userId = await getUserId()
  }

  getCurrentUserId()

  const url = request.nextUrl.clone()
  const { pathname } = url


  const protectedRoutes = [
    "/memes/create",
    "/memes/feed",
    "/memes/search",
    "/memes/:id/detail",
    "/user/profile",
    "/user/settings",
    "/accounts/reset-password",
  ]

  const authRoutes = [
    "/accounts/sign-in",
    "/accounts/sign-up",
    "/onboarding"
  ]


  if (userId) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/memes/feed", request.url))
    }
  } else {
    if (protectedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/accounts/sign-in", request.url))
    }
  }

  return NextResponse.next()

}

export const config = {
  matcher: [
    "/",
    "/accounts/sign-in",
    "/accounts/sign-up",
    "/accounts/reset-password",
    "/memes/create",
    "/memes/feed",
    "/memes/search",
    "/memes/:id/detail",
    "/user/profile",
    "/user/settings"
  ]
}