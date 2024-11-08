// NotFound.vue
<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}

.not-found h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.not-found p {
  font-size: 18px;
  margin-bottom: 20px;
}

.not-found a {
  color: #007bff;
  text-decoration: none;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>
