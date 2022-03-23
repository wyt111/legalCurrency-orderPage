import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    language: "EN",
    sysOrderNum: 'API148660202748314009',
    paymentType: {},
  },
  getters: {},
  mutations: {}
})

export default store
