import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://djangoreact-api.herokuapp.com/api",
    timeout: 5000,
    headers: {
        "Authorization": "JWT " + localStorage.getItem("access_token"),
        "Content-type": "application/json",
        "accept": "application/json"
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && originalRequest.url === axiosInstance.baseURL+'token/refresh') {
            window.location.href = '/login/';
            return Promise.reject(error)
        }

        if (error.response.data.code === "token_not_valid" && 
        error.response.status === 401 && error.response.statusText === "Unauthorized") {
            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return axiosInstance
                    .post('/token/refresh/', {refresh: refreshToken})
                    .then(response => {
                        localStorage.setItem("access_token", response.data.access);
                        localStorage.setItem("refresh_token", response.data.refresh);
                        axiosInstance.defaults.headers["Authorization"] = "JWT " + response.data.access;
                        originalRequest.headers["Authorization"] = "JWT " + response.data.access;
                        return axiosInstance(originalRequest)
                    })
                    .catch(e => {
                        console.log(e)
                    })
                } else {
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = '/login/'
                }
            } else {
                console.log("Refresh token not available")
                window.location.href = '/login/';
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;












