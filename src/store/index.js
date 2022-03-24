import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    language: "EN",

    sysOrderNum: 'API150618141549724057',
    merchantCode: '',
    payMent: 'c_TRON_USDT',
    imageAddress: 'https://alchemywalletdownload.oss-cn-hongkong.aliyuncs.com/achpay/payimage/c1.png',
    //支付方式
    paymentType:null,
    //两个一样重名冲突
    // sysOrderNum: 'API148660202748314009',
    // paymentType: {},

  },
  getters: {},
  mutations: {}
})

export default store
