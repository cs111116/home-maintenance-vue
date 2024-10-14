import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginComponent.vue';
import Register from '../components/RegisterComponent.vue';
import Home from '../components/HomeComponent.vue';
import User from '../components/UserComponent.vue';

const routes = [
  { path: '/', component: Home, name: 'Home' }, // 根路徑指向 Home 組件
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/user', component: User, name: 'User' }, // 保持 user 路由
  { path: '/:pathMatch(.*)*', redirect: '/' }, // 將未知路徑重定向到首頁
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
