<template>
  <div class="login-container">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="credentials.email" required placeholder="Email" />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="credentials.password" required placeholder="Password" />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from '@/store/modules/auth';
import { useReCaptcha } from 'vue-recaptcha-v3';

export default {
  name: "LoginView",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { executeRecaptcha } = useReCaptcha();
    const credentials = reactive({
      email: "",
      password: ""
    });

    const login = async () => {
      const captchaToken = await executeRecaptcha('login');
      if (!captchaToken) {
        alert("請完成驗證碼");
        return;
      }
      await authStore.login(credentials, captchaToken);
      router.push({ name: "User" });
    };

    return {
      credentials,
      login
    };
  }
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 150px auto 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 8px;
}

h1.text-center {
  margin-bottom: 20px;
  font-size: 24px;
}

.login-container label {
  display: block;
  margin-bottom: 5px;
}

.login-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.login-container button:hover {
  background-color: #0056b3;
}
</style>
