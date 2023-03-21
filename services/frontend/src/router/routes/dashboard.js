import RouterComponent from '@/components/router/Router.vue';
import Auth from '@/middleware/auth';

export default {
  path: '/',
  component: RouterComponent,
  children: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => require('@/pages/dashboard/Dashboard.vue'),
      meta: {
        middleware: [Auth],
      },
    },
  ],
};
