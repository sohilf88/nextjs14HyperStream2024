
import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";


export async function middleware(request: NextRequest) {

    const jwtCookies = cookies()
    const response = NextResponse.next()
    // if refresh cookie deleted then run this function
    if (!jwtCookies.has("jwtRe")) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    
    if (jwtCookies.has("jwtRe") ) {

        if (!jwtCookies.has("jwtAccess")) {

            try {
                const res = await fetch("http://localhost:5000/api/v1/auth/refresh", { method: "GET", credentials: "include", headers: { Cookie: cookies().toString() } })

                const cookie: any = res.headers.getSetCookie()
                response.cookies.set({
                    name: 'jwtAccess',
                    value: cookie,

                })
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
    matcher: ["/", "/admin", "/user", "/auth/reset-password"]
}