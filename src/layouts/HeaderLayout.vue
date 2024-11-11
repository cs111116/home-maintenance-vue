<template>
  <header>
    <div class="left">
      <h1>Welcome to Your Vue.js App</h1>
    </div>
    <div class="right">
      <router-link v-if="!isLoggedIn" to="/login" class="button">登入</router-link>
      <router-link v-if="!isLoggedIn" to="/register" class="button">註冊</router-link>
      <button v-if="isLoggedIn" v-disable-on-click="handleLogout" class="button alert">登出</button>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { useRouter } from 'vue-router';

export default {
  name: "HeaderLayout",
  setup() {
    // 使用 Composition API 獲取路由器實例
    const router = useRouter();
    const authStore = useAuthStore();

    // 計算屬性，用來判斷是否已經登入
    const isLoggedIn = computed(() => authStore.isLoggedIn);

    // 處理登出邏輯
    const handleLogout = async () => {
      const result = await authStore.logout();
      if (result.success) {
        alert("登出成功");
        router.push({ name: "Home" });
      } else if (result.expired) {
        alert("您的登入憑證已失效，請重新登入。");
        router.push({ name: "Login" });
      } else {
        alert(result.message || "登出失敗，請稍後重試");
      }
    };
    return {
      isLoggedIn,
      handleLogout,
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
}

header .left {
  flex-grow: 1;
}

header .right {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

header .right .button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  border: none;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
}

header .right .button:hover {
  background-color: #0056b3;
}
</style>
