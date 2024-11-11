<template>
  <div class="register-container">
    <h1 class="text-center">Register</h1>
    <form @submit.prevent="register">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="user.name" required placeholder="Your Name" />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="user.email" required placeholder="Email" />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="user.password" required placeholder="Password" />

      <label for="password_confirmation">Confirm Password:</label>
      <input type="password" id="password_confirmation" v-model="user.password_confirmation" required
        placeholder="Confirm Password" />

      <button type="submit" class="button expanded">Register</button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useAuthStore } from "@/store/modules/auth"; // 引入 auth store
import { useRouter } from "vue-router";
import { useReCaptcha } from 'vue-recaptcha-v3';

export default {
  name: "RegisterView",
  setup() {
    const authStore = useAuthStore(); // 使用 auth store
    const router = useRouter();
    const { executeRecaptcha } = useReCaptcha();

    const user = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });

    const register = async () => {
      // 調用工具函數執行 reCAPTCHA 驗證
      const captchaToken = await executeRecaptcha("register");
      if (!captchaToken) {
        alert("請完成驗證碼");
        return;
      }
      // 調用 auth store 的 register 方法
      const result = await authStore.register(user, captchaToken);
      if (result.success) {
        alert('Register successful!');
        router.push({ name: "Login" });
      } else {
        alert(result.message);
      }


    };

    return {
      user,
      register
    };
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1.text-center {
  margin-bottom: 20px;
  font-size: 24px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #0056b3;
}
</style>
