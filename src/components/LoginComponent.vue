<template>
  <div class="login-container">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="credentials.email"
        required
        placeholder="Email"
      />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="credentials.password"
        required
        placeholder="Password"
      />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from "vue"; // 使用 ref 和 reactive 來處理響應式數據
import { useRouter } from "vue-router"; // 使用 Vue Router 來實現路由導航
import { useReCaptcha } from "vue-recaptcha-v3"; // 使用 useReCaptcha 提供的 reCAPTCHA 功能
//reCAPTCHA v3 的驗證方式是隱式的，因此它不需要顯示驗證碼的欄位 V2 才是有欄位
export default {
  name: "LoginComponent",
  setup() {
    const router = useRouter(); // 獲取 Vue Router 的路由對象
    const credentials = reactive({
      email: "",
      password: "",
    }); // 使用 reactive 定義表單數據

    const captchaToken = ref(null); // 用 ref 定義 reCAPTCHA token
    const { executeRecaptcha } = useReCaptcha(); // 使用 useReCaptcha 從中獲取 executeRecaptcha

    // 驗證 reCAPTCHA，並獲取 token
    const onRecaptchaVerified = async () => {
      const token = await executeRecaptcha(); // 執行 reCAPTCHA 驗證，獲取 token
      captchaToken.value = token; // 保存 token
      console.log("Recaptcha token:", token);
    };

    // 登錄邏輯
    const login = async () => {
      await onRecaptchaVerified(); // 在登錄之前先進行 reCAPTCHA 驗證

      if (!captchaToken.value) {
        alert("請完成驗證碼");
        return;
      }

      try {
        // 發送登錄請求
        const response = await this.axios.post("/login", {
          ...credentials,
          captcha_token: captchaToken.value, // 傳遞 reCAPTCHA token 給後端
        });

        if (response.data.status === "success") {
          localStorage.setItem("auth_token", response.data.token);
          alert("Login successful!");
          router.push({ name: "User" }); // 登錄成功後跳轉
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Login error:", error);
        alert(error.response.data.message);
      }
    };

    return {
      credentials,
      login,
    };
  },
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
