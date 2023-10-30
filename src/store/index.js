import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import getters from './getters';

const dataState = createPersistedState({
  key: 'ad_patient_state',
  // 设置要存储的参数
  reducer({ user, dictionarty, study, subject }) {
    return { user, dictionarty, study, subject };
  },
});

Vue.use(Vuex);
const files = import.meta.glob('./modules/*.js', { eager: true });
const modules = {};

const keys = Object.keys(files);
keys.forEach((key) => {
  const fileName = [key.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')][0];
  modules[fileName] = files[key].default;
});

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [dataState],
});

export default store;
