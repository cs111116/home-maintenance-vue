import UserView from '../../views/UserView.vue';
import LoginView from '../../views/LoginView.vue';
import RegisterView from '../../views/RegisterView.vue';
export default [
    {
      path: '/user',
      name: 'User',
      component: UserView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    }
  ];