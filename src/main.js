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
  //is ios and is android
  var u = navigator.userAgent;
  // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isiOS){
    if(to.path === '/loadingStatus'){
      let a = window.location.href
      let n = a.slice(0,a.indexOf('?'))+a.slice(a.indexOf('#'),a.length-1) + a.slice(a.indexOf('?'),a.indexOf('#'))
      window.location.href = n
      to.query.id ? localStorage.setItem("sysOrderNum",to.query.id) : '';
      to.query.locale && to.query.locale !== '' && to.query.locale !== 'undefined' ? store.state.binancePayment_locale = to.query.locale : store.state.binancePayment_locale = 'en';
    }
  }else{
    if(to.path === '/loadingStatus'){
      to.query.id = 'API151442779570137088'
      to.query.id ? localStorage.setItem("sysOrderNum",to.query.id) : '';
      to.query.locale && to.query.locale !== '' && to.query.locale !== 'undefined' ? store.state.binancePayment_locale = to.query.locale : store.state.binancePayment_locale = 'en';
  }
}
  next();
})


Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.directive('title',{
  inserted:function(el){
    document.title = el.dataset.title
  }
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
