// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Force Node.js runtime
export const runtime = 'nodejs';

export default withAuth(
  function middleware(req) {
    // ... your middleware logic
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/signin",
  ],
};