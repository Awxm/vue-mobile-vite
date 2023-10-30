/**
 * 用户
 */

export default [
  {
    path: '/',
    redirect: '/index',
    name: 'Home',
    children: [
      {
        path: 'index',
        meta: { title: '积分列表' },
        name: 'Index',
        component: () => import('@v/home/index.vue'),
      },
      {
        path: 'personal',
        meta: { title: '列表' },
        name: 'Personal',
        component: () => import('@v/home/index.vue'),
      },
    ],
  },
];
