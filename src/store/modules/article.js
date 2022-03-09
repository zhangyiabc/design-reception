import { setItem } from '@/utils/auth'
const defaultState = () => {
  return {
    title: '',
    blogList: []
  }
}

const state = defaultState()

// 判断一个对象中是否有这一项
const hasItem = (arr, item) => {
  for (const it of arr) {
    if (it.id == item.id) {
      return true
    }
  }
  return false
}

const mutations = {
  SET_TITLE: (state, title) => {
    state.title = title
  },
  SET_BLOG_LIST: (state, blog) => {
    if (hasItem(state.blogList, blog)) {
      return
    }
    if (state.blogList.length >= 10) {
      state.blogList.shift()
    }
    state.blogList.push(blog)
    // 写入sessionStoreage
    const temp = JSON.stringify(state.blogList)
    setItem('bloglist', temp)
  }
}

const actions = {
  changeTitle({ commit }, title) {
    // console.log(title)
    commit('SET_TITLE', title)
  },
  addBlogList({ commit }, blog) {
    commit('SET_BLOG_LIST', blog)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}