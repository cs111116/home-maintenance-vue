<template>
  <div class="register-container">
    <h1 class="text-center">Register</h1>
    <form @submit.prevent="register">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="user.name" required placeholder="Your Name" class="input-group-field">

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="user.email" required placeholder="Email" class="input-group-field">

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="user.password" required placeholder="Password" class="input-group-field">

      <button type="submit" class="button expanded">Register</button>
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
        if (response.data.status === "success") {
          alert('Registration successful!');
          this.$router.push({ name: 'Login' });  // 進一步處理，例如重定向到登錄頁
        } else {
          alert('Registration failed:' + response.data.message);
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed!');
      }
    }
  }
}
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
