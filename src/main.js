
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
  to.path!=='/' && !sessionStorage.getItem('emailId')?sessionStorage.setItem('emailId',to.query.id):''
  //Check whether the refund page is displayed
  if(to.path==='/overPaymentEmail'){
    sessionStorage.setItem('isLoginEmail','true')
  }
  var isLoginEmail = sessionStorage.getItem('isLoginEmail')
  //is ios and is android
  var u = navigator.userAgent;
  // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isiOS){
    if(to.path === '/loadingStatus'){
      let _href = window.location.href
      let newHref = _href.slice(0,_href.indexOf('?'))+_href.slice(_href.indexOf('#'),_href.length) + _href.slice(_href.indexOf('?'),_href.indexOf('#'))
      window.location.href = newHref

      to.query.id ? localStorage.setItem("sysOrderNum",to.query.id) : '';
      to.query.locale && to.query.locale !== '' && to.query.locale !== 'undefined' ? store.state.binancePayment_locale = to.query.locale : store.state.binancePayment_locale = 'en';
    }
    // else if(to.path !== '/overPaymentEmail' && isLoginEmail==='true'){
    //   next('/overPaymentEmail')
    //   return
    // }else if(to.path === '/loadingStatus' || to.path !== '/refundLoading' || to.path !== '/overPaymentEmail'){
    //   to.query.id ? localStorage.setItem("sysOrderNum",to.query.id) : sessionStorage.getItem('emailId');
    //   to.query.locale && to.query.locale !== '' && to.query.locale !== 'undefined' && store.state.binancePayment_locale!==to.query.locale? store.state.binancePayment_locale = to.query.locale : store.state.binancePayment_locale = 'en';
    // }
    next()
  }else{
    
    if(to.path === '/loadingStatus'){
      // to.query.id = 'API151599329246511513'
      to.query.id ? localStorage.setItem("sysOrderNum",to.query.id) : '';
      to.query.locale && to.query.locale !== '' && to.query.locale !== 'undefined' && store.state.binancePayment_locale!==to.query.locale? store.state.binancePayment_locale = to.query.locale : store.state.binancePayment_locale = 'en';

      
    }else if(to.path !== '/overPaymentEmail' && isLoginEmail==='true'){
        router.push('/overPaymentEmail')
      return
    }else if(to.path !== '/loadingStatus' || to.path !== '/refundLoading' || to.path !== '/overPaymentEmail'){
      to.query.id ? localStorage.setItem("sysOrderNum",to.query.id) : sessionStorage.getItem('emailId');
      to.query.locale && to.query.locale !== '' && to.query.locale !== 'undefined' && store.state.binancePayment_locale!==to.query.locale? store.state.binancePayment_locale = to.query.locale : store.state.binancePayment_locale = 'en';
    }
  
  next()
  }
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
