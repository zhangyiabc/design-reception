const defaultState = () => {
  return {
    title:''
  }
}

const state = defaultState()

const mutations = {
  SET_TITLE: (state, title) => {
    state.title = title
  }
}

const actions = {
  changeTitle({ commit }, title) {
    console.log(title)
    commit('SET_TITLE', title)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}