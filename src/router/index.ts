import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/TodoView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { auth } from '@/configs/firebase'
import { useAuth } from '@vueuse/firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'all',
      component: TodoView
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: TodoView
    },
    {
      path: '/completed',
      name: 'completed',
      component: TodoView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

// Gardiens de navigation
router.beforeEach((to, from) => {
  const { isAuthenticated, user } = useAuth(auth)
  if (!isAuthenticated.value && to.name !== 'login' && to.name !== 'register') {
    return { name: 'login' }
  }
})

export default router
