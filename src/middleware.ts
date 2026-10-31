import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "brightloop-super-secret-jwt-key-2026-secure!"
);

const SESSION_COOKIE_NAME = "brightloop_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  let session: { userId: string; email: string; role: string; name: string } | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      session = {
        userId: payload.userId as string,
        email: payload.email as string,
        role: payload.role as string,
        name: payload.name as string,
      };
    } catch {
      session = null;
    }
  }

  // Redirect authenticated users away from auth pages
  if (session && (pathname === "/login" || pathname === "/register" || pathname === "/forgot-password")) {
    if (session.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (session.role === "STAFF") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/portal/dashboard", request.url));
    }
  }

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url));
    }
    // Only ADMIN (or STAFF if allowed) can access admin
    if (pathname.startsWith("/admin/staff") && session.role !== "ADMIN") {
      // Only Admin can access staff management
      return NextResponse.redirect(new URL("/admin/dashboard?error=unauthorized", request.url));
    }
    if (session.role !== "ADMIN" && session.role !== "STAFF") {
      return NextResponse.redirect(new URL("/portal/dashboard", request.url));
    }
  }

  // Protect /portal routes
  if (pathname.startsWith("/portal")) {
    if (!session) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
