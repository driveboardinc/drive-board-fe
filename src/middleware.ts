import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const userType = request.cookies.get("userType")?.value;
  const path = request.nextUrl.pathname;
  const method = request.method;

  // Allow POST requests to signup endpoints
  if (method === "POST" && (path.includes("/signup") || path.includes("/api"))) {
    return NextResponse.next();
  }

  // Allow access to signup pages and their API routes without authentication
  if (path.includes("/signup") || path.includes("/auth/signup")) {
    return NextResponse.next();
  }

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
    "/api/:path*", // Add this to handle API routes
  ],
};
