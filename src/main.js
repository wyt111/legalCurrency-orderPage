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
  to.query.id = 'API151163214913090764'
  if(to.path === '/loadingStatus'){
    to.query.id ? localStorage.setItem("sysOrderNum",to.query.id) : '';
    to.query.locale && to.query.locale !== '' && to.query.locale !== 'undefined' ? store.state.binancePayment_locale = to.query.locale : store.state.binancePayment_locale = 'en';
  }
  next();
})

Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
