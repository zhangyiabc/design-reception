const defaultState = () => {
  return {
    tags: []
  }
}

const state = defaultState()

const mutations = {
  SET_TAGS: (state, tags) => {
    state.tags = tags
  }
}

const actions = {
  setTags({ commit }, tags) {
    commit('SET_TAGS', tags)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}