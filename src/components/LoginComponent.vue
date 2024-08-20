<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="credentials.email" required placeholder="Email">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="credentials.password" required placeholder="Password">
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.axios.post('/login', this.credentials);
        if (response.data.status === "success") {
          alert('Login successful!');
          console.log(response.data);
          this.$router.push({ name: 'User' });
        } else {
          console.log(response.data);
          alert('Login failed:' + response.data.message);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed!');
      }
    }
  }
}
</script>

<style>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
