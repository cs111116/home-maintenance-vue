<template>
  <div id="app">
    <HeaderLayout @login-success="updateLoginStatus" />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import HeaderLayout from "./layouts/HeaderLayout.vue";

export default {
  name: "App",
  components: {
    HeaderLayout,
  },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("auth_token"), // 初始化登入狀態
    };
  },
  methods: {
    updateLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem("auth_token"); // 每次更新都檢查 token 是否存在
    },
  },
};
</script>

<style>
main {
  padding-top: 100px; /* 確保內容不會被固定在頂部的 header 覆蓋 */
}
</style>