import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import search from './modules/search'
import user from './modules/user'
import setting from './modules/setting'
import article from './modules/article'
import label from './modules/label'
import like from './modules/like'
import notice from './modules/notice'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    search,
    user,
    setting,
    label,
    article,
    like,
    notice
  },
  getters
})