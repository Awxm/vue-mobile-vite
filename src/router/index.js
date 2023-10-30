import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';
import Account from './account/index.js';

Vue.use(Router);

const files = import.meta.glob('./modules/*.js', { eager: true });
const keys = Object.keys(files);

const Routers = keys.map((key) => {
  const file = files[key].default;
  file.forEach((f) => {
    f.component = Layout;
    return f;
  });
  return file[0];
});
// 404
Routers.push({ path: '*', redirect: '/404', hidden: true });

export const constantRoutes = [...Account];
export const asyncRoutes = [...Routers];

const pn = window.location.pathname.split('');
const index = [];
pn.forEach((item, i) => {
  if (item === '/') index.push(i);
});
const isIndexLength = index.length === 1;
const base = isIndexLength ? '/' : pn.slice(0, index[1] + 1).join('');

const createRouter = () =>
  new Router({ mode: 'history', base, scrollBehavior: () => ({ y: 0 }), routes: constantRoutes });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
