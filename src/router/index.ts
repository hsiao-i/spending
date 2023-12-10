import Swal from 'sweetalert2';
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
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'assets',
          name: 'assets',
          component: () => import('../views/RecordAssets.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'charts',
          component: () => import('../views/ChartAnalyze.vue'),
          meta: {
            requireAuth: true,
          },
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

router.beforeEach((to, from, next) => {
  // const isLoginStore = useIsLogin();
  const isLoginSessionStorage = sessionStorage.getItem('isLogin') === 'true';
  if (to.meta.requireAuth && !isLoginSessionStorage) {
    next('/login');
    Swal.fire({
      icon: 'warning',
      title: '請先登入',
    });
  } else {
    next();
  }
});

export default router;
