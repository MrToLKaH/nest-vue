import { createRouter, createWebHistory } from 'vue-router/dist/vue-router';
import LoginPage from '@/pages/LoginPage';
import RegistrationPage from '@/pages/RegistrationPage';

const routes = [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/registration',
    component: RegistrationPage
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router;