import axios from 'axios';
import * as SecureStore from "expo-secure-store";
const axiosInstance = axios.create({
    baseURL: 'http://10.0.2.2:8080',//'https://68df-129-0-103-75.ngrok-free.app',
});

// Function to retrieve the token
const getAuthToken = () => {
    // Assuming the token is stored in localStorage
    return SecureStore.getItem('TOKEN');
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;