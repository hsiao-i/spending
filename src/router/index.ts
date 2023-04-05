import { createRouter, createWebHashHistory } from 'vue-router';

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
          component: () => import('../views/HomePage.vue'),
        },
        {
          path: 'spending',
          name: 'spending',
          component: () => import('../views/RecordExpense.vue'),
        },
        {
          path: 'assets',
          name: 'assets',
          component: () => import('../views/RecordAssets.vue'),
        },
        {
          path: 'charts',
          component: () => import('../views/ChartAnalyze.vue'),
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },

  ],
});

// router.beforeEach((to, from, next) => {
//   const isLogin: boolean = !!localStorage.token;

//   if (to.path === '/login' || to.path === '/register') {
//     next();
//   } else {
//     isLogin ? next() : next('/login');
//     // 如果登入過的話，要到什麼 路由都可以 next()，如果沒登入過，就會導到 login
//   }
// });

export default router;
