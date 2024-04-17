"use client"

import axios from "@/app/lib/axios"
// import { useSession } from "next-auth/react"

const useRefreshToken = () => {
    // const { data: session } = useSession()
   
    const refreshToken = async () => {
        const res = await axios.get("auth/refresh", { withCredentials: true })
        // console.log(res,session)
        // if (session) {
        //     session.user.accessToken = res.data.aceessToken
        // }
    }
    return refreshToken

}

export default useRefreshToken