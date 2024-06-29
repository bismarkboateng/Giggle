import { NextResponse, NextRequest } from "next/server"
import { cookies } from "next/headers"

export async function middleware(request: NextRequest) {
  const cookie = cookies().get("userId");
  const userId = cookie ? cookie.value : undefined;

  const url = request.nextUrl.clone()
  const { pathname } = url


  const protectedRoutes = [
    "/memes/create",
    "/memes/feed",
    "/memes/search",
    /^\/memes\/\d+\/detail$/,
    "/user/profile",
    "/user/settings",
    "/accounts/reset-password",
  ]

  const authRoutes = [
    "/",
    "/accounts/sign-in",
    "/accounts/sign-up",
    "/onboarding"
  ]

  const isProtectedRoute = protectedRoutes.some((route) => {
    if (typeof route === "string") {
      return pathname === route
    } else if (route instanceof RegExp) {
      return route.test(pathname)
    }
    return false
  })

  const isAuthRoute = authRoutes.includes(pathname)


  if (userId) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/memes/feed", request.url))
    }
  } else {
    if (isProtectedRoute) {
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