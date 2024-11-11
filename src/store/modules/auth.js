import { defineStore } from 'pinia';
import axios from '@/plugins/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('auth_token') || null
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async login(payload, captchaToken) {
      try {
        if (!captchaToken) {
          return { success: false, message: "請完成驗證碼" };
        }

        // 添加驗證碼 token 到請求中
        const response = await axios.post('/login', {
          ...payload,
          captcha_token: captchaToken,
        });

        if (response.data.status === 'success') {
          this.user = response.data.user;
          this.token = response.data.token;
          localStorage.setItem('auth_token', this.token);
          return { success: true };
        } else {
          return { success: false, message: response.data.message };
        }
      } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
      }
    },
    async register(payload, captchaToken) {
      try {
        if (!captchaToken) {
          return { success: false, message: "請完成驗證碼" };
        }

        // 添加驗證碼 token 到請求中
        const response = await axios.post('/register', {
          ...payload,
          captcha_token: captchaToken,
        });

        if (response.data.status === 'success') {
          return { success: true };
        } else {
          return { success: false, message: response.data.message };
        }
      } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
      }
    },
    async logout() {
      try {
        if (!this.token) {
          throw new Error("無法登出，因為未找到有效的登入憑證。");
        }

        const response = await axios.post('/logout', {}, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.data.status === "success") {
          localStorage.removeItem('auth_token');
          this.user = null;
          this.token = null;
          return { success: true };
        } else {
          return { success: false, message: response.data.message || "登出失敗，請稍後重試" };
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('auth_token');
          this.user = null;
          this.token = null;
          return { success: false, message: "您的登入憑證已失效，請重新登入。" };
        } else {
          return { success: false, message: error.message || "登出失敗，請稍後重試" };
        }
      }
    }
  }
});
