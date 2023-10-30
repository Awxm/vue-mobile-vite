import getPageTitle from '@u/get-page-title';

import router from './router/index.js';
import store from './store/index.js';

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  const { token } = store.getters;
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const { roles, permission_routes } = store.getters;
      const hasRoles = roles && roles.length > 0;
      const hasPermissionRoutes = permission_routes && permission_routes.length > 0;
      if (hasRoles && hasPermissionRoutes) {
        next();
      } else {
        try {
          await store.dispatch('user/getInfo');
          const { roles } = store.getters;
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
          router.addRoutes(accessRoutes);
          next({ ...to });
        } catch (error) {
          await store.dispatch('user/resetToken');
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next(`/login?redirect=${to.path}`);
  }
});

router.afterEach(() => {});
