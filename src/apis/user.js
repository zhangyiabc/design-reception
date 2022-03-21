import request from '@/utils/request'
import md5 from 'md5'

export function login(data) {
  // data.password = md5(data.password)
  return request({
    url: "/api/user/login",
    method: "POST",
    data
  })
}

export function register(data) {
  data.password = md5(data.password)
  return request({
    url: "/api/user/register",
    method: "POST",
    data
  })
}

export function getUserDetail(id) {
  return request({
    url: "/api/user/" + id,
    method: "GET"
  })
}

export function getAllUsers(data) {
  return request({
    url: "/api/user",
    method: "GET",
    params: data
  })
}

export function whoami() {
  return request({
    url: '/api/user/whoami',
    method: "GET"
  })
}

export function orderUser(data){
  return request({
    url:"/api/user/order",
    method:"GET",
    params:data
  })

}