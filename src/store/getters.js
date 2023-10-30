const getters = {
  token: (status) => status.user.token,
  account: (state) => state.user.account,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes,
};
export default getters;
