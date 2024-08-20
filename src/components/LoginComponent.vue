<template>
  <div class="login-container">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="credentials.email" required placeholder="Email">
      
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="credentials.password" required placeholder="Password">
      
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
          this.$router.push({ name: 'User' });
        } else {
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
