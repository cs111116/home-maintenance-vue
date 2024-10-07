import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/styles/styles.scss";
import { VueReCaptcha } from "vue-recaptcha-v3";// 從 vue-recaptcha-v3 導入 VueReCaptcha 插件 此命名方式是固定的
// 使用 Axios 拦截器动态设置 token
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
// 设置 axios 的基础 URL
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
// 设置全局请求头
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
const app = createApp(App);
// app.component('HCaptcha', HCaptcha);
// 使用 VueAxios 插件并配置全局 axios 实例
app.use(VueAxios, axios);
app.use(VueReCaptcha, {
  siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY // 替換為你的 reCAPTCHA siteKey
});

app.use(router);
app.mount("#app");
