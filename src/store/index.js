import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import search from './modules/search'
import user from './modules/user'
import setting from './modules/setting'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    search,
    user,
    setting
  },
  getters
})
