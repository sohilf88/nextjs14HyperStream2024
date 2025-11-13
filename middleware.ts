
// import { NextRequest, NextResponse } from "next/server";

// import { cookies } from "next/headers";
// import { jwtDecode, JwtPayload } from "jwt-decode";
// import { jwtAccessType } from "./typescript.definations";






// export async function middleware(request: NextRequest) {
//     // console.log(process.env.NEXT_PUBLIC_URL)


//     const jwtCookies = cookies()

//     // console.log((jwtCookies.has("jwtRe") && jwtCookies.has("jwtAccess") && request.nextUrl.pathname === "/"))
//     // console.log(jwtCookies.has("jwtRe") && jwtCookies.has("jwtAccess"))

//     if (jwtCookies.has("jwtRe") && jwtCookies.has("jwtAccess") && request.nextUrl.pathname === "/auth/login") {

//         return NextResponse.redirect(new URL("/dashboard", request.url))

//     }

//     const response = NextResponse.next()


//     if (!jwtCookies.has("jwtRe")) {

//         return NextResponse.redirect(new URL("/auth/login", request.url))
//     }

//     // if (jwtCookies.has("jwtRe")) {

//     //     if (!jwtCookies.has("jwtAccess")) {
//     //         console.log("Running this middleware to get jwtAccess cookie")
//     //         try {
//     //             // console.log("running")
//     //             const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/refresh`, { method: "GET", credentials: "include", headers: { Cookie: cookies().toString() } })

//     //             const cookie: any = res.headers.getSetCookie()
//     //             response.cookies.set({
//     //                 name: 'jwtAccess',
//     //                 value: cookie,

//     //             })
//     //             // console.log(response)

//     //             return response

//     //         } catch (error) {
//     //             const errorResult = (error as Error);
//     //             if (errorResult) {
//     //                 return NextResponse.redirect(new URL("/auth/login", request.url))
//     //             }
//     //         }



//     //     }
//     // }
    

//     if (!jwtCookies.has("jwtAccess") && !jwtCookies.has("jwtRe")) {
//         return NextResponse.redirect(new URL("/auth/login", request.url))
//     }


//     return NextResponse.next()
// }



// export const config = {
//     matcher: ["/admin/:page*", "/user/:page*", "/dashboard", "/", ]
// }

import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import type { jwtAccessType } from "./typescript.definations";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Use request.cookies instead of cookies() in middleware — it’s faster and context-safe
  const hasRefresh = request.cookies.has("jwtRe");
  const hasAccess = request.cookies.has("jwtAccess");

  // Redirect logged-in users away from login page
  if (hasAccess && hasRefresh && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If no refresh token, user is not authenticated → redirect to login
  if (!hasRefresh) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Optionally verify if the access token is valid (e.g. not expired)
  if (hasAccess) {
    try {
      const accessToken = request.cookies.get("jwtAccess")?.value;
      const decoded = jwtDecode<jwtAccessType>(accessToken!);
      console.log(decoded)
    //   Example: Check if token expired
      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        console.log("Access token expired");
        // Optionally refresh token here using your refresh endpoint
        // Or redirect to login if refresh fails
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    } catch (err) {
      console.error("Invalid access token:", err);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // ✅ Allow request to continue if everything is valid
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/dashboard",
    "/",
  ],
};
