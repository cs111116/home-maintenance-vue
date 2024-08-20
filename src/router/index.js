import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginComponent.vue';
import Register from '../components/RegisterComponent.vue';
import Home from '../components/HomeComponent.vue';
import User from '../components/UserComponent.vue'; // 引入 UserComponent
const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/user', component: User, name: 'User' },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
