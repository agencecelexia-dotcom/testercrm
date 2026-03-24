import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role as string;

    // Route protection by role
    if (path.startsWith("/agence") && role !== "AGENCE") {
      return NextResponse.redirect(new URL(getDashboard(role), req.url));
    }
    if (path.startsWith("/client") && role !== "CLIENT") {
      return NextResponse.redirect(new URL(getDashboard(role), req.url));
    }
    if (path.startsWith("/closer") && role !== "CLOSER") {
      return NextResponse.redirect(new URL(getDashboard(role), req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

function getDashboard(role: string): string {
  switch (role) {
    case "AGENCE":
      return "/agence/dashboard";
    case "CLIENT":
      return "/client/dashboard";
    case "CLOSER":
      return "/closer/dashboard";
    default:
      return "/login";
  }
}

export const config = {
  matcher: ["/agence/:path*", "/client/:path*", "/closer/:path*"],
};
