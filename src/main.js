import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './tool/rem_size.js';

import api from "./axios/api";
import axios from "./axios/axios";

import i18n from './tool/i18n'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import 'vant/lib/index.css';
import { Switch,Popup } from 'vant';
Vue.use(Switch);
Vue.use(Popup);

// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// export default vConsole
//配置默认地址

Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

localStorage.setItem('baseUrl', 'http://47.243.170.64:9080');
// localStorage.setItem('baseUrl', 'https://service.alchemypay.cc');
// localStorage.setItem('baseUrl', 'https://paytest.alchemypay.cc');

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
