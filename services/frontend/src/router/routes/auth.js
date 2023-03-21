import RouterComponent from '@/components/router/Router.vue';
import ifNotAuth from '@/middleware/ifNotAuth';

export default {
  path: '/',
  component: RouterComponent,
  children: [
    {
      path: '/',
      name: 'Auth',
      component: () => require('@/pages/auth/Auth.vue'),
      meta: {
        middleware: [ifNotAuth],
      },
    },
  ],
};
