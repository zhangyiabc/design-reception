import request from '@/utils/request'

const publishComment = (data) => {
  return request({
    url:"/api/comment",
    method:"POST",
    data
  })
}

const getAllComment = (data) => {
  return request({
    url:"/api/comment",
    method:"GET",
    params:data
  })
}

const deleteComment = (data) => {
  return request({
    url:"/api/comment",
    method:"DELETE",
    data
  })
}

export {
  publishComment,
  deleteComment,
  getAllComment
}