import axios from 'axios'
import { message } from 'ant-design-vue';
const service = axios.create({
  // baseURL: "http://localHost:9527",
  timeout: 50000
})

service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  err => {
    message.error(err.msg)
    return Promise.reject(err)
  }
)

export default service