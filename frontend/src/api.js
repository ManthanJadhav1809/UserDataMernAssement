import axios from "axios";

// http://localhost:5000/
// https://user-data-mern-assement-backend.vercel.app/
const api = axios.create({
  baseURL: "http://localhost:5000/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
