<template>
  <div id="app">
    <h1>Welcome to Your Vue.js App</h1>
    <router-link to="/login">
      <button>Login</button>
    </router-link>
    <router-link to="/register">
      <button>Register</button>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  text-align: center;
}
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
