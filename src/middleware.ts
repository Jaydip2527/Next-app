import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;
  const contact_verified =
    req.cookies.get("contact_no_verified")?.value || null;
  const curAddress = req.cookies.get("curAddress")?.value || null;
  const organizations = req.cookies.get("organizations")?.value || null;
  const first_org = req.cookies.get("first_organisation")?.value || null;
  const contact_verify_token =
    req.cookies.get("contact_no_verification_token")?.value || null;
  const email_verify_token =
    req.cookies.get("email_verification_token")?.value || null;
  const user = req.cookies.get("user")?.value || null;

  // Publicly accessible routes
  const publicRoutes = [
    "/signin",
    "/",
    "/forgotpassword",
    // "/reset-password",
    "/otpverify",
  ];

  // ✅ Allow dynamic reset-password route (e.g., `/reset-password/abc123`)
  const isResetPasswordRoute = /^\/reset-password\/[^/]+$/.test(
    req.nextUrl.pathname
  );

  // Case 0: If user is logged out and accesing otpverify, redirect to signin
  if (
    !token &&
    !contact_verify_token &&
    !email_verify_token &&
    req.nextUrl.pathname === "/otpverify"
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Case 1: If user is logged in but not verified, redirect to OTP verify
  if (
    token &&
    contact_verified === "false" &&
    req.nextUrl.pathname !== "/otpverify"
  ) {
    return NextResponse.redirect(new URL("/otpverify", req.url));
  }

  // Case 2: If user has verification tokens but no auth token, allow "/otpverify"
  if (
    !token &&
    contact_verify_token &&
    email_verify_token &&
    user &&
    req.nextUrl.pathname !== "/otpverify"
  ) {
    return NextResponse.redirect(new URL("/otpverify", req.url));
  }

  // Case 3: If user is logged in and verification is complete, handle profile setup
  if (token && contact_verified === "true") {
    if (
      !curAddress &&
      first_org !== "true" &&
      (!organizations || organizations === "0") &&
      req.nextUrl.pathname !== "/organizationprofile"
    ) {
      return NextResponse.redirect(new URL("/organizationprofile", req.url));
    }
    // if (
    //   !curAddress &&
    //   organizations !== "0" &&
    //   organizations !== "1" &&
    //   req.nextUrl.pathname !== "/select-organization-profile"
    // ) {
    //   return NextResponse.redirect(
    //     new URL("/select-organization-profile", req.url)
    //   );
    // }
  }

  // Case 4: If user is authenticated and tries to access public routes (except otpverify), redirect to dashboard
  if (
    token &&
    publicRoutes.includes(req.nextUrl.pathname) &&
    req.nextUrl.pathname !== "/otpverify"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Case 5: If user is NOT authenticated and is trying to access a protected route (except otpverify), redirect to login
  if (
    !token &&
    !publicRoutes.includes(req.nextUrl.pathname) &&
    !isResetPasswordRoute
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next(); // Allow request to proceed
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|next.svg|vercel.svg).*)",
  ],
};
