import axios from 'axios'

const service = axios.create({
  timeout: 5000
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
    this.$message.error(err.msg)
    return Promise.reject(err)
  }
)

export default service