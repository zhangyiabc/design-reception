import request from '@/utils/request'

let like = (data) => {
  return request({
    url: "/api/like",
    method: "POST",
    data,
  })
}

const cancelLike = (data) => {
  return request({
    url: "/api/like/cancel",
    method: "POST",
    data
  })
}
const getAllLike = (data) => {
  return request({
    url: '/api/like',
    method: "GET",
    params: data
  })
}
export {
  like,
  cancelLike,
  getAllLike
}