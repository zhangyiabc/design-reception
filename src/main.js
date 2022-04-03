import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"
const socketOptions = {
  autoConnect: false,       // 自动连接     这里为我项目需求  需要在指定情况下才连接socket
}
Vue.use(
  new VueSocketIO({
    // debug: true,   // debug调试，生产建议关闭
    connection: SocketIO("https://www.zyd112.xyz", socketOptions),
    // allowEIO3:true,
    // extraHeaders: {
    //   'Access-Control-Allow-Credentials':true
    // },
    // store,          // 如果没有使用到store可以不用写
  })
)


// import { DatePicker } from "ant-design-vue";
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false
Vue.use(Antd)

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

app.$socket.connect()
const token = store.getters.token

if (token) {
  store.dispatch('user/whoami').then(res => {
    app.$socket.emit('login', {
      userId: res.id
    })
    // whoami 获取用户信息
    store.dispatch('like/getLikeList', {
      type: "user",
      id: res.id,
    })
    // 获取个人信息
    store.dispatch('notice/setUserNotice', {
      status: "unread",
      targetAuthorId: res.id
    })
    // 获取系统信息
    store.dispatch('notice/setAdminNotice', {
      status: "unread",
      targetAuthorId: res.id
    })
  })
}

app.$mount('#app')
