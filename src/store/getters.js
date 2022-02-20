const getters = {
  key: state => state.search.key,
  info: state => state.user.info,
  token: state => state.user.token,
  isShowMask: state => state.setting.isShowMask
}
export default getters