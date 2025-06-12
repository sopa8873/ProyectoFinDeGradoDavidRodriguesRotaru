import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Crea una instancia de axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para añadir el JWT a cada petición
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Servicio personalizado usando el nombre 'axiosService'
const axiosService = {
    get: async (endpoint) => {
        const response = await api.get(endpoint);
        return response.data;
    },

    post: async (endpoint, body) => {
        const response = await api.post(endpoint, body);
        return response.data;
    },

    put: async (endpoint, body) => {
        const response = await api.put(endpoint, body);
        return response.data;
    },

    delete: async (endpoint) => {
        const response = await api.delete(endpoint);
        return response.data;
    }
};

export default axiosService;