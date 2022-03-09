const getters = {
  key: state => state.search.key,
  info: state => state.user.info,
  token: state => state.user.token,
  isShowMask: state => state.setting.isShowMask,
  title: state => state.article.title,
  tags: state => state.label.tags,
  blogList: state => state.article.blogList
}
export default getters