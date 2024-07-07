<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="user.name" required placeholder="Your Name">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required placeholder="Email">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required placeholder="Password">
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async register() {
      try {
        const response = await this.axios.post('/register', this.user);
        if (response.status === 201) {
          alert('Registration successful!');
          // 进一步处理，例如重定向到登录页
        } else {
          alert('Registration failed!');
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed!');
      }
    }
  }
}
</script>

<style>
.register-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
