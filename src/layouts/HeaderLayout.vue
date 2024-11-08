<template>
  <header>
    <div class="left">
      <h1>Welcome to Your Vue.js App</h1>
    </div>
    <div class="right">
      <router-link v-if="!isLoggedIn" to="/login" class="button"
        >登入</router-link
      >
      <router-link v-if="!isLoggedIn" to="/register" class="button"
        >註冊</router-link
      >
      <button v-if="isLoggedIn" @click="logout" class="button alert">
        登出
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderLayout",
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("auth_token"), // 初始判斷是否登入
    };
  },
  watch: {
    // 監聽 localStorage 變化來更新 isLoggedIn 狀態
    $route() {
      this.isLoggedIn = !!localStorage.getItem("auth_token");
    },
  },
  methods: {
    async logout() {
      try {
        // 確認 token 是否存在
        console.log("test");
        const token = localStorage.getItem("auth_token");
        if (!token) {
          alert("無法登出，因為未找到有效的登入憑證。");
          return;
        }

        // 調用後端的登出 API
        const response = await this.axios.post(
          "/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 驗證後端是否回傳了成功的狀態
        if (response.data.status === "success") {
          // 清除 localStorage 中的 token
          localStorage.removeItem("auth_token");
          // 更新 isLoggedIn 狀態
          this.isLoggedIn = false;
          // 導航到登入頁面
          this.$router.push({ name: "Login" });
          alert("登出成功");
        } else {
          alert(response.data.message || "登出失敗，請稍後重試");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // 當 token 已過期或無效，清除 localStorage 並跳轉到登入頁面
          localStorage.removeItem("auth_token");
          this.isLoggedIn = false;
          this.$router.push({ name: "Login" });
          alert("您的登入憑證已失效，請重新登入。");
        } else {
          console.error("登出失敗:", error);
          alert("登出失敗，請稍後重試");
        }
      }
    },
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
