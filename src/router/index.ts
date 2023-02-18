import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frontView',
      component: () => import('../views/FrontView.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/HomePage.vue')
        },
        {
          path: 'expense',
          name: 'expense',
          component: () => import('../views/RecordExpense.vue')
        },
        {
          path: 'assets',
          name: 'assets',
          component: () => import('../views/RecordAssets.vue')
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    }
    
  ]
})

export default router
