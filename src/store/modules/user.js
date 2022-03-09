// 关于用户登录相关
import { message } from 'ant-design-vue';
import { login, getUserDetail, whoami as whoamiApi } from '@/apis/user'
import { getToken, getCookie, } from '@/utils/auth'
const getDefaultState = () => {
  return {
    info: {},
    id: null,
    token: getToken() || null,
    isLogin: false
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_LOGIN: (state, isLogin) => {
    state.isLogin = isLogin
  },
  SET_ID: (state, id) => {
    state.id = id
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password.trim()
      }).then(resp => {
        const { data } = resp
        if (resp.code === '200') {
          message.success('登录成功')
          const token = getCookie('token')
          commit('SET_TOKEN', token)
          commit('SET_LOGIN', true)
          commit('SET_ID', data.id)
          delete data.password
          resolve(data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserDetail(state.id).then(resp => {
        const { data } = resp
        commit('SET_INFO', data)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  whoami({ commit }) {
    return new Promise((resolve, reject) => {
      whoamiApi().then(resp => {
        // console.log(resp)
        const { data } = resp
        commit('SET_INFO', data)
        commit('SET_LOGIN', true)
        commit('SET_ID', data.id)
        // this.$socket.emit('login', {
        //   userId: data.id
        // })
        resolve(data)

      }).catch((err) => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}