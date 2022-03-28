import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from "./axios/api";
import axios from "./axios/axios";

import './utils/rem_size.js';

import i18n from './utils/i18n'

import "./utils/uiClassLibrary";

// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// export default vConsole

//id - Order ID   locale - The language can be set on the currency security payment page of the order with payment method
router.beforeEach((to,from,next)=>{
  if(to.path === '/loadingStatus'){
    to.query.id ? localStorage.setItem("sysOrderNum",to.query.id) : '';
    to.query.locale ? store.state.binancePayment_locale = to.query.locale : store.state.binancePayment_locale = '';
  }
  next();
})

Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

//配置默认地址
// localStorage.setItem('sysOrderNum', 'API148660202748314009');
// localStorage.setItem('baseUrl', 'http://47.243.170.64:9080');
// localStorage.setItem('baseUrl', 'https://service.alchemypay.cc');
// localStorage.setItem('baseUrl', 'https://paytest.alchemypay.cc');


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
