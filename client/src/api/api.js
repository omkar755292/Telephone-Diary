import axios from 'axios';

// Create an Axios instance with baseURL from environment variable
const api = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export default api;
