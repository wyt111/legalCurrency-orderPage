import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //Page overall language
    languageName: "EN",
    languageValue: "en",
    //Currency security payment page language
    binancePayment_locale: 'en',
    //Record order with payment method
    merchantCode: '',
    //from view name (payList/initialPag/'')
    binancePayment: '',
    //Payment page parameters - from: /paymentSelect
    paymentType: {
      payType: '',
      currencyCode: '',
      imageAddress: '',
      payStatus: '',
    },
    //Result page parameters
    resultData: {},
    //email drrs
    paymentEmail:'',
    overDataEmail:'',
  },
  getters: {},
  mutations: {},
})

export default store
