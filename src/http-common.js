import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://djangoreact-api.herokuapp.com/api",
    headers: {
        "Content-type": "application/json",
        "accept": "application/json"
    }
});

export default axiosInstance;