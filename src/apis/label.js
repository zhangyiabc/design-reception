// 关于标签的接口
import request from '@/utils/request'

const getAllLabel = () => {
  return request({
    url: "/api/label",
    method: "GET"
  })
}

export {
  getAllLabel
}