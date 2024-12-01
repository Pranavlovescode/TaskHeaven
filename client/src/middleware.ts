import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const publicPaths = ["/", "/register"];

  // Get cookies
  const admin_jwt = request.cookies.get("admin_jwt")?.value;
  const emp_jwt = request.cookies.get("employee_jwt")?.value;
  const mng_jwt = request.cookies.get("manager_jwt")?.value;
  const cookie_otp = request.cookies.get("cookie_otp")?.value;

  console.log(`Middleware triggered for path: ${path}`);
  console.log(`Admin JWT Cookie: ${admin_jwt}`);
  console.log(`Employee JWT Cookie: ${emp_jwt}`);
  console.log(`Manager JWT Cookie: ${mng_jwt}`);
  console.log(`OTP Cookie: ${cookie_otp}`);

  // Check for public paths
  if (publicPaths.includes(path)) {
    console.log("Public path detected, middleware allowing access.");
    return NextResponse.next();
  }

  // Check for valid JWT cookies based on path
  if (
    path.startsWith("/adm-dash") && !admin_jwt ||
    path.startsWith("/emp-dash") && !emp_jwt ||
    path.startsWith("/mng-dash") && !mng_jwt
  ) {
    console.log("Redirecting to / due to missing required JWT cookie.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Prevent infinite loop for verify-email
  if (path.startsWith('/register/verify-email') && !cookie_otp) {
    console.log("Missing OTP cookie, preventing redirection loop.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("Access allowed, proceeding with request.");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/register/:path*",
    "/adm-dash/:path*",
    "/emp-dash/:path*",
    "/mng-dash/:path*",
  ],
};
