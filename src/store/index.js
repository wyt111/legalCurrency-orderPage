import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    language: "EN",
    merchantCode: '',
    binancePayment: '', //from view name (payList/initialPag)
    paymentType: {
      payType: '',
      currencyCode: '',
      imageAddress: '',
    },
  },
  getters: {},
  mutations: {}
})

export default store
