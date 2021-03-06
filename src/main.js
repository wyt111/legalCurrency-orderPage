
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from "./axios/api";
import axios from "./axios/axios";

import './utils/rem_size.js';

import i18n from './utils/i18n'

import "./utils/uiClassLibrary";
// import { Base64 } from 'js-base64';
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// export default vConsole

//id - Order ID   locale - The language can be set on the currency security payment page of the order with payment method
router.beforeEach((to,from,next)=>{
  to.path!=='/' && !sessionStorage.getItem('emailId')?sessionStorage.setItem('emailId',to.query.id):''
  //Check whether the refund page is displayed
  if(to.path==='/overPaymentEmail'){
    sessionStorage.setItem('isLoginEmail','true')
    sessionStorage.setItem('isLogin','true')
  }
  var isLoginEmail = sessionStorage.getItem('isLoginEmail')
  // //is ios and is android
  // var u = navigator.userAgent;

  // // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  // if(isiOS){
  //   // debugger
  //   let _href = window.location.href
  //   if(to.path === '/loadingStatus'){
  //     sessionStorage.setItem('isLogin','true')
  //     let newHref = _href.slice(0,_href.indexOf('?'))+_href.slice(_href.indexOf('#'),_href.length) + _href.slice(_href.indexOf('?'),_href.indexOf('#'))
  //     window.location.href = newHref
  //     // to.query.id = 'API152967784979825049'
  //     to.query.id ? localStorage.setItem("sysOrderNum", to.query.id) : '';
  //     to.query.locale && to.query.locale !== '' && to.query.locale !== 'undefined' ? store.state.binancePayment_locale = to.query.locale : store.state.binancePayment_locale = 'en';
  //   }else if(to.path !== '/overPaymentEmail' && isLoginEmail==='true'){
  //     next('/overPaymentEmail')
  //     return
  //   }
  //   next()
  //   if (Object.keys(to.query).length) {
  //     next();
  //     return;
  // }
  //   // 对URL路径参数进行处理
  //   if (Object.keys(from.query).length) {
  //       let toQuery = JSON.parse(JSON.stringify(from.query));
  //       next({ path: to.path, query: toQuery });
  //   } else {
  //       next();
  //   }
  // }else{
    // debugger
    // to.query.id = ''
    
    let _href = window.location.href
    if( _href.indexOf('?') <_href.indexOf('#')){
      window.location.href =  _href.slice(0,_href.indexOf('?')) +  _href.slice(_href.indexOf('#'),_href.length) + _href.slice(_href.indexOf('?'),_href.indexOf('#'))
    }
    console.log(_href);
    if(to.path === '/loadingStatus'){
      //Encryption parameters storage local
      to.query.id ? localStorage.setItem("sysOrderNum", to.query.id) : '';
      // to.query.id ? localStorage.setItem("sysOrderNum", Base64.encode(to.query.id)) : '';
      to.query.locale && to.query.locale !== '' && to.query.locale !== 'undefined' && store.state.binancePayment_locale!==to.query.locale? store.state.binancePayment_locale = to.query.locale : store.state.binancePayment_locale = 'en';
      
    }else if(to.path !== '/overPaymentEmail' && isLoginEmail==='true'){
        router.push('/overPaymentEmail')
      return
    }
    // next();
    if (Object.keys(to.query).length) {
      next();
      return;
  }
    // 对URL路径参数进行处理
    if (Object.keys(from.query).length) {
        let toQuery = JSON.parse(JSON.stringify(from.query));
        next({ path: to.path, query: toQuery });
    } else {
        next();
    }
})


Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
// Vue.prototype.$Base64 = Base64
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
