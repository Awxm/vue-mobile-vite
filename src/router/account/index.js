export default [
  {
    path: '/login',
    component: () => import('@v/login/index.vue'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@v/404.vue'),
    hidden: true,
  },
];
