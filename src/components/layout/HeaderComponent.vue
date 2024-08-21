// src/components/HeaderComponent.vue
<template>
  <header>
    <div class="left">
      <h1>Welcome to Your Vue.js App</h1>
    </div>
    <div class="right">
      <router-link v-if="!isLoggedIn" to="/login" class="button">登入</router-link>
      <router-link v-if="!isLoggedIn" to="/register" class="button">註冊</router-link>
      <button v-if="isLoggedIn" @click="logout" class="button alert">登出</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('auth_token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('auth_token');
      this.$router.push({ name: 'Login' });
    }
  }
}
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
