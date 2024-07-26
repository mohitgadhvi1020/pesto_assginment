// utills/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust this to match your backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
