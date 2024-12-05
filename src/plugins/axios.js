import axios from "axios";
import router from "@/router"; // 如果需要跳轉路由

// 建立 Axios 實例
const mainAxios  = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // API 基本路徑
  headers: {
    "Content-Type": "application/json", // 使用 JSON 格式
  },
});

// 請求攔截器
mainAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// 響應攔截器
mainAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Token 過期
      if (status === 401) {
        alert("憑證已過期，請重新登入。");
        localStorage.removeItem("auth_token");
        router.push({ name: "Login" }); // 跳轉至登入頁
      }

      // 權限不足
      if (status === 403) {
        alert("您沒有權限執行此操作。");
      }

      // 其他錯誤
      console.error(`HTTP Error ${status}:`, error.response.data.message || "未知錯誤");
    }

    return Promise.reject(error);
  }
);

export default mainAxios;
