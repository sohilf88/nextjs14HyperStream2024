import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import type { jwtAccessType } from "./typescript.definations";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const refreshToken = request.cookies.get("jwtRe")?.value;
  const accessToken = request.cookies.get("jwtAccess")?.value;

  const isLoginPage = pathname === "/auth/login";

  // ------------------------------------------------
  // 1. If completely logged out → always redirect
  // ------------------------------------------------
  if (!refreshToken) {
    // Logged-out users can access login page
    if (isLoginPage) return NextResponse.next();

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // ------------------------------------------------
  // 2. If logged-in user tries to go to /auth/login → redirect to dashboard
  // ------------------------------------------------
  console.log(isLoginPage)
  console.log( request.url)
  if (refreshToken && accessToken && isLoginPage) {
    
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ------------------------------------------------
  // 3. If access-token exists → decode and validate
  //    BUT expired token must NOT redirect → axios handles it
  // ------------------------------------------------
  if (accessToken) {
    try {
      const decoded = jwtDecode<jwtAccessType>(accessToken);

      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        console.log("Access token expired → allowed");
        return NextResponse.next();
      }
    } catch {
      console.log("Malformed token → force logout");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // ------------------------------------------------
  // 4. Everything is fine → allow
  // ------------------------------------------------
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/admin/:path*", "/user/:path*", "/dashboard", "/"],
// };

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|images|public).*)",
  ],
};

