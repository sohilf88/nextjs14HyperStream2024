import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { Userdata } from "./next-auth.type";


// export const {handlers:{GET,POST},auth,signIn,signOut } = NextAuth({
//     providers:[
//         CredentialsProvider({
//             name:"credentials",
//             credentials:{
//                         username: {
//                             label: "Email",
//                             type: "email"
//                         },
//                         password: {
//                             label: "Password",
//                             type: "password",
//                         },
//             },

//             }
//         })
//     ],


//     pages:{
//         signIn:"/login",
//     },
//     secret: process.env.AUTH_SECRET,
// }

// )

const credentialsConfig = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email: {
            label: "email",
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
        // console.log(user)

        if (user && user.accessToken) {

            return user;
        } else return null;


    }

});

const config = {
    providers: [credentialsConfig],
    pages: { signIn: "/auth/signin" },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {

        async jwt({ token, user }) {
            // console.log(user)
            if (user) {
                token.user = user as Userdata
                // console.log(token.user)
            }
            // console.log({ token })
            return token


        },
        async session({ session, token }) {
            // @ts-ignore
            session.user = token.user
            // console.log({ session })
            return session;
        },

    }
} satisfies NextAuthConfig;

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config);



