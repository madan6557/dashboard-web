import axios from 'axios';

const getBaseUrl = () => {
    if (process.env.REACT_APP_ENV === 'production') {
        return process.env.REACT_APP_PRODUCTION_API_URL;
    }
    return process.env.REACT_APP_DEVELOPMENT_API_URL;
};

const API = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor untuk menangani token, logging, atau error global
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Contoh token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
