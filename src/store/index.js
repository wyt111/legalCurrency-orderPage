import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    language: "EN",
    merchantCode: '',
    //支付方式
    paymentType:null,
  },
  getters: {},
  mutations: {}
})

export default store
