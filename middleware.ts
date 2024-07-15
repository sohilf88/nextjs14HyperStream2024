
import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { jwtAccessType } from "./typescript.definations";






export async function middleware(request: NextRequest) {
    // console.log(process.env.NEXT_PUBLIC_URL)


    const jwtCookies = cookies()
    //  const token = jwtCookies.get("jwtAccess")?.value
    // const decoded = jwtDecode(token) as jwtAccessType;



    // console.log(decoded.roles.includes("root"))

    const response = NextResponse.next()
    // if refresh cookie deleted then run this function
    // if (decoded && !decoded.roles.includes("root") && request.url.match("/admin")) {
    //     return NextResponse.redirect(new URL("/dashboard", request.url))
    // }

    if (!jwtCookies.has("jwtRe")) {

        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    if (jwtCookies.has("jwtRe")) {

        if (!jwtCookies.has("jwtAccess")) {

            try {
                // console.log("running")
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/refresh`, { method: "GET", credentials: "include", headers: { Cookie: cookies().toString() } })

                const cookie: any = res.headers.getSetCookie()
                response.cookies.set({
                    name: 'jwtAccess',
                    value: cookie,

                })
                // console.log(response)
                
                return response

            } catch (error) {
                const errorResult = (error as Error);
                if (errorResult) {
                    return NextResponse.redirect(new URL("/auth/login", request.url))
                }
            }



        }
    }

    if (!jwtCookies.has("jwtAccess") && !jwtCookies.has("jwtRe")) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/admin", "/user/:page*", "/dashboard"]
}