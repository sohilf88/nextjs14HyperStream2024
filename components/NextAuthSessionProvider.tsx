"use client"
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react"
function NextAuthSessionProvider({children}:{children:ReactNode}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default NextAuthSessionProvider