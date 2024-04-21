import axios from "axios"

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
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await generateRefreshToken();
                return axiosAuth(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const generateRefreshToken = async () => {
    try {
        await axiosAuth.get(`/auth/refresh`);
    } catch (error: any) {
        console.error("error.message");
        
    }
};