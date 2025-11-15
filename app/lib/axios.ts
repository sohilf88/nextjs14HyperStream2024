// import { customError } from "@/typescript.definations";
// import axios, { isAxiosError } from "axios"
// import { toast } from "sonner";

// export default axios.create({
//     baseURL: process.env.NEXT_PUBLIC_URL,
//     headers: { "Content-Type": "application/json" }

// });

// export const axiosAuth = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_URL,
    

//     // headers: {
//     //     "Content-Type": "application/json",


//     // },
//     "withCredentials": true

// })

// axiosAuth.interceptors.response.use(
//     (response) => {

//         // return normal response as it is

//         return response;
//     },
//     async function (error) {
//         const originalRequest = error.config;
//         // console.log(error.response.data.message)
//         if (error.response.status === 401 && !originalRequest.sent) {
//             originalRequest.sent = true;

//             try {
//                 await generateNewAccessToken();
//                 return axiosAuth(originalRequest);
//             } catch (refreshError) {
//                 console.error("Token refresh failed:", refreshError);
//                 return refreshError
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export const generateNewAccessToken = async () => {
//     try {
//         await axiosAuth.get(`/auth/refresh`);
//     } catch (error: unknown) {
//         if (isAxiosError(error) && error.response?.data) {
//             const errorResponse = error.response.data as customError
//             toast.error(errorResponse.message)


//         }

//     }
// };

import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { customError } from "@/typescript.definations";

export const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    headers: { "Content-Type": "application/json" }
});

export const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    withCredentials: true
});

// ---------------------------
// Refresh Function
// ---------------------------
export const generateNewAccessToken = async () => {
    try {
        const response = await axiosAuth.get(`/auth/refresh`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ---------------------------
// Axios Interceptor
// ---------------------------
axiosAuth.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (!error.response) return Promise.reject(error);

        const status = error.response.status;

        // ---------------------------
        // 1️⃣ ACCESS TOKEN EXPIRED → TRY REFRESH
        // ---------------------------
        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await generateNewAccessToken();
                return axiosAuth(originalRequest); // retry original
            } catch (refreshErr) {
                console.error("Refresh failed:", refreshErr);
                logoutUser();
                return Promise.reject(refreshErr);
            }
        }

        // ---------------------------
        // 2️⃣ REFRESH TOKEN EXPIRED (your backend returns 209)
        // ---------------------------
        if (status === 209) {
            toast.error("Session expired! Please log in again.");
            logoutUser();
            return Promise.reject(error);
        }

        // ---------------------------
        // 3️⃣ USER UNAUTHORIZED OR NOT FOUND
        // ---------------------------
        if ([403, 404].includes(status)) {
            toast.error("You are logged out. Please login again.");
            logoutUser();
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

// ---------------------------
// Global Logout Helper
// ---------------------------
function logoutUser() {
    if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/auth/login";
    }
}



