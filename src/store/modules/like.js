import { getAllLike } from '@/apis/like'
const getDefaultState = () => {
  return {
    likeList: []  // 限制里面放的是什么格式的对象，{点赞id,文章id，文章封面，文章标题}
  }
}

const state = getDefaultState()
// 判断一个对象中是否有这一项
const hasItem = (arr, item) => {
  for (const it of arr) {
    if (it.id == item.id) {
      return true
    }
  }
  return false
}

// 格式化数组
const formatLike = (arr) => {
  if (arr.length == 0) {
    return arr
  }
  const newArr = []
  for (const item of arr) {
    newArr.push({
      ...item.Article,
      UserId: item.UserId,
      ArticleId: item.ArticleId,
      id: item.id
    })
  }
  return newArr
}

const mutations = {
  SET_LIKELIST: (state, likeList) => {
    state.likeList = likeList
  },
  ADD_LIKE: (state, likeObj) => {
    // state.likeList
    if (hasItem(state.likeList, likeObj)) {
      return
    }
    state.likeList.push(likeObj)
  },
  DELETE_LIKE: (state, id) => {
    state.likeList = state.likeList.filter(it => it.id != id)
  }
}

const actions = {
  getLikeList({ commit }, info) {
    var defaultProp = {
      page: 1,
      size: 1000000
    }
    return new Promise((resolve, reject) => {
      getAllLike({
        ...defaultProp,
        ...info
      }).then(resp => {
        commit('SET_LIKELIST', formatLike(resp.data.data))
        resolve(resp)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addLikeList({ commit }, obj) {
    commit('ADD_LIKE', obj)
  },
  deleteLike({ commit }, id) {
    commit('DELETE_LIKE', id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}