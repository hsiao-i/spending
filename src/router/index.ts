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
          path: '',
          name: '',
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
    
  ]
})

export default router
