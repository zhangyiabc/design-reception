import request from '@/utils/request'

const getAllUserNotice = (data) => {
  return request({
    url:"/api/userNotice",
    method:"GET",
    params:data
  })
}

const getUserNoticeDetail = (id) => {
  return request({
    url:"/api/userNotice/" +  id,
    method:"GET"
  })
}

const getAllAdminNotice = (data) => {
  return request({
    url:"/api/adminNotice",
    method:"GET",
    params:data
  })
}

const getAdminNoticeDetail = (id) => {
  return request({
    url:"/api/adminNotice/" + id,
    method:"GET"
  })
}

export {
  getAllUserNotice,
  getUserNoticeDetail,
  getAllAdminNotice,
  getAdminNoticeDetail
}