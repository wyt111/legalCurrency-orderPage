import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    language: "EN",
    binancePayment_locale: '',
    merchantCode: '',
    binancePayment: '', //from view name (payList/initialPag/'')
    paymentType: {
      payType: '',
      currencyCode: '',
      imageAddress: '',
      payStatus: '',
    },
    resultData: {},
  },
  getters: {},
  mutations: {}
})

export default store
