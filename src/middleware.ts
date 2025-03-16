import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const userType = request.cookies.get("userType")?.value;
  const path = request.nextUrl.pathname;

  // Allow access to subscription plans page if authenticated
  if (path === "/subscription-plans") {
    if (!token) {
      return NextResponse.redirect(new URL("/driver/signin", request.url));
    }
    return NextResponse.next();
  }

  // If user is authenticated and trying to access signin/signup pages
  if (token) {
    if (path.includes("/signin") || path.includes("/signup")) {
      if (userType === "driver") {
        // Don't redirect to /driver directly, let the component handle subscription flow
        return NextResponse.redirect(new URL("/subscription-plans", request.url));
      }
      if (userType === "carrier") {
        return NextResponse.redirect(new URL("/carrier", request.url));
      }
    }
  }

  // If user is not authenticated and trying to access protected pages
  if (!token) {
    if (path.startsWith("/driver") && !path.includes("/signin")) {
      return NextResponse.redirect(new URL("/driver/signin", request.url));
    }
    if (path.startsWith("/carrier") && !path.includes("/signin")) {
      return NextResponse.redirect(new URL("/carrier/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/driver/:path*",
    "/carrier/:path*",
    "/driver/signin",
    "/carrier/signin",
    "/driver/signup",
    "/carrier/signup",
    "/subscription-plans",
  ],
};
