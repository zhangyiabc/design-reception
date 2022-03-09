import request from '@/utils/request'

const upload = (data) => {
  return request({
    url: "/api/upload",
    method: "POST",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}

export {
  upload
}