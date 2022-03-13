import {
  getAllUserNotice,
  getAllAdminNotice,
} from '@/apis/notice'
const defaultState = () => {
  return {
    userNoticeTotal: 0,
    adminNoticeTotal: 0,
    userNotice: [],
    adminNotice: []
  }
}

const state = defaultState()

const mutations = {
  SET_USER_NOTICE: (state, notice) => {
    state.userNotice = notice
  },
  SET_ADMIN_NOTICE: (state, notice) => {
    state.adminNotice = notice
  },
  SET_USER_TOTAL: (state, total) => {
    state.userNoticeTotal = total
  },
  SET_ADMIN_TOTAL: (state, total) => {
    state.adminNoticeTotal = total
  },
  REDUCE_USER_TOTAL:(state) => {
    state.userNoticeTotal --
  },
  REDUCE_ADMIN_TOTAL:(state) => {
    state.adminNoticeTotal --
  }
}

const actions = {
  setUserNotice({ commit }, data) {
    return new Promise((resolve, reject) => {
      getAllUserNotice(data).then(res => {
        commit('SET_USER_NOTICE',res.data.data)
        commit('SET_USER_TOTAL',res.data.total)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setAdminNotice({commit},data){
    return new Promise((resolve,reject) => {
      getAllAdminNotice(data).then(res => {
        commit('SET_ADMIN_NOTICE',res.data.data)
        commit('SET_ADMIN_TOTAL',res.data.total)    
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  reduceUserTotal({commit}){
    commit('REDUCE_USER_TOTAL')
  },
  reduceAdminTotal({commit}){
    commit('REDUCE_ADMIN_TOTAL')

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}