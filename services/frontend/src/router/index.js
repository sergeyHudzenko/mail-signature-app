import Vue from 'vue';
import VueRouter from 'vue-router';
import StorageHelper from '@/helpers/localStorageHelper';
import ApiBase from '@/api/base';
import ifNotAuth from '@/middleware/ifNotAuth';
import auth from '@/middleware/auth';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/dashboard',
      component: () => import('@/pages/dashboard/Dashboard.vue'),
      name: 'Dashboard',
      beforeEnter: auth
    },
    {
      path: '/',
      component: () => import('@/pages/auth/Auth.vue'),
      name: 'Auth',
      beforeEnter: ifNotAuth
    },
    {
      path: '*',
      component: () => import('@/pages/no-found/NoFound.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const matchedRoute = ['Auth'].some((name) =>
    to.name?.includes(name)
  );

  if (!matchedRoute && !StorageHelper.get(ApiBase.authTokenKey()))
    next({ name: 'Auth' });
  else if (matchedRoute && StorageHelper.get(ApiBase.authTokenKey()))
    next({ name: 'Dashboard' });
  else next();
});

// router.beforeEach((to, from, next) => {
// 	window.scrollTo(0, 0)

// 	if (!to.meta.middleware) {
// 		return next()
// 	}

// 	const middleware = to.meta.middleware

// 	if (middleware.length === 0) {
// 		return next()
// 	}
// 	const context = {
// 		to,
// 		from,
// 		next,
// 		// store
// 	}
// 	for (var key in middleware) {
// 		middleware[key]({
// 			...context
// 		})
// 	}
// })

export default router;
