// getInfo
import { resetRouter } from '@/router';

// import { login as userLogin, getInfo as userGetInfo, logout as userLogout } from '@/api/user.js';

// 默认的数据结构

const getDefaultState = () => ({
  token: 'aaa',
  account: { auid: '', name: '', avatarUrl: '', registerTime: '', countryCode: '', gender: '', phone: '' },
  roles: [],
});

const state = getDefaultState();

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },

  SET_ACCOUNT: (state, account) => {
    state.account = { ...account };
  },

  SET_ROLES: (state, roles) => {
    state.roles = [...roles];
  },

  RESET_STATE: (state) => {
    localStorage.clear();
    Object.assign(state, getDefaultState());
  },
};

const actions = {
  async login({ commit }, loginForm) {
    // return new Promise((resolve, reject) => {
    //   userLogin(loginForm)
    //     .then((response) => {
    //       commit('SET_TOKEN', response);
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
    const mockLogin = async (loginForm) => {
      console.log(loginForm);
      return { code: 200, message: 'login successful', data: 'login' };
    };
    const res = await mockLogin(loginForm);
    const { data, code } = res;
    if (code === 200) {
      console.log(data);
      commit('SET_TOKEN', data);
    } else {
      throw res;
    }
  },

  async getInfo({ commit, state }) {
    // return new Promise((resolve, reject) => {
    //   userGetInfo(token)
    //     .then(({ roles, userInfo }) => {
    //       commit('SET_ACCOUNT', userInfo);
    //       commit('SET_ROLES', roles);
    //       resolve({ userInfo, roles });
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
    const mockRemoteUserInfo = async (token) => {
      if (token === 'main_token') {
        return {
          account: { name: 'admin' },
          roles: ['ALL_ROUTERS'],
        };
      }
      return {
        account: { name: 'dev' },
        roles: ['UserIndex', 'DashboardBase', 'login'],
      };
    };
    const token = state;
    const { account, roles } = await mockRemoteUserInfo(token);
    commit('SET_ACCOUNT', account);
    commit('SET_ROLES', roles);
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve) => {
      const { token } = state;
      console.log(token, commit, dispatch);
      resetRouter();
      resolve();
      // userLogout(token).then(() => {
      //   commit('RESET_STATE');
      //   resetRouter();
      //   dispatch('permission/generateRoutes', '', { root: true });
      //   resolve();
      // });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('RESET_STATE');
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
