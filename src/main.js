import Vue from 'vue';
import VueRouter from 'vue-router';
import Vant from 'vant';
import { post } from '@/https/request.js';

import VueDOMPurifyHTML from 'vue-dompurify-html';

// import mqtt from '@/https/mqtt';

import router from './router/index.js';
import store from './store/index.js';
import App from './App.vue';

import 'vant/lib/index.css';
// 插件
import './plugins/vant.js';
import '@/permission';

Vue.prototype.$post = post;

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.use(VueDOMPurifyHTML);

const originPush = VueRouter.prototype.push;
// eslint-disable-next-line func-names
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err);
};

const originReplace = VueRouter.prototype.replace;
// eslint-disable-next-line func-names
VueRouter.prototype.replace = function replace(location) {
  return originReplace.call(this, location).catch((err) => err);
};

// eslint-disable-next-line no-new
new Vue({ el: '#app', router, store, render: (h) => h(App) });
