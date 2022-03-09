// 全局配置
const getDefaultState = () => {
  return {
    isShowMask: false
  }
}

const state = getDefaultState()

const mutations = {
  RESET_SETTING(state) {
    Object.assign(state, getDefaultState())
  },
  SET_SHOW_MASK(state, isShow) {
    state.isShowMask = isShow
  }
}

const actions = {
  setShow({ commit }, isSHow) {
    const temp = Boolean(isSHow)
    commit('SET_SHOW_MASK', temp)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}