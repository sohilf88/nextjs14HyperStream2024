import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
export function middleware(request: NextRequest) {

    const cookie = cookies()
    // if (!cookie.has("jwtRe")) {
    //     return NextResponse.redirect(new URL("/auth/login", request.url))
    // }
    return NextResponse.next()
}