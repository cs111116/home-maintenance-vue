import { createRouter, createWebHistory } from 'vue-router';
import homeRoutes from './modules/home';
import userRoutes from './modules/user';
import NotFound from '../views/NotFound.vue';

const routes = [
  ...homeRoutes,
  ...userRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
