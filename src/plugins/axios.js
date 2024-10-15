import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";

export default axios;
