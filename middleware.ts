
import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { jwtAccessType } from "./typescript.definations";






export async function middleware(request: NextRequest) {
    // console.log(process.env.NEXT_PUBLIC_URL)


    const jwtCookies = cookies()

    // console.log((jwtCookies.has("jwtRe") && jwtCookies.has("jwtAccess") && request.nextUrl.pathname === "/"))

    // if (jwtCookies.has("jwtRe") && jwtCookies.has("jwtAccess") && request.nextUrl.pathname === "/auth/login") {

    //     return NextResponse.redirect(new URL("/dashboard", request.url))

    // }

    const response = NextResponse.next()


    if (!jwtCookies.has("jwtRe")) {

        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // if (jwtCookies.has("jwtRe")) {

    //     if (!jwtCookies.has("jwtAccess")) {
    //         console.log("Running this middleware to get jwtAccess cookie")
    //         try {
    //             // console.log("running")
    //             const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/refresh`, { method: "GET", credentials: "include", headers: { Cookie: cookies().toString() } })

    //             const cookie: any = res.headers.getSetCookie()
    //             response.cookies.set({
    //                 name: 'jwtAccess',
    //                 value: cookie,

    //             })
    //             // console.log(response)

    //             return response

    //         } catch (error) {
    //             const errorResult = (error as Error);
    //             if (errorResult) {
    //                 return NextResponse.redirect(new URL("/auth/login", request.url))
    //             }
    //         }



    //     }
    // }

    if (!jwtCookies.has("jwtAccess") && !jwtCookies.has("jwtRe")) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }


    return NextResponse.next()
}



export const config = {
    matcher: ["/admin/:page*", "/user/:page*", "/dashboard", "/"]
}