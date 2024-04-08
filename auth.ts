import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

const credentialsConfig = CredentialsProvider({
    name: "Credentials",
    credentials: {
        username: {
            label: "Email",
            type: "email"
        },
        password: {
            label: "Password",
            type: "password",
        },
    },
    async authorize(credentials) {
        const { email, password } = credentials as any
        const res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const user = await res.json();
        console.log({ user });
        if (res.ok && user) {
            return user;
        } else return null;

    },

});

const config = {
    providers: [credentialsConfig],
    pages: { signIn: "/signin" },
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl;
            if (pathname === "/middlewareProtected") return !!auth;
            return true;
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);



