import { customError } from "@/typescript.definations";
import axios, { isAxiosError } from "axios"
import { toast } from "sonner";

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    headers: { "Content-Type": "application/json" }

});

export const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,

    headers: {
        "Content-Type": "application/json",


    },
    "withCredentials": true

})

axiosAuth.interceptors.response.use(
    (response) => {
        
        
        // console.log(response)
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        // console.log(error.response.data.message)
        if (error.response.status === 401 && error.response.data.message === "TokenExpiredError" || error.response.data.message === "JsonWebTokenError" && !originalRequest.sent) {
            originalRequest.sent = true;

            try {
                await generateNewAccessToken();
                return axiosAuth(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                return refreshError
            }
        }
        return Promise.reject(error);
    }
);

export const generateNewAccessToken = async () => {
    try {
        await axiosAuth.get(`/auth/refresh`);
    } catch (error: unknown) {
        if (isAxiosError(error) && error.response?.data) {
            const errorResponse = error.response.data as customError
            toast.error(errorResponse.message)
        }

    }
};



