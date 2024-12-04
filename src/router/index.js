import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/modules/auth';
import homeRoutes from './modules/home';
import userRoutes from './modules/user';
import accountingRoutes from './modules/accounting';
import NotFound from '../views/NotFound.vue';

const routes = [
  ...homeRoutes,
  ...userRoutes,
  ...accountingRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // 引入 Pinia 的認證狀態
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'Login' }); // 未登入時跳轉到登入頁
  } else {
    next(); // 繼續導航
  }
});
export default router;
