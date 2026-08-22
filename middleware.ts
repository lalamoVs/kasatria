// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const runtime = 'nodejs'; // Force Node.js runtime

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Your existing logic remains the same
    if (token && (path === "/" || path === "/signin")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!token && path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/", "/dashboard/:path*", "/signin"],
};