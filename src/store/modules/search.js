const defaultState = () => {
  return {
    key: ''
  }
}

const state = defaultState()

const mutations = {
  SET_KEY: (state, key) => {
    state.key = key
  },
  CLEAR_KEY: (state) => {
    state.key = ''
  }
}

const actions = {
  changeKey({ commit }, key) {
    commit('SET_KEY', key)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}