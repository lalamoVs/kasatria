import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // If user is authenticated and tries to access root or sign-in page
    if (token && (path === "/" || path === "/signin")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user is not authenticated and tries to access protected routes
    if (!token && path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         // Return true if token exists (user is authenticated)
//         return !!token;
//       },
//     },
//   }
);

// Specify which routes to protect
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/signin",
  ],
};