import { defineStore } from 'pinia';
import axios from '@/plugins/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    async login(payload, captchaToken) {
      try {
        if (!captchaToken) {
          alert("請完成驗證碼");
          return;
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
          alert('Login successful!');
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed: ' + (error.response?.data?.message || error.message));
      }
    },
    async register(payload, captchaToken) {
      try {
        if (!captchaToken) {
          alert("請完成驗證碼");
          return;
        }

        // 添加驗證碼 token 到請求中
        const response = await axios.post('/register', {
          ...payload,
          captcha_token: captchaToken,
        });

        if (response.data.status === 'success') {
          alert('Registration successful!');
        } else {
          alert('Registration failed: ' + response.data.message);
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed: ' + (error.response?.data?.message || error.message));
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('auth_token');
    }
  }
});
