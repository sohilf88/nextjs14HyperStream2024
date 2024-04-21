// "use client"
// import { axiosAuth } from "@/app/lib/axios"

// import useRefreshToken from "./useRefreshToken"


// export default function useAxiosAuth() {
//     // const { data: session } = useSession()
//     const generateRefreshToken = useRefreshToken()


//      axiosAuth.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//             const prevRequest = error?.config;
//             if (error?.response?.status === 401 && !prevRequest?.sent) {
//                 prevRequest.sent = true;
//                 await generateRefreshToken();

//                 return axiosAuth(prevRequest);
//             }
//             return Promise.reject(error);
//         }
//     );
//     return axiosAuth




// }