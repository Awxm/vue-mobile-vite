import { asyncRoutes, constantRoutes } from '@/router';
/**
 * Use meta.role to determine if the current user has permission
 * @param role
 * @param route
 */
function hasPermission(route, p) {
  if (route.meta && route.meta.p) {
    return p.some((role) => route.meta.p.includes(role));
  }
  return true;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param route asyncRoutes
 * @param p
 */
export function filterRoutes(routes, p, id) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(tmp, p, id)) {
      if (tmp.children) {
        // children子集的时候
        tmp.children = filterRoutes(tmp.children, p, id);
      }
      res.push(tmp);
    }
  });

  return res;
}
const getDefaultState = () => ({
  routes: [],
});
const state = getDefaultState;

const mutations = {
  SET_ROUTES: (state, value) => {
    state.routes = constantRoutes.concat(value);
  },
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes;
      if (roles.includes('ALL_ROUTERS')) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterRoutes(asyncRoutes, roles);
      }
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
